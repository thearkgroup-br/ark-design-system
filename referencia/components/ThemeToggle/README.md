# ThemeToggle

Botão que alterna entre modo claro e escuro, com ícone e texto ("Modo escuro" / "Modo claro").

- Largura fixa de 156 px: ao trocar o texto, nada ao redor muda de lugar.
- O componente só avisa a escolha (`onChange`); quem usa troca o `data-theme` da página (por exemplo `iris` ↔ `iris-escuro`).
- A página abre no modo claro, a menos que a pessoa já tenha escolhido o escuro antes (guarde a escolha no aparelho).
- Fica no cabeçalho do site e no Perfil do app.
