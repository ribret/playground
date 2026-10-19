/* u05 — Kapitel 5: Constraints / Chapter 5: Constraints */
(function () {
  const P = V.palette;
  const de = (lang) => lang === 'de';
  const T = (l, en, d) => (de(l) ? d : en);

  /* small local drawing helpers */
  const bottle = (x, base, h, col, o = {}) => V.group(
    V.rect(x - 7, base - h, 14, h, { fill: col, stroke: P.ink, sw: 1, r: 3 }) +
    V.rect(x - 2.5, base - h - 11, 5, 11, { fill: col, stroke: P.ink, sw: 1, r: 1 }), o);
  const dial = (x, y, angle, label, delay) => {
    const rad = (angle - 90) * Math.PI / 180;
    let s = V.circle(x, y, 40, { fill: P.paper, stroke: P.plum, sw: 3, cls: 'a-pop', delay });
    [-60, -30, 0, 30, 60].forEach(a => { const r = (a - 90) * Math.PI / 180; s += V.line(x + Math.cos(r) * 32, y + Math.sin(r) * 32, x + Math.cos(r) * 38, y + Math.sin(r) * 38, { stroke: P.line, sw: 2, cls: 'a-fade', delay }); });
    s += V.line(x, y, x + Math.cos(rad) * 30, y + Math.sin(rad) * 30, { stroke: P.plum, sw: 4, cls: 'a-draw', delay: delay + .4 });
    s += V.circle(x, y, 5, { fill: P.ink, cls: 'a-pop', delay });
    s += V.text(x, y + 66, label, { size: 13, bold: true, cls: 'a-fade', delay: delay + .2 });
    return s;
  };

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 5500,
      caption: { en: '<b>Unbounded imagination produces plans, not a plan.</b> In 1976 Israeli planners faced a hijacked plane in Uganda and a list of ideas, each with a fatal flaw.', de: '<b>Grenzenlose Vorstellungskraft liefert Pläne, keinen Plan.</b> 1976 stand die israelische Armeeführung vor einem entführten Flugzeug in Uganda und einer Liste von Ideen, jede mit einem tödlichen Fehler.' },
      svg: (l) => V.wrap(
        V.text(200, 36, T(l, 'Entebbe 1976: every plan open', 'Entebbe 1976: alle Pläne offen'), { size: 15, bold: true, cls: 'a-fade' }) +
        V.pill(115, 90, T(l, '1,000 troops', '1000 Soldaten'), { fill: P.muted, cls: 'a-pop', delay: .4 }) +
        V.pill(290, 118, T(l, 'Disguise', 'Tarnung'), { fill: P.muted, cls: 'a-pop', delay: .7 }) +
        V.pill(120, 168, T(l, 'Lake route', 'Seeweg'), { fill: P.muted, cls: 'a-pop', delay: 1 }) +
        V.pill(290, 205, T(l, 'Negotiate', 'Verhandeln'), { fill: P.muted, cls: 'a-pop', delay: 1.3 }) +
        V.text(215, 160, '?', { size: 34, fill: P.line, bold: true, cls: 'a-float', delay: 1.5 }) +
        V.text(60, 230, '?', { size: 30, fill: P.line, bold: true, cls: 'a-float', delay: 1.7 }) +
        V.text(350, 72, '?', { size: 30, fill: P.line, bold: true, cls: 'a-float', delay: 1.9 })) },

    { duration: 6000,
      caption: { en: '<b>One fixed requirement collapses the field.</b> Dan Shomron declared surprise non-negotiable. Mass, disguise and the crocodile lake dropped out; a night landing disguised as an airport convoy remained.', de: '<b>Eine feste Anforderung räumt das Feld.</b> Dan Shomron erklärte Überraschung für unverhandelbar. Masse, Tarnung und der Krokodilsee fielen heraus; übrig blieb eine Nachtlandung, getarnt als Konvoi.' },
      svg: (l) => {
        let s = V.frame(20, 48, 360, 192, { color: P.plum, label: T(l, 'Hard: surprise', 'Hart: Überraschung'), cls: 'a-pop' });
        [[T(l, '1,000 troops', '1000 Soldaten'), 95], [T(l, 'Disguise', 'Tarnung'), 145], [T(l, 'Lake route', 'Seeweg'), 195]].forEach(([t, y], i) => {
          s += V.group(V.pill(110, y, t, { fill: P.muted }), { opacity: .45, cls: 'a-fade', delay: .3 });
          s += V.text(110, y + 10, '✕', { size: 28, fill: P.coral, bold: true, cls: 'a-pop', delay: .8 + i * .3 });
        });
        s += V.arrow(195, 145, 240, 145, { color: 'ink', cls: 'a-draw', delay: 1.8 });
        s += V.bulb(305, 128, { scale: 1.5, cls: 'a-pop', delay: 2.2 });
        s += V.text(305, 188, T(l, 'Night landing', 'Nachtlandung'), { size: 14, bold: true, fill: P.plum, cls: 'a-fade', delay: 2.4 });
        return V.wrap(s);
      } },

    { duration: 6000,
      caption: { en: '<b>Hard and soft side by side.</b> Surprise was locked. Force size and time of day were dials the planners could turn as the plan matured.', de: '<b>Hart und weich nebeneinander.</b> Überraschung war verriegelt. Truppenstärke und Tageszeit waren Regler, die die Planenden drehen konnten, während der Plan reifte.' },
      svg: (l) => V.wrap(
        V.rect(40, 36, 320, 54, { fill: P.plum, stroke: P.plum, cls: 'a-pop' }) +
        V.group(V.rect(62, 58, 18, 15, { fill: '#fff', stroke: '#fff', r: 3 }) + V.path('M65,58 v-5 a6,6 0 0,1 12,0 v5', { stroke: '#fff', sw: 2.5 }), { cls: 'a-pop', delay: .4 }) +
        V.text(215, 69, T(l, 'Surprise: fixed', 'Überraschung: fest'), { size: 16, fill: '#fff', bold: true, cls: 'a-fade', delay: .3 }) +
        V.text(40, 142, T(l, 'Force size', 'Truppenstärke'), { size: 13, bold: true, anchor: 'start', cls: 'a-fade', delay: .8 }) +
        V.line(180, 137, 360, 137, { stroke: P.line, sw: 4, cls: 'a-draw', delay: .8 }) +
        V.circle(300, 137, 11, { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-slide', delay: 1.2 }) +
        V.text(40, 192, T(l, 'Day or night', 'Tag oder Nacht'), { size: 13, bold: true, anchor: 'start', cls: 'a-fade', delay: 1.4 }) +
        V.line(180, 187, 360, 187, { stroke: P.line, sw: 4, cls: 'a-draw', delay: 1.4 }) +
        V.circle(225, 187, 11, { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-slide', delay: 1.8 }) +
        V.text(200, 238, T(l, 'soft: adjustable', 'weich: verstellbar'), { size: 13, fill: P.muted, bold: true, cls: 'a-fade', delay: 2.2 })) },

    { duration: 6500,
      caption: { en: '<b>A hard constraint is a wall, a soft one a fence.</b> Tear down the wall and you have left the frame (accounting without arithmetic is no longer accounting). A fence can be moved, though rarely for free.', de: '<b>Ein harter Constraint ist eine Mauer, ein weicher ein Zaun.</b> Reißt du die Mauer ein, hast du den Frame verlassen (Buchhaltung ohne Arithmetik ist keine Buchhaltung mehr). Einen Zaun kannst du versetzen, selten aber umsonst.' },
      svg: (l) => {
        let s = V.text(105, 50, T(l, 'Hard', 'Hart'), { size: 16, bold: true, fill: P.plum, cls: 'a-fade' }) + V.text(290, 50, T(l, 'Soft', 'Weich'), { size: 16, bold: true, fill: P.plum, cls: 'a-fade' });
        for (let r = 0; r < 6; r++) {
          const y = 66 + r * 21, d = .2 + r * .12;
          const bricks = r % 2 === 0 ? [[40, 42], [84, 42], [128, 42]] : [[40, 20], [62, 42], [106, 42], [150, 20]];
          bricks.forEach(([x, w]) => { s += V.rect(x, y, w, 19, { fill: P.plum, stroke: P.paper2, sw: 2, r: 2, cls: 'a-rise', delay: d }); });
        }
        const fence = (dx, o) => [240, 280, 320, 360].map(x => V.line(x + dx, 80, x + dx, 190, o)).join('') + V.line(232 + dx, 110, 368 + dx, 110, o) + V.line(232 + dx, 165, 368 + dx, 165, o);
        s += V.group(fence(-30, { stroke: P.muted, sw: 2, dash: '5 5' }), { cls: 'a-fade', delay: .9 });
        s += V.group(fence(0, { stroke: P.plum, sw: 4 }), { cls: 'a-slide', delay: 1.4 });
        s += V.arrow(255, 205, 300, 205, { color: 'muted', cls: 'a-draw', delay: 1.9 });
        s += V.text(105, 230, T(l, 'drop it = drop the frame', 'weg = Frame weg'), { size: 12, bold: true, cls: 'a-fade', delay: 2.2 });
        s += V.text(290, 232, T(l, 'movable, with effort', 'versetzbar, mit Aufwand'), { size: 12, bold: true, cls: 'a-fade', delay: 2.4 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>Three dials for the soft constraints.</b> Mutability: change what you can influence. Minimal change: turn as little as possible. Consistency: no setting may contradict another.', de: '<b>Drei Regler für die weichen Constraints.</b> Mutabilität: ändere, was du beeinflussen kannst. Minimale Änderung: dreh so wenig wie möglich. Konsistenz: keine Einstellung darf einer anderen widersprechen.' },
      svg: (l) => V.wrap(
        V.text(200, 36, T(l, 'Three rules for soft constraints', 'Drei Regeln für weiche Constraints'), { size: 15, bold: true, cls: 'a-fade' }) +
        dial(75, 120, 45, T(l, 'Mutability', 'Mutabilität'), .3) +
        dial(200, 120, -15, T(l, 'Minimal change', 'Min. Änderung'), .9) +
        dial(325, 120, 20, T(l, 'Consistency', 'Konsistenz'), 1.5)) },

    { duration: 6500,
      caption: { en: '<b>Mutability: find the constraint that has quietly become movable.</b> NASA took aerodynamic lift as given and got the winged shuttle. SpaceX kept “slow the fall” but used the engine instead, because sensors and computing had made that possible.', de: '<b>Mutabilität: Finde den Constraint, der still beweglich geworden ist.</b> Die NASA setzte aerodynamischen Auftrieb voraus und bekam das geflügelte Shuttle. SpaceX behielt „den Fall bremsen“, nutzte aber das Triebwerk, weil Sensorik und Rechenleistung das inzwischen erlaubten.' },
      svg: (l) => V.wrap(
        V.pill(200, 30, T(l, 'Kept: slow the fall', 'Bleibt: Fall bremsen'), { fill: P.plum, cls: 'a-pop' }) +
        V.text(100, 62, 'Shuttle', { size: 13, bold: true, cls: 'a-fade', delay: .3 }) +
        V.path('M100,72 L112,98 L112,168 L142,196 L58,196 L88,168 L88,98 Z', { fill: P.paper, stroke: P.ink, sw: 2, cls: 'a-fade', delay: .4 }) +
        V.text(100, 228, T(l, 'Lift: fixed', 'Auftrieb: fest'), { size: 13, bold: true, fill: P.muted, cls: 'a-fade', delay: .8 }) +
        V.arrow(160, 135, 240, 135, { color: 'ink', cls: 'a-draw', delay: 1.2 }) +
        V.text(300, 62, 'Falcon 9', { size: 13, bold: true, cls: 'a-fade', delay: 1.5 }) +
        V.rect(290, 72, 20, 104, { fill: P.paper, stroke: P.ink, sw: 2, r: 4, cls: 'a-rise', delay: 1.6 }) +
        V.path('M291,170 L276,190 M309,170 L324,190', { stroke: P.ink, sw: 2.5, cls: 'a-draw', delay: 1.9 }) +
        V.path('M293,177 L300,204 L307,177 Z', { fill: P.amber, stroke: P.coral, sw: 1.5, cls: 'a-pulse', delay: 2.1 }) +
        V.line(260, 208, 340, 208, { stroke: P.ink, sw: 3, cls: 'a-draw', delay: 2 }) +
        V.text(300, 236, T(l, 'Lift: mutable', 'Auftrieb: veränderbar'), { size: 13, bold: true, fill: P.plum, cls: 'a-fade', delay: 2.4 })) },

    { duration: 6500,
      caption: { en: '<b>Minimal change: turn one dial, not all of them.</b> After the 1985 wine scandal, Austrian growers did not switch crops. They kept the grapes and changed one thing: volume became quality.', de: '<b>Minimale Änderung: einen Regler drehen, nicht alle.</b> Nach dem Weinskandal von 1985 wechselten österreichische Winzerinnen und Winzer nicht die Frucht. Sie behielten die Trauben und änderten eines: Aus Masse wurde Qualität.' },
      svg: (l) => {
        let s = V.text(200, 36, T(l, 'Same grapes, new product', 'Gleiche Trauben, neues Produkt'), { size: 15, bold: true, cls: 'a-fade' });
        for (let i = 0; i < 12; i++) s += bottle(45 + (i % 4) * 28, 100 + Math.floor(i / 4) * 50, 28, P.muted, { cls: 'a-pop', delay: .2 + i * .05 });
        s += V.text(87, 222, T(l, 'Volume', 'Masse'), { size: 14, bold: true, fill: P.muted, cls: 'a-fade', delay: .8 });
        s += V.arrow(165, 140, 235, 140, { color: 'ink', cls: 'a-draw', delay: 1.1 });
        [270, 305, 340].forEach((x, i) => { s += bottle(x, 195, 78, P.plum, { cls: 'a-rise', delay: 1.4 + i * .2 }); });
        s += V.text(305, 222, T(l, 'Quality', 'Qualität'), { size: 14, bold: true, fill: P.plum, cls: 'a-fade', delay: 2 });
        s += V.text(200, 250, T(l, 'not: apricots instead of wine', 'nicht: Aprikosen statt Wein'), { size: 12, fill: P.coral, bold: true, cls: 'a-fade', delay: 2.4 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>Externalised constraints: the frame becomes a place.</b> The commandos rehearsed in a terminal of poles and tarps. A physical model enforces its limits; a mental one lets you cheat.', de: '<b>Ausgelagerte Constraints: Der Frame wird ein Ort.</b> Die Einsatzkräfte probten in einem Terminal aus Stangen und Planen. Ein physisches Modell erzwingt seine Grenzen; ein gedankliches lässt dich schummeln.' },
      svg: (l) => V.wrap(
        V.text(200, 36, T(l, 'Constraints you can touch', 'Constraints zum Anfassen'), { size: 15, bold: true, cls: 'a-fade' }) +
        V.rect(25, 75, 125, 105, { fill: 'none', stroke: P.plum, sw: 2, dash: '6 5', cls: 'a-fade', delay: .3 }) +
        V.text(87, 132, T(l, 'in the head', 'im Kopf'), { size: 13, bold: true, fill: P.plum, cls: 'a-fade', delay: .4 }) +
        V.arrow(158, 128, 205, 128, { color: 'ink', cls: 'a-draw', delay: .9 }) +
        V.path('M218,82 L362,82 L362,94 L218,94 Z', { fill: P.plum, stroke: P.plum, opacity: .85, cls: 'a-fade', delay: 1.3 }) +
        [225, 265, 315, 355].map((x, i) => V.line(x, 94, x, 182, { stroke: P.ink, sw: 3, cls: 'a-draw', delay: 1.1 + i * .1 })).join('') +
        V.path('M225,100 L265,100 L265,182 L225,182 Z', { fill: P.plum, stroke: 'none', opacity: .3, cls: 'a-fade', delay: 1.6 }) +
        V.path('M315,100 L355,100 L355,182 L315,182 Z', { fill: P.plum, stroke: 'none', opacity: .3, cls: 'a-fade', delay: 1.7 }) +
        V.person(290, 168, { color: P.ink, scale: .6, cls: 'a-pop', delay: 1.9 }) +
        V.person(245, 168, { color: P.ink, scale: .6, cls: 'a-pop', delay: 2.1 }) +
        V.text(290, 218, T(l, 'poles and tarps', 'Stangen und Planen'), { size: 13, bold: true, cls: 'a-fade', delay: 2.3 })) },

    { duration: 6500,
      caption: { en: '<b>Who draws the boundary?</b> The book says machines cannot set their own constraints and drown in an unbounded search space. Today models propose constraints on request; choosing and owning them stays human.', de: '<b>Wer zieht die Grenze?</b> Das Buch sagt, Maschinen können sich keine eigenen Constraints setzen und ertrinken im unbegrenzten Suchraum. Heute schlagen Modelle auf Zuruf Constraints vor; sie auszuwählen und zu verantworten bleibt menschlich.' },
      svg: (l) => V.wrap(
        V.text(200, 34, T(l, 'Who sets the boundaries?', 'Wer setzt die Grenzen?'), { size: 15, bold: true, cls: 'a-fade' }) +
        V.dots(80, 20, 55, 250, 160, { seed: 5, stagger: .015, cls: 'a-fade', fill: P.muted, r: 3.5 }) +
        V.frame(70, 90, 110, 80, { color: P.plum, cls: 'a-pop', delay: 1.6 }) +
        V.person(335, 175, { color: P.plum, scale: 1.3, cls: 'a-pop', delay: 1.2 }) +
        V.arrow(310, 140, 188, 130, { color: 'ink', cls: 'a-draw', delay: 1.8 }) +
        V.pill(140, 238, T(l, 'AI: searches everything', 'KI: sucht alles'), { fill: P.muted, cls: 'a-fade', delay: .8 })) },
  ];

  /* ---------- section visuals ---------- */
  const visRemoveAdd = (l) => {
    let s = V.text(50, 40, T(l, 'Case', 'Fall'), { size: 13, bold: true, fill: P.muted }) +
      V.text(160, 40, T(l, 'removed', 'weg'), { size: 13, bold: true, fill: P.coral }) +
      V.text(310, 40, T(l, 'added', 'dazu'), { size: 13, bold: true, fill: P.plum });
    const rows = [
      ['Graham', T(l, '− corset', '− Korsett'), T(l, '+ Graham technique', '+ Graham-Technik')],
      ['Seuss', T(l, '− free vocabulary', '− freie Wortwahl'), T(l, '+ 50 words', '+ 50 Wörter')],
      ['Entebbe', T(l, '− sheer force', '− Masse'), T(l, '+ surprise', '+ Überraschung')],
    ];
    rows.forEach(([c, r, a], i) => {
      const y = 85 + i * 60, d = .2 + i * .4;
      s += V.text(50, y + 5, c, { size: 13, bold: true, cls: 'a-fade', delay: d });
      s += V.pill(160, y, r, { fill: P.coral, w: 130, cls: 'a-pop', delay: d + .1 });
      s += V.pill(310, y, a, { fill: P.plum, w: 150, cls: 'a-pop', delay: d + .25 });
    });
    s += V.text(200, 248, T(l, 'Constraint work = removing and adding', 'Constraint-Arbeit = wegnehmen und hinzufügen'), { size: 12, fill: P.ink, bold: true, cls: 'a-fade', delay: 1.6 });
    return V.wrap(s);
  };

  const visCoreRing = (l) => {
    const one = (x, title, core, ring, d) =>
      V.text(x, 30, title, { size: 13, bold: true, cls: 'a-fade', delay: d }) +
      V.circle(x, 132, 84, { fill: P.paper, stroke: P.plum, sw: 2.5, cls: 'a-pop', delay: d }) +
      V.circle(x, 132, 40, { fill: P.plum, cls: 'a-pop', delay: d + .3 }) +
      V.text(x, 137, core, { size: 13, bold: true, fill: '#fff', cls: 'a-fade', delay: d + .4 }) +
      V.text(x, 196, ring, { size: 12, bold: true, fill: P.plum, cls: 'a-fade', delay: d + .6 });
    return V.wrap(
      one(105, T(l, 'Accounting', 'Buchhaltung'), '2 + 2 = 4', T(l, 'valuation rules', 'Bewertungsregeln'), .1) +
      one(295, T(l, 'Theology', 'Theologie'), T(l, 'God', 'Gott'), T(l, 'interpretation', 'Auslegung'), .6) +
      V.text(200, 245, T(l, 'core: hard · ring: soft', 'innen: hart · außen: weich'), { size: 12, bold: true, fill: P.muted, cls: 'a-fade', delay: 1.4 }));
  };

  const visPrinciples = (l) => {
    const cards = [
      [T(l, 'Mutability', 'Mutabilität'), T(l, 'SpaceX:\nengine, not\nwings', 'SpaceX:\nTriebwerk statt\nFlügel'), T(l, 'What can I\ninfluence?', 'Was kann ich\nbeeinflussen?')],
      [T(l, 'Minimal\nchange', 'Minimale\nÄnderung'), T(l, 'Wine:\nquality, not\na new crop', 'Weinbau:\nQualität statt\nneuer Frucht'), T(l, 'What is the\nsmallest shift?', 'Was ist der\nkleinste Schritt?')],
      [T(l, 'Consistency', 'Konsistenz'), T(l, 'Minority Report:\ncities have\ntime depth', 'Minority Report:\nStädte haben\nZeittiefe'), T(l, 'Does it clash\nwith another?', 'Widerspricht es\neinem anderen?')],
    ];
    let s = '';
    cards.forEach(([h, c, q], i) => {
      const x = 15 + i * 125, cx = x + 60, d = .2 + i * .4;
      s += V.rect(x, 20, 120, 225, { fill: P.paper, stroke: P.plum, sw: 2, r: 12, cls: 'a-rise', delay: d });
      s += V.text(cx, 50, h, { size: 13, bold: true, fill: P.plum, cls: 'a-fade', delay: d + .1 });
      s += V.text(cx, 112, c, { size: 12, cls: 'a-fade', delay: d + .2 });
      s += V.line(x + 20, 168, x + 100, 168, { stroke: P.line, sw: 1.5, cls: 'a-draw', delay: d + .2 });
      s += V.text(cx, 195, q, { size: 12, italic: true, fill: P.muted, cls: 'a-fade', delay: d + .3 });
    });
    return V.wrap(s);
  };

  const visLadder = (l) => {
    const boxes = [
      [T(l, 'In the\nhead', 'Im\nKopf'), T(l, 'scenario', 'Szenario'), { fill: 'none', stroke: P.plum, sw: 2, dash: '6 5' }],
      [T(l, 'Software\nsimulator', 'Software-\nSimulator'), T(l, 'flight simulator', 'Flugsimulator'), { fill: P.paper, stroke: P.plum, sw: 2.5 }],
      [T(l, 'Physical\nmodel', 'Physisches\nModell'), T(l, 'reactor mock-up', 'Reaktor-Attrappe'), { fill: P.plum, stroke: P.plum, sw: 3 }],
    ];
    let s = '';
    boxes.forEach(([h, ex, o], i) => {
      const x = 20 + i * 127, d = .2 + i * .4;
      s += V.rect(x, 40, 106, 92, { ...o, r: 12, cls: 'a-pop', delay: d });
      s += V.text(x + 53, 80, h, { size: 13, bold: true, fill: i === 2 ? '#fff' : P.plum, cls: 'a-fade', delay: d + .1 });
      s += V.text(x + 53, 160, ex, { size: 12, fill: P.ink, cls: 'a-fade', delay: d + .2 });
    });
    s += V.arrow(30, 196, 370, 196, { color: 'ink', cls: 'a-draw', delay: 1.4 });
    s += V.text(30, 228, T(l, 'easy to bend', 'leicht zu brechen'), { size: 12, bold: true, anchor: 'start', fill: P.muted, cls: 'a-fade', delay: 1.7 });
    s += V.text(370, 228, T(l, 'enforced', 'erzwungen'), { size: 12, bold: true, anchor: 'end', fill: P.plum, cls: 'a-fade', delay: 1.9 });
    return V.wrap(s);
  };

  const visWine = (l) => {
    const base = 205, k = 24;
    let s = V.line(30, base, 370, base, { stroke: P.ink, sw: 2 });
    const grp = (x0, title, after, mult, d) => {
      let g = V.rect(x0, base - k, 44, k, { fill: P.muted, stroke: 'none', r: 3, cls: 'a-rise', delay: d }) +
        V.rect(x0 + 60, base - k * after, 44, k * after, { fill: P.plum, stroke: 'none', r: 3, cls: 'a-rise', delay: d + .4 }) +
        V.text(x0 + 22, base + 18, T(l, 'before', 'vorher'), { size: 12, fill: P.muted, cls: 'a-fade', delay: d }) +
        V.text(x0 + 82, base + 18, '2019', { size: 12, fill: P.plum, bold: true, cls: 'a-fade', delay: d + .4 }) +
        V.text(x0 + 82, base - k * after - 10, mult, { size: 14, bold: true, fill: P.plum, cls: 'a-pop', delay: d + .7 }) +
        V.text(x0 + 52, base + 40, title, { size: 13, bold: true, cls: 'a-fade', delay: d });
      return g;
    };
    s += grp(50, T(l, 'Export volume', 'Exportmenge'), 2, '×2', .2);
    s += grp(230, T(l, 'Export value', 'Exportwert'), 6, '×6', .9);
    return V.wrap(s);
  };

  /* ---------- register ---------- */
  window.FRAMERS.register({
    id: 'u05', number: 5, kind: 'chapter', color: '#6C4AB6', minutes: 30,
    title: { en: 'Constraints', de: 'Constraints' },
    tagline: { en: 'Imagination only becomes action once it is bounded: keep the hard limits, turn the soft ones with care.', de: 'Vorstellungskraft wird erst handlungsfähig, wenn sie begrenzt ist: harte Grenzen halten, weiche mit Bedacht verstellen.' },
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="6" y="6" width="32" height="32" rx="5" fill="none" stroke="${c}" stroke-width="2.5" stroke-dasharray="4 3"/><rect x="15" y="15" width="14" height="14" rx="3" fill="${c}"/></svg>`,
    hook: {
      en: '<p>June 1976: an Air France plane has been hijacked to Entebbe in Uganda, 4,000 kilometres from Israel; more than a hundred hostages sit in an old terminal said to be wired with explosives. The ideas on the table: fly in a thousand soldiers, pose as released prisoners, parachute commandos into Lake Victoria. Each is imaginative. Each would get people killed.</p><p>What turned this list into a plan that worked was not more imagination but a decision about what must not be given up. This unit is about that decision: constraints, the third C.</p>',
      de: '<p>Juni 1976: Ein Air-France-Flugzeug ist nach Entebbe in Uganda entführt worden, 4.000 Kilometer von Israel entfernt; über hundert Geiseln sitzen in einem alten Terminal, angeblich vermint. Auf dem Tisch liegen Ideen: tausend Soldaten einfliegen, sich als freigelassene Häftlinge ausgeben, Kommandos über dem Victoriasee abspringen lassen. Jede ist einfallsreich. Jede würde Menschen das Leben kosten.</p><p>Aus dieser Liste wurde ein funktionierender Plan nicht durch mehr Fantasie, sondern durch eine Entscheidung darüber, was nicht aufgegeben werden darf. Darum geht es in dieser Einheit: um Constraints, also Begrenzungen, das dritte C.</p>'
    },
    objectives: [
      { en: 'Explain why constraints are what turn counterfactual ideas into options you can act on, using the Entebbe raid.', de: 'Am Beispiel Entebbe erklären, warum erst Constraints aus kontrafaktischen Ideen Optionen machen, nach denen du handeln kannst.' },
      { en: 'Distinguish hard from soft constraints in a real case and justify the classification relative to the frame.', de: 'In einem realen Fall harte von weichen Constraints unterscheiden und die Zuordnung relativ zum Frame begründen.' },
      { en: 'Apply mutability, minimal change and consistency to a change plan, and name where the three principles pull against each other.', de: 'Mutabilität, minimale Änderung und Konsistenz auf einen Veränderungsplan anwenden und benennen, wo die drei Prinzipien gegeneinander ziehen.' },
    ],
    film: { title: { en: 'From every plan to the one that works', de: 'Von allen Plänen zu dem einen, der trägt' }, scenes },
    sections: [
      { id: 's1', heading: { en: 'The glue between imagining and acting', de: 'Der Klebstoff zwischen Vorstellen und Handeln' },
        body: {
          en: '<p>Dan Shomron, the brigadier general tasked with the rescue, did not invent a cleverer idea first. He fixed one requirement: <strong>surprise</strong>. Everything that would alert the hijackers was out. Other parameters, such as the size of the force or whether to land by day or night, he treated as adjustable. From that anchor a plan emerged: land at night in a transport plane carrying vehicles a Ugandan general would use (a black Mercedes, Land Rovers), drive to the terminal, free the hostages, fly home. The team rebuilt the terminal from poles and tarps using the original blueprints (an Israeli firm had built it) and rehearsed until the sequence ran clean. The raid took ninety minutes.</p><p>The chapter draws the general point: counterfactuals without constraints produce alternative worlds too loosely tied to your causal model to guide action. Constraints are the rules that shape <em>which</em> what-ifs you consider. You can tighten, loosen, add or remove them. Bernanke’s 2008 move (unit 4) is the mirror image: loosening the ideological constraint “the state stays out of markets” made new options thinkable.</p>',
          de: '<p>Dan Shomron, der Brigadegeneral, der die Befreiung planen sollte, erfand nicht zuerst eine klügere Idee. Er legte eine Anforderung fest: <strong>Überraschung</strong>. Alles, was die Entführer warnen würde, war raus. Andere Größen, etwa die Stärke der Truppe oder ob bei Tag oder Nacht gelandet wird, behandelte er als verstellbar. Von diesem Anker aus entstand der Plan: nachts mit einem Transportflugzeug landen, an Bord Fahrzeuge, wie ugandische Generäle sie fuhren (ein schwarzer Mercedes, Land Rover), zum Terminal fahren, die Geiseln befreien, heimfliegen. Das Team baute das Terminal anhand der Originalpläne (eine israelische Firma hatte es errichtet) aus Stangen und Planen nach und probte, bis der Ablauf saß. Der Einsatz dauerte neunzig Minuten.</p><p>Das Kapitel leitet daraus ab: Kontrafaktisches ohne Constraints erzeugt alternative Welten, die zu locker an dein Kausalmodell gebunden sind, um Handeln anzuleiten. Constraints sind die Regeln, die bestimmen, <em>welche</em> Was-wäre-wenn-Fragen du überhaupt durchspielst. Du kannst sie verschärfen, lockern, hinzufügen oder streichen. Bernankes Schritt 2008 (Einheit 4) ist das Spiegelbild: Erst das Lockern des ideologischen Constraints „der Staat hält sich aus Märkten heraus“ machte neue Optionen denkbar.</p>'
        },
        keyIdea: { en: 'Causality lets you understand, counterfactuals let you imagine, constraints make the imagined actionable.', de: 'Kausalität lässt dich verstehen, Kontrafaktisches lässt dich vorstellen, Constraints machen das Vorgestellte handlungsfähig.' } },
      { id: 's2', heading: { en: 'Limits that free: Seuss, Graham, Gehry', de: 'Grenzen, die befreien: Seuss, Graham, Gehry' },
        body: {
          en: '<p>The authors collect creators who worked <em>through</em> limits. Dr. Seuss accepted his publisher’s bet that he could not write a book with only fifty different words; the result was <em>Green Eggs and Ham</em>, one of the bestselling children’s books ever. Martha Graham did two things at once: she took the corsets off her dancers so they could breathe and move, and then imposed a new, stricter discipline, the Graham technique built on contraction and release, so that freedom did not dissolve into arbitrariness. Frank Gehry says that within gravity, budgets and codes he has “fifteen percent of freedom” for his art; the commission he found hardest was the one without any limits, which left him paralysed.</p><p>The pattern is not “more constraints are better”. It is that <strong>the work lies in choosing which ones to drop and which to add</strong>. Graham removed the corset, not the costume; Seuss limited his vocabulary but did not, like Georges Perec, ban a letter. A photographer who chooses what to keep sharp and what to blur makes the same move.</p>',
          de: '<p>Die Autoren sammeln Schaffende, die <em>durch</em> Grenzen hindurch arbeiteten. Dr. Seuss nahm die Wette seines Verlegers an, er schaffe kein Buch mit nur fünfzig verschiedenen Wörtern; heraus kam <em>Green Eggs and Ham</em>, eines der meistverkauften Kinderbücher überhaupt. Martha Graham tat zweierlei: Sie nahm ihren Tänzerinnen die Korsetts ab, damit sie atmen und sich bewegen konnten, und setzte dann eine neue, strengere Disziplin, die Graham-Technik aus Kontraktion und Lösung, damit Freiheit nicht in Beliebigkeit zerfällt. Frank Gehry sagt, innerhalb von Schwerkraft, Budgets und Bauvorschriften habe er „fifteen percent of freedom“ für seine Kunst; am schwersten fiel ihm ein Auftrag ganz ohne Vorgaben, der ihn lähmte.</p><p>Das Muster ist nicht „mehr Constraints sind besser“. Es lautet: <strong>Die Arbeit liegt in der Wahl, welche du streichst und welche du hinzufügst</strong>. Graham nahm das Korsett weg, nicht das Kostüm; Seuss begrenzte den Wortschatz, verbot aber nicht wie Georges Perec einen Buchstaben. Wer beim Fotografieren entscheidet, was scharf bleibt und was verschwimmt, macht denselben Zug.</p>'
        },
        visual: { svg: visRemoveAdd, position: 'bottom', caption: { en: 'Each case combines a removal and an addition. Constraint work is a pair of moves, not a direction.', de: 'Jeder Fall verbindet ein Wegnehmen mit einem Hinzufügen. Constraint-Arbeit ist ein Zugpaar, keine Richtung.' } } },
      { id: 's3', heading: { en: 'Hard and soft constraints', de: 'Harte und weiche Constraints' },
        body: {
          en: '<p>Within any frame some constraints are <strong>hard</strong>: they carry the frame’s central tenet. Drop them and you have not found a creative option, you have left the frame. In financial accounting, two plus two equals four; a theologian exploring alternative readings of scripture does not suspend belief in God. <strong>Soft</strong> constraints can be bent or moved, even if only with considerable effort.</p><p>The procedure the chapter proposes is simple: first secure the hard constraints, then iterate through the soft ones and see where each adjustment leads. In Entebbe, surprise was hard; force size and time of day were soft. Note what this implies: “hard” is a property <em>relative to a frame</em>, not of the world. The same constraint can be the core of one frame and negotiable in another. That is useful analytically, and it opens a question the chapter does not ask: who gets to declare which constraints are hard (see “Question the book”).</p><p>The book also stresses that constraints are not binary but lie on a gradient. Treat the hard/soft split as a first cut, not a final classification.</p>',
          de: '<p>In jedem Frame sind manche Constraints <strong>hart</strong>: Sie tragen den Kerngedanken des Frames. Gibst du sie auf, hast du keine kreative Option gefunden, sondern den Frame verlassen. In der Buchhaltung ist zwei plus zwei vier; eine Theologin, die alternative Lesarten der Schrift erkundet, setzt den Glauben an Gott nicht aus. <strong>Weiche</strong> Constraints lassen sich biegen oder versetzen, auch wenn das erheblichen Aufwand kosten kann.</p><p>Das Vorgehen, das das Kapitel vorschlägt, ist schlicht: zuerst die harten Constraints sichern, dann die weichen durchgehen und schauen, wohin jede Anpassung führt. In Entebbe war Überraschung hart, Truppenstärke und Tageszeit waren weich. Beachte, was daraus folgt: „Hart“ ist eine Eigenschaft <em>relativ zu einem Frame</em>, nicht eine der Welt. Derselbe Constraint kann Kern des einen Frames und verhandelbar im anderen sein. Analytisch ist das nützlich, und es öffnet eine Frage, die das Kapitel nicht stellt: Wer darf erklären, welche Constraints hart sind (siehe „Das Buch hinterfragen“)?</p><p>Das Buch betont außerdem, dass Constraints nicht binär sind, sondern auf einem Kontinuum liegen. Nimm die Unterscheidung hart/weich als ersten Schnitt, nicht als endgültige Einordnung.</p>'
        },
        visual: { svg: visCoreRing, position: 'bottom', caption: { en: 'Hard constraints form the core of a frame. Changing the ring is work inside the frame; breaking the core means changing frames.', de: 'Harte Constraints bilden den Kern eines Frames. Den Ring zu verändern ist Arbeit im Frame; den Kern zu brechen heißt, den Frame zu wechseln.' } },
        keyIdea: { en: 'Dropping a hard constraint is not a bold option. It is a different frame, and you should know you are switching.', de: 'Einen harten Constraint fallen zu lassen ist keine kühne Option. Es ist ein anderer Frame, und du solltest wissen, dass du wechselst.' } },
      { id: 's4', heading: { en: 'Three principles for the soft ones', de: 'Drei Prinzipien für die weichen' },
        body: {
          en: '<p><strong>Mutability:</strong> change what you can actually influence. Late for a meeting, you weigh subway against taxi, not teleportation. NASA assumed a returning rocket must be slowed by aerodynamic lift and got the winged Space Shuttle, a costly compromise. SpaceX kept the hard goal (slow the fall) but treated lift as mutable: better sensors and computing made landing on engine thrust feasible. will.i.am did the same with a business convention: he sold brands the right to use future tracks and kept all other rights. A wrinkle from the research: we treat social norms as fixed even though they are mutable; we think of calling a ride, rarely of jumping the queue.</p><p><strong>Minimal change:</strong> adjust as few constraints as possible so reality still shows through. Flipkart did not reinvent e-commerce; it loosened one constraint and allowed cash on delivery. Ruth Byrne’s experiments add that omitting an action is cognitively cheaper to imagine than adding one, so our what-ifs lean towards “if only it had not happened”.</p><p><strong>Consistency:</strong> constraints must not contradict each other. For <em>Minority Report</em>, Spielberg convened experts to build a coherent 2050: cities keep “time depth”, old and new buildings side by side. He broke realism exactly twice, knowingly: a dashboard and jet packs.</p>',
          de: '<p><strong>Mutabilität:</strong> Ändere, was du tatsächlich beeinflussen kannst. Wer zu spät zum Termin ist, wägt U-Bahn gegen Taxi ab, nicht Teleportation. Die NASA setzte voraus, dass eine zurückkehrende Rakete durch aerodynamischen Auftrieb gebremst werden muss, und bekam das geflügelte Space Shuttle, einen teuren Kompromiss. SpaceX hielt am harten Ziel fest (den Fall bremsen), behandelte Auftrieb aber als veränderbar: Bessere Sensorik und Rechenleistung machten die Landung auf Triebwerksschub möglich. will.i.am tat dasselbe mit einer Branchenkonvention: Er verkaufte Marken das Nutzungsrecht an künftigen Songs und behielt alle übrigen Rechte. Eine Feinheit aus der Forschung: Soziale Normen behandeln wir als fest, obwohl sie veränderbar sind; wir denken daran, ein Auto zu rufen, selten daran, uns vorzudrängeln.</p><p><strong>Minimale Änderung:</strong> Verstelle so wenige Constraints wie möglich, damit die Wirklichkeit noch durchscheint. Flipkart erfand den Onlinehandel nicht neu, sondern lockerte einen Constraint und erlaubte Barzahlung bei Lieferung. Ruth Byrnes Experimente ergänzen: Eine Handlung wegzudenken kostet weniger kognitiven Aufwand, als eine hinzuzudenken; unser Was-wäre-wenn neigt deshalb zu „hätte das bloß nicht stattgefunden“.</p><p><strong>Konsistenz:</strong> Constraints dürfen sich nicht widersprechen. Für <em>Minority Report</em> ließ Spielberg Fachleute ein stimmiges 2050 entwerfen: Städte behalten „Zeittiefe“, alte und neue Gebäude stehen nebeneinander. Den Realismus brach er genau zweimal, bewusst: ein Armaturenbrett und Jetpacks.</p>'
        },
        visual: { svg: visPrinciples, position: 'bottom', caption: { en: 'Each principle comes with a guiding question. The chapter gives no rule for when the questions give conflicting answers.', de: 'Jedes Prinzip bringt eine Leitfrage mit. Für den Fall, dass die Fragen sich widersprechen, gibt das Kapitel keine Regel.' } },
        keyIdea: { en: 'Mutability asks what you can move, minimal change how little, consistency whether the result still holds together.', de: 'Mutabilität fragt, was du bewegen kannst, minimale Änderung, wie wenig, Konsistenz, ob das Ergebnis noch zusammenhält.' } },
      { id: 's5', heading: { en: 'The trade-off, and constraints made physical', de: 'Der Trade-off und Constraints zum Anfassen' },
        body: {
          en: '<p>Every frame faces one trade-off. Fewer constraints yield more options, and more junk to weed out; more constraints keep you focused but risk missing the better choice. The aim is not to maximise counterfactuals but to shrink the search space quickly to a few workable ones.</p><p>When the mental model gets too complex, or you need to be sure you stick to it, you <strong>externalise</strong> the constraints. The tarp terminal at Entebbe did this. In 1952 a young naval officer named Jimmy Carter helped stabilise a damaged reactor in Ontario; crews could stay in the core for only ninety seconds, so they rehearsed every move on a mock-up built on a tennis court. At Boston Children’s Hospital, Peter Weinstock’s team builds anatomically accurate mannequins under the motto “operate twice, cut once”. A flight simulator is realistic <em>because</em> it constrains. The flip side: what the model leaves out goes unpractised; a basic simulator without other traffic does not prepare you for the airspace over New York.</p><p>Machines, the authors argue, cannot set such boundary conditions themselves. Google’s Coconet writes convincing chorales, but only because it was trained on 306 Bach harmonisations: the constraints are Bach’s.</p>',
          de: '<p>Jeder Frame steht vor einem Trade-off. Weniger Constraints bringen mehr Optionen und mehr Ausschuss, den du aussortieren musst; mehr Constraints halten dich fokussiert, riskieren aber, die bessere Wahl zu übersehen. Ziel ist nicht, möglichst viele kontrafaktische Varianten zu erzeugen, sondern den Suchraum schnell auf wenige tragfähige zu verkleinern.</p><p>Wird das mentale Modell zu komplex oder musst du sicher sein, dass du dich daran hältst, <strong>lagerst</strong> du die Constraints <strong>aus</strong>. Das Planenterminal von Entebbe tat genau das. 1952 half ein junger Marineoffizier namens Jimmy Carter, einen beschädigten Reaktor in Ontario zu stabilisieren; die Trupps durften nur neunzig Sekunden im Kern bleiben, also probten sie jeden Handgriff an einer Attrappe auf einem Tennisplatz. Am Boston Children’s Hospital baut das Team von Peter Weinstock anatomisch genaue Puppen, Motto „operate twice, cut once“. Ein Flugsimulator ist realistisch, <em>weil</em> er begrenzt. Die Kehrseite: Was das Modell weglässt, wird nicht geübt; ein einfacher Simulator ohne anderen Verkehr bereitet nicht auf den Luftraum über New York vor.</p><p>Maschinen, so die Autoren, können solche Randbedingungen nicht selbst setzen. Googles Coconet schreibt überzeugende Choräle, aber nur, weil es an 306 Bach-Harmonisierungen trainiert wurde: Die Constraints sind Bachs.</p>'
        },
        visual: { svg: visLadder, position: 'bottom', caption: { en: 'The further a constraint moves from the head into material, the harder it is to cheat, and the less flexible it becomes.', de: 'Je weiter ein Constraint vom Kopf ins Material wandert, desto schwerer lässt er sich umgehen, und desto unbeweglicher wird er.' } } },
    ],
    exercise: {
      type: 'sort',
      title: { en: 'Hard or soft? AI assistants in a bank’s advisory teams', de: 'Hart oder weich? KI-Assistenz in den Beratungsteams einer Bank' },
      instructions: {
        en: 'The frame: a cooperative bank wants AI assistants to support its private-client advisers in preparing and documenting conversations. The advisers remain responsible for the advice. Sort each constraint: is it hard (dropping it means abandoning this frame or breaking the law) or soft (it can be moved, possibly with effort)? Read the explanation after each item; several are deliberately borderline.',
        de: 'Der Frame: Eine Genossenschaftsbank will, dass KI-Assistenz die Beraterinnen und Berater im Privatkundengeschäft bei Vorbereitung und Dokumentation von Gesprächen unterstützt. Die Verantwortung für die Beratung bleibt bei den Menschen. Ordne jeden Constraint zu: hart (wer ihn aufgibt, verlässt diesen Frame oder bricht Recht) oder weich (er lässt sich versetzen, eventuell mit Aufwand)? Lies nach jedem Eintrag die Begründung; mehrere sind absichtlich Grenzfälle.'
      },
      categories: [{ id: 'hard', label: { en: 'Hard', de: 'Hart' } }, { id: 'soft', label: { en: 'Soft', de: 'Weich' } }],
      items: [
        { text: { en: 'Documentation duties for investment advice (e.g. the suitability statement) must be met.', de: 'Dokumentationspflichten in der Anlageberatung (etwa die Geeignetheitserklärung) müssen erfüllt werden.' }, category: 'hard',
          why: { en: 'Regulatory and non-negotiable for a bank. What is soft is <em>how</em> they are met: the AI may draft, a human signs off.', de: 'Regulatorisch und für eine Bank nicht verhandelbar. Weich ist, <em>wie</em> sie erfüllt werden: Die KI darf entwerfen, ein Mensch zeichnet ab.' } },
        { text: { en: 'Advice remains attributable to a named human adviser.', de: 'Die Beratung bleibt einer namentlich benannten Person zurechenbar.' }, category: 'hard',
          why: { en: 'This is the frame’s core tenet. Drop it and you are no longer introducing an assistant; you are building robo-advice, a different frame with different rules and risks.', de: 'Das ist der Kerngedanke des Frames. Gibst du ihn auf, führst du keine Assistenz mehr ein, sondern baust Robo-Advice: ein anderer Frame mit anderen Regeln und Risiken.' } },
        { text: { en: 'Customer data may only be processed in environments approved under the bank’s outsourcing and information-security rules.', de: 'Kundendaten dürfen nur in Umgebungen verarbeitet werden, die nach den Auslagerungs- und Informationssicherheitsregeln der Bank freigegeben sind.' }, category: 'hard',
          why: { en: 'Hard as a rule (supervisory requirements, bank secrecy). But note the gradient: <em>which</em> environments are approved can change over time; that part is soft and often where the real negotiation happens.', de: 'Als Regel hart (aufsichtliche Anforderungen, Bankgeheimnis). Beachte aber das Kontinuum: <em>welche</em> Umgebungen freigegeben sind, kann sich ändern; dieser Teil ist weich, und dort findet oft die eigentliche Verhandlung statt.' } },
        { text: { en: 'The works council has a co-determination right over tools that can monitor employee performance.', de: 'Der Betriebsrat bestimmt bei Werkzeugen mit, die Leistung oder Verhalten der Mitarbeitenden überwachen können.' }, category: 'hard',
          why: { en: 'A legal right in Germany, not a preference. Treating it as soft (“we will inform them later”) does not create an option; it stops the project. Soft is the design of the agreement.', de: 'In Deutschland ein Recht, keine Vorliebe. Wer es als weich behandelt („wir informieren später“), gewinnt keine Option, sondern stoppt das Projekt. Weich ist die Ausgestaltung der Vereinbarung.' } },
        { text: { en: 'The licence budget for year one is capped at 120,000 euros.', de: 'Das Lizenzbudget für das erste Jahr ist auf 120.000 Euro gedeckelt.' }, category: 'soft',
          why: { en: 'Hard for the project lead, soft for the board, which can reallocate. The book itself cites a budget as something a manager should not loosen; that shows how “hard” depends on where you sit. Also mutable via scope: a smaller pilot.', de: 'Hart für die Projektleitung, weich für den Vorstand, der umschichten kann. Das Buch nennt ein Budget selbst als etwas, das eine Führungskraft nicht lockern sollte; das zeigt, wie sehr „hart“ von der Position abhängt. Außerdem über den Umfang veränderbar: ein kleinerer Pilot.' } },
        { text: { en: 'The assistant must be the product already licensed through the central IT provider.', de: 'Die Assistenz muss das Produkt sein, das über den zentralen IT-Dienstleister bereits lizenziert ist.' }, category: 'soft',
          why: { en: 'A procurement path, not a law of nature. Moving it costs effort and time, which makes it feel hard. Mutability asks whether it is worth that effort here, or whether the licensed tool is good enough (minimal change).', de: 'Ein Beschaffungsweg, kein Naturgesetz. Ihn zu verlassen kostet Aufwand und Zeit, deshalb fühlt er sich hart an. Mutabilität fragt, ob der Aufwand sich hier lohnt, oder ob das lizenzierte Werkzeug genügt (minimale Änderung).' } },
        { text: { en: 'Advisers prepare client meetings alone and discuss cases only in the weekly team meeting.', de: 'Beraterinnen und Berater bereiten Gespräche allein vor und besprechen Fälle nur im wöchentlichen Teammeeting.' }, category: 'soft',
          why: { en: 'Meeting culture is human behaviour and therefore mutable. But remember the research wrinkle: people treat norms like this as fixed. Naming it as soft is often the most productive move in the whole project.', de: 'Meetingkultur ist menschliches Verhalten und damit veränderbar. Denk aber an die Feinheit aus der Forschung: Menschen behandeln solche Normen wie feste Größen. Sie als weich zu benennen ist oft der produktivste Zug im ganzen Projekt.' } },
        { text: { en: 'Go-live in all branches before the annual general meeting in June.', de: 'Go-live in allen Filialen vor der Generalversammlung im Juni.' }, category: 'soft',
          why: { en: 'A self-imposed date, often political. It can be moved or split (one region first). Treating it as hard tends to sacrifice something that really is hard, such as the works agreement.', de: 'Ein selbst gesetztes Datum, oft politisch motiviert. Es lässt sich verschieben oder staffeln (erst eine Region). Wer es als hart behandelt, opfert dafür meist etwas, das wirklich hart ist, etwa die Betriebsvereinbarung.' } },
      ],
    },
    caseStudy: {
      title: { en: 'Austrian wine: from scandal to luxury with one turned dial', de: 'Österreichischer Wein: vom Skandal zum Luxusgut mit einem gedrehten Regler' },
      body: {
        en: '<p>For decades, vineyards along the Danube in Lower Austria produced large volumes of fairly ordinary wine. In the mid-1980s it came out that some merchants had sweetened it with diethylene glycol to make it seem fuller and fetch higher prices. The press called it “antifreeze”, which was chemically inaccurate but stuck. Austrian wine was banned in several markets, tens of millions of bottles were destroyed in West Germany alone, and exports fell by about 90 percent.</p><p>Within two months Austria passed strict laws: tight controls, transparent labelling, numbered bottles, heavy fines. The old model of high volume and low quality was no longer viable. Some growers gave up. A younger generation found a different path, and it was not the radical one. They did not switch to apples or apricots, nor leave agriculture. They kept the grapes and the craft and changed one thing: the product would compete on quality, not quantity. That meant using only the best grapes, investing in brands and building tasting venues that created wine tourism.</p><p>The transition was painful and slow. Two decades later, wines from the region scored top marks from international critics, and by 2019 export volume had roughly doubled compared with before the scandal while export value had grown about sixfold. One of the growers, Erich Polz, later called the scandal the best thing that ever happened to Austrian wine.</p>',
        de: '<p>Jahrzehntelang erzeugten die Weingüter an der Donau in Niederösterreich große Mengen eher gewöhnlichen Weins. Mitte der 1980er-Jahre kam heraus, dass einige Händler ihn mit Diethylenglykol gesüßt hatten, damit er voller wirkte und mehr einbrachte. Die Presse sprach von „Frostschutzmittel“, chemisch ungenau, aber eingängig. Österreichischer Wein wurde in mehreren Märkten verboten, allein in Westdeutschland wurden zig Millionen Flaschen vernichtet, die Exporte brachen um rund 90 Prozent ein.</p><p>Binnen zwei Monaten verabschiedete Österreich strenge Gesetze: enge Kontrollen, transparente Etiketten, nummerierte Flaschen, hohe Strafen. Das alte Modell aus viel Menge und wenig Qualität trug nicht mehr. Manche Betriebe gaben auf. Eine jüngere Generation fand einen anderen Weg, und es war nicht der radikale. Sie stieg nicht auf Äpfel oder Aprikosen um und verließ auch nicht die Landwirtschaft. Sie behielt Trauben und Handwerk und änderte eines: Das Produkt sollte über Qualität konkurrieren, nicht über Menge. Das hieß, nur die besten Trauben zu verwenden, in Marken zu investieren und Verkostungsorte zu bauen, die Weintourismus entstehen ließen.</p><p>Der Übergang war schmerzhaft und langsam. Zwei Jahrzehnte später erhielten Weine der Region Spitzenbewertungen internationaler Kritik, und 2019 lag die Exportmenge etwa doppelt so hoch wie vor dem Skandal, der Exportwert etwa beim Sechsfachen. Einer der Winzer, Erich Polz, nannte den Skandal später das Beste, was dem österreichischen Wein je passiert sei.</p>'
      },
      lesson: { en: 'Minimal change is not timidity. The growers kept every constraint that carried their identity (grapes, craft, place) and moved the single one that the new reality had made untenable. Ask of any crisis plan: which one dial are we turning, and why do we need to turn more?', de: 'Minimale Änderung ist keine Zaghaftigkeit. Die Winzerinnen und Winzer hielten jeden Constraint, der ihre Identität trug (Trauben, Handwerk, Ort), und versetzten den einen, den die neue Wirklichkeit unhaltbar gemacht hatte. Frag bei jedem Krisenplan: Welchen einen Regler drehen wir, und warum müssten wir mehr drehen?' },
      visual: { svg: visWine, caption: { en: 'Austrian wine exports, before the scandal and in 2019 (relative, per the chapter). Volume doubled, value grew sixfold: the change sits in the product, not the crop.', de: 'Österreichische Weinexporte vor dem Skandal und 2019 (relativ, nach Angaben des Kapitels). Die Menge verdoppelte sich, der Wert versechsfachte sich: Die Änderung steckt im Produkt, nicht in der Frucht.' } },
    },
    reflection: {
      intro: { en: 'Take a decision or change initiative you are working on right now. Write briefly; precision matters more than length.', de: 'Nimm eine Entscheidung oder Veränderungsinitiative, an der du gerade arbeitest. Schreib knapp; Genauigkeit zählt mehr als Länge.' },
      prompts: [
        { en: 'List the constraints you are working under. Which ones are hard because dropping them would abandon the frame, and which ones only feel hard because someone declared them so?', de: 'Liste die Constraints, unter denen du arbeitest. Welche sind hart, weil ihr Wegfall den Frame aufgeben würde, und welche fühlen sich nur hart an, weil jemand sie dazu erklärt hat?' },
        { en: 'Name the one soft constraint whose loosening would open the most useful options (mutability), and check whether loosening it contradicts anything else you need to keep (consistency).', de: 'Benenne den einen weichen Constraint, dessen Lockerung die nützlichsten Optionen eröffnen würde (Mutabilität), und prüf, ob die Lockerung etwas widerspricht, das du halten musst (Konsistenz).' },
        { en: 'Where in your work could you externalise constraints, in a mock-up, a pilot, a role-play or a sandbox, so that people practise inside them before the real thing? What would the model deliberately leave out?', de: 'Wo in deiner Arbeit könntest du Constraints auslagern, in eine Attrappe, einen Pilot, ein Rollenspiel oder eine Sandbox, damit Menschen darin üben, bevor es ernst wird? Was würde das Modell bewusst weglassen?' },
      ],
      placeholder: { en: 'Hard: … Soft but treated as hard: … The dial I would turn: …', de: 'Hart: … Weich, aber als hart behandelt: … Der Regler, den ich drehen würde: …' },
    },
    quiz: [
      { q: { en: 'A steering group lists 20 constraints for a new hybrid-work policy. Which first step matches the chapter?', de: 'Eine Steuerungsgruppe listet 20 Constraints für eine neue Hybrid-Arbeitsregelung. Welcher erste Schritt passt zum Kapitel?' },
        options: [
          { en: 'Remove as many as possible to maximise the number of options.', de: 'So viele wie möglich streichen, um die Zahl der Optionen zu maximieren.' },
          { en: 'Separate the few whose removal would abandon the frame from the rest, then iterate through the soft ones.', de: 'Die wenigen, deren Wegfall den Frame aufgeben würde, vom Rest trennen, dann die weichen durchgehen.' },
          { en: 'Keep all 20, because every constraint was introduced for a reason.', de: 'Alle 20 behalten, denn jeder Constraint wurde aus einem Grund eingeführt.' },
          { en: 'Rank them by implementation cost and drop the most expensive.', de: 'Nach Umsetzungskosten ordnen und die teuersten streichen.' },
        ],
        answer: 1, explain: { en: 'Hard first, then soft. Option 1 confuses option count with option quality (the trade-off). Option 3 freezes the search. Option 4 uses a criterion that ignores whether a constraint carries the frame.', de: 'Erst hart, dann weich. Option 1 verwechselt die Zahl der Optionen mit ihrer Qualität (der Trade-off). Option 3 friert die Suche ein. Option 4 nutzt ein Kriterium, das ignoriert, ob ein Constraint den Frame trägt.' } },
      { q: { en: 'What exactly did SpaceX change compared with NASA’s shuttle concept?', de: 'Was genau änderte SpaceX gegenüber dem Shuttle-Konzept der NASA?' },
        options: [
          { en: 'It dropped the requirement to slow the returning stage.', de: 'Es strich die Anforderung, die zurückkehrende Stufe abzubremsen.' },
          { en: 'It kept the shuttle design and only changed materials, a minimal change.', de: 'Es behielt das Shuttle-Design und änderte nur Materialien, eine minimale Änderung.' },
          { en: 'It kept “slow the fall” as hard and treated aerodynamic lift as mutable, using engine thrust instead.', de: 'Es hielt „den Fall bremsen“ als hart fest und behandelte aerodynamischen Auftrieb als veränderbar, mit Triebwerksschub stattdessen.' },
          { en: 'It added more constraints so that fewer options had to be evaluated.', de: 'Es fügte mehr Constraints hinzu, damit weniger Optionen geprüft werden mussten.' },
        ],
        answer: 2, explain: { en: 'Mutability: the goal stayed, one assumed constraint turned out to be movable because technology (sensors, computing) had changed what was feasible.', de: 'Mutabilität: Das Ziel blieb, ein vorausgesetzter Constraint erwies sich als beweglich, weil Technik (Sensorik, Rechenleistung) verändert hatte, was machbar ist.' } },
      { q: { en: 'A future scenario in a strategy workshop has fully automated branches without staff, while “personal advice on site” remains the bank’s unique selling point. Which principle is violated?', de: 'Ein Zukunftsszenario im Strategieworkshop enthält vollautomatisierte Filialen ohne Personal, während „persönliche Beratung vor Ort“ das Alleinstellungsmerkmal der Bank bleibt. Welches Prinzip ist verletzt?' },
        options: [
          { en: 'Mutability', de: 'Mutabilität' },
          { en: 'Minimal change', de: 'Minimale Änderung' },
          { en: 'Consistency', de: 'Konsistenz' },
          { en: 'None; scenarios may be contradictory by design.', de: 'Keines; Szenarien dürfen absichtlich widersprüchlich sein.' },
        ],
        answer: 2, explain: { en: 'Two constraints contradict each other, like the defence lawyer who argues his client was not there and acted in self-defence. Minimal change is arguably also strained, but the decisive flaw is the contradiction.', de: 'Zwei Constraints widersprechen einander, wie der Verteidiger, der behauptet, sein Mandant sei nicht am Tatort gewesen und habe in Notwehr gehandelt. Auch die minimale Änderung ist strapaziert, der entscheidende Fehler ist aber der Widerspruch.' } },
      { q: { en: 'In a project post-mortem, almost all suggestions start with “if only we hadn’t …”. What does the chapter suggest about this?', de: 'In einer Projekt-Retrospektive beginnen fast alle Vorschläge mit „hätten wir doch nicht …“. Was legt das Kapitel dazu nahe?' },
        options: [
          { en: 'It shows the team has identified the real causes.', de: 'Es zeigt, dass das Team die eigentlichen Ursachen gefunden hat.' },
          { en: 'Omitting an action is cognitively cheaper than adding one, so additive alternatives are systematically underexplored.', de: 'Eine Handlung wegzudenken ist kognitiv billiger, als eine hinzuzudenken; additive Alternativen werden daher systematisch zu wenig erkundet.' },
          { en: 'It violates the consistency principle.', de: 'Es verletzt das Konsistenzprinzip.' },
          { en: 'It reflects the mutability principle, so no correction is needed.', de: 'Es spiegelt das Mutabilitätsprinzip; eine Korrektur ist nicht nötig.' },
        ],
        answer: 1, explain: { en: 'Byrne’s finding: “nothing happened” is easier to imagine than one of countless possible additions. Useful as a heuristic, but a facilitator should deliberately ask “what could we have done that we did not?”', de: 'Byrnes Befund: „Es ist nichts passiert“ ist leichter vorzustellen als eine von unzähligen möglichen Ergänzungen. Als Heuristik nützlich, aber eine Moderation sollte gezielt fragen: „Was hätten wir tun können, das wir nicht getan haben?“' } },
      { q: { en: 'A bank builds a sandbox to train advisers with an AI assistant, using only clean synthetic customer data. What does the chapter warn about?', de: 'Eine Bank baut eine Sandbox, um Beratende mit einer KI-Assistenz zu trainieren, ausschließlich mit sauberen synthetischen Kundendaten. Wovor warnt das Kapitel?' },
        options: [
          { en: 'Simulations are pointless because they are not reality.', de: 'Simulationen sind sinnlos, weil sie nicht die Wirklichkeit sind.' },
          { en: 'Synthetic data violates the minimal-change principle.', de: 'Synthetische Daten verletzen das Prinzip der minimalen Änderung.' },
          { en: 'What the model leaves out is not practised: like a flight simulator without other traffic, it will not prepare people for messy real cases.', de: 'Was das Modell weglässt, wird nicht geübt: Wie ein Flugsimulator ohne anderen Verkehr bereitet es nicht auf unordentliche reale Fälle vor.' },
          { en: 'Sandboxes are less constrained than mental models, so they produce too many options.', de: 'Sandboxen sind weniger begrenzt als mentale Modelle und erzeugen daher zu viele Optionen.' },
        ],
        answer: 2, explain: { en: 'A model’s value lies as much in what it ignores as in what it includes, and so does its blind spot. Option 4 inverts the argument: externalised constraints are harder to break, not looser.', de: 'Der Wert eines Modells liegt ebenso in dem, was es weglässt, wie in dem, was es enthält, und dort liegt auch sein blinder Fleck. Option 4 dreht das Argument um: Ausgelagerte Constraints sind schwerer zu brechen, nicht lockerer.' } },
      { q: { en: 'Martha Graham removed corsets and introduced the Graham technique. Which reading fits the chapter best?', de: 'Martha Graham schaffte Korsetts ab und führte die Graham-Technik ein. Welche Lesart passt am besten zum Kapitel?' },
        options: [
          { en: 'Creativity needs as few constraints as possible.', de: 'Kreativität braucht möglichst wenige Constraints.' },
          { en: 'She reframed dance entirely, so constraints played no role.', de: 'Sie hat den Tanz komplett gereframt, Constraints spielten keine Rolle.' },
          { en: 'Constraint work combines removing a limit with adding a new one, so freedom does not become arbitrariness.', de: 'Constraint-Arbeit verbindet das Wegnehmen einer Grenze mit dem Setzen einer neuen, damit Freiheit nicht zu Beliebigkeit wird.' },
          { en: 'Stricter constraints always lead to better art.', de: 'Strengere Constraints führen immer zu besserer Kunst.' },
        ],
        answer: 2, explain: { en: 'Neither “fewer” nor “more” is the lesson; the choice of which ones is. Gehry’s paralysis without any constraints makes the same point from the other side.', de: 'Weder „weniger“ noch „mehr“ ist die Lehre, sondern die Wahl, welche. Gehrys Lähmung ohne jede Vorgabe zeigt dasselbe von der anderen Seite.' } },
    ],
    flashcards: [
      { front: { en: 'Constraint (in the book)', de: 'Constraint (im Buch)' }, back: { en: 'A rule or restriction that shapes which counterfactuals you consider. The third C: it makes imagined alternatives actionable.', de: 'Eine Regel oder Begrenzung, die bestimmt, welche kontrafaktischen Varianten du durchspielst. Das dritte C: Es macht vorgestellte Alternativen handlungsfähig.' } },
      { front: { en: 'Hard vs. soft constraint', de: 'Harter vs. weicher Constraint' }, back: { en: 'Hard: carries the frame’s core; dropping it means leaving the frame. Soft: movable, perhaps with effort. Hardness is relative to the frame.', de: 'Hart: trägt den Kern des Frames; wer ihn aufgibt, verlässt den Frame. Weich: versetzbar, vielleicht mit Aufwand. Härte ist relativ zum Frame.' } },
      { front: { en: 'Mutability', de: 'Mutabilität' }, back: { en: 'Change constraints you can actually influence. SpaceX: lift became mutable, the goal of slowing the fall stayed. Caveat: we treat social norms as fixed.', de: 'Constraints ändern, die du tatsächlich beeinflussen kannst. SpaceX: Auftrieb wurde veränderbar, das Ziel, den Fall zu bremsen, blieb. Vorbehalt: Soziale Normen behandeln wir als fest.' } },
      { front: { en: 'Minimal change', de: 'Minimale Änderung' }, back: { en: 'Adjust as few constraints as possible so reality shows through. Austrian wine: quality instead of volume, not a new crop. Flipkart: cash on delivery.', de: 'So wenige Constraints wie möglich verstellen, damit die Wirklichkeit durchscheint. Österreichischer Wein: Qualität statt Menge, keine neue Frucht. Flipkart: Barzahlung bei Lieferung.' } },
      { front: { en: 'Consistency', de: 'Konsistenz' }, back: { en: 'Constraints must not contradict each other. Minority Report: a coherent 2050 with “time depth”; only two deliberate breaks (dashboard, jet packs).', de: 'Constraints dürfen sich nicht widersprechen. Minority Report: ein stimmiges 2050 mit „Zeittiefe“; nur zwei bewusste Brüche (Armaturenbrett, Jetpacks).' } },
      { front: { en: 'The core trade-off of every frame', de: 'Der Kern-Trade-off jedes Frames' }, back: { en: 'Fewer constraints: more options, more junk. More constraints: focus, but risk of missing the better option. Goal: shrink the search space fast.', de: 'Weniger Constraints: mehr Optionen, mehr Ausschuss. Mehr Constraints: Fokus, aber Gefahr, die bessere Option zu verpassen. Ziel: den Suchraum schnell verkleinern.' } },
      { front: { en: 'Externalising constraints', de: 'Constraints auslagern' }, back: { en: 'Building them into a model or simulator (tarp terminal, reactor mock-up, surgical mannequin). Harder to cheat; but what is left out is not practised.', de: 'Sie in ein Modell oder einen Simulator einbauen (Planenterminal, Reaktor-Attrappe, OP-Puppe). Schwerer zu umgehen; was fehlt, wird aber nicht geübt.' } },
      { front: { en: 'Omission bias in counterfactuals (Byrne)', de: 'Weglass-Neigung im Kontrafaktischen (Byrne)' }, back: { en: 'Imagining an action away is cognitively cheaper than imagining one added. Our what-ifs lean towards “if only it hadn’t happened”.', de: 'Eine Handlung wegzudenken ist kognitiv billiger, als eine hinzuzudenken. Unser Was-wäre-wenn neigt zu „hätte es das bloß nicht gegeben“.' } },
    ],
    critique: [
      { claim: { en: 'Mutability, minimal change and consistency guide the choice of soft constraints.', de: 'Mutabilität, minimale Änderung und Konsistenz leiten die Wahl weicher Constraints.' },
        challenge: { en: 'They are rules of thumb without a procedure for conflicts. SpaceX loosened a constraint the whole industry had treated as fixed; by the standard of minimal change that was a large step, and by the standard of mutability a smart one. Which wins? The chapter admits that choosing is “more art than science” but then presents its cases as if the principles had pointed the way. Retrospectively, almost any success can be described as the right dial turned. Useful as a checklist, weak as a decision rule.', de: 'Es sind Faustregeln ohne Verfahren für den Konfliktfall. SpaceX lockerte einen Constraint, den die ganze Branche als fest behandelt hatte; gemessen an minimaler Änderung ein großer Schritt, gemessen an Mutabilität ein kluger. Was gewinnt? Das Kapitel räumt ein, die Wahl sei eher Kunst als Wissenschaft, präsentiert seine Fälle dann aber so, als hätten die Prinzipien den Weg gewiesen. Rückblickend lässt sich fast jeder Erfolg als richtig gedrehter Regler beschreiben. Nützlich als Checkliste, schwach als Entscheidungsregel.' } },
      { claim: { en: 'Constraints are hard or soft relative to the frame; choosing them is a cognitive skill.', de: 'Constraints sind relativ zum Frame hart oder weich; sie zu wählen ist eine kognitive Fähigkeit.' },
        challenge: { en: 'Who declares a constraint hard is a question of power and incentives, not only of cognition. A budget is hard for the department head and soft for the board; a deadline set to please a supervisory body is “hard” for those who did not set it. Declaring something non-negotiable is also a way of ending a debate. The chapter treats the hard/soft line as a property of the problem; organisational sociology would ask whose interests the line protects. Shomron could fix “surprise” because he had the authority to.', de: 'Wer einen Constraint für hart erklärt, ist eine Frage von Macht und Interessen, nicht nur von Kognition. Ein Budget ist hart für die Bereichsleitung und weich für den Vorstand; eine Frist, die einem Aufsichtsgremium gefallen soll, ist „hart“ für alle, die sie nicht gesetzt haben. Etwas für unverhandelbar zu erklären ist auch ein Mittel, eine Debatte zu beenden. Das Kapitel behandelt die Grenze zwischen hart und weich als Eigenschaft des Problems; die Organisationssoziologie würde fragen, wessen Interessen die Grenze schützt. Shomron konnte „Überraschung“ festlegen, weil er die Autorität dazu hatte.' } },
      { claim: { en: 'Entebbe shows how wisely chosen constraints produce a workable plan.', de: 'Entebbe zeigt, wie klug gewählte Constraints einen tragfähigen Plan hervorbringen.' },
        challenge: { en: 'It is a military success story told from the planners’ side. Four years later, the US attempt to free hostages in Tehran (Operation Eagle Claw, 1980) was also built on surprise and rehearsed in detail; it failed at the first staging point after helicopter breakdowns and a deadly collision. The chapter does not examine raids planned with the same logic that went wrong, nor how much Entebbe depended on luck (the terminal’s blueprints happened to be available). Without failed cases, the method cannot be distinguished from good fortune.', de: 'Es ist eine militärische Erfolgsgeschichte aus Sicht der Planenden. Vier Jahre später beruhte auch der US-Versuch, Geiseln in Teheran zu befreien (Operation Eagle Claw, 1980), auf Überraschung und detaillierten Proben; er scheiterte schon am ersten Zwischenlandeplatz nach Hubschrauberausfällen und einer tödlichen Kollision. Das Kapitel untersucht keine nach derselben Logik geplanten Einsätze, die schiefgingen, und auch nicht, wie viel in Entebbe vom Glück abhing (die Baupläne des Terminals waren zufällig verfügbar). Ohne gescheiterte Fälle lässt sich die Methode nicht von günstigen Umständen unterscheiden.' } },
      { claim: { en: 'Algorithms cannot set constraints or boundary conditions on their own.', de: 'Algorithmen können Constraints und Randbedingungen nicht selbst setzen.' },
        challenge: { en: 'Written before large language models, this is dated in its strong form. Asked for it, a current model will propose hard and soft constraints, flag contradictions and narrow a search space; agent systems routinely set intermediate boundary conditions for themselves. Constraint specification is precisely what prompting, system prompts and guardrails do today. The defensible claim is narrower: the machine does not <em>own</em> the choice of which constraints count as hard, and it carries no responsibility for that choice. That human role remains, and it is a design and governance task, not a cognitive privilege.', de: 'Vor den großen Sprachmodellen geschrieben, ist die starke Fassung überholt. Auf Nachfrage schlägt ein aktuelles Modell harte und weiche Constraints vor, markiert Widersprüche und verkleinert einen Suchraum; Agentensysteme setzen sich laufend selbst Zwischen-Randbedingungen. Constraints zu spezifizieren ist genau das, was Prompting, Systemprompts und Guardrails heute tun. Haltbar ist die engere These: Die Maschine <em>besitzt</em> die Wahl nicht, welche Constraints als hart gelten, und trägt keine Verantwortung dafür. Diese menschliche Rolle bleibt, und sie ist eine Gestaltungs- und Governance-Aufgabe, kein kognitives Privileg.' } },
    ],
    transfer: [
      { context: { en: 'Leadership', de: 'Führung' }, prompt: { en: 'In your next team meeting on a stuck topic, put up two columns: “really hard (law, frame core)” and “declared hard (by whom?)”. Fill them together. Then ask which item in the second column you, as the leader, could release yourself. Watch which constraints people defend, and whose interests that protects.', de: 'Mach im nächsten Teammeeting zu einem festgefahrenen Thema zwei Spalten auf: „wirklich hart (Recht, Kern des Frames)“ und „für hart erklärt (von wem?)“. Füllt sie gemeinsam. Frag dann, welchen Eintrag der zweiten Spalte du als Führungskraft selbst freigeben könntest. Achte darauf, welche Constraints Menschen verteidigen und wessen Interessen das schützt.' } },
      { context: { en: 'AI in organisations', de: 'KI in Organisationen' }, prompt: { en: 'Take a prompt or agent instruction your team uses and rewrite its constraints section explicitly: hard constraints (never violate, e.g. no customer data in the output), soft ones (defaults the model may deviate from, with a stated reason), and a consistency check (“flag if two instructions conflict”). Guardrails are externalised constraints; decide which belong in the prompt and which in the system around it.', de: 'Nimm einen Prompt oder eine Agentenanweisung, die dein Team nutzt, und schreib den Constraints-Teil explizit um: harte Constraints (nie verletzen, etwa keine Kundendaten im Output), weiche (Vorgaben, von denen das Modell mit Begründung abweichen darf) und eine Konsistenzprüfung („melde, wenn zwei Anweisungen kollidieren“). Guardrails sind ausgelagerte Constraints; entscheide, welche in den Prompt gehören und welche ins System drumherum.' } },
      { context: { en: 'Change and transformation', de: 'Change und Transformation' }, prompt: { en: 'Use minimal change as a test against transformation theatre. For a current programme, list every constraint it changes at once (structure, tools, roles, meeting rhythm, workplace). Which single change, like the Austrian growers’ shift to quality, would deliver most of the effect? Argue in writing why each additional change is needed; whatever you cannot justify is a candidate to drop.', de: 'Nutze minimale Änderung als Prüfstein gegen Transformationstheater. Liste für ein laufendes Programm jeden Constraint auf, den es gleichzeitig verändert (Struktur, Werkzeuge, Rollen, Meetingrhythmus, Arbeitsort). Welche einzelne Änderung würde, wie der Schritt der österreichischen Winzerinnen und Winzer zur Qualität, den Großteil der Wirkung bringen? Begründe schriftlich, warum jede weitere Änderung nötig ist; was du nicht begründen kannst, ist ein Kandidat zum Streichen.' } },
    ],
    summary: [
      { en: 'Constraints are the third element of applying a frame: they bound counterfactual thinking so that it yields options you can act on.', de: 'Constraints sind das dritte Element beim Anwenden eines Frames: Sie begrenzen das kontrafaktische Denken, damit es Optionen liefert, nach denen du handeln kannst.' },
      { en: 'Hard constraints carry the frame’s core and must be kept; soft ones can be adjusted, and the hard/soft line is relative to the frame.', de: 'Harte Constraints tragen den Kern des Frames und bleiben; weiche lassen sich verstellen, und die Grenze zwischen beiden ist relativ zum Frame.' },
      { en: 'Three principles guide the soft ones: mutability (change what you can influence), minimal change (as little as possible), consistency (no contradictions).', de: 'Drei Prinzipien leiten die weichen: Mutabilität (ändere, was du beeinflussen kannst), minimale Änderung (so wenig wie möglich), Konsistenz (keine Widersprüche).' },
      { en: 'Every frame trades breadth against focus; the goal is a small set of workable options, and models and simulators externalise constraints to make them stick.', de: 'Jeder Frame wägt Breite gegen Fokus ab; Ziel ist eine kleine Menge tragfähiger Optionen, und Modelle und Simulatoren lagern Constraints aus, damit sie halten.' },
      { en: 'The book’s claim that machines cannot set constraints is dated; what remains human is owning the choice of which constraints are hard.', de: 'Die These des Buchs, Maschinen könnten keine Constraints setzen, ist überholt; menschlich bleibt, die Wahl zu verantworten, welche Constraints hart sind.' },
    ],
    glossary: [
      { term: { en: 'Constraint', de: 'Constraint (Begrenzung)' }, def: { en: 'A rule or restriction that shapes which counterfactuals are considered; can be tightened, loosened, added or removed.', de: 'Eine Regel oder Beschränkung, die bestimmt, welche kontrafaktischen Varianten betrachtet werden; lässt sich verschärfen, lockern, hinzufügen oder streichen.' } },
      { term: { en: 'Hard / soft constraint', de: 'Harter / weicher Constraint' }, def: { en: 'Hard: inviolable within the frame, dropping it means dropping the frame. Soft: adjustable, possibly with effort.', de: 'Hart: im Frame unantastbar, wer ihn aufgibt, gibt den Frame auf. Weich: verstellbar, eventuell mit Aufwand.' } },
      { term: { en: 'Mutability principle', de: 'Mutabilitätsprinzip' }, def: { en: 'Prefer adjusting constraints you can actually influence, especially those reflecting human choices.', de: 'Bevorzugt Constraints verstellen, die du tatsächlich beeinflussen kannst, vor allem solche, die auf menschlichen Entscheidungen beruhen.' } },
      { term: { en: 'Minimal-change principle', de: 'Prinzip der minimalen Änderung' }, def: { en: 'Make as few modifications as possible so the imagined alternative stays close to reality; related to Occam’s razor.', de: 'So wenige Veränderungen wie möglich vornehmen, damit die vorgestellte Alternative nah an der Wirklichkeit bleibt; verwandt mit Ockhams Rasiermesser.' } },
      { term: { en: 'Consistency principle', de: 'Konsistenzprinzip' }, def: { en: 'Constraints must not contradict one another; harder to satisfy the more constraints are in play.', de: 'Constraints dürfen einander nicht widersprechen; umso schwerer einzuhalten, je mehr Constraints im Spiel sind.' } },
      { term: { en: 'Externalised constraint', de: 'Ausgelagerter Constraint' }, def: { en: 'A constraint built into a physical model or simulator, so it is enforced rather than remembered.', de: 'Ein Constraint, der in ein physisches Modell oder einen Simulator eingebaut ist und dadurch erzwungen statt erinnert wird.' } },
    ],
  });
})();
