/* u07 — Lernen / Learning (chapter 7). */
(function () {
  const P = V.palette;
  const de = (lang) => lang === 'de';

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
      caption: { en: '<b>Seven different tools beat seven hundred hammers.</b> Mental diversity is not about how many ideas you hold but how different they are.', de: '<b>Sieben verschiedene Werkzeuge schlagen siebenhundert Hämmer.</b> Bei mentaler Vielfalt zählt nicht, wie viele Ideen du hast, sondern wie verschieden sie sind.' },
      svg: (l) => {
        let s = V.rect(20, 45, 170, 165, { fill: P.paper, stroke: P.muted, r: 12 }) + V.rect(210, 45, 170, 165, { fill: P.paper, stroke: P.teal, sw: 2.5, r: 12 });
        s += V.text(105, 32, de(l) ? '700 Hämmer' : '700 hammers', { size: 14, bold: true, fill: P.muted, cls: 'a-fade' });
        s += V.text(295, 32, de(l) ? '7 Werkzeuge' : '7 tools', { size: 14, bold: true, fill: P.teal, cls: 'a-fade', delay: 1.4 });
        for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) s += hammer(45 + c * 30, 80 + r * 36, P.muted, { cls: 'a-pop', delay: +((r * 5 + c) * .04).toFixed(2) });
        const cols = [P.coral, P.teal, P.plum, P.amber, P.sky, P.ok, P.ink];
        const pos = [[245, 90], [295, 90], [345, 90], [245, 150], [295, 150], [345, 150], [295, 190]];
        pos.forEach((p, i) => { s += tool(i, p[0], p[1], cols[i], 1.6 + i * .18); });
        s += V.text(200, 242, de(l) ? 'Variation schlägt Volumen' : 'Variation beats volume', { size: 15, bold: true, cls: 'a-rise', delay: 3 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>A checkerboard with two corners missing: can 31 dominoes cover it?</b> In Kaplan and Simon’s experiment, almost everyone started trying combinations; one person filled 61 notebook pages in 18 hours.', de: '<b>Ein Schachbrett ohne zwei Ecken: Lässt es sich mit 31 Dominosteinen bedecken?</b> In Kaplans und Simons Experiment probierten fast alle Kombinationen durch; eine Person füllte in 18 Stunden 61 Notizbuchseiten.' },
      svg: (l) => V.wrap(
        miniBoard(30, 40, 22, { xDelay: .8 }) +
        V.text(305, 70, de(l) ? '62 Felder' : '62 squares', { size: 15, bold: true, cls: 'a-fade', delay: 1.2 }) +
        V.text(305, 105, de(l) ? '31 Dominos' : '31 dominoes', { size: 15, bold: true, fill: P.teal, cls: 'a-fade', delay: 1.6 }) +
        V.group(V.rect(275, 125, 60, 28, { fill: P.teal, stroke: P.ink, r: 5 }) + V.line(305, 125, 305, 153, { stroke: P.ink, sw: 1.5 }), { cls: 'a-pop', delay: 1.9 }) +
        V.text(305, 200, de(l) ? 'Passt das?' : 'Does it fit?', { size: 16, bold: true, cls: 'a-rise', delay: 2.4 })) },

    { duration: 7000,
      caption: { en: '<b>Change the frame and the answer is instant.</b> Every domino covers one light and one dark square; 30 light and 32 dark cannot be paired off.', de: '<b>Wechsle den Frame, und die Antwort ist sofort da.</b> Jeder Domino deckt ein helles und ein dunkles Feld; 30 helle und 32 dunkle lassen sich nicht paarweise aufteilen.' },
      svg: (l) => {
        let s = V.group(V.rect(150, 25, 50, 34, { fill: P.paper, stroke: P.ink, r: 4 }) + V.rect(200, 25, 50, 34, { fill: P.ink, stroke: P.ink, r: 4 }), { cls: 'a-pop' });
        s += V.text(200, 80, de(l) ? '1 hell + 1 dunkel' : '1 light + 1 dark', { size: 14, bold: true, cls: 'a-fade', delay: .5 });
        s += V.text(110, 125, de(l) ? 'hell' : 'light', { size: 13, bold: true, anchor: 'end', cls: 'a-fade', delay: 1 });
        s += `<rect x="120" y="110" width="210" height="22" rx="4" fill="${P.paper}" stroke="${P.ink}" stroke-width="1.5" class="a-slide" style="--d:1s"/>` + V.text(345, 126, '30', { size: 15, bold: true, anchor: 'start', cls: 'a-fade', delay: 1.4 });
        s += V.text(110, 165, de(l) ? 'dunkel' : 'dark', { size: 13, bold: true, anchor: 'end', cls: 'a-fade', delay: 1.6 });
        s += `<rect x="120" y="150" width="224" height="22" rx="4" fill="${P.ink}" class="a-slide" style="--d:1.6s"/>` + V.text(355, 166, '32', { size: 15, bold: true, anchor: 'start', cls: 'a-fade', delay: 2 });
        s += V.text(200, 222, de(l) ? '30 ≠ 32: unmöglich' : '30 ≠ 32: impossible', { size: 17, bold: true, fill: P.coral, cls: 'a-pop', delay: 2.6 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: { en: '<b>Three strategies, from concrete to radical.</b> Expanding your repertoire is buying the relevant books, cognitive foraging is reading widely, the clean slate is a hunger for knowing itself.', de: '<b>Drei Strategien, vom Konkreten zum Radikalen.</b> Das Repertoire erweitern heißt die passenden Bücher kaufen, Cognitive Foraging heißt quer lesen, die Clean Slate ist Hunger aufs Wissen selbst.' },
      svg: (l) => {
        let s = V.circle(125, 135, 105, { fill: 'none', stroke: P.plum, sw: 3, cls: 'a-pop', delay: 1.6 }) +
          V.circle(125, 135, 68, { fill: 'none', stroke: P.sky, sw: 3, cls: 'a-pop', delay: .8 }) +
          V.circle(125, 135, 32, { fill: P.teal, cls: 'a-pop' });
        s += V.text(125, 141, '1', { size: 17, bold: true, fill: '#fff' }) + V.text(125, 88, '2', { size: 17, bold: true, fill: P.sky, cls: 'a-fade', delay: .9 }) + V.text(125, 52, '3', { size: 17, bold: true, fill: P.plum, cls: 'a-fade', delay: 1.7 });
        const rows = [
          [70, P.teal, '1 Repertoire', de(l) ? 'Bücher kaufen' : 'buy the books', .3],
          [135, P.sky, '2 Cognitive Foraging', de(l) ? 'quer lesen' : 'read widely', 1.1],
          [200, P.plum, '3 Clean Slate', de(l) ? 'Hunger aufs Wissen' : 'passion to know', 1.9],
        ];
        rows.forEach(([y, c, a, b, d]) => { s += V.text(245, y, a, { size: 13, bold: true, fill: c, anchor: 'start', cls: 'a-fade', delay: d }) + V.text(245, y + 18, b, { size: 12, fill: P.muted, anchor: 'start', cls: 'a-fade', delay: d + .2 }); });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: { en: '<b>Robert bridges structural holes, James lives in a closed circle.</b> Ronald Burt found that people whose networks span separate groups see more, decide better and get promoted faster.', de: '<b>Robert überbrückt strukturelle Löcher, James lebt im geschlossenen Kreis.</b> Ronald Burt fand: Wer mit getrennten Gruppen verbunden ist, sieht mehr, entscheidet besser und steigt schneller auf.' },
      svg: (l) => {
        let s = V.line(200, 25, 200, 235, { stroke: P.line, sw: 2 });
        const ring = (cx, cy, r, n, rot) => Array.from({ length: n }, (_, i) => [cx + r * Math.cos(rot + i * 2 * Math.PI / n), cy + r * Math.sin(rot + i * 2 * Math.PI / n)]);
        const A = ring(100, 115, 50, 6, -Math.PI / 2);
        for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) s += V.line(A[i][0], A[i][1], A[j][0], A[j][1], { stroke: P.muted, sw: 1.5, cls: 'a-draw', delay: .2 });
        s += V.line(100, 115, A[0][0], A[0][1], { stroke: P.muted, sw: 1.5 }) + V.line(100, 115, A[3][0], A[3][1], { stroke: P.muted, sw: 1.5 });
        A.forEach(p => { s += V.circle(p[0], p[1], 8, { fill: P.muted, cls: 'a-pop' }); });
        s += V.circle(100, 115, 11, { fill: P.coral, cls: 'a-pop', delay: .5 });
        s += V.text(100, 200, 'James', { size: 15, bold: true, fill: P.coral, cls: 'a-fade', delay: .8 }) + V.text(100, 220, de(l) ? 'redundant' : 'redundant', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1 });
        const B = ring(250, 80, 24, 4, 0.3), C = ring(345, 150, 24, 4, 0.9);
        [B, C].forEach((G, gi) => { for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) s += V.line(G[i][0], G[i][1], G[j][0], G[j][1], { stroke: gi ? P.plum : P.sky, sw: 1.5, cls: 'a-draw', delay: 1.4 }); G.forEach(p => { s += V.circle(p[0], p[1], 7, { fill: gi ? P.plum : P.sky, cls: 'a-pop', delay: 1.4 }); }); });
        s += V.line(298, 115, B[1][0], B[1][1], { stroke: P.teal, sw: 3, cls: 'a-draw', delay: 2.2 }) + V.line(298, 115, C[2][0], C[2][1], { stroke: P.teal, sw: 3, cls: 'a-draw', delay: 2.2 });
        s += V.circle(298, 115, 11, { fill: P.teal, cls: 'a-pop', delay: 2.4 });
        s += V.text(298, 200, 'Robert', { size: 15, bold: true, fill: P.teal, cls: 'a-fade', delay: 2.6 }) + V.text(298, 220, de(l) ? 'überbrückt Löcher' : 'bridges holes', { size: 12, fill: P.muted, cls: 'a-fade', delay: 2.8 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: { en: '<b>Social diversity is only a proxy for mental diversity.</b> Norway’s 40 percent board quota brought in women from the same schools and networks; the frames around the table barely changed.', de: '<b>Soziale Vielfalt ist nur ein Stellvertreter für mentale Vielfalt.</b> Norwegens 40-Prozent-Quote holte Frauen aus denselben Schulen und Netzwerken in die Boards; die Frames am Tisch änderten sich kaum.' },
      svg: (l) => {
        let s = V.text(100, 36, de(l) ? 'vorher' : 'before', { size: 14, bold: true, cls: 'a-fade' }) + V.text(300, 36, de(l) ? 'nachher' : 'after', { size: 14, bold: true, cls: 'a-fade', delay: 1 });
        s += V.line(200, 25, 200, 190, { stroke: P.line, sw: 2 });
        const row = (x0, plumIdx, d) => [0, 1, 2, 3, 4].map(i => {
          const x = x0 + i * 32; const c = plumIdx.includes(i) ? P.plum : P.ink;
          return V.rect(x - 7, 62, 14, 14, { fill: 'none', stroke: P.coral, sw: 2.5, r: 2, cls: 'a-pop', delay: d + .9 }) + V.person(x, 140, { color: c, scale: .85, cls: 'a-pop', delay: d + i * .1 });
        }).join('');
        s += row(36, [], .2) + row(236, [1, 3], 1.2);
        s += V.text(200, 222, de(l) ? 'Neue Gesichter, gleiche Frames' : 'New faces, same frames', { size: 15, bold: true, cls: 'a-rise', delay: 2.6 });
        s += V.text(200, 245, de(l) ? 'gleiche Schulen, gleiche Netzwerke' : 'same schools, same networks', { size: 12, fill: P.muted, cls: 'a-fade', delay: 3 });
        return V.wrap(s);
      } },

    { duration: 7500,
      caption: { en: '<b>Think alone first, then together.</b> Diverse teams that discuss from minute one converge too early; members who frame the problem on their own first bring their different frames into the debate.', de: '<b>Erst allein denken, dann gemeinsam.</b> Vielfältige Teams, die ab Minute eins diskutieren, einigen sich zu früh; wer das Problem erst allein framt, bringt den eigenen Frame in die Debatte ein.' },
      svg: (l) => {
        const cols = [P.coral, P.teal, P.plum, P.amber];
        let s = V.text(20, 36, de(l) ? 'sofort gemeinsam' : 'together at once', { size: 13, bold: true, anchor: 'start', cls: 'a-fade' });
        [56, 70, 84, 98].forEach((y, i) => { s += V.path(`M30,${y} C70,${y} 90,80 125,80`, { stroke: cols[i], sw: 2.5, cls: 'a-draw', delay: .2 }); });
        s += V.line(125, 80, 360, 80, { stroke: P.muted, sw: 3, cls: 'a-draw', delay: .8 }) + V.circle(365, 80, 7, { fill: P.muted, cls: 'a-pop', delay: 1.3 });
        s += V.text(250, 66, de(l) ? 'früher Konsens' : 'early consensus', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1.2 });
        s += V.line(15, 120, 385, 120, { stroke: P.line, sw: 1.5 });
        s += V.text(20, 146, de(l) ? 'erst allein, dann gemeinsam' : 'alone first, then together', { size: 13, bold: true, anchor: 'start', cls: 'a-fade', delay: 1.8 });
        [[165, 160], [180, 190], [195, 215], [210, 240]].forEach(([y0, y1], i) => {
          s += V.path(`M30,${y0} C90,${y0} 120,${y1} 190,${y1}`, { stroke: cols[i], sw: 2.5, cls: 'a-draw', delay: 2 }) + V.circle(195, y1, 6, { fill: cols[i], cls: 'a-pop', delay: 2.6 + i * .1 }) +
            V.path(`M201,${y1} C250,${y1} 270,200 310,200`, { stroke: cols[i], sw: 2, dash: '5 4', cls: 'a-draw', delay: 3 });
        });
        s += V.bulb(345, 196, { cls: 'a-pop', delay: 3.6 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: { en: '<b>Climbing from one spot finds a peak, not the highest one.</b> Scott Page’s image: others start elsewhere and climb differently, so diversity raises the odds that someone reaches the global optimum.', de: '<b>Wer von einem Punkt aus klettert, findet einen Gipfel, nicht den höchsten.</b> Scott Pages Bild: Andere starten woanders und klettern anders, darum erhöht Vielfalt die Chance, dass jemand das globale Optimum erreicht.' },
      svg: (l) => {
        let s = V.path('M10,230 L60,170 L85,190 L110,125 L140,180 L180,150 L210,190 L290,50 L330,140 L360,118 L390,230 Z', { fill: P.paper, stroke: P.ink, sw: 2, cls: 'a-fade' });
        s += V.person(110, 122, { color: P.coral, scale: .6, cls: 'a-pop', delay: .6 });
        s += V.text(110, 92, de(l) ? 'lokales Optimum' : 'local optimum', { size: 12, bold: true, fill: P.coral, cls: 'a-fade', delay: .9 });
        s += V.path('M222,212 L232,195 L296,72', { stroke: P.teal, sw: 2.5, dash: '6 5', cls: 'a-draw', delay: 1.6 });
        s += V.path('M372,212 L358,140 L336,150 L300,70', { stroke: P.teal, sw: 2.5, dash: '6 5', cls: 'a-draw', delay: 2 });
        s += V.circle(222, 214, 5, { fill: P.teal, cls: 'a-pop', delay: 1.5 }) + V.circle(372, 214, 5, { fill: P.teal, cls: 'a-pop', delay: 1.9 });
        s += V.text(290, 42, '★', { size: 22, fill: P.teal, cls: 'a-pop', delay: 2.6 });
        s += V.text(290, 20, de(l) ? 'globales Optimum' : 'global optimum', { size: 12, bold: true, fill: P.teal, cls: 'a-fade', delay: 2.8 });
        s += V.text(200, 252, de(l) ? 'Vielfalt = mehr Startpunkte' : 'Diversity = more starting points', { size: 13, bold: true, cls: 'a-rise', delay: 3.2 });
        return V.wrap(s);
      } },

    { duration: 7500,
      caption: { en: '<b>Dissent needs a role, or it gets ignored like Cassandra.</b> Duke Leopold’s jester asked the question none of the generals had: how do we get out again?', de: '<b>Widerspruch braucht eine Rolle, sonst wird er überhört wie Kassandra.</b> Der Narr von Herzog Leopold stellte die Frage, die keiner der Generäle gestellt hatte: Wie kommen wir wieder heraus?' },
      svg: (l) => {
        let s = [70, 115, 160, 205].map((x, i) => V.person(x, 150, { color: P.ink, scale: .9, cls: 'a-fade', delay: i * .1 })).join('');
        s += V.rect(40, 150, 200, 34, { fill: P.line, stroke: P.ink, r: 6, cls: 'a-fade' });
        s += V.text(140, 210, de(l) ? 'Generäle: Wie rein?' : 'Generals: how to get in?', { size: 12, fill: P.muted, cls: 'a-fade', delay: .6 });
        s += V.group(V.person(320, 170, { color: P.amber, scale: 1 }) +
          `<path d="M308,137 L302,124 L313,132 L320,118 L327,132 L338,124 L332,137 Z" fill="${P.plum}" stroke="${P.ink}" stroke-width="1"/>`, { cls: 'a-pop', delay: 1.2 });
        s += V.group(V.rect(215, 30, 175, 56, { fill: P.paper, stroke: P.amber, sw: 2.5, r: 12 }) + V.path('M318,86 L322,108 L334,86', { fill: P.paper, stroke: P.amber, sw: 2.5 }) +
          V.text(302, 54, de(l) ? 'Und wie kommen' : 'And how do we', { size: 13, bold: true }) + V.text(302, 72, de(l) ? 'wir wieder raus?' : 'get out again?', { size: 13, bold: true }), { cls: 'a-rise', delay: 1.8 });
        s += V.text(200, 245, de(l) ? 'Widerspruch mit Mandat' : 'Dissent with a mandate', { size: 15, bold: true, cls: 'a-rise', delay: 2.8 });
        return V.wrap(s);
      } },
  ];

  /* ---------- custom exercise: the mutilated checkerboard ---------- */
  function renderBoard(host, ctx) {
    const { lang, el, htmlEl, done } = ctx; const l = de(lang);
    const S = 29, X0 = 12, Y0 = 14;
    const removed = (r, c) => (r === 0 && c === 0) || (r === 7 && c === 7);
    const key = (r, c) => r + ',' + c;
    let dominos = [], occ = {}, sel = null, revealed = false, placedEver = 0;
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
      placedEver += dominos.length; draw();
    }
    function handle(r, c) {
      if (removed(r, c)) return;
      const k = key(r, c);
      if (occ[k] !== undefined) { dominos.splice(occ[k], 1); rebuild(); sel = null; }
      else if (sel === null) sel = k;
      else if (sel === k) sel = null;
      else if (adj(sel, k)) { dominos.push([sel, k]); rebuild(); sel = null; placedEver++; }
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
      s += V.text(px, 40, l ? 'Dominos' : 'Dominoes', { size: 13, bold: true, fill: P.muted }) + V.text(px, 68, `${n} / 31`, { size: 22, bold: true, fill: P.teal });
      s += V.text(px, 100, l ? 'freie Felder' : 'free squares', { size: 13, bold: true, fill: P.muted }) + V.text(px, 128, String(62 - 2 * n), { size: 22, bold: true });
      if (revealed) {
        s += V.rect(266, 148, 116, 96, { fill: P.paper, stroke: P.coral, sw: 2, r: 10 });
        s += `<rect x="278" y="160" width="16" height="16" fill="${P.paper}" stroke="${P.ink}" stroke-width="1.5"/>` + V.text(302, 173, (l ? 'hell: ' : 'light: ') + (30 - n), { size: 13, bold: true, anchor: 'start' });
        s += `<rect x="278" y="186" width="16" height="16" fill="${P.ink}"/>` + V.text(302, 199, (l ? 'dunkel: ' : 'dark: ') + (32 - n), { size: 13, bold: true, anchor: 'start' });
        s += V.text(324, 230, l ? 'Differenz: immer 2' : 'Gap: always 2', { size: 13, bold: true, fill: P.coral });
      }
      fig.innerHTML = V.wrap(s);
      if (revealed) {
        msg.className = 'ex-result good';
        msg.innerHTML = l
          ? `Jeder Domino liegt auf zwei Nachbarfeldern, und Nachbarfelder haben immer verschiedene Farben. Jeder Stein nimmt also genau ein helles und ein dunkles Feld weg. Beide entfernten Ecken sind hell: Es bleiben 30 helle und 32 dunkle Felder. Egal, wie du legst, am Ende bleiben mindestens zwei dunkle Felder übrig. Der Beweis braucht keinen einzigen Versuch, nur einen anderen Frame: <strong>zählen statt probieren</strong>. Kaplan und Simon fanden, dass Teilnehmende schneller darauf kamen, wenn die Farben sprachlich hervorgehoben wurden. Hinweise auf den richtigen Frame helfen, mehr Fleiß im falschen nicht.`
          : `Every domino sits on two neighbouring squares, and neighbours always differ in colour. So each piece removes exactly one light and one dark square. Both missing corners are light: 30 light and 32 dark squares remain. However you place them, at least two dark squares are left over. The proof needs not a single attempt, only another frame: <strong>count instead of try</strong>. Kaplan and Simon found that participants got there faster when the colours were made verbally salient. Cues toward the right frame help; more diligence inside the wrong one does not.`;
      } else if (n > 0 && stuck()) {
        msg.className = 'ex-result';
        msg.textContent = l ? `Kein Platz mehr für einen weiteren Stein, ${62 - 2 * n} Felder bleiben frei. Nochmal probieren oder den Frame wechseln?` : `No room for another piece, ${62 - 2 * n} squares remain. Try again, or switch the frame?`;
      } else {
        msg.className = 'ex-result';
        msg.textContent = l ? 'Tippe ein Feld an, dann ein angrenzendes: Ein Domino entsteht. Tippe auf einen Domino, um ihn zu entfernen.' : 'Tap a square, then a neighbouring one: a domino appears. Tap a domino to remove it.';
      }
    }
    fig.addEventListener('click', (e) => { const t = e.target.closest('[data-k]'); if (!t) return; const [r, c] = t.getAttribute('data-k').split(',').map(Number); handle(r, c); });
    const bRand = el('button', { class: 'btn secondary small', onclick: randomFill }, l ? 'Zufallsversuch' : 'Random attempt');
    const bClear = el('button', { class: 'btn secondary small', onclick: () => { dominos = []; occ = {}; sel = null; draw(); } }, l ? 'Brett leeren' : 'Clear board');
    const bReveal = el('button', { class: 'btn accent small', onclick: () => { revealed = true; draw(); done(); } }, l ? 'Frame wechseln' : 'Switch the frame');
    host.append(fig, el('div', { class: 'btnrow' }, bRand, bClear, bReveal), msg);
    draw();
  }

  /* ---------- register ---------- */
  window.FRAMERS.register({
    id: 'u07', number: 7, kind: 'chapter', color: '#17A398', minutes: 30,
    title: { en: 'Learning', de: 'Lernen' },
    tagline: { en: 'Choosing a frame cannot be practised like a routine; what helps is a wide, varied stock of frames, in your head and in your organisation.', de: 'Einen Frame zu wählen lässt sich nicht wie eine Routine üben; was hilft, ist ein breiter, verschiedenartiger Vorrat an Frames, im eigenen Kopf und in der Organisation.' },
    icon: (c) => `<svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="17" fill="none" stroke="${c}" stroke-width="2.5"/><circle cx="22" cy="22" r="10" fill="none" stroke="${c}" stroke-width="2.5"/><circle cx="22" cy="22" r="4" fill="${c}"/></svg>`,
    hook: {
      en: '<p>Remove two opposite corners from a checkerboard and ask whether 31 dominoes can cover the remaining 62 squares. One participant in a 1980s experiment spent eighteen hours and 61 notebook pages trying. The answer takes ten seconds once you stop placing and start counting colours.</p><p>That is the chapter’s problem in miniature: the effort that makes you better inside a frame does nothing for finding the right one. So what does?</p>',
      de: '<p>Nimm einem Schachbrett zwei gegenüberliegende Ecken weg und frag, ob 31 Dominosteine die übrigen 62 Felder bedecken können. Eine Person in einem Experiment der 1980er-Jahre probierte es achtzehn Stunden lang und füllte 61 Notizbuchseiten. Die Antwort dauert zehn Sekunden, sobald du aufhörst zu legen und anfängst, Farben zu zählen.</p><p>Das ist das Problem des Kapitels im Kleinen: Der Fleiß, der dich innerhalb eines Frames besser macht, hilft nicht dabei, den richtigen zu finden. Was dann?</p>'
    },
    objectives: [
      { en: 'Explain why choosing a frame behaves like an insight problem and why variation of frames matters more than their number.', de: 'Erklären, warum die Wahl eines Frames wie ein Einsichtsproblem funktioniert und warum die Verschiedenheit von Frames mehr zählt als ihre Zahl.' },
      { en: 'Distinguish the three individual strategies (repertoire, cognitive foraging, clean slate) and say what kind of situation each prepares you for.', de: 'Die drei individuellen Strategien (Repertoire, Cognitive Foraging, Clean Slate) unterscheiden und sagen, auf welche Art von Lage jede vorbereitet.' },
      { en: 'Design team settings that turn social diversity into actual mental diversity, and judge the evidence behind these recommendations critically.', de: 'Team-Settings so gestalten, dass aus sozialer Vielfalt tatsächlich mentale Vielfalt wird, und die Belege hinter diesen Empfehlungen kritisch beurteilen.' },
    ],
    film: { title: { en: 'From seven hundred hammers to the court jester', de: 'Von siebenhundert Hämmern zum Hofnarren' }, scenes },
    sections: [
      { id: 's1', heading: { en: 'Choosing a frame is an insight problem', de: 'Einen Frame wählen ist ein Einsichtsproblem' },
        body: {
          en: '<p>Earlier chapters showed how we <em>apply</em> a frame: causality, counterfactuals and constraints shrink the search space to a few good options. That is a process. It is efficient, it rewards practice, and it gets better with experience.</p><p><em>Choosing</em> a frame works differently. Psychologists call tasks like the mutilated checkerboard <strong>insight problems</strong>: they can only be solved by switching to a less obvious representation. Herbert Simon and Craig Kaplan saw that nearly everyone began with trial and error, and persistence did not help. Progress was binary: nothing, nothing, then the parity idea, and the problem was gone. For this kind of learning there are no signposts and “try, fail, try again” does not raise your odds much. The authors conclude that what is needed is less a method than a mind-set: being primed to see a situation from several vantage points.</p><p>The resource for that mind-set is <strong>variation, not volume</strong>. Seven very different ideas are worth more than seven hundred similar ones. Economist Susan Pozo found that US citizens born abroad earn a premium over native-born citizens, larger in managerial and professional jobs; the authors read it as a return on having grown up with two sets of tools.</p>',
          de: '<p>Die vorigen Kapitel zeigten, wie wir einen Frame <em>anwenden</em>: Kausalität, Kontrafaktisches und Constraints, also Begrenzungen, verkleinern den Suchraum auf wenige gute Optionen. Das ist ein Prozess. Er ist effizient, belohnt Übung und wird mit Erfahrung besser.</p><p>Einen Frame <em>wählen</em> funktioniert anders. Die Psychologie nennt Aufgaben wie das verstümmelte Schachbrett <strong>Einsichtsprobleme</strong>: Sie lassen sich nur lösen, indem man zu einer weniger naheliegenden Darstellung wechselt. Herbert Simon und Craig Kaplan beobachteten, dass fast alle mit Ausprobieren begannen und Ausdauer nicht half. Fortschritt war binär: nichts, nichts, dann die Idee mit den Farben, und das Problem war weg. Für diese Art des Lernens gibt es keine Wegweiser, und „versuchen, scheitern, nochmal“ erhöht die Chancen kaum. Die Autoren folgern, dass es weniger eine Methode braucht als eine Haltung: die Bereitschaft, eine Lage aus mehreren Blickwinkeln zu sehen.</p><p>Der Rohstoff dafür ist <strong>Variation, nicht Volumen</strong>. Sieben sehr verschiedene Ideen sind mehr wert als siebenhundert ähnliche. Die Ökonomin Susan Pozo fand, dass im Ausland geborene US-Bürgerinnen und -Bürger mehr verdienen als im Inland geborene, besonders in Management- und Fachberufen; die Autoren lesen das als Rendite daraus, mit zwei Werkzeugsätzen aufgewachsen zu sein.</p>'
        },
        visual: { caption: { en: 'Applying a frame improves with each attempt. Choosing a frame stays flat until the switch, then jumps. Practice moves the first curve, not the second.', de: 'Einen Frame anwenden wird mit jedem Versuch besser. Einen Frame wählen bleibt flach bis zum Wechsel und springt dann. Übung bewegt die erste Kurve, nicht die zweite.' },
          svg: (l) => V.wrap(
            V.line(50, 25, 50, 205, { stroke: P.ink }) + V.line(50, 205, 375, 205, { stroke: P.ink }) +
            V.text(212, 232, de(l) ? 'Versuche' : 'Attempts', { size: 13, bold: true }) +
            `<text x="22" y="115" text-anchor="middle" font-size="13" font-weight="700" fill="${P.ink}" transform="rotate(-90 22 115)">${de(l) ? 'Fortschritt' : 'Progress'}</text>` +
            V.path('M50,200 C110,120 200,85 365,70', { stroke: P.coral, sw: 3.5, cls: 'a-draw' }) +
            V.path('M50,198 L250,198 L250,45 L365,45', { stroke: P.teal, sw: 3.5, cls: 'a-draw', delay: 1 }) +
            V.text(150, 82, de(l) ? 'anwenden: stetig' : 'applying: gradual', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: .8 }) +
            V.text(310, 33, de(l) ? 'wählen: Sprung' : 'choosing: a jump', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: 1.8 }) +
            V.text(150, 188, de(l) ? 'lange nichts' : 'long nothing', { size: 12, fill: P.teal, cls: 'a-fade', delay: 1.5 })), position: 'bottom' },
        keyIdea: { en: 'You cannot grind your way to a better frame. You can only stock up on different ones before you need them.', de: 'Zu einem besseren Frame kannst du dich nicht durchackern. Du kannst nur verschiedene vorrätig haben, bevor du sie brauchst.' } },

      { id: 's2', heading: { en: 'Three strategies for a wider stock of frames', de: 'Drei Strategien für einen breiteren Vorrat an Frames' },
        body: {
          en: '<p><strong>1. Expand the repertoire.</strong> Look at how others framed a problem and keep the frame. Business-school cases do this on a second level: each case trains thinking inside a frame and also deposits a frame for later. Harvard’s first case in 1921, about workers leaving their machines early to beat the wash-up queue, asked how management should investigate before asking what to do. The limit is size: a few hundred cases can suggest they cover the world. Wallace Donham, the dean who introduced the method, worried in 1933 that it produced leaders unable to see things in wide relations.</p><p><strong>2. Cognitive foraging.</strong> Collect ways of seeing without a concrete purpose: other fields, other people, other places. Sociologist Ronald Burt contrasts “James”, whose network is closed and redundant, with “Robert”, who bridges <strong>structural holes</strong> between groups. Roberts are more creative and rise faster, because when a need arises they can reach for frames far beyond their own.</p><p><strong>3. Clean slate.</strong> Train the readiness to put the toolbox aside. Alan Kay, who conceived object-oriented programming at Xerox PARC while the field thought procedurally, warned against the “tyranny of the present”.</p><p>The three produce <strong>tensions between frames</strong> (light as wave and particle, Euclid’s and Descartes’ geometry). The authors say: do not resolve them; holding them is cognitive complexity. Lewis Branscomb’s rule applies: “tell me what I don’t yet know.”</p>',
          de: '<p><strong>1. Das Repertoire erweitern.</strong> Schau, wie andere ein Problem geframt haben, und behalte den Frame. Fallstudien an Business Schools tun das auf einer zweiten Ebene: Jeder Fall trainiert das Denken innerhalb eines Frames und legt zugleich einen Frame für später ab. Harvards erster Fall von 1921, über Arbeiter, die ihre Maschinen früh verließen, um der Schlange am Waschraum zu entgehen, fragte zuerst, wie das Management die Lage untersuchen sollte, und erst dann, was zu tun sei. Die Grenze ist die Menge: Ein paar Hundert Fälle können suggerieren, sie deckten die Welt ab. Wallace Donham, der Dekan, der die Methode einführte, sorgte sich schon 1933, sie bringe Führungskräfte hervor, die Dinge nicht in weiten Zusammenhängen sehen.</p><p><strong>2. Cognitive Foraging (kognitives Sammeln).</strong> Sammle Sichtweisen ohne konkreten Zweck: andere Fächer, andere Menschen, andere Orte. Der Soziologe Ronald Burt stellt „James“, dessen Netzwerk geschlossen und redundant ist, „Robert“ gegenüber, der <strong>strukturelle Löcher</strong> zwischen Gruppen überbrückt. Roberts sind kreativer und steigen schneller auf, weil sie im Bedarfsfall nach Frames weit jenseits der eigenen greifen können.</p><p><strong>3. Clean Slate.</strong> Übe die Bereitschaft, den Werkzeugkasten beiseitezulegen. Alan Kay, der bei Xerox PARC objektorientiertes Programmieren erdachte, als das Feld noch prozedural dachte, warnte vor der „Tyrannei der Gegenwart“.</p><p>Alle drei erzeugen <strong>Spannungen zwischen Frames</strong> (Licht als Welle und Teilchen, Euklids und Descartes’ Geometrie). Die Autoren sagen: nicht auflösen; sie auszuhalten ist kognitive Komplexität. Es gilt Lewis Branscombs Regel: „Erzähl mir, was ich noch nicht weiß.“</p>'
        },
        visual: { caption: { en: 'The trade-off between the three strategies: the more concrete, the narrower the range of situations it prepares you for.', de: 'Der Trade-off zwischen den drei Strategien: Je konkreter, desto schmaler das Spektrum an Lagen, auf das sie vorbereitet.' },
          svg: (l) => {
            let s = V.line(50, 25, 50, 210, { stroke: P.ink }) + V.line(50, 210, 380, 210, { stroke: P.ink });
            s += V.text(215, 238, de(l) ? 'Reichweite: wie neu darf die Lage sein?' : 'Reach: how new may the situation be?', { size: 12, bold: true });
            s += `<text x="24" y="118" text-anchor="middle" font-size="12" font-weight="700" fill="${P.ink}" transform="rotate(-90 24 118)">${de(l) ? 'Konkretheit' : 'Concreteness'}</text>`;
            const pts = [
              [90, 55, P.teal, 'Repertoire', de(l) ? 'ähnliche Fälle' : 'similar cases', 'start', 0],
              [200, 118, P.sky, 'Foraging', de(l) ? 'unerwartet Neues' : 'unexpected novelty', 'start', .5],
              [330, 180, P.plum, 'Clean Slate', de(l) ? 'radikal Neues' : 'radically new', 'end', 1],
            ];
            pts.forEach(([x, y, c, a, b, anc, d]) => {
              const tx = anc === 'start' ? x + 18 : x - 18;
              s += V.circle(x, y, 11, { fill: c, cls: 'a-pop', delay: d }) + V.text(tx, y - 2, a, { size: 13, bold: true, fill: c, anchor: anc, cls: 'a-fade', delay: d + .2 }) + V.text(tx, y + 15, b, { size: 12, fill: P.muted, anchor: anc, cls: 'a-fade', delay: d + .3 });
            });
            return V.wrap(s);
          }, position: 'bottom' },
        keyIdea: { en: 'Repertoire is a library, foraging is a reading habit, clean slate is the courage to close the book.', de: 'Repertoire ist eine Bibliothek, Foraging eine Lesegewohnheit, Clean Slate der Mut, das Buch zuzuklappen.' } },

      { id: 's3', heading: { en: 'Organisations: from social to mental diversity', de: 'Organisationen: von sozialer zu mentaler Vielfalt' },
        body: {
          en: '<p>Nobody can look into colleagues’ heads, so organisations use a <strong>proxy</strong>: social diversity. Different origins, education and careers make different frames likely. Likely, not certain. Norway required 40 percent women on company boards from 2003 on; studies a few years later reported falling firm values in companies that had to change most. The authors offer several explanations, the deepest being that the new directors came from the same schools, firms and circles as the men. The faces changed, the frames did not.</p><p>The proxy also fails because of how groups work. A study in <em>Science</em> found that teams with more women performed better, but the driver was social sensitivity, not gender. And research shows that even diverse teams rush to consensus when they discuss from the outset. The remedy is simple: <strong>everyone frames the problem alone first</strong>, then the group debates. Further ground rules: roughly equal speaking time and decisions by majority. Apple reaches the same effect differently, according to Joel Podolny: its managers are domain experts with strong, divergent views who are expected to argue across functions instead of nodding through.</p><p>Beyond the boundary, open innovation brings outside frames in. Lego’s fan platform, started on the Japanese site Cuusoo, produced sets its own designers had not imagined.</p>',
          de: '<p>Niemand kann in die Köpfe der Kolleginnen und Kollegen schauen, also nutzen Organisationen einen <strong>Stellvertreter</strong>: soziale Vielfalt. Unterschiedliche Herkunft, Ausbildung und Laufbahn machen unterschiedliche Frames wahrscheinlich. Wahrscheinlich, nicht sicher. Norwegen schrieb ab 2003 einen Frauenanteil von 40 Prozent in Aufsichtsgremien vor; Studien einige Jahre später berichteten von sinkendem Unternehmenswert bei den Firmen, die sich am stärksten ändern mussten. Die Autoren bieten mehrere Erklärungen an, die tiefste: Die neuen Mitglieder kamen aus denselben Schulen, Firmen und Kreisen wie die Männer. Die Gesichter änderten sich, die Frames nicht.</p><p>Der Stellvertreter scheitert auch daran, wie Gruppen arbeiten. Eine Studie in <em>Science</em> fand, dass Teams mit mehr Frauen besser abschnitten, treibend war aber soziale Sensibilität, nicht das Geschlecht. Und Forschung zeigt, dass selbst vielfältige Teams zum Konsens eilen, wenn sie von Anfang an gemeinsam diskutieren. Das Gegenmittel ist schlicht: <strong>Alle framen das Problem zuerst allein</strong>, dann debattiert die Gruppe. Weitere Spielregeln: ungefähr gleiche Redezeit und Entscheidung per Mehrheit. Apple erreicht laut Joel Podolny denselben Effekt anders: Die Führungskräfte sind Fachleute ihres Gebiets mit starken, voneinander abweichenden Ansichten, von denen erwartet wird, dass sie über Funktionen hinweg streiten, statt durchzunicken.</p><p>Jenseits der eigenen Grenze holt Open Innovation fremde Frames herein. Legos Fan-Plattform, entstanden auf der japanischen Seite Cuusoo, brachte Sets hervor, die sich die eigenen Designerinnen und Designer nicht ausgedacht hatten.</p>'
        },
        visual: { caption: { en: 'Two leaks between social diversity and better frames: recruitment from the same pool, and premature consensus in the room.', de: 'Zwei Lecks zwischen sozialer Vielfalt und besseren Frames: Rekrutierung aus demselben Pool und vorschneller Konsens im Raum.' },
          svg: (l) => {
            const box = (x, a, b, c, d) => V.group(V.rect(x, 50, 110, 56, { fill: P.paper, stroke: c, sw: 2.5, r: 10 }) + V.text(x + 55, 74, a, { size: 13, bold: true }) + V.text(x + 55, 92, b, { size: 13, bold: true }), { cls: 'a-pop', delay: d });
            let s = box(10, de(l) ? 'soziale' : 'social', de(l) ? 'Vielfalt' : 'diversity', P.muted, 0) + box(145, de(l) ? 'mentale' : 'mental', de(l) ? 'Vielfalt' : 'diversity', P.teal, .8) + box(280, de(l) ? 'bessere' : 'better', 'Frames', P.ok, 1.6);
            s += V.arrow(122, 78, 143, 78, { color: 'ink', cls: 'a-draw', delay: .5 }) + V.arrow(257, 78, 278, 78, { color: 'ink', cls: 'a-draw', delay: 1.3 });
            s += V.text(132, 36, 'Proxy', { size: 12, bold: true, fill: P.muted, cls: 'a-fade', delay: .5 }) + V.text(268, 36, de(l) ? 'Regeln' : 'rules', { size: 12, bold: true, fill: P.muted, cls: 'a-fade', delay: 1.3 });
            s += V.line(132, 100, 132, 140, { stroke: P.coral, sw: 2, dash: '4 4', cls: 'a-draw', delay: 2 }) + V.line(268, 100, 268, 140, { stroke: P.coral, sw: 2, dash: '4 4', cls: 'a-draw', delay: 2.4 });
            s += V.group(V.rect(55, 145, 150, 64, { fill: P.paper, stroke: P.coral, sw: 2, r: 10 }) + V.text(130, 168, de(l) ? 'gleiche Schulen,' : 'same schools,', { size: 12, bold: true, fill: P.coral }) + V.text(130, 186, de(l) ? 'gleiche Netzwerke' : 'same networks', { size: 12, bold: true, fill: P.coral }) + V.text(130, 202, de(l) ? '(Norwegen)' : '(Norway)', { size: 12, fill: P.muted }), { cls: 'a-rise', delay: 2.2 });
            s += V.group(V.rect(215, 145, 150, 64, { fill: P.paper, stroke: P.coral, sw: 2, r: 10 }) + V.text(290, 168, de(l) ? 'sofort gemeinsam,' : 'together at once,', { size: 12, bold: true, fill: P.coral }) + V.text(290, 186, de(l) ? 'früher Konsens' : 'early consensus', { size: 12, bold: true, fill: P.coral }) + V.text(290, 202, de(l) ? '(Gruppendynamik)' : '(group dynamics)', { size: 12, fill: P.muted }), { cls: 'a-rise', delay: 2.6 });
            s += V.text(200, 240, de(l) ? 'Gegenmittel: erst allein, gleiche Redezeit' : 'Remedy: alone first, equal airtime', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: 3.2 });
            return V.wrap(s);
          }, position: 'bottom' },
        keyIdea: { en: 'Diversity you hire is potential. Diversity you hear is what changes decisions, and it depends on the rules of the meeting.', de: 'Eingestellte Vielfalt ist Potenzial. Gehörte Vielfalt verändert Entscheidungen, und sie hängt an den Spielregeln des Meetings.' } },

      { id: 's4', heading: { en: 'Cassandras, red teams and fools: institutionalised dissent', de: 'Kassandren, Red Teams und Narren: institutionalisierter Widerspruch' },
        body: {
          en: '<p>Why put up with the friction of diversity? Scott Page’s mountain range answers it. From where you stand, you can always see which way is up, so you reach a peak, but rarely the highest. Under time and budget pressure most people stop at the first good hill. People with other frames start elsewhere and climb differently, so the group is more likely to find the global optimum.</p><p>The catch: the people who see a different peak usually say something the organisation does not want to hear. In myth, Cassandra could foresee the fall of Troy but was never believed. Intel’s Andy Grove devoted a chapter to “helpful Cassandras”. Pixar’s Ed Catmull turns the myth around: the real curse lies on everyone who cannot hear her.</p><p>Hence dissent needs a <strong>role</strong>. Britain’s “loyal opposition” fights about policy while sharing the goal. Red teams attack their own organisation’s plans. The court jester could tell the king the truth in jest: Leopold of Austria’s fool asked his generals how they planned to get out of Switzerland again; Triboulet suggested to King Francis that he hang a would-be murderer before the deed rather than after. Research for NASA on long missions even recommends a jester-type crew member.</p><p>Failure is possible even with good intent. The <em>New York Times</em> hired Bari Weiss to widen its opinion pages; colleagues attacked her publicly, the editor who hired her was pushed out, and she resigned in 2020. Hiring a different voice without protecting it is not institutionalised dissent.</p>',
          de: '<p>Warum die Reibung der Vielfalt aushalten? Scott Pages Gebirge beantwortet das. Von deinem Standort aus siehst du immer, wo es bergauf geht, also erreichst du einen Gipfel, aber selten den höchsten. Unter Zeit- und Budgetdruck bleiben die meisten auf dem ersten guten Hügel stehen. Menschen mit anderen Frames starten woanders und klettern anders, darum findet die Gruppe eher das globale Optimum.</p><p>Der Haken: Wer einen anderen Gipfel sieht, sagt meist etwas, das die Organisation nicht hören will. Im Mythos sah Kassandra den Fall Trojas voraus, aber niemand glaubte ihr. Intel-Mitgründer Andy Grove widmete den „hilfreichen Kassandren“ ein ganzes Kapitel. Pixar-Mitgründer Ed Catmull dreht den Mythos um: Der eigentliche Fluch liegt auf allen, die sie nicht hören können.</p><p>Darum braucht Widerspruch eine <strong>Rolle</strong>. Die britische „loyale Opposition“ streitet über Politik und teilt doch das Ziel. Red Teams greifen die Pläne der eigenen Organisation an. Der Hofnarr durfte dem König im Scherz die Wahrheit sagen: Der Narr Leopolds von Österreich fragte die Generäle, wie sie aus der Schweiz wieder herauskommen wollten; Triboulet schlug König Franz vor, einen möglichen Mörder lieber vor der Tat zu hängen als danach. Forschung für die NASA zu Langzeitmissionen empfiehlt sogar ein Crewmitglied mit Narrenpersönlichkeit.</p><p>Scheitern ist auch mit guten Absichten möglich. Die <em>New York Times</em> holte Bari Weiss, um ihre Meinungsseiten zu verbreitern; Kolleginnen und Kollegen griffen sie öffentlich an, der Ressortleiter, der sie geholt hatte, musste gehen, und sie kündigte 2020. Eine andere Stimme einzustellen, ohne sie zu schützen, ist kein institutionalisierter Widerspruch.</p>'
        },
        visual: { caption: { en: 'Two questions decide whether a dissenting frame has an effect: does it have a legitimate role, and is it actually heard?', de: 'Zwei Fragen entscheiden, ob ein abweichender Frame wirkt: Hat er eine legitime Rolle, und wird er tatsächlich gehört?' },
          svg: (l) => {
            let s = V.line(215, 30, 215, 220, { stroke: P.ink }) + V.line(40, 125, 390, 125, { stroke: P.ink });
            s += V.text(127, 245, de(l) ? 'ohne Rolle' : 'no role', { size: 12, bold: true, fill: P.muted }) + V.text(302, 245, de(l) ? 'mit Rolle' : 'with a role', { size: 12, bold: true, fill: P.muted });
            s += `<text x="22" y="78" text-anchor="middle" font-size="12" font-weight="700" fill="${P.muted}" transform="rotate(-90 22 78)">${de(l) ? 'gehört' : 'heard'}</text>`;
            s += `<text x="22" y="172" text-anchor="middle" font-size="12" font-weight="700" fill="${P.muted}" transform="rotate(-90 22 172)">${de(l) ? 'überhört' : 'ignored'}</text>`;
            const q = (x, y, a, b, c, d) => V.group(V.text(x, y, a, { size: 13, bold: true, fill: c }) + V.text(x, y + 18, b, { size: 12, fill: P.ink }), { cls: 'a-pop', delay: d });
            s += q(127, 70, de(l) ? 'hilfreiche Kassandra' : 'helpful Cassandra', '(Grove, Catmull)', P.teal, .6);
            s += q(302, 62, 'Red Team,', de(l) ? 'loyale Opposition, Narr' : 'loyal opposition, jester', P.ok, 1.2);
            s += q(127, 170, de(l) ? 'Kassandra' : 'Cassandra', de(l) ? '(Troja)' : '(Troy)', P.bad, 0);
            s += q(302, 162, de(l) ? 'geholt, ungeschützt' : 'hired, unprotected', '(NYT, Bari Weiss)', P.coral, 1.8);
            return V.wrap(s);
          }, position: 'bottom' },
        keyIdea: { en: 'The curse is not on the one who sees differently but on the organisation that cannot hear. Dissent needs a mandate and protection.', de: 'Der Fluch liegt nicht auf der Person, die anders sieht, sondern auf der Organisation, die nicht hören kann. Widerspruch braucht Mandat und Schutz.' } },
    ],
    exercise: {
      type: 'custom',
      title: { en: 'The mutilated checkerboard', de: 'Das verstümmelte Schachbrett' },
      instructions: { en: 'Two light corners are missing; 62 squares remain. Try to cover them with 31 dominoes: tap a square, then a neighbouring one. Use “Random attempt” to let the machine try for you as often as you like. When you have had enough of trial and error, switch the frame and see why no attempt could ever succeed.', de: 'Zwei helle Ecken fehlen, 62 Felder bleiben. Versuch, sie mit 31 Dominosteinen zu bedecken: Tippe ein Feld an, dann ein angrenzendes. Mit „Zufallsversuch“ probiert die Maschine für dich, so oft du willst. Wenn du vom Ausprobieren genug hast, wechsle den Frame und sieh, warum kein Versuch je gelingen kann.' },
      render: renderBoard,
    },
    caseStudy: {
      title: { en: 'Joel Podolny: a sociologist builds frame diversity, first at Yale, then at Apple', de: 'Joel Podolny: Ein Soziologe baut Frame-Vielfalt auf, erst in Yale, dann bei Apple' },
      body: {
        en: '<p>When Joel Podolny became dean of the Yale School of Management in 2005, business education was organised by function: accounting here, marketing there, and the case method that, for all its merits, tends to suggest each problem has one preferred frame. Podolny, a sociologist who studied status in organisations, saw silos as training for functional roles. He replaced classic subjects with interdisciplinary courses named after stakeholders and arenas, such as “State &amp; Society” or “Employee”. Several instructors taught each course together, so students saw experts disagree in front of them. Even the rooms changed: round classrooms with less visible hierarchy.</p><p>In 2008 Steve Jobs, facing the return of his cancer, hired him to build Apple University. The brief: develop executives who hold convictions firmly but can let go of them for a better perspective. Inside a company that is a balancing act: people must share core beliefs and excel in their specialism while cultivating a diversity that creates friction. Under Tim Cook, Apple kept the approach. Podolny later described the managerial profile it relies on: deep domain knowledge, command of detail, and the willingness to debate other functions in collective decisions.</p>',
        de: '<p>Als Joel Podolny 2005 Dekan der Yale School of Management wurde, war die Managementausbildung nach Funktionen sortiert: Rechnungswesen hier, Marketing dort, dazu die Fallmethode, die bei allen Vorzügen nahelegt, jedes Problem habe einen bevorzugten Frame. Podolny, ein Soziologe, der Status in Organisationen erforschte, sah in den Silos ein Training für funktionale Rollen. Er ersetzte klassische Fächer durch interdisziplinäre Kurse, benannt nach Anspruchsgruppen und Arenen, etwa „State &amp; Society“ oder „Employee“. Mehrere Lehrende unterrichteten jeden Kurs gemeinsam, sodass die Studierenden Fachleute vor sich streiten sahen. Sogar die Räume änderten sich: runde Hörsäle mit weniger sichtbarer Hierarchie.</p><p>2008 holte ihn Steve Jobs, dessen Krebserkrankung zurückgekehrt war, zum Aufbau der Apple University. Der Auftrag: Führungskräfte entwickeln, die Überzeugungen fest vertreten, sie aber für eine bessere Perspektive loslassen können. In einem Unternehmen ist das ein Balanceakt: Die Leute sollen Grundüberzeugungen teilen und in ihrem Fach glänzen und zugleich eine Vielfalt pflegen, die Reibung erzeugt. Unter Tim Cook behielt Apple den Ansatz bei. Podolny beschrieb später das Führungsprofil, auf das Apple setzt: tiefes Fachwissen, Beherrschung der Details und die Bereitschaft, in gemeinsamen Entscheidungen mit anderen Funktionen zu streiten.</p>'
      },
      lesson: { en: 'Podolny redesigned the conditions, not the content: who teaches together, how the room is shaped, what kind of manager is hired. Frame diversity is an architecture decision before it is a training topic.', de: 'Podolny gestaltete die Bedingungen um, nicht die Inhalte: wer gemeinsam lehrt, wie der Raum geformt ist, welche Art Führungskraft eingestellt wird. Frame-Vielfalt ist eine Architekturentscheidung, bevor sie ein Trainingsthema ist.' },
    },
    reflection: {
      intro: { en: 'Take stock of your own frame supply and the settings you shape. Write briefly and concretely.', de: 'Mach Inventur deines eigenen Frame-Vorrats und der Settings, die du gestaltest. Schreib kurz und konkret.' },
      prompts: [
        { en: 'Name three frames you use often at work. How different are they really, or are they seven hundred hammers in different colours?', de: 'Nenne drei Frames, die du bei der Arbeit oft nutzt. Wie verschieden sind sie wirklich, oder sind es siebenhundert Hämmer in verschiedenen Farben?' },
        { en: 'Draw your network roughly. Where are you a James, where a Robert? Which structural hole could you bridge in the next three months, and what does it cost you?', de: 'Skizziere grob dein Netzwerk. Wo bist du James, wo Robert? Welches strukturelle Loch könntest du in den nächsten drei Monaten überbrücken, und was kostet es dich?' },
        { en: 'Who is the Cassandra in your current environment? Do you hear them, and what would they need from you to be heard without being turned into the jester?', de: 'Wer ist die Kassandra in deinem aktuellen Umfeld? Hörst du sie, und was bräuchte diese Person von dir, um gehört zu werden, ohne zum Narren gemacht zu werden?' },
      ],
      placeholder: { en: 'My three most-used frames are…', de: 'Meine drei meistgenutzten Frames sind …' },
    },
    quiz: [
      { q: { en: 'A product team has run five workshops with the same format on why a feature is not adopted. Each round produces more detailed versions of the same explanation. What does the chapter suggest?', de: 'Ein Produktteam hat fünf Workshops im gleichen Format dazu gemacht, warum ein Feature nicht genutzt wird. Jede Runde liefert detailliertere Fassungen derselben Erklärung. Was legt das Kapitel nahe?' },
        options: [
          { en: 'A sixth workshop with better facilitation, since frame application improves with practice.', de: 'Einen sechsten Workshop mit besserer Moderation, weil Frame-Anwendung durch Übung besser wird.' },
          { en: 'Collect more usage data until the explanation becomes statistically robust.', de: 'Mehr Nutzungsdaten sammeln, bis die Erklärung statistisch belastbar ist.' },
          { en: 'Treat it as an insight problem: stop iterating and bring in a different representation of the problem, for example from people outside the team.', de: 'Es als Einsichtsproblem behandeln: aufhören zu iterieren und eine andere Darstellung des Problems hereinholen, etwa von Leuten außerhalb des Teams.' },
          { en: 'Let the most senior person decide to end the loop.', de: 'Die ranghöchste Person entscheiden lassen, um die Schleife zu beenden.' },
        ],
        answer: 2, explain: { en: 'More rounds inside the same frame are the checkerboard brute force. Practice helps applying a frame, not choosing one; the lever is exposure to another representation.', de: 'Mehr Runden im selben Frame sind die Brute-Force-Methode am Schachbrett. Übung hilft beim Anwenden eines Frames, nicht beim Wählen; der Hebel ist der Kontakt mit einer anderen Darstellung.' } },
      { q: { en: 'You can add three people to a strategy team. Which choice best reflects “variation, not volume”?', de: 'Du kannst ein Strategieteam um drei Personen ergänzen. Welche Wahl entspricht am besten „Variation, nicht Volumen“?' },
        options: [
          { en: 'A logistics engineer, a former customer-service lead and an anthropologist who studied your users.', de: 'Ein Logistik-Ingenieur, eine frühere Leiterin des Kundenservice und eine Anthropologin, die eure Nutzenden erforscht hat.' },
          { en: 'Three top-school MBAs of different genders and nationalities who worked at the same consultancy.', de: 'Drei MBA-Absolvierende von Top-Schulen, verschiedenen Geschlechts und verschiedener Nationalität, die bei derselben Beratung gearbeitet haben.' },
          { en: 'Three more strategy analysts, so the team can analyse more scenarios faster.', de: 'Drei weitere Strategie-Analystinnen und -Analysten, damit das Team mehr Szenarien schneller durchrechnen kann.' },
          { en: 'Three people chosen by the team because they fit the culture well.', de: 'Drei Personen, die das Team auswählt, weil sie gut zur Kultur passen.' },
        ],
        answer: 0, explain: { en: 'Option 2 is the Norway trap: social diversity from the same pool. Option 3 adds volume, option 4 adds homophily. Only option 1 adds different tools.', de: 'Option 2 ist die Norwegen-Falle: soziale Vielfalt aus demselben Pool. Option 3 fügt Volumen hinzu, Option 4 Homophilie. Nur Option 1 bringt andere Werkzeuge.' } },
      { q: { en: 'How do the authors mainly explain the disappointing results after Norway’s board quota?', de: 'Wie erklären die Autoren hauptsächlich die enttäuschenden Ergebnisse nach Norwegens Quote für Aufsichtsgremien?' },
        options: [
          { en: 'Women are less suited to board roles in heavy industries.', de: 'Frauen eignen sich in Schwerindustrien weniger für Aufsichtsrollen.' },
          { en: 'Quotas always backfire because they override merit.', de: 'Quoten gehen immer nach hinten los, weil sie Leistung übergehen.' },
          { en: 'The boards became too large to decide efficiently.', de: 'Die Gremien wurden zu groß, um effizient zu entscheiden.' },
          { en: 'Social diversity rose, but the new directors came from the same schools and networks, so mental diversity barely changed.', de: 'Die soziale Vielfalt stieg, aber die neuen Mitglieder kamen aus denselben Schulen und Netzwerken, sodass sich die mentale Vielfalt kaum änderte.' },
        ],
        answer: 3, explain: { en: 'The authors also mention weak firms catching up with reality and sector effects, but their deeper point is the proxy failure. Note that the underlying study is itself contested (see “Question the book”).', de: 'Die Autoren nennen auch schwache Firmen, die von der Realität eingeholt wurden, und Brancheneffekte, ihr tieferer Punkt ist aber das Versagen des Stellvertreters. Beachte, dass die zugrunde liegende Studie selbst umstritten ist (siehe „Das Buch hinterfragen“).' } },
      { q: { en: 'A diverse steering committee keeps agreeing within twenty minutes. Which intervention fits the research the chapter cites?', de: 'Ein vielfältig besetzter Lenkungskreis ist sich regelmäßig nach zwanzig Minuten einig. Welche Intervention passt zur Forschung, die das Kapitel anführt?' },
        options: [
          { en: 'Let the chair present a well-prepared recommendation at the start to save time.', de: 'Die Vorsitzende zu Beginn eine gut vorbereitete Empfehlung präsentieren lassen, um Zeit zu sparen.' },
          { en: 'Ask each member to write down their own framing of the problem before the meeting, then share all of them before any discussion.', de: 'Alle Mitglieder vor dem Termin ihre eigene Sicht auf das Problem aufschreiben lassen und alle Sichten vor jeder Diskussion vorstellen.' },
          { en: 'Add more members so that more perspectives are present.', de: 'Mehr Mitglieder aufnehmen, damit mehr Perspektiven im Raum sind.' },
          { en: 'Require unanimity so that no one is overruled.', de: 'Einstimmigkeit verlangen, damit niemand überstimmt wird.' },
        ],
        answer: 1, explain: { en: 'Discussing from the start lets early speakers anchor everyone else. Individual framing first preserves the diversity the group already has. The chapter favours equal airtime and majority rule, not unanimity, which rewards early convergence.', de: 'Wer von Anfang an diskutiert, lässt die ersten Wortmeldungen alle anderen verankern. Erst allein framen bewahrt die Vielfalt, die die Gruppe schon hat. Das Kapitel empfiehlt gleiche Redezeit und Mehrheitsentscheid, nicht Einstimmigkeit, die frühe Annäherung belohnt.' } },
      { q: { en: 'Which behaviour marks a “Robert” in Ronald Burt’s sense?', de: 'Welches Verhalten kennzeichnet einen „Robert“ im Sinne von Ronald Burt?' },
        options: [
          { en: 'He knows everyone in his department well and is the first to hear internal news.', de: 'Er kennt alle in seiner Abteilung gut und hört interne Neuigkeiten als Erster.' },
          { en: 'He contacts experts in other fields only when he has a concrete problem to solve.', de: 'Er kontaktiert Fachleute anderer Gebiete nur, wenn er ein konkretes Problem lösen muss.' },
          { en: 'He keeps ties to groups that are otherwise unconnected, without an immediate purpose.', de: 'Er pflegt Verbindungen zu Gruppen, die sonst unverbunden sind, ohne unmittelbaren Zweck.' },
          { en: 'He follows rules carefully and optimises the efficiency of his team.', de: 'Er hält Regeln genau ein und optimiert die Effizienz seines Teams.' },
        ],
        answer: 2, explain: { en: 'Options 1 and 4 describe James: a dense, redundant network. Option 2 is targeted repertoire building, not foraging. Robert bridges structural holes because exposure itself is the value.', de: 'Optionen 1 und 4 beschreiben James: ein dichtes, redundantes Netzwerk. Option 2 ist gezielter Repertoire-Aufbau, kein Foraging. Robert überbrückt strukturelle Löcher, weil der Kontakt selbst der Wert ist.' } },
      { q: { en: 'Ed Catmull reverses the Cassandra myth. What follows for a leader?', de: 'Ed Catmull dreht den Kassandra-Mythos um. Was folgt daraus für eine Führungskraft?' },
        options: [
          { en: 'Promote dissenters into leadership so their views prevail.', de: 'Widersprechende in Führungsrollen befördern, damit sich ihre Sicht durchsetzt.' },
          { en: 'Assume most warnings are exaggerated and act only on consensus.', de: 'Davon ausgehen, dass die meisten Warnungen übertrieben sind, und nur bei Konsens handeln.' },
          { en: 'Leave warnings to a red team so individuals need not take the risk.', de: 'Warnungen einem Red Team überlassen, damit Einzelne kein Risiko tragen müssen.' },
          { en: 'Regularly ask which unfamiliar frame you are failing to hear, because the curse lies with those who cannot listen.', de: 'Regelmäßig fragen, welchen fremden Frame man gerade überhört, weil der Fluch bei denen liegt, die nicht zuhören können.' },
        ],
        answer: 3, explain: { en: 'Catmull moves the problem from the messenger to the receivers. Red teams help, but they do not replace a leader’s own habit of asking what is obscured from view.', de: 'Catmull verlagert das Problem von der Überbringerin zu den Empfangenden. Red Teams helfen, ersetzen aber nicht die eigene Gewohnheit einer Führungskraft, zu fragen, was gerade verdeckt ist.' } },
    ],
    flashcards: [
      { front: { en: 'Insight problem', de: 'Einsichtsproblem' }, back: { en: 'A problem solvable only by switching to a less obvious representation (mutilated checkerboard). Persistence within the first frame does not help.', de: 'Ein Problem, das sich nur durch Wechsel zu einer weniger naheliegenden Darstellung lösen lässt (verstümmeltes Schachbrett). Ausdauer im ersten Frame hilft nicht.' } },
      { front: { en: 'Variation, not volume', de: 'Variation, nicht Volumen' }, back: { en: 'Seven different tools beat seven hundred hammers. What matters is how different your frames are, not how many ideas you have absorbed.', de: 'Sieben verschiedene Werkzeuge schlagen siebenhundert Hämmer. Es zählt, wie verschieden deine Frames sind, nicht wie viele Ideen du aufgenommen hast.' } },
      { front: { en: 'The three strategies', de: 'Die drei Strategien' }, back: { en: 'Repertoire (acquire frames others used), cognitive foraging (seek diverse input without purpose), clean slate (readiness to set all known tools aside).', de: 'Repertoire (Frames übernehmen, die andere genutzt haben), Cognitive Foraging (vielfältigen Input ohne Zweck suchen), Clean Slate (Bereitschaft, alle bekannten Werkzeuge beiseitezulegen).' } },
      { front: { en: 'James vs. Robert', de: 'James vs. Robert' }, back: { en: 'Burt’s archetypes: James sits in a closed, redundant network; Robert bridges structural holes between groups and therefore sees more.', de: 'Burts Archetypen: James sitzt in einem geschlossenen, redundanten Netzwerk; Robert überbrückt strukturelle Löcher zwischen Gruppen und sieht deshalb mehr.' } },
      { front: { en: 'Social vs. mental diversity', de: 'Soziale vs. mentale Vielfalt' }, back: { en: 'Social diversity is an observable proxy for mental diversity. Recruiting from the same pool (Norway) or deciding together too early breaks the link.', de: 'Soziale Vielfalt ist ein beobachtbarer Stellvertreter für mentale Vielfalt. Rekrutierung aus demselben Pool (Norwegen) oder zu frühes gemeinsames Entscheiden kappt die Verbindung.' } },
      { front: { en: 'Ground rules for framing in groups', de: 'Spielregeln für Framing in Gruppen' }, back: { en: 'Think alone first, then together; roughly equal speaking time; decide by majority.', de: 'Erst allein denken, dann gemeinsam; ungefähr gleiche Redezeit; per Mehrheit entscheiden.' } },
      { front: { en: 'Local vs. global optimum', de: 'Lokales vs. globales Optimum' }, back: { en: 'Scott Page’s mountain range: climbing from one spot finds a peak, not the highest. Different starting points and climbing styles raise the odds of the global optimum.', de: 'Scott Pages Gebirge: Wer von einem Punkt aus klettert, findet einen Gipfel, nicht den höchsten. Andere Startpunkte und Kletterweisen erhöhen die Chance aufs globale Optimum.' } },
      { front: { en: 'Catmull’s reversal', de: 'Catmulls Umkehrung' }, back: { en: 'The curse is not on Cassandra but on those who cannot hear her. Institutions answer with roles for dissent: loyal opposition, red team, jester.', de: 'Der Fluch liegt nicht auf Kassandra, sondern auf denen, die sie nicht hören können. Institutionen antworten mit Rollen für Widerspruch: loyale Opposition, Red Team, Narr.' } },
    ],
    critique: [
      { claim: { en: 'Norway’s board quota disappointed because the new directors thought like the old ones.', de: 'Norwegens Quote enttäuschte, weil die neuen Mitglieder dachten wie die alten.' },
        challenge: { en: 'The value drop comes from one influential study (Ahern and Dittmar, 2012); later reanalyses, notably Eckbo, Nygaard and Thorburn, found no robust negative effect. The authors stack a cognitive explanation on a contested finding without testing it: nobody measured the directors’ frames. The quip about what was “inside their knickers” is cheap and undercuts a book that asks readers to take other frames seriously.', de: 'Der Wertverlust stammt aus einer einflussreichen Studie (Ahern und Dittmar, 2012); spätere Reanalysen, vor allem von Eckbo, Nygaard und Thorburn, fanden keinen belastbaren negativen Effekt. Die Autoren setzen eine kognitive Erklärung auf einen umstrittenen Befund, ohne sie zu prüfen: Niemand hat die Frames der Mitglieder gemessen. Die Pointe über das, was in ihrer Unterwäsche steckte, ist billig und untergräbt ein Buch, das dazu auffordert, fremde Frames ernst zu nehmen.' } },
      { claim: { en: 'By 2015 research could definitively state that team diversity produces better outcomes.', de: 'Bis 2015 konnte die Forschung definitiv sagen, dass Vielfalt im Team bessere Ergebnisse bringt.' },
        challenge: { en: '“Definitively” overstates it. Meta-analyses on team diversity show small, context-dependent effects that can be positive or negative; task-related diversity helps more than demographic diversity, and conflict costs are real. Scott Page’s “diversity trumps ability” theorem was criticised mathematically (Abigail Thompson, 2014) for resting on assumptions that make the result nearly trivial. The collective-intelligence factor from the Science study has also been questioned in reanalyses. The sound core is narrower: diversity is potential that only pays off under the right process.', de: '„Definitiv“ übertreibt. Metaanalysen zu Teamvielfalt zeigen kleine, kontextabhängige Effekte, die positiv oder negativ ausfallen; aufgabenbezogene Vielfalt hilft mehr als demografische, und Konfliktkosten sind real. Scott Pages Theorem „Vielfalt schlägt Fähigkeit“ wurde mathematisch kritisiert (Abigail Thompson, 2014), weil es auf Annahmen ruht, die das Ergebnis fast trivial machen. Auch der Faktor kollektiver Intelligenz aus der Science-Studie wurde in Reanalysen infrage gestellt. Der haltbare Kern ist enger: Vielfalt ist Potenzial, das sich nur mit dem richtigen Prozess auszahlt.' } },
      { claim: { en: 'Cognitive foraging is a strategy anyone can adopt: curiosity taken seriously.', de: 'Cognitive Foraging ist eine Strategie, die alle übernehmen können: ernst genommene Neugier.' },
        challenge: { en: 'Foraging needs slack: time without a deliverable, travel, access to other circles, and the status to be seen chatting with unusual people without losing face. Burt’s Roberts are disproportionately senior; brokerage may be partly a result of position rather than its cause. Advice framed as individual mindset hides the structural question a sociologist would ask first: who in the organisation is allowed to forage, and who is measured on utilisation?', de: 'Foraging braucht Spielraum: Zeit ohne Liefergegenstand, Reisen, Zugang zu anderen Kreisen und den Status, sich mit ungewöhnlichen Leuten zu zeigen, ohne das Gesicht zu verlieren. Burts Roberts sind überproportional ranghoch; Brückenpositionen sind womöglich teils Folge der Position statt ihre Ursache. Ein Rat, der als individuelle Haltung formuliert ist, verdeckt die strukturelle Frage, die man soziologisch zuerst stellt: Wer darf in der Organisation sammeln, und wer wird an Auslastung gemessen?' } },
      { claim: { en: 'The Bari Weiss case shows an organisation failing to sustain frame diversity.', de: 'Der Fall Bari Weiss zeigt eine Organisation, die Frame-Vielfalt nicht aufrechterhalten konnte.' },
        challenge: { en: 'The chapter tells it almost entirely through Weiss’s resignation letter. Many staff saw the dispute differently: as a fight over editorial standards and whether certain op-eds endangered colleagues, not over dissent as such. By adopting one side’s frame of a culture-war conflict, the authors do what their own thesis warns against. A fairer reading would show two frames in tension, which is exactly the chapter’s point about tensions between frames.', de: 'Das Kapitel erzählt den Fall fast nur über Weiss’ Kündigungsschreiben. Viele in der Redaktion sahen den Streit anders: als Konflikt über redaktionelle Standards und darüber, ob bestimmte Gastbeiträge Kolleginnen und Kollegen gefährdeten, nicht über Widerspruch an sich. Indem die Autoren den Frame einer Seite in einem Kulturkampf übernehmen, tun sie, wovor ihre eigene These warnt. Eine fairere Lesart würde zwei Frames in Spannung zeigen, und genau das ist der Punkt des Kapitels über Spannungen zwischen Frames.' } },
    ],
    transfer: [
      { context: { en: 'Leadership', de: 'Führung' }, prompt: { en: 'Pick one recurring meeting where decisions are made (budget round, staffing, roadmap). Redesign it with “alone first”: a written one-paragraph framing from each participant before the meeting, read out in a fixed order with equal time, the most senior person speaking last. Run it three times and note whether the range of options on the table changes.', de: 'Wähle ein wiederkehrendes Meeting, in dem entschieden wird (Budgetrunde, Personalplanung, Roadmap). Gestalte es nach „erst allein“ um: Jede teilnehmende Person schreibt vorab einen Absatz zu ihrer Sicht auf das Problem, die Absätze werden in fester Reihenfolge mit gleicher Zeit vorgestellt, die ranghöchste Person spricht zuletzt. Mach das dreimal und halte fest, ob sich die Bandbreite der Optionen auf dem Tisch verändert.' } },
      { context: { en: 'AI in organisations', de: 'KI in Organisationen' }, prompt: { en: 'Use a language model as a foraging partner: ask it to frame a current problem as an epidemiologist, a historian of technology and a theatre director would, each with its causal story and its key constraint. Then check the downside: models trained on the same corpus push everyone toward similar framings. How would you prevent an AI-assisted team from becoming a room full of the same hammer?', de: 'Nutze ein Sprachmodell als Foraging-Partner: Lass es ein aktuelles Problem so framen, wie es eine Epidemiologin, ein Technikhistoriker und eine Theaterregisseurin täten, jeweils mit Kausalgeschichte und zentralem Constraint. Prüf dann die Kehrseite: Modelle, die auf demselben Korpus trainiert sind, schieben alle zu ähnlichen Framings. Wie verhinderst du, dass ein KI-gestütztes Team zu einem Raum voller gleicher Hämmer wird?' } },
      { context: { en: 'Consulting', de: 'Beratung' }, prompt: { en: 'As an external adviser you are often hired to be the client’s helpful Cassandra, and at risk of being kept as the jester whose remarks are enjoyed and ignored. Write down for a current mandate: which uncomfortable frame do you bring, what explicit role (red team session, written dissent, sponsor agreement) would make it count, and what signal would tell you that you have slipped into the jester role?', de: 'Als externe Beratung wirst du oft geholt, um die hilfreiche Kassandra zu sein, und läufst Gefahr, als Narr gehalten zu werden, dessen Bemerkungen man genießt und ignoriert. Halte für ein laufendes Mandat fest: Welchen unbequemen Frame bringst du mit, welche ausdrückliche Rolle (Red-Team-Termin, schriftliches Gegenvotum, Vereinbarung mit der auftraggebenden Person) würde ihn wirksam machen, und an welchem Signal würdest du merken, dass du in die Narrenrolle gerutscht bist?' } },
    ],
    summary: [
      { en: 'Choosing a frame is an insight problem: it does not improve with persistence inside the current frame, as the mutilated checkerboard shows.', de: 'Einen Frame zu wählen ist ein Einsichtsproblem: Es wird durch Ausdauer im aktuellen Frame nicht besser, wie das verstümmelte Schachbrett zeigt.' },
      { en: 'What helps is a stock of frames that differ strongly from one another: variation, not volume.', de: 'Was hilft, ist ein Vorrat an Frames, die sich stark voneinander unterscheiden: Variation, nicht Volumen.' },
      { en: 'Individuals build it through repertoire, cognitive foraging and a clean-slate readiness, and learn to hold tensions between frames.', de: 'Einzelne bauen ihn über Repertoire, Cognitive Foraging und Clean-Slate-Bereitschaft auf und lernen, Spannungen zwischen Frames auszuhalten.' },
      { en: 'Organisations use social diversity as a proxy for mental diversity, which only pays off with ground rules such as thinking alone first.', de: 'Organisationen nutzen soziale Vielfalt als Stellvertreter für mentale Vielfalt, die sich nur mit Spielregeln wie „erst allein denken“ auszahlt.' },
      { en: 'Dissenting frames need an institutional role and protection, otherwise organisations repeat the curse of Cassandra.', de: 'Abweichende Frames brauchen eine institutionelle Rolle und Schutz, sonst wiederholen Organisationen den Fluch der Kassandra.' },
    ],
    glossary: [
      { term: { en: 'Insight problem', de: 'Einsichtsproblem' }, def: { en: 'A problem that yields only to a change of representation, not to more effort within the first one.', de: 'Ein Problem, das sich nur durch einen Wechsel der Darstellung löst, nicht durch mehr Anstrengung in der ersten.' } },
      { term: { en: 'Cognitive foraging', de: 'Cognitive Foraging (kognitives Sammeln)' }, def: { en: 'Seeking new ways of seeing without a specific aim, to be ready when a frame from outside one’s domain is needed.', de: 'Neue Sichtweisen ohne konkretes Ziel suchen, um bereit zu sein, wenn ein Frame von außerhalb des eigenen Gebiets gebraucht wird.' } },
      { term: { en: 'Structural hole', de: 'Strukturelles Loch' }, def: { en: 'Ronald Burt’s term for a gap between groups that are not connected; people who bridge it gain access to non-redundant information.', de: 'Ronald Burts Begriff für eine Lücke zwischen unverbundenen Gruppen; wer sie überbrückt, erhält Zugang zu nicht redundanten Informationen.' } },
      { term: { en: 'Clean-slate strategy', de: 'Clean-Slate-Strategie' }, def: { en: 'Training the readiness to set familiar frames aside and tolerate not knowing, so that a genuinely new frame can form.', de: 'Die Bereitschaft trainieren, vertraute Frames beiseitezulegen und Nichtwissen auszuhalten, damit ein wirklich neuer Frame entstehen kann.' } },
      { term: { en: 'Cognitive complexity', de: 'Kognitive Komplexität' }, def: { en: 'The degree to which someone’s thinking is differentiated and can hold several conflicting frames at once.', de: 'Das Ausmaß, in dem jemandes Denken differenziert ist und mehrere widersprüchliche Frames zugleich halten kann.' } },
      { term: { en: 'Local vs. global optimum', de: 'Lokales vs. globales Optimum' }, def: { en: 'The best solution in the neighbourhood you can see versus the best solution overall.', de: 'Die beste Lösung in der Umgebung, die du überblickst, gegenüber der besten Lösung insgesamt.' } },
    ],
  });
})();
