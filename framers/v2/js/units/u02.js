/* u02: Chapter 2 "Framing" (V2, English only) */
(function () {
  const P = V.palette;

  /* small local drawing helpers */
  function robot(x, y, col) {
    return V.rect(x - 10, y - 38, 20, 16, { fill: col, stroke: P.ink, r: 3 }) + V.circle(x - 4, y - 30, 2, { fill: '#fff' }) + V.circle(x + 4, y - 30, 2, { fill: '#fff' }) +
      V.rect(x - 13, y - 20, 26, 28, { fill: P.paper, stroke: P.ink, r: 4 }) + V.line(x - 6, y + 8, x - 6, y + 20, { sw: 3 }) + V.line(x + 6, y + 8, x + 6, y + 20, { sw: 3 });
  }
  function wagon(x, y) {
    return V.rect(x, y, 50, 18, { fill: P.paper, stroke: P.ink, r: 3 }) + V.circle(x + 10, y + 22, 5, { fill: P.ink }) + V.circle(x + 40, y + 22, 5, { fill: P.ink }) +
      V.rect(x + 6, y - 12, 14, 12, { fill: P.ok, stroke: P.ink, r: 2, sw: 1 }) + V.circle(x + 36, y - 7, 8, { fill: P.ink }) + V.path(`M${x + 40},${y - 14} q4,-6 9,-4`, { stroke: P.amber, sw: 2 });
  }

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 6000,
      caption: '<b>#MeToo changed no facts, it flipped an arrow.</b> Shame used to point at the woman who spoke up; inside the new frame it points at the perpetrator.',
      svg: (l) => V.wrap(
        V.text(200, 66, 'shame, before', { size: 12, fill: P.muted, cls: 'a-fade' }) +
        V.arrow(255, 80, 145, 80, { color: 'muted', dash: '6 5', cls: 'a-draw', delay: .2 }) +
        V.text(200, 118, 'shame, with #MeToo', { size: 12, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.4 }) +
        V.arrow(145, 132, 255, 132, { color: 'coral', sw: 3.5, cls: 'a-draw', delay: 1.5 }) +
        V.person(120, 200, { color: P.sky, scale: 1.1, cls: 'a-fade' }) + V.person(285, 200, { color: P.ink, scale: 1.1, cls: 'a-fade' }) +
        [30, 52, 74, 41, 63, 85].map((x, i) => V.person(x, i < 3 ? 214 : 238, { color: P.sky, scale: .5, cls: 'a-fade', delay: 2.4 + i * .15 })).join('')
      ) },
    { duration: 6500,
      caption: '<b>Same city, three maps.</b> Each map shows one thing by distorting another, so “which is best?” only makes sense once you name a purpose.',
      svg: (l) => {
        let s = V.frame(15, 50, 110, 145, { color: P.sky, label: 'Cartesian', cls: 'a-fade' });
        for (let i = 0; i < 5; i++) s += V.line(25 + i * 22, 62, 25 + i * 22, 185, { stroke: P.line, sw: 1 }) + V.line(25, 64 + i * 28, 115, 64 + i * 28, { stroke: P.line, sw: 1 });
        s += [[42, 88, 'A'], [100, 112, 'B'], [60, 168, 'C']].map(([x, y, t], i) => V.circle(x, y, 6, { fill: P.ink, cls: 'a-pop', delay: .4 + i * .1 }) + V.text(x + 11, y + 4, t, { size: 12, bold: true })).join('');
        s += V.frame(145, 50, 110, 145, { color: P.coral, label: 'Transit', cls: 'a-fade', delay: .6 });
        s += V.line(158, 105, 242, 105, { stroke: P.coral, sw: 5, cls: 'a-draw', delay: .8 }) + V.line(200, 68, 200, 182, { stroke: P.teal, sw: 5, cls: 'a-draw', delay: 1 });
        s += [[166, 105, 'A'], [234, 105, 'B'], [200, 168, 'C']].map(([x, y, t], i) => V.circle(x, y, 6, { fill: '#fff', stroke: P.ink, sw: 2.5, cls: 'a-pop', delay: 1.2 + i * .1 }) + V.text(x + (t === 'C' ? 13 : 0), y + (t === 'C' ? 4 : -11), t, { size: 12, bold: true })).join('');
        s += V.frame(275, 50, 110, 145, { color: P.plum, label: 'Projection', cls: 'a-fade', delay: 1.4 });
        [124, 138, 156, 180, 110, 92, 68].forEach(y => { s += V.line(285, y, 375, y, { stroke: P.line, sw: 1 }); });
        for (let i = 0; i < 5; i++) s += V.line(287 + i * 22, 62, 287 + i * 22, 185, { stroke: P.line, sw: 1 });
        s += `<g class="a-pop" style="--d:1.7s"><ellipse cx="315" cy="80" rx="22" ry="11" fill="${P.plum}" opacity=".75"/></g><g class="a-pop" style="--d:1.9s"><ellipse cx="345" cy="132" rx="10" ry="6" fill="${P.plum}" opacity=".75"/></g>`;
        s += V.text(70, 216, 'Where is it?', { size: 12, cls: 'a-fade', delay: 2.2 }) + V.text(200, 216, 'Where to change?', { size: 12, cls: 'a-fade', delay: 2.4 }) + V.text(330, 216, 'How large?', { size: 12, cls: 'a-fade', delay: 2.6 });
        s += V.text(200, 246, 'Best map? For what?', { size: 14, bold: true, cls: 'a-fade', delay: 3.2 });
        return V.wrap(s);
      } },
    { duration: 6500,
      caption: '<b>Ebola 2014: same data, opposite advice.</b> WHO read the numbers against earlier local outbreaks; MSF read the map of scattered villages and pushed for drastic action.',
      svg: (l) => {
        let s = V.dots(12, 170, 22, 60, 26, { seed: 5, fill: P.ink, r: 3.5, cls: 'a-pop', stagger: .04 }) + V.text(200, 66, 'Same data', { size: 12, bold: true, cls: 'a-fade', delay: .5 });
        s += V.arrow(180, 74, 115, 98, { color: 'muted', cls: 'a-draw', delay: .7 }) + V.arrow(220, 74, 285, 98, { color: 'muted', cls: 'a-draw', delay: .7 });
        s += V.frame(20, 108, 170, 100, { color: P.muted, label: 'WHO: history', cls: 'a-fade', delay: 1 });
        s += V.line(38, 165, 172, 165, { stroke: P.line, sw: 3, cls: 'a-draw', delay: 1.2 });
        s += [58, 96, 134].map((x, i) => V.circle(x, 165, 9, { fill: P.ok, cls: 'a-pop', delay: 1.4 + i * .2 }) + V.text(x, 169, '✓', { size: 12, fill: '#fff', bold: true, cls: 'a-fade', delay: 1.4 + i * .2 })).join('');
        s += V.circle(165, 165, 9, { fill: P.sky, cls: 'a-pop', delay: 2 }) + V.text(165, 169, '?', { size: 12, fill: '#fff', bold: true, cls: 'a-fade', delay: 2 });
        s += V.frame(210, 108, 170, 100, { color: P.coral, label: 'MSF: space', cls: 'a-fade', delay: 2.2 });
        s += V.path('M265,122 L282,160 L262,198 M282,160 L330,166 L362,124', { stroke: P.line, sw: 2, dash: '4 4', cls: 'a-fade', delay: 2.4 });
        s += [[236, 140], [250, 186], [300, 135], [312, 190], [352, 150], [290, 172]].map(([x, y], i) => V.circle(x, y, 5, { fill: P.coral, cls: 'a-pop', delay: 2.6 + i * .12 })).join('');
        s += V.text(105, 236, 'contain locally', { size: 13, bold: true, fill: P.muted, cls: 'a-fade', delay: 3.4 }) + V.text(295, 236, 'escalate now', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 3.7 });
        return V.wrap(s);
      } },
    { duration: 7000,
      caption: '<b>The Wrights modelled the whole causal chain.</b> Rivals optimised the engine; the brothers saw that power only matters if the propeller, a rotating wing, turns it into lift.',
      svg: (l) => {
        const box = (x, y, str, o = {}) => V.group(V.rect(x, y, 95, 40, { fill: o.fill || P.paper, stroke: o.stroke || P.ink, sw: o.sw || 1.5 }) + V.text(x + 47.5, y + 25, str, { size: 13, bold: true }), { cls: 'a-fade', delay: o.d || 0 });
        return V.wrap(
          V.pill(200, 45, '= a rotating wing', { fill: P.coral, cls: 'a-pop', delay: 1.2, w: 150 }) +
          box(15, 75, 'Engine', { stroke: P.muted }) + box(152, 75, 'Propeller', { stroke: P.coral, sw: 3, d: .4 }) + box(290, 75, 'Airspeed', { d: .8 }) +
          box(290, 165, 'Lift', { d: 1.8 }) + box(152, 165, 'Flight', { fill: P.amber, d: 2.4 }) +
          V.arrow(112, 95, 149, 95, { color: 'coral', cls: 'a-draw', delay: .3 }) + V.arrow(249, 95, 287, 95, { color: 'coral', cls: 'a-draw', delay: .9 }) +
          V.arrow(337, 117, 337, 162, { color: 'coral', cls: 'a-draw', delay: 1.6 }) + V.arrow(288, 185, 250, 185, { color: 'coral', cls: 'a-draw', delay: 2.2 }) +
          V.text(62, 180, 'Rivals:\nengine only', { size: 12, fill: P.muted, cls: 'a-fade', delay: 3 }) +
          V.text(200, 240, 'Causality: the longer chain', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 3.4 })
        );
      } },
    { duration: 8000,
      caption: '<b>Dennett’s robot fails three times, once per C.</b> It misses that the bomb rides on the wagon, drowns in irrelevant implications, then freezes while listing what to ignore.',
      svg: (l) => {
        const labels = ['Missed\ncausality', 'Counterfactuals\nwithout focus', 'Constraints\nparalyse'];
        const cols = [P.coral, P.teal, P.plum];
        let s = '';
        [0, 1, 2].forEach(i => {
          const x0 = 10 + i * 128, d = i * 2.2;
          s += V.group(V.rect(x0, 40, 124, 160, { fill: P.paper, stroke: cols[i], sw: 2.5 }) + robot(x0 + 28, 150, cols[i]) + wagon(x0 + 60, 140), { cls: 'a-fade', delay: d });
          if (i === 1) s += V.group(V.dots(9, x0 + 6, 60, 50, 40, { seed: 4, r: 2.5, fill: P.teal }), { cls: 'a-fade', delay: d + .3 });
          if (i === 2) s += [0, 1, 2, 3].map(k => V.line(x0 + 50, 62 + k * 9, x0 + 50 + 50 - k * 8, 62 + k * 9, { stroke: P.plum, sw: 2.5, cls: 'a-draw', delay: d + .3 + k * .2 })).join('');
          s += V.group(V.circle(x0 + 85, 125, 30, { fill: P.amber, opacity: .55 }) + V.text(x0 + 85, 131, 'BOOM', { size: 16, bold: true, fill: P.bad }), { cls: 'a-pop', delay: d + 1.4 });
          s += V.text(x0 + 62, 222, labels[i], { size: 12, bold: true, fill: cols[i], cls: 'a-fade', delay: d + 1.6 });
        });
        return V.wrap(s);
      } },
    { duration: 7000,
      caption: '<b>Nine dots, four lines: the box is the magic.</b> The solution leaves the imagined square but never the flat sheet. Without that constraint, folding the paper would “solve” it and teach nothing.',
      svg: (l) => {
        let s = V.frame(12, 14, 376, 232, { color: P.plum, label: 'flat sheet' });
        s += V.rect(136, 56, 128, 128, { fill: 'none', stroke: P.muted, sw: 1.5, dash: '5 5', r: 4 });
        for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) s += V.circle(150 + c * 50, 70 + r * 50, 6, { fill: P.ink });
        const pts = [[150, 70], [300, 70], [150, 220], [150, 70], [250, 170]];
        for (let k = 0; k < 4; k++) s += V.line(pts[k][0], pts[k][1], pts[k + 1][0], pts[k + 1][1], { stroke: P.coral, sw: 3.5, cls: 'a-draw', delay: .6 + k * 1 });
        s += V.text(70, 92, 'imagined box:\nleft ✓', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 4.4 }) +
          V.text(70, 180, 'flat sheet:\nnever left ✗', { size: 13, bold: true, fill: P.plum, cls: 'a-fade', delay: 5 });
        return V.wrap(s);
      } },
  ];

  /* ---------- section and case visuals ---------- */
  const visReading = (l) => V.wrap(
    V.rect(30, 30, 340, 46, { fill: P.paper, stroke: P.line }) + V.text(200, 61, 'INPRINCIPIOERATVERBVM', { size: 18, serif: true, bold: true }) +
    V.text(200, 96, 'aloud, in a group, guided', { size: 12, fill: P.muted }) +
    V.arrow(200, 106, 200, 140, { color: 'ink', cls: 'a-draw', delay: .4 }) +
    V.pill(300, 123, 'word spacing', { fill: P.plum, cls: 'a-pop', delay: .6 }) +
    V.rect(30, 148, 340, 46, { fill: P.paper, stroke: P.sky, sw: 2.5, cls: 'a-fade', delay: .9 }) + V.text(200, 179, 'IN  PRINCIPIO  ERAT  VERBVM', { size: 18, serif: true, bold: true, cls: 'a-fade', delay: .9 }) +
    V.text(200, 214, 'silent, alone, at your own pace', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1.1 }) +
    V.text(200, 244, 'Luther + printing: a new purpose', { size: 13, bold: true, fill: P.sky, cls: 'a-fade', delay: 1.6 })
  );
  const visCompare = (l) => {
    const rows = [['Causality', 'whole drive chain', 'bomb rides along'], ['Counterfactuals', 'many propeller shapes', 'all implications,\nno focus'], ['Constraints', 'physics filters', 'ignore-list\nparalyses']];
    const cols = [P.coral, P.teal, P.plum];
    let s = V.text(200, 36, 'Wright', { size: 13, bold: true }) + V.text(332, 36, 'Dennett’s robot', { size: 13, bold: true });
    rows.forEach(([c, w, r], i) => {
      const y = 80 + i * 62, d = .2 + i * .4;
      s += V.line(12, y + 30, 388, y + 30, { stroke: P.line, sw: 1 });
      s += V.pill(64, y, c, { fill: cols[i], w: 112, cls: 'a-pop', delay: d });
      s += V.text(200, y + 5, w, { size: 12, fill: P.ok, bold: true, cls: 'a-fade', delay: d + .15 });
      s += V.text(332, y + (r.includes('\n') ? -2 : 5), r, { size: 12, fill: P.bad, bold: true, cls: 'a-fade', delay: d + .3 });
    });
    return V.wrap(s);
  };
  const visCase = (l) => {
    const cell = (x, y, who, why, act, c, d) => V.group(V.rect(x, y, 145, 80, { fill: P.paper, stroke: c, sw: 2 }) +
      V.text(x + 72.5, y + 22, who, { size: 13, bold: true }) + V.text(x + 72.5, y + 44, why, { size: 12 }) + V.text(x + 72.5, y + 66, act, { size: 12, bold: true, fill: c === P.line ? P.muted : c }), { cls: 'a-fade', delay: d });
    return V.wrap(
      V.text(172, 38, 'hold back', { size: 13, bold: true, fill: P.muted }) + V.text(322, 38, 'early and hard', { size: 13, bold: true, fill: P.coral }) +
      V.text(50, 95, 'Ebola\n2014', { size: 13, bold: true }) + V.text(50, 185, 'Covid\n2020', { size: 13, bold: true }) +
      cell(100, 50, 'WHO', 'like past outbreaks', '→ contain locally', P.line, .2) +
      cell(250, 50, 'MSF', 'cases widely scattered', '→ act drastically', P.coral, .5) +
      cell(100, 140, 'Britain', 'like the flu', '→ mitigate', P.line, .8) +
      cell(250, 140, 'New Zealand', 'like SARS', '→ eliminate', P.coral, 1.1) +
      V.text(200, 245, 'Same data within each row', { size: 12, fill: P.muted, cls: 'a-fade', delay: 1.5 })
    );
  };

  window.FRAMERS.register({
    id: 'u02', number: 2, kind: 'chapter', color: '#3E8ED0', minutes: 20,
    title: 'Framing',
    tagline: 'We always think inside a frame. The real choice is which one, and choosing is harder than applying.',
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="12" y="12" width="20" height="20" rx="3" fill="none" stroke="${c}" stroke-width="2" stroke-dasharray="3 3"/><g fill="${c}"><circle cx="15" cy="15" r="2.4"/><circle cx="22" cy="15" r="2.4"/><circle cx="29" cy="15" r="2.4"/><circle cx="15" cy="22" r="2.4"/><circle cx="22" cy="22" r="2.4"/><circle cx="29" cy="22" r="2.4"/><circle cx="15" cy="29" r="2.4"/><circle cx="22" cy="29" r="2.4"/><circle cx="29" cy="29" r="2.4"/></g><path d="M15,15 L38,15 L15,38" fill="none" stroke="${c}" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    hook: '<p>October 2017: an actor asks anyone who has been harassed to reply “me too”. Within a day the hashtag is in millions of posts. No new facts had appeared overnight; the frame had changed. So ask first: through which frame are we reading the data?</p>',
    objectives: [
      'Explain, with the Ebola and Covid cases, why choosing a frame matters more than applying it.',
      'Spot causality, counterfactuals and constraints in the Wrights’ work and their absence in Dennett’s robot.',
      'Argue why “think outside the box” misreads the nine-dot puzzle.',
    ],
    film: { title: 'Framing in six scenes', scenes },
    sections: [
      { id: 's1', heading: 'Frames focus, and frames liberate',
        body: '<p>#MeToo added no information; it reversed an inference. Inside the new frame the same testimony counted as courage, not shame, and it opened actions that had been out of reach: naming, organising, demanding consequences. That is the chapter’s first claim: a frame does not just describe a situation differently, it changes which options exist for you.</p><p>Maps show the mechanism. The London Tube map distorts distance on purpose so you can see where lines meet; take it above ground and you get lost. “Which map is best?” has no answer without a purpose. Frames <strong>focus</strong> because they leave things out, and they <strong>liberate</strong> because we can choose what to leave out.</p>',
        keyIdea: 'A frame is good or bad only relative to a purpose.' },
      { id: 's2', heading: 'Choosing is the hard part',
        body: '<p>Applying a frame is a fairly structured process; choosing one is not. A broad <strong>repertoire</strong> of frames helps. The main obstacle is the pull of the familiar frame: holding a hammer, you see nails. The authors insist this is often rational, because a proven frame saves effort. The danger is forgetting you chose it. Venture capitalist Eugene Kleiner: “It’s difficult to see the picture when you’re inside the frame.” Three signals should make you look up: circumstances have changed, goals have shifted, or the situation only <em>looks</em> familiar. Switching is costly and does not improve with repetition.</p><p>Shifts can be slow. Medieval manuscripts ran words together, so reading was done aloud, in groups. Word spacing made silent reading workable; Luther’s vernacular Bible and print gave it a purpose. A new frame needs both a workable context and a reason.</p>',
        visual: { position: 'bottom', svg: visReading,
          caption: 'A change in the medium made a new frame of reading possible; a new purpose made it dominant.' } },
      { id: 's3', heading: 'Applying a frame well: the Wrights, the robot and the box',
        body: '<p>The Wright brothers won the race to powered flight in 1903 by applying aerodynamics with discipline. <strong>Causality</strong>: rivals optimised engines, the Wrights modelled the chain from engine via propeller to lift, and treated the propeller as a rotating wing. <strong>Counterfactuals</strong>: they imagined many propeller shapes. <strong>Constraints</strong>: physics narrowed these to a few worth testing.</p><p>Dennett’s robot is the negative image. Sent to rescue its battery from a room with a bomb, it pulls out the wagon the battery sits on, bomb included. Version two deduces every implication and runs out of time; version three lists what to ignore and freezes. One missing C each: this is the “frame problem” of early AI.</p><p>The nine-dot puzzle, origin of “think outside the box”, proves the opposite: its solution leaves the imagined square but stays on the flat sheet. We never stop framing. “The box is very much the magic.”</p>',
        visual: { position: 'bottom', svg: visCompare,
          caption: 'The same three elements, present in the Wrights’ work and missing one at a time in the robot.' } },
    ],
    exercise: {
      type: 'sort',
      title: 'History or space? Read the signal through two frames',
      instructions: 'WHO asked “how does this compare with earlier outbreaks?” (historical); MSF asked “what does the spread tell us now?” (spatial). Assign each statement to its frame.',
      categories: [
        { id: 'hist', label: 'Historical frame: like last time' },
        { id: 'space', label: 'Spatial frame: what the spread shows now' },
      ],
      items: [
        { text: 'Case numbers are low, and every earlier outbreak in this region stayed local. No drastic measures needed.', category: 'hist',
          why: 'WHO in 2014. Strength: base rates. Blind spot: it assumes this outbreak belongs to the same class.' },
        { text: 'Cases appear in villages far apart, along three borders. The virus has travelled further than the counts show.', category: 'space',
          why: 'MSF in 2014: the pattern, not the total, is the signal.' },
        { text: 'The last two waves of resignations faded after the bonus round. This one will too.', category: 'hist',
          why: 'Precedent. Is the cause the same, or only the symptom?' },
        { text: 'Resignations come at the same time from unconnected teams at three sites.', category: 'space',
          why: 'Simultaneity across unconnected units points to a common cause.' },
        { text: 'In every earlier rollout, resistance in the pilot units faded after go-live. We stay the course.', category: 'hist',
          why: 'Precedent. Does this rollout touch roles or status as earlier ones did not?' },
        { text: 'Five customer segments with nothing in common cancel in the same month.', category: 'space',
          why: 'The spread is the signal; an average churn rate would hide it.' },
      ],
    },
    caseStudy: {
      title: 'Two epidemics, two pairs of frames',
      body: '<p><strong>Ebola, 2014.</strong> WHO compared modest case numbers with earlier regional outbreaks, all contained locally, and advised against drastic measures. MSF, with the same data, looked at where cases were: scattered villages along three borders, so the virus was further than the counts showed. WHO prevailed at first; the rapid spread proved MSF right.</p><p><strong>Covid, 2020.</strong> New Zealand’s officials, close to colleagues in Taiwan and South Korea who had lived through SARS, read the virus as SARS-like and chose elimination: early lockdown, closed borders, tracing. Britain read it as flu-like and chose mitigation, dropping tracing early. By June New Zealand declared itself Covid-free; Britain had recorded around 50,000 deaths.</p>',
      lesson: 'Before arguing about a recommendation, reconstruct the frame that produced it: which precedent, which analogy, which reading of the pattern.',
      visual: { svg: visCase,
        caption: 'Within each row the data were essentially the same; the frames decided which options anyone considered.' },
    },
    reflection: {
      intro: 'Use a real case from your work; the aim is to make frames visible, not to pick the right one.',
      prompts: [
        'Think of a disagreement in which both sides cite the same facts. Write each side’s frame in one sentence, including the precedent or analogy behind it.',
        'Which frame do you use so routinely that you no longer notice choosing it? Which of the three signals (changed circumstances, shifted goals, deceptive familiarity) applies right now?',
      ],
      placeholder: 'Side A frames it as …, because last time … Side B frames it as …',
    },
    quiz: [
      { case: '<p>Spring 2014, West Africa. WHO and Médecins Sans Frontières read the same Ebola reports. WHO notes modest case numbers and that every earlier outbreak in the region stayed local. MSF notes cases in villages far apart, along three national borders, and calls for drastic action at once.</p>',
        q: 'What best explains why the two organisations reached opposite recommendations?',
        options: [
          { text: 'MSF had field teams on site and therefore better data than WHO in Geneva.', why: 'Both worked from the same reports. Better data is the usual explanation, and here it is wrong.' },
          { text: 'WHO was risk-averse and political, while MSF was free to speak openly.', why: 'Motives may have played a part, but they do not explain why each reading felt convincing to its side.' },
          { text: 'Each side treated a different feature as decisive: totals against history, or geographic spread.', why: 'Right. The historical frame treated the outbreak as one of a known class; the spatial frame read dispersion as hidden spread.' },
          { text: 'A few more weeks of case counts would have settled the question objectively.', why: 'More counts feed both frames equally, and by the time numbers were unmistakable, early action was too late.' },
        ],
        answer: 2,
        explain: 'When competent people read the same data in opposite ways, look for the frame before the error.' },
      { case: '<p>Hawaii, November 1941. Washington warns the army commander, General Walter Short, that talks with Japan have broken down. Short reads the main danger as sabotage, orders the sabotage alert and has aircraft parked close together so guards can protect them. On 7 December those rows of planes are destroyed from the air.</p>',
        q: 'Seen through this chapter, what went wrong?',
        options: [
          { text: 'The core failure was missing intelligence; sharper warnings would have changed his alert.', why: 'He was warned that hostile action was possible. More warnings would have been read through the same sabotage frame.' },
          { text: 'A familiar frame made a sensible precaution into a weakness against another threat.', why: 'Right. Inside the sabotage frame, bunching aircraft was sensible; against air attack it was fatal. The situation only looked familiar.' },
          { text: 'He should have reframed every intelligence message from scratch, so as to avoid any bias.', why: 'Constant reframing is costly and paralysing. Watch for signals of change instead of abandoning frames by default.' },
          { text: 'Fearing sabotage was a foolish choice that a competent commander would never have made.', why: 'That is hindsight. Sabotage was a plausible fear in 1941; familiar frames are often rational, the risk is not checking their fit.' },
        ],
        answer: 1,
        explain: 'The hammer problem is not stupidity: a reasonable frame can make you act well against the wrong threat.' },
      { case: '<p>Tempe, Arizona, March 2018. A self-driving Uber test car kills Elaine Herzberg as she pushes a bicycle across a road away from a crosswalk. The NTSB finds that sensors detected her about six seconds before impact, that the software kept relabelling her (vehicle, bicycle, other) and that the design did not consider jaywalking pedestrians.</p>',
        q: 'Which reading of the failure fits the chapter best?',
        options: [
          { text: 'The sensors were too weak, and better hardware would have prevented it.', why: 'The system detected her seconds ahead. The bottleneck was interpretation, not hardware.' },
          { text: 'Like Dennett’s second robot, it weighed too many possibilities.', why: 'Tempting, but the failure ran the other way: a possibility was missing from the start.' },
          { text: 'The car framed the scene itself and chose a poor frame that night.', why: 'The frame came from the designers. The system applied the categories it was given; it chose nothing.' },
          { text: 'Its built-in frame had no slot for a pedestrian outside a crosswalk.', why: 'Right. A frame decides what can be seen at all; without the category, the data were forced into ill-fitting ones.' },
        ],
        answer: 3,
        explain: 'Data do not interpret themselves. The frame a system or team brings sets which options it can even recognise.' },
      { case: '<p>Around 1900, aviation pioneers chased stronger engines and borrowed propeller designs from ships. The Wright brothers, bicycle makers from Dayton, reasoned that air behaves very differently from water. They treated the propeller as a wing moving in a spiral, sketched many blade shapes and tested only the few their calculations favoured.</p>',
        q: 'What made their approach better than their rivals’?',
        options: [
          { text: 'They invented a new physics of flight that made the old frame obsolete.', why: 'They stayed inside aerodynamics. Their edge was applying an existing frame rigorously, not switching.' },
          { text: 'They traced the full causal chain and let physics filter the shapes they imagined.', why: 'Right. Causality (engine to lift), counterfactuals (many shapes) and constraints (aerodynamics) working together.' },
          { text: 'They built and flew every propeller shape they could imagine until one worked.', why: 'That is counterfactuals without constraints. The Wrights narrowed the field first.' },
          { text: 'They had more power, because a better engine is what lifts a plane off the ground.', why: 'The rivals’ short causal chain. Power only helps if the propeller turns it into airspeed and lift.' },
        ],
        answer: 1,
        explain: 'Good framing combines the three C: a correct causal chain plus wide imagination filtered by constraints beats raw power and brute force.' },
      { case: '<p>In 1960 Dr. Seuss published Green Eggs and Ham. His publisher, Bennett Cerf, had bet him fifty dollars that he could not write a children’s book using only fifty different words. Seuss kept charts and word lists while writing. The book became one of the best-selling children’s books in English.</p>',
        q: 'What does this case show about “thinking outside the box”?',
        options: [
          { text: 'The tight constraint narrowed the space and made a distinctive solution possible.', why: 'Right. Like the flat sheet in the nine-dot puzzle, the box was not the prison but the engine of the solution.' },
          { text: 'Seuss succeeded in spite of the word limit, through sheer talent.', why: 'This treats the limit as an obstacle, yet the book’s rhythm and repetition grew out of the limit itself.' },
          { text: 'Creativity needs freedom, so the bet was a gimmick that taught nothing.', why: 'The nine-dot lesson cuts the other way: dropping all constraints makes the problem trivial, not creative.' },
          { text: 'Constraints matter for children’s books but rarely for serious strategic decisions.', why: 'Constraints are part of every frame. Strategy without them yields options too many and too vague to act on.' },
        ],
        answer: 0,
        explain: 'You never leave the box; you choose its walls. The right constraint focuses imagination instead of killing it.' },
    ],
    flashcards: [
      { front: 'Frames focus and liberate: what does that mean?', back: 'They focus by leaving things out; they liberate because we choose what to leave out.' },
      { front: 'Applying vs. choosing a frame', back: 'Applying is structured and improves with practice. Choosing is harder and does not.' },
      { front: 'Three signals to rethink a frame', back: 'Circumstances have changed, goals have shifted, or the situation only looks like a familiar one.' },
      { front: 'Dennett’s three robots', back: 'One misses causality (bomb on the wagon), one has counterfactuals without focus, one is paralysed by constraints.' },
      { front: '“The box is very much the magic”', back: 'The nine-dot solution leaves the imagined square but needs the flat sheet.' },
    ],
    critique: [
      { claim: 'New Zealand and Britain had the same data and goals; the frame explains the very different outcomes.',
        challenge: 'The pair is cherry-picked and the June 2020 snapshot flatters it. New Zealand is a remote island of about five million that could seal its borders, and it later gave up elimination under Delta. The defensible claim is narrower: the frame decided which options were considered at all.' },
      { claim: 'Dennett’s robot shows that machines can calculate but cannot frame.',
        challenge: 'The thought experiment targeted rule-based AI that had to spell out every implication. Large language models flag the bomb on the wagon at once. What remains open is narrower: models do not choose the goal, own the frame, or reliably notice when a familiar frame stops fitting.' },
      { claim: 'Frames arise from cognition; choosing one is a matter of individual skill.',
        challenge: 'Sociology has studied framing since Goffman (1974) and asks what the chapter avoids: who has the power to make a frame stick? WHO’s frame prevailed at first through institutional weight, not better reasoning.' },
    ],
    summary: [
      'Frames focus by leaving things out and liberate because we can choose what to leave out.',
      'No frame is best in the abstract; like a map, it is good only for a purpose.',
      'Choosing a frame is harder than applying it, and the familiar frame blinds us when the situation changes.',
      'Applying a frame well combines causality, counterfactuals and constraints; we never leave the box, we only choose a better one.',
    ],
    glossary: [
      { term: 'Frame problem', def: 'McCarthy and Hayes (1969): tracking an action’s relevant consequences without checking all irrelevant ones.' },
      { term: 'Repertoire (of frames)', def: 'The frames you can draw on. A broad repertoire makes a good fit more likely.' },
      { term: 'Nine-dot puzzle', def: 'Connect nine dots with four straight lines without lifting the pen; proof that solutions need constraints.' },
      { term: 'Hammer-and-nail bias', def: 'Applying a familiar frame everywhere. Efficient, but it hides the moment a switch is needed.' },
    ],
  });
})();
