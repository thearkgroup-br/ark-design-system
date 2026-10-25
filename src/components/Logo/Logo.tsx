import { cx, useIdDoDom, type TestIdProps } from '../../utils';

export type Marca = 'ark' | 'iris' | 'pulse';

export interface LogoProps extends TestIdProps {
  brand?: Marca;
  /** Altura do símbolo em px: 26–34 no cabeçalho, 40 em telas de entrada. */
  size?: number;
  /** Só o símbolo (ícone de app, favicon). O Pulse ainda não tem símbolo e continua com o nome. */
  markOnly?: boolean;
  /** Troca o nome escrito (ex.: "ARCA DEV" com brand="ark"). */
  name?: string;
}

const NOME: Record<Marca, string> = { ark: 'THE ARK GROUP', iris: 'íris', pulse: 'pulse' };

// Cores fixas do desenho da íris (logos/README.md: a pupila é sempre #17142B e o brilho é branco).
// Fazem parte do logo, como nos arquivos SVG, e por isso não viram token. A íris em si usa currentColor (brand).
const PUPILA = '#17142B';
const BRILHO = '#FFFFFF';
const CRESCENTE = 'M48 22 A42 42 0 0 0 48 98 A50 50 0 0 1 48 22 Z';
const FIBRAS = Array.from({ length: 40 }, (_, k) => {
  const t = (2 * Math.PI * k) / 40;
  return { x1: 60 + 25 * Math.cos(t), y1: 60 + 25 * Math.sin(t), x2: 60 + 48 * Math.cos(t), y2: 60 + 48 * Math.sin(t) };
});

function SimboloIris({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" focusable="false">
      <circle cx={60} cy={60} r={52} fill="currentColor" />
      <g stroke={BRILHO} strokeWidth={2} strokeLinecap="round" opacity={0.35}>
        {FIBRAS.map((f, i) => (
          <line key={i} {...f} />
        ))}
      </g>
      <circle cx={60} cy={60} r={21} fill={PUPILA} />
      <path d={CRESCENTE} fill={BRILHO} />
    </svg>
  );
}

function SimboloArk({ size }: { size: number }) {
  const mascara = useIdDoDom('ak-mask');
  return (
    <svg width={Math.round((size * 152) / 70)} height={size} viewBox="4 26 152 70" aria-hidden="true" focusable="false">
      <defs>
        <mask id={mascara} maskUnits="userSpaceOnUse" x={0} y={0} width={160} height={120}>
          {/* Na máscara, branco mostra e preto recorta: são valores de máscara, não cor de interface. */}
          <rect x={0} y={0} width={160} height={120} fill="white" />
          <path d="M8 60 Q80 76 152 54" fill="none" stroke="black" strokeWidth={5} />
          <path d="M14 76 Q80 90 146 72" fill="none" stroke="black" strokeWidth={5} />
        </mask>
      </defs>
      <path d="M8 36 Q80 58 152 30 Q142 82 114 92 H44 Q18 82 8 36 Z" fill="currentColor" mask={`url(#${mascara})`} />
    </svg>
  );
}

/** Logo de cada marca, desenhado em código para acompanhar o tema. O data-testid vai no elemento com role="img". */
export function Logo({ brand = 'ark', size = 28, markOnly, name, 'data-testid': testId }: LogoProps) {
  const nome = name ?? NOME[brand];
  const simbolo = brand === 'iris' ? <SimboloIris size={size} /> : brand === 'ark' ? <SimboloArk size={Math.round(size * 0.62)} /> : null;
  const tamanhoDoNome = brand === 'ark' ? Math.round(size * 0.52) : Math.round(size * 0.82);
  return (
    <span className={cx('ak-logo', `ak-logo-${brand}`)} role="img" aria-label={nome === 'íris' ? 'Íris' : nome} data-testid={testId}>
      {simbolo}
      {!(markOnly && simbolo) && (
        <span className={cx('ak-logo-name', brand === 'ark' && 'ak-logo-caps')} style={{ fontSize: tamanhoDoNome }} aria-hidden="true">
          {nome}
        </span>
      )}
    </span>
  );
}
