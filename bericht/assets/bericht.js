/* memory-atlas Projektbericht — Interaktion & Rendering.
   Keine externen Abhängigkeiten. Läuft über denselben lokalen Server. */

const esc = (s) => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const num = (n) => new Intl.NumberFormat("de-DE").format(Math.round(n || 0));
const ktok = (n) => n >= 1e6 ? (n / 1e6).toFixed(2) + " Mio" : n >= 1e3 ? Math.round(n / 1e3) + "k" : String(n || 0);

function modelPill(model) {
  if (!model) return "";
  const opus = /opus/i.test(model);
  const fable = /fable/i.test(model);
  const cls = opus ? "opus" : fable ? "fable" : "";
  const label = opus ? "Opus" : fable ? "Fable 5" : model;
  return `<span class="pill model ${cls}">${esc(label)}</span>`;
}

/* ============================================================
   1) Deep-Research-Pipeline (Seite "Wie Claude vorgeht")
   ============================================================ */
const PIPELINE = [
  {
    key: "scope", name: "Scope", role: "Frage zerlegen",
    agents: "1 Agent",
    what: "Ein einzelner Agent zerlegt die grosse Forschungsfrage in mehrere sich ergaenzende Suchwinkel. Nicht fuenfmal dasselbe googeln, sondern die Frage in Facetten schneiden, die zusammen den Raum abdecken.",
    analogy: "Wie ein <b>Rechercheteam-Briefing</b>: bevor irgendjemand losläuft, wird die Frage in klar getrennte Ressorts aufgeteilt, damit sich niemand doppelt.",
    exlab: "Zwischenergebnis Lauf 2 · Scope-Agent → 5 Winkel",
    ex: "1 · Hairball / Node-Link vs. Matrix (Theme A)\n2 · Edge Bundling & Gestalt-Cluster (Theme A)\n3 · Degree-of-Interest / Focus+Context (Theme B)\n4 · Temporale Landmarks / Refinding (Theme C)\n5 · t-SNE/UMAP-Fallstricke & Karten-Metapher (Theme D)"
  },
  {
    key: "search", name: "Search", role: "parallel suchen",
    agents: "1 Agent pro Winkel",
    what: "Pro Suchwinkel startet ein eigener Agent parallel eine Websuche. Sie laufen gleichzeitig statt nacheinander. Neue Treffer werden gegen bereits Gesehenes gefiltert, damit keine Dublette weiterwandert.",
    analogy: "Wie <b>mehrere Rechercheure, die zeitgleich losziehen</b>, statt einer Person, die eine Liste seriell abarbeitet. Das Ergebnis liegt in Minuten statt Stunden vor.",
    exlab: "Zwischenergebnis Lauf 2 · Search → Treffer & Filter",
    ex: "Theme A (Hairball): 6 Treffer → 4 neu (2 gefiltert)\nTheme B (Focus+Context): 6 Treffer → 3 neu (3 gefiltert)\nTheme C (Landmarks): 5 Treffer\nTheme D (t-SNE): 6 Treffer"
  },
  {
    key: "fetch", name: "Fetch", role: "Quellen lesen",
    agents: "1 Agent pro Quelle",
    what: "Jede vielversprechende Quelle wird von einem eigenen Agenten geoeffnet und gelesen. Er zieht falsifizierbare Behauptungen heraus und sichert zu jeder ein woertliches Zitat. Kein Claim ohne Beleg.",
    analogy: "Wie das <b>Anlegen von Karteikarten</b>: aus jedem Paper wandern nur die pruefbaren Aussagen plus Originalzitat auf eine Karte, der Rest bleibt liegen.",
    exlab: "Zwischenergebnis Lauf 2 · Fetch → Claims mit Zitat",
    ex: "21 Quellen gelesen → 81 Claims extrahiert\nz. B. Ghoniem et al. 2005, woertlich:\n\"when graphs are bigger than twenty vertices, the\nmatrix-based visualization outperforms node-link\ndiagrams on most tasks.\""
  },
  {
    key: "verify", name: "Verify", role: "adversarial pruefen",
    agents: "mehrere Voter pro Claim",
    what: "Der Kern. Jeder Claim wird nicht bestaetigt, sondern angegriffen. Mehrere skeptische Voter-Agenten versuchen unabhaengig, ihn zu WIDERLEGEN. Nur was genug Stimmen uebersteht, ueberlebt. In Lauf 2 stimmten je drei Voter ab (3-Vote-Konsens).",
    analogy: "Wie ein <b>Peer-Review, das aktiv das Gegenteil beweisen will</b>. Ein Claim gilt nicht als wahr, weil er plausibel klingt, sondern weil mehrere Skeptiker ihn nicht kippen konnten.",
    exlab: "Zwischenergebnis Lauf 2 · Verify → Voting",
    ex: "\"Above ~20 vertices, matrix beats node-link\"  → 3-0 ✓\n\"Edges, not nodes, cause the clutter\"          → 3-0 ✓\n\"Expand muss unter 5 neue Knoten bleiben\"      → 0-3 ✗\n         (eigene fruehere Behauptung, gekippt)"
  },
  {
    key: "synth", name: "Synthesize", role: "Report bauen",
    agents: "1 Agent",
    what: "Ein Agent fuehrt die ueberlebenden Claims zusammen: Duplikate mergen, nach Konfidenz ordnen, Widersprueche aufloesen und einen zitierten Report schreiben, der verifiziert, unverifiziert und widerlegt sauber trennt.",
    analogy: "Wie das <b>Schreiben des Ergebniskapitels</b>: aus vielen bestaetigten Karteikarten wird ein geordneter Text mit Quellen, nicht eine Zitatehalde.",
    exlab: "Zwischenergebnis Lauf 2 · Synthesize → Report",
    ex: "25 verifizierte Claims → 10 gemergte Findings\n24 bestaetigt · 1 widerlegt · 0 offen\n→ FORSCHUNG.md (Ebenen A/B/C getrennt)"
  }
];

function renderPipeline(mount) {
  const track = document.createElement("div");
  track.className = "pipe-track";
  const detail = document.createElement("div");
  detail.className = "pipe-detail";

  PIPELINE.forEach((p, i) => {
    const step = document.createElement("button");
    step.className = "pipe-step" + (i === 0 ? " active" : "");
    step.type = "button";
    step.innerHTML = `<div class="idx">Phase ${i + 1} · ${esc(p.agents)}</div>
      <div class="nm">${esc(p.name)}</div>
      <div class="role">${esc(p.role)}</div>`;
    step.addEventListener("click", () => {
      track.querySelectorAll(".pipe-step").forEach(s => s.classList.remove("active"));
      step.classList.add("active");
      paintDetail(detail, p, i);
    });
    track.appendChild(step);
  });

  mount.appendChild(track);
  mount.appendChild(detail);
  paintDetail(detail, PIPELINE[0], 0);
}

function paintDetail(el, p, i) {
  el.innerHTML = `
    <div class="dh"><span class="badge">Phase ${i + 1}/5</span><h3>${esc(p.name)}</h3></div>
    <div class="what">${esc(p.what)}</div>
    <div class="analogy">${p.analogy}</div>
    <div class="ex"><span class="exlab">${esc(p.exlab)}</span>${esc(p.ex)}</div>`;
}

/* ============================================================
   2) Lauf-Rendering (Seite "Die Läufe im Detail")
   ============================================================ */
async function loadRun(file) {
  const r = await fetch(file);
  if (!r.ok) throw new Error("konnte " + file + " nicht laden");
  return r.json();
}

function voteTier(vote) {
  if (/✗/.test(vote) || /^\s*0-/.test(vote)) return "bad";
  return "ok";
}
function votePill(vote) {
  // vote strings like "3-0 (merge …)", "0-3", "1-0 ✓"
  const m = vote.match(/(\d+)\s*-\s*(\d+)/);
  const bad = m && Number(m[1]) === 0 && Number(m[2]) > 0;
  const cls = bad ? "bad" : "ok";
  const mark = bad ? "✗" : "✓";
  const core = m ? `${m[1]}-${m[2]}` : vote;
  return `<span class="pill ${cls}"><span class="dot"></span>${esc(core)} ${mark}</span>`;
}

/* Agenten-Explorer: Phasen-Gruppen mit aufklappbaren Agenten */
function renderAgents(mount, data) {
  mount.innerHTML = "";
  const byPhase = new Map();
  data.agents.forEach(a => {
    if (!byPhase.has(a.phaseIndex)) byPhase.set(a.phaseIndex, []);
    byPhase.get(a.phaseIndex).push(a);
  });
  [...byPhase.keys()].sort((x, y) => x - y).forEach(pi => {
    const list = byPhase.get(pi);
    const agg = data.phaseAgg.find(p => p.phaseIndex === pi) || {};
    const grp = document.createElement("div");
    grp.className = "phase-group";
    const errTxt = agg.error ? ` · <span style="color:var(--bad)">${agg.error} Fehler</span>` : "";
    grp.innerHTML = `<div class="ph-head">
      <span class="ph-idx">${pi}</span>
      <span class="ph-name">${esc(list[0].phaseTitle)}</span>
      <span class="ph-stat">${list.length} Agent${list.length > 1 ? "en" : ""} · ${ktok(agg.tokens)} Tok${errTxt}</span>
      ${(agg.models || []).map(modelPill).join("")}
    </div>`;
    list.sort((a, b) => a.index - b.index).forEach(a => grp.appendChild(agentCard(a)));
    mount.appendChild(grp);
  });
}

function agentCard(a) {
  const d = document.createElement("details");
  d.className = "agent";
  d.dataset.state = a.state;
  const statePill = a.state === "error"
    ? `<span class="pill bad"><span class="dot"></span>Fehler</span>`
    : `<span class="pill ok"><span class="dot"></span>fertig</span>`;
  const cached = a.cached ? `<span class="pill" title="aus Cache">cache</span>` : "";
  d.innerHTML = `
    <summary>
      <span class="a-idx">#${a.index}</span>
      <span class="a-label">${esc(a.label)}</span>
      <span class="a-meta">${modelPill(a.model)}${statePill}${cached}</span>
    </summary>
    <div class="a-body">
      <div class="amini">
        <span><b>Tokens</b> ${num(a.tokens)}</span>
        <span><b>Tool-Calls</b> ${a.toolCalls}</span>
        <span><b>Dauer</b> ${a.durationMs ? (a.durationMs / 1000).toFixed(1) + "s" : "—"}</span>
        ${a.lastToolName ? `<span><b>Tool</b> ${esc(a.lastToolName)}</span>` : ""}
      </div>
      ${a.error ? `<div class="sect"><span class="slab">Fehler</span><pre class="err">${esc(a.error)}</pre></div>` : ""}
      ${a.promptPreview ? `<div class="sect"><span class="slab">Auftrag an den Agenten (Preview)</span><pre>${esc(a.promptPreview)}</pre></div>` : ""}
      ${a.resultPreview ? `<div class="sect"><span class="slab">Zwischenergebnis des Agenten (Preview)</span><pre>${esc(a.resultPreview)}</pre></div>` : ""}
    </div>`;
  return d;
}

/* ============================================================
   3) Claim-Explorer (verifiziert / widerlegt, filterbar)
   ============================================================ */
function buildClaims(data) {
  const items = [];
  data.findings.forEach(f => items.push({
    tier: voteTier(f.vote), run: data.run, claim: f.claim,
    vote: f.vote, confidence: f.confidence, evidence: f.evidence, sources: f.sources
  }));
  (data.refuted || []).forEach(f => items.push({
    tier: "bad", run: data.run, claim: f.claim,
    vote: f.vote, confidence: "—", evidence: "Der adversariale Check kippte diesen Claim. Er wird im Report als widerlegt gefuehrt.", sources: f.sources
  }));
  return items;
}

function renderClaims(mount, claims) {
  mount.innerHTML = "";
  claims.forEach(c => {
    const det = document.createElement("details");
    det.className = "finding t-" + c.tier;
    det.dataset.tier = c.tier;
    det.dataset.run = c.run;
    const conf = c.confidence && c.confidence !== "—"
      ? `<span class="pill ${c.confidence === "high" ? "ok" : "mid"}">${esc(c.confidence)}</span>` : "";
    det.innerHTML = `
      <summary>
        <span class="fmark">${c.tier === "bad" ? "✗" : "✓"}</span>
        <span class="fclaim">${esc(c.claim)}</span>
        <span class="fmeta"><span class="pill">${esc(c.run.toUpperCase())}</span>${votePill(c.vote)}${conf}</span>
      </summary>
      <div class="fbody">
        <div class="ev">${esc(c.evidence)}</div>
        ${c.sources && c.sources.length ? `<div class="srcs">${c.sources.map(s => `<a href="${esc(s)}" target="_blank" rel="noopener">${esc(s)}</a>`).join("")}</div>` : ""}
      </div>`;
    mount.appendChild(det);
  });
}

function wireClaimFilter(bar, mount) {
  bar.addEventListener("click", (e) => {
    const chip = e.target.closest(".fchip");
    if (!chip) return;
    bar.querySelectorAll(".fchip").forEach(c => c.classList.remove("on"));
    chip.classList.add("on");
    const f = chip.dataset.filter;
    mount.querySelectorAll(".finding").forEach(el => {
      const show = f === "all"
        || (f === "ok" && el.dataset.tier === "ok")
        || (f === "bad" && el.dataset.tier === "bad")
        || (f === el.dataset.run);
      el.classList.toggle("hidden", !show);
    });
  });
}

/* Voting-Protokoll (kompakte Rohliste der Einzel-Votes aus den logs) */
function renderVoteLog(mount, data) {
  mount.innerHTML = "";
  data.voteLog.forEach(line => {
    const bad = /✗/.test(line);
    const row = document.createElement("div");
    row.style.cssText = "display:flex;gap:10px;align-items:center;padding:6px 0;border-bottom:1px solid var(--border);font-size:12.5px";
    const txt = line.replace(/:\s*\d+-\d+\s*[✓✗]\s*$/, "");
    const m = line.match(/(\d+-\d+)\s*([✓✗])/);
    row.innerHTML = `<span class="pill ${bad ? "bad" : "ok"}" style="flex-shrink:0"><span class="dot"></span>${m ? m[1] + " " + m[2] : ""}</span>
      <span style="color:var(--text-dim);font-family:var(--mono);font-size:11.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(txt)}</span>`;
    mount.appendChild(row);
  });
}
