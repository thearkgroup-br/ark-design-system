import { forwardRef, useImperativeHandle, useRef } from 'react';
import { renderIcon } from '../../icons/icons';
import { BUSCA_MAXIMO, testIdParte, useControllable, useIdDoDom, type TestIdProps } from '../../utils';
import { IconButton } from '../IconButton/IconButton';

export interface SearchFieldProps extends TestIdProps {
  /** Sem id, um id único é gerado (evita repetir "busca" quando há duas buscas na tela). */
  id?: string;
  label?: string;
  /** Esconde o rótulo na tela, mas o leitor de tela continua lendo. */
  hideLabel?: boolean;
  /** Diz o que dá para buscar: "Buscar serviço ou estabelecimento". */
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  /** Chamado a cada tecla com o texto. Para buscar, use `useTermoDeBusca` (2 caracteres, 300 ms, sem acento). */
  onChange?: (value: string) => void;
  name?: string;
}

/** Campo de busca com ícone e botão de limpar. O data-testid vai no input; o limpar ganha `{base}-clear-button`. */
export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(function SearchField(
  { id, label, hideLabel, placeholder, value, defaultValue, onChange, name, 'data-testid': testId },
  ref,
) {
  const idGerado = useIdDoDom('ak-busca');
  const campoId = id ?? idGerado;
  const [atual, definir] = useControllable<string>(value, defaultValue ?? '', onChange);
  const input = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => input.current as HTMLInputElement, []);

  return (
    <div className="ak-field">
      {label && (
        <label htmlFor={campoId} className={hideLabel ? 'ak-label ak-sr' : 'ak-label'}>
          {label}
        </label>
      )}
      <div className="ak-search">
        <span className="ak-search-ico">{renderIcon('search', 20)}</span>
        <input
          ref={input}
          id={campoId}
          name={name}
          type="search"
          className="ak-input"
          value={atual}
          placeholder={placeholder}
          maxLength={BUSCA_MAXIMO}
          aria-label={label ? undefined : placeholder || 'Buscar'}
          onChange={(e) => definir(e.target.value)}
          data-testid={testId}
        />
        {atual && (
          <IconButton
            icon="close"
            label="Limpar busca"
            variant="plain"
            className="ak-search-clear"
            onClick={() => {
              definir('');
              input.current?.focus();
            }}
            data-testid={testIdParte(testId, 'clear-button')}
          />
        )}
      </div>
    </div>
  );
});
