# SearchField

Campo de busca com ícone e botão de limpar.

- Ignora maiúsculas, acentos e espaços extras: "joao" encontra "João", "salao" encontra "Salão".
- Começa a buscar com 2 caracteres, 300 ms depois que a pessoa para de digitar. Máximo de 60 caracteres.
- Sem resultado: "Nenhum resultado para "termo"." com uma sugestão do que fazer (EmptyState).
- O placeholder diz o que dá para buscar ("Buscar serviço ou estabelecimento").

## Como buscar

O componente só avisa o texto a cada tecla (`onChange`). As regras de busca ficam em helpers exportados pelo pacote, para valer igual em toda busca:

```tsx
import { SearchField, buscaEncontra, useTermoDeBusca } from 'ark-design-system';

const [texto, setTexto] = useState('');
const termo = useTermoDeBusca(texto); // '' com menos de 2 caracteres; atualiza 300 ms depois da última tecla; sem acento e minúsculo
const lista = termo ? negocios.filter((n) => buscaEncontra(n.nome, termo)) : negocios;

<SearchField label="Buscar" hideLabel placeholder="Buscar serviço ou estabelecimento" value={texto} onChange={setTexto} data-testid="iris-home-search-input" />
```

`normalizarBusca(texto)` devolve o texto sem acento, minúsculo e sem espaços extras (para mandar à API, por exemplo).

## API

| Prop | Tipo | Observação |
| --- | --- | --- |
| `id` | `string` | opcional; sem ele, um id único é gerado (o `bundle.js` usava sempre `busca`) |
| `label`, `hideLabel` | | sem `label`, o nome falado é o placeholder ou "Buscar" |
| `placeholder` | `string` | |
| `value`, `defaultValue`, `onChange` | | `onChange(value: string)` |
| `name` | `string` | |
| `data-testid` | `string` | |

## data-testid

| Parte | Com `iris-home-search-input` |
| --- | --- |
| Campo | `iris-home-search-input` |
| Botão limpar (só aparece com texto) | `iris-home-search-clear-button` |
