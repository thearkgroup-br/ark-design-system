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
| Título | `ark-landing-audience-header-title` |
| Texto | `ark-landing-audience-header-text` |

O bloco termina em `-header`, que é região (skill `padrao-data-testid` 0.3.2): o id fica inteiro e cada parte é acrescentada no fim. Na versão 0.1.0 o `-header` saía (`ark-landing-audience-title`): quem usa no E2E precisa trocar.
