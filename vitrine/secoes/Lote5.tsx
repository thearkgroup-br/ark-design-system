import { useState } from 'react';
import {
  Accordion,
  Avatar,
  Badge,
  Card,
  Comparison,
  EstablishmentCard,
  FavoriteButton,
  ListItem,
  NumberedList,
  PlanCard,
  PriceList,
  ProfessionalRow,
  Rating,
  SectionHeader,
  ServiceItem,
  StatBar,
  Steps,
  Switch,
  Table,
} from '../../src';
import { Exemplo, Secao } from '../Secao';

export function CardsELista() {
  return (
    <Secao id="card" titulo="Card, ListItem e Avatar">
      <Exemplo titulo="Card">
        <div className="vt-grade">
          <Card icon="calendar" title="Íris" text="Agenda online para pequenos negócios." href="#card" data-testid="ark-showcase-card-iris-card" />
          <Card number="01" title="Comece grátis" text="30 dias para testar, sem cartão." badge="Novo" tone="sunken" />
          <Card icon="code" title="Arca Dev" text="Sites, apps e sistemas sob medida." tone="brand" footer="Fale com a gente" />
          <Card title="Pequeno" text="size sm, outline." size="sm" tone="outline" />
        </div>
      </Exemplo>
      <Exemplo titulo="ListItem">
        <div className="vt-moldura">
          <ListItem title="Corte masculino" subtitle="Qua, 21 out · 10:00 · com Rafa" avatar="Maria Souza" trailing={<Badge status="ativo" />} href="#card" data-testid="ark-showcase-listitem-appointment-item" />
          <ListItem title="Lembretes" subtitle="1 dia antes" icon="clock" trailing={<Switch id="vt-li-switch" label="Lembretes" />} />
          <ListItem title="Sair" icon="logout" onClick={() => {}} />
        </div>
      </Exemplo>
      <Exemplo titulo="Avatar">
        <Avatar name="Maria da Silva" size={32} />
        <Avatar name="João Lima" size={40} />
        <Avatar name="Rafa" size={56} />
        <Avatar size={44} />
      </Exemplo>
    </Secao>
  );
}

export function Notas() {
  const [nota, setNota] = useState(0);
  return (
    <Secao id="rating" titulo="Rating e FavoriteButton">
      <Exemplo titulo="Exibição">
        <Rating value={4.8} count={128} />
        <Rating value={3.5} compact />
        <Rating />
      </Exemplo>
      <Exemplo titulo="Entrada (setas mudam a nota)">
        <Rating editable value={nota} onChange={setNota} data-testid="ark-showcase-rating-score-group" />
        <span className="ak-hint">{nota ? `Nota ${nota}` : 'Escolha uma nota de 1 a 5.'}</span>
      </Exemplo>
      <Exemplo titulo="Favoritar">
        <FavoriteButton label="Barbearia do Bairro" data-testid="ark-showcase-favorite-business-button" />
        <FavoriteButton label="Corte" defaultActive />
      </Exemplo>
    </Secao>
  );
}

export function Agendamento() {
  const [profissional, setProfissional] = useState<string | null>(null);
  return (
    <Secao id="serviceitem" titulo="ServiceItem, ProfessionalRow e EstablishmentCard">
      <Exemplo titulo="ServiceItem (vários)">
        <div className="vt-coluna">
          <ServiceItem name="Corte masculino" description="Máquina e tesoura, com lavagem." duration="40 min" price={35} favorite data-testid="ark-showcase-service-item" />
          <ServiceItem name="Coloração completa com tratamento de hidratação profunda" description="Inclui avaliação do fio, coloração, tratamento e escova. O valor muda conforme o comprimento." duration="2 h 30 min" price={1250} priceFrom data-testid="ark-showcase-service-item" />
          <ServiceItem name="Barba" duration="20 min" price={25} onFavorite={false} />
        </div>
      </Exemplo>
      <Exemplo titulo="ProfessionalRow (um só)">
        <div className="vt-coluna" role="radiogroup" aria-label="Profissional">
          <ProfessionalRow name="Qualquer profissional" anyone selected={profissional === null} onSelect={() => setProfissional(null)} />
          <ProfessionalRow name="Rafa" subtitle="Corte e barba" selected={profissional === 'rafa'} onSelect={() => setProfissional('rafa')} data-testid="ark-showcase-professional-item" />
          <ProfessionalRow name="Ana Beatriz Conceição" selected={profissional === 'ana'} onSelect={() => setProfissional('ana')} favorite data-testid="ark-showcase-professional-item" />
        </div>
      </Exemplo>
      <Exemplo titulo="EstablishmentCard">
        <div className="vt-coluna vt-fundo">
          <EstablishmentCard name="Barbearia do Bairro" category="Barbearia" distance="1,2 km" rating={4.8} open href="#serviceitem" data-testid="ark-showcase-establishment-card" />
          <EstablishmentCard name="Studio de Beleza e Bem-estar Conceição Aparecida" category="Salão" distance="3 km" open={false} color="#7A1F5C" href="#serviceitem" />
          <EstablishmentCard name="Clínica Ágil" category="Estética" />
        </div>
      </Exemplo>
    </Secao>
  );
}

const COLUNAS = [
  { key: 'hora', label: 'Hora' },
  { key: 'cliente', label: 'Cliente' },
  { key: 'servico', label: 'Serviço' },
  { key: 'status', label: 'Status' },
  { key: 'valor', label: 'Valor', align: 'right' as const },
];
const LINHAS = [
  { id: 1, hora: '09:00', cliente: 'Maria Souza', servico: 'Corte', status: <Badge status="concluido" />, valor: 'R$ 35,00' },
  { id: 2, hora: '10:00', cliente: 'João Lima', servico: 'Barba', status: <Badge status="ativo" />, valor: 'R$ 25,00' },
  { id: 3, hora: '11:30', cliente: 'Ana Costa', servico: 'Coloração', status: <Badge status="falta" />, valor: 'R$ 1.250,00' },
];

export function Tabela() {
  return (
    <Secao id="table" titulo="Table">
      <Exemplo titulo="Larga (tabela)">
        <div style={{ width: '100%' }}>
          <Table columns={COLUNAS} rows={LINHAS} caption="Agenda de hoje" data-testid="ark-showcase-table-day-table" />
        </div>
      </Exemplo>
      <Exemplo titulo="Estreita, 360 px (vira cartões)">
        <div style={{ width: 360, maxWidth: '100%' }}>
          <Table columns={COLUNAS} rows={LINHAS} caption="Agenda de hoje" />
        </div>
      </Exemplo>
      <Exemplo titulo="Vazia">
        <div style={{ width: '100%' }}>
          <Table columns={COLUNAS} rows={[]} empty="Nenhum agendamento hoje." />
        </div>
      </Exemplo>
    </Secao>
  );
}

export function Site() {
  return (
    <Secao id="sectionheader" titulo="Peças do site">
      <Exemplo titulo="SectionHeader + StatBar">
        <div className="vt-coluna">
          <SectionHeader size="hero" level={1} eyebrow="The Ark Group" title="Tecnologia que cresce junto com o seu negócio." text="Criamos a Íris e desenvolvemos sites, apps e sistemas sob medida." data-testid="ark-showcase-hero-header" />
          <StatBar items={[{ value: '30 dias grátis', label: 'Para testar a Íris sem cartão.' }, { value: 'R$ 59,90', label: 'Por mês, sem fidelidade.' }, { value: 'Suporte no WhatsApp', label: 'De segunda a sexta.' }]} data-testid="ark-showcase-stats-list" />
        </div>
      </Exemplo>
      <Exemplo titulo="NumberedList e Steps">
        <div className="vt-grade">
          <NumberedList items={[{ title: 'Página própria', text: 'Com seus serviços e horários.' }, { title: 'Lembretes', text: 'No WhatsApp, um dia antes.' }, { title: 'Relatórios', text: 'Quanto entrou no mês.' }]} />
          <Steps items={[{ title: 'Cadastre seus serviços', text: 'Leva 5 minutos.' }, { title: 'Divulgue o link', text: 'No Instagram e no WhatsApp.' }, { title: 'Receba agendamentos', text: 'O cliente marca sozinho.' }]} />
        </div>
      </Exemplo>
      <Exemplo titulo="Steps em linha">
        <Steps direction="row" items={[{ title: 'Diga o que precisa' }, { title: 'Receba a proposta' }, { title: 'Acompanhe a entrega' }]} />
      </Exemplo>
      <Exemplo titulo="Comparison">
        <div style={{ width: '100%' }}>
          <Comparison
            before={{ title: 'Sem a Íris', items: ['Agenda no caderno', 'Cliente esquece o horário', 'Responde mensagem o dia todo'] }}
            after={{ title: 'Com a Íris', items: ['Agenda online', 'Lembrete automático', 'Cliente marca sozinho'] }}
          />
        </div>
      </Exemplo>
      <Exemplo titulo="PlanCard">
        <div className="vt-grade">
          <PlanCard name="Solo" description="Para quem atende sozinho." price="R$ 59,90" period="/mês" features={['Agenda online', 'Lembretes']} cta={{ label: 'Começar agora', href: '#sectionheader' }} />
          <PlanCard name="Para equipes" description="Até 10 profissionais." price="R$ 99,90" period="/mês" features={['Tudo do Solo', 'Agenda por profissional', 'Relatórios']} highlight badge="Para equipes" cta={{ label: 'Começar agora', href: '#sectionheader' }} data-testid="ark-showcase-plans-card" />
          <PlanCard name="Rede" description="Várias unidades." soon features={['Tudo do Para equipes', 'Várias unidades']} />
        </div>
      </Exemplo>
      <Exemplo titulo="PriceList e Accordion">
        <div className="vt-coluna">
          <PriceList items={[{ name: 'Site institucional', desc: 'Página com seus serviços e contato.', price: 'a partir de R$ 2.000,00' }, { name: 'App sob medida', desc: 'Para o seu processo.', price: 'sob orçamento' }]} />
          <Accordion
            defaultOpen={0}
            items={[
              { q: 'Preciso instalar algum aplicativo?', a: 'Não. Seus clientes agendam pelo navegador, no celular ou no computador.' },
              { q: 'Tem fidelidade?', a: 'Não. Você cancela quando quiser.' },
            ]}
            data-testid="ark-showcase-faq-list"
          />
        </div>
      </Exemplo>
    </Secao>
  );
}
