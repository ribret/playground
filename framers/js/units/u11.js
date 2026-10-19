/* u11 (v2): Synthesis and critique. Condensed English-only edition: argument chain, three stress tests, 3 C mapped onto the four AI disciplines. */
(function () {
  const P = V.palette;

  /* ---------- film ---------- */
  const chainNodes = ['Frames', '3 C', 'Options', 'Decision', 'Pluralism'];
  const chain = () => chainNodes.map((n, i) => {
    const x = 45 + i * 78;
    return V.group(V.circle(0, 0, 27, { fill: [P.coral, P.teal, P.amber, P.plum, P.sky][i] }) + V.text(0, 4, n, { size: n.length > 8 ? 10 : 11.5, fill: '#fff', bold: true }), { transform: `translate(${x},60)`, cls: 'a-pop', delay: i * .15 })
      + (i < 4 ? V.arrow(x + 30, 60, x + 50, 60, { color: 'muted', cls: 'a-draw', delay: .2 + i * .15 }) : '');
  }).join('');
  const scenes = [
    { duration: 6000, caption: '<b>The book is one chain of argument.</b> Frames generate options via the three C, options enable decisions, and a plurality of frames protects a society’s capacity to decide.',
      svg: (l) => V.wrap(chain() + V.text(200, 130, 'Each link carries a claim.', { size: 13, cls: 'a-fade', delay: 1 }) + V.text(200, 160, 'Where the chain breaks, the book loses force.', { size: 13, fill: P.muted, cls: 'a-fade', delay: 1.4 })) },
    { duration: 7000, caption: '<b>Stress test 1: the machine.</b> Written before large language models, the book says machines cannot frame; today a model proposes frames, what-ifs and constraints on request.',
      svg: (l) => V.wrap(V.rect(25, 30, 165, 200, { fill: P.paper, stroke: P.line, r: 14 }) + V.text(107, 55, '2021', { size: 14, bold: true }) + V.text(107, 120, 'Machine:\ncannot frame', { size: 13, fill: P.coral, bold: true }) +
        V.rect(210, 30, 165, 200, { fill: P.paper, stroke: P.line, r: 14, cls: 'a-fade', delay: .6 }) + V.text(292, 55, '2026', { size: 14, bold: true, cls: 'a-fade', delay: .6 }) +
        V.group(V.text(292, 100, 'propose frames ✓', { size: 12 }) + V.text(292, 125, 'what-ifs ✓', { size: 12 }) + V.text(292, 150, 'constraints ✓', { size: 12 }) + V.text(292, 190, 'goal & accountability ✗', { size: 12, fill: P.coral, bold: true }), { cls: 'a-rise', delay: 1 })) },
    { duration: 6500, caption: '<b>Stress test 2: the sample.</b> Every example is a success told backwards, while failed reframings that looked equally clever never appear.',
      svg: (l) => V.wrap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => { const ok = i % 3 === 0; const x = 40 + (i % 5) * 80, y = 70 + Math.floor(i / 5) * 90; return V.group(V.frame(x - 25, y - 25, 50, 50, { color: ok ? P.ok : P.line }) + (ok ? V.text(x, y + 6, '✓', { size: 20, fill: P.ok, bold: true }) : V.text(x, y + 6, '?', { size: 20, fill: P.muted })), { cls: 'a-pop', delay: i * .12 }); }).join('') +
        V.text(200, 230, 'In the book: only the green ones.', { size: 13, bold: true, cls: 'a-fade', delay: 1.5 })) },
    { duration: 7000, caption: '<b>Stress test 3: power.</b> The book treats frames as cognitive, but in organisations hierarchy, budgets and interests decide which frame counts.',
      svg: (l) => V.wrap(V.frame(40, 90, 110, 110, { color: P.teal, label: 'Frame A', cls: 'a-fade' }) + V.frame(250, 90, 110, 110, { color: P.coral, label: 'Frame B', cls: 'a-fade', delay: .2 }) +
        V.person(95, 170, { color: P.teal, scale: .8, cls: 'a-pop', delay: .5 }) + V.person(305, 170, { color: P.coral, scale: .8, cls: 'a-pop', delay: .5 }) +
        V.group(V.rect(150, 25, 100, 34, { fill: P.ink, r: 17 }) + V.text(200, 47, 'Hierarchy', { size: 12, fill: '#fff', bold: true }), { cls: 'a-rise', delay: 1 }) +
        V.arrow(200, 62, 200, 95, { color: 'ink', cls: 'a-draw', delay: 1.3 }) + V.arrow(200, 95, 165, 110, { color: 'muted', cls: 'a-draw', delay: 1.6 }) + V.text(200, 235, 'Who decides which frame counts?', { size: 13, bold: true, cls: 'a-fade', delay: 2 })) },
    { duration: 7500, caption: '<b>The bridge to your practice: a prompt is a frame handed over.</b> Context engineering sets causal assumptions, intent engineering the goal, specification engineering the constraints.',
      svg: (l) => V.wrap(V.threeC(112, 80, l, { gap: 90, delay: 0 }) + V.arrow(112, 140, 112, 165, { color: 'ink', cls: 'a-draw', delay: .9 }) +
        V.group(V.rect(15, 170, 195, 70, { fill: P.paper, stroke: P.line, r: 12 }) + V.text(112, 192, 'Context · Intent', { size: 12, bold: true }) + V.text(112, 212, 'Specification Engineering', { size: 12, bold: true }) + V.text(112, 230, '(your four AI disciplines)', { size: 11, fill: P.muted }), { cls: 'a-rise', delay: 1.1 }) +
        V.group(V.rect(250, 60, 130, 150, { fill: P.ink, r: 16 }) + V.text(315, 100, 'Prompt', { size: 16, fill: '#fff', bold: true }) + V.text(315, 130, '=', { size: 22, fill: P.amber, bold: true }) + V.text(315, 165, 'a frame\nhanded over', { size: 13, fill: '#fff' }), { cls: 'a-pop', delay: 1.6 })) },
    { duration: 7000, caption: '<b>A working routine: the frame audit.</b> Name the frame, its causal assumption, the what-if it suppresses, its hard and soft constraints, and one alternative frame.',
      svg: (l) => V.wrap(['1 Name the frame', '2 Causal assumption', '3 Suppressed what-if', '4 Hard / soft', '5 Alternative frame'].map((s, i) => V.group(V.rect(40, 0, 320, 34, { fill: i % 2 ? P.paper : P.paper2, stroke: P.line, r: 10 }) + V.text(60, 22, s, { size: 13, anchor: 'start', bold: true }), { transform: `translate(0,${28 + i * 42})`, cls: 'a-slide', delay: i * .25 })).join('')) },
  ];

  /* ---------- custom exercise: frame audit worksheet ---------- */
  function renderAudit(host, ctx) {
    const { el, done } = ctx;
    const fields = [
      ['situation', 'The decision or situation (one sentence)', 'e.g. Whether to extend our consulting offer to AI implementation'],
      ['frame', 'The frame you are currently using (name it like a map)', 'e.g. “Product portfolio frame”: offers are products with a margin'],
      ['cause', 'Its causal assumption: if we do X, Y happens because … (what you would put into context engineering)', ''],
      ['cf', 'The what-if this frame does not ask (what intent engineering should open up)', 'e.g. What if clients do not buy implementation but judgement?'],
      ['constraints', 'Hard constraints, and soft ones you could loosen (what specification engineering must fix)', ''],
      ['alt', 'One alternative frame: from your repertoire or borrowed from another field', 'e.g. “Workshop frame” from crafts: enabling instead of delivering'],
    ];
    const key = 'framers.audit'; let data = {}; try { data = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { }
    const status = el('div', { class: 'saved' });
    const inputs = fields.map(([id, label, ph]) => {
      const ta = el('textarea', { placeholder: ph, style: 'min-height:70px', 'aria-label': label }); ta.value = data[id] || '';
      ta.addEventListener('input', () => { data[id] = ta.value; localStorage.setItem(key, JSON.stringify(data)); const filled = fields.filter(f => (data[f[0]] || '').trim().length > 10).length; status.textContent = `${filled} / ${fields.length} · ${ctx.ui('saved')}`; if (filled >= 4) done(); });
      return el('div', { style: 'margin-bottom:12px' }, el('div', { style: 'font-weight:600;margin-bottom:4px' }, label), ta);
    });
    const exportBtn = el('button', { class: 'btn secondary small', onclick: () => { const txt = fields.map(([id, label]) => `${label}\n${data[id] || ''}`).join('\n\n'); navigator.clipboard && navigator.clipboard.writeText(txt).then(() => { status.textContent = 'Copied to clipboard'; }); } }, 'Copy as text');
    host.append(...inputs, el('div', { class: 'btnrow' }, exportBtn), status);
  }

  window.FRAMERS.register({
    id: 'u11', number: 11, kind: 'synthesis', color: '#5B6B8C', minutes: 20,
    title: 'Synthesis & critique',
    tagline: 'Does the argument hold in 2026, what survives the stress tests, and what you do with it on Monday.',
    icon: (c) => `<svg viewBox="0 0 44 44"><rect x="6" y="8" width="32" height="28" rx="5" fill="none" stroke="${c}" stroke-width="3"/><path d="M13 22 l6 6 l12 -12" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/></svg>`,
    hook: '<p>You now hold the model. The honest question is not whether it is elegant (it is) but whether it is true enough to act on, five years and one technological rupture later. This unit runs it through three stress tests and keeps what survives.</p>',
    objectives: [
      'Reconstruct the book’s argument as one chain of five claims.',
      'Apply three stress tests (machine, sample, power) and say what survives.',
      'Map the three C onto your four AI disciplines and run a frame audit.',
    ],
    film: { title: 'The argument, three stress tests, one routine', scenes },
    sections: [
      { id: 's1', heading: 'The argument as one chain',
        body: '<p>Reduced to its skeleton, the book makes five linked claims. (1) We decide through mental models, and the choice of model matters more than the data fed into it. (2) A frame is applied through causality, counterfactuals and constraints: fast, trainable, the source of most good decisions. (3) When the context shifts, the frame itself must change (repertoire, repurposing, reinvention): rare, risky, not improved by drill. (4) So people and organisations need a diversity of frames. (5) Societies need frame pluralism; the only illegitimate frame is one that denies all others.</p><p>A theory earns its keep by forbidding something. This one forbids “more data” as the default answer to a stuck decision, reframing as a quarterly routine, and diversity that changes faces but not frames. Read it as falsifiable bets about where decisions fail.</p>' },
      { id: 's2', heading: 'The machine test, and the verdict',
        body: '<p>The book’s refrain is that computers calculate but cannot frame. Its examples (AlphaZero, simulators for self-driving cars) predate large language models. Today a model will propose five frames for a problem, generate counterfactual scenarios and list constraints on request. The strong claim is gone. The defensible version is narrower: machines do not own the goal, carry no accountability and have no stake in which frame wins. Human indispensability moves from generating frames to choosing them and answering for them.</p><p>The verdict: an excellent practical grammar of decision-making (the three C; the constraint principles of mutability, minimal change and consistency; the order of reframing strategies), wrapped in a claim about human exceptionalism that did not survive its decade. Keep the grammar, and replace the exceptionalism with the question of ownership. Sample and power follow in the critique.</p>',
        visual: { caption: 'What the 2021 claim excluded (left) and what still holds in 2026 (right).',
          svg: (l) => V.wrap(V.text(105, 40, 'Claim 2021', { size: 13, bold: true }) + V.text(295, 40, 'Defensible 2026', { size: 13, bold: true, fill: P.teal }) +
            V.line(200, 25, 200, 240, { stroke: P.line, dash: '4 4' }) +
            ['cannot generate frames', 'no what-ifs', 'no constraints'].map((s, i) => V.group(V.text(105, 80 + i * 40, s, { size: 12, fill: P.muted }) + V.line(40, 84 + i * 40, 170, 84 + i * 40, { stroke: P.coral, sw: 2, cls: 'a-draw', delay: .5 + i * .3 }), { cls: 'a-fade', delay: i * .2 })).join('') +
            ['does not own the goal', 'carries no accountability', 'has no stake'].map((s, i) => V.text(295, 80 + i * 40, s, { size: 12, bold: true, fill: P.teal, cls: 'a-rise', delay: 1.4 + i * .25 })).join('') +
            V.text(200, 225, 'Indispensable: choosing and answering for it', { size: 12, bold: true, cls: 'a-fade', delay: 2.4 })) },
        keyIdea: 'Humans are indispensable not because machines cannot frame, but because someone must own the frame.' },
      { id: 's3', heading: 'The three C as your four AI disciplines',
        body: '<p>Prompting is framing handed to a machine. Seen this way, the four AI disciplines are leadership competencies, not technical skills. <strong>Prompt craft</strong> is the surface: wording a request. <strong>Context engineering</strong> supplies the causal picture the model reasons within: what the organisation is and how things connect. <strong>Intent engineering</strong> fixes the goal against which counterfactual options are judged, the very thing the book says machines cannot own (this is the loosest of the three fits). <strong>Specification engineering</strong> sets the constraints, hard and soft, and the book’s three principles (mutable, minimal, consistent) are a ready checklist for writing them.</p><p>The payoff in a boardroom: you are not teaching people a tool, you are making explicit a capability leaders already use. The same lens sharpens a change-readiness diagnosis: which soft constraints does the organisation treat as hard, and which what-if does it never ask?</p>',
        visual: { caption: 'The three C mapped onto the AI disciplines: a frame handed to a machine.',
          svg: (l) => V.wrap([['Causality', 'Context Engineering', P.coral], ['Goal / counterfactuals', 'Intent Engineering', P.teal], ['Constraints', 'Specification Engineering', P.plum]].map(([a, b, c], i) =>
            V.group(V.rect(20, 0, 150, 48, { fill: c, stroke: 'none', r: 12 }) + V.text(95, 29, a, { size: 12, fill: '#fff', bold: true }) + V.arrow(176, 24, 214, 24, { color: 'ink' }) + V.rect(220, 0, 160, 48, { fill: P.paper, stroke: c, r: 12, sw: 2 }) + V.text(300, 29, b, { size: 11.5, bold: true }), { transform: `translate(0,${30 + i * 70})`, cls: 'a-slide', delay: i * .3 })).join('') + V.text(200, 248, 'Prompt craft = the surface on top', { size: 11, fill: P.muted, cls: 'a-fade', delay: 1.2 })) } },
    ],
    exercise: {
      type: 'custom',
      title: 'Frame audit: your real decision',
      instructions: 'Take a decision that is open for you right now and fill the six fields. Three of them show which AI discipline would carry that part if you handed the frame to a machine. Saved on this device; four filled fields count as done.',
      render: renderAudit,
    },
    caseStudy: {
      title: 'Transfer case: the same interviews, two frames handed to a model',
      body: '<p>Not from the book, but built with its tools. A consulting team has twenty interview transcripts from a change-readiness assessment. Request A to a language model: “Summarise the interviews and list the main concerns.” Request B: “Which causal assumptions about why the transformation will succeed or fail do interviewees share? Which counterfactual (what if we did nothing; what if leadership changed first) does nobody raise? Which constraints are treated as hard?”</p><p>Request A returns a competent summary that mirrors the organisation’s own frame back at it. Request B surfaces the frame itself: the shared causal story (“it all depends on the new tool”), the suppressed what-if and the constraints treated as non-negotiable. Same data, same model, different frame, different options.</p>',
      lesson: 'The quality of an AI result is mostly the quality of the frame you handed over. That is a leadership competence, not a technical one.',
    },
    reflection: {
      intro: 'Go back to the objection you expected to have in the Orientation unit, then answer here.',
      prompts: [
        'Did the book confirm or dissolve your initial objection, and which idea did the work?',
        'State the thesis as you would to a sceptical CEO in 30 seconds, including the one caveat you would add.',
      ],
      placeholder: 'My 30-second version, with caveat…',
    },
    quiz: [
      { case: '<p>From 2014, an Amazon team built a tool that rated job applicants from one to five stars. It learned from résumés sent to the company over ten years, most of them from men. By 2015 it was penalising résumés containing “women’s”, as in “women’s chess club captain”, and downgrading graduates of two women’s colleges. Engineers neutralised those terms; Amazon still disbanded the team (Reuters, 2018).</p>',
        q: 'Read through the three C, where did this failure originate?',
        options: [
          { text: 'The model saw too few women’s résumés; more and broader data would have averaged the effect out.', why: 'More data from the same hiring history repeats its pattern. Volume entrenches a frame rather than repairing it. Right only when a sample is skewed by accident.' },
          { text: 'Engineers set the wrong constraint by letting the model read gendered words at all.', why: 'Blocking words treats a symptom. Reuters reported the edits gave no guarantee against other proxies, because the causal frame underneath stayed. Right when one known term causes the harm.' },
          { text: 'In the causal assumption inside the context: past hiring decisions define what a good hire is.', why: 'Correct. The data carried an unnamed causal story: people like those we hired before will succeed. Context engineering is where that story enters and must be examined.' },
          { text: 'The model lacked intent; a clearer goal such as “find the best engineers” would have kept it fair.', why: 'Finding the best candidates already was the goal. A sharper intent cannot override a causal picture that equates “best” with resembling past hires.' },
        ],
        answer: 2,
        explain: 'Any context you hand a machine carries causal assumptions. Auditing them is a leadership task, not a data-cleaning step.' },
      { case: '<p>In 2023, lawyers in Mata v. Avianca filed a brief in a New York federal court citing airline cases that did not exist; ChatGPT had invented them. Asked whether one case was real, the chatbot said yes. Judge P. Kevin Castel sanctioned the lawyers and their firm, noting that using AI is not improper in itself, but lawyers keep a gatekeeping duty for what they file.</p>',
        q: 'Which reading of the book’s AI thesis does this case support best?',
        options: [
          { text: 'Machines can generate plausible legal argument; a human must choose, check and answer for it.', why: 'Correct. The model generated freely but had no stake in being right. The gatekeeping duty the court cited is the narrow, defensible version of the thesis.' },
          { text: 'It confirms the 2021 claim as written: machines cannot produce anything that resembles legal reasoning.', why: 'Overshoots in the old direction. The output looked like legal reasoning, which is exactly why it was dangerous. The strong claim cannot explain the case.' },
          { text: 'The failure was one of prompt craft; a better worded request would have returned real citations.', why: 'Better prompts reduce errors but never transfer accountability. Even with a perfect prompt, verification and signature stay with the human.' },
          { text: 'The fault lies mainly with the tool’s maker, since a model that invents case law is defective.', why: 'Confuses generating with owning. The court placed the duty with those who filed. Vendor liability is a separate question, relevant for product law, not for this filing.' },
        ],
        answer: 0,
        explain: 'Delegating generation is fine; delegating ownership is not. The human role shifts from producing frames to choosing and answering for them.' },
      { case: '<p>In 2022, Jake Moffatt asked Air Canada’s website chatbot about bereavement fares. It told him he could claim the discount after travelling, while linking to the policy page, which said the opposite. Before a British Columbia tribunal in 2024, Air Canada argued the chatbot was a separate entity responsible for its own actions. The tribunal rejected this and ordered the airline to pay.</p>',
        q: 'Mapped onto the four AI disciplines, which one addresses the root failure?',
        options: [
          { text: 'Prompt craft: customers need guidance on how to phrase their questions to a chatbot.', why: 'Shifts the burden to the user. Moffatt asked a plain question; the system, not the wording, produced an answer outside policy.' },
          { text: 'Context engineering: the bot needed a fuller picture of Moffatt’s situation to answer with empathy.', why: 'The bot grasped his situation; it misstated the rule. Richer user context improves tone, not compliance. Right when a system misreads what a user needs.' },
          { text: 'Intent engineering: a clearer customer-service goal would have framed the bot’s answers within policy.', why: 'A goal sets direction, not boundaries. “Serve grieving customers well” is compatible with inventing a generous rule; only a binding limit excludes it.' },
          { text: 'Specification engineering: a fare rule is a hard constraint the deployment never enforced.', why: 'Correct. Policy is a hard constraint and the specification must make it binding. The tribunal confirmed the company owns whatever its bot says.' },
        ],
        answer: 3,
        explain: 'Context tells a machine what is true; specification tells it what it must not do. Confusing the two leaves hard constraints soft.' },
      { case: '<p>For Good to Great (2001), Jim Collins screened 1,435 companies, singled out eleven that had made a lasting leap, and distilled the traits they shared. Within a decade two of the eleven had collapsed: Circuit City went bankrupt, and Fannie Mae was placed under government conservatorship in 2008. Critics noted the traits were identified only after the outcomes were known.</p>',
        q: 'What does this imply for judging the evidence in Framers?',
        options: [
          { text: 'The two firms later abandoned the traits, so their collapse confirms rather than refutes the theory.', why: 'An unfalsifiable rescue: if every failure means “they stopped doing it”, nothing can count against the theory. Framers risks the same move with “wrong frame”.' },
          { text: 'Success stories told backwards show that a vocabulary describes wins, not that it predicts them.', why: 'Correct. Framers also samples only successes. A fair test picks cases before outcomes are known and includes failed reframings that looked equally clever.' },
          { text: 'Case-based management books are worthless, so the book’s three C should be discarded entirely.', why: 'Overshoots. Weak evidence for prediction is not evidence against usefulness. The three C can still structure thinking; they are just not proven to improve results.' },
          { text: 'Collins measured the wrong outcome; with framing quality as the metric his sample would hold up.', why: 'Swapping the metric after the fact repeats the error. Any yardstick chosen with hindsight can be fitted to known winners.' },
        ],
        answer: 1,
        explain: 'Ask what a theory forbids. If it only explains after the fact, it is a lens rather than a prediction, and should be used as one.' },
      { case: '<p>Boeing designed the 737 MAX so that pilots of the older 737 would need no new simulator training, a key selling point. At an October 2019 hearing, US House lawmakers disclosed that Boeing had agreed to pay Southwest Airlines $1 million per plane if such training were required. The MCAS software, implicated in two fatal crashes, was not described in the pilots’ manuals.</p>',
        q: 'Which lens best explains why “no simulator training” shaped the engineering?',
        options: [
          { text: 'It was a hard constraint, and the engineers rightly optimised the whole design within it.', why: 'Treats a commercial promise as physics. Nothing in aerodynamics required it, and Boeing itself later recommended simulator training, which shows it was mutable.' },
          { text: 'Individual engineers lacked counterfactual imagination about how a sensor could fail in flight.', why: 'Keeps the analysis inside individual heads. The issue is less imagination than which constraints the organisation allowed anyone to question.' },
          { text: 'Commercial interests declared a soft constraint hard, and that decision sat above engineering judgement.', why: 'Correct. Who may call a constraint hard is a question of power and incentives. The book’s cognitive toolkit names constraints but not who sets them.' },
          { text: 'More flight test data before certification would have exposed the flaw and corrected the frame.', why: 'Data answers the questions a frame permits. While “no new training” was untouchable, findings had to be fitted around it rather than allowed to challenge it.' },
        ],
        answer: 2,
        explain: 'In organisations, constraints are declared, not just discovered. A frame audit must ask who declared a constraint hard, and who gains from it.' },
    ],
    flashcards: [
      { front: 'The argument chain', back: 'Frames → three C → options → decisions → pluralism as societal insurance.' },
      { front: 'Stress test: machine', back: 'Language models generate frames, what-ifs and constraints. What they lack: ownership of the goal and accountability.' },
      { front: 'Stress test: sample', back: 'Only successes are narrated. Ask what the theory forbids; otherwise it only explains after the fact.' },
      { front: 'Stress test: power', back: 'Which frame counts in an organisation is decided by whoever controls consequences. The book stays cognitive.' },
      { front: 'Three C ↔ AI disciplines', back: 'Causality ↔ context engineering; goal and counterfactuals ↔ intent engineering; constraints ↔ specification engineering; prompt craft is the surface.' },
    ],
    critique: [
      { claim: 'The book’s examples show that good framing leads to good decisions.',
        challenge: 'Halicin, Apollo, Entebbe, Camden: all successes narrated backwards. Failed reframings that looked equally wise in advance are absent, so the book shows that wins can be described in its vocabulary, not that the vocabulary produces wins. Ask what it would say about a failed reframing. If the answer is “then it was the wrong frame”, the theory is unfalsifiable at that point.' },
      { claim: 'Frames are cognitive tools that individuals choose and apply.',
        challenge: 'In organisations, frames come with budgets, careers and sanctions. Who gets to call a constraint hard, or a counterfactual unrealistic? Goffman, Bourdieu and Weick’s sensemaking research all point the same way: the frame that counts is backed by those who control consequences. The book notes that outsiders like Semmelweis lost to establishments but never theorises it, and that is where applications in companies fail.' },
      { claim: 'Framing matters more than cooperation for humanity’s future.',
        challenge: 'Asserted rather than argued. The book’s own causality chapter, drawing on Tomasello, traces causal thinking back to social life. Ranking individual cognition above the social is itself a frame, and by the book’s rules it should be named as one, with its blind spot: collective framing by institutions, professions and movements gets almost no treatment.' },
    ],
    summary: [
      'The book is one chain: frames, three C, options, decisions, pluralism; read it as falsifiable bets about where decisions fail.',
      'The strong AI claim (machines cannot frame) is outdated; the narrow one (machines own neither the goal nor the accountability) holds.',
      'The evidence is survivorship-biased and the model is power-blind, and both matter for use inside organisations.',
      'Applied: the three C map onto context, intent and specification engineering, and the frame audit is a five-minute routine before big decisions.',
    ],
    glossary: [
      { term: 'Frame audit', def: 'A short routine before a decision: name the frame, its causal assumption, the suppressed counterfactual, hard vs. soft constraints and one alternative frame.' },
      { term: 'Ownership of the frame', def: 'The defensible 2026 version of the book’s AI thesis: machines can generate frames, but a human must choose and answer for the one used.' },
      { term: 'Survivorship bias (of examples)', def: 'Evidence drawn only from successes; the theory then explains outcomes after the fact without predicting them.' },
      { term: 'Power-blindness', def: 'Treating frames as purely cognitive while, in organisations, hierarchy and interests decide which frame counts.' },
    ],
  });
})();
