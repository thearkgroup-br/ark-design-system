// Entrada "ark-design-system/contato": só o que roda na Pages Function (Workers), sem React nem componente.
// O índice continua exportando as mesmas coisas; quem roda no servidor importa daqui para não levar o React junto.
export { criarFuncaoDeContato } from './contato/funcao';
export type { Contexto, Env } from './contato/funcao';
// Peças das proteções, para a Function própria de um site (a da Ark) usar o mesmo limite, armadilha e hostname.
export { CAMPO_ARMADILHA, LIMITE_PADRAO, criarLimitador, hostnameValido, preencheuAArmadilha } from './contato/protecao';
export type { BancoD1, Limitador, ProtecaoContato } from './contato/protecao';
export type { ConfigContato, DadosDoContato, Escolha, OpcaoDeEscolha } from './contato/validacao';
