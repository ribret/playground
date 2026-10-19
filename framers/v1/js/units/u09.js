/* u09 — Kapitel 9: Vigilanz / Chapter 9: Vigilance */
(function () {
  const P = V.palette;
  const de = (lang) => lang === 'de';
  const T = (lang, en, d) => (lang === 'de' ? d : en);

  /* ---------- local drawing helpers ---------- */
  const building = (x, y, col, o = {}) => V.group(
    V.path(`M${x - 30},${y - 34} L${x},${y - 54} L${x + 30},${y - 34} Z`, { fill: col, stroke: P.ink, sw: 1.5 }) +
    V.rect(x - 28, y - 34, 56, 34, { fill: P.paper, stroke: P.ink, sw: 1.5, r: 2 }) +
    [-18, -6, 6, 18].map(dx => V.line(x + dx, y - 30, x + dx, y - 4, { stroke: col, sw: 4 })).join(''), o);
  const steelFrame = (x, y, w, h, o = {}) => {
    let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="none" stroke="${P.ink}" stroke-width="9"/>`;
    [[x, y], [x + w, y], [x, y + h], [x + w, y + h], [x + w / 2, y], [x + w / 2, y + h], [x, y + h / 2], [x + w, y + h / 2]]
      .forEach(([cx, cy]) => { s += V.circle(cx, cy, 3, { fill: P.muted }); });
    return V.group(s, o);
  };
  const lock = (x, y, o = {}) => V.group(
    V.rect(x - 11, y, 22, 17, { fill: P.ink, stroke: P.ink, r: 3 }) + V.path(`M${x - 7},${y} v-6 a7,7 0 0,1 14,0 v6`, { stroke: P.ink, sw: 3 }), o);
  const hingedFrame = (pts, col, o = {}) => {
    let s = '';
    for (let i = 0; i < 4; i++) { const a = pts[i], b = pts[(i + 1) % 4]; s += V.line(a[0], a[1], b[0], b[1], { stroke: col, sw: 5 }); }
    pts.forEach(([cx, cy]) => { s += V.circle(cx, cy, 7, { fill: P.paper, stroke: col, sw: 3 }) + V.circle(cx, cy, 2.5, { fill: col }); });
    return V.group(s, o);
  };

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 6000,
      caption: { en: '<b>Framing happens at every level, not only among geniuses.</b> A comedian in the US, a tea entrepreneur in China and a solar founder in Sierra Leone each changed a mental model and with it their options.', de: '<b>Framing passiert auf jeder Ebene, nicht nur bei Genies.</b> Eine Comedian in den USA, ein Tee-Unternehmer in China und eine Solar-Gründerin in Sierra Leone haben je ein mentales Modell verändert und damit ihre Optionen.' },
      svg: (l) => {
        const lab = de(l) ? ['Komik', 'Tee', 'Solar'] : ['Comedy', 'Tea', 'Solar'];
        const place = de(l) ? ['USA', 'China', 'Sierra Leone'] : ['USA', 'China', 'Sierra Leone'];
        const cols = [P.plum, P.teal, P.amber];
        let s = '';
        [0, 1, 2].forEach(i => {
          const x = 20 + i * 125;
          s += V.frame(x, 50, 110, 125, { color: cols[i], label: lab[i], cls: 'a-pop', delay: i * .35 });
          s += V.person(x + 55, 135, { color: P.ink, cls: 'a-rise', delay: .3 + i * .35 });
          s += V.text(x + 55, 198, place[i], { size: 12, fill: P.muted, bold: true, cls: 'a-fade', delay: .5 + i * .35 });
        });
        s += V.text(200, 238, de(l) ? 'Framing auf jeder Ebene' : 'Framing on every level', { size: 15, bold: true, cls: 'a-fade', delay: 1.6 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>Progress is usually told as a story of coordination.</b> The authors claim the deeper lever is cognition: the frame in one head that tells the many hands what to build.', de: '<b>Fortschritt wird meist als Geschichte der Koordination erzählt.</b> Die Autoren behaupten, der tiefere Hebel sei Kognition: der Frame in einem Kopf, der den vielen Händen sagt, was sie bauen.' },
      svg: (l) => {
        let s = '';
        const pts = [[50, 110], [105, 110], [160, 110], [50, 185], [105, 185], [160, 185]];
        [[0, 1], [1, 2], [3, 4], [4, 5]].forEach(([a, b], i) => {
          s += V.line(pts[a][0] + 9, pts[a][1] - 7, pts[b][0] - 9, pts[b][1] - 7, { stroke: P.sky, sw: 2.5, cls: 'a-draw', delay: .5 + i * .1 });
        });
        pts.forEach(([x, y], i) => { s += V.person(x, y, { color: P.sky, scale: .75, cls: 'a-pop', delay: i * .08 }); });
        s += V.text(105, 232, de(l) ? 'Koordination' : 'Coordination', { size: 14, bold: true, fill: P.sky, cls: 'a-fade', delay: .9 });
        s += V.text(200, 150, '+', { size: 28, bold: true, fill: P.muted, cls: 'a-fade', delay: 1.2 });
        s += V.frame(235, 45, 140, 160, { color: P.coral, cls: 'a-pop', delay: 1.4 });
        s += V.person(290, 175, { color: P.ink, scale: 1.2, cls: 'a-rise', delay: 1.6 });
        s += V.bulb(340, 95, { cls: 'a-pop', delay: 2, scale: .9 });
        s += V.text(305, 232, de(l) ? 'Kognition' : 'Cognition', { size: 14, bold: true, fill: P.coral, cls: 'a-fade', delay: 2.2 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>But we retreat into silos.</b> Pew data: US areas dominated by one political view grew from 4 to 35 percent between 1980 and 2020. Uniform neighbourhoods produce uniform counterfactuals.', de: '<b>Doch wir ziehen uns in Silos zurück.</b> Pew-Daten: Der Anteil US-amerikanischer Regionen mit einer dominanten politischen Sicht stieg von 1980 bis 2020 von 4 auf 35 Prozent. Gleichförmige Nachbarschaften erzeugen gleichförmige Was-wäre-wenn-Fragen.' },
      svg: (l) => {
        let s = '';
        let seed = 5; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
        for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) {
          s += V.circle(45 + c * 22, 55 + r * 22, 7, { fill: rnd() > .5 ? P.coral : P.sky, cls: 'a-pop', delay: (r * 6 + c) * .015 });
          const right = c >= 3; const stray = (r === 1 && c === 2) || (r === 4 && c === 3);
          s += V.circle(245 + c * 22, 55 + r * 22, 7, { fill: (right !== stray) ? P.sky : P.coral, cls: 'a-pop', delay: 1.4 + (r * 6 + c) * .015 });
        }
        s += V.arrow(172, 110, 228, 110, { color: 'ink', cls: 'a-draw', delay: 1.1 });
        s += V.text(100, 210, '1980: 4 %', { size: 15, bold: true, cls: 'a-fade', delay: .6 });
        s += V.text(300, 210, '2020: 35 %', { size: 15, bold: true, fill: P.coral, cls: 'a-fade', delay: 2.1 });
        s += V.text(200, 243, de(l) ? 'Gleichgesinnte Regionen, USA' : 'Like-minded areas, USA', { size: 12, fill: P.muted, cls: 'a-fade', delay: 2.3 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>Framing is a ridge between two drops.</b> On one side the gut decides, on the other the algorithm. The authors argue both camps frame anyway, just without noticing.', de: '<b>Framing ist ein Grat zwischen zwei Abhängen.</b> Auf der einen Seite entscheidet der Bauch, auf der anderen der Algorithmus. Die Autoren argumentieren, dass beide Lager trotzdem framen, nur ohne es zu merken.' },
      svg: (l) => {
        let s = V.path('M20,250 L20,200 L120,200 L200,92 L280,200 L380,200 L380,250 Z', { fill: P.line, stroke: 'none', cls: 'a-fade' });
        s += V.path('M120,200 L200,92 L280,200', { stroke: P.teal, sw: 5, cls: 'a-draw', delay: .3 });
        s += V.person(200, 88, { color: P.ink, cls: 'a-pop', delay: 1 });
        s += V.text(200, 180, 'Framing', { size: 15, bold: true, fill: P.teal, cls: 'a-fade', delay: 1.2 });
        s += V.arrow(150, 165, 85, 225, { color: 'coral', cls: 'a-draw', delay: 1.6 });
        s += V.arrow(250, 165, 315, 225, { color: 'muted', cls: 'a-draw', delay: 1.9 });
        s += V.text(80, 50, de(l) ? 'Nur Bauch' : 'Gut only', { size: 14, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.6 });
        s += V.text(80, 68, de(l) ? 'emotionalistisch' : 'emotionalist', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1.7 });
        s += V.text(320, 50, de(l) ? 'Nur Daten' : 'Data only', { size: 14, bold: true, fill: P.ink, cls: 'a-fade', delay: 1.9 });
        s += V.text(320, 68, de(l) ? 'hyperrationalistisch' : 'hyper-rationalist', { size: 12, fill: P.muted, cls: 'a-fade', delay: 2 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>The machine computes inside a frame a human drew.</b> The book concludes that AI raises the stakes of framing rather than replacing it: someone has to set the goal and answer for it.', de: '<b>Die Maschine rechnet in einem Frame, den ein Mensch gezogen hat.</b> Das Buch folgert, dass KI die Bedeutung des Framings erhöht statt sie zu ersetzen: Jemand muss das Ziel setzen und dafür einstehen.' },
      svg: (l) => {
        let s = V.person(52, 175, { color: P.ink, scale: 1.2, cls: 'a-pop' });
        s += V.path('M72,160 Q96,140 115,120', { stroke: P.coral, sw: 2.5, dash: '4 4', cls: 'a-draw', delay: .4 });
        s += V.frame(120, 40, 260, 180, { color: P.coral, label: de(l) ? 'Menschlicher Frame' : 'Human frame', cls: 'a-draw', delay: .6 });
        s += V.rect(185, 80, 130, 80, { fill: P.ink, stroke: P.ink, r: 10, cls: 'a-pop', delay: 1.2 });
        for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) s += V.circle(203 + c * 19, 98 + r * 16, 3.5, { fill: P.amber, cls: 'a-pulse', delay: 1.5 + (r + c) * .08 });
        s += V.text(250, 154, de(l) ? 'KI' : 'AI', { size: 12, fill: '#fff', bold: true, cls: 'a-fade', delay: 1.4 });
        s += V.text(250, 198, de(l) ? 'Ziel · Frame · Verantwortung' : 'Goal · frame · accountability', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 2.2 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: { en: '<b>The most dangerous framer is the rigid one.</b> The Paris attackers of 2015 applied their frame with chilling consistency and admitted no adjustment. Rigidity does not add agency; it drains it.', de: '<b>Am gefährlichsten ist der starre Frame.</b> Die Pariser Attentäter von 2015 wandten ihren Frame mit erschreckender Konsequenz an und ließen keine Anpassung zu. Starrheit schafft keine Handlungsmacht, sie lässt sie auslaufen.' },
      svg: (l) => {
        let s = steelFrame(120, 40, 160, 125, { cls: 'a-pop' });
        s += lock(200, 16, { cls: 'a-pop', delay: .5 });
        [[160, 80], [200, 70], [240, 85], [175, 115], [225, 120]].forEach(([x, y], i) => { s += V.circle(x, y, 7, { fill: P.amber, cls: 'a-fade', delay: .3 + i * .1 }); });
        [[200, 180, 6, .9], [200, 194, 5, .65], [200, 206, 4, .4]].forEach(([x, y, r, op], i) => { s += V.circle(x, y, r, { fill: P.amber, opacity: op, cls: 'a-fade', delay: 1.4 + i * .35 }); });
        s += V.text(200, 240, de(l) ? 'Konsistent. Flüssig. Unverstellbar.' : 'Consistent. Fluent. Unadjustable.', { size: 15, bold: true, cls: 'a-fade', delay: 2.4 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>Agility of mind means frames with hinges.</b> Same structure, but joints that can move: you can hold two opposing ideas and still act. The authors call it trainable, like a dancer’s flexibility.', de: '<b>Agility of Mind heißt: Frames mit Scharnieren.</b> Gleiche Struktur, aber Gelenke, die sich bewegen: Du kannst zwei gegensätzliche Ideen halten und trotzdem handeln. Die Autoren halten das für trainierbar, wie die Beweglichkeit einer Tänzerin.' },
      svg: (l) => {
        let s = V.rect(120, 40, 160, 125, { fill: 'none', stroke: P.line, dash: '5 5', r: 4, cls: 'a-fade' });
        s += hingedFrame([[105, 50], [265, 34], [295, 160], [130, 178]], P.teal, { cls: 'a-pop', delay: .5 });
        [[160, 90], [215, 80], [240, 125], [175, 135]].forEach(([x, y], i) => { s += V.bulb(x, y, { scale: .75, cls: 'a-pop', delay: 1.3 + i * .2 }); });
        s += V.text(200, 228, de(l) ? 'Scharniere statt Stahl' : 'Hinges, not steel', { size: 16, bold: true, fill: P.teal, cls: 'a-fade', delay: 2.1 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: { en: '<b>Institutions can help, but they cannot frame for you.</b> Education, migration and deliberative formats widen exposure. In the authors’ words: “Framers frame frames, organizations don’t.”', de: '<b>Institutionen können helfen, aber nicht für dich framen.</b> Bildung, Migration und deliberative Formate erweitern, womit du in Berührung kommst. Mit den Worten der Autoren: „Framers frame frames, organizations don’t.“' },
      svg: (l) => {
        let s = building(62, 150, P.muted, { cls: 'a-fade' }) + building(338, 150, P.muted, { cls: 'a-fade', delay: .2 });
        s += V.text(62, 172, de(l) ? 'Bildung' : 'Education', { size: 12, fill: P.muted, bold: true, cls: 'a-fade', delay: .3 });
        s += V.text(338, 172, de(l) ? 'Beteiligung' : 'Deliberation', { size: 12, fill: P.muted, bold: true, cls: 'a-fade', delay: .4 });
        s += V.arrow(100, 120, 138, 120, { color: 'muted', dash: '4 4', cls: 'a-draw', delay: .6 });
        s += V.arrow(300, 120, 262, 120, { color: 'muted', dash: '4 4', cls: 'a-draw', delay: .6 });
        s += V.frame(145, 45, 110, 135, { color: P.coral, cls: 'a-draw', delay: 1 });
        s += V.person(200, 150, { color: P.ink, scale: 1.1, cls: 'a-pop', delay: 1.3 });
        s += V.text(200, 214, de(l) ? 'Menschen framen Frames.' : 'Framers frame frames.', { size: 16, bold: true, cls: 'a-fade', delay: 1.8 });
        s += V.text(200, 238, de(l) ? 'Organisationen nicht.' : 'Organisations don’t.', { size: 14, fill: P.muted, bold: true, cls: 'a-fade', delay: 2.2 });
        return V.wrap(s);
      } },
  ];

  /* ---------- section visuals ---------- */
  const visMoves = (l) => {
    let s = V.text(200, 36, de(l) ? 'Drei Züge, ein Spektrum' : 'Three moves, one spectrum', { size: 15, bold: true, cls: 'a-fade' });
    s += V.line(35, 125, 365, 125, { stroke: P.ink, sw: 2.5, cls: 'a-draw', delay: .2 });
    const items = [
      [95, 'Nie', P.teal, de(l) ? 'Teehaus,\nneue Constraints' : 'teahouse,\nnew constraints'],
      [215, 'Cooper', P.plum, de(l) ? 'streicht\n„aussehen wie er“' : 'drops\n“look like him”'],
      [328, 'Mosia', P.amber, de(l) ? 'Pay-as-you-go\nentliehen' : 'pay-as-you-go\nborrowed'],
    ];
    items.forEach(([x, name, col, mv], i) => {
      s += V.circle(x, 125, 11, { fill: col, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: .6 + i * .3 });
      s += V.text(x, 100, name, { size: 14, bold: true, cls: 'a-fade', delay: .7 + i * .3 });
      s += V.text(x, 158, mv, { size: 12, fill: P.ink, cls: 'a-fade', delay: .8 + i * .3 });
    });
    s += V.text(35, 222, de(l) ? '← Frame anwenden' : '← apply the frame', { size: 12, anchor: 'start', fill: P.muted, bold: true, cls: 'a-fade', delay: 1.6 });
    s += V.text(365, 222, de(l) ? 'Frame wechseln →' : 'switch the frame →', { size: 12, anchor: 'end', fill: P.muted, bold: true, cls: 'a-fade', delay: 1.6 });
    return V.wrap(s);
  };

  const visSilos = (l) => {
    const data = [['1980', 4], ['2016', 30], ['2020', 35]];
    let s = V.text(200, 32, de(l) ? 'US-Regionen mit dominanter politischer Sicht' : 'US areas with one dominant political view', { size: 13, bold: true, cls: 'a-fade' });
    s += V.line(50, 210, 350, 210, { stroke: P.ink, sw: 2 });
    data.forEach(([yr, v], i) => {
      const x = 95 + i * 105, h = v * 4;
      s += V.rect(x - 30, 210 - h, 60, h, { fill: i === 0 ? P.sky : P.coral, stroke: 'none', r: 4, cls: 'a-rise', delay: .3 + i * .3 });
      s += V.text(x, 210 - h - 8, v + ' %', { size: 14, bold: true, cls: 'a-fade', delay: .6 + i * .3 });
      s += V.text(x, 230, yr, { size: 13, fill: P.muted, bold: true });
    });
    s += V.text(200, 252, de(l) ? 'Quelle: Pew Research Center, zit. im Buch' : 'Source: Pew Research Center, as cited in the book', { size: 12, fill: P.muted });
    return V.wrap(s);
  };

  const visRigid = (l) => {
    let s = V.rect(15, 20, 180, 220, { fill: P.paper, stroke: P.line, r: 12 }) + V.rect(205, 20, 180, 220, { fill: P.paper, stroke: P.line, r: 12 });
    s += V.text(105, 40, de(l) ? 'Starres Framing' : 'Rigid framing', { size: 14, bold: true });
    s += V.text(295, 40, de(l) ? 'Bewegliches Framing' : 'Agile framing', { size: 14, bold: true, fill: P.teal });
    s += steelFrame(70, 84, 70, 52, { cls: 'a-pop', delay: .2 }) + lock(105, 68, { cls: 'a-pop', delay: .4 });
    s += hingedFrame([[258, 80], [328, 74], [338, 134], [262, 138]], P.teal, { cls: 'a-pop', delay: .5 });
    const left = de(l) ? ['flüssig erzählt', 'lückenlos konsistent', 'kein Was-wäre-wenn', 'jedes Ereignis bestätigt'] : ['fluent', 'seamlessly consistent', 'no what-if admitted', 'every event confirms'];
    const right = de(l) ? ['harter Kern benannt', 'Revisionsbedingung', 'zwei Ideen zugleich', 'Widerspruch erwünscht'] : ['hard core named', 'revision trigger set', 'two ideas at once', 'dissent invited'];
    left.forEach((t, i) => { s += V.text(105, 160 + i * 20, t, { size: 12, fill: P.ink, cls: 'a-fade', delay: .8 + i * .15 }); });
    right.forEach((t, i) => { s += V.text(295, 160 + i * 20, t, { size: 12, fill: P.ink, cls: 'a-fade', delay: 1 + i * .15 }); });
    return V.wrap(s);
  };

  window.FRAMERS.register({
    id: 'u09', number: 9, kind: 'chapter', color: '#E4572E', minutes: 25,
    title: { en: 'Vigilance', de: 'Vigilanz' },
    tagline: { en: 'Framing is a power we can lose twice: by handing it away, or by freezing it into a frame that admits no adjustment.', de: 'Framing ist eine Macht, die wir doppelt verlieren können: indem wir sie abgeben oder indem wir sie in einem Frame einfrieren, der keine Anpassung zulässt.' },
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="8" y="10" width="28" height="24" rx="3" fill="none" stroke="${c}" stroke-width="3"/><circle cx="8" cy="10" r="3.5" fill="#fff" stroke="${c}" stroke-width="2"/><circle cx="36" cy="10" r="3.5" fill="#fff" stroke="${c}" stroke-width="2"/><circle cx="8" cy="34" r="3.5" fill="#fff" stroke="${c}" stroke-width="2"/><circle cx="36" cy="34" r="3.5" fill="#fff" stroke="${c}" stroke-width="2"/><circle cx="22" cy="22" r="4" fill="${c}"/></svg>`,
    hook: {
      en: '<p>Which is more dangerous: a leadership team that decides by gut feeling, or one that has a beautifully coherent strategy in which every piece of bad news is reinterpreted as confirmation? The final chapter of <em>Framers</em> gives an uncomfortable answer. The second team is more dangerous, because it believes it is reasoning well.</p><p>The chapter is the book’s closing argument. It restates the two processes, revisits its opponents and then names the one thing it says we must guard: agility of mind.</p>',
      de: '<p>Was ist gefährlicher: ein Führungsteam, das aus dem Bauch entscheidet, oder eines mit einer wunderbar stimmigen Strategie, in der jede schlechte Nachricht als Bestätigung umgedeutet wird? Das Schlusskapitel von <em>Framers</em> gibt eine unbequeme Antwort. Das zweite Team ist gefährlicher, weil es glaubt, gut zu denken.</p><p>Das Kapitel ist das Schlussplädoyer des Buchs. Es fasst die zwei Prozesse zusammen, kehrt zu seinen Gegnern zurück und benennt das eine, das wir nach Ansicht der Autoren schützen müssen: Agility of Mind, die Beweglichkeit des Denkens.</p>'
    },
    objectives: [
      { en: 'Explain why the authors consider rigid framing more dangerous than not framing at all, and recognise its signs in an organisation.', de: 'Erklären, warum die Autoren starres Framing für gefährlicher halten als gar kein Framing, und seine Anzeichen in einer Organisation erkennen.' },
      { en: 'Distinguish emotionalist, hyper-rationalist, rigid and agile framing in concrete statements about AI and decisions.', de: 'Emotionalistisches, hyperrationalistisches, starres und bewegliches Framing in konkreten Aussagen über KI und Entscheidungen unterscheiden.' },
      { en: 'Assess the chapter’s two big claims (cognition over coordination; humans needed to manage machines) and state where they hold and where they do not.', de: 'Die zwei großen Thesen des Kapitels (Kognition vor Koordination; Menschen werden gebraucht, um Maschinen zu steuern) prüfen und benennen, wo sie tragen und wo nicht.' },
    ],
    film: { title: { en: 'Vigilance in eight scenes', de: 'Vigilanz in acht Szenen' }, scenes },
    sections: [
      { id: 's1', heading: { en: 'Ordinary framers, three different moves', de: 'Gewöhnliche Framer, drei verschiedene Züge' },
        body: {
          en: '<p>The chapter opens with three people nobody would call paradigm-shifters. In 2020 <strong>Sarah Cooper</strong> lip-synced Donald Trump’s televised musings about light and disinfectant. Impersonators usually copy the body; she kept only the voice and stayed herself in every other respect. Dropping the constraint “look like the person” left the words exposed, and they became shocking. <strong>Nie Yunchen</strong> noticed that young Chinese found tea either stuffy or cheap. With Heytea he stayed in the frame of the teahouse but changed its constraints: premium leaves and real milk, financed by skipping classic advertising. <strong>Nthabiseng Mosia</strong> co-founded Easy Solar in Sierra Leone, where most rural households have no grid. Customers could not buy a solar kit outright but knew pay-as-you-go from their phones, so the company borrowed that model.</p><p>Read them on a spectrum. Nie works inside a frame, Cooper changes a defining constraint of a genre, Mosia repurposes a frame from another industry. The point the authors draw: framing happens “commoner or king”. Celebrating only the rare reinventors hides how widespread the capability is.</p>',
          de: '<p>Das Kapitel beginnt mit drei Menschen, die niemand Paradigmenwechsler nennen würde. 2020 sprach <strong>Sarah Cooper</strong> lippensynchron Donald Trumps öffentliche Überlegungen zu Licht und Desinfektionsmittel nach. Imitationen kopieren meist den Körper; sie behielt nur die Stimme und blieb in allem anderen sie selbst. Ohne den Constraint, also die Begrenzung, „aussehen wie die Person“ standen die Worte nackt da und wirkten schockierend. <strong>Nie Yunchen</strong> bemerkte, dass junge Leute in China Tee entweder altbacken oder billig fanden. Mit Heytea blieb er im Frame des Teehauses, veränderte aber dessen Constraints: hochwertige Blätter und echte Milch, finanziert durch den Verzicht auf klassische Werbung. <strong>Nthabiseng Mosia</strong> gründete in Sierra Leone Easy Solar mit, wo die meisten ländlichen Haushalte keinen Netzanschluss haben. Kaufen konnten die Kundinnen und Kunden ein Solarset nicht auf einen Schlag, aber Pay-as-you-go kannten sie vom Handy. Also übernahm das Unternehmen dieses Modell.</p><p>Lies die drei als Spektrum. Nie arbeitet im Frame, Cooper ändert einen prägenden Constraint eines Genres, Mosia nutzt einen Frame aus einer anderen Branche um. Die Folgerung der Autoren: Framing passiert bei allen, im Original „commoner or king“. Wer nur die seltenen Erfinderinnen und Erfinder feiert, übersieht, wie verbreitet die Fähigkeit ist.</p>'
        },
        visual: { svg: visMoves, position: 'bottom', caption: { en: 'The three cases sit at different points between applying a frame and switching it. All three count as framing.', de: 'Die drei Fälle liegen an verschiedenen Punkten zwischen Frame anwenden und Frame wechseln. Alle drei zählen als Framing.' } },
        keyIdea: { en: 'Framing is not reserved for geniuses; the small moves inside and between frames are the common case.', de: 'Framing ist nicht Genies vorbehalten; die kleinen Züge innerhalb und zwischen Frames sind der Normalfall.' } },

      { id: 's2', heading: { en: 'Cognition over coordination, and the silo problem', de: 'Kognition vor Koordination und das Silo-Problem' },
        body: {
          en: '<p>The usual story of progress is one of cooperation: roads, courts, global supply chains. The historian Yuval Noah Harari argued in 2019 that unprecedented problems require global cooperation like never before. The authors call this half the story. Inside every monument sits a mental model; coordination executes what some head conceived. Their reason why cognition was overlooked: coordination is visible and shapeable, while thinking was a black box until cognitive science opened it in the last century. Hence their strongest sentence: cooperation still matters, “but framing matters more”.</p><p>Then the complication. Just when more frames are available than ever, people retreat to familiar ones. Citing the Pew Research Center, the book reports that US areas dominated by one ideological view grew from 4 percent in 1980 to 35 percent in 2020. The cognitive cost is the core argument: homogeneous surroundings shrink the range of counterfactuals you ever meet. Uniformity, in the authors’ phrase, is the end of successful framing. Note the tension: the cure for silos is exposure to other people, which is a coordination problem after all.</p>',
          de: '<p>Die übliche Fortschrittsgeschichte ist eine der Kooperation: Straßen, Gerichte, globale Lieferketten. Der Historiker Yuval Noah Harari argumentierte 2019, beispiellose Probleme verlangten globale Zusammenarbeit wie nie zuvor. Die Autoren nennen das die halbe Geschichte. In jedem Monument steckt ein mentales Modell; Koordination setzt um, was ein Kopf erdacht hat. Ihre Erklärung, warum Kognition übersehen wurde: Koordination ist sichtbar und gestaltbar, Denken war eine Blackbox, bis die Kognitionswissenschaft sie im letzten Jahrhundert öffnete. Daher ihr stärkster Satz: Kooperation zählt weiter, „but framing matters more“.</p><p>Dann die Komplikation. Gerade jetzt, wo mehr Frames verfügbar sind als je zuvor, ziehen sich Menschen auf vertraute zurück. Mit Bezug auf das Pew Research Center berichtet das Buch, dass der Anteil der US-Regionen mit einer dominanten ideologischen Sicht von 4 Prozent 1980 auf 35 Prozent 2020 stieg. Der kognitive Preis ist das eigentliche Argument: Homogene Umgebungen verkleinern die Bandbreite an Was-wäre-wenn-Varianten, denen du überhaupt begegnest. Gleichförmigkeit ist, so die Autoren, das Ende gelingenden Framings. Achte auf die Spannung: Das Mittel gegen Silos ist Kontakt mit anderen Menschen, also doch ein Koordinationsproblem.</p>'
        },
        visual: { svg: visSilos, position: 'bottom', caption: { en: 'Share of US areas dominated by one ideological view (Pew data as cited in the book). Fewer contrasting neighbours, fewer contrasting counterfactuals.', de: 'Anteil der US-Regionen mit einer dominanten ideologischen Sicht (Pew-Daten, wie im Buch zitiert). Weniger andersdenkende Nachbarschaft, weniger andersartige Was-wäre-wenn-Varianten.' } },
        keyIdea: { en: 'The chapter’s own frame: the decisive lever is in individual heads, not in the wiring between them.', de: 'Der Frame des Kapitels selbst: Der entscheidende Hebel liegt in einzelnen Köpfen, nicht in der Verdrahtung zwischen ihnen.' } },

      { id: 's3', heading: { en: 'The two opponents revisited, and the machine', de: 'Die zwei Gegner, noch einmal, und die Maschine' },
        body: {
          en: '<p>The book began by rejecting two shortcuts, and it closes by returning to them. The <strong>emotionalists</strong> find deliberate thinking overwrought and prefer impulse. The authors stress that this is not a left-right matter: vaccine sceptics on one side, climate deniers on the other; Duterte’s call to kill suspected drug dealers; the German “Querdenker” protesting pandemic measures. Their verdict: emotionalists are “not anti-framers”, they are “just bad at framing”, because their interpretation of the world is itself a mental model, only an unexamined one.</p><p>The <strong>hyper-rationalists</strong> want to outsource decisions to data and algorithms. The authors reply with the cases of the whole book, from the antibiotic halicin to game-playing systems: in each, humans set the frame the machine worked in. They cite François Chollet, who calls the human capacity for “extreme generalization”, adapting to never-seen situations with little or no data, the defining trait of human cognition. Conclusion: AI does not make frames obsolete, it makes them more important. “We will be needed to manage the machines.” Hold that sentence for the critique below; it is the weakest prediction in the chapter.</p>',
          de: '<p>Das Buch begann mit der Absage an zwei Abkürzungen, und es endet mit der Rückkehr zu ihnen. Das <strong>emotionalistische Lager</strong> hält bewusstes Abwägen für überkandidelt und folgt lieber dem Impuls. Die Autoren betonen, das sei keine Links-rechts-Frage: Impfskepsis auf der einen Seite, Leugnung des Klimawandels auf der anderen; Dutertes Aufruf, mutmaßliche Drogendealer zu töten; die deutschen „Querdenker“, die gegen Pandemiemaßnahmen demonstrierten. Ihr Urteil: Diese Menschen seien keine Anti-Framer, sondern „just bad at framing“, denn ihre Deutung der Welt ist selbst ein mentales Modell, nur ein ungeprüftes.</p><p>Das <strong>hyperrationalistische Lager</strong> will Entscheidungen an Daten und Algorithmen auslagern. Die Autoren antworten mit den Fällen des ganzen Buchs, vom Antibiotikum Halicin bis zu spielenden KI-Systemen: Immer haben Menschen den Frame gesetzt, in dem die Maschine arbeitete. Sie zitieren François Chollet, der die menschliche Fähigkeit zur „extreme generalization“, also sich ohne oder mit wenig Daten an nie Erlebtes anzupassen, als Kennzeichen menschlicher Kognition beschreibt. Folgerung: KI macht Frames nicht überflüssig, sondern wichtiger. „We will be needed to manage the machines.“ Merk dir diesen Satz für die Kritik unten; er ist die schwächste Prognose des Kapitels.</p>'
        },
        keyIdea: { en: 'Neither camp escapes framing. One frames without examining, the other hands the frame to a system that cannot own it.', de: 'Keines der Lager entkommt dem Framing. Das eine framet ohne Prüfung, das andere übergibt den Frame einem System, das ihn nicht verantworten kann.' } },

      { id: 's4', heading: { en: 'Rigidity and agility of mind', de: 'Starrheit und Agility of Mind' },
        body: {
          en: '<p>The chapter’s darkest section concerns the attacks in Paris on 13 November 2015, in which 130 people were killed, many at the Bataclan concert hall. The authors use it for one analytical point. Terrorists are often assumed to act irrationally. Research cited in the book suggests the opposite: they apply a frame with cold consistency. The sociologist Gérald Bronner speaks of an “almost inhuman consistency”. The organiser, Abdelhamid Abaaoud, read every event, including narrow escapes from police, as divine arrangement. Causality, counterfactuals and constraints were all in place; what was missing was the ability to adjust.</p><p>Two consequences follow. Rigidity destroys agency: the rigid framer no longer chooses but executes. And framing done badly is more dangerous than not framing, because it presumes to be right and hides its errors behind a veneer of reason.</p><p>The remedy the authors propose is <strong>agility of mind</strong>, which they cast as the 21st-century counterpart to the free flow of information. They mean more than openness: the conviction that thought can take a new path even after walking the old one a thousand times, or holding “two opposing ideas” at once (F. Scott Fitzgerald). Like a dancer’s flexibility, it is a capacity everyone has and a skill only training builds. Education, immigration or deliberative democracy can support it, but “framers frame frames, organizations don’t”.</p>',
          de: '<p>Der dunkelste Teil des Kapitels betrifft die Anschläge in Paris am 13. November 2015, bei denen 130 Menschen getötet wurden, viele davon im Konzertsaal Bataclan. Die Autoren nutzen ihn für einen einzigen analytischen Punkt. Terroristischen Tätern wird oft unterstellt, irrational zu handeln. Im Buch zitierte Forschung legt das Gegenteil nahe: Sie wenden einen Frame mit kalter Konsequenz an. Der Soziologe Gérald Bronner spricht von „almost inhuman consistency“. Der Organisator Abdelhamid Abaaoud deutete jedes Ereignis, auch knappes Entkommen vor der Polizei, als göttliche Fügung. Kausalität, Kontrafaktisches und Constraints waren vorhanden; es fehlte die Fähigkeit zur Anpassung.</p><p>Zwei Folgerungen. Starrheit zerstört Handlungsmacht: Wer starr framet, wählt nicht mehr, sondern vollstreckt. Und schlechtes Framing ist gefährlicher als gar keins, weil es sich im Recht wähnt und seine Fehler hinter einer Fassade von Vernunft verbirgt.</p><p>Als Gegenmittel schlagen die Autoren <strong>Agility of Mind</strong> vor, die Beweglichkeit des Denkens, als Gegenstück des 21. Jahrhunderts zum freien Informationsfluss. Gemeint ist mehr als Offenheit: die Überzeugung, dass das Denken einen neuen Weg nehmen kann, auch nachdem es den alten tausendmal gegangen ist, oder „two opposing ideas“ zugleich halten kann (F. Scott Fitzgerald). Wie die Beweglichkeit einer Tänzerin ist es eine Anlage, die alle haben, und eine Fähigkeit, die nur Training aufbaut. Bildung, Migration oder deliberative Demokratie können helfen, aber „framers frame frames, organizations don’t“.</p>'
        },
        visual: { svg: visRigid, position: 'bottom', caption: { en: 'Both columns can look equally rational from inside. The difference is not intelligence but whether the frame admits a revision.', de: 'Von innen können beide Spalten gleich rational wirken. Der Unterschied ist nicht Intelligenz, sondern ob der Frame eine Revision zulässt.' } },
        keyIdea: { en: 'Vigilance is not about having the right frame; it is about keeping your frame revisable.', de: 'Vigilanz heißt nicht, den richtigen Frame zu haben, sondern deinen Frame revidierbar zu halten.' } },
    ],

    exercise: {
      type: 'sort',
      title: { en: 'Four ways to talk about AI in a leadership team', de: 'Vier Arten, im Führungskreis über KI zu sprechen' },
      instructions: {
        en: 'A mid-sized insurer debates how far to let AI into underwriting and HR decisions. Sort each statement from the leadership team. <strong>Emotionalist:</strong> decides by impulse, dismisses deliberate framing. <strong>Hyper-rationalist:</strong> hands the frame to data or a system. <strong>Rigid framer:</strong> fluent and consistent, but nothing could change the frame. <strong>Agile framer:</strong> names the frame, its hard core and what would make it revise. The rigid category is the subtle one: it often sounds the most competent.',
        de: 'Ein mittelgroßer Versicherer diskutiert, wie weit KI in Underwriting- und Personalentscheidungen hinein darf. Ordne jede Aussage aus dem Führungskreis zu. <strong>Emotionalistisch:</strong> entscheidet aus dem Impuls, wischt bewusstes Framing weg. <strong>Hyperrationalistisch:</strong> übergibt den Frame an Daten oder ein System. <strong>Starres Framing:</strong> flüssig und konsistent, aber nichts könnte den Frame ändern. <strong>Bewegliches Framing:</strong> benennt den Frame, seinen harten Kern und was ihn zur Revision brächte. Die starre Kategorie ist die subtile: Sie klingt oft am kompetentesten.'
      },
      categories: [
        { id: 'emo', label: { en: 'Emotionalist', de: 'Emotionalistisch' } },
        { id: 'hyper', label: { en: 'Hyper-rationalist', de: 'Hyperrationalistisch' } },
        { id: 'rigid', label: { en: 'Rigid framer', de: 'Starres Framing' } },
        { id: 'agile', label: { en: 'Agile framer', de: 'Bewegliches Framing' } },
      ],
      items: [
        { text: { en: '“I have read enough decks. My gut says our customers will hate a chatbot, so we are not doing it.”', de: '„Ich habe genug Folien gelesen. Mein Bauch sagt, unsere Kundschaft wird einen Chatbot hassen, also lassen wir es.“' }, category: 'emo',
          why: { en: 'Impulse replaces a causal model. Note: the conclusion might even be right. The book’s objection is to the unexamined route, not to the result.', de: 'Der Impuls ersetzt ein Kausalmodell. Beachte: Die Schlussfolgerung kann sogar stimmen. Der Einwand des Buchs gilt dem ungeprüften Weg, nicht dem Ergebnis.' } },
        { text: { en: '“All these scenario workshops are overthinking. Real leaders feel when the moment is right.”', de: '„Diese ganzen Szenario-Workshops sind verkopft. Echte Führungskräfte spüren, wann der Moment richtig ist.“' }, category: 'emo',
          why: { en: 'The classic emotionalist move: framing work is framed as inauthentic. The statement itself carries a frame (leadership as intuition), just an unexamined one.', de: 'Der klassische emotionalistische Zug: Framing-Arbeit wird als unecht abgewertet. Die Aussage trägt selbst einen Frame (Führung als Intuition), nur einen ungeprüften.' } },
        { text: { en: '“Human judgement in underwriting is just bias with a job title. Let the model set the premiums and stop overruling it.”', de: '„Menschliches Urteil im Underwriting ist nur Verzerrung mit Stellenbezeichnung. Lasst das Modell die Prämien festlegen und hört auf, es zu übersteuern.“' }, category: 'hyper',
          why: { en: 'The frame (what counts as a good premium, which risks to accept, which fairness rules apply) is silently handed to whoever built the model. Someone still framed; they are just no longer accountable in the room.', de: 'Der Frame (was eine gute Prämie ist, welche Risiken man nimmt, welche Fairnessregeln gelten) wird stillschweigend an die Leute übergeben, die das Modell gebaut haben. Geframet wurde trotzdem; nur sitzt niemand Verantwortliches mehr im Raum.' } },
        { text: { en: '“We don’t need to define the problem first. Put all HR data into the platform and it will show us where the issues are.”', de: '„Wir müssen das Problem nicht erst definieren. Wir kippen alle HR-Daten in die Plattform, die zeigt uns dann, wo es hakt.“' }, category: 'hyper',
          why: { en: 'Data without a frame does not reveal problems; it reveals whatever the tool’s defaults are set to find. Halicin worked because humans first changed the question.', de: 'Daten ohne Frame zeigen keine Probleme, sondern das, wofür die Voreinstellungen des Werkzeugs gebaut sind. Halicin gelang, weil Menschen zuerst die Frage verändert haben.' } },
        { text: { en: '“If adoption rises, our AI strategy is working. If it falls, employees are not ready yet. Either way the strategy is confirmed.”', de: '„Steigt die Nutzung, wirkt unsere KI-Strategie. Sinkt sie, sind die Mitarbeitenden noch nicht so weit. So oder so ist die Strategie bestätigt.“' }, category: 'rigid',
          why: { en: 'Every outcome confirms the frame: the structural signature the chapter describes. Causality is there, but no counterfactual could ever count against it.', de: 'Jedes Ergebnis bestätigt den Frame: genau die Struktur, die das Kapitel beschreibt. Kausalität ist da, aber kein Was-wäre-wenn könnte je dagegen sprechen.' } },
        { text: { en: '“Our target operating model was derived rigorously and is internally consistent. Questioning its premises now would be a lack of discipline.”', de: '„Unser Zielbetriebsmodell wurde sauber hergeleitet und ist in sich konsistent. Seine Prämissen jetzt infrage zu stellen, wäre mangelnde Disziplin.“' }, category: 'rigid',
          why: { en: 'Fluent, consistent, competent-sounding, and closed. Consistency is a virtue for constraints (chapter 5), but here it is used to forbid revision. Recasting doubt as indiscipline mirrors how rigid framers see flexibility as corruption.', de: 'Flüssig, konsistent, kompetent klingend und geschlossen. Konsistenz ist eine Tugend bei Constraints (Kapitel 5), hier dient sie aber dazu, Revision zu verbieten. Zweifel als Disziplinlosigkeit umzudeuten, spiegelt, wie starre Framer Beweglichkeit als Verfall sehen.' } },
        { text: { en: '“Our frame: AI drafts, underwriters decide and sign. If draft quality and complaint rates stay stable for two quarters, we revisit who signs what.”', de: '„Unser Frame: KI entwirft, Underwriter entscheiden und zeichnen. Bleiben Entwurfsqualität und Beschwerdequote zwei Quartale stabil, prüfen wir neu, wer was zeichnet.“' }, category: 'agile',
          why: { en: 'Frame named, hard core (human sign-off) explicit, and a concrete revision trigger stated in advance. That is agility with structure, not vagueness.', de: 'Frame benannt, harter Kern (menschliche Zeichnung) explizit und eine konkrete Revisionsbedingung vorab festgelegt. Das ist Beweglichkeit mit Struktur, nicht Beliebigkeit.' } },
        { text: { en: '“Before we automate pre-screening of applicants: what would have to be true for this to be a mistake? Let’s write down which assumption we would drop first.”', de: '„Bevor wir die Vorauswahl von Bewerbungen automatisieren: Was müsste wahr sein, damit das ein Fehler ist? Schreiben wir auf, welche Annahme wir zuerst fallen lassen würden.“' }, category: 'agile',
          why: { en: 'A counterfactual aimed at the frame itself, plus a ranking of constraints by mutability. The team holds the plan and its opposite in view at the same time.', de: 'Ein Was-wäre-wenn, das auf den Frame selbst zielt, plus eine Rangfolge der Constraints nach Veränderbarkeit. Das Team hält den Plan und sein Gegenteil gleichzeitig im Blick.' } },
      ],
    },

    caseStudy: {
      title: { en: 'Easy Solar: repurposing instead of inventing', de: 'Easy Solar: umnutzen statt erfinden' },
      body: {
        en: '<p>Nthabiseng Mosia grew up in a township near Johannesburg where the grid failed often enough that she sometimes studied for exams by candlelight. After graduate school in the US she moved to Sierra Leone, where the large majority of people in the region have no electricity. Most live in rural areas the national grid will not reach any time soon, so they rely on kerosene lamps and travel to charge their phones.</p><p>The obvious frame was infrastructural: extend the grid. Mosia and two co-founders switched to a decentralised frame: solar panels and batteries per household. That solved supply but not purchase: the kits were cheap by Western standards and still unaffordable as a single payment. The decisive move was borrowed. Customers already knew pay-as-you-go from mobile phone operators, so Easy Solar let them pay in instalments while using the kit and own it once paid off. By 2020, according to the book, the company served around 300,000 households.</p><p>Nothing in this was a technical invention. The innovation was transplanting a payment frame from one industry into another where its preconditions (familiarity, small regular cash flows, a device that can be switched off) already existed.</p>',
        de: '<p>Nthabiseng Mosia wuchs in einer Township bei Johannesburg auf, in der das Stromnetz oft genug ausfiel, dass sie manchmal bei Kerzenlicht für Prüfungen lernte. Nach dem Studium in den USA zog sie nach Sierra Leone, wo die große Mehrheit der Menschen in der Region keinen Strom hat. Die meisten leben auf dem Land, wohin das nationale Netz so bald nicht reicht; sie behelfen sich mit Kerosinlampen und reisen, um ihre Handys zu laden.</p><p>Der naheliegende Frame war infrastrukturell: das Netz ausbauen. Mosia und zwei Mitgründer wechselten zu einem dezentralen Frame: Solarmodule und Batterien pro Haushalt. Das löste das Angebot, nicht den Kauf: Die Sets waren nach westlichen Maßstäben günstig und als Einmalzahlung trotzdem unerschwinglich. Der entscheidende Zug war entliehen. Pay-as-you-go kannten die Kundinnen und Kunden von den Mobilfunkanbietern, also ließ Easy Solar sie in Raten zahlen, während sie das Set nutzten, und nach der letzten Rate gehörte es ihnen. 2020 versorgte das Unternehmen laut Buch rund 300.000 Haushalte.</p><p>Nichts daran war eine technische Erfindung. Die Innovation bestand darin, einen Bezahl-Frame aus einer Branche in eine andere zu verpflanzen, in der seine Voraussetzungen (Vertrautheit, kleine regelmäßige Zahlungen, ein Gerät, das sich abschalten lässt) schon gegeben waren.</p>'
      },
      lesson: { en: 'Repurposing works when the borrowed frame’s preconditions already exist in the new context. Before you transplant a model from one client or industry to another, check those preconditions, not just the surface similarity.', de: 'Repurposing gelingt, wenn die Voraussetzungen des entliehenen Frames im neuen Kontext schon gegeben sind. Bevor du ein Modell von einem Kunden oder einer Branche auf eine andere überträgst, prüf diese Voraussetzungen, nicht nur die oberflächliche Ähnlichkeit.' },
    },

    reflection: {
      intro: { en: 'This chapter asks you to look at your own frames for rigidity, not other people’s. That is harder than it sounds, because a rigid frame feels like clarity from inside.', de: 'Dieses Kapitel fordert dich auf, deine eigenen Frames auf Starrheit zu prüfen, nicht die anderer. Das ist schwerer, als es klingt, denn ein starrer Frame fühlt sich von innen wie Klarheit an.' },
      prompts: [
        { en: 'Name one professional conviction you have held for years. What observation would make you revise it? If you cannot name one, what does that tell you?', de: 'Nenne eine berufliche Überzeugung, die du seit Jahren vertrittst. Welche Beobachtung würde dich dazu bringen, sie zu revidieren? Wenn dir keine einfällt, was sagt dir das?' },
        { en: 'Where in your work have recent setbacks been explained in a way that left the strategy untouched? Was that explanation tested or simply convenient?', de: 'Wo in deiner Arbeit wurden jüngste Rückschläge so erklärt, dass die Strategie unangetastet blieb? Wurde diese Erklärung geprüft oder war sie einfach bequem?' },
        { en: 'How homogeneous is your own frame supply: clients, team, feeds, conferences? Which perspective that annoys you have you not engaged with in the last six months?', de: 'Wie homogen ist deine eigene Frame-Versorgung: Kundschaft, Team, Feeds, Konferenzen? Mit welcher Perspektive, die dich ärgert, hast du dich in den letzten sechs Monaten nicht auseinandergesetzt?' },
      ],
      placeholder: { en: 'The conviction I would find hardest to revise is…', de: 'Die Überzeugung, die ich am schwersten revidieren würde, ist …' },
    },

    quiz: [
      { q: { en: 'A board member says: “Our transformation narrative is airtight; every delay so far is explained by it.” What would the chapter’s authors flag first?', de: 'Ein Vorstandsmitglied sagt: „Unser Transformationsnarrativ ist lückenlos; jede bisherige Verzögerung wird davon erklärt.“ Was würden die Autoren zuerst anmerken?' },
        options: [
          { en: 'An explanation that absorbs every outcome is a warning sign of rigidity, not a sign of strength.', de: 'Eine Erklärung, die jedes Ergebnis schluckt, ist ein Warnsignal für Starrheit, kein Zeichen von Stärke.' },
          { en: 'Airtight narratives are good, because consistency is one of the principles for choosing constraints.', de: 'Lückenlose Narrative sind gut, denn Konsistenz ist eines der Prinzipien zur Wahl von Constraints.' },
          { en: 'The narrative is emotionalist and should be replaced by data.', de: 'Das Narrativ ist emotionalistisch und sollte durch Daten ersetzt werden.' },
          { en: 'Nothing; delays are normal in transformations.', de: 'Nichts; Verzögerungen sind in Transformationen normal.' },
        ],
        answer: 0, explain: { en: 'The chapter’s point about rigid framers: consistent application without any room for adjustment. Consistency among constraints is a virtue; immunity to evidence is not.', de: 'Die Pointe des Kapitels zu starren Framern: konsequente Anwendung ohne jeden Raum für Anpassung. Konsistenz unter Constraints ist eine Tugend, Immunität gegen Evidenz nicht.' } },
      { q: { en: 'Why do the authors say framing done badly is more dangerous than not framing at all?', de: 'Warum halten die Autoren schlechtes Framing für gefährlicher als gar kein Framing?' },
        options: [
          { en: 'Because bad frames always contain factual errors.', de: 'Weil schlechte Frames immer Sachfehler enthalten.' },
          { en: 'Because no-framing leads to random decisions, which on average are fine.', de: 'Weil Nicht-Framen zu Zufallsentscheidungen führt, die im Schnitt in Ordnung sind.' },
          { en: 'Because it presumes to be right, so its errors hide behind a veneer of reason and are harder to escape.', de: 'Weil es sich im Recht wähnt, sodass seine Fehler hinter einer Fassade von Vernunft verborgen bleiben und schwerer zu verlassen sind.' },
          { en: 'Because it takes more time than intuition.', de: 'Weil es mehr Zeit kostet als Intuition.' },
        ],
        answer: 2, explain: { en: 'The danger is epistemic confidence: a wrong frame applied with method feels justified to its holder and is opaque to outsiders.', de: 'Die Gefahr ist epistemische Selbstgewissheit: Ein falscher Frame, methodisch angewendet, fühlt sich für die Person gerechtfertigt an und bleibt für andere undurchsichtig.' } },
      { q: { en: 'Heytea, as the chapter tells it, is an example of what?', de: 'Wofür ist Heytea, so wie das Kapitel es erzählt, ein Beispiel?' },
        options: [
          { en: 'Reinvention: a completely new frame for drinks.', de: 'Reinvention: ein völlig neuer Frame für Getränke.' },
          { en: 'Staying inside an existing frame (the teahouse) while changing its constraints for a new audience.', de: 'Im bestehenden Frame (Teehaus) bleiben und dessen Constraints für ein neues Publikum verändern.' },
          { en: 'Repurposing the Starbucks frame for tea.', de: 'Repurposing des Starbucks-Frames für Tee.' },
          { en: 'Hyper-rationalism: social-media data decided the product.', de: 'Hyperrationalismus: Social-Media-Daten bestimmten das Produkt.' },
        ],
        answer: 1, explain: { en: 'The book explicitly contrasts Nie with Starbucks: he did not borrow the “third place” idea but refashioned the classical Chinese teahouse with premium ingredients and a different cost structure.', de: 'Das Buch grenzt Nie ausdrücklich von Starbucks ab: Er übernahm nicht die „Third Place“-Idee, sondern gestaltete das klassische chinesische Teehaus mit hochwertigen Zutaten und anderer Kostenstruktur neu.' } },
      { q: { en: 'A client asks you to prove that “AI will never replace our experts, because only humans can frame”. Which answer is most defensible in 2026?', de: 'Ein Kunde bittet dich zu belegen, dass „KI unsere Fachleute nie ersetzen wird, weil nur Menschen framen können“. Welche Antwort ist 2026 am ehesten haltbar?' },
        options: [
          { en: 'Correct: machines cannot generate alternative frames, as the book shows.', de: 'Richtig: Maschinen können keine alternativen Frames erzeugen, wie das Buch zeigt.' },
          { en: 'Wrong: AI frames better than humans, so the experts are redundant.', de: 'Falsch: KI framet besser als Menschen, die Fachleute sind also überflüssig.' },
          { en: 'It depends on the size of the training data.', de: 'Das hängt von der Größe der Trainingsdaten ab.' },
          { en: 'Models can propose frames today; what stays human is owning the goal, choosing among frames and being accountable for the result.', de: 'Modelle können heute Frames vorschlagen; menschlich bleibt, das Ziel zu verantworten, zwischen Frames zu wählen und für das Ergebnis einzustehen.' },
        ],
        answer: 3, explain: { en: 'The book’s strong claim is dated; the defensible version shifts from capability to ownership and accountability. That is also a better consulting argument than a capability claim the next model release may refute.', de: 'Die starke These des Buchs ist überholt; die haltbare Version verschiebt sich von Fähigkeit zu Verantwortung und Rechenschaft. Das ist auch das bessere Beratungsargument als eine Fähigkeitsbehauptung, die das nächste Modell-Release widerlegen kann.' } },
      { q: { en: 'What does the chapter mean by “agility of mind”, as opposed to mere openness?', de: 'Was meint das Kapitel mit „Agility of Mind“ im Unterschied zu bloßer Offenheit?' },
        options: [
          { en: 'Changing your frame as often as possible.', de: 'Den Frame so oft wie möglich wechseln.' },
          { en: 'Tolerating every opinion without judgement.', de: 'Jede Meinung ohne Urteil tolerieren.' },
          { en: 'A trained disposition to reconceive the world, including holding opposing ideas at once, while still being able to act.', de: 'Eine trainierte Disposition, die Welt neu zu denken, einschließlich gegensätzliche Ideen gleichzeitig zu halten, und dabei handlungsfähig zu bleiben.' },
          { en: 'Delegating framing to diverse teams so individuals need not do it.', de: 'Framing an diverse Teams delegieren, damit Einzelne es nicht tun müssen.' },
        ],
        answer: 2, explain: { en: 'Constant switching contradicts the book’s advice to reframe rarely. Delegation contradicts “framers frame frames, organizations don’t”. Agility is a capacity of individual minds, built like a dancer’s flexibility.', de: 'Ständiges Wechseln widerspricht dem Rat des Buchs, selten zu reframen. Delegieren widerspricht „framers frame frames, organizations don’t“. Agility ist eine Fähigkeit einzelner Köpfe, aufgebaut wie die Beweglichkeit einer Tänzerin.' } },
      { q: { en: 'Your team works almost only with clients from one sector and recruits from the same two universities. Which risk does the chapter point to?', de: 'Dein Team arbeitet fast nur mit Kundschaft aus einer Branche und rekrutiert von denselben zwei Hochschulen. Auf welches Risiko weist das Kapitel hin?' },
        options: [
          { en: 'A silo that narrows the range of counterfactuals the team ever encounters.', de: 'Ein Silo, das die Bandbreite der Was-wäre-wenn-Varianten verengt, denen das Team überhaupt begegnet.' },
          { en: 'Too much cognitive diversity, which slows decisions.', de: 'Zu viel kognitive Vielfalt, die Entscheidungen verlangsamt.' },
          { en: 'Emotionalism, because sector experts trust their gut.', de: 'Emotionalismus, weil Branchenfachleute ihrem Bauch vertrauen.' },
          { en: 'None; specialisation is the same as a good repertoire.', de: 'Keines; Spezialisierung ist dasselbe wie ein gutes Repertoire.' },
        ],
        answer: 0, explain: { en: 'The Pew silo argument applied to an organisation: homogeneity is comfortable and efficient, but it starves the supply of alternative frames, exactly when a context shift would require one.', de: 'Das Pew-Silo-Argument auf eine Organisation übertragen: Homogenität ist bequem und effizient, aber sie lässt den Nachschub an alternativen Frames versiegen, genau dann, wenn ein Kontextwechsel einen bräuchte.' } },
    ],

    flashcards: [
      { front: { en: 'Vigilance (chapter 9)', de: 'Vigilanz (Kapitel 9)' }, back: { en: 'Guarding framing against two losses: handing it away (to gut or machine) and freezing it into a frame that admits no adjustment.', de: 'Framing gegen zwei Verluste schützen: es abgeben (an Bauch oder Maschine) und es in einem Frame einfrieren, der keine Anpassung zulässt.' } },
      { front: { en: 'Rigid framing', de: 'Starres Framing' }, back: { en: 'Applying a frame with full consistency but no room for revision. Signs: fluent, seamless, every event confirms. Destroys agency; more dangerous than no framing because it presumes to be right.', de: 'Einen Frame völlig konsequent anwenden, ohne Raum für Revision. Anzeichen: flüssig, lückenlos, jedes Ereignis bestätigt. Zerstört Handlungsmacht; gefährlicher als kein Framing, weil es sich im Recht wähnt.' } },
      { front: { en: 'Agility of mind', de: 'Agility of Mind' }, back: { en: 'The authors’ proposed core principle for the 21st century: a trainable plasticity in how we conceive and reconceive the world. Their analogy to the free flow of information.', de: 'Das von den Autoren vorgeschlagene Kernprinzip für das 21. Jahrhundert: eine trainierbare Formbarkeit darin, wie wir die Welt denken und neu denken. Ihre Analogie zum freien Informationsfluss.' } },
      { front: { en: 'Cognition vs. coordination', de: 'Kognition vs. Koordination' }, back: { en: 'The chapter’s claim: progress is usually credited to cooperation (Harari), but every coordinated achievement rests on a frame in someone’s head. “Framing matters more.”', de: 'Die These des Kapitels: Fortschritt wird meist der Kooperation zugeschrieben (Harari), aber jede koordinierte Leistung beruht auf einem Frame in einem Kopf. „Framing matters more.“' } },
      { front: { en: 'Emotionalists: “not anti-framers”', de: 'Emotionalistisches Lager: „keine Anti-Framer“' }, back: { en: 'The authors’ verdict: those who reject deliberate thinking still frame, just badly, with an unexamined model. Applies across the political spectrum.', de: 'Das Urteil der Autoren: Wer bewusstes Denken ablehnt, framet trotzdem, nur schlecht, mit einem ungeprüften Modell. Gilt über das politische Spektrum hinweg.' } },
      { front: { en: 'Extreme generalization (Chollet)', de: 'Extreme Generalisierung (Chollet)' }, back: { en: 'Adapting to never-experienced situations with little or no new data. Cited as the defining trait of human cognition and the reason humans will “manage the machines”.', de: 'Sich mit wenig oder ohne neue Daten an nie Erlebtes anpassen. Zitiert als Kennzeichen menschlicher Kognition und als Grund, warum Menschen die Maschinen „steuern“ werden.' } },
      { front: { en: '“Framers frame frames, organizations don’t.”', de: '„Framers frame frames, organizations don’t.“' }, back: { en: 'Institutions (education, migration, deliberative formats) can widen exposure to frames, but the cognitive work happens in individual minds.', de: 'Institutionen (Bildung, Migration, deliberative Formate) können den Kontakt mit Frames erweitern, aber die kognitive Arbeit geschieht in einzelnen Köpfen.' } },
    ],

    critique: [
      { claim: { en: 'Cooperation still matters, but framing matters more; cognition is the new central lever of progress.', de: 'Kooperation zählt weiter, aber Framing zählt mehr; Kognition ist der neue zentrale Hebel des Fortschritts.' },
        challenge: { en: 'This is asserted, not argued, and it sits awkwardly with the book’s own chapter 3, which draws on Michael Tomasello: human causal and counterfactual thinking evolved through shared intentionality, that is, through cooperation. Frames are learned, tested and stabilised socially. The chapter itself admits that the cure for silos is exposure to others. A sociologist would say the dichotomy is false: cognition and coordination co-produce each other. The more defensible claim is narrower: organisations invest heavily in coordination and almost nothing in the quality of the frames being coordinated.', de: 'Das wird behauptet, nicht begründet, und es passt schlecht zu Kapitel 3 des Buchs, das sich auf Michael Tomasello stützt: Menschliches kausales und kontrafaktisches Denken hat sich über geteilte Intentionalität entwickelt, also über Kooperation. Frames werden sozial gelernt, geprüft und stabilisiert. Das Kapitel räumt selbst ein, dass das Mittel gegen Silos der Kontakt mit anderen ist. Soziologisch ist die Gegenüberstellung falsch: Kognition und Koordination bringen einander hervor. Haltbar ist die engere These: Organisationen investieren massiv in Koordination und fast nichts in die Qualität der Frames, die koordiniert werden.' } },
      { claim: { en: '“We will be needed to manage the machines”, because AI cannot frame or generalise to the genuinely new.', de: '„We will be needed to manage the machines“, weil KI nicht framen und nicht auf echt Neues generalisieren kann.' },
        challenge: { en: 'This is the chapter’s weakest prediction in 2026. Current models propose alternative framings, generate counterfactuals and transfer patterns across domains on request. Chollet’s ARC benchmark, built to measure exactly the “extreme generalization” the authors cite, has seen large jumps from newer reasoning models, and its interpretation is now itself disputed. The capability argument is eroding. What remains is an argument about ownership: someone must choose the goal, decide which frame is acceptable and be accountable. That is a normative and institutional claim, not a cognitive one, and it should be made as such.', de: 'Das ist 2026 die schwächste Prognose des Kapitels. Aktuelle Modelle schlagen auf Zuruf alternative Framings vor, erzeugen Kontrafaktisches und übertragen Muster zwischen Domänen. Chollets ARC-Benchmark, gebaut, um genau die „extreme generalization“ zu messen, die die Autoren zitieren, hat durch neuere Reasoning-Modelle große Sprünge gesehen, und seine Deutung ist inzwischen selbst umstritten. Das Fähigkeitsargument erodiert. Was bleibt, ist ein Argument über Verantwortung: Jemand muss das Ziel wählen, entscheiden, welcher Frame akzeptabel ist, und Rechenschaft ablegen. Das ist eine normative und institutionelle Behauptung, keine kognitive, und sie sollte als solche vertreten werden.' } },
      { claim: { en: 'Emotionalists such as the Querdenker are not anti-framers, just bad framers who do not use their full cognitive powers.', de: 'Emotionalistische Bewegungen wie die Querdenker sind keine Anti-Framer, sondern schlechte Framer, die ihre kognitiven Möglichkeiten nicht ausschöpfen.' },
        challenge: { en: 'This dissolves a political phenomenon into a cognitive deficit. Arlie Hochschild’s “deep story” shows that emotional frames do social work: they express perceived status loss, and they are coherent given their holders’ position. Bourdieu would add that what counts as “good” framing is itself tied to cultural capital, so labelling others “bad framers” can reproduce a class distinction under cognitive vocabulary. The diagnosis also misses interests and organisation: movements are mobilised, not only misthought. For change work the consequence is practical: treating resistance as poor cognition makes it harder to hear what it signals.', de: 'Das löst ein politisches Phänomen in ein kognitives Defizit auf. Arlie Hochschilds „Deep Story“ zeigt, dass emotionale Frames soziale Arbeit leisten: Sie drücken empfundenen Statusverlust aus und sind aus der Position ihrer Träger:innen heraus stimmig. Bourdieu würde ergänzen, dass das, was als „gutes“ Framing gilt, selbst an kulturelles Kapital gebunden ist; andere „schlechte Framer“ zu nennen, kann eine Klassengrenze in kognitivem Vokabular reproduzieren. Die Diagnose übersieht zudem Interessen und Organisation: Bewegungen werden mobilisiert, nicht nur falsch gedacht. Für Change-Arbeit ist die Folge praktisch: Wer Widerstand als schwache Kognition behandelt, hört schlechter, was er signalisiert.' } },
      { claim: { en: 'Agility of mind is the 21st century’s equivalent of the free flow of information and the key to good framing.', de: 'Agility of Mind ist das Gegenstück des 21. Jahrhunderts zum freien Informationsfluss und der Schlüssel zu gutem Framing.' },
        challenge: { en: 'As defined, it is close to a tautology: to frame well, have the plastic mind that frames well. Unlike free flow of information, it comes with no criterion for when it is violated, and the policy list at the end (education, immigration, deliberative democracy, perhaps an agency) is acknowledged by the authors themselves to “miss the point”. It also leaves a tension unresolved: the book advises reframing rarely (chapter 6), yet here celebrates constant plasticity. A usable version would specify behaviour, for example stating revision triggers in advance, which is what the rigid/agile distinction in this unit tries to do.', de: 'In der vorliegenden Definition ist das nah an einer Tautologie: Um gut zu framen, habe den formbaren Geist, der gut framet. Anders als der freie Informationsfluss hat es kein Kriterium dafür, wann es verletzt ist, und die Politikliste am Ende (Bildung, Migration, deliberative Demokratie, vielleicht eine Behörde) verfehle, so räumen die Autoren selbst ein, den Kern. Ungelöst bleibt auch eine Spannung: Das Buch rät, selten zu reframen (Kapitel 6), feiert hier aber ständige Formbarkeit. Eine brauchbare Version würde Verhalten benennen, etwa Revisionsbedingungen vorab festzulegen; genau das versucht die Unterscheidung starr/beweglich in dieser Einheit.' } },
    ],

    transfer: [
      { context: { en: 'Leadership: a rigidity audit', de: 'Führung: ein Starrheits-Audit' }, prompt: { en: 'Take your current strategic frame for your unit (for example: remote-first, AI as augmentation, a particular positioning). Write three columns: (1) the hard core that is non-negotiable, with the reason why; (2) assumptions that feel hard but are declared hard by someone; (3) for each item in (1) and (2), the observation that would make you revise it. Any item without an entry in column 3 is a candidate for rigidity. Share the sheet with one team member who disagrees with you most often.', de: 'Nimm deinen aktuellen strategischen Frame für deinen Bereich (etwa: Remote-First, KI als Erweiterung, eine bestimmte Positionierung). Leg drei Spalten an: (1) der harte Kern, der nicht verhandelbar ist, mit Begründung; (2) Annahmen, die sich hart anfühlen, aber von jemandem für hart erklärt wurden; (3) für jeden Eintrag aus (1) und (2) die Beobachtung, die dich zur Revision brächte. Jeder Eintrag ohne Spalte 3 ist ein Kandidat für Starrheit. Teil das Blatt mit der Person im Team, die dir am häufigsten widerspricht.' } },
      { context: { en: 'AI consulting: what “managing the machine” means', de: 'KI-Beratung: was „die Maschine steuern“ heißt' }, prompt: { en: 'The book’s phrase is vague. Turn it into a concrete service definition: for one client use case, specify who owns the goal (intent engineering), who chooses and documents the frame the system works in (context and specification engineering), which constraints are hard and testable, and who is accountable when the output is wrong. If any of the four has no named role, the client has hyper-rationalism by default, not by decision.', de: 'Die Formulierung des Buchs ist vage. Mach daraus eine konkrete Leistungsbeschreibung: Leg für einen Anwendungsfall einer Kundin fest, wer das Ziel verantwortet (Intent Engineering), wer den Frame wählt und dokumentiert, in dem das System arbeitet (Context und Specification Engineering), welche Constraints hart und prüfbar sind und wer Rechenschaft ablegt, wenn das Ergebnis falsch ist. Fehlt für eines der vier eine benannte Rolle, hat die Organisation Hyperrationalismus aus Versehen, nicht aus Entscheidung.' } },
      { context: { en: 'Change: recognising rigid framing in a client organisation', de: 'Change: starres Framing in einer Kundenorganisation erkennen' }, prompt: { en: 'In your next diagnostic interviews, listen for three markers: fluent, rehearsed explanations; seamless consistency across levels; and no admitted counterfactual (“what would show this is not working?” gets no answer or a reinterpretation). Note where all three coincide. Then test gently: ask for the last time the organisation changed its mind on something important, and how. Distinguish this from resistance, which often carries information (see the critique on emotionalism).', de: 'Achte in deinen nächsten Diagnoseinterviews auf drei Marker: flüssige, eingeübte Erklärungen; lückenlose Konsistenz über Ebenen hinweg; kein zugelassenes Was-wäre-wenn („Woran würden wir merken, dass das nicht funktioniert?“ bleibt unbeantwortet oder wird umgedeutet). Notiere, wo alle drei zusammenfallen. Prüf dann behutsam: Frag nach dem letzten Mal, als die Organisation ihre Meinung zu etwas Wichtigem geändert hat, und wie. Unterscheide das von Widerstand, der oft Information trägt (siehe die Kritik zum Emotionalismus).' } },
    ],

    summary: [
      { en: 'Framing happens at every level: Cooper, Nie and Mosia show constraint changes, refashioning inside a frame and repurposing across industries.', de: 'Framing passiert auf jeder Ebene: Cooper, Nie und Mosia zeigen Constraint-Wechsel, Umgestaltung innerhalb eines Frames und Repurposing über Branchen hinweg.' },
      { en: 'The chapter claims cognition matters more than coordination, while ideological silos shrink the range of frames people encounter.', de: 'Das Kapitel behauptet, Kognition zähle mehr als Koordination, während ideologische Silos die Bandbreite der Frames schrumpfen lassen, denen Menschen begegnen.' },
      { en: 'Emotionalists frame badly rather than not at all; hyper-rationalists hand the frame to machines that, in the authors’ 2021 view, cannot frame.', de: 'Das emotionalistische Lager framet schlecht statt gar nicht; das hyperrationalistische übergibt den Frame an Maschinen, die nach Sicht der Autoren von 2021 nicht framen können.' },
      { en: 'Rigid framing, consistent but unadjustable, destroys agency and is more dangerous than no framing because it presumes to be right.', de: 'Starres Framing, konsequent, aber unverstellbar, zerstört Handlungsmacht und ist gefährlicher als kein Framing, weil es sich im Recht wähnt.' },
      { en: 'The proposed safeguard is agility of mind, trainable and individual; institutions can support it, but only people frame frames.', de: 'Die vorgeschlagene Absicherung ist Agility of Mind, trainierbar und individuell; Institutionen können sie stützen, aber nur Menschen framen Frames.' },
    ],

    glossary: [
      { term: { en: 'Vigilance', de: 'Vigilanz' }, def: { en: 'Ongoing watchfulness over one’s own framing: not ceding it, and not letting it harden.', de: 'Fortlaufende Wachsamkeit gegenüber dem eigenen Framing: es nicht abgeben und nicht erstarren lassen.' } },
      { term: { en: 'Rigid framing', de: 'Starres Framing' }, def: { en: 'A frame applied with complete consistency that admits no revision; every event is read as confirmation.', de: 'Ein Frame, der völlig konsequent angewendet wird und keine Revision zulässt; jedes Ereignis wird als Bestätigung gelesen.' } },
      { term: { en: 'Agility of mind', de: 'Agility of Mind (Beweglichkeit des Denkens)' }, def: { en: 'A trainable plasticity in conceiving and reconceiving the world, including holding opposing ideas at once.', de: 'Eine trainierbare Formbarkeit darin, die Welt zu denken und neu zu denken, einschließlich gegensätzliche Ideen gleichzeitig zu halten.' } },
      { term: { en: 'Ideological silo', de: 'Ideologisches Silo' }, def: { en: 'A social environment dominated by one frame, which narrows the counterfactuals its members encounter.', de: 'Ein soziales Umfeld, in dem ein Frame dominiert und das die Was-wäre-wenn-Varianten verengt, denen seine Mitglieder begegnen.' } },
      { term: { en: 'Extreme generalization', de: 'Extreme Generalisierung' }, def: { en: 'Chollet’s term for adapting to genuinely new situations with little or no data; cited by the book as distinctively human.', de: 'Chollets Begriff für die Anpassung an echt neue Situationen mit wenig oder ohne Daten; vom Buch als spezifisch menschlich angeführt.' } },
    ],
  });
})();
