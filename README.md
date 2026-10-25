# ark-design-system

Tokens e componentes React da The Ark Group, usados no app da Íris e nos sites do grupo.

Os componentes são os mesmos em todo lugar. O que muda de uma marca para outra é o tema, escolhido pelo atributo `data-theme` na raiz da página.

| Marca | Claro | Escuro |
| --- | --- | --- |
| The Ark Group e Arca Dev | `ark` | `ark-escuro` |
| Íris | `iris` | `iris-escuro` |
| Pulse | `pulse` | `pulse-escuro` |

## Como usar

```bash
npm install "git+ssh://git@github.com/<org>/ark-design-system.git#v0.1.0"
```

Na raiz do app, uma vez:

```tsx
import 'ark-design-system/fonte.css'; // Plus Jakarta Sans servida pelo app
import 'ark-design-system/estilos.css'; // tokens dos 6 temas + componentes
import { Button, TextField } from 'ark-design-system';
```

```html
<html lang="pt-BR" data-theme="iris">
  <body class="ak-root">…</body>
</html>
```

- Troque `iris` ↔ `iris-escuro` quando a pessoa usar o `ThemeToggle` e guarde a escolha no aparelho.
- Todo componente aceita `data-testid` e repassa para o elemento certo. As partes internas (erro do campo, fechar do diálogo, abas, itens) derivam desse id: veja o README de cada componente em `src/components/`.
- Logos em arquivo: `ark-design-system/logos/iris-simbolo.svg` etc. Tokens em JSON: `ark-design-system/tokens.json`.

## Desenvolvimento

| O quê | Comando |
| --- | --- |
| Instalar | `npm install` |
| Vitrine local | `npm run vitrine` (http://localhost:5180) |
| Testes | `npm test` |
| Cobertura (mínimo de 80% por arquivo) | `npm run test:coverage` |
| Lint e tipos | `npm run lint` |
| Regenerar tokens | `npm run tokens` |
| Build | `npm run build` |

Publicar uma versão: subir `version` no `package.json`, mergear na `main` e criar a tag `vX.Y.Z`.

A pasta `referencia/` tem o design system de origem (regras, tokens, API dos componentes e logos). Não é código de produção.
