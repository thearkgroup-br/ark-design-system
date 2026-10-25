import { useState } from 'react';
import { Button, TextField, ThemeToggle } from '../../src';
import { Exemplo, Secao } from '../Secao';

export function Botoes() {
  const [salvando, setSalvando] = useState(false);
  return (
    <Secao id="button" titulo="Button">
      <Exemplo titulo="Variantes">
        <Button data-testid="ark-showcase-button-primary-button">Agendar horário</Button>
        <Button variant="secondary">Ver horários</Button>
        <Button variant="ghost">Voltar</Button>
        <Button variant="soft">Adicionar serviço</Button>
        <Button variant="danger">Sim, cancelar</Button>
        <Button variant="danger-outline">Cancelar agendamento</Button>
      </Exemplo>
      <Exemplo titulo="Tamanhos e formas">
        <Button size="sm">Filtrar</Button>
        <Button>Salvar alterações</Button>
        <Button size="lg">Confirmar agendamento</Button>
        <Button pill iconRight="arrowRight">Fale com a gente</Button>
        <Button href="#button" variant="secondary" iconLeft="external">Abrir link</Button>
      </Exemplo>
      <Exemplo titulo="Estados">
        <Button
          loading={salvando}
          loadingText="Salvando…"
          onClick={() => {
            setSalvando(true);
            setTimeout(() => setSalvando(false), 2000);
          }}
          data-testid="ark-showcase-button-loading-button"
        >
          Salvar alterações
        </Button>
        <Button disabled>Agendar horário</Button>
        <span className="ak-hint">Escolha um horário para agendar.</span>
      </Exemplo>
      <Exemplo titulo="Block (rodapé do app)">
        <div style={{ width: '100%', maxWidth: 380 }}>
          <Button size="lg" block>Confirmar agendamento</Button>
        </div>
      </Exemplo>
    </Secao>
  );
}

const ERRO_CELULAR = 'Digite o celular com DDD: 11 números.';

export function CamposDeTexto() {
  const [celular, setCelular] = useState('');
  const [erro, setErro] = useState<string>();
  return (
    <Secao id="textfield" titulo="TextField">
      <Exemplo titulo="Básico">
        <TextField id="vt-nome" label="Nome completo" placeholder="Ex.: Maria Souza" autoComplete="name" data-testid="ark-showcase-textfield-name-input" />
        <TextField id="vt-empresa" label="Empresa" optional hint="Se tiver, ajuda a gente a entender o seu negócio." />
      </Exemplo>
      <Exemplo titulo="Erro ao sair do campo">
        <TextField
          id="vt-celular"
          label="Celular"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={celular}
          onChange={(e) => setCelular(e.target.value.replace(/\D/g, '').slice(0, 11))}
          onBlur={() => setErro(celular.length === 11 ? undefined : ERRO_CELULAR)}
          error={erro}
          hint="Com DDD, só números."
          data-testid="ark-showcase-textfield-phone-input"
        />
        <TextField id="vt-email" label="E-mail" defaultValue="maria@" error="Confira o e-mail. Exemplo: nome@email.com" />
      </Exemplo>
      <Exemplo titulo="Contador, várias linhas e desativado">
        <TextField id="vt-msg" label="Mensagem" optional multiline maxLength={500} showCount data-testid="ark-showcase-textfield-message-input" />
        <TextField id="vt-off" label="Código de acesso" disabled defaultValue="123456" />
      </Exemplo>
    </Secao>
  );
}

export function AlternarTema() {
  return (
    <Secao id="themetoggle" titulo="ThemeToggle">
      <Exemplo titulo="Só avisa a escolha (a do topo troca o tema da vitrine)">
        <ThemeToggle data-testid="ark-showcase-themetoggle-demo-button" />
        <ThemeToggle defaultDark />
      </Exemplo>
    </Secao>
  );
}
