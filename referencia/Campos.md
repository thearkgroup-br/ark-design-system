# Regras de campos

Vale para todos os produtos do grupo (site, app e painel). As tabelas de Cliente, Chamado e Estabelecimento são da Íris; os campos de contato servem para qualquer site. **O backend é a fonte da verdade**: valida tudo de novo, mesmo que o front já tenha validado. O front valida só para dar resposta rápida.

## Como validar

- Tirar espaços do começo e do fim; trocar espaços repetidos por um só.
- Mostrar o erro ao sair do campo ou ao tentar enviar, nunca enquanto a pessoa digita.
- Ao enviar com erro, levar o foco para o primeiro campo com problema.
- Campos com limite mostram contador ("42/80").
- "Letras" inclui acentos e ç (À-ÿ). Emoji não é aceito em nenhum campo de nome.

## Contato (sites do grupo)

| Campo | Obrigatório | Tipo | Mín | Máx | Formato | Mensagem de erro |
|---|---|---|---|---|---|---|
| Seu nome | Sim | Letras, espaço, apóstrofo, hífen | 2 | 80 | — | "Digite seu nome." |
| Empresa | Não | Livre | 0 | 80 | — | "Use até 80 caracteres." |
| WhatsApp | Sim | Só números | 10 | 11 | (11) 91234-5678 | "Digite o WhatsApp com DDD." |
| O que você precisa | Sim | Lista | — | — | — | "Escolha uma opção." |
| Mensagem | Não | Livre | 0 | 500 | Contador | "Use até 500 caracteres." |
| Aceite de dados | Sim | Checkbox | — | — | Texto diz o uso dos dados (LGPD) | "Para continuar, aceite o uso dos dados." |

## Cliente (Íris)

| Campo | Obrigatório | Tipo | Mín | Máx | Máscara / formato | Mensagem de erro |
|---|---|---|---|---|---|---|
| Nome completo | Sim | Letras, espaço, apóstrofo, hífen | 3 | 80 | Nome e sobrenome (2 palavras) | "Digite seu nome e sobrenome." |
| Celular | Sim | Só números | 11 | 11 | (11) 91234-5678; DDD válido; começa com 9 | "Digite o celular com DDD: 11 números." |
| E-mail | Sim | E-mail | 6 | 254 | nome@dominio.com; salvo em minúsculas | "Confira o e-mail. Exemplo: nome@email.com" |
| Nome de quem será atendido (terceiro) | Sim, quando marcado | Letras, espaço, apóstrofo, hífen, parênteses | 2 | 60 | Livre: "Pedro (filho)" | "Digite o nome de quem será atendido." |
| Cidade ou CEP (busca sem localização) | Sim | Letras ou 8 números | 3 / 8 | 60 / 8 | CEP 00000-000 | "Não encontramos esse lugar. Confira a cidade ou o CEP." |
| Busca | Não | Livre | 2 | 60 | Ignora acento e maiúscula | (sem erro; mostra "Nenhum resultado para…") |
| Comentário da avaliação | Não | Livre | 0 | 500 | Contador visível | "Use até 500 caracteres." |
| Nota da avaliação | Sim | 1 a 5 | 1 | 5 | Estrelas | "Escolha uma nota de 1 a 5." |
| Senha (opcional no cadastro) | Não | Livre | 8 | 64 | Pelo menos 1 letra e 1 número | "A senha precisa ter 8 caracteres, com letra e número." |
| Código de acesso | Sim | Só números | 6 | 6 | Vale 10 min, 5 tentativas, reenviar após 60 s | "Código errado. Você ainda tem N tentativas." |

## Chamado (ajuda, Íris)

| Campo | Obrigatório | Tipo | Mín | Máx | Mensagem de erro |
|---|---|---|---|---|---|
| Assunto | Sim | Lista: Agendamento, Pagamento, Conta, Problema no app, Outro | — | — | "Escolha um assunto." |
| Descrição | Sim | Livre | 20 | 1000 | "Conte com pelo menos 20 caracteres o que aconteceu." |
| Anexos | Não | Imagem | 0 | 3 arquivos | ver Arquivos |

## Estabelecimento (painel da Íris)

| Campo | Obrigatório | Tipo | Mín | Máx | Formato | Mensagem de erro |
|---|---|---|---|---|---|---|
| Nome do estabelecimento | Sim | Letras, números, espaço, & ' - . | 3 | 60 | — | "Use de 3 a 60 caracteres." |
| Descrição da página | Não | Livre | 0 | 500 | Contador | "Use até 500 caracteres." |
| Telefone / WhatsApp | Sim | Só números | 10 | 11 | (11) 1234-5678 ou (11) 91234-5678 | "Digite o telefone com DDD." |
| CEP | Sim | Só números | 8 | 8 | 00000-000; preenche o endereço | "CEP não encontrado. Confira os números." |
| Número | Sim | Letras e números | 1 | 10 | "123", "S/N" | "Digite o número ou S/N." |
| Complemento | Não | Livre | 0 | 60 | — | "Use até 60 caracteres." |
| Nome do serviço | Sim | Letras, números, espaço, + / - ( ) | 3 | 60 | — | "Use de 3 a 60 caracteres." |
| Descrição do serviço | Não | Livre | 0 | 300 | Contador | "Use até 300 caracteres." |
| Valor do serviço | Sim | Dinheiro | R$ 0,00 | R$ 9.999,99 | Teclado numérico, centavos | "Digite um valor até R$ 9.999,99." |
| Duração | Sim | Minutos | 5 | 480 | Múltiplo de 5 | "Escolha entre 5 min e 8 h, de 5 em 5 min." |
| Nome do profissional | Sim | Letras, espaço, apóstrofo, hífen | 2 | 60 | — | "Use de 2 a 60 letras." |
| Motivo do cancelamento | Sim | Lista: imprevisto com o profissional, estabelecimento fechado, o cliente pediu, outro | — | — | Vai para o cliente | "Escolha o motivo para cancelar." |
| Mensagem do cancelamento | Não | Livre | 0 | 200 | Vai para o cliente junto com o motivo | "Use até 200 caracteres." |
| Categoria de serviço | Sim | Letras, números, espaço | 2 | 30 | Não repete outra categoria (ignora acento e maiúscula) | "Já existe a categoria Barba." / "Use só letras, números e espaço." |
| Motivo do bloqueio de horário ou de cliente | Sim | Livre | 3 | 120 | Só a equipe vê | "Escreva o motivo." |
| Observação interna do cliente | Não | Livre | 0 | 300 | Sem dado de saúde (LGPD) | "Use até 300 caracteres." |
| Senha da equipe | Sim | Livre | 8 | 64 | Pelo menos 1 letra e 1 número | "A senha precisa ter 8 caracteres, com letra e número." |
| Cor de destaque | Sim | Cor | — | — | Contraste 4.5:1 com branco | "Essa cor fica difícil de ler. Use uma mais escura." |

Na V1 só o estabelecimento paga (a mensalidade da Íris). Dados de cobrança do dono (CPF/CNPJ, cartão) ficam com o gateway escolhido; a Íris não guarda número de cartão.

## Arquivos

| Uso | Formatos | Tamanho máx. | Medida mínima | Recorte |
|---|---|---|---|---|
| Foto do perfil (cliente) | JPG, PNG, WEBP, HEIC | 5 MB | 200 × 200 px | Quadrado, exibido em círculo |
| Logo do estabelecimento | JPG, PNG, WEBP | 2 MB | 256 × 256 px | Quadrado |
| Capa do estabelecimento | JPG, PNG, WEBP, HEIC | 5 MB | 1200 × 600 px | 2:1 |
| Foto do portfólio | JPG, PNG, WEBP, HEIC | 5 MB | 600 × 600 px | Livre, miniatura quadrada |
| Anexo de chamado | JPG, PNG, WEBP, HEIC | 5 MB cada | — | — |

- O app reduz a imagem antes de enviar (máx. 1600 px no lado maior) e converte HEIC para JPG.
- O backend confere o tipo real do arquivo (não só a extensão) e remove dados de localização da foto (EXIF).
- Mensagens:
  - Formato errado: "Esse arquivo não é aceito. Envie uma foto em JPG, PNG, WEBP ou HEIC."
  - Muito grande: "A foto passa de 5 MB. Escolha outra ou diminua o tamanho."
  - Muito pequena: "A foto é pequena demais. Use uma com pelo menos 200 × 200 px."
