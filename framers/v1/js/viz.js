/* viz.js — shared SVG vocabulary for all learning units.
   Every helper returns a string. Compose them inside V.wrap(...) or hand-write SVG.
   Stage coordinate system: viewBox 0 0 400 260 (landscape, mobile-friendly). */
(function () {
  const palette = {
    ink: '#1B1F2A', paper: '#F7F3EC', paper2: '#EFE9DF',
    coral: '#E4572E', teal: '#17A398', amber: '#F2B134', plum: '#6C4AB6',
    sky: '#3E8ED0', muted: '#8A8F98', line: '#C9C2B6', ok: '#2E9E6B', bad: '#D64545'
  };
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const attrs = (o) => Object.entries(o).filter(([k, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
  const animAttrs = (cls, delay) => ({ class: cls || undefined, style: delay ? `--d:${delay}s` : undefined });

  const V = {
    palette, esc,
    /* Wrap inner SVG markup in a stage. opts: {w,h,bg} */
    wrap(inner, opts = {}) {
      const w = opts.w || 400, h = opts.h || 260;
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${esc(opts.label || '')}">
<defs>
 <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="context-stroke"/></marker>
 <marker id="arr-ink" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${palette.ink}"/></marker>
 <marker id="arr-coral" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${palette.coral}"/></marker>
 <marker id="arr-teal" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${palette.teal}"/></marker>
 <marker id="arr-muted" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="${palette.muted}"/></marker>
</defs>
${opts.bg === false ? '' : `<rect x="0" y="0" width="${w}" height="${h}" rx="14" fill="${opts.bg || palette.paper2}"/>`}
${inner}
</svg>`;
    },
    text(x, y, str, o = {}) {
      const size = o.size || 14;
      const lines = String(str).split('\n');
      const a = attrs({
        x, y, 'text-anchor': o.anchor || 'middle', 'font-size': size,
        'font-weight': o.weight || (o.bold ? 700 : 500), fill: o.fill || palette.ink,
        'font-style': o.italic ? 'italic' : undefined, 'font-family': o.serif ? 'Iowan Old Style, Palatino, Georgia, serif' : undefined,
        ...animAttrs(o.cls, o.delay), opacity: o.opacity
      });
      if (lines.length === 1) return `<text${a}>${esc(str)}</text>`;
      const lh = o.lineHeight || size * 1.25;
      return `<text${a}>${lines.map((l, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lh}">${esc(l)}</tspan>`).join('')}</text>`;
    },
    rect(x, y, w, h, o = {}) {
      return `<rect${attrs({ x, y, width: w, height: h, rx: o.r === undefined ? 8 : o.r, fill: o.fill || palette.paper, stroke: o.stroke || palette.ink, 'stroke-width': o.sw === undefined ? 1.5 : o.sw, 'stroke-dasharray': o.dash, opacity: o.opacity, ...animAttrs(o.cls, o.delay) })}/>`;
    },
    circle(cx, cy, r, o = {}) {
      return `<circle${attrs({ cx, cy, r, fill: o.fill || palette.teal, stroke: o.stroke, 'stroke-width': o.sw, opacity: o.opacity, ...animAttrs(o.cls, o.delay) })}/>`;
    },
    line(x1, y1, x2, y2, o = {}) {
      return `<line${attrs({ x1, y1, x2, y2, stroke: o.stroke || palette.ink, 'stroke-width': o.sw || 2, 'stroke-dasharray': o.dash, 'stroke-linecap': 'round', opacity: o.opacity, ...animAttrs(o.cls, o.delay) })}/>`;
    },
    /* arrow: color in {ink,coral,teal,muted} selects marker */
    arrow(x1, y1, x2, y2, o = {}) {
      const c = o.color || 'ink';
      return `<line${attrs({ x1, y1, x2, y2, stroke: palette[c] || c, 'stroke-width': o.sw || 2.5, 'marker-end': `url(#arr-${palette[c] ? c : 'ink'})`, 'stroke-dasharray': o.dash, 'stroke-linecap': 'round', ...animAttrs(o.cls, o.delay) })}/>`;
    },
    path(d, o = {}) {
      return `<path${attrs({ d, fill: o.fill || 'none', stroke: o.stroke || palette.ink, 'stroke-width': o.sw || 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': o.dash, opacity: o.opacity, ...animAttrs(o.cls, o.delay) })}/>`;
    },
    /* A "frame": double-bordered rectangle with optional label on top edge. The book's central motif. */
    frame(x, y, w, h, o = {}) {
      const col = o.color || palette.coral;
      const lbl = o.label ? `<rect x="${x + 12}" y="${y - 11}" width="${Math.min(w - 24, (String(o.label).length * 7.2) + 16)}" height="22" rx="11" fill="${col}"/>${V.text(x + 12 + Math.min(w - 24, (String(o.label).length * 7.2) + 16) / 2, y + 4, o.label, { size: 12, fill: '#fff', bold: true })}` : '';
      return `<g${attrs(animAttrs(o.cls, o.delay))}>
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${o.fill || 'none'}" stroke="${col}" stroke-width="3"/>
<rect x="${x + 6}" y="${y + 6}" width="${w - 12}" height="${h - 12}" rx="6" fill="none" stroke="${col}" stroke-width="1" opacity=".5"/>
${lbl}</g>`;
    },
    /* Pill label with background */
    pill(x, y, str, o = {}) {
      const w = o.w || (String(str).length * 7.5 + 20), h = o.h || 26;
      return `<g${attrs(animAttrs(o.cls, o.delay))}><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${o.fill || palette.ink}"/>${V.text(x, y + 4.5, str, { size: o.size || 12, fill: o.color || '#fff', bold: true })}</g>`;
    },
    /* Simple stick figure */
    person(x, y, o = {}) {
      const c = o.color || palette.ink, s = o.scale || 1;
      return `<g${attrs(animAttrs(o.cls, o.delay))} transform="translate(${x},${y}) scale(${s})">
<circle cx="0" cy="-26" r="8" fill="${c}"/>
<path d="M0,-16 v22 M-12,-8 L0,-10 L12,-8 M0,6 l-9,18 M0,6 l9,18" stroke="${c}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`;
    },
    /* Scattered dots: deterministic pseudo-random */
    dots(n, x, y, w, h, o = {}) {
      let out = '', seed = o.seed || 7;
      const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
      for (let i = 0; i < n; i++) {
        out += V.circle(x + rnd() * w, y + rnd() * h, o.r || 3, { fill: o.fill || palette.muted, opacity: o.opacity || .7, cls: o.cls, delay: o.stagger ? +(i * o.stagger).toFixed(2) : o.delay });
      }
      return out;
    },
    /* Lightbulb (idea / option) */
    bulb(x, y, o = {}) {
      const c = o.color || palette.amber;
      return `<g${attrs(animAttrs(o.cls, o.delay))} transform="translate(${x},${y}) scale(${o.scale || 1})">
<path d="M-9,4 a12,12 0 1,1 18,0 l-2,8 h-14 z" fill="${c}" stroke="${palette.ink}" stroke-width="1.5"/>
<rect x="-5" y="12" width="10" height="5" rx="2" fill="${palette.ink}"/></g>`;
    },
    group(inner, o = {}) {
      return `<g${attrs({ transform: o.transform, opacity: o.opacity, ...animAttrs(o.cls, o.delay) })}>${inner}</g>`;
    },
    /* Three-C badge trio used across units: returns group centered at x,y */
    threeC(x, y, lang, o = {}) {
      const L = lang === 'de' ? ['Kausalität', 'Kontrafaktisches', 'Constraints'] : ['Causality', 'Counterfactuals', 'Constraints'];
      const cols = [palette.coral, palette.teal, palette.plum];
      const gap = o.gap || 118;
      return L.map((l, i) => V.group(
        V.circle(0, 0, 26, { fill: cols[i] }) + V.text(0, 7, 'C', { size: 24, fill: '#fff', bold: true }) + V.text(0, 46, l, { size: 12, bold: true }),
        { transform: `translate(${x + (i - 1) * gap},${y})`, cls: o.cls || 'a-pop', delay: (o.delay || 0) + i * .25 }
      )).join('');
    }
  };
  window.V = V;
})();
