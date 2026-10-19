/* u04 — Kontrafaktisches / Counterfactuals (chapter 4). */
(function () {
  const P = V.palette;
  const de = (lang) => lang === 'de';

  /* ---------- film scenes ---------- */
  const scenes = [
    { duration: 6000,
      caption: { en: '<b>Data shows that things move together, not who is responsible.</b> CO₂ and temperature rise in parallel; the graph alone cannot say how much of that is us.', de: '<b>Daten zeigen, dass sich Dinge gemeinsam bewegen, nicht, wer verantwortlich ist.</b> CO₂ und Temperatur steigen parallel; die Kurve allein sagt nicht, wie viel davon wir sind.' },
      svg: (l) => V.wrap(
        V.line(50, 30, 50, 210, { stroke: P.ink }) + V.line(50, 210, 375, 210, { stroke: P.ink }) +
        V.path('M50,195 C160,190 250,160 365,70', { stroke: P.sky, sw: 3.5, cls: 'a-draw' }) +
        V.path('M50,200 L80,196 L110,201 L140,192 L170,195 L200,185 L230,182 L260,166 L290,158 L320,136 L350,112 L365,104', { stroke: P.coral, sw: 3, cls: 'a-draw', delay: .5 }) +
        V.text(300, 70, 'CO₂', { size: 14, bold: true, fill: P.sky, cls: 'a-fade', delay: 1 }) +
        V.text(318, 150, de(l) ? 'Temperatur' : 'Temperature', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.3 }) +
        V.text(212, 242, de(l) ? 'Korrelation ≠ Verantwortung' : 'Correlation ≠ responsibility', { size: 15, bold: true, cls: 'a-rise', delay: 2 })) },

    { duration: 6500,
      caption: { en: '<b>The second Earth exists only in a model.</b> Inez Fung’s team simulated a planet without human CO₂; the gap between the two worlds is our share.', de: '<b>Die zweite Erde existiert nur im Modell.</b> Das Team um Inez Fung simulierte einen Planeten ohne menschliches CO₂; die Lücke zwischen beiden Welten ist unser Anteil.' },
      svg: (l) => V.wrap(
        V.text(110, 30, de(l) ? 'mit uns' : 'with us', { size: 13, bold: true, cls: 'a-fade' }) +
        V.text(290, 30, de(l) ? 'ohne uns' : 'without us', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: .8 }) +
        V.circle(110, 85, 42, { fill: P.coral, cls: 'a-pop', delay: .2 }) + V.text(110, 90, de(l) ? 'real' : 'real', { size: 13, bold: true, fill: '#fff', cls: 'a-fade', delay: .4 }) +
        `<circle cx="290" cy="85" r="42" fill="none" stroke="${P.teal}" stroke-width="3" stroke-dasharray="7 5" class="a-pop" style="--d:.8s"/>` +
        V.text(290, 90, de(l) ? 'Modell' : 'model', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: 1 }) +
        V.rect(95, 145, 30, 75, { fill: P.coral, stroke: P.ink, cls: 'a-rise', delay: 1.4 }) +
        V.rect(275, 180, 30, 40, { fill: P.teal, stroke: P.ink, cls: 'a-rise', delay: 1.6 }) +
        V.line(140, 145, 260, 145, { stroke: P.muted, dash: '4 4', cls: 'a-draw', delay: 2 }) + V.line(140, 180, 260, 180, { stroke: P.muted, dash: '4 4', cls: 'a-draw', delay: 2 }) +
        V.text(200, 168, de(l) ? 'unser Anteil' : 'our share', { size: 14, bold: true, cls: 'a-pop', delay: 2.4 }) +
        V.text(200, 248, de(l) ? 'Vergleich zweier Welten' : 'Comparing two worlds', { size: 13, fill: P.muted, cls: 'a-fade', delay: 2.8 })) },

    { duration: 6500,
      caption: { en: '<b>An own goal is decided by an imagined path.</b> In the 2018 World Cup final the referee had to picture where the ball would have gone without the defender’s head.', de: '<b>Ob Eigentor oder nicht, entscheidet eine gedachte Flugbahn.</b> Im WM-Finale 2018 musste der Schiedsrichter sich vorstellen, wohin der Ball ohne den Kopf des Verteidigers geflogen wäre.' },
      svg: (l) => V.wrap(
        V.rect(330, 55, 50, 150, { fill: 'none', stroke: P.ink, sw: 3, r: 2 }) +
        V.person(355, 158, { color: P.sky, cls: 'a-fade' }) +
        V.person(200, 150, { color: P.muted, cls: 'a-fade', delay: .2 }) +
        V.circle(40, 215, 7, { fill: P.ink, cls: 'a-pop' }) +
        V.path('M40,215 Q110,120 200,122', { stroke: P.ink, sw: 2.5, cls: 'a-draw', delay: .4 }) +
        V.path('M200,122 Q290,60 362,72', { stroke: P.coral, sw: 3.5, cls: 'a-draw', delay: 1.2 }) +
        V.path('M200,122 Q280,125 345,138', { stroke: P.teal, sw: 3, dash: '7 6', cls: 'a-draw', delay: 2.2 }) +
        V.text(270, 58, de(l) ? 'real: Tor' : 'real: goal', { size: 13, bold: true, fill: P.coral, cls: 'a-fade', delay: 1.6 }) +
        V.text(255, 175, de(l) ? 'gedacht: gehalten' : 'imagined: saved', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: 2.8 }) +
        V.text(200, 248, de(l) ? 'Urteil über eine Welt, die es nie gab' : 'A verdict on a world that never was', { size: 13, cls: 'a-fade', delay: 3.4 })) },

    { duration: 6000,
      caption: { en: '<b>Causality and counterfactuals need each other.</b> Without causes, events are noise; without imagined alternatives, we are prisoners of what is.', de: '<b>Kausalität und Kontrafaktisches brauchen einander.</b> Ohne Ursachen sind Ereignisse Rauschen; ohne gedachte Alternativen sind wir Gefangene dessen, was ist.' },
      svg: (l) => V.wrap(
        V.circle(105, 130, 46, { fill: P.coral, cls: 'a-pop' }) + V.text(105, 135, de(l) ? 'Kausalität' : 'Causality', { size: 13, bold: true, fill: '#fff', cls: 'a-fade', delay: .2 }) +
        V.circle(295, 130, 46, { fill: P.teal, cls: 'a-pop', delay: .4 }) + V.text(295, 135, de(l) ? 'Was-wäre-wenn' : 'What-if', { size: 13, bold: true, fill: '#fff', cls: 'a-fade', delay: .6 }) +
        V.path('M140,95 Q200,45 258,95', { stroke: P.coral, sw: 3, cls: 'a-draw', delay: 1 }) + V.arrow(250, 88, 260, 97, { color: 'coral', cls: 'a-fade', delay: 1.6 }) +
        V.path('M258,165 Q200,215 142,165', { stroke: P.teal, sw: 3, cls: 'a-draw', delay: 1.8 }) + V.arrow(150, 172, 140, 163, { color: 'teal', cls: 'a-fade', delay: 2.4 }) +
        V.text(200, 45, de(l) ? 'macht es sinnvoll' : 'makes it meaningful', { size: 13, cls: 'a-fade', delay: 1.4 }) +
        V.text(200, 232, de(l) ? 'macht es handlungsfähig' : 'makes it actionable', { size: 13, cls: 'a-fade', delay: 2.2 })) },

    { duration: 6500,
      caption: { en: '<b>Pretend play is training in what-if.</b> In Gopnik’s zando test, three-year-olds treat a box as a machine and a block as its trigger, then swap the roles on request.', de: '<b>So-tun-als-ob ist Training im Was-wäre-wenn.</b> Im Zando-Test von Alison Gopnik behandeln Dreijährige eine Kiste als Maschine und einen Klotz als Auslöser und tauschen die Rollen auf Zuruf.' },
      svg: (l) => V.wrap(
        V.person(70, 175, { color: P.ink, scale: .9, cls: 'a-fade' }) +
        `<rect x="160" y="130" width="100" height="70" rx="6" fill="${P.paper}" stroke="${P.teal}" stroke-width="3" stroke-dasharray="8 5" class="a-pop" style="--d:.4s"/>` +
        V.text(210, 170, de(l) ? '„Maschine“' : '“machine”', { size: 14, bold: true, fill: P.teal, cls: 'a-fade', delay: .7 }) +
        V.rect(120, 205, 30, 26, { fill: P.amber, cls: 'a-pop', delay: 1.1 }) + V.text(135, 250, de(l) ? 'Zando' : 'zando', { size: 12, bold: true, cls: 'a-fade', delay: 1.2 }) +
        V.rect(280, 205, 30, 26, { fill: P.plum, cls: 'a-pop', delay: 1.3 }) + V.text(295, 250, de(l) ? 'kein Zando' : 'not a zando', { size: 12, bold: true, cls: 'a-fade', delay: 1.4 }) +
        V.arrow(150, 205, 178, 196, { color: 'ink', cls: 'a-draw', delay: 1.7 }) +
        V.text(255, 110, '♪', { size: 28, fill: P.teal, cls: 'a-float', delay: 2.1 }) + V.text(290, 90, '♪', { size: 22, fill: P.teal, cls: 'a-float', delay: 2.4 }) +
        V.text(200, 45, de(l) ? 'Kiste = Maschine. Als ob.' : 'Box = machine. As if.', { size: 15, bold: true, cls: 'a-rise', delay: 2.6 })) },

    { duration: 7000,
      caption: { en: '<b>One option is a trap; many options, then narrow.</b> At the Bay of Pigs Kennedy’s team saw one plan. In the missile crisis he demanded alternatives, debated two, and chose the blockade.', de: '<b>Eine Option ist eine Falle; erst viele, dann eingrenzen.</b> In der Schweinebucht sah Kennedys Team nur einen Plan. In der Kubakrise verlangte er Alternativen, ließ zwei streiten und wählte die Blockade.' },
      svg: (l) => {
        let s = V.line(200, 25, 200, 235, { stroke: P.line, sw: 2 });
        s += V.text(100, 40, '1961', { size: 14, bold: true, cls: 'a-fade' }) + V.text(300, 40, '1962', { size: 14, bold: true, cls: 'a-fade', delay: 1.2 });
        s += V.circle(40, 130, 9, { fill: P.ink, cls: 'a-pop', delay: .2 }) + V.arrow(50, 130, 120, 130, { color: 'ink', cls: 'a-draw', delay: .4 });
        s += V.pill(155, 130, de(l) ? 'Invasion' : 'invasion', { fill: P.bad, w: 70, cls: 'a-pop', delay: .8 });
        s += V.text(100, 200, de(l) ? 'ein Plan' : 'one plan', { size: 13, fill: P.bad, bold: true, cls: 'a-fade', delay: 1 });
        s += V.circle(225, 130, 9, { fill: P.ink, cls: 'a-pop', delay: 1.4 });
        const ys = [65, 92, 119, 146, 173, 200];
        ys.forEach((y, i) => { s += V.line(234, 130, 285, y, { stroke: P.teal, sw: 2, cls: 'a-draw', delay: 1.6 + i * .12 }) + V.circle(290, y, 6, { fill: P.teal, cls: 'a-pop', delay: 1.7 + i * .12 }); });
        s += V.arrow(296, 119, 345, 130, { color: 'ink', cls: 'a-draw', delay: 2.6 }) + V.arrow(296, 146, 345, 133, { color: 'ink', cls: 'a-draw', delay: 2.6 });
        s += V.circle(360, 131, 11, { fill: P.ok, cls: 'a-pop', delay: 3 });
        s += V.text(300, 230, de(l) ? 'viele → zwei → Blockade' : 'many → two → blockade', { size: 13, bold: true, fill: P.ok, cls: 'a-fade', delay: 3.2 });
        return V.wrap(s);
      } },

    { duration: 7000,
      caption: { en: '<b>Humans invent the rare cases; the machine varies them.</b> Waymo’s Carcraft adds human-designed “spicy” scenarios to millions of ordinary miles, then fuzzes each one.', de: '<b>Menschen erfinden die seltenen Fälle; die Maschine variiert sie.</b> Waymos Carcraft ergänzt Millionen gewöhnlicher Meilen um von Menschen ausgedachte „spicy“ Szenarien und variiert jedes davon (Fuzzing).' },
      svg: (l) => {
        let s = V.dots(55, 25, 55, 135, 140, { seed: 5, fill: P.muted, r: 4, cls: 'a-fade', stagger: .015 });
        s += V.text(92, 225, de(l) ? 'Alltag: viele Daten' : 'Ordinary: lots of data', { size: 12, bold: true, fill: P.muted, cls: 'a-fade', delay: .8 });
        s += V.person(215, 205, { color: P.ink, cls: 'a-pop', delay: 1.2 });
        const spicy = [[290, 70], [350, 120], [295, 160]];
        spicy.forEach(([x, y], i) => {
          s += V.arrow(225, 175, x - 12, y + 6, { color: 'muted', dash: '4 4', cls: 'a-draw', delay: 1.5 + i * .3 });
          s += V.circle(x, y, 10, { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: 1.7 + i * .3 });
          s += V.dots(7, x - 26, y - 22, 52, 44, { seed: 11 + i, fill: P.teal, r: 3, cls: 'a-pop', stagger: .06, opacity: .9 }).replace(/--d:([\d.]+)s/g, (m, d) => `--d:${(2.8 + i * .2 + +d).toFixed(2)}s`);
        });
        s += V.text(320, 225, de(l) ? 'erfunden, dann variiert' : 'invented, then varied', { size: 12, bold: true, fill: P.teal, cls: 'a-fade', delay: 3.4 });
        return V.wrap(s);
      } },

    { duration: 6500,
      caption: { en: '<b>Useful counterfactuals have a boundary.</b> Kennedy wanted military or diplomatic options, not a band sent to Moscow. Which alternatives are allowed is the topic of the next unit: constraints.', de: '<b>Brauchbares Kontrafaktisches hat eine Grenze.</b> Kennedy wollte militärische oder diplomatische Optionen, keine Musikgruppe nach Moskau. Welche Alternativen erlaubt sind, ist Thema der nächsten Einheit: Constraints.' },
      svg: (l) => {
        let s = '';
        let seed = 21; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
        for (let i = 0; i < 14; i++) { const x = 25 + rnd() * 350, y = 30 + rnd() * 190; const inside = x > 120 && x < 280 && y > 70 && y < 190; if (!inside) s += V.bulb(x, y, { color: P.line, scale: .7, cls: 'a-fade', delay: i * .05 }); }
        s += V.frame(120, 70, 160, 120, { color: P.plum, label: 'Constraints', cls: 'a-pop', delay: 1 });
        [[160, 120], [200, 150], [240, 115]].forEach(([x, y], i) => { s += V.bulb(x, y, { cls: 'a-pop', delay: 1.6 + i * .2 }); });
        s += V.text(200, 245, de(l) ? '→ nächste Einheit: Constraints' : '→ next unit: constraints', { size: 13, bold: true, fill: P.plum, cls: 'a-fade', delay: 2.4 });
        return V.wrap(s);
      } },
  ];

  /* ---------- custom exercise: the what-if workbench ---------- */
  function renderWorkbench(host, ctx) {
    const { lang, el, htmlEl, done } = ctx; const l = de(lang);
    const cats = [
      { id: 'bound', en: 'Bounded what-if', de: 'Begrenztes Was-wäre-wenn', short: { en: 'bounded', de: 'begrenzt' } },
      { id: 'fantasy', en: 'Fantasy', de: 'Fantasie', short: { en: 'fantasy', de: 'Fantasie' } },
      { id: 'none', en: 'No alternative imagined', de: 'Keine Alternative gedacht', short: { en: 'no alternative', de: 'keine Alternative' } },
    ];
    const cards = [
      { cat: 'bound',
        text: { en: 'What if we had given licences only to the three teams with a concrete use case, and kept training, budget and communication the same? Would use per licence be clearly higher?', de: 'Was wäre, wenn wir Lizenzen nur an die drei Teams mit konkretem Anwendungsfall vergeben und Schulung, Budget und Kommunikation gleich gelassen hätten? Wäre die Nutzung pro Lizenz deutlich höher?' },
        why: { en: 'Textbook form: one mutable factor varied (who gets licences), the rest held constant, an outcome you can compare. It also points straight at an option for next quarter.', de: 'Lehrbuchform: ein veränderbarer Faktor variiert (wer Lizenzen bekommt), der Rest konstant gehalten, ein vergleichbares Ergebnis. Und es zeigt direkt auf eine Option fürs nächste Quartal.' } },
      { cat: 'bound',
        text: { en: 'What if we do nothing more for six months? Would use rise anyway as the tool improves and early users show others how?', de: 'Was wäre, wenn wir sechs Monate lang nichts weiter tun? Würde die Nutzung trotzdem steigen, weil das Werkzeug besser wird und frühe Nutzende es anderen zeigen?' },
        why: { en: 'The “do nothing” baseline is a full counterfactual and the most often skipped one. Without it, every intervention looks like the cause of whatever happens next.', de: 'Die „Nichts tun“-Basislinie ist ein vollwertiges Was-wäre-wenn und das am häufigsten übersprungene. Ohne sie sieht jede Maßnahme so aus, als habe sie verursacht, was danach passiert.' } },
      { cat: 'bound',
        text: { en: 'What if all team leads had used the tool visibly in their own meetings, as the leads of two teams did? Compare those two teams with similar ones.', de: 'Was wäre, wenn alle Teamleitungen das Werkzeug sichtbar in ihren eigenen Meetings genutzt hätten, wie es zwei Teamleitungen getan haben? Vergleich diese zwei Teams mit ähnlichen.' },
        why: { en: 'It uses variation that already exists as a natural comparison and varies one factor leadership can influence. The comparison has to control for team type, otherwise it is just a second correlation.', de: 'Nutzt bereits vorhandene Variation als natürlichen Vergleich und variiert einen Faktor, den Führung beeinflussen kann. Der Vergleich muss den Teamtyp berücksichtigen, sonst ist es nur eine zweite Korrelation.' } },
      { cat: 'fantasy',
        text: { en: 'What if our workforce were twenty years younger and had grown up with AI?', de: 'Was wäre, wenn unsere Belegschaft zwanzig Jahre jünger wäre und mit KI aufgewachsen wäre?' },
        why: { en: 'The varied factor is not mutable within any decision horizon, and the hidden causal claim (age drives use) goes untested. It feels explanatory but yields no option.', de: 'Der variierte Faktor ist in keinem Entscheidungshorizont veränderbar, und die versteckte Kausalannahme (Alter treibt Nutzung) bleibt ungeprüft. Fühlt sich erklärend an, liefert aber keine Option.' } },
      { cat: 'fantasy',
        text: { en: 'What if there were no works council and we could simply make daily use mandatory?', de: 'Was wäre, wenn es keinen Betriebsrat gäbe und wir die tägliche Nutzung einfach vorschreiben könnten?' },
        why: { en: 'It deletes a hard constraint instead of working within it. Fantasies like this often reveal a wish (control) more than a cause. Chapter 5 asks: is the factor mutable?', de: 'Streicht einen harten Constraint, statt mit ihm zu arbeiten. Solche Fantasien verraten oft eher einen Wunsch (Kontrolle) als eine Ursache. Kapitel 5 fragt: Ist der Faktor veränderbar?' } },
      { cat: 'fantasy',
        text: { en: 'What if the AI were perfect and needed no prompting at all?', de: 'Was wäre, wenn die KI perfekt wäre und gar keine Eingaben bräuchte?' },
        why: { en: 'It changes everything at once, so nothing can be compared. A counterfactual should differ from reality minimally, not maximally.', de: 'Verändert alles auf einmal, also lässt sich nichts vergleichen. Ein Was-wäre-wenn soll sich minimal von der Wirklichkeit unterscheiden, nicht maximal.' } },
      { cat: 'none',
        text: { en: 'Adoption of new tools is always slow. Nothing we could have done would have changed that.', de: 'Neue Werkzeuge werden immer langsam angenommen. Nichts, was wir hätten tun können, hätte daran etwas geändert.' },
        why: { en: 'Causal determinism in pure form: one path, no alternatives. It closes the space for agency before anyone has looked.', de: 'Kausaler Determinismus in Reinform: ein Pfad, keine Alternativen. Schließt den Raum für Handlungsmacht, bevor jemand hingeschaut hat.' } },
      { cat: 'none',
        text: { en: 'Low use proves people resist AI, so we need a change campaign.', de: 'Die geringe Nutzung beweist, dass die Leute KI ablehnen, also brauchen wir eine Change-Kampagne.' },
        why: { en: 'The first causal story is taken as fact and turned straight into a measure. No rival cause (bad use cases, no time, unclear rules) was imagined: the cookie-jar error.', de: 'Die erste Kausalgeschichte wird als Tatsache genommen und direkt in eine Maßnahme übersetzt. Keine konkurrierende Ursache (schlechte Use Cases, keine Zeit, unklare Regeln) wurde gedacht: der Keksdosen-Fehler.' } },
    ];
    const order = ctx.shuffle ? ctx.shuffle(cards.map((c, i) => i)) : cards.map((c, i) => i);
    const pick = {}; let checked = false;
    const situ = htmlEl('div', 'ex-item', l
      ? '<strong>Lage:</strong> Ein Unternehmen hat vor sechs Monaten 2.000 Lizenzen für einen KI-Assistenten ausgerollt. Aktiv genutzt werden 18 Prozent. Der Vorstand will entscheiden, ob er im nächsten Quartal nachinvestiert. <strong>Ziel des Gedankenexperiments:</strong> herausfinden, was die Nutzung tatsächlich treibt.'
      : '<strong>Situation:</strong> Six months ago a company rolled out 2,000 licences for an AI assistant. 18 percent are in active use. The board must decide whether to invest further next quarter. <strong>Goal of the thought experiment:</strong> find out what actually drives use.');
    const fig = el('figure');
    const list = el('div', { class: 'ex-items' });
    const msg = htmlEl('div', 'ex-result', '');
    const nums = {}; order.forEach((ci, k) => { nums[ci] = k + 1; });

    function drawFig() {
      const zx = [12, 140, 268];
      let s = V.frame(zx[0], 50, 120, 160, { color: P.plum }) +
        `<rect x="${zx[1]}" y="50" width="120" height="160" rx="10" fill="none" stroke="${P.amber}" stroke-width="3" stroke-dasharray="8 6"/>` +
        V.rect(zx[2], 50, 120, 160, { fill: 'none', stroke: P.coral, sw: 3, r: 10 });
      cats.forEach((c, i) => { s += V.text(zx[i] + 60, 36, c.short[lang], { size: 13, bold: true, fill: [P.plum, P.amber, P.coral][i] }); });
      const filled = [0, 0, 0];
      order.forEach((ci) => {
        const p = pick[ci]; if (!p) return;
        const zi = cats.findIndex(c => c.id === p); const k = filled[zi]++;
        const x = zx[zi] + 26 + (k % 3) * 34, y = 80 + Math.floor(k / 3) * 38;
        const col = checked ? (cards[ci].cat === p ? P.ok : P.bad) : P.ink;
        s += V.circle(x, y, 14, { fill: col, cls: 'a-pop' }) + V.text(x, y + 5, String(nums[ci]), { size: 13, bold: true, fill: '#fff' });
      });
      const n = Object.keys(pick).length;
      s += V.text(200, 240, l ? `${n} von ${cards.length} zugeordnet` : `${n} of ${cards.length} placed`, { size: 13, bold: true, fill: P.muted });
      fig.innerHTML = V.wrap(s);
    }

    const checkBtn = el('button', { class: 'btn', type: 'button', disabled: true, onclick: check }, l ? 'Prüfen' : 'Check');
    const resetBtn = el('button', { class: 'btn secondary', type: 'button', onclick: reset }, l ? 'Zurücksetzen' : 'Reset');

    order.forEach((ci) => {
      const c = cards[ci];
      const item = el('div', { class: 'ex-item' });
      const btns = el('div', { class: 'ex-cats' });
      cats.forEach(k => {
        const b = el('button', { type: 'button', onclick: () => {
          if (checked) return; pick[ci] = k.id;
          [...btns.children].forEach(x => x.classList.toggle('sel', x === b));
          drawFig(); checkBtn.disabled = Object.keys(pick).length < cards.length;
        } }, k[lang]);
        btns.append(b);
      });
      item.append(htmlEl('div', 'txt', `<strong>${nums[ci]}.</strong> ${c.text[lang]}`), btns, htmlEl('div', 'ex-why', c.why[lang]));
      c.node = item; list.append(item);
    });

    function check() {
      checked = true; let ok = 0;
      cards.forEach((c, ci) => { const good = pick[ci] === c.cat; if (good) ok++; c.node.classList.add('checked', good ? 'ok' : 'bad'); });
      drawFig();
      msg.textContent = (l ? `${ok} von ${cards.length} richtig. ` : `${ok} of ${cards.length} correct. `) +
        (l ? 'Achte auf Karte mit dem „Nichts tun“: In echten Vorstandsvorlagen fehlt genau diese Basislinie am häufigsten. Und beachte, dass keine der begrenzten Varianten die Frage beantwortet; jede macht nur eine Ursache prüfbar.'
          : 'Look at the “do nothing” card: in real board papers this baseline is the one most often missing. Note also that none of the bounded variants answers the question; each one only makes a cause testable.');
      msg.className = 'ex-result' + (ok >= 6 ? ' good' : '');
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
    id: 'u04', number: 4, kind: 'chapter', color: '#17A398', minutes: 30,
    title: { en: 'Counterfactuals', de: 'Kontrafaktisches' },
    tagline: { en: 'Imagining worlds that do not exist is how we assign responsibility, test causes and find options in the one that does.', de: 'Welten zu denken, die es nicht gibt, ist der Weg, in der wirklichen Welt Verantwortung zuzuschreiben, Ursachen zu prüfen und Optionen zu finden.' },
    icon: (c) => `<svg viewBox="0 0 44 44"><circle cx="8" cy="34" r="4" fill="${c}"/><path d="M11,31 L22,20 L36,8" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/><path d="M22,20 L37,26" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 4"/></svg>`,
    hook: {
      en: '<p>The world has exactly one Earth, and its temperature has risen. Is that us? No measurement can answer, because the Earth in which humans burned no coal does not exist to be measured. In 1988 a climate model built that Earth anyway, and the comparison became the basis of one of the most consequential scientific claims of the century.</p><p>Every judgement of responsibility, every “this measure worked”, rests on a comparison with a world nobody observed. This unit is about doing that comparison well.</p>',
      de: '<p>Es gibt genau eine Erde, und ihre Temperatur ist gestiegen. Waren wir das? Keine Messung kann das beantworten, weil die Erde, auf der Menschen nie Kohle verbrannt haben, nicht existiert und sich nicht messen lässt. 1988 baute ein Klimamodell diese Erde trotzdem, und der Vergleich wurde zur Grundlage einer der folgenreichsten wissenschaftlichen Aussagen des Jahrhunderts.</p><p>Jedes Urteil über Verantwortung, jedes „diese Maßnahme hat gewirkt“ ruht auf einem Vergleich mit einer Welt, die niemand beobachtet hat. In dieser Einheit geht es darum, diesen Vergleich gut zu machen.</p>'
    },
    objectives: [
      { en: 'Explain why data alone establishes correlation, and how a counterfactual model turns it into a claim about responsibility.', de: 'Erklären, warum Daten allein nur Korrelation belegen und wie ein kontrafaktisches Modell daraus eine Aussage über Verantwortung macht.' },
      { en: 'Distinguish a disciplined counterfactual (goal, fixed context, one varied factor) from fantasy and from causal determinism.', de: 'Ein diszipliniertes Was-wäre-wenn (Ziel, fester Kontext, ein variierter Faktor) von Fantasie und von kausalem Determinismus unterscheiden.' },
      { en: 'Assess the book’s claim that machines need humans to supply counterfactuals, in light of generative AI.', de: 'Die These des Buchs, Maschinen bräuchten Menschen als Lieferanten von Kontrafaktischem, im Licht generativer KI beurteilen.' },
    ],
    film: { title: { en: 'Counterfactuals in eight scenes', de: 'Kontrafaktisches in acht Szenen' }, scenes },
    sections: [
      { id: 's1', heading: { en: 'A second world, built on purpose', de: 'Eine zweite Welt, gezielt gebaut' },
        body: {
          en: '<p>In 1856 Eunice Foote showed that air rich in carbonic acid gas heats up more in the sun and cools more slowly. Causality was established early. What remained open for another 130 years was attribution: how much of the observed warming is human? Inez Fung, the mathematician on James Hansen’s NASA team, put it bluntly: temperature and CO₂ curves “do not tell of cause and effect”. Her model simulated an Earth identical to ours except for human emissions. The difference between the two worlds is the human share.</p><p>That is the structure of every useful counterfactual: <strong>keep the causal model, change one factor, play it forward, compare</strong>. The referee in the 2018 World Cup final did the same in a second: without the Croatian defender’s head, would the free kick have gone in? He judged the keeper would have saved it, so the goal became an own goal. Eye-tracking studies with billiard balls show people do this spontaneously: their gaze runs along trajectories the ball never takes. Galileo probably never dropped anything from the tower in Pisa. His argument needs no tower: tie a heavy and a light stone together; if heavy things fell faster, the pair would fall both faster (heavier) and slower (the light one brakes). A contradiction, found entirely in the head.</p><p>The authors insist this is not daydreaming. Counterfactuals are <strong>goal-directed</strong> and lean on causal knowledge. That is also their limit: a model that misses a cause produces a confident but wrong second world.</p>',
          de: '<p>1856 zeigte Eunice Foote, dass Luft mit viel Kohlensäuregas sich in der Sonne stärker erwärmt und langsamer abkühlt. Die Kausalität war früh belegt. Offen blieb für weitere 130 Jahre die Zurechnung: Wie viel der beobachteten Erwärmung ist menschengemacht? Inez Fung, die Mathematikerin im NASA-Team von James Hansen, brachte es auf den Punkt: Temperatur- und CO₂-Kurven sagen nichts über Ursache und Wirkung. Ihr Modell simulierte eine Erde, die unserer gleicht, nur ohne menschliche Emissionen. Die Differenz zwischen beiden Welten ist der menschliche Anteil.</p><p>Das ist die Struktur jedes brauchbaren Was-wäre-wenn: <strong>Kausalmodell behalten, einen Faktor ändern, weiterdenken, vergleichen</strong>. Der Schiedsrichter im WM-Finale 2018 tat dasselbe in einer Sekunde: Wäre der Freistoß ohne den Kopf des kroatischen Verteidigers ins Tor gegangen? Er urteilte, der Torwart hätte gehalten, also wurde es ein Eigentor. Eye-Tracking-Studien mit Billardkugeln zeigen, dass Menschen das spontan tun: Ihr Blick läuft Bahnen ab, die die Kugel nie nimmt. Galileo hat vermutlich nie etwas vom Turm in Pisa fallen lassen. Sein Argument braucht keinen Turm: Binde einen schweren und einen leichten Stein zusammen; fielen schwere Dinge schneller, müsste das Paar zugleich schneller (schwerer) und langsamer (der leichte bremst) fallen. Ein Widerspruch, vollständig im Kopf gefunden.</p><p>Die Autoren bestehen darauf, dass das kein Tagträumen ist. Kontrafaktisches ist <strong>zielgerichtet</strong> und stützt sich auf Kausalwissen. Darin liegt auch seine Grenze: Ein Modell, dem eine Ursache fehlt, erzeugt eine selbstsichere, aber falsche zweite Welt.</p>'
        },
        visual: { caption: { en: 'The anatomy of a counterfactual: everything held constant except one factor. The difference in outcome is the causal effect of that factor, under the assumptions of the model.', de: 'Die Anatomie eines Was-wäre-wenn: alles konstant bis auf einen Faktor. Die Differenz im Ergebnis ist die kausale Wirkung dieses Faktors, unter den Annahmen des Modells.' },
          svg: (l) => {
            let s = V.text(20, 42, de(l) ? 'Welt, wie sie ist' : 'World as it is', { size: 13, bold: true, anchor: 'start' });
            s += V.text(20, 152, de(l) ? 'Gedachte Welt' : 'Imagined world', { size: 13, bold: true, anchor: 'start', fill: P.teal, cls: 'a-fade', delay: .6 });
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
            s += V.text(120, 240, de(l) ? 'grau = konstant gehalten' : 'grey = held constant', { size: 12, fill: P.muted, cls: 'a-fade', delay: 2.5 });
            return V.wrap(s);
          } },
        keyIdea: { en: 'Responsibility is never observed. It is the difference between the world we have and a world we construct.', de: 'Verantwortung wird nie beobachtet. Sie ist die Differenz zwischen der Welt, die wir haben, und einer, die wir konstruieren.' } },

      { id: 's2', heading: { en: 'Where we train it: play, stories, cases', de: 'Wo wir es trainieren: Spiel, Geschichten, Fälle' },
        body: {
          en: '<p>For centuries small children were seen as confused or “pre-causal” (Piaget). Alison Gopnik’s research, known as “theory theory”, argues the opposite: toddlers build and test causal models like scientists. In her zando test, children learn that a funny object placed on a machine makes it play a birthday song. Then the machine is taken away, and the experimenter proposes to pretend that a box is the machine and one of two blocks is the zando. Three-year-olds pick the right block, and switch when the roles are swapped. Children who pretended better also reasoned better about counterfactuals. Gopnik’s quip: children are the species’ “research and development” division, adults do “manufacturing and marketing”.</p><p>The training does not stop. Stories pull us into worlds that do not exist; Greek tragedy asked the audience what the hero could have done differently; games such as Monument Valley go further and let us manipulate an impossible world. Professional education institutionalised it: Langdell at Harvard Law (1870) replaced the lecture with cases and hypothetical variations, Donham carried the method to Harvard Business School, medicine calls it differential diagnosis, athletes call it film study.</p><p>The common mechanism: a realistic but varied situation, a decision to take, and alternatives to argue over.</p>',
          de: '<p>Jahrhundertelang galten kleine Kinder als verwirrt oder „präkausal“ (Piaget). Alison Gopniks Forschung, bekannt als „Theory Theory“, vertritt das Gegenteil: Kleinkinder bauen und testen Kausalmodelle wie Forschende. In ihrem Zando-Test lernen Kinder, dass ein lustig geformtes Objekt auf einer Maschine ein Geburtstagslied auslöst. Dann wird die Maschine weggebracht, und die Versuchsleiterin schlägt vor, so zu tun, als sei eine Kiste die Maschine und einer von zwei Klötzen der Zando. Dreijährige wählen den richtigen Klotz und wechseln, wenn die Rollen getauscht werden. Kinder, die besser so tun konnten als ob, dachten auch besser kontrafaktisch. Gopniks Pointe: Kinder sind die Abteilung „Forschung und Entwicklung“ unserer Art, Erwachsene erledigen „Produktion und Marketing“.</p><p>Das Training hört nicht auf. Geschichten ziehen uns in Welten, die es nicht gibt; die griechische Tragödie fragte das Publikum, was der Held hätte anders machen können; Spiele wie Monument Valley gehen weiter und lassen uns eine unmögliche Welt manipulieren. Die Berufsausbildung hat es institutionalisiert: Langdell an der Harvard Law School (1870) ersetzte die Vorlesung durch Fälle und hypothetische Abwandlungen, Donham trug die Methode an die Harvard Business School, die Medizin nennt es Differenzialdiagnose, der Sport Filmstudium.</p><p>Der gemeinsame Mechanismus: eine realistische, aber variierte Lage, eine Entscheidung, die zu treffen ist, und Alternativen, um die gestritten wird.</p>'
        },
        visual: { caption: { en: 'One capability, four training grounds. The further right, the more the counterfactuals are tied to a decision someone has to take.', de: 'Eine Fähigkeit, vier Trainingsfelder. Je weiter rechts, desto enger sind die Alternativen an eine Entscheidung gebunden, die jemand treffen muss.' },
          svg: (l) => {
            const st = de(l) ? ['Spiel', 'Geschichte', 'Game', 'Fall'] : ['Play', 'Story', 'Game', 'Case'];
            const sub = de(l) ? ['als ob', 'miterleben', 'eingreifen', 'entscheiden'] : ['as if', 'live through', 'intervene', 'decide'];
            let s = V.line(40, 120, 360, 120, { stroke: P.line, sw: 4, cls: 'a-draw' });
            st.forEach((t, i) => {
              const x = 55 + i * 97;
              s += V.circle(x, 120, 24, { fill: P.teal, opacity: .4 + i * .2, cls: 'a-pop', delay: .3 + i * .3 }) + V.text(x, 125, String(i + 1), { size: 14, bold: true, fill: '#fff', cls: 'a-fade', delay: .3 + i * .3 });
              s += V.text(x, 78, t, { size: 14, bold: true, cls: 'a-fade', delay: .4 + i * .3 }) + V.text(x, 170, sub[i], { size: 12, fill: P.muted, cls: 'a-fade', delay: .5 + i * .3 });
            });
            s += V.arrow(60, 215, 340, 215, { color: 'teal', cls: 'a-draw', delay: 1.8 }) + V.text(200, 240, de(l) ? 'mehr Bindung an eine Entscheidung' : 'more tied to a decision', { size: 12, fill: P.teal, bold: true, cls: 'a-fade', delay: 2 });
            return V.wrap(s);
          } } },

      { id: 's3', heading: { en: 'Five benefits, and what they rest on', de: 'Fünf Vorteile und worauf sie ruhen' },
        body: {
          en: '<p>The authors list five benefits.</p><ol><li><strong>Antidote to causal determinism.</strong> Causal reasoning locks onto the first plausible story (the cookie jar is empty, so the child did it). Imagining alternatives brings rival causes into view.</li><li><strong>Better causal thinking.</strong> Ruth Byrne’s experiments suggest counterfactual thinking improves causal reasoning more than the reverse, because it broadens attention to options.</li><li><strong>Experienced as observation.</strong> Kahneman notes that mental simulation feels like watching, “not an act of construction”. That makes it cheap to run, and also easy to over-trust.</li><li><strong>Access to implicit knowledge.</strong> Playing a situation through activates know-how we cannot articulate. MacGyver turns candlesticks and a cable into a defibrillator by asking what objects can <em>do</em>, not what they <em>are</em>.</li><li><strong>Agency.</strong> Causality explains; only imagined alternatives create a choice.</li></ol><p>Read as a list, it is persuasive. Read as an argument, it is thin: the five points come from different research traditions and are not derived from one model. They also leave out the well-documented dark side: upward counterfactuals (“if only”) fuel regret and rumination, and hindsight bias makes the alternative look obvious afterwards.</p>',
          de: '<p>Die Autoren nennen fünf Vorteile.</p><ol><li><strong>Gegengift gegen kausalen Determinismus.</strong> Kausales Denken rastet bei der ersten plausiblen Geschichte ein (die Keksdose ist leer, also war es das Kind). Alternativen zu denken bringt konkurrierende Ursachen ins Blickfeld.</li><li><strong>Besseres kausales Denken.</strong> Ruth Byrnes Experimente legen nahe, dass kontrafaktisches Denken das kausale stärker verbessert als umgekehrt, weil es die Aufmerksamkeit auf Optionen weitet.</li><li><strong>Erlebt als Beobachtung.</strong> Kahneman hält fest, dass sich mentale Simulation wie Zuschauen anfühlt, nicht wie Konstruieren. Das macht sie billig, aber auch leicht überschätzt.</li><li><strong>Zugang zu implizitem Wissen.</strong> Eine Lage durchzuspielen aktiviert Können, das wir nicht aussprechen könnten. MacGyver baut aus Kerzenleuchtern und einem Kabel einen Defibrillator, weil er fragt, was Dinge <em>tun</em> können, nicht was sie <em>sind</em>.</li><li><strong>Handlungsmacht.</strong> Kausalität erklärt; erst gedachte Alternativen schaffen eine Wahl.</li></ol><p>Als Liste überzeugt das. Als Argument ist es dünn: Die fünf Punkte stammen aus verschiedenen Forschungstraditionen und werden nicht aus einem Modell abgeleitet. Außerdem fehlt die gut belegte Schattenseite: Aufwärtsvergleiche („hätte ich nur“) nähren Reue und Grübeln, und der Rückschaufehler lässt die Alternative im Nachhinein offensichtlich wirken.</p>'
        },
        visual: { caption: { en: 'Causal determinism vs. counterfactual opening: the same observation, one story or several rival stories that can be checked.', de: 'Kausaler Determinismus vs. kontrafaktische Öffnung: dieselbe Beobachtung, eine Geschichte oder mehrere konkurrierende, die sich prüfen lassen.' },
          svg: (l) => {
            let s = V.line(200, 20, 200, 240, { stroke: P.line, sw: 2 });
            s += V.text(100, 36, de(l) ? 'eine Geschichte' : 'one story', { size: 13, bold: true, fill: P.coral }) + V.text(300, 36, de(l) ? 'Rivalen denken' : 'imagine rivals', { size: 13, bold: true, fill: P.teal, cls: 'a-fade', delay: .8 });
            s += V.circle(100, 200, 18, { fill: P.ink }) + V.text(100, 236, de(l) ? 'Befund' : 'finding', { size: 12, fill: P.muted });
            s += V.circle(100, 80, 16, { fill: P.coral, cls: 'a-pop', delay: .3 }) + V.arrow(100, 98, 100, 178, { color: 'coral', cls: 'a-draw', delay: .5 });
            s += V.circle(300, 200, 18, { fill: P.ink, cls: 'a-fade', delay: .8 }) + V.text(300, 236, de(l) ? 'Befund' : 'finding', { size: 12, fill: P.muted, cls: 'a-fade', delay: .8 });
            [[240, 80], [300, 70], [360, 80]].forEach(([x, y], i) => {
              s += V.circle(x, y, 15, { fill: P.teal, cls: 'a-pop', delay: 1.1 + i * .25 }) + V.text(x, y + 5, ['?', '?', '?'][i], { size: 14, bold: true, fill: '#fff', cls: 'a-fade', delay: 1.2 + i * .25 });
              s += V.arrow(x + (300 - x) * .12, y + 16, 300 + (x - 300) * .2, 180, { color: 'teal', cls: 'a-draw', delay: 1.3 + i * .25 });
            });
            return V.wrap(s);
          } },
        keyIdea: { en: 'Counterfactuals do their best work against your first causal story, not in support of it.', de: 'Kontrafaktisches leistet am meisten gegen deine erste Kausalgeschichte, nicht zu ihrer Bestätigung.' } },

      { id: 's4', heading: { en: 'Machines, rare cases and the need for boundaries', de: 'Maschinen, seltene Fälle und die Notwendigkeit von Grenzen' },
        body: {
          en: '<p>Self-driving cars learned from millions of real miles and still failed at the unusual: a mattress on the road, a plastic bag in the wind on black ice. More real data barely helped, because reality is mostly ordinary. Waymo’s answer was Carcraft, a simulation with some 20,000 base scenarios, many of them rare and “spicy”, designed by people. Each scenario is then varied automatically (“fuzzing”): another car a bit faster, the same scene at night, a jogger added. In Waymo’s words, the aim is “to simulate the bad rather than just imitate the good”.</p><p>The authors read this as proof that machines cannot generate counterfactuals on their own; humans supply them and the machine executes. Half of this holds up. The other half has aged: generative models now produce scenarios on request, and adversarial search can hunt for failure cases automatically. What remains human is less the generating than the <strong>choosing</strong>: which scenarios matter for which goal, and who answers for the selection.</p><p>That points to the chapter’s closing move. Imagination alone is worthless if it is unbounded. Kennedy’s advisers had to stay within military and diplomatic options; Fung’s model kept the laws of physics. Useful counterfactuals need <strong>constraints</strong>, which is the subject of the next unit.</p>',
          de: '<p>Selbstfahrende Autos lernten aus Millionen echter Meilen und scheiterten trotzdem am Ungewöhnlichen: eine Matratze auf der Fahrbahn, eine Plastiktüte im Wind bei Glatteis. Mehr echte Daten halfen kaum, denn die Wirklichkeit ist überwiegend gewöhnlich. Waymos Antwort war Carcraft, eine Simulation mit rund 20.000 Basisszenarien, viele davon selten und „spicy“, von Menschen entworfen. Jedes Szenario wird dann automatisch variiert („Fuzzing“): ein anderes Auto etwas schneller, dieselbe Szene bei Nacht, eine joggende Person dazu. In Waymos Worten soll man das Schlechte simulieren, statt nur das Gute nachzuahmen.</p><p>Die Autoren lesen das als Beleg, dass Maschinen von sich aus kein Kontrafaktisches erzeugen; Menschen liefern es, die Maschine führt aus. Die eine Hälfte trägt. Die andere ist gealtert: Generative Modelle erzeugen heute Szenarien auf Zuruf, und adversariale Suche spürt Fehlerfälle automatisch auf. Menschlich bleibt weniger das Erzeugen als das <strong>Auswählen</strong>: welche Szenarien für welches Ziel zählen und wer für die Auswahl einsteht.</p><p>Das führt zum Schlusszug des Kapitels. Vorstellungskraft allein ist wertlos, wenn sie grenzenlos ist. Kennedys Beratende mussten innerhalb militärischer und diplomatischer Optionen bleiben; Fungs Modell behielt die Gesetze der Physik. Brauchbares Kontrafaktisches braucht <strong>Constraints, also Begrenzungen</strong>. Das ist Thema der nächsten Einheit.</p>'
        },
        visual: { caption: { en: 'Real data piles up where situations are common. The dangerous tail is nearly empty; Carcraft fills it with invented scenarios and their variations.', de: 'Echte Daten stapeln sich dort, wo Situationen häufig sind. Der gefährliche Rand ist fast leer; Carcraft füllt ihn mit erfundenen Szenarien und ihren Varianten.' },
          svg: (l) => {
            let s = V.line(40, 200, 375, 200, { stroke: P.ink }) + V.line(40, 200, 40, 30, { stroke: P.ink });
            s += `<path d="M40,200 L40,45 C90,50 120,150 190,180 C250,195 320,198 375,199 L375,200 Z" fill="${P.muted}" opacity=".35" class="a-fade"/>`;
            s += V.path('M40,45 C90,50 120,150 190,180 C250,195 320,198 375,199', { stroke: P.muted, sw: 3, cls: 'a-draw' });
            s += V.text(95, 120, de(l) ? 'Alltag' : 'ordinary', { size: 13, bold: true, cls: 'a-fade', delay: .5 });
            [[240, 150], [290, 130], [340, 160]].forEach(([x, y], i) => {
              s += V.dots(6, x - 20, y - 16, 40, 32, { seed: 3 + i, fill: P.teal, r: 3, opacity: .9, cls: 'a-fade', delay: 1.6 + i * .2 });
              s += V.circle(x, y, 9, { fill: P.amber, stroke: P.ink, sw: 1.5, cls: 'a-pop', delay: 1.1 + i * .2 });
            });
            s += V.text(290, 100, de(l) ? 'von Menschen erdacht' : 'invented by people', { size: 12, bold: true, fill: P.ink, cls: 'a-fade', delay: 1.4 });
            s += V.text(208, 228, de(l) ? 'häufig  →  selten' : 'common  →  rare', { size: 13, fill: P.muted, cls: 'a-fade', delay: .3 });
            s += V.text(30, 22, de(l) ? 'Daten' : 'data', { size: 12, fill: P.muted, anchor: 'start' });
            return V.wrap(s);
          } } },
    ],
    exercise: {
      type: 'custom',
      title: { en: 'The what-if workbench', de: 'Die Was-wäre-wenn-Werkbank' },
      instructions: { en: 'A board is looking at weak adoption of an AI assistant. Eight statements are on the table. Classify each: is it a bounded counterfactual (goal-directed, one mutable factor varied, rest held constant), a fantasy (unbounded or immutable), or no alternative at all (causal determinism)? Then check and read the reasons.', de: 'Ein Vorstand blickt auf die schwache Nutzung eines KI-Assistenten. Acht Aussagen liegen auf dem Tisch. Ordne jede zu: Ist sie ein begrenztes Was-wäre-wenn (zielgerichtet, ein veränderbarer Faktor variiert, der Rest konstant), eine Fantasie (grenzenlos oder unveränderbar) oder gar keine Alternative (kausaler Determinismus)? Dann prüfen und die Begründungen lesen.' },
      render: renderWorkbench,
    },
    caseStudy: {
      title: { en: 'Kennedy, twice: the Bay of Pigs and the missile crisis', de: 'Kennedy, zweimal: Schweinebucht und Kubakrise' },
      body: {
        en: '<p>In April 1961, three months into his presidency, John F. Kennedy approved a covert plan prepared under his predecessor: Cuban exiles would land at the Bay of Pigs and topple Castro. Nobody in the room seriously pushed an alternative, doubts stayed private, and the invasion collapsed within days. Irving Janis later used the episode as a founding example of “groupthink”.</p><p>In October 1962 aerial photographs showed Soviet missile sites on Cuba, about 150 kilometres from Florida. The military recommended an immediate air strike. Kennedy, burned once, did the opposite of 1961: he asked his advisers for as many different ways of reading and answering the situation as they could generate, and let the discussion run across rank and agency lines. The field was narrowed to two plans, an air strike and a naval blockade, which were argued against each other in earnest. Kennedy chose the blockade and, quietly, the offer to withdraw US missiles from Turkey, which gave Moscow a way to back down without losing face.</p><p>The authors read the contrast as counterfactual thinking defeating causal determinism: the generals had one causal story (missiles, so destroy them); Kennedy forced a space of alternatives open before choosing.</p>',
        de: '<p>Im April 1961, drei Monate nach Amtsantritt, billigte John F. Kennedy einen verdeckten Plan aus der Zeit seines Vorgängers: Kubanische Exilkräfte sollten in der Schweinebucht landen und Castro stürzen. Niemand im Raum vertrat ernsthaft eine Alternative, Zweifel blieben privat, und die Invasion brach binnen Tagen zusammen. Irving Janis machte die Episode später zu einem Gründungsbeispiel für „Groupthink“.</p><p>Im Oktober 1962 zeigten Luftaufnahmen sowjetische Raketenstellungen auf Kuba, rund 150 Kilometer vor Florida. Das Militär empfahl einen sofortigen Luftschlag. Kennedy, einmal verbrannt, tat das Gegenteil von 1961: Er bat seine Beratenden um so viele unterschiedliche Lesarten und Antworten wie möglich und ließ die Diskussion quer zu Rang und Ressort laufen. Das Feld wurde auf zwei Pläne eingegrenzt, Luftschlag und Seeblockade, die ernsthaft gegeneinander abgewogen wurden. Kennedy wählte die Blockade und, still, das Angebot, US-Raketen aus der Türkei abzuziehen. Das gab Moskau einen Weg, ohne Gesichtsverlust nachzugeben.</p><p>Die Autoren lesen den Kontrast als Sieg des kontrafaktischen Denkens über den kausalen Determinismus: Die Militärs hatten eine Kausalgeschichte (Raketen, also zerstören); Kennedy erzwang einen Raum von Alternativen, bevor er wählte.</p>'
      },
      lesson: { en: 'The decisive difference between 1961 and 1962 was not a smarter president but a different decision process: alternatives were made mandatory, then deliberately narrowed. Ask of any important decision in your organisation: who was tasked with producing the alternative that was not chosen?', de: 'Der entscheidende Unterschied zwischen 1961 und 1962 war kein klügerer Präsident, sondern ein anderer Entscheidungsprozess: Alternativen wurden Pflicht und dann gezielt eingegrenzt. Frag bei jeder wichtigen Entscheidung in deiner Organisation: Wer hatte den Auftrag, die Alternative zu erarbeiten, die nicht gewählt wurde?' },
    },
    reflection: {
      intro: { en: 'Counterfactuals are easy to agree with and hard to practise, because the first causal story always feels like the truth. Use a real case.', de: 'Kontrafaktischem stimmt man leicht zu, praktiziert es aber schwer, weil sich die erste Kausalgeschichte immer wie die Wahrheit anfühlt. Nimm einen echten Fall.' },
      prompts: [
        { en: 'Think of a recent success or failure in your area that is already “explained”. Write down the official causal story, then one rival cause nobody has examined. What evidence would distinguish them?', de: 'Denk an einen jüngsten Erfolg oder Misserfolg in deinem Bereich, der schon „erklärt“ ist. Schreib die offizielle Kausalgeschichte auf und dann eine konkurrierende Ursache, die niemand geprüft hat. Welcher Befund würde zwischen beiden unterscheiden?' },
        { en: 'For a change initiative you are part of: describe the “we do nothing” world twelve months from now. Is it really stable, or does it drift? How would that change the business case?', de: 'Für eine Veränderungsinitiative, an der du beteiligt bist: Beschreib die „Wir tun nichts“-Welt in zwölf Monaten. Ist sie wirklich stabil, oder driftet sie? Wie würde das den Business Case verändern?' },
        { en: 'Where in your team are alternatives produced by role (someone tasked with the opposing case), and where only by personality (whoever happens to dare)? What follows from the difference?', de: 'Wo werden in deinem Team Alternativen per Rolle erzeugt (jemand hat den Auftrag zur Gegenposition) und wo nur per Persönlichkeit (wer sich eben traut)? Was folgt aus dem Unterschied?' },
      ],
      placeholder: { en: 'Official story: … Rival cause: … What would tell them apart: …', de: 'Offizielle Geschichte: … Konkurrierende Ursache: … Was sie unterscheiden würde: …' },
    },
    quiz: [
      { q: { en: 'After a hybrid-work pilot, a team’s engagement score rose by 8 points. The sponsor wants to roll it out company-wide. Which question does the chapter say is missing?', de: 'Nach einem Hybrid-Pilot stieg der Engagement-Wert eines Teams um 8 Punkte. Der Sponsor will den Rollout auf das ganze Unternehmen. Welche Frage fehlt laut Kapitel?' },
        options: [{ en: 'Was the survey instrument validated?', de: 'War das Befragungsinstrument validiert?' }, { en: 'What would the score have been in the same period without the pilot?', de: 'Wie hoch wäre der Wert im selben Zeitraum ohne den Pilot gewesen?' }, { en: 'How do the employees feel about hybrid work?', de: 'Wie stehen die Mitarbeitenden zu hybrider Arbeit?' }, { en: 'Did the team leader support the pilot?', de: 'Hat die Teamleitung den Pilot unterstützt?' }],
        answer: 1, explain: { en: 'Like Fung’s Earth without human CO₂: the effect of the pilot is the difference to a world without it. Other teams over the same period are a rough stand-in for that world. The other questions matter, but none of them establishes attribution.', de: 'Wie Fungs Erde ohne menschliches CO₂: Die Wirkung des Pilots ist die Differenz zu einer Welt ohne ihn. Andere Teams im selben Zeitraum sind ein grober Ersatz für diese Welt. Die anderen Fragen sind relevant, aber keine klärt die Zurechnung.' } },
      { q: { en: 'Which statement captures the book’s distinction between counterfactuals and daydreaming?', de: 'Welche Aussage trifft die Unterscheidung des Buchs zwischen Kontrafaktischem und Tagträumen?' },
        options: [{ en: 'Counterfactuals are about the past, daydreams about the future.', de: 'Kontrafaktisches betrifft die Vergangenheit, Tagträume die Zukunft.' }, { en: 'Counterfactuals are conscious, daydreams unconscious.', de: 'Kontrafaktisches ist bewusst, Tagträume sind unbewusst.' }, { en: 'Counterfactuals serve a goal and rely on causal knowledge to play an altered world forward.', de: 'Kontrafaktisches dient einem Ziel und stützt sich auf Kausalwissen, um eine veränderte Welt weiterzudenken.' }, { en: 'Counterfactuals need numerical models; daydreams are qualitative.', de: 'Kontrafaktisches braucht Rechenmodelle; Tagträume sind qualitativ.' }],
        answer: 2, explain: { en: 'Counterfactuals can point backward (the own goal) or forward (Hansen’s scenarios), can run in a second without numbers (the referee), and are often semi-automatic (the billiard gaze). What defines them is purpose plus causal grounding.', de: 'Kontrafaktisches kann zurück (das Eigentor) oder nach vorn zeigen (Hansens Szenarien), kann in einer Sekunde ohne Zahlen laufen (der Schiedsrichter) und ist oft halbautomatisch (der Blick beim Billard). Bestimmend sind Zweck und kausale Verankerung.' } },
      { q: { en: 'An executive team keeps hearing one recommendation from IT for every incident. What would most directly apply the chapter’s lesson from the missile crisis?', de: 'Ein Vorstand hört bei jedem Vorfall nur eine Empfehlung der IT. Was setzt die Lehre aus der Kubakrise am direktesten um?' },
        options: [{ en: 'Replace the head of IT with someone more creative.', de: 'Die IT-Leitung durch eine kreativere Person ersetzen.' }, { en: 'Ask for more data on each incident.', de: 'Zu jedem Vorfall mehr Daten anfordern.' }, { en: 'Delegate the decision to IT entirely, since it has the expertise.', de: 'Die Entscheidung ganz an die IT delegieren, weil dort die Expertise liegt.' }, { en: 'Require at least two genuinely different options, argued against each other, before any decision.', de: 'Vor jeder Entscheidung mindestens zwei echt verschiedene Optionen verlangen, die gegeneinander vertreten werden.' }],
        answer: 3, explain: { en: 'Kennedy did not change people, he changed the process: generate alternatives, narrow to two, argue in earnest. More data inside one causal story (option 2) only deepens the single track.', de: 'Kennedy tauschte keine Personen aus, er änderte den Prozess: Alternativen erzeugen, auf zwei eingrenzen, ernsthaft streiten. Mehr Daten innerhalb einer Kausalgeschichte (Option 2) vertiefen nur die eine Spur.' } },
      { q: { en: 'What, according to the authors, made Waymo’s Carcraft work where more road data did not?', de: 'Was machte laut den Autoren Waymos Carcraft wirksam, wo mehr Straßendaten versagten?' },
        options: [{ en: 'Humans designed rare, critical scenarios that real data barely contains; the system then varied them.', de: 'Menschen entwarfen seltene, kritische Szenarien, die in echten Daten kaum vorkommen; das System variierte sie dann.' }, { en: 'The simulation was faster than real driving.', de: 'Die Simulation war schneller als echtes Fahren.' }, { en: 'The algorithm learned to invent dangerous situations by itself.', de: 'Der Algorithmus lernte, gefährliche Situationen selbst zu erfinden.' }, { en: 'It removed all ordinary driving data to avoid bias.', de: 'Er entfernte alle gewöhnlichen Fahrdaten, um Verzerrung zu vermeiden.' }],
        answer: 0, explain: { en: 'The problem was the distribution, not the volume: reality is mostly ordinary. Human-invented “spicy” scenarios plus fuzzing filled the tail. Option 3 is exactly what the authors deny, and what today’s critique of the chapter partly reopens.', de: 'Das Problem war die Verteilung, nicht die Menge: Die Wirklichkeit ist überwiegend gewöhnlich. Von Menschen erfundene „spicy“ Szenarien plus Fuzzing füllten den Rand. Option 3 ist genau das, was die Autoren bestreiten, und was die heutige Kritik am Kapitel teilweise wieder öffnet.' } },
      { q: { en: 'A manager says after a failed project: “If only we had hired a different agency, it would have worked.” Why is this a weak counterfactual by the chapter’s standards?', de: 'Eine Managerin sagt nach einem gescheiterten Projekt: „Hätten wir nur eine andere Agentur genommen, hätte es geklappt.“ Warum ist das nach den Maßstäben des Kapitels ein schwaches Was-wäre-wenn?' },
        options: [{ en: 'Because the past cannot be changed, so counterfactuals about it are pointless.', de: 'Weil sich die Vergangenheit nicht ändern lässt, Kontrafaktisches über sie also sinnlos ist.' }, { en: 'Because counterfactuals should only concern external factors.', de: 'Weil Kontrafaktisches nur externe Faktoren betreffen sollte.' }, { en: 'Because agencies are a hard constraint.', de: 'Weil Agenturen ein harter Constraint sind.' }, { en: 'Because it varies a factor but does not play the altered world forward with any causal model of why the agency mattered.', de: 'Weil es einen Faktor variiert, die veränderte Welt aber ohne Kausalmodell dafür weiterdenkt, warum die Agentur eine Rolle spielte.' }],
        answer: 3, explain: { en: 'Backward counterfactuals are legitimate (the own goal is one). This one skips the playing-forward: what exactly would the other agency have done differently, and would that have reached the cause of failure? Without that, it is regret, not analysis.', de: 'Rückwärtsgerichtetes Kontrafaktisches ist legitim (das Eigentor ist eines). Hier fehlt das Weiterdenken: Was genau hätte die andere Agentur anders gemacht, und hätte das die Ursache des Scheiterns erreicht? Ohne das ist es Reue, keine Analyse.' } },
      { q: { en: 'You use a language model to generate fifty risk scenarios for a reorganisation. In the light of this chapter and its critique, where does the human contribution lie?', de: 'Du lässt ein Sprachmodell fünfzig Risikoszenarien für eine Reorganisation erzeugen. Wo liegt im Licht des Kapitels und seiner Kritik der menschliche Beitrag?' },
        options: [{ en: 'Nowhere; the model has made counterfactual thinking obsolete.', de: 'Nirgends; das Modell hat kontrafaktisches Denken überflüssig gemacht.' }, { en: 'In typing the prompt quickly.', de: 'Im schnellen Eintippen des Prompts.' }, { en: 'In setting the goal and boundaries, and in judging which scenarios are plausible and decision-relevant.', de: 'Im Setzen von Ziel und Grenzen und im Urteil, welche Szenarien plausibel und entscheidungsrelevant sind.' }, { en: 'In writing all fifty scenarios by hand to avoid bias.', de: 'Darin, alle fünfzig Szenarien von Hand zu schreiben, um Verzerrung zu vermeiden.' }],
        answer: 2, explain: { en: 'Generation is no longer the bottleneck. Selection against a goal, a boundary and accountability for the choice are; that is the defensible core of the book’s claim.', de: 'Das Erzeugen ist nicht mehr der Engpass. Auswahl gegen ein Ziel, eine Grenze und die Verantwortung für die Wahl sind es; das ist der haltbare Kern der These des Buchs.' } },
    ],
    flashcards: [
      { front: { en: 'Counterfactual', de: 'Kontrafaktisches (Was-wäre-wenn)' }, back: { en: 'A deliberately imagined alternative world, built with causal knowledge for a goal: understand, attribute, or decide.', de: 'Eine gezielt gedachte alternative Welt, mit Kausalwissen gebaut, für ein Ziel: verstehen, zurechnen oder entscheiden.' } },
      { front: { en: 'Why Fung’s model mattered', de: 'Warum Fungs Modell wichtig war' }, back: { en: 'Data showed CO₂ and temperature rising together. Only a modelled Earth without human emissions made the human share visible.', de: 'Daten zeigten, dass CO₂ und Temperatur gemeinsam steigen. Erst eine modellierte Erde ohne menschliche Emissionen machte den menschlichen Anteil sichtbar.' } },
      { front: { en: 'Causal determinism', de: 'Kausaler Determinismus' }, back: { en: 'Locking onto one causal path as the only possible one. Counterfactuals are the antidote: they bring rival causes and options into view.', de: 'Auf einen Kausalpfad einrasten, als sei er der einzig mögliche. Kontrafaktisches ist das Gegengift: Es bringt konkurrierende Ursachen und Optionen ins Blickfeld.' } },
      { front: { en: 'Theory theory (Gopnik)', de: 'Theory Theory (Gopnik)' }, back: { en: 'Young children build and test causal models like scientists; pretend play trains counterfactual reasoning.', de: 'Kleine Kinder bauen und testen Kausalmodelle wie Forschende; So-tun-als-ob trainiert kontrafaktisches Denken.' } },
      { front: { en: 'Case method', de: 'Fallmethode' }, back: { en: 'Langdell (law), Donham (business): a realistic situation, a decision, and hypothetical variations to argue over. Institutionalised counterfactual training.', de: 'Langdell (Recht), Donham (Management): eine realistische Lage, eine Entscheidung und hypothetische Abwandlungen zum Streiten. Institutionalisiertes kontrafaktisches Training.' } },
      { front: { en: 'Fuzzing (Carcraft)', de: 'Fuzzing (Carcraft)' }, back: { en: 'Systematically varying a base scenario (speed, light, an extra pedestrian) to cover the space around a rare case.', de: 'Ein Basisszenario systematisch variieren (Tempo, Licht, eine zusätzliche Person), um den Raum um einen seltenen Fall abzudecken.' } },
      { front: { en: 'The five benefits', de: 'Die fünf Vorteile' }, back: { en: 'Antidote to determinism, better causal thinking, experienced as observation, access to implicit knowledge, sense of agency.', de: 'Gegengift gegen Determinismus, besseres kausales Denken, erlebt als Beobachtung, Zugang zu implizitem Wissen, Gefühl von Handlungsmacht.' } },
      { front: { en: 'Why counterfactuals need boundaries', de: 'Warum Kontrafaktisches Grenzen braucht' }, back: { en: 'Unbounded imagination produces options nobody can compare or act on. The boundary (constraints) makes them useful: chapter 5.', de: 'Grenzenlose Vorstellungskraft erzeugt Optionen, die niemand vergleichen oder umsetzen kann. Die Grenze (Constraints) macht sie brauchbar: Kapitel 5.' } },
    ],
    critique: [
      { claim: { en: 'Computers cannot generate counterfactuals on their own; humans have to supply them (Carcraft).', de: 'Computer können von sich aus kein Kontrafaktisches erzeugen; Menschen müssen es liefern (Carcraft).' },
        challenge: { en: 'This was already shaky in 2021 (adversarial scenario search existed in autonomous driving) and is outdated now: generative models produce plausible scenarios, rival explanations and “what if” narratives on demand, and Pearl-style causal models compute counterfactuals formally. The defensible core is narrower: the machine does not own the goal, does not decide which scenarios matter, and is not accountable for the selection. That is a claim about responsibility and relevance, not about capability.', de: 'Das war schon 2021 wackelig (adversariale Szenariosuche gab es beim autonomen Fahren bereits) und ist heute überholt: Generative Modelle erzeugen auf Zuruf plausible Szenarien, konkurrierende Erklärungen und Was-wäre-wenn-Erzählungen, und kausale Modelle nach Pearl berechnen Kontrafaktisches formal. Der haltbare Kern ist enger: Die Maschine besitzt das Ziel nicht, entscheidet nicht, welche Szenarien zählen, und steht nicht für die Auswahl ein. Das ist eine Aussage über Verantwortung und Relevanz, nicht über Fähigkeit.' } },
      { claim: { en: 'Counterfactuals bring five benefits: less determinism, better causal thinking, vividness, implicit knowledge, agency.', de: 'Kontrafaktisches bringt fünf Vorteile: weniger Determinismus, besseres kausales Denken, Anschaulichkeit, implizites Wissen, Handlungsmacht.' },
        challenge: { en: 'The list is assembled from scattered studies and anecdotes (Byrne, Kahneman, MacGyver), not derived from a cumulative theory, and it omits the counter-evidence: “if only” thinking drives regret and rumination (Roese), Kahneman and Miller’s norm theory shows how easily imagined alternatives distort blame, and the very vividness the book praises is a source of overconfidence. A fair reading: counterfactuals are a powerful tool with a known failure profile, not a general good.', de: 'Die Liste ist aus verstreuten Studien und Anekdoten zusammengesetzt (Byrne, Kahneman, MacGyver), nicht aus einer kumulativen Theorie abgeleitet, und sie lässt die Gegenbefunde aus: „Hätte ich nur“-Denken treibt Reue und Grübeln (Roese), die Norm-Theorie von Kahneman und Miller zeigt, wie leicht gedachte Alternativen Schuldzuschreibungen verzerren, und gerade die gelobte Anschaulichkeit ist eine Quelle von Selbstüberschätzung. Faire Lesart: ein starkes Werkzeug mit bekanntem Fehlerprofil, kein Gut an sich.' } },
      { claim: { en: 'Counterfactual history and thought experiments open the imagination and deepen understanding.', de: 'Kontrafaktische Geschichte und Gedankenexperimente öffnen die Vorstellung und vertiefen Verständnis.' },
        challenge: { en: 'The book mentions in passing that historians are divided; the objection deserves weight. E. H. Carr dismissed “what if” history as a parlour game, because each imagined step multiplies uncertainty until the conclusion reflects the author’s preferences. Galileo’s case works because the counterfactual is closed by logic; Fung’s works because physics bounds it. Long-range social counterfactuals have neither. That is less a refutation than an argument for chapter 5: the value of a counterfactual falls with the distance from reality.', de: 'Das Buch erwähnt nebenbei, dass die Geschichtswissenschaft gespalten ist; der Einwand verdient Gewicht. E. H. Carr tat Was-wäre-wenn-Geschichte als Gesellschaftsspiel ab, weil jeder gedachte Schritt die Unsicherheit vervielfacht, bis das Ergebnis die Vorlieben der Autorin oder des Autors spiegelt. Galileos Fall funktioniert, weil Logik das Gedankenexperiment schließt; Fungs, weil Physik es begrenzt. Weitreichende gesellschaftliche Kontrafakten haben keines von beiden. Das ist weniger Widerlegung als Argument für Kapitel 5: Der Wert eines Was-wäre-wenn sinkt mit seiner Entfernung von der Wirklichkeit.' } },
      { claim: { en: 'Kennedy’s handling of the missile crisis shows counterfactual thinking overcoming causal determinism.', de: 'Kennedys Umgang mit der Kubakrise zeigt, wie kontrafaktisches Denken kausalen Determinismus überwindet.' },
        challenge: { en: 'The episode is usually told as a story about process design: subgroups, the president deliberately absent from some sessions, Robert Kennedy and Sorensen as designated sceptics. That is devil’s advocacy and structured dissent, which produces counterfactuals but is not the same thing as individual counterfactual skill. Historians also stress luck and near-misses the ExComm never controlled (the Soviet submarine B-59, a U-2 shot down). Success stories selected after the fact cannot show that the method, rather than circumstance, caused the outcome; ironically, that would require a counterfactual.', de: 'Die Episode wird meist als Geschichte über Prozessgestaltung erzählt: Untergruppen, der Präsident bewusst abwesend in manchen Sitzungen, Robert Kennedy und Sorensen als bestellte Skeptiker. Das ist Devil’s Advocacy und strukturierter Widerspruch; der erzeugt Kontrafaktisches, ist aber nicht dasselbe wie individuelle kontrafaktische Fähigkeit. Die Geschichtsforschung betont zudem Glück und Beinahe-Katastrophen, die das ExComm nie kontrollierte (das sowjetische U-Boot B-59, eine abgeschossene U-2). Im Nachhinein ausgewählte Erfolgsgeschichten können nicht zeigen, dass die Methode und nicht die Umstände das Ergebnis bewirkt hat; dafür bräuchte es, ironischerweise, ein Was-wäre-wenn.' } },
    ],
    transfer: [
      { context: { en: 'Leadership', de: 'Führung' }, prompt: { en: 'A pre-mortem (Gary Klein) is an institutionalised counterfactual: “It is a year from now and the project has failed. Why?” Run one for a current decision, but add the chapter’s discipline: name the goal, list what you hold constant, and allow only causes your organisation could actually change. Compare the result with an unbounded brainstorm on the same question.', de: 'Ein Pre-Mortem (Gary Klein) ist institutionalisiertes Kontrafaktisches: „Es ist ein Jahr später und das Projekt ist gescheitert. Warum?“ Führ eines für eine aktuelle Entscheidung durch, aber mit der Disziplin des Kapitels: Ziel benennen, festlegen, was konstant bleibt, und nur Ursachen zulassen, die deine Organisation tatsächlich ändern könnte. Vergleich das Ergebnis mit einem grenzenlosen Brainstorming zur selben Frage.' } },
      { context: { en: 'AI in organisations', de: 'KI in Organisationen' }, prompt: { en: 'Build a small Carcraft for an organisational decision: write five “spicy” base scenarios yourself (rare but consequential, e.g. key client leaves during the rollout), then let a language model fuzz each into variations. Afterwards, check: which of the most decision-relevant scenarios came from you, and which from the model? That ratio is your current answer to the chapter’s machine thesis.', de: 'Bau ein kleines Carcraft für eine Organisationsentscheidung: Schreib fünf „spicy“ Basisszenarien selbst (selten, aber folgenreich, etwa: Schlüsselkunde springt mitten im Rollout ab) und lass ein Sprachmodell jedes in Varianten auffächern. Prüf danach: Welche der entscheidungsrelevantesten Szenarien kamen von dir, welche vom Modell? Dieses Verhältnis ist deine aktuelle Antwort auf die Maschinenthese des Kapitels.' } },
      { context: { en: 'Change management', de: 'Change Management' }, prompt: { en: 'The most neglected counterfactual in change work is “what if we do nothing?”. Business cases usually treat the status quo as stable, although it drifts (attrition, technical debt, informal workarounds). For one current initiative, write the do-nothing trajectory over 18 months as concretely as the target picture. Does the case for change get stronger, weaker, or different?', de: 'Das am meisten vernachlässigte Was-wäre-wenn in Veränderungsarbeit lautet: „Was, wenn wir nichts tun?“ Business Cases behandeln den Status quo meist als stabil, obwohl er driftet (Fluktuation, technische Schulden, informelle Workarounds). Schreib für eine aktuelle Initiative den Nichts-tun-Verlauf über 18 Monate so konkret auf wie das Zielbild. Wird der Fall für Veränderung stärker, schwächer oder ein anderer?' } },
    ],
    summary: [
      { en: 'Data shows what happens together; only a counterfactual comparison with a world that did not happen establishes responsibility.', de: 'Daten zeigen, was zusammen auftritt; erst der Vergleich mit einer Welt, die nicht eingetreten ist, begründet Verantwortung.' },
      { en: 'Counterfactuals are goal-directed: keep the causal model, change one factor, play it forward, compare.', de: 'Kontrafaktisches ist zielgerichtet: Kausalmodell behalten, einen Faktor ändern, weiterdenken, vergleichen.' },
      { en: 'Causality makes counterfactuals meaningful, counterfactuals make causality actionable; together they turn understanding into choice.', de: 'Kausalität macht Kontrafaktisches sinnvoll, Kontrafaktisches macht Kausalität handlungsfähig; zusammen machen sie aus Verstehen eine Wahl.' },
      { en: 'We train the capacity through play, stories, games and the case method; organisations can institutionalise it, as Kennedy did in 1962.', de: 'Wir trainieren die Fähigkeit durch Spiel, Geschichten, Games und die Fallmethode; Organisationen können sie institutionalisieren, wie Kennedy 1962.' },
      { en: 'Machines can now generate scenarios, but choosing which ones matter, and bounding them, remains a human responsibility.', de: 'Maschinen erzeugen heute Szenarien, aber auszuwählen, welche zählen, und sie zu begrenzen, bleibt menschliche Verantwortung.' },
    ],
    glossary: [
      { term: { en: 'Counterfactual', de: 'Kontrafaktisches / Was-wäre-wenn' }, def: { en: 'An imagined alternative to what is or was, constructed with causal knowledge to serve a goal.', de: 'Eine gedachte Alternative zu dem, was ist oder war, mit Kausalwissen konstruiert, um einem Ziel zu dienen.' } },
      { term: { en: 'Causal determinism', de: 'Kausaler Determinismus' }, def: { en: 'The assumption that only one causal path was or is possible; closes off options and rival explanations.', de: 'Die Annahme, nur ein Kausalpfad sei möglich gewesen oder möglich; schließt Optionen und konkurrierende Erklärungen aus.' } },
      { term: { en: 'Theory theory', de: 'Theory Theory' }, def: { en: 'Developmental view (Gopnik and others) that children form and revise causal theories much like scientists.', de: 'Entwicklungspsychologische Sicht (Gopnik u. a.), dass Kinder Kausaltheorien bilden und revidieren, ähnlich wie Forschende.' } },
      { term: { en: 'Case method', de: 'Fallmethode' }, def: { en: 'Teaching through realistic situations and hypothetical variations that force students to generate and defend options.', de: 'Lehren an realistischen Lagen und hypothetischen Abwandlungen, die Studierende zwingen, Optionen zu entwickeln und zu verteidigen.' } },
      { term: { en: 'Fuzzing', de: 'Fuzzing' }, def: { en: 'Automated variation of a base scenario to explore the space of nearby cases; in Carcraft, applied to human-invented rare scenarios.', de: 'Automatisches Variieren eines Basisszenarios, um den Raum benachbarter Fälle zu erkunden; bei Carcraft auf von Menschen erfundene seltene Szenarien angewandt.' } },
    ],
  });
})();
