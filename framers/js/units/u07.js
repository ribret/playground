/* u07: Learning (chapter 7). V2, English only. */
(function () {
  const P = V.palette;

  /* ---------- small glyphs ---------- */
  const hammer = (x, y, col, o = {}) => `<g transform="translate(${x},${y})"${o.cls ? ` class="${o.cls}"` : ''}${o.delay ? ` style="--d:${o.delay}s"` : ''}><rect x="-9" y="-10" width="18" height="7" rx="1.5" fill="${col}"/><line x1="0" y1="-3" x2="0" y2="12" stroke="${col}" stroke-width="3" stroke-linecap="round"/></g>`;
  const tools = [
    (c) => `<rect x="-10" y="-14" width="20" height="8" rx="2" fill="${c}"/><line x1="0" y1="-6" x2="0" y2="14" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/>`,
    (c) => `<rect x="-4" y="-15" width="8" height="13" rx="3" fill="${c}"/><line x1="0" y1="-2" x2="0" y2="13" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/>`,
    (c) => `<line x1="-10" y1="12" x2="4" y2="-2" stroke="${c}" stroke-width="4.5" stroke-linecap="round"/><circle cx="7" cy="-6" r="6.5" fill="none" stroke="${c}" stroke-width="4"/>`,
    (c) => `<rect x="-15" y="-7" width="30" height="8" rx="1.5" fill="${c}"/><path d="M-15,1 l3.75,6 l3.75,-6 l3.75,6 l3.75,-6 l3.75,6 l3.75,-6 l3.75,6 l3.75,-6" fill="none" stroke="${c}" stroke-width="2"/>`,
    (c) => `<path d="M-9,14 L5,-12 M9,14 L-5,-12" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/><circle cx="0" cy="-1" r="2.5" fill="${c}"/>`,
    (c) => `<rect x="-15" y="-6" width="30" height="12" rx="2" fill="none" stroke="${c}" stroke-width="2.5"/><path d="M-9,-6 v5 M-3,-6 v7 M3,-6 v5 M9,-6 v7" stroke="${c}" stroke-width="2"/>`,
    (c) => `<circle cx="-3" cy="-3" r="8" fill="none" stroke="${c}" stroke-width="3"/><line x1="3" y1="3" x2="12" y2="12" stroke="${c}" stroke-width="4.5" stroke-linecap="round"/>`,
  ];
  const tool = (i, x, y, col, delay) => `<g transform="translate(${x},${y})" class="a-pop" style="--d:${delay}s">${tools[i](col)}</g>`;

  /* mini checkerboard, cell size s, corners (0,0) and (7,7) removed */
  function miniBoard(x0, y0, s, o = {}) {
    let out = '';
    for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
      const x = x0 + c * s, y = y0 + r * s;
      if ((r === 0 && c === 0) || (r === 7 && c === 7)) {
        out += `<rect x="${x + 1}" y="${y + 1}" width="${s - 2}" height="${s - 2}" fill="none" stroke="${P.coral}" stroke-width="1.5" stroke-dasharray="3 2"/>` +
          V.text(x + s / 2, y + s / 2 + 5, '✕', { size: 14, fill: P.coral, bold: true, cls: 'a-pop', delay: o.xDelay || .8 });
      } else out += `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${(r + c) % 2 === 0 ? P.paper : P.ink}"/>`;
    }
    return out + `<rect x="${x0}" y="${y0}" width="${8 * s}" height="${8 * s}" fill="none" stroke="${P.ink}" stroke-width="2"/>`;
  }

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 6000,
      caption: '<b>Seven different tools beat seven hundred hammers.</b> Mental diversity is not about how many ideas you hold but how different they are.',
      svg: () => {
        let s = V.rect(20, 45, 170, 165, { fill: P.paper, stroke: P.muted, r: 12 }) + V.rect(210, 45, 170, 165, { fill: P.paper, stroke: P.teal, sw: 2.5, r: 12 });
        s += V.text(105, 32, '700 hammers', { size: 14, bold: true, fill: P.muted, cls: 'a-fade' });
        s += V.text(295, 32, '7 tools', { size: 14, bold: true, fill: P.teal, cls: 'a-fade', delay: 1.4 });
        for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) s += hammer(45 + c * 30, 80 + r * 36, P.muted, { cls: 'a-pop', delay: +((r * 5 + c) * .04).toFixed(2) });
        const cols = [P.coral, P.teal, P.plum, P.amber, P.sky, P.ok, P.ink];
        const pos = [[245, 90], [295, 90], [345, 90], [245, 150], [295, 150], [345, 150], [295, 190]];
        pos.forEach((p, i) => { s += tool(i, p[0], p[1], cols[i], 1.6 + i * .18); });
        s += V.text(200, 242, 'Variation beats volume', { size: 15, bold: true, cls: 'a-rise', delay: 3 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: '<b>A checkerboard with two corners missing: can 31 dominoes cover it?</b> In Kaplan and Simon’s experiment almost everyone tried combinations; one person filled 61 notebook pages in 18 hours.',
      svg: () => V.wrap(
        miniBoard(30, 40, 22, { xDelay: .8 }) +
        V.text(305, 70, '62 squares', { size: 15, bold: true, cls: 'a-fade', delay: 1.2 }) +
        V.text(305, 105, '31 dominoes', { size: 15, bold: true, fill: P.teal, cls: 'a-fade', delay: 1.6 }) +
        V.group(V.rect(275, 125, 60, 28, { fill: P.teal, stroke: P.ink, r: 5 }) + V.line(305, 125, 305, 153, { stroke: P.ink, sw: 1.5 }), { cls: 'a-pop', delay: 1.9 }) +
        V.text(305, 200, 'Does it fit?', { size: 16, bold: true, cls: 'a-rise', delay: 2.4 })) },

    { duration: 6500,
      caption: '<b>Change the frame and the answer is instant.</b> Every domino covers one light and one dark square; 30 light and 32 dark cannot be paired off.',
      svg: () => {
        let s = V.group(V.rect(150, 25, 50, 34, { fill: P.paper, stroke: P.ink, r: 4 }) + V.rect(200, 25, 50, 34, { fill: P.ink, stroke: P.ink, r: 4 }), { cls: 'a-pop' });
        s += V.text(200, 80, '1 light + 1 dark', { size: 14, bold: true, cls: 'a-fade', delay: .5 });
        s += V.text(110, 125, 'light', { size: 13, bold: true, anchor: 'end', cls: 'a-fade', delay: 1 });
        s += `<rect x="120" y="110" width="210" height="22" rx="4" fill="${P.paper}" stroke="${P.ink}" stroke-width="1.5" class="a-slide" style="--d:1s"/>` + V.text(345, 126, '30', { size: 15, bold: true, anchor: 'start', cls: 'a-fade', delay: 1.4 });
        s += V.text(110, 165, 'dark', { size: 13, bold: true, anchor: 'end', cls: 'a-fade', delay: 1.6 });
        s += `<rect x="120" y="150" width="224" height="22" rx="4" fill="${P.ink}" class="a-slide" style="--d:1.6s"/>` + V.text(355, 166, '32', { size: 15, bold: true, anchor: 'start', cls: 'a-fade', delay: 2 });
        s += V.text(200, 222, '30 ≠ 32: impossible', { size: 17, bold: true, fill: P.coral, cls: 'a-pop', delay: 2.6 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: '<b>Three strategies, from concrete to radical.</b> Expanding the repertoire is buying the relevant books, cognitive foraging is reading widely, the clean slate is a hunger for knowing itself.',
      svg: () => {
        let s = V.circle(125, 135, 105, { fill: 'none', stroke: P.plum, sw: 3, cls: 'a-pop', delay: 1.6 }) +
          V.circle(125, 135, 68, { fill: 'none', stroke: P.sky, sw: 3, cls: 'a-pop', delay: .8 }) +
          V.circle(125, 135, 32, { fill: P.teal, cls: 'a-pop' });
        s += V.text(125, 141, '1', { size: 17, bold: true, fill: '#fff' }) + V.text(125, 88, '2', { size: 17, bold: true, fill: P.sky, cls: 'a-fade', delay: .9 }) + V.text(125, 52, '3', { size: 17, bold: true, fill: P.plum, cls: 'a-fade', delay: 1.7 });
        const rows = [
          [70, P.teal, '1 Repertoire', 'buy the books', .3],
          [135, P.sky, '2 Cognitive Foraging', 'read widely', 1.1],
          [200, P.plum, '3 Clean Slate', 'passion to know', 1.9],
        ];
        rows.forEach(([y, c, a, b, d]) => { s += V.text(245, y, a, { size: 13, bold: true, fill: c, anchor: 'start', cls: 'a-fade', delay: d }) + V.text(245, y + 18, b, { size: 12, fill: P.muted, anchor: 'start', cls: 'a-fade', delay: d + .2 }); });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: '<b>Social diversity is only a proxy for mental diversity.</b> Norway’s 40 percent board quota drew women from the same schools and networks as the men; the frames around the table barely changed.',
      svg: () => {
        let s = V.text(100, 36, 'before', { size: 14, bold: true, cls: 'a-fade' }) + V.text(300, 36, 'after', { size: 14, bold: true, cls: 'a-fade', delay: 1 });
        s += V.line(200, 25, 200, 190, { stroke: P.line, sw: 2 });
        const row = (x0, plumIdx, d) => [0, 1, 2, 3, 4].map(i => {
          const x = x0 + i * 32; const c = plumIdx.includes(i) ? P.plum : P.ink;
          return V.rect(x - 7, 62, 14, 14, { fill: 'none', stroke: P.coral, sw: 2.5, r: 2, cls: 'a-pop', delay: d + .9 }) + V.person(x, 140, { color: c, scale: .85, cls: 'a-pop', delay: d + i * .1 });
        }).join('');
        s += row(36, [], .2) + row(236, [1, 3], 1.2);
        s += V.text(200, 222, 'New faces, same frames', { size: 15, bold: true, cls: 'a-rise', delay: 2.6 });
        s += V.text(200, 245, 'same schools, same networks', { size: 12, fill: P.muted, cls: 'a-fade', delay: 3 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: '<b>Think alone first, then together.</b> Diverse teams that discuss from minute one converge too early; members who frame the problem alone first bring their different frames into the debate.',
      svg: () => {
        const cols = [P.coral, P.teal, P.plum, P.amber];
        let s = V.text(20, 36, 'together at once', { size: 13, bold: true, anchor: 'start', cls: 'a-fade' });
        [56, 70, 84, 98].forEach((y, i) => { s += V.path(`M30,${y} C70,${y} 90,80 125,80`, { stroke: cols[i], sw: 2.5, cls: 'a-draw', delay: .2 }); });
        s += V.line(125, 80, 360, 80, { stroke: P.muted, sw: 3, cls: 'a-draw', delay: .8 }) + V.circle(365, 80, 7, { fill: P.muted, cls: 'a-pop', delay: 1.3 });
        s += V.text(250, 66, 'early consensus', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1.2 });
        s += V.line(15, 120, 385, 120, { stroke: P.line, sw: 1.5 });
        s += V.text(20, 146, 'alone first, then together', { size: 13, bold: true, anchor: 'start', cls: 'a-fade', delay: 1.8 });
        [[165, 160], [180, 190], [195, 215], [210, 240]].forEach(([y0, y1], i) => {
          s += V.path(`M30,${y0} C90,${y0} 120,${y1} 190,${y1}`, { stroke: cols[i], sw: 2.5, cls: 'a-draw', delay: 2 }) + V.circle(195, y1, 6, { fill: cols[i], cls: 'a-pop', delay: 2.6 + i * .1 }) +
            V.path(`M201,${y1} C250,${y1} 270,200 310,200`, { stroke: cols[i], sw: 2, dash: '5 4', cls: 'a-draw', delay: 3 });
        });
        s += V.bulb(345, 196, { cls: 'a-pop', delay: 3.6 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: '<b>Dissent needs a role, or it is ignored like Cassandra.</b> Duke Leopold’s jester asked the question none of his generals had: how do we get out again?',
      svg: () => {
        let s = [70, 115, 160, 205].map((x, i) => V.person(x, 150, { color: P.ink, scale: .9, cls: 'a-fade', delay: i * .1 })).join('');
        s += V.rect(40, 150, 200, 34, { fill: P.line, stroke: P.ink, r: 6, cls: 'a-fade' });
        s += V.text(140, 210, 'Generals: how to get in?', { size: 12, fill: P.muted, cls: 'a-fade', delay: .6 });
        s += V.group(V.person(320, 170, { color: P.amber, scale: 1 }) +
          `<path d="M308,137 L302,124 L313,132 L320,118 L327,132 L338,124 L332,137 Z" fill="${P.plum}" stroke="${P.ink}" stroke-width="1"/>`, { cls: 'a-pop', delay: 1.2 });
        s += V.group(V.rect(215, 30, 175, 56, { fill: P.paper, stroke: P.amber, sw: 2.5, r: 12 }) + V.path('M318,86 L322,108 L334,86', { fill: P.paper, stroke: P.amber, sw: 2.5 }) +
          V.text(302, 54, 'And how do we', { size: 13, bold: true }) + V.text(302, 72, 'get out again?', { size: 13, bold: true }), { cls: 'a-rise', delay: 1.8 });
        s += V.text(200, 245, 'Dissent with a mandate', { size: 15, bold: true, cls: 'a-rise', delay: 2.8 });
        return V.wrap(s);
      } },
  ];

  /* ---------- custom exercise: the mutilated checkerboard ---------- */
  function renderBoard(host, ctx) {
    const { el, htmlEl, done } = ctx;
    const S = 29, X0 = 12, Y0 = 14;
    const removed = (r, c) => (r === 0 && c === 0) || (r === 7 && c === 7);
    const key = (r, c) => r + ',' + c;
    let dominos = [], occ = {}, sel = null, revealed = false;
    const fig = el('figure', { style: 'cursor:pointer;touch-action:manipulation' });
    const msg = htmlEl('div', 'ex-result', '');
    const rebuild = () => { occ = {}; dominos.forEach((d, i) => { occ[d[0]] = i; occ[d[1]] = i; }); };
    const free = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8 && !removed(r, c) && occ[key(r, c)] === undefined;
    const adj = (a, b) => { const [r1, c1] = a.split(',').map(Number), [r2, c2] = b.split(',').map(Number); return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1; };
    function stuck() {
      for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (free(r, c) && (free(r + 1, c) || free(r, c + 1))) return false;
      return true;
    }
    function randomFill() {
      dominos = []; occ = {}; sel = null;
      const cells = []; for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) if (!removed(r, c)) cells.push([r, c]);
      for (let i = cells.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [cells[i], cells[j]] = [cells[j], cells[i]]; }
      cells.forEach(([r, c]) => {
        if (!free(r, c)) return;
        const nb = [[r + 1, c], [r - 1, c], [r, c + 1], [r, c - 1]].filter(([a, b]) => free(a, b));
        if (!nb.length) return;
        const [a, b] = nb[Math.floor(Math.random() * nb.length)];
        dominos.push([key(r, c), key(a, b)]); rebuild();
      });
      draw();
    }
    function handle(r, c) {
      if (removed(r, c)) return;
      const k = key(r, c);
      if (occ[k] !== undefined) { dominos.splice(occ[k], 1); rebuild(); sel = null; }
      else if (sel === null) sel = k;
      else if (sel === k) sel = null;
      else if (adj(sel, k)) { dominos.push([sel, k]); rebuild(); sel = null; }
      else sel = k;
      draw();
    }
    function draw() {
      const n = dominos.length;
      let s = '';
      for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
        const x = X0 + c * S, y = Y0 + r * S;
        if (removed(r, c)) s += `<rect x="${x + 1}" y="${y + 1}" width="${S - 2}" height="${S - 2}" fill="${P.paper2}" stroke="${P.coral}" stroke-width="1.5" stroke-dasharray="3 2"/>` + V.text(x + S / 2, y + S / 2 + 5, '✕', { size: 14, fill: P.coral, bold: true });
        else s += `<rect data-k="${key(r, c)}" x="${x}" y="${y}" width="${S}" height="${S}" fill="${(r + c) % 2 === 0 ? P.paper : P.ink}" stroke="${P.line}" stroke-width=".5"/>`;
      }
      s += `<rect x="${X0}" y="${Y0}" width="${8 * S}" height="${8 * S}" fill="none" stroke="${P.ink}" stroke-width="2" pointer-events="none"/>`;
      dominos.forEach(d => {
        const [r1, c1] = d[0].split(',').map(Number), [r2, c2] = d[1].split(',').map(Number);
        const x = X0 + Math.min(c1, c2) * S + 3, y = Y0 + Math.min(r1, r2) * S + 3;
        const w = (Math.abs(c1 - c2) + 1) * S - 6, h = (Math.abs(r1 - r2) + 1) * S - 6;
        s += `<rect data-k="${d[0]}" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${P.teal}" opacity=".88" stroke="${P.ink}" stroke-width="1"/>`;
      });
      if (sel) { const [r, c] = sel.split(',').map(Number); s += `<rect x="${X0 + c * S + 2}" y="${Y0 + r * S + 2}" width="${S - 4}" height="${S - 4}" fill="none" stroke="${P.amber}" stroke-width="4" rx="3" pointer-events="none"/>`; }
      const px = 324;
      s += V.text(px, 40, 'Dominoes', { size: 13, bold: true, fill: P.muted }) + V.text(px, 68, `${n} / 31`, { size: 22, bold: true, fill: P.teal });
      s += V.text(px, 100, 'free squares', { size: 13, bold: true, fill: P.muted }) + V.text(px, 128, String(62 - 2 * n), { size: 22, bold: true });
      if (revealed) {
        s += V.rect(266, 148, 116, 96, { fill: P.paper, stroke: P.coral, sw: 2, r: 10 });
        s += `<rect x="278" y="160" width="16" height="16" fill="${P.paper}" stroke="${P.ink}" stroke-width="1.5"/>` + V.text(302, 173, 'light: ' + (30 - n), { size: 13, bold: true, anchor: 'start' });
        s += `<rect x="278" y="186" width="16" height="16" fill="${P.ink}"/>` + V.text(302, 199, 'dark: ' + (32 - n), { size: 13, bold: true, anchor: 'start' });
        s += V.text(324, 230, 'Gap: always 2', { size: 13, bold: true, fill: P.coral });
      }
      fig.innerHTML = V.wrap(s);
      if (revealed) {
        msg.className = 'ex-result good';
        msg.innerHTML = 'Neighbouring squares always differ in colour, so every domino removes one light and one dark square. Both missing corners are light: 30 light and 32 dark remain, and at least two dark squares are always left over. The proof needs no attempt, only another frame: <strong>count instead of try</strong>. Kaplan and Simon found that cues pointing to the colours helped; more diligence inside the wrong frame did not.';
      } else if (n > 0 && stuck()) {
        msg.className = 'ex-result';
        msg.textContent = `No room for another piece, ${62 - 2 * n} squares remain. Try again, or switch the frame?`;
      } else {
        msg.className = 'ex-result';
        msg.textContent = 'Tap a square, then a neighbouring one: a domino appears. Tap a domino to remove it.';
      }
    }
    fig.addEventListener('click', (e) => { const t = e.target.closest('[data-k]'); if (!t) return; const [r, c] = t.getAttribute('data-k').split(',').map(Number); handle(r, c); });
    const bRand = el('button', { class: 'btn secondary small', onclick: randomFill }, 'Random attempt');
    const bClear = el('button', { class: 'btn secondary small', onclick: () => { dominos = []; occ = {}; sel = null; draw(); } }, 'Clear board');
    const bReveal = el('button', { class: 'btn accent small', onclick: () => { revealed = true; draw(); done(); } }, 'Switch the frame');
    host.append(fig, el('div', { class: 'btnrow' }, bRand, bClear, bReveal), msg);
    draw();
  }

  /* ---------- register ---------- */
  window.FRAMERS.register({
    id: 'u07', number: 7, kind: 'chapter', color: '#17A398', minutes: 20,
    title: 'Learning',
    tagline: 'Choosing a frame cannot be practised like a routine; what helps is a wide, varied stock of frames, in your head and in your organisation.',
    icon: (c) => `<svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="17" fill="none" stroke="${c}" stroke-width="2.5"/><circle cx="22" cy="22" r="10" fill="none" stroke="${c}" stroke-width="2.5"/><circle cx="22" cy="22" r="4" fill="${c}"/></svg>`,
    hook: '<p>Remove two opposite corners from a checkerboard: can 31 dominoes cover the remaining 62 squares? One experimental participant spent eighteen hours trying. Once you stop placing and start counting colours, the answer takes ten seconds. The effort that makes you better inside a frame does nothing for finding the right one. So what does?</p>',
    objectives: [
      'Explain why choosing a frame behaves like an insight problem and why variation beats volume.',
      'Distinguish repertoire, cognitive foraging and clean slate, and what each prepares you for.',
      'Design team settings that turn social diversity into mental diversity, and judge the evidence critically.',
    ],
    film: { title: 'From seven hundred hammers to the court jester', scenes },
    sections: [
      { id: 's1', heading: 'Choosing a frame is an insight problem',
        body: '<p>Applying a frame is a process: causality, counterfactuals and constraints shrink the search space. It rewards practice.</p><p><em>Choosing</em> a frame works differently. Psychologists call tasks like the mutilated checkerboard <strong>insight problems</strong>: they yield only to a less obvious representation. Craig Kaplan and Herbert Simon saw nearly everyone start with trial and error; persistence did not help. Progress was binary: nothing, then the colour idea. “Try, fail, try again” barely raises the odds here. What is needed is less a method than a mind-set: being primed to see a situation from several vantage points.</p><p>The resource for that mind-set is <strong>variation, not volume</strong>. Seven very different ideas are worth more than seven hundred similar ones.</p>',
        visual: { caption: 'Applying a frame improves with each attempt. Choosing a frame stays flat until the switch, then jumps. Practice moves the first curve, not the second.',
          svg: () => V.wrap(
            V.line(50, 25, 50, 205, { stroke: P.ink }) + V.line(50, 205, 375, 205, { stroke: P.ink }) +
            V.text(212, 232, 'Attempts', { size: 13, bold: true }) +
            `<text x="22" y="115" text-anchor="middle" font-size="13" font-weight="700" fill="${P.ink}" transform="rotate(-90 22 115)">Progress</text>` +
            V.path('M50,200 C110,120 200,85 365,70', { stroke: P.coral, sw: 3.5, cls: 'a-draw' }) +
            V.path('M50,198 L250,198 L250,45 L365,45', { stroke: P.teal, sw: 3.5, cls: 'a-draw', delay: 1 }) +
            V.text(150, 82, 'applying: gradual', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: .8 }) +
            V.text(310, 33, 'choosing: a jump', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: 1.8 }) +
            V.text(150, 188, 'long nothing', { size: 12, fill: P.teal, cls: 'a-fade', delay: 1.5 })), position: 'bottom' },
        keyIdea: 'You cannot grind your way to a better frame. You can only stock up on different ones before you need them.' },

      { id: 's2', heading: 'Three strategies for a wider stock of frames',
        body: '<p><strong>1. Expand the repertoire.</strong> Study how others framed a problem and keep the frame. Business-school cases do this, but a few hundred cases can suggest they cover the world.</p><p><strong>2. Cognitive foraging.</strong> Collect ways of seeing without a concrete purpose. Sociologist Ronald Burt contrasts “James”, whose network is closed and redundant, with “Robert”, who bridges <strong>structural holes</strong> between groups. Roberts are more creative and rise faster, because they can reach for frames far beyond their own.</p><p><strong>3. Clean slate.</strong> Train the readiness to put the toolbox aside. Alan Kay, who conceived object-oriented programming while the field thought procedurally, warned against the “tyranny of the present”.</p>' },

      { id: 's3', heading: 'Organisations: from social to mental diversity',
        body: '<p>Nobody can look into colleagues’ heads, so organisations use a <strong>proxy</strong>: social diversity. Different origins and careers make different frames likely, not certain. Norway required 40 percent women on company boards from 2003; a study later reported falling values at the firms that changed most. The authors’ deepest explanation: the new directors came from the same schools and circles as the men. New faces, same frames.</p><p>Group dynamics leak too. A study in <em>Science</em> found teams with more women did better, but the driver was social sensitivity, not gender. And diverse teams that discuss from the outset rush to consensus. The remedy: <strong>everyone frames the problem alone first</strong>, then the group debates, with roughly equal speaking time and majority rule. As Scott Page puts it, climbers starting in different places are likelier to find the highest peak.</p>',
        visual: { caption: 'Two leaks between social diversity and better frames: recruitment from the same pool, and premature consensus in the room.',
          svg: () => {
            const box = (x, a, b, c, d) => V.group(V.rect(x, 50, 110, 56, { fill: P.paper, stroke: c, sw: 2.5, r: 10 }) + V.text(x + 55, 74, a, { size: 13, bold: true }) + V.text(x + 55, 92, b, { size: 13, bold: true }), { cls: 'a-pop', delay: d });
            let s = box(10, 'social', 'diversity', P.muted, 0) + box(145, 'mental', 'diversity', P.teal, .8) + box(280, 'better', 'frames', P.ok, 1.6);
            s += V.arrow(122, 78, 143, 78, { color: 'ink', cls: 'a-draw', delay: .5 }) + V.arrow(257, 78, 278, 78, { color: 'ink', cls: 'a-draw', delay: 1.3 });
            s += V.text(132, 36, 'proxy', { size: 12, bold: true, fill: P.muted, cls: 'a-fade', delay: .5 }) + V.text(268, 36, 'rules', { size: 12, bold: true, fill: P.muted, cls: 'a-fade', delay: 1.3 });
            s += V.line(132, 100, 132, 140, { stroke: P.coral, sw: 2, dash: '4 4', cls: 'a-draw', delay: 2 }) + V.line(268, 100, 268, 140, { stroke: P.coral, sw: 2, dash: '4 4', cls: 'a-draw', delay: 2.4 });
            s += V.group(V.rect(55, 145, 150, 64, { fill: P.paper, stroke: P.coral, sw: 2, r: 10 }) + V.text(130, 168, 'same schools,', { size: 12, bold: true, fill: P.coral }) + V.text(130, 186, 'same networks', { size: 12, bold: true, fill: P.coral }) + V.text(130, 202, '(Norway)', { size: 12, fill: P.muted }), { cls: 'a-rise', delay: 2.2 });
            s += V.group(V.rect(215, 145, 150, 64, { fill: P.paper, stroke: P.coral, sw: 2, r: 10 }) + V.text(290, 168, 'together at once,', { size: 12, bold: true, fill: P.coral }) + V.text(290, 186, 'early consensus', { size: 12, bold: true, fill: P.coral }) + V.text(290, 202, '(group dynamics)', { size: 12, fill: P.muted }), { cls: 'a-rise', delay: 2.6 });
            s += V.text(200, 240, 'Remedy: alone first, equal airtime', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: 3.2 });
            return V.wrap(s);
          }, position: 'bottom' },
        keyIdea: 'Diversity you hire is potential. Diversity you hear changes decisions, and that depends on the rules of the meeting.' },

      { id: 's4', heading: 'Cassandras and fools: dissent with a role',
        body: '<p>People who see a different peak usually say what the organisation does not want to hear. Cassandra foresaw the fall of Troy and was never believed; Pixar’s Ed Catmull says the real curse lies on those who cannot hear her. So dissent needs a <strong>role</strong>: a loyal opposition, a red team, a court jester. When Duke Leopold of Austria planned to invade Switzerland, his fool asked the generals how they meant to get out again. A role without listeners is decoration.</p>' },
    ],
    exercise: {
      type: 'custom',
      title: 'The mutilated checkerboard',
      instructions: 'Two light corners are missing; 62 squares remain. Try to cover them with 31 dominoes: tap a square, then a neighbouring one, or let “Random attempt” try for you. When you have had enough of trial and error, switch the frame.',
      render: renderBoard,
    },
    caseStudy: {
      title: 'Joel Podolny builds frame diversity, at Yale and then at Apple',
      body: '<p>When the sociologist Joel Podolny became dean of the Yale School of Management in 2005, business education was organised by function, and the case method tended to suggest that each problem has one preferred frame. Podolny saw silos as training for functional roles. He replaced classic subjects with interdisciplinary courses taught by several instructors at once, so students watched experts disagree.</p><p>In 2008 Steve Jobs, facing the return of his cancer, hired him to build Apple University. The brief: develop executives who hold convictions firmly but can drop them for a better perspective. Podolny later described the managers Apple relies on: deep domain knowledge, command of detail, and a willingness to debate other functions in collective decisions.</p>',
      lesson: 'Podolny redesigned conditions, not content. Frame diversity is an architecture decision before it is a training topic.',
    },
    reflection: {
      intro: 'Take stock of your own frame supply and the settings you shape.',
      prompts: [
        'Name three frames you use often at work. How different are they really, or are they seven hundred hammers in different colours?',
        'Who is the Cassandra in your current environment, and what would they need from you to be heard rather than tolerated as the jester?',
      ],
      placeholder: 'My three most-used frames are…',
    },
    quiz: [
      { case: '<p>Years after the 1989 Exxon Valdez spill, Alaska’s Oil Spill Recovery Institute still had a stubborn problem: in cold weather, recovered oil and water froze into a thick mass in the barges and could not be pumped out. It posted the challenge on the crowdsourcing platform InnoCentive. In 2007 the $20,000 award went to John Davis, an Illinois chemist, who borrowed a trick from construction: vibration keeps concrete liquid.</p>',
        q: 'What does this case best show about where a workable new frame comes from?',
        options: [
          { text: 'The oil-spill specialists had simply not worked long or hard enough on the freezing problem.', why: 'Wrong: this treats an insight problem as a matter of effort. More persistence inside the same frame is checkerboard brute force.' },
          { text: 'Posting it widely enlarged the crowd, and enough solvers eventually produce a hit by sheer numbers.', why: 'Wrong: volume was not the mechanism. The idea came from another domain; thousands more oil engineers would have added more of the same hammer.' },
          { text: 'A frame stocked in an unrelated field fitted a problem that insiders kept framing the same way.', why: 'Right: the concrete frame was already in Davis’s repertoire. Open calls work when they reach people whose frames differ, not merely more people.' },
          { text: 'The solver applied the oil industry’s own framing of the problem more rigorously than its engineers did.', why: 'Wrong: he did not refine the industry’s frame, he replaced it. Rigour helps when applying a frame, not when choosing one.' },
        ],
        answer: 2,
        explain: 'Outsiders matter when they bring a different representation. Frames foraged elsewhere can suddenly fit a problem at home.' },

      { case: '<p>In 2006 Netflix offered $1 million to anyone who could improve its film-recommendation accuracy by 10 percent. For nearly three years, teams refined their models. The 2009 winner, BellKor’s Pragmatic Chaos, merged three teams with different approaches and blended their predictions. A rival coalition of many teams, The Ensemble, reached practically the same score but submitted about twenty minutes later.</p>',
        q: 'Which lesson fits the chapter’s argument about variation and volume?',
        options: [
          { text: 'Blending approaches that err in different ways beat refining any single approach a bit further.', why: 'Right: both finalists blended distinct methods, and blends outran single models. What mattered was how different the components were.' },
          { text: 'The larger coalition nearly won, so adding more contributors is what really lifts performance.', why: 'Wrong: the bigger coalition only tied. Size helps only when it adds different approaches; numbers alone are volume.' },
          { text: 'Steady practice within one modelling technique eventually produced the decisive breakthrough.', why: 'Wrong: that is the logic of applying a frame. The winning gains came from combining unlike methods.' },
          { text: 'Since the two coalitions tied, how a team is composed makes no real difference to the result.', why: 'Wrong: both were built the same way, from diverse models. The tie compares two diverse blends, not diversity against uniformity.' },
        ],
        answer: 0,
        explain: 'Diversity pays when the components see the problem differently. Count the distinct frames in a team, not the heads.' },

      { case: '<p>In 2003 Norway passed a law requiring 40 percent women on the boards of public limited companies, up from a small minority. A small group of women, nicknamed the “golden skirts”, soon held many seats each. One influential study reported falling market values at the firms that had to change most; a later reanalysis found no significant effect. Suppose decision quality really did not improve.</p>',
        q: 'Which diagnosis applies the chapter’s distinction between social and mental diversity most precisely?',
        options: [
          { text: 'The new directors brought frames so different that they clashed with the existing board culture.', why: 'Wrong: the opposite diagnosis. Clashing frames can hurt, but the chapter’s point is that the frames were too similar, not too different.' },
          { text: 'Quotas override merit, so any mandated diversity will lower the quality of decisions.', why: 'Wrong: a sweeping claim the case cannot carry. It ignores the mechanism and would condemn any quota, even one that adds new frames.' },
          { text: 'Larger boards decide more slowly, so the effect is about board size rather than composition.', why: 'Wrong: the law changed who sat on boards, not mainly how many. A size effect would need its own evidence.' },
          { text: 'Social diversity rose, but directors from the same schools and firms added few new frames.', why: 'Right: gender is a proxy for different mental models. When recruitment draws on one narrow pool, the proxy breaks and the room still thinks alike.' },
        ],
        answer: 3,
        explain: 'Visible diversity is a bet on cognitive diversity, not a guarantee. Check whether your recruiting pool actually thinks differently.' },

      { case: '<p>In a 2011 experiment at ETH Zurich, 144 participants estimated factual quantities over five rounds. Some saw the other participants’ estimates between rounds; a control group saw nothing. Seeing others narrowed the spread of answers but did not make the group average more accurate, while participants grew more confident.</p>',
        q: 'You chair a steering group facing a strategic reframing. Which meeting design draws on this finding?',
        options: [
          { text: 'Open with your own framing as chair so the group has a shared anchor to refine together.', why: 'Wrong: an early anchor is exactly the social influence that shrank diversity in the experiment. It saves time and costs you the frames.' },
          { text: 'Have everyone write down their framing independently, then reveal all before any debate.', why: 'Right: independent framing preserves the spread of views before influence sets in. The debate then works on many frames, not the first one voiced.' },
          { text: 'Run several rounds of open discussion until the spread of views narrows into agreement.', why: 'Wrong: narrowing is not accuracy. Convergence and confidence rose without better answers; it feels like progress but is premature consensus.' },
          { text: 'Average everyone’s positions after the discussion so individual biases cancel each other out.', why: 'Wrong: averaging works on independent errors. After open discussion the views are already correlated, so averaging comes too late.' },
        ],
        answer: 1,
        explain: 'Diversity in the room is lost the moment people hear each other too early. Protect independence first, then debate.' },

      { case: '<p>On the eve of the January 1986 Challenger launch, engineers at contractor Morton Thiokol advised against flying below 53°F, the limit of their data on the booster seals. NASA managers pushed back. In an offline caucus, a Thiokol executive asked the engineering vice president to “take off his engineering hat and put on his management hat”. Thiokol reversed. Engineer Roger Boisjoly testified that engineers suddenly had to prove it unsafe.</p>',
        q: 'What does this case add to the chapter’s argument about dissenting frames?',
        options: [
          { text: 'The engineers lacked conclusive data; stronger evidence would have carried the decision for them.', why: 'Wrong, or only partly: better evidence helps, but the room had reversed the burden of proof. Under that rule, a warning about uncertainty cannot win.' },
          { text: 'More engineers on the call would have outweighed the managers through sheer weight of numbers.', why: 'Wrong: dissent is not settled by headcount. Managers took the final vote; more voices without standing change nothing.' },
          { text: 'Dissent was voiced but lacked protected standing, so the forum made it prove itself.', why: 'Right: the engineers spoke, yet the room set the bar for dissent impossibly high. A dissent role needs a protected voice and receivers obliged to weigh it.' },
          { text: 'Switching to a management frame was sound, since leaders must weigh schedule and cost against risk.', why: 'Wrong here: weighing trade-offs is legitimate, but swapping hats dropped the safety frame instead of setting it against the others.' },
        ],
        answer: 2,
        explain: 'Dissent that must prove itself beyond doubt is not heard. Ask which unwelcome frame your own forums quietly put on trial.' },
    ],
    flashcards: [
      { front: 'Insight problem', back: 'A problem solvable only by switching to a less obvious representation (mutilated checkerboard). Persistence within the first frame does not help.' },
      { front: 'Variation, not volume', back: 'Seven different tools beat seven hundred hammers. What matters is how different your frames are, not how many ideas you hold.' },
      { front: 'The three strategies', back: 'Repertoire (acquire frames others used), cognitive foraging (collect diverse input without purpose), clean slate (readiness to set all known tools aside).' },
      { front: 'Social vs. mental diversity', back: 'Social diversity is an observable proxy for mental diversity. Recruiting from the same pool or deciding together too early breaks the link.' },
      { front: 'Catmull’s reversal', back: 'The curse lies not on Cassandra but on those who cannot hear her. Dissent needs a role (loyal opposition, red team, jester) and listeners.' },
    ],
    critique: [
      { claim: 'Norway’s board quota disappointed because the new directors thought like the old ones.',
        challenge: 'The value drop rests on one event study (Ahern and Dittmar, 2012). Eckbo, Nygaard and Thorburn (Management Science, 2022) re-examined it, found no statistically significant valuation effect and argued that Norway had enough qualified women candidates, which contradicts the book’s “small pool” story. Nobody measured the directors’ frames; the cognitive explanation is stacked on a contested finding.' },
      { claim: 'By 2015 research could “definitively” state that team diversity produces better outcomes.',
        challenge: 'Reviews of team-diversity research report mixed, context-dependent effects. Abigail Thompson (Notices of the AMS, 2014) argued that Hong and Page’s “diversity trumps ability” theorem lacks real content and that randomness drives the simulation; Page replied. Credé and Howardson (2017) judged the evidence for the collective-intelligence factor weak; Woolley’s team disputes this. The defensible core is narrower: diversity is potential that needs the right process.' },
      { claim: 'Cognitive foraging is a strategy anyone can adopt: curiosity taken seriously.',
        challenge: 'Foraging needs slack: time without a deliverable, access to other circles, status. Brokerage may partly follow from position rather than cause it. Framed as individual mindset, the advice hides the structural question: who here is allowed to forage, and who is measured on utilisation?' },
    ],
    summary: [
      'Choosing a frame is an insight problem: it does not improve with persistence inside the current frame.',
      'What helps is a stock of frames that differ strongly from one another, built through repertoire, cognitive foraging and a clean-slate readiness.',
      'Organisations use social diversity as a proxy for mental diversity, which only pays off with rules such as thinking alone first.',
      'Dissenting frames need an institutional role and listeners, otherwise organisations repeat the curse of Cassandra.',
    ],
    glossary: [
      { term: 'Insight problem', def: 'A problem that yields only to a change of representation, not to more effort within the first one.' },
      { term: 'Cognitive foraging', def: 'Seeking new ways of seeing without a specific aim, to be ready when a frame from outside one’s domain is needed.' },
      { term: 'Structural hole', def: 'Ronald Burt’s term for a gap between unconnected groups; people who bridge it gain access to non-redundant information.' },
      { term: 'Local vs. global optimum', def: 'The best solution in the neighbourhood you can see versus the best solution overall (Scott Page’s mountain range).' },
    ],
  });
})();
