# SiteFooter

Rodapé dos sites: usa o `Footer` e acrescenta a frase de pertencimento.

- `variant="product"` (padrão) mostra "Um produto do The Ark Group".
- `variant="group"` é o rodapé do próprio grupo (site da Ark), sem a frase.
- `logo` troca o desenho da marca por um logo de fora (marca que o `Logo` ainda não conhece).

## API

Mesmas props do `Footer` (`brand`, `brandName`, `tagline`, `columns`, `legal`, `bottomLinks`) mais `variant` e `logo`.

## data-testid

A partir de `iris-landing-footer`: `-group` (a frase), `-legal`, `-{id}-link`, `-legal-link`.
