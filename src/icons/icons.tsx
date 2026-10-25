import type { ReactElement, SVGProps } from 'react';

/** Ícones de traço 2 px, viewBox 24, em currentColor. Sempre aria-hidden: quem usa dá o nome acessível. */
export const ICON_NAMES = [
  'home', 'store', 'menu', 'users', 'user', 'plus', 'search', 'close', 'chevronRight', 'chevronLeft', 'chevronDown',
  'check', 'info', 'alert', 'calendar', 'clock', 'lock', 'sun', 'moon', 'settings', 'logout', 'chart', 'code', 'pulse',
  'chat', 'mail', 'phone', 'pin', 'edit', 'trash', 'filter', 'external', 'arrowRight', 'heart', 'star',
] as const;

export type IconName = (typeof ICON_NAMES)[number];

type Forma = ['path' | 'line' | 'circle' | 'rect' | 'polyline' | 'polygon', SVGProps<SVGElement>];

const FORMAS: Record<Exclude<IconName, 'heart' | 'star'>, Forma[]> = {
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
  arrowRight: [['line', { x1: 5, y1: 12, x2: 19, y2: 12 }], ['polyline', { points: '12 5 19 12 12 19' }]],
};

const HEART = 'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z';
const STAR = '12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3';

/** Desenha o SVG de um ícone. Uso interno dos componentes; o componente público é o Icon. */
export function renderIcon(name: IconName, size = 20, filled = false): ReactElement {
  const fill = filled && (name === 'heart' || name === 'star') ? 'currentColor' : 'none';
  const strokeWidth = name === 'check' ? 3 : name === 'star' ? 1.6 : 2;
  let conteudo: ReactElement | ReactElement[];
  if (name === 'heart') conteudo = <path d={HEART} />;
  else if (name === 'star') conteudo = <polygon points={STAR} />;
  else conteudo = FORMAS[name].map(([Tag, attrs], i) => <Tag key={i} {...(attrs as object)} />);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      data-icon={name}
    >
      {conteudo}
    </svg>
  );
}
