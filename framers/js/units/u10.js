/* u10 — Toolkit / Werkzeugkasten. Practice unit based on the appendix "A guide to working with frames". */
(function () {
  const P = V.palette;
  const isDe = (lang) => lang === 'de';
  const T = (en, de) => ({ en, de });
  const COL = [P.coral, P.plum, P.amber, P.teal, P.sky];

  /* ---------- helpers for film scenes ---------- */
  function scene(l, tag, color, nameEn, nameDe, drawing, qEn, qDe) {
    const name = isDe(l) ? nameDe : nameEn;
    const q = (isDe(l) ? qDe : qEn).split('\n');
    return V.wrap(
      V.pill(200, 26, tag ? tag + '  ' + name : name, { fill: color, cls: 'a-fade', w: Math.max(150, (tag ? tag.length + 2 : 0) * 8 + name.length * 8 + 24) }) +
      drawing +
      V.text(200, q.length > 1 ? 212 : 222, q[0], { size: 15, bold: true, cls: 'a-fade', delay: 1.6 }) +
      (q.length > 1 ? V.text(200, 232, q[1], { size: 15, bold: true, cls: 'a-fade', delay: 1.6 }) : '')
    );
  }
  function toolIcon(i, cx, cy, col) {
    if (i === 0) return V.circle(cx - 3, cy - 3, 11, { fill: 'none', stroke: col, sw: 3 }) + V.line(cx + 5, cy + 5, cx + 15, cy + 15, { stroke: col, sw: 4 });
    if (i === 1) return V.rect(cx - 15, cy - 13, 30, 26, { fill: 'none', stroke: col, sw: 3, r: 4 }) + V.circle(cx + 5, cy, 4, { fill: col });
    if (i === 2) return V.rect(cx - 17, cy - 8, 12, 16, { fill: 'none', stroke: col, sw: 3, r: 3 }) + V.rect(cx + 5, cy - 8, 12, 16, { fill: col, stroke: col, r: 3 }) + V.line(cx - 3, cy, cx + 3, cy, { stroke: P.ink, sw: 2 });
    if (i === 3) return V.circle(cx - 12, cy, 6, { fill: col }) + V.circle(cx, cy - 4, 6, { fill: col }) + V.circle(cx + 12, cy, 6, { fill: col });
    return V.circle(cx - 9, cy + 4, 8, { fill: P.coral, opacity: .85 }) + V.circle(cx + 9, cy + 4, 8, { fill: P.teal, opacity: .85 }) + V.circle(cx, cy - 8, 8, { fill: P.amber, opacity: .85 });
  }

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 6000,
      caption: T('<b>Five tools on one bench.</b> The appendix of the book groups its advice in five parts, and each part answers a different question you can ask in a room.', '<b>Fünf Werkzeuge auf einer Werkbank.</b> Der Anhang des Buchs ordnet seine Ratschläge in fünf Gruppen, und jede beantwortet eine andere Frage, die du in einem Raum stellen kannst.'),
      svg: (l) => {
        let s = '';
        for (let i = 0; i < 5; i++) {
          const x = 29 + i * 70;
          s += V.group(V.rect(x, 62, 62, 80, { fill: P.paper, stroke: COL[i], sw: 3, r: 10 }) + V.text(x + 31, 86, ['I', 'II', 'III', 'IV', 'V'][i], { size: 15, bold: true, fill: COL[i] }) + toolIcon(i, x + 31, 116, COL[i]), { cls: 'a-pop', delay: .2 + i * .25 });
        }
        s += V.line(20, 152, 380, 152, { stroke: P.ink, sw: 6, cls: 'a-draw', delay: .1 }) + V.line(50, 152, 50, 192, { stroke: P.ink, sw: 5 }) + V.line(350, 152, 350, 192, { stroke: P.ink, sw: 5 });
        return V.wrap(s + V.text(200, 228, isDe(l) ? 'Fünf Werkzeuge, eine Werkbank' : 'Five tools, one bench', { size: 16, bold: true, cls: 'a-fade', delay: 1.6 }));
      } },
    { duration: 6000,
      caption: T('<b>I. Harness mental models.</b> Framing happens anyway. Make the assumptions behind it visible by asking why and how, and borrow the view of a wise friend, a hero or a rival.', '<b>I. Mentale Modelle nutzen.</b> Gerahmt wird sowieso. Mach die Annahmen dahinter sichtbar, indem du nach Warum und Wie fragst, und leih dir den Blick einer weisen Freundin, eines Vorbilds oder eines Rivalen.'),
      svg: (l) => scene(l, 'I', COL[0], 'Harness models', 'Modelle nutzen',
        V.person(80, 135, { color: P.ink, scale: 1.5, cls: 'a-fade' }) + V.arrow(120, 110, 190, 110, { color: 'coral', cls: 'a-draw', delay: .5 }) +
        V.frame(200, 55, 170, 115, { label: isDe(l) ? 'Annahme' : 'Assumption', color: P.coral, cls: 'a-pop', delay: .7 }) +
        V.pill(285, 98, isDe(l) ? 'Warum?' : 'Why?', { fill: P.coral, cls: 'a-pop', delay: 1.1 }) + V.pill(285, 138, isDe(l) ? 'Wie?' : 'How?', { fill: P.ink, cls: 'a-pop', delay: 1.4 }),
        'Why? And how, exactly?', 'Warum? Und wie genau?') },
    { duration: 6000,
      caption: T('<b>II. Dream with constraints.</b> Look for the constraint that people can actually change, move it a little first, and keep the rest of the imagined world consistent.', '<b>II. Mit Constraints träumen.</b> Suche das Constraint, das Menschen tatsächlich ändern können, verschiebe es zuerst nur wenig und halte den Rest der vorgestellten Welt widerspruchsfrei.'),
      svg: (l) => {
        let s = V.frame(40, 55, 190, 130, { label: 'Constraints', color: P.plum, cls: 'a-fade' });
        [0, 1, 2].forEach(i => {
          const y = 95 + i * 30; const moved = i === 0;
          s += V.line(65, y, 205, y, { stroke: P.line, sw: 4 }) + V.circle(moved ? 175 : 85 + i * 30, y, 9, { fill: moved ? P.plum : P.muted, cls: moved ? 'a-pulse' : undefined });
        });
        s += V.arrow(240, 95, 292, 95, { color: 'ink', cls: 'a-draw', delay: .8 }) + V.bulb(325, 90, { cls: 'a-pop', delay: 1.3, scale: 1.6 });
        return scene(l, 'II', COL[1], 'Dream with constraints', 'Mit Constraints träumen', s, 'What can we change ourselves?', 'Was können wir selbst ändern?');
      } },
    { duration: 6000,
      caption: T('<b>III. Reframe wisely.</b> Switching frames is risky. Try your repertoire first, then repurpose a frame from another field, and invent one only as a last resort.', '<b>III. Klug reframen.</b> Der Wechsel des Frames ist riskant. Probiere zuerst dein Repertoire, dann leih dir einen Frame aus einem anderen Feld, und erfinde erst zuletzt einen neuen.'),
      svg: (l) => {
        const names = ['Repertoire', 'Repurposing', 'Reinvention']; let s = '';
        names.forEach((n, i) => {
          const h = 40 + i * 32;
          s += V.group(V.rect(45 + i * 105, 160 - h, 100, h, { fill: P.amber, stroke: P.ink, opacity: .55 + i * .2, r: 8 }) + V.text(95 + i * 105, 160 - h / 2 + 5, n, { size: 12, bold: true }), { cls: 'a-rise', delay: .2 + i * .5 });
        });
        return scene(l, 'III', COL[2], 'Reframe wisely', 'Klug reframen', s, 'Do we already own this frame?', 'Haben wir den Frame schon?');
      } },
    { duration: 6000,
      caption: T('<b>IV. Conditions matter.</b> Good framing needs the right setting: everyone frames alone first, then the group meets, and someone is paid in attention to disagree.', '<b>IV. Bedingungen zählen.</b> Gutes Framing braucht den richtigen Rahmen: Alle framen zuerst allein, dann trifft sich die Gruppe, und jemand hat die Aufgabe zu widersprechen.'),
      svg: (l) => {
        let s = '';
        [[75, P.coral], [200, P.teal], [325, P.plum]].forEach(([x, c], i) => {
          s += V.person(x, 140, { color: P.ink, cls: 'a-fade', delay: i * .2 }) + V.rect(x - 20, 55, 40, 32, { fill: c, stroke: P.ink, r: 5, cls: 'a-pop', delay: .6 + i * .3 }) + V.line(x - 12, 66, x + 12, 66, { stroke: '#fff', sw: 2 }) + V.line(x - 12, 75, x + 6, 75, { stroke: '#fff', sw: 2 });
        });
        s += V.rect(45, 168, 310, 10, { fill: P.teal, stroke: P.teal, r: 5, cls: 'a-slide', delay: 1.4 });
        return scene(l, 'IV', COL[3], 'Conditions matter', 'Bedingungen zählen', s, 'Think alone, then decide together', 'Erst allein denken, dann entscheiden');
      } },
    { duration: 6000,
      caption: T('<b>V. Think beyond yourself.</b> Societies and organisations need many frames. Be colourful rather than colour-blind, and distrust any lens that claims to explain everything.', '<b>V. Über dich hinausdenken.</b> Gesellschaften und Organisationen brauchen viele Frames. Sei bunt statt farbenblind, und misstraue jeder Linse, die alles erklären will.'),
      svg: (l) => {
        let s = '';
        for (let i = 0; i < 5; i++) {
          s += V.rect(50 + i * 22, 62, 18, 100, { fill: P.line, stroke: P.line, r: 3, cls: 'a-fade' }) + V.rect(240 + i * 22, 62, 18, 100, { fill: COL[i], stroke: COL[i], r: 3, cls: 'a-rise', delay: .6 + i * .2 });
        }
        s += V.text(110, 185, '✕', { size: 28, fill: P.muted, cls: 'a-pop', delay: .5 }) + V.text(295, 185, '✓', { size: 28, fill: P.ok, cls: 'a-pop', delay: 1.8 });
        return scene(l, 'V', COL[4], 'Beyond yourself', 'Über dich hinaus', s, 'Which colour is missing here?', 'Welche Farbe fehlt im Raum?');
      } },
    { duration: 6500,
      caption: T('<b>The question before the decision.</b> Before anyone argues about options, ask which frame the group is using and who would see it differently. That one question carries the whole toolkit.', '<b>Die Frage vor der Entscheidung.</b> Bevor jemand über Optionen streitet, frag, welchen Frame die Gruppe benutzt und wer ihn anders sehen würde. Diese eine Frage trägt den ganzen Werkzeugkasten.'),
      svg: (l) => scene(l, '', P.ink, 'The question to ask first', 'Die Frage vorab',
        V.frame(40, 60, 150, 110, { color: P.ink, cls: 'a-pop' }) + V.text(115, 133, '?', { size: 60, bold: true, fill: P.coral, cls: 'a-pop', delay: .5 }) +
        V.arrow(198, 115, 245, 115, { color: 'ink', cls: 'a-draw', delay: 1 }) + V.path('M310,75 L355,115 L310,155 L265,115 Z', { fill: P.amber, cls: 'a-pop', delay: 1.3 }) + V.text(310, 120, isDe(l) ? 'Wahl' : 'Choice', { size: 12, bold: true, cls: 'a-fade', delay: 1.5 }),
        'Which frame are we using now?', 'Welchen Frame nutzen wir gerade?') },
  ];

  /* ---------- section visuals ---------- */
  function visPerspectives(l) {
    const lab = isDe(l) ? ['Du', 'Weiser Freund', 'Vorbild', 'Gegenseite'] : ['You', 'Wise friend', 'Role model', 'Rival'];
    const pos = [[15, 20], [275, 20], [15, 200], [275, 200]]; const cols = [P.ink, P.teal, P.amber, P.coral];
    let s = '';
    pos.forEach(([x, y], i) => {
      s += V.group(V.rect(x, y, 110, 40, { fill: P.paper, stroke: cols[i], sw: 3, r: 10 }) + V.text(x + 55, y + 25, lab[i], { size: 13, bold: true }), { cls: 'a-pop', delay: .3 + i * .3 });
      const cx = x < 200 ? x + 110 : x; const cy = y + 20; const dx = x < 200 ? 175 : 225; const dy = y < 100 ? 112 : 148;
      s += V.arrow(cx + (x < 200 ? 4 : -4), y < 100 ? cy + 12 : cy - 12, dx, dy, { color: 'muted', cls: 'a-draw', delay: .5 + i * .3 });
    });
    s += V.circle(200, 130, 36, { fill: P.ink, cls: 'a-pop' }) + V.text(200, 135, isDe(l) ? 'Lage' : 'Case', { size: 13, bold: true, fill: '#fff' });
    return V.wrap(s);
  }
  function visLadder(l) {
    const rows = isDe(l) ? ['Gewicht verschieben', 'Eine Regel lockern', 'Mehrere Regeln lockern', 'Neues Modell bauen'] : ['Shift a weight', 'Loosen one rule', 'Loosen several rules', 'Build a new model'];
    let s = '';
    rows.forEach((r, i) => {
      const y = 22 + i * 56;
      s += V.group(V.rect(16, y, 368, 42, { fill: P.paper, stroke: P.plum, sw: 2, r: 10 }) + V.circle(40, y + 21, 13, { fill: P.plum }) + V.text(40, y + 26, String(i + 1), { size: 13, bold: true, fill: '#fff' }) +
        V.text(66, y + 26, r, { size: 14, bold: true, anchor: 'start' }) +
        [0, 1, 2, 3].map(k => V.circle(318 + k * 16, y + 21, 5, { fill: k <= i ? P.coral : P.line })).join(''), { cls: 'a-rise', delay: .2 + i * .35 });
    });
    return V.wrap(s);
  }
  function visFlow(l) {
    const d = isDe(l);
    let s = V.path('M70,22 L128,56 L70,90 L12,56 Z', { fill: P.paper, stroke: P.ink, sw: 2.5, cls: 'a-pop' }) +
      V.text(70, 52, d ? 'Passt der' : 'Does the', { size: 12, bold: true }) + V.text(70, 67, d ? 'Frame noch?' : 'frame fit?', { size: 12, bold: true }) +
      V.arrow(130, 56, 172, 56, { color: 'teal', cls: 'a-draw', delay: .4 }) + V.text(150, 48, d ? 'ja' : 'yes', { size: 12, bold: true, fill: P.teal }) +
      V.rect(176, 32, 210, 48, { fill: P.paper, stroke: P.teal, sw: 2.5, r: 10, cls: 'a-pop', delay: .6 }) +
      V.text(281, 53, d ? 'Im Frame bleiben,' : 'Stay in the frame,', { size: 13, bold: true }) + V.text(281, 70, d ? 'Constraints lockern' : 'loosen constraints', { size: 13, bold: true }) +
      V.arrow(70, 92, 70, 118, { color: 'coral', cls: 'a-draw', delay: .9 }) + V.text(94, 108, d ? 'nein' : 'no', { size: 12, bold: true, fill: P.coral });
    const boxes = ['Repertoire', 'Repurposing', 'Reinvention'];
    boxes.forEach((b, i) => {
      const x = 14 + i * 128;
      s += V.group(V.rect(x, 120, 112, 44, { fill: P.paper, stroke: P.amber, sw: 3, r: 10 }) + V.text(x + 56, 147, b, { size: 13, bold: true }), { cls: 'a-pop', delay: 1.1 + i * .4 });
      if (i < 2) s += V.arrow(x + 114, 142, x + 126, 142, { color: 'ink', cls: 'a-draw', delay: 1.3 + i * .4 });
    });
    s += V.text(200, 200, d ? 'weit weniger häufig, weit riskanter' : 'rarer and riskier with every step', { size: 12, fill: P.muted, cls: 'a-fade', delay: 2.5 }) +
      V.pill(200, 232, d ? 'Einmal wechseln, dann durchziehen' : 'Switch once, then commit', { fill: P.ink, cls: 'a-fade', delay: 2.8, w: 270 });
    return V.wrap(s);
  }
  function visTimeline(l) {
    const d = isDe(l);
    const main = d ? ['Ziel', 'Allein', 'Teilen', 'Widerspruch', 'Entscheiden'] : ['Goal', 'Alone', 'Share', 'Dissent', 'Decide'];
    const sub = d ? ['ein Satz', 'schriftlich', 'ohne Rang', 'feste Rolle', 'Frame-Frist'] : ['one line', 'in writing', 'no rank', 'fixed role', 'frame deadline'];
    const cols = [P.ink, P.coral, P.teal, P.plum, P.amber];
    let s = V.line(30, 120, 370, 120, { stroke: P.line, sw: 4, cls: 'a-draw' });
    main.forEach((m, i) => {
      const x = 42 + i * 79; const up = i % 2 === 0;
      s += V.group(V.circle(x, 120, 14, { fill: cols[i] }) + V.text(x, 125, String(i + 1), { size: 13, bold: true, fill: '#fff' }) +
        V.text(x, up ? 88 : 160, m, { size: 13, bold: true }) + V.text(x, up ? 72 : 177, sub[i], { size: 12, fill: P.muted }), { cls: 'a-pop', delay: .3 + i * .35 });
    });
    s += V.text(200, 230, d ? 'Der Frame steht fest, bevor entschieden wird' : 'The frame is fixed before the decision', { size: 13, bold: true, cls: 'a-fade', delay: 2.4 });
    return V.wrap(s);
  }

  /* ---------- custom exercise: meeting designer ---------- */
  const MQ = [
    { q: T('Is the goal of the meeting explicit?', 'Ist das Ziel des Termins explizit?'),
      fix: T('Write the goal in one sentence before the meeting. Without a goal, no frame can be judged as fitting (chapter 3).', 'Formuliere das Ziel vorab in einem Satz. Ohne Ziel lässt sich kein Frame als passend beurteilen (Kapitel 3).'),
      o: [
        { t: T('Yes, in one written sentence', 'Ja, in einem schriftlichen Satz'), s: 2, v: T('Good. A named goal is the yardstick every frame is measured against.', 'Gut. Ein benanntes Ziel ist der Maßstab, an dem sich jeder Frame messen lassen muss.') },
        { t: T('Roughly, everybody knows', 'Ungefähr, alle wissen es'), s: 1, v: T('Risky. “Everybody knows” usually means everybody knows a different one.', 'Riskant. „Alle wissen es“ heißt meist: Alle kennen ein anderes.') },
        { t: T('Not stated', 'Nicht ausgesprochen'), s: 0, v: T('You will discuss options without a yardstick. Frames cannot be compared without a goal.', 'Ihr diskutiert Optionen ohne Maßstab. Ohne Ziel lassen sich Frames nicht vergleichen.') }] },
    { q: T('Do people frame the problem alone, in writing, first?', 'Framen die Beteiligten das Problem zuerst allein und schriftlich?'),
      fix: T('Give everyone 10 silent minutes to write their frame. Diverse teams otherwise converge on a consensus too fast (chapter 7).', 'Gib allen 10 stille Minuten, um ihren Frame aufzuschreiben. Diverse Teams einigen sich sonst zu schnell auf einen Konsens (Kapitel 7).'),
      o: [
        { t: T('Yes, written, before any discussion', 'Ja, schriftlich, vor jeder Diskussion'), s: 2, v: T('This is the one condition the research supports directly: individual thinking first keeps diversity alive.', 'Das ist die eine Bedingung, die die Forschung direkt stützt: Erst einzeln denken hält die Vielfalt am Leben.') },
        { t: T('A round of spoken statements first', 'Erst eine Runde mündlicher Statements'), s: 1, v: T('Better than nothing, but the first speaker anchors everyone after them.', 'Besser als nichts, aber die erste Person verankert alle nach ihr.') },
        { t: T('Open discussion from minute one', 'Offene Diskussion ab Minute eins'), s: 0, v: T('Expect fast agreement and a thin range of frames. The loudest frame wins by default.', 'Erwarte schnelle Einigkeit und wenig Frame-Vielfalt. Der lauteste Frame gewinnt per Voreinstellung.') }] },
    { q: T('Who names the hard constraints?', 'Wer benennt die harten Constraints?'),
      fix: T('Ask one person to separate hard from soft constraints on a visible board, so the group loosens only what is mutable (chapter 5).', 'Bitte eine Person, harte von weichen Constraints auf einem sichtbaren Board zu trennen, damit die Gruppe nur lockert, was veränderbar ist (Kapitel 5).'),
      o: [
        { t: T('One named person, visible to all', 'Eine benannte Person, für alle sichtbar'), s: 2, v: T('Good. Hard constraints on the wall stop the room from dreaming about what cannot move.', 'Gut. Harte Constraints an der Wand halten den Raum davon ab, von Unveränderbarem zu träumen.') },
        { t: T('They emerge during the discussion', 'Sie ergeben sich in der Diskussion'), s: 1, v: T('Common. But constraints found late arrive as vetoes, not as design input.', 'Üblich. Aber spät entdeckte Constraints kommen als Veto an, nicht als Gestaltungsgrundlage.') },
        { t: T('Nobody, they are assumed', 'Niemand, sie werden vorausgesetzt'), s: 0, v: T('Unspoken constraints are the most powerful ones, and the least checked.', 'Unausgesprochene Constraints sind die mächtigsten und die am wenigsten geprüften.') }] },
    { q: T('Is there a designated dissenter?', 'Gibt es eine benannte Gegenstimme?'),
      fix: T('Appoint a dissenter in advance, rotate the role, and say out loud that the role is protected (chapter 7: Cassandra, jester).', 'Benenne vorab eine Gegenstimme, wechsle die Rolle durch und sag laut, dass die Rolle geschützt ist (Kapitel 7: Kassandra, Hofnarr).'),
      o: [
        { t: T('Yes, named in advance, role rotates', 'Ja, vorab benannt, Rolle wechselt'), s: 2, v: T('The jester’s function, institutionalised. Rotation keeps it from becoming a personality label.', 'Die Funktion des Hofnarren, institutionalisiert. Der Wechsel verhindert, dass daraus ein Persönlichkeitsetikett wird.') },
        { t: T('Anyone may object', 'Alle dürfen widersprechen'), s: 1, v: T('A permission is not a role. In hierarchies, permissions are rarely used.', 'Eine Erlaubnis ist keine Rolle. In Hierarchien werden Erlaubnisse selten genutzt.') },
        { t: T('No', 'Nein'), s: 0, v: T('Then you are collecting confirmation. The toolkit says: seek dissent instead.', 'Dann sammelt ihr Bestätigung. Der Werkzeugkasten sagt: Such Widerspruch statt Bestätigung.') }] },
    { q: T('Which reframing path is tried first?', 'Welcher Reframing-Weg wird zuerst versucht?'),
      fix: T('Ask “which frame do we already know that fits?” before anyone proposes something new (chapter 6: repertoire first).', 'Frag „welchen Frame kennen wir schon, der passt?“, bevor jemand etwas Neues vorschlägt (Kapitel 6: Repertoire zuerst).'),
      o: [
        { t: T('Repertoire, then repurposing, invention last', 'Repertoire, dann Repurposing, Erfindung zuletzt'), s: 2, v: T('Right order: cheapest and least risky first, as Bernanke did with the Depression template.', 'Richtige Reihenfolge: das Billigste und Risikoärmste zuerst, wie Bernanke mit der Depressions-Schablone.') },
        { t: T('Not discussed', 'Nicht besprochen'), s: 1, v: T('Then the path is set by whoever speaks first, and it is often the most exciting one.', 'Dann bestimmt die Person den Weg, die zuerst spricht, und oft ist es der aufregendste.') },
        { t: T('We start with a blank-sheet idea', 'Wir starten mit einer Idee vom leeren Blatt'), s: 0, v: T('Invention is the hardest, riskiest path. The appendix calls it the last resort.', 'Erfindung ist der schwerste und riskanteste Weg. Der Anhang nennt sie das letzte Mittel.') }] },
    { q: T('Is there a deadline for the frame decision?', 'Gibt es eine Frist für die Frame-Entscheidung?'),
      fix: T('Fix a date by which the frame is chosen, and a review date. Until then no new frame enters (chapter 6: disorientation).', 'Setze ein Datum, bis zu dem der Frame gewählt ist, und ein Review-Datum. Bis dahin kommt kein neuer Frame hinzu (Kapitel 6: Desorientierung).'),
      o: [
        { t: T('Yes, plus a review date', 'Ja, plus Review-Termin'), s: 2, v: T('This guards against repeated reframing, which disorients teams.', 'Das schützt vor wiederholtem Reframing, das Teams desorientiert.') },
        { t: T('A loose date', 'Ein loses Datum'), s: 1, v: T('Better than none, but without a review the frame silently hardens.', 'Besser als keines, aber ohne Review verhärtet der Frame unbemerkt.') },
        { t: T('The frame stays open until the decision', 'Der Frame bleibt offen bis zur Entscheidung'), s: 0, v: T('The frame will change with every new argument, and nobody will notice that it did.', 'Der Frame wechselt mit jedem neuen Argument, und niemand merkt, dass er wechselt.') }] },
  ];

  function renderMeeting(host, ctx) {
    const { lang, el, htmlEl, done } = ctx; const d = isDe(lang);
    const KEY = 'framers.meeting';
    let saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }
    const ans = Array.isArray(saved.answers) && saved.answers.length === MQ.length ? saved.answers.slice() : MQ.map(() => null);
    const persist = () => { try { localStorage.setItem(KEY, JSON.stringify({ name: nameIn.value, answers: ans })); } catch (e) { /* ignore */ } };
    const tx = (o) => o[d ? 'de' : 'en'];

    const nameIn = el('input', { type: 'text', value: saved.name || '', placeholder: d ? 'Welcher Termin? (z. B. Steering Committee, Donnerstag)' : 'Which meeting? (e.g. steering committee, Thursday)', style: 'width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:10px;font:inherit;margin-bottom:14px;background:var(--card);color:var(--ink)', 'aria-label': 'meeting' });
    nameIn.addEventListener('input', persist);
    const result = el('div', { class: 'meeting-result' });
    const blocks = MQ.map((m, qi) => {
      const verdict = htmlEl('div', 'ex-result', '');
      verdict.style.display = 'none';
      const btns = m.o.map((o, oi) => el('button', { type: 'button', class: 'btn small secondary', style: 'text-align:left;justify-content:flex-start;height:auto;white-space:normal', onclick: () => { ans[qi] = oi; persist(); paint(); } }, tx(o.t)));
      const box = el('div', { class: 'ex-item', style: 'margin-bottom:12px' }, htmlEl('div', 'txt', `<strong>${qi + 1}. ${tx(m.q)}</strong>`), el('div', { class: 'btnrow', style: 'flex-direction:column;align-items:stretch' }, ...btns), verdict);
      return { btns, verdict, box };
    });

    function gauge(total) {
      let s = ''; const w = 54, gap = 6, x0 = (400 - (6 * w + 5 * gap)) / 2;
      ans.forEach((a, i) => {
        const sc = MQ[i].o[a].s; const col = sc === 2 ? P.ok : sc === 1 ? P.amber : P.bad;
        s += V.rect(x0 + i * (w + gap), 110, w, 34, { fill: col, stroke: col, r: 8, cls: 'a-pop', delay: i * .12 }) + V.text(x0 + i * (w + gap) + w / 2, 132, String(sc), { size: 16, bold: true, fill: '#fff' }) + V.text(x0 + i * (w + gap) + w / 2, 166, String(i + 1), { size: 13, bold: true, fill: P.muted });
      });
      s += V.text(200, 62, `${total} / 12`, { size: 34, bold: true, cls: 'a-fade' }) + V.text(200, 92, d ? 'Frame-Hygiene deines Termins' : 'Frame hygiene of your meeting', { size: 14, fill: P.muted }) +
        V.text(200, 205, total >= 10 ? (d ? 'Termin ist gut gebaut' : 'Well-built meeting') : total >= 6 ? (d ? 'Tragfähig, mit Lücken' : 'Workable, with gaps') : (d ? 'Frame-Risiko hoch' : 'High frame risk'), { size: 16, bold: true, fill: total >= 10 ? P.ok : total >= 6 ? P.amber : P.bad });
      return V.wrap(s);
    }
    function paint() {
      blocks.forEach((b, qi) => {
        b.btns.forEach((bt, oi) => { const on = ans[qi] === oi; bt.classList.toggle('accent', on); bt.classList.toggle('secondary', !on); });
        if (ans[qi] !== null) { const o = MQ[qi].o[ans[qi]]; b.verdict.style.display = ''; b.verdict.textContent = tx(o.v); b.verdict.className = 'ex-result' + (o.s === 2 ? ' good' : ''); }
        else b.verdict.style.display = 'none';
      });
      if (ans.every(a => a !== null)) {
        const total = ans.reduce((s, a, i) => s + MQ[i].o[a].s, 0);
        const gaps = ans.map((a, i) => MQ[i].o[a].s < 2 ? `<li>${tx(MQ[i].fix)}</li>` : '').join('');
        result.innerHTML = `<figure>${gauge(total)}</figure>` + (gaps ? `<h4>${d ? 'Deine nächsten Züge' : 'Your next moves'}</h4><ul>${gaps}</ul>` : `<p><strong>${d ? 'Alle sechs Hebel sind gesetzt. Prüfe nur, ob die Rolle der Gegenstimme auch in der Hierarchie trägt.' : 'All six levers are set. Check only whether the dissenter role holds up under hierarchy.'}</strong></p>`);
        done();
      } else result.innerHTML = '';
    }
    host.append(nameIn, ...blocks.map(b => b.box), result);
    paint();
  }

  window.FRAMERS.register({
    id: 'u10', number: 10, kind: 'toolkit', color: '#6C4AB6', minutes: 30,
    title: { en: 'Toolkit', de: 'Werkzeugkasten' },
    tagline: T('Five groups of guidelines, each tied to the case that justifies it and turned into a question you can ask in a meeting.', 'Fünf Gruppen von Leitlinien, jede an den Fall gebunden, der sie begründet, und zu einer Frage gemacht, die du im Meeting stellen kannst.'),
    icon: (c) => `<svg viewBox="0 0 44 44"><path d="M8 17h28v18a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z" fill="none" stroke="${c}" stroke-width="3"/><path d="M16 17v-5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5" fill="none" stroke="${c}" stroke-width="3"/><path d="M8 26h28" stroke="${c}" stroke-width="3"/><rect x="19" y="23" width="6" height="6" rx="1.5" fill="${c}"/></svg>`,
    hook: T(
      '<p>The appendix of <em>Framers</em> is a list of about twenty guidelines in five groups. A list like this invites the wrong use: tick the boxes, feel methodical, change nothing. The authors’ own argument works against it. Applying a frame is a process you can practise; choosing a frame is an insight that comes from a mindset, not from a checklist.</p><p>This unit therefore does three things the appendix does not. It paraphrases each guideline, ties it to the chapter case that justifies it, and turns it into a question you can actually ask in a meeting. Then you test your next real decision meeting against the toolkit.</p>',
      '<p>Der Anhang von <em>Framers</em> ist eine Liste von rund zwanzig Leitlinien in fünf Gruppen. Eine solche Liste lädt zur falschen Nutzung ein: Kästchen abhaken, sich methodisch fühlen, nichts ändern. Das Argument der Autoren selbst spricht dagegen. Einen Frame anzuwenden ist ein Prozess, den man üben kann; einen Frame zu wählen ist eine Einsicht, die aus einer Haltung kommt, nicht aus einer Checkliste.</p><p>Diese Einheit tut deshalb drei Dinge, die der Anhang nicht tut. Sie formuliert jede Leitlinie um, bindet sie an den Fall im Kapitel, der sie begründet, und macht daraus eine Frage, die du im Meeting wirklich stellen kannst. Danach prüfst du deinen nächsten echten Entscheidungstermin gegen den Werkzeugkasten.</p>'),
    objectives: [
      T('Explain for each of the five groups which chapter case justifies it and what it protects against.', 'Für jede der fünf Gruppen erklären, welcher Fall im Kapitel sie begründet und wovor sie schützt.'),
      T('Turn each guideline into one question you can ask in a real decision meeting.', 'Jede Leitlinie in eine Frage übersetzen, die du in einem echten Entscheidungstermin stellen kannst.'),
      T('Assess a planned meeting against the toolkit and name its weakest lever.', 'Einen geplanten Termin am Werkzeugkasten messen und seinen schwächsten Hebel benennen.')],
    film: { title: T('The toolkit in seven scenes', 'Der Werkzeugkasten in sieben Szenen'), scenes },
    sections: [
      { id: 's1', heading: T('I. Harness mental models: make the assumption speak', 'I. Mentale Modelle nutzen: die Annahme zum Sprechen bringen'),
        body: T(
          '<p>The first group starts from a fact: framing happens whether you want it or not, so the only choice is whether it happens deliberately. Four moves follow.</p><ul><li><strong>Ask why and how.</strong> Why do you believe this? How must the world work if it is true? Semmelweis, in the chapter on causality, found in 1840s Vienna that mothers died about five times as often in the ward run by doctors as in the midwives’ ward. He tested birth position and the priest’s bell until a doctor’s death after an autopsy cut gave him the clue: doctors came from the dead, midwives did not. His explanation (“cadaverous particles”) was wrong, his intervention (washing hands) was right. Asking why and how exposes the causal claim, so it can be tested before it is acted on.</li><li><strong>Borrow a perspective.</strong> How would a wise friend, a role model or a rival frame this?</li><li><strong>Name your switching condition.</strong> What would have to change for you to see it differently? If the answer is “nothing”, you are defending, not framing.</li><li><strong>In a clash, describe the other frame</strong> before you rebut the position.</li></ul><p><strong>Meeting question:</strong> “How must the world work for this plan to succeed?”</p>',
          '<p>Die erste Gruppe geht von einer Tatsache aus: Gerahmt wird, ob du willst oder nicht. Die einzige Wahl ist, ob es bewusst geschieht. Vier Züge folgen daraus.</p><ul><li><strong>Warum und wie fragen.</strong> Warum glaubst du das? Wie muss die Welt funktionieren, wenn es stimmt? Semmelweis stellte im Wien der 1840er fest, dass Mütter auf der Station der Ärzte etwa fünfmal so häufig starben wie auf der Hebammenstation. Er testete Gebärposition und das Läuten des Priesters, bis der Tod eines Arztes nach einem Schnitt bei einer Autopsie den Hinweis gab: Ärzte kamen von den Toten, Hebammen nicht. Seine Erklärung („Leichenpartikel“) war falsch, seine Maßnahme (Händewaschen) richtig. Warum und wie zu fragen legt die Kausalbehauptung frei, sodass sie geprüft werden kann, bevor man danach handelt.</li><li><strong>Eine Perspektive leihen.</strong> Wie würden eine weise Freundin, ein Vorbild oder ein Rivale das rahmen?</li><li><strong>Die eigene Umschaltbedingung nennen.</strong> Was müsste sich ändern, damit du es anders siehst? Lautet die Antwort „nichts“, verteidigst du, du framest nicht.</li><li><strong>Im Konflikt den fremden Frame beschreiben</strong>, bevor du die Position widerlegst.</li></ul><p><strong>Meeting-Frage:</strong> „Wie muss die Welt funktionieren, damit dieser Plan aufgeht?“</p>'),
        visual: { svg: visPerspectives, caption: T('One case, four lenses. The guide asks you to try at least one lens that is not yours.', 'Ein Fall, vier Linsen. Der Anhang verlangt, mindestens eine auszuprobieren, die nicht deine ist.') },
        keyIdea: T('A frame you cannot state as “the world works like this” is not yet a frame you can examine.', 'Ein Frame, den du nicht als „die Welt funktioniert so“ aussprechen kannst, lässt sich noch nicht prüfen.') },
      { id: 's2', heading: T('II. Dream with constraints: what can move, how far, and does it still fit', 'II. Mit Constraints träumen: was sich bewegen lässt, wie weit, und ob es noch zusammenpasst'),
        body: T(
          '<p>Applying a frame means finding workable options quickly. The appendix gives four rules for the constraints, meaning the limits that shape what you imagine.</p><ul><li><strong>Look at what is changeable (mutability).</strong> NASA assumed a returning rocket needs aerodynamic lift, so it imagined wings and built the shuttle. SpaceX loosened exactly that constraint: sensors and computing had made it feasible to relight the engine and land upright. Technology had changed which constraint was mutable. Budgets and physics are poor places to dream; human choices are good ones.</li><li><strong>Start with minimal change.</strong> After the diethylene glycol scandal of the 1980s, Lower Austrian winemakers did not switch to apples. They kept grapes and wine and changed one thing: quality over volume. By 2019 export volume had roughly doubled and its value had grown about sixfold.</li><li><strong>Stay consistent.</strong> For <em>Minority Report</em>, an expert summit produced an 80-page “bible” of its future world. “No traffic jams” forced roads and buildings to merge. A single contradiction would have broken the illusion.</li><li><strong>Externalise.</strong> If you cannot hold all constraints in mind, put them in a physical model, as the film did with its bible.</li></ul><p><strong>Meeting question:</strong> “Which constraint can we change ourselves, and what is the smallest change that opens a new option?”</p>',
          '<p>Einen Frame anzuwenden heißt, schnell brauchbare Optionen zu finden. Der Anhang gibt vier Regeln für die Constraints, also die Begrenzungen, die formen, was du dir vorstellst.</p><ul><li><strong>Auf Veränderbares schauen (Mutabilität).</strong> Die NASA ging davon aus, dass eine zurückkehrende Rakete aerodynamischen Auftrieb braucht, stellte sich Flügel vor und baute den Shuttle. SpaceX lockerte genau dieses Constraint: Sensorik und Rechenleistung machten es machbar, das Triebwerk neu zu zünden und aufrecht zu landen. Technik hatte verändert, welches Constraint veränderbar ist. Budgets und Physik sind schlechte Orte zum Träumen; menschliche Entscheidungen sind gute.</li><li><strong>Mit minimaler Änderung beginnen.</strong> Nach dem Glykolskandal der 1980er stiegen die niederösterreichischen Winzerinnen und Winzer nicht auf Äpfel um. Sie behielten Trauben und Wein und änderten eine Sache: Qualität vor Menge. Bis 2019 hatte sich das Exportvolumen etwa verdoppelt, der Exportwert etwa versechsfacht.</li><li><strong>Konsistent bleiben.</strong> Für <em>Minority Report</em> erarbeitete ein Expertengipfel eine 80 Seiten starke „Bibel“ seiner Zukunftswelt. „Keine Staus“ zwang Straßen und Gebäude zur Verschmelzung. Ein einziger Widerspruch hätte die Illusion zerstört.</li><li><strong>Auslagern.</strong> Wenn du nicht alle Constraints im Kopf behalten kannst, bring sie in ein physisches Modell, so wie der Film es mit seiner Bibel tat.</li></ul><p><strong>Meeting-Frage:</strong> „Welches Constraint können wir selbst ändern, und was ist die kleinste Änderung, die eine neue Option öffnet?“</p>'),
        visual: { svg: visLadder, caption: T('Climb the ladder from the bottom of effort and risk. Austrian wine stopped at step 1; SpaceX loosened one rule at step 2.', 'Steig die Leiter von unten nach oben, nach Aufwand und Risiko. Der österreichische Wein blieb bei Stufe 1; SpaceX lockerte eine Regel auf Stufe 2.') },
        keyIdea: T('The smallest change that opens an option beats the boldest change that opens many.', 'Die kleinste Änderung, die eine Option öffnet, schlägt die kühnste, die viele öffnet.') },
      { id: 's3', heading: T('III. Reframe wisely: stay, borrow, invent, and do not flip-flop', 'III. Klug reframen: bleiben, leihen, erfinden und nicht hin und her springen'),
        body: T(
          '<p>Switching the frame changes what you can see, and it costs a lot. The appendix therefore gives an order of attempts and a brake.</p><ul><li><strong>Repertoire first.</strong> Ben Bernanke, facing the 2008 crisis, took a template he already owned from decades of studying the Depression, at a time when others held that Wall Street’s trouble would not reach Main Street.</li><li><strong>Then repurpose.</strong> IKEA’s founder carried a frame from fashion, where goods are cheap and replaceable, into furniture, which until then was bought for generations.</li><li><strong>Invent last.</strong> Darwin’s tree of life, descent from common ancestors, is the rare case of a frame that did not exist anywhere before. It is the exception, not the plan.</li><li><strong>Tight or broad?</strong> A tight frame is fast and its constraints are easy to hold, but it breaks when conditions shift. A broad frame holds more and takes longer.</li><li><strong>Do not reframe repeatedly.</strong> Each switch costs cognitive energy. Jumping from frame to frame disorients, like changing direction too often on a hike.</li></ul><p><strong>Meeting question:</strong> “Is there a frame we already know that fits, before we invent one?”</p>',
          '<p>Der Wechsel des Frames verändert, was du sehen kannst, und er kostet viel. Der Anhang gibt deshalb eine Reihenfolge der Versuche und eine Bremse.</p><ul><li><strong>Zuerst das Repertoire.</strong> Ben Bernanke nahm in der Krise 2008 eine Schablone, die er aus Jahrzehnten der Depressionsforschung schon besaß, zu einer Zeit, in der andere meinten, die Probleme der Wall Street erreichten die Main Street nicht.</li><li><strong>Dann Repurposing.</strong> Der IKEA-Gründer trug einen Frame aus der Mode, wo Waren billig und ersetzbar sind, in die Möbelbranche, in der man bis dahin für Generationen kaufte.</li><li><strong>Erfinden zuletzt.</strong> Darwins Baum des Lebens, die Abstammung von gemeinsamen Vorfahren, ist der seltene Fall eines Frames, den es vorher nirgends gab. Er ist die Ausnahme, nicht der Plan.</li><li><strong>Eng oder weit?</strong> Ein enger Frame ist schnell und seine Constraints sind leicht zu halten, aber er bricht, wenn sich die Bedingungen verschieben. Ein weiter Frame fasst mehr und dauert länger.</li><li><strong>Nicht wiederholt reframen.</strong> Jeder Wechsel kostet kognitive Energie. Von Frame zu Frame zu springen desorientiert, wie zu häufige Richtungswechsel auf einer Wanderung.</li></ul><p><strong>Meeting-Frage:</strong> „Kennen wir schon einen Frame, der passt, bevor wir einen erfinden?“</p>'),
        visual: { svg: visFlow, caption: T('The decision flow before switching. Most of the time the top branch is enough.', 'Der Entscheidungsfluss vor dem Wechsel. Meistens reicht der obere Zweig.') },
        keyIdea: T('Reframing is not a skill you drill; it is a rare move you ration.', 'Reframing ist keine Fähigkeit, die du trainierst, sondern ein seltener Zug, den du rationierst.') },
      { id: 's4', heading: T('IV. Conditions matter: design the room, not just the question', 'IV. Bedingungen zählen: den Raum gestalten, nicht nur die Frage'),
        body: T(
          '<p>The fourth group moves from the individual to the setting. Framing improves with cognitive diversity, but diversity only helps if the setting lets it surface.</p><ul><li><strong>Frame alone before deciding together.</strong> The research in chapter 7 shows an odd effect: diverse teams facing a reframing task quickly settle on a consensus without tapping their different perspectives. The problem vanishes when members think individually first.</li><li><strong>Seek dissent, not confirmation.</strong> Cassandra saw Troy’s fall and was not heard. Pixar’s Ed Catmull reads the myth the other way: the curse lies on those who cannot perceive the truth. The court jester served the same purpose; in the chapter’s story, he asked the generals planning an invasion how they would get out again.</li><li><strong>Accept tensions between frames.</strong> They indicate the complexity of reality more than faulty thinking.</li><li><strong>Stay curious about the unfamiliar,</strong> and say uncomfortable truths. The appendix adds that such courage is respected by those who matter. We test that claim in the critique block.</li></ul><p><strong>Meeting question:</strong> “Before we talk: what is your frame, in writing, and who argues the other side?”</p>',
          '<p>Die vierte Gruppe geht vom Einzelnen zum Rahmen des Geschehens. Framing wird durch kognitive Vielfalt besser, aber Vielfalt hilft nur, wenn die Situation sie hervortreten lässt.</p><ul><li><strong>Erst allein framen, dann gemeinsam entscheiden.</strong> Die Forschung aus Kapitel 7 zeigt einen merkwürdigen Effekt: Diverse Teams einigen sich bei einer Reframing-Aufgabe schnell auf einen Konsens, ohne ihre verschiedenen Perspektiven auszuschöpfen. Das Problem verschwindet, wenn die Mitglieder zuerst einzeln nachdenken.</li><li><strong>Widerspruch suchen, nicht Bestätigung.</strong> Kassandra sah den Fall Trojas voraus und wurde nicht gehört. Pixars Ed Catmull liest den Mythos umgekehrt: Der Fluch liegt auf denen, die die Wahrheit nicht wahrnehmen können. Der Hofnarr diente demselben Zweck; in der Geschichte des Kapitels fragte er die Generäle, die eine Invasion planten, wie sie wieder herauskommen wollten.</li><li><strong>Spannungen zwischen Frames aushalten.</strong> Sie zeigen eher die Komplexität der Wirklichkeit als fehlerhaftes Denken.</li><li><strong>Neugier auf Fremdes behalten</strong> und Unbequemes aussprechen. Der Anhang ergänzt, dass solcher Mut von denen respektiert wird, auf die es ankommt. Diese Behauptung prüfen wir im Block „Kritik“.</li></ul><p><strong>Meeting-Frage:</strong> „Bevor wir reden: Was ist dein Frame, schriftlich, und wer vertritt die Gegenseite?“</p>'),
        visual: { svg: visTimeline, caption: T('A decision meeting with the toolkit built in. Steps 2 and 4 are the ones most meetings skip.', 'Ein Entscheidungstermin mit eingebautem Werkzeugkasten. Schritt 2 und 4 überspringen die meisten Meetings.') },
        keyIdea: T('Diversity is a property of the team; using it is a property of the meeting design.', 'Vielfalt ist eine Eigenschaft des Teams; sie zu nutzen ist eine Eigenschaft des Meeting-Designs.') },
      { id: 's5', heading: T('V. Think beyond yourself: pluralism as a working principle', 'V. Über dich hinausdenken: Pluralismus als Arbeitsprinzip'),
        body: T(
          '<p>The last group widens the view from the meeting to society, and its guidelines read as political more than practical. We translate them for organisations.</p><ul><li><strong>See the colourful, do not be colour-blind.</strong> Chapter 8 draws on sociologists who describe colour-blindness as a frame that erases real differences and so reproduces discrimination. The alternative names differences openly and respectfully. In a team: do not treat sameness of view as cohesion.</li><li><strong>Treat friction as an asset.</strong> Disagreement between frames is where new options come from.</li><li><strong>Educate for respect of other frames, and let cultures mix.</strong> For organisations: staff rotation, outsiders in reviews, projects that cross boundaries.</li><li><strong>Reject any single frame that claims to explain all of reality.</strong> This is the book’s one hard line: the only bad frame is one that denies other frames. “It is all culture”, “it is all data” and “it is all incentives” each deserve this suspicion.</li></ul><p>These guidelines are the least operational and the most normative of the five. They justify the other four rather than add a technique.</p><p><strong>Meeting question:</strong> “Which frame is missing in this room, and who carries it outside?”</p>',
          '<p>Die letzte Gruppe weitet den Blick vom Meeting auf die Gesellschaft, und ihre Leitlinien lesen sich eher politisch als praktisch. Wir übersetzen sie für Organisationen.</p><ul><li><strong>Das Bunte sehen, nicht farbenblind sein.</strong> Kapitel 8 stützt sich auf Soziologinnen und Soziologen, die Farbenblindheit als Frame beschreiben, der reale Unterschiede auslöscht und damit Diskriminierung reproduziert. Die Alternative benennt Unterschiede offen und respektvoll. Im Team heißt das: Gleichklang der Sicht nicht mit Zusammenhalt verwechseln.</li><li><strong>Reibung als Gewinn behandeln.</strong> Zwischen Frames entstehen neue Optionen.</li><li><strong>Für Respekt vor fremden Frames bilden und Kulturen mischen.</strong> In Organisationen: Rotation von Mitarbeitenden, Außenstehende in Reviews, Projekte über Bereichsgrenzen.</li><li><strong>Jeden einzelnen Frame ablehnen, der die ganze Wirklichkeit erklären will.</strong> Das ist die eine harte Linie des Buchs: Der einzige schlechte Frame ist einer, der andere Frames leugnet. „Alles ist Kultur“, „alles ist Daten“ und „alles ist Anreiz“ verdienen dieses Misstrauen.</li></ul><p>Diese Leitlinien sind die am wenigsten operativen und die normativsten der fünf. Sie begründen die anderen vier, statt eine Technik hinzuzufügen.</p><p><strong>Meeting-Frage:</strong> „Welcher Frame fehlt in diesem Raum, und wer vertritt ihn draußen?“</p>'),
        keyIdea: T('The one frame to reject is the one that says there is only one.', 'Der eine Frame, den du ablehnst, ist der, der behauptet, es gebe nur einen.') },
    ],
    exercise: {
      type: 'custom',
      title: T('Meeting designer', 'Meeting-Designer'),
      instructions: T('Pick a real decision meeting coming up in the next weeks and answer six short questions about how it is built. Each answer gets a one-line verdict from the toolkit. Your answers stay on this device.', 'Nimm einen echten Entscheidungstermin der kommenden Wochen und beantworte sechs kurze Fragen dazu, wie er gebaut ist. Jede Antwort bekommt ein Urteil aus dem Werkzeugkasten in einer Zeile. Deine Antworten bleiben auf diesem Gerät.'),
      render: renderMeeting,
    },
    caseStudy: {
      title: T('Bernanke, September 2008: the toolkit applied step by step', 'Bernanke, September 2008: der Werkzeugkasten Schritt für Schritt'),
      body: T(
        '<p>On the night of 16 September 2008, one day after Lehman Brothers collapsed, Fed chairman Ben Bernanke had to decide whether to rescue the insurer AIG. The chapter 3 account gives the situation and the frame he used. Steps 2 to 5 below are <em>our application</em> of the toolkit to it, not a record of what he did.</p><ol><li><strong>Harness (I).</strong> The assumption on the table: trouble on Wall Street stays on Wall Street. Bernanke had studied the Depression for years and asked the “how” question: how does the failure of financial institutions travel into the real economy? His template carried an answer: through credit.</li><li><strong>Dream with constraints (II).</strong> Hard: the panic itself, the clock. Mutable: what the Fed does with its own tools. The minimal change was to extend the Fed’s existing role as lender rather than to invent a new institution.</li><li><strong>Reframe wisely (III).</strong> Repertoire first: the Depression frame was already in his head. No repurposing, no invention, and no switching back and forth during the weekend.</li><li><strong>Conditions (IV).</strong> The question for the room: who argues the opposite, that rescuing AIG rewards the reckless? That position existed and deserved a named voice before the decision, not afterwards.</li><li><strong>Beyond yourself (V).</strong> The rescue was defended as saving the economy, not the company. Whoever carries the rival frame (moral hazard, fairness) stays a legitimate party to the public debate.</li></ol>',
        '<p>In der Nacht zum 16. September 2008, einen Tag nach dem Zusammenbruch von Lehman Brothers, musste Fed-Chef Ben Bernanke entscheiden, ob der Versicherer AIG gerettet wird. Der Bericht in Kapitel 3 liefert die Lage und den Frame, den er nutzte. Die Schritte 2 bis 5 sind <em>unsere Anwendung</em> des Werkzeugkastens darauf, keine Aufzeichnung dessen, was er tat.</p><ol><li><strong>Nutzen (I).</strong> Die Annahme auf dem Tisch: Ärger an der Wall Street bleibt an der Wall Street. Bernanke hatte jahrelang die Depression erforscht und die „Wie“-Frage gestellt: Wie wandert das Scheitern von Finanzinstituten in die Realwirtschaft? Seine Schablone trug eine Antwort: über den Kredit.</li><li><strong>Mit Constraints träumen (II).</strong> Hart: die Panik selbst, die Uhr. Veränderbar: was die Fed mit ihren eigenen Mitteln tut. Die minimale Änderung war, die bestehende Rolle der Fed als Kreditgeberin auszuweiten, statt eine neue Institution zu erfinden.</li><li><strong>Klug reframen (III).</strong> Zuerst das Repertoire: Der Depressions-Frame war schon im Kopf. Kein Repurposing, keine Erfindung und kein Hin- und Herwechseln übers Wochenende.</li><li><strong>Bedingungen (IV).</strong> Die Frage an den Raum: Wer vertritt das Gegenteil, nämlich dass die Rettung von AIG die Leichtsinnigen belohnt? Diese Position gab es, und sie verdiente vor der Entscheidung eine benannte Stimme, nicht danach.</li><li><strong>Über sich hinaus (V).</strong> Die Rettung wurde damit verteidigt, die Wirtschaft zu retten, nicht das Unternehmen. Wer den Gegenframe trägt (Moral Hazard, Fairness), bleibt legitime Partei in der öffentlichen Debatte.</li></ol>'),
      lesson: T('The toolkit does not produce the decision. It orders the questions so the frame is chosen on purpose and the dissenting frame has a seat before the decision, not after.', 'Der Werkzeugkasten liefert nicht die Entscheidung. Er ordnet die Fragen, damit der Frame mit Absicht gewählt wird und der abweichende Frame vor der Entscheidung einen Platz hat, nicht danach.'),
    },
    reflection: {
      intro: T('Use the toolkit on yourself before you use it on others.', 'Wende den Werkzeugkasten zuerst auf dich selbst an, bevor du ihn auf andere anwendest.'),
      prompts: [
        T('Pick the decision you are most committed to right now. Complete the sentence “This works only if the world is like this: …” and then name one fact that would make you change your mind.', 'Nimm die Entscheidung, auf die du dich gerade am stärksten festgelegt hast. Vervollständige den Satz „Das klappt nur, wenn die Welt so ist: …“ und nenne dann eine Tatsache, die dich umstimmen würde.'),
        T('Which of the five groups do you skip most often in practice, and what does that say about the frames you are comfortable with?', 'Welche der fünf Gruppen überspringst du in der Praxis am häufigsten, und was sagt das über die Frames, in denen du dich wohlfühlst?'),
        T('Recall a meeting where someone disagreed early and was ignored. What would have had to be different in the design of that meeting for the dissent to count?', 'Erinnere dich an ein Meeting, in dem jemand früh widersprach und überhört wurde. Was hätte im Design dieses Meetings anders sein müssen, damit der Widerspruch zählt?'),
      ],
      placeholder: T('For my next decision, I will…', 'Bei meiner nächsten Entscheidung werde ich …'),
    },
    quiz: [
      { q: T('A CEO opens the leadership meeting with her view of the market, then asks “Any thoughts?” Within ten minutes everyone agrees. Which guideline is most clearly violated?', 'Die CEO eröffnet die Führungsrunde mit ihrer Marktsicht und fragt dann „Gedanken dazu?“. Nach zehn Minuten sind sich alle einig. Welche Leitlinie wird am deutlichsten verletzt?'),
        options: [T('Start with minimal change', 'Mit minimaler Änderung beginnen'), T('Have each person frame independently before sharing', 'Alle zuerst einzeln framen lassen, bevor geteilt wird'), T('Stay consistent', 'Konsistent bleiben'), T('Ask why and how', 'Warum und wie fragen')],
        answer: 1, explain: T('The research in chapter 7: diverse teams converge on consensus fast and under-use their differences, unless people think alone first. An opening statement from the top makes it worse by anchoring.', 'Die Forschung aus Kapitel 7: Diverse Teams einigen sich schnell und nutzen ihre Unterschiede zu wenig, außer wenn zuerst allein gedacht wird. Ein Eröffnungsstatement von oben verschärft das durch Verankerung.')},
      { q: T('A team adopts an agile frame in March, a design-thinking frame in April and a lean frame in May, each time because the last one “did not deliver at once”. Which guideline do they break?', 'Ein Team führt im März einen agilen Frame ein, im April Design Thinking und im Mai Lean, jedes Mal weil der letzte „nicht sofort geliefert hat“. Welche Leitlinie verletzen sie?'),
        options: [T('Embed constraints in a physical model', 'Constraints in einem physischen Modell festhalten'), T('Seek dissent rather than confirmation', 'Widerspruch statt Bestätigung suchen'), T('Focus on changeable elements', 'Auf veränderbare Elemente konzentrieren'), T('Do not reframe repeatedly', 'Nicht wiederholt reframen')],
        answer: 3, explain: T('Each switch costs cognitive energy, and repeated switching leaves people disoriented before any frame has had time to work.', 'Jeder Wechsel kostet kognitive Energie, und wiederholtes Wechseln desorientiert, bevor irgendein Frame Zeit hatte zu wirken.')},
      { q: T('A logistics team spends three workshops debating customs law, which they cannot influence, and never discusses their own delivery windows. Which guideline fits best?', 'Ein Logistikteam diskutiert drei Workshops lang Zollrecht, das es nicht beeinflussen kann, und bespricht nie die eigenen Lieferfenster. Welche Leitlinie passt am besten?'),
        options: [T('Focus on the most easily changeable elements (mutability)', 'Auf die am leichtesten veränderbaren Elemente konzentrieren (Mutabilität)'), T('Think beyond yourself', 'Über dich hinausdenken'), T('Invent a new frame as a last resort', 'Einen neuen Frame erst als letztes Mittel erfinden'), T('Imagine how a rival would frame it', 'Sich vorstellen, wie ein Rivale es rahmen würde')],
        answer: 0, explain: T('SpaceX succeeded by loosening a constraint that technology had made changeable. The logistics team does the opposite: it dreams about a constraint it cannot move.', 'SpaceX hatte Erfolg, weil es ein Constraint lockerte, das die Technik veränderbar gemacht hatte. Das Logistikteam tut das Gegenteil: Es träumt von einem Constraint, das es nicht bewegen kann.')},
      { q: T('A scenario workshop for 2035 assumes “everybody works remotely” and, in the same document, plans a flagship office as the main place for client trust. What is missing?', 'Ein Szenario-Workshop für 2035 unterstellt „alle arbeiten remote“ und plant im selben Dokument ein Flagship-Büro als zentralen Ort für Kundenvertrauen. Was fehlt?'),
        options: [T('A designated dissenter', 'Eine benannte Gegenstimme'), T('More cognitive diversity', 'Mehr kognitive Vielfalt'), T('Consistency among constraints', 'Konsistenz zwischen den Constraints'), T('A lower number of options', 'Eine kleinere Zahl von Optionen')],
        answer: 2, explain: T('The Minority Report lesson: an imagined world works because its constraints cohere. The workshop contains two assumptions that contradict each other, and nobody has checked.', 'Die Lehre aus Minority Report: Eine vorgestellte Welt funktioniert, weil ihre Constraints zusammenpassen. Der Workshop enthält zwei Annahmen, die sich widersprechen, und niemand hat das geprüft.')},
      { q: T('Sales fall by 15 percent. The founder calls a brainstorm to invent a completely new business model, and nobody asks what the company did after the last downturn. Which sequence did they skip?', 'Der Umsatz fällt um 15 Prozent. Der Gründer ruft ein Brainstorming ein, um ein völlig neues Geschäftsmodell zu erfinden, und niemand fragt, was das Unternehmen nach dem letzten Abschwung getan hat. Welche Reihenfolge wurde übersprungen?'),
        options: [T('Dissent, then alone, then share', 'Widerspruch, dann allein, dann teilen'), T('Repertoire, then repurposing, then invention', 'Repertoire, dann Repurposing, dann Erfindung'), T('Tight frame, then broad frame', 'Enger Frame, dann weiter Frame'), T('Causality, then counterfactuals', 'Kausalität, dann Kontrafaktisches')],
        answer: 1, explain: T('Invention is the hardest and riskiest path. The cheaper moves, a frame you own or one borrowed from elsewhere, come first, as with Bernanke and IKEA.', 'Erfinden ist der schwerste und riskanteste Weg. Die billigeren Züge, ein eigener oder ein geliehener Frame, kommen zuerst, wie bei Bernanke und IKEA.')},
    ],
    flashcards: [
      { front: T('What question exposes the causal claim in a plan?', 'Welche Frage legt die Kausalbehauptung in einem Plan frei?'), back: T('“Why do you believe this, and how must the world work for it to be true?” Semmelweis’ wrong theory still led to the right intervention because it was testable.', '„Warum glaubst du das, und wie muss die Welt funktionieren, damit es stimmt?“ Semmelweis’ falsche Theorie führte zur richtigen Maßnahme, weil sie prüfbar war.') },
      { front: T('Which constraints should you loosen first?', 'Welche Constraints solltest du zuerst lockern?'), back: T('The mutable ones, those people can change. SpaceX loosened “returning rockets need lift” once sensors and computing made engine landings feasible.', 'Die veränderbaren, die Menschen ändern können. SpaceX lockerte „zurückkehrende Raketen brauchen Auftrieb“, als Sensorik und Rechenleistung Triebwerkslandungen machbar machten.') },
      { front: T('How big should the first change be?', 'Wie groß sollte die erste Änderung sein?'), back: T('Minimal. Austrian winemakers kept grapes and wine and changed one thing, quality over volume, and export value rose about sixfold.', 'Minimal. Österreichische Winzerinnen und Winzer behielten Trauben und Wein und änderten eine Sache, Qualität vor Menge, und der Exportwert stieg auf etwa das Sechsfache.') },
      { front: T('How do you protect an imagined scenario from contradictions?', 'Wie schützt du ein vorgestelltes Szenario vor Widersprüchen?'), back: T('Write the constraints down together, like the 80-page “bible” of Minority Report, and check every change against it.', 'Schreib die Constraints gemeinsam auf, wie die 80-seitige „Bibel“ von Minority Report, und prüf jede Änderung dagegen.') },
      { front: T('In what order do you try reframing paths?', 'In welcher Reihenfolge probierst du Reframing-Wege?'), back: T('Repertoire (Bernanke’s Depression template), then repurposing (IKEA from fashion), invention last (Darwin’s tree of life).', 'Repertoire (Bernankes Depressions-Schablone), dann Repurposing (IKEA aus der Mode), Erfindung zuletzt (Darwins Baum des Lebens).') },
      { front: T('Why not reframe again after a failed reframing?', 'Warum nicht nach einem gescheiterten Reframing sofort neu reframen?'), back: T('Each switch costs cognitive energy and understanding. Repeated switching disorients instead of correcting.', 'Jeder Wechsel kostet kognitive Energie und Verständnis. Wiederholtes Wechseln desorientiert, statt zu korrigieren.') },
      { front: T('Why frame alone before deciding together?', 'Warum erst allein framen, dann gemeinsam entscheiden?'), back: T('Chapter 7 research: even diverse teams quickly settle on consensus and under-use their differences, unless members think individually first.', 'Forschung aus Kapitel 7: Auch diverse Teams einigen sich schnell und nutzen ihre Unterschiede zu wenig, außer die Mitglieder denken zuerst einzeln.') },
      { front: T('What is the point of a designated dissenter?', 'Wozu dient eine benannte Gegenstimme?'), back: T('To make unwelcome frames audible. Cassandra, and the jester who asked how the generals would get out again, show what is lost without one.', 'Damit unwillkommene Frames hörbar werden. Kassandra und der Narr, der die Generäle fragte, wie sie wieder herauskommen, zeigen, was ohne sie verloren geht.') },
    ],
    critique: [
      { claim: T('A guide with concrete guidelines helps people frame better.', 'Ein Leitfaden mit konkreten Regeln hilft Menschen, besser zu framen.'),
        challenge: T('The book itself says that choosing a frame is an act of insight, not a routine. A checklist converts insight into the appearance of method: it feels rigorous and can be completed without having seen anything. The defensible use is as a set of questions that prompt noticing, never as a procedure whose completion counts as evidence of good framing. There is also no evidence in the book that following the guide improves outcomes; its support is case stories that were told after success.', 'Das Buch selbst sagt, die Wahl eines Frames sei ein Akt der Einsicht, keine Routine. Eine Checkliste verwandelt Einsicht in den Anschein von Methode: Sie fühlt sich rigoros an und lässt sich abarbeiten, ohne etwas gesehen zu haben. Haltbar ist die Nutzung als Fragenset, das zum Bemerken anregt, nie als Verfahren, dessen Abschluss als Beleg guten Framings gilt. Zudem belegt das Buch nicht, dass die Befolgung des Leitfadens Ergebnisse verbessert; es stützt sich auf Fallgeschichten, die nach dem Erfolg erzählt wurden.') },
      { claim: T('Seeking dissent and having each person frame alone creates better group decisions.', 'Widerspruch zu suchen und alle allein framen zu lassen führt zu besseren Gruppenentscheidungen.'),
        challenge: T('The guide is silent on power. Who may dissent without cost, who decides which frame wins, and who benefits from the chosen frame? A designated dissenter with no protection is decoration; a written frame from a junior person can be read and discarded by the person who decides. Meeting design reduces anchoring but does not touch the decision right. The toolkit needs a rule such as “the person with the decision right writes their frame last”.', 'Der Leitfaden schweigt zur Macht. Wer darf ohne Kosten widersprechen, wer entscheidet, welcher Frame gewinnt, und wem nützt der gewählte Frame? Eine benannte Gegenstimme ohne Schutz ist Dekoration; ein aufgeschriebener Frame einer Nachwuchskraft kann von der entscheidenden Person gelesen und verworfen werden. Meeting-Design verringert Verankerung, berührt aber das Entscheidungsrecht nicht. Der Werkzeugkasten braucht eine Regel wie „wer das Entscheidungsrecht hat, schreibt den eigenen Frame zuletzt“.') },
      { claim: T('“Speak the truth, even when uncomfortable; the courage is respected by those who matter.”', '„Sprich die Wahrheit, auch wenn sie unbequem ist; der Mut wird von denen respektiert, auf die es ankommt.“'),
        challenge: T('This is the least supported sentence of the appendix, and the book’s own cases contradict it. Semmelweis was right about handwashing and met resistance from the Viennese medical community instead of respect. Cassandra was not respected. Whether truth-telling is rewarded depends on the hierarchy and the audience; in many organisations the person who “speaks truth” pays and the person who benefits does not. A sociologist would call this advice individualised responsibility for a structural problem: the design should make dissent safe, not heroic.', 'Das ist der am wenigsten gestützte Satz des Anhangs, und die Fälle des Buchs selbst widersprechen ihm. Semmelweis hatte mit dem Händewaschen recht und stieß bei der Wiener Ärzteschaft auf Widerstand statt auf Respekt. Kassandra wurde nicht respektiert. Ob Wahrheit belohnt wird, hängt von Hierarchie und Publikum ab; in vielen Organisationen zahlt die Person, die „die Wahrheit sagt“, und die Person, die profitiert, nicht. Soziologisch ist das individualisierte Verantwortung für ein strukturelles Problem: Das Design soll Widerspruch sicher machen, nicht heldenhaft.') },
    ],
    transfer: [
      T('Leadership', 'Führung'),
    ].map((ctx) => ({ context: ctx, prompt: T('Redesign your next team decision meeting with three changes only: a one-sentence goal sent in advance, ten silent minutes in which everyone writes their frame, and a rotating dissenter. Afterwards ask the team which of the three changed the discussion most. Add one rule that protects the dissenter.', 'Gestalte dein nächstes Team-Entscheidungsmeeting mit nur drei Änderungen um: ein Ein-Satz-Ziel vorab, zehn stille Minuten, in denen alle ihren Frame aufschreiben, und eine wechselnde Gegenstimme. Frag danach das Team, welche der drei Änderungen die Diskussion am meisten verändert hat. Ergänze eine Regel, die die Gegenstimme schützt.') }))
      .concat([
        { context: T('AI prompting', 'KI-Prompting'), prompt: T('Treat a prompt as applying the toolkit. Write the assumption (“why and how”), name the hard and soft constraints, ask the model to answer from a wise friend, a rival and a role model in turn, and finally ask it to list the strongest objections to its own answer. Compare with your normal prompt. Which group of the toolkit did the model not do on its own?', 'Behandle einen Prompt als Anwendung des Werkzeugkastens. Schreib die Annahme auf („warum und wie“), benenne harte und weiche Constraints, bitte das Modell, nacheinander als weise Freundin, als Rivale und als Vorbild zu antworten, und lass es zum Schluss die stärksten Einwände gegen die eigene Antwort auflisten. Vergleiche mit deinem normalen Prompt. Welche Gruppe des Werkzeugkastens hat das Modell nicht von selbst geleistet?') },
        { context: T('Consulting', 'Beratung'), prompt: T('In your next diagnostic or kick-off, run the six questions of the meeting designer on the client’s steering meeting before you advise anything. Report the weakest lever to the client as an observation about the meeting, not about the people, and propose one change that costs nothing.', 'Lass im nächsten Diagnose- oder Kick-off-Gespräch die sechs Fragen des Meeting-Designers auf das Steuerungsmeeting des Kunden laufen, bevor du irgendetwas empfiehlst. Spiegle dem Kunden den schwächsten Hebel als Beobachtung über das Meeting, nicht über die Personen, und schlage eine Änderung vor, die nichts kostet.') },
      ]),
    summary: [
      T('The appendix offers five groups: harness models, dream with constraints, reframe wisely, conditions matter, think beyond yourself.', 'Der Anhang bietet fünf Gruppen: Modelle nutzen, mit Constraints träumen, klug reframen, Bedingungen zählen, über sich hinausdenken.'),
      T('Each guideline is justified by a chapter case: Semmelweis, SpaceX, Austrian wine, Minority Report, Bernanke, IKEA, Darwin, Cassandra.', 'Jede Leitlinie wird durch einen Fall aus den Kapiteln begründet: Semmelweis, SpaceX, österreichischer Wein, Minority Report, Bernanke, IKEA, Darwin, Kassandra.'),
      T('In practice the toolkit is a set of questions, ordered by effort and risk: change little first, borrow before inventing, switch once.', 'In der Praxis ist der Werkzeugkasten ein Fragenset, geordnet nach Aufwand und Risiko: erst wenig ändern, leihen vor erfinden, einmal wechseln.'),
      T('Meeting design carries the conditions: frame alone first, name constraints, appoint a dissenter, set a frame deadline.', 'Das Meeting-Design trägt die Bedingungen: erst allein framen, Constraints benennen, Gegenstimme bestimmen, Frame-Frist setzen.'),
      T('The toolkit is silent on power and overstates the reward for truth-telling; use it as prompts for noticing, not as proof of method.', 'Der Werkzeugkasten schweigt zur Macht und überschätzt die Belohnung für Wahrheit; nutze ihn als Impuls zum Bemerken, nicht als Methodennachweis.'),
    ],
    glossary: [
      { term: T('Mutability', 'Mutabilität'), def: T('A principle for choosing constraints: loosen those that people can actually change (human choices) rather than fixed ones (budget, physics).', 'Prinzip zur Wahl von Constraints: Lockere die, die Menschen tatsächlich ändern können (menschliche Entscheidungen), statt unveränderlicher (Budget, Physik).') },
      { term: T('Minimal change', 'Minimale Änderung'), def: T('Start by altering as little as possible and escalate only if no useful option appears.', 'Beginne mit so wenig Änderung wie möglich und eskaliere nur, wenn keine brauchbare Option entsteht.') },
      { term: T('Consistency', 'Konsistenz'), def: T('Constraints that are loosened or added must not contradict each other or underlying beliefs; otherwise the imagined alternative collapses.', 'Constraints, die gelockert oder ergänzt werden, dürfen einander und zugrunde liegenden Überzeugungen nicht widersprechen; sonst bricht die vorgestellte Alternative zusammen.') },
      { term: T('Colourfulness', 'Bunt statt farbenblind'), def: T('Term from the sociology of race used in chapter 8: openly acknowledging differences, as opposed to the colour-blind frame that erases them.', 'Begriff aus der Soziologie des Rassismus, verwendet in Kapitel 8: Unterschiede offen anerkennen, im Gegensatz zum farbenblinden Frame, der sie auslöscht.') },
    ],
  });
})();
