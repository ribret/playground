/* u03 (V2, English only): Causality (chapter 3) */
(function () {
  const P = V.palette;

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 6000,
      caption: '<b>Humans turn causal links into templates.</b> A dog learns that its paw earns a treat; we learn once that “hot things burn” and apply it to stoves and furnaces we never touched.',
      svg: () => V.wrap(
        V.frame(110, 34, 180, 76, { label: 'Template', color: P.coral, cls: 'a-pop' }) +
        V.text(200, 80, 'Hot things burn', { size: 15, bold: true, cls: 'a-fade', delay: .4 }) +
        V.arrow(200, 116, 80, 172, { color: 'coral', cls: 'a-draw', delay: .8 }) +
        V.arrow(200, 116, 200, 172, { color: 'coral', cls: 'a-draw', delay: 1 }) +
        V.arrow(200, 116, 320, 172, { color: 'coral', cls: 'a-draw', delay: 1.2 }) +
        V.pill(80, 192, 'ember', { fill: P.ink, cls: 'a-pop', delay: 1.4 }) +
        V.pill(200, 192, 'stove', { fill: P.ink, cls: 'a-pop', delay: 1.6 }) +
        V.pill(320, 192, 'furnace', { fill: P.ink, cls: 'a-pop', delay: 1.8 }) +
        V.text(200, 240, 'abstracted once, usable everywhere', { size: 13, fill: P.muted, cls: 'a-fade', delay: 2.2 })) },
    { duration: 7000,
      caption: '<b>Same crisis, two causal frames.</b> In 2008 others saw firms and incentives; Bernanke saw trust and credit across the system, and his frame made flooding the market with capital the obvious option.',
      svg: () => V.wrap(
        V.frame(20, 40, 170, 120, { label: 'Incentives', color: P.muted, cls: 'a-fade' }) +
        V.text(105, 98, 'Bailout\nrewards risk', { size: 14, bold: true, fill: P.muted, cls: 'a-fade', delay: .3 }) +
        V.frame(210, 40, 170, 120, { label: 'System', color: P.coral, cls: 'a-fade', delay: .8 }) +
        V.text(295, 90, 'Trust →\ncredit →\neconomy', { size: 14, bold: true, cls: 'a-fade', delay: 1.1 }) +
        V.pill(105, 200, 'let them fail', { fill: P.muted, cls: 'a-pop', delay: 1.8 }) +
        V.pill(295, 200, 'flood with capital', { fill: P.coral, cls: 'a-pop', delay: 2.2 }) +
        V.text(200, 245, 'The frame produces the option', { size: 13, fill: P.ink, cls: 'a-fade', delay: 2.6 })) },
    { duration: 6500,
      caption: '<b>Working is not enough.</b> Semmelweis cut deaths with handwashing, but his explanation did not convince; his successor dropped the practice and deaths rose again.',
      svg: () => V.wrap(
        V.person(80, 160, { color: P.ink, scale: 1.4, cls: 'a-fade' }) +
        V.text(250, 58, 'Handwashing', { size: 17, bold: true, cls: 'a-fade', delay: .3 }) +
        V.text(170, 118, 'works', { size: 16, anchor: 'start', cls: 'a-fade', delay: .8 }) +
        V.text(330, 120, '✓', { size: 30, bold: true, fill: P.ok, cls: 'a-pop', delay: 1.1 }) +
        V.text(170, 170, 'convinces', { size: 16, anchor: 'start', cls: 'a-fade', delay: 1.6 }) +
        V.text(330, 172, '✕', { size: 30, bold: true, fill: P.bad, cls: 'a-pop', delay: 1.9 }) +
        V.text(200, 236, 'No explanation, no adoption', { size: 15, bold: true, fill: P.coral, cls: 'a-fade', delay: 2.5 })) },
    { duration: 6000,
      caption: '<b>Explaining is learning.</b> In Lombrozo’s experiments, people asked to explain a classification found the hidden rule more often than people asked to describe it.',
      svg: () => V.wrap(
        V.text(200, 40, 'Explain and you learn more', { size: 16, bold: true, cls: 'a-fade' }) +
        V.line(60, 200, 340, 200, { stroke: P.line, sw: 2 }) +
        V.rect(105, 140, 70, 60, { fill: P.muted, stroke: 'none', r: 4, cls: 'a-rise', delay: .5 }) +
        V.rect(225, 70, 70, 130, { fill: P.coral, stroke: 'none', r: 4, cls: 'a-rise', delay: 1 }) +
        V.text(140, 224, 'describe', { size: 14, cls: 'a-fade', delay: .7 }) +
        V.text(260, 224, 'explain', { size: 14, bold: true, cls: 'a-fade', delay: 1.2 }) +
        V.text(200, 250, 'schematic', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1.5 })) },
    { duration: 6000,
      caption: '<b>Causality is the foundation of agency.</b> Only if choices have predictable consequences can we choose, be held responsible, and be influenced by others.',
      svg: () => {
        const items = ['Causality', 'Agency', 'Responsibility', 'Control'];
        let s = '';
        items.forEach((t, i) => {
          const y = 40 + i * 58;
          s += V.pill(200, y, t, { fill: i === 0 ? P.coral : P.ink, w: 170, h: 32, size: 14, cls: 'a-pop', delay: i * .55 });
          if (i < 3) s += V.arrow(200, y + 17, 200, y + 40, { color: 'ink', cls: 'a-draw', delay: i * .55 + .3 });
        });
        return V.wrap(s);
      } },
    { duration: 6500,
      caption: '<b>Wrong causal frames get replaced, not abandoned.</b> The rooster dies, the sun rises anyway; we swap the frame for a better one instead of giving up on causes.',
      svg: () => V.wrap(
        V.pill(110, 70, 'rooster crows', { fill: P.muted, cls: 'a-fade' }) +
        V.arrow(185, 70, 268, 70, { color: 'muted', cls: 'a-draw', delay: .4 }) +
        V.circle(300, 70, 22, { fill: P.amber, cls: 'a-pop', delay: .7 }) +
        V.text(226, 82, '✕', { size: 34, bold: true, fill: P.bad, cls: 'a-pop', delay: 1.5 }) +
        V.pill(110, 155, 'Earth turns', { fill: P.coral, cls: 'a-fade', delay: 2.1 }) +
        V.arrow(185, 155, 268, 155, { color: 'coral', cls: 'a-draw', delay: 2.4 }) +
        V.circle(300, 155, 22, { fill: P.amber, cls: 'a-pop', delay: 2.7 }) +
        V.text(200, 228, 'Error means: frame better', { size: 15, bold: true, cls: 'a-fade', delay: 3.1 })) },
  ];

  /* ---------- section visuals ---------- */
  const ladder = () => V.wrap(
    V.text(24, 34, 'more abstraction = more transfer', { size: 13, bold: true, anchor: 'start', fill: P.coral, cls: 'a-fade' }) +
    V.rect(24, 178, 112, 62, { fill: P.paper, stroke: P.muted, cls: 'a-rise', delay: .2 }) +
    V.rect(144, 122, 112, 118, { fill: P.paper, stroke: P.sky, cls: 'a-rise', delay: .5 }) +
    V.rect(264, 62, 112, 178, { fill: P.paper, stroke: P.coral, sw: 2.5, cls: 'a-rise', delay: .8 }) +
    V.text(80, 202, 'Euglena', { size: 13, bold: true, cls: 'a-fade', delay: .4 }) +
    V.text(80, 222, 'Reflex', { size: 12, fill: P.muted, cls: 'a-fade', delay: .4 }) +
    V.text(200, 146, 'Dog', { size: 13, bold: true, cls: 'a-fade', delay: .7 }) +
    V.text(200, 166, 'learned,', { size: 12, fill: P.muted, cls: 'a-fade', delay: .7 }) +
    V.text(200, 182, 'concrete only', { size: 12, fill: P.muted, cls: 'a-fade', delay: .7 }) +
    V.text(320, 86, 'Human', { size: 13, bold: true, cls: 'a-fade', delay: 1 }) +
    V.text(320, 106, 'template,', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1 }) +
    V.text(320, 122, 'transferable,', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1 }) +
    V.text(320, 138, 'shareable', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1 }) +
    V.text(320, 200, '(crow: a little', { size: 12, fill: P.muted, italic: true, cls: 'a-fade', delay: 1.3 }) +
    V.text(320, 216, 'of this, too)', { size: 12, fill: P.muted, italic: true, cls: 'a-fade', delay: 1.3 }));

  const matrix = () => {
    const q = (x, y, fill, a, b, d, tc = '#fff') => V.rect(x, y, 150, 92, { fill, stroke: 'none', r: 10, opacity: .9, cls: 'a-pop', delay: d }) +
      V.text(x + 75, y + 42, a, { size: 13, bold: true, fill: tc, cls: 'a-fade', delay: d + .2 }) +
      V.text(x + 75, y + 62, b, { size: 12, fill: tc, cls: 'a-fade', delay: d + .2 });
    return V.wrap(
      q(80, 18, P.bad, 'Interpreter, rooster', 'convincing, wrong', .9) +
      q(238, 18, P.ok, 'Lister', 'gets adopted', 1.2) +
      q(80, 118, P.muted, 'forgotten', 'neither', .3) +
      q(238, 118, P.amber, 'Semmelweis', 'works, dies out', .6, P.ink) +
      V.arrow(80, 226, 388, 226, { color: 'ink', sw: 2 }) +
      V.text(234, 248, 'actually works →', { size: 13, bold: true }) +
      V.arrow(70, 210, 70, 20, { color: 'ink', sw: 2 }) +
      V.group(V.text(0, 0, 'explanation convinces →', { size: 13, bold: true }), { transform: 'translate(52,116) rotate(-90)' }));
  };

  window.FRAMERS.register({
    id: 'u03', number: 3, kind: 'chapter', color: '#E4572E', minutes: 20,
    title: 'Causality',
    tagline: 'We are causal-inference engines and often wrong. The answer is better causal frames, not fewer.',
    icon: (c) => `<svg viewBox="0 0 44 44"><circle cx="10" cy="22" r="6" fill="${c}"/><circle cx="34" cy="22" r="6" fill="none" stroke="${c}" stroke-width="3"/><path d="M17,22 H25 M22,17 L27,22 L22,27" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    hook: '<p>A split-brain patient sees the word “walk” with his right hemisphere only. He gets up and walks. Asked why, he says he wanted a Coke. The talking half never saw the instruction; it invented a reason. We cannot stop explaining in causes. It is our greatest asset and our most fluent error.</p>',
    objectives: [
      'Explain why abstract causal templates give humans transfer that stimulus-response learning cannot.',
      'Distinguish whether a frame works from whether it gets adopted, and say what explainability adds.',
      'Separate correlations, testable causal hypotheses and invented explanations in a real situation.',
    ],
    film: { title: 'From reflex to responsibility in six scenes', scenes },
    sections: [
      { id: 's1', heading: 'From reaction to template',
        body: '<p>All living things respond to causes. The euglena swims towards light because its DNA leaves no choice. A dog <em>learns</em> that offering its paw brings a treat, but it stays tied to that concrete link: it does not infer that friendliness in general is what pays.</p><p>Humans abstract a causal link into a <strong>template</strong>, a reusable mental model. One burn on an ember becomes “hot things burn”, valid for stoves and furnaces never touched. Templates <strong>transfer</strong>, <strong>speed up learning</strong> and, above all, allow <strong>abstraction</strong>: we need not run every experiment ourselves, and we can hand the result to others.</p>',
        visual: { svg: ladder, position: 'bottom',
          caption: 'Three levels of causal processing. Only the top level produces knowledge that transfers to unseen situations and can be passed on.' },
        keyIdea: 'A causal template is a causal link freed from its original situation.' },
      { id: 's2', heading: 'Explainability: why the right solution can lose',
        body: '<p>Vienna, 1840s. In Ignaz Semmelweis’s clinic, women delivered by doctors died of childbed fever about five times as often as those delivered by midwives. Semmelweis ordered handwashing in chlorinated lime, and deaths dropped. But his explanation (“cadaverous particles”) was vague, he was ridiculed, and his successor abolished the practice. Two decades later Joseph Lister, an establishment figure armed with germ theory, won surgeons over.</p><p>The lesson: a frame must not only improve decisions, it must offer a <strong>convincing causal explanation</strong>. The urge for explanation is so strong that we invent one when needed, as Gazzaniga’s “interpreter” shows. Explainability cuts both ways: it is the condition for adoption, and no guarantee of truth.</p>',
        visual: { svg: matrix, position: 'bottom',
          caption: 'Whether a frame works and whether its explanation convinces are independent axes. Organisations select on the vertical one, reality on the horizontal one.' },
        keyIdea: 'Effectiveness gets a frame tested. Explainability gets it adopted.' },
      { id: 's3', heading: 'Often wrong, and still the right tool',
        body: '<p>Explaining also teaches the explainer: in Tania Lombrozo’s studies, explainers found hidden rules more often than describers. And causality grounds <strong>agency</strong>: only if actions have predictable consequences can we choose, be held responsible, or be nudged.</p><p>Yet our inferences fail constantly. The farmer’s rooster crows before every sunrise until the day it dies. The authors’ answer is to replace bad causal frames with better ones. They reject three exits: the statistician’s “correlation is not causation” as a reason to stay silent (Judea Pearl’s causal revolution pushes back), the emotionalist’s gut, and the hyper-rationalist’s machine, whose Dota 2 bots only won because humans hand-coded causal frames into them.</p>',
        keyIdea: 'The remedy for bad causal frames is better causal frames, not none.' },
    ],
    exercise: {
      type: 'sort',
      title: 'Correlation, hypothesis or invented explanation?',
      instructions: '<p>Three months after a return-to-office rule, engagement has dropped in several units. Sort each debrief statement.</p><ul><li><strong>Correlation:</strong> what occurs together, no claim about the mechanism.</li><li><strong>Causal hypothesis:</strong> a mechanism <em>and</em> what else should be observable if it is true.</li><li><strong>Invented explanation:</strong> a causal story that fills the gap but is untested or untestable.</li></ul>',
      categories: [
        { id: 'corr', label: 'Correlation' },
        { id: 'hyp', label: 'Causal hypothesis' },
        { id: 'interp', label: 'Invented explanation' },
      ],
      items: [
        { text: '“Since the rule took effect, engagement has fallen by nine points in three units.”', category: 'corr',
          why: 'A temporal sequence, nothing more. A reorganisation, a bad quarter or the survey date could explain it too.' },
        { text: '“Employees who come in more often than required report higher engagement than those who meet the minimum.”', category: 'corr',
          why: 'The arrow may point the other way: engaged people come in more. Reading it as “presence creates engagement” is already a causal leap.' },
        { text: '“If commuting time drives the drop, teams with long commutes should have lost more. Let’s split the data that way.”', category: 'hyp',
          why: 'Mechanism, observable implication and a test. A frame you can be wrong about, which is what makes it useful.' },
        { text: '“People just got comfortable working from home.”', category: 'interp',
          why: 'Explains everything and forbids nothing. Like Gazzaniga’s interpreter, it supplies a fluent reason and shields the decision.' },
        { text: '“After the leadership offsite, scores in two units rose again. So the offsite worked.”', category: 'interp',
          why: 'The rooster pattern. Without a comparison (units without an offsite, rebound after a dip) this is a story, not a finding.' },
      ],
    },
    caseStudy: {
      title: 'Bernanke, September 2008: the frame that saw the system',
      body: '<p>Lehman Brothers had just collapsed, and the insurer AIG was close behind. Many policymakers framed the problem through firms and incentives: rescuing AIG would reward recklessness (moral hazard).</p><p>Fed chairman Ben Bernanke had studied financial panics for decades. His finding about 1929: the central bank’s reaction, not the crash, caused the Great Depression. His causal template linked capital availability, trust between banks and the real economy. The danger was not the losses but banks ceasing to lend to each other.</p><p>That frame produced an option the incentive frame could not see: the Fed bought toxic assets so banks could lend again. Its balance sheet grew roughly fivefold by 2015. The system did not collapse.</p>',
      lesson: 'Both camps reasoned causally. The level at which they located the cause (firm or system) decided which options were visible at all.',
    },
    reflection: {
      intro: 'Use Lombrozo’s finding on yourself: write briefly, but explain rather than describe.',
      prompts: [
        'Pick an intervention in your organisation that worked but was dropped or never scaled. Was the problem the effect or the explanation, and who had to be convinced?',
        'Name one causal belief you hold about your team or a client (“X happens because Y”). What would you have to observe to give it up?',
      ],
      placeholder: 'X happens because Y. I would give that up if I saw…',
    },
    quiz: [
      { case: '<p>December 1978: United Flight 173 circles Portland for about an hour while the captain troubleshoots a landing-gear warning. The first officer and flight engineer mention fuel, hesitantly. The DC-8 runs out of fuel; ten people die. The NTSB faulted the captain and the other two crew members’ failure to get their concern across, and urged flight-deck resource management training.</p>',
        q: 'What does that finding show about how a causal frame shapes the remedy?',
        options: [
          { text: 'The remedy was chosen on cost: training was cheaper and quicker than new disciplinary rules.',
            why: 'Cost shapes which option you pick, not why training appeared as an option. That came from where the cause sat.' },
          { text: 'Clearing the captain of fault made punishment unjust, so training was the only fair option left.',
            why: 'The captain was not cleared: his failure to monitor fuel was the probable cause. The frame set his error inside a crew system.' },
          { text: 'The cause was located in how the crew worked together, which made training the obvious lever.',
            why: 'Right. Locating the cause in crew interaction, not one person, makes a team-level remedy visible, as with Bernanke’s system frame.' },
          { text: 'Naming several contributing causes avoided a single culprit and kept every possible remedy open.',
            why: 'Several causes are still a causal claim, located in the crew. Remedies followed from where they sat, not from openness.' },
        ],
        answer: 2,
        explain: 'Where you locate the cause (one person, the crew, the system) decides which levers you can see.' },
      { case: '<p>Vienna, 1847. Semmelweis has doctors wash their hands in chlorinated lime, and deaths from childbed fever on his ward fall sharply. His explanation, “cadaverous particles”, is vague and colleagues mock it. His successor drops the routine and deaths rise again. Two decades later Lister, armed with germ theory and Lancet papers, wins surgeons over.</p>',
        q: 'What does the contrast teach about getting a working practice adopted?',
        options: [
          { text: 'Results alone did not carry it; adoption needed a causal story that peers found convincing.',
            why: 'Right. Semmelweis had the effect but no persuasive mechanism. Lister brought an explanation, a credible channel and status.' },
          { text: 'Good practices win in the end, so the long delay mainly shows that change takes time.',
            why: 'The practice did not slowly win; it was abolished and deaths rose. A better explanation from a better-placed messenger won.' },
          { text: 'Since his causal account was vague and partly wrong, rejecting handwashing was a reasonable call.',
            why: 'Confuses a flawed mechanism with no effect. The death rates showed handwashing worked despite the weak explanation.' },
          { text: 'Lister prevailed because his surgical numbers were stronger, so better data settles adoption.',
            why: 'Evidence helped, but Semmelweis already had striking numbers. What changed was the causal theory and who presented it.' },
        ],
        answer: 0,
        explain: 'Effectiveness gets a frame tested; explainability gets it adopted.' },
      { case: '<p>In the 1980s and 1990s large observational studies, including the Nurses’ Health Study, found that women taking hormone therapy after menopause had markedly fewer heart attacks. In 2002 the randomised Women’s Health Initiative trial of estrogen plus progestin was stopped early because risks outweighed benefits: the treated group had more coronary events, not fewer.</p>',
        q: 'What is the most likely flaw in the original causal frame?',
        options: [
          { text: 'The observational studies were too small to detect the real effect of the hormones reliably.',
            why: 'They were large. Size reduces noise, not bias; a bigger confounded study repeats the error more confidently.' },
          { text: 'Observational data cannot tell us anything about causes, so they should not have guided prescribing.',
            why: 'The dogma the chapter rejects. Observational data rightly suggest hypotheses; the error was ignoring possible third factors.' },
          { text: 'One trial cannot overturn decades of consistent data, so the earlier conclusion still holds.',
            why: 'Consistency is no comfort if every study shares the same bias. Randomisation breaks the link to hidden factors.' },
          { text: 'Women who chose hormone therapy tended to be healthier anyway, a hidden common cause.',
            why: 'Right. A healthy-user effect: women who opt for preventive treatment are healthier in other ways, so the drug looked protective.' },
        ],
        answer: 3,
        explain: 'Treat a correlation as a causal hypothesis: ask which third factor could produce it, and test.' },
      { case: '<p>As a young psychologist, Daniel Kahneman told Israeli Air Force flight instructors that praise works better than punishment. A veteran objected: after he praised an excellent manoeuvre, the next was usually worse; after he shouted at a poor one, the next was better. Kahneman later judged the observation accurate, the conclusion wrong.</p>',
        q: 'What is the best diagnosis of the instructor’s causal frame?',
        options: [
          { text: 'His sample of cadets was too small, so the pattern he described was probably imagined.',
            why: 'The pattern is real. The problem is not seeing too little but explaining it with the wrong cause.' },
          { text: 'Unusual attempts tend to be followed by ordinary ones, so his reaction was not the cause.',
            why: 'Right. Regression to the mean: after an extreme attempt, the next one drifts back towards average whatever he says.' },
          { text: 'He is right for flying, because high-stakes skills respond better to punishment than praise.',
            why: 'A domain excuse that protects the frame. The pattern appears wherever performance varies by chance.' },
          { text: 'Praise made the cadets overconfident, a hidden mechanism that explains the drop after their good attempts.',
            why: 'A fluent mechanism invented to fit the story: the interpreter at work. Regression explains the pattern without it.' },
        ],
        answer: 1,
        explain: 'A reliable sequence is not yet a cause. Like the rooster, a pattern can be real and its causal story invented.' },
      { case: '<p>In the 1950s Richard Doll and Austin Bradford Hill linked smoking to lung cancer. R. A. Fisher, a founder of modern statistics, a heavy pipe smoker and a consultant to tobacco firms, objected: correlation is not causation, and perhaps a shared genetic disposition drives both the urge to smoke and the cancer. The evidence later converged on smoking.</p>',
        q: 'From the chapter’s point of view, where did Fisher’s argument go wrong?',
        options: [
          { text: 'He was wrong to raise a hidden common cause at all; a correlation this strong speaks for itself.',
            why: 'Proposing a confounder is sound causal reasoning. Strong correlations can still be confounded; the question is how strong the confounder must be.' },
          { text: 'His conflict of interest alone discredits the argument, so its content needed no examination.',
            why: 'Motive matters for who frames a question but does not refute content. His rival hypothesis had to be tested.' },
          { text: 'He let a merely possible hidden cause suspend judgment, without asking what it would have to explain.',
            why: 'Right. In 1959 Cornfield showed such a factor would need to be as lopsided between smokers and nonsmokers as the risk itself.' },
          { text: 'He should have demanded randomised experiments, the only valid route to a causal answer.',
            why: 'You cannot randomise people to smoke for decades. Converging observational evidence, as Hill argued, can establish causes without experiments.' },
        ],
        answer: 2,
        explain: '“Correlation is not causation” is a starting question, not a verdict. Rival hypotheses must face their predictions.' },
    ],
    flashcards: [
      { front: 'Causal template', back: 'A causal link abstracted from its original situation into a reusable mental model. Advantages: versatility, faster learning, abstraction.' },
      { front: 'The Semmelweis lesson', back: 'A frame can work and still fail to be adopted. Adoption requires a convincing causal explanation (and, as the case shows, a credible messenger).' },
      { front: 'Left-brain interpreter', back: 'Gazzaniga: the talking hemisphere invents a plausible cause for an action whose real cause it never saw. Our urge to explain outruns our knowledge.' },
      { front: 'Causality → agency → responsibility → control', back: 'Predictable consequences make choice possible; choice creates accountability; accountable agents can be influenced, the premise of every nudge.' },
      { front: 'The rooster', back: 'A reliable association mistaken for a cause. When it breaks, we replace the frame (Earth’s rotation). Wrong frames argue for better framing, not for none.' },
    ],
    critique: [
      { claim: 'Judea Pearl’s “causal revolution” rehabilitates causal reasoning.',
        challenge: 'Pearl is cited as an ally, but the chapter skips what his work is about: <em>how</em> to tell a good causal claim from a bad one (the ladder of causation, causal diagrams). The book says “ask for the hidden assumption” but offers no test. Without one, causal framing and confident storytelling feel the same from the inside.' },
      { claim: 'Semmelweis failed for lack of a convincing explanation.',
        challenge: 'The chapter itself lists other reasons: a Hungarian outsider among Viennese elite physicians, with a finding that implied doctors were killing patients. Lister was a baron in the Royal Society. “Convincing” depends on who explains, to whom, at whose cost. Bourdieu would call explainability filtered by symbolic capital; the book notes this but does not theorise it.' },
      { claim: 'Machines need humans to supply causal frames, as the Dota 2 bots show.',
        challenge: 'The example dates from 2019. Today’s language models offer causal explanations and rival hypotheses on request. Whether that is framing or Gazzaniga’s interpreter in silicon is open; the chapter’s evidence no longer settles it. The stronger claim concerns who is accountable for a frame, not who can generate one.' },
    ],
    summary: [
      'Humans abstract causal links into reusable templates that transfer to situations never experienced.',
      'A frame must not only work but offer a convincing causal explanation to be adopted, as Semmelweis versus Lister shows.',
      'Explaining is itself a way of learning, and causality grounds agency, responsibility and the possibility of influence.',
      'Our causal frames are often wrong; the authors reject silence, gut feeling and machine delegation, and argue for better causal framing.',
    ],
    glossary: [
      { term: 'Causal template', def: 'A causal link generalised into a mental model that can be applied to new situations and communicated to others.' },
      { term: 'Explainability', def: 'The capacity of a frame to offer a convincing account of why something happens; in the book, the condition for a frame to be adopted.' },
      { term: 'Left-brain interpreter', def: 'Gazzaniga’s term for the brain’s tendency to invent plausible reasons for actions whose real causes it does not know.' },
      { term: 'Agency', def: 'The capacity to choose and act; in the book it rests on anticipating consequences causally, and it grounds responsibility.' },
    ],
  });
})();
