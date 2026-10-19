/* u06 (V2): Chapter 6, Reframing */
(function () {
  const P = V.palette;

  /* ---------- local drawing helpers ---------- */
  const mountain = (o = {}) => V.path('M30,236 L200,58 L370,236', { stroke: P.line, sw: 3, fill: P.paper, cls: o.cls || 'a-fade', delay: o.delay });
  const bottle = (x, y, o = {}) => V.group(
    V.rect(x - 6, y - 22, 12, 22, { fill: P.sky, stroke: P.ink, sw: 1, r: 3 }) +
    V.rect(x - 2.5, y - 29, 5, 7, { fill: P.sky, stroke: P.ink, sw: 1, r: 1 }), o);
  const lock = (x, y, col) => V.rect(x - 7, y - 4, 14, 11, { fill: col, stroke: col, r: 2 }) + V.path(`M${x - 4},${y - 4} v-4 a4,4 0 0,1 8,0 v4`, { stroke: col, sw: 2 });

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 5500,
      caption: '<b>For 25 years, Everest meant a human pyramid.</b> The 1953 expedition used hundreds of people and bottled oxygen; doctors said the summit was lethal without it.',
      svg: (l) => {
        let s = mountain();
        for (let r = 0; r < 7; r++) {
          const n = 7 - r, y = 222 - r * 22;
          for (let i = 0; i < n; i++) s += V.circle(200 + (i - (n - 1) / 2) * 20, y, 6.5, { fill: r === 6 ? P.amber : P.muted, cls: 'a-pop', delay: .2 + r * .18 + i * .03 });
        }
        s += bottle(318, 220, { cls: 'a-rise', delay: 1.4 }) + bottle(336, 220, { cls: 'a-rise', delay: 1.5 }) + bottle(354, 220, { cls: 'a-rise', delay: 1.6 });
        s += V.text(20, 32, '1953: expedition style', { size: 15, bold: true, anchor: 'start', cls: 'a-fade' });
        s += V.text(336, 186, 'O₂', { size: 13, bold: true, fill: P.sky, cls: 'a-fade', delay: 1.6 });
        return V.wrap(s);
      } },

    { duration: 5500,
      caption: '<b>1978: two climbers, no oxygen.</b> Messner and Habeler went up fast and light, the way they climbed in the Alps.',
      svg: (l) => {
        let s = mountain();
        s += V.path('M120,222 L200,70', { stroke: P.amber, sw: 4, dash: '8 7', cls: 'a-draw', delay: .4 });
        s += V.person(150, 172, { color: P.ink, scale: .75, cls: 'a-pop', delay: .9 }) + V.person(176, 126, { color: P.amber, scale: .75, cls: 'a-pop', delay: 1.1 });
        s += bottle(330, 220, { opacity: .5 }) + V.text(330, 216, '✕', { size: 34, fill: P.bad, bold: true, cls: 'a-pop', delay: 1.6 });
        s += V.text(20, 32, '1978: Alpine style', { size: 15, bold: true, anchor: 'start', cls: 'a-fade' });
        s += V.text(380, 32, '2 people', { size: 14, bold: true, anchor: 'end', fill: P.amber, cls: 'a-fade', delay: 1.3 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: '<b>Same mountain, different frame.</b> The others optimised inside the expedition frame; in the Alpine frame, speed, not supplies, became the decisive variable.',
      svg: (l) => V.wrap(
        V.path('M150,200 L200,104 L250,200 Z', { stroke: P.ink, sw: 2, fill: P.paper, cls: 'a-pop' }) +
        V.frame(14, 56, 122, 150, { color: P.muted, label: 'Expedition', cls: 'a-fade', delay: .4 }) +
        V.text(75, 105, 'logistics\ncamps\noxygen', { size: 13, lineHeight: 22, cls: 'a-fade', delay: .6 }) +
        V.frame(264, 56, 122, 150, { color: P.amber, label: 'Alpine', cls: 'a-fade', delay: 1 }) +
        V.text(325, 105, 'speed\nlight\nshort stay', { size: 13, lineHeight: 22, bold: true, cls: 'a-fade', delay: 1.2 }) +
        V.arrow(140, 150, 168, 150, { color: 'muted', cls: 'a-draw', delay: .7 }) +
        V.arrow(260, 150, 232, 150, { color: 'ink', cls: 'a-draw', delay: 1.3 }) +
        V.text(200, 240, 'Same mountain, different frame', { size: 15, bold: true, cls: 'a-fade', delay: 1.8 })) },

    { duration: 7000,
      caption: '<b>Three ways to reframe, ever rarer.</b> Pick a frame you already own (Bernanke), borrow one from another field (IKEA), or invent one (Darwin).',
      svg: (l) => {
        const names = ['Repertoire', 'Repurposing', 'Reinvention'];
        const ex = ['Bernanke', 'IKEA', 'Darwin'];
        const dots = [9, 4, 1];
        const fills = ['#F8D48A', '#F5C25E', P.amber];
        let s = V.text(20, 30, 'higher = rarer, harder', { size: 14, bold: true, anchor: 'start', cls: 'a-fade' });
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
      caption: '<b>Data do not reframe themselves.</b> Hahn and Strassmann found barium in bombarded uranium and could not explain it; Meitner and Frisch read the same result as a split nucleus.',
      svg: (l) => V.wrap(
        V.pill(200, 34, 'barium + energy', { fill: P.ink, size: 13, cls: 'a-pop' }) +
        V.arrow(170, 50, 110, 84, { color: 'muted', cls: 'a-draw', delay: .5 }) + V.arrow(230, 50, 290, 84, { color: 'ink', cls: 'a-draw', delay: .5 }) +
        V.frame(24, 96, 160, 112, { color: P.muted, label: 'Hahn', cls: 'a-fade', delay: .7 }) +
        V.text(104, 168, '?', { size: 48, bold: true, fill: P.muted, cls: 'a-pop', delay: 1.1 }) +
        V.frame(216, 96, 160, 112, { color: P.amber, label: 'Meitner', cls: 'a-fade', delay: 1.3 }) +
        V.path('M282,130 a18,18 0 0,0 0,36 Z', { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: 1.6 }) +
        V.path('M310,130 a18,18 0 0,1 0,36 Z', { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: 1.8 }) +
        V.text(296, 192, 'fission', { size: 13, bold: true, cls: 'a-fade', delay: 2 }) +
        V.text(200, 242, 'Same data, new frame', { size: 15, bold: true, cls: 'a-fade', delay: 2.3 })) },

    { duration: 6500,
      caption: '<b>Four hurdles stand in the way.</b> A new frame costs cognitive energy, demands unlearning, has to fit the situation and has to come at the right moment.',
      svg: (l) => {
        const L = ['Effort', 'Unlearning', 'Fit', 'Timing'];
        let s = V.text(200, 34, 'Four hurdles to switching', { size: 15, bold: true, cls: 'a-fade' });
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
  ];

  /* ---------- section visuals ---------- */
  const visDialVsSwitch = (l) => {
    const row = (x, y, icon, str, d, bold) => V.group(icon + V.text(x + 18, y + 5, str, { size: 12, anchor: 'start', bold }), { cls: 'a-fade', delay: d });
    const dialIcon = (x, y) => V.circle(x, y, 8, { fill: P.paper, stroke: P.plum, sw: 2 }) + V.line(x, y, x + 5, y - 5, { stroke: P.plum, sw: 2 });
    return V.wrap(
      V.frame(14, 40, 178, 168, { color: P.muted, label: 'Expedition', cls: 'a-fade' }) +
      row(36, 80, dialIcon(36, 80), 'less weight', .3) +
      row(36, 112, dialIcon(36, 112), 'more camps', .5) +
      row(36, 144, dialIcon(36, 144), 'better boots', .7) +
      row(36, 176, lock(36, 176, P.plum), 'oxygen: fixed', .9, true) +
      V.arrow(196, 124, 210, 124, { color: 'ink', cls: 'a-draw', delay: 1.2 }) +
      V.frame(214, 40, 172, 168, { color: P.amber, label: 'Alpine', cls: 'a-slide', delay: 1.3 }) +
      row(236, 80, lock(236, 80, P.plum), 'speed: fixed', 1.6, true) +
      row(236, 112, dialIcon(236, 112), 'no tents', 1.8) +
      row(236, 144, dialIcon(236, 144), 'oxygen: optional', 2) +
      V.text(102, 238, 'turning dials', { size: 13, bold: true, fill: P.muted, cls: 'a-fade', delay: 1 }) +
      V.text(300, 238, 'new set of constraints', { size: 13, bold: true, cls: 'a-fade', delay: 2.2 }));
  };

  const visThreeRs = (l) => {
    const cols = [
      ['Repertoire', 'own stock', 'Bernanke:\nthe 1930s', 100],
      ['Repurposing', 'other field', 'IKEA: furniture\nlike clothing', 55],
      ['Reinvention', 'from scratch', 'Darwin:\ntree of life', 18],
    ];
    let s = '';
    cols.forEach(([h, src, ex, f], i) => {
      const x = 12 + i * 128, cx = x + 60, d = .2 + i * .4;
      s += V.rect(x, 14, 120, 232, { fill: P.paper, stroke: P.amber, sw: 2, r: 12, cls: 'a-rise', delay: d });
      s += V.text(cx, 42, h, { size: 13, bold: true, cls: 'a-fade', delay: d + .1 });
      s += V.text(cx, 66, src, { size: 12, italic: true, fill: P.muted, cls: 'a-fade', delay: d + .2 });
      s += V.line(x + 18, 82, x + 102, 82, { stroke: P.line, sw: 1.5, cls: 'a-draw', delay: d + .2 });
      s += V.text(cx, 110, ex, { size: 12, cls: 'a-fade', delay: d + .3 });
      s += V.text(cx, 176, 'frequency', { size: 12, fill: P.muted, cls: 'a-fade', delay: d + .3 });
      s += V.rect(x + 14, 190, 92, 14, { fill: P.paper2, stroke: P.line, sw: 1, r: 7 });
      s += V.rect(x + 14, 190, 92 * f / 100, 14, { fill: P.amber, stroke: P.ink, sw: 1, r: 7, cls: 'a-slide', delay: d + .5 });
      s += V.text(cx, 228, ['easiest', 'medium', 'hardest'][i], { size: 12, bold: true, cls: 'a-fade', delay: d + .6 });
    });
    return V.wrap(s);
  };

  const visTiming = (l) => {
    let s = V.line(30, 210, 380, 210, { stroke: P.ink, sw: 2 }) + V.line(30, 210, 30, 40, { stroke: P.ink, sw: 2 });
    s += V.rect(180, 40, 90, 170, { fill: P.amber, stroke: 'none', sw: 0, r: 0, opacity: .35, cls: 'a-fade', delay: .8 });
    s += V.path('M30,64 C120,64 160,68 190,96 S250,180 380,192', { stroke: P.muted, sw: 3, cls: 'a-draw', delay: .2 });
    s += V.text(38, 52, 'fit of old frame', { size: 12, anchor: 'start', fill: P.muted, bold: true, cls: 'a-fade', delay: .4 });
    s += V.line(180, 210, 180, 40, { stroke: P.ink, sw: 1.5, dash: '4 4', cls: 'a-fade', delay: .7 });
    s += V.text(105, 230, 'too early', { size: 13, bold: true, cls: 'a-fade', delay: 1 });
    s += V.text(225, 230, 'window', { size: 13, bold: true, cls: 'a-fade', delay: 1.1 });
    s += V.text(328, 230, 'too late', { size: 13, bold: true, cls: 'a-fade', delay: 1.2 });
    s += V.circle(95, 150, 7, { fill: P.muted, cls: 'a-pop', delay: 1.4 }) + V.text(95, 175, 'early EVs', { size: 12, cls: 'a-fade', delay: 1.4 });
    s += V.circle(225, 150, 8, { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: 1.7 }) + V.text(225, 175, 'Tesla', { size: 12, bold: true, cls: 'a-fade', delay: 1.7 });
    s += V.circle(332, 150, 7, { fill: P.coral, cls: 'a-pop', delay: 2 }) + V.text(332, 132, 'German OEMs', { size: 12, cls: 'a-fade', delay: 2 });
    s += V.text(190, 30, 'circumstances change', { size: 12, anchor: 'start', bold: true, cls: 'a-fade', delay: .7 });
    return V.wrap(s);
  };

  window.FRAMERS.register({
    id: 'u06', number: 6, kind: 'chapter', color: '#F2B134', minutes: 20,
    title: 'Reframing',
    tagline: 'Staying in a frame is the rule and a strength. Switching is rare, costly and sometimes decisive; the art lies in knowing when.',
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="4" y="12" width="20" height="20" rx="4" fill="none" stroke="${c}" stroke-width="2.5" opacity=".5"/><rect x="18" y="8" width="22" height="28" rx="4" fill="none" stroke="${c}" stroke-width="3"/><path d="M12 22 h16" stroke="${c}" stroke-width="3" stroke-linecap="round"/><path d="M24 17 l5 5 l-5 5" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    hook: '<p>May 1978: two climbers from the Alps stand on Everest without bottled oxygen. For 25 years every ascent had relied on hundreds of porters and gas cylinders. Better boots helped, but what changed was how they saw the mountain. This unit is about that switch, and why it is rarer and harder to time than “reframing” talk suggests.</p>',
    objectives: [
      'Distinguish reframing from adjusting constraints inside a frame.',
      'Classify shifts as repertoire, repurposing or reinvention, and name the four hurdles.',
      'Judge whether to switch frames or loosen constraints in a broad frame, and when.',
    ],
    film: { title: 'Switching frames in six scenes', scenes },
    sections: [
      { id: 's1', heading: 'Staying is the default, and that is good',
        body: '<p>Most of the time we work inside a frame: reasoning about causes, imagining alternatives, adjusting constraints. That is efficient, and the authors insist that sticking to a well-honed frame is <strong>a feature of cognition, not a flaw</strong>.</p><p>Reframing replaces the mental model itself. The Everest expeditions optimised relentlessly (lighter ropes, more camps, better gear), and every improvement entrenched their frame. Messner and Habeler did not delete one constraint from it. They brought a different frame, in which speed was fixed and oxygen became optional.</p><p>From the inside, polishing a frame that still fits looks exactly like polishing one that does not.</p>',
        visual: { svg: visDialVsSwitch, position: 'bottom', caption: 'Left: optimising turns dials while the decisive constraint stays locked. Right: a new frame brings a new fixed point.' }, },

      { id: 's2', heading: 'Repertoire, repurposing, reinvention',
        body: '<p>The book names three ways of switching, ordered by how often they occur.</p><ul><li><strong>Repertoire:</strong> you pick another frame from your own stock. Ben Bernanke, a scholar of the Great Depression, read 2008 through that template.</li><li><strong>Repurposing:</strong> you borrow a frame that works elsewhere and adapt it. Ingvar Kamprad treated furniture like clothing, something you replace rather than inherit.</li><li><strong>Reinvention:</strong> no existing frame fits, so you create one: Darwin’s common descent, special relativity, packet switching.</li></ul><p>The boundaries blur, but the rule is the order: <strong>search your repertoire, then borrow, invent last.</strong> Each step costs more effort and fails more often.</p>',
        visual: { svg: visThreeRs, position: 'bottom', caption: 'Where the new frame comes from determines how often the move succeeds and what it costs.' } },

      { id: 's3', heading: 'Insight, not method, and four hurdles',
        body: '<p>Reframing has no signposts: Hahn produced barium from uranium and could not explain it until Meitner and Frisch read it as a split nucleus. <strong>Reframing is insight, not process, and practice does not make you better at it.</strong> Success even blinds: Einstein, who reframed physics in 1905, fought quantum mechanics for life.</p><p>Four hurdles stand in the way: <strong>cognitive energy</strong>; <strong>unlearning</strong> the old frame, which nobody controls; <strong>fit</strong>, where the book prefers, all else equal, the frame with more mutable constraints even if it fits loosely; and <strong>timing</strong>. Switch when goals or context have fundamentally changed, not sooner and not much later. Hence: <strong>reframe infrequently.</strong></p>',
        visual: { svg: visTiming, position: 'bottom', caption: 'The window opens when circumstances change and the old frame loses fit. The book’s reading of electric cars: early attempts came too soon, Tesla hit the window, incumbents came late.' }, },

      { id: 's4', heading: 'The broad-frame alternative',
        body: '<p>The chapter ends by blurring its own line. Singapore went from port to electronics to finance to tourism: a chain of reframes, or one broad frame (location, skilled labour, stability, open markets) inside which policymakers moved constraints as conditions changed. Spotify may likewise have loosened the constraint that you must own the files, rather than reframed music.</p><p>That gives you a <strong>strategic choice</strong>. Staying in a broad frame is safer but slower, because the space to search is large. Switching is faster and riskier. And the choice exists only if a broad, flexible frame is already in place.</p>',
        keyIdea: 'A broad frame buys you the option not to reframe.' },
    ],

    exercise: {
      type: 'sort',
      title: 'Which kind of shift is it?',
      instructions: 'Classify each case: repertoire, repurposing, reinvention, or only a constraint change inside the existing frame. One case is deliberately borderline.',
      categories: [
        { id: 'rep', label: 'Repertoire' },
        { id: 'pur', label: 'Repurposing' },
        { id: 'inv', label: 'Reinvention' },
        { id: 'con', label: 'Constraint only' },
      ],
      items: [
        { text: 'A central-bank chair who spent his career studying the 1930s reads a credit crunch as the start of a depression.', category: 'rep',
          why: 'Bernanke’s case. The frame was in his own stock; the work was seeing that it fitted now.' },
        { text: 'A children’s hospital redesigns the handover from surgery to intensive care using a Formula 1 pit-stop routine.', category: 'pur',
          why: 'A frame from elsewhere (choreographed handover under time pressure) is borrowed and adapted.' },
        { text: 'A consultancy keeps its workshop format but allows remote participants and cuts sessions to ninety minutes.', category: 'con',
          why: 'The frame (a facilitated session) is untouched; place and duration are soft constraints.' },
        { text: 'Engineers propose treating a phone call not as a reserved line but as independent data packets that find their own route.', category: 'inv',
          why: 'Packet switching: not a better circuit but a new idea of what network communication is.' },
        { text: 'A music service lets people stream everything for a subscription instead of selling individual tracks.', category: 'con',
          why: 'Borderline. The chapter reads Spotify as loosening the ownership constraint inside a broad frame of “music as experience”. Disputable.' },
      ],
    },

    caseStudy: {
      title: 'Camden: dissolving a police force to change its frame',
      body: '<p>Around 2012, Camden, New Jersey, had one of the highest US murder rates. Officers had planted evidence and falsified reports, and residents feared the police almost as much as the gangs. Reforms had failed.</p><p>Local leaders, among them Mayor Dana Redd and police chief Scott Thomson, concluded that fixing single problems was not enough. In 2013 the city department was dissolved and replaced by a new county force with new contracts, rules and training; fewer than half the old officers were rehired. Thomson described the aim as building a culture rather than changing one, with officers who see themselves as guardians, not warriors. Patrols knocked on doors and held neighbourhood parties.</p><p>According to the book, by 2020 murders had fallen by about 60 percent and complaints about excessive force by 95 percent.</p>',
      lesson: '<p>When reform keeps failing, contracts, identities and routines may be holding the old frame in place. Camden changed the frame by changing the container; the critique shows why figures and motives are contested.</p>',
    },

    reflection: {
      intro: 'The aim is not to find something to reframe, but to tell frame problems from constraint problems.',
      prompts: [
        'Name a problem in your area that has been “optimised” for years without real progress. Is the frame wrong, or has nobody touched the one constraint that matters?',
        'Which frame made you successful, and where might you still be applying it where it no longer fits?',
      ],
      placeholder: 'The problem I keep optimising is … and I think it is a frame / constraint problem because …',
    },

    quiz: [
      { case: '<p>Berlin, December 1938. Otto Hahn and Fritz Strassmann, leading chemists, bombard uranium with neutrons and find what looks like barium, a far lighter element. Chemistry cannot explain it, so Hahn writes to the exiled physicist Lise Meitner. Over Christmas, she and her nephew Otto Frisch work out that the uranium nucleus has split in two.</p>',
        q: 'What stopped Hahn from seeing the discovery he had just made?',
        options: [
          { text: 'His measurements were too imprecise to tell barium apart from the radium he expected.', why: 'His chemistry was sound. This mistakes a frame problem for a data problem; more precision only sharpens the puzzle.' },
          { text: 'He was too cautious to publish a result that broke the accepted frame of his own field.', why: 'He published the barium finding in January 1939. Courage was not missing; a model to explain it was.' },
          { text: 'His chemistry frame had no room for a splitting nucleus, so the data stayed a riddle.', why: 'Right. Same data, different frame: with a physics model of the nucleus, the result suddenly made sense.' },
          { text: 'He lacked a systematic method for generating alternative explanations of surprising results.', why: 'The chapter argues reframing is insight, not method. No procedure would have handed him fission.' },
        ],
        answer: 2,
        explain: 'Data do not reframe themselves. When a result is solid but meaningless, suspect the frame before the measurement.' },

      { case: '<p>Ford’s Highland Park plant, April 1913. One worker used to assemble a whole flywheel magneto in about twenty minutes. Split into 29 operations along a moving line, the job fell to about thirteen. Henry Ford later called it “the first moving line ever installed”, yet added that the idea came “in a general way” from the overhead trolley Chicago meatpackers used in dressing beef.</p>',
        q: 'In this chapter’s terms, what kind of shift was Ford’s moving line?',
        options: [
          { text: 'Repurposing: a frame from another industry, borrowed and inverted from taking apart to building.', why: 'Right. The moving disassembly line of meatpacking already existed; Ford adapted it, so parts were added instead of removed.' },
          { text: 'Reinvention: by Ford’s own account, no moving line had ever been installed before.', why: 'The frame already ran in Chicago. New to one industry is not invented from scratch.' },
          { text: 'Repertoire: Ford’s engineers reused the division of labour they already practised in the plant.', why: 'Splitting work was familiar; the moving line came from outside. Repertoire fits the later chassis line, which copied the magneto line.' },
          { text: 'No reframe at all: the same assembly frame, only the target time per unit tightened.', why: 'The fixed point flipped: work now moved past stationary workers instead of workers moving around fixed work.' },
        ],
        answer: 0,
        explain: 'Before you invent, look for a field that has already solved a structurally similar problem, and adapt its frame.' },

      { case: '<p>For decades high jumpers cleared the bar upright or face down, landing in sand or sawdust. From the late 1950s, US colleges and then high schools began installing foam landing pits. Dick Fosbury, a teenager in Oregon, started going over backwards and landing on his shoulders. In 1968 he won Olympic gold, and the flop soon took over the event.</p>',
        q: 'Why did a backward jump take hold in the 1960s rather than decades earlier?',
        options: [
          { text: 'Earlier athletes lacked imagination; it took one creative outsider to see the better way.', why: 'The hero story. Landing on your back in sawdust was dangerous; imagination was not the bottleneck.' },
          { text: 'Coaches had drilled one technique so thoroughly that nobody dared to unlearn it.', why: 'Unlearning is a real hurdle, but it does not explain why the switch came exactly then.' },
          { text: 'Years of practising new techniques finally made jumpers skilled enough to reframe the event.', why: 'The chapter holds that reframing does not improve with practice; the flop began as an insight.' },
          { text: 'Safe soft landings, a changed circumstance, opened a window for the new frame.', why: 'Right. Reframe when circumstances change: foam made a dangerous landing workable, so the flop now fitted.' },
        ],
        answer: 3,
        explain: 'A good frame at the wrong moment is a bad frame. Watch for changes that make yesterday’s impossible workable.' },

      { case: '<p>In the 1880s Thomas Edison built the first commercial power networks on direct current (DC). When Westinghouse promoted alternating current (AC), which could carry power over long distances far more cheaply, Edison’s camp campaigned to brand AC as deadly. In 1892 his company merged into the new General Electric, which dropped his name and soon embraced AC.</p>',
        q: 'Which lesson from the chapter does Edison’s resistance illustrate best?',
        options: [
          { text: 'DC was a poor frame from the very start, and Edison should have seen that.', why: 'Hindsight. DC fitted the dense city networks of the 1880s; a frame can fit, then stop fitting.' },
          { text: 'A frame that brought someone great success binds them and blocks the next switch.', why: 'Right. Success breeds attachment and identity, as with Einstein and quantum mechanics.' },
          { text: 'His resistance was purely financial, since his patents and plants were all tied to DC.', why: 'Money mattered, but interests and frames reinforce each other; branding AC as lethal went beyond business.' },
          { text: 'Edison was right to stay, because DC still worked and switching would have been premature.', why: 'DC worked in city centres, but long-distance supply changed the circumstances. Holding on was the too-late error.' },
        ],
        answer: 1,
        explain: 'Past reframing success can be the very thing that blocks the next one.' },

      { case: '<p>Demand for photographic film collapsed in the 2000s. Fujifilm, a film maker, moved into skincare and in 2007 launched the Astalift line. It drew on what film had taught it: collagen, a main component of film, antioxidant chemistry developed to stop colour photos fading, and nanotechnology from film production.</p>',
        q: 'How does Fujifilm’s move fit the chapter’s advice on when and how to reframe?',
        options: [
          { text: 'Circumstances had changed fundamentally, so it had to drop its old frame for a new one.', why: 'Change calls for a switch only if the frame cannot flex. Fujifilm kept its frame and moved one constraint: the product.' },
          { text: 'It moved too early: film still sold, and switching sooner than needed is a mistake.', why: 'Demand was already collapsing. Waiting longer would have been the much-too-late error the chapter warns of.' },
          { text: 'Its frame was film chemistry, not film, so it shifted a constraint instead of switching.', why: 'Right. A broad frame let it loosen the product constraint while keeping its know-how, safer than a full switch.' },
          { text: 'It reinvented itself as a beauty company, building a new frame from scratch.', why: 'Nothing came from scratch: collagen and antioxidant know-how carried straight over into skincare.' },
        ],
        answer: 2,
        explain: 'A broad frame buys you the option not to reframe: define broadly what you are good at.' },
    ],

    flashcards: [
      { front: 'Reframing vs. adjusting constraints', back: 'Adjusting turns dials inside one frame. Reframing replaces the frame and with it what counts as fixed (Alpine style: speed fixed, oxygen optional).' },
      { front: 'The three Rs, in order', back: 'Repertoire (own stock), repurposing (borrowed from another field), reinvention (new). Ordered by frequency; try them in that order.' },
      { front: 'Does practice make better reframers?', back: 'According to the book, no. Reframing is insight, not method. Applying frames improves with practice; switching them does not.' },
      { front: 'The four hurdles', back: 'Cognitive energy, unlearning, fit (prefer mutable constraints) and timing (when circumstances change, not sooner, not much later).' },
      { front: 'Reframing reframing', back: 'Inside a broad frame, loosening constraints can replace switching (Singapore, Spotify). Safer but slower; only available if such a frame exists.' },
    ],

    critique: [
      { claim: 'Camden shows that reframing police work from warrior to guardian works.',
        challenge: 'Told from the leaders’ side. The switch to a county force also voided union contracts and rehired officers on cheaper terms; critics called it union-busting. Early reporting noted a surge in tickets for minor offences and more surveillance. The crime drop is real but overlaps with wider trends and more officers. And someone had the power to impose this frame on others.' },
      { claim: 'Shifts can be sorted into reframes and constraint changes within a broad frame.',
        challenge: 'If Singapore and Spotify can be redescribed as constraint loosening, so can Messner (“mountaineering as sport”). Whether something counts as a reframe then depends on how broadly the observer draws the frame, after the fact. A sharper test: which constraints were treated as hard before and negotiable after?' },
      { claim: 'Reframing is insight, not process; practising it does not make you better.',
        challenge: 'Asserted, not shown. In analogical problem solving research (Gick and Holyoak), people transferred a solution to a new domain far more often after comparing varied examples: practice aimed at repurposing. You cannot schedule an insight, but you can raise its odds, as the book half concedes when it urges a wider repertoire.' },
    ],

    summary: [
      'Staying in a frame is the efficient default; reframing replaces the frame and with it what counts as fixed.',
      'There are three ways to switch, ordered by frequency and difficulty: repertoire, repurposing, reinvention; try them in that order.',
      'Reframing is insight rather than method, and four hurdles stand in its way: cognitive energy, unlearning, fit and timing.',
      'A broad frame can make switching unnecessary, because loosening constraints within it is safer, though slower.',
    ],

    glossary: [
      { term: 'Reframing', def: 'Switching from one mental model to another, as opposed to adjusting constraints within a frame.' },
      { term: 'Repertoire, repurposing, reinvention', def: 'The three sources of a new frame: your own stock, another field, or genuine invention, from most to least common.' },
      { term: 'Tight vs. loose frame', def: 'Tight frames fit closely but break under change; loose frames last longer and leave constraints movable.' },
      { term: 'Reframing reframing', def: 'Staying in a broad frame and loosening constraints instead of switching frames.' },
    ],
  });
})();
