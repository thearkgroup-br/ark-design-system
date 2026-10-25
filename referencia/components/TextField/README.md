# TextField

Campo de texto com rótulo sempre visível, dica ou erro abaixo e contador opcional.

**Textos**
- Rótulo curto e claro ("Nome completo", "Celular"). Nunca use o placeholder no lugar do rótulo.
- Placeholder só como exemplo: "Ex.: Maria Souza".
- Campo não obrigatório leva "(opcional)" no rótulo; obrigatório não leva asterisco.
- Erro diz como resolver: "Digite o celular com DDD: 11 números." Nunca "Campo inválido".

**Regras**
- Siga a seção Regras de campos (limites, máscara e mensagem de cada campo).
- O erro aparece ao sair do campo ou ao enviar, nunca enquanto a pessoa digita.
- Campo com limite mostra contador ("42/300").
- Fonte de 16 px no campo (evita zoom automático no iPhone); altura 52 px.
- Erro tem ícone + texto (não depende só da cor). Ao enviar com erro, o foco vai para o primeiro campo errado.
