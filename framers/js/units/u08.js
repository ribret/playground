/* u08 — Pluralismus / Pluralism (Kapitel 8 / chapter 8) */
(function () {
  const P = V.palette;
  const de = (lang) => lang === 'de';
  const L = (l, d, e) => (de(l) ? d : e);

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 6500,
      caption: { en: '<b>A rich spectrum of frames can narrow into one.</b> The 1920s teemed with competing ways of seeing the world; within a decade, much of Europe had only one left, and the empty places were the real loss.', de: '<b>Ein reiches Spektrum von Frames kann zu einem einzigen schrumpfen.</b> Die 1920er Jahre waren voller konkurrierender Weltsichten; ein Jahrzehnt später blieb in weiten Teilen Europas eine übrig, und die leeren Stellen waren der eigentliche Verlust.' },
      svg: (l) => {
        const cols = [P.coral, P.teal, P.plum, P.amber, P.sky, P.ok];
        let s = V.text(200, 28, L(l, '1920er: viele Frames', '1920s: many frames'), { size: 15, bold: true, cls: 'a-fade' });
        cols.forEach((c, i) => { s += V.frame(40 + i * 56, 42, 44, 44, { color: c, cls: 'a-pop', delay: .2 + i * .12 }); });
        s += V.arrow(200, 100, 200, 140, { color: 'muted', cls: 'a-draw', delay: 1.3 });
        cols.forEach((c, i) => {
          s += i === 2 ? V.frame(40 + i * 56, 152, 44, 44, { color: P.muted, cls: 'a-pop', delay: 1.8 })
            : V.rect(40 + i * 56, 152, 44, 44, { fill: 'none', stroke: P.line, dash: '4 4', cls: 'a-fade', delay: 1.8 + i * .1 });
        });
        s += V.text(200, 232, L(l, 'danach: ein Frame, viel Leere', 'then: one frame, much emptiness'), { size: 15, bold: true, fill: P.muted, cls: 'a-fade', delay: 2.6 });
        return V.wrap(s);
      } },
    { duration: 7000,
      caption: { en: '<b>Only one frame is bad: the one that denies other frames.</b> Frames may criticise and fight each other with arguments. What crosses the line is a frame that claims to be the only legitimate one.', de: '<b>Nur ein Frame ist schlecht: der, der andere Frames verneint.</b> Frames dürfen einander kritisieren und mit Argumenten bekämpfen. Die Grenze überschreitet ein Frame, der sich zum einzig legitimen erklärt.' },
      svg: (l) => V.wrap(
        V.text(105, 44, L(l, 'streiten erlaubt', 'clashing allowed'), { size: 14, bold: true, fill: P.teal, cls: 'a-fade' }) +
        V.frame(40, 70, 44, 44, { color: P.coral, cls: 'a-pop', delay: .2 }) +
        V.frame(126, 70, 44, 44, { color: P.teal, cls: 'a-pop', delay: .35 }) +
        V.frame(83, 140, 44, 44, { color: P.plum, cls: 'a-pop', delay: .5 }) +
        V.line(88, 92, 122, 92, { stroke: P.ink, dash: '3 4', cls: 'a-fade', delay: .8 }) +
        V.line(70, 118, 92, 138, { stroke: P.ink, dash: '3 4', cls: 'a-fade', delay: .9 }) +
        V.line(140, 118, 118, 138, { stroke: P.ink, dash: '3 4', cls: 'a-fade', delay: 1 }) +
        V.frame(212, 52, 168, 148, { label: L(l, 'einzig wahr', 'only true'), color: P.ink, cls: 'a-pop', delay: 1.5 }) +
        V.rect(232, 80, 40, 40, { fill: 'none', stroke: P.muted, cls: 'a-fade', delay: 1.9 }) +
        V.rect(318, 80, 40, 40, { fill: 'none', stroke: P.muted, cls: 'a-fade', delay: 1.9 }) +
        V.rect(275, 140, 40, 40, { fill: 'none', stroke: P.muted, cls: 'a-fade', delay: 1.9 }) +
        V.text(252, 110, '✕', { size: 24, bold: true, fill: P.bad, cls: 'a-pop', delay: 2.3 }) +
        V.text(338, 110, '✕', { size: 24, bold: true, fill: P.bad, cls: 'a-pop', delay: 2.45 }) +
        V.text(295, 170, '✕', { size: 24, bold: true, fill: P.bad, cls: 'a-pop', delay: 2.6 }) +
        V.text(200, 238, L(l, 'Schlecht ist nur: andere verneinen', 'Only bad: denying the others'), { size: 15, bold: true, fill: P.bad, cls: 'a-fade', delay: 3 })) },
    { duration: 7000,
      caption: { en: '<b>Hierarchy breeds one frame, networks breed many.</b> Boston’s Route 128 had triple Silicon Valley’s tech jobs in 1959. Closed, top-down firms lost to a web of small rivals whose people swapped jobs and ideas.', de: '<b>Hierarchie erzeugt einen Frame, Netzwerke erzeugen viele.</b> Bostons Route 128 hatte 1959 dreimal so viele Tech-Jobs wie das Silicon Valley. Geschlossene, zentral gesteuerte Firmen verloren gegen ein Geflecht kleiner Konkurrenten, deren Leute Jobs und Ideen tauschten.' },
      svg: (l) => {
        let s = '';
        const tree = [[100, 56], [70, 106], [130, 106], [55, 156], [85, 156], [115, 156], [145, 156]];
        const tl = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
        tl.forEach(([a, b]) => { s += V.line(tree[a][0], tree[a][1], tree[b][0], tree[b][1], { stroke: P.muted, cls: 'a-draw', delay: .3 }); });
        tree.forEach(([x, y], i) => { s += V.circle(x, y, i === 0 ? 12 : 8, { fill: i === 0 ? P.ink : P.muted, cls: 'a-pop', delay: .1 + i * .08 }); });
        const net = [[250, 60], [320, 52], [365, 100], [300, 110], [235, 130], [275, 170], [345, 160]];
        const nl = [[0, 1], [1, 2], [0, 3], [1, 3], [2, 3], [3, 4], [0, 4], [4, 5], [3, 5], [5, 6], [3, 6], [2, 6]];
        nl.forEach(([a, b], i) => { s += V.line(net[a][0], net[a][1], net[b][0], net[b][1], { stroke: P.sky, sw: 1.8, cls: 'a-draw', delay: 1.4 + i * .06 }); });
        net.forEach(([x, y], i) => { s += V.circle(x, y, 9, { fill: P.sky, cls: 'a-pop', delay: 1.2 + i * .08 }); });
        s += V.text(100, 204, 'Route 128', { size: 15, bold: true, cls: 'a-fade', delay: .6 }) +
          V.text(100, 224, L(l, 'Hierarchie', 'hierarchy'), { size: 13, fill: P.muted, cls: 'a-fade', delay: .7 }) +
          V.text(300, 204, 'Silicon Valley', { size: 15, bold: true, fill: P.sky, cls: 'a-fade', delay: 2 }) +
          V.text(300, 224, L(l, 'Netzwerk, Jobwechsel', 'network, job hopping'), { size: 13, fill: P.muted, cls: 'a-fade', delay: 2.1 });
        return V.wrap(s);
      } },
    { duration: 7000,
      caption: { en: '<b>One centre can stop a whole civilisation.</b> Unified China led the world for centuries, then a few decisions at the top dismantled its fleets. Fragmented, quarrelling Europe kept experimenting because no one could stop everyone.', de: '<b>Ein Zentrum kann eine ganze Zivilisation anhalten.</b> Das geeinte China führte jahrhundertelang, dann ließen wenige Entscheidungen an der Spitze die Flotten abwracken. Das zersplitterte, zerstrittene Europa experimentierte weiter, weil niemand alle stoppen konnte.' },
      svg: (l) => {
        let s = V.circle(100, 112, 62, { fill: P.amber, opacity: .35, cls: 'a-pop' }) + V.circle(100, 112, 10, { fill: P.ink, cls: 'a-pop', delay: .3 });
        [0, 60, 120, 180, 240, 300].forEach((a, i) => {
          const r = a * Math.PI / 180;
          s += V.line(100 + Math.cos(r) * 14, 112 + Math.sin(r) * 14, 100 + Math.cos(r) * 54, 112 + Math.sin(r) * 54, { stroke: P.ink, sw: 1.5, cls: 'a-draw', delay: .5 + i * .05 });
        });
        const eu = [[232, 66, 13, P.coral], [272, 58, 10, P.teal], [312, 70, 15, P.plum], [356, 62, 11, P.sky], [246, 106, 12, P.ok], [292, 104, 14, P.amber], [340, 110, 12, P.coral],
          [228, 148, 10, P.plum], [266, 146, 13, P.sky], [306, 150, 10, P.teal], [350, 152, 14, P.ok]];
        eu.forEach(([x, y, r, c], i) => { s += V.circle(x, y, r, { fill: c, cls: 'a-pop', delay: 1.4 + i * .08 }); });
        s += V.text(100, 204, 'China', { size: 15, bold: true, cls: 'a-fade', delay: .8 }) +
          V.text(100, 224, L(l, 'ein Zentrum', 'one centre'), { size: 13, fill: P.muted, cls: 'a-fade', delay: .9 }) +
          V.text(292, 204, L(l, 'Europa', 'Europe'), { size: 15, bold: true, cls: 'a-fade', delay: 2.4 }) +
          V.text(292, 224, L(l, 'viele Rivalen', 'many rivals'), { size: 13, fill: P.muted, cls: 'a-fade', delay: 2.5 });
        return V.wrap(s);
      } },
    { duration: 7500,
      caption: { en: '<b>Meeting people inside their own frame moved a majority.</b> The US campaign for same-sex marriage got nowhere with “rights”. Speaking of love and commitment, it reached the crossover in 2011.', de: '<b>Menschen in ihrem eigenen Frame abzuholen, bewegte eine Mehrheit.</b> Die US-Kampagne für die gleichgeschlechtliche Ehe kam mit „Rechten“ nicht weiter. Mit Liebe und Bindung erreichte sie 2011 den Kipppunkt.' },
      svg: (l) => {
        const X = (yr) => 56 + (yr - 1995) * 12;
        const Y = (p) => 214 - p * 1.7;
        const pts = [[1995, 25], [2000, 34], [2005, 39], [2011, 50], [2015, 60], [2020, 70]];
        const d = pts.map(([yr, p], i) => `${i ? 'L' : 'M'}${X(yr)},${Y(p)}`).join(' ');
        return V.wrap(
          V.line(56, 214, 360, 214, { stroke: P.line, sw: 2 }) +
          V.line(56, Y(50), 360, Y(50), { stroke: P.muted, dash: '5 5', sw: 1.5 }) +
          V.text(52, Y(50) + 4, '50 %', { size: 12, anchor: 'end', fill: P.muted }) +
          V.pill(112, 40, L(l, 'Rechte', 'rights'), { fill: P.muted, cls: 'a-fade' }) +
          V.arrow(150, 40, 214, 40, { color: 'ink', cls: 'a-draw', delay: .9 }) +
          V.pill(286, 40, L(l, 'Liebe & Bindung', 'love & commitment'), { fill: P.sky, cls: 'a-pop', delay: 1.2 }) +
          V.path(d, { stroke: P.sky, sw: 3, cls: 'a-draw', delay: 1.4 }) +
          V.circle(X(2011), Y(50), 7, { fill: P.coral, cls: 'a-pop', delay: 2.6 }) +
          V.text(X(1995), 234, '1995', { size: 12, fill: P.muted }) +
          V.text(X(2011), 234, '2011', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 2.8 }) +
          V.text(X(2020) - 6, 234, '2020', { size: 12, fill: P.muted }) +
          V.text(200, 254, L(l, 'Zustimmung, schematisch', 'support, schematic'), { size: 12, fill: P.muted, cls: 'a-fade', delay: 3 }));
      } },
    { duration: 6500,
      caption: { en: '<b>Ignoring differences is not neutrality.</b> “Colour-blind” parenting means well, but it erases the experience of those who live with discrimination. A “colourful” frame names differences, and only what is named can be argued about.', de: '<b>Unterschiede zu übersehen ist keine Neutralität.</b> „Farbenblinde“ Erziehung meint es gut, löscht aber die Erfahrung derer, die mit Diskriminierung leben. Ein „farbbewusster“ Frame benennt Unterschiede, und nur Benanntes lässt sich verhandeln.' },
      svg: (l) => {
        const cols = [P.coral, P.teal, P.plum, P.amber, P.sky, P.ok, P.plum, P.coral, P.teal];
        let s = '';
        for (let i = 0; i < 9; i++) {
          const cx = 62 + (i % 3) * 38, cy = 70 + Math.floor(i / 3) * 38;
          s += V.circle(cx, cy, 14, { fill: P.muted, opacity: .55, cls: 'a-fade', delay: .1 + i * .05 });
          s += V.circle(cx + 200, cy, 14, { fill: cols[i], cls: 'a-pop', delay: 1.2 + i * .08 });
        }
        s += V.line(200, 50, 200, 170, { stroke: P.line, sw: 2 }) +
          V.text(100, 196, L(l, 'farbenblind', 'colour-blind'), { size: 15, bold: true, fill: P.muted, cls: 'a-fade', delay: .6 }) +
          V.text(300, 196, L(l, 'farbbewusst', 'colourful'), { size: 15, bold: true, cls: 'a-fade', delay: 2 }) +
          V.text(200, 236, L(l, 'Unterschiede sehen, nicht löschen', 'See differences, don’t erase them'), { size: 14, bold: true, fill: P.sky, cls: 'a-fade', delay: 2.6 });
        return V.wrap(s);
      } },
    { duration: 7000,
      caption: { en: '<b>Friction is the price of pluralism and its energy.</b> Where frames rub against each other, there is conflict. Habermas’s public sphere, deliberative polls and Unger’s local counter-models are ways to turn it into better decisions.', de: '<b>Reibung ist der Preis des Pluralismus und seine Energie.</b> Wo Frames aneinander reiben, entsteht Konflikt. Habermas’ Öffentlichkeit, deliberative Umfragen und Ungers lokale Gegenmodelle sind Wege, daraus bessere Entscheidungen zu machen.' },
      svg: (l) => {
        let s = V.frame(52, 54, 168, 132, { color: P.coral, cls: 'a-slide' }) +
          V.frame(180, 54, 168, 132, { color: P.teal, cls: 'a-slide', delay: .4 });
        [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1.4], [0, 1.4]].forEach(([dx, dy], i) => {
          s += V.line(200 + dx * 8, 120 + dy * 8, 200 + dx * 26, 120 + dy * 26, { stroke: P.amber, sw: 3.5, cls: 'a-pop', delay: 1.1 + i * .1 });
        });
        s += V.circle(200, 120, 7, { fill: P.amber, cls: 'a-pulse', delay: 1 }) +
          V.text(200, 230, L(l, 'Reibung: Preis und Energie', 'Friction: cost and energy'), { size: 16, bold: true, cls: 'a-fade', delay: 2 });
        return V.wrap(s);
      } },
    { duration: 7000,
      caption: { en: '<b>Pluralism needs fearlessness, not just rights.</b> Since 2017 a small bronze girl has faced Wall Street’s charging bull. Judith Shklar’s point in one image: standing next to power without fear, with neither ranked above the other.', de: '<b>Pluralismus braucht Furchtlosigkeit, nicht nur Rechte.</b> Seit 2017 steht ein kleines Bronzemädchen dem Wall-Street-Bullen gegenüber. Judith Shklars Punkt in einem Bild: neben der Macht stehen, ohne Angst und ohne Rangordnung.' },
      svg: (l) => V.wrap(
        V.group(
          `<ellipse cx="272" cy="132" rx="78" ry="40" fill="${P.ink}"/>` +
          `<circle cx="186" cy="148" r="26" fill="${P.ink}"/>` +
          V.path('M176,126 Q164,104 146,108', { stroke: P.ink, sw: 6 }) +
          V.path('M196,124 Q200,102 186,92', { stroke: P.ink, sw: 6 }) +
          V.path('M350,120 Q372,110 368,140', { stroke: P.ink, sw: 4 }) +
          `<rect x="216" y="160" width="14" height="38" rx="4" fill="${P.ink}"/><rect x="246" y="164" width="14" height="34" rx="4" fill="${P.ink}"/>` +
          `<rect x="294" y="164" width="14" height="34" rx="4" fill="${P.ink}"/><rect x="324" y="160" width="14" height="38" rx="4" fill="${P.ink}"/>`,
          { cls: 'a-fade' }) +
        V.person(92, 168, { color: P.sky, scale: 1.3, cls: 'a-rise', delay: 1 }) +
        V.line(40, 198, 380, 198, { stroke: P.line, sw: 2 }) +
        V.text(200, 236, L(l, 'Koexistenz ohne Rangordnung', 'Coexistence without hierarchy'), { size: 16, bold: true, fill: P.sky, cls: 'a-fade', delay: 1.8 })) },
  ];

  /* ---------- section visuals ---------- */
  const insurance = (l) => V.wrap(
    V.line(40, 210, 370, 210, { stroke: P.line, sw: 2 }) +
    V.line(232, 34, 232, 210, { stroke: P.bad, dash: '5 5', sw: 1.5, cls: 'a-fade', delay: .2 }) +
    V.text(232, 28, L(l, 'Umbruch', 'disruption'), { size: 13, bold: true, fill: P.bad, cls: 'a-fade', delay: .2 }) +
    V.path('M40,76 L232,76 L262,190 L370,196', { stroke: P.muted, sw: 3, cls: 'a-draw', delay: .5 }) +
    V.path('M40,118 L232,118 L256,146 L300,124 L370,112', { stroke: P.sky, sw: 3, cls: 'a-draw', delay: 1.2 }) +
    V.text(44, 64, L(l, 'ein Frame: effizient', 'one frame: efficient'), { size: 13, bold: true, anchor: 'start', fill: P.muted, cls: 'a-fade', delay: .6 }) +
    V.text(44, 106, L(l, 'viele Frames: Reibung', 'many frames: friction'), { size: 13, bold: true, anchor: 'start', fill: P.sky, cls: 'a-fade', delay: 1.3 }) +
    V.text(366, 100, L(l, 'passt sich an', 'adapts'), { size: 12, anchor: 'end', fill: P.sky, cls: 'a-fade', delay: 2 }) +
    V.text(366, 184, L(l, 'bricht ein', 'collapses'), { size: 12, anchor: 'end', fill: P.muted, cls: 'a-fade', delay: 2 }) +
    V.text(205, 236, L(l, 'Leistungsfähigkeit im Zeitverlauf (schematisch)', 'performance over time (schematic)'), { size: 12, fill: P.muted, cls: 'a-fade', delay: 2.2 }));

  const spectrum = (l) => V.wrap(
    V.text(150, 38, L(l, 'erlaubt, ja erwünscht', 'allowed, even wanted'), { size: 13, bold: true, fill: P.ok, cls: 'a-fade' }) +
    V.text(332, 38, L(l, 'Grenze', 'limit'), { size: 13, bold: true, fill: P.bad, cls: 'a-fade', delay: 1.2 }) +
    V.rect(26, 60, 110, 52, { fill: P.paper, stroke: P.ok, cls: 'a-rise', delay: .2 }) +
    V.rect(144, 60, 142, 52, { fill: P.paper, stroke: P.amber, cls: 'a-rise', delay: .5 }) +
    V.rect(294, 60, 82, 52, { fill: P.paper, stroke: P.bad, sw: 2.5, cls: 'a-rise', delay: .8 }) +
    V.text(81, 82, L(l, 'kritisieren', 'criticise'), { size: 13, bold: true, cls: 'a-fade', delay: .3 }) +
    V.text(81, 100, L(l, '„passt schlechter“', '“fits worse”'), { size: 12, fill: P.muted, cls: 'a-fade', delay: .3 }) +
    V.text(215, 82, L(l, 'widerlegen', 'argue against'), { size: 13, bold: true, cls: 'a-fade', delay: .6 }) +
    V.text(215, 100, L(l, '„ist falsch, weil …“', '“is wrong because…”'), { size: 12, fill: P.muted, cls: 'a-fade', delay: .6 }) +
    V.text(335, 82, L(l, 'Existenz', 'deny'), { size: 13, bold: true, fill: P.bad, cls: 'a-fade', delay: .9 }) +
    V.text(335, 100, L(l, 'verneinen', 'existence'), { size: 13, bold: true, fill: P.bad, cls: 'a-fade', delay: .9 }) +
    V.arrow(26, 130, 372, 130, { color: 'ink', cls: 'a-draw', delay: 1 }) +
    V.text(81, 158, L(l, 'Methode A', 'method A'), { size: 12, cls: 'a-fade', delay: 1.4 }) +
    V.text(81, 174, L(l, 'vs. Methode B', 'vs. method B'), { size: 12, cls: 'a-fade', delay: 1.4 }) +
    V.text(215, 158, L(l, 'flache Erde,', 'flat Earth,'), { size: 12, cls: 'a-fade', delay: 1.6 }) +
    V.text(215, 174, L(l, 'Klimaleugnung', 'climate denial'), { size: 12, cls: 'a-fade', delay: 1.6 }) +
    V.text(335, 158, L(l, 'Zensur,', 'censorship,'), { size: 12, cls: 'a-fade', delay: 1.8 }) +
    V.text(335, 174, L(l, 'Ausschluss', 'exclusion'), { size: 12, cls: 'a-fade', delay: 1.8 }) +
    V.pill(200, 222, L(l, 'Im Zweifel: Toleranz', 'When in doubt: tolerance'), { fill: P.sky, w: 210, h: 30, size: 14, cls: 'a-pop', delay: 2.2 }));

  const matrix = (l) => {
    let s = V.rect(80, 34, 145, 88, { fill: P.paper, stroke: P.line, r: 4 }) + V.rect(229, 34, 145, 88, { fill: P.paper, stroke: P.sky, sw: 2, r: 4 }) +
      V.rect(80, 126, 145, 88, { fill: P.paper, stroke: P.line, r: 4 }) + V.rect(229, 126, 145, 88, { fill: P.paper, stroke: P.line, r: 4 });
    s += V.text(152, 72, L(l, 'Römisches', 'Roman'), { size: 13, bold: true, cls: 'a-fade', delay: .3 }) +
      V.text(152, 90, L(l, 'Reich', 'Empire'), { size: 13, bold: true, cls: 'a-fade', delay: .3 }) +
      V.text(301, 72, L(l, 'liberale', 'liberal'), { size: 13, bold: true, fill: P.sky, cls: 'a-fade', delay: .6 }) +
      V.text(301, 90, L(l, 'Demokratie (Ideal)', 'democracy (ideal)'), { size: 13, bold: true, fill: P.sky, cls: 'a-fade', delay: .6 }) +
      V.text(152, 164, L(l, 'Autokratie,', 'autocracy,'), { size: 13, bold: true, cls: 'a-fade', delay: .9 }) +
      V.text(152, 182, L(l, 'Monokultur', 'monoculture'), { size: 13, bold: true, cls: 'a-fade', delay: .9 }) +
      V.text(301, 158, L(l, 'viktorianisches', 'Victorian'), { size: 13, bold: true, cls: 'a-fade', delay: 1.2 }) +
      V.text(301, 176, L(l, 'England,', 'England,'), { size: 13, bold: true, cls: 'a-fade', delay: 1.2 }) +
      V.text(301, 194, L(l, 'Japans Konsens', 'Japan’s consensus'), { size: 13, bold: true, cls: 'a-fade', delay: 1.2 }) +
      V.text(72, 82, L(l, 'viele', 'many'), { size: 12, anchor: 'end', fill: P.muted }) +
      V.text(72, 174, L(l, 'wenige', 'few'), { size: 12, anchor: 'end', fill: P.muted }) +
      V.text(10, 24, L(l, 'Frames ↑', 'Frames ↑'), { size: 12, bold: true, anchor: 'start', fill: P.ink }) +
      V.text(152, 234, L(l, 'nicht demokratisch', 'not democratic'), { size: 12, fill: P.muted }) +
      V.text(301, 234, L(l, 'demokratisch', 'democratic'), { size: 12, fill: P.muted }) +
      V.text(372, 252, L(l, 'Regierungsform →', 'government →'), { size: 12, bold: true, anchor: 'end' });
    return V.wrap(s);
  };

  const strategies = (l) => {
    const box = (x, y, t, sub, c, d) => V.group(
      V.rect(x, y, 168, 80, { fill: P.paper, stroke: c, sw: 2 }) +
      V.text(x + 84, y + 32, t, { size: 15, bold: true, fill: c }) +
      V.text(x + 84, y + 56, sub, { size: 12, fill: P.ink }), { cls: 'a-pop', delay: d });
    return V.wrap(
      V.text(110, 30, L(l, 'persönlich', 'personal'), { size: 13, bold: true, fill: P.muted, cls: 'a-fade' }) +
      V.text(290, 30, L(l, 'gesellschaftlich', 'societal'), { size: 13, bold: true, fill: P.muted, cls: 'a-fade' }) +
      box(26, 44, 'Variation', L(l, '„Ich sehe das anders“', '“I see this differently”'), P.sky, .2) +
      box(26, 136, L(l, 'Bildung', 'Education'), L(l, 'Unterschiede benennen', 'name differences'), P.teal, .5) +
      box(206, 44, 'Migration', L(l, 'Außensicht ins System', 'outside view inside'), P.plum, .8) +
      box(206, 136, L(l, 'Reibung', 'Friction'), L(l, 'Öffentlichkeit, Deliberation', 'public sphere, deliberation'), P.coral, 1.1) +
      V.text(200, 244, L(l, 'Pluralismus muss gepflegt werden', 'Pluralism has to be maintained'), { size: 13, bold: true, cls: 'a-fade', delay: 1.5 }));
  };

  const caseBars = (l) => V.wrap(
    V.text(200, 34, L(l, 'Womit Befragte die Ehe für alle verbanden', 'What respondents linked same-sex marriage to'), { size: 13, bold: true, cls: 'a-fade' }) +
    V.text(40, 80, L(l, 'Freiheit, Rechte', 'liberty, rights'), { size: 13, anchor: 'start', fill: P.muted, cls: 'a-fade', delay: .3 }) +
    V.rect(40, 90, 14 * 8, 30, { fill: P.muted, stroke: 'none', r: 4, cls: 'a-slide', delay: .5 }) +
    V.text(40 + 14 * 8 + 10, 111, '14 %', { size: 14, bold: true, anchor: 'start', fill: P.muted, cls: 'a-fade', delay: .9 }) +
    V.text(40, 158, L(l, 'Liebe, Zuneigung', 'love, affection'), { size: 13, anchor: 'start', fill: P.sky, cls: 'a-fade', delay: 1.1 }) +
    V.rect(40, 168, 32 * 8, 30, { fill: P.sky, stroke: 'none', r: 4, cls: 'a-slide', delay: 1.3 }) +
    V.text(40 + 32 * 8 + 10, 189, '32 %', { size: 14, bold: true, anchor: 'start', fill: P.sky, cls: 'a-fade', delay: 1.7 }) +
    V.text(200, 236, L(l, 'Der Liebes-Frame trug weiter', 'The love frame carried further'), { size: 13, bold: true, cls: 'a-fade', delay: 2 }));

  window.FRAMERS.register({
    id: 'u08', number: 8, kind: 'chapter', color: '#3E8ED0', minutes: 30,
    title: { en: 'Pluralism', de: 'Pluralismus' },
    tagline: { en: 'Societies need many coexisting frames as insurance for change. The only frame not to tolerate is the one that denies the others.', de: 'Gesellschaften brauchen viele koexistierende Frames als Versicherung für den Wandel. Nicht zu dulden ist nur der Frame, der die anderen verneint.' },
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="4" y="8" width="16" height="16" rx="3" fill="none" stroke="${c}" stroke-width="3"/><rect x="24" y="8" width="16" height="16" rx="3" fill="${c}" opacity=".45"/><rect x="14" y="22" width="16" height="16" rx="3" fill="none" stroke="${c}" stroke-width="3"/></svg>`,
    hook: {
      en: '<p>Berlin, 1933. A young philosopher is held for eight days by the Gestapo for documenting how organisations and individuals were trading their varied views of the world for a single propaganda line. A good-natured officer, out of his depth, lets her go. Hannah Arendt flees the same year.</p><p>The authors use her story to open a question that goes beyond tyranny: what happens to a society, a market or a company when the range of available frames shrinks? And if pluralism is so valuable, what do you do with a frame that wants to abolish it?</p>',
      de: '<p>Berlin, 1933. Eine junge Philosophin sitzt acht Tage in Gestapo-Haft, weil sie dokumentiert hat, wie Organisationen und Einzelne ihre vielfältigen Sichtweisen gegen eine einzige Propagandalinie eintauschten. Ein gutmütiger, überforderter Beamter lässt sie frei. Hannah Arendt flieht noch im selben Jahr.</p><p>Die Autoren nutzen ihre Geschichte, um eine Frage zu öffnen, die über Tyrannei hinausreicht: Was geschieht mit einer Gesellschaft, einem Markt oder einem Unternehmen, wenn das Spektrum verfügbarer Frames schrumpft? Und wenn Pluralismus so wertvoll ist, was tust du mit einem Frame, der ihn abschaffen will?</p>'
    },
    objectives: [
      { en: 'Explain why the authors defend frame pluralism pragmatically, as insurance for change, rather than morally.', de: 'Erklären, warum die Autoren Frame-Pluralismus pragmatisch, als Versicherung für den Wandel, und nicht moralisch begründen.' },
      { en: 'Apply the rule “the only bad frame is one that denies other frames” to hard cases, and say where it leaves the decision open.', de: 'Die Regel „Der einzig schlechte Frame ist einer, der andere Frames verneint“ auf schwierige Fälle anwenden und benennen, wo sie die Entscheidung offenlässt.' },
      { en: 'Use the four strategies (variation, education, migration, friction) to design concrete ways of keeping a dissenting frame alive in a team or organisation.', de: 'Mit den vier Strategien (Variation, Bildung, Migration, Reibung) konkrete Wege entwerfen, einen abweichenden Frame in einem Team oder einer Organisation am Leben zu halten.' },
    ],
    film: { title: { en: 'From monoculture to coexistence in eight scenes', de: 'Von der Monokultur zur Koexistenz in acht Szenen' }, scenes },
    sections: [
      { id: 's1', heading: { en: 'A single frame of truth, and why that is a practical problem', de: 'Ein einziger Wahrheits-Frame, und warum das ein praktisches Problem ist' },
        body: {
          en: '<p>The 1920s were a cornucopia of frames: expressionism and dada, communism, fascism and liberalism, flappers redefining what was acceptable. Within a few years, in much of Europe this narrowed into one sanctioned worldview, partly planned by extremists, partly allowed by bystanders hoping for the best. What followed was persecution, war and genocide.</p><p>The authors draw a less visible point from this. Behind open violence lies <strong>cognitive oppression</strong>: the restriction of what people may think and imagine. It is recognisable mainly by what is missing, the frames that never get formed. They see it in dictatorships, but also in the McCarthy hearings and in today’s social pressure to silence views.</p><p>Their argument is explicitly <strong>pragmatic, not moral</strong>. A society that keeps many frames available has more options when circumstances change, just as biological evolution depends on variation. Pluralism is humanity’s “insurance policy” for times of change: in stable periods it looks inefficient, in a disruption it decides survival. Pluralism is a means, not an end. Its aim is not to converge on the best frame, but to let clashing frames be applied side by side.</p>',
          de: '<p>Die 1920er Jahre waren ein Füllhorn an Frames: Expressionismus und Dada, Kommunismus, Faschismus und Liberalismus, Flapper, die neu bestimmten, was als akzeptabel galt. Innerhalb weniger Jahre verengte sich das in weiten Teilen Europas auf eine einzige erlaubte Weltsicht, teils von Extremisten geplant, teils von Zuschauenden geduldet, die auf das Beste hofften. Es folgten Verfolgung, Krieg und Völkermord.</p><p>Die Autoren ziehen daraus einen weniger sichtbaren Punkt. Hinter offener Gewalt liegt <strong>kognitive Unterdrückung</strong>: die Einschränkung dessen, was Menschen denken und sich vorstellen dürfen. Man erkennt sie vor allem an dem, was fehlt, an Frames, die nie entstehen. Sie sehen das in Diktaturen, aber auch in den McCarthy-Anhörungen und im heutigen sozialen Druck, Positionen zum Schweigen zu bringen.</p><p>Ihr Argument ist ausdrücklich <strong>pragmatisch, nicht moralisch</strong>. Eine Gesellschaft, die viele Frames verfügbar hält, hat mehr Optionen, wenn sich die Lage ändert, so wie biologische Evolution auf Variation angewiesen ist. Pluralismus ist die „Versicherung“ der Menschheit für Zeiten des Wandels: In stabilen Phasen wirkt er ineffizient, im Umbruch entscheidet er über das Überleben. Pluralismus ist Mittel, nicht Zweck. Sein Ziel ist nicht, sich auf den besten Frame zu einigen, sondern widerstreitende Frames nebeneinander anwenden zu lassen.</p>'
        },
        visual: { svg: insurance, position: 'bottom',
          caption: { en: 'The insurance logic, schematically: a single frame is more efficient while conditions are stable and fails when they shift. Many frames cost friction every day and pay out in the disruption.', de: 'Die Versicherungslogik, schematisch: Ein einziger Frame ist effizienter, solange die Lage stabil ist, und versagt, wenn sie kippt. Viele Frames kosten täglich Reibung und zahlen sich im Umbruch aus.' } },
        keyIdea: { en: 'Pluralism is not a virtue to admire but a premium to pay: friction now, options later.', de: 'Pluralismus ist keine Tugend zum Bewundern, sondern eine Prämie, die man zahlt: Reibung jetzt, Optionen später.' } },
      { id: 's2', heading: { en: 'The only bad frame, and the paradox of tolerance', de: 'Der einzig schlechte Frame und das Paradox der Toleranz' },
        body: {
          en: '<p>Throughout the book the authors insist there are no bad frames, only frames that fit a situation poorly. This chapter brings the one exception they had announced: <strong>the only bad frame is one that denies other frames.</strong> It is their answer to Karl Popper’s paradox of tolerance: unlimited tolerance of the intolerant ends in no tolerance at all.</p><p>The line runs between <em>criticising</em> a frame and <em>denying its existence</em>. A flat-Earth frame is wrong, yet still handy for measuring short distances. The frame that humans do not cause climate change is wrong and leads to bad decisions. Both should be argued against, not banned. What crosses the line is a frame that aims to eliminate alternatives, whether through censorship, exclusion or violence. Where a society still decides to ban a frame for ethical reasons, it should call this what it is: a deliberate reduction of its frame space.</p><p>Two rules of thumb follow. First, <strong>default to tolerance</strong>: framers judge other frames with an extra-critical eye, so when in doubt, be more permissive than restrictive. Second, judging the rare truly bad frame is too important to <strong>outsource</strong> to authorities or experts; it remains a shared responsibility. The authors admit there is no recipe, only constant navigation between openness and vigilance.</p>',
          de: '<p>Das ganze Buch hindurch betonen die Autoren, es gebe keine schlechten Frames, nur solche, die schlecht zur Lage passen. Dieses Kapitel liefert die eine angekündigte Ausnahme: <strong>Der einzig schlechte Frame ist einer, der andere Frames verneint.</strong> Das ist ihre Antwort auf Karl Poppers Paradox der Toleranz: Unbegrenzte Toleranz gegenüber Intoleranten endet in gar keiner Toleranz.</p><p>Die Linie verläuft zwischen <em>einen Frame kritisieren</em> und <em>seine Existenz verneinen</em>. Der Frame einer flachen Erde ist falsch, aber für kurze Strecken praktisch. Der Frame, der Menschen nicht als Ursache des Klimawandels sieht, ist falsch und führt zu schlechten Entscheidungen. Beiden soll man widersprechen, man soll sie nicht verbieten. Die Grenze überschreitet ein Frame, der Alternativen beseitigen will, durch Zensur, Ausschluss oder Gewalt. Verbietet eine Gesellschaft dennoch aus ethischen Gründen einen Frame, soll sie das benennen als das, was es ist: eine bewusste Verkleinerung ihres Frame-Raums.</p><p>Daraus folgen zwei Faustregeln. Erstens <strong>im Zweifel Toleranz</strong>: Wer framt, sieht fremde Frames besonders kritisch, also lieber zu großzügig als zu restriktiv. Zweitens lässt sich das Urteil über die seltenen wirklich schlechten Frames nicht an Behörden oder Fachleute <strong>auslagern</strong>; es bleibt gemeinsame Verantwortung. Ein Rezept gibt es nach eigenem Eingeständnis der Autoren nicht, nur ständiges Austarieren zwischen Offenheit und Wachsamkeit.</p>'
        },
        visual: { svg: spectrum, position: 'bottom',
          caption: { en: 'The chapter’s rule as a spectrum. Criticising and refuting frames is the healthy give-and-take of pluralism; only the attempt to eliminate a frame crosses the line.', de: 'Die Regel des Kapitels als Spektrum. Frames zu kritisieren und zu widerlegen ist das gesunde Geben und Nehmen des Pluralismus; erst der Versuch, einen Frame zu beseitigen, überschreitet die Grenze.' } },
        keyIdea: { en: 'Fight a wrong frame with arguments; only a frame that wants to abolish other frames forfeits its place.', de: 'Einen falschen Frame bekämpft man mit Argumenten; seinen Platz verliert nur ein Frame, der andere abschaffen will.' } },
      { id: 's3', heading: { en: 'How monocultures form: success, centralisation, triumph', de: 'Wie Monokulturen entstehen: Erfolg, Zentralisierung, Triumph' },
        body: {
          en: '<p>Single frames of truth rarely arrive by decree alone. They grow from <strong>success</strong>. Like the trader whose strategy made a fortune and who keeps it after the market turns, the more a frame has worked, the less we can imagine an alternative.</p><p>The authors apply this to the West after 1989. Francis Fukuyama’s “end of history” expressed the belief that liberal market democracy had no serious rival left. In the following “unipolar moment”, a poster in former East Berlin advertising West cigarettes read “Test the West!”. The same frame later read the Arab Spring as a replay of 1776, which said more about the observers than about the region.</p><p><strong>Centralisation</strong> is the second source. In 1959 Boston’s Route 128 had almost three times as many tech jobs as Silicon Valley; by 1990 the Valley was far ahead. AnnaLee Saxenian traces this to closed, hierarchical firms with little job mobility versus an open network of small competitors whose staff met, talked and switched employers. Joel Mokyr and Jared Diamond tell the same story on a larger scale: unified China after 221 BC led for centuries, then a faction at the top halted the fleets; fragmented, warring Europe kept experimenting. China used gunpowder for fireworks; Europe, alas, for munitions. The irony the authors note: Silicon Valley has meanwhile become a monoculture itself.</p>',
          de: '<p>Einzige Wahrheits-Frames entstehen selten nur per Dekret. Sie wachsen aus <strong>Erfolg</strong>. Wie bei der Börsenhändlerin, deren Strategie ein Vermögen eingebracht hat und die an ihr festhält, als der Markt dreht: Je besser ein Frame funktioniert hat, desto weniger können wir uns eine Alternative vorstellen.</p><p>Die Autoren übertragen das auf den Westen nach 1989. Francis Fukuyamas „Ende der Geschichte“ drückte die Überzeugung aus, die liberale Marktdemokratie habe keine ernsthafte Konkurrenz mehr. Im folgenden „unipolaren Moment“ warb in Ost-Berlin ein Plakat für die Zigarettenmarke West mit „Test the West!“. Derselbe Frame las später den Arabischen Frühling als Neuauflage von 1776, was mehr über die Betrachtenden sagte als über die Region.</p><p><strong>Zentralisierung</strong> ist die zweite Quelle. 1959 hatte Bostons Route 128 fast dreimal so viele Tech-Jobs wie das Silicon Valley; 1990 lag das Valley weit vorn. AnnaLee Saxenian führt das auf geschlossene, hierarchische Firmen mit wenig Jobwechsel zurück, gegenüber einem offenen Netz kleiner Konkurrenten, deren Leute sich trafen, austauschten und den Arbeitgeber wechselten. Joel Mokyr und Jared Diamond erzählen dasselbe im großen Maßstab: Das ab 221 v. Chr. geeinte China führte jahrhundertelang, dann stoppte eine Fraktion an der Spitze die Flotten; das zersplitterte, kriegerische Europa experimentierte weiter. China nutzte Schießpulver für Feuerwerk, Europa leider für Munition. Die Ironie, die die Autoren festhalten: Das Silicon Valley ist inzwischen selbst eine Monokultur.</p>'
        },
        keyIdea: { en: 'The more a frame has worked, the more it looks without alternative, and the more dangerous it becomes.', de: 'Je besser ein Frame funktioniert hat, desto alternativloser wirkt er, und desto gefährlicher wird er.' } },
      { id: 's4', heading: { en: 'Pluralism is not democracy, and it does not maintain itself', de: 'Pluralismus ist nicht Demokratie, und er erhält sich nicht von selbst' },
        body: {
          en: '<p>An easy mistake is to equate frame pluralism with liberal democracy. The authors separate the two. A democracy can be cognitively homogeneous: think of Victorian England or Japan’s consensus model in the twentieth century. A non-democratic order can be cognitively diverse: the Roman Empire was culturally plural and ruled by emperors. Majority rule decides who governs; pluralism concerns how many ways of seeing remain available.</p><p>Hannah Arendt is the chapter’s philosophical anchor. She held that the more standpoints she kept in mind while thinking about an issue, the more valid her conclusion. Against Rousseau’s “general will” she insisted that “Men, not Man” inhabit the world. She distrusted both totalitarian monocultures and the Western habit of exporting its own frame as universal truth.</p><p>Above all, pluralism is <strong>not the natural state</strong>. Tribalism pulls groups towards cognitive homogeneity like an invisible gravity; anyone who has sat in a meeting with the boss knows the pull. Judith Shklar added that rights alone are not enough: pluralism needs conditions in which people can make decisions “without fear or favor”. So it has to be built and maintained, and complacency always helps those who would erode it.</p>',
          de: '<p>Ein naheliegender Fehler ist, Frame-Pluralismus mit liberaler Demokratie gleichzusetzen. Die Autoren trennen beides. Eine Demokratie kann kognitiv homogen sein: etwa das viktorianische England oder Japans Konsensmodell im 20. Jahrhundert. Eine nicht demokratische Ordnung kann kognitiv vielfältig sein: Das Römische Reich war kulturell plural und wurde von Kaisern regiert. Mehrheitsherrschaft entscheidet, wer regiert; Pluralismus betrifft, wie viele Sichtweisen verfügbar bleiben.</p><p>Hannah Arendt ist der philosophische Anker des Kapitels. Für sie wurde ein Urteil umso tragfähiger, je mehr Standpunkte sie beim Nachdenken präsent hatte. Gegen Rousseaus „Gemeinwillen“ bestand sie darauf, dass „Menschen, nicht der Mensch“ die Welt bewohnen. Sie misstraute totalitären Monokulturen ebenso wie der westlichen Gewohnheit, den eigenen Frame als universelle Wahrheit zu exportieren.</p><p>Vor allem ist Pluralismus <strong>kein Naturzustand</strong>. Tribalismus zieht Gruppen wie eine unsichtbare Schwerkraft in Richtung kognitiver Gleichförmigkeit; wer je mit der Chefin oder dem Chef in einem Meeting saß, kennt den Sog. Judith Shklar ergänzte, dass Rechte allein nicht reichen: Pluralismus braucht Bedingungen, unter denen Menschen Entscheidungen ohne Furcht und ohne Gunst treffen können. Er muss also aufgebaut und gepflegt werden, und Bequemlichkeit nützt immer denen, die ihn aushöhlen wollen.</p>'
        },
        visual: { svg: matrix, position: 'bottom',
          caption: { en: 'Two independent axes, using the chapter’s own examples. Democracy describes who decides; pluralism describes how many frames are available to decide with.', de: 'Zwei unabhängige Achsen, mit den Beispielen des Kapitels. Demokratie beschreibt, wer entscheidet; Pluralismus, wie viele Frames für die Entscheidung verfügbar sind.' } },
        keyIdea: { en: 'Majorities decide; pluralism determines what there is to decide between.', de: 'Mehrheiten entscheiden; Pluralismus bestimmt, zwischen was es zu entscheiden gibt.' } },
      { id: 's5', heading: { en: 'Four strategies: variation, education, migration, friction', de: 'Vier Strategien: Variation, Bildung, Migration, Reibung' },
        body: {
          en: '<p><strong>Variation</strong> means seeking out differences actively rather than tolerating them passively. The phrase “I see this differently” marks tension and respects both views at once. <strong>Education</strong> should teach how to think, not what. The chapter’s example is how parents talk about race: a well-meant “colour-blind” frame ignores differences and so erases the experience of people facing discrimination; a “colourful” frame names them, which makes them discussable.</p><p><strong>Migration and mobility</strong> bring outside frames into a system. Richard Florida found that technology, talent and above all tolerance distinguished successful regions. The authors contrast Europe’s assimilation approach with the American “stew”, in which communities stay distinct, and point to the many immigrants among US tech founders. <strong>Friction</strong>, finally, is the price of pluralism and its energy. Jürgen Habermas’s public sphere, deliberative polls (a diverse group polled before and after informed debate), and Roberto Unger’s “empowered democracy”, with local counter-models and every subject taught from at least two viewpoints, are ways to channel it.</p><p>The first two strategies work on individuals, the last two on society. None of them makes conflict disappear; they make it productive.</p>',
          de: '<p><strong>Variation</strong> heißt, Unterschiede aktiv zu suchen statt sie passiv zu dulden. Der Satz „Ich sehe das anders“ markiert die Spannung und respektiert zugleich beide Sichtweisen. <strong>Bildung</strong> soll lehren, wie man denkt, nicht was. Das Beispiel des Kapitels ist, wie Eltern über Hautfarbe sprechen: Ein gut gemeinter „farbenblinder“ Frame übergeht Unterschiede und löscht damit die Erfahrung von Menschen, die Diskriminierung erleben; ein „farbbewusster“ Frame benennt sie und macht sie so besprechbar.</p><p><strong>Migration und Mobilität</strong> tragen fremde Frames in ein System. Richard Florida fand, dass Technologie, Talent und vor allem Toleranz erfolgreiche Regionen auszeichnen. Die Autoren stellen Europas Assimilationsansatz dem amerikanischen „Eintopf“ gegenüber, in dem Communities unterscheidbar bleiben, und verweisen auf die vielen Eingewanderten unter den Gründerinnen und Gründern der US-Techbranche. <strong>Reibung</strong> schließlich ist Preis und Energie des Pluralismus. Jürgen Habermas’ Öffentlichkeit, deliberative Umfragen (eine gemischte Gruppe wird vor und nach informierter Debatte befragt) und Roberto Ungers „ermächtigte Demokratie“ mit lokalen Gegenmodellen und Unterricht jedes Fachs aus mindestens zwei Blickwinkeln sind Wege, sie zu kanalisieren.</p><p>Die ersten beiden Strategien wirken auf Einzelne, die letzten beiden auf die Gesellschaft. Keine lässt Konflikt verschwinden; alle machen ihn produktiv.</p>'
        },
        visual: { svg: strategies, position: 'bottom',
          caption: { en: 'The chapter’s four levers, sorted by level. Each one adds frames or keeps them in contact; none of them is free of cost.', de: 'Die vier Hebel des Kapitels, nach Ebene sortiert. Jeder fügt Frames hinzu oder hält sie in Kontakt; keiner ist kostenlos.' } },
        keyIdea: { en: 'Pluralism is maintained by practice, not declared by principle.', de: 'Pluralismus wird durch Praxis erhalten, nicht durch Prinzip erklärt.' } },
    ],
    exercise: {
      type: 'scenario',
      title: { en: 'A frame under pressure: suppress, ignore, argue or institutionalise?', de: 'Ein Frame unter Druck: unterdrücken, ignorieren, widerlegen oder institutionalisieren?' },
      instructions: {
        en: '<p>Four situations from organisations. In each, a frame is being challenged, or is challenging others. Choose the response that best fits the chapter’s rule (“the only bad frame is one that denies other frames”), its default to tolerance and Popper’s paradox. The feedback explains why, including where the rule itself runs out.</p>',
        de: '<p>Vier Situationen aus Organisationen. In jeder wird ein Frame herausgefordert oder fordert andere heraus. Wähle die Reaktion, die am besten zur Regel des Kapitels („Der einzig schlechte Frame ist einer, der andere Frames verneint“), zum Grundsatz „im Zweifel Toleranz“ und zu Poppers Paradox passt. Das Feedback erklärt, warum, auch dort, wo die Regel selbst an ihre Grenze kommt.</p>'
      },
      steps: [
        { situation: { en: 'The leadership team has decided on a platform strategy. One senior architect keeps saying in every steering meeting: “I see this differently, the integration risk is underestimated.” Several members are irritated: “The decision has been made.”', de: 'Das Führungsteam hat eine Plattformstrategie beschlossen. Eine leitende Architektin sagt in jedem Steuerkreis: „Ich sehe das anders, das Integrationsrisiko ist unterschätzt.“ Mehrere Mitglieder sind genervt: „Die Entscheidung ist gefallen.“' },
          options: [
            { text: { en: 'Take her off the steering group so the team can move forward.', de: 'Sie aus dem Steuerkreis nehmen, damit das Team vorankommt.' }, good: false,
              feedback: { en: 'This removes a frame to gain speed: the Route 128 move. You lose exactly the perspective you would need if the integration risk materialises, and you signal to everyone else what dissent costs.', de: 'Das entfernt einen Frame, um Tempo zu gewinnen: der Route-128-Zug. Du verlierst genau die Perspektive, die du bräuchtest, wenn das Integrationsrisiko eintritt, und zeigst allen anderen, was Widerspruch kostet.' } },
            { text: { en: 'Give her frame a defined place: a short risk review at each milestone, with criteria agreed in advance for when the strategy would be revisited.', de: 'Ihrem Frame einen festen Ort geben: eine kurze Risikoprüfung an jedem Meilenstein, mit vorab vereinbarten Kriterien, wann die Strategie neu bewertet wird.' }, good: true,
              feedback: { en: 'Friction turned into a feature. The decision stands, the dissenting frame stays alive and testable, much like Unger’s “counter-models” that let a society hedge its bets. Agreed criteria also stop the debate from becoming a weekly ritual.', de: 'Reibung als Feature. Die Entscheidung steht, der abweichende Frame bleibt lebendig und prüfbar, ähnlich wie Ungers „Gegenmodelle“, mit denen eine Gesellschaft ihre Wetten absichert. Vereinbarte Kriterien verhindern zudem, dass die Debatte zum wöchentlichen Ritual wird.' } },
            { text: { en: 'Let her speak, thank her, and move on to the next agenda item.', de: 'Sie reden lassen, ihr danken und zum nächsten Tagesordnungspunkt gehen.' }, good: false,
              feedback: { en: 'Formally tolerant, in effect a denial. The frame is heard but has no consequence; the chapter would call this the quiet version of a monoculture, the kind that forms through social pressure rather than rules.', de: 'Formal tolerant, faktisch eine Verneinung. Der Frame wird gehört, bleibt aber folgenlos; das Kapitel würde darin die leise Form der Monokultur sehen, die durch sozialen Druck statt durch Regeln entsteht.' } },
          ] },
        { situation: { en: 'In a working group on hybrid work, a vocal faction demands that colleagues who favour more office presence be excluded: “They are blocking progress and their view is outdated.”', de: 'In einer Arbeitsgruppe zu hybrider Arbeit fordert eine lautstarke Fraktion, Kolleginnen und Kollegen auszuschließen, die mehr Präsenz befürworten: „Die blockieren den Fortschritt, ihre Sicht ist von gestern.“' },
          options: [
            { text: { en: 'Agree, since the faction’s position is closer to the organisation’s strategy.', de: 'Zustimmen, weil die Position der Fraktion näher an der Unternehmensstrategie liegt.' }, good: false,
              feedback: { en: 'Being closer to the official line does not license excluding others. The demand itself is the problem: it is a frame aimed at removing another frame, which is exactly what the chapter rules out.', de: 'Nähe zur offiziellen Linie berechtigt nicht zum Ausschluss anderer. Das Problem ist die Forderung selbst: Sie ist ein Frame, der einen anderen Frame entfernen will, genau das, was das Kapitel ausschließt.' } },
            { text: { en: 'Avoid the conflict by splitting into two separate groups that never meet.', de: 'Den Konflikt vermeiden, indem zwei getrennte Gruppen gebildet werden, die sich nie begegnen.' }, good: false,
              feedback: { en: 'Both frames survive, but the friction that would make them productive is lost. Pluralism, in the authors’ sense, means frames that compete and collide, not parallel bubbles.', de: 'Beide Frames überleben, aber die Reibung, die sie produktiv machen würde, geht verloren. Pluralismus im Sinne der Autoren heißt, dass Frames konkurrieren und aufeinanderprallen, nicht parallele Blasen.' } },
            { text: { en: 'Refuse the exclusion explicitly, name the rule (criticise views, don’t remove people for holding them), and ask both sides to argue their case with evidence.', de: 'Den Ausschluss ausdrücklich ablehnen, die Regel benennen (Sichtweisen kritisieren, Menschen nicht wegen ihrer Sicht entfernen) und beide Seiten bitten, ihre Position mit Belegen zu vertreten.' }, good: true,
              feedback: { en: 'You protect the minority frame and the faction’s right to argue hard against it. “Outdated” is a legitimate claim to defend; “exclude them” is not. Note the hard part: the faction will experience this as taking sides.', de: 'Du schützt den Minderheiten-Frame und zugleich das Recht der Fraktion, hart dagegen zu argumentieren. „Von gestern“ ist eine legitime Behauptung, die man begründen kann; „schließt sie aus“ ist es nicht. Beachte den schwierigen Teil: Die Fraktion wird das als Parteinahme erleben.' } },
          ] },
        { situation: { en: 'In the internal network, a group of employees is spreading the claim that the new AI assistant secretly rates individual performance. It is factually wrong, but the posts are getting many likes.', de: 'Im internen Netzwerk verbreitet eine Gruppe Mitarbeitender, der neue KI-Assistent bewerte heimlich individuelle Leistung. Das ist sachlich falsch, aber die Beiträge bekommen viel Zustimmung.' },
          options: [
            { text: { en: 'Delete the posts and close the thread to stop misinformation.', de: 'Die Beiträge löschen und den Thread schließen, um Falschinformation zu stoppen.' }, good: false,
              feedback: { en: 'The flat-Earth case: a wrong frame is a reason to argue against it, not to deny its existence. Deleting it also confirms the suspicion behind it, that something is being hidden.', de: 'Der Fall der flachen Erde: Ein falscher Frame ist ein Grund, ihm zu widersprechen, nicht, ihm die Existenz abzusprechen. Löschen bestätigt zudem den Verdacht dahinter, dass etwas verborgen wird.' } },
            { text: { en: 'Answer in the thread: show what the system logs and what it does not, offer an open Q&A, and involve the works council in checking it.', de: 'Im Thread antworten: zeigen, was das System protokolliert und was nicht, eine offene Fragerunde anbieten und den Betriebsrat in die Prüfung einbeziehen.' }, good: true,
              feedback: { en: 'Resist the frame with arguments and evidence, in the same space where it circulates. Involving an independent body follows the chapter’s point that judging frames should not be left to one authority. The frame also tells you something: trust is low.', de: 'Dem Frame mit Argumenten und Belegen entgegentreten, im selben Raum, in dem er kursiert. Ein unabhängiges Gremium einzubeziehen folgt dem Punkt des Kapitels, dass das Urteil über Frames nicht einer einzigen Instanz überlassen werden sollte. Der Frame sagt dir außerdem etwas: Das Vertrauen ist niedrig.' } },
            { text: { en: 'Ignore it; rumours die down on their own.', de: 'Ignorieren; Gerüchte legen sich von selbst.' }, good: false,
              feedback: { en: 'Tolerance is not indifference. A wrong frame that nobody contests can become the dominant one, and the chapter counts complacency among the forces that erode pluralism.', de: 'Toleranz ist nicht Gleichgültigkeit. Ein falscher Frame, dem niemand widerspricht, kann zum dominanten werden, und das Kapitel zählt Bequemlichkeit zu den Kräften, die Pluralismus aushöhlen.' } },
          ] },
        { situation: { en: 'Hard case: a group of managers openly campaigns to abolish the anonymous feedback channel and to “stop giving critics a platform”. They argue this is just their frame and that pluralism obliges you to tolerate it.', de: 'Schwieriger Fall: Eine Gruppe von Führungskräften wirbt offen dafür, den anonymen Feedbackkanal abzuschaffen und „Kritikerinnen und Kritikern keine Bühne mehr zu geben“. Sie argumentiert, das sei eben ihr Frame, und Pluralismus verpflichte dich, ihn zu tolerieren.' },
          options: [
            { text: { en: 'Accept the argument: pluralism means every frame gets its place, including this one.', de: 'Das Argument akzeptieren: Pluralismus heißt, jeder Frame bekommt seinen Platz, auch dieser.' }, good: false,
              feedback: { en: 'This is Popper’s paradox in miniature. Tolerating a frame whose goal is to remove other frames ends in fewer frames. The chapter’s exception exists precisely for this case.', de: 'Das ist Poppers Paradox im Kleinen. Einen Frame zu dulden, dessen Ziel die Beseitigung anderer Frames ist, endet in weniger Frames. Die Ausnahme des Kapitels existiert genau für diesen Fall.' } },
            { text: { en: 'Hand the question quietly to Legal and Compliance and let them decide.', de: 'Die Frage still an Recht und Compliance geben und dort entscheiden lassen.' }, good: false,
              feedback: { en: 'Outsourcing the judgement is what the authors warn against: evaluating a frame that attacks pluralism is a shared responsibility. A quiet decision also deprives everyone of the argument.', de: 'Das Urteil auszulagern ist genau das, wovor die Autoren warnen: Einen Frame zu bewerten, der Pluralismus angreift, ist gemeinsame Verantwortung. Eine stille Entscheidung nimmt zudem allen die Auseinandersetzung.' } },
            { text: { en: 'Keep debating their criticism of the channel openly, but do not abolish it; state clearly that the line is the removal of other voices, and decide this in a broad, transparent forum.', de: 'Ihre Kritik am Kanal weiter offen diskutieren, ihn aber nicht abschaffen; klar sagen, dass die Grenze das Entfernen anderer Stimmen ist, und das in einem breiten, transparenten Forum entscheiden.' }, good: true,
              feedback: { en: 'You separate the legitimate frame (“the channel has flaws”) from the bad one (“silence the critics”). But notice what the rule did not do: it did not tell you who draws the line. You had to supply a procedure. That gap is the chapter’s weak spot.', de: 'Du trennst den legitimen Frame („der Kanal hat Schwächen“) vom schlechten („bringt die Kritik zum Schweigen“). Aber beachte, was die Regel nicht geleistet hat: Sie sagt nicht, wer die Grenze zieht. Das Verfahren musstest du selbst liefern. Diese Lücke ist der Schwachpunkt des Kapitels.' } },
          ] },
      ],
    },
    caseStudy: {
      title: { en: 'Freedom to Marry: from “rights” to “love”', de: 'Freedom to Marry: von „Rechten“ zu „Liebe“' },
      body: {
        en: '<p>In 1995 about a quarter of Americans supported same-sex marriage; by 2020 almost 70 percent did. Demographic change explains part of the shift: with fewer children, marriage became more about a stable relationship than about reproduction. The authors point to something else.</p><p>For years the movement argued in terms of legal rights and made little headway. Kevin Nix, who led communications at the organisation Freedom to Marry, later called the legal frame “sterile, materialistic, and unpersuasive”. In the early 2000s the campaign studied polls and focus groups to understand where hesitant people stood, and settled on the reasons most people marry: love, commitment and family. Gay people from many walks of life, and straight parents speaking for their children, carried the message into advertising, the press and television storylines.</p><p>The aim, the authors stress, was not to declare opponents’ frame illegitimate but to place same-sex marriage within a frame many already held. In 2011 support overtook opposition for the first time. Only 14 percent of people described the issue in terms of liberty, 32 percent in terms of love. In 2015 the Supreme Court recognised the right to marry for same-sex couples.</p>',
        de: '<p>1995 befürwortete etwa ein Viertel der US-Bevölkerung die gleichgeschlechtliche Ehe, 2020 waren es fast 70 Prozent. Demografischer Wandel erklärt einen Teil davon: Mit weniger Kindern wurde die Ehe stärker eine Frage stabiler Beziehung als der Fortpflanzung. Die Autoren verweisen auf etwas anderes.</p><p>Jahrelang argumentierte die Bewegung mit rechtlichen Ansprüchen und kam kaum voran. Kevin Nix, der die Kommunikation der Organisation Freedom to Marry leitete, nannte den rechtlichen Frame später steril, materialistisch und nicht überzeugend. Anfang der 2000er Jahre wertete die Kampagne Umfragen und Fokusgruppen aus, um zu verstehen, wo zögernde Menschen standen, und entschied sich für die Gründe, aus denen die meisten heiraten: Liebe, Bindung und Familie. Homosexuelle Menschen aus allen Lebensbereichen und heterosexuelle Eltern, die für ihre Kinder eintraten, trugen die Botschaft in Werbung, Presse und Fernsehserien.</p><p>Ziel war, so betonen die Autoren, nicht, den Frame der Gegnerinnen und Gegner für illegitim zu erklären, sondern die gleichgeschlechtliche Ehe in einen Frame zu stellen, den viele schon hatten. 2011 überwog die Zustimmung erstmals die Ablehnung. Nur 14 Prozent beschrieben das Thema mit Freiheit, 32 Prozent mit Liebe. 2015 erkannte der Supreme Court das Recht gleichgeschlechtlicher Paare auf Eheschließung an.</p>'
      },
      lesson: {
        en: 'The authors read this as pluralism at work: “I see this differently” without delegitimising the other side. Read it twice, though. It is equally a textbook case of strategic reframing, meeting a majority inside its existing frame, and that technique is available to any movement, pluralist or not. See “Question the book”.',
        de: 'Die Autoren lesen das als gelebten Pluralismus: „Ich sehe das anders“, ohne die andere Seite zu delegitimieren. Lies es aber zweimal. Es ist ebenso ein Lehrbuchfall strategischen Reframings, das eine Mehrheit in ihrem bestehenden Frame abholt, und diese Technik steht jeder Bewegung offen, ob pluralistisch oder nicht. Siehe „Das Buch hinterfragen“.'
      },
      visual: { svg: caseBars,
        caption: { en: 'How respondents described the issue at the time of the crossover, as reported in the chapter. The values are the book’s; the bars are drawn to scale.', de: 'Wie Befragte das Thema zur Zeit des Kipppunkts beschrieben, laut Kapitel. Die Werte stammen aus dem Buch; die Balken sind maßstabsgetreu.' } },
    },
    reflection: {
      intro: { en: 'Look for single frames of truth where you work. They are hardest to see from the inside, because they feel like common sense.', de: 'Such nach einzigen Wahrheits-Frames dort, wo du arbeitest. Von innen sind sie am schwersten zu sehen, weil sie sich wie gesunder Menschenverstand anfühlen.' },
      prompts: [
        { en: 'Which frame in your organisation or client system has been so successful that no one questions it anymore? What would have to happen for it to fail, and who would notice first?', de: 'Welcher Frame in deiner Organisation oder deinem Kundensystem war so erfolgreich, dass ihn niemand mehr hinterfragt? Was müsste passieren, damit er scheitert, und wer würde es zuerst merken?' },
        { en: 'When did you last say, in substance, “I see this differently” to someone above you? What did it cost, and what made it possible or impossible?', de: 'Wann hast du zuletzt jemandem über dir sinngemäß gesagt „Ich sehe das anders“? Was hat es gekostet, und was hat es möglich oder unmöglich gemacht?' },
        { en: 'Where do you yourself tend to judge another frame with that “extra-critical eye” the authors describe? What would defaulting to tolerance look like there?', de: 'Wo neigst du selbst dazu, einen fremden Frame mit dem „besonders kritischen Blick“ zu beurteilen, den die Autoren beschreiben? Wie sähe es dort aus, im Zweifel tolerant zu sein?' },
      ],
      placeholder: { en: 'The frame nobody questions here is… It would fail if…', de: 'Der Frame, den hier niemand hinterfragt, ist … Er würde scheitern, wenn …' },
    },
    quiz: [
      { q: { en: 'A board argues: “We have a strategy that works. Debating alternatives just costs time.” Which argument from the chapter speaks most directly against this?', de: 'Ein Vorstand argumentiert: „Wir haben eine Strategie, die funktioniert. Über Alternativen zu debattieren kostet nur Zeit.“ Welches Argument des Kapitels spricht am direktesten dagegen?' },
        options: [
          { en: 'Debating alternatives is a moral duty in a democratic organisation.', de: 'Über Alternativen zu debattieren ist in einer demokratischen Organisation moralische Pflicht.' },
          { en: 'Every strategy is equally valid, so the board has no grounds to prefer one.', de: 'Jede Strategie ist gleich gültig, der Vorstand hat also keinen Grund, eine zu bevorzugen.' },
          { en: 'Alternative frames are insurance: their value shows when conditions change, and success makes us least likely to keep them.', de: 'Alternative Frames sind eine Versicherung: Ihr Wert zeigt sich, wenn sich die Lage ändert, und gerade Erfolg macht es unwahrscheinlich, dass wir sie behalten.' },
          { en: 'Successful strategies should be changed regularly to avoid routine.', de: 'Erfolgreiche Strategien sollten regelmäßig gewechselt werden, um Routine zu vermeiden.' },
        ],
        answer: 2, explain: { en: 'The authors argue pragmatically, not morally (option 1), and explicitly say frames are not equal in value (option 2). The point is not to switch for its own sake (option 4) but to keep alternatives alive, like the trader who should have had a second strategy ready.', de: 'Die Autoren argumentieren pragmatisch, nicht moralisch (Option 1), und sagen ausdrücklich, dass Frames nicht gleichwertig sind (Option 2). Es geht nicht um Wechsel um seiner selbst willen (Option 4), sondern darum, Alternativen am Leben zu halten, wie der Händler, der eine zweite Strategie hätte bereithalten sollen.' } },
      { q: { en: 'Which of these would the chapter classify as a “bad frame” in its strict sense?', de: 'Was würde das Kapitel im strengen Sinn als „schlechten Frame“ einordnen?' },
        options: [
          { en: 'A campaign demanding that a particular viewpoint be banned from public debate.', de: 'Eine Kampagne, die fordert, eine bestimmte Sichtweise aus der öffentlichen Debatte zu verbannen.' },
          { en: 'The belief that the Earth is flat.', de: 'Die Überzeugung, dass die Erde flach ist.' },
          { en: 'The claim that humans are not causing climate change.', de: 'Die Behauptung, dass der Mensch den Klimawandel nicht verursacht.' },
          { en: 'A harsh public critique arguing that a competing economic model is inferior.', de: 'Eine scharfe öffentliche Kritik, die ein konkurrierendes Wirtschaftsmodell für unterlegen erklärt.' },
        ],
        answer: 0, explain: { en: 'Options 2 and 3 are wrong frames, but they are to be argued against, not denied. Option 4 is exactly the robust give-and-take the authors welcome. Only option 1 aims to eliminate another frame.', de: 'Die Optionen 2 und 3 sind falsche Frames, denen man widersprechen, die man aber nicht verneinen soll. Option 4 ist genau das kräftige Geben und Nehmen, das die Autoren begrüßen. Nur Option 1 zielt darauf, einen anderen Frame zu beseitigen.' } },
      { q: { en: 'A country holds free elections, but almost all citizens share one worldview, and dissenting views are socially frowned upon. How does the chapter classify it?', de: 'Ein Land hält freie Wahlen ab, aber fast alle Bürgerinnen und Bürger teilen eine Weltsicht, und abweichende Ansichten sind sozial verpönt. Wie ordnet das Kapitel es ein?' },
        options: [
          { en: 'Pluralist, because democracy guarantees pluralism.', de: 'Pluralistisch, weil Demokratie Pluralismus garantiert.' },
          { en: 'Not a democracy, because democracy requires pluralism.', de: 'Keine Demokratie, weil Demokratie Pluralismus voraussetzt.' },
          { en: 'Totalitarian, because social pressure is a form of censorship.', de: 'Totalitär, weil sozialer Druck eine Form von Zensur ist.' },
          { en: 'Democratic but cognitively homogeneous, like Victorian England in the authors’ example, and therefore vulnerable when change demands reframing.', de: 'Demokratisch, aber kognitiv homogen, wie im Beispiel der Autoren das viktorianische England, und deshalb verwundbar, wenn Wandel Reframing verlangt.' },
        ],
        answer: 3, explain: { en: 'The authors separate the two axes: who decides (democracy) and how many frames are available (pluralism). They also note that in democracies the slide towards a single frame often happens through social pressure rather than law.', de: 'Die Autoren trennen zwei Achsen: wer entscheidet (Demokratie) und wie viele Frames verfügbar sind (Pluralismus). Sie halten auch fest, dass das Abgleiten zu einem einzigen Frame in Demokratien oft über sozialen Druck statt über Gesetze geschieht.' } },
      { q: { en: 'A corporate group runs ten national subsidiaries. Head office wants to standardise all processes centrally to cut costs. Which lesson from the Route 128 and China/Europe comparisons fits best?', de: 'Ein Konzern führt zehn Landesgesellschaften. Die Zentrale will alle Prozesse zentral vereinheitlichen, um Kosten zu sparen. Welche Lehre aus den Vergleichen Route 128 und China/Europa passt am besten?' },
        options: [
          { en: 'Centralisation always fails and should be avoided.', de: 'Zentralisierung scheitert immer und ist zu vermeiden.' },
          { en: 'Standardise where efficiency matters, but keep some units free to run different approaches, so a single decision at the top cannot shut down every alternative.', de: 'Dort vereinheitlichen, wo Effizienz zählt, aber einige Einheiten frei lassen, andere Ansätze zu fahren, damit eine einzige Entscheidung an der Spitze nicht alle Alternativen abschalten kann.' },
          { en: 'Decentralise fully, because fragmentation produces innovation.', de: 'Vollständig dezentralisieren, weil Zersplitterung Innovation erzeugt.' },
          { en: 'Let the most successful subsidiary’s processes become the group standard.', de: 'Die Prozesse der erfolgreichsten Landesgesellschaft zum Konzernstandard machen.' },
        ],
        answer: 1, explain: { en: 'China’s centralisation brought centuries of leadership; Europe’s fragmentation brought constant war. The lesson is not a blanket rule (options 1 and 3) but Unger’s hedge: allow local counter-models. Option 4 is the stock trader’s mistake applied to a whole group.', de: 'Chinas Zentralisierung brachte jahrhundertelange Führung, Europas Zersplitterung ständigen Krieg. Die Lehre ist keine Pauschalregel (Optionen 1 und 3), sondern Ungers Absicherung: lokale Gegenmodelle zulassen. Option 4 ist der Fehler des Börsenhändlers, übertragen auf einen ganzen Konzern.' } },
      { q: { en: 'A manager says: “In my team I don’t see gender or origin, only performance.” How would the chapter’s education strategy assess this?', de: 'Eine Führungskraft sagt: „In meinem Team sehe ich weder Geschlecht noch Herkunft, nur Leistung.“ Wie würde die Bildungsstrategie des Kapitels das bewerten?' },
        options: [
          { en: 'As exemplary, because it treats everyone equally.', de: 'Als vorbildlich, weil es alle gleich behandelt.' },
          { en: 'As irrelevant, because frames are only about cognition, not identity.', de: 'Als irrelevant, weil es bei Frames nur um Kognition geht, nicht um Identität.' },
          { en: 'As a well-meant “colour-blind” frame that risks ignoring differences people actually experience, and thus reducing variety instead of using it.', de: 'Als gut gemeinten „farbenblinden“ Frame, der Gefahr läuft, tatsächlich erlebte Unterschiede zu übergehen und so Vielfalt zu verringern statt sie zu nutzen.' },
          { en: 'As discriminatory, because it denies other frames.', de: 'Als diskriminierend, weil es andere Frames verneint.' },
        ],
        answer: 2, explain: { en: 'The chapter treats colour-blindness as a frame that erases variation. Option 4 overshoots: the manager does not seek to eliminate other frames, so this is not the “bad frame”; it is a frame to argue with.', de: 'Das Kapitel behandelt Farbenblindheit als Frame, der Variation auslöscht. Option 4 schießt über das Ziel hinaus: Die Führungskraft will andere Frames nicht beseitigen, es ist also nicht der „schlechte Frame“, sondern einer, mit dem man argumentieren sollte.' } },
      { q: { en: 'A company wants to turn conflicting views on a contested restructuring into better decisions. Which format is closest to the chapter’s “friction” strategy?', de: 'Ein Unternehmen will widerstreitende Sichtweisen zu einer umstrittenen Umstrukturierung in bessere Entscheidungen verwandeln. Welches Format kommt der Strategie „Reibung“ des Kapitels am nächsten?' },
        options: [
          { en: 'A deliberately mixed group, polled before and after an informed debate with briefing material and experts, without requiring consensus.', de: 'Eine bewusst gemischte Gruppe, vor und nach einer informierten Debatte mit Briefingmaterial und Fachleuten befragt, ohne Konsenszwang.' },
          { en: 'An anonymous survey whose majority result is implemented.', de: 'Eine anonyme Umfrage, deren Mehrheitsergebnis umgesetzt wird.' },
          { en: 'A panel in which two prominent executives debate on behalf of everyone else.', de: 'Ein Podium, auf dem zwei prominente Führungskräfte stellvertretend für alle anderen debattieren.' },
          { en: 'A consensus workshop that continues until everyone agrees.', de: 'Ein Konsensworkshop, der so lange läuft, bis alle zustimmen.' },
        ],
        answer: 0, explain: { en: 'That is the deliberative poll. Option 2 counts frames but does not let them collide; option 3 is the proxy debate the authors criticise (Carlson versus Maddow); option 4 aims at convergence, the opposite of pluralism’s goal.', de: 'Das ist die deliberative Umfrage. Option 2 zählt Frames, lässt sie aber nicht aufeinandertreffen; Option 3 ist die Stellvertreterdebatte, die die Autoren kritisieren (Carlson gegen Maddow); Option 4 zielt auf Konvergenz, das Gegenteil dessen, was Pluralismus will.' } },
    ],
    flashcards: [
      { front: { en: 'Frame pluralism', de: 'Frame-Pluralismus' }, back: { en: 'The coexistence of many competing frames in a society. Defended pragmatically as insurance for change, not as a moral end in itself.', de: 'Das Nebeneinander vieler konkurrierender Frames in einer Gesellschaft. Pragmatisch begründet als Versicherung für den Wandel, nicht als moralischer Selbstzweck.' } },
      { front: { en: 'The only bad frame', de: 'Der einzig schlechte Frame' }, back: { en: 'One that denies other frames. Wrong frames are to be argued against; only frames that seek to eliminate alternatives cross the line.', de: 'Einer, der andere Frames verneint. Falschen Frames widerspricht man; die Grenze überschreiten nur Frames, die Alternativen beseitigen wollen.' } },
      { front: { en: 'Paradox of tolerance (Popper)', de: 'Paradox der Toleranz (Popper)' }, back: { en: 'Unlimited tolerance of the intolerant leads to the end of tolerance. The chapter’s exception to its “no bad frames” rule answers it.', de: 'Unbegrenzte Toleranz gegenüber Intoleranten führt zum Ende der Toleranz. Die Ausnahme von der Regel „keine schlechten Frames“ ist die Antwort des Kapitels darauf.' } },
      { front: { en: 'Cognitive oppression', de: 'Kognitive Unterdrückung' }, back: { en: 'Restricting what people may think and imagine. Recognisable by absence: frames that never form.', de: 'Die Einschränkung dessen, was Menschen denken und sich vorstellen dürfen. Erkennbar am Fehlen: an Frames, die nie entstehen.' } },
      { front: { en: 'Route 128 vs. Silicon Valley', de: 'Route 128 vs. Silicon Valley' }, back: { en: 'Saxenian: closed, hierarchical firms with little job mobility lost to an open network of small rivals. Frame diversity through mobility.', de: 'Saxenian: Geschlossene, hierarchische Firmen mit wenig Jobwechsel verloren gegen ein offenes Netz kleiner Konkurrenten. Frame-Vielfalt durch Mobilität.' } },
      { front: { en: 'Pluralism ≠ democracy', de: 'Pluralismus ≠ Demokratie' }, back: { en: 'Democracy: who decides. Pluralism: how many frames are available. Victorian England was democratic and homogeneous; Rome plural and autocratic.', de: 'Demokratie: wer entscheidet. Pluralismus: wie viele Frames verfügbar sind. Das viktorianische England war demokratisch und homogen, Rom plural und autokratisch.' } },
      { front: { en: 'Four strategies', de: 'Vier Strategien' }, back: { en: 'Personal: variation (“I see this differently”), education (name differences). Societal: migration (outside frames), friction (public sphere, deliberation).', de: 'Persönlich: Variation („Ich sehe das anders“), Bildung (Unterschiede benennen). Gesellschaftlich: Migration (fremde Frames), Reibung (Öffentlichkeit, Deliberation).' } },
      { front: { en: 'Shklar: decisions without fear', de: 'Shklar: Entscheiden ohne Furcht' }, back: { en: 'Rights alone do not secure pluralism. It needs conditions in which people can decide and stand up to power without fear. Symbol: Fearless Girl facing the bull.', de: 'Rechte allein sichern keinen Pluralismus. Es braucht Bedingungen, unter denen Menschen ohne Furcht entscheiden und sich der Macht entgegenstellen können. Symbol: Fearless Girl vor dem Bullen.' } },
    ],
    critique: [
      { claim: { en: 'The only bad frame is one that denies other frames; this simple rule tells us which frames to resist.', de: 'Der einzig schlechte Frame ist einer, der andere Frames verneint; diese einfache Regel sagt uns, welchen Frames wir uns widersetzen sollen.' },
        challenge: { en: 'The rule names a criterion but not a judge or a procedure, and the authors concede there is “no easy way” to identify bad frames. Their own examples show the gap: they list student activists and “Eastern European politicians” and call cancel culture pernicious, a selection that reflects a particular political frame. Almost any side can describe its opponents as “denying other frames”. Popper himself drew the line more operationally, at the refusal to argue and the resort to force. Without a procedural answer (who decides, by which process, with what appeal), the rule is a principle, not a tool. The exercise above shows that you have to supply the procedure yourself.', de: 'Die Regel nennt ein Kriterium, aber keine urteilende Instanz und kein Verfahren, und die Autoren räumen ein, dass es keinen einfachen Weg gibt, schlechte Frames zu erkennen. Ihre eigenen Beispiele zeigen die Lücke: Sie nennen studentische Aktivistinnen und Aktivisten und „osteuropäische Politiker“ und halten Cancel Culture für verderblich, eine Auswahl, die einen bestimmten politischen Frame spiegelt. Fast jede Seite kann ihre Gegnerschaft als „Verneinung anderer Frames“ beschreiben. Popper selbst zog die Linie operationaler: bei der Weigerung zu argumentieren und beim Griff zur Gewalt. Ohne Antwort auf die Verfahrensfrage (wer entscheidet, in welchem Prozess, mit welcher Einspruchsmöglichkeit) bleibt die Regel ein Prinzip, kein Werkzeug. Die Übung oben zeigt, dass du das Verfahren selbst liefern musst.' } },
      { claim: { en: 'Unified China stagnated while fragmented Europe innovated; frame pluralism explains the difference.', de: 'Das geeinte China stagnierte, das zersplitterte Europa innovierte; Frame-Pluralismus erklärt den Unterschied.' },
        challenge: { en: 'This is a well-known but contested thesis in the “Great Divergence” debate. Kenneth Pomeranz and others argue that core regions of China were economically comparable to England into the eighteenth century, and that Europe’s lead owed much to coal and colonial resources. The Qing economy was dynamic and commercially competitive; the end of the Ming voyages had fiscal and strategic reasons, not only ideological ones. And Europe’s fragmentation also meant near-permanent war, which the chapter mentions only in passing. A single variable explaining two thousand years of history should make you suspicious, especially when the cases were selected after the outcome was known.', de: 'Das ist eine bekannte, aber umstrittene These in der Debatte um die „Great Divergence“. Kenneth Pomeranz und andere argumentieren, dass Kernregionen Chinas bis ins 18. Jahrhundert wirtschaftlich mit England vergleichbar waren und Europas Vorsprung viel mit Kohle und kolonialen Ressourcen zu tun hatte. Die Qing-Wirtschaft war dynamisch und kommerziell kompetitiv; das Ende der Ming-Flottenfahrten hatte fiskalische und strategische Gründe, nicht nur ideologische. Und Europas Zersplitterung bedeutete auch nahezu dauerhaften Krieg, was das Kapitel nur am Rand erwähnt. Eine einzige Variable, die zweitausend Jahre Geschichte erklärt, sollte dich misstrauisch machen, zumal die Fälle in Kenntnis des Ausgangs ausgewählt wurden.' } },
      { claim: { en: 'Migration and social diversity increase a society’s frame pluralism and pay a diversity dividend.', de: 'Migration und soziale Vielfalt erhöhen den Frame-Pluralismus einer Gesellschaft und zahlen eine Vielfaltsdividende.' },
        challenge: { en: 'Two problems. First, the chapter again uses social diversity (origin, culture) as a proxy for frame diversity, although the previous chapter warned precisely against that: Norwegian boards became more female without becoming more cognitively diverse, and the same chapter calls Silicon Valley, with all its immigrant founders, a monoculture of people who think alike. Second, defending migration by its framing dividend is an instrumental argument: people are valued for the perspectives they supply. That sits uneasily with the book’s humanism, and it is fragile, because an instrumental argument can be turned against those who do not deliver the expected dividend. The list of famous immigrant founders is also a classic survivorship sample.', de: 'Zwei Probleme. Erstens nutzt das Kapitel wieder soziale Vielfalt (Herkunft, Kultur) als Stellvertreter für Frame-Vielfalt, obwohl das vorige Kapitel genau davor gewarnt hat: Norwegische Aufsichtsräte wurden weiblicher, ohne kognitiv vielfältiger zu werden, und dasselbe Kapitel nennt das Silicon Valley, trotz all seiner eingewanderten Gründerinnen und Gründer, eine Monokultur Gleichdenkender. Zweitens ist die Verteidigung von Migration über ihre Framing-Dividende ein instrumentelles Argument: Menschen werden für die Perspektiven geschätzt, die sie liefern. Das verträgt sich schlecht mit dem Humanismus des Buchs und ist fragil, weil sich ein instrumentelles Argument gegen jene wenden lässt, die die erwartete Dividende nicht liefern. Die Liste berühmter eingewanderter Gründerpersonen ist zudem eine klassische Survivorship-Stichprobe.' } },
      { claim: { en: 'The same-sex marriage campaign shows pluralism succeeding: no one was forced to adopt a frame.', de: 'Die Kampagne für die gleichgeschlechtliche Ehe zeigt gelingenden Pluralismus: Niemand wurde gezwungen, einen Frame zu übernehmen.' },
        challenge: { en: 'What the case actually shows is persuasion through frame alignment: a movement tested messages with polls and focus groups and moved a majority into a frame it already held. That is skilled reframing, the subject of chapter 6, and it ended in a single binding legal answer, not in coexisting frames. The same technique works for any cause, including ones that narrow frame space. The case is a strong argument for the power of framing; as evidence for pluralism it is weaker than the chapter suggests.', de: 'Was der Fall tatsächlich zeigt, ist Überzeugung durch Frame-Anschluss: Eine Bewegung testete Botschaften mit Umfragen und Fokusgruppen und bewegte eine Mehrheit in einen Frame, den sie schon hatte. Das ist gekonntes Reframing, Thema von Kapitel 6, und es endete in einer einzigen verbindlichen Rechtsantwort, nicht in koexistierenden Frames. Dieselbe Technik funktioniert für jedes Anliegen, auch für solche, die den Frame-Raum verengen. Der Fall ist ein starkes Argument für die Macht des Framings; als Beleg für Pluralismus ist er schwächer, als das Kapitel nahelegt.' } },
    ],
    transfer: [
      { context: { en: 'Leadership', de: 'Führung' }, prompt: { en: 'Your team has made a decision and moved on. Design a lightweight mechanism that keeps the strongest dissenting frame alive without reopening the decision weekly: who holds it, what observable signal would trigger a review, and how you protect the person holding it from the “gravity” of the group. Then ask yourself honestly whether your team would experience this as pluralism or as indecision.', de: 'Dein Team hat entschieden und ist weitergegangen. Entwirf einen schlanken Mechanismus, der den stärksten abweichenden Frame am Leben hält, ohne die Entscheidung jede Woche neu aufzumachen: Wer hält ihn, welches beobachtbare Signal löst eine Überprüfung aus, und wie schützt du die Person, die ihn hält, vor der „Schwerkraft“ der Gruppe? Frag dich dann ehrlich, ob dein Team das als Pluralismus oder als Unentschlossenheit erleben würde.' } },
      { context: { en: 'AI in organisations', de: 'KI in Organisationen' }, prompt: { en: 'If every strategy team prompts the same few language models with similar inputs, frames may converge: a new monoculture produced not by censorship but by shared tooling. Sketch a “pluralism check” for AI-generated strategy work: for example, requiring at least two explicitly contrasting framings of the problem before options are generated (Unger’s “two viewpoints”), recording which frame the prompt presupposed, and comparing outputs with a human team that worked without AI first. Which of these would survive time pressure?', de: 'Wenn alle Strategieteams dieselben wenigen Sprachmodelle mit ähnlichen Eingaben befragen, können Frames konvergieren: eine neue Monokultur, nicht durch Zensur, sondern durch gemeinsame Werkzeuge. Skizziere einen „Pluralismus-Check“ für KI-gestützte Strategiearbeit: etwa mindestens zwei ausdrücklich gegensätzliche Framings des Problems verlangen, bevor Optionen erzeugt werden (Ungers „zwei Blickwinkel“), festhalten, welchen Frame der Prompt vorausgesetzt hat, und Ergebnisse mit einem menschlichen Team vergleichen, das zuerst ohne KI gearbeitet hat. Was davon würde Zeitdruck überleben?' } },
      { context: { en: 'Consulting', de: 'Beratung' }, prompt: { en: 'Many client systems run on a single frame of truth that made them successful (“we are an engineering company”, “our customers buy on price”). How do you name it without being expelled as the outsider who does not understand the business? Draft the sentence you would use in a steering meeting, starting with “I see this differently”, and the evidence you would bring. Then consider: as an outside consultant you are the “migrant frame” of this chapter; what keeps you from being assimilated after six months?', de: 'Viele Kundensysteme laufen auf einem einzigen Wahrheits-Frame, der sie erfolgreich gemacht hat („wir sind ein Ingenieursunternehmen“, „unsere Kundschaft kauft über den Preis“). Wie benennst du ihn, ohne als Externe oder Externer ausgestoßen zu werden, die das Geschäft nicht verstehen? Formuliere den Satz, den du im Steuerkreis sagen würdest, beginnend mit „Ich sehe das anders“, und die Belege, die du mitbringst. Bedenke dann: Als externe Beratung bist du der „eingewanderte Frame“ dieses Kapitels; was verhindert, dass du nach sechs Monaten assimiliert bist?' } },
    ],
    summary: [
      { en: 'Societies, like individuals and teams, need many coexisting frames; the authors justify this pragmatically, as insurance for times of change, not morally.', de: 'Gesellschaften brauchen wie Einzelne und Teams viele koexistierende Frames; die Autoren begründen das pragmatisch, als Versicherung für Zeiten des Wandels, nicht moralisch.' },
      { en: 'The only bad frame is one that denies other frames; wrong frames are to be argued against, and in doubt the default is tolerance.', de: 'Der einzig schlechte Frame ist einer, der andere Frames verneint; falschen Frames widerspricht man, und im Zweifel gilt Toleranz.' },
      { en: 'Monocultures grow from success and centralisation, as Route 128, imperial China and the West after 1989 illustrate in the authors’ account.', de: 'Monokulturen wachsen aus Erfolg und Zentralisierung, wie Route 128, das kaiserliche China und der Westen nach 1989 in der Darstellung der Autoren zeigen.' },
      { en: 'Pluralism is not the same as democracy and not the natural state: tribalism pulls towards homogeneity, so the conditions for it must be maintained.', de: 'Pluralismus ist nicht dasselbe wie Demokratie und kein Naturzustand: Tribalismus zieht zur Gleichförmigkeit, also müssen seine Bedingungen gepflegt werden.' },
      { en: 'Four strategies sustain it (variation, education, migration, friction), and friction is both the price of pluralism and the energy that makes it productive.', de: 'Vier Strategien erhalten ihn (Variation, Bildung, Migration, Reibung), und Reibung ist zugleich der Preis des Pluralismus und die Energie, die ihn produktiv macht.' },
    ],
    glossary: [
      { term: { en: 'Frame pluralism', de: 'Frame-Pluralismus' }, def: { en: 'A condition in which many different, even conflicting, frames coexist and are applied side by side, without converging on one.', de: 'Ein Zustand, in dem viele verschiedene, auch widerstreitende Frames nebeneinander bestehen und angewendet werden, ohne zu einem zu verschmelzen.' } },
      { term: { en: 'Single frame of truth', de: 'Einziger Wahrheits-Frame' }, def: { en: 'A frame treated as without alternative, whether imposed by force or reinforced by success and social pressure.', de: 'Ein Frame, der als alternativlos gilt, ob durch Gewalt durchgesetzt oder durch Erfolg und sozialen Druck verfestigt.' } },
      { term: { en: 'Cognitive oppression', de: 'Kognitive Unterdrückung' }, def: { en: 'The restriction of people’s freedom to frame; visible mainly through what is absent.', de: 'Die Einschränkung der Freiheit von Menschen, zu framen; vor allem am Fehlenden erkennbar.' } },
      { term: { en: 'Paradox of tolerance', de: 'Paradox der Toleranz' }, def: { en: 'Karl Popper’s observation that unlimited tolerance of intolerance destroys tolerance itself.', de: 'Karl Poppers Beobachtung, dass unbegrenzte Toleranz gegenüber Intoleranz die Toleranz selbst zerstört.' } },
      { term: { en: 'Public sphere (Habermas)', de: 'Öffentlichkeit (Habermas)' }, def: { en: 'The space where citizens meet and debate common affairs, from cafés to associations; for the authors, the place where frames should rub against each other.', de: 'Der Raum, in dem Bürgerinnen und Bürger sich treffen und über gemeinsame Angelegenheiten streiten, vom Café bis zum Verein; für die Autoren der Ort, an dem Frames aneinander reiben sollen.' } },
      { term: { en: 'Deliberative poll', de: 'Deliberative Umfrage' }, def: { en: 'A diverse group is polled before and after an informed, moderated debate; consensus is not required, serious engagement is.', de: 'Eine gemischte Gruppe wird vor und nach einer informierten, moderierten Debatte befragt; Konsens ist nicht verlangt, ernsthafte Auseinandersetzung schon.' } },
    ],
  });
})();
