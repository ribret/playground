/* u01 — Kapitel 1 „Decisions“ / Chapter 1 "Decisions" */
(function () {
  const P = V.palette;
  const de = (lang) => lang === 'de';
  const T = (l, en, dee) => (de(l) ? dee : en);

  /* hexagon helper for molecule glyphs */
  const hex = (cx, cy, r, o = {}) => {
    let d = '';
    for (let i = 0; i < 6; i++) { const a = Math.PI / 3 * i + Math.PI / 6; d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1); }
    return V.path(d + 'Z', o);
  };

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 5000,
      caption: { en: '<b>How we act depends on what we see.</b> Without a model, the world is a flood of signals no one can process.', de: '<b>Wie wir handeln, hängt davon ab, was wir sehen.</b> Ohne Modell ist die Welt eine Signalflut, die niemand verarbeiten kann.' },
      svg: (l) => V.wrap(V.dots(120, 15, 15, 370, 230, { seed: 5, stagger: .02, cls: 'a-fade', fill: P.muted, r: 3.5 }) +
        V.person(200, 175, { color: P.ink, cls: 'a-pop', delay: 1.2, scale: 1.3 }) +
        V.text(200, 245, T(l, 'Signals without a model', 'Signale ohne Modell'), { size: 13, bold: true, cls: 'a-fade', delay: 1.8 })) },

    { duration: 5500,
      caption: { en: '<b>A mental model filters and connects.</b> Like following one conversation at a loud party: focus on what matters, expect what comes next.', de: '<b>Ein mentales Modell filtert und verbindet.</b> Wie auf einer lauten Party, auf der du dem einen Gespräch folgst: Fokus auf das Wesentliche, Erwartung an das, was kommt.' },
      svg: (l) => {
        const pts = [[150, 95], [195, 80], [245, 105], [175, 140], [230, 155], [200, 185]];
        let s = V.dots(70, 10, 10, 380, 240, { seed: 5, fill: P.line, r: 3 }) + V.frame(115, 50, 170, 160, { label: 'Frame', cls: 'a-pop' });
        s += [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [4, 5]].map(([a, b], i) => V.line(pts[a][0], pts[a][1], pts[b][0], pts[b][1], { stroke: P.coral, sw: 2, cls: 'a-draw', delay: 1 + i * .15 })).join('');
        s += pts.map((p, i) => V.circle(p[0], p[1], 6, { fill: P.coral, cls: 'a-pop', delay: .6 + i * .1 })).join('');
        return V.wrap(s + V.text(200, 243, T(l, 'Pattern instead of noise', 'Muster statt Rauschen'), { size: 13, bold: true, cls: 'a-fade', delay: 2 }));
      } },

    { duration: 6500,
      caption: { en: '<b>Barzilay swapped the question.</b> Not “does it look like a known antibiotic?” but “does it kill bacteria?”. Structure became function.', de: '<b>Barzilay tauschte die Frage aus.</b> Nicht „ähnelt es einem bekannten Antibiotikum?“, sondern „tötet es Bakterien?“. Aus Struktur wurde Funktion.' },
      svg: (l) => V.wrap(
        V.frame(20, 50, 160, 160, { label: T(l, 'Structure', 'Struktur'), color: P.muted, cls: 'a-fade' }) +
        hex(82, 118, 20, { stroke: P.muted, sw: 2.5 }) + hex(117, 138, 20, { stroke: P.muted, sw: 2.5 }) +
        V.text(100, 192, T(l, 'Looks alike?', 'Ähnelt es?'), { size: 13, fill: P.muted, bold: true }) +
        V.text(100, 150, '✕', { size: 64, fill: P.bad, cls: 'a-pop', delay: 1 }) +
        V.arrow(186, 130, 214, 130, { color: 'coral', cls: 'a-draw', delay: 1.4 }) +
        V.frame(220, 50, 160, 160, { label: T(l, 'Function', 'Funktion'), color: P.coral, cls: 'a-pop', delay: 1.7 }) +
        V.rect(272, 108, 56, 28, { r: 14, fill: P.ok, cls: 'a-pop', delay: 2 }) +
        V.line(262, 146, 338, 98, { stroke: P.coral, sw: 4, cls: 'a-draw', delay: 2.4 }) +
        V.text(300, 192, T(l, 'Does it kill?', 'Tötet es?'), { size: 13, fill: P.coral, bold: true, cls: 'a-fade', delay: 2.2 })) },

    { duration: 7000,
      caption: { en: '<b>The machine searched inside a human frame.</b> People set the question, training data and search space, and explained the hit afterwards.', de: '<b>Die Maschine suchte in einem menschlichen Frame.</b> Menschen setzten Frage, Trainingsdaten und Suchraum und erklärten den Treffer hinterher.' },
      svg: (l) => {
        const xs = [48, 124, 200, 276, 352];
        const names = de(l) ? ['Frage', 'Training', 'Datenbank', 'Suche', 'Deuten'] : ['Question', 'Training', 'Database', 'Search', 'Explain'];
        let s = '';
        xs.forEach((x, i) => {
          const d = .3 + i * .35;
          if (i === 3) s += V.group(V.rect(x - 26, 104, 52, 52, { fill: P.ink, r: 8 }) + V.text(x, 136, T(l, 'AI', 'KI'), { size: 16, fill: '#fff', bold: true }), { cls: 'a-pop', delay: d });
          else s += V.group(V.circle(x, 130, 26, { fill: P.paper, stroke: P.coral, sw: 2.5 }) + V.person(x, 140, { color: P.coral, scale: .6 }), { cls: 'a-pop', delay: d });
          s += V.text(x, 182, names[i], { size: 12, bold: true, cls: 'a-fade', delay: d + .1 });
          if (i < 4) s += V.arrow(x + 28, 130, xs[i + 1] - 28, 130, { color: 'ink', sw: 2, cls: 'a-draw', delay: d + .2 });
        });
        s += V.frame(10, 70, 380, 130, { label: T(l, 'Human frame', 'Menschlicher Frame'), color: P.coral, cls: 'a-fade', delay: 2.2 });
        return V.wrap(s + V.text(200, 238, T(l, 'The machine searches inside the frame', 'Die Maschine sucht im Frame'), { size: 13, bold: true, cls: 'a-fade', delay: 2.6 }));
      } },

    { duration: 6500,
      caption: { en: '<b>No bad frames, only bad fit.</b> Nokia read the phone through a telecom frame, Apple through a computing frame. The second fitted what users wanted.', de: '<b>Keine schlechten Frames, nur schlechter Fit.</b> Nokia sah das Handy durch einen Telekom-Frame, Apple durch einen Computer-Frame. Der zweite passte zu dem, was Nutzende wollten.' },
      svg: (l) => {
        const L = de(l) ? ['klein', 'billig', 'robust'] : ['small', 'cheap', 'robust'];
        const R = de(l) ? ['Software', 'Bedienung', 'Apps'] : ['software', 'ease of use', 'apps'];
        let s = V.frame(15, 45, 150, 165, { label: T(l, 'Telecom', 'Telekom'), color: P.muted, cls: 'a-fade', delay: .5 }) +
          V.frame(235, 45, 150, 165, { label: 'Computing', color: P.coral, cls: 'a-fade', delay: 1.2 });
        s += V.rect(184, 96, 32, 64, { r: 6, fill: P.ink, cls: 'a-pop' }) + V.rect(189, 104, 22, 42, { r: 2, fill: P.sky, stroke: P.sky, cls: 'a-pop' });
        s += L.map((t, i) => V.text(90, 92 + i * 26, t, { size: 13, fill: P.muted, bold: true, cls: 'a-fade', delay: .7 + i * .15 })).join('');
        s += R.map((t, i) => V.text(310, 92 + i * 26, t, { size: 13, fill: P.coral, bold: true, cls: 'a-fade', delay: 1.4 + i * .15 })).join('');
        s += V.rect(40, 180, 100, 12, { r: 6, fill: P.paper, stroke: P.line }) + V.rect(40, 180, 35, 12, { r: 6, fill: P.amber, stroke: P.amber, cls: 'a-fade', delay: 2 });
        s += V.rect(260, 180, 100, 12, { r: 6, fill: P.paper, stroke: P.line }) + V.rect(260, 180, 92, 12, { r: 6, fill: P.ok, stroke: P.ok, cls: 'a-fade', delay: 2.2 });
        return V.wrap(s + V.text(200, 242, T(l, 'Same device, different frame', 'Gleiches Gerät, anderer Frame'), { size: 13, bold: true, cls: 'a-fade', delay: 2.5 }));
      } },

    { duration: 7000,
      caption: { en: '<b>Two dead ends: the machine and the mob.</b> Hand decisions to algorithms, or to the gut. The book proposes a third path: framing.', de: '<b>Zwei Sackgassen: Maschine und Mob.</b> Entscheidungen an Algorithmen abgeben oder an den Bauch. Das Buch schlägt einen dritten Weg vor: Framing.' },
      svg: (l) => V.wrap(
        V.path('M200,245 L200,165', { stroke: P.ink, sw: 4, cls: 'a-draw' }) +
        V.path('M200,165 Q150,135 95,115', { stroke: P.muted, sw: 4, cls: 'a-draw', delay: .5 }) +
        V.path('M200,165 Q250,135 305,115', { stroke: P.muted, sw: 4, cls: 'a-draw', delay: .5 }) +
        V.line(84, 100, 100, 128, { stroke: P.bad, sw: 6, cls: 'a-pop', delay: 1.1 }) +
        V.line(316, 100, 300, 128, { stroke: P.bad, sw: 6, cls: 'a-pop', delay: 1.1 }) +
        V.text(70, 68, T(l, 'Machine', 'Maschine'), { size: 15, bold: true, cls: 'a-fade', delay: .8 }) +
        V.text(70, 86, T(l, 'data decides', 'Daten entscheiden'), { size: 12, fill: P.muted, cls: 'a-fade', delay: .8 }) +
        V.text(330, 68, 'Mob', { size: 15, bold: true, cls: 'a-fade', delay: .8 }) +
        V.text(330, 86, T(l, 'gut decides', 'Bauch entscheidet'), { size: 12, fill: P.muted, cls: 'a-fade', delay: .8 }) +
        V.path('M200,165 L200,68', { stroke: P.coral, sw: 5, cls: 'a-draw', delay: 1.5 }) +
        V.frame(145, 18, 110, 48, { color: P.coral, cls: 'a-pop', delay: 1.9 }) +
        V.text(200, 48, 'Framing', { size: 15, bold: true, fill: P.coral, cls: 'a-fade', delay: 2 })) },

    { duration: 6500,
      caption: { en: '<b>Framing works through three C.</b> Causality explains, counterfactuals imagine, constraints keep the imagining actionable: dreaming within limits.', de: '<b>Framing arbeitet mit drei C.</b> Kausalität erklärt, Kontrafaktisches denkt Alternativen, Constraints, also Begrenzungen, halten das handhabbar: Träumen in Grenzen.' },
      svg: (l) => V.wrap(V.threeC(200, 95, l) +
        [82, 200, 318].map((x, i) => V.text(x, 168, (de(l) ? 'Kapitel ' : 'Chapter ') + (i + 3), { size: 12, fill: P.muted, cls: 'a-fade', delay: 1 + i * .2 })).join('') +
        V.text(200, 222, T(l, 'Dreaming within limits', 'Träumen in Grenzen'), { size: 15, bold: true, cls: 'a-fade', delay: 1.8 })) },

    { duration: 7500,
      caption: { en: '<b>The map of what follows.</b> Chapters 2 to 5 build the model, 6 and 7 cover switching and learning, 8 and 9 move to society and vigilance.', de: '<b>Die Landkarte des Folgenden.</b> Kapitel 2 bis 5 bauen das Modell, 6 und 7 behandeln Wechseln und Lernen, 8 und 9 gehen zu Gesellschaft und Wachsamkeit.' },
      svg: (l) => {
        const names = de(l) ? ['Entscheiden', 'Framing', 'Kausalität', 'Kontrafakt.', 'Constraints', 'Reframing', 'Lernen', 'Pluralismus', 'Vigilanz'] : ['Decisions', 'Framing', 'Causality', 'Counterfact.', 'Constraints', 'Reframing', 'Learning', 'Pluralism', 'Vigilance'];
        const cols = [P.coral, P.sky, P.coral, P.teal, P.plum, P.amber, P.teal, P.sky, P.ink];
        let s = V.line(40, 110, 360, 110, { stroke: P.line, sw: 3, cls: 'a-draw' });
        names.forEach((n, i) => {
          const x = 40 + i * 40, d = .3 + i * .15;
          s += V.circle(x, 110, 14, { fill: cols[i], cls: i === 0 ? 'a-pulse' : 'a-pop', delay: d }) + V.text(x, 115, String(i + 1), { size: 13, fill: '#fff', bold: true, cls: 'a-fade', delay: d });
          s += V.text(x, i % 2 ? 148 : 84, n, { size: 12, bold: i === 0, cls: 'a-fade', delay: d + .1 });
        });
        s += V.path('M74,170 v8 H206 v-8', { stroke: P.muted, sw: 2, cls: 'a-draw', delay: 1.9 }) + V.text(140, 198, T(l, 'Apply a frame', 'Frame anwenden'), { size: 12, bold: true, cls: 'a-fade', delay: 2 });
        s += V.path('M234,170 v8 H286 v-8', { stroke: P.muted, sw: 2, cls: 'a-draw', delay: 2.2 }) + V.text(260, 220, T(l, 'Switch, learn', 'Wechseln, lernen'), { size: 12, bold: true, cls: 'a-fade', delay: 2.3 });
        s += V.path('M314,170 v8 H366 v-8', { stroke: P.muted, sw: 2, cls: 'a-draw', delay: 2.5 }) + V.text(340, 198, T(l, 'Society', 'Gesellschaft'), { size: 12, bold: true, cls: 'a-fade', delay: 2.6 });
        return V.wrap(s);
      } },
  ];

  /* ---------- section visuals ---------- */
  const visPhone = (l) => V.wrap(
    V.text(90, 40, T(l, 'Technology', 'Technik'), { size: 13, bold: true }) + V.text(310, 40, T(l, 'Use', 'Nutzung'), { size: 13, bold: true }) +
    V.rect(30, 70, 120, 40, { fill: P.paper }) + V.text(90, 95, T(l, 'Telephone', 'Telefon'), { size: 13, bold: true }) +
    V.rect(30, 160, 120, 40, { fill: P.paper }) + V.text(90, 185, T(l, 'Phonograph', 'Phonograph'), { size: 13, bold: true }) +
    V.rect(250, 70, 120, 40, { fill: P.paper }) + V.text(310, 95, T(l, 'Music', 'Musik'), { size: 13, bold: true }) +
    V.rect(250, 160, 120, 40, { fill: P.paper }) + V.text(310, 185, T(l, 'Speech', 'Sprache'), { size: 13, bold: true }) +
    V.arrow(152, 90, 248, 90, { color: 'muted', dash: '5 5', cls: 'a-draw', delay: .3 }) +
    V.arrow(152, 180, 248, 180, { color: 'muted', dash: '5 5', cls: 'a-draw', delay: .5 }) +
    V.text(200, 66, T(l, 'first idea', 'erste Idee'), { size: 12, fill: P.muted, cls: 'a-fade', delay: .6 }) +
    V.arrow(152, 100, 248, 170, { color: 'coral', cls: 'a-draw', delay: 1.3 }) +
    V.arrow(152, 170, 248, 100, { color: 'coral', cls: 'a-draw', delay: 1.5 }) +
    V.text(200, 232, T(l, 'flipped: then it caught on', 'vertauscht: erst dann Erfolg'), { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 2 }));

  const visFit = (l) => {
    const rows = [
      [T(l, 'Telecom', 'Telekom'), 'Smartphone', .35, P.amber, 'Nokia', ''],
      ['Computing', 'Smartphone', .92, P.ok, 'Apple', ''],
      [T(l, 'Class theory', 'Klassenlehre'), T(l, 'Farming', 'Ackerbau'), .05, P.bad, T(l, 'Lysenko', 'Lyssenko'), T(l, 'famine', 'Hungersnot')],
    ];
    let s = V.text(75, 40, T(l, 'Frame from', 'Frame aus'), { size: 12, fill: P.muted, bold: true }) + V.text(215, 40, T(l, 'applied to', 'angewandt auf'), { size: 12, fill: P.muted, bold: true }) + V.text(337, 40, 'Fit', { size: 12, fill: P.muted, bold: true });
    rows.forEach((r, i) => {
      const y = 80 + i * 62, d = .3 + i * .5;
      s += V.group(V.pill(75, y, r[0], { fill: P.ink, w: 112 }) + V.arrow(133, y, 158, y, { color: 'ink', sw: 2 }) +
        V.rect(162, y - 15, 106, 30, { fill: P.paper, stroke: P.line }) + V.text(215, y + 5, r[1], { size: 12, bold: true }) +
        V.rect(290, y - 8, 95, 16, { fill: P.paper, stroke: P.line, r: 8 }) + V.rect(290, y - 8, Math.max(8, 95 * r[2]), 16, { fill: r[3], stroke: r[3], r: 8 }) +
        V.text(75, y + 30, r[4], { size: 12, fill: P.muted }) + (r[5] ? V.text(337, y + 30, r[5], { size: 12, fill: P.bad, bold: true }) : ''), { cls: 'a-fade', delay: d });
    });
    return V.wrap(s);
  };

  const visLineage = (l) => {
    const left = de(l) ? ['Descartes · 17. Jh.', 'Taylor · um 1900', 'KI entscheidet'] : ['Descartes · 1600s', 'Taylor · c. 1900', 'AI decides'];
    const right = de(l) ? ['Rousseau · 18. Jh.', 'Welch · um 2000', 'Bauch und Lager'] : ['Rousseau · 1700s', 'Welch · c. 2000', 'Gut and tribe'];
    let s = V.text(80, 32, T(l, 'Machine', 'Maschine'), { size: 14, bold: true }) + V.text(80, 50, T(l, 'hyper-rationalists', 'hyperrationalistisch'), { size: 12, fill: P.muted }) +
      V.text(320, 32, 'Mob', { size: 14, bold: true }) + V.text(320, 50, T(l, 'emotionalists', 'emotionalistisch'), { size: 12, fill: P.muted });
    [0, 1, 2].forEach(i => {
      const y = 85 + i * 52, d = .3 + i * .4;
      s += V.pill(80, y, left[i], { fill: i === 2 ? P.ink : P.muted, w: 136, cls: 'a-fade', delay: d }) + V.pill(320, y, right[i], { fill: i === 2 ? P.ink : P.muted, w: 136, cls: 'a-fade', delay: d });
      if (i < 2) s += V.arrow(80, y + 14, 80, y + 36, { color: 'muted', sw: 2, cls: 'a-draw', delay: d + .2 }) + V.arrow(320, y + 14, 320, y + 36, { color: 'muted', sw: 2, cls: 'a-draw', delay: d + .2 });
    });
    s += V.frame(158, 72, 84, 126, { label: 'Framing', color: P.coral, cls: 'a-pop', delay: 1.6 }) +
      V.text(200, 132, T(l, 'third', 'dritter'), { size: 14, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.8 }) +
      V.text(200, 152, T(l, 'path', 'Weg'), { size: 14, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.8 });
    return V.wrap(s + V.text(200, 238, T(l, 'Not a blend, a third capacity', 'Keine Mischung, sondern ein Drittes'), { size: 13, bold: true, cls: 'a-fade', delay: 2.2 }));
  };

  const visAlpha = (l) => V.wrap(
    V.text(62, 50, T(l, 'Machine', 'Maschine'), { size: 13, bold: true, fill: P.muted }) + V.text(300, 50, T(l, 'Humans', 'Menschen'), { size: 13, bold: true, fill: P.coral }) +
    V.rect(15, 80, 95, 90, { fill: P.ink, cls: 'a-pop' }) + V.text(62, 112, 'AlphaZero', { size: 13, fill: '#fff', bold: true, cls: 'a-fade' }) + V.text(62, 152, '?', { size: 28, fill: '#fff', bold: true, cls: 'a-fade', delay: .3 }) +
    V.arrow(114, 125, 140, 125, { color: 'ink', sw: 2, cls: 'a-draw', delay: .5 }) +
    V.dots(14, 146, 100, 48, 46, { seed: 9, fill: P.ink, r: 4, cls: 'a-pop', stagger: .05 }) + V.text(170, 172, T(l, 'moves', 'Züge'), { size: 12, bold: true, cls: 'a-fade', delay: .9 }) +
    V.arrow(200, 125, 224, 125, { color: 'ink', sw: 2, cls: 'a-draw', delay: 1.1 }) +
    V.person(245, 140, { color: P.coral, cls: 'a-pop', delay: 1.3 }) +
    V.arrow(264, 125, 284, 125, { color: 'coral', sw: 2, cls: 'a-draw', delay: 1.5 }) +
    V.pill(340, 100, T(l, 'mobility', 'Mobilität'), { fill: P.coral, w: 104, cls: 'a-pop', delay: 1.7 }) +
    V.pill(340, 138, T(l, 'sacrifice', 'Opfer'), { fill: P.coral, w: 104, cls: 'a-pop', delay: 1.9 }) +
    V.text(340, 178, T(l, 'concepts', 'Begriffe'), { size: 12, bold: true, cls: 'a-fade', delay: 2 }) +
    V.text(200, 232, T(l, 'Only concepts transfer to new games', 'Nur Begriffe lassen sich übertragen'), { size: 13, bold: true, cls: 'a-fade', delay: 2.3 }));

  const visFunnel = (l) => V.wrap(
    V.path('M30,30 H370 L338,80 H62 Z', { fill: P.coral, stroke: P.coral, cls: 'a-fade' }) +
    V.text(200, 61, T(l, '2,300 training molecules', '2.300 Trainingsmoleküle'), { size: 13, fill: '#fff', bold: true, cls: 'a-fade' }) +
    V.path('M64,86 H336 L300,136 H100 Z', { fill: P.ink, stroke: P.ink, cls: 'a-fade', delay: .6 }) +
    V.text(200, 117, T(l, '6,000 + 100M screened', '6.000 + 100 Mio. geprüft'), { size: 13, fill: '#fff', bold: true, cls: 'a-fade', delay: .6 }) +
    V.path('M102,142 H298 L262,192 H138 Z', { fill: P.coral, stroke: P.coral, cls: 'a-fade', delay: 1.2 }) +
    V.text(200, 173, T(l, '1 hit: halicin', '1 Treffer: Halicin'), { size: 13, fill: '#fff', bold: true, cls: 'a-fade', delay: 1.2 }) +
    V.pill(130, 228, T(l, 'human', 'Mensch'), { fill: P.coral, w: 96, cls: 'a-pop', delay: 1.6 }) +
    V.pill(270, 228, T(l, 'machine', 'Maschine'), { fill: P.ink, w: 96, cls: 'a-pop', delay: 1.8 }));

  window.FRAMERS.register({
    id: 'u01', number: 1, kind: 'chapter', color: '#E4572E', minutes: 30,
    title: { en: 'Decisions', de: 'Entscheidungen' },
    tagline: { en: 'Human power comes neither from muscle nor from raw intellect, but from the models through which we see.', de: 'Menschliche Handlungsmacht kommt weder aus Muskeln noch aus bloßem Verstand, sondern aus den Modellen, durch die wir sehen.' },
    icon: (c) => `<svg viewBox="0 0 44 44"><path d="M22 40 V24 M22 24 L9 11 M22 24 L35 11" stroke="#8A8F98" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M22 24 V8" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/><rect x="14" y="3" width="16" height="10" rx="3" fill="none" stroke="${c}" stroke-width="2.5"/></svg>`,
    hook: {
      en: '<p>In early 2020 the <em>Financial Times</em> announced on its front page that AI had discovered a new antibiotic. The researcher behind it, Regina Barzilay, tells it differently: people chose the question, the training data and the search space, and afterwards explained the result. Which story is true depends on how you frame the event. That is the chapter in miniature.</p><p>Chapter 1 makes a large claim and picks two opponents. The claim: human power rests on the mental models through which we see. The opponents: those who want machines to decide for us, and those who want the gut to decide.</p>',
      de: '<p>Anfang 2020 meldete die <em>Financial Times</em> auf der Titelseite, eine KI habe ein neues Antibiotikum entdeckt. Die Forscherin dahinter, Regina Barzilay, erzählt es anders: Menschen wählten die Frage, die Trainingsdaten und den Suchraum und erklärten hinterher das Ergebnis. Welche Geschichte stimmt, hängt davon ab, wie du das Ereignis framst. Das ist das Kapitel im Kleinen.</p><p>Kapitel 1 stellt eine große These auf und wählt zwei Gegner. Die These: Menschliche Handlungsmacht beruht auf den mentalen Modellen, durch die wir sehen. Die Gegner: alle, die Maschinen für uns entscheiden lassen wollen, und alle, die den Bauch entscheiden lassen wollen.</p>'
    },
    objectives: [
      { en: 'Explain what a frame does (filter, explain, generalise, imagine) and why it shapes the options before any data is weighed.', de: 'Erklären, was ein Frame leistet (filtern, erklären, verallgemeinern, sich vorstellen) und warum er die Optionen prägt, bevor irgendwelche Daten gewichtet werden.' },
      { en: 'Distinguish a misfitting frame from a bad frame and apply the distinction to Nokia, Lysenkoism and a case from your own work.', de: 'Einen unpassenden Frame von einem schlechten Frame unterscheiden und die Unterscheidung auf Nokia, den Lyssenkoismus und einen Fall aus deiner eigenen Arbeit anwenden.' },
      { en: 'Recognise hyper-rationalist and emotionalist moves in real decisions and argue why the authors offer framing as a third path rather than a compromise.', de: 'Hyperrationalistische und emotionalistische Züge in realen Entscheidungen erkennen und begründen, warum die Autoren Framing als dritten Weg anbieten und nicht als Kompromiss.' },
    ],
    film: { title: { en: 'From signal flood to framing: chapter 1 in eight scenes', de: 'Von der Signalflut zum Framing: Kapitel 1 in acht Szenen' }, scenes },
    sections: [
      { id: 's1', heading: { en: 'What mental models do, mostly unnoticed', de: 'Was mentale Modelle tun, meist unbemerkt' },
        body: {
          en: '<p>A mental model is a simplified representation of how some part of the world works. It does four jobs at once. It <strong>filters</strong>: at a loud party you follow one conversation and tune out the rest. It <strong>explains</strong>: it says what causes what. It <strong>generalises</strong>: one experience becomes a rule for situations you have not met yet. And it lets you <strong>see what is not there</strong>, so you can ask “what if?”. The Wright brothers did not get the airplane out of bicycle parts by collecting more data; they needed a model of flight. The authors call the models we choose and apply <em>frames</em>.</p><p>Frames run in the background. You notice them when the stakes rise (changing jobs, closing a plant) or when two people look at the same facts and disagree. In the US mask debate, one side applied a health frame, the other a freedom frame: same data, opposite conclusions. Colin Kaepernick kneeling during the anthem was a quiet protest in one frame and contempt for the country in another. The dispute was about meaning, not about what happened.</p><p>Frames even decide what a technology is for. The telephone was first imagined as a way to hear concerts remotely, the phonograph as a dictation machine for sending messages. Both caught on only once the uses were swapped. The hardware stayed the same; the frame changed.</p>',
          de: '<p>Ein mentales Modell ist eine vereinfachte Darstellung davon, wie ein Ausschnitt der Welt funktioniert. Es erledigt vier Aufgaben zugleich. Es <strong>filtert</strong>: Auf einer lauten Party folgst du einem Gespräch und blendest den Rest aus. Es <strong>erklärt</strong>: Es sagt, was was verursacht. Es <strong>verallgemeinert</strong>: Aus einer Erfahrung wird eine Regel für Situationen, die du noch nicht erlebt hast. Und es lässt dich <strong>sehen, was nicht da ist</strong>, sodass du fragen kannst: „Was wäre, wenn?“ Die Brüder Wright kamen nicht durch mehr Daten von Fahrradteilen zum Flugzeug; sie brauchten ein Modell des Fliegens. Die Modelle, die wir wählen und anwenden, nennen die Autoren <em>Frames</em>.</p><p>Frames laufen im Hintergrund. Du bemerkst sie, wenn viel auf dem Spiel steht (Jobwechsel, Werksschließung) oder wenn zwei Menschen dieselben Fakten sehen und widersprechen. In der US-Maskendebatte nutzte die eine Seite einen Gesundheits-Frame, die andere einen Freiheits-Frame: gleiche Daten, gegensätzliche Schlüsse. Colin Kaepernicks Kniefall während der Hymne war im einen Frame stiller Protest, im anderen Verachtung des Landes. Gestritten wurde über die Bedeutung, nicht über das Geschehen.</p><p>Frames entscheiden sogar, wofür eine Technik da ist. Das Telefon war zuerst gedacht, um Konzerte aus der Ferne zu hören, der Phonograph als Diktiergerät für Botschaften. Beide setzten sich erst durch, als die Nutzungen vertauscht wurden. Die Geräte blieben gleich; der Frame änderte sich.</p>'
        },
        visual: { position: 'bottom', svg: visPhone,
          caption: { en: 'Two technologies, two uses, crossed over. The frame decided what each device was for, not the hardware.', de: 'Zwei Techniken, zwei Nutzungen, über Kreuz getauscht. Der Frame entschied, wofür ein Gerät da ist, nicht die Hardware.' } },
        keyIdea: { en: 'Many disputes that look like disputes about facts are disputes about frames. Name the frames first, then argue.', de: 'Viele Streitigkeiten, die wie Streit über Fakten aussehen, sind Streit über Frames. Benenne zuerst die Frames, dann diskutiere.' } },

      { id: 's2', heading: { en: 'No bad frames, only misfit', de: 'Keine schlechten Frames, nur Misfit' },
        body: {
          en: '<p>Early on, the authors make a strong normative move: no frame is bad in itself, but frames can fit a situation badly. A fifteenth-century anatomy book matched organs to signs of the zodiac. Elegant symmetry, no cures; it was dropped once better frames arrived.</p><p><strong>Nokia vs. Apple.</strong> In 2008 Nokia led the market. Its frame came from telecom: phones should get smaller, cheaper and more reliable. Inside that frame the iPhone (bulkier, pricier, buggier) looked like a mistake. Apple’s frame came from computing: ease of use and features extensible by software. That frame matched what people wanted. Nokia lacked neither data nor engineers; it lacked fit.</p><p><strong>Lysenkoism.</strong> In the Soviet Union of the 1930s, an idea from class theory was applied to plants: crops of one kind would not compete, so they could be sown densely. The biologist Nikolai Vavilov criticised this and was sentenced to death. Yields collapsed and the policy fed into famines. Read sociologically, this is as much a story about power as about cognition: the frame survived because dissent was punished. The book mostly tells it as a cognitive misfit.</p><p>This points to the one exception announced here and developed in chapter 8: the only bad frame is one that denies other frames. And a distinction from Thomas Kuhn: every paradigm shift is a reframing, but most reframings are small and local.</p>',
          de: '<p>Früh setzen die Autoren eine starke normative Marke: Kein Frame ist an sich schlecht, aber Frames können schlecht zu einer Situation passen. Ein Anatomiebuch aus dem 15. Jahrhundert ordnete Organe Tierkreiszeichen zu. Elegante Symmetrie, keine Heilung; es verschwand, als bessere Frames kamen.</p><p><strong>Nokia gegen Apple.</strong> 2008 führte Nokia den Markt. Sein Frame stammte aus der Telekommunikation: Handys sollen kleiner, billiger und zuverlässiger werden. In diesem Frame wirkte das iPhone (klobiger, teurer, fehleranfälliger) wie ein Irrtum. Apples Frame stammte aus der Computerbranche: einfache Bedienung, Funktionen per Software erweiterbar. Dieser Frame traf, was Menschen wollten. Nokia fehlten weder Daten noch Ingenieurinnen und Ingenieure; es fehlte der Fit.</p><p><strong>Lyssenkoismus.</strong> In der Sowjetunion der 1930er-Jahre wurde eine Idee aus der Klassenlehre auf Pflanzen übertragen: Pflanzen derselben Art konkurrieren nicht, also kann man sie dicht säen. Der Biologe Nikolai Wawilow widersprach und wurde zum Tode verurteilt. Die Erträge brachen ein, die Politik trug zu Hungersnöten bei. Soziologisch gelesen ist das ebenso eine Geschichte über Macht wie über Kognition: Der Frame überlebte, weil Widerspruch bestraft wurde. Das Buch erzählt sie vor allem als kognitiven Misfit.</p><p>Das deutet auf die eine Ausnahme, die hier angekündigt und in Kapitel 8 ausgeführt wird: Der einzige schlechte Frame ist einer, der andere Frames leugnet. Und eine Abgrenzung zu Thomas Kuhn: Jeder Paradigmenwechsel ist ein Reframing, aber die meisten Reframings sind klein und lokal.</p>'
        },
        visual: { position: 'bottom', svg: visFit,
          caption: { en: 'Fit is a relation between a frame and a domain, not a property of the frame. Nokia’s frame was not wrong, it fitted the new market less. Lysenko’s did not fit biology at all.', de: 'Fit ist eine Beziehung zwischen Frame und Gegenstand, keine Eigenschaft des Frames. Nokias Frame war nicht falsch, er passte weniger zum neuen Markt. Lyssenkos passte überhaupt nicht zur Biologie.' } },
        keyIdea: { en: 'Ask “does this frame fit this domain?”, not “is this frame right?”.', de: 'Frag „passt dieser Frame zu diesem Gegenstand?“, nicht „ist dieser Frame richtig?“.' } },

      { id: 's3', heading: { en: 'Dreaming within limits: the three C and the route through the book', de: 'Träumen in Grenzen: die drei C und der Weg durch das Buch' },
        body: {
          en: '<p>Frames do two jobs (chapter 2). In new or changed situations they generate options. In familiar ones they narrow attention and cut cognitive load, which is at least as valuable. Both jobs rest on three elements:</p><ul><li><strong>Causality</strong> (chapter 3): we read the world as cause and effect. Often wrong in detail, but it makes the world predictable enough to act on.</li><li><strong>Counterfactuals</strong> (chapter 4): imagined alternatives to what is. Pretend play in children, experiments in science, scenarios in strategy.</li><li><strong>Constraints</strong> (chapter 5): limits that keep imagination actionable. With a flat tyre you think about the jack in the boot, not about antigravity.</li></ul><p>Then the book turns to switching frames (chapter 6: take one from your repertoire, repurpose one from another domain, or invent a new one), to becoming a better framer (chapter 7: a broader repertoire, “cognitive foraging”, the courage to leap), to societies (chapter 8: pluralism of frames) and to vigilance (chapter 9). The authors’ formula for the whole package is dreaming within limits: imagination is the engine, constraints are the steering.</p>',
          de: '<p>Frames erledigen zwei Aufgaben (Kapitel 2). In neuen oder veränderten Lagen erzeugen sie Optionen. In vertrauten Lagen bündeln sie die Aufmerksamkeit und senken die kognitive Last, was mindestens ebenso wertvoll ist. Beides beruht auf drei Elementen:</p><ul><li><strong>Kausalität</strong> (Kapitel 3): Wir lesen die Welt als Ursache und Wirkung. Im Detail oft falsch, aber es macht die Welt so vorhersehbar, dass wir handeln können.</li><li><strong>Kontrafaktisches Denken</strong> (Kapitel 4): vorgestellte Alternativen zum Bestehenden. Rollenspiele von Kindern, Experimente in der Wissenschaft, Szenarien in der Strategie.</li><li><strong>Constraints, also Begrenzungen</strong> (Kapitel 5): Grenzen, die die Vorstellung handlungsfähig halten. Bei einer Reifenpanne denkst du an den Wagenheber im Kofferraum, nicht an Antigravitation.</li></ul><p>Danach geht das Buch zum Wechseln von Frames (Kapitel 6: einen aus dem Repertoire nehmen, einen aus einem anderen Feld umnutzen oder einen neu erfinden), zum besseren Framen (Kapitel 7: breiteres Repertoire, Cognitive Foraging, also kognitives Sammeln, und der Mut zum Sprung), zu Gesellschaften (Kapitel 8: Frame-Pluralismus) und zur Wachsamkeit (Kapitel 9). Die Formel der Autoren für das Ganze lautet: Träumen in Grenzen. Die Vorstellungskraft ist der Motor, die Constraints sind die Lenkung.</p>'
        },
        keyIdea: { en: 'Imagination without constraints produces daydreams; constraints without imagination produce routine. Framing needs both.', de: 'Vorstellung ohne Constraints erzeugt Tagträume; Constraints ohne Vorstellung erzeugen Routine. Framing braucht beides.' } },

      { id: 's4', heading: { en: 'The machine and the mob: two dead ends', de: 'Maschine und Mob: zwei Sackgassen' },
        body: {
          en: '<p>The book sets framing against two camps that, in different ways, give up on human judgement.</p><p><strong>Hyper-rationalists</strong> trust data and algorithms and would like everyday judgement, from routing deliveries to policing, to move into machines, because people seem too biased to decide well. <strong>Emotionalists</strong> argue the reverse: we suffer from too much cold analysis and should trust instinct, belonging and the felt rightness of our convictions, with sharp lines towards “others”. The authors see this in right-wing populism (governing as a feeling) and on parts of the left that try to silence critics.</p><p>The tension is old. Descartes stood for order, method and evidence (think of symmetrical French gardens). A century later Rousseau claimed that his wrongs came from reflection and his good deeds from impulse (think of the rambling English park). In management the pendulum swung from Taylor’s stopwatch to Jack Welch’s memoir, subtitled <em>Straight from the Gut</em>.</p><p>Two moves matter. First, the authors grant both camps a partial truth but reject them as foundations. Second, they reject the compromise as well: blending two unsound foundations only preserves a fragile tension. Framing is presented as a third capacity, not as the midpoint between data and gut.</p>',
          de: '<p>Das Buch stellt Framing gegen zwei Lager, die auf je eigene Weise das menschliche Urteil aufgeben.</p><p>Das <strong>hyperrationalistische Lager</strong> vertraut Daten und Algorithmen und möchte das Alltagsurteil, von der Lieferroute bis zur Polizeiarbeit, in Maschinen verlagern, weil Menschen zu verzerrt urteilen. Das <strong>emotionalistische Lager</strong> argumentiert umgekehrt: Wir leiden an zu viel kalter Analyse und sollten Instinkt, Zugehörigkeit und dem gefühlten Rechthaben vertrauen, mit scharfen Grenzen gegenüber „den anderen“. Die Autoren sehen das im Rechtspopulismus (Regieren als Gefühl) und in Teilen der Linken, die Kritik zum Schweigen bringen wollen.</p><p>Die Spannung ist alt. Descartes stand für Ordnung, Methode und Evidenz (denk an symmetrische französische Gärten). Ein Jahrhundert später schrieb Rousseau, sein Schlechtes sei aus Nachdenken entstanden und sein Gutes aus dem Impuls (denk an den verwinkelten englischen Landschaftspark). Im Management schwang das Pendel von Taylors Stoppuhr zu Jack Welchs Memoiren mit dem Untertitel <em>Straight from the Gut</em>.</p><p>Zwei Schritte sind entscheidend. Erstens gestehen die Autoren beiden Lagern eine Teilwahrheit zu, lehnen sie aber als Fundament ab. Zweitens lehnen sie auch den Kompromiss ab: Zwei unsolide Fundamente zu mischen, erhält nur eine fragile Spannung. Framing erscheint als dritte Fähigkeit, nicht als Mitte zwischen Daten und Bauch.</p>'
        },
        visual: { position: 'bottom', svg: visLineage,
          caption: { en: 'Two lineages of one old tension. Framing is drawn as a separate path, not as a point on the scale between them.', de: 'Zwei Linien einer alten Spannung. Framing steht als eigener Weg daneben, nicht als Punkt auf der Skala dazwischen.' } },
        keyIdea: { en: 'Framing is not the average of data and gut. It is the step before both: deciding how to see the problem.', de: 'Framing ist nicht der Mittelwert aus Daten und Bauch. Es ist der Schritt davor: entscheiden, wie das Problem zu sehen ist.' } },

      { id: 's5', heading: { en: 'Why the machine cannot frame, and why the authors are no optimists', de: 'Warum die Maschine nicht framen kann und warum die Autoren keine Optimisten sind' },
        body: {
          en: '<p><strong>AlphaZero</strong> (DeepMind, 2018) learned chess, Go and shogi from the rules and self-play alone. After nine hours and about 44 million games of chess it beat Stockfish, the strongest chess engine, with moves grandmasters found alien: mobility over position, sacrifices without hesitation. Did it invent a new strategy? The authors say no. The system cannot explain or transfer what it does; it is a black box, to us and to itself. People looked at its games and formed the concepts, such as “mobility beats position”, which they can now teach and use elsewhere. Their short version: AI answers the questions it is given, framers ask new ones.</p><p>The chapter then turns against easy optimism. Projects like Our World in Data show steady improvement, and the authors accept that change in the world starts with a change in the mind: what is without starts from within. But they diagnose a <strong>pathology of progress</strong>: our successes produce the next threats (arms races, climate, a growing global underclass). And successful framing breeds its own danger, the belief in a <strong>single frame of truth</strong>, from the Inquisition to Soviet collectivism. The lesson usually drawn from such failures is that the frame was wrong, rarely that it was alone.</p>',
          de: '<p><strong>AlphaZero</strong> (DeepMind, 2018) lernte Schach, Go und Shogi allein aus den Regeln und Partien gegen sich selbst. Nach neun Stunden und rund 44 Millionen Schachpartien schlug es Stockfish, das stärkste Schachprogramm, mit Zügen, die Spitzenspielenden fremd vorkamen: Mobilität vor Stellung, Opfer ohne Zögern. Hat es eine neue Strategie erfunden? Die Autoren sagen nein. Das System kann nicht erklären oder übertragen, was es tut; es ist eine Blackbox, für uns und für sich selbst. Menschen schauten auf die Partien und bildeten die Begriffe, etwa „Mobilität schlägt Stellung“, die sie nun lehren und anderswo anwenden können. Ihre Kurzform: KI beantwortet die Fragen, die man ihr stellt; Framer stellen neue.</p><p>Danach wendet sich das Kapitel gegen bequemen Optimismus. Projekte wie Our World in Data zeigen stetige Verbesserung, und die Autoren teilen den Gedanken, dass Wandel in der Welt mit Wandel im Kopf beginnt: Was außen ist, beginnt innen. Aber sie diagnostizieren eine <strong>Pathologie des Fortschritts</strong>: Unsere Erfolge erzeugen die nächsten Bedrohungen (Wettrüsten, Klima, eine wachsende globale Unterschicht). Und erfolgreiches Framing erzeugt eine eigene Gefahr, den Glauben an einen <strong>einzigen Frame der Wahrheit</strong>, von der Inquisition bis zur sowjetischen Kollektivierung. Aus solchen Fehlschlägen wird meist gelernt, dass der Frame falsch war, selten, dass er allein war.</p>'
        },
        visual: { position: 'bottom', svg: visAlpha,
          caption: { en: 'The moves came from the machine, the concepts from people. Only concepts travel to new situations, which is the authors’ case against “the AI invented a strategy”.', de: 'Die Züge kamen von der Maschine, die Begriffe von Menschen. Nur Begriffe wandern in neue Situationen; das ist das Argument der Autoren gegen „die KI hat eine Strategie erfunden“.' } },
        keyIdea: { en: 'Single frames fail less because of their content than because of their monopoly.', de: 'Einzelne Frames scheitern weniger an ihrem Inhalt als an ihrem Monopol.' } },
    ],

    exercise: {
      type: 'scenario',
      title: { en: 'Machine, mob or framing? Four leadership decisions', de: 'Maschine, Mob oder Framing? Vier Führungsentscheidungen' },
      instructions: { en: 'Each situation offers three responses. One follows the hyper-rationalist logic, one the emotionalist logic or the blend the book also rejects, one starts with the frame. Choose what you would do. The feedback names the stance and the book’s argument. The framing option is not always the most comfortable one, and it never refuses data.', de: 'Jede Situation bietet drei Reaktionen. Eine folgt der hyperrationalistischen Logik, eine der emotionalistischen oder der Mischung, die das Buch ebenfalls ablehnt, eine beginnt beim Frame. Wähle, was du tun würdest. Das Feedback benennt die Haltung und das Argument des Buchs. Die Framing-Option ist nicht immer die bequemste, und sie verweigert nie Daten.' },
      steps: [
        { situation: { en: 'Attrition in your distributed product team has doubled within a year. The executive board wants a plan in four weeks.', de: 'Die Fluktuation in deinem verteilt arbeitenden Produktteam hat sich binnen eines Jahres verdoppelt. Die Geschäftsführung will in vier Wochen einen Plan.' },
          options: [
            { text: { en: 'Buy a people-analytics tool that scores each person’s flight risk and automatically triggers a retention bonus above a threshold.', de: 'Ein People-Analytics-Tool kaufen, das für jede Person ein Abwanderungsrisiko berechnet und ab einem Schwellenwert automatisch einen Haltebonus auslöst.' },
              feedback: { en: '<strong>Hyper-rationalist.</strong> The tool works, but only inside a frame nobody chose consciously: attrition as an individual pay-and-risk problem. If people leave because of how decisions are made in the team, the model optimises the wrong variable with great precision.', de: '<strong>Hyperrationalistisch.</strong> Das Tool funktioniert, aber nur in einem Frame, den niemand bewusst gewählt hat: Fluktuation als individuelles Geld-und-Risiko-Problem. Wenn Menschen gehen, weil Entscheidungen im Team auf eine bestimmte Weise fallen, optimiert das Modell sehr präzise die falsche Größe.' } },
            { text: { en: 'Before collecting more data, write down three competing explanations (pay, how work is organised, loss of belonging) and check which one the exit interviews actually support.', de: 'Bevor du weitere Daten sammelst, drei konkurrierende Erklärungen aufschreiben (Vergütung, Organisation der Arbeit, verlorene Zugehörigkeit) und prüfen, welche die Austrittsgespräche tatsächlich stützen.' },
              feedback: { en: '<strong>Framing.</strong> You make competing causal models explicit and compare them before deciding which data matters. Analytics still has a place, but inside a frame you chose deliberately. This is the halicin move: settle the question before you start the search.', de: '<strong>Framing.</strong> Du machst konkurrierende Kausalmodelle sichtbar und vergleichst sie, bevor du entscheidest, welche Daten zählen. Analytics hat weiter Platz, aber in einem bewusst gewählten Frame. Das ist der Halicin-Zug: erst die Frage klären, dann suchen.' }, good: true },
            { text: { en: 'The division head senses a loyalty problem: commit to a strong “we” culture, an all-hands event, and a clear line towards those who “never really belonged”.', de: 'Die Bereichsleitung spürt ein Loyalitätsproblem: starke Wir-Kultur, ein großes Team-Event und eine klare Linie gegenüber denen, die „nie richtig dazugehört haben“.' },
              feedback: { en: '<strong>Emotionalist.</strong> Felt certainty, in-group bonding, boundaries towards “others”: exactly the pattern the authors describe. It may energise those who stay, but nobody tests whether loyalty is the cause at all.', de: '<strong>Emotionalistisch.</strong> Gefühlte Gewissheit, Bindung nach innen, Abgrenzung gegen „die anderen“: genau das Muster, das die Autoren beschreiben. Es mag die Bleibenden mobilisieren, aber niemand prüft, ob Loyalität überhaupt die Ursache ist.' } },
          ] },
        { situation: { en: 'The board wants to roll out an AI assistant to 2,000 employees and asks you where to start.', de: 'Der Vorstand will einen KI-Assistenten für 2.000 Mitarbeitende einführen und fragt dich, wo ihr anfangen sollt.' },
          options: [
            { text: { en: 'The CEO is convinced: “AI is the future, whoever hesitates slows us down.” Full rollout everywhere; sceptics are treated as blockers.', de: 'Die Vorstandsspitze ist überzeugt: „KI ist die Zukunft, wer zögert, bremst uns.“ Vollständiger Rollout überall; Skeptische gelten als Blockierende.' },
              feedback: { en: '<strong>Emotionalist.</strong> Conviction replaces reasoning, and disagreement becomes a group boundary. Note that this can look like bold leadership. The book’s objection is not the speed but the absence of any examined model of what AI is supposed to change.', de: '<strong>Emotionalistisch.</strong> Überzeugung ersetzt Begründung, und Widerspruch wird zur Gruppengrenze. Das kann wie mutige Führung aussehen. Der Einwand des Buchs richtet sich nicht gegen das Tempo, sondern gegen das Fehlen eines geprüften Modells davon, was KI verändern soll.' } },
            { text: { en: 'Let the vendor’s usage dashboard decide: after a pilot, expand wherever prompts per user are highest.', de: 'Das Nutzungsdashboard des Anbieters entscheiden lassen: nach einem Pilot dort ausweiten, wo die Prompts pro Person am höchsten sind.' },
              feedback: { en: '<strong>Hyper-rationalist.</strong> A usage metric is a frame in disguise: AI as a tool whose success equals usage. It cannot tell whether heavy use improves decisions or just produces more text. The metric looks neutral because its frame is invisible.', de: '<strong>Hyperrationalistisch.</strong> Eine Nutzungskennzahl ist ein verkleideter Frame: KI als Werkzeug, dessen Erfolg gleich Nutzung ist. Sie kann nicht unterscheiden, ob viel Nutzung Entscheidungen verbessert oder nur mehr Text erzeugt. Die Kennzahl wirkt neutral, weil ihr Frame unsichtbar ist.' } },
            { text: { en: 'Put two frames side by side for the board: “introducing a tool” versus “changing who decides what, with which information”. Each suggests different starting points, risks and measures. Choose deliberately.', de: 'Dem Vorstand zwei Frames nebeneinanderlegen: „ein Werkzeug einführen“ gegenüber „verändern, wer was mit welchen Informationen entscheidet“. Jeder legt andere Startpunkte, Risiken und Messgrößen nahe. Bewusst wählen.' },
              feedback: { en: '<strong>Framing.</strong> Both frames are legitimate, but they make different options visible: training and licences in the first, decision rights and accountability in the second. Choosing the frame is the leadership decision; the dashboard comes afterwards and measures what the chosen frame defines as success.', de: '<strong>Framing.</strong> Beide Frames sind legitim, aber sie machen unterschiedliche Optionen sichtbar: Schulung und Lizenzen im ersten, Entscheidungsrechte und Verantwortung im zweiten. Die Wahl des Frames ist die eigentliche Führungsentscheidung; das Dashboard kommt danach und misst, was der gewählte Frame als Erfolg definiert.' }, good: true },
          ] },
        { situation: { en: 'Your largest client cuts its volume by 40 percent. The revenue gap hits next quarter.', de: 'Euer größter Kunde kürzt sein Volumen um 40 Prozent. Die Umsatzlücke schlägt im nächsten Quartal durch.' },
          options: [
            { text: { en: 'First ask whether this is a cost problem or a dependency problem. In the dependency frame, cuts are one option among several; new segments, partnerships or a different offer become visible. Then calculate inside the chosen frame.', de: 'Zuerst fragen, ob das ein Kostenproblem oder ein Abhängigkeitsproblem ist. Im Abhängigkeits-Frame sind Kürzungen eine Option unter mehreren; neue Segmente, Partnerschaften oder ein anderes Angebot werden sichtbar. Danach im gewählten Frame rechnen.' },
              feedback: { en: '<strong>Framing.</strong> The same numbers support different stories. In the cost frame the options are cuts; in the dependency frame they include diversification. The framing option does not refuse to calculate; it decides what the calculation is for.', de: '<strong>Framing.</strong> Dieselben Zahlen tragen verschiedene Geschichten. Im Kosten-Frame sind die Optionen Kürzungen; im Abhängigkeits-Frame gehört Diversifizierung dazu. Die Framing-Option verweigert das Rechnen nicht; sie entscheidet, wofür gerechnet wird.' }, good: true },
            { text: { en: 'Run a scenario model and let an optimisation algorithm rank positions by cost-to-contribution ratio.', de: 'Ein Szenariomodell rechnen und einen Optimierungsalgorithmus Stellen nach Kosten-Beitrags-Verhältnis reihen lassen.' },
              feedback: { en: '<strong>Hyper-rationalist.</strong> Precise and fast, and the decision about what kind of problem this is has already been made silently: a cost problem. The algorithm searches very well in a space nobody chose.', de: '<strong>Hyperrationalistisch.</strong> Präzise und schnell, und die Entscheidung, was für ein Problem das ist, ist stillschweigend schon gefallen: ein Kostenproblem. Der Algorithmus sucht sehr gut in einem Raum, den niemand gewählt hat.' } },
            { text: { en: 'Combine both: the model calculates, then the management team makes the final call on gut feeling.', de: 'Beides verbinden: Das Modell rechnet, dann entscheidet die Geschäftsleitung nach Bauchgefühl.' },
              feedback: { en: '<strong>The blend the book explicitly rejects.</strong> It sounds balanced, and many real decisions are made this way. The authors’ objection: neither the model nor the gut asks how the problem should be seen. You get a precise calculation and a confident feeling, both inside a cost frame no one examined.', de: '<strong>Die Mischung, die das Buch ausdrücklich ablehnt.</strong> Sie klingt ausgewogen, und viele reale Entscheidungen fallen so. Der Einwand der Autoren: Weder Modell noch Bauch fragen, wie das Problem zu sehen ist. Heraus kommen eine präzise Rechnung und ein sicheres Gefühl, beide in einem Kosten-Frame, den niemand geprüft hat.' } },
          ] },
        { situation: { en: 'A new working model splits the workforce into two camps. Both cite the same employee survey as proof.', de: 'Ein neues Arbeitsmodell spaltet die Belegschaft in zwei Lager. Beide führen dieselbe Mitarbeitendenbefragung als Beleg an.' },
          options: [
            { text: { en: 'Commission a statistical comparison of productivity data under both models and adopt whichever scores higher.', de: 'Einen statistischen Vergleich der Produktivitätsdaten beider Modelle beauftragen und das Modell mit dem besseren Wert einführen.' },
              feedback: { en: '<strong>Hyper-rationalist.</strong> Data becomes the arbiter, but the conflict is about what counts as success (output, fairness, autonomy). The metric you pick already takes a side. As in the mask debate: same data, different frames.', de: '<strong>Hyperrationalistisch.</strong> Daten werden zum Schiedsrichter, aber der Konflikt dreht sich darum, was als Erfolg zählt (Output, Fairness, Autonomie). Die gewählte Kennzahl ergreift schon Partei. Wie in der Maskendebatte: gleiche Daten, verschiedene Frames.' } },
            { text: { en: 'Make the frames explicit: what does each camp see in the same numbers? Then look for options and constraints that are acceptable within both frames.', de: 'Die Frames ausdrücklich machen: Was sieht jedes Lager in denselben Zahlen? Dann nach Optionen und Constraints suchen, die in beiden Frames tragbar sind.' },
              feedback: { en: '<strong>Framing.</strong> The dispute is about meaning, not data (compare the Kaepernick example). Naming frames turns a fight about truth into a search for options, and it anticipates the book’s later case for pluralism: the goal is not one winning frame.', de: '<strong>Framing.</strong> Gestritten wird über Bedeutung, nicht über Daten (vgl. das Kaepernick-Beispiel). Frames zu benennen verwandelt einen Streit um Wahrheit in eine Suche nach Optionen und nimmt das spätere Plädoyer des Buchs für Pluralismus vorweg: Ziel ist nicht ein siegreicher Frame.' }, good: true },
            { text: { en: 'Back the camp that shows the most conviction and energy at the town hall; momentum matters more than analysis.', de: 'Das Lager unterstützen, das in der Betriebsversammlung die meiste Überzeugung und Energie zeigt; Schwung zählt mehr als Analyse.' },
              feedback: { en: '<strong>Emotionalist.</strong> Intensity of feeling decides, and the other camp becomes the losing “them”. That is the mob logic in miniature, and it hardens the frame conflict instead of working with it.', de: '<strong>Emotionalistisch.</strong> Die Stärke des Gefühls entscheidet, und das andere Lager wird zu den unterlegenen „anderen“. Das ist die Mob-Logik im Kleinen, und sie verhärtet den Frame-Konflikt, statt mit ihm zu arbeiten.' } },
          ] },
      ],
    },

    caseStudy: {
      title: { en: 'Halicin: who actually found the antibiotic?', de: 'Halicin: Wer hat das Antibiotikum wirklich gefunden?' },
      body: {
        en: '<p>Drug-resistant infections already kill more than 700,000 people a year, with projections of up to ten million. Conventional drug discovery looks for molecules whose structural “fingerprint” resembles known active substances. For antibiotics this route was exhausted: similar molecules had already been tested, and close variants quickly meet the same bacterial resistance.</p><p>The team around Regina Barzilay and Jim Collins at MIT moved the question from structure to function: not “does it look like an antibiotic?” but “does it stop bacteria from growing?”. A biological search became an information problem. They trained a model on more than 2,300 compounds tested against <em>E. coli</em>, screened about 6,000 molecules in a drug-repurposing library and later more than 100 million in a further database. One molecule stood out. They named it halicin, after the computer HAL in <em>2001: A Space Odyssey</em>.</p><p>The headlines credited AI. The authors divide the work differently: people defined the problem, designed the approach, chose the training molecules and the database, and afterwards applied biology again to understand why the hit worked. Barzilay puts it plainly: “Humans were the ones who selected the right compounds.”</p>',
        de: '<p>Resistente Infektionen töten schon heute mehr als 700.000 Menschen im Jahr, Prognosen reichen bis zehn Millionen. Die klassische Wirkstoffsuche sucht Moleküle, deren struktureller „Fingerabdruck“ bekannten Wirkstoffen ähnelt. Bei Antibiotika war dieser Weg ausgeschöpft: Ähnliche Moleküle waren längst getestet, und enge Varianten treffen schnell auf dieselbe bakterielle Resistenz.</p><p>Das Team um Regina Barzilay und Jim Collins am MIT verschob die Frage von der Struktur zur Funktion: nicht „sieht es aus wie ein Antibiotikum?“, sondern „hemmt es das Wachstum von Bakterien?“. Aus einer biologischen Suche wurde ein Informationsproblem. Sie trainierten ein Modell an mehr als 2.300 gegen <em>E. coli</em> getesteten Verbindungen, prüften rund 6.000 Moleküle einer Bibliothek für umgenutzte Wirkstoffe und später mehr als 100 Millionen in einer weiteren Datenbank. Ein Molekül stach heraus. Sie nannten es Halicin, nach dem Computer HAL aus <em>2001: Odyssee im Weltraum</em>.</p><p>Die Schlagzeilen schrieben den Erfolg der KI zu. Die Autoren teilen die Arbeit anders auf: Menschen definierten das Problem, entwarfen den Ansatz, wählten Trainingsmoleküle und Datenbank und legten hinterher wieder die biologische Linse an, um zu verstehen, warum der Treffer wirkt. Barzilay sagt es direkt (sinngemäß): Es waren Menschen, die die richtigen Verbindungen ausgewählt haben.</p>'
      },
      lesson: {
        en: 'Use the halicin split as a diagnostic for any “AI did it” story: who set the question, the training data, the search space, the interpretation? But do not stop at “credit goes to the human”. Without the machine’s search, the new question would have remained a good idea. The frame made the search meaningful; the search made the frame productive.',
        de: 'Nutze die Halicin-Aufteilung als Diagnose für jede „KI hat es geschafft“-Geschichte: Wer setzte Frage, Trainingsdaten, Suchraum, Deutung? Bleib aber nicht bei „der Verdienst gehört dem Menschen“ stehen. Ohne die Suche der Maschine wäre die neue Frage eine gute Idee geblieben. Der Frame machte die Suche sinnvoll; die Suche machte den Frame produktiv.'
      },
      visual: { svg: visFunnel,
        caption: { en: 'The funnel of the halicin search. Human decisions (coral) bracket the machine’s screening (black): they open it and they close it.', de: 'Der Trichter der Halicin-Suche. Menschliche Entscheidungen (Koralle) rahmen das Screening der Maschine (schwarz): Sie öffnen es und sie schließen es ab.' } },
    },

    reflection: {
      intro: { en: 'Apply the chapter’s two central distinctions, frame versus data and framing versus machine or mob, to your own work.', de: 'Wende die beiden zentralen Unterscheidungen des Kapitels, Frame gegenüber Daten und Framing gegenüber Maschine oder Mob, auf deine eigene Arbeit an.' },
      prompts: [
        { en: 'Think of a decision in your organisation where two parties argued with the same data and reached opposite conclusions. What were the two frames, in one sentence each?', de: 'Denk an eine Entscheidung in deiner Organisation, bei der zwei Parteien mit denselben Daten zu gegensätzlichen Schlüssen kamen. Was waren die beiden Frames, je in einem Satz?' },
        { en: 'Under pressure, which way do you lean: towards the machine (more data, another dashboard) or towards the mob (conviction, team loyalty)? Describe one recent example honestly.', de: 'Wohin neigst du unter Druck: zur Maschine (mehr Daten, noch ein Dashboard) oder zum Mob (Überzeugung, Teamloyalität)? Beschreib ehrlich ein aktuelles Beispiel.' },
        { en: 'Which frame in your field is currently treated as the only valid one? What would it cost to admit a second one, and who would lose influence?', de: 'Welcher Frame in deinem Feld gilt derzeit als der einzig gültige? Was würde es kosten, einen zweiten zuzulassen, und wer würde Einfluss verlieren?' },
      ],
      placeholder: { en: 'The two frames were … / Under pressure I lean towards … when …', de: 'Die beiden Frames waren … / Unter Druck neige ich zu …, wenn …' },
    },

    quiz: [
      { q: { en: 'What exactly was the reframing in the halicin discovery?', de: 'Worin genau bestand das Reframing bei der Entdeckung von Halicin?' },
        options: [
          { en: 'Replacing biologists with an algorithm that needs no hypothesis', de: 'Biologinnen und Biologen durch einen Algorithmus ersetzen, der keine Hypothese braucht' },
          { en: 'Searching by function (does it kill bacteria?) instead of by structural similarity to known antibiotics', de: 'Nach Funktion suchen (tötet es Bakterien?) statt nach struktureller Ähnlichkeit zu bekannten Antibiotika' },
          { en: 'Using far more data than earlier drug searches', de: 'Weit mehr Daten nutzen als frühere Wirkstoffsuchen' },
          { en: 'Moving from a chemical to a biological view of the molecule', de: 'Von einer chemischen zu einer biologischen Sicht auf das Molekül wechseln' },
        ],
        answer: 1, explain: { en: 'The data volume grew as a consequence, not as the cause. The decisive shift was the question, which turned a biological search into an information problem (the reverse of option 4). Option 1 is the headline frame the authors reject.', de: 'Die Datenmenge wuchs als Folge, nicht als Ursache. Entscheidend war die neue Frage, die aus einer biologischen Suche ein Informationsproblem machte (das Gegenteil von Option 4). Option 1 ist der Schlagzeilen-Frame, den die Autoren zurückweisen.' } },
      { q: { en: 'A strategy team explains Nokia’s decline with poor market data. How would the authors respond?', de: 'Ein Strategieteam erklärt Nokias Niedergang mit schlechten Marktdaten. Wie würden die Autoren antworten?' },
        options: [
          { en: 'Agreed: better data would have revealed the shift in time.', de: 'Einverstanden: Bessere Daten hätten den Umbruch rechtzeitig gezeigt.' },
          { en: 'Nokia relied too much on gut feeling and too little on analysis.', de: 'Nokia verließ sich zu sehr auf das Bauchgefühl und zu wenig auf Analyse.' },
          { en: 'The telecom frame was a bad frame and should never have been used.', de: 'Der Telekom-Frame war ein schlechter Frame und hätte nie verwendet werden dürfen.' },
          { en: 'Inside Nokia’s telecom frame the iPhone looked like a mistake; the problem was fit, not information.', de: 'In Nokias Telekom-Frame sah das iPhone wie ein Irrtum aus; das Problem war der Fit, nicht die Information.' },
        ],
        answer: 3, explain: { en: 'Option 3 confuses misfit with a bad frame: the telecom frame had served Nokia well for years; it fitted the new market less. More data read through the same frame would have confirmed the same conclusion.', de: 'Option 3 verwechselt Misfit mit einem schlechten Frame: Der Telekom-Frame hatte Nokia jahrelang gut gedient; er passte nur weniger zum neuen Markt. Mehr Daten, durch denselben Frame gelesen, hätten denselben Schluss bestätigt.' } },
      { q: { en: 'Why is Lysenkoism doubly instructive in the logic of the book?', de: 'Warum ist der Lyssenkoismus in der Logik des Buchs doppelt lehrreich?' },
        options: [
          { en: 'It shows that ideology and science must never meet.', de: 'Er zeigt, dass Ideologie und Wissenschaft sich nie begegnen dürfen.' },
          { en: 'A frame was carried into a domain it did not fit, and the suppression of dissent removed every chance of correction.', de: 'Ein Frame wurde in einen Gegenstand übertragen, zu dem er nicht passte, und die Unterdrückung von Widerspruch nahm jede Chance zur Korrektur.' },
          { en: 'It proves that the agricultural data were missing.', de: 'Er beweist, dass die landwirtschaftlichen Daten fehlten.' },
          { en: 'It shows that communist frames are the one category of bad frame.', de: 'Er zeigt, dass kommunistische Frames die eine Kategorie schlechter Frames sind.' },
        ],
        answer: 1, explain: { en: 'Misfit plus monopoly. The second part links to the one exception (frames that deny other frames) and to the “single frame of truth”. Option 4 misreads the exception: badness lies in denying alternatives, not in the content of the frame.', de: 'Misfit plus Monopol. Der zweite Teil verweist auf die eine Ausnahme (Frames, die andere leugnen) und auf den „einzigen Frame der Wahrheit“. Option 4 missversteht die Ausnahme: Schlecht ist das Leugnen von Alternativen, nicht der Inhalt des Frames.' } },
      { q: { en: 'A colleague says: “AlphaZero proves that AI can invent strategy.” Which reply follows the chapter?', de: 'Ein Kollege sagt: „AlphaZero beweist, dass KI Strategien erfinden kann.“ Welche Antwort folgt dem Kapitel?' },
        options: [
          { en: 'Right, its moves were new even to grandmasters.', de: 'Stimmt, seine Züge waren selbst für Spitzenspielende neu.' },
          { en: 'Wrong, it only copied patterns from human games.', de: 'Falsch, es hat nur Muster aus menschlichen Partien kopiert.' },
          { en: 'It produced new moves, but people formed the concepts (mobility over position, sacrifice) that explain and transfer them.', de: 'Es erzeugte neue Züge, aber Menschen bildeten die Begriffe (Mobilität vor Stellung, Opfer), die sie erklären und übertragbar machen.' },
          { en: 'It cannot play well without human strategic input.', de: 'Ohne strategische Vorgaben von Menschen spielt es nicht gut.' },
        ],
        answer: 2, explain: { en: 'Options 2 and 4 are factually wrong: AlphaZero learned from rules and self-play alone. The authors’ point is about explanation and generalisation, not playing strength. Whether this still holds for current systems is open (see “Question the book”).', de: 'Option 2 und 4 sind sachlich falsch: AlphaZero lernte nur aus Regeln und Partien gegen sich selbst. Der Punkt der Autoren betrifft Erklären und Verallgemeinern, nicht Spielstärke. Ob das für heutige Systeme noch gilt, ist offen (siehe „Das Buch hinterfragen“).' } },
      { q: { en: 'A leadership team agrees: “Algorithms for the analysis, gut for the final decision.” What is the authors’ objection?', de: 'Ein Führungsteam einigt sich: „Algorithmen für die Analyse, Bauch für die Entscheidung.“ Was wenden die Autoren ein?' },
        options: [
          { en: 'None; this is exactly the balance the book recommends.', de: 'Nichts; genau diese Balance empfiehlt das Buch.' },
          { en: 'Gut feeling should be removed from decisions entirely.', de: 'Das Bauchgefühl sollte ganz aus Entscheidungen verschwinden.' },
          { en: 'The algorithm should make the final decision as well.', de: 'Der Algorithmus sollte auch die Entscheidung treffen.' },
          { en: 'Blending two unsound foundations leaves the frame unexamined; the decisive step is how the problem is seen in the first place.', de: 'Zwei unsolide Fundamente zu mischen, lässt den Frame ungeprüft; entscheidend ist, wie das Problem überhaupt gesehen wird.' },
        ],
        answer: 3, explain: { en: 'The book explicitly rejects the synthesis: it preserves a fragile tension without progress. Framing is not a ratio between data and gut but the step that precedes both.', de: 'Das Buch lehnt die Synthese ausdrücklich ab: Sie erhält eine fragile Spannung ohne Fortschritt. Framing ist kein Mischverhältnis aus Daten und Bauch, sondern der Schritt vor beidem.' } },
      { q: { en: 'Your team stops treating an internal platform as a project and starts treating it as a product. Is that a paradigm shift in Kuhn’s sense?', de: 'Dein Team behandelt eine interne Plattform nicht mehr als Projekt, sondern als Produkt. Ist das ein Paradigmenwechsel im Sinne Kuhns?' },
        options: [
          { en: 'Yes, every reframing is a paradigm shift.', de: 'Ja, jedes Reframing ist ein Paradigmenwechsel.' },
          { en: 'No, it is a reframing. Every paradigm shift is a reframing, but most reframings are smaller and local.', de: 'Nein, es ist ein Reframing. Jeder Paradigmenwechsel ist ein Reframing, aber die meisten Reframings sind kleiner und lokal.' },
          { en: 'No, because reframing only happens in science.', de: 'Nein, denn Reframing gibt es nur in der Wissenschaft.' },
          { en: 'Yes, as soon as the whole organisation agrees to it.', de: 'Ja, sobald die ganze Organisation zustimmt.' },
        ],
        answer: 1, explain: { en: 'The authors deliberately separate the two: a paradigm shift changes the prevailing concepts of a whole field, while reframing happens comparatively often, also in individual lives and teams. Agreement does not make a reframing a paradigm shift.', de: 'Die Autoren trennen beides bewusst: Ein Paradigmenwechsel ändert die herrschenden Begriffe eines ganzen Feldes, Reframing passiert vergleichsweise oft, auch im eigenen Leben und in Teams. Zustimmung macht ein Reframing nicht zum Paradigmenwechsel.' } },
    ],

    flashcards: [
      { front: { en: 'Framer', de: 'Framer' }, back: { en: 'Someone who deliberately chooses, applies or changes the mental model through which a problem is seen. For the authors: potentially everyone, not only geniuses (Barzilay as example).', de: 'Jemand, der das mentale Modell, durch das ein Problem gesehen wird, bewusst wählt, anwendet oder wechselt. Für die Autoren: potenziell alle, nicht nur Genies (Barzilay als Beispiel).' } },
      { front: { en: 'Four things a mental model does', de: 'Vier Leistungen eines mentalen Modells' }, back: { en: 'Filter, explain causally, generalise from single cases, imagine what is not there.', de: 'Filtern, kausal erklären, aus Einzelfällen verallgemeinern, sich vorstellen, was nicht da ist.' } },
      { front: { en: 'Misframing', de: 'Misframing' }, back: { en: 'Applying a frame where it does not fit. Not the frame is bad, the fit is (zodiac anatomy, Nokia, Lysenkoism).', de: 'Einen Frame dort anwenden, wo er nicht passt. Nicht der Frame ist schlecht, sondern der Fit (Tierkreis-Anatomie, Nokia, Lyssenkoismus).' } },
      { front: { en: 'The one bad frame', de: 'Der eine schlechte Frame' }, back: { en: 'A frame that denies the existence or legitimacy of other frames. Previewed in chapter 1, developed in chapter 8.', de: 'Ein Frame, der Existenz oder Legitimität anderer Frames leugnet. In Kapitel 1 angekündigt, in Kapitel 8 ausgeführt.' } },
      { front: { en: 'Hyper-rationalists', de: 'Hyperrationalisten (Buchbegriff)' }, back: { en: 'Camp that wants judgement moved to data and algorithms. Lineage in the book: Descartes, Taylor, today’s faith in AI decisions.', de: 'Lager, das Urteile an Daten und Algorithmen abgeben will. Linie im Buch: Descartes, Taylor, heutiger Glaube an KI-Entscheidungen.' } },
      { front: { en: 'Emotionalists', de: 'Emotionalisten (Buchbegriff)' }, back: { en: 'Camp that trusts gut, belonging and felt rightness, with sharp boundaries towards others. Lineage: Rousseau, Welch, populism.', de: 'Lager, das Bauch, Zugehörigkeit und gefühltem Rechthaben vertraut, mit scharfen Grenzen nach außen. Linie: Rousseau, Welch, Populismus.' } },
      { front: { en: 'Why not a synthesis of both?', de: 'Warum keine Synthese aus beiden?' }, back: { en: 'Blending two unsound foundations yields a fragile tension, not progress. Framing is a third capacity that precedes both.', de: 'Zwei unsolide Fundamente zu mischen ergibt eine fragile Spannung, keinen Fortschritt. Framing ist eine dritte Fähigkeit, die beidem vorausgeht.' } },
      { front: { en: 'Pathology of progress', de: 'Pathologie des Fortschritts' }, back: { en: 'Our successes produce the next threats, and successful framing breeds the belief in a single frame of truth.', de: 'Unsere Erfolge erzeugen die nächsten Bedrohungen, und erfolgreiches Framing erzeugt den Glauben an einen einzigen Frame der Wahrheit.' } },
    ],

    critique: [
      { claim: { en: 'AI cannot frame: it cannot form mental models, generalise or explain (AlphaZero as proof).', de: 'KI kann nicht framen: Sie bildet keine mentalen Modelle, verallgemeinert nicht und erklärt nicht (AlphaZero als Beleg).' },
        challenge: { en: 'Written in 2020, before large language models. Today’s models produce explanations, transfer across domains, and propose alternative framings and counterfactuals on request; the categorical “cannot” is empirically weaker than it was. Even for AlphaZero, research published in 2022 found representations of many human chess concepts inside the network, so “humans extracted the concepts” is at least incomplete. What remains defensible: whether a model’s explanation reflects what actually drives its output is unresolved, and the choice of goal, the accountability for the chosen frame and the consequences stay with people. Read the claim as “machines do not own the frame”, not “machines cannot produce frames”.', de: 'Geschrieben 2020, vor den großen Sprachmodellen. Heutige Modelle erzeugen Erklärungen, übertragen zwischen Domänen und schlagen auf Zuruf alternative Framings und kontrafaktische Szenarien vor; das kategorische „kann nicht“ ist empirisch schwächer als damals. Selbst bei AlphaZero fand 2022 veröffentlichte Forschung Repräsentationen vieler menschlicher Schachbegriffe im Netz; „Menschen haben die Begriffe herausgezogen“ ist also mindestens unvollständig. Haltbar bleibt: Ob die Erklärung eines Modells abbildet, was seinen Output tatsächlich treibt, ist ungeklärt, und die Wahl des Ziels, die Verantwortung für den gewählten Frame und die Folgen bleiben bei Menschen. Lies die These als „Maschinen besitzen den Frame nicht“, nicht als „Maschinen können keine Frames erzeugen“.' } },
      { claim: { en: 'History swings between reason and emotion: Descartes against Rousseau, Taylor against Welch. Research shows gut decisions are mostly inferior.', de: 'Die Geschichte pendelt zwischen Vernunft und Gefühl: Descartes gegen Rousseau, Taylor gegen Welch. Die Forschung zeigt, dass Bauchentscheidungen meist unterlegen sind.' },
        challenge: { en: 'Didactically effective, historically a simplification. Descartes wrote a whole treatise on the passions; Rousseau’s <em>Social Contract</em> is a tightly argued political theory. Welch ran GE with Six Sigma and forced ranking, hardly gut-only management. And the evidence on intuition is contested: Gigerenzer shows that simple heuristics can beat complex models under uncertainty, Gary Klein describes expert intuition as fast pattern recognition. On that reading, good intuition is compressed framing, not its opposite. The dichotomy makes framing look new partly by drawing the alternatives too narrowly.', de: 'Didaktisch wirksam, historisch eine Vereinfachung. Descartes schrieb eine ganze Abhandlung über die Leidenschaften; Rousseaus <em>Gesellschaftsvertrag</em> ist streng argumentierte politische Theorie. Welch führte GE mit Six Sigma und Zwangsrankings, kaum ein reines Bauchmanagement. Und die Befundlage zur Intuition ist umstritten: Gigerenzer zeigt, dass einfache Heuristiken unter Unsicherheit komplexe Modelle schlagen können, Gary Klein beschreibt Intuition von Fachleuten als schnelle Mustererkennung. So gelesen ist gute Intuition verdichtetes Framing, nicht sein Gegenteil. Die Dichotomie lässt Framing auch deshalb neu wirken, weil sie die Alternativen zu eng zeichnet.' } },
      { claim: { en: 'Credit for halicin goes to the human ability to frame, not to the technology.', de: 'Der Verdienst an Halicin gehört der menschlichen Fähigkeit zu framen, nicht der Technik.' },
        challenge: { en: 'This attribution is itself a frame, and the book uses it as rhetorically as the FT used the opposite one. Without a model screening over 100 million molecules, the reframed question would have stayed unanswerable; reframing and search were jointly necessary. The key witness is also an interested party: Barzilay’s account is plausible, but it is the researcher’s view of her own work. A more accurate reading: humans set and closed the frame, the machine made it productive at a scale no lab could. In organisations, the “credit to the human” frame can also obscure who designed the system and who bears the cost when it fails.', de: 'Diese Zuschreibung ist selbst ein Frame, und das Buch nutzt sie ebenso rhetorisch wie die FT die gegenteilige. Ohne ein Modell, das über 100 Millionen Moleküle durchsucht, wäre die neu gestellte Frage unbeantwortbar geblieben; Reframing und Suche waren gemeinsam notwendig. Die Kronzeugin ist zudem Partei: Barzilays Darstellung ist plausibel, aber es ist die Sicht der Forscherin auf ihre eigene Arbeit. Genauer gelesen: Menschen setzten und schlossen den Frame, die Maschine machte ihn in einem Maßstab produktiv, den kein Labor erreicht. In Organisationen kann der Frame „Verdienst gehört dem Menschen“ außerdem verdecken, wer das System gestaltet hat und wer die Kosten trägt, wenn es scheitert.' } },
    ],

    transfer: [
      { context: { en: 'Leadership', de: 'Führung' }, prompt: { en: 'Leadership teams drift: under cost pressure towards dashboards, under conflict towards conviction. In your next leadership meeting on a contested decision, use the first five minutes to have each person state the problem in one sentence, without solutions. Count how many different frames appear, and sort each proposed solution afterwards: machine, mob or a deliberate frame?', de: 'Führungsteams driften: unter Kostendruck zu Dashboards, im Konflikt zur Überzeugung. Nutzt in eurer nächsten Führungsrunde zu einer strittigen Entscheidung die ersten fünf Minuten so, dass jede Person das Problem in einem Satz beschreibt, ohne Lösung. Zähl, wie viele verschiedene Frames auftauchen, und ordne danach jeden Lösungsvorschlag zu: Maschine, Mob oder bewusster Frame?' } },
      { context: { en: 'AI in organisations', de: 'KI in Organisationen' }, prompt: { en: 'A prompt is a frame handed to a machine. Map the four human roles from the halicin case onto an AI use case you are advising on: who defines the question, who selects context and data, who sets the search space, who interprets the result? Wherever no one is assigned, the frame is set implicitly, by vendor defaults or the loudest user. That gap is where context engineering and intent engineering belong.', de: 'Ein Prompt ist ein Frame, der einer Maschine übergeben wird. Übertrag die vier menschlichen Rollen aus dem Halicin-Fall auf einen KI-Anwendungsfall, den ihr gerade begleitet: Wer definiert die Frage, wer wählt Kontext und Daten, wer setzt den Suchraum, wer deutet das Ergebnis? Wo niemand benannt ist, wird der Frame implizit gesetzt, durch Voreinstellungen des Anbieters oder die lauteste Person. Genau diese Lücke ist der Ort für Context Engineering und Intent Engineering.' } },
      { context: { en: 'Consulting and change', de: 'Beratung und Change' }, prompt: { en: 'Clients often bring a Nokia problem disguised as an information problem (“we need better adoption analytics”). Before the next diagnostic conversation, write down which professional or industry frame the client is using (IT project, compliance, efficiency) and which neighbouring frame would make different options visible. Bring the alternative frame in as a question in the interview, not as a recommendation, and watch whether it is taken up or defended against.', de: 'Kundinnen und Kunden bringen oft ein Nokia-Problem, verkleidet als Informationsproblem („wir brauchen bessere Adoptions-Analytics“). Schreib vor dem nächsten Diagnosegespräch auf, welchen Fach- oder Branchen-Frame das Gegenüber nutzt (IT-Projekt, Compliance, Effizienz) und welcher benachbarte Frame andere Optionen sichtbar machen würde. Bring den alternativen Frame als Frage ins Gespräch, nicht als Empfehlung, und beobachte, ob er aufgegriffen oder abgewehrt wird.' } },
    ],

    summary: [
      { en: 'Human power comes from models: frames filter, explain, generalise and let us imagine what is not there.', de: 'Menschliche Handlungsmacht kommt aus Modellen: Frames filtern, erklären, verallgemeinern und lassen uns vorstellen, was nicht da ist.' },
      { en: 'Barzilay’s team found halicin by changing the question from structure to function; the machine searched inside a human frame.', de: 'Barzilays Team fand Halicin, indem es die Frage von Struktur auf Funktion umstellte; die Maschine suchte in einem menschlichen Frame.' },
      { en: 'There are no bad frames, only misfits (Nokia, Lysenkoism); the one exception is a frame that denies other frames.', de: 'Es gibt keine schlechten Frames, nur Misfits (Nokia, Lyssenkoismus); die eine Ausnahme ist ein Frame, der andere Frames leugnet.' },
      { en: 'Applying a frame uses causality, counterfactuals and constraints; the rest of the book covers switching, learning, pluralism and vigilance.', de: 'Einen Frame anwenden heißt Kausalität, Kontrafaktisches und Constraints nutzen; der Rest des Buchs behandelt Wechseln, Lernen, Pluralismus und Wachsamkeit.' },
      { en: 'The authors reject the machine, the mob and their blend, and warn that progress breeds the belief in a single frame of truth.', de: 'Die Autoren lehnen Maschine, Mob und deren Mischung ab und warnen, dass Fortschritt den Glauben an einen einzigen Frame der Wahrheit nährt.' },
    ],

    glossary: [
      { term: { en: 'Mental model / frame', de: 'Mentales Modell / Frame' }, def: { en: 'A simplified representation of how part of the world works; it selects what matters and makes options visible.', de: 'Eine vereinfachte Darstellung davon, wie ein Ausschnitt der Welt funktioniert; sie wählt aus, was zählt, und macht Optionen sichtbar.' } },
      { term: { en: 'Framer', de: 'Framer' }, def: { en: 'A person who deliberately chooses, applies or changes a frame before deciding.', de: 'Eine Person, die vor dem Entscheiden bewusst einen Frame wählt, anwendet oder wechselt.' } },
      { term: { en: 'Misframing', de: 'Misframing' }, def: { en: 'Using a frame in a domain it does not fit; a problem of fit, not of the frame itself.', de: 'Einen Frame in einem Gegenstandsbereich nutzen, zu dem er nicht passt; ein Problem des Fits, nicht des Frames selbst.' } },
      { term: { en: 'Hyper-rationalists / emotionalists', de: 'Hyperrationalisten / Emotionalisten' }, def: { en: 'The book’s labels for the two dead ends: decisions handed to data and algorithms, or to gut and group feeling.', de: 'Die Buchbegriffe für die zwei Sackgassen: Entscheidungen an Daten und Algorithmen abgeben oder an Bauch und Gruppengefühl.' } },
      { term: { en: 'Single frame of truth', de: 'Einziger Frame der Wahrheit' }, def: { en: 'A frame enforced as the only legitimate one; the failure mode behind the Inquisition and Soviet collectivism.', de: 'Ein Frame, der als einzig legitimer durchgesetzt wird; das Fehlermuster hinter Inquisition und sowjetischer Kollektivierung.' } },
      { term: { en: 'Pathology of progress', de: 'Pathologie des Fortschritts' }, def: { en: 'The pattern that the fruits of human success become sources of new threats.', de: 'Das Muster, dass die Früchte menschlichen Erfolgs zu Quellen neuer Bedrohungen werden.' } },
    ],
  });
})();
