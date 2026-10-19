/* u10 (V2, English only): Toolkit. Practice unit based on the appendix "A guide to working with frames". */
(function () {
  const P = V.palette;
  const COL = [P.coral, P.plum, P.amber, P.teal, P.sky];

  /* ---------- helpers for film scenes ---------- */
  function scene(tag, color, name, drawing, question) {
    const q = question.split('\n');
    return V.wrap(
      V.pill(200, 26, tag ? tag + '  ' + name : name, { fill: color, cls: 'a-fade', w: Math.max(150, (tag ? tag.length + 2 : 0) * 8 + name.length * 8 + 24) }) +
      drawing +
      V.text(200, q.length > 1 ? 212 : 222, q[0], { size: 15, bold: true, cls: 'a-fade', delay: 1.6 }) +
      (q.length > 1 ? V.text(200, 232, q[1], { size: 15, bold: true, cls: 'a-fade', delay: 1.6 }) : '')
    );
  }

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 6000,
      caption: '<b>I. Harness mental models.</b> Framing happens anyway. Make the assumption behind it visible by asking why and how.',
      svg: () => scene('I', COL[0], 'Harness models',
        V.person(80, 135, { color: P.ink, scale: 1.5, cls: 'a-fade' }) + V.arrow(120, 110, 190, 110, { color: 'coral', cls: 'a-draw', delay: .5 }) +
        V.frame(200, 55, 170, 115, { label: 'Assumption', color: P.coral, cls: 'a-pop', delay: .7 }) +
        V.pill(285, 98, 'Why?', { fill: P.coral, cls: 'a-pop', delay: 1.1 }) + V.pill(285, 138, 'How?', { fill: P.ink, cls: 'a-pop', delay: 1.4 }),
        'Why? And how, exactly?') },
    { duration: 6000,
      caption: '<b>II. Dream with constraints.</b> Find the constraint people can actually change, move it a little first, and keep the imagined world consistent.',
      svg: () => {
        let s = V.frame(40, 55, 190, 130, { label: 'Constraints', color: P.plum, cls: 'a-fade' });
        [0, 1, 2].forEach(i => {
          const y = 95 + i * 30; const moved = i === 0;
          s += V.line(65, y, 205, y, { stroke: P.line, sw: 4 }) + V.circle(moved ? 175 : 85 + i * 30, y, 9, { fill: moved ? P.plum : P.muted, cls: moved ? 'a-pulse' : undefined });
        });
        s += V.arrow(240, 95, 292, 95, { color: 'ink', cls: 'a-draw', delay: .8 }) + V.bulb(325, 90, { cls: 'a-pop', delay: 1.3, scale: 1.6 });
        return scene('II', COL[1], 'Dream with constraints', s, 'What can we change ourselves?');
      } },
    { duration: 6000,
      caption: '<b>III. Reframe wisely.</b> Switching frames is risky. Try your repertoire first, then borrow from another field, and invent only as a last resort.',
      svg: () => {
        const names = ['Repertoire', 'Repurposing', 'Reinvention']; let s = '';
        names.forEach((n, i) => {
          const h = 40 + i * 32;
          s += V.group(V.rect(45 + i * 105, 160 - h, 100, h, { fill: P.amber, stroke: P.ink, opacity: .55 + i * .2, r: 8 }) + V.text(95 + i * 105, 160 - h / 2 + 5, n, { size: 12, bold: true }), { cls: 'a-rise', delay: .2 + i * .5 });
        });
        return scene('III', COL[2], 'Reframe wisely', s, 'Do we already own this frame?');
      } },
    { duration: 6000,
      caption: '<b>IV. Conditions matter.</b> Everyone frames alone first, then the group meets, and someone has the job of disagreeing.',
      svg: () => {
        let s = '';
        [[75, P.coral], [200, P.teal], [325, P.plum]].forEach(([x, c], i) => {
          s += V.person(x, 140, { color: P.ink, cls: 'a-fade', delay: i * .2 }) + V.rect(x - 20, 55, 40, 32, { fill: c, stroke: P.ink, r: 5, cls: 'a-pop', delay: .6 + i * .3 }) + V.line(x - 12, 66, x + 12, 66, { stroke: '#fff', sw: 2 }) + V.line(x - 12, 75, x + 6, 75, { stroke: '#fff', sw: 2 });
        });
        s += V.rect(45, 168, 310, 10, { fill: P.teal, stroke: P.teal, r: 5, cls: 'a-slide', delay: 1.4 });
        return scene('IV', COL[3], 'Conditions matter', s, 'Think alone, then decide together');
      } },
    { duration: 6000,
      caption: '<b>V. Think beyond yourself.</b> Organisations and societies need many frames. Distrust any lens that claims to explain everything.',
      svg: () => {
        let s = '';
        for (let i = 0; i < 5; i++) {
          s += V.rect(50 + i * 22, 62, 18, 100, { fill: P.line, stroke: P.line, r: 3, cls: 'a-fade' }) + V.rect(240 + i * 22, 62, 18, 100, { fill: COL[i], stroke: COL[i], r: 3, cls: 'a-rise', delay: .6 + i * .2 });
        }
        s += V.text(110, 185, '✕', { size: 28, fill: P.muted, cls: 'a-pop', delay: .5 }) + V.text(295, 185, '✓', { size: 28, fill: P.ok, cls: 'a-pop', delay: 1.8 });
        return scene('V', COL[4], 'Beyond yourself', s, 'Which colour is missing here?');
      } },
    { duration: 6500,
      caption: '<b>The question before the decision.</b> Before anyone argues about options, ask which frame the group is using and who would see it differently.',
      svg: () => scene('', P.ink, 'The question to ask first',
        V.frame(40, 60, 150, 110, { color: P.ink, cls: 'a-pop' }) + V.text(115, 133, '?', { size: 60, bold: true, fill: P.coral, cls: 'a-pop', delay: .5 }) +
        V.arrow(198, 115, 245, 115, { color: 'ink', cls: 'a-draw', delay: 1 }) + V.path('M310,75 L355,115 L310,155 L265,115 Z', { fill: P.amber, cls: 'a-pop', delay: 1.3 }) + V.text(310, 120, 'Choice', { size: 12, bold: true, cls: 'a-fade', delay: 1.5 }),
        'Which frame are we using now?') },
  ];

  /* ---------- section visuals ---------- */
  function visLadder() {
    const rows = ['Shift a weight', 'Loosen one rule', 'Loosen several rules', 'Build a new model'];
    let s = '';
    rows.forEach((r, i) => {
      const y = 22 + i * 56;
      s += V.group(V.rect(16, y, 368, 42, { fill: P.paper, stroke: P.plum, sw: 2, r: 10 }) + V.circle(40, y + 21, 13, { fill: P.plum }) + V.text(40, y + 26, String(i + 1), { size: 13, bold: true, fill: '#fff' }) +
        V.text(66, y + 26, r, { size: 14, bold: true, anchor: 'start' }) +
        [0, 1, 2, 3].map(k => V.circle(318 + k * 16, y + 21, 5, { fill: k <= i ? P.coral : P.line })).join(''), { cls: 'a-rise', delay: .2 + i * .35 });
    });
    return V.wrap(s);
  }
  function visTimeline() {
    const main = ['Goal', 'Alone', 'Share', 'Dissent', 'Decide'];
    const sub = ['one line', 'in writing', 'no rank', 'fixed role', 'frame deadline'];
    const cols = [P.ink, P.coral, P.teal, P.plum, P.amber];
    let s = V.line(30, 120, 370, 120, { stroke: P.line, sw: 4, cls: 'a-draw' });
    main.forEach((m, i) => {
      const x = 42 + i * 79; const up = i % 2 === 0;
      s += V.group(V.circle(x, 120, 14, { fill: cols[i] }) + V.text(x, 125, String(i + 1), { size: 13, bold: true, fill: '#fff' }) +
        V.text(x, up ? 88 : 160, m, { size: 13, bold: true }) + V.text(x, up ? 72 : 177, sub[i], { size: 12, fill: P.muted }), { cls: 'a-pop', delay: .3 + i * .35 });
    });
    s += V.text(200, 230, 'The frame is fixed before the decision', { size: 13, bold: true, cls: 'a-fade', delay: 2.4 });
    return V.wrap(s);
  }

  /* ---------- custom exercise: meeting designer ---------- */
  const MQ = [
    { q: 'Is the goal of the meeting explicit?',
      fix: 'Write the goal in one sentence before the meeting. Without a goal, no frame can be judged as fitting.',
      o: [
        { t: 'Yes, in one written sentence', s: 2, v: 'Good. A named goal is the yardstick every frame is measured against.' },
        { t: 'Roughly, everybody knows', s: 1, v: 'Risky. “Everybody knows” usually means everybody knows a different one.' },
        { t: 'Not stated', s: 0, v: 'You will discuss options without a yardstick. Frames cannot be compared without a goal.' }] },
    { q: 'Do people frame the problem alone, in writing, first?',
      fix: 'Give everyone 10 silent minutes to write their frame. Diverse teams otherwise converge on a consensus too fast.',
      o: [
        { t: 'Yes, written, before any discussion', s: 2, v: 'This is the condition the research supports most directly: thinking alone first keeps diversity alive.' },
        { t: 'A round of spoken statements first', s: 1, v: 'Better than nothing, but the first speaker anchors everyone after them.' },
        { t: 'Open discussion from minute one', s: 0, v: 'Expect fast agreement and a thin range of frames. The loudest frame wins by default.' }] },
    { q: 'Who names the hard constraints?',
      fix: 'Ask one person to separate hard from soft constraints on a visible board, so the group loosens only what can move.',
      o: [
        { t: 'One named person, visible to all', s: 2, v: 'Good. Hard constraints on the wall stop the room from dreaming about what cannot move.' },
        { t: 'They emerge during the discussion', s: 1, v: 'Common. But constraints found late arrive as vetoes, not as design input.' },
        { t: 'Nobody, they are assumed', s: 0, v: 'Unspoken constraints are the most powerful ones, and the least checked.' }] },
    { q: 'Is there a designated dissenter?',
      fix: 'Appoint a dissenter in advance, rotate the role, and say out loud that the role is protected.',
      o: [
        { t: 'Yes, named in advance, role rotates', s: 2, v: 'The court jester’s function, institutionalised. Rotation keeps it from becoming a personality label.' },
        { t: 'Anyone may object', s: 1, v: 'A permission is not a role. In hierarchies, permissions are rarely used.' },
        { t: 'No', s: 0, v: 'Then you are collecting confirmation. The toolkit says: seek dissent instead.' }] },
    { q: 'Which reframing path is tried first?',
      fix: 'Ask “which frame do we already know that fits?” before anyone proposes something new.',
      o: [
        { t: 'Repertoire, then repurposing, invention last', s: 2, v: 'Right order: cheapest and least risky first.' },
        { t: 'Not discussed', s: 1, v: 'Then the path is set by whoever speaks first, and it is often the most exciting one.' },
        { t: 'We start with a blank-sheet idea', s: 0, v: 'Invention is the hardest, riskiest path. The appendix calls it the last resort.' }] },
    { q: 'Is there a deadline for the frame decision?',
      fix: 'Fix a date by which the frame is chosen, and a review date. Until then no new frame enters.',
      o: [
        { t: 'Yes, plus a review date', s: 2, v: 'This guards against repeated reframing, which disorients teams.' },
        { t: 'A loose date', s: 1, v: 'Better than none, but without a review the frame silently hardens.' },
        { t: 'The frame stays open until the decision', s: 0, v: 'The frame will change with every new argument, and nobody will notice that it did.' }] },
  ];

  function renderMeeting(host, ctx) {
    const { el, htmlEl, done } = ctx;
    const KEY = 'framers.meeting';
    let saved = {}; try { saved = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { saved = {}; }
    const ans = Array.isArray(saved.answers) && saved.answers.length === MQ.length ? saved.answers.slice() : MQ.map(() => null);
    const persist = () => { try { localStorage.setItem(KEY, JSON.stringify({ name: nameIn.value, answers: ans })); } catch (e) { /* ignore */ } };

    const nameIn = el('input', { type: 'text', value: saved.name || '', placeholder: 'Which meeting? (e.g. steering committee, Thursday)', style: 'width:100%;padding:10px 12px;border:1px solid var(--line);border-radius:10px;font:inherit;margin-bottom:14px;background:var(--card);color:var(--ink)', 'aria-label': 'meeting' });
    nameIn.addEventListener('input', persist);
    const result = el('div', { class: 'meeting-result' });
    const blocks = MQ.map((m, qi) => {
      const verdict = htmlEl('div', 'ex-result', '');
      verdict.style.display = 'none';
      const btns = m.o.map((o, oi) => el('button', { type: 'button', class: 'btn small secondary', style: 'text-align:left;justify-content:flex-start;height:auto;white-space:normal', onclick: () => { ans[qi] = oi; persist(); paint(); } }, o.t));
      const box = el('div', { class: 'ex-item', style: 'margin-bottom:12px' }, htmlEl('div', 'txt', `<strong>${qi + 1}. ${m.q}</strong>`), el('div', { class: 'btnrow', style: 'flex-direction:column;align-items:stretch' }, ...btns), verdict);
      return { btns, verdict, box };
    });

    function gauge(total) {
      let s = ''; const w = 54, gap = 6, x0 = (400 - (6 * w + 5 * gap)) / 2;
      ans.forEach((a, i) => {
        const sc = MQ[i].o[a].s; const col = sc === 2 ? P.ok : sc === 1 ? P.amber : P.bad;
        s += V.rect(x0 + i * (w + gap), 110, w, 34, { fill: col, stroke: col, r: 8, cls: 'a-pop', delay: i * .12 }) + V.text(x0 + i * (w + gap) + w / 2, 132, String(sc), { size: 16, bold: true, fill: '#fff' }) + V.text(x0 + i * (w + gap) + w / 2, 166, String(i + 1), { size: 13, bold: true, fill: P.muted });
      });
      s += V.text(200, 62, `${total} / 12`, { size: 34, bold: true, cls: 'a-fade' }) + V.text(200, 92, 'Frame hygiene of your meeting', { size: 14, fill: P.muted }) +
        V.text(200, 205, total >= 10 ? 'Well-built meeting' : total >= 6 ? 'Workable, with gaps' : 'High frame risk', { size: 16, bold: true, fill: total >= 10 ? P.ok : total >= 6 ? P.amber : P.bad });
      return V.wrap(s);
    }
    function paint() {
      blocks.forEach((b, qi) => {
        b.btns.forEach((bt, oi) => { const on = ans[qi] === oi; bt.classList.toggle('accent', on); bt.classList.toggle('secondary', !on); });
        if (ans[qi] !== null) { const o = MQ[qi].o[ans[qi]]; b.verdict.style.display = ''; b.verdict.textContent = o.v; b.verdict.className = 'ex-result' + (o.s === 2 ? ' good' : ''); }
        else b.verdict.style.display = 'none';
      });
      if (ans.every(a => a !== null)) {
        const total = ans.reduce((s, a, i) => s + MQ[i].o[a].s, 0);
        const gaps = ans.map((a, i) => MQ[i].o[a].s < 2 ? `<li>${MQ[i].fix}</li>` : '').join('');
        result.innerHTML = `<figure>${gauge(total)}</figure>` + (gaps ? `<h4>Your next moves</h4><ul>${gaps}</ul>` : '<p><strong>All six levers are set. Check only whether the dissenter role holds up under hierarchy.</strong></p>');
        done();
      } else result.innerHTML = '';
    }
    host.append(nameIn, ...blocks.map(b => b.box), result);
    paint();
  }

  window.FRAMERS.register({
    id: 'u10', number: 10, kind: 'toolkit', color: '#6C4AB6', minutes: 20,
    title: 'Toolkit',
    tagline: 'Five groups of guidelines from the book’s appendix, each turned into a question you can ask in a real meeting.',
    icon: (c) => `<svg viewBox="0 0 44 44"><path d="M8 17h28v18a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3z" fill="none" stroke="${c}" stroke-width="3"/><path d="M16 17v-5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5" fill="none" stroke="${c}" stroke-width="3"/><path d="M8 26h28" stroke="${c}" stroke-width="3"/><rect x="19" y="23" width="6" height="6" rx="1.5" fill="${c}"/></svg>`,
    hook: '<p>The appendix of <em>Framers</em> is a list of about twenty guidelines in five groups. Lists invite box-ticking, yet the book itself says choosing a frame takes insight, not procedure. So this unit turns each group into one question for a meeting, and then you test your next real decision meeting against it.</p>',
    objectives: [
      'Explain what each of the five groups protects against.',
      'Turn each guideline into a question you can ask in a decision meeting.',
      'Assess a planned meeting against the toolkit and name its weakest lever.'],
    film: { title: 'The toolkit in six scenes', scenes },
    sections: [
      { id: 's1', heading: 'I. Harness mental models: make the assumption speak',
        body: '<p>Framing happens whether you want it or not, so the only choice is whether it happens deliberately.</p><ul><li><strong>Ask why and how.</strong> Why do you believe this? How must the world work if it is true? Semmelweis, in 1840s Vienna, saw mothers die far more often in the doctors’ ward than in the midwives’ ward. His explanation (“cadaverous particles”) was wrong, but because the causal claim was explicit, it led to a testable intervention: handwashing.</li><li><strong>Borrow a perspective.</strong> How would a wise friend, a historical hero or a rival frame this?</li><li><strong>Name your switching condition.</strong> What would have to change for you to see it differently? If the answer is “nothing”, you are defending, not framing.</li><li><strong>In a clash, describe the other frame</strong> before you rebut the position.</li></ul><p><strong>Meeting question:</strong> “How must the world work for this plan to succeed?”</p>',
        keyIdea: 'A frame you cannot state as “the world works like this” is not yet a frame you can examine.' },
      { id: 's2', heading: 'II. Dream with constraints: what can move, how far, does it still fit',
        body: '<p>Applying a frame means finding workable options quickly. Four rules govern the constraints.</p><ul><li><strong>Mutability.</strong> NASA assumed a returning rocket needs wings and built the shuttle. SpaceX loosened exactly that constraint once sensors and computing made upright engine landings feasible. Dream where human choices can change, not where physics rules.</li><li><strong>Minimal change.</strong> After the 1985 glycol scandal, Austrian winemakers kept grapes and wine and changed one thing: quality over volume.</li><li><strong>Consistency.</strong> For <em>Minority Report</em>, experts wrote a “bible” of the future world so that no detail contradicted another.</li><li><strong>Externalise.</strong> If you cannot hold all constraints in mind, put them in a physical model.</li></ul><p><strong>Meeting question:</strong> “Which constraint can we change ourselves, and what is the smallest change that opens a new option?”</p>',
        visual: { svg: visLadder, caption: 'Climb from the bottom: effort and risk grow with every step. Austrian wine stopped at step 1.' } },
      { id: 's3', heading: 'III. Reframe wisely: stay, borrow, invent, and do not flip-flop',
        body: '<p>Switching the frame changes what you can see, and it costs a lot. The appendix gives an order of attempts and a brake.</p><ul><li><strong>Repertoire first.</strong> In 2008 Ben Bernanke used a template he already owned from decades of studying the Great Depression.</li><li><strong>Then repurpose.</strong> IKEA carried a frame from fashion (cheap, replaceable goods) into furniture, which people had bought for generations.</li><li><strong>Invent last.</strong> Darwin’s tree of life is the rare frame with no precedent. It is the exception, not the plan.</li><li><strong>Tight or broad?</strong> Tight frames are fast but break when conditions shift; broad ones hold more and take longer.</li><li><strong>Do not reframe repeatedly.</strong> Each switch costs energy and leaves people disoriented.</li></ul><p><strong>Meeting question:</strong> “Is there a frame we already know that fits, before we invent one?”</p>',
        keyIdea: 'Reframing is not a skill you drill; it is a rare move you ration.' },
      { id: 's4', heading: 'IV and V. Conditions and pluralism: design the room',
        body: '<p>The last two groups move from the individual to the setting.</p><ul><li><strong>Frame alone before deciding together.</strong> Research cited in the book shows diverse teams settling on a consensus too fast, without using their different views. The effect fades when members think individually first.</li><li><strong>Seek dissent, not confirmation.</strong> The court jester’s job was to ask the generals how they would get out again.</li><li><strong>Accept tensions between frames.</strong> They reflect a complex reality more than faulty thinking.</li><li><strong>Reject any frame that claims to explain everything.</strong> The only bad frame is one that denies all others. “It is all culture” and “it is all data” deserve that suspicion.</li></ul><p><strong>Meeting question:</strong> “Before we talk: what is your frame, in writing, and who argues the other side?”</p>',
        visual: { svg: visTimeline, caption: 'A decision meeting with the toolkit built in. Steps 2 and 4 are the ones most meetings skip.' },
        keyIdea: 'Diversity is a property of the team; using it is a property of the meeting design.' },
    ],
    exercise: {
      type: 'custom',
      title: 'Meeting designer',
      instructions: 'Pick a real decision meeting in the coming weeks and answer six short questions about how it is built. Each answer gets a one-line verdict. Your answers stay on this device.',
      render: renderMeeting,
    },
    caseStudy: {
      title: 'Bernanke, September 2008: the toolkit applied',
      body: '<p>In September 2008, days after Lehman Brothers collapsed, Fed chairman Ben Bernanke had to decide whether to rescue the insurer AIG. The book gives the situation and his frame; the mapping below is <em>our application</em> of the toolkit, not a record of his process.</p><ol><li><strong>Harness (I).</strong> The assumption in the room: Wall Street’s trouble stays on Wall Street. His “how” question: how does failing finance reach the real economy? His answer: through credit.</li><li><strong>Constraints (II).</strong> Hard: the panic and the clock. Mutable: the Fed’s own tools. The minimal change was to stretch its role as lender, not to invent an institution.</li><li><strong>Reframe (III).</strong> Repertoire: the Depression frame was already in his head.</li><li><strong>Conditions and pluralism (IV, V).</strong> The moral hazard objection deserved a named voice before the decision, and stays a legitimate frame in public debate.</li></ol>',
      lesson: 'The toolkit does not produce the decision. It orders the questions so the frame is chosen on purpose and the dissenting frame gets a seat in time.',
    },
    reflection: {
      intro: 'Use the toolkit on yourself before you use it on others.',
      prompts: [
        'Pick the decision you are most committed to right now. Complete “This works only if the world is like this: …” and name one fact that would change your mind.',
        'Recall a meeting where someone disagreed early and was ignored. What in its design would have had to differ for the dissent to count?',
      ],
      placeholder: 'For my next decision, I will…',
    },
    quiz: [
      { case: '<p>Long-Term Capital Management, founded in 1994 with two future Nobel laureates in economics among its partners, made huge leveraged bets that price gaps between related bonds would narrow, as they historically had. After Russia defaulted in August 1998, investors fled to safety, the gaps widened almost everywhere at once, and the New York Fed brokered a bank-funded rescue.</p>',
        q: 'Which question, asked before the trades, would most directly have exposed the weak point?',
        options: [
          { text: 'How must markets behave for these trades to pay off, and what if they stop?', why: 'Right. The “how” question turns the hidden assumption (history repeats, markets stay liquid) into a claim you can test and stress.' },
          { text: 'Can we collect more years of historical price data to calibrate the models more precisely?', why: 'More data from the same past sharpens the frame without asking whether the past still holds. It confuses precision with validity.' },
          { text: 'Which constraint in our trading strategy can we change most easily for new options?', why: 'Mutability helps generate options inside a working frame. The danger here was not too few options but an unexamined assumption.' },
          { text: 'Could we repurpose a frame from another field instead of using our own models?', why: 'Reframing paths matter once a frame visibly fails. Before that, the first move is to inspect the frame you are actually using.' }],
        answer: 0,
        explain: 'Before acting on a frame, state how the world must work for it to succeed. A clever model with an unspoken assumption is still an unexamined frame.' },
      { case: '<p>In 1985 it emerged that some Austrian wine producers had sweetened their wine with diethylene glycol, a substance used in antifreeze. Bottles were pulled from shelves abroad and exports collapsed. Winemakers in Lower Austria now had to decide how to respond to a market that no longer trusted their product.</p>',
        q: 'Which first move fits the toolkit’s advice on constraints best?',
        options: [
          { text: 'Leave the vineyards for a new product that the scandal’s reputation cannot reach.', why: 'A drastic jump that throws away land, skills and know-how. Large changes come only after small ones have failed to open an option.' },
          { text: 'Keep grapes and wine, change one variable (quality over volume), and test it.', why: 'Right. Minimal change on a mutable constraint: own production standards. This is what the winemakers did, and export value later rose sharply.' },
          { text: 'Wait until the scandal fades, since public trust cannot be influenced by producers.', why: 'Treats a soft constraint as hard. Trust is slow, but producers shape it through what they make and how they certify it.' },
          { text: 'Start a broad review of the whole agricultural sector before deciding anything at all.', why: 'A broad frame is comprehensive but slow. In a collapse the tight frame (one variable, tested fast) is the better trade-off.' }],
        answer: 1,
        explain: 'Dream with constraints in order: find what you can change, change it as little as possible, and escalate only if no option appears.' },
      { case: '<p>In 2004 Jeff Bezos banned slide presentations from Amazon’s senior team meetings. Meetings open with a narrative memo of up to six pages. In his 2017 shareholder letter he described the ritual: everyone silently reads the memo first, in a kind of “study hall”, and only then does the discussion start.</p>',
        q: 'What does the silent reading phase, as distinct from writing the memo, mainly protect against?',
        options: [
          { text: 'Unexamined assumptions, because writing six pages forces the author to spell out the causal logic.', why: 'True of writing, which serves the author. The question is about the reading phase, which serves the audience before anyone has spoken.' },
          { text: 'Thin information, because a full narrative simply carries more detail than a slide deck can.', why: 'Detail is a side effect. A long deck sent ahead carries as much, without everyone meeting the argument alone at once.' },
          { text: 'Early convergence, because every reader forms a view alone before the group talk begins.', why: 'Right. Each person frames the problem independently first, so the first voice in the discussion cannot set everyone’s frame.' },
          { text: 'Uniform thinking, because the memo format brings outside perspectives into a homogeneous team.', why: 'Confuses composition with process. The people in the room stay the same; what changes is the order of thinking alone, then together.' }],
        answer: 2,
        explain: 'When deciding in teams, build a phase where everyone frames alone before views are shared. The sequence, not the guest list, protects the differences.' },
      { case: '<p>In April 1961 Kennedy’s advisers approved the CIA plan to land exiles at the Bay of Pigs. Arthur Schlesinger had doubts, put them in a private memo and kept largely quiet in the meetings; the invasion failed within days. During the 1962 missile crisis, Kennedy at times stayed away from his advisers’ meetings, so his view would not close the debate early.</p>',
        q: 'Which failure did the 1962 arrangement mainly address?',
        options: [
          { text: 'The 1961 advisers lacked expertise, so the later group needed better informed members.', why: 'Several key advisers sat in both groups. Blaming knowledge misses that the same people decided differently once the setting changed.' },
          { text: 'Too much open dissent in 1961 had stalled the decision, so the debate was shortened.', why: 'The reverse: 1961 suffered from too little voiced dissent. The doubts existed, but the setting kept them out of the room.' },
          { text: 'The 1961 group was too uniform socially, so new kinds of people were brought in.', why: 'Confuses social with cognitive diversity. The composition stayed largely similar; what changed was how the room let different frames surface.' },
          { text: 'A leader’s known preference anchors the room, so doubting advisers keep their objections private.', why: 'Right. The doubts existed in 1961 but stayed in memos. With the leader absent, nobody tailors a view to the boss.' }],
        answer: 3,
        explain: 'Conditions matter: the same people frame better when they think before hearing the boss. Design the room, not only the guest list.' },
      { case: '<p>At Pixar, a group of experienced directors and story artists, the Braintrust, watches films in progress and gives the director frank notes. Ed Catmull, Pixar’s cofounder, calls one rule essential: the Braintrust has no authority. The director need not follow any note and owns every decision.</p>',
        q: 'Why does the no authority rule matter for the framing work in that room?',
        options: [
          { text: 'Without power the notes stay mere advice, so the group’s frames rarely change the film.', why: 'No authority is not no influence. Directors adopt notes that convince them, and the notes are blunter because none can be forced.' },
          { text: 'Notes stay offered frames rather than imposed ones, so peers speak bluntly and alternatives get weighed.', why: 'Right. Since nothing can be imposed, dissent is voiced freely and the director keeps several frames in view before choosing one.' },
          { text: 'It shields the director’s vision from critique, so one strong frame can guide the film undisturbed.', why: 'The director still hears hard critique. The rule protects ownership, not the frame; ignoring every note would be single frame thinking.' },
          { text: 'It ensures consensus, since the whole group must agree on each note before it reaches the director.', why: 'Notes come from individuals and need not agree. Forcing consensus would merge different frames into one before anyone could weigh them.' }],
        answer: 1,
        explain: 'Seek dissent, but separate it from command. Frames offered without power are voiced candidly and judged on merit.' },
    ],
    flashcards: [
      { front: 'What question exposes the causal claim in a plan?', back: '“Why do you believe this, and how must the world work for it to be true?” An explicit claim can be tested; a silent one cannot.' },
      { front: 'Which constraints do you loosen first, and by how much?', back: 'The mutable ones, those people can change, and minimally at first. Escalate only if no option opens.' },
      { front: 'In what order do you try reframing paths?', back: 'Repertoire (a frame you own), then repurposing (borrowed from another field), invention last.' },
      { front: 'Why frame alone before deciding together?', back: 'Even diverse teams converge on consensus too fast and under-use their differences, unless members think individually first.' },
      { front: 'What is the only frame the book tells you to reject?', back: 'One that presents itself as the single frame for all of reality, because it shuts out the frames that could correct it.' },
    ],
    critique: [
      { claim: 'A guide with concrete guidelines helps people frame better.',
        challenge: 'The book says choosing a frame is an act of insight, not routine. A checklist can turn insight into the appearance of method: it feels rigorous and can be completed without seeing anything. The book also offers no evidence that following the guide improves outcomes; its support is case stories told after success. Use it as prompts for noticing, never as proof of good framing.' },
      { claim: 'Seeking dissent and framing alone first creates better group decisions.',
        challenge: 'The guide is silent on power. Who may dissent without cost, and who decides which frame wins? A designated dissenter without protection is decoration, and a junior person’s written frame can simply be discarded by whoever decides. Meeting design reduces anchoring but leaves the decision right untouched. A rule like “the decision-maker writes their frame last” helps.' },
      { claim: '“Speak the truth, even when it is not comforting; the courage is respected by those who matter.”',
        challenge: 'The book’s own cases contradict it: Semmelweis met resistance, not respect. Whether truth-telling is rewarded depends on hierarchy and audience. Sociologically this individualises a structural problem; the design should make dissent safe, not heroic.' },
    ],
    summary: [
      'The appendix offers five groups: harness models, dream with constraints, reframe wisely, conditions matter, think beyond yourself.',
      'Read as an order of effort and risk: make the assumption explicit, change little first, borrow before inventing, switch once.',
      'Meeting design carries the conditions: a written goal, framing alone first, named constraints, a protected dissenter, a frame deadline.',
      'The toolkit is silent on power and overstates the reward for truth-telling, so use it as prompts for noticing, not as proof of method.',
    ],
    glossary: [
      { term: 'Mutability', def: 'Choosing constraints by how changeable they are: loosen those people can actually change rather than fixed ones such as physics.' },
      { term: 'Minimal change', def: 'Alter as little as possible first and escalate only if no useful option appears.' },
      { term: 'Designated dissenter', def: 'A named, ideally rotating and protected role whose task is to argue against the dominant frame before the decision.' },
      { term: 'Frame pluralism', def: 'The coexistence of many frames in a group or society; the only frame to reject is one that denies all others.' },
    ],
  });
})();
