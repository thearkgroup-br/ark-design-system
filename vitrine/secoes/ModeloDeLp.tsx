import { ActionBar, Button, ContactForm, Faq, Hero, Section, SiteFooter, SiteHeader, StatBand } from '../../src';
import type { ConfigContato } from '../../src';
import { Exemplo, Secao } from '../Secao';

const LINKS = [
  { label: 'O que faz', href: '#modelo-de-lp', id: 'features' },
  { label: 'Dúvidas', href: '#modelo-de-lp', id: 'faq' },
];

const CONFIG: ConfigContato = {
  produto: 'Exemplo',
  assunto: 'Exemplo: contato pelo site',
  escolha: {
    rotulo: 'O que você precisa',
    opcoes: [
      { valor: 'site', rotulo: 'Site' },
      { valor: 'nao-sei', rotulo: 'Ainda não sei' },
    ],
  },
};

/** Pacote do modelo de LP: SiteHeader, Hero, StatBand, Section, Faq, ContactForm e SiteFooter. Troque a marca e o modo escuro no topo da vitrine. */
export function ModeloDeLp() {
  return (
    <Secao id="modelo-de-lp" titulo="Modelo de LP">
      <Exemplo titulo="SiteHeader com tema e botão principal">
        <div className="vt-moldura">
          <SiteHeader brand="ark" links={LINKS} cta={{ label: 'Entrar na lista', href: '#modelo-de-lp' }} pill sticky={false} data-testid="ark-showcase-model-header" />
        </div>
      </Exemplo>
      <Exemplo titulo="Hero + StatBand (a ilustração é HTML e CSS e vai no slot visual)">
        <div className="vt-moldura">
          <Hero
            eyebrow="Para quem é"
            title="Um título que afirma algo concreto."
            text="Uma frase de apoio que não repete o título."
            badge="Em breve"
            primaryAction={{ label: 'Entrar na lista', href: '#modelo-de-lp' }}
            secondaryAction={{ label: 'Ver como funciona', href: '#modelo-de-lp' }}
            note="Entre na lista e a gente avisa."
            visual={<div className="ak-pad">Ilustração</div>}
            visualCaption="Ilustração com valores de exemplo"
            data-testid="ark-showcase-model-hero"
          />
          <StatBand
            items={[
              { value: 'Primeiro destaque', label: 'Uma linha de explicação' },
              { value: 'Segundo destaque', label: 'Uma linha de explicação' },
              { value: 'Terceiro destaque', label: 'Uma linha de explicação' },
            ]}
            label="Em resumo"
            data-testid="ark-showcase-model-highlights-list"
          />
        </div>
      </Exemplo>
      <Exemplo titulo="Section com layout stack e split">
        <div className="vt-moldura">
          <Section tone="surface" layout="split" data-testid="ark-showcase-model-section">
            <p>Coluna da esquerda</p>
            <p>Coluna da direita</p>
          </Section>
        </div>
      </Exemplo>
      <Exemplo titulo="Faq">
        <div className="vt-moldura">
          <Faq
            eyebrow="Dúvidas"
            title="Perguntas que a gente sempre ouve."
            items={[
              { q: 'Preciso entender do assunto?', a: 'Não. Tudo é explicado do jeito que você fala.' },
              { q: 'Funciona no celular?', a: 'Sim.' },
            ]}
            data-testid="ark-showcase-model-faq"
          />
        </div>
      </Exemplo>
      <Exemplo titulo="ContactForm (consentimento LGPD, Turnstile e Resend pela Function)">
        <div className="vt-moldura ak-pad">
          <ContactForm
            config={CONFIG}
            enviar={() => new Promise<void>((resolver) => setTimeout(resolver, 800))}
            texts={{
              consent: 'Concordo em ser contatado e com o uso dos meus dados para isso.',
              privacyHref: '#modelo-de-lp',
              submit: 'Entrar na lista',
              submitting: 'Entrando na lista…',
              successTitle: 'Recebemos seu contato!',
              successText: 'Vamos responder no e-mail que você informou.',
              errorTitle: 'Não deu para mandar o seu contato.',
              errorText: 'Tente de novo daqui a pouco.',
              errorAction: { label: 'Escrever por e-mail', href: 'mailto:contato@thearkgroup.com.br' },
              title: 'Fale com a gente',
            }}
            data-testid="ark-showcase-model-contact"
          />
        </div>
      </Exemplo>
      <Exemplo titulo="ActionBar: role dentro da caixa. Aparece quando o botão do topo sai, some no contato">
        <div className="vt-moldura" style={{ height: 360, overflow: 'auto', transform: 'translateZ(0)' }}>
          <div className="ak-pad">
            <Button pill id="vitrine-barra-gatilho" href="#modelo-de-lp">Entrar na lista</Button>
            <div style={{ height: 520 }} />
          </div>
          <div id="vitrine-barra-contato" className="ak-pad">Seção de contato: a barra some aqui.</div>
          <ActionBar
            message="Pronto para começar?"
            primaryAction={{ label: 'Entrar na lista', href: '#modelo-de-lp' }}
            secondaryAction={{ label: 'Ver como funciona', href: '#modelo-de-lp' }}
            triggerSelector="#vitrine-barra-gatilho"
            hideSelectors="#vitrine-barra-contato"
            data-testid="ark-showcase-model-action-bar"
          />
        </div>
      </Exemplo>
      <Exemplo titulo="SiteFooter: produto (com a frase do grupo) e grupo">
        <div className="vt-moldura">
          <SiteFooter
            brand="iris"
            tagline="Agenda online para quem atende com horário marcado."
            columns={[{ title: 'Produto', items: [{ label: 'Dúvidas', href: '#modelo-de-lp', id: 'faq' }] }]}
            legal="© 2026 The Ark Group"
            data-testid="ark-showcase-model-product-footer"
          />
          <SiteFooter variant="group" brand="ark" tagline="Tecnologia que cresce junto com o seu negócio." legal="© 2026 The Ark Group" data-testid="ark-showcase-model-group-footer" />
        </div>
      </Exemplo>
    </Secao>
  );
}
