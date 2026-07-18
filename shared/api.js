/* memory-atlas — STATISCHE Variante (Web-Export, kein Server).
   loadGraph/loadNode/loadLandkarte lesen vorab generierte JSON-Dateien.
   Schreib-/Open-Funktionen sind No-Ops mit Hinweis. */
(function () {
  "use strict";
  const qs = new URLSearchParams(location.search);
  const source = qs.get("source") === "memex" ? "memex" : "memory";
  const base = location.pathname.includes("/proto/") ? "../../" : "";

  async function getJSON(url) {
    const r = await fetch(url);
    if (!r.ok) throw new Error(r.statusText);
    return r.json();
  }
  let _nodes = null;
  async function nodesMap() {
    if (!_nodes) _nodes = await getJSON(base + `data/nodes_${source}.json`);
    return _nodes;
  }

  const api = {
    source,
    loadGraph: () => getJSON(base + `data/graph_${source}.json`),
    loadNode: async (id) => {
      const m = await nodesMap();
      const e = m[id];
      if (!e) throw new Error("node nicht im Export");
      return e;
    },
    loadLandkarte: () => getJSON(base + `data/landkarte_${source}.json`),
    loadPositions: () => Promise.resolve({ positions: {} }),
    savePositions: () => Promise.resolve({ ok: true, static: true }),
    logMutation: () => Promise.resolve({ ok: true, static: true }),
    openNode: () => Promise.reject(new Error("Im Web-Export deaktiviert (nur lokal)")),
  };

  // ---------- Daten-Helfer ----------

  function typeColor(meta, type) {
    const t = meta.types[type] || Object.entries(meta.types)
      .find(([k]) => k.toLowerCase() === String(type).toLowerCase())?.[1];
    return (t && t.color) || "#90A4AE";
  }

  function applyTypeColors(meta) {
    const root = document.documentElement;
    for (const [key, t] of Object.entries(meta.types)) {
      root.style.setProperty(`--type-${cssSafe(key)}`, t.color);
    }
  }

  function cssSafe(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-"); }

  function buildAdjacency(graph) {
    const adj = new Map();
    for (const n of graph.nodes) adj.set(n.id, new Set());
    for (const e of graph.edges) {
      adj.get(e.source)?.add(e.target);
      adj.get(e.target)?.add(e.source);
    }
    return adj;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  // Mini-Markdown fürs Detail-Panel (Headings, Listen, bold, code, Tabellen, Wikilinks)
  function renderMd(md, resolveWikilink) {
    const lines = String(md).split("\n");
    const out = [];
    let inList = false, inTable = false;
    const flush = () => { if (inList) { out.push("</ul>"); inList = false; } if (inTable) { out.push("</table>"); inTable = false; } };
    for (const line of lines) {
      const t = line.trim();
      if (!t) { flush(); continue; }
      const h = t.match(/^(#{1,4})\s+(.*)/);
      if (h) { flush(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); continue; }
      if (/^\|/.test(t)) {
        if (/^\|[\s:|-]+\|$/.test(t)) continue;
        if (!inTable) { flush(); out.push("<table>"); inTable = true; }
        const cells = t.slice(1, -1).split("|").map((c) => `<td>${inline(c.trim())}</td>`).join("");
        out.push(`<tr>${cells}</tr>`);
        continue;
      }
      if (/^[-*+]\s+/.test(t)) {
        if (inTable) { out.push("</table>"); inTable = false; }
        if (!inList) { out.push("<ul>"); inList = true; }
        out.push(`<li>${inline(t.replace(/^[-*+]\s+/, ""))}</li>`);
        continue;
      }
      flush();
      out.push(`<p>${inline(t)}</p>`);
    }
    flush();
    return out.join("\n");

    function inline(s) {
      let r = escapeHtml(s);
      r = r.replace(/\[\[([^\]|#]+)(?:[|#][^\]]*)?\]\]/g, (m, target) => {
        const info = resolveWikilink ? resolveWikilink(target.trim()) : null;
        const cls = info && info.id ? "wikilink" : "wikilink dead";
        const data = info && info.id ? ` data-node="${escapeHtml(info.id)}"` : "";
        return `<a class="${cls}"${data}>${escapeHtml(target.trim())}</a>`;
      });
      r = r.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      r = r.replace(/`([^`]+)`/g, "<code>$1</code>");
      return r;
    }
  }

  // ---------- UI-Bausteine ----------

  function buildTopbar({ title, subtitle }) {
    const bar = document.createElement("div");
    bar.className = "topbar";
    bar.innerHTML = `
      <a class="home" href="/?source=${source}" title="Zurück zur Übersicht">←</a>
      <h1>${escapeHtml(title)}</h1>
      <span class="subtitle">${escapeHtml(subtitle || "")} · Quelle: ${source === "memex" ? "Memex" : "Claude-Memories"}</span>
      <div class="spacer"></div>
      <div class="searchbox"><input type="search" placeholder="Suchen… ( / )" autocomplete="off">
        <div class="results"></div></div>
      <div class="controls"></div>`;
    document.body.appendChild(bar);
    return bar;
  }

  function initSearch(bar, graph, onPick) {
    const input = bar.querySelector(".searchbox input");
    const results = bar.querySelector(".searchbox .results");
    let sel = -1, items = [];
    function close() { results.classList.remove("open"); sel = -1; }
    function render(list) {
      items = list;
      results.innerHTML = list.map((n, i) => `
        <div class="item" data-i="${i}">
          <span class="dot" style="width:8px;height:8px;border-radius:50%;flex:none;background:${typeColor(graph.meta, n.type)}"></span>
          <span style="flex:none">${escapeHtml(n.label)}</span>
          <span class="desc">${escapeHtml(n.description || "")}</span>
        </div>`).join("");
      results.classList.toggle("open", list.length > 0);
      results.querySelectorAll(".item").forEach((el) =>
        el.addEventListener("mousedown", (ev) => { ev.preventDefault(); pick(+el.dataset.i); }));
    }
    function pick(i) { if (items[i]) { onPick(items[i]); input.blur(); close(); } }
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (q.length < 2) return close();
      const hits = graph.nodes.filter((n) =>
        n.label.toLowerCase().includes(q) ||
        (n.description || "").toLowerCase().includes(q)).slice(0, 12);
      render(hits);
    });
    input.addEventListener("keydown", (ev) => {
      if (ev.key === "ArrowDown") { sel = Math.min(sel + 1, items.length - 1); }
      else if (ev.key === "ArrowUp") { sel = Math.max(sel - 1, 0); }
      else if (ev.key === "Enter") { pick(sel >= 0 ? sel : 0); return; }
      else if (ev.key === "Escape") { close(); input.blur(); return; }
      else return;
      ev.preventDefault();
      results.querySelectorAll(".item").forEach((el, i) => el.classList.toggle("sel", i === sel));
    });
    input.addEventListener("blur", () => setTimeout(close, 150));
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "/" && document.activeElement !== input &&
          !/input|textarea/i.test(document.activeElement.tagName)) {
        ev.preventDefault(); input.focus();
      }
    });
  }

  function buildPanel() {
    const panel = document.createElement("div");
    panel.className = "panel";
    panel.innerHTML = `
      <button class="close" title="Schließen (Esc)">✕</button>
      <div class="panel-head"><h2></h2><div class="badges"></div><div class="meta-line"></div></div>
      <div class="panel-body"><div class="md"></div></div>
      <div class="panel-foot">
        <button class="btn open-file">Im Editor öffnen</button>
      </div>`;
    document.body.appendChild(panel);
    panel.querySelector(".close").addEventListener("click", () => panel.classList.remove("open"));
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") panel.classList.remove("open");
    });
    return panel;
  }

  async function showNodeInPanel(panel, graph, node, { onNavigate } = {}) {
    panel.classList.add("open");
    panel.querySelector("h2").textContent = node.label;
    const meta = graph.meta;
    const badges = [];
    const color = typeColor(meta, node.type);
    badges.push(`<span class="badge type" style="--badge-color:${color}">${escapeHtml((meta.types[node.type] || {}).label || node.type)}</span>`);
    if (node.tier) badges.push(`<span class="badge">${escapeHtml(node.tier)}</span>`);
    if (node.cluster != null && meta.clusters[node.cluster])
      badges.push(`<span class="badge">Cluster: ${escapeHtml(meta.clusters[node.cluster].label)}</span>`);
    badges.push(`<span class="badge">${node.degree} Verbindungen</span>`);
    panel.querySelector(".badges").innerHTML = badges.join("");
    panel.querySelector(".meta-line").textContent =
      (node.mtime ? `geändert ${node.mtime.slice(0, 10)}` : "") +
      (node.size ? ` · ${(node.size / 1024).toFixed(1)} KB` : "");
    const mdEl = panel.querySelector(".md");
    mdEl.innerHTML = '<p style="color:var(--text-faint)">Lade…</p>';
    const openBtn = panel.querySelector(".open-file");
    openBtn.style.display = node.ghost ? "none" : "";
    openBtn.onclick = () => api.openNode(node.id).catch((e) => toast("Öffnen fehlgeschlagen: " + e.message));
    if (node.ghost) {
      mdEl.innerHTML = `<p style="color:var(--text-dim)">${escapeHtml(node.description)}</p>`;
      return;
    }
    try {
      const { body } = await api.loadNode(node.id);
      const byLabel = new Map(graph.nodes.map((n) => [n.label.toLowerCase(), n]));
      const byStem = new Map(graph.nodes.map((n) => [String(n.stem).toLowerCase().replace(/_/g, "-"), n]));
      mdEl.innerHTML = renderMd(body, (target) => {
        const key = target.toLowerCase();
        return byLabel.get(key) || byStem.get(key.replace(/_/g, "-")) || null;
      });
      mdEl.querySelectorAll(".wikilink[data-node]").forEach((a) =>
        a.addEventListener("click", () => {
          const t = graph.nodes.find((n) => n.id === a.dataset.node);
          if (t && onNavigate) onNavigate(t);
        }));
    } catch (e) {
      mdEl.innerHTML = `<p style="color:var(--warn)">${escapeHtml(e.message)}</p>`;
    }
  }

  function buildLegend(graph, { onToggle } = {}) {
    const legend = document.createElement("div");
    legend.className = "legend";
    const counts = {};
    for (const n of graph.nodes) counts[n.type] = (counts[n.type] || 0) + 1;
    const entries = Object.entries(graph.meta.types)
      .filter(([k]) => counts[k])
      .sort((a, b) => (counts[b[0]] || 0) - (counts[a[0]] || 0));
    for (const [key, t] of entries) {
      const chip = document.createElement("span");
      chip.className = "chip active";
      chip.innerHTML = `<span class="dot" style="--dot:${t.color}"></span>${escapeHtml(t.label)} <span style="opacity:.55">${counts[key]}</span>`;
      chip.dataset.type = key;
      if (onToggle) chip.addEventListener("click", () => {
        chip.classList.toggle("active");
        chip.classList.toggle("off");
        onToggle(key, chip.classList.contains("active"));
      });
      legend.appendChild(chip);
    }
    document.body.appendChild(legend);
    return legend;
  }

  function buildHud(text) {
    const hud = document.createElement("div");
    hud.className = "hud";
    hud.textContent = text;
    document.body.appendChild(hud);
    return hud;
  }

  let toastTimer = null;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  function debounce(fn, ms) {
    let t = null;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
  }

  window.Atlas = {
    api, source, typeColor, applyTypeColors, buildAdjacency, escapeHtml,
    renderMd, buildTopbar, initSearch, buildPanel, showNodeInPanel,
    buildLegend, buildHud, toast, debounce, cssSafe,
  };
})();
