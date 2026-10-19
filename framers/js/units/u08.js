/* u08: Pluralism (chapter 8), V2 English-only edition */
(function () {
  const P = V.palette;

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 6500,
      caption: '<b>A rich spectrum of frames can narrow into one.</b> The 1920s teemed with competing worldviews; a decade later much of Europe had only one left, and the empty places were the real loss.',
      svg: (l) => {
        const cols = [P.coral, P.teal, P.plum, P.amber, P.sky, P.ok];
        let s = V.text(200, 28, '1920s: many frames', { size: 15, bold: true, cls: 'a-fade' });
        cols.forEach((c, i) => { s += V.frame(40 + i * 56, 42, 44, 44, { color: c, cls: 'a-pop', delay: .2 + i * .12 }); });
        s += V.arrow(200, 100, 200, 140, { color: 'muted', cls: 'a-draw', delay: 1.3 });
        cols.forEach((c, i) => {
          s += i === 2 ? V.frame(40 + i * 56, 152, 44, 44, { color: P.muted, cls: 'a-pop', delay: 1.8 })
            : V.rect(40 + i * 56, 152, 44, 44, { fill: 'none', stroke: P.line, dash: '4 4', cls: 'a-fade', delay: 1.8 + i * .1 });
        });
        s += V.text(200, 232, 'then: one frame, much emptiness', { size: 15, bold: true, fill: P.muted, cls: 'a-fade', delay: 2.6 });
        return V.wrap(s);
      } },
    { duration: 7000,
      caption: '<b>Only one frame is bad: the one that denies other frames.</b> Frames may criticise and fight each other with arguments; a frame that claims to be the only legitimate one crosses the line.',
      svg: (l) => V.wrap(
        V.text(105, 44, 'clashing allowed', { size: 14, bold: true, fill: P.teal, cls: 'a-fade' }) +
        V.frame(40, 70, 44, 44, { color: P.coral, cls: 'a-pop', delay: .2 }) +
        V.frame(126, 70, 44, 44, { color: P.teal, cls: 'a-pop', delay: .35 }) +
        V.frame(83, 140, 44, 44, { color: P.plum, cls: 'a-pop', delay: .5 }) +
        V.line(88, 92, 122, 92, { stroke: P.ink, dash: '3 4', cls: 'a-fade', delay: .8 }) +
        V.line(70, 118, 92, 138, { stroke: P.ink, dash: '3 4', cls: 'a-fade', delay: .9 }) +
        V.line(140, 118, 118, 138, { stroke: P.ink, dash: '3 4', cls: 'a-fade', delay: 1 }) +
        V.frame(212, 52, 168, 148, { label: 'only true', color: P.ink, cls: 'a-pop', delay: 1.5 }) +
        V.rect(232, 80, 40, 40, { fill: 'none', stroke: P.muted, cls: 'a-fade', delay: 1.9 }) +
        V.rect(318, 80, 40, 40, { fill: 'none', stroke: P.muted, cls: 'a-fade', delay: 1.9 }) +
        V.rect(275, 140, 40, 40, { fill: 'none', stroke: P.muted, cls: 'a-fade', delay: 1.9 }) +
        V.text(252, 110, '✕', { size: 24, bold: true, fill: P.bad, cls: 'a-pop', delay: 2.3 }) +
        V.text(338, 110, '✕', { size: 24, bold: true, fill: P.bad, cls: 'a-pop', delay: 2.45 }) +
        V.text(295, 170, '✕', { size: 24, bold: true, fill: P.bad, cls: 'a-pop', delay: 2.6 }) +
        V.text(200, 238, 'Only bad: denying the others', { size: 15, bold: true, fill: P.bad, cls: 'a-fade', delay: 3 })) },
    { duration: 7000,
      caption: '<b>Hierarchy breeds one frame, networks breed many.</b> In 1959 Boston’s Route 128 had almost triple Silicon Valley’s tech jobs; by 1990 a web of small rivals whose people swapped jobs and ideas was far ahead.',
      svg: (l) => {
        let s = '';
        const tree = [[100, 56], [70, 106], [130, 106], [55, 156], [85, 156], [115, 156], [145, 156]];
        const tl = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
        tl.forEach(([a, b]) => { s += V.line(tree[a][0], tree[a][1], tree[b][0], tree[b][1], { stroke: P.muted, cls: 'a-draw', delay: .3 }); });
        tree.forEach(([x, y], i) => { s += V.circle(x, y, i === 0 ? 12 : 8, { fill: i === 0 ? P.ink : P.muted, cls: 'a-pop', delay: .1 + i * .08 }); });
        const net = [[250, 60], [320, 52], [365, 100], [300, 110], [235, 130], [275, 170], [345, 160]];
        const nl = [[0, 1], [1, 2], [0, 3], [1, 3], [2, 3], [3, 4], [0, 4], [4, 5], [3, 5], [5, 6], [3, 6], [2, 6]];
        nl.forEach(([a, b], i) => { s += V.line(net[a][0], net[a][1], net[b][0], net[b][1], { stroke: P.sky, sw: 1.8, cls: 'a-draw', delay: 1.4 + i * .06 }); });
        net.forEach(([x, y], i) => { s += V.circle(x, y, 9, { fill: P.sky, cls: 'a-pop', delay: 1.2 + i * .08 }); });
        s += V.text(100, 204, 'Route 128', { size: 15, bold: true, cls: 'a-fade', delay: .6 }) +
          V.text(100, 224, 'hierarchy', { size: 13, fill: P.muted, cls: 'a-fade', delay: .7 }) +
          V.text(300, 204, 'Silicon Valley', { size: 15, bold: true, fill: P.sky, cls: 'a-fade', delay: 2 }) +
          V.text(300, 224, 'network, job hopping', { size: 13, fill: P.muted, cls: 'a-fade', delay: 2.1 });
        return V.wrap(s);
      } },
    { duration: 7000,
      caption: '<b>One centre can stop a whole civilisation.</b> In the authors’ account, decisions at the top of unified China ended its great voyages, while fragmented Europe kept experimenting because no one could stop everyone.',
      svg: (l) => {
        let s = V.circle(100, 112, 62, { fill: P.amber, opacity: .35, cls: 'a-pop' }) + V.circle(100, 112, 10, { fill: P.ink, cls: 'a-pop', delay: .3 });
        [0, 60, 120, 180, 240, 300].forEach((a, i) => {
          const r = a * Math.PI / 180;
          s += V.line(100 + Math.cos(r) * 14, 112 + Math.sin(r) * 14, 100 + Math.cos(r) * 54, 112 + Math.sin(r) * 54, { stroke: P.ink, sw: 1.5, cls: 'a-draw', delay: .5 + i * .05 });
        });
        const eu = [[232, 66, 13, P.coral], [272, 58, 10, P.teal], [312, 70, 15, P.plum], [356, 62, 11, P.sky], [246, 106, 12, P.ok], [292, 104, 14, P.amber], [340, 110, 12, P.coral],
          [228, 148, 10, P.plum], [266, 146, 13, P.sky], [306, 150, 10, P.teal], [350, 152, 14, P.ok]];
        eu.forEach(([x, y, r, c], i) => { s += V.circle(x, y, r, { fill: c, cls: 'a-pop', delay: 1.4 + i * .08 }); });
        s += V.text(100, 204, 'China', { size: 15, bold: true, cls: 'a-fade', delay: .8 }) +
          V.text(100, 224, 'one centre', { size: 13, fill: P.muted, cls: 'a-fade', delay: .9 }) +
          V.text(292, 204, 'Europe', { size: 15, bold: true, cls: 'a-fade', delay: 2.4 }) +
          V.text(292, 224, 'many rivals', { size: 13, fill: P.muted, cls: 'a-fade', delay: 2.5 });
        return V.wrap(s);
      } },
    { duration: 7000,
      caption: '<b>Friction is the price of pluralism and its energy.</b> Where frames rub against each other there is conflict; public debate and deliberative polls turn it into better decisions.',
      svg: (l) => {
        let s = V.frame(52, 54, 168, 132, { color: P.coral, cls: 'a-slide' }) +
          V.frame(180, 54, 168, 132, { color: P.teal, cls: 'a-slide', delay: .4 });
        [[-1, -1], [1, -1], [-1, 1], [1, 1], [0, -1.4], [0, 1.4]].forEach(([dx, dy], i) => {
          s += V.line(200 + dx * 8, 120 + dy * 8, 200 + dx * 26, 120 + dy * 26, { stroke: P.amber, sw: 3.5, cls: 'a-pop', delay: 1.1 + i * .1 });
        });
        s += V.circle(200, 120, 7, { fill: P.amber, cls: 'a-pulse', delay: 1 }) +
          V.text(200, 230, 'Friction: cost and energy', { size: 16, bold: true, cls: 'a-fade', delay: 2 });
        return V.wrap(s);
      } },
    { duration: 7000,
      caption: '<b>Pluralism needs fearlessness, not just rights.</b> Fearless Girl facing Wall Street’s charging bull puts Judith Shklar’s point in one image: standing next to power without fear.',
      svg: (l) => V.wrap(
        V.group(
          `<ellipse cx="272" cy="132" rx="78" ry="40" fill="${P.ink}"/>` +
          `<circle cx="186" cy="148" r="26" fill="${P.ink}"/>` +
          V.path('M176,126 Q164,104 146,108', { stroke: P.ink, sw: 6 }) +
          V.path('M196,124 Q200,102 186,92', { stroke: P.ink, sw: 6 }) +
          V.path('M350,120 Q372,110 368,140', { stroke: P.ink, sw: 4 }) +
          `<rect x="216" y="160" width="14" height="38" rx="4" fill="${P.ink}"/><rect x="246" y="164" width="14" height="34" rx="4" fill="${P.ink}"/>` +
          `<rect x="294" y="164" width="14" height="34" rx="4" fill="${P.ink}"/><rect x="324" y="160" width="14" height="38" rx="4" fill="${P.ink}"/>`,
          { cls: 'a-fade' }) +
        V.person(92, 168, { color: P.sky, scale: 1.3, cls: 'a-rise', delay: 1 }) +
        V.line(40, 198, 380, 198, { stroke: P.line, sw: 2 }) +
        V.text(200, 236, 'Coexistence without hierarchy', { size: 16, bold: true, fill: P.sky, cls: 'a-fade', delay: 1.8 })) },
  ];

  /* ---------- section visuals ---------- */
  const insurance = (l) => V.wrap(
    V.line(40, 210, 370, 210, { stroke: P.line, sw: 2 }) +
    V.line(232, 34, 232, 210, { stroke: P.bad, dash: '5 5', sw: 1.5, cls: 'a-fade', delay: .2 }) +
    V.text(232, 28, 'disruption', { size: 13, bold: true, fill: P.bad, cls: 'a-fade', delay: .2 }) +
    V.path('M40,76 L232,76 L262,190 L370,196', { stroke: P.muted, sw: 3, cls: 'a-draw', delay: .5 }) +
    V.path('M40,118 L232,118 L256,146 L300,124 L370,112', { stroke: P.sky, sw: 3, cls: 'a-draw', delay: 1.2 }) +
    V.text(44, 64, 'one frame: efficient', { size: 13, bold: true, anchor: 'start', fill: P.muted, cls: 'a-fade', delay: .6 }) +
    V.text(44, 106, 'many frames: friction', { size: 13, bold: true, anchor: 'start', fill: P.sky, cls: 'a-fade', delay: 1.3 }) +
    V.text(366, 100, 'adapts', { size: 12, anchor: 'end', fill: P.sky, cls: 'a-fade', delay: 2 }) +
    V.text(366, 184, 'collapses', { size: 12, anchor: 'end', fill: P.muted, cls: 'a-fade', delay: 2 }) +
    V.text(205, 236, 'performance over time (schematic)', { size: 12, fill: P.muted, cls: 'a-fade', delay: 2.2 }));

  const spectrum = (l) => V.wrap(
    V.text(150, 38, 'allowed, even wanted', { size: 13, bold: true, fill: P.ok, cls: 'a-fade' }) +
    V.text(332, 38, 'limit', { size: 13, bold: true, fill: P.bad, cls: 'a-fade', delay: 1.2 }) +
    V.rect(26, 60, 110, 52, { fill: P.paper, stroke: P.ok, cls: 'a-rise', delay: .2 }) +
    V.rect(144, 60, 142, 52, { fill: P.paper, stroke: P.amber, cls: 'a-rise', delay: .5 }) +
    V.rect(294, 60, 82, 52, { fill: P.paper, stroke: P.bad, sw: 2.5, cls: 'a-rise', delay: .8 }) +
    V.text(81, 82, 'criticise', { size: 13, bold: true, cls: 'a-fade', delay: .3 }) +
    V.text(81, 100, '“fits worse”', { size: 12, fill: P.muted, cls: 'a-fade', delay: .3 }) +
    V.text(215, 82, 'argue against', { size: 13, bold: true, cls: 'a-fade', delay: .6 }) +
    V.text(215, 100, '“is wrong because…”', { size: 12, fill: P.muted, cls: 'a-fade', delay: .6 }) +
    V.text(335, 82, 'deny', { size: 13, bold: true, fill: P.bad, cls: 'a-fade', delay: .9 }) +
    V.text(335, 100, 'existence', { size: 13, bold: true, fill: P.bad, cls: 'a-fade', delay: .9 }) +
    V.arrow(26, 130, 372, 130, { color: 'ink', cls: 'a-draw', delay: 1 }) +
    V.text(81, 158, 'method A', { size: 12, cls: 'a-fade', delay: 1.4 }) +
    V.text(81, 174, 'vs. method B', { size: 12, cls: 'a-fade', delay: 1.4 }) +
    V.text(215, 158, 'flat Earth,', { size: 12, cls: 'a-fade', delay: 1.6 }) +
    V.text(215, 174, 'climate denial', { size: 12, cls: 'a-fade', delay: 1.6 }) +
    V.text(335, 158, 'censorship,', { size: 12, cls: 'a-fade', delay: 1.8 }) +
    V.text(335, 174, 'exclusion', { size: 12, cls: 'a-fade', delay: 1.8 }) +
    V.pill(200, 222, 'When in doubt: tolerance', { fill: P.sky, w: 210, h: 30, size: 14, cls: 'a-pop', delay: 2.2 }));

  const caseBars = (l) => V.wrap(
    V.text(200, 34, 'What respondents linked same-sex marriage to', { size: 13, bold: true, cls: 'a-fade' }) +
    V.text(40, 80, 'liberty, rights', { size: 13, anchor: 'start', fill: P.muted, cls: 'a-fade', delay: .3 }) +
    V.rect(40, 90, 14 * 8, 30, { fill: P.muted, stroke: 'none', r: 4, cls: 'a-slide', delay: .5 }) +
    V.text(40 + 14 * 8 + 10, 111, '14 %', { size: 14, bold: true, anchor: 'start', fill: P.muted, cls: 'a-fade', delay: .9 }) +
    V.text(40, 158, 'love, affection', { size: 13, anchor: 'start', fill: P.sky, cls: 'a-fade', delay: 1.1 }) +
    V.rect(40, 168, 32 * 8, 30, { fill: P.sky, stroke: 'none', r: 4, cls: 'a-slide', delay: 1.3 }) +
    V.text(40 + 32 * 8 + 10, 189, '32 %', { size: 14, bold: true, anchor: 'start', fill: P.sky, cls: 'a-fade', delay: 1.7 }) +
    V.text(200, 236, 'The love frame carried further', { size: 13, bold: true, cls: 'a-fade', delay: 2 }));

  window.FRAMERS.register({
    id: 'u08', number: 8, kind: 'chapter', color: '#3E8ED0', minutes: 20,
    title: 'Pluralism',
    tagline: 'Societies need many coexisting frames as insurance for change. The only frame not to tolerate is the one that denies the others.',
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="4" y="8" width="16" height="16" rx="3" fill="none" stroke="${c}" stroke-width="3"/><rect x="24" y="8" width="16" height="16" rx="3" fill="${c}" opacity=".45"/><rect x="14" y="22" width="16" height="16" rx="3" fill="none" stroke="${c}" stroke-width="3"/></svg>`,
    hook: '<p>Berlin, 1933. Hannah Arendt is held by the Gestapo for documenting how people traded their many views of the world for one propaganda line. Released after eight days, she flees. What happens to a society, a market or a company when its range of frames shrinks to one?</p>',
    objectives: [
      'Explain why the authors defend frame pluralism pragmatically, as insurance for change.',
      'Apply the rule “the only bad frame denies other frames” and say where it runs out.',
      'Spot how success and centralisation breed monocultures, and name ways to keep dissent alive.',
    ],
    film: { title: 'From monoculture to coexistence in six scenes', scenes },
    sections: [
      { id: 's1', heading: 'Pluralism as insurance, not virtue',
        body: '<p>The 1920s were a cornucopia of frames, from dada to the flappers. Within a few years much of Europe narrowed into one sanctioned worldview. The authors see <strong>cognitive oppression</strong>: limits on what people may think and imagine, recognisable mainly by what is missing, the frames that never form.</p><p>Their case for pluralism is explicitly <strong>pragmatic, not moral</strong>. A society that keeps many frames available has more options when circumstances change. Pluralism is humanity’s “insurance policy”: in stable times it looks inefficient, in a disruption it decides survival. Its aim is not to converge on the single best frame but to let clashing frames be applied side by side.</p>',
        visual: { svg: insurance, position: 'bottom',
          caption: 'The insurance logic, schematically: one frame is more efficient while conditions hold and fails when they shift. Many frames cost friction every day and pay out in the disruption.' },
        },
      { id: 's2', heading: 'The only bad frame',
        body: '<p>Throughout the book the authors say there are no bad frames, only frames that fit a situation poorly. Here comes the one exception: <strong>the only bad frame is one that denies other frames.</strong> It is their answer to Karl Popper’s paradox of tolerance: unlimited tolerance of the intolerant ends in no tolerance at all.</p><p>The line runs between <em>criticising</em> a frame and <em>denying its existence</em>. Flat Earth and climate denial are wrong frames; argue against them, do not ban them. What crosses the line is the attempt to eliminate alternatives through censorship, exclusion or violence. Two rules of thumb follow: <strong>default to tolerance</strong>, because we judge other frames with an extra-critical eye; and do not <strong>outsource</strong> the judgement to authorities, it stays a shared responsibility.</p>',
        visual: { svg: spectrum, position: 'bottom',
          caption: 'The rule as a spectrum. Criticising and refuting frames is healthy give-and-take; only the attempt to eliminate a frame crosses the line.' } },
      { id: 's3', heading: 'How monocultures form',
        body: '<p>Single frames of truth rarely arrive by decree alone. They grow from <strong>success</strong>: the more a frame has worked, the less we can imagine an alternative.</p><p>They also grow from <strong>centralisation</strong>. AnnaLee Saxenian traced why Silicon Valley overtook Boston’s Route 128: closed, hierarchical firms with little job mobility lost to an open network of small rivals whose engineers met, talked and switched employers. The authors tell the same story for unified China and fragmented Europe.</p>',
        },
      { id: 's4', heading: 'Pluralism does not maintain itself',
        body: '<p>Pluralism is not the same as democracy. Victorian England was democratic yet cognitively homogeneous. Majorities decide who governs; pluralism concerns how many ways of seeing remain available. Nor is it the natural state: tribalism pulls groups towards uniformity. Judith Shklar added that rights are not enough; people must be able to decide “without fear or favor”.</p><p>The chapter names four levers. <strong>Variation</strong>: say “I see this differently”. <strong>Education</strong>: name differences instead of being “colour-blind”. <strong>Migration</strong>: bring outside frames in. <strong>Friction</strong>: Habermas’s public sphere and deliberative polls, where views are allowed to clash.</p>',
        keyIdea: 'Majorities decide; pluralism determines what there is to decide between.' },
    ],
    exercise: {
      type: 'scenario',
      title: 'A frame under pressure: suppress, ignore, argue or institutionalise?',
      instructions: '<p>Three situations from organisations. Choose the response that best fits the chapter’s rule, its default to tolerance and Popper’s paradox.</p>',
      steps: [
        { situation: 'The leadership team has decided on a platform strategy. A senior architect says in every steering meeting: “I see this differently, the integration risk is underestimated.” Others are irritated: “The decision has been made.”',
          options: [
            { text: 'Take her off the steering group so the team can move forward.', good: false,
              feedback: 'The Route 128 move: you remove the very frame you would need if the risk materialises.' },
            { text: 'Give her frame a defined place: a risk review at each milestone, with criteria agreed in advance for revisiting.', good: true,
              feedback: 'Friction as a feature. The decision stands, the dissent stays alive and testable, and agreed criteria stop a weekly re-run.' },
            { text: 'Let her speak, thank her, and move on to the next item.', good: false,
              feedback: 'Formally tolerant, in effect a denial. Heard but without consequence: a quiet monoculture.' },
          ] },
        { situation: 'On the internal network, employees claim the new AI assistant secretly rates individual performance. It is factually wrong, but the posts get many likes.',
          options: [
            { text: 'Delete the posts and close the thread to stop misinformation.', good: false,
              feedback: 'The flat-Earth case: a wrong frame is a reason to argue, not to erase it.' },
            { text: 'Answer in the thread with what the system logs, offer an open Q&amp;A, and invite the works council to check.', good: true,
              feedback: 'Counter the frame with evidence where it circulates, without leaving the judgement to one authority. It also signals low trust.' },
            { text: 'Ignore it; rumours die down on their own.', good: false,
              feedback: 'Tolerance is not indifference. An uncontested wrong frame can become the dominant one; complacency erodes pluralism.' },
          ] },
        { situation: 'Hard case: some managers campaign to abolish the anonymous feedback channel and “stop giving critics a platform”. They say pluralism obliges you to tolerate their frame.',
          options: [
            { text: 'Accept it: pluralism means every frame gets its place, including this one.', good: false,
              feedback: 'Popper’s paradox in miniature. Tolerating a frame whose goal is removing other frames ends in fewer frames.' },
            { text: 'Hand the question quietly to Legal and Compliance to decide.', good: false,
              feedback: 'Outsourcing the judgement is what the authors warn against.' },
            { text: 'Debate their criticism of the channel openly but keep it; name the line (removing voices) and decide in a broad, transparent forum.', good: true,
              feedback: 'You separate the legitimate frame (“the channel has flaws”) from the bad one (“silence critics”). But the rule did not say who draws the line; you supplied the procedure.' },
          ] },
      ],
    },
    caseStudy: {
      title: 'Freedom to Marry: from “rights” to “love”',
      body: '<p>Support for same-sex marriage in the US rose from about a quarter in 1995 to almost 70 percent in 2020. For years the movement argued in terms of legal rights and made little headway.</p><p>In the early 2000s the campaign studied polls and focus groups to meet hesitant people inside their own frame, and settled on why most people marry: love, commitment and family. In 2011 support overtook opposition; only 14 percent described the issue in terms of liberty, 32 percent in terms of love. In 2015 the Supreme Court recognised the right of same-sex couples to marry.</p>',
      lesson: 'The authors read this as pluralism at work: “I see this differently” without delegitimising the other side. It is equally strategic reframing, a technique open to any movement, pluralist or not.',
      visual: { svg: caseBars,
        caption: 'How respondents described the issue around the crossover, as reported in the chapter. Values from the book, bars to scale.' },
    },
    reflection: {
      intro: 'Single frames of truth are hardest to see from the inside, because they feel like common sense.',
      prompts: [
        'Which frame in your organisation or client system has been so successful that no one questions it any more? What would make it fail, and who would notice first?',
        'When did you last say “I see this differently” to someone above you? What did it cost, and what made it possible or impossible?',
      ],
      placeholder: 'The frame nobody questions here is… It would fail if…',
    },
    quiz: [
      { case: '<p>For the first half of the twentieth century the export banana trade ran largely on one variety, the Gros Michel, planted as genetically identical clones. When Panama disease, a soil fungus with no cure, spread through the plantations, growers had no fallback. By the 1960s the industry had switched to the Cavendish, again planted as clones. A newer strain of the fungus, TR4, now threatens it.</p>',
        q: 'What does this case illustrate about the chapter’s defence of pluralism?',
        options: [
          { text: 'Growers simply chose the wrong variety; picking a hardier single one would have solved it.', why: 'This hunts for the one best frame. The Cavendish was the hardier pick, and uniformity exposes it again.' },
          { text: 'Variety is valuable in itself and should be kept whatever it costs the business.', why: 'That is the moral argument the authors avoid. They defend pluralism by what it pays out when conditions change.' },
          { text: 'Uniformity pays off while conditions hold and leaves no fallback once they change.', why: 'Right. The insurance logic: one frame is efficient in stable times, alternatives decide survival in a disruption.' },
          { text: 'Growers should rotate varieties regularly, so that routine never sets in.', why: 'Change for its own sake misses the point: pluralism keeps alternatives alive side by side, not in rotation.' },
        ],
        answer: 2,
        explain: 'Pluralism is a premium paid in efficiency during stable times; its value only shows when the environment shifts.' },
      { case: '<p>On 30 December 2019 Li Wenliang, an eye doctor in Wuhan, warned colleagues in a private chat group about patients with a SARS-like illness. On 3 January 2020 police made him sign a statement admonishing him for spreading untrue claims. He died of Covid-19 in February. In March the authorities withdrew the admonition and apologised to his family.</p>',
        q: 'Applying the chapter’s rule on bad frames, what was the core failure here?',
        options: [
          { text: 'The warning was silenced instead of being tested against evidence and openly argued with.', why: 'Right. Even a partly inaccurate frame deserves argument and evidence; suppression removed an alternative reading when it was needed.' },
          { text: 'Nothing in principle: the virus was not SARS, so correcting a false claim was fair.', why: 'Being partly wrong does not license suppression. Like flat Earth, a wrong frame is argued against, not erased.' },
          { text: 'It was a medical failure: a new virus is hard to recognise in its earliest days.', why: 'Detection was hard, but a doctor had seen the pattern. The failure lay in how the system treated his frame.' },
          { text: 'It happened only because China is not a democracy; elected officials would not do this.', why: 'This confuses democracy with pluralism. Democracies narrow frames too, often through social pressure rather than police.' },
        ],
        answer: 0,
        explain: 'The line is not between right and wrong frames but between arguing with a frame and eliminating it.' },
      { case: '<p>In 1959 the tech corridor along Boston’s Route 128 had almost three times as many tech jobs as Silicon Valley. By 1990 the Valley’s technology employment was far larger. AnnaLee Saxenian compared the two regions: big, formal East Coast firms that kept information in-house and rewarded loyalty, against a dense web of small Valley firms.</p>',
        q: 'Which explanation matches the chapter’s reading of this reversal?',
        options: [
          { text: 'The Valley attracted more money and talent, so frames played no real part.', why: 'Resources matter, but Saxenian’s point is structure: how information and people flowed between firms.' },
          { text: 'Boston’s firms were too small and scattered to keep up with Valley giants.', why: 'This reverses the case. Route 128 had the large, hierarchical firms; the Valley was the network of small competitors.' },
          { text: 'Valley firms converged faster on one winning model of computing and scaled it.', why: 'Convergence on one model is what the chapter warns against; the Valley’s edge was many approaches in contact.' },
          { text: 'Engineers moved between many small firms, so rival ideas and approaches kept colliding.', why: 'Right. Mobility and open exchange kept many frames circulating, while hierarchy rewarded the one approved way.' },
        ],
        answer: 3,
        explain: 'Centralisation breeds a single frame; open networks with mobility keep many frames alive and in contact.' },
      { case: '<p>After the 1967 victory, Israeli military intelligence held to “the concept”: Egypt would not attack until it could neutralise Israel’s air force. In early October 1973 the build-up on two fronts was read as an exercise, and war was rated a low probability almost until it began on 6 October. Afterwards, military intelligence set up a devil’s advocate unit that reports directly to its chief.</p>',
        q: 'What does the design of the new unit say about keeping frames plural?',
        options: [
          { text: 'Analysts lacked data; better surveillance would have prevented the surprise attack.', why: 'Warning signs were there and were read through the frame. More data alone does not change the frame that interprets it.' },
          { text: 'Past success hardened one reading, so a rival one must be built in.', why: 'Right. Success turned a frame into common sense; a standing rival with direct access to the chief keeps alternatives alive on purpose.' },
          { text: 'The concept was wrong; replacing it with a better assessment is the real lesson.', why: 'Swapping one single frame for another repeats the problem. The lesson is to keep competing readings available, not crown a new winner.' },
          { text: 'Permitting dissent is enough; once allowed, rival readings will surface by themselves.', why: 'Tolerance is necessary but not sufficient. Group pull toward one view means pluralism must be organised; it is not the natural state.' },
        ],
        answer: 1,
        explain: 'Monocultures often grow from success rather than censorship, so dissent has to be institutionalised, not just permitted.' },
      { case: '<p>In 2016 Ireland gave one of its most divisive questions, the constitutional ban on abortion, to a Citizens’ Assembly: 99 randomly selected citizens and a chair. Over five weekends they heard experts and advocates from both sides and debated in small groups. Their recommendation led to a referendum in May 2018, which passed with 66.4 percent.</p>',
        q: 'Which feature brings this closest to the chapter’s “friction” strategy?',
        options: [
          { text: 'Handing the question to experts kept a heated conflict out of everyday politics.', why: 'Experts informed, citizens judged. Outsourcing the judgement to authorities is what the authors warn against.' },
          { text: 'The majority vote at the end is what made the whole process pluralist.', why: 'Majority rule decides who wins, not how many frames were heard. The chapter separates the two.' },
          { text: 'A random mix of citizens weighed clashing views together before any vote.', why: 'Right. The deliberative-poll idea: diverse people, briefing, open clash of views, earnest engagement, no forced agreement.' },
          { text: 'Its aim was a consensus that would settle the disagreement once and for all.', why: 'Pluralism does not aim at convergence; deliberation expects engagement, and the minority frame stays legitimate.' },
        ],
        answer: 2,
        explain: 'Friction becomes productive when diverse people meet opposing frames under fair conditions, not when one side or one authority settles it alone.' },
    ],
    flashcards: [
      { front: 'Frame pluralism', back: 'Many competing frames coexisting in a society. Defended pragmatically as insurance for change, not as a moral end.' },
      { front: 'The only bad frame', back: 'One that denies other frames. Wrong frames are argued against; only frames that seek to eliminate alternatives cross the line.' },
      { front: 'Paradox of tolerance (Popper)', back: 'Unlimited tolerance of the intolerant ends tolerance. The chapter’s one exception to “no bad frames” answers it.' },
      { front: 'Where monocultures come from', back: 'Success (a frame that worked looks without alternative) and centralisation (Route 128, imperial China).' },
      { front: 'Pluralism ≠ democracy', back: 'Democracy: who decides. Pluralism: how many frames are available. Victorian England was democratic and homogeneous.' },
    ],
    critique: [
      { claim: 'The only bad frame is one that denies other frames; this rule tells us which frames to resist.',
        challenge: 'The rule names a criterion but no judge and no procedure, and the authors concede there is no easy way to spot bad frames. Almost any side can describe its opponents as “denying other frames”,. Popper drew the line more operationally, at the refusal to argue and the resort to force. Who decides, by which process, with what appeal? That is a question of power the chapter leaves open.' },
      { claim: 'Unified China stagnated while fragmented Europe innovated; frame pluralism explains the difference.',
        challenge: 'This is contested in the “Great Divergence” debate. Kenneth Pomeranz argues that China’s core regions matched England well into the eighteenth century and that coal and colonies explain much of Europe’s lead. Europe’s fragmentation also meant near-permanent war. One variable explaining centuries of history, with cases chosen after the outcome was known, should make you suspicious.' },
    ],
    summary: [
      'Societies need many coexisting frames; the authors justify this pragmatically, as insurance for times of change.',
      'The only bad frame is one that denies other frames; wrong frames are argued against, and in doubt the default is tolerance.',
      'Monocultures grow from success and centralisation, as Route 128 and the authors’ reading of imperial China illustrate.',
      'Pluralism is neither democracy nor the natural state, so it has to be maintained through variation, education, migration and friction.',
    ],
    glossary: [
      { term: 'Frame pluralism', def: 'Many different, even conflicting, frames coexisting and applied side by side, without converging on one.' },
      { term: 'Cognitive oppression', def: 'Restricting people’s freedom to frame; visible mainly through what is absent.' },
      { term: 'Paradox of tolerance', def: 'Karl Popper’s observation that unlimited tolerance of intolerance destroys tolerance itself.' },
      { term: 'Deliberative poll', def: 'A diverse group polled before and after an informed debate; consensus is not required, serious engagement is.' },
    ],
  });
})();
