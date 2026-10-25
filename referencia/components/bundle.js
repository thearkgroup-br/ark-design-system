/* @ds-bundle: {"format":4,"namespace":"Ark","components":[{"name":"Logo"},{"name":"Icon"},{"name":"Button"},{"name":"IconButton"},{"name":"ThemeToggle"},{"name":"FavoriteButton"},{"name":"TextField"},{"name":"SearchField"},{"name":"Select"},{"name":"Checkbox"},{"name":"Switch"},{"name":"Segmented"},{"name":"Badge"},{"name":"Chip"},{"name":"Avatar"},{"name":"Rating"},{"name":"Card"},{"name":"StatBar"},{"name":"Eyebrow"},{"name":"SectionHeader"},{"name":"ListItem"},{"name":"NumberedList"},{"name":"Steps"},{"name":"Table"},{"name":"ServiceItem"},{"name":"ProfessionalRow"},{"name":"EstablishmentCard"},{"name":"Alert"},{"name":"Toast"},{"name":"Skeleton"},{"name":"SkeletonCard"},{"name":"EmptyState"},{"name":"BottomSheet"},{"name":"Dialog"},{"name":"TopBar"},{"name":"TabBar"},{"name":"SideNav"},{"name":"SiteHeader"},{"name":"Footer"},{"name":"Accordion"},{"name":"Comparison"},{"name":"PlanCard"},{"name":"PriceList"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var useState = React.useState;
  var uid = 0;
  function useUid(prefix) {
    var r = React.useRef(null);
    if (r.current == null) { uid += 1; r.current = (prefix || 'ak') + '-' + uid; }
    return r.current;
  }
  function cx() { return Array.prototype.slice.call(arguments).filter(Boolean).join(' '); }
  function omit(o, keys) { var r = {}; for (var k in o) { if (keys.indexOf(k) < 0) r[k] = o[k]; } return r; }
  function useCtl(value, def, onChange) {
    var st = useState(def);
    var v = value !== undefined ? value : st[0];
    return [v, function (n, e) { if (value === undefined) st[1](n); if (onChange) onChange(n, e); }];
  }

  /* Ícones de traço 2 px, sempre aria-hidden */
  function Svg(p, kids) {
    return h('svg', { width: p.size || 20, height: p.size || 20, viewBox: '0 0 24 24', fill: p.fill || 'none', stroke: 'currentColor',
      strokeWidth: p.sw || 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false' }, kids);
  }
  var P = {
    home: [['path', { d: 'M3 10.5 12 3l9 7.5' }], ['path', { d: 'M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5' }]],
    store: [['path', { d: 'M3 9l1.6-5h14.8L21 9' }], ['path', { d: 'M3 9a3 3 0 0 0 6 0a3 3 0 0 0 6 0a3 3 0 0 0 6 0' }], ['path', { d: 'M5 11.6V20h14v-8.4' }], ['path', { d: 'M10 20v-5h4v5' }]],
    menu: [['line', { x1: 4, y1: 7, x2: 20, y2: 7 }], ['line', { x1: 4, y1: 12, x2: 20, y2: 12 }], ['line', { x1: 4, y1: 17, x2: 20, y2: 17 }]],
    users: [['circle', { cx: 9, cy: 8, r: 3.5 }], ['path', { d: 'M2.5 20c0-3.3 3-5.5 6.5-5.5s6.5 2.2 6.5 5.5' }], ['circle', { cx: 17, cy: 9, r: 2.8 }], ['path', { d: 'M17 14.5c2.6 0 4.5 1.8 4.5 4.5' }]],
    user: [['circle', { cx: 12, cy: 8, r: 4 }], ['path', { d: 'M4 21c0-4 4-6 8-6s8 2 8 6' }]],
    plus: [['line', { x1: 12, y1: 5, x2: 12, y2: 19 }], ['line', { x1: 5, y1: 12, x2: 19, y2: 12 }]],
    search: [['circle', { cx: 11, cy: 11, r: 7 }], ['line', { x1: 21, y1: 21, x2: 16.65, y2: 16.65 }]],
    close: [['line', { x1: 18, y1: 6, x2: 6, y2: 18 }], ['line', { x1: 6, y1: 6, x2: 18, y2: 18 }]],
    chevronRight: [['polyline', { points: '9 18 15 12 9 6' }]],
    chevronLeft: [['polyline', { points: '15 18 9 12 15 6' }]],
    chevronDown: [['polyline', { points: '6 9 12 15 18 9' }]],
    check: [['polyline', { points: '20 6 9 17 4 12' }]],
    info: [['circle', { cx: 12, cy: 12, r: 9 }], ['path', { d: 'M12 8h.01' }], ['path', { d: 'M11 12h1v4h1' }]],
    alert: [['path', { d: 'M12 9v4' }], ['path', { d: 'M12 17h.01' }], ['path', { d: 'M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z' }]],
    calendar: [['rect', { x: 3, y: 4, width: 18, height: 18, rx: 2 }], ['line', { x1: 16, y1: 2, x2: 16, y2: 6 }], ['line', { x1: 8, y1: 2, x2: 8, y2: 6 }], ['line', { x1: 3, y1: 10, x2: 21, y2: 10 }]],
    clock: [['circle', { cx: 12, cy: 12, r: 9 }], ['polyline', { points: '12 7 12 12 15 14' }]],
    lock: [['rect', { x: 4, y: 11, width: 16, height: 10, rx: 2 }], ['path', { d: 'M8 11V7a4 4 0 0 1 8 0v4' }]],
    sun: [['circle', { cx: 12, cy: 12, r: 4 }], ['path', { d: 'M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4' }]],
    moon: [['path', { d: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z' }]],
    settings: [['circle', { cx: 12, cy: 12, r: 3 }], ['path', { d: 'M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z' }]],
    logout: [['path', { d: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' }], ['polyline', { points: '16 17 21 12 16 7' }], ['line', { x1: 21, y1: 12, x2: 9, y2: 12 }]],
    chart: [['line', { x1: 4, y1: 20, x2: 20, y2: 20 }], ['rect', { x: 6, y: 11, width: 3, height: 7 }], ['rect', { x: 11, y: 6, width: 3, height: 12 }], ['rect', { x: 16, y: 14, width: 3, height: 4 }]],
    code: [['polyline', { points: '8 6 2 12 8 18' }], ['polyline', { points: '16 6 22 12 16 18' }]],
    pulse: [['polyline', { points: '2 12 7 12 10 5 14 19 17 12 22 12' }]],
    chat: [['path', { d: 'M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z' }]],
    mail: [['rect', { x: 3, y: 5, width: 18, height: 14, rx: 2 }], ['polyline', { points: '3 7 12 13 21 7' }]],
    phone: [['path', { d: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z' }]],
    pin: [['path', { d: 'M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z' }], ['circle', { cx: 12, cy: 9.5, r: 2.5 }]],
    edit: [['path', { d: 'M12 20h9' }], ['path', { d: 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z' }]],
    trash: [['polyline', { points: '3 6 5 6 21 6' }], ['path', { d: 'M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6' }], ['path', { d: 'M10 11v6M14 11v6' }], ['path', { d: 'M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2' }]],
    filter: [['polygon', { points: '22 3 2 3 10 12.5 10 19 14 21 14 12.5 22 3' }]],
    external: [['path', { d: 'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' }], ['polyline', { points: '15 3 21 3 21 9' }], ['line', { x1: 10, y1: 14, x2: 21, y2: 3 }]],
    arrowRight: [['line', { x1: 5, y1: 12, x2: 19, y2: 12 }], ['polyline', { points: '12 5 19 12 12 19' }]]
  };
  function icon(name, size, filled) {
    if (name === 'heart') return Svg({ size: size, fill: filled ? 'currentColor' : 'none' }, h('path', { d: 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z' }));
    if (name === 'star') return Svg({ size: size, fill: filled ? 'currentColor' : 'none', sw: 1.6 }, h('polygon', { points: '12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3' }));
    var parts = P[name];
    if (!parts) return null;
    return Svg({ size: size, sw: name === 'check' ? 3 : 2 }, parts.map(function (p, i) { return h(p[0], Object.assign({ key: i }, p[1])); }));
  }
  function Icon(props) { return h('span', { className: 'ak-icon', style: props.color ? { color: props.color } : null }, icon(props.name, props.size || 20, props.filled)); }
  Icon.names = Object.keys(P).concat(['heart', 'star']);

  /* Logo: Ark (casco), Íris (íris) e Pulse (só nome, ainda sem símbolo) */
  var CRES = 'M48 22 A42 42 0 0 0 48 98 A50 50 0 0 1 48 22 Z';
  function IrisMark(size) {
    var fibers = [];
    for (var k = 0; k < 40; k++) {
      var t = 2 * Math.PI * k / 40, c = Math.cos(t), s = Math.sin(t);
      fibers.push(h('line', { key: k, x1: 60 + 25 * c, y1: 60 + 25 * s, x2: 60 + 48 * c, y2: 60 + 48 * s }));
    }
    return h('svg', { width: size, height: size, viewBox: '0 0 120 120', 'aria-hidden': 'true', focusable: 'false' },
      h('circle', { cx: 60, cy: 60, r: 52, fill: 'currentColor' }),
      h('g', { stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', opacity: 0.35 }, fibers),
      h('circle', { cx: 60, cy: 60, r: 21, fill: '#17142B' }),
      h('path', { d: CRES, fill: '#FFFFFF' }));
  }
  function ArkMark(size, id) {
    return h('svg', { width: Math.round(size * 152 / 70), height: size, viewBox: '4 26 152 70', 'aria-hidden': 'true', focusable: 'false' },
      h('defs', null, h('mask', { id: id, maskUnits: 'userSpaceOnUse', x: 0, y: 0, width: 160, height: 120 },
        h('rect', { x: 0, y: 0, width: 160, height: 120, fill: '#fff' }),
        h('path', { d: 'M8 60 Q80 76 152 54', fill: 'none', stroke: '#000', strokeWidth: 5 }),
        h('path', { d: 'M14 76 Q80 90 146 72', fill: 'none', stroke: '#000', strokeWidth: 5 }))),
      h('path', { d: 'M8 36 Q80 58 152 30 Q142 82 114 92 H44 Q18 82 8 36 Z', fill: 'currentColor', mask: 'url(#' + id + ')' }));
  }
  var LOGO_NAME = { ark: 'THE ARK GROUP', iris: 'íris', pulse: 'pulse' };
  function Logo(props) {
    var brand = props.brand || 'ark';
    var size = props.size || 28;
    var id = useUid('ak-mask');
    var label = props.name || LOGO_NAME[brand];
    var mark = brand === 'iris' ? IrisMark(size) : brand === 'ark' ? ArkMark(Math.round(size * 0.62), id) : null;
    var textCls = brand === 'ark' ? 'ak-logo-name ak-logo-caps' : 'ak-logo-name';
    var fs = brand === 'ark' ? Math.round(size * 0.52) : Math.round(size * 0.82);
    return h('span', { className: cx('ak-logo', 'ak-logo-' + brand), role: 'img', 'aria-label': label === 'íris' ? 'Íris' : label },
      mark, props.markOnly && mark ? null : h('span', { className: textCls, style: { fontSize: fs + 'px' }, 'aria-hidden': 'true' }, label));
  }

  /* Button */
  function Button(props) {
    var variant = props.variant || 'primary';
    var cls = cx('ak-btn', 'ak-btn-' + variant, props.size && 'ak-btn-' + props.size, props.block && 'ak-btn-block', props.pill && 'ak-btn-pill', props.className);
    var rest = omit(props, ['variant', 'size', 'block', 'loading', 'loadingText', 'className', 'children', 'href', 'iconLeft', 'iconRight', 'pill']);
    var content = props.loading ? [h('span', { key: 's', className: 'ak-spin', 'aria-hidden': 'true' }), h('span', { key: 't' }, props.loadingText || 'Carregando…')] :
      [props.iconLeft ? h('span', { key: 'l', className: 'ak-btn-ico' }, icon(props.iconLeft, 18)) : null, h('span', { key: 'c' }, props.children), props.iconRight ? h('span', { key: 'r', className: 'ak-btn-ico' }, icon(props.iconRight, 18)) : null];
    if (props.href) return h('a', Object.assign({ href: props.href, className: cls }, rest), content);
    return h('button', Object.assign({ type: 'button', className: cls, 'aria-busy': props.loading ? 'true' : undefined, disabled: props.disabled || props.loading }, rest), content);
  }

  /* IconButton: só ícone, sempre com rótulo falado */
  function IconButton(props) {
    var rest = omit(props, ['icon', 'label', 'variant', 'className', 'size']);
    return h('button', Object.assign({ type: 'button', className: cx('ak-iconbtn', 'ak-iconbtn-' + (props.variant || 'outline'), props.size === 'sm' && 'ak-iconbtn-sm', props.className), 'aria-label': props.label, title: props.label }, rest), icon(props.icon, props.size === 'sm' ? 18 : 20));
  }

  /* ThemeToggle: largura fixa para nada pular de lugar */
  function ThemeToggle(props) {
    var c = useCtl(props.dark, !!props.defaultDark, props.onChange);
    return h('button', { type: 'button', className: 'ak-theme', 'aria-pressed': c[0] ? 'true' : 'false', onClick: function (e) { c[1](!c[0], e); }, 'data-testid': props['data-testid'] },
      icon(c[0] ? 'sun' : 'moon', 18), h('span', null, c[0] ? 'Modo claro' : 'Modo escuro'));
  }

  /* FavoriteButton */
  function FavoriteButton(props) {
    var c = useCtl(props.active, !!props.defaultActive, props.onToggle);
    var label = props.label || 'este item';
    return h('button', { type: 'button', className: 'ak-iconbtn ak-iconbtn-outline ak-fav', 'aria-pressed': c[0] ? 'true' : 'false',
      'aria-label': (c[0] ? 'Remover ' : 'Favoritar ') + label, onClick: function (e) { c[1](!c[0], e); }, 'data-testid': props['data-testid'] }, icon('heart', 20, c[0]));
  }

  /* Campos */
  function FieldShell(props) {
    var id = props.id;
    return h('div', { className: 'ak-field' },
      h('div', { className: 'ak-field-top' },
        h('label', { htmlFor: id, className: 'ak-label' }, props.label, props.optional ? h('span', { className: 'ak-opt' }, ' (opcional)') : null),
        props.count || null),
      props.children,
      props.error ? h('span', { id: id + '-error', className: 'ak-error' }, icon('alert', 16), h('span', null, props.error)) :
        props.hint ? h('span', { id: id + '-hint', className: 'ak-hint' }, props.hint) : null);
  }
  function describedBy(p) { return [p.hint && !p.error && p.id + '-hint', p.error && p.id + '-error'].filter(Boolean).join(' ') || undefined; }

  function TextField(props) {
    var c = useCtl(props.value, props.defaultValue || '', props.onChange && function (v, e) { props.onChange(e); });
    var inputProps = { id: props.id, className: 'ak-input', value: c[0], onChange: function (e) { c[1](e.target.value, e); }, placeholder: props.placeholder, maxLength: props.maxLength,
      type: props.multiline ? undefined : (props.type || 'text'), inputMode: props.inputMode, autoComplete: props.autoComplete, required: props.required, disabled: props.disabled,
      'aria-invalid': props.error ? 'true' : undefined, 'aria-describedby': describedBy(props), 'data-testid': props['data-testid'] };
    var count = props.maxLength && props.showCount ? h('span', { className: 'ak-count', 'aria-live': 'polite' }, String(c[0]).length + '/' + props.maxLength) : null;
    return h(FieldShell, Object.assign({}, props, { count: count }), h(props.multiline ? 'textarea' : 'input', inputProps));
  }

  function SearchField(props) {
    var c = useCtl(props.value, props.defaultValue || '', props.onChange);
    var id = props.id || 'busca';
    return h('div', { className: 'ak-field' },
      props.label ? h('label', { htmlFor: id, className: props.hideLabel ? 'ak-label ak-sr' : 'ak-label' }, props.label) : null,
      h('div', { className: 'ak-search' },
        h('span', { className: 'ak-search-ico' }, icon('search', 20)),
        h('input', { id: id, type: 'search', className: 'ak-input', value: c[0], placeholder: props.placeholder, maxLength: 60, 'data-testid': props['data-testid'],
          onChange: function (e) { c[1](e.target.value, e); } }),
        c[0] ? h('button', { type: 'button', className: 'ak-iconbtn ak-iconbtn-plain ak-search-clear', 'aria-label': 'Limpar busca', onClick: function () { c[1](''); } }, icon('close', 18)) : null));
  }

  function Select(props) {
    var c = useCtl(props.value, props.defaultValue || '', props.onChange && function (v, e) { props.onChange(e); });
    var opts = props.options || [];
    return h(FieldShell, props,
      h('div', { className: 'ak-select' },
        h('select', { id: props.id, className: 'ak-input', value: c[0], onChange: function (e) { c[1](e.target.value, e); }, required: props.required, disabled: props.disabled,
          'aria-invalid': props.error ? 'true' : undefined, 'aria-describedby': describedBy(props), 'data-testid': props['data-testid'] },
          props.placeholder ? h('option', { value: '', disabled: true }, props.placeholder) : null,
          opts.map(function (o) { var v = typeof o === 'string' ? o : o.value; return h('option', { key: v, value: v }, typeof o === 'string' ? o : o.label); })),
        h('span', { className: 'ak-select-ico' }, icon('chevronDown', 18))));
  }

  function Checkbox(props) {
    var c = useCtl(props.checked, !!props.defaultChecked, props.onChange);
    return h('label', { className: cx('ak-check-row', props.disabled && 'is-disabled'), htmlFor: props.id },
      h('input', { id: props.id, type: 'checkbox', className: 'ak-check-input', checked: c[0], disabled: props.disabled, onChange: function (e) { c[1](e.target.checked, e); }, 'data-testid': props['data-testid'] }),
      h('span', { className: 'ak-check-box', 'aria-hidden': 'true' }, c[0] ? icon('check', 14) : null),
      h('span', { className: 'ak-check-text' }, h('span', { className: 'ak-check-label' }, props.label), props.description ? h('span', { className: 'ak-hint' }, props.description) : null));
  }

  function Switch(props) {
    var c = useCtl(props.checked, !!props.defaultChecked, props.onChange);
    return h('div', { className: 'ak-switch-row' },
      h('span', { className: 'ak-check-text' }, h('span', { id: props.id + '-l', className: 'ak-check-label' }, props.label), props.description ? h('span', { className: 'ak-hint' }, props.description) : null),
      h('button', { type: 'button', id: props.id, role: 'switch', className: 'ak-switch', 'aria-checked': c[0] ? 'true' : 'false', 'aria-labelledby': props.id + '-l', disabled: props.disabled,
        onClick: function (e) { c[1](!c[0], e); }, 'data-testid': props['data-testid'] }, h('span', { className: 'ak-switch-knob' })));
  }

  function Segmented(props) {
    var opts = props.options || [];
    var c = useCtl(props.value, props.defaultValue || (opts[0] && opts[0].id), props.onChange);
    return h('div', { className: 'ak-seg', role: 'group', 'aria-label': props.label || 'Opções', 'data-testid': props['data-testid'] }, opts.map(function (o) {
      return h('button', { key: o.id, type: 'button', className: 'ak-seg-btn', 'aria-pressed': o.id === c[0] ? 'true' : 'false',
        onClick: function (e) { c[1](o.id, e); } }, o.label);
    }));
  }

  /* Badge / StatusBadge */
  var STATUS = {
    ativo: ['info', 'Ativo'], concluido: ['success', 'Concluído'], cancelado: ['neutral', 'Cancelado'], falta: ['danger', 'Não compareceu'],
    pendente: ['warning', 'Aguardando status'], aberto: ['success', 'Aberto agora'], fechado: ['neutral', 'Fechado'], bloqueado: ['danger', 'Bloqueado'],
    embreve: ['neutral', 'Em breve'], novo: ['brand', 'Novo']
  };
  function Badge(props) {
    var s = props.status ? (STATUS[props.status] || ['neutral', props.status]) : [props.tone || 'neutral', ''];
    return h('span', { className: 'ak-badge ak-badge-' + s[0] }, props.children || s[1]);
  }
  function StatusBadge(props) { return h(Badge, props); }

  function Chip(props) {
    var interactive = props.onClick || props.selected !== undefined;
    var content = [props.icon ? h('span', { key: 'i', className: 'ak-btn-ico' }, icon(props.icon, 16)) : null, h('span', { key: 't' }, props.children)];
    if (!interactive) return h('span', { className: 'ak-chip' }, content);
    return h('button', { type: 'button', className: 'ak-chip ak-chip-btn', 'aria-pressed': props.selected ? 'true' : 'false', onClick: props.onClick }, content);
  }

  function initials(name) {
    var p = String(name || '?').trim().split(/\s+/);
    return ((p[0] || '')[0] + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
  }
  function Avatar(props) {
    var size = props.size || 44;
    return h('span', { className: 'ak-avatar', style: { width: size, height: size, fontSize: Math.round(size * 0.36) } },
      props.src ? h('img', { src: props.src, alt: props.alt || props.name || '' }) : h('span', { 'aria-hidden': props.name ? 'true' : undefined }, initials(props.name)));
  }

  function Rating(props) {
    var c = useCtl(props.value, props.defaultValue || 0, props.onChange);
    if (props.editable) {
      var labels = ['Muito ruim', 'Ruim', 'Regular', 'Bom', 'Excelente'];
      return h('div', { className: 'ak-stars-input', role: 'radiogroup', 'aria-label': props.label || 'Sua nota' },
        [1, 2, 3, 4, 5].map(function (n) {
          return h('button', { key: n, type: 'button', role: 'radio', className: cx('ak-star', n <= c[0] && 'on'), 'aria-checked': n === c[0] ? 'true' : 'false',
            'aria-label': n + (n === 1 ? ' estrela, ' : ' estrelas, ') + labels[n - 1], onClick: function (e) { c[1](n, e); } }, icon('star', 32, n <= c[0]));
        }));
    }
    var v = props.value || 0;
    return h('span', { className: 'ak-rating', role: 'img', 'aria-label': 'Nota ' + String(v).replace('.', ',') + ' de 5' + (props.count != null ? ', ' + props.count + ' avaliações' : '') },
      h('span', { className: 'ak-stars', 'aria-hidden': 'true' }, props.compact ? icon('star', 16, true) : [1, 2, 3, 4, 5].map(function (n) { return h('span', { key: n }, icon('star', 16, n <= Math.round(v))); })),
      h('span', { 'aria-hidden': 'true' }, v.toFixed(1).replace('.', ',')),
      props.count != null ? h('span', { className: 'ak-rcount', 'aria-hidden': 'true' }, '(' + props.count + ')') : null);
  }

  /* Card */
  function Card(props) {
    var tag = props.href ? 'a' : props.onClick ? 'button' : 'div';
    return h(tag, { className: cx('ak-card', 'ak-card-' + (props.tone || 'surface'), (props.href || props.onClick) && 'ak-card-link', props.size === 'sm' && 'ak-card-sm', props.className),
      href: props.href, onClick: props.onClick, type: tag === 'button' ? 'button' : undefined, 'data-testid': props['data-testid'] },
      props.icon ? h('span', { className: 'ak-card-icon' }, typeof props.icon === 'string' ? icon(props.icon, 26) : props.icon) : null,
      props.number ? h('span', { className: 'ak-num' }, props.number) : null,
      props.title ? h('span', { className: 'ak-card-title' }, props.title, props.badge ? h(Badge, { tone: 'neutral' }, props.badge) : null) : null,
      props.text ? h('span', { className: 'ak-card-text' }, props.text) : null,
      props.children,
      props.footer ? h('span', { className: 'ak-card-footer' }, props.footer) : null);
  }

  /* StatBar: faixa de destaques do topo do site */
  function StatBar(props) {
    return h('div', { className: 'ak-statbar' }, (props.items || []).map(function (s, i) {
      return h('div', { key: i, className: 'ak-stat' }, h('b', { className: 'ak-stat-value' }, s.value), h('span', { className: 'ak-stat-label' }, s.label));
    }));
  }

  function Eyebrow(props) {
    return h('span', { className: cx('ak-eyebrow', props.tone === 'muted' && 'ak-eyebrow-muted') }, props.parens === false ? props.children : ['( ', props.children, ' )']);
  }

  function SectionHeader(props) {
    var H = 'h' + (props.level || 2);
    return h('div', { className: cx('ak-sechead', props.align === 'center' && 'ak-center') },
      props.eyebrow ? h(Eyebrow, { tone: props.eyebrowTone }, props.eyebrow) : null,
      h(H, { className: cx('ak-sechead-title', props.size === 'hero' && 'ak-hero-title') }, props.title),
      props.text ? h('p', { className: cx('ak-sechead-text', props.size === 'hero' && 'ak-lead') }, props.text) : null,
      props.actions ? h('div', { className: 'ak-row', style: { marginTop: 8 } }, props.actions) : null);
  }

  /* ListItem */
  function ListItem(props) {
    var tag = props.href ? 'a' : props.onClick ? 'button' : 'div';
    var lead = props.avatar ? h(Avatar, { name: props.avatar, size: 40 }) : props.icon ? h('span', { className: 'ak-li-icon' }, icon(props.icon, 20)) : props.leading || null;
    return h(tag, { className: cx('ak-li', tag !== 'div' && 'ak-li-link'), href: props.href, onClick: props.onClick, type: tag === 'button' ? 'button' : undefined, 'data-testid': props['data-testid'] },
      lead,
      h('span', { className: 'ak-li-text' }, h('span', { className: 'ak-li-title' }, props.title), props.subtitle ? h('span', { className: 'ak-li-sub' }, props.subtitle) : null),
      props.trailing || null,
      tag !== 'div' && props.chevron !== false ? h('span', { className: 'ak-chev' }, icon('chevronRight', 18)) : null);
  }

  function pad2(n) { return n < 10 ? '0' + n : String(n); }
  function NumberedList(props) {
    var start = props.start || 1;
    return h('ol', { className: 'ak-numlist' }, (props.items || []).map(function (it, i) {
      return h('li', { key: i, className: 'ak-numlist-item' }, h('span', { className: 'ak-num' }, pad2(start + i)),
        h('span', { className: 'ak-li-text' }, h('b', { className: 'ak-numlist-title' }, it.title), it.text ? h('span', { className: 'ak-li-sub' }, it.text) : null));
    }));
  }
  function Steps(props) {
    return h('ol', { className: cx('ak-steps', props.direction === 'row' && 'ak-steps-row') }, (props.items || []).map(function (it, i) {
      return h('li', { key: i, className: 'ak-step' }, h('span', { className: 'ak-step-n', 'aria-hidden': 'true' }, i + 1),
        h('span', { className: 'ak-li-text' }, h('b', null, it.title), it.text ? h('span', { className: 'ak-li-sub' }, it.text) : null));
    }));
  }

  /* Table: no computador é tabela; em espaço estreito vira lista de cartões */
  function Table(props) {
    var cols = props.columns || [];
    var rows = props.rows || [];
    return h('div', { className: 'ak-table-wrap' },
      h('table', { className: 'ak-table' },
        props.caption ? h('caption', { className: 'ak-sr' }, props.caption) : null,
        h('thead', null, h('tr', null, cols.map(function (c) { return h('th', { key: c.key, scope: 'col', style: { textAlign: c.align || 'left' } }, c.label); }))),
        h('tbody', null, rows.map(function (r, i) {
          return h('tr', { key: r.id || i }, cols.map(function (c, j) {
            return h(j === 0 ? 'th' : 'td', { key: c.key, scope: j === 0 ? 'row' : undefined, 'data-label': c.label, style: { textAlign: c.align || 'left' } }, r[c.key]);
          }));
        }))),
      rows.length === 0 && props.empty ? h('p', { className: 'ak-hint', style: { padding: 16 } }, props.empty) : null);
  }

  function money(v) { return 'R$ ' + Number(v).toFixed(2).replace('.', ','); }

  function ServiceItem(props) {
    var c = useCtl(props.selected, !!props.defaultSelected, props.onToggle);
    return h('div', { className: 'ak-choice-wrap' },
      h('button', { type: 'button', className: 'ak-choice', role: 'checkbox', 'aria-checked': c[0] ? 'true' : 'false', onClick: function (e) { c[1](!c[0], e); }, 'data-testid': props['data-testid'] },
        h('span', { className: 'ak-check-box', 'aria-hidden': 'true' }, c[0] ? icon('check', 14) : null),
        h('span', { className: 'ak-choice-text' },
          h('span', { className: 'ak-choice-title' }, props.name),
          props.description ? h('span', { className: 'ak-choice-desc ak-clamp2' }, props.description) : null,
          h('span', { className: 'ak-choice-desc', style: { fontWeight: 600 } }, props.duration)),
        h('span', { className: 'ak-price' }, props.priceFrom ? h('small', null, 'a partir de') : null, money(props.price))),
      props.onFavorite !== false ? h(FavoriteButton, { label: props.name, defaultActive: props.favorite }) : null);
  }

  function ProfessionalRow(props) {
    return h('div', { className: 'ak-choice-wrap' },
      h('button', { type: 'button', className: 'ak-choice ak-choice-center', role: 'radio', 'aria-checked': props.selected ? 'true' : 'false', onClick: props.onSelect, 'data-testid': props['data-testid'] },
        h('span', { className: 'ak-check-box ak-radio', 'aria-hidden': 'true' }, props.selected ? h('span', { className: 'ak-radio-dot' }) : null),
        h('span', { className: 'ak-choice-text' }, h('span', { className: 'ak-choice-title' }, props.name), props.subtitle ? h('span', { className: 'ak-choice-desc' }, props.subtitle) : null)),
      props.anyone ? null : h(FavoriteButton, { label: props.name, defaultActive: props.favorite }));
  }

  function EstablishmentCard(props) {
    var thumb = h('span', { className: 'ak-thumb', style: { background: props.color || 'var(--brand)', color: props.color ? '#FFFFFF' : 'var(--on-brand)' } },
      props.image ? h('img', { src: props.image, alt: '' }) : h('span', { 'aria-hidden': 'true' }, initials(props.name)));
    var body = h('span', { className: 'ak-li-text' },
      h('span', { className: 'ak-li-title ak-clamp2', title: props.name }, props.name),
      h('span', { className: 'ak-li-sub' }, [props.category, props.distance].filter(Boolean).join(' · ')),
      h('span', { className: 'ak-row', style: { gap: 8 } },
        props.rating != null ? h(Rating, { value: props.rating, compact: true }) : h('span', { className: 'ak-li-sub' }, 'Sem avaliações'),
        props.open != null ? h(Badge, { status: props.open ? 'aberto' : 'fechado' }) : null));
    return h(props.href ? 'a' : 'div', { className: cx('ak-li', 'ak-li-card', props.href && 'ak-li-link'), href: props.href, 'data-testid': props['data-testid'] }, thumb, body, props.href ? h('span', { className: 'ak-chev' }, icon('chevronRight', 18)) : null);
  }

  /* Feedback */
  function Alert(props) {
    var tone = props.tone || 'info';
    var ico = tone === 'danger' || tone === 'warning' ? 'alert' : tone === 'success' ? 'check' : 'info';
    return h('div', { className: 'ak-alert ak-alert-' + tone, role: tone === 'danger' ? 'alert' : 'status' }, icon(ico, 22),
      h('span', { style: { flex: '1 1 auto', minWidth: 0 } }, props.title ? h('span', { className: 'ak-alert-title' }, props.title) : null, props.children),
      props.action || null);
  }
  function Toast(props) {
    var tone = props.tone || 'success';
    return h('div', { className: 'ak-toast ak-toast-' + tone, role: 'status' }, icon(tone === 'danger' ? 'alert' : tone === 'info' ? 'info' : 'check', 20), h('span', null, props.children));
  }
  function Skeleton(props) {
    return h('span', { className: 'ak-sk', 'aria-hidden': 'true', style: { width: props.width || '100%', height: props.height || 14, borderRadius: props.circle ? 999 : (props.radius != null ? props.radius : undefined) } });
  }
  function SkeletonCard(props) {
    var v = props.variant || 'list';
    if (v === 'booking') {
      return h('div', { className: 'ak-sk-card ak-sk-col', role: 'presentation' },
        h('div', { style: { display: 'flex', gap: 12, alignItems: 'flex-start' } },
          h(Skeleton, { width: 44, height: 44, circle: true }),
          h('div', { style: { flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 8 } }, h(Skeleton, { width: '45%', height: 12 }), h(Skeleton, { width: '75%', height: 18 }), h(Skeleton, { width: '55%', height: 12 })),
          h(Skeleton, { width: 64, height: 24, radius: 999 })),
        h('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 } }, h(Skeleton, { width: 64, height: 16 }),
          h('div', { style: { display: 'flex', gap: 8 } }, h(Skeleton, { width: 84, height: 44, radius: 12 }), h(Skeleton, { width: 92, height: 44, radius: 12 }))));
    }
    if (v === 'card') {
      return h('div', { className: 'ak-sk-card ak-sk-col', role: 'presentation' }, h(Skeleton, { width: 52, height: 52, radius: 16 }), h(Skeleton, { width: '60%', height: 22 }), h(Skeleton, { width: '95%', height: 12 }), h(Skeleton, { width: '80%', height: 12 }));
    }
    var lead = v === 'establishment' ? h(Skeleton, { width: 64, height: 64, radius: 14 }) : v === 'service' ? h(Skeleton, { width: 24, height: 24, radius: 8 }) : h(Skeleton, { width: 44, height: 44, circle: true });
    return h('div', { className: 'ak-sk-card', role: 'presentation' }, lead,
      h('div', { style: { flex: '1 1 auto', display: 'flex', flexDirection: 'column', gap: 8 } }, h(Skeleton, { width: '70%', height: 16 }), h(Skeleton, { width: '45%', height: 12 }), h(Skeleton, { width: '30%', height: 12 })),
      v === 'service' ? h(Skeleton, { width: 56, height: 16 }) : null);
  }
  function EmptyState(props) {
    return h('div', { className: 'ak-empty' },
      props.icon ? h('span', { className: 'ak-empty-ico' }, icon(props.icon, 28)) : null,
      h('b', { className: 'ak-empty-title' }, props.title),
      props.text ? h('span', { className: 'ak-li-sub' }, props.text) : null,
      props.action || null);
  }

  /* Sobreposições: no produto abrem sobre a tela; no preview, dentro de um host */
  var TONE = { warning: ['var(--warning-soft)', 'var(--warning-ink)'], danger: ['var(--danger-soft)', 'var(--danger-ink)'], info: ['var(--info-soft)', 'var(--info-ink)'], brand: ['var(--brand-soft)', 'var(--brand-ink)'] };
  function OverlayBody(props, cls) {
    var tone = TONE[props.tone || 'brand'];
    return [props.icon ? h('div', { key: 'i', className: 'ak-sheet-icon', style: { background: tone[0], color: tone[1] } }, icon(props.icon, 26)) : null,
      h('h2', { key: 't', id: props.id + '-t', className: 'ak-sheet-title' }, props.title),
      props.text ? h('p', { key: 'x', className: 'ak-sheet-text' }, props.text) : null,
      props.children ? h('div', { key: 'c' }, props.children) : null,
      props.actions ? h('div', { key: 'a', className: cls }, props.actions) : null];
  }
  function BottomSheet(props) {
    var sheet = h('div', { className: 'ak-sheet', role: props.alert ? 'alertdialog' : 'dialog', 'aria-modal': 'true', 'aria-labelledby': props.id + '-t', 'data-testid': props['data-testid'] },
      h('div', { className: 'ak-grabber', 'aria-hidden': 'true' }), OverlayBody(props, 'ak-sheet-actions'));
    return h('div', { className: 'ak-host', style: { height: props.hostHeight || 520 } }, h('div', { className: 'ak-overlay', 'aria-hidden': 'true' }), sheet);
  }
  function Dialog(props) {
    var box = h('div', { className: 'ak-dialog', role: props.alert ? 'alertdialog' : 'dialog', 'aria-modal': 'true', 'aria-labelledby': props.id + '-t', 'data-testid': props['data-testid'] },
      props.onClose ? h(IconButton, { icon: 'close', label: 'Fechar', variant: 'plain', className: 'ak-dialog-close', onClick: props.onClose }) : null,
      OverlayBody(props, 'ak-dialog-actions'));
    return h('div', { className: 'ak-host ak-host-center', style: { height: props.hostHeight || 420 } }, h('div', { className: 'ak-overlay', 'aria-hidden': 'true' }), box);
  }

  /* Navegação */
  function TopBar(props) {
    return h('header', { className: 'ak-topbar' },
      props.back !== false ? h(props.backHref ? 'a' : 'button', { type: props.backHref ? undefined : 'button', href: props.backHref, className: 'ak-iconbtn ak-iconbtn-plain', 'aria-label': 'Voltar', onClick: props.onBack, 'data-testid': 'topbar-voltar' }, icon('chevronLeft', 22)) : null,
      h('span', { className: 'ak-topbar-title' }, props.title),
      props.action || null);
  }
  function TabBar(props) {
    var items = props.items || [{ id: 'inicio', label: 'Início', icon: 'store' }, { id: 'agendamentos', label: 'Agendamentos', icon: 'calendar' }, { id: 'perfil', label: 'Perfil', icon: 'user' }];
    var c = useCtl(props.active, items[0] && items[0].id, props.onNavigate);
    return h('nav', { className: 'ak-tabbar', 'aria-label': props.label || 'Navegação principal' }, items.map(function (t) {
      return h('a', { key: t.id, href: t.href || '#', className: 'ak-tab', 'aria-current': t.id === c[0] ? 'page' : undefined, 'data-testid': 'tabbar-' + t.id,
        onClick: t.href ? undefined : function (e) { e.preventDefault(); c[1](t.id, e); } }, icon(t.icon, 24), h('span', null, t.label));
    }));
  }
  function SideNav(props) {
    var items = props.items || [];
    var c = useCtl(props.active, items[0] && items[0].id, props.onNavigate);
    return h('nav', { className: 'ak-sidenav', 'aria-label': props.label || 'Menu do painel' },
      props.brand ? h('div', { className: 'ak-sidenav-brand' }, h(Logo, { brand: props.brand, size: 26, name: props.brandName })) : null,
      h('ul', { className: 'ak-sidenav-list' }, items.map(function (t) {
        return h('li', { key: t.id }, h('a', { href: t.href || '#', className: 'ak-sidenav-item', 'aria-current': t.id === c[0] ? 'page' : undefined,
          onClick: t.href ? undefined : function (e) { e.preventDefault(); c[1](t.id, e); } }, icon(t.icon, 20), h('span', { style: { flex: '1 1 auto' } }, t.label), t.count != null ? h('span', { className: 'ak-sidenav-count' }, t.count) : null));
      })),
      props.footer ? h('div', { className: 'ak-sidenav-footer' }, props.footer) : null);
  }

  function SiteHeader(props) {
    var open = useState(false);
    var id = useUid('ak-menu');
    var links = props.links || [];
    var theme = props.themeToggle !== false ? h(ThemeToggle, { dark: props.dark, defaultDark: props.defaultDark, onChange: props.onThemeChange }) : null;
    var cta = props.cta ? h(Button, { href: props.cta.href || '#', pill: props.pill, size: 'md' }, props.cta.label) : null;
    return h('header', { className: cx('ak-siteheader', props.sticky !== false && 'ak-sticky') },
      h('div', { className: 'ak-siteheader-in' },
        h('a', { href: props.homeHref || '#', className: 'ak-siteheader-logo', 'aria-label': 'Início' }, h(Logo, { brand: props.brand || 'ark', size: props.brand === 'iris' ? 30 : 34, name: props.brandName })),
        h('nav', { className: 'ak-siteheader-nav', 'aria-label': 'Menu' },
          links.map(function (l) { return h('a', { key: l.label, href: l.href || '#', className: 'ak-navlink' }, l.label); }), theme, cta),
        h('div', { className: 'ak-siteheader-mobile' },
          cta,
          h('button', { type: 'button', className: 'ak-iconbtn ak-iconbtn-outline', 'aria-expanded': open[0] ? 'true' : 'false', 'aria-controls': id, 'aria-label': open[0] ? 'Fechar menu' : 'Abrir menu',
            onClick: function () { open[1](!open[0]); } }, icon(open[0] ? 'close' : 'menu', 20)))),
      open[0] ? h('div', { id: id, className: 'ak-siteheader-drawer' },
        links.map(function (l) { return h('a', { key: l.label, href: l.href || '#', className: 'ak-drawer-link' }, l.label); }), theme) : null);
  }

  function Footer(props) {
    return h('footer', { className: 'ak-footer' },
      h('div', { className: 'ak-footer-grid' },
        h('div', { className: 'ak-footer-brand' }, h(Logo, { brand: props.brand || 'ark', size: 28, name: props.brandName }), props.tagline ? h('span', null, props.tagline) : null),
        (props.columns || []).map(function (col) {
          return h('div', { key: col.title, className: 'ak-footer-col' }, h('b', null, col.title), (col.items || []).map(function (it, i) {
            return typeof it === 'string' ? h('span', { key: i }, it) : h('a', { key: i, href: it.href || '#' }, it.label);
          }));
        })),
      h('div', { className: 'ak-footer-bottom' }, h('span', null, props.legal || ''), h('span', { className: 'ak-row', style: { gap: 18 } }, (props.bottomLinks || []).map(function (l) { return h('a', { key: l.label, href: l.href || '#' }, l.label); }))));
  }

  /* Site */
  function Accordion(props) {
    return h('div', { className: 'ak-acc' }, (props.items || []).map(function (it, i) {
      return h('details', { key: i, className: 'ak-acc-item', open: props.defaultOpen === i ? true : undefined },
        h('summary', { className: 'ak-acc-q' }, h('span', null, it.q), h('span', { className: 'ak-acc-plus', 'aria-hidden': 'true' }, '+')),
        h('p', { className: 'ak-acc-a' }, it.a));
    }));
  }
  function Comparison(props) {
    var b = props.before || {}, a = props.after || {};
    return h('div', { className: 'ak-cmp-wrap' }, h('div', { className: 'ak-cmp' },
      h('div', { className: 'ak-cmp-side ak-cmp-before' }, h('b', null, b.title || 'Antes'),
        h('ul', null, (b.items || []).map(function (t, i) { return h('li', { key: i }, h('span', { 'aria-hidden': 'true' }, icon('close', 16)), h('span', null, t)); }))),
      h('span', { className: 'ak-cmp-vs', 'aria-hidden': 'true' }, 'VS'),
      h('div', { className: 'ak-cmp-side ak-cmp-after' }, h('b', null, a.title || 'Depois'),
        h('ul', null, (a.items || []).map(function (t, i) { return h('li', { key: i }, h('span', { 'aria-hidden': 'true' }, icon('check', 16)), h('span', null, t)); })))));
  }
  function PlanCard(props) {
    return h('div', { className: cx('ak-plan', props.highlight && 'ak-plan-hi', props.soon && 'ak-plan-soon'), 'data-testid': props['data-testid'] },
      h('div', { className: 'ak-plan-head' }, h('b', { className: 'ak-plan-name' }, props.name), props.badge ? h(Badge, { tone: 'brand' }, props.badge) : null),
      props.description ? h('span', { className: 'ak-li-sub' }, props.description) : null,
      props.soon ? h('span', { className: 'ak-plan-soonlbl' }, 'Em breve') : h('span', { className: 'ak-plan-price' }, h('b', null, props.price), props.period ? h('span', null, props.period) : null),
      props.features ? h('ul', { className: 'ak-plan-feat' }, props.features.map(function (f, i) { return h('li', { key: i }, h('span', { 'aria-hidden': 'true' }, icon('check', 14)), h('span', null, f)); })) : null,
      props.cta && !props.soon ? h('div', { style: { marginTop: 'auto' } }, h(Button, { variant: props.highlight ? 'primary' : 'secondary', size: 'lg', block: true, href: props.cta.href || '#' }, props.cta.label)) : null);
  }
  function PriceList(props) {
    return h('div', { className: 'ak-pricelist' }, (props.items || []).map(function (it, i) {
      return h('div', { key: i, className: 'ak-price-row' }, h('b', { className: 'ak-price-name' }, it.name), h('span', { className: 'ak-li-sub' }, it.desc), h('span', { className: 'ak-price-val' }, it.price));
    }));
  }

  window.Ark = Object.assign(window.Ark || {}, {
    Logo: Logo, Icon: Icon, Button: Button, IconButton: IconButton, ThemeToggle: ThemeToggle, FavoriteButton: FavoriteButton,
    TextField: TextField, SearchField: SearchField, Select: Select, Checkbox: Checkbox, Switch: Switch, Segmented: Segmented,
    Badge: Badge, StatusBadge: StatusBadge, Chip: Chip, Avatar: Avatar, Rating: Rating, Card: Card, StatBar: StatBar, Eyebrow: Eyebrow, SectionHeader: SectionHeader,
    ListItem: ListItem, NumberedList: NumberedList, Steps: Steps, Table: Table, ServiceItem: ServiceItem, ProfessionalRow: ProfessionalRow, EstablishmentCard: EstablishmentCard,
    Alert: Alert, Toast: Toast, Skeleton: Skeleton, SkeletonCard: SkeletonCard, EmptyState: EmptyState, BottomSheet: BottomSheet, Dialog: Dialog,
    TopBar: TopBar, TabBar: TabBar, SideNav: SideNav, SiteHeader: SiteHeader, Footer: Footer,
    Accordion: Accordion, Comparison: Comparison, PlanCard: PlanCard, PriceList: PriceList
  });
})();
