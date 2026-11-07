// Entrada "ark-design-system/contato": só o que roda na Pages Function (Workers), sem React nem componente.
// O índice continua exportando as mesmas coisas; quem roda no servidor importa daqui para não levar o React junto.
export { criarFuncaoDeContato } from './contato/funcao';
export type { Contexto, Env } from './contato/funcao';
export { CAMPO_ARMADILHA, hostnameValido } from './contato/protecao';
export type { BancoD1, ProtecaoContato } from './contato/protecao';
export type { ConfigContato, DadosDoContato, Escolha, OpcaoDeEscolha } from './contato/validacao';
