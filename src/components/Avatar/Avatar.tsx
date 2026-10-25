import { iniciais, type TestIdProps } from '../../utils';

export interface AvatarProps extends TestIdProps {
  name?: string;
  src?: string;
  alt?: string;
  /** 32 em tabelas, 40 em listas, 56 no perfil. Padrão 44. */
  size?: number;
}

/** Foto ou iniciais (primeira e última) de uma pessoa. Com foto, o texto alternativo é o nome. */
export function Avatar({ name, src, alt, size = 44, 'data-testid': testId }: AvatarProps) {
  return (
    <span className="ak-avatar" style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }} data-testid={testId}>
      {src ? <img src={src} alt={alt ?? name ?? ''} /> : <span aria-hidden={name ? true : undefined}>{iniciais(name)}</span>}
      {!src && name && <span className="ak-sr">{name}</span>}
    </span>
  );
}
