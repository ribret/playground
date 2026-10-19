/* u01 (v2): Chapter 1 "Decisions", condensed English edition */
(function () {
  const P = V.palette;

  /* hexagon helper for molecule glyphs */
  const hex = (cx, cy, r, o = {}) => {
    let d = '';
    for (let i = 0; i < 6; i++) { const a = Math.PI / 3 * i + Math.PI / 6; d += (i ? 'L' : 'M') + (cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1); }
    return V.path(d + 'Z', o);
  };

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 5500,
      caption: '<b>A mental model filters and connects.</b> Like following one conversation at a loud party: focus on what matters, expect what comes next.',
      svg: (l) => {
        const pts = [[150, 95], [195, 80], [245, 105], [175, 140], [230, 155], [200, 185]];
        let s = V.dots(70, 10, 10, 380, 240, { seed: 5, fill: P.line, r: 3 }) + V.frame(115, 50, 170, 160, { label: 'Frame', cls: 'a-pop' });
        s += [[0, 1], [1, 2], [0, 3], [3, 4], [2, 4], [4, 5]].map(([a, b], i) => V.line(pts[a][0], pts[a][1], pts[b][0], pts[b][1], { stroke: P.coral, sw: 2, cls: 'a-draw', delay: 1 + i * .15 })).join('');
        s += pts.map((p, i) => V.circle(p[0], p[1], 6, { fill: P.coral, cls: 'a-pop', delay: .6 + i * .1 })).join('');
        return V.wrap(s + V.text(200, 243, 'Pattern instead of noise', { size: 13, bold: true, cls: 'a-fade', delay: 2 }));
      } },

    { duration: 6500,
      caption: '<b>Barzilay swapped the question.</b> Not “does it look like a known antibiotic?” but “does it kill bacteria?”. Structure became function.',
      svg: (l) => V.wrap(
        V.frame(20, 50, 160, 160, { label: 'Structure', color: P.muted, cls: 'a-fade' }) +
        hex(82, 118, 20, { stroke: P.muted, sw: 2.5 }) + hex(117, 138, 20, { stroke: P.muted, sw: 2.5 }) +
        V.text(100, 192, 'Looks alike?', { size: 13, fill: P.muted, bold: true }) +
        V.text(100, 150, '✕', { size: 64, fill: P.bad, cls: 'a-pop', delay: 1 }) +
        V.arrow(186, 130, 214, 130, { color: 'coral', cls: 'a-draw', delay: 1.4 }) +
        V.frame(220, 50, 160, 160, { label: 'Function', color: P.coral, cls: 'a-pop', delay: 1.7 }) +
        V.rect(272, 108, 56, 28, { r: 14, fill: P.ok, cls: 'a-pop', delay: 2 }) +
        V.line(262, 146, 338, 98, { stroke: P.coral, sw: 4, cls: 'a-draw', delay: 2.4 }) +
        V.text(300, 192, 'Does it kill?', { size: 13, fill: P.coral, bold: true, cls: 'a-fade', delay: 2.2 })) },

    { duration: 7000,
      caption: '<b>The machine searched inside a human frame.</b> People set the question, training data and search space, and explained the hit afterwards.',
      svg: (l) => {
        const xs = [48, 124, 200, 276, 352];
        const names = ['Question', 'Training', 'Database', 'Search', 'Explain'];
        let s = '';
        xs.forEach((x, i) => {
          const d = .3 + i * .35;
          if (i === 3) s += V.group(V.rect(x - 26, 104, 52, 52, { fill: P.ink, r: 8 }) + V.text(x, 136, 'AI', { size: 16, fill: '#fff', bold: true }), { cls: 'a-pop', delay: d });
          else s += V.group(V.circle(x, 130, 26, { fill: P.paper, stroke: P.coral, sw: 2.5 }) + V.person(x, 140, { color: P.coral, scale: .6 }), { cls: 'a-pop', delay: d });
          s += V.text(x, 182, names[i], { size: 12, bold: true, cls: 'a-fade', delay: d + .1 });
          if (i < 4) s += V.arrow(x + 28, 130, xs[i + 1] - 28, 130, { color: 'ink', sw: 2, cls: 'a-draw', delay: d + .2 });
        });
        s += V.frame(10, 70, 380, 130, { label: 'Human frame', color: P.coral, cls: 'a-fade', delay: 2.2 });
        return V.wrap(s + V.text(200, 238, 'The machine searches inside the frame', { size: 13, bold: true, cls: 'a-fade', delay: 2.6 }));
      } },

    { duration: 6500,
      caption: '<b>No bad frames, only bad fit.</b> Nokia read the phone through a telecom frame, Apple through a computing frame. The second fitted what users wanted.',
      svg: (l) => {
        const L = ['small', 'cheap', 'robust'];
        const R = ['software', 'ease of use', 'apps'];
        let s = V.frame(15, 45, 150, 165, { label: 'Telecom', color: P.muted, cls: 'a-fade', delay: .5 }) +
          V.frame(235, 45, 150, 165, { label: 'Computing', color: P.coral, cls: 'a-fade', delay: 1.2 });
        s += V.rect(184, 96, 32, 64, { r: 6, fill: P.ink, cls: 'a-pop' }) + V.rect(189, 104, 22, 42, { r: 2, fill: P.sky, stroke: P.sky, cls: 'a-pop' });
        s += L.map((t, i) => V.text(90, 92 + i * 26, t, { size: 13, fill: P.muted, bold: true, cls: 'a-fade', delay: .7 + i * .15 })).join('');
        s += R.map((t, i) => V.text(310, 92 + i * 26, t, { size: 13, fill: P.coral, bold: true, cls: 'a-fade', delay: 1.4 + i * .15 })).join('');
        s += V.rect(40, 180, 100, 12, { r: 6, fill: P.paper, stroke: P.line }) + V.rect(40, 180, 35, 12, { r: 6, fill: P.amber, stroke: P.amber, cls: 'a-fade', delay: 2 });
        s += V.rect(260, 180, 100, 12, { r: 6, fill: P.paper, stroke: P.line }) + V.rect(260, 180, 92, 12, { r: 6, fill: P.ok, stroke: P.ok, cls: 'a-fade', delay: 2.2 });
        return V.wrap(s + V.text(200, 242, 'Same device, different frame', { size: 13, bold: true, cls: 'a-fade', delay: 2.5 }));
      } },

    { duration: 7000,
      caption: '<b>Two dead ends: the machine and the mob.</b> Hand decisions to algorithms, or to the gut. The book proposes a third path: framing.',
      svg: (l) => V.wrap(
        V.path('M200,245 L200,165', { stroke: P.ink, sw: 4, cls: 'a-draw' }) +
        V.path('M200,165 Q150,135 95,115', { stroke: P.muted, sw: 4, cls: 'a-draw', delay: .5 }) +
        V.path('M200,165 Q250,135 305,115', { stroke: P.muted, sw: 4, cls: 'a-draw', delay: .5 }) +
        V.line(84, 100, 100, 128, { stroke: P.bad, sw: 6, cls: 'a-pop', delay: 1.1 }) +
        V.line(316, 100, 300, 128, { stroke: P.bad, sw: 6, cls: 'a-pop', delay: 1.1 }) +
        V.text(70, 68, 'Machine', { size: 15, bold: true, cls: 'a-fade', delay: .8 }) +
        V.text(70, 86, 'data decides', { size: 12, fill: P.muted, cls: 'a-fade', delay: .8 }) +
        V.text(330, 68, 'Mob', { size: 15, bold: true, cls: 'a-fade', delay: .8 }) +
        V.text(330, 86, 'gut decides', { size: 12, fill: P.muted, cls: 'a-fade', delay: .8 }) +
        V.path('M200,165 L200,68', { stroke: P.coral, sw: 5, cls: 'a-draw', delay: 1.5 }) +
        V.frame(145, 18, 110, 48, { color: P.coral, cls: 'a-pop', delay: 1.9 }) +
        V.text(200, 48, 'Framing', { size: 15, bold: true, fill: P.coral, cls: 'a-fade', delay: 2 })) },

    { duration: 6500,
      caption: '<b>Framing works through three C.</b> Causality explains, counterfactuals imagine, constraints keep the imagining actionable: dreaming within limits.',
      svg: (l) => V.wrap(V.threeC(200, 95, 'en') +
        [82, 200, 318].map((x, i) => V.text(x, 168, 'Chapter ' + (i + 3), { size: 12, fill: P.muted, cls: 'a-fade', delay: 1 + i * .2 })).join('') +
        V.text(200, 222, 'Dreaming within limits', { size: 15, bold: true, cls: 'a-fade', delay: 1.8 })) },
  ];

  /* ---------- section visuals ---------- */
  const visFit = (l) => {
    const rows = [
      ['Telecom', 'Smartphone', .35, P.amber, 'Nokia', ''],
      ['Computing', 'Smartphone', .92, P.ok, 'Apple', ''],
      ['Class theory', 'Farming', .05, P.bad, 'Lysenko', 'famine'],
    ];
    let s = V.text(75, 40, 'Frame from', { size: 12, fill: P.muted, bold: true }) + V.text(215, 40, 'applied to', { size: 12, fill: P.muted, bold: true }) + V.text(337, 40, 'Fit', { size: 12, fill: P.muted, bold: true });
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
    const left = ['Descartes · 1600s', 'Taylor · c. 1900', 'AI decides'];
    const right = ['Rousseau · 1700s', 'Welch · c. 2000', 'Gut and tribe'];
    let s = V.text(80, 32, 'Machine', { size: 14, bold: true }) + V.text(80, 50, 'hyper-rationalists', { size: 12, fill: P.muted }) +
      V.text(320, 32, 'Mob', { size: 14, bold: true }) + V.text(320, 50, 'emotionalists', { size: 12, fill: P.muted });
    [0, 1, 2].forEach(i => {
      const y = 85 + i * 52, d = .3 + i * .4;
      s += V.pill(80, y, left[i], { fill: i === 2 ? P.ink : P.muted, w: 136, cls: 'a-fade', delay: d }) + V.pill(320, y, right[i], { fill: i === 2 ? P.ink : P.muted, w: 136, cls: 'a-fade', delay: d });
      if (i < 2) s += V.arrow(80, y + 14, 80, y + 36, { color: 'muted', sw: 2, cls: 'a-draw', delay: d + .2 }) + V.arrow(320, y + 14, 320, y + 36, { color: 'muted', sw: 2, cls: 'a-draw', delay: d + .2 });
    });
    s += V.frame(158, 72, 84, 126, { label: 'Framing', color: P.coral, cls: 'a-pop', delay: 1.6 }) +
      V.text(200, 132, 'third', { size: 14, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.8 }) +
      V.text(200, 152, 'path', { size: 14, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.8 });
    return V.wrap(s + V.text(200, 238, 'Not a blend, a third capacity', { size: 13, bold: true, cls: 'a-fade', delay: 2.2 }));
  };

  const visFunnel = (l) => V.wrap(
    V.path('M30,30 H370 L338,80 H62 Z', { fill: P.coral, stroke: P.coral, cls: 'a-fade' }) +
    V.text(200, 61, '2,300 training molecules', { size: 13, fill: '#fff', bold: true, cls: 'a-fade' }) +
    V.path('M64,86 H336 L300,136 H100 Z', { fill: P.ink, stroke: P.ink, cls: 'a-fade', delay: .6 }) +
    V.text(200, 117, '6,000 + 100M screened', { size: 13, fill: '#fff', bold: true, cls: 'a-fade', delay: .6 }) +
    V.path('M102,142 H298 L262,192 H138 Z', { fill: P.coral, stroke: P.coral, cls: 'a-fade', delay: 1.2 }) +
    V.text(200, 173, '1 hit: halicin', { size: 13, fill: '#fff', bold: true, cls: 'a-fade', delay: 1.2 }) +
    V.pill(130, 228, 'human', { fill: P.coral, w: 96, cls: 'a-pop', delay: 1.6 }) +
    V.pill(270, 228, 'machine', { fill: P.ink, w: 96, cls: 'a-pop', delay: 1.8 }));

  window.FRAMERS.register({
    id: 'u01', number: 1, kind: 'chapter', color: '#E4572E', minutes: 20,
    title: 'Decisions',
    tagline: 'Human power comes neither from muscle nor from raw intellect, but from the models through which we see.',
    icon: (c) => `<svg viewBox="0 0 44 44"><path d="M22 40 V24 M22 24 L9 11 M22 24 L35 11" stroke="#8A8F98" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M22 24 V8" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/><rect x="14" y="3" width="16" height="10" rx="3" fill="none" stroke="${c}" stroke-width="2.5"/></svg>`,
    hook: '<p>In 2020 headlines announced that AI had discovered a new antibiotic. The researcher behind it, Regina Barzilay, tells it differently: people chose the question, the data and the search space. Which story is true depends on how you frame the event. That is the chapter in miniature.</p>',
    objectives: [
      'Explain what a frame does and why it shapes the options before any data is weighed.',
      'Distinguish a misfitting frame from a bad frame, and spot the one frame the authors call bad.',
      'Recognise machine and mob moves in real decisions, and argue why framing is not their blend.',
    ],
    film: { title: 'From noise to framing: chapter 1 in six scenes', scenes },
    sections: [
      { id: 's1', heading: 'What frames do, mostly unnoticed',
        body: '<p>A mental model is a simplified representation of how part of the world works. It <strong>filters</strong> (at a loud party you follow one conversation), <strong>explains</strong> what causes what, <strong>generalises</strong> from one case to the next, and lets you <strong>imagine what is not there</strong>. The models we choose and apply, the authors call <em>frames</em>.</p><p>Frames run in the background. You notice them when two people look at the same facts and disagree. In the US mask debate one side applied a health frame, the other a freedom frame: same data, opposite conclusions. Frames even decide what a technology is for: the telephone was first imagined for concerts, the phonograph for spoken messages. Both caught on once the uses were swapped.</p>' },

      { id: 's2', heading: 'No bad frames, only misfit',
        body: '<p>The authors make a strong move: no frame is bad in itself, but frames can fit a situation badly. In 2008 Nokia led the market. Its frame came from telecom: phones should get smaller, cheaper, sturdier. Inside it the bulkier, pricier iPhone looked like a mistake; Apple’s computing frame valued ease of use and software. Nokia lacked neither data nor engineers; it lacked fit.</p><p>Misfit can be lethal. In the Soviet 1930s, Lysenko applied ideas from class theory to plants, for instance dense sowing because plants of one kind would not compete. Critics were fired, jailed or killed, and harvests suffered. This points to the one exception the book develops in chapter 8: the only bad frame is one that denies other frames. Lysenkoism was a misfit that a monopoly protected from correction.</p>',
        visual: { position: 'bottom', svg: visFit,
          caption: 'Fit is a relation between a frame and a domain, not a property of the frame. Nokia’s frame fitted the new market less; Lysenko’s did not fit biology at all.' },
        keyIdea: 'Ask “does this frame fit this domain?”, not “is this frame right?”.' },

      { id: 's3', heading: 'The machine, the mob and a third path',
        body: '<p>The book sets framing against two camps that give up on human judgement. <strong>Hyper-rationalists</strong> want decisions moved into data and algorithms, because people seem too biased. <strong>Emotionalists</strong> trust instinct, belonging and felt rightness, with sharp lines towards “others”. The tension is old: Descartes against Rousseau, Taylor against Jack Welch’s <em>Straight from the Gut</em>.</p><p>The authors reject both as foundations, and they reject the compromise too: blending two unsound foundations only preserves a fragile tension. Framing is the step before both, deciding how to see the problem. And the machine? AlphaZero found chess moves grandmasters called alien, but, the authors argue, it cannot explain or transfer them; people formed the concepts. AI answers the questions it is given; framers ask new ones.</p>',
        visual: { position: 'bottom', svg: visLineage,
          caption: 'Two lineages of one old tension. Framing is a separate path, not a point on the scale between data and gut.' } },
    ],

    exercise: {
      type: 'scenario',
      title: 'Machine, mob or framing? Three leadership decisions',
      instructions: 'Each situation offers a machine, a mob (or blend) and a framing response. Choose what you would do. Framing never refuses data.',
      steps: [
        { situation: 'Attrition in your distributed product team has doubled within a year. The board wants a plan in four weeks.',
          options: [
            { text: 'Buy a people-analytics tool that scores each person’s flight risk and triggers a retention bonus above a threshold.',
              feedback: '<strong>Hyper-rationalist.</strong> The tool works inside a frame nobody chose: attrition as a pay-and-risk problem. It may optimise the wrong variable precisely.' },
            { text: 'Write down three competing explanations (pay, how work is organised, lost belonging) and check which one the exit interviews support.',
              feedback: '<strong>Framing.</strong> You make rival causal models explicit before deciding which data matters. The halicin move: settle the question, then search.', good: true },
            { text: 'The division head senses a loyalty problem: an all-hands event, a strong “we” culture, a clear line towards those who never belonged.',
              feedback: '<strong>Emotionalist.</strong> Felt certainty and boundaries towards “others”. Nobody tests whether loyalty is the cause.' },
          ] },
        { situation: 'The board wants to roll out an AI assistant to 2,000 employees and asks you where to start.',
          options: [
            { text: 'Let the vendor’s usage dashboard decide: after a pilot, expand wherever prompts per user are highest.',
              feedback: '<strong>Hyper-rationalist.</strong> A usage metric is a frame in disguise: success equals use. It cannot tell whether heavy use improves decisions or just produces more text.' },
            { text: 'The CEO is convinced AI is the future: full rollout everywhere, sceptics are treated as blockers.',
              feedback: '<strong>Emotionalist.</strong> Conviction replaces reasoning, and disagreement becomes a group boundary. Nobody examined what AI should change.' },
            { text: 'Put two frames side by side: “introducing a tool” versus “changing who decides what, with which information”. Choose deliberately.',
              feedback: '<strong>Framing.</strong> Each frame shows different options (licences and training, or decision rights). Metrics come afterwards.', good: true },
          ] },
        { situation: 'Your largest client cuts its volume by 40 percent. The revenue gap hits next quarter.',
          options: [
            { text: 'Run a scenario model and let an optimisation algorithm rank positions by cost-to-contribution ratio.',
              feedback: '<strong>Hyper-rationalist.</strong> Fast and precise, but the decision about what kind of problem this is has been made silently: a cost problem.' },
            { text: 'Combine both: the model calculates, then the management team makes the final call on gut feeling.',
              feedback: '<strong>The blend the book rejects.</strong> It sounds balanced. But neither model nor gut asks how the problem should be seen; both stay inside an unexamined cost frame.' },
            { text: 'First ask: cost problem or dependency problem? In the dependency frame, new segments and partnerships become visible. Then calculate.',
              feedback: '<strong>Framing.</strong> The same numbers support different stories. The framing option does not refuse to calculate; it decides what the calculation is for.', good: true },
          ] },
      ],
    },

    caseStudy: {
      title: 'Halicin: who actually found the antibiotic?',
      body: '<p>Drug discovery usually looks for molecules resembling known antibiotics, a largely exhausted route. The MIT team around Regina Barzilay and Jim Collins moved the question from structure to function: not “does it look like an antibiotic?” but “does it stop bacteria from growing?”. They trained a model on more than 2,300 compounds tested against <em>E. coli</em>, then screened about 6,000 molecules and later more than 100 million. One molecule stood out: halicin.</p><p>Headlines credited AI. The authors divide the work differently: people defined the problem, chose the training data and the database, and afterwards used biology to understand why the hit worked.</p>',
      lesson: 'Test any “AI did it” story: who set the question, data, search space and interpretation? Yet without the machine’s search, the new question would have stayed an idea.',
      visual: { svg: visFunnel,
        caption: 'Human decisions (coral) open and close the machine’s screening (black).' },
    },

    reflection: {
      intro: 'Apply frame versus data, and framing versus machine or mob, to your own work.',
      prompts: [
        'Think of a decision where two parties used the same data and reached opposite conclusions. What were the two frames, in one sentence each?',
        'Under pressure, do you lean towards the machine (another dashboard) or the mob (conviction, loyalty)? Describe one recent example honestly.',
      ],
      placeholder: 'The two frames were … / Under pressure I lean towards … when …',
    },

    quiz: [
      { case: '<p>In the early 1990s Pfizer tested a compound called sildenafil against angina, chest pain caused by poor blood flow to the heart. The heart results disappointed, but men in the trials reported an unexpected effect: erections. Pfizer redirected the programme, and in 1998 the same compound was approved in the US as Viagra.</p>',
        q: 'In the chapter’s terms, what turned a disappointing heart drug into a blockbuster?',
        options: [
          { text: 'The question changed: what the drug was for, and so which effect was the result.',
            why: 'Right. Molecule and observation stayed the same; the frame defining the drug’s purpose, and so what counts as signal, changed.' },
          { text: 'More trial data piled up until the true purpose of the molecule became statistically obvious.',
            why: 'The hyper-rationalist reading. The effect was reported early; data alone do not turn a side effect into a goal.' },
          { text: 'A lucky accident: no model was involved, the researchers simply followed their instinct.',
            why: 'Luck supplied the observation; only a frame in which the surprise counts as an opportunity gave it meaning.' },
          { text: 'The chemistry was improved step by step until the compound finally worked on another organ.',
            why: 'The approved drug was the same compound. As with the telephone, the hardware stayed and the frame changed.' },
        ],
        answer: 0,
        explain: 'Frames decide what counts as signal or side effect; often the decisive step is a new question about old data.' },

      { case: '<p>In January 2007 Microsoft CEO Steve Ballmer laughed off the new iPhone: at 500 dollars it was “the most expensive phone in the world”, and without a keyboard it would not appeal to business customers. In April he added there was “no chance” it would get significant market share.</p>',
        q: 'Which diagnosis of Ballmer’s misjudgement fits the chapter best?',
        options: [
          { text: 'He lacked market data; better forecasts would have shown him where demand was heading.',
            why: 'Microsoft did not lack research. Read through a business-phone frame, more data would only confirm the same verdict.' },
          { text: 'His frame judged phones as business tools: fit for the old market, not the new.',
            why: 'Right. A coherent frame that had served keyboard phones well met a domain it no longer fitted: misfit, not missing information.' },
          { text: 'His frame was simply a bad one and should never have guided Microsoft’s phone strategy.',
            why: 'Confuses misfit with a bad frame. The business frame worked for years; the authors judge frames by fit to a domain.' },
          { text: 'He trusted his gut instead of the numbers, which is the classic emotionalist error.',
            why: 'His reasoning was explicit (price, keyboard, market share). Gut versus data is the wrong axis: both operate inside a frame.' },
        ],
        answer: 1,
        explain: 'Judge a frame by its fit: yesterday’s frame can make tomorrow’s winner look like a mistake, however good the data.' },

      { case: '<p>As US Secretary of Defense during the Vietnam War, Robert McNamara, a former Ford executive, relied on quantified indicators of progress, above all the enemy body count. The social scientist Daniel Yankelovich later named the pattern the “McNamara fallacy”: measure what is easy to measure, then treat what is hard to measure as unimportant.</p>',
        q: 'Which reading fits the chapter’s argument about what went wrong?',
        options: [
          { text: 'The frame was right but incomplete: scores for morale and legitimacy would have fixed it.',
            why: 'Still the hyper-rationalist move. More indicators inside the same frame measure the wrong thing more completely.' },
          { text: 'Too much analysis: experienced generals should have been left to judge the war by instinct.',
            why: 'The emotionalist swing. The chapter rejects the gut as a foundation, and generals carried unexamined frames too.' },
          { text: 'The metric hid an unexamined frame: war as attrition, in which enemy losses equal progress.',
            why: 'Right. Body counts meant progress only inside an attrition frame, chosen silently before any number was collected.' },
          { text: 'The right mix was missing: analysts should measure, then commanders should decide by feel.',
            why: 'The blend the authors reject. Neither measuring nor feeling asks how the problem should be seen in the first place.' },
        ],
        answer: 2,
        explain: 'A metric encodes a frame about what success means; ask which model makes the numbers meaningful.' },

      { case: '<p>In 1985 Coca-Cola replaced its original formula with a sweeter “New Coke”. By the company’s account, nearly 200,000 people in taste tests had preferred the new flavour. Protest letters and calls poured in; one elderly customer told company president Don Keough he had taken away her memories. After 79 days the original returned as Coca-Cola Classic.</p>',
        q: 'What does the chapter’s idea of frames say about why the research missed?',
        options: [
          { text: 'The sample was biased; a larger and more representative test would have caught the backlash.',
            why: 'The hyper-rationalist fix. Any sample size answers the same question; the frame had already decided to test flavour.' },
          { text: 'Executives should have trusted their gut that loyal customers simply dislike any change.',
            why: 'The emotionalist fix, and false as a rule: loyal customers accept changes all the time. What mattered was meaning.' },
          { text: 'Customers reacted emotionally, not rationally: the research was right and the public was wrong.',
            why: 'Dismisses a rival frame as noise. Heritage is a way of seeing the product, and it decided what customers did.' },
          { text: 'The tests asked a taste question, but customers saw Coke as heritage, not as flavour.',
            why: 'Right. The data were sound inside the taste frame; customers read the change through another frame, as loss, not improvement.' },
        ],
        answer: 3,
        explain: 'Many disputes about facts are disputes about meaning: name the frame behind the data first.' },

      { case: '<p>In the Soviet Union of the 1930s, Trofim Lysenko, backed by Stalin, applied ideas from Marxist ideology to farming, for instance that plants of the same kind would not compete and could be sown densely. Geneticists who objected, among them Nikolai Vavilov, were fired, imprisoned or executed. Harvests suffered, yet the doctrine held for decades.</p>',
        q: 'According to the chapter, what makes this more than an ordinary misfit?',
        options: [
          { text: 'Ideology was involved, and ideological frames are the one category of frame the authors call bad.',
            why: 'Badness does not lie in content. Capitalist and communist lenses are both frames; the authors condemn one that denies all others.' },
          { text: 'The frame was enforced as the only legitimate one, so no rival frame could correct it.',
            why: 'Right. Misfit plus monopoly: the one bad frame denies other frames, and punishing dissent removed every chance of correction.' },
          { text: 'The agricultural data were missing, so nobody in Moscow could see that the frame was failing.',
            why: 'Failing harvests were visible. Under a monopoly frame, contradicting evidence is suppressed, not missing.' },
          { text: 'Scientists lacked courage; bolder dissent would soon have restored a better biology.',
            why: 'Dissent happened and was punished. The problem was structural, a frame that eliminated alternatives, not character.' },
        ],
        answer: 1,
        explain: 'Frames become dangerous when they claim a monopoly: protect rival frames, not just the quality of one.' },
    ],


    flashcards: [
      { front: 'Four things a mental model does', back: 'Filter, explain causally, generalise from single cases, imagine what is not there.' },
      { front: 'Misframing', back: 'Applying a frame where it does not fit. The fit is the problem, not the frame (Nokia, Lysenkoism).' },
      { front: 'The one bad frame', back: 'A frame that denies the existence or legitimacy of other frames. Previewed in chapter 1, developed in chapter 8.' },
      { front: 'Hyper-rationalists vs emotionalists', back: 'The machine (decisions to data and algorithms) versus the mob (decisions to gut and group feeling). The book rejects both.' },
      { front: 'Why not a blend of data and gut?', back: 'Blending two unsound foundations yields a fragile tension. Framing is a third capacity that comes before both.' },
    ],

    critique: [
      { claim: 'AI cannot frame: it cannot form mental models, generalise or explain (AlphaZero as proof).',
        challenge: 'Written before large language models. Today’s models explain, transfer across domains and propose alternative framings. Even inside AlphaZero, 2022 research found many human chess concepts represented. What remains defensible: whether a model’s explanation reflects what drives its output is unresolved, and goals and accountability stay with people. Read it as “machines do not own the frame”.' },
      { claim: 'History swings between reason and emotion, and gut decisions are mostly inferior.',
        challenge: 'Historically simplified: Welch ran GE with Six Sigma and forced ranking, hardly gut-only management. The evidence on intuition is contested: Gigerenzer shows simple heuristics can beat complex models under uncertainty, Gary Klein describes expert intuition as pattern recognition. On that reading, good intuition is compressed framing, not its opposite.' },
      { claim: 'Lysenkoism is a story of misframing.',
        challenge: 'Read sociologically, it is at least as much a story about power. The frame survived because dissent was punished, not because people saw badly. The book rarely asks who decides which frame counts, and in whose interest. In organisations, the dominant frame often belongs to whoever controls budgets.' },
    ],

    summary: [
      'Human power comes from models: frames filter, explain, generalise and let us imagine what is not there.',
      'Halicin was found by changing the question from structure to function; the machine searched inside a human frame.',
      'There are no bad frames, only misfits, with one exception: a frame that denies other frames.',
      'The authors reject the machine, the mob and their blend; framing decides how to see the problem.',
    ],

    glossary: [
      { term: 'Mental model / frame', def: 'A simplified representation of how part of the world works; it selects what matters and makes options visible.' },
      { term: 'Framer', def: 'A person who deliberately chooses, applies or changes a frame before deciding.' },
      { term: 'Misframing', def: 'Using a frame in a domain it does not fit; a problem of fit, not of the frame itself.' },
      { term: 'Single frame of truth', def: 'A frame enforced as the only legitimate one; the failure mode behind Lysenkoism.' },
    ],
  });
})();
