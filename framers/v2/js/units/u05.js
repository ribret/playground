/* u05 (v2): Chapter 5, Constraints */
(function () {
  const P = V.palette;

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
    { duration: 6000,
      caption: '<b>Unbounded imagination produces plans, not a plan.</b> In 1976 Israeli planners faced a hijacked plane in Uganda and a list of ideas, each with a fatal flaw.',
      svg: (l) => V.wrap(
        V.text(200, 36, 'Entebbe 1976: every plan open', { size: 15, bold: true, cls: 'a-fade' }) +
        V.pill(115, 90, '1,000 troops', { fill: P.muted, cls: 'a-pop', delay: .4 }) +
        V.pill(290, 118, 'Disguise', { fill: P.muted, cls: 'a-pop', delay: .7 }) +
        V.pill(120, 168, 'Lake route', { fill: P.muted, cls: 'a-pop', delay: 1 }) +
        V.pill(290, 205, 'Negotiate', { fill: P.muted, cls: 'a-pop', delay: 1.3 }) +
        V.text(215, 160, '?', { size: 34, fill: P.line, bold: true, cls: 'a-float', delay: 1.5 }) +
        V.text(60, 230, '?', { size: 30, fill: P.line, bold: true, cls: 'a-float', delay: 1.7 }) +
        V.text(350, 72, '?', { size: 30, fill: P.line, bold: true, cls: 'a-float', delay: 1.9 })) },

    { duration: 6500,
      caption: '<b>One fixed requirement collapses the field.</b> Dan Shomron made surprise non-negotiable. Mass, disguise and the crocodile lake dropped out; a night landing disguised as an airport convoy remained.',
      svg: (l) => {
        let s = V.frame(20, 48, 360, 192, { color: P.plum, label: 'Hard: surprise', cls: 'a-pop' });
        [['1,000 troops', 95], ['Disguise', 145], ['Lake route', 195]].forEach(([t, y], i) => {
          s += V.group(V.pill(110, y, t, { fill: P.muted }), { opacity: .45, cls: 'a-fade', delay: .3 });
          s += V.text(110, y + 10, '✕', { size: 28, fill: P.coral, bold: true, cls: 'a-pop', delay: .8 + i * .3 });
        });
        s += V.arrow(195, 145, 240, 145, { color: 'ink', cls: 'a-draw', delay: 1.8 });
        s += V.bulb(305, 128, { scale: 1.5, cls: 'a-pop', delay: 2.2 });
        s += V.text(305, 188, 'Night landing', { size: 14, bold: true, fill: P.plum, cls: 'a-fade', delay: 2.4 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: '<b>A hard constraint is a wall, a soft one a fence.</b> Tear down the wall and you have left the frame. A fence can be moved, though rarely for free.',
      svg: (l) => {
        let s = V.text(105, 50, 'Hard', { size: 16, bold: true, fill: P.plum, cls: 'a-fade' }) + V.text(290, 50, 'Soft', { size: 16, bold: true, fill: P.plum, cls: 'a-fade' });
        for (let r = 0; r < 6; r++) {
          const y = 66 + r * 21, d = .2 + r * .12;
          const bricks = r % 2 === 0 ? [[40, 42], [84, 42], [128, 42]] : [[40, 20], [62, 42], [106, 42], [150, 20]];
          bricks.forEach(([x, w]) => { s += V.rect(x, y, w, 19, { fill: P.plum, stroke: P.paper2, sw: 2, r: 2, cls: 'a-rise', delay: d }); });
        }
        const fence = (dx, o) => [240, 280, 320, 360].map(x => V.line(x + dx, 80, x + dx, 190, o)).join('') + V.line(232 + dx, 110, 368 + dx, 110, o) + V.line(232 + dx, 165, 368 + dx, 165, o);
        s += V.group(fence(-30, { stroke: P.muted, sw: 2, dash: '5 5' }), { cls: 'a-fade', delay: .9 });
        s += V.group(fence(0, { stroke: P.plum, sw: 4 }), { cls: 'a-slide', delay: 1.4 });
        s += V.arrow(255, 205, 300, 205, { color: 'muted', cls: 'a-draw', delay: 1.9 });
        s += V.text(105, 230, 'drop it = drop the frame', { size: 12, bold: true, cls: 'a-fade', delay: 2.2 });
        s += V.text(290, 232, 'movable, with effort', { size: 12, bold: true, cls: 'a-fade', delay: 2.4 });
        return V.wrap(s);
      } },

    { duration: 6000,
      caption: '<b>Three dials for the soft constraints.</b> Mutability: change what you can influence. Minimal change: turn as little as possible. Consistency: no setting may contradict another.',
      svg: (l) => V.wrap(
        V.text(200, 36, 'Three rules for soft constraints', { size: 15, bold: true, cls: 'a-fade' }) +
        dial(75, 120, 45, 'Mutability', .3) +
        dial(200, 120, -15, 'Minimal change', .9) +
        dial(325, 120, 20, 'Consistency', 1.5)) },

    { duration: 6500,
      caption: '<b>Mutability: find the constraint that has quietly become movable.</b> NASA took aerodynamic lift as given and got the winged shuttle. SpaceX kept “slow the fall” but used the engine, because sensors and computing now allowed it.',
      svg: (l) => V.wrap(
        V.pill(200, 30, 'Kept: slow the fall', { fill: P.plum, cls: 'a-pop' }) +
        V.text(100, 62, 'Shuttle', { size: 13, bold: true, cls: 'a-fade', delay: .3 }) +
        V.path('M100,72 L112,98 L112,168 L142,196 L58,196 L88,168 L88,98 Z', { fill: P.paper, stroke: P.ink, sw: 2, cls: 'a-fade', delay: .4 }) +
        V.text(100, 228, 'Lift: fixed', { size: 13, bold: true, fill: P.muted, cls: 'a-fade', delay: .8 }) +
        V.arrow(160, 135, 240, 135, { color: 'ink', cls: 'a-draw', delay: 1.2 }) +
        V.text(300, 62, 'Falcon 9', { size: 13, bold: true, cls: 'a-fade', delay: 1.5 }) +
        V.rect(290, 72, 20, 104, { fill: P.paper, stroke: P.ink, sw: 2, r: 4, cls: 'a-rise', delay: 1.6 }) +
        V.path('M291,170 L276,190 M309,170 L324,190', { stroke: P.ink, sw: 2.5, cls: 'a-draw', delay: 1.9 }) +
        V.path('M293,177 L300,204 L307,177 Z', { fill: P.amber, stroke: P.coral, sw: 1.5, cls: 'a-pulse', delay: 2.1 }) +
        V.line(260, 208, 340, 208, { stroke: P.ink, sw: 3, cls: 'a-draw', delay: 2 }) +
        V.text(300, 236, 'Lift: mutable', { size: 13, bold: true, fill: P.plum, cls: 'a-fade', delay: 2.4 })) },

    { duration: 6000,
      caption: '<b>Minimal change: turn one dial, not all of them.</b> After the 1985 wine scandal, Austrian growers did not switch crops. They kept the grapes and changed one thing: volume became quality.',
      svg: (l) => {
        let s = V.text(200, 36, 'Same grapes, new product', { size: 15, bold: true, cls: 'a-fade' });
        for (let i = 0; i < 12; i++) s += bottle(45 + (i % 4) * 28, 100 + Math.floor(i / 4) * 50, 28, P.muted, { cls: 'a-pop', delay: .2 + i * .05 });
        s += V.text(87, 222, 'Volume', { size: 14, bold: true, fill: P.muted, cls: 'a-fade', delay: .8 });
        s += V.arrow(165, 140, 235, 140, { color: 'ink', cls: 'a-draw', delay: 1.1 });
        [270, 305, 340].forEach((x, i) => { s += bottle(x, 195, 78, P.plum, { cls: 'a-rise', delay: 1.4 + i * .2 }); });
        s += V.text(305, 222, 'Quality', { size: 14, bold: true, fill: P.plum, cls: 'a-fade', delay: 2 });
        s += V.text(200, 250, 'not: apricots instead of wine', { size: 12, fill: P.coral, bold: true, cls: 'a-fade', delay: 2.4 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: '<b>Externalised constraints: the frame becomes a place.</b> The commandos rehearsed in a terminal of poles and tarps. A physical model enforces its limits; a mental one lets you cheat.',
      svg: (l) => V.wrap(
        V.text(200, 36, 'Constraints you can touch', { size: 15, bold: true, cls: 'a-fade' }) +
        V.rect(25, 75, 125, 105, { fill: 'none', stroke: P.plum, sw: 2, dash: '6 5', cls: 'a-fade', delay: .3 }) +
        V.text(87, 132, 'in the head', { size: 13, bold: true, fill: P.plum, cls: 'a-fade', delay: .4 }) +
        V.arrow(158, 128, 205, 128, { color: 'ink', cls: 'a-draw', delay: .9 }) +
        V.path('M218,82 L362,82 L362,94 L218,94 Z', { fill: P.plum, stroke: P.plum, opacity: .85, cls: 'a-fade', delay: 1.3 }) +
        [225, 265, 315, 355].map((x, i) => V.line(x, 94, x, 182, { stroke: P.ink, sw: 3, cls: 'a-draw', delay: 1.1 + i * .1 })).join('') +
        V.path('M225,100 L265,100 L265,182 L225,182 Z', { fill: P.plum, stroke: 'none', opacity: .3, cls: 'a-fade', delay: 1.6 }) +
        V.path('M315,100 L355,100 L355,182 L315,182 Z', { fill: P.plum, stroke: 'none', opacity: .3, cls: 'a-fade', delay: 1.7 }) +
        V.person(290, 168, { color: P.ink, scale: .6, cls: 'a-pop', delay: 1.9 }) +
        V.person(245, 168, { color: P.ink, scale: .6, cls: 'a-pop', delay: 2.1 }) +
        V.text(290, 218, 'poles and tarps', { size: 13, bold: true, cls: 'a-fade', delay: 2.3 })) },
  ];

  /* ---------- section visuals ---------- */
  const visCoreRing = (l) => {
    const one = (x, title, core, ring, d) =>
      V.text(x, 30, title, { size: 13, bold: true, cls: 'a-fade', delay: d }) +
      V.circle(x, 132, 84, { fill: P.paper, stroke: P.plum, sw: 2.5, cls: 'a-pop', delay: d }) +
      V.circle(x, 132, 40, { fill: P.plum, cls: 'a-pop', delay: d + .3 }) +
      V.text(x, 137, core, { size: 13, bold: true, fill: '#fff', cls: 'a-fade', delay: d + .4 }) +
      V.text(x, 196, ring, { size: 12, bold: true, fill: P.plum, cls: 'a-fade', delay: d + .6 });
    return V.wrap(
      one(105, 'Accounting', '2 + 2 = 4', 'valuation rules', .1) +
      one(295, 'Theology', 'God', 'interpretation', .6) +
      V.text(200, 245, 'core: hard · ring: soft', { size: 12, bold: true, fill: P.muted, cls: 'a-fade', delay: 1.4 }));
  };

  const visPrinciples = (l) => {
    const cards = [
      ['Mutability', 'SpaceX:\nengine, not\nwings', 'What can I\ninfluence?'],
      ['Minimal\nchange', 'Wine:\nquality, not\na new crop', 'What is the\nsmallest shift?'],
      ['Consistency', 'Minority Report:\ncities have\ntime depth', 'Does it clash\nwith another?'],
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

  const visWine = (l) => {
    const base = 205, k = 24;
    let s = V.line(30, base, 370, base, { stroke: P.ink, sw: 2 });
    const grp = (x0, title, after, mult, d) =>
      V.rect(x0, base - k, 44, k, { fill: P.muted, stroke: 'none', r: 3, cls: 'a-rise', delay: d }) +
      V.rect(x0 + 60, base - k * after, 44, k * after, { fill: P.plum, stroke: 'none', r: 3, cls: 'a-rise', delay: d + .4 }) +
      V.text(x0 + 22, base + 18, 'before', { size: 12, fill: P.muted, cls: 'a-fade', delay: d }) +
      V.text(x0 + 82, base + 18, '2019', { size: 12, fill: P.plum, bold: true, cls: 'a-fade', delay: d + .4 }) +
      V.text(x0 + 82, base - k * after - 10, mult, { size: 14, bold: true, fill: P.plum, cls: 'a-pop', delay: d + .7 }) +
      V.text(x0 + 52, base + 40, title, { size: 13, bold: true, cls: 'a-fade', delay: d });
    s += grp(50, 'Export volume', 2, '×2', .2);
    s += grp(230, 'Export value', 6, '×6', .9);
    return V.wrap(s);
  };

  /* ---------- register ---------- */
  window.FRAMERS.register({
    id: 'u05', number: 5, kind: 'chapter', color: '#6C4AB6', minutes: 20,
    title: 'Constraints',
    tagline: 'Imagination only becomes action once it is bounded: keep the hard limits, turn the soft ones with care.',
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="6" y="6" width="32" height="32" rx="5" fill="none" stroke="${c}" stroke-width="2.5" stroke-dasharray="4 3"/><rect x="15" y="15" width="14" height="14" rx="3" fill="${c}"/></svg>`,
    hook: '<p>June 1976: more than a hundred hostages sit in an old terminal at Entebbe, Uganda, 4,000 kilometres from Israel. On the table: fly in a thousand soldiers, pose as released prisoners, paddle across Lake Victoria. Each idea would get people killed. What produced a workable plan was a decision about what must not be given up.</p>',
    objectives: [
      'Explain why constraints turn counterfactual ideas into options you can act on.',
      'Distinguish hard from soft constraints and justify the call relative to the frame.',
      'Apply mutability, minimal change and consistency to a real plan.',
    ],
    film: { title: 'From every plan to the one that works', scenes },
    sections: [
      { id: 's1', heading: 'The glue between imagining and acting',
        body: '<p>Brigadier General Dan Shomron did not start with a cleverer idea. He fixed one requirement: <strong>surprise</strong>. Anything that would alert the hijackers was out; the size of the force and the time of landing stayed adjustable. From that anchor came the plan: land at night with vehicles a Ugandan general might use, drive to the terminal, free the hostages, fly home. The team rehearsed on a mock terminal of poles and tarps.</p><p>The chapter’s point: counterfactuals without constraints produce worlds too loosely tied to your causal model to guide action. Constraints decide <em>which</em> what-ifs you consider, and you can tighten, loosen, add or remove them.</p>',
        keyIdea: 'Causality lets you understand, counterfactuals let you imagine, constraints make the imagined actionable.' },
      { id: 's2', heading: 'Hard and soft constraints',
        body: '<p>In every frame some constraints are <strong>hard</strong>: they carry the frame’s central tenet. In financial accounting, two plus two equals four; a theologian exploring readings of scripture does not suspend belief in God. Drop a hard constraint and you have not found a bold option, you have left the frame. <strong>Soft</strong> constraints can be bent, even if only with real effort.</p><p>Procedure: secure the hard constraints first, then iterate the soft ones. Hardness is <em>relative to a frame</em>, and constraints lie on a gradient, not in two boxes. That opens a question the chapter leaves alone: who gets to declare a constraint hard?</p>',
        visual: { svg: visCoreRing, position: 'bottom', caption: 'Hard constraints form the core. Changing the ring is work inside the frame; breaking the core means changing frames.' } },
      { id: 's3', heading: 'Three principles for the soft ones',
        body: '<p><strong>Mutability:</strong> change what you can actually influence, ideally human choices rather than physics. NASA assumed a returning rocket needed aerodynamic lift and got the winged shuttle; SpaceX kept the goal (slow the fall) and treated lift as movable once sensors and computing made engine landings feasible.</p><p><strong>Minimal change:</strong> adjust as few constraints as possible, so reality still shows through. Flipkart did not reinvent e-commerce; it allowed cash on delivery.</p><p><strong>Consistency:</strong> constraints must not contradict each other. For <em>Minority Report</em>, Spielberg had experts build a coherent 2050 and broke realism knowingly only twice.</p><p>Externalising helps: mock-ups and simulators enforce constraints you would bend in your head, but whatever they leave out goes unpractised.</p>',
        visual: { svg: visPrinciples, position: 'bottom', caption: 'Each principle comes with a guiding question. The chapter gives no rule for when the answers conflict.' } },
    ],
    exercise: {
      type: 'sort',
      title: 'Hard or soft? An AI coding-assistant pilot',
      instructions: 'The frame: a software consultancy pilots AI coding assistants in its delivery teams, and engineers stay accountable for every line that ships. Sort each constraint: hard (dropping it abandons this frame or breaks a binding commitment) or soft (movable, perhaps with effort). Several are deliberately borderline.',
      categories: [{ id: 'hard', label: 'Hard' }, { id: 'soft', label: 'Soft' }],
      items: [
        { text: 'Every change that reaches production is reviewed and owned by a named engineer.', category: 'hard',
          why: 'The frame’s core. Drop it and you are automating delivery, a different frame with different risks.' },
        { text: 'Client source code may only be processed where the client contract allows it.', category: 'hard',
          why: 'Binding. But note the gradient: <em>which</em> tools are approved can be renegotiated with clients.' },
        { text: 'The pilot must stay within this year’s tooling budget.', category: 'soft',
          why: 'Hard for the project lead, soft for the leadership team that can reallocate. Hardness depends on where you sit.' },
        { text: 'The assistant must be the vendor the company already has a licence with.', category: 'soft',
          why: 'A procurement path, not a law of nature. Moving it costs time, which only makes it feel hard.' },
        { text: 'Teams keep their two-week sprint rhythm unchanged during the pilot.', category: 'soft',
          why: 'A team norm, therefore mutable, though people tend to treat norms as fixed.' },
        { text: 'All twelve teams start on the same day.', category: 'soft',
          why: 'Self-imposed and often political; it can be staggered. Treating it as hard tends to sacrifice something truly hard, such as review.' },
      ],
    },
    caseStudy: {
      title: 'Austrian wine: from scandal to luxury with one turned dial',
      body: '<p>Vineyards along the Danube in Lower Austria long produced large volumes of ordinary wine. In 1985 it emerged that some merchants had sweetened it with diethylene glycol. Austrian wine was banned in several markets, millions of bottles were destroyed and, per the chapter, exports fell by about 90 percent. Strict new laws made high volume at low quality unviable.</p><p>A younger generation of growers did not switch to apples or apricots. They kept the grapes and the craft and changed one thing: compete on quality, not quantity. That meant using only the best grapes, building brands and creating wine tourism. By 2019, the chapter reports, export volume had about doubled against pre-scandal levels while export value had grown roughly sixfold.</p>',
      lesson: 'Minimal change is not timidity. The growers kept every constraint that carried their identity and moved the one that the new reality had made untenable.',
      visual: { svg: visWine, caption: 'Austrian wine exports before the scandal and in 2019 (relative, per the chapter). The change sits in the product, not the crop.' },
    },
    reflection: {
      intro: 'Take a decision or change initiative you are working on right now.',
      prompts: [
        'Which of your constraints are hard because dropping them would abandon the frame, and which only feel hard because someone declared them so?',
        'Which single soft constraint, if loosened, would open the most useful options, and does loosening it contradict anything you must keep?',
      ],
      placeholder: 'Hard: … Soft but treated as hard: … The dial I would turn: …',
    },
    quiz: [
      { case: '<p>April 1970: after an oxygen tank exploded, the Apollo 13 crew sheltered in the lunar module, whose carbon dioxide scrubbers were sized for two people, not three. The command module’s spare canisters were square; the lunar module’s sockets were round. Houston engineers designed an adapter from items aboard (plastic bag, flight-plan cover, suit hose, duct tape); the crew built it.</p>',
        q: 'Seen through this chapter, what made the problem solvable in the time available?',
        options: [
          { text: 'They brainstormed every conceivable fix first and only then filtered by feasibility.', why: 'Unbounded generation is what the chapter warns against: shrink the search space fast, do not maximise options.' },
          { text: 'They loosened the hardest limit by asking how to get new canisters aboard.', why: 'Nothing could reach the crew. Treating a hard constraint as soft creates no option; it burns hours you do not have.' },
          { text: 'They fixed the inventory on board and treated each object’s purpose as open.', why: 'Right: hard constraint first (only what is aboard), then iterate soft ones. A flight-plan cover became structure.' },
          { text: 'They applied minimal change by keeping both scrubber systems exactly as designed.', why: 'That would have left square canisters facing round sockets. Minimal change means few adjustments, not none.' }
        ],
        answer: 2,
        explain: 'Separate what cannot move from what merely has a usual purpose.' },
      { case: '<p>In Japanese car plants of the 1950s and 1960s, changing the heavy dies on big stamping presses took hours, so long runs of one part seemed unavoidable. At Toyota, Shigeo Shingo separated the steps that need a stopped machine from those that can be done while it runs, and moved as many as possible outside the stoppage. Changeovers fell below ten minutes.</p>',
        q: 'Which principle best describes what Shingo saw?',
        options: [
          { text: 'Mutability: the long changeover was a human procedure, not physics, so it could change.', why: 'Right: the limit looked like a property of the machines but reflected how people organised work, so it could be altered.' },
          { text: 'Hard constraint respected: big batches were core to mass production, so he kept them.', why: 'Big batches followed from a soft constraint mistaken for a hard one, not from the frame’s central tenet.' },
          { text: 'Consistency: he removed a contradiction between the goal of speed and the presses.', why: 'Long changeovers were costly but coherent. Consistency concerns constraints that clash with each other, not slowness.' },
          { text: 'Reframing: he replaced the mass production frame with an entirely new one.', why: 'Presses, dies and products stayed. He moved one assumed limit inside the manufacturing frame, which is constraint work.' }
        ],
        answer: 0,
        explain: 'Ask of any “that is just how long it takes”: law of nature or habit?' },
      { case: '<p>In autumn 1982 seven people around Chicago died after taking Tylenol capsules laced with cyanide. Johnson &amp; Johnson recalled about 31 million bottles, and commentators doubted the brand would survive. Weeks later it relaunched the same product under the same name in a triple-sealed, tamper-resistant package, and Tylenol regained much of its market share.</p>',
        q: 'Which principle does the relaunch illustrate most clearly?',
        options: [
          { text: 'Mutability, because it set out to change customer behaviour rather than its product.', why: 'Customers had to change nothing. The company moved a constraint it controlled, the package, and trust followed.' },
          { text: 'Consistency, because the new package resolved a conflict between brand and price.', why: 'No brand versus price clash existed. The problem was a broken safety assumption, fixed by adjusting one element.' },
          { text: 'Reinvention, because a crisis of that scale demanded a wholly new frame for the business.', why: 'That was the commentators’ instinct. It confuses the size of a shock with the size of the change needed.' },
          { text: 'Minimal change: what carried trust stayed and only the vulnerable element was altered.', why: 'Right: product and name stayed; the company moved the one constraint reality had made untenable.' }
        ],
        answer: 3,
        explain: 'A dramatic shock does not require a dramatic redesign: change the element that failed.' },
      { case: '<p>The Swedish warship Vasa was built with two full gun decks, among the most heavily armed ships of her day, while the king pressed for an early launch. In a stability test, about thirty men ran across the deck; it was halted after three runs because she heeled so far. She sailed anyway in August 1628 and capsized about 1,300 metres out.</p>',
        q: 'What is the core failure, read as a problem of constraints?',
        options: [
          { text: 'The deadline was a soft constraint treated as hard, so the ship sailed too early.', why: 'Time pressure explains the ignored warning, not the flaw. More time would not have fixed a hull too heavy up high.' },
          { text: 'Requirements that could not hold together were kept side by side and never reconciled.', why: 'Right: heavy armament high up and stability at sea pulled against each other. The test exposed the clash; nobody resolved it.' },
          { text: 'The builders had too few constraints and drowned in design options.', why: 'They had a tight brief, not an open field. Their constraints contradicted one another.' },
          { text: 'The builders ignored mutability by treating the laws of buoyancy as negotiable.', why: 'Nobody argued physics away. It won because two other demands were stacked on it unchecked.' }
        ],
        answer: 1,
        explain: 'When a test shows that requirements clash, decide which one yields.' },
      { case: '<p>London’s Millennium Bridge opened in June 2000 and closed two days later because it swayed sideways under crowds. Its design analysis had not captured how walkers and a slightly moving deck reinforce each other’s sideways motion. After dampers were fitted, the bridge reopened in 2002.</p>',
        q: 'Which lesson about models and externalised constraints fits best?',
        options: [
          { text: 'Models are unreliable, so physical prototypes should replace computer analysis in bridge design.', why: 'Overcorrects. A physical model is also a selection of constraints and leaves things out too.' },
          { text: 'The engineers broke the consistency principle by combining two incompatible design codes.', why: 'No conflicting codes were involved. The constraint was absent from the model, not contradicted within it.' },
          { text: 'A model constrains by leaving things out, and what it omits goes untested.', why: 'Right: the model focused on chosen loads; the omitted crowd effect surfaced only in reality.' },
          { text: 'The design had too many constraints, which hid the better option from view.', why: 'The failure came from a missing constraint, not an excess. Adding the crowd effect is what fixed it.' }
        ],
        answer: 2,
        explain: 'A model’s focus is also its blind spot: ask what it leaves out.' },
    ],
    flashcards: [
      { front: 'Constraint (in the book)', back: 'A rule or restriction that shapes which counterfactuals you consider. The third C: it makes imagined alternatives actionable.' },
      { front: 'Hard vs. soft constraint', back: 'Hard: carries the frame’s core; dropping it means leaving the frame. Soft: movable, perhaps with effort. Hardness is relative to the frame.' },
      { front: 'Mutability', back: 'Change constraints you can actually influence, ideally human choices. SpaceX: lift became mutable, slowing the fall stayed. Caveat: we treat norms as fixed.' },
      { front: 'Minimal change', back: 'Adjust as few constraints as possible so reality shows through. Austrian wine: quality instead of volume, not a new crop.' },
      { front: 'Consistency', back: 'Constraints must not contradict each other, and the more there are, the harder that gets. Minority Report: a coherent 2050.' },
    ],
    critique: [
      { claim: 'Algorithms cannot set constraints or boundary conditions on their own.',
        challenge: 'Written before large language models, this is dated. Current models propose hard and soft constraints, flag contradictions and narrow a search space. The defensible claim is narrower: the machine does not <em>own</em> the choice of which constraints count as hard, nor carry responsibility for it.' },
      { claim: 'Constraints are hard or soft relative to the frame; choosing them is a cognitive skill.',
        challenge: 'Who declares a constraint hard is also a question of power. A budget is hard for a department head and soft for the board. Organisational sociology would ask whose interests the line protects. Shomron could fix “surprise” because he had the authority to.' },
      { claim: 'Entebbe shows how wisely chosen constraints produce a workable plan.',
        challenge: 'In April 1980 the US attempt to free hostages in Tehran (Operation Eagle Claw) also relied on surprise and long rehearsal; it was aborted at its desert staging site when too few helicopters were serviceable, and eight servicemen died in a collision during the withdrawal. Without failed cases, method and luck cannot be told apart.' },
    ],
    summary: [
      'Constraints are the third element of applying a frame: they bound counterfactual thinking so that it yields options you can act on.',
      'Hard constraints carry the frame’s core and must be kept; soft ones can be adjusted, and the line between them is relative to the frame.',
      'Mutability, minimal change and consistency guide the soft ones, and models externalise constraints at the price of what they leave out.',
      'The claim that machines cannot set constraints is dated; what stays human is owning the choice of which constraints are hard.',
    ],
    glossary: [
      { term: 'Hard / soft constraint', def: 'Hard: inviolable within the frame, dropping it means dropping the frame. Soft: adjustable, possibly with effort.' },
      { term: 'Mutability principle', def: 'Prefer adjusting constraints you can actually influence, especially those reflecting human choices.' },
      { term: 'Minimal-change principle', def: 'Make as few modifications as possible so the imagined alternative stays close to reality; related to Occam’s razor.' },
      { term: 'Consistency principle', def: 'Constraints must not contradict one another; harder to satisfy the more constraints are in play.' },
    ],
  });
})();
