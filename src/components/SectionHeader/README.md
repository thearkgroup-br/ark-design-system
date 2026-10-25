# SectionHeader

Rótulo + título + texto de apoio de uma seção do site. `size="hero"` é o topo da página (um por página, `level={1}`).

**Textos**
- Título afirma algo concreto, em até 2 linhas: "Feito para cada fase do seu negócio." Termina com ponto.
- Texto de apoio em uma frase, sem repetir o título.
- Nada de "Bem-vindo", "Nossa missão" ou frases genéricas.

**Tamanhos** (mudam sozinhos pela largura)
- Computador: topo 64 px, seção 44 px. Celular: topo 40 px, seção 30 px.
- `align="center"` só em seções curtas (FAQ, chamada final).

## API

| Prop | Tipo | Padrão |
| --- | --- | --- |
| `title` | `ReactNode` | |
| `eyebrow`, `eyebrowTone` | | |
| `text` | `ReactNode` | |
| `align` | `'left' \| 'center'` | `'left'` |
| `size` | `'section' \| 'hero'` | `'section'` |
| `level` | `1 \| 2 \| 3` | 2 |
| `actions` | `ReactNode` | |
| `data-testid` | `string` | |

## data-testid

| Parte | Com `ark-landing-audience-header` |
| --- | --- |
| Bloco | `ark-landing-audience-header` |
| Título | `ark-landing-audience-title` |
| Texto | `ark-landing-audience-text` |
