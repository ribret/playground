/* u09 (V2): Chapter 9: Vigilance */
(function () {
  const P = V.palette;

  /* ---------- local drawing helpers ---------- */
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
      caption: '<b>Framing happens at every level, not only among geniuses.</b> A comedian in the US, a tea entrepreneur in China and a solar founder in Sierra Leone each changed a mental model and with it their options.',
      svg: (l) => {
        const lab = ['Comedy', 'Tea', 'Solar'];
        const place = ['USA', 'China', 'Sierra Leone'];
        const cols = [P.plum, P.teal, P.amber];
        let s = '';
        [0, 1, 2].forEach(i => {
          const x = 20 + i * 125;
          s += V.frame(x, 50, 110, 125, { color: cols[i], label: lab[i], cls: 'a-pop', delay: i * .35 });
          s += V.person(x + 55, 135, { color: P.ink, cls: 'a-rise', delay: .3 + i * .35 });
          s += V.text(x + 55, 198, place[i], { size: 12, fill: P.muted, bold: true, cls: 'a-fade', delay: .5 + i * .35 });
        });
        s += V.text(200, 238, 'Framing on every level', { size: 15, bold: true, cls: 'a-fade', delay: 1.6 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: '<b>Framing is a ridge between two drops.</b> On one side the gut decides, on the other the algorithm. The authors argue both camps frame anyway, just without noticing.',
      svg: (l) => {
        let s = V.path('M20,250 L20,200 L120,200 L200,92 L280,200 L380,200 L380,250 Z', { fill: P.line, stroke: 'none', cls: 'a-fade' });
        s += V.path('M120,200 L200,92 L280,200', { stroke: P.teal, sw: 5, cls: 'a-draw', delay: .3 });
        s += V.person(200, 88, { color: P.ink, cls: 'a-pop', delay: 1 });
        s += V.text(200, 180, 'Framing', { size: 15, bold: true, fill: P.teal, cls: 'a-fade', delay: 1.2 });
        s += V.arrow(150, 165, 85, 225, { color: 'coral', cls: 'a-draw', delay: 1.6 });
        s += V.arrow(250, 165, 315, 225, { color: 'muted', cls: 'a-draw', delay: 1.9 });
        s += V.text(80, 50, 'Gut only', { size: 14, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.6 });
        s += V.text(80, 68, 'emotionalist', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1.7 });
        s += V.text(320, 50, 'Data only', { size: 14, bold: true, fill: P.ink, cls: 'a-fade', delay: 1.9 });
        s += V.text(320, 68, 'hyper-rationalist', { size: 12, fill: P.muted, cls: 'a-fade', delay: 2 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: '<b>The machine computes inside a frame a human drew.</b> The book concludes that AI raises the stakes of framing rather than replacing it: someone has to set the goal and answer for it.',
      svg: (l) => {
        let s = V.person(52, 175, { color: P.ink, scale: 1.2, cls: 'a-pop' });
        s += V.path('M72,160 Q96,140 115,120', { stroke: P.coral, sw: 2.5, dash: '4 4', cls: 'a-draw', delay: .4 });
        s += V.frame(120, 40, 260, 180, { color: P.coral, label: 'Human frame', cls: 'a-draw', delay: .6 });
        s += V.rect(185, 80, 130, 80, { fill: P.ink, stroke: P.ink, r: 10, cls: 'a-pop', delay: 1.2 });
        for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) s += V.circle(203 + c * 19, 98 + r * 16, 3.5, { fill: P.amber, cls: 'a-pulse', delay: 1.5 + (r + c) * .08 });
        s += V.text(250, 154, 'AI', { size: 12, fill: '#fff', bold: true, cls: 'a-fade', delay: 1.4 });
        s += V.text(250, 198, 'Goal · frame · accountability', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 2.2 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: '<b>But we retreat into silos.</b> Pew data cited in the book: US areas dominated by one political view grew from 4 to 35 percent between 1980 and 2020. Uniform neighbourhoods produce uniform counterfactuals.',
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
        s += V.text(200, 243, 'Like-minded areas, USA', { size: 12, fill: P.muted, cls: 'a-fade', delay: 2.3 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: '<b>The most dangerous framer is the rigid one.</b> The Paris attackers of 2015 applied their frame with chilling consistency and admitted no adjustment. Rigidity does not add agency; it drains it.',
      svg: (l) => {
        let s = steelFrame(120, 40, 160, 125, { cls: 'a-pop' });
        s += lock(200, 16, { cls: 'a-pop', delay: .5 });
        [[160, 80], [200, 70], [240, 85], [175, 115], [225, 120]].forEach(([x, y], i) => { s += V.circle(x, y, 7, { fill: P.amber, cls: 'a-fade', delay: .3 + i * .1 }); });
        [[200, 180, 6, .9], [200, 194, 5, .65], [200, 206, 4, .4]].forEach(([x, y, r, op], i) => { s += V.circle(x, y, r, { fill: P.amber, opacity: op, cls: 'a-fade', delay: 1.4 + i * .35 }); });
        s += V.text(200, 240, 'Consistent. Fluent. Unadjustable.', { size: 15, bold: true, cls: 'a-fade', delay: 2.4 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: '<b>Agility of mind means frames with hinges.</b> Same structure, but joints that can move: you can hold two opposing ideas and still act. The authors call it trainable, like a dancer’s flexibility.',
      svg: (l) => {
        let s = V.rect(120, 40, 160, 125, { fill: 'none', stroke: P.line, dash: '5 5', r: 4, cls: 'a-fade' });
        s += hingedFrame([[105, 50], [265, 34], [295, 160], [130, 178]], P.teal, { cls: 'a-pop', delay: .5 });
        [[160, 90], [215, 80], [240, 125], [175, 135]].forEach(([x, y], i) => { s += V.bulb(x, y, { scale: .75, cls: 'a-pop', delay: 1.3 + i * .2 }); });
        s += V.text(200, 228, 'Hinges, not steel', { size: 16, bold: true, fill: P.teal, cls: 'a-fade', delay: 2.1 });
        return V.wrap(s);
      } },
  ];

  /* ---------- section visuals ---------- */
  const visMoves = (l) => {
    let s = V.text(200, 36, 'Three moves, one spectrum', { size: 15, bold: true, cls: 'a-fade' });
    s += V.line(35, 125, 365, 125, { stroke: P.ink, sw: 2.5, cls: 'a-draw', delay: .2 });
    const items = [
      [95, 'Nie', P.teal, 'teahouse,\nnew constraints'],
      [215, 'Cooper', P.plum, 'drops\n“look like him”'],
      [328, 'Mosia', P.amber, 'pay-as-you-go\nborrowed'],
    ];
    items.forEach(([x, name, col, mv], i) => {
      s += V.circle(x, 125, 11, { fill: col, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: .6 + i * .3 });
      s += V.text(x, 100, name, { size: 14, bold: true, cls: 'a-fade', delay: .7 + i * .3 });
      s += V.text(x, 158, mv, { size: 12, fill: P.ink, cls: 'a-fade', delay: .8 + i * .3 });
    });
    s += V.text(35, 222, '← apply the frame', { size: 12, anchor: 'start', fill: P.muted, bold: true, cls: 'a-fade', delay: 1.6 });
    s += V.text(365, 222, 'switch the frame →', { size: 12, anchor: 'end', fill: P.muted, bold: true, cls: 'a-fade', delay: 1.6 });
    return V.wrap(s);
  };

  const visRigid = (l) => {
    let s = V.rect(15, 20, 180, 220, { fill: P.paper, stroke: P.line, r: 12 }) + V.rect(205, 20, 180, 220, { fill: P.paper, stroke: P.line, r: 12 });
    s += V.text(105, 40, 'Rigid framing', { size: 14, bold: true });
    s += V.text(295, 40, 'Agile framing', { size: 14, bold: true, fill: P.teal });
    s += steelFrame(70, 84, 70, 52, { cls: 'a-pop', delay: .2 }) + lock(105, 68, { cls: 'a-pop', delay: .4 });
    s += hingedFrame([[258, 80], [328, 74], [338, 134], [262, 138]], P.teal, { cls: 'a-pop', delay: .5 });
    const left = ['fluent', 'seamlessly consistent', 'no what-if admitted', 'every event confirms'];
    const right = ['hard core named', 'revision trigger set', 'two ideas at once', 'dissent invited'];
    left.forEach((t, i) => { s += V.text(105, 160 + i * 20, t, { size: 12, fill: P.ink, cls: 'a-fade', delay: .8 + i * .15 }); });
    right.forEach((t, i) => { s += V.text(295, 160 + i * 20, t, { size: 12, fill: P.ink, cls: 'a-fade', delay: 1 + i * .15 }); });
    return V.wrap(s);
  };

  window.FRAMERS.register({
    id: 'u09', number: 9, kind: 'chapter', color: '#E4572E', minutes: 20,
    title: 'Vigilance',
    tagline: 'Framing is a power we can lose twice: by handing it away, or by freezing it into a frame that admits no adjustment.',
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="8" y="10" width="28" height="24" rx="3" fill="none" stroke="${c}" stroke-width="3"/><circle cx="8" cy="10" r="3.5" fill="#fff" stroke="${c}" stroke-width="2"/><circle cx="36" cy="10" r="3.5" fill="#fff" stroke="${c}" stroke-width="2"/><circle cx="8" cy="34" r="3.5" fill="#fff" stroke="${c}" stroke-width="2"/><circle cx="36" cy="34" r="3.5" fill="#fff" stroke="${c}" stroke-width="2"/><circle cx="22" cy="22" r="4" fill="${c}"/></svg>`,
    hook: '<p>Which is more dangerous: a leadership team that decides by gut feeling, or one with a beautifully coherent strategy that reinterprets every piece of bad news as confirmation? The final chapter of <em>Framers</em> answers: the second, because it believes it is reasoning well.</p>',
    objectives: [
      'Explain why rigid framing is more dangerous than not framing at all, and spot its signs.',
      'Distinguish emotionalist, hyper-rationalist, rigid and agile framing in concrete statements.',
      'Assess where the chapter’s claim that humans must “manage the machines” holds in 2026.',
    ],
    film: { title: 'Vigilance in six scenes', scenes },
    sections: [
      { id: 's1', heading: 'Ordinary framers, three different moves',
        body: '<p>The chapter opens with three people nobody would call paradigm-shifters. In 2020 <strong>Sarah Cooper</strong> lip-synced Donald Trump’s musings about disinfectant, keeping only his voice and dropping the constraint “look like the person”. <strong>Nie Yunchen</strong> stayed inside the frame of the Chinese teahouse but changed its constraints for young customers with Heytea: premium leaves, real milk, little classic advertising. <strong>Nthabiseng Mosia</strong> borrowed pay-as-you-go from mobile phones to sell solar kits in Sierra Leone.</p><p>Read them as a spectrum from applying a frame to switching it. Framing happens “commoner or king”, and since every coordinated achievement rests on a frame in someone’s head, cooperation matters, “but framing matters more”.</p>',
        visual: { svg: visMoves, position: 'bottom', caption: 'The three cases sit at different points between applying a frame and switching it. All three count as framing.' } },

      { id: 's2', heading: 'Two ways to cede the power',
        body: '<p>The book closes by returning to its two opponents. <strong>Emotionalists</strong> find deliberate thinking overwrought and prefer impulse. The verdict: they are “not anti-framers”, they are “just bad at framing”, because their reading of the world is itself a mental model, only an unexamined one.</p><p><strong>Hyper-rationalists</strong> want to hand decisions to data and algorithms. The authors reply that in every case of the book humans set the frame the machine worked in; adapting to the never-seen with little data (François Chollet’s “extreme generalization”) stays human. Hence: AI does not make frames obsolete, it makes them matter more. “We will be needed to manage the machines.” Meanwhile people retreat into ideological silos, which shrink the range of counterfactuals they ever meet.</p>',
        keyIdea: 'Neither camp escapes framing: one frames unexamined, the other hands the frame to a system that cannot own it.' },

      { id: 's3', heading: 'Rigidity and agility of mind',
        body: '<p>The darkest part concerns the Paris attacks of November 2015. The book argues terrorists are not irrational but apply a frame with what the sociologist Gérald Bronner calls “almost inhuman consistency”. The organiser, Abdelhamid Abaaoud, read every event, even an officer letting him pass a border check, as divine arrangement. What was missing was adjustment. Rigidity destroys agency, and bad framing is worse than none because it presumes to be right.</p><p>The remedy is <strong>agility of mind</strong>: not mere openness, but a plasticity in how we conceive and reconceive the world, including holding two opposing ideas at once. Like a dancer’s flexibility it must be trained; institutions can help, but “framers frame frames, organizations don’t”.</p>',
        visual: { svg: visRigid, position: 'bottom', caption: 'Both columns can look equally rational from inside. The difference is whether the frame admits a revision.' },
        keyIdea: 'Vigilance is not about having the right frame; it is about keeping your frame revisable.' },
    ],

    exercise: {
      type: 'sort',
      title: 'Four ways to talk about AI in a leadership team',
      instructions: 'An insurer debates AI in underwriting and HR. Sort each statement. <strong>Emotionalist:</strong> impulse over deliberate framing. <strong>Hyper-rationalist:</strong> hands the frame to data or a system. <strong>Rigid:</strong> fluent and consistent, but nothing could change the frame. <strong>Agile:</strong> names the frame, its hard core and what would make it revise.',
      categories: [
        { id: 'emo', label: 'Emotionalist' },
        { id: 'hyper', label: 'Hyper-rationalist' },
        { id: 'rigid', label: 'Rigid framer' },
        { id: 'agile', label: 'Agile framer' },
      ],
      items: [
        { text: '“All these scenario workshops are overthinking. Real leaders feel when the moment is right.”', category: 'emo',
          why: 'Framing work is dismissed as inauthentic, yet the statement carries its own frame (leadership as intuition), just an unexamined one.' },
        { text: '“Human judgement in underwriting is just bias with a job title. Let the model set the premiums.”', category: 'hyper',
          why: 'What counts as a good premium and which fairness rules apply is silently handed to whoever built the model. Someone still framed, unaccountably.' },
        { text: '“If adoption rises, our AI strategy is working. If it falls, staff are not ready yet. Either way it is confirmed.”', category: 'rigid',
          why: 'Every outcome confirms the frame: the signature of rigidity. No counterfactual could ever count against it.' },
        { text: '“Our target operating model is rigorous and consistent. Questioning its premises now would show a lack of discipline.”', category: 'rigid',
          why: 'Fluent and competent-sounding, but closed. Consistency is used to forbid revision, and doubt is recast as indiscipline.' },
        { text: '“AI drafts, underwriters decide and sign. If quality and complaint rates stay stable for two quarters, we revisit who signs.”', category: 'agile',
          why: 'Frame named, hard core (human sign-off) explicit, and a revision trigger set in advance: agility with structure.' },
      ],
    },

    caseStudy: {
      title: 'Easy Solar: repurposing instead of inventing',
      body: '<p>In Sierra Leone most rural households have no grid connection. The obvious frame was to extend the grid. Nthabiseng Mosia and her co-founders switched to a decentralised frame: solar kits per household. That solved supply but not purchase: the kits were still unaffordable as a single payment.</p><p>The decisive move was borrowed: customers knew pay-as-you-go from mobile phones, so Easy Solar let them pay in instalments while using the kit and own it once paid off. Nothing here was a technical invention: a payment frame was transplanted into a context where its preconditions (familiarity, small regular payments, a device that can be switched off) already existed.</p>',
      lesson: 'Repurposing works when the borrowed frame’s preconditions already exist in the new context.',
    },

    reflection: {
      intro: 'A rigid frame feels like clarity from inside, so look at your own frames, not other people’s.',
      prompts: [
        'Name one professional conviction you have held for years. What observation would make you revise it? If you cannot name one, what does that tell you?',
        'Where in your work were recent setbacks explained in a way that left the strategy untouched? Was that explanation tested or simply convenient?',
      ],
      placeholder: 'The conviction I would find hardest to revise is…',
    },

    quiz: [
      { case: '<p>In spring 2020 the comedian Sarah Cooper went viral with TikTok videos lip-syncing Donald Trump’s televised musings about light and disinfectant as Covid remedies. Earlier impersonators had copied his look: hair, red cap, physique. Cooper played his real audio and kept everything else her own. Stripped of the podium, the words sounded absurd.</p>',
        q: 'What kind of framing move is this?',
        options: [
          { text: 'A reinvention: she built a new comedic genre instead of adjusting an existing one.', why: 'Wrong: the frame of impersonation stays; one defining constraint changed. Reinvention builds a frame from scratch, which is far rarer.' },
          { text: 'Repurposing: she imported a frame from another field, as Easy Solar borrowed pay-as-you-go.', why: 'Wrong: nothing came from another domain. Repurposing moves a frame across contexts; here one constraint inside a genre was dropped.' },
          { text: 'Changing a constraint: keeping impersonation but dropping the rule of resembling the target.', why: 'Right: a deliberate what-if (“what if I said these words?”) enabled by removing one constraint, an ordinary move anyone can make.' },
          { text: 'Not framing at all: she reacted to the news by gut, which is why it felt so authentic.', why: 'Wrong: authenticity is not the absence of a frame. Cooper described a deliberate what-if; reading spontaneity as no framing is the emotionalist error.' },
        ],
        answer: 2,
        explain: 'Framing is not reserved for geniuses: changing one constraint inside a familiar frame is the common case.' },

      { case: '<p>Lieutenant Hiroo Onoda kept fighting on the Philippine island of Lubang for almost 29 years after Japan surrendered. Leaflets announcing the end of the war were dropped; his group studied them and judged them fakes. Later letters and family photos were read as enemy tricks. He laid down arms in March 1974, only after his former commanding officer came and formally relieved him of duty.</p>',
        q: 'Which diagnosis fits the chapter’s idea of vigilance best?',
        options: [
          { text: 'His coherent frame read every disconfirming signal as confirmation, so nothing could revise it.', why: 'Right: the frame was coherent and carefully applied; what was missing was adjustment. Only one input, a direct order, was allowed to count.' },
          { text: 'He was an emotionalist who acted on loyalty and feeling instead of weighing the evidence.', why: 'Wrong: his group examined the leaflets carefully. Like the chapter’s rigid framers, he believed he was reasoning well, not acting on impulse.' },
          { text: 'He lacked information; clearer and more credible proof of surrender would have stopped him sooner.', why: 'Wrong: the evidence was there for decades. A rigid frame does not lack data; it reinterprets whatever arrives.' },
          { text: 'He showed admirable consistency, the same virtue the book recommends when choosing constraints.', why: 'Wrong: consistency among constraints keeps a frame coherent. Consistency used to block all revision is the rigidity the chapter warns against.' },
        ],
        answer: 0,
        explain: 'Vigilance means knowing in advance what would make you revise your frame, and letting more than one source count.' },

      { case: '<p>From 2018 the property site Zillow ran Zillow Offers: it bought homes directly from sellers, with cash offers based on its price estimates, and resold them. In November 2021 it shut the business down, wrote down about $304 million on homes bought above its own resale estimates and announced cutting about a quarter of its staff. CEO Rich Barton: “the unpredictability in forecasting home prices far exceeds what we anticipated.”</p>',
        q: 'What does this case show about handing decisions to data?',
        options: [
          { text: 'A data problem: a model trained on more and fresher sales would have priced the homes correctly.', why: 'Wrong: more data refine computing inside the frame. Better data help only once the frame (prices forecastable at this scale) is sound.' },
          { text: 'A machine problem: pricing homes needs local intuition, so agents rather than algorithms should value them.', why: 'Wrong: that swings to the emotionalist side. The chapter wants humans to own the frame, not to reject machines working inside it.' },
          { text: 'A rigidity problem: Zillow clung to its model and kept buying long after losses became visible.', why: 'Wrong: Zillow closed the unit within months of the losses showing. That is revision; rigid framers would have reinterpreted the losses instead.' },
          { text: 'A judgement problem: trusting the model rested on a human bet that prices were forecastable enough.', why: 'Right: the hyper-rationalist move does not remove framing, it hides it. People chose the bet the model computed inside, and the bet failed.' },
        ],
        answer: 3,
        explain: 'Outsourcing a decision to a model does not escape framing; the choice to trust it is the frame, and someone has to own it.' },

      { case: '<p>In November 2008, at the London School of Economics, Queen Elizabeth II asked why nobody had seen the financial crisis coming. In July 2009, after a British Academy forum, the economist Tim Besley and the historian Peter Hennessy wrote back: in essence, a failure of the collective imagination of many bright people to see the risks to the system as a whole.</p>',
        q: 'Which reading connects this best to the chapter’s warning about silos?',
        options: [
          { text: 'Economists lacked data and computing power; more sophisticated models would have flagged the crisis.', why: 'Wrong: the models were sophisticated. The issue was which risks the shared frame let anyone imagine, not computing power.' },
          { text: 'A profession sharing one model narrowed the what-ifs anyone tested, so systemic risk went unimagined.', why: 'Right: homogeneity among capable people shrinks the range of counterfactuals considered. Intelligence inside a silo does not replace contrasting frames.' },
          { text: 'Bankers decided emotionally, following greed and instinct instead of the numbers in front of them.', why: 'Wrong: the letter points at bright, numerate people. Calling it emotion misses that a shared rational frame can itself be the blind spot.' },
          { text: 'The failure was coordination: regulators and banks simply did not share information with each other.', why: 'Partly true, but the letter names imagination, a cognitive failure. More information within the same frame would not yield different what-ifs.' },
        ],
        answer: 1,
        explain: 'A field where everyone uses the same model can be brilliant and still blind: uniform frames produce uniform counterfactuals.' },

      { case: '<p>Vice Admiral James Stockdale spent more than seven years as a prisoner of war in Hanoi. He later told Jim Collins that those who did not make it out were the optimists, who kept expecting release by Christmas. His own rule: never confuse faith that you will prevail in the end with the discipline to confront the most brutal facts of your current reality.</p>',
        q: 'Which quality from the chapter does his rule illustrate?',
        options: [
          { text: 'Openness to new ideas: taking in whatever information arrives without letting any belief harden.', why: 'Wrong: the authors say agility of mind is more than openness. Stockdale kept a firm conviction but refused to let it distort the facts.' },
          { text: 'Rigid framing: an unshakable conviction that survived more than seven years of contrary evidence.', why: 'Wrong: his faith in the outcome came with revisable expectations. The rigid ones were the optimists who, each time a date passed, simply set a new one.' },
          { text: 'Agility of mind: holding two opposing ideas, firm hope and brutal facts, while still acting.', why: 'Right: the F. Scott Fitzgerald test the chapter cites. The core stays stable while expectations update with reality.' },
          { text: 'Frequent reframing: switching to a new mental model whenever conditions in the prison camp changed.', why: 'Wrong: the book advises reframing rarely. Stockdale did not swap frames; he kept one without hardening it into fixed predictions.' },
        ],
        answer: 2,
        explain: 'Agility of mind is neither openness nor constant switching, but a stable core with revisable expectations.' },
    ],

    flashcards: [
      { front: 'Vigilance (chapter 9)', back: 'Guarding framing against two losses: handing it away (to gut or machine) and freezing it into a frame that admits no adjustment.' },
      { front: 'Rigid framing', back: 'Applying a frame with full consistency but no room for revision; every event confirms. More dangerous than no framing because it presumes to be right.' },
      { front: 'Agility of mind', back: 'A trainable plasticity in how we conceive and reconceive the world, including holding opposing ideas at once. Not mere openness.' },
      { front: 'Emotionalists: “not anti-framers”', back: 'Those who reject deliberate thinking still frame, just badly, with an unexamined model.' },
      { front: '“Framers frame frames, organizations don’t.”', back: 'Institutions can widen exposure to frames, but the cognitive work happens in individual minds.' },
    ],

    critique: [
      { claim: '“We will be needed to manage the machines”, because AI cannot frame or generalise to the genuinely new.',
        challenge: 'This is the chapter’s weakest prediction in 2026. Current models propose alternative framings and counterfactuals on request. The capability argument is eroding. What remains is an argument about ownership: someone must choose the goal, decide which frame is acceptable and be accountable. That is a normative claim, not a cognitive one.' },
      { claim: 'Cooperation still matters, but framing matters more.',
        challenge: 'Asserted, not argued. The book’s own chapter 3 draws on Tomasello: causal and counterfactual thinking evolved through shared intentionality, that is, cooperation. Cognition and coordination co-produce each other. The defensible claim is narrower: organisations invest heavily in coordination and little in the quality of the frames being coordinated.' },
      { claim: 'Emotionalists are “not anti-framers”, they are “just bad at framing”.',
        challenge: 'The book grants their causes may be real, yet turns a political phenomenon into a cognitive deficit. Hochschild’s “deep story” shows emotional frames voicing perceived status loss. And who decides which frame counts as good? That judgement tracks power and cultural capital (Bourdieu). Movements are mobilised by interests; reading resistance as poor cognition hides what it signals.' },
    ],

    summary: [
      'Framing happens at every level: Cooper, Nie and Mosia changed constraints, refashioned a frame or repurposed one across industries.',
      'Emotionalists frame badly rather than not at all; hyper-rationalists hand the frame to machines that, in the authors’ 2021 view, cannot frame.',
      'Rigid framing, consistent but unadjustable, destroys agency and is more dangerous than no framing because it presumes to be right.',
      'The proposed safeguard is agility of mind, trainable and individual; institutions can support it, but only people frame frames.',
    ],

    glossary: [
      { term: 'Vigilance', def: 'Ongoing watchfulness over one’s own framing: not ceding it, and not letting it harden.' },
      { term: 'Rigid framing', def: 'A frame applied with complete consistency that admits no revision; every event is read as confirmation.' },
      { term: 'Agility of mind', def: 'A trainable plasticity in conceiving and reconceiving the world, including holding opposing ideas at once.' },
      { term: 'Ideological silo', def: 'A social environment dominated by one frame, which narrows the counterfactuals its members encounter.' },
    ],
  });
})();
