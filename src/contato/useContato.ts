import { useRef, useState, type FormEvent } from 'react';
import { ErroDeValidacao, type EnviarContato } from './enviar';
import { MENSAGEM_DA_VERIFICACAO, useTurnstile } from './useTurnstile';
import { CAMPOS, prepararDados, validarCampo, validarFormulario, type Campo, type ConfigContato, type Erros, type Valores } from './validacao';

export type EstadoDoEnvio = 'parado' | 'enviando' | 'sucesso' | 'erro';

/** id do campo na tela; o foco vai para ele quando é o primeiro com erro. */
export const ID_DO_CAMPO: Record<Campo, string> = {
  nome: 'contato-nome',
  email: 'contato-email',
  whatsapp: 'contato-whatsapp',
  empresa: 'contato-empresa',
  escolha: 'contato-escolha',
  mensagem: 'contato-mensagem',
  aceite: 'contato-aceite',
};

const VAZIO: Valores = { nome: '', email: '', whatsapp: '', empresa: '', mensagem: '', escolha: '', aceite: false };

/** Leva o foco ao primeiro campo com erro. Centraliza: rolando o mínimo, o rótulo ficava atrás do cabeçalho fixo. */
function focarPrimeiroErro(erros: Erros): boolean {
  const primeiro = CAMPOS.find((c) => erros[c]);
  if (!primeiro) return false;
  const campo = document.getElementById(ID_DO_CAMPO[primeiro]);
  campo?.focus({ preventScroll: true });
  campo?.scrollIntoView?.({ block: 'center' });
  return true;
}

/**
 * Estado do formulário de contato. O erro aparece ao sair do campo ou ao enviar, nunca
 * enquanto a pessoa digita; corrigir o campo tira o erro na hora. `siteKey` liga o Turnstile.
 */
export function useContato(enviar: EnviarContato, config: ConfigContato, siteKey?: string) {
  const [valores, setValores] = useState<Valores>(VAZIO);
  const [erros, setErros] = useState<Erros>({});
  const [estado, setEstado] = useState<EstadoDoEnvio>('parado');
  const [armadilha, setArmadilha] = useState('');
  // Trava síncrona contra clique duplo: o estado do React só muda no próximo render.
  const enviando = useRef(false);
  const { caixa, verificado, falhou, conferir, renovar } = useTurnstile(siteKey);
  // Tentou enviar sem o token: o motivo aparece, igual ao erro do aceite, e some quando o token chega.
  const [pediuVerificacao, setPediuVerificacao] = useState(false);

  const atualizarErro = (campo: Campo, erro: string | undefined) =>
    setErros((atuais) => {
      const proximos = { ...atuais };
      if (erro) proximos[campo] = erro;
      else delete proximos[campo];
      return proximos;
    });

  const mudar = <C extends Campo>(campo: C, valor: Valores[C]) => {
    // Forma funcional: o preenchimento automático do navegador muda vários campos no mesmo instante.
    setValores((atuais) => ({ ...atuais, [campo]: valor }));
    if (erros[campo] && !validarCampo(campo, { ...valores, [campo]: valor }, config)) atualizarErro(campo, undefined);
  };

  const sair = (campo: Campo) => atualizarErro(campo, validarCampo(campo, valores, config));

  const submeter = async (e: FormEvent) => {
    e.preventDefault();
    if (enviando.current) return;
    // Campo invisível preenchido é robô: finge que deu certo e não envia nada.
    if (armadilha) {
      setEstado('sucesso');
      return;
    }
    const encontrados = validarFormulario(valores, config);
    setErros(encontrados);
    const token = conferir();
    setPediuVerificacao(token === undefined);
    if (focarPrimeiroErro(encontrados)) {
      // A tela diz uma coisa só: o erro do campo, sem o alerta de um envio anterior.
      setEstado('parado');
      return;
    }
    if (token === undefined) {
      // Sem o token não envia nem fica carregando. Se a verificação falhou (script fora, erro do Turnstile), mostra o erro com a saída por e-mail.
      setEstado(falhou ? 'erro' : 'parado');
      return;
    }
    enviando.current = true;
    setEstado('enviando');
    try {
      await enviar(prepararDados(valores, config), token);
      setEstado('sucesso');
    } catch (erro) {
      if (erro instanceof ErroDeValidacao) {
        // O servidor recusou algum campo: volta ao formulário com o erro no campo, como na tela.
        setErros(erro.erros);
        setEstado('parado');
        focarPrimeiroErro(erro.erros);
      } else {
        setEstado('erro');
      }
      renovar();
    } finally {
      enviando.current = false;
    }
  };

  // Com o erro e a saída por e-mail na tela, o aviso não aparece junto: a tela diz uma coisa só.
  const erroDaVerificacao = pediuVerificacao && !verificado && estado !== 'erro' ? MENSAGEM_DA_VERIFICACAO : undefined;

  return { valores, erros, estado, armadilha, setArmadilha, mudar, sair, submeter, caixaDaVerificacao: caixa, erroDaVerificacao };
}
