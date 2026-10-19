/* app.js — shell: registry, i18n, progress, router, renderers for all block types.
   Units register themselves via window.FRAMERS.register(unit). No build step, works from file://. */
(function () {
  'use strict';
  const UI = {
    en: {
      appTitle: 'Framers', appSub: 'An interactive learning companion to the book by Kenneth Cukier, Viktor Mayer-Schönberger and Francis de Véricourt. Version 2: condensed, about 20 minutes per unit.',
      home: 'Home', glossary: 'Glossary', units: 'Learning units', overall: 'Overall progress', minutes: 'min', start: 'Start', continue: 'Continue', review: 'Review',
      hook: 'Why this matters', objectives: 'What you will be able to do', film: 'Explainer', sections: 'Core ideas', exercise: 'Try it', caseStudy: 'Case from the book', reflection: 'Your own case', quiz: 'Check yourself', flashcards: 'Flashcards', critique: 'Question the book', transfer: 'Transfer to leadership & AI', summary: 'In one screen', glossaryBlock: 'Terms from this unit',
      whyFilm: 'Watch first, read later: the pictures give you the skeleton the text hangs on.', whySections: 'Explained in our own words. Short quotes are marked.', whyExercise: 'Doing beats reading: retrieval and application make the idea stick.', whyReflection: 'Explaining a concept to yourself in your own words is itself a form of learning (chapter 3 shows why).', whyQuiz: 'Testing yourself is more effective than re-reading. Wrong answers are the useful ones.', whyFlash: 'Tap to flip. Come back in a few days for spaced repetition.', whyCritique: 'A book you only agree with has taught you nothing. These are the pressure points.', whyTransfer: 'Where does this bite in your own work?',
      play: 'Play', pause: 'Pause', prev: 'Back', next: 'Next', scene: 'Scene', markRead: 'Mark as read', read: 'Read ✓', check: 'Check', reset: 'Reset', correct: 'correct', ofN: 'of', yourScore: 'Your score', allAnswered: 'All answered.', again: 'Again', knew: 'I knew it', card: 'Card', seenAll: 'All cards seen once.', saved: 'Saved on this device', placeholder: 'Write here…', prevUnit: 'Previous unit', nextUnit: 'Next unit', backHome: 'All units', done: 'Done', chapter: 'Chapter', unit: 'Unit', intro: 'Orientation', toolkit: 'Toolkit', synthesis: 'Synthesis', filmDone: 'Explainer watched', resetProgress: 'Reset all progress', resetConfirm: 'Delete all progress and notes on this device?', howTo: 'How to use this', noUnits: 'No units loaded yet.', langName: 'EN', from: 'from',
      exDrop: 'Assign each item', exOrder: 'Bring the steps into the right order', exScenario: 'Decide, then read the feedback', allCorrect: 'All correct.', someWrong: 'Not all correct yet — the marked items explain why.', ordered: 'Correct order.', notOrdered: 'Not the right order yet. Think about what has to come first.',
    },
    de: {
      appTitle: 'Framers', appSub: 'Interaktive Lernbegleitung zum Buch von Kenneth Cukier, Viktor Mayer-Schönberger und Francis de Véricourt',
      home: 'Start', glossary: 'Glossar', units: 'Lerneinheiten', overall: 'Gesamtfortschritt', minutes: 'Min.', start: 'Starten', continue: 'Weiter', review: 'Wiederholen',
      hook: 'Worum es geht', objectives: 'Was du danach kannst', film: 'Erklärfilm', sections: 'Kernideen', exercise: 'Ausprobieren', caseStudy: 'Fall aus dem Buch', reflection: 'Dein eigener Fall', quiz: 'Selbsttest', flashcards: 'Lernkarten', critique: 'Das Buch hinterfragen', transfer: 'Transfer auf Führung & KI', summary: 'Auf einen Blick', glossaryBlock: 'Begriffe dieser Einheit',
      whyFilm: 'Erst schauen, dann lesen: Die Bilder geben dir das Gerüst, an dem der Text hängt.', whySections: 'In eigenen Worten erklärt. Kurze Zitate sind gekennzeichnet.', whyExercise: 'Tun schlägt Lesen: Abruf und Anwendung verankern die Idee.', whyReflection: 'Ein Konzept in eigenen Worten zu erklären, ist selbst eine Form des Lernens (Kapitel 3 zeigt, warum).', whyQuiz: 'Sich selbst zu prüfen wirkt stärker als Wiederlesen. Die falschen Antworten sind die nützlichen.', whyFlash: 'Tippen zum Umdrehen. In ein paar Tagen wiederkommen (Spaced Repetition).', whyCritique: 'Ein Buch, dem du nur zustimmst, hat dir nichts beigebracht. Das sind die Druckstellen.', whyTransfer: 'Wo greift das in deiner eigenen Arbeit?',
      play: 'Abspielen', pause: 'Pause', prev: 'Zurück', next: 'Weiter', scene: 'Szene', markRead: 'Als gelesen markieren', read: 'Gelesen ✓', check: 'Prüfen', reset: 'Zurücksetzen', correct: 'richtig', ofN: 'von', yourScore: 'Dein Ergebnis', allAnswered: 'Alle beantwortet.', again: 'Nochmal', knew: 'Wusste ich', card: 'Karte', seenAll: 'Alle Karten einmal gesehen.', saved: 'Auf diesem Gerät gespeichert', placeholder: 'Hier schreiben …', prevUnit: 'Vorherige Einheit', nextUnit: 'Nächste Einheit', backHome: 'Alle Einheiten', done: 'Erledigt', chapter: 'Kapitel', unit: 'Einheit', intro: 'Orientierung', toolkit: 'Werkzeugkasten', synthesis: 'Synthese', filmDone: 'Erklärfilm gesehen', resetProgress: 'Gesamten Fortschritt löschen', resetConfirm: 'Allen Fortschritt und alle Notizen auf diesem Gerät löschen?', howTo: 'So nutzt du die Plattform', noUnits: 'Noch keine Einheiten geladen.', langName: 'DE', from: 'aus',
      exDrop: 'Ordne jedes Element zu', exOrder: 'Bring die Schritte in die richtige Reihenfolge', exScenario: 'Entscheide, dann lies das Feedback', allCorrect: 'Alles richtig.', someWrong: 'Noch nicht alles richtig. Die markierten Elemente erklären, warum.', ordered: 'Richtige Reihenfolge.', notOrdered: 'Noch nicht die richtige Reihenfolge. Überleg, was zuerst kommen muss.',
    }
  };

  const state = {
    lang: 'en',
    progress: load('framers2.progress', {}),
    notes: load('framers2.notes', {}),
  };
  function load(k, d) { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } }
  function save() { localStorage.setItem('framers2.progress', JSON.stringify(state.progress)); localStorage.setItem('framers2.notes', JSON.stringify(state.notes)); }
  const t = (o) => (o == null) ? '' : (typeof o === 'string' ? o : (o[state.lang] != null ? o[state.lang] : (o.en != null ? o.en : (o.de || ''))));
  const ui = (k) => (UI[state.lang] && UI[state.lang][k]) || UI.en[k] || k;

  /* ---------- registry ---------- */
  const FRAMERS = window.FRAMERS = {
    units: [],
    register(u) { if (!u || !u.id) return; this.units = this.units.filter(x => x.id !== u.id).concat(u).sort((a, b) => a.number - b.number); },
    start() { window.addEventListener('hashchange', render); render(); },
    t, ui, state
  };

  /* ---------- progress ---------- */
  const BLOCKS = ['film', 'sections', 'exercise', 'reflection', 'quiz', 'flashcards', 'critique'];
  function unitBlocks(u) { return BLOCKS.filter(b => b === 'sections' ? (u.sections && u.sections.length) : (b === 'reflection' ? !!u.reflection : (u[b] && (Array.isArray(u[b]) ? u[b].length : true)))); }
  function mark(uid, block, val) { state.progress[uid] = state.progress[uid] || {}; if (val === undefined) val = true; state.progress[uid][block] = val; save(); refreshProgressUI(); }
  function isDone(uid, block) { return !!(state.progress[uid] && state.progress[uid][block]); }
  function pct(u) { const bs = unitBlocks(u); if (!bs.length) return 0; return Math.round(100 * bs.filter(b => isDone(u.id, b)).length / bs.length); }
  function refreshProgressUI() {
    document.querySelectorAll('[data-progress-unit]').forEach(e => { const u = FRAMERS.units.find(x => x.id === e.dataset.progressUnit); if (u) e.style.width = pct(u) + '%'; });
    document.querySelectorAll('.stepnav a[data-block]').forEach(a => { a.classList.toggle('done', isDone(a.dataset.unit, a.dataset.block)); });
  }

  /* ---------- dom helpers ---------- */
  function el(tag, attrs, ...children) {
    const e = document.createElement(tag);
    if (attrs) for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') e.className = v; else if (k === 'html') e.innerHTML = v; else if (k.startsWith('on')) e.addEventListener(k.slice(2), v); else if (k === 'style') e.style.cssText = v; else if (v !== undefined && v !== null && v !== false) e.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) { if (c == null || c === false) continue; e.append(c.nodeType ? c : document.createTextNode(String(c))); }
    return e;
  }
  const htmlEl = (tag, cls, html) => el(tag, { class: cls, html });
  function toast(msg) { const x = el('div', { class: 'toast' }, msg); document.body.append(x); setTimeout(() => x.remove(), 1800); }
  function shuffle(a, seed) { const r = [...a]; let s = seed || 17; const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; }; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; }
  function svgOf(s, lang) { const inner = typeof s === 'function' ? s(lang) : s; return String(inner).trim().startsWith('<svg') ? inner : window.V.wrap(inner); }

  /* ---------- top bar ---------- */
  function topbar(title, opts = {}) {
    const back = opts.back ? el('a', { class: 'iconbtn', href: opts.back, 'aria-label': ui('backHome') }, '←') : null;
    const lt = el('div', { class: 'vtag' }, 'v2');
    const bar = el('div', { class: 'topbar' }, el('div', { class: 'topbar-inner' }, back, el('div', { class: 'title' }, title), lt));
    if (opts.unit) bar.append(el('div', { class: 'progressline' }, el('div', { 'data-progress-unit': opts.unit.id, style: `width:${pct(opts.unit)}%` })));
    return bar;
  }

  /* ---------- router ---------- */
  function render() {
    const app = document.getElementById('app');
    const parts = (location.hash || '#/').replace(/^#\/?/, '').split('/');
    document.documentElement.lang = state.lang;
    app.innerHTML = '';
    document.documentElement.style.setProperty('--accent', '#E4572E');
    if (parts[0] === 'glossary') return renderGlossary(app);
    const unit = FRAMERS.units.find(u => u.id === parts[0]);
    if (unit) return renderUnit(app, unit, parts[1]);
    renderHome(app);
  }

  /* ---------- home ---------- */
  function ring(p) {
    const r = 24, c = 2 * Math.PI * r;
    return el('div', { class: 'ring', html: `<svg viewBox="0 0 56 56"><circle cx="28" cy="28" r="${r}" fill="none" stroke="var(--line)" stroke-width="6"/><circle cx="28" cy="28" r="${r}" fill="none" stroke="var(--accent)" stroke-width="6" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - p / 100)}" transform="rotate(-90 28 28)"/><text x="28" y="33" text-anchor="middle" font-size="13" font-weight="700" fill="var(--ink)">${p}%</text></svg>` });
  }
  function kindLabel(u) { return u.kind === 'chapter' ? `${ui('chapter')} ${u.number}` : ui(u.kind || 'unit'); }
  function renderHome(app) {
    document.title = 'Framers · ' + ui('units');
    app.append(topbar(ui('appTitle')));
    const c = el('div', { class: 'container' });
    const total = FRAMERS.units.length ? Math.round(FRAMERS.units.reduce((s, u) => s + pct(u), 0) / FRAMERS.units.length) : 0;
    c.append(el('div', { class: 'hero' },
      el('div', { class: 'kicker' }, 'Cukier · Mayer-Schönberger · de Véricourt'),
      el('h1', null, 'Framers'),
      el('p', { class: 'lead' }, ui('appSub'))));
    c.append(el('div', { class: 'overall' }, ring(total), el('div', null, el('strong', null, ui('overall')), el('div', { style: 'color:var(--muted);font-size:.9rem' }, `${FRAMERS.units.filter(u => pct(u) === 100).length} / ${FRAMERS.units.length} ${ui('done').toLowerCase()}`))));
    c.append(el('div', { class: 'homelinks' }, el('a', { class: 'chip', href: '#/glossary' }, '📖 ' + ui('glossary')),
      el('button', { class: 'chip', onclick: () => { if (confirm(ui('resetConfirm'))) { state.progress = {}; state.notes = {}; save(); render(); } } }, '↺ ' + ui('resetProgress'))));
    c.append(el('h2', null, ui('units')));
    const grid = el('div', { class: 'unitgrid' });
    if (!FRAMERS.units.length) grid.append(el('p', null, ui('noUnits')));
    for (const u of FRAMERS.units) {
      const p = pct(u);
      grid.append(el('a', { class: 'unitcard' + (p === 100 ? ' done' : ''), href: '#/' + u.id, style: `--uc:${u.color || '#E4572E'}` },
        el('div', { class: 'icon', html: u.icon ? (typeof u.icon === 'function' ? u.icon(u.color) : u.icon) : `<svg viewBox="0 0 44 44"><rect x="6" y="8" width="32" height="28" rx="5" fill="none" stroke="${u.color || '#E4572E'}" stroke-width="3"/><text x="22" y="28" text-anchor="middle" font-size="14" font-weight="700" fill="${u.color || '#E4572E'}">${u.number}</text></svg>` }),
        el('div', { style: 'flex:1;min-width:0' }, el('div', { class: 'num' }, kindLabel(u)), el('h3', null, t(u.title)), el('p', { class: 'tag' }, t(u.tagline)),
          el('div', { class: 'meta' }, el('span', null, `${u.minutes || 20} ${ui('minutes')}`), el('div', { class: 'bar' }, el('div', { style: `width:${p}%`, 'data-progress-unit': u.id })), el('span', null, p === 0 ? ui('start') : (p === 100 ? ui('review') : ui('continue'))))
        )));
    }
    c.append(grid);
    app.append(c);
  }

  /* ---------- glossary ---------- */
  function renderGlossary(app) {
    document.title = 'Framers · ' + ui('glossary');
    app.append(topbar(ui('glossary'), { back: '#/' }));
    const c = el('div', { class: 'container' }, el('h1', { style: 'padding-top:20px' }, ui('glossary')));
    const items = [];
    for (const u of FRAMERS.units) for (const g of (u.glossary || [])) items.push({ ...g, unit: u });
    items.sort((a, b) => t(a.term).localeCompare(t(b.term), state.lang));
    const dl = el('dl', { class: 'gl' });
    for (const g of items) dl.append(el('dt', null, t(g.term)), el('dd', null, t(g.def), ' ', el('a', { class: 'src', href: '#/' + g.unit.id }, `(${kindLabel(g.unit)}: ${t(g.unit.title)})`)));
    c.append(dl); app.append(c);
  }

  /* ---------- unit ---------- */
  function blockHead(idx, title, why) { return [el('h2', null, el('span', { class: 'bi' }, idx), title), why ? el('div', { class: 'why' }, why) : null].filter(Boolean); }
  function renderUnit(app, u, sub) {
    document.title = `Framers · ${t(u.title)}`;
    document.documentElement.style.setProperty('--accent', u.color || '#E4572E');
    app.append(topbar(`${kindLabel(u)} · ${t(u.title)}`, { back: '#/', unit: u }));
    const c = el('div', { class: 'container' });
    c.append(el('div', { class: 'unithead' }, el('div', { class: 'kicker' }, kindLabel(u)), el('h1', null, t(u.title)), el('div', { class: 'tagline' }, t(u.tagline))));
    const order = [['hook', 'hook'], ['objectives', 'objectives'], ['film', 'film'], ['sections', 'sections'], ['exercise', 'exercise'], ['caseStudy', 'caseStudy'], ['reflection', 'reflection'], ['quiz', 'quiz'], ['flashcards', 'flashcards'], ['critique', 'critique'], ['summary', 'summary'], ['glossary', 'glossaryBlock']];
    const present = order.filter(([k]) => u[k] && (Array.isArray(u[k]) ? u[k].length : true));
    const nav = el('nav', { class: 'stepnav' });
    for (const [k, lbl] of present) nav.append(el('a', { href: `#${u.id}-${k}`, 'data-block': BLOCKS.includes(k) ? k : null, 'data-unit': u.id, class: BLOCKS.includes(k) && isDone(u.id, k) ? 'done' : '', onclick: (e) => { e.preventDefault(); document.getElementById(`${u.id}-${k}`).scrollIntoView({ behavior: 'smooth' }); } }, ui(lbl)));
    c.append(nav);
    let i = 0;
    for (const [k, lbl] of present) {
      i++;
      const b = el('section', { class: 'block ' + k, id: `${u.id}-${k}` });
      const R = renderers[k]; if (R) R(b, u, i, ui(lbl)); else b.append(...blockHead(i, ui(lbl)));
      c.append(b);
    }
    const idx = FRAMERS.units.indexOf(u);
    const prev = FRAMERS.units[idx - 1], next = FRAMERS.units[idx + 1];
    app.append(c);
    app.append(el('div', { class: 'bottomnav' }, el('div', { class: 'bottomnav-inner' },
      prev ? el('a', { href: '#/' + prev.id }, el('button', { class: 'btn secondary' }, '← ' + t(prev.title))) : el('a', { href: '#/' }, el('button', { class: 'btn secondary' }, ui('backHome'))),
      next ? el('a', { href: '#/' + next.id }, el('button', { class: 'btn' }, t(next.title) + ' →')) : el('a', { href: '#/' }, el('button', { class: 'btn' }, ui('backHome'))))));
    if (sub) { const target = document.getElementById(`${u.id}-${sub}`); if (target) setTimeout(() => target.scrollIntoView(), 50); } else window.scrollTo(0, 0);
  }

  function readToggle(u, block) {
    const b = el('button', { class: 'btn secondary small donebtn' + (isDone(u.id, block) ? ' on' : '') }, isDone(u.id, block) ? ui('read') : ui('markRead'));
    b.addEventListener('click', () => { const v = !isDone(u.id, block); mark(u.id, block, v); b.classList.toggle('on', v); b.textContent = v ? ui('read') : ui('markRead'); });
    return el('div', { class: 'btnrow' }, b);
  }

  const renderers = {
    hook(b, u, i, lbl) { b.append(...blockHead(i, lbl), htmlEl('div', null, t(u.hook))); },
    objectives(b, u, i, lbl) { b.append(...blockHead(i, lbl), el('ol', { class: 'objectives' }, ...u.objectives.map(o => htmlEl('li', null, t(o))))); },
    film(b, u, i, lbl) {
      const f = u.film; b.append(...blockHead(i, (f.title ? t(f.title) : lbl), ui('whyFilm')));
      const scenes = f.scenes || []; let cur = 0, timer = null, playing = false; const seen = new Set();
      const stage = el('div', { class: 'film-stage' }), cap = el('div', { class: 'film-caption' }), dots = el('div', { class: 'film-dots' }), counter = el('div', { class: 'film-counter' });
      const playBtn = el('button', { class: 'btn small accent', 'aria-label': ui('play') }, '▶ ' + ui('play'));
      const prevB = el('button', { class: 'btn small secondary', 'aria-label': ui('prev') }, '‹'), nextB = el('button', { class: 'btn small secondary', 'aria-label': ui('next') }, '›');
      scenes.forEach((s, k) => dots.append(el('i', { onclick: () => show(k, true) })));
      function show(n, manual) {
        cur = Math.max(0, Math.min(scenes.length - 1, n)); seen.add(cur);
        stage.innerHTML = svgOf(scenes[cur].svg, state.lang); cap.innerHTML = t(scenes[cur].caption); counter.textContent = `${cur + 1} / ${scenes.length}`;
        [...dots.children].forEach((d, k) => { d.classList.toggle('on', k === cur); d.classList.toggle('seen', seen.has(k) && k !== cur); });
        prevB.disabled = cur === 0; nextB.disabled = cur === scenes.length - 1;
        if (cur === scenes.length - 1 && !isDone(u.id, 'film')) { mark(u.id, 'film'); toast('✓ ' + ui('filmDone')); }
        if (manual) stop();
      }
      function stop() { playing = false; clearTimeout(timer); playBtn.textContent = '▶ ' + ui('play'); }
      function step() { if (!playing) return; if (cur >= scenes.length - 1) { stop(); return; } show(cur + 1); timer = setTimeout(step, scenes[cur].duration || 5000); }
      playBtn.addEventListener('click', () => { if (playing) return stop(); playing = true; playBtn.textContent = '❚❚ ' + ui('pause'); if (cur >= scenes.length - 1) show(0); else show(cur); timer = setTimeout(step, scenes[cur].duration || 5000); });
      prevB.addEventListener('click', () => show(cur - 1, true)); nextB.addEventListener('click', () => show(cur + 1, true));
      b.append(el('div', { class: 'film' }, stage, cap, el('div', { class: 'film-controls' }, prevB, playBtn, nextB, dots, counter)));
      show(0);
    },
    sections(b, u, i, lbl) {
      b.append(...blockHead(i, lbl, ui('whySections')));
      for (const s of u.sections) {
        const sec = el('div', { class: 'section', id: s.id ? `${u.id}-${s.id}` : null }, el('h3', null, t(s.heading)));
        if (s.visual && s.visual.position === 'top') sec.append(figure(s.visual));
        sec.append(htmlEl('div', null, t(s.body)));
        if (s.visual && s.visual.position !== 'top') sec.append(figure(s.visual));
        if (s.keyIdea) sec.append(htmlEl('div', 'keyidea', t(s.keyIdea)));
        b.append(sec);
      }
      b.append(readToggle(u, 'sections'));
      function figure(v) { return el('figure', null, el('div', { html: svgOf(v.svg, state.lang) }), v.caption ? htmlEl('figcaption', null, t(v.caption)) : null); }
    },
    exercise(b, u, i, lbl) {
      const ex = u.exercise; b.append(...blockHead(i, ex.title ? t(ex.title) : lbl, ui('whyExercise')));
      if (ex.instructions) b.append(htmlEl('p', null, t(ex.instructions)));
      const host = el('div'); b.append(host);
      const done = () => { if (!isDone(u.id, 'exercise')) { mark(u.id, 'exercise'); toast('✓ ' + ui('done')); } };
      const R = exercises[ex.type]; if (R) R(host, ex, u, done); else host.append(el('p', null, 'Unknown exercise type: ' + ex.type));
    },
    caseStudy(b, u, i, lbl) {
      const cs = u.caseStudy; b.append(...blockHead(i, lbl));
      b.append(el('h3', null, t(cs.title)), htmlEl('div', null, t(cs.body)));
      if (cs.visual) b.append(el('figure', null, el('div', { html: svgOf(cs.visual.svg, state.lang) }), cs.visual.caption ? htmlEl('figcaption', null, t(cs.visual.caption)) : null));
      if (cs.lesson) b.append(htmlEl('div', 'keyidea', t(cs.lesson)));
    },
    reflection(b, u, i, lbl) {
      const r = u.reflection; b.append(...blockHead(i, lbl, ui('whyReflection')));
      if (r.intro) b.append(htmlEl('p', null, t(r.intro)));
      b.append(el('ul', null, ...(r.prompts || []).map(p => htmlEl('li', null, t(p)))));
      const key = u.id; const ta = el('textarea', { placeholder: t(r.placeholder) || ui('placeholder') }); ta.value = state.notes[key] || '';
      const savedLbl = el('div', { class: 'saved' }, state.notes[key] ? ui('saved') : '');
      let tmr; ta.addEventListener('input', () => { clearTimeout(tmr); tmr = setTimeout(() => { state.notes[key] = ta.value; save(); savedLbl.textContent = ui('saved'); if (ta.value.trim().length > 40 && !isDone(u.id, 'reflection')) mark(u.id, 'reflection'); }, 400); });
      b.append(ta, savedLbl);
    },
    quiz(b, u, i, lbl) {
      b.append(...blockHead(i, lbl, ui('whyQuiz')));
      let answered = 0, right = 0; const score = el('div', { class: 'score' });
      u.quiz.forEach((q, qi) => {
        const qe = el('div', { class: 'q' });
        if (q.case) qe.append(htmlEl('div', 'qcase', t(q.case)));
        qe.append(htmlEl('div', 'qt', `${qi + 1}. ${t(q.q)}`));
        const opts = el('div', { class: 'opts' });
        const order = shuffle(q.options.map((o, oi) => oi), 31 + qi * 7 + u.number * 13);
        order.forEach((oi) => {
          const o = q.options[oi]; const text = (o && o.text != null) ? o.text : o; const why = o && o.why;
          const btn = el('button', { onclick: () => {
            if (qe.classList.contains('answered')) return;
            qe.classList.add('answered'); answered++; const ok = oi === q.answer; if (ok) right++;
            btn.classList.add(ok ? 'right' : 'wrong', 'picked'); opts.querySelector(`[data-oi="${q.answer}"]`).classList.add('right');
            if (answered === u.quiz.length) { score.textContent = `${ui('yourScore')}: ${right} ${ui('ofN')} ${u.quiz.length} ${ui('correct')}.`; mark(u.id, 'quiz'); }
          }, 'data-oi': oi }, htmlEl('span', 'otext', t(text)), why ? htmlEl('span', 'owhy', (oi === q.answer ? '<b>Why this is right:</b> ' : '<b>Why not:</b> ') + t(why)) : null);
          opts.append(btn);
        });
        qe.append(opts, q.explain ? htmlEl('div', 'explain', '<b>Takeaway:</b> ' + t(q.explain)) : null);
        b.append(qe);
      });
      b.append(score);
    },
    flashcards(b, u, i, lbl) {
      b.append(...blockHead(i, lbl, ui('whyFlash')));
      const cards = u.flashcards; let cur = 0; const seen = new Set();
      const card = el('div', { class: 'fc-card' }), front = el('div', { class: 'fc-face fc-front' }), back = el('div', { class: 'fc-face fc-back' });
      card.append(front, back); card.addEventListener('click', () => card.classList.toggle('flipped'));
      const meta = el('div', { class: 'fc-meta' }); const counter = el('span');
      const againB = el('button', { class: 'btn small secondary' }, ui('again')), knewB = el('button', { class: 'btn small' }, ui('knew'));
      function show(n) { cur = (n + cards.length) % cards.length; seen.add(cur); card.classList.remove('flipped'); setTimeout(() => { front.innerHTML = t(cards[cur].front); back.innerHTML = t(cards[cur].back); }, card.classList.contains('flipped') ? 250 : 0); counter.textContent = `${ui('card')} ${cur + 1} / ${cards.length}`; if (seen.size === cards.length && !isDone(u.id, 'flashcards')) { mark(u.id, 'flashcards'); toast('✓ ' + ui('seenAll')); } }
      againB.addEventListener('click', () => show(cur + 1)); knewB.addEventListener('click', () => show(cur + 1));
      meta.append(counter, el('div', { class: 'btnrow', style: 'margin:0' }, againB, knewB));
      b.append(el('div', { class: 'fc' }, card), meta); show(0);
    },
    critique(b, u, i, lbl) {
      b.append(...blockHead(i, lbl, ui('whyCritique')));
      for (const c of u.critique) b.append(el('div', { class: 'crit' }, htmlEl('div', 'claim', t(c.claim)), htmlEl('div', 'challenge', t(c.challenge))));
      b.append(readToggle(u, 'critique'));
    },
    transfer(b, u, i, lbl) {
      b.append(...blockHead(i, lbl, ui('whyTransfer')));
      for (const tr of u.transfer) b.append(el('div', { class: 'transfer' }, el('div', { class: 'ctx' }, t(tr.context)), htmlEl('div', null, t(tr.prompt))));
      b.append(readToggle(u, 'transfer'));
    },
    summary(b, u, i, lbl) { b.append(...blockHead(i, lbl), el('ul', { class: 'summary' }, ...u.summary.map(s => htmlEl('li', null, t(s))))); },
    glossary(b, u, i, lbl) { b.append(...blockHead(i, lbl), el('dl', { class: 'gl' }, ...u.glossary.flatMap(g => [el('dt', null, t(g.term)), htmlEl('dd', null, t(g.def))]))); },
  };

  /* ---------- exercise types ---------- */
  const exercises = {
    /* sort: {categories:[{id,label}], items:[{text, category, why}]} */
    sort(host, ex, u, done) {
      const sel = {}; const wrap = el('div', { class: 'ex-items' });
      const items = shuffle(ex.items, u.number + 3);
      items.forEach((it, k) => {
        const cats = el('div', { class: 'ex-cats' });
        ex.categories.forEach(c => cats.append(el('button', { onclick: (e) => { sel[k] = c.id; [...cats.children].forEach(x => x.classList.remove('sel')); e.currentTarget.classList.add('sel'); } }, t(c.label))));
        wrap.append(el('div', { class: 'ex-item', 'data-k': k }, htmlEl('div', 'txt', t(it.text)), cats, htmlEl('div', 'ex-why', t(it.why))));
      });
      const res = el('div', { class: 'ex-result', style: 'display:none' });
      const check = el('button', { class: 'btn', onclick: () => {
        let ok = 0; [...wrap.children].forEach(n => { const k = +n.dataset.k; const good = sel[k] === items[k].category; n.classList.add('checked'); n.classList.toggle('ok', good); n.classList.toggle('bad', !good); if (good) ok++; });
        res.style.display = ''; res.className = 'ex-result' + (ok === items.length ? ' good' : ''); res.textContent = ok === items.length ? ui('allCorrect') : `${ok} ${ui('ofN')} ${items.length} ${ui('correct')}. ${ui('someWrong')}`; done();
      } }, ui('check'));
      host.append(el('p', { style: 'color:var(--muted);font-size:.9rem' }, ui('exDrop')), wrap, el('div', { class: 'btnrow' }, check), res);
    },
    /* order: {items:[{text}] in correct order, explanation} */
    order(host, ex, u, done) {
      const correct = ex.items.map((_, i) => i); let cur = shuffle(correct, u.number + 11); if (cur.join() === correct.join()) cur.reverse();
      const wrap = el('div', { class: 'ex-items ex-order' }); const res = el('div', { class: 'ex-result', style: 'display:none' });
      function draw() {
        wrap.innerHTML = '';
        cur.forEach((idx, pos) => wrap.append(el('div', { class: 'ex-item' }, el('div', { class: 'txt' }, el('strong', null, `${pos + 1}. `), htmlEl('span', null, t(ex.items[idx].text))),
          el('div', { class: 'mv' }, el('button', { 'aria-label': 'up', disabled: pos === 0, onclick: () => { [cur[pos - 1], cur[pos]] = [cur[pos], cur[pos - 1]]; draw(); } }, '▲'), el('button', { 'aria-label': 'down', disabled: pos === cur.length - 1, onclick: () => { [cur[pos + 1], cur[pos]] = [cur[pos], cur[pos + 1]]; draw(); } }, '▼')))));
      }
      draw();
      host.append(el('p', { style: 'color:var(--muted);font-size:.9rem' }, ui('exOrder')), wrap, el('div', { class: 'btnrow' }, el('button', { class: 'btn', onclick: () => { const ok = cur.join() === correct.join(); res.style.display = ''; res.className = 'ex-result' + (ok ? ' good' : ''); res.innerHTML = ok ? ui('ordered') + (ex.explanation ? '<div style="font-weight:400;margin-top:6px">' + t(ex.explanation) + '</div>' : '') : ui('notOrdered'); if (ok) done(); } }, ui('check'))), res);
    },
    /* scenario: {steps:[{situation, options:[{text, feedback, good}]}]} */
    scenario(host, ex, u, done) {
      let answered = 0;
      ex.steps.forEach((st, si) => {
        const fb = el('div', { class: 'scn-fb' }); const opts = el('div', { class: 'scn-opts' });
        st.options.forEach(o => opts.append(el('button', { onclick: (e) => { if (opts.dataset.done) return; opts.dataset.done = 1; e.currentTarget.classList.add(o.good ? 'good' : 'poor'); fb.innerHTML = t(o.feedback); answered++; if (answered === ex.steps.length) done(); } }, t(o.text))));
        host.append(el('div', { class: 'scn-step' }, htmlEl('div', null, `<strong>${si + 1}.</strong> ${t(st.situation)}`), opts, fb));
      });
    },
    /* custom: {render(host, ctx)} ctx = {lang, t, ui, V, el, done, u} */
    custom(host, ex, u, done) { ex.render(host, { lang: state.lang, t, ui, V: window.V, el, htmlEl, done, u, shuffle }); },
  };
})();
