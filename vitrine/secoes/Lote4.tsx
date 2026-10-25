import { useState } from 'react';
import {
  Alert,
  Badge,
  BottomSheet,
  Button,
  Chip,
  Dialog,
  EmptyState,
  Skeleton,
  SkeletonCard,
  Toast,
  useEstadoDeCarregamento,
  type BadgeStatus,
} from '../../src';
import { Exemplo, Secao } from '../Secao';

export function Avisos() {
  const [toast, setToast] = useState<string | null>(null);
  return (
    <Secao id="alert" titulo="Alert e Toast">
      <Exemplo titulo="Alert">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
          <Alert title="Cancelamento">Você pode cancelar até o horário de início.</Alert>
          <Alert tone="warning" title="Falta 1 dia">Confirme o horário até amanhã às 18h.</Alert>
          <Alert tone="success" title="Página publicada">Seus clientes já podem agendar.</Alert>
          <Alert tone="danger" title="Não deu para salvar" action={<Button size="sm" variant="secondary">Tentar de novo</Button>} data-testid="ark-showcase-alert-error-alert">
            Confira a conexão e tente de novo.
          </Alert>
        </div>
      </Exemplo>
      <Exemplo titulo="Toast (some em 4 s)">
        <Button variant="secondary" onClick={() => setToast('Lembrete ligado')} data-testid="ark-showcase-toast-show-button">Mostrar toast</Button>
        <Button variant="secondary" onClick={() => setToast('Removido dos favoritos')}>Outro toast</Button>
        {toast && (
          <Toast key={toast} onClose={() => setToast(null)} data-testid="ark-showcase-toast-demo-toast">
            {toast}
          </Toast>
        )}
      </Exemplo>
      <Exemplo titulo="Tons do Toast">
        <Toast duration={0}>Salvo</Toast>
        <Toast tone="danger" duration={0}>Não foi possível salvar</Toast>
        <Toast tone="info" duration={0}>Sem conexão. Tentando de novo…</Toast>
      </Exemplo>
    </Secao>
  );
}

export function Sobreposicoes() {
  const [dialogo, setDialogo] = useState(false);
  const [sheet, setSheet] = useState(false);
  return (
    <Secao id="dialog" titulo="Dialog e BottomSheet">
      <Exemplo titulo="Abrindo sobre a tela (produto)">
        <Button variant="danger-outline" onClick={() => setDialogo(true)} data-testid="ark-showcase-dialog-open-button">Cancelar agendamento</Button>
        <Button variant="secondary" onClick={() => setSheet(true)} data-testid="ark-showcase-sheet-open-button">Agendar outro horário</Button>
        <Dialog
          id="vt-dialogo"
          open={dialogo}
          onClose={() => setDialogo(false)}
          title="Cancelar o agendamento de Maria?"
          text="Ela recebe um aviso pelo WhatsApp e o horário fica livre."
          tone="danger"
          icon="alert"
          actions={
            <>
              <Button variant="secondary" onClick={() => setDialogo(false)}>Voltar</Button>
              <Button variant="danger" onClick={() => setDialogo(false)}>Sim, cancelar</Button>
            </>
          }
          data-testid="ark-showcase-cancel-dialog"
        />
        <BottomSheet
          id="vt-sheet"
          open={sheet}
          onClose={() => setSheet(false)}
          title="Você já tem 2 horários guardados"
          text="Confirme ou cancele um deles para agendar outro."
          tone="warning"
          icon="alert"
          actions={
            <>
              <Button size="lg" block onClick={() => setSheet(false)}>Ver meus horários</Button>
              <Button size="lg" block variant="ghost" onClick={() => setSheet(false)}>Agora não</Button>
            </>
          }
          data-testid="ark-showcase-limit-sheet"
        />
      </Exemplo>
      <Exemplo titulo="Prévia (hostHeight)">
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <Dialog id="vt-dialogo-previa" hostHeight={340} title="Excluir o serviço Corte?" text="Os agendamentos já marcados continuam." onClose={() => {}} actions={<><Button variant="secondary">Voltar</Button><Button variant="danger">Sim, excluir</Button></>} />
        </div>
        <div style={{ flex: '1 1 320px', minWidth: 0 }}>
          <BottomSheet id="vt-sheet-previa" hostHeight={340} alert title="Horário bloqueado" text="O estabelecimento fechou esse horário." icon="lock" tone="danger" actions={<Button size="lg" block>Escolher outro horário</Button>} />
        </div>
      </Exemplo>
    </Secao>
  );
}

export function Carregando() {
  const [carregando, setCarregando] = useState(false);
  const estado = useEstadoDeCarregamento(carregando);
  return (
    <Secao id="skeleton" titulo="Skeleton, SkeletonCard e EmptyState">
      <Exemplo titulo="Skeleton">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', width: '100%' }}>
          <Skeleton width={44} height={44} circle />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Skeleton width="60%" height={16} />
            <Skeleton width="40%" height={12} />
          </div>
        </div>
      </Exemplo>
      <Exemplo titulo="SkeletonCard (as 5 variantes)">
        <div className="vt-sk-grade">
          {(['list', 'establishment', 'service', 'booking', 'card'] as const).map((v) => (
            <div key={v}>
              <span className="ak-hint">{v}</span>
              <SkeletonCard variant={v} />
            </div>
          ))}
        </div>
      </Exemplo>
      <Exemplo titulo="useEstadoDeCarregamento: 300 ms e 10 s">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }} aria-busy={estado === 'skeleton'}>
          <div>
            <Button variant="secondary" onClick={() => setCarregando(!carregando)} data-testid="ark-showcase-skeleton-toggle-button">
              {carregando ? 'Parar de carregar' : 'Simular carregamento'}
            </Button>
          </div>
          <span className="ak-hint">Estado: {estado}</span>
          {estado === 'skeleton' && <SkeletonCard variant="establishment" />}
          {estado === 'demorou' && (
            <EmptyState icon="clock" title="Está demorando mais que o normal" text="Confira a conexão e tente de novo." action={<Button onClick={() => setCarregando(false)}>Tentar de novo</Button>} />
          )}
        </div>
      </Exemplo>
      <Exemplo titulo="EmptyState">
        <div style={{ width: '100%' }}>
          <EmptyState icon="heart" title="Nenhum favorito ainda" text="Toque no coração de um estabelecimento para guardar aqui." action={<Button>Explorar estabelecimentos</Button>} data-testid="ark-showcase-empty-favorites-empty" />
        </div>
      </Exemplo>
    </Secao>
  );
}

const STATUS: BadgeStatus[] = ['ativo', 'pendente', 'concluido', 'falta', 'cancelado', 'aberto', 'fechado', 'bloqueado', 'embreve', 'novo'];
const FILTROS = ['Hoje', 'Amanhã', 'Esta semana'];

export function Selos() {
  const [filtro, setFiltro] = useState('Hoje');
  return (
    <Secao id="badge" titulo="Badge e Chip">
      <Exemplo titulo="Badge com status padrão">
        {STATUS.map((s) => <Badge key={s} status={s} />)}
        <Badge tone="brand">Para equipes</Badge>
      </Exemplo>
      <Exemplo titulo="Chip: etiquetas e filtros">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="ak-row">
            <Chip>Salão de beleza</Chip>
            <Chip>Barbearia</Chip>
            <Chip icon="pulse">Estúdio de pilates</Chip>
          </div>
          <div className="ak-row">
            {FILTROS.map((f) => (
              <Chip key={f} selected={filtro === f} onClick={() => setFiltro(f)}>{f}</Chip>
            ))}
            <Chip icon="filter" onClick={() => {}}>Filtros</Chip>
          </div>
        </div>
      </Exemplo>
    </Secao>
  );
}
