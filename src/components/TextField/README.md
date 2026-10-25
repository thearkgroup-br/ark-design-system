# TextField

Campo de texto com rótulo sempre visível, dica ou erro abaixo e contador opcional.

**Textos**
- Rótulo curto e claro ("Nome completo", "Celular"). Nunca use o placeholder no lugar do rótulo.
- Placeholder só como exemplo: "Ex.: Maria Souza".
- Campo não obrigatório leva "(opcional)" no rótulo; obrigatório não leva asterisco.
- Erro diz como resolver: "Digite o celular com DDD: 11 números." Nunca "Campo inválido".

**Regras**
- Siga a seção Regras de campos (limites, máscara e mensagem de cada campo).
- O erro aparece ao sair do campo ou ao enviar, nunca enquanto a pessoa digita. O componente só mostra o `error` que recebe: quem decide a hora é o formulário (use `onBlur`).
- Campo com limite mostra contador ("42/300").
- Fonte de 16 px no campo (evita zoom automático no iPhone); altura 52 px.
- Erro tem ícone + texto (não depende só da cor). Ao enviar com erro, o formulário leva o foco ao primeiro campo errado (a `ref` do TextField aponta para o input).

## API

| Prop | Tipo | Observação |
| --- | --- | --- |
| `id` | `string` | obrigatório; liga o rótulo e é a base de `{id}-hint` e `{id}-error` |
| `label` | `string` | obrigatório |
| `hint`, `error` | `string` | o erro substitui a dica e entra no `aria-describedby` |
| `optional` | `boolean` | mostra "(opcional)" |
| `value`, `defaultValue`, `onChange` | | controlado ou não; `onChange` recebe o evento |
| `onBlur` | | para validar ao sair do campo |
| `maxLength`, `showCount` | | contador "n/max" com `aria-live="polite"` |
| `multiline` | `boolean` | vira `<textarea>` |
| `type`, `inputMode`, `autoComplete`, `required`, `disabled`, `placeholder`, `name` | | repassados ao campo |
| `data-testid` | `string` | ver abaixo |

## data-testid

O id recebido vai no `<input>` (ou `<textarea>`), não na `div` em volta. As partes internas usam o id sem o sufixo `-input`:

| Parte | data-testid (com `iris-signup-phone-input`) |
| --- | --- |
| Campo | `iris-signup-phone-input` |
| Mensagem de erro | `iris-signup-phone-error` |
| Dica | `iris-signup-phone-hint` |
| Contador | `iris-signup-phone-count` |
