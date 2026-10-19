/* u04 (V2): Counterfactuals (chapter 4). English only, condensed. */
(function () {
  const P = V.palette;

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 6000,
      caption: '<b>Data shows that things move together, not who is responsible.</b> CO₂ and temperature rise in parallel; the graph alone cannot say how much of that is us.',
      svg: (l) => V.wrap(
        V.line(50, 30, 50, 210, { stroke: P.ink }) + V.line(50, 210, 375, 210, { stroke: P.ink }) +
        V.path('M50,195 C160,190 250,160 365,70', { stroke: P.sky, sw: 3.5, cls: 'a-draw' }) +
        V.path('M50,200 L80,196 L110,201 L140,192 L170,195 L200,185 L230,182 L260,166 L290,158 L320,136 L350,112 L365,104', { stroke: P.coral, sw: 3, cls: 'a-draw', delay: .5 }) +
        V.text(300, 70, 'CO₂', { size: 14, bold: true, fill: P.sky, cls: 'a-fade', delay: 1 }) +
        V.text(318, 150, 'Temperature', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.3 }) +
        V.text(212, 242, 'Correlation ≠ responsibility', { size: 15, bold: true, cls: 'a-rise', delay: 2 })) },

    { duration: 6500,
      caption: '<b>The second Earth exists only in a model.</b> Inez Fung’s team simulated a planet without human CO₂; the gap between the two worlds is our share.',
      svg: (l) => V.wrap(
        V.text(110, 30, 'with us', { size: 13, bold: true, cls: 'a-fade' }) +
        V.text(290, 30, 'without us', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: .8 }) +
        V.circle(110, 85, 42, { fill: P.coral, cls: 'a-pop', delay: .2 }) + V.text(110, 90, 'real', { size: 13, bold: true, fill: '#fff', cls: 'a-fade', delay: .4 }) +
        `<circle cx="290" cy="85" r="42" fill="none" stroke="${P.teal}" stroke-width="3" stroke-dasharray="7 5" class="a-pop" style="--d:.8s"/>` +
        V.text(290, 90, 'model', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: 1 }) +
        V.rect(95, 145, 30, 75, { fill: P.coral, stroke: P.ink, cls: 'a-rise', delay: 1.4 }) +
        V.rect(275, 180, 30, 40, { fill: P.teal, stroke: P.ink, cls: 'a-rise', delay: 1.6 }) +
        V.line(140, 145, 260, 145, { stroke: P.muted, dash: '4 4', cls: 'a-draw', delay: 2 }) + V.line(140, 180, 260, 180, { stroke: P.muted, dash: '4 4', cls: 'a-draw', delay: 2 }) +
        V.text(200, 168, 'our share', { size: 14, bold: true, cls: 'a-pop', delay: 2.4 }) +
        V.text(200, 248, 'Comparing two worlds', { size: 13, fill: P.muted, cls: 'a-fade', delay: 2.8 })) },

    { duration: 6500,
      caption: '<b>An own goal is decided by an imagined path.</b> In the 2018 World Cup final the referee had to picture where the ball would have gone without the defender’s head.',
      svg: (l) => V.wrap(
        V.rect(330, 55, 50, 150, { fill: 'none', stroke: P.ink, sw: 3, r: 2 }) +
        V.person(355, 158, { color: P.sky, cls: 'a-fade' }) +
        V.person(200, 150, { color: P.muted, cls: 'a-fade', delay: .2 }) +
        V.circle(40, 215, 7, { fill: P.ink, cls: 'a-pop' }) +
        V.path('M40,215 Q110,120 200,122', { stroke: P.ink, sw: 2.5, cls: 'a-draw', delay: .4 }) +
        V.path('M200,122 Q290,60 362,72', { stroke: P.coral, sw: 3.5, cls: 'a-draw', delay: 1.2 }) +
        V.path('M200,122 Q280,125 345,138', { stroke: P.teal, sw: 3, dash: '7 6', cls: 'a-draw', delay: 2.2 }) +
        V.text(270, 58, 'real: goal', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.6 }) +
        V.text(255, 175, 'imagined: saved', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: 2.8 }) +
        V.text(200, 248, 'A verdict on a world that never was', { size: 13, cls: 'a-fade', delay: 3.4 })) },

    { duration: 6000,
      caption: '<b>Causality and counterfactuals need each other.</b> Without causes, events are noise; without imagined alternatives, we are prisoners of what is.',
      svg: (l) => V.wrap(
        V.circle(105, 130, 46, { fill: P.coral, cls: 'a-pop' }) + V.text(105, 135, 'Causality', { size: 13, bold: true, fill: '#fff', cls: 'a-fade', delay: .2 }) +
        V.circle(295, 130, 46, { fill: P.teal, cls: 'a-pop', delay: .4 }) + V.text(295, 135, 'What-if', { size: 13, bold: true, fill: '#fff', cls: 'a-fade', delay: .6 }) +
        V.path('M140,95 Q200,45 258,95', { stroke: P.coral, sw: 3, cls: 'a-draw', delay: 1 }) + V.arrow(250, 88, 260, 97, { color: 'coral', cls: 'a-fade', delay: 1.6 }) +
        V.path('M258,165 Q200,215 142,165', { stroke: P.teal, sw: 3, cls: 'a-draw', delay: 1.8 }) + V.arrow(150, 172, 140, 163, { color: 'teal', cls: 'a-fade', delay: 2.4 }) +
        V.text(200, 45, 'makes it meaningful', { size: 13, cls: 'a-fade', delay: 1.4 }) +
        V.text(200, 232, 'makes it actionable', { size: 13, cls: 'a-fade', delay: 2.2 })) },

    { duration: 7000,
      caption: '<b>One option is a trap; many options, then narrow.</b> At the Bay of Pigs Kennedy’s team saw one plan. In the missile crisis he demanded alternatives, debated two, and chose the blockade.',
      svg: (l) => {
        let s = V.line(200, 25, 200, 235, { stroke: P.line, sw: 2 });
        s += V.text(100, 40, '1961', { size: 14, bold: true, cls: 'a-fade' }) + V.text(300, 40, '1962', { size: 14, bold: true, cls: 'a-fade', delay: 1.2 });
        s += V.circle(40, 130, 9, { fill: P.ink, cls: 'a-pop', delay: .2 }) + V.arrow(50, 130, 120, 130, { color: 'ink', cls: 'a-draw', delay: .4 });
        s += V.pill(155, 130, 'invasion', { fill: P.bad, w: 70, cls: 'a-pop', delay: .8 });
        s += V.text(100, 200, 'one plan', { size: 13, fill: P.bad, bold: true, cls: 'a-fade', delay: 1 });
        s += V.circle(225, 130, 9, { fill: P.ink, cls: 'a-pop', delay: 1.4 });
        const ys = [65, 92, 119, 146, 173, 200];
        ys.forEach((y, i) => { s += V.line(234, 130, 285, y, { stroke: P.teal, sw: 2, cls: 'a-draw', delay: 1.6 + i * .12 }) + V.circle(290, y, 6, { fill: P.teal, cls: 'a-pop', delay: 1.7 + i * .12 }); });
        s += V.arrow(296, 119, 345, 130, { color: 'ink', cls: 'a-draw', delay: 2.6 }) + V.arrow(296, 146, 345, 133, { color: 'ink', cls: 'a-draw', delay: 2.6 });
        s += V.circle(360, 131, 11, { fill: P.ok, cls: 'a-pop', delay: 3 });
        s += V.text(300, 230, 'many → two → blockade', { size: 13, bold: true, fill: P.ok, cls: 'a-fade', delay: 3.2 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: '<b>Humans invent the rare cases; the machine varies them.</b> Waymo’s Carcraft adds human-designed “spicy” scenarios to millions of ordinary miles, then fuzzes each one.',
      svg: (l) => {
        let s = V.dots(55, 25, 55, 135, 140, { seed: 5, fill: P.muted, r: 4, cls: 'a-fade', stagger: .015 });
        s += V.text(92, 225, 'Ordinary: lots of data', { size: 12, bold: true, fill: P.muted, cls: 'a-fade', delay: .8 });
        s += V.person(215, 205, { color: P.ink, cls: 'a-pop', delay: 1.2 });
        const spicy = [[290, 70], [350, 120], [295, 160]];
        spicy.forEach(([x, y], i) => {
          s += V.arrow(225, 175, x - 12, y + 6, { color: 'muted', dash: '4 4', cls: 'a-draw', delay: 1.5 + i * .3 });
          s += V.circle(x, y, 10, { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: 1.7 + i * .3 });
          s += V.dots(7, x - 26, y - 22, 52, 44, { seed: 11 + i, fill: P.teal, r: 3, cls: 'a-pop', stagger: .06, opacity: .9 }).replace(/--d:([\d.]+)s/g, (m, d) => `--d:${(2.8 + i * .2 + +d).toFixed(2)}s`);
        });
        s += V.text(320, 225, 'invented, then varied', { size: 12, bold: true, fill: P.teal, cls: 'a-fade', delay: 3.4 });
        return V.wrap(s);
      } },
  ];

  /* ---------- custom exercise: the what-if workbench ---------- */
  function renderWorkbench(host, ctx) {
    const { el, htmlEl, done } = ctx;
    const cats = [
      { id: 'bound', label: 'Bounded what-if', short: 'bounded' },
      { id: 'fantasy', label: 'Fantasy', short: 'fantasy' },
      { id: 'none', label: 'No alternative imagined', short: 'no alternative' },
    ];
    const cards = [
      { cat: 'bound',
        text: 'What if we had given licences only to the three teams with a concrete use case, keeping training and budget the same? Would use per licence be higher?',
        why: 'One mutable factor varied, the rest held constant, a comparable outcome. It also points straight at an option for next quarter.' },
      { cat: 'bound',
        text: 'What if we do nothing more for six months? Would use rise anyway as the tool improves and early users show others how?',
        why: 'The “do nothing” baseline is a full counterfactual and the most often skipped. Without it, every intervention looks like the cause of what follows.' },
      { cat: 'fantasy',
        text: 'What if our workforce were twenty years younger and had grown up with AI?',
        why: 'The factor is not mutable in any decision horizon, and the hidden causal claim (age drives use) goes untested. Feels explanatory, yields no option.' },
      { cat: 'fantasy',
        text: 'What if the AI were perfect and needed no prompting at all?',
        why: 'It changes everything at once, so nothing can be compared. A counterfactual should differ from reality minimally, not maximally.' },
      { cat: 'none',
        text: 'Adoption of new tools is always slow. Nothing we could have done would have changed that.',
        why: 'Causal determinism in pure form: one path, no alternatives. It closes the space for agency before anyone has looked.' },
      { cat: 'none',
        text: 'Low use proves people resist AI, so we need a change campaign.',
        why: 'The first causal story becomes fact and then a measure. No rival cause (weak use cases, no time, unclear rules) was imagined: the cookie-jar error.' },
    ];
    const order = ctx.shuffle ? ctx.shuffle(cards.map((c, i) => i)) : cards.map((c, i) => i);
    const pick = {}; let checked = false;
    const situ = htmlEl('div', 'ex-item', '<strong>Situation:</strong> Six months ago a company rolled out 2,000 licences for an AI assistant. 18 percent are in active use. The board must decide whether to invest further. <strong>Goal:</strong> find out what actually drives use.');
    const fig = el('figure');
    const list = el('div', { class: 'ex-items' });
    const msg = htmlEl('div', 'ex-result', '');
    const nums = {}; order.forEach((ci, k) => { nums[ci] = k + 1; });

    function drawFig() {
      const zx = [12, 140, 268];
      let s = V.frame(zx[0], 50, 120, 160, { color: P.plum }) +
        `<rect x="${zx[1]}" y="50" width="120" height="160" rx="10" fill="none" stroke="${P.amber}" stroke-width="3" stroke-dasharray="8 6"/>` +
        V.rect(zx[2], 50, 120, 160, { fill: 'none', stroke: P.coral, sw: 3, r: 10 });
      cats.forEach((c, i) => { s += V.text(zx[i] + 60, 36, c.short, { size: 13, bold: true, fill: [P.plum, P.amber, P.coral][i] }); });
      const filled = [0, 0, 0];
      order.forEach((ci) => {
        const p = pick[ci]; if (!p) return;
        const zi = cats.findIndex(c => c.id === p); const k = filled[zi]++;
        const x = zx[zi] + 26 + (k % 3) * 34, y = 80 + Math.floor(k / 3) * 38;
        const col = checked ? (cards[ci].cat === p ? P.ok : P.bad) : P.ink;
        s += V.circle(x, y, 14, { fill: col, cls: 'a-pop' }) + V.text(x, y + 5, String(nums[ci]), { size: 13, bold: true, fill: '#fff' });
      });
      const n = Object.keys(pick).length;
      s += V.text(200, 240, `${n} of ${cards.length} placed`, { size: 13, bold: true, fill: P.muted });
      fig.innerHTML = V.wrap(s);
    }

    const checkBtn = el('button', { class: 'btn', type: 'button', disabled: true, onclick: check }, 'Check');
    const resetBtn = el('button', { class: 'btn secondary', type: 'button', onclick: reset }, 'Reset');

    order.forEach((ci) => {
      const c = cards[ci];
      const item = el('div', { class: 'ex-item' });
      const btns = el('div', { class: 'ex-cats' });
      cats.forEach(k => {
        const b = el('button', { type: 'button', onclick: () => {
          if (checked) return; pick[ci] = k.id;
          [...btns.children].forEach(x => x.classList.toggle('sel', x === b));
          drawFig(); checkBtn.disabled = Object.keys(pick).length < cards.length;
        } }, k.label);
        btns.append(b);
      });
      item.append(htmlEl('div', 'txt', `<strong>${nums[ci]}.</strong> ${c.text}`), btns, htmlEl('div', 'ex-why', c.why));
      c.node = item; list.append(item);
    });

    function check() {
      checked = true; let ok = 0;
      cards.forEach((c, ci) => { const good = pick[ci] === c.cat; if (good) ok++; c.node.classList.add('checked', good ? 'ok' : 'bad'); });
      drawFig();
      msg.textContent = `${ok} of ${cards.length} correct. Look at the “do nothing” card: in real board papers this baseline is the one most often missing. And no bounded variant answers the question; each only makes one cause testable.`;
      msg.className = 'ex-result' + (ok >= 5 ? ' good' : '');
      done();
    }
    function reset() {
      checked = false; Object.keys(pick).forEach(k => delete pick[k]);
      cards.forEach(c => { c.node.classList.remove('checked', 'ok', 'bad'); c.node.querySelectorAll('.ex-cats button').forEach(b => b.classList.remove('sel')); });
      checkBtn.disabled = true; msg.textContent = ''; msg.className = 'ex-result'; drawFig();
    }

    host.append(situ, fig, list, el('div', { class: 'btnrow' }, checkBtn, resetBtn), msg);
    drawFig();
  }

  window.FRAMERS.register({
    id: 'u04', number: 4, kind: 'chapter', color: '#17A398', minutes: 20,
    title: 'Counterfactuals',
    tagline: 'Imagining worlds that do not exist is how we assign responsibility, test causes and find options in the one that does.',
    icon: (c) => `<svg viewBox="0 0 44 44"><circle cx="8" cy="34" r="4" fill="${c}"/><path d="M11,31 L22,20 L36,8" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/><path d="M22,20 L37,26" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/></svg>`,
    hook: '<p>There is exactly one Earth, and it has warmed. Is that us? No measurement can tell, because the Earth where humans burned no coal cannot be measured. So in 1988 a climate model built it, and the comparison changed the debate. Every “this measure worked” rests on such a world nobody observed.</p>',
    objectives: [
      'Explain why data shows correlation and how a counterfactual comparison turns it into attribution.',
      'Distinguish a bounded counterfactual from fantasy and from causal determinism.',
      'Judge where the human part lies when machines generate scenarios.',
    ],
    film: { title: 'Counterfactuals in six scenes', scenes },
    sections: [
      { id: 's1', heading: 'A second world, built on purpose',
        body: '<p>In 1856 Eunice Foote showed that air rich in carbonic acid gas heats up more in the sun. Causality was known early; attribution stayed open. How much of the warming is human? Inez Fung, the mathematician on James Hansen’s NASA team, put it plainly: temperature and CO₂ curves “do not tell of cause and effect”. Her model simulated an Earth like ours minus human emissions. The difference between the two worlds is the human share.</p><p>That is the structure of every useful counterfactual: <strong>keep the causal model, change one factor, play it forward, compare</strong>. The referee in the 2018 World Cup final did it in a second: without the defender’s head, would the keeper have saved the free kick? Yes, so it became an own goal.</p><p>Counterfactuals are not daydreams. They are <strong>goal-directed</strong> and lean on causal knowledge. That is also their limit: a model missing a cause produces a confident but wrong second world.</p>',
        visual: { caption: 'Anatomy of a counterfactual: everything held constant except one factor. The difference in outcome is that factor’s effect, under the model’s assumptions.',
          svg: (l) => {
            let s = V.text(20, 42, 'World as it is', { size: 13, bold: true, anchor: 'start' });
            s += V.text(20, 152, 'Imagined world', { size: 13, bold: true, anchor: 'start', fill: P.teal, cls: 'a-fade', delay: .6 });
            ['A', 'B', 'C', 'D'].forEach((f, i) => {
              const x = 20 + i * 58;
              s += V.rect(x, 58, 46, 40, { fill: P.paper, stroke: P.ink }) + V.text(x + 23, 84, f, { size: 15, bold: true });
              const changed = i === 2;
              s += V.rect(x, 168, 46, 40, { fill: changed ? P.teal : P.paper, stroke: changed ? P.teal : P.line, cls: 'a-pop', delay: .8 + i * .15 }) +
                V.text(x + 23, 194, changed ? 'C′' : f, { size: 15, bold: true, fill: changed ? '#fff' : P.muted, cls: 'a-fade', delay: .8 + i * .15 });
            });
            s += V.arrow(255, 78, 300, 78, { color: 'ink', cls: 'a-draw', delay: .3 }) + V.circle(325, 78, 20, { fill: P.coral, cls: 'a-pop', delay: .5 }) + V.text(325, 84, 'Y', { size: 15, bold: true, fill: '#fff' });
            s += V.arrow(255, 188, 300, 188, { color: 'teal', cls: 'a-draw', delay: 1.5 }) + V.circle(325, 188, 20, { fill: P.teal, cls: 'a-pop', delay: 1.7 }) + V.text(325, 194, 'Y′', { size: 15, bold: true, fill: '#fff', cls: 'a-fade', delay: 1.7 });
            s += V.line(362, 80, 362, 186, { stroke: P.ink, sw: 2, cls: 'a-draw', delay: 2.1 }) + V.text(380, 137, 'Δ', { size: 18, bold: true, cls: 'a-pop', delay: 2.3 });
            s += V.text(120, 240, 'grey = held constant', { size: 12, fill: P.muted, cls: 'a-fade', delay: 2.5 });
            return V.wrap(s);
          } },
        keyIdea: 'Responsibility is never observed. It is the difference between the world we have and a world we construct.' },

      { id: 's2', heading: 'The antidote to the first story',
        body: '<p>Causal reasoning locks onto the first plausible story: the cookie jar is empty, so the child did it. The authors call this <strong>causal determinism</strong>, one path treated as the only one. Imagining alternatives brings rival causes and options into view; causality explains, only alternatives create a choice.</p><p>We train this early. Alison Gopnik’s “zando” experiments show three-year-olds pretending that a box is a music machine and a block its trigger, then swapping roles on request; better pretenders reason better about counterfactuals. Adults keep training through stories, games and, institutionally, the case method: Langdell at Harvard Law (1870), later Harvard Business School, differential diagnosis in medicine, film study in sport. The common mechanism is a realistic but varied situation, a decision, and alternatives to argue over.</p><p>The dark side is real too: “if only” thinking fuels regret, and hindsight makes the alternative look obvious afterwards.</p>' },

      { id: 's3', heading: 'Machines, rare cases and boundaries',
        body: '<p>Self-driving cars learned from millions of real miles and still failed at the unusual, because reality is mostly ordinary. Waymo’s answer was Carcraft, a simulation in which engineers design rare, “spicy” scenarios that the system then varies automatically (“fuzzing”): a car slightly faster, the same scene at night, a jogger added.</p><p>The authors read this as proof that machines cannot generate counterfactuals themselves. That has aged: generative models now produce scenarios on request. What remains human is less generating than <strong>choosing</strong>: which scenarios matter for which goal, and who answers for the selection.</p><p>Imagination is useless if unbounded. Kennedy’s advisers stayed within military and diplomatic options; Fung’s model kept the laws of physics. Useful counterfactuals need <strong>constraints</strong>, the subject of the next unit.</p>',
        visual: { caption: 'Real data piles up where situations are common. The dangerous tail is nearly empty; Carcraft fills it with invented scenarios and their variations.',
          svg: (l) => {
            let s = V.line(40, 200, 375, 200, { stroke: P.ink }) + V.line(40, 200, 40, 30, { stroke: P.ink });
            s += `<path d="M40,200 L40,45 C90,50 120,150 190,180 C250,195 320,198 375,199 L375,200 Z" fill="${P.muted}" opacity=".35" class="a-fade"/>`;
            s += V.path('M40,45 C90,50 120,150 190,180 C250,195 320,198 375,199', { stroke: P.muted, sw: 3, cls: 'a-draw' });
            s += V.text(95, 120, 'ordinary', { size: 13, bold: true, cls: 'a-fade', delay: .5 });
            [[240, 150], [290, 130], [340, 160]].forEach(([x, y], i) => {
              s += V.dots(6, x - 20, y - 16, 40, 32, { seed: 3 + i, fill: P.teal, r: 3, opacity: .9, cls: 'a-fade', delay: 1.6 + i * .2 });
              s += V.circle(x, y, 9, { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: 1.1 + i * .2 });
            });
            s += V.text(290, 100, 'invented by people', { size: 12, bold: true, fill: P.ink, cls: 'a-fade', delay: 1.4 });
            s += V.text(208, 228, 'common  →  rare', { size: 13, fill: P.muted, cls: 'a-fade', delay: .3 });
            s += V.text(30, 22, 'data', { size: 12, fill: P.muted, anchor: 'start' });
            return V.wrap(s);
          } } },
    ],
    exercise: {
      type: 'custom',
      title: 'The what-if workbench',
      instructions: 'A board is looking at weak adoption of an AI assistant. Classify each statement: bounded counterfactual (one mutable factor varied, rest held constant), fantasy (unbounded or immutable), or no alternative at all (causal determinism). Then check.',
      render: renderWorkbench,
    },
    caseStudy: {
      title: 'Kennedy, twice: the Bay of Pigs and the missile crisis',
      body: '<p>In April 1961 John F. Kennedy approved a plan inherited from his predecessor: Cuban exiles would land at the Bay of Pigs and topple Castro. Nobody seriously pushed an alternative, doubts stayed private, and the invasion collapsed within days. Irving Janis later made it a founding example of “groupthink”.</p><p>In October 1962 aerial photos showed Soviet missile sites on Cuba. The military recommended an air strike. This time Kennedy asked his advisers for as many readings and responses as they could generate, across rank and agency lines. The field was narrowed to two plans, air strike and naval blockade, argued against each other in earnest. He chose the blockade, plus a quiet offer to withdraw US missiles from Turkey, which let Moscow back down.</p>',
      lesson: 'The difference was not a smarter president but a different process: alternatives made mandatory, then deliberately narrowed. Ask of any big decision: who was tasked with producing the option not chosen?',
    },
    reflection: {
      intro: 'The first causal story always feels like the truth, so use a real case.',
      prompts: [
        'Take a recent success or failure in your area that is already “explained”. Write the official causal story, then one rival cause nobody has examined. What evidence would tell them apart?',
        'For a change initiative you are part of: describe the “we do nothing” world twelve months from now. Is it stable, or does it drift? How does that change the business case?',
      ],
      placeholder: 'Official story: … Rival cause: … What would tell them apart: …',
    },
    quiz: [
      { case: '<p>In the Second World War the statistician Abraham Wald, working for Columbia University’s Statistical Research Group, analysed damage on bombers returning from missions. Returning planes showed fewer hits around the engines than on the fuselage. The obvious move was to add armour where the holes clustered. Wald recommended armour where they were missing.</p>',
        q: 'Which imagined comparison justified Wald’s recommendation?',
        options: [
          { text: 'Picturing the bombers that never returned, which were presumably hit where survivors show few holes.', why: 'Correct. Wald reasoned about the unobserved world of lost planes. If hits fall roughly evenly, missing holes mark the places where a hit was fatal.' },
          { text: 'Comparing bombers from different squadrons to see which crews had flown the most dangerous routes.', why: 'A fair comparison for crew risk, but it still looks only at planes that came back. It cannot reveal where the lost planes were hit.' },
          { text: 'Imagining a bomber armoured everywhere, so that no single hit could ever bring it down.', why: 'Fantasy: it changes everything at once and ignores weight. Armour costs speed and range, so the real question was where a limited amount helps most.' },
          { text: 'Gathering damage data from many more returning bombers until the pattern became statistically solid.', why: 'More survivors only sharpen the biased picture. Larger samples help when data is representative; here the missing planes were the whole point.' },
        ],
        answer: 0,
        explain: 'Data on what came back shows only half the world. The useful counterfactual asks what the missing cases would show, and it can reverse the obvious action.' },

      { case: '<p>Before a project starts, the psychologist Gary Klein has the team assume it has already failed spectacularly. Each member then writes down, alone, every reason for the failure, including ones they would not normally voice. Klein described this “premortem” in Harvard Business Review in 2007, drawing on research showing that imagining an outcome as certain makes people produce more explanations for it.</p>',
        q: 'What separates the premortem from simply asking “what could go wrong?”',
        options: [
          { text: 'It yields calibrated failure probabilities that a standard risk register cannot provide.', why: 'The premortem produces reasons, not numbers. For calibrated probabilities you would use quantitative risk analysis or reference-class forecasting instead.' },
          { text: 'It lets the team imagine any disaster at all, however remote from the actual plan.', why: 'Unbounded disasters yield nothing to act on. The premortem fixes this plan and this team, so each imagined failure points to a possible fix.' },
          { text: 'It treats one concrete failure as fact, so people explain how it happened.', why: 'Correct. A definite imagined outcome triggers causal explanation, and the assumed failure makes doubts legitimate rather than disloyal. A bounded counterfactual aimed at a decision.' },
          { text: 'It replaces the optimistic plan with a worst-case plan that the team then commits to.', why: 'The failed future is a probe, not a new plan. Committing to the worst case would be another single path, just a gloomier one.' },
        ],
        answer: 2,
        explain: 'Imagining a specific outcome as already real turns vague worry into causal stories you can check, while there is still time to change the plan.' },

      { case: '<p>After US Airways Flight 1549 ditched in the Hudson in 2009, the NTSB tested in simulators whether it could have reached an airport. Briefed pilots who turned back the moment thrust was lost landed safely in 8 of 15 valid runs. One run added a 35-second delay for recognising the problem and deciding; that return to LaGuardia failed.</p>',
        q: 'Why did the added delay matter for judging the captain’s choice?',
        options: [
          { text: 'It made the test harsher, so that any remaining doubt about the outcome would favour the crew.', why: 'Not leniency but realism. The NTSB noted the immediate turns ignored real-world factors; the delay restored them rather than tilting the result.' },
          { text: 'It showed that simulators cannot answer counterfactual questions about real accidents at all.', why: 'Too strong. The simulator answered well once its assumptions matched reality. The flaw lay in the setup, not in simulating as such.' },
          { text: 'It proved the airport was unreachable, so no alternative decision ever existed for the crew.', why: 'One run proves no impossibility, and the claim slides into causal determinism. It shows the immediate-turn successes rested on an unrealistic assumption.' },
          { text: 'It kept the imagined world identical to the real one except for the choice judged.', why: 'Correct. Instant turns smuggled in knowledge the crew did not have. A fair counterfactual varies one factor and holds the rest, including human limits, constant.' },
        ],
        answer: 3,
        explain: 'Counterfactuals used to assign blame must differ minimally from reality. Hindsight that removes uncertainty produces a confident but unfair second world.' },

      { case: '<p>In the early 1970s, Pierre Wack’s planning group at Royal Dutch Shell stopped presenting a single oil forecast. Instead it gave managers several internally consistent scenarios, including one in which producer countries sharply raised prices. When the 1973 oil crisis hit, Shell is widely credited with having adjusted faster than its rivals.</p>',
        q: 'What made these scenarios useful by the standard of this chapter?',
        options: [
          { text: 'One of them happened to predict the price shock more accurately than rival forecasts did.', why: 'Hitting the right scenario is partly luck. Wack himself stressed that the aim was not prediction but changing how managers saw their situation.' },
          { text: 'They replaced one assumed path with several causally coherent alternatives managers could act on.', why: 'Correct. A single forecast is causal determinism with numbers. Bounded, plausible alternatives opened options and prepared decisions before the event.' },
          { text: 'They gave managers a worst-case plan to commit to, so Shell was hedged against disaster.', why: 'Committing to one gloomy scenario is again a single track. The scenarios were rival plausible stories held side by side, not one hedge plan.' },
          { text: 'They rested on better oil-market data than the forecasting models Shell had used before.', why: 'Better data within one frame deepens the single track. The gain came from structuring alternatives, not from the quality of inputs.' },
        ],
        answer: 1,
        explain: 'Several bounded, causally grounded alternatives beat one precise forecast, because they turn understanding into prepared choices.' },

      { case: '<p>Self-driving cars logged millions of real miles yet still failed in rare situations, because ordinary driving dominates the data. Waymo built Carcraft: engineers design unusual, “spicy” scenarios, and the system varies each one thousands of times, changing speeds, light and road users. Today a language model could also propose such scenarios on request.</p>',
        q: 'Given generative AI, where does the human contribution now mainly lie?',
        options: [
          { text: 'In inventing every rare scenario by hand, since machine-made scenarios cannot be trusted.', why: 'This defends the 2021 thesis too literally. Generation is no longer the bottleneck; refusing machine help only narrows the search.' },
          { text: 'In collecting enough real driving data that rare events appear on their own.', why: 'This is the strategy that failed. Rare cases stay rare in real data; that distribution problem is why simulation was needed.' },
          { text: 'In choosing which scenarios matter for the goal and answering for that selection.', why: 'Correct. Machines can produce counterfactuals at scale; owning the goal, the boundaries and the accountability for what counts remains human.' },
          { text: 'In checking that each machine-made scenario is physically realistic before it is used.', why: 'Realism checks matter, but physics engines increasingly automate them. A realistic scenario can still be irrelevant; deciding relevance is the part nobody can delegate.' },
        ],
        answer: 2,
        explain: 'The book’s machine claim survives only in a narrower form: humans select and bound counterfactuals and are accountable for the choice.' },
    ],
    flashcards: [
      { front: 'Counterfactual', back: 'A deliberately imagined alternative world, built with causal knowledge for a goal: understand, attribute, or decide.' },
      { front: 'Why Fung’s model mattered', back: 'Data showed CO₂ and temperature rising together. Only a modelled Earth without human emissions made the human share visible.' },
      { front: 'Causal determinism', back: 'Locking onto one causal path as the only possible one. Counterfactuals bring rival causes and options into view.' },
      { front: 'The do-nothing baseline', back: 'What would have happened without the intervention. The most skipped counterfactual, and the one that exposes regression to the mean.' },
      { front: 'Fuzzing (Carcraft)', back: 'Systematically varying a human-designed rare scenario (speed, light, an extra pedestrian) to cover the cases around it.' },
    ],
    critique: [
      { claim: 'Computers cannot generate counterfactuals on their own; humans have to supply them (Carcraft).',
        challenge: 'Shaky already in 2021, when adversarial scenario search existed, and outdated now: generative models produce scenarios and rival explanations on demand, and Pearl-style causal models compute counterfactuals formally. The defensible core is narrower: the machine does not own the goal, does not decide which scenarios matter and is not accountable for the selection. That is a claim about responsibility, not capability.' },
      { claim: 'Counterfactual thinking brings broad benefits: less determinism, better causal reasoning, access to implicit knowledge, agency.',
        challenge: 'The list is assembled from scattered studies and anecdotes, not derived from one theory, and it underplays counter-evidence: “if only” thinking drives regret and rumination (Roese), Kahneman and Miller’s norm theory shows how imagined alternatives distort blame, and vivid simulations breed overconfidence. Counterfactuals are a powerful tool with a known failure profile.' },
      { claim: 'Kennedy’s handling of the missile crisis shows counterfactual thinking overcoming causal determinism.',
        challenge: 'It is better read as process design: subgroups, designated sceptics, the president absent from some sessions. Historians also stress luck and near-misses nobody controlled, such as the Soviet submarine B-59. A success selected after the fact cannot show that the method rather than circumstance caused the outcome; that would itself require a counterfactual.' },
    ],
    summary: [
      'Data shows what happens together; only a comparison with a world that did not happen establishes responsibility.',
      'Useful counterfactuals are goal-directed: keep the causal model, change one factor, play it forward, compare.',
      'They counter causal determinism by bringing rival causes and options into view, and organisations can make that mandatory, as Kennedy did in 1962.',
      'Machines can now generate scenarios, but choosing and bounding them remains a human responsibility.',
    ],
    glossary: [
      { term: 'Counterfactual', def: 'An imagined alternative to what is or was, constructed with causal knowledge to serve a goal.' },
      { term: 'Causal determinism', def: 'The assumption that only one causal path was or is possible; it closes off options and rival explanations.' },
      { term: 'Do-nothing baseline', def: 'The counterfactual world without the intervention, against which any claimed effect must be measured.' },
      { term: 'Fuzzing', def: 'Automated variation of a base scenario to explore nearby cases; in Carcraft, applied to human-invented rare scenarios.' },
    ],
  });
})();
