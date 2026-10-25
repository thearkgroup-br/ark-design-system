import { useState } from 'react';
import { Button, Checkbox, SearchField, Segmented, Select, Switch, buscaEncontra, useTermoDeBusca } from '../../src';
import { Exemplo, Secao } from '../Secao';

const NEGOCIOS = ['Salão Bela Vista', 'Barbearia do João', 'Estúdio Conceição', 'Clínica Ágil', 'Espaço Zen'];

export function Busca() {
  const [texto, setTexto] = useState('');
  const termo = useTermoDeBusca(texto);
  const lista = termo ? NEGOCIOS.filter((n) => buscaEncontra(n, termo)) : NEGOCIOS;
  return (
    <Secao id="searchfield" titulo="SearchField">
      <Exemplo titulo="Busca com 2 caracteres, 300 ms, sem acento">
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SearchField
            label="Buscar estabelecimento"
            hideLabel
            placeholder="Buscar serviço ou estabelecimento"
            value={texto}
            onChange={setTexto}
            data-testid="ark-showcase-searchfield-search-input"
          />
          <ul className="vt-lista" data-testid="ark-showcase-searchfield-result-list">
            {lista.length ? lista.map((n) => <li key={n}>{n}</li>) : <li>Nenhum resultado para "{texto.trim()}".</li>}
          </ul>
        </div>
      </Exemplo>
      <Exemplo titulo="Com rótulo visível">
        <SearchField label="Buscar cliente" placeholder="Nome ou celular" />
      </Exemplo>
    </Secao>
  );
}

const MOTIVOS = ['Imprevisto com o profissional', 'Estabelecimento fechado', 'O cliente pediu', 'Outro'];

export function Selecao() {
  const [motivo, setMotivo] = useState('');
  const [erro, setErro] = useState<string>();
  return (
    <Secao id="select" titulo="Select">
      <Exemplo titulo="Com placeholder e erro ao sair">
        <Select
          id="vt-motivo"
          label="Motivo do cancelamento"
          placeholder="Escolha o motivo"
          options={MOTIVOS}
          value={motivo}
          onChange={(e) => {
            setMotivo(e.target.value);
            setErro(undefined);
          }}
          onBlur={() => setErro(motivo ? undefined : 'Escolha o motivo para cancelar.')}
          error={erro}
          data-testid="ark-showcase-select-reason-select"
        />
        <Select id="vt-assunto" label="Assunto" optional hint="Ajuda a gente a responder mais rápido." options={['Agendamento', 'Pagamento', 'Conta', 'Problema no app', 'Outro']} />
        <Select id="vt-off-select" label="Categoria" disabled options={['Cabelo', 'Barba']} />
      </Exemplo>
    </Secao>
  );
}

export function Escolhas() {
  const [aceite, setAceite] = useState(false);
  const [enviou, setEnviou] = useState(false);
  return (
    <Secao id="checkbox" titulo="Checkbox">
      <Exemplo titulo="Aceite de dados (LGPD)">
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}
          onSubmit={(e) => {
            e.preventDefault();
            setEnviou(true);
          }}
        >
          <Checkbox
            id="vt-aceite"
            label={
              <>
                Aceito que a The Ark Group use meus dados para responder este contato, conforme a <a href="#checkbox">política de privacidade</a>
              </>
            }
            checked={aceite}
            onChange={setAceite}
            error={enviou && !aceite ? 'Para continuar, aceite o uso dos dados.' : undefined}
            data-testid="ark-showcase-checkbox-terms-checkbox"
          />
          <div>
            <Button type="submit" pill data-testid="ark-showcase-checkbox-submit-button">Fale com a gente</Button>
          </div>
        </form>
      </Exemplo>
      <Exemplo titulo="Com descrição e desativado">
        <Checkbox id="vt-encaixe" label="Permitir encaixe" description="O cliente pode marcar entre dois horários." defaultChecked />
        <Checkbox id="vt-off-check" label="Aceitar pagamento na hora" description="Disponível no plano Para equipes." disabled />
      </Exemplo>
    </Secao>
  );
}

export function Interruptores() {
  return (
    <Secao id="switch" titulo="Switch">
      <Exemplo titulo="Configuração que vale na hora">
        <div style={{ width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Switch id="vt-lembrete" label="Lembrete 1 dia antes" description="Mandamos uma mensagem na véspera do horário." defaultChecked data-testid="ark-showcase-switch-reminder-switch" />
          <Switch id="vt-avisos" label="Avisos de novos agendamentos" />
          <Switch id="vt-off-switch" label="Pagamento online" description="Em breve." disabled />
        </div>
      </Exemplo>
    </Secao>
  );
}

export function Segmentos() {
  const [visao, setVisao] = useState('day');
  return (
    <Secao id="segmented" titulo="Segmented">
      <Exemplo titulo="Escolha única">
        <div style={{ width: '100%', maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Segmented
            label="Visão da agenda"
            options={[{ id: 'day', label: 'Dia' }, { id: 'team', label: 'Equipe' }, { id: 'week', label: 'Semana' }]}
            value={visao}
            onChange={setVisao}
            data-testid="ark-showcase-segmented-view-group"
          />
          <span className="ak-hint">Escolhido: {visao}</span>
          <Segmented label="Tipo" options={[{ id: 'booking', label: 'Agendamento' }, { id: 'block', label: 'Bloqueio' }]} />
        </div>
      </Exemplo>
    </Secao>
  );
}
