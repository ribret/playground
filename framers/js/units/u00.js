/* u00 Orientation (V2, English only). */
(function () {
  const P = V.palette;

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 5000, caption: '<b>Reality is a flood.</b> Every moment delivers more signals than any mind can process.',
      svg: (l) => V.wrap(V.dots(90, 20, 20, 360, 220, { seed: 3, stagger: .03, cls: 'a-fade', fill: P.muted, r: 4 }) + V.person(200, 150, { color: P.ink, cls: 'a-pop', delay: .8, scale: 1.3 })) },
    { duration: 5500, caption: '<b>A frame selects.</b> A mental model decides what counts and what can be ignored. Inside the frame, order appears.',
      svg: (l) => V.wrap(V.dots(70, 10, 10, 380, 240, { seed: 3, fill: P.line, r: 3.5 }) + V.frame(110, 55, 180, 150, { label: 'Frame', cls: 'a-pop' }) +
        [0, 1, 2, 3].map(r => [0, 1, 2].map(c => V.circle(140 + c * 60, 85 + r * 34, 6, { fill: P.coral, cls: 'a-pop', delay: .6 + (r * 3 + c) * .08 })).join('')).join('')) },
    { duration: 6500, caption: '<b>Three ingredients make a frame work.</b> Causality explains, counterfactuals imagine alternatives, constraints keep the imagining useful.',
      svg: (l) => V.wrap(V.threeC(200, 110, l) + V.text(200, 210, 'Applying a frame = the three C together', { size: 13, fill: P.ink2 || P.ink, cls: 'a-fade', delay: 1.2 })) },
    { duration: 5500, caption: '<b>Frames generate options.</b> Not answers: options. Decisions improve because we see more of what we could do.',
      svg: (l) => V.wrap(V.frame(40, 70, 150, 120, { label: 'Frame', cls: 'a-fade' }) + V.arrow(195, 130, 240, 130, { color: 'ink', cls: 'a-draw', delay: .4 }) +
        [0, 1, 2, 3].map(i => V.bulb(280 + (i % 2) * 60, 95 + Math.floor(i / 2) * 70, { cls: 'a-pop', delay: .9 + i * .25 })).join('') + V.text(310, 225, 'Options', { size: 13, bold: true, cls: 'a-fade', delay: 2 })) },
    { duration: 6000, caption: '<b>Sometimes the frame no longer fits.</b> Then we reframe: from our repertoire, by borrowing from another field, or by inventing. Rare and risky, but powerful.',
      svg: (l) => V.wrap(V.group(V.frame(60, 70, 150, 120, { label: 'old', color: P.muted }), { cls: 'a-fade' }) + V.text(135, 140, '✕', { size: 40, fill: P.muted, cls: 'a-pop', delay: .7 }) + V.group(V.frame(200, 70, 150, 120, { label: 'new', color: P.teal }), { cls: 'a-slide', delay: 1.4 })) },
    { duration: 6000, caption: '<b>Many frames beat one.</b> For people, teams and societies, a diversity of frames is the insurance policy for times of change.',
      svg: (l) => V.wrap([P.coral, P.teal, P.plum, P.amber, P.sky, P.ok, P.coral, P.teal].map((c, i) => V.frame(28 + (i % 4) * 90, 45 + Math.floor(i / 4) * 95, 70, 70, { color: c, cls: 'a-pop', delay: i * .15 })).join('') + V.text(200, 245, 'Frame pluralism', { size: 13, bold: true, cls: 'a-fade', delay: 1.5 })) },
    { duration: 7000, caption: '<b>The map of the book.</b> Units 1 to 5 build the model, 6 and 7 explain switching and learning, 8 and 9 move to society and the machine.',
      svg: (l) => {
        const names = ['Decisions', 'Framing', 'Causality', 'Counterfact.', 'Constraints', 'Reframing', 'Learning', 'Pluralism', 'Vigilance'];
        const cols = [P.coral, P.sky, P.coral, P.teal, P.plum, P.amber, P.teal, P.sky, P.coral];
        let s = V.line(28, 130, 372, 130, { stroke: P.line, sw: 3, cls: 'a-draw' });
        names.forEach((n, i) => { const x = 36 + i * 41; const up = i % 2 === 0; s += V.circle(x, 130, 13, { fill: cols[i], cls: 'a-pop', delay: .3 + i * .15 }) + V.text(x, 134.5, String(i + 1), { size: 12, fill: '#fff', bold: true, cls: 'a-fade', delay: .3 + i * .15 }) + V.line(x, up ? 117 : 143, x, up ? 104 : 156, { stroke: P.line, sw: 1.5 }) + V.text(x, up ? 96 : 172, n, { size: 10.5, bold: true, cls: 'a-fade', delay: .5 + i * .15 }); });
        s += V.text(118, 230, '1 to 5: the model', { size: 11, fill: P.muted, cls: 'a-fade', delay: 1.8 }) + V.text(282, 230, '6 to 9: switching, learning, society', { size: 11, fill: P.muted, cls: 'a-fade', delay: 2 });
        return V.wrap(s);
      } },
  ];

  /* ---------- custom exercise: the constraint dial ---------- */
  function renderDial(host, ctx) {
    const { el, htmlEl, done } = ctx;
    const lbl = el('div', { html: '<span class="slider-val">4</span> constraints' });
    const range = el('input', { type: 'range', min: 0, max: 10, value: 4, 'aria-label': 'constraints' });
    const fig = el('figure'); const msg = htmlEl('div', 'ex-result', '');
    function draw(n) {
      const total = 60; const kept = Math.max(0, Math.round(total * Math.pow(0.62, n)));
      const useful = n === 0 ? 2 : (n <= 2 ? 4 : (n <= 5 ? Math.min(kept, 5) : (n <= 7 ? Math.min(kept, 2) : 0)));
      let s = V.frame(20, 20, 360, 190, { color: P.plum, label: 'Frame' });
      let seed = 11; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      for (let i = 0; i < kept; i++) { const u = i < useful; s += V.bulb(45 + rnd() * 310, 60 + rnd() * 120, { color: u ? P.amber : P.line, scale: u ? 1 : .7 }); }
      s += V.text(200, 240, `${kept} options, ${useful} of them useful`, { size: 13, bold: true });
      fig.innerHTML = V.wrap(s);
      lbl.querySelector('.slider-val').textContent = n;
      const m = n <= 1 ? 'Almost no constraints: a sea of options, hardly any useful. You drown in possibilities.'
        : n <= 5 ? 'The sweet spot: few but useful options. Small enough to decide, large enough not to miss something important.'
          : n <= 7 ? 'Tight: fast, but you probably miss better solutions. Fine when speed matters and the situation is familiar.'
            : 'Too many constraints: no room left. The frame explains the situation but produces no options for action.';
      msg.textContent = m; msg.className = 'ex-result' + (n >= 2 && n <= 5 ? ' good' : '');
    }
    let touched = 0; range.addEventListener('input', () => { draw(+range.value); if (++touched >= 3) done(); });
    host.append(lbl, range, fig, msg); draw(4);
  }

  window.FRAMERS.register({
    id: 'u00', number: 0, kind: 'intro', color: '#5B6B8C', minutes: 20,
    title: 'Orientation',
    tagline: 'What the book claims, what a frame actually is, and how this platform works.',
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="7" y="9" width="30" height="26" rx="5" fill="none" stroke="${c}" stroke-width="3"/><circle cx="22" cy="22" r="5" fill="${c}"/></svg>`,
    hook: '<p>In 2020 an MIT team found a new antibiotic with machine learning. Headlines said: AI did it. The authors of <em>Framers</em> say: humans did it, by changing how the problem was seen. That deliberate shift of perspective is what the book is about, and this unit gives you its skeleton.</p>',
    objectives: [
      'Explain what the authors mean by a frame and why framing, not data alone, drives good decisions.',
      'Distinguish applying a frame (the three C) from reframing (repertoire, repurposing, reinvention).',
      'Tell the book\'s framing apart from Kahneman and Tversky\'s framing effect.',
    ],
    film: { title: 'The whole book in seven scenes', scenes },
    sections: [
      { id: 's1', heading: 'What a frame is (and is not)',
        body: '<p>A frame is a mental model: a simplified representation of how part of the world works. It tells you what matters, what causes what, and what might happen if you act. Frames are not opinions; they are the lens through which options become visible. The same mask mandate looked obvious under a health frame and outrageous under a freedom frame: same data, opposite conclusions.</p><p>The word comes from decision science, but the meaning shifts. For Kahneman and Tversky the "framing effect" was a flaw: choices change with the wording of outcomes. In <em>Framers</em>, framing is a <strong>capability</strong>: deliberately choosing and applying a mental model before deciding.</p><p>Two things follow. You cannot think without a frame; you only swap one box for another. And there are no bad frames, only frames that fit a situation badly, with one exception: a frame that denies other frames.</p>',
        visual: { caption: 'Same situation, two frames, two sets of options. The frame determines what you can even consider.',
          svg: (l) => V.wrap(V.circle(200, 130, 34, { fill: P.ink }) + V.text(200, 135, 'Situation', { size: 12, fill: '#fff', bold: true }) +
            V.frame(20, 40, 120, 180, { color: P.coral, label: 'Frame A', cls: 'a-fade' }) + V.frame(260, 40, 120, 180, { color: P.teal, label: 'Frame B', cls: 'a-fade', delay: .3 }) +
            V.arrow(166, 130, 142, 130, { color: 'coral', cls: 'a-draw', delay: .5 }) + V.arrow(234, 130, 258, 130, { color: 'teal', cls: 'a-draw', delay: .5 }) +
            [0, 1, 2].map(i => V.bulb(55 + i * 28, 150, { cls: 'a-pop', delay: 1 + i * .2, scale: .8 })).join('') + [0, 1].map(i => V.bulb(300 + i * 40, 150, { cls: 'a-pop', delay: 1 + i * .2, scale: .8 })).join('') +
            V.text(80, 200, 'Options A', { size: 12 }) + V.text(320, 200, 'Options B', { size: 12 })) },
        keyIdea: 'Framing is not what you know. It is the lens that decides which of the things you know become options.' },
      { id: 's2', heading: 'Two activities, very different in nature',
        body: '<p>The book separates two things everyday language blurs. <strong>Applying a frame</strong> is what we do most of the time: inside a given model we reason causally, imagine alternatives (counterfactuals) and bound them with constraints. It is fast, trainable and improves with practice.</p><p><strong>Reframing</strong> means switching the model itself: taking another from your <em>repertoire</em>, <em>repurposing</em> one from a different field, or <em>reinventing</em> one from scratch. The routes are ordered from most common to rarest. Reframing is costly, risky and does not get reliably better with repetition. Much bad advice comes from confusing the two, for example treating every problem as a call for "radical rethinking" when loosening a constraint inside a broad frame would do.</p>',
        visual: { caption: 'Inside the frame: fast, frequent, trainable. Switching the frame: rare, risky, insight-driven.',
          svg: (l) => V.wrap(V.rect(20, 30, 170, 200, { fill: P.paper, stroke: P.line, r: 14 }) + V.rect(210, 30, 170, 200, { fill: P.paper, stroke: P.line, r: 14 }) +
            V.text(105, 56, 'Apply a frame', { size: 13, bold: true }) + V.text(295, 56, 'Switch the frame', { size: 13, bold: true }) +
            V.threeC(105, 120, l, { gap: 50, delay: .2 }) +
            V.group(V.frame(235, 80, 50, 50, { color: P.muted }) + V.frame(300, 80, 60, 60, { color: P.teal }) + V.arrow(288, 105, 298, 105, { color: 'ink' }), { cls: 'a-fade', delay: .8 }) +
            V.text(105, 200, 'fast · frequent · trainable', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1.2 }) + V.text(295, 200, 'rare · risky · insight', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1.2 })) } },
      { id: 's3', heading: 'Two dead ends, and how to use this platform',
        body: '<p>The book argues against two shortcuts. <strong>Hyper-rationalists</strong> want to hand decisions to data and algorithms; <strong>emotionalists</strong> want to follow impulse. Both still frame, only without noticing. The authors\' claim: machines search inside frames that humans set, so the human skill of framing becomes more important as AI spreads, not less.</p><p>Each unit follows the same path. The <strong>explainer</strong> gives you the structure before the words. <strong>Core ideas</strong> anchor each concept in a case. The <strong>exercise</strong> makes you apply rather than recognise. <strong>Reflection</strong> asks you to explain in your own words, which is itself learning. The <strong>self-test</strong> uses real cases, and the <strong>critique</strong> separates knowing a book from judging it. Progress and notes stay on this device.</p>' },
    ],
    exercise: {
      type: 'custom',
      title: 'The constraint dial',
      instructions: 'A frame produces options. Move the slider and watch what happens to the number and usefulness of options as you add or remove constraints. This is the core trade-off of chapter 5, shown before you read it.',
      render: renderDial,
    },
    caseStudy: {
      title: 'Halicin: the discovery the headlines got wrong',
      body: '<p>Antibiotic resistance kills hundreds of thousands of people a year, and conventional drug search looks for molecules that structurally resemble known antibiotics. That search space was largely exhausted. Regina Barzilay and Jim Collins at MIT changed the question: not "what looks like an antibiotic" but "what kills bacteria". They trained a model on about 2,300 compounds with known effects, then let it scan large molecule libraries. One candidate stood out; they named it halicin.</p><p>The press told it as a victory of machine over human. The authors read it the other way round. Humans defined the problem, chose the training data, picked the databases, and afterwards explained why the molecule worked. The algorithm searched inside a frame it could not have produced.</p>',
      lesson: 'In every "AI did X" story, ask: who set the frame the machine searched within?',
    },
    reflection: {
      intro: 'Capture your starting point now; you will compare it with your view at the end.',
      prompts: [
        'Pick one decision you are facing right now. Which frame are you using, and can you name it in one phrase?',
        'What do you expect the book to get wrong? Write the objection down before the chapters argue you out of it.',
      ],
      placeholder: 'My current frame for this decision is…',
    },
    quiz: [
      { case: '<p>In the early 2000s the Oakland Athletics had one of the smallest payrolls in Major League Baseball. Traditional scouts judged players by build, speed and batting average. General manager Billy Beane and his assistant Paul DePodesta asked instead which traits actually produce runs, and found that on-base percentage was cheap on the market relative to its effect on winning. The statistic itself had long been public.</p>',
        q: 'What does this case show about the relation between data and decisions?',
        options: [
          { text: 'The Athletics won because they gathered more and better statistics than rival clubs.', why: 'Wrong: the key numbers were public. The data-first view assumes information decides by itself; here the same data meant something new only under a new model.' },
          { text: 'The scouts failed because they relied on gut instinct instead of looking at numbers.', why: 'Wrong: the scouts used a model too, and batting average is a number. Their problem was not gut versus data but a frame that valued the wrong traits.' },
          { text: 'A new idea of what wins games turned existing statistics into affordable options.', why: 'Right: the causal model (runs come from getting on base) decided which data mattered and which players became affordable options.' },
          { text: 'The tight budget was the real source of success, because scarcity forces smart choices.', why: 'Wrong: the budget pushed the search, but a constraint alone produces no option. Without the causal model, cheap players are just cheap.' },
        ],
        answer: 2,
        explain: 'Data becomes an option only inside a frame. When everyone has the same information, the advantage lies in the model that interprets it.' },
      { case: '<p>In a 1981 paper in Science, Amos Tversky and Daniel Kahneman described an "Asian disease" expected to kill 600 people. One group chose between a sure "200 people will be saved" and a gamble; 72 percent took the sure option. A second group saw the same outcome as "400 people will die"; 78 percent now took the gamble. Only the wording differed.</p>',
        q: 'How does this effect relate to "framing" as the authors of Framers use the word?',
        options: [
          { text: 'It is a wording bias over fixed options, not the choice of a model that creates options.', why: 'Right: the options and the facts about the disease were identical. The book means actively choosing a mental model before options exist; this effect is done to you.' },
          { text: 'The wording gave each group a different mental model of the epidemic, which is the book\'s framing.', why: 'Wrong: both groups had the same model of the disease and the same programmes. A frame in the book\'s sense would yield different programmes, not different labels.' },
          { text: 'It proves the book\'s point that people should trust careful analysis over their intuition.', why: 'Wrong: the study shows a reasoning flaw, but the book is not arguing analysis versus intuition. Its question is which model you reason inside.' },
          { text: 'It shows that framing is mainly a persuasion tool used by politicians and marketers.', why: 'Wrong: wording can persuade, which is why the effect matters, but that is the communication sense of framing, not the cognitive one the book develops.' },
        ],
        answer: 0,
        explain: 'Same word, different object: the framing effect happens to you when fixed options are worded; framing in the book is something you do to generate options.' },
      { case: '<p>In 1931 Harry Beck, an engineering draughtsman who had worked in the London Underground Signals Office, drew a new Tube map on his own initiative. Inspired by electrical circuit diagrams, he used straight lines, spaced stations roughly evenly and dropped true distances. The publicity department first found it too radical. After a small trial run, the 1933 edition proved so popular it was reprinted within a month.</p>',
        q: 'What does Beck\'s map illustrate about what a frame is?',
        options: [
          { text: 'A less accurate picture of London that riders tolerated because it was easier to read.', why: 'Wrong: this judges the map by geography. It is accurate about what riders need, the order of stations and changes; distance matters for a walker, not a passenger.' },
          { text: 'A neutral record of the network, because it showed only facts and left out opinions.', why: 'Wrong: every inclusion and omission was a choice. Dropping distance was a judgement about what matters, which is exactly the work a frame does.' },
          { text: 'Proof that simpler models are better models, so the fewer details the better.', why: 'Wrong: the map fits a rider\'s task. For a cyclist planning a route the dropped distances mislead. A frame is judged by fit to purpose, not by simplicity.' },
          { text: 'A model that keeps what riders need, such as interchanges, and drops the rest.', why: 'Right: a frame is a simplification that decides what counts and what can be ignored. Its value lies in fit to a purpose, not completeness.' },
        ],
        answer: 3,
        explain: 'A frame is not a copy of reality but a deliberate selection. Ask what it keeps, what it drops, and for which purpose.' },
      { case: '<p>In 1849 John Snow argued that cholera spreads through contaminated water, while most authorities blamed miasma, foul air from filth. When cholera struck Soho in 1854, Snow mapped deaths around the Broad Street pump and noted that workers at a nearby brewery, who drank beer rather than pump water, were spared. The parish removed the pump handle. The Board of Health still attributed the outbreak to miasma.</p>',
        q: 'Why did Snow\'s frame point to the pump handle when the miasma frame did not?',
        options: [
          { text: 'He had collected more and better data than the officials who held to miasma.', why: 'Wrong: the Board had access to the same deaths and his findings, yet kept miasma. The data pointed to the pump only for someone holding the water model.' },
          { text: 'His causal model named a route, the water, and so singled out one feasible intervention.', why: 'Right: causality (water carries the disease), a telling comparison (the spared brewery workers) and a constraint (one pump, one handle) combined into a concrete option.' },
          { text: 'Plotting the deaths on a map revealed the cause on its own, without any theory.', why: 'Wrong: a map shows clustering, not cause. Snow read the cluster as a pump effect because his frame said water; a miasma reader sees a foul neighbourhood.' },
          { text: 'Miasma was a frame that could not generate any actions against the disease at all.', why: 'Wrong: miasma also produced options, such as removing filth and smells. It generated poorly fitting options, which makes it a misfit, not a frame without output.' },
        ],
        answer: 1,
        explain: 'Frames do not just explain; through cause, comparison and constraint they generate options. Different frames over the same facts yield different actions.' },
      { case: '<p>From 1831 to 1836 Robert FitzRoy captained HMS Beagle while Charles Darwin sailed as naturalist; the two often discussed what Darwin observed. In the official 1839 account, FitzRoy added a chapter of remarks on the Deluge, reading geology in the light of the biblical flood. Darwin drew on the voyage in building the theory of natural selection he published in 1859. FitzRoy came to oppose it publicly.</p>',
        q: 'Which lesson fits the book\'s view of frames and pluralism?',
        options: [
          { text: 'FitzRoy held a bad frame, since a religious model has no place in reading nature.', why: 'Wrong: the book says there are no bad frames, only misfits. A frame becomes the exception only when it denies other frames the right to exist.' },
          { text: 'Pluralism means both readings of the geology were equally valid as explanations.', why: 'Wrong: pluralism values many frames, not equal fit. Frames differ in how well they explain; the open contest between them is what exposes the misfit.' },
          { text: 'Shared observations could not settle it; an open contest between rival frames had to.', why: 'Right: one voyage fed two models. Because both could be published and argued over, the better fitting one could prevail. Pluralism is how frames get corrected.' },
          { text: 'With more careful observation FitzRoy would have reached Darwin\'s conclusion himself.', why: 'Wrong: this assumes data dictates the model. FitzRoy discussed much of the same material with Darwin; his frame decided what it meant.' },
        ],
        answer: 2,
        explain: 'Evidence becomes an argument only inside a frame. Progress needs several frames competing in the open, not one frame that everyone must share.' },
    ],
    flashcards: [
      { front: 'Frame', back: 'A mental model that makes part of the world intelligible: what matters, what causes what, and which options exist.' },
      { front: 'The three C', back: 'Causality, counterfactuals, constraints: the elements of applying a frame.' },
      { front: 'Reframing', back: 'Switching the mental model: repertoire, repurposing or reinvention. Rare, risky, not improved by repetition.' },
      { front: 'Framing effect vs. framing', back: 'Kahneman and Tversky: a bias caused by wording fixed options. Framers: the deliberate choice of a model that generates options.' },
      { front: 'The only bad frame', back: 'One that denies the legitimacy or existence of other frames.' },
    ],
    critique: [
      { claim: 'Machines cannot frame; only humans generate causal models, counterfactuals and constraints.',
        challenge: 'Written in 2020, before large language models. Today a model proposes alternative framings, counterfactual scenarios and constraints on request. The defensible version is narrower: machines do not <em>own</em> the choice of frame, the goal or the responsibility. Keep this distinction in mind for every chapter.' },
      { claim: 'The examples (halicin, Apollo, Entebbe, Messner) show the power of framing.',
        challenge: 'They show successful framing. Failed reframings that looked equally smart beforehand are not sampled. A theory that explains success after the fact should also predict something; ask in each chapter what the frame concept would rule out.' },
      { claim: '"Frame" is a new lens on cognition.',
        challenge: 'Goffman (1974) analysed frames sociologically, Weick called the organisational version sensemaking, Pearl formalised counterfactual causality. The book\'s contribution is a practical synthesis and a normative argument for pluralism, not the concept itself. It also says little about power: who decides which frame counts?' },
    ],
    summary: [
      'Humans think in frames: mental models that make the world intelligible and generate options.',
      'Applying a frame uses causality, counterfactuals and constraints; it is fast and trainable.',
      'Reframing switches the model (repertoire, repurposing, reinvention); it is rare, risky and not improved by practice.',
      'Against the two dead ends of algorithm-only and gut-only decisions, the book makes a diversity of frames its central value.',
    ],
    glossary: [
      { term: 'Frame (mental model)', def: 'A representation of how part of the world works; the lens through which options become visible.' },
      { term: 'Framing (in this book)', def: 'The deliberate choice and application of a mental model before deciding; a capability, not a bias.' },
      { term: 'Hyper-rationalists / emotionalists', def: 'The two camps the authors reject: decisions by algorithm, or decisions by instinct.' },
    ],
  });
})();
