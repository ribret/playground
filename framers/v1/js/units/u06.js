/* u06 — Kapitel 6: Reframing / Chapter 6: Reframing */
(function () {
  const P = V.palette;
  const de = (lang) => lang === 'de';
  const T = (l, en, d) => (de(l) ? d : en);

  /* ---------- local drawing helpers ---------- */
  const mountain = (o = {}) => V.path('M30,236 L200,58 L370,236', { stroke: P.line, sw: 3, fill: P.paper, cls: o.cls || 'a-fade', delay: o.delay });
  const bottle = (x, y, o = {}) => V.group(
    V.rect(x - 6, y - 22, 12, 22, { fill: P.sky, stroke: P.ink, sw: 1, r: 3 }) +
    V.rect(x - 2.5, y - 29, 5, 7, { fill: P.sky, stroke: P.ink, sw: 1, r: 1 }), o);
  const shield = (x, y, col) => V.path(`M${x},${y - 26} L${x + 22},${y - 16} C${x + 22},${y + 8} ${x + 12},${y + 20} ${x},${y + 28} C${x - 12},${y + 20} ${x - 22},${y + 8} ${x - 22},${y - 16} Z`, { stroke: col, sw: 3, fill: P.paper });
  const house = (x, y, col) => V.path(`M${x - 20},${y + 18} V${y - 4} L${x},${y - 22} L${x + 20},${y - 4} V${y + 18} Z`, { stroke: col, sw: 3, fill: P.paper }) + V.rect(x - 5, y + 4, 10, 14, { fill: col, stroke: col, r: 1 });
  const lock = (x, y, col) => V.rect(x - 7, y - 4, 14, 11, { fill: col, stroke: col, r: 2 }) + V.path(`M${x - 4},${y - 4} v-4 a4,4 0 0,1 8,0 v4`, { stroke: col, sw: 2 });

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 5500,
      caption: { en: '<b>For 25 years, Everest meant a human pyramid.</b> The 1953 expedition used around four hundred people, mostly porters, plus bottled oxygen; medical opinion said the summit was lethal without it.', de: '<b>25 Jahre lang hieß Everest: eine menschliche Pyramide.</b> Die Expedition von 1953 brauchte rund vierhundert Menschen, überwiegend Träger, dazu Flaschensauerstoff; die Medizin hielt den Gipfel ohne ihn für tödlich.' },
      svg: (l) => {
        let s = mountain();
        for (let r = 0; r < 7; r++) {
          const n = 7 - r, y = 222 - r * 22;
          for (let i = 0; i < n; i++) s += V.circle(200 + (i - (n - 1) / 2) * 20, y, 6.5, { fill: r === 6 ? P.amber : P.muted, cls: 'a-pop', delay: .2 + r * .18 + i * .03 });
        }
        s += bottle(318, 220, { cls: 'a-rise', delay: 1.4 }) + bottle(336, 220, { cls: 'a-rise', delay: 1.5 }) + bottle(354, 220, { cls: 'a-rise', delay: 1.6 });
        s += V.text(20, 32, T(l, '1953: expedition style', '1953: Expeditionsstil'), { size: 15, bold: true, anchor: 'start', cls: 'a-fade' });
        s += V.text(336, 186, 'O₂', { size: 13, bold: true, fill: P.sky, cls: 'a-fade', delay: 1.6 });
        return V.wrap(s);
      } },

    { duration: 5500,
      caption: { en: '<b>1978: two climbers, no oxygen.</b> Messner and Habeler went up fast and light and were back at the top camp after roughly nine hours.', de: '<b>1978: zwei Bergsteiger, kein Sauerstoff.</b> Messner und Habeler stiegen schnell und leicht auf und waren nach gut neun Stunden zurück im obersten Lager.' },
      svg: (l) => {
        let s = mountain();
        s += V.path('M120,222 L200,70', { stroke: P.amber, sw: 4, dash: '8 7', cls: 'a-draw', delay: .4 });
        s += V.person(150, 172, { color: P.ink, scale: .75, cls: 'a-pop', delay: .9 }) + V.person(176, 126, { color: P.amber, scale: .75, cls: 'a-pop', delay: 1.1 });
        s += bottle(330, 220, { opacity: .5 }) + V.text(330, 216, '✕', { size: 34, fill: P.bad, bold: true, cls: 'a-pop', delay: 1.6 });
        s += V.text(20, 32, T(l, '1978: Alpine style', '1978: Alpenstil'), { size: 15, bold: true, anchor: 'start', cls: 'a-fade' });
        s += V.text(380, 32, T(l, '2 people', '2 Menschen'), { size: 14, bold: true, anchor: 'end', fill: P.amber, cls: 'a-fade', delay: 1.3 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>Same mountain, different frame.</b> The others optimised inside the expedition frame. For the two Tyrolean climbers, Everest was the Eastern Alps, only higher, and so speed, not supplies, became the decisive variable.', de: '<b>Gleicher Berg, anderer Frame.</b> Die anderen optimierten innerhalb des Expeditions-Frames. Für die beiden Tiroler war der Everest die Ostalpen, nur höher, und damit wurde Tempo statt Nachschub zur entscheidenden Größe.' },
      svg: (l) => V.wrap(
        V.path('M150,200 L200,104 L250,200 Z', { stroke: P.ink, sw: 2, fill: P.paper, cls: 'a-pop' }) +
        V.frame(14, 56, 122, 150, { color: P.muted, label: T(l, 'Expedition', 'Expedition'), cls: 'a-fade', delay: .4 }) +
        V.text(75, 105, T(l, 'logistics\ncamps\noxygen', 'Logistik\nLager\nSauerstoff'), { size: 13, lineHeight: 22, cls: 'a-fade', delay: .6 }) +
        V.frame(264, 56, 122, 150, { color: P.amber, label: T(l, 'Alpine', 'Alpenstil'), cls: 'a-fade', delay: 1 }) +
        V.text(325, 105, T(l, 'speed\nlight\nshort stay', 'Tempo\nleicht\nkurz oben'), { size: 13, lineHeight: 22, bold: true, cls: 'a-fade', delay: 1.2 }) +
        V.arrow(140, 150, 168, 150, { color: 'muted', cls: 'a-draw', delay: .7 }) +
        V.arrow(260, 150, 232, 150, { color: 'ink', cls: 'a-draw', delay: 1.3 }) +
        V.text(200, 240, T(l, 'Same mountain, different frame', 'Gleicher Berg, anderer Frame'), { size: 15, bold: true, cls: 'a-fade', delay: 1.8 })) },

    { duration: 7000,
      caption: { en: '<b>Three ways to reframe, ever rarer.</b> Pick another frame you already own (Bernanke and the Great Depression), borrow one from another field (IKEA: furniture as clothing), or invent one (Darwin’s tree of life).', de: '<b>Drei Wege zum Reframing, immer seltener.</b> Einen Frame nehmen, den du schon hast (Bernanke und die Große Depression), einen aus einem fremden Feld borgen (IKEA: Möbel wie Kleidung) oder einen erfinden (Darwins Stammbaum des Lebens).' },
      svg: (l) => {
        const names = ['Repertoire', 'Repurposing', 'Reinvention'];
        const ex = [T(l, 'Bernanke', 'Bernanke'), 'IKEA', 'Darwin'];
        const dots = [9, 4, 1];
        const fills = ['#F8D48A', '#F5C25E', P.amber];
        let s = V.text(20, 30, T(l, 'higher = rarer, harder', 'höher = seltener, schwerer'), { size: 14, bold: true, anchor: 'start', cls: 'a-fade' });
        names.forEach((n, i) => {
          const x = 22 + i * 122, w = 112, top = 196 - i * 52, d = .3 + i * .5;
          s += V.rect(x, top, w, 240 - top, { fill: fills[i], stroke: P.ink, sw: 1.5, r: 6, cls: 'a-rise', delay: d });
          s += V.text(x + w / 2, top + 24, ex[i], { size: 13, bold: true, cls: 'a-fade', delay: d + .2 });
          s += V.text(x + w / 2, top - 34, n, { size: 13, bold: true, cls: 'a-fade', delay: d + .1 });
          for (let k = 0; k < dots[i]; k++) s += V.circle(x + w / 2 + (k - (dots[i] - 1) / 2) * 11, top - 14, 4, { fill: P.ink, cls: 'a-pop', delay: d + .3 + k * .05 });
        });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>Data do not reframe themselves.</b> Hahn and Strassmann found barium after bombarding uranium and could not make sense of it. Meitner and Frisch read the same result as a split nucleus and named it fission.', de: '<b>Daten reframen sich nicht selbst.</b> Hahn und Straßmann fanden nach dem Beschuss von Uran Barium und konnten es nicht deuten. Meitner und Frisch lasen dasselbe Ergebnis als gespaltenen Kern und nannten es Spaltung.' },
      svg: (l) => V.wrap(
        V.pill(200, 34, T(l, 'barium + energy', 'Barium + Energie'), { fill: P.ink, size: 13, cls: 'a-pop' }) +
        V.arrow(170, 50, 110, 84, { color: 'muted', cls: 'a-draw', delay: .5 }) + V.arrow(230, 50, 290, 84, { color: 'ink', cls: 'a-draw', delay: .5 }) +
        V.frame(24, 96, 160, 112, { color: P.muted, label: 'Hahn', cls: 'a-fade', delay: .7 }) +
        V.text(104, 168, '?', { size: 48, bold: true, fill: P.muted, cls: 'a-pop', delay: 1.1 }) +
        V.frame(216, 96, 160, 112, { color: P.amber, label: 'Meitner', cls: 'a-fade', delay: 1.3 }) +
        V.path('M282,130 a18,18 0 0,0 0,36 Z', { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: 1.6 }) +
        V.path('M310,130 a18,18 0 0,1 0,36 Z', { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: 1.8 }) +
        V.text(296, 192, T(l, 'fission', 'Spaltung'), { size: 13, bold: true, cls: 'a-fade', delay: 2 }) +
        V.text(200, 242, T(l, 'Same data, new frame', 'Gleiche Daten, neuer Frame'), { size: 15, bold: true, cls: 'a-fade', delay: 2.3 })) },

    { duration: 6500,
      caption: { en: '<b>Camden did not reform its police, it refounded it.</b> In 2013 the old department was dissolved and a new force built around a guardian role instead of a warrior role: knocking on doors, street parties, fewer arrests as an end in itself.', de: '<b>Camden reformierte seine Polizei nicht, es gründete sie neu.</b> 2013 wurde die alte Behörde aufgelöst und eine neue um die Rolle des Schützens statt des Kämpfens gebaut: an Türen klopfen, Straßenfeste, Festnahmen nicht mehr als Selbstzweck.' },
      svg: (l) => V.wrap(
        V.frame(20, 46, 150, 150, { color: P.muted, label: T(l, 'Warrior', 'Kämpfen'), cls: 'a-fade' }) +
        V.group(shield(95, 112, P.muted), { cls: 'a-pop', delay: .3 }) +
        V.text(95, 172, T(l, 'arrests', 'Festnahmen'), { size: 13, fill: P.muted, bold: true, cls: 'a-fade', delay: .5 }) +
        V.arrow(178, 121, 220, 121, { color: 'ink', cls: 'a-draw', delay: 1 }) +
        V.frame(230, 46, 150, 150, { color: P.amber, label: T(l, 'Guardian', 'Schützen'), cls: 'a-slide', delay: 1.2 }) +
        V.group(house(282, 112, P.ink), { cls: 'a-pop', delay: 1.5 }) +
        V.person(336, 128, { color: P.amber, scale: .8, cls: 'a-pop', delay: 1.7 }) +
        V.text(305, 172, T(l, 'neighbourhood', 'Nachbarschaft'), { size: 13, bold: true, cls: 'a-fade', delay: 1.9 }) +
        V.text(200, 236, T(l, 'Camden 2013: refounded, not reformed', 'Camden 2013: neu gegründet, nicht reformiert'), { size: 14, bold: true, cls: 'a-fade', delay: 2.2 })) },

    { duration: 6500,
      caption: { en: '<b>Four hurdles stand in the way.</b> A new frame costs cognitive energy, demands unlearning the familiar, has to fit the situation, and has to come at the right moment.', de: '<b>Vier Hürden stehen im Weg.</b> Ein neuer Frame kostet kognitive Energie, verlangt das Verlernen des Vertrauten, muss zur Lage passen und im richtigen Moment kommen.' },
      svg: (l) => {
        const L = de(l) ? ['Energie', 'Verlernen', 'Passung', 'Timing'] : ['Effort', 'Unlearning', 'Fit', 'Timing'];
        let s = V.text(200, 34, T(l, 'Four hurdles to switching', 'Vier Hürden beim Wechsel'), { size: 15, bold: true, cls: 'a-fade' });
        s += V.line(20, 200, 385, 200, { stroke: P.line, sw: 3, cls: 'a-draw', delay: .2 });
        s += V.person(38, 176, { color: P.ink, scale: .8, cls: 'a-pop', delay: .3 });
        L.forEach((n, i) => {
          const x = 110 + i * 80, d = .5 + i * .35;
          s += V.group(V.line(x - 20, 200, x - 20, 150, { stroke: P.ink, sw: 3 }) + V.line(x + 20, 200, x + 20, 150, { stroke: P.ink, sw: 3 }) + V.rect(x - 26, 142, 52, 12, { fill: P.amber, stroke: P.ink, sw: 1.5, r: 3 }), { cls: 'a-rise', delay: d });
          s += V.text(x, 124, n, { size: 13, bold: true, cls: 'a-fade', delay: d + .1 });
          s += V.text(x, 226, String(i + 1), { size: 13, bold: true, fill: P.muted, cls: 'a-fade', delay: d + .1 });
        });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: { en: '<b>Tight or loose: like clothing.</b> A tight frame shows its constraints clearly and fits well until conditions change. A looser frame with movable constraints needs more work but keeps options and agency alive.', de: '<b>Eng oder weit: wie Kleidung.</b> Ein enger Frame zeigt seine Constraints klar und sitzt gut, bis sich die Lage ändert. Ein weiterer Frame mit verschiebbaren Constraints macht mehr Arbeit, hält aber Optionen und Handlungsspielraum offen.' },
      svg: (l) => {
        let s = V.text(100, 34, T(l, 'Tight', 'Eng'), { size: 15, bold: true, cls: 'a-fade' }) + V.text(295, 34, T(l, 'Loose', 'Weit'), { size: 15, bold: true, cls: 'a-fade', delay: .8 });
        s += V.frame(52, 88, 96, 92, { color: P.plum, cls: 'a-pop', delay: .2 });
        s += V.dots(9, 72, 108, 56, 52, { seed: 4, fill: P.ink, r: 4, opacity: .85 });
        s += V.frame(210, 56, 170, 150, { color: P.amber, cls: 'a-pop', delay: 1 });
        s += V.dots(9, 268, 108, 56, 52, { seed: 4, fill: P.ink, r: 4, opacity: .85 });
        s += V.line(232, 82, 232, 182, { stroke: P.plum, sw: 3, dash: '6 5', cls: 'a-fade', delay: 1.3 }) + V.arrow(238, 132, 256, 132, { color: P.plum, sw: 2, cls: 'a-draw', delay: 1.5 });
        s += V.line(358, 82, 358, 182, { stroke: P.plum, sw: 3, dash: '6 5', cls: 'a-fade', delay: 1.3 }) + V.arrow(352, 132, 334, 132, { color: P.plum, sw: 2, cls: 'a-draw', delay: 1.5 });
        s += V.text(100, 222, T(l, 'fits exactly', 'sitzt genau'), { size: 13, bold: true, fill: P.plum, cls: 'a-fade', delay: .5 });
        s += V.text(295, 232, T(l, 'room to move', 'lässt Spielraum'), { size: 13, bold: true, cls: 'a-fade', delay: 1.8 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: { en: '<b>Sometimes you need not switch at all.</b> Singapore went from port to electronics to finance to tourism. Read differently, one broad frame stayed and only the constraints moved. The book reads Spotify the same way.', de: '<b>Manchmal musst du gar nicht wechseln.</b> Singapur ging vom Hafen zur Elektronik, zu Finanzen, zu Tourismus. Anders gelesen blieb ein breiter Frame bestehen, und nur die Constraints wanderten. Spotify liest das Buch genauso.' },
      svg: (l) => {
        const st = de(l) ? ['Hafen', 'Elektronik', 'Finanzen', 'Tourismus'] : ['Port', 'Electronics', 'Finance', 'Tourism'];
        let s = V.frame(18, 40, 364, 168, { color: P.amber, label: T(l, 'Singapore', 'Singapur'), cls: 'a-pop' });
        st.forEach((n, i) => {
          const x = 92 + i * 72, y = 82 + i * 34, d = .5 + i * .4;
          s += V.pill(x, y, n, { fill: P.ink, size: 12, cls: 'a-pop', delay: d });
        });
        s += V.text(200, 238, T(l, 'Frame stays, constraints move', 'Frame bleibt, Constraints wandern'), { size: 15, bold: true, cls: 'a-fade', delay: 2.2 });
        return V.wrap(s);
      } },
  ];

  /* ---------- section visuals ---------- */
  const visDialVsSwitch = (l) => {
    const row = (x, y, icon, str, d, bold) => V.group(icon + V.text(x + 18, y + 5, str, { size: 12, anchor: 'start', bold }), { cls: 'a-fade', delay: d });
    const dialIcon = (x, y) => V.circle(x, y, 8, { fill: P.paper, stroke: P.plum, sw: 2 }) + V.line(x, y, x + 5, y - 5, { stroke: P.plum, sw: 2 });
    return V.wrap(
      V.frame(14, 40, 178, 168, { color: P.muted, label: 'Expedition', cls: 'a-fade' }) +
      row(36, 80, dialIcon(36, 80), T(l, 'less weight', 'weniger Gewicht'), .3) +
      row(36, 112, dialIcon(36, 112), T(l, 'more camps', 'mehr Lager'), .5) +
      row(36, 144, dialIcon(36, 144), T(l, 'better boots', 'bessere Stiefel'), .7) +
      row(36, 176, lock(36, 176, P.plum), T(l, 'oxygen: fixed', 'Sauerstoff: fest'), .9, true) +
      V.arrow(196, 124, 210, 124, { color: 'ink', cls: 'a-draw', delay: 1.2 }) +
      V.frame(214, 40, 172, 168, { color: P.amber, label: T(l, 'Alpine', 'Alpenstil'), cls: 'a-slide', delay: 1.3 }) +
      row(236, 80, lock(236, 80, P.plum), T(l, 'speed: fixed', 'Tempo: fest'), 1.6, true) +
      row(236, 112, dialIcon(236, 112), T(l, 'no tents', 'keine Zelte'), 1.8) +
      row(236, 144, dialIcon(236, 144), T(l, 'oxygen: optional', 'Sauerstoff: optional'), 2) +
      V.text(102, 238, T(l, 'turning dials', 'Regler drehen'), { size: 13, bold: true, fill: P.muted, cls: 'a-fade', delay: 1 }) +
      V.text(300, 238, T(l, 'new set of constraints', 'neues Constraint-Set'), { size: 13, bold: true, cls: 'a-fade', delay: 2.2 }));
  };

  const visThreeRs = (l) => {
    const cols = [
      ['Repertoire', T(l, 'own stock', 'eigener Vorrat'), T(l, 'Bernanke:\nthe 1930s', 'Bernanke:\ndie 1930er'), 100],
      ['Repurposing', T(l, 'other field', 'fremdes Feld'), T(l, 'IKEA: furniture\nlike clothing', 'IKEA: Möbel\nwie Kleidung'), 55],
      ['Reinvention', T(l, 'from scratch', 'neu erfunden'), T(l, 'Darwin:\ntree of life', 'Darwin:\nStammbaum'), 18],
    ];
    let s = '';
    cols.forEach(([h, src, ex, f], i) => {
      const x = 12 + i * 128, cx = x + 60, d = .2 + i * .4;
      s += V.rect(x, 14, 120, 232, { fill: P.paper, stroke: P.amber, sw: 2, r: 12, cls: 'a-rise', delay: d });
      s += V.text(cx, 42, h, { size: 13, bold: true, cls: 'a-fade', delay: d + .1 });
      s += V.text(cx, 66, src, { size: 12, italic: true, fill: P.muted, cls: 'a-fade', delay: d + .2 });
      s += V.line(x + 18, 82, x + 102, 82, { stroke: P.line, sw: 1.5, cls: 'a-draw', delay: d + .2 });
      s += V.text(cx, 110, ex, { size: 12, cls: 'a-fade', delay: d + .3 });
      s += V.text(cx, 176, T(l, 'frequency', 'Häufigkeit'), { size: 12, fill: P.muted, cls: 'a-fade', delay: d + .3 });
      s += V.rect(x + 14, 190, 92, 14, { fill: P.paper2, stroke: P.line, sw: 1, r: 7 });
      s += V.rect(x + 14, 190, 92 * f / 100, 14, { fill: P.amber, stroke: P.ink, sw: 1, r: 7, cls: 'a-slide', delay: d + .5 });
      s += V.text(cx, 228, T(l, ['easiest', 'medium', 'hardest'][i], ['am leichtesten', 'mittel', 'am schwersten'][i]), { size: 12, bold: true, cls: 'a-fade', delay: d + .6 });
    });
    return V.wrap(s);
  };

  const visTiming = (l) => {
    let s = V.line(30, 210, 380, 210, { stroke: P.ink, sw: 2 }) + V.line(30, 210, 30, 40, { stroke: P.ink, sw: 2 });
    s += V.rect(180, 40, 90, 170, { fill: P.amber, stroke: 'none', sw: 0, r: 0, opacity: .35, cls: 'a-fade', delay: .8 });
    s += V.path('M30,64 C120,64 160,68 190,96 S250,180 380,192', { stroke: P.muted, sw: 3, cls: 'a-draw', delay: .2 });
    s += V.text(38, 52, T(l, 'fit of old frame', 'Passung alter Frame'), { size: 12, anchor: 'start', fill: P.muted, bold: true, cls: 'a-fade', delay: .4 });
    s += V.line(180, 210, 180, 40, { stroke: P.ink, sw: 1.5, dash: '4 4', cls: 'a-fade', delay: .7 });
    s += V.text(105, 230, T(l, 'too early', 'zu früh'), { size: 13, bold: true, cls: 'a-fade', delay: 1 });
    s += V.text(225, 230, T(l, 'window', 'Fenster'), { size: 13, bold: true, cls: 'a-fade', delay: 1.1 });
    s += V.text(328, 230, T(l, 'too late', 'zu spät'), { size: 13, bold: true, cls: 'a-fade', delay: 1.2 });
    s += V.circle(95, 150, 7, { fill: P.muted, cls: 'a-pop', delay: 1.4 }) + V.text(95, 175, T(l, 'early EVs', 'frühe E-Autos'), { size: 12, cls: 'a-fade', delay: 1.4 });
    s += V.circle(225, 150, 8, { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: 1.7 }) + V.text(225, 175, 'Tesla', { size: 12, bold: true, cls: 'a-fade', delay: 1.7 });
    s += V.circle(332, 150, 7, { fill: P.coral, cls: 'a-pop', delay: 2 }) + V.text(332, 132, T(l, 'German OEMs', 'deutsche OEMs'), { size: 12, cls: 'a-fade', delay: 2 });
    s += V.text(190, 30, T(l, 'circumstances change', 'Umstände ändern sich'), { size: 12, anchor: 'start', bold: true, cls: 'a-fade', delay: .7 });
    return V.wrap(s);
  };

  const visFork = (l) => V.wrap(
    V.pill(200, 28, T(l, 'circumstances change', 'Umstände ändern sich'), { fill: P.ink, size: 13, cls: 'a-pop' }) +
    V.arrow(200, 42, 200, 66, { color: 'ink', cls: 'a-draw', delay: .3 }) +
    V.path('M200,70 L276,104 L200,138 L124,104 Z', { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: .5 }) +
    V.text(200, 101, T(l, 'Frame broad', 'Frame breit'), { size: 12, bold: true, cls: 'a-fade', delay: .6 }) +
    V.text(200, 116, T(l, 'enough?', 'genug?'), { size: 12, bold: true, cls: 'a-fade', delay: .6 }) +
    V.arrow(140, 128, 100, 160, { color: 'ink', cls: 'a-draw', delay: .9 }) + V.arrow(260, 128, 300, 160, { color: 'ink', cls: 'a-draw', delay: 1.3 }) +
    V.text(104, 136, T(l, 'yes', 'ja'), { size: 13, bold: true, fill: P.ok, cls: 'a-fade', delay: .9 }) +
    V.text(296, 136, T(l, 'no', 'nein'), { size: 13, bold: true, fill: P.bad, cls: 'a-fade', delay: 1.3 }) +
    V.rect(14, 166, 176, 80, { fill: P.paper, stroke: P.plum, sw: 2, r: 10, cls: 'a-rise', delay: 1.1 }) +
    V.text(102, 190, T(l, 'Loosen constraints', 'Constraints lockern'), { size: 13, bold: true, fill: P.plum, cls: 'a-fade', delay: 1.2 }) +
    V.text(102, 212, T(l, 'safer, slower search', 'sicherer, längere Suche'), { size: 12, cls: 'a-fade', delay: 1.3 }) +
    V.text(102, 232, T(l, 'Singapore, Spotify', 'Singapur, Spotify'), { size: 12, italic: true, fill: P.muted, cls: 'a-fade', delay: 1.4 }) +
    V.rect(210, 166, 176, 80, { fill: P.paper, stroke: P.amber, sw: 2.5, r: 10, cls: 'a-rise', delay: 1.5 }) +
    V.text(298, 190, T(l, 'Switch the frame', 'Frame wechseln'), { size: 13, bold: true, cls: 'a-fade', delay: 1.6 }) +
    V.text(298, 212, T(l, 'faster, riskier', 'schneller, riskanter'), { size: 12, cls: 'a-fade', delay: 1.7 }) +
    V.text(298, 232, T(l, 'Messner, Camden', 'Messner, Camden'), { size: 12, italic: true, fill: P.muted, cls: 'a-fade', delay: 1.8 }));

  window.FRAMERS.register({
    id: 'u06', number: 6, kind: 'chapter', color: '#F2B134', minutes: 30,
    title: { en: 'Reframing', de: 'Reframing' },
    tagline: { en: 'Staying in a frame is the rule and a strength. Switching is rare, costly and sometimes decisive; the art lies in knowing when.', de: 'Im Frame bleiben ist die Regel und eine Stärke. Wechseln ist selten, teuer und manchmal entscheidend; die Kunst liegt im Wann.' },
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="4" y="12" width="20" height="20" rx="4" fill="none" stroke="${c}" stroke-width="2.5" opacity=".5"/><rect x="18" y="8" width="22" height="28" rx="4" fill="none" stroke="${c}" stroke-width="3"/><path d="M12 22 h16" stroke="${c}" stroke-width="3" stroke-linecap="round"/><path d="M24 17 l5 5 l-5 5" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    hook: {
      en: '<p>May 1978, just after one in the afternoon: two men from the Alps stand on the summit of Everest without bottled oxygen. For a quarter of a century, every ascent had relied on hundreds of porters and gas cylinders, because the doctors said anything else would kill you. Better boots helped. What made the difference, Peter Habeler said later, was a different way of looking at the mountain.</p><p>This unit is about that moment of switching, and about why it is far rarer, riskier and harder to time than management talk about “reframing” suggests.</p>',
      de: '<p>Mai 1978, kurz nach ein Uhr mittags: Zwei Männer aus den Alpen stehen ohne Flaschensauerstoff auf dem Gipfel des Everest. Ein Vierteljahrhundert lang hatte jede Besteigung auf Hunderte Träger und Gasflaschen gesetzt, weil die Medizin alles andere für tödlich hielt. Bessere Stiefel halfen. Den Unterschied, sagte Peter Habeler später, machte eine andere Sicht auf den Berg.</p><p>Diese Einheit handelt von diesem Moment des Wechselns und davon, warum er viel seltener, riskanter und schwerer zu timen ist, als das Management-Gerede vom „Reframing“ nahelegt.</p>'
    },
    objectives: [
      { en: 'Distinguish reframing from adjusting constraints inside a frame, and explain why staying in a frame is usually the right default.', de: 'Reframing vom Verstellen der Constraints innerhalb eines Frames unterscheiden und erklären, warum Im-Frame-Bleiben meist der richtige Normalfall ist.' },
      { en: 'Classify cases as repertoire, repurposing or reinvention, and name the four hurdles that make switching hard.', de: 'Fälle als Repertoire, Repurposing oder Reinvention einordnen und die vier Hürden benennen, die den Wechsel schwer machen.' },
      { en: 'Judge for a real situation whether to switch frames or loosen constraints within a broad frame, and when the timing is right.', de: 'Für eine reale Situation beurteilen, ob du den Frame wechseln oder in einem breiten Frame die Constraints lockern solltest, und wann der Zeitpunkt stimmt.' },
    ],
    film: { title: { en: 'Switching frames in nine scenes', de: 'Frames wechseln in neun Szenen' }, scenes },
    sections: [
      { id: 's1', heading: { en: 'Staying is the default, and that is good', de: 'Bleiben ist der Normalfall, und das ist gut' },
        body: {
          en: '<p>Most of the time we work inside a frame: we reason about causes, imagine alternatives and play with constraints, also called limits. That is efficient. We do not reinvent the wheel; we use a template that has proven itself. The authors are emphatic that sticking to a well-honed frame is <strong>a feature of cognition, not a flaw</strong>, and often the best strategy for success.</p><p>Reframing is something else. It means replacing the mental model itself. It can look like a large constraint change, but it is not. Within a frame, some constraints appear immovable, and the frame carries its own baggage. The expedition teams on Everest did optimise: lighter ropes, more camps, better gear. They never questioned the frame, and every improvement entrenched it further. Messner and Habeler did not remove one constraint from that frame. They brought a different one, in which speed was the fixed point and oxygen suddenly became optional.</p><p>The point matters in practice. A team that keeps fine-tuning a process may be doing exactly the right thing, or it may be polishing a frame that no longer fits. Both look identical from the inside.</p>',
          de: '<p>Meistens arbeiten wir innerhalb eines Frames: Wir denken über Ursachen nach, stellen uns Alternativen vor und spielen mit Constraints, also Begrenzungen. Das ist effizient. Wir erfinden das Rad nicht neu, sondern nutzen eine bewährte Vorlage. Die Autoren betonen ausdrücklich, dass das Festhalten an einem eingeübten Frame <strong>eine Eigenschaft des Denkens ist, kein Fehler</strong>, und oft die beste Erfolgsstrategie.</p><p>Reframing ist etwas anderes. Es heißt, das mentale Modell selbst auszutauschen. Das kann aussehen wie eine große Änderung an den Constraints, ist es aber nicht. Innerhalb eines Frames wirken manche Constraints unverrückbar, und der Frame trägt sein eigenes Gepäck mit. Die Expeditionsteams am Everest haben optimiert: leichtere Seile, mehr Lager, bessere Ausrüstung. Den Frame stellten sie nie infrage, und jede Verbesserung verankerte ihn tiefer. Messner und Habeler strichen nicht einen Constraint aus diesem Frame. Sie brachten einen anderen mit, in dem Tempo der Fixpunkt war und Sauerstoff plötzlich verzichtbar wurde.</p><p>Das ist praktisch relevant. Ein Team, das einen Prozess immer weiter feinjustiert, tut vielleicht genau das Richtige, oder es poliert einen Frame, der nicht mehr passt. Von innen sieht beides gleich aus.</p>'
        },
        visual: { svg: visDialVsSwitch, position: 'bottom', caption: { en: 'Left: optimising inside the frame turns dials, while the decisive constraint stays locked. Right: a new frame brings a new fixed point, and what was fixed becomes optional.', de: 'Links: Optimieren im Frame dreht an Reglern, der entscheidende Constraint bleibt verriegelt. Rechts: Ein neuer Frame bringt einen neuen Fixpunkt, und das bisher Feste wird optional.' } },
        keyIdea: { en: 'Reframing is not a bigger constraint change. It swaps the whole set of what counts as fixed.', de: 'Reframing ist keine größere Constraint-Änderung. Es tauscht das ganze Set dessen aus, was als fest gilt.' } },

      { id: 's2', heading: { en: 'Repertoire, repurposing, reinvention', de: 'Repertoire, Repurposing, Reinvention' },
        body: {
          en: '<p>The book distinguishes three ways of switching, ordered by how often they occur.</p><ul><li><strong>Repertoire:</strong> you search your own stock of frames. Ben Bernanke, a scholar of the Great Depression, read the 2008 crisis through that template while others still thought Wall Street’s troubles would stay on Wall Street. The wider your stock, the better the odds; Charlie Munger’s “latticework of models” makes the same argument.</li><li><strong>Repurposing:</strong> you borrow a frame that works elsewhere and adapt it. Ingvar Kamprad treated furniture like clothing, something you replace rather than inherit. Andrew Lo proposes moving economics from a physics frame of equilibrium to a biological frame of evolution and adaptation, which would change how markets are regulated.</li><li><strong>Reinvention:</strong> no existing frame fits, so you create one. Darwin’s idea of common descent, Einstein’s special relativity, Rousseau’s social contract, packet switching in the Internet Protocol, open-source development.</li></ul><p>The authors concede that the boundaries are blurred: what feels invented may have been lingering in your memory. The practical rule is the order: <strong>start with the repertoire, then look elsewhere, invent last.</strong> Each step costs more cognitive effort and fails more often.</p>',
          de: '<p>Das Buch unterscheidet drei Wege des Wechselns, geordnet danach, wie oft sie vorkommen.</p><ul><li><strong>Repertoire:</strong> Du durchsuchst deinen eigenen Vorrat an Frames. Ben Bernanke, Experte für die Große Depression, las die Krise von 2008 durch diese Vorlage, während andere noch glaubten, die Probleme an der Wall Street blieben an der Wall Street. Je größer der Vorrat, desto besser die Chancen; Charlie Mungers „Gitterwerk von Modellen“ argumentiert genauso.</li><li><strong>Repurposing:</strong> Du borgst einen Frame, der anderswo funktioniert, und passt ihn an. Ingvar Kamprad behandelte Möbel wie Kleidung, also als etwas, das man ersetzt statt erbt. Andrew Lo schlägt vor, die Volkswirtschaftslehre vom physikalischen Frame des Gleichgewichts auf einen biologischen Frame der Evolution und Anpassung umzustellen, was die Regulierung von Märkten verändern würde.</li><li><strong>Reinvention:</strong> Kein vorhandener Frame passt, also erschaffst du einen. Darwins gemeinsame Abstammung, Einsteins spezielle Relativitätstheorie, Rousseaus Gesellschaftsvertrag, die Paketvermittlung des Internet-Protokolls, Open-Source-Entwicklung.</li></ul><p>Die Autoren räumen ein, dass die Grenzen unscharf sind: Was sich erfunden anfühlt, lag vielleicht schon im Gedächtnis. Die praktische Regel ist die Reihenfolge: <strong>mit dem Repertoire beginnen, dann woanders suchen, erfinden zuletzt.</strong> Jede Stufe kostet mehr kognitive Kraft und scheitert öfter.</p>'
        },
        visual: { svg: visThreeRs, position: 'bottom', caption: { en: 'Where the new frame comes from determines how often the move succeeds and how much effort it costs.', de: 'Woher der neue Frame kommt, bestimmt, wie oft der Wechsel gelingt und wie viel Kraft er kostet.' } },
        keyIdea: { en: 'Search your repertoire before you borrow, and borrow before you invent.', de: 'Durchsuche dein Repertoire, bevor du borgst, und borge, bevor du erfindest.' } },

      { id: 's3', heading: { en: 'Insight, not method: why reframing fails and blinds', de: 'Einsicht statt Methode: wie Reframing scheitert und blendet' },
        body: {
          en: '<p>The path to a new frame has no signposts. It may come in a flash or after years, and it may be wrong. Linus Pauling proposed a triple helix for DNA in 1953; Watson and Crick’s double helix fitted reality better. Sometimes the discovery is made and the frame is missing: Otto Hahn and Fritz Strassmann produced barium from uranium and could not explain it within chemistry. Lise Meitner and Otto Frisch read it as a split nucleus and coined the term fission. Heinrich Hertz is said to have considered his electromagnetic waves useless; radio followed soon after. Executives laughed at Amazon’s missing profits for years, correctly within their frame of corporate performance, and wrong in Bezos’s frame of reinvesting everything into new business lines.</p><p>New frames do not always replace old ones. Newton and Einstein coexist, so do proprietary and open-source software.</p><p>When reframing succeeds, it feels like a revelation. Jennifer Doudna described the hair standing up on her neck when the CRISPR scissors became a gene-editing tool; Andrew Wiles compared his proof to stumbling through a dark house until finding the light switch. That is why the authors insist: <strong>reframing is insight, not process, and doing it often does not make you better at it.</strong> Success also creates its own blindness. Einstein, who reframed physics in 1905, fought quantum mechanics for the rest of his life.</p>',
          de: '<p>Der Weg zu einem neuen Frame hat keine Wegweiser. Er kommt im Blitz oder nach Jahren, und er kann falsch sein. Linus Pauling schlug 1953 eine Dreifachhelix für die DNA vor; die Doppelhelix von Watson und Crick passte besser zur Wirklichkeit. Manchmal ist die Entdeckung da und der Frame fehlt: Otto Hahn und Fritz Straßmann erhielten aus Uran Barium und konnten es innerhalb der Chemie nicht erklären. Lise Meitner und Otto Frisch lasen es als gespaltenen Kern und prägten den Begriff Kernspaltung. Heinrich Hertz soll seine elektromagnetischen Wellen für nutzlos gehalten haben; das Radio folgte bald. Führungskräfte spotteten jahrelang über Amazons fehlende Gewinne, korrekt in ihrem Frame der Unternehmensleistung, falsch in Bezos’ Frame, alles in neue Geschäftsfelder zu reinvestieren.</p><p>Neue Frames verdrängen alte nicht immer. Newton und Einstein bestehen nebeneinander, ebenso proprietäre und Open-Source-Software.</p><p>Gelingt Reframing, fühlt es sich wie eine Offenbarung an. Jennifer Doudna beschrieb, wie ihr die Nackenhaare zu Berge standen, als aus der CRISPR-Schere ein Werkzeug zur Genbearbeitung wurde; Andrew Wiles verglich seinen Beweis mit dem Herumtappen in einem dunklen Haus, bis man den Lichtschalter findet. Deshalb bestehen die Autoren darauf: <strong>Reframing ist Einsicht, kein Verfahren, und häufiges Üben macht dich darin nicht besser.</strong> Erfolg erzeugt zudem eigene Blindheit. Einstein, der die Physik 1905 neu framte, bekämpfte die Quantenmechanik bis an sein Lebensende.</p>'
        },
        keyIdea: { en: 'A successful reframe is no guarantee of the next one. It may even block it.', de: 'Ein gelungenes Reframing garantiert nicht das nächste. Es kann es sogar blockieren.' } },

      { id: 's4', heading: { en: 'Four hurdles, and the hardest is timing', de: 'Vier Hürden, und die schwerste ist das Timing' },
        body: {
          en: '<p>The chapter names four difficulties.</p><ol><li><strong>Cognitive energy.</strong> We are practised at applying frames, not at choosing them. A new frame means entering unthought territory with no guarantee of payoff.</li><li><strong>Unlearning.</strong> The old frame has to be pushed aside, like a landscaper who must erase the old path or people keep walking it. Forgetting is not under our control, and in groups the switch also takes negotiation and persuasion.</li><li><strong>Fit.</strong> Tighter is not automatically better. A narrow frame makes its constraints transparent but breaks when conditions change; a broad frame lasts longer but requires more careful work. The book’s rule: <strong>other things being equal, prefer the frame with more mutable constraints, even if it fits more loosely.</strong> A frame that explains everything but leaves nothing to change produces understanding without agency.</li><li><strong>Timing.</strong> Switch when circumstances have fundamentally changed, through new goals or a new context: not sooner, and certainly not much later.</li></ol><p>The electric car illustrates timing. Around 1900 a third of cars were electric, then combustion won for a century, and revival attempts failed. Tesla came when batteries, motors, computing and public attitudes had changed. German manufacturers, in the book’s telling, defended the combustion engine too long and paid for it with costly catch-up programmes. Hence a counterintuitive rule: <strong>reframe infrequently.</strong> Jumping from frame to frame disorients.</p>',
          de: '<p>Das Kapitel nennt vier Schwierigkeiten.</p><ol><li><strong>Kognitive Energie.</strong> Wir sind geübt darin, Frames anzuwenden, nicht darin, sie zu wählen. Ein neuer Frame heißt, ungedachtes Gelände zu betreten, ohne Garantie auf Ertrag.</li><li><strong>Verlernen.</strong> Der alte Frame muss beiseitegeschoben werden, so wie Landschaftsgärtnerinnen und -gärtner den alten Pfad tilgen müssen, sonst laufen alle weiter darauf. Vergessen lässt sich nicht steuern, und in Gruppen braucht der Wechsel zusätzlich Verhandlung und Überzeugungsarbeit.</li><li><strong>Passung.</strong> Enger ist nicht automatisch besser. Ein schmaler Frame macht seine Constraints durchschaubar, bricht aber, wenn sich die Bedingungen ändern; ein breiter Frame hält länger, verlangt aber sorgfältigere Arbeit. Die Regel des Buchs: <strong>Bei sonst gleichen Bedingungen den Frame mit mehr veränderbaren Constraints wählen, auch wenn er lockerer sitzt.</strong> Ein Frame, der alles erklärt, aber nichts veränderbar lässt, erzeugt Verständnis ohne Handlungsmacht.</li><li><strong>Timing.</strong> Wechseln, wenn sich die Umstände grundlegend geändert haben, durch neue Ziele oder einen neuen Kontext: nicht früher und schon gar nicht viel später.</li></ol><p>Das Elektroauto zeigt das Timing-Problem. Um 1900 war ein Drittel der Autos elektrisch, dann gewann der Verbrenner für ein Jahrhundert, Wiederbelebungsversuche scheiterten. Tesla kam, als Batterien, Motoren, Rechenleistung und öffentliche Haltung sich verändert hatten. Die deutschen Hersteller verteidigten laut Buch den Verbrenner zu lange und zahlten mit teuren Aufholprogrammen. Daraus folgt eine kontraintuitive Regel: <strong>selten reframen.</strong> Wer von Frame zu Frame springt, verliert die Orientierung.</p>'
        },
        visual: { svg: visTiming, position: 'bottom', caption: { en: 'The window opens when circumstances change and the old frame starts losing fit. Before that, a new frame has nothing to grip; long after, the cost of catching up rises.', de: 'Das Fenster öffnet sich, wenn sich die Umstände ändern und der alte Frame an Passung verliert. Davor greift ein neuer Frame ins Leere; lange danach steigen die Kosten des Aufholens.' } },
        keyIdea: { en: 'Switch when the circumstances change: not sooner, and not much later.', de: 'Wechseln, wenn sich die Umstände ändern: nicht früher und nicht viel später.' } },

      { id: 's5', heading: { en: 'Reframing reframing: the broad-frame alternative', de: 'Reframing reframen: die Alternative des breiten Frames' },
        body: {
          en: '<p>The chapter ends by blurring its own line. Singapore turned itself from a port into an electronics base, then into a hub for finance and services, then into a tourism and casino destination. That looks like a sequence of reframes. It can also be read as one broad frame, built on location, educated labour, political stability and openness to markets, within which policymakers shifted constraints and counterfactuals as conditions changed.</p><p>The same applies to Spotify. You can say it reframed music from owned to streamed. Or you can say Apple and Spotify both worked in a frame of “music as experience”, and Spotify simply loosened the constraint that you must own and manage the files.</p><p>This gives you a <strong>strategic choice</strong>. Staying in a broad frame is cognitively simpler and less risky, but the search for good counterfactuals takes time because the space is large. Switching is faster and riskier: you may land in the wrong frame with no usable options. Which path fits depends on how fast you must decide, how broad your current frame is and how much risk you can bear.</p><p>The authors add the important limit: the choice exists only if a broad, flexible frame is already in place. It is a tool for some cases, not a cure-all.</p>',
          de: '<p>Am Ende verwischt das Kapitel seine eigene Grenze. Singapur machte sich vom Hafen zur Elektronikbasis, dann zum Zentrum für Finanzen und Dienstleistungen, dann zum Ziel für Tourismus und Casinos. Das sieht aus wie eine Folge von Reframings. Man kann es aber auch als einen breiten Frame lesen, gebaut auf Lage, gut ausgebildeten Arbeitskräften, politischer Stabilität und Marktoffenheit, innerhalb dessen die Politik Constraints und Was-wäre-wenn-Szenarien verschob, wenn sich die Lage änderte.</p><p>Dasselbe gilt für Spotify. Man kann sagen, es habe Musik von Besitz auf Streaming umgeframt. Oder man sagt, Apple und Spotify arbeiteten beide im Frame „Musik als Erlebnis“, und Spotify lockerte nur den Constraint, dass man Dateien besitzen und verwalten muss.</p><p>Daraus entsteht eine <strong>strategische Wahl</strong>. Im breiten Frame zu bleiben ist kognitiv einfacher und weniger riskant, aber die Suche nach guten Alternativen dauert, weil der Raum groß ist. Wechseln ist schneller und riskanter: Du landest womöglich im falschen Frame ohne brauchbare Optionen. Welcher Weg passt, hängt davon ab, wie schnell du entscheiden musst, wie breit dein aktueller Frame ist und wie viel Risiko du tragen kannst.</p><p>Die Autoren setzen die wichtige Grenze selbst: Die Wahl gibt es nur, wenn bereits ein breiter, beweglicher Frame vorhanden ist. Ein Werkzeug für manche Fälle, kein Allheilmittel.</p>'
        },
        visual: { svg: visFork, position: 'bottom', caption: { en: 'When conditions change, first ask how broad your current frame is. Only then decide between loosening constraints and switching.', de: 'Wenn sich die Lage ändert, frag zuerst, wie breit dein aktueller Frame ist. Erst dann entscheide zwischen Constraints lockern und wechseln.' } },
        keyIdea: { en: 'A broad frame buys you the option not to reframe.', de: 'Ein breiter Frame verschafft dir die Option, nicht reframen zu müssen.' } },
    ],

    exercise: {
      type: 'sort',
      title: { en: 'Which kind of shift is it?', de: 'Welche Art von Wechsel ist das?' },
      instructions: {
        en: 'Classify each case: repertoire (a frame you already had), repurposing (a frame borrowed from another field), reinvention (a genuinely new frame), or no reframe at all, only a constraint change inside the existing frame. The fourth category is the tricky one; read the explanation after each item. Two cases are deliberately borderline.',
        de: 'Ordne jeden Fall zu: Repertoire (ein Frame, den es schon gab), Repurposing (ein Frame aus einem fremden Feld), Reinvention (ein wirklich neuer Frame) oder gar kein Reframing, sondern nur eine Constraint-Änderung im bestehenden Frame. Die vierte Kategorie ist die knifflige; lies nach jedem Eintrag die Begründung. Zwei Fälle sind absichtlich Grenzfälle.'
      },
      categories: [
        { id: 'rep', label: { en: 'Repertoire', de: 'Repertoire' } },
        { id: 'pur', label: { en: 'Repurposing', de: 'Repurposing' } },
        { id: 'inv', label: { en: 'Reinvention', de: 'Reinvention' } },
        { id: 'con', label: { en: 'Constraint only', de: 'Nur Constraint' } },
      ],
      items: [
        { text: { en: 'A central-bank chair who spent his career studying the 1930s reads a credit crunch as the start of a depression and acts accordingly.', de: 'Ein Notenbankchef, der sein Berufsleben lang die 1930er erforscht hat, liest eine Kreditklemme als Beginn einer Depression und handelt entsprechend.' }, category: 'rep',
          why: { en: 'Bernanke’s case from the book. The frame was in his own stock; the work was recognising that it fitted now.', de: 'Bernankes Fall aus dem Buch. Der Frame lag im eigenen Vorrat; die Leistung bestand darin, zu erkennen, dass er jetzt passte.' } },
        { text: { en: 'A children’s hospital redesigns the handover from operating theatre to intensive care using the pit-stop routines of a Formula 1 team.', de: 'Eine Kinderklinik gestaltet die Übergabe vom OP auf die Intensivstation nach den Boxenstopp-Abläufen eines Formel-1-Teams um.' }, category: 'pur',
          why: { en: 'A frame that works elsewhere (tightly choreographed handover under time pressure) is borrowed and adapted. Typical repurposing: not ready-made, but a head start over inventing.', de: 'Ein Frame, der anderswo funktioniert (eng choreografierte Übergabe unter Zeitdruck), wird geborgt und angepasst. Typisches Repurposing: nicht fertig, aber ein Vorsprung gegenüber dem Erfinden.' } },
        { text: { en: 'A consultancy keeps its workshop format but allows remote participants and cuts sessions to ninety minutes.', de: 'Eine Beratung behält ihr Workshopformat, lässt aber Remote-Teilnahme zu und kürzt die Sessions auf neunzig Minuten.' }, category: 'con',
          why: { en: 'The frame (a facilitated group session that produces results) is untouched. Location and duration are soft constraints being moved. Useful, but not a reframe; calling it one inflates the word.', de: 'Der Frame (eine moderierte Gruppensitzung, die Ergebnisse erzeugt) bleibt unangetastet. Ort und Dauer sind weiche Constraints, die verschoben werden. Nützlich, aber kein Reframing; es so zu nennen bläht das Wort auf.' } },
        { text: { en: 'Engineers propose treating a phone call not as a reserved line but as a stream of independent data packets that find their own route.', de: 'Fachleute schlagen vor, ein Telefongespräch nicht als reservierte Leitung zu behandeln, sondern als Strom unabhängiger Datenpakete, die ihren eigenen Weg finden.' }, category: 'inv',
          why: { en: 'Packet switching, one of the book’s reinvention examples. Not a better circuit but a different idea of what communication over a network is.', de: 'Paketvermittlung, eines der Reinvention-Beispiele des Buchs. Keine bessere Leitung, sondern eine andere Vorstellung davon, was Kommunikation über ein Netz ist.' } },
        { text: { en: 'A manager who usually runs everything as a project recognises that the team after a merger is grieving, and draws on the grief model she learned in a coaching course.', de: 'Eine Führungskraft, die sonst alles als Projekt steuert, erkennt, dass das Team nach einer Fusion trauert, und greift auf das Trauermodell aus ihrer Coaching-Ausbildung zurück.' }, category: 'rep',
          why: { en: 'Borderline with repurposing, because the grief model comes from another field. But she already owned it; switching to it required recall, not adaptation. The book itself says the categories blur exactly here.', de: 'Grenzfall zum Repurposing, weil das Trauermodell aus einem anderen Feld stammt. Sie besaß es aber schon; der Wechsel verlangte Abruf, keine Anpassung. Genau hier, sagt das Buch selbst, verschwimmen die Kategorien.' } },
        { text: { en: 'A music service lets people listen to everything for a subscription instead of selling individual tracks.', de: 'Ein Musikdienst lässt Menschen per Abo alles hören, statt einzelne Titel zu verkaufen.' }, category: 'con',
          why: { en: 'Deliberately borderline. You could call it a reframe (owning to streaming). The chapter’s final section reads Spotify as working inside a broad frame of “music as experience” and loosening the constraint of ownership. That reading is the point of this exercise, though you may reasonably dispute it (see the critique).', de: 'Absichtlich ein Grenzfall. Man könnte es Reframing nennen (Besitz zu Streaming). Der letzte Abschnitt des Kapitels liest Spotify als Arbeit in einem breiten Frame „Musik als Erlebnis“, in dem der Constraint des Besitzens gelockert wurde. Diese Lesart ist der Punkt der Übung, auch wenn du sie mit guten Gründen bestreiten kannst (siehe Kritik).' } },
        { text: { en: 'An HR department starts to read staff turnover as customer churn and applies retention analytics from marketing.', de: 'Eine Personalabteilung beginnt, Fluktuation als Kundenabwanderung zu lesen, und übernimmt Bindungsanalysen aus dem Marketing.' }, category: 'pur',
          why: { en: 'A frame from another domain, adapted. Note what it brings along: employees become customers of the employer, which opens options (segmenting, early warning) and hides others (power, co-determination).', de: 'Ein Frame aus einem anderen Feld, angepasst. Achte darauf, was er mitbringt: Mitarbeitende werden zu Kundschaft des Arbeitgebers. Das öffnet Optionen (Segmentierung, Frühwarnung) und verdeckt andere (Macht, Mitbestimmung).' } },
        { text: { en: 'Programmers publish their code openly, let anyone improve it and earn money from services and reputation instead of licences.', de: 'Programmierende veröffentlichen ihren Code offen, lassen alle daran verbessern und verdienen mit Dienstleistung und Reputation statt mit Lizenzen.' }, category: 'inv',
          why: { en: 'Open source, listed in the book as reinvention: a new frame for how software is made and paid for. One could argue it repurposed the norms of academic science, which shows again how fuzzy the categories are.', de: 'Open Source, im Buch als Reinvention genannt: ein neuer Frame dafür, wie Software entsteht und bezahlt wird. Man könnte argumentieren, es habe die Normen der akademischen Wissenschaft umgenutzt, was erneut zeigt, wie unscharf die Kategorien sind.' } },
      ],
    },

    caseStudy: {
      title: { en: 'Camden: dissolving a police force to change its frame', de: 'Camden: eine Polizei auflösen, um ihren Frame zu ändern' },
      body: {
        en: '<p>Camden, New Jersey, a city of about 75,000, had one of the highest murder rates in the United States around 2012. The police were part of the problem: officers had planted evidence and falsified reports, courts overturned many convictions, and residents feared the police almost as much as the gangs. Reforms had not worked; the union resisted change.</p><p>County director Louis Cappelli Jr., Mayor Dana Redd and police officer Scott Thomson concluded that fixing individual problems was not enough. In 2013 the 141-year-old department was dissolved; 260 officers lost their jobs and fewer than a hundred were rehired into a new county force with new contracts, rules and training. Thomson described the aim as building a culture rather than changing one, with officers who see themselves as “a guardian and not a warrior”. Patrols knocked on doors, held neighbourhood parties with ice-cream trucks and played basketball with children.</p><p>According to the book, by 2020 murders had fallen by 60 percent, crime had nearly halved and complaints about excessive force had dropped by 95 percent. During the George Floyd protests, the new police chief asked to march at the front of a Black Lives Matter demonstration.</p>',
        de: '<p>Camden in New Jersey, eine Stadt mit rund 75.000 Menschen, hatte um 2012 eine der höchsten Mordraten der USA. Die Polizei war Teil des Problems: Beamtinnen und Beamte hatten Beweise untergeschoben und Berichte gefälscht, Gerichte hoben zahlreiche Urteile auf, und viele Menschen fürchteten die Polizei fast so sehr wie die Gangs. Reformen hatten nicht gegriffen; die Gewerkschaft blockierte.</p><p>Der Leiter der Kreisverwaltung Louis Cappelli Jr., Bürgermeisterin Dana Redd und der Polizeibeamte Scott Thomson kamen zu dem Schluss, dass es nicht reicht, einzelne Probleme zu beheben. 2013 wurde die 141 Jahre alte Behörde aufgelöst; 260 Beschäftigte verloren ihre Stelle, weniger als hundert wurden in eine neue Polizei des Countys übernommen, mit neuen Verträgen, Regeln und Ausbildung. Thomson beschrieb das Ziel als Kultur aufbauen statt Kultur verändern, mit Polizeikräften, die sich als „guardian and not a warrior“ verstehen, also als Schützende statt Kämpfende. Streifen klopften an Türen, veranstalteten Nachbarschaftsfeste mit Eiswagen und spielten Basketball mit Kindern.</p><p>Laut Buch waren die Morde bis 2020 um 60 Prozent gesunken, die Kriminalität hatte sich fast halbiert, Beschwerden über übermäßige Gewalt waren um 95 Prozent zurückgegangen. Während der Proteste nach dem Tod von George Floyd bat der neue Polizeichef darum, an der Spitze einer Black-Lives-Matter-Demonstration mitzugehen.</p>'
      },
      lesson: {
        en: '<p>The structural lesson: when reform keeps failing, the frame may be stabilised by the organisation itself (contracts, identities, routines). Camden changed the frame by changing the container. Observers saw either “a police force abolished” or “a union broken”; both are readings from other frames. Before you use the case, read the critique below: the success figures and the motives are contested.</p>',
        de: '<p>Die strukturelle Lehre: Wenn Reformen immer wieder scheitern, wird der Frame womöglich von der Organisation selbst stabilisiert (Verträge, Identitäten, Routinen). Camden änderte den Frame, indem es den Behälter austauschte. Beobachtende sahen entweder „eine abgeschaffte Polizei“ oder „eine gebrochene Gewerkschaft“; beides sind Lesarten aus anderen Frames. Bevor du den Fall nutzt, lies die Kritik unten: Erfolgszahlen und Motive sind umstritten.</p>'
      },
    },

    reflection: {
      intro: { en: 'Use your own situation. The aim is not to find something to reframe, but to tell frame problems from constraint problems.', de: 'Nimm deine eigene Situation. Ziel ist nicht, etwas zum Reframen zu finden, sondern Frame-Probleme von Constraint-Problemen zu unterscheiden.' },
      prompts: [
        { en: 'Name a problem in your area that has been “optimised” for a long time without real progress. Is the frame wrong, or has nobody touched the one constraint that matters?', de: 'Nenne ein Problem in deinem Bereich, das seit Langem „optimiert“ wird, ohne echten Fortschritt. Ist der Frame falsch, oder hat niemand den einen Constraint angefasst, auf den es ankommt?' },
        { en: 'Which frame made you successful in the past, and where might you be applying it now where it no longer fits (the Einstein risk)?', de: 'Welcher Frame hat dich früher erfolgreich gemacht, und wo wendest du ihn heute vielleicht an, obwohl er nicht mehr passt (das Einstein-Risiko)?' },
        { en: 'Think of your current way of working with AI. Has the circumstance really changed fundamentally, or is the broad frame you work in flexible enough? What would tell you that the window has opened?', de: 'Denk an deine aktuelle Arbeitsweise mit KI. Haben sich die Umstände wirklich grundlegend geändert, oder ist der breite Frame, in dem du arbeitest, beweglich genug? Woran würdest du erkennen, dass das Fenster offen ist?' },
      ],
      placeholder: { en: 'The problem I keep optimising is … and I think it is a frame / constraint problem because …', de: 'Das Problem, das ich immer weiter optimiere, ist … und ich halte es für ein Frame- / Constraint-Problem, weil …' },
    },

    quiz: [
      { q: { en: 'A department has made its approval process faster every year for five years. Meanwhile the business model it serves has shifted to self-service. Which reading fits the chapter best?', de: 'Eine Abteilung hat ihren Freigabeprozess fünf Jahre lang jedes Jahr beschleunigt. Inzwischen hat sich das Geschäftsmodell, dem er dient, auf Self-Service verlagert. Welche Lesart passt am besten zum Kapitel?' },
        options: [
          { en: 'Optimising inside a frame can entrench it; the question is whether circumstances have changed so much that the frame itself no longer fits.', de: 'Optimieren im Frame kann ihn verfestigen; die Frage ist, ob sich die Umstände so geändert haben, dass der Frame selbst nicht mehr passt.' },
          { en: 'Continuous improvement is always a sign of a frame that fits.', de: 'Kontinuierliche Verbesserung ist immer ein Zeichen für einen passenden Frame.' },
          { en: 'The team should reframe immediately and try several new frames in quick succession.', de: 'Das Team sollte sofort reframen und mehrere neue Frames schnell nacheinander ausprobieren.' },
          { en: 'Staying within a frame is a cognitive flaw that should be trained away.', de: 'Im Frame zu bleiben ist ein Denkfehler, den man abtrainieren sollte.' },
        ],
        answer: 0, explain: { en: 'Like the expedition climbers, the team improves inside its frame, which makes the frame harder to question. Staying is not a flaw (option 4), and rapid frame-hopping (option 3) is exactly what the book warns against.', de: 'Wie die Expeditionsteams verbessert das Team innerhalb seines Frames, was ihn schwerer hinterfragbar macht. Bleiben ist kein Fehler (Option 4), und schnelles Frame-Springen (Option 3) ist genau das, wovor das Buch warnt.' } },
      { q: { en: 'Which case is repurposing in the book’s sense?', de: 'Welcher Fall ist Repurposing im Sinne des Buchs?' },
        options: [
          { en: 'An economist applies the Great Depression template he has studied for decades.', de: 'Ein Ökonom wendet die Vorlage der Großen Depression an, die er seit Jahrzehnten erforscht.' },
          { en: 'A team extends a deadline by two weeks.', de: 'Ein Team verschiebt eine Frist um zwei Wochen.' },
          { en: 'An economist proposes treating markets like evolving organisms rather than physical systems in equilibrium.', de: 'Ein Ökonom schlägt vor, Märkte wie sich entwickelnde Organismen statt wie physikalische Systeme im Gleichgewicht zu behandeln.' },
          { en: 'A biologist proposes for the first time that all species descend from common ancestors.', de: 'Ein Biologe schlägt erstmals vor, dass alle Arten von gemeinsamen Vorfahren abstammen.' },
        ],
        answer: 2, explain: { en: 'Andrew Lo borrows the frame of biology for economics. Option 1 is repertoire, option 2 is a constraint change, option 4 is Darwin’s reinvention.', de: 'Andrew Lo borgt den Frame der Biologie für die Volkswirtschaftslehre. Option 1 ist Repertoire, Option 2 eine Constraint-Änderung, Option 4 Darwins Reinvention.' } },
      { q: { en: 'A CEO announces a new “strategic reframe” every quarter so the organisation stays agile. What would the authors say?', de: 'Ein CEO verkündet jedes Quartal ein neues „strategisches Reframing“, damit die Organisation agil bleibt. Was würden die Autoren sagen?' },
        options: [
          { en: 'Good practice: the more often you reframe, the better you get at it.', de: 'Gute Praxis: Je öfter man reframt, desto besser wird man darin.' },
          { en: 'Each reframe costs energy and unlearning; switching often disorients. Reframe rarely, when circumstances have really changed.', de: 'Jedes Reframing kostet Energie und Verlernen; häufiges Wechseln desorientiert. Selten reframen, wenn sich die Umstände wirklich geändert haben.' },
          { en: 'Fine, as long as each new frame is invented rather than borrowed.', de: 'In Ordnung, solange jeder neue Frame erfunden und nicht geborgt ist.' },
          { en: 'Irrelevant, because frames only matter for individuals, not organisations.', de: 'Irrelevant, weil Frames nur für Einzelne zählen, nicht für Organisationen.' },
        ],
        answer: 1, explain: { en: 'The book explicitly calls rapid serial reframing a fallacy and says practice does not improve reframing. Inventing first (option 3) reverses the recommended order.', de: 'Das Buch nennt schnelles serielles Reframing ausdrücklich einen Trugschluss und sagt, Übung verbessere Reframing nicht. Erst zu erfinden (Option 3) kehrt die empfohlene Reihenfolge um.' } },
      { q: { en: 'What does the story of Hahn and Meitner show most clearly?', de: 'Was zeigt die Geschichte von Hahn und Meitner am deutlichsten?' },
        options: [
          { en: 'Physicists are better reframers than chemists.', de: 'Physikerinnen und Physiker reframen besser als Chemikerinnen und Chemiker.' },
          { en: 'More precise measurements would have revealed fission to Hahn.', de: 'Genauere Messungen hätten Hahn die Spaltung gezeigt.' },
          { en: 'Reframing requires a long, methodical process.', de: 'Reframing erfordert einen langen, methodischen Prozess.' },
          { en: 'You can produce a discovery and still not see it, because the data do not fit your frame; someone with another frame reads the same result differently.', de: 'Man kann eine Entdeckung machen und sie trotzdem nicht sehen, weil die Daten nicht zum eigenen Frame passen; jemand mit einem anderen Frame liest dasselbe Ergebnis anders.' },
        ],
        answer: 3, explain: { en: 'The data were not the problem; the frame was. Option 1 overgeneralises a single case, and option 3 contradicts the book’s claim that reframing is insight rather than method.', de: 'Nicht die Daten waren das Problem, sondern der Frame. Option 1 verallgemeinert einen Einzelfall, Option 3 widerspricht der These des Buchs, dass Reframing Einsicht und keine Methode ist.' } },
      { q: { en: 'You can choose between two frames for a transformation programme. Frame A fits the current situation precisely, but almost all its constraints are fixed. Frame B fits more loosely, but many constraints can be changed. What does the chapter recommend, all else being equal?', de: 'Du kannst für ein Transformationsprogramm zwischen zwei Frames wählen. Frame A passt genau zur aktuellen Lage, aber fast alle Constraints sind fix. Frame B passt lockerer, viele Constraints lassen sich aber verändern. Was empfiehlt das Kapitel bei sonst gleichen Bedingungen?' },
        options: [
          { en: 'Frame A, because a tight fit is always better.', de: 'Frame A, weil eine enge Passung immer besser ist.' },
          { en: 'Neither; invent a third frame.', de: 'Keinen von beiden; einen dritten Frame erfinden.' },
          { en: 'Frame B, because mutable constraints generate options and a sense of agency that compensate for the looser fit.', de: 'Frame B, weil veränderbare Constraints Optionen und Handlungsmacht erzeugen, die die lockerere Passung ausgleichen.' },
          { en: 'Frame A, because fixed constraints reduce cognitive load.', de: 'Frame A, weil feste Constraints die kognitive Last senken.' },
        ],
        answer: 2, explain: { en: 'A frame that explains everything but allows little to change gives understanding without agency. The book prefers mutability over snugness, other things being equal.', de: 'Ein Frame, der alles erklärt, aber wenig veränderbar lässt, liefert Verständnis ohne Handlungsmacht. Das Buch zieht bei sonst gleichen Bedingungen Mutabilität der engen Passung vor.' } },
      { q: { en: 'When is “reframing reframing”, staying in a broad frame and loosening constraints, an option at all?', de: 'Wann ist „Reframing reframen“, also im breiten Frame bleiben und Constraints lockern, überhaupt eine Option?' },
        options: [
          { en: 'Only if a broad and flexible frame is already in use and can generate the radical counterfactuals the situation needs.', de: 'Nur wenn bereits ein breiter und beweglicher Frame im Einsatz ist, der die radikalen Alternativen hervorbringen kann, die die Lage verlangt.' },
          { en: 'Always; every reframe can be replaced by loosening constraints.', de: 'Immer; jedes Reframing lässt sich durch Lockern von Constraints ersetzen.' },
          { en: 'Only if the decision has to be made very quickly.', de: 'Nur wenn die Entscheidung sehr schnell fallen muss.' },
          { en: 'Only for countries, not for companies.', de: 'Nur für Staaten, nicht für Unternehmen.' },
        ],
        answer: 0, explain: { en: 'The authors limit it themselves. Option 2 is the over-reading the critique warns about; option 3 gets it backwards, since searching a large frame takes time while switching is faster.', de: 'Die Autoren begrenzen es selbst. Option 2 ist die Überdehnung, vor der die Kritik warnt; Option 3 dreht es um, denn die Suche im großen Frame dauert, während Wechseln schneller ist.' } },
    ],

    flashcards: [
      { front: { en: 'Reframing vs. adjusting constraints', de: 'Reframing vs. Constraints verstellen' }, back: { en: 'Adjusting turns dials inside one frame. Reframing replaces the frame, and with it the set of what counts as fixed (Alpine style: speed fixed, oxygen optional).', de: 'Verstellen dreht Regler in einem Frame. Reframing ersetzt den Frame und damit das Set dessen, was als fest gilt (Alpenstil: Tempo fest, Sauerstoff optional).' } },
      { front: { en: 'The three Rs, in order', de: 'Die drei R, in Reihenfolge' }, back: { en: 'Repertoire (own stock), repurposing (borrowed from another field), reinvention (new). Ordered by frequency; try them in that order.', de: 'Repertoire (eigener Vorrat), Repurposing (aus fremdem Feld geborgt), Reinvention (neu). Nach Häufigkeit geordnet; in dieser Reihenfolge versuchen.' } },
      { front: { en: 'Does practice make better reframers?', de: 'Macht Übung bessere Reframer?' }, back: { en: 'According to the book, no. Reframing is insight, not method. Applying frames improves with practice; switching them does not.', de: 'Laut Buch nein. Reframing ist Einsicht, keine Methode. Frames anwenden wird durch Übung besser, sie wechseln nicht.' } },
      { front: { en: 'The four hurdles', de: 'Die vier Hürden' }, back: { en: 'Cognitive energy, unlearning the familiar, finding a frame that fits, and timing.', de: 'Kognitive Energie, das Vertraute verlernen, einen passenden Frame finden, Timing.' } },
      { front: { en: 'Tight vs. loose frame', de: 'Enger vs. weiter Frame' }, back: { en: 'Tight: transparent constraints, breaks when conditions change. Loose: lasts longer, needs more work. Prefer more mutable constraints, all else equal.', de: 'Eng: durchschaubare Constraints, bricht bei Wandel. Weit: hält länger, macht mehr Arbeit. Bei sonst Gleichem mehr veränderbare Constraints bevorzugen.' } },
      { front: { en: 'When to reframe?', de: 'Wann reframen?' }, back: { en: 'When circumstances (goals or context) have fundamentally changed: not sooner, not much later. And infrequently.', de: 'Wenn sich Umstände (Ziele oder Kontext) grundlegend geändert haben: nicht früher, nicht viel später. Und selten.' } },
      { front: { en: 'The reframer’s vainglory', de: 'Die Eitelkeit der Reframer' }, back: { en: 'Past success creates attachment. Einstein reframed physics and then resisted quantum mechanics. Past performance does not guarantee the next insight.', de: 'Früherer Erfolg erzeugt Bindung. Einstein framte die Physik neu und wehrte sich dann gegen die Quantenmechanik. Vergangene Leistung garantiert keine nächste Einsicht.' } },
      { front: { en: 'Reframing reframing', de: 'Reframing reframen' }, back: { en: 'Within a broad frame, loosening constraints can replace switching (Singapore, Spotify). Safer but slower; only available if such a frame already exists.', de: 'In einem breiten Frame kann das Lockern von Constraints den Wechsel ersetzen (Singapur, Spotify). Sicherer, aber langsamer; nur verfügbar, wenn ein solcher Frame schon existiert.' } },
    ],

    critique: [
      { claim: { en: 'There are three forms of reframing, and successful shifts can be classified as repertoire, repurposing or reinvention; some apparent reframes are better understood as constraint changes within a broad frame.', de: 'Es gibt drei Formen des Reframings, und gelungene Wechsel lassen sich als Repertoire, Repurposing oder Reinvention einordnen; manche scheinbaren Reframings versteht man besser als Constraint-Änderungen in einem breiten Frame.' },
        challenge: { en: 'The authors admit the categories are fuzzy, and every assignment is made after the fact. The final section makes this worse: if Singapore and Spotify can be redescribed as constraint loosening within a broader frame, so can almost anything, including Messner (“mountaineering as sport”) or Camden (“public safety”). Whether a shift counts as a reframe then depends on how broadly the observer draws the frame, not on the case. That makes the core distinction of the chapter unfalsifiable. A sharper version would need a criterion fixed in advance, for example: which constraints were treated as hard before and became negotiable after?', de: 'Die Autoren räumen ein, dass die Kategorien unscharf sind, und jede Zuordnung geschieht im Nachhinein. Der letzte Abschnitt verschärft das: Wenn Singapur und Spotify sich als Lockern von Constraints in einem breiteren Frame umbeschreiben lassen, dann fast alles, auch Messner („Bergsteigen als Sport“) oder Camden („öffentliche Sicherheit“). Ob etwas als Reframing gilt, hängt dann davon ab, wie weit die beobachtende Person den Frame zieht, nicht vom Fall. Damit wird die Kernunterscheidung des Kapitels unwiderlegbar. Eine schärfere Fassung bräuchte ein vorab festgelegtes Kriterium, etwa: Welche Constraints galten vorher als hart und wurden danach verhandelbar?' } },
      { claim: { en: 'Camden shows that reframing the role of the police from warrior to guardian works.', de: 'Camden zeigt, dass es funktioniert, die Rolle der Polizei vom Kämpfen zum Schützen umzuframen.' },
        challenge: { en: 'The story is told from the leaders’ side. Dissolving the city department and replacing it with a county force also removed the existing union contracts and rehired officers on cheaper terms; budget pressure was part of the motive, and critics described it as union-busting. Local reporting in the early years noted a sharp rise in tickets for minor offences and expanded surveillance technology, which fits a warrior logic poorly. The crime decline is real but partly coincides with broader trends and with additional officers, so how much is due to the frame is hard to isolate. A sociologist would also ask who could impose this frame, and on whom: the reframing was an exercise of power, not only of insight.', de: 'Die Geschichte wird aus Sicht der Verantwortlichen erzählt. Mit der Auflösung der städtischen Behörde und der Ersetzung durch eine County-Polizei fielen auch die bestehenden Tarifverträge weg, und Beschäftigte wurden zu günstigeren Bedingungen wieder eingestellt; Budgetdruck gehörte zu den Motiven, kritische Stimmen sprachen von Gewerkschaftszerschlagung. Lokale Berichte aus den ersten Jahren verzeichneten einen starken Anstieg von Strafzetteln für Bagatelldelikte und mehr Überwachungstechnik, was schlecht zur Schutz-Logik passt. Der Rückgang der Kriminalität ist real, fällt aber teils mit allgemeinen Trends und zusätzlichem Personal zusammen; wie viel davon am Frame liegt, lässt sich schwer isolieren. Aus soziologischer Sicht stellt sich außerdem die Frage, wer diesen Frame durchsetzen konnte und gegen wen: Das Reframing war Machtausübung, nicht nur Einsicht.' } },
      { claim: { en: 'Tesla timed its reframe right; German automakers clung to an outdated frame and paid for it.', de: 'Tesla hat sein Reframing richtig getimt; die deutschen Hersteller klammerten sich an einen veralteten Frame und zahlten dafür.' },
        challenge: { en: 'That is hindsight, which the chapter otherwise warns against. BMW launched the fully electric i3 in 2013 and sold it in modest numbers; by the book’s logic that was “too early”, but no one could know that at the time. Tesla’s success also rested on things that are not frames: years of investor tolerance for losses, a government loan, purchase subsidies and the sale of emission credits to other manufacturers. Incumbents with combustion profits, works councils and supplier networks faced different constraints. The timing rule (“not sooner, not much later”) is correct but only identifiable after the fact; it offers little guidance about the moment itself.', de: 'Das ist Rückschau, vor der das Kapitel sonst warnt. BMW brachte 2013 den vollelektrischen i3 auf den Markt und verkaufte ihn in bescheidenen Stückzahlen; nach der Logik des Buchs war das „zu früh“, was damals niemand wissen konnte. Teslas Erfolg beruhte zudem auf Dingen, die keine Frames sind: jahrelange Verlusttoleranz von Investierenden, ein staatlicher Kredit, Kaufprämien und der Verkauf von Emissionsgutschriften an andere Hersteller. Etablierte Konzerne mit Verbrennergewinnen, Betriebsräten und Zulieferketten hatten andere Constraints. Die Timing-Regel („nicht früher, nicht viel später“) stimmt, ist aber erst im Nachhinein erkennbar; für den Moment selbst gibt sie wenig Orientierung.' } },
      { claim: { en: 'Reframing is insight, not process; practising it does not make you better.', de: 'Reframing ist Einsicht, kein Verfahren; Üben macht dich darin nicht besser.' },
        challenge: { en: 'The claim is asserted, not shown. Research on analogical problem solving (Gick and Holyoak, 1980s) found that people transfer a solution structure to a new domain far more often when they have compared several varied examples, which is practice of a kind that targets repurposing. Insight research also shows that hints and prior exposure raise solution rates. A fairer reading: you cannot schedule a specific insight, but you can raise its likelihood. The book half concedes this when it recommends widening your repertoire, which is exactly a form of practice.', de: 'Die These wird behauptet, nicht belegt. Forschung zum analogen Problemlösen (Gick und Holyoak, 1980er) zeigte, dass Menschen eine Lösungsstruktur weit häufiger auf ein neues Feld übertragen, wenn sie zuvor mehrere unterschiedliche Beispiele verglichen haben, also eine Form von Übung, die genau auf Repurposing zielt. Auch die Einsichtsforschung zeigt, dass Hinweise und vorherige Begegnung die Lösungsquote erhöhen. Eine fairere Lesart: Eine bestimmte Einsicht lässt sich nicht terminieren, ihre Wahrscheinlichkeit aber steigern. Das Buch räumt das halb ein, wenn es empfiehlt, das Repertoire zu erweitern, was genau eine Form von Übung ist.' } },
    ],

    transfer: [
      { context: { en: 'Leadership', de: 'Führung' }, prompt: { en: 'Take a problem your team has been working on for months. Write down (a) the frame in one sentence, (b) the three constraints everyone treats as fixed. Then ask: would moving one of those constraints solve it (constraint problem), or does the problem only dissolve if the sentence in (a) changes (frame problem)? Discuss the two answers with the team before deciding what kind of intervention you need.', de: 'Nimm ein Problem, an dem dein Team seit Monaten arbeitet. Schreib (a) den Frame in einem Satz auf, (b) die drei Constraints, die alle als fest behandeln. Frag dann: Würde das Verschieben eines dieser Constraints es lösen (Constraint-Problem), oder löst sich das Problem erst, wenn sich der Satz in (a) ändert (Frame-Problem)? Besprich beide Antworten mit dem Team, bevor ihr entscheidet, welche Art von Intervention ihr braucht.' } },
      { context: { en: 'AI as repertoire extender', de: 'KI als Repertoire-Erweiterung' }, prompt: { en: 'Since 2021, language models have changed the economics of repurposing: they can supply frames from fields you do not know. Describe a current problem to a model and ask for five frames from distant fields (ecology, logistics, theatre, epidemiology, law), each with its causal logic and the options it would open. Then judge, yourself, which one fits and which constraints become mutable. Note what remains your job: choosing, and taking responsibility for the choice.', de: 'Seit 2021 haben Sprachmodelle die Ökonomie des Repurposing verändert: Sie liefern Frames aus Feldern, die du nicht kennst. Beschreib einem Modell ein aktuelles Problem und bitte um fünf Frames aus fernen Feldern (Ökologie, Logistik, Theater, Epidemiologie, Recht), jeweils mit Kausallogik und den Optionen, die er eröffnen würde. Beurteile dann selbst, welcher passt und welche Constraints veränderbar werden. Halte fest, was deine Aufgabe bleibt: wählen und die Verantwortung für die Wahl tragen.' } },
      { context: { en: 'Change and consulting', de: 'Change und Beratung' }, prompt: { en: 'Build the timing question into a change-readiness assessment. Besides “Is the organisation ready?”, ask: have goals or context changed fundamentally, or is the current frame broad enough to absorb the change by loosening constraints? Formulate three interview questions that would show whether an organisation is before, inside or past its reframing window, and what evidence would change your assessment.', de: 'Bau die Timing-Frage in einen Change-Readiness-Check ein. Neben „Ist die Organisation bereit?“ frag: Haben sich Ziele oder Kontext grundlegend geändert, oder ist der aktuelle Frame breit genug, den Wandel durch Lockern von Constraints aufzufangen? Formuliere drei Interviewfragen, die zeigen, ob eine Organisation vor, in oder nach ihrem Reframing-Fenster steht, und welcher Befund deine Einschätzung ändern würde.' } },
    ],

    summary: [
      { en: 'Staying in a frame and adjusting constraints is the efficient default; reframing replaces the frame itself and with it what counts as fixed.', de: 'Im Frame bleiben und Constraints verstellen ist der effiziente Normalfall; Reframing ersetzt den Frame selbst und damit das, was als fest gilt.' },
      { en: 'There are three ways to switch, ordered by frequency and difficulty: repertoire, repurposing, reinvention; try them in that order.', de: 'Es gibt drei Wege zu wechseln, geordnet nach Häufigkeit und Schwierigkeit: Repertoire, Repurposing, Reinvention; probiere sie in dieser Reihenfolge.' },
      { en: 'Reframing is insight rather than method; it can be wrong, overlooked, or held on to too long after success.', de: 'Reframing ist eher Einsicht als Methode; es kann falsch sein, übersehen werden oder nach einem Erfolg zu lange festgehalten werden.' },
      { en: 'Four hurdles make it hard: cognitive energy, unlearning, fit (prefer mutable constraints) and timing (when circumstances change, not before, not much later).', de: 'Vier Hürden machen es schwer: kognitive Energie, Verlernen, Passung (veränderbare Constraints bevorzugen) und Timing (wenn sich die Umstände ändern, nicht früher, nicht viel später).' },
      { en: 'A broad frame can make switching unnecessary: loosening constraints within it is safer but slower, and only possible if such a frame already exists.', de: 'Ein breiter Frame kann den Wechsel überflüssig machen: Constraints darin zu lockern ist sicherer, aber langsamer, und nur möglich, wenn ein solcher Frame schon besteht.' },
    ],

    glossary: [
      { term: { en: 'Reframing', de: 'Reframing' }, def: { en: 'Switching from one mental model to another, as opposed to adjusting constraints within a frame.', de: 'Der Wechsel von einem mentalen Modell zu einem anderen, im Unterschied zum Verstellen von Constraints innerhalb eines Frames.' } },
      { term: { en: 'Repertoire', de: 'Repertoire' }, def: { en: 'Reframing by choosing another frame from your own stock. The most common and easiest form.', de: 'Reframing, indem du einen anderen Frame aus deinem eigenen Vorrat wählst. Die häufigste und leichteste Form.' } },
      { term: { en: 'Repurposing', de: 'Repurposing' }, def: { en: 'Reframing by borrowing a frame that works in another field and adapting it (IKEA, Andrew Lo).', de: 'Reframing, indem du einen Frame aus einem anderen Feld borgst und anpasst (IKEA, Andrew Lo).' } },
      { term: { en: 'Reinvention', de: 'Reinvention' }, def: { en: 'Reframing by creating a genuinely new frame (Darwin, special relativity, packet switching). The rarest form.', de: 'Reframing, indem du einen wirklich neuen Frame schaffst (Darwin, spezielle Relativität, Paketvermittlung). Die seltenste Form.' } },
      { term: { en: 'Tight vs. loose frame', de: 'Enger vs. weiter Frame' }, def: { en: 'Tight frames fit closely and make constraints transparent but break under change; loose frames last longer and leave room to move constraints.', de: 'Enge Frames sitzen genau und machen Constraints durchschaubar, brechen aber bei Wandel; weite Frames halten länger und lassen Raum, Constraints zu verschieben.' } },
      { term: { en: 'Reframing reframing', de: 'Reframing reframen' }, def: { en: 'The option of staying in a broad frame and loosening constraints instead of switching frames.', de: 'Die Option, in einem breiten Frame zu bleiben und Constraints zu lockern, statt den Frame zu wechseln.' } },
    ],
  });
})();
