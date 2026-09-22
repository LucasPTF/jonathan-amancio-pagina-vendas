import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const CHECKOUT_URL = "https://pay.hotmart.com/T105036696M?off=wvps2lv9&checkoutMode=10";
const EVENT_DATE = new Date("2026-09-26T07:00:00-03:00");

type HeroVariant = {
  eyebrow: string;
  title: string;
  description: string;
};

const heroVariants: Record<string, HeroVariant> = {
  "/a1": {
    eyebrow: "Para quem já toca, mas ainda não entende a cifra que lê",
    title: "Saia do status de Papagaio.",
    description:
      "Em uma manhã, aprenda a olhar para a cifra de uma música e entender o trabalho que cada acorde está fazendo ali. Depois, prove que entendeu criando uma versão sua, com escolhas que você consegue explicar.",
  },
  "/a2": {
    eyebrow: "Para quem já estudou teoria e ainda não sente fluência",
    title: "Teoria não vem primeiro.",
    description:
      "Você não aprendeu português decorando gramática antes de falar. Na Linguagem dos Acordes, primeiro você vive relações musicais. Depois, a teoria ganha significado. Um único exercício integra Perceber, Analisar, Criar e Tocar para transformar conceito em decisão musical.",
  },
  "/a3": {
    eyebrow: "Para quem já toca há anos e não quer voltar ao zero",
    title: "Você não precisa recomeçar.",
    description:
      "Se você já toca músicas inteiras, reconhece acordes e tem repertório, mas sente que decorou o idioma sem entendê-lo, a Imersão foi desenhada para esse ponto. Você usa o que já sabe para compreender a Linguagem dos Acordes por dentro.",
  },
};

const missions = [
  ["01", "Escolha da Peça", "Você começa com uma música real, não com uma lista solta de conceitos."],
  ["02", "Estudo do Terreno", "Escuta, contexto e leitura revelam o que já está acontecendo na música."],
  ["03", "Fundação", "Você identifica as funções que sustentam o caminho harmônico."],
  ["04", "Estrutura", "As relações entre os acordes deixam de parecer escolhas aleatórias."],
  ["05", "Cobertura", "Você experimenta novas possibilidades sem perder a identidade da canção."],
  ["06", "Acabamento", "Cada escolha é refinada até formar uma versão que você consegue defender."],
];

const testimonials = [
  {
    name: "Arthur",
    text: "Isso que eu fiz, eu mostrei para minha esposa e para meu amigo. Caraca, olha o que eu fiz aqui! Que legal!",
  },
  {
    name: "Jefferson",
    text: "Obrigado por ter pegado 30 anos de baixo pendurado no ombro e virado do avesso.",
  },
  {
    name: "Adriano",
    text: "Eu tocava feito papagaio, sem entender praticamente nada do que estava soando. Consegui substituir os acordes ali. Tomada de decisão em meio segundo.",
  },
  {
    name: "Paulo",
    text: "Abre a mente da gente. Vinte anos, não sabia nada disso. Agora, quando você pega passo a passo, abre a mente.",
  },
  {
    name: "José Marcos",
    text: "Eu estou fazendo música há cinco anos. Essa aula de hoje foi mais importante do que os cinco anos. Juro.",
  },
  {
    name: "Pedro",
    text: "Comecei a sair do básico, da mera repetição, para começar a entender por que aquelas coisas funcionam daquele jeito.",
  },
];

const faqs = [
  ["Preciso dominar teoria musical?", "Não. A Imersão parte de relações musicais vividas na prática. O mais importante é já conseguir tocar músicas e reconhecer acordes."],
  ["Para quais instrumentos funciona?", "O raciocínio harmônico se aplica a instrumentos capazes de trabalhar acordes, como violão, guitarra, teclado e piano."],
  ["A Imersão é ao vivo?", "Sim. O encontro acontece ao vivo no sábado, 26 de setembro, das 7h às 12h30."],
  ["Vou poder rever o conteúdo?", "Sim. A gravação fica disponível por 7 dias depois do encontro."],
  ["Como recebo o acesso?", "Assim que a compra for confirmada, você recebe o acesso ao grupo no WhatsApp e todas as instruções dentro da plataforma."],
  ["Existe garantia?", "Sim. Você tem 7 dias depois do evento para pedir o reembolso integral pela própria plataforma, sem precisar justificar."],
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function Logo() {
  return <img className="brand-logo" src="/assets/logo-imersao-transparente.png" alt="Imersão Natação da Harmonia" />;
}

function SkillMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsRunning(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`marquee${isRunning ? " is-running" : ""}`} aria-label="Principais habilidades trabalhadas">
      <div className="marquee-track" aria-hidden="true">
        {[0, 1, 2, 3].map((group) => (
          <div className="marquee-group" key={group}>
            <span>Perceber</span><b>+</b><span>Analisar</span><b>+</b><span>Criar</span><b>+</b><span>Tocar</span><b>+</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function Cta({ label = "Quero viver a Imersão", className = "" }: { label?: string; className?: string }) {
  return (
    <a className={`button ${className}`} href={CHECKOUT_URL} target="_blank" rel="noreferrer">
      <span>{label}</span>
      <ArrowIcon />
    </a>
  );
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.unobserve(node);
        }
      },
      { threshold: 0.16 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}

function Countdown() {
  const getRemaining = () => Math.max(0, EVENT_DATE.getTime() - Date.now());
  const [remaining, setRemaining] = useState(getRemaining);

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(getRemaining()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const seconds = Math.floor(remaining / 1000);
  const values = [
    [Math.floor(seconds / 86400), "dias"],
    [Math.floor((seconds % 86400) / 3600), "horas"],
    [Math.floor((seconds % 3600) / 60), "min"],
    [seconds % 60, "seg"],
  ];

  return (
    <div className="countdown" aria-label="Contagem regressiva para a Imersão">
      {values.map(([value, label]) => (
        <div className="countdown-item" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function SectionHeading({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <Reveal className="section-heading">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </Reveal>
  );
}

function SalesPage({ variant }: { variant: HeroVariant }) {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const activeTestimonial = testimonials[testimonialIndex];

  useEffect(() => {
    document.title = `${variant.title} | Imersão Natação da Harmonia`;
  }, [variant]);

  const changeTestimonial = (direction: number) => {
    setTestimonialIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  };

  return (
    <>
      <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
      <header className="site-header">
        <div className="container nav-inner">
          <a href="#inicio" aria-label="Voltar ao início"><Logo /></a>
          <nav aria-label="Navegação principal">
            <a href="#metodo">Método</a>
            <a href="#jonny">Jonny Cruz</a>
            <a href="#investimento">Investimento</a>
          </nav>
          <Cta label="Garantir minha vaga" className="button-small" />
        </div>
      </header>

      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-orbit" aria-hidden="true">
            <i /><i /><i /><i />
          </div>
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker">{variant.eyebrow}</div>
              <h1>{variant.title}</h1>
              <p className="hero-description">{variant.description}</p>
              <div className="event-line">
                <span>Sábado, 26 de setembro</span>
                <span>7h às 12h30</span>
                <span>Ao vivo</span>
              </div>
              <div className="hero-actions">
                <Cta />
                <span className="secure-note"><CheckIcon /> 7 dias de garantia</span>
              </div>
            </div>
            <div className="hero-portrait">
              <div className="portrait-frame">
                <img src="/assets/jonny-hero.jpg" alt="Jonny Cruz, professor da Imersão Natação da Harmonia" fetchPriority="high" />
                <div className="portrait-caption">
                  <span>Com Jonny Cruz</span>
                  <strong>Música entendida por dentro.</strong>
                </div>
              </div>
              <div className="chord-note chord-note-one" aria-hidden="true">IV</div>
              <div className="chord-note chord-note-two" aria-hidden="true">V7</div>
            </div>
          </div>
          <SkillMarquee />
        </section>

        <section className="recognition section-light">
          <div className="container narrow">
            <SectionHeading
              kicker="O ponto que trava tantos músicos"
              title="Você sabe o nome do acorde. Mas sabe o que ele está fazendo?"
              text="Tocar a sequência certa não é o mesmo que compreender a música. Quando a cifra muda, o tom muda ou aparece uma escolha fora do esperado, a segurança costuma desaparecer."
            />
            <div className="recognition-grid">
              {["Você reconhece os acordes, mas ainda depende da cifra.", "Você estudou campo harmônico, escalas e funções, mas tudo parece separado.", "Você até improvisa mudanças, mas não consegue explicar por que algumas funcionam."].map((item, index) => (
                <Reveal className="recognition-card" delay={index * 90} key={item}>
                  <span>0{index + 1}</span>
                  <p>{item}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="order-section">
          <div className="container split-layout">
            <Reveal className="order-visual">
              <div className="score-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div>
              <span className="score-chord score-chord-one">C</span>
              <span className="score-chord score-chord-two">Am</span>
              <span className="score-chord score-chord-three">F</span>
              <span className="score-chord score-chord-four">G</span>
              <p>Relação antes da regra.</p>
            </Reveal>
            <div>
              <SectionHeading
                kicker="Não é falta de teoria"
                title="O problema costuma estar na ordem."
                text="Você não precisa acumular mais nomes antes de fazer música. Precisa viver a relação entre os acordes, ouvir o efeito de cada escolha e só então organizar o que percebeu."
              />
              <Reveal className="statement-box" delay={120}>
                <span>Primeiro</span>
                <strong>experiência musical</strong>
                <i />
                <span>Depois</span>
                <strong>clareza teórica</strong>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="method section-green" id="metodo">
          <div className="container">
            <SectionHeading
              kicker="Natação da Harmonia"
              title="Um exercício. Quatro habilidades que trabalham juntas."
              text="O PACT transforma a harmonia em um processo musical completo, em vez de mais uma coleção de regras para memorizar."
            />
            <div className="pact-grid">
              {[
                ["P", "Perceber", "Ouvir o movimento e reconhecer o efeito dos acordes."],
                ["A", "Analisar", "Entender a função de cada escolha dentro da música."],
                ["C", "Criar", "Testar caminhos e construir uma versão com intenção."],
                ["T", "Tocar", "Levar a decisão para o instrumento com fluidez."],
              ].map(([letter, title, text], index) => (
                <Reveal className="pact-card" delay={index * 80} key={letter}>
                  <span>{letter}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="missions section-light">
          <div className="container">
            <SectionHeading
              kicker="Casa da Pesquisa Harmônica"
              title="Seis missões para construir sua própria rearmonização."
              text="Você acompanha a música do terreno ao acabamento, tomando decisões que fazem sentido para o que deseja comunicar."
            />
            <div className="mission-grid">
              {missions.map(([number, title, text], index) => (
                <Reveal className="mission-card" delay={(index % 3) * 70} key={number}>
                  <div className="mission-top"><span>{number}</span><i /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="outcome">
          <div className="container outcome-grid">
            <div>
              <SectionHeading
                kicker="Seu Ritual de Passagem"
                title="A prova não está numa resposta decorada. Está no som."
                text="Ao final, você apresenta uma rearmonização original. Não para mostrar que memorizou termos, mas para demonstrar que consegue perceber, decidir e explicar."
              />
              <Reveal className="certificate" delay={120}>
                <span>Certificado</span>
                <strong>Iniciado na Natação da Harmonia</strong>
                <p>Um marco para quem deixa de repetir e começa a construir.</p>
              </Reveal>
            </div>
            <Reveal className="outcome-list">
              {[
                "Olhar para uma cifra e enxergar funções, não apenas nomes.",
                "Substituir acordes com intenção e coerência musical.",
                "Explicar suas escolhas sem depender de respostas prontas.",
                "Usar seu repertório atual como base para criar algo próprio.",
              ].map((item) => <div key={item}><CheckIcon /><span>{item}</span></div>)}
            </Reveal>
          </div>
        </section>

        <section className="included section-light">
          <div className="container">
            <SectionHeading kicker="Tudo o que acompanha sua vaga" title="Uma manhã de imersão. Um ano para continuar desarranjando." />
            <div className="included-grid">
              {[
                ["01", "Imersão ao vivo", "Encontro no sábado, 26 de setembro, das 7h às 12h30."],
                ["02", "Gravação por 7 dias", "Reveja o encontro no seu ritmo durante a semana seguinte."],
                ["03", "Grupo no WhatsApp", "Acompanhamento e orientações durante 7 dias."],
                ["04", "Kit Aceleração", "E-book e Atlas NDH para apoiar sua prática."],
              ].map(([number, title, text], index) => (
                <Reveal className="included-card" delay={index * 70} key={number}>
                  <span>{number}</span><h3>{title}</h3><p>{text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="bonus-card" delay={140}>
              <div className="bonus-mark">Bônus</div>
              <div>
                <p>Para os primeiros 50 participantes</p>
                <h3>1 ano de Laboratórios de Desarranjo</h3>
                <span>Encontros ao vivo às sextas, às 19h, com gravações disponíveis por 7 dias.</span>
              </div>
              <Cta label="Quero garantir o bônus" />
            </Reveal>
          </div>
        </section>

        <section className="authority" id="jonny">
          <div className="container authority-grid">
            <Reveal className="authority-photo">
              <img src="/assets/jonny-professor.jpg" alt="Jonny Cruz tocando violão em seu estúdio" loading="lazy" />
              <span>20+ anos ensinando música</span>
            </Reveal>
            <div className="authority-copy">
              <SectionHeading
                kicker="Seu professor"
                title="Jonny Cruz transforma teoria em linguagem viva."
                text="Jonathan Amâncio, conhecido como Jonny Cruz, é professor de música, compositor e graduado em Música pela UEMG. Há mais de 20 anos, ajuda músicos a compreender o que tocam e a construir escolhas próprias."
              />
              <Reveal className="authority-details" delay={100}>
                <p>Ele desenvolveu a Natação da Harmonia, a Casa da Pesquisa Harmônica e o PACT para integrar ouvido, raciocínio, criação e instrumento no mesmo processo.</p>
              </Reveal>
              <Reveal className="authority-quote" delay={160}>
                <blockquote>“Jonny Cruz é um dos maiores compositores com quem eu já tive a oportunidade de trabalhar e, com certeza, um dos maiores compositores dessa nação.”</blockquote>
                <cite>Márcio Mello, produtor e diretor musical de César Menotti &amp; Fabiano</cite>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="proof section-light">
          <div className="container proof-layout">
            <SectionHeading kicker="A prova está no som" title="Quando o entendimento aparece, a relação com o instrumento muda." />
            <Reveal className="testimonial-stage" key={testimonialIndex}>
              <div className="quote-mark" aria-hidden="true">“</div>
              <blockquote>{activeTestimonial.text}</blockquote>
              <div className="testimonial-footer">
                <strong>{activeTestimonial.name}</strong>
                <span>{String(testimonialIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
              </div>
              <div className="testimonial-controls">
                <button type="button" onClick={() => changeTestimonial(-1)} aria-label="Depoimento anterior"><span aria-hidden="true">←</span></button>
                <button type="button" onClick={() => changeTestimonial(1)} aria-label="Próximo depoimento"><span aria-hidden="true">→</span></button>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="fit">
          <div className="container fit-grid">
            <Reveal className="fit-column fit-yes">
              <p className="kicker">Esta Imersão é para você se</p>
              <h2>Você já toca, mas quer compreender.</h2>
              {[
                "Toca músicas inteiras e reconhece acordes.",
                "Sente que estudou assuntos isolados, sem conectá-los.",
                "Quer criar e rearmonizar sem depender de tentativa aleatória.",
                "Deseja entender a linguagem sem ser tratado como iniciante absoluto.",
              ].map((item) => <div className="fit-item" key={item}><CheckIcon />{item}</div>)}
            </Reveal>
            <Reveal className="fit-column fit-no" delay={100}>
              <p className="kicker">Talvez não seja o seu momento se</p>
              <h2>Você procura apenas mais fórmulas.</h2>
              {[
                "Ainda não consegue tocar músicas completas no instrumento.",
                "Quer atalhos sem escutar, analisar e praticar.",
                "Prefere decorar respostas em vez de construir decisões.",
                "Não pode participar nem rever a gravação na semana seguinte.",
              ].map((item) => <div className="fit-item" key={item}><span aria-hidden="true">×</span>{item}</div>)}
            </Reveal>
          </div>
        </section>

        <section className="investment section-light" id="investimento">
          <div className="container">
            <SectionHeading
              kicker="Escolha sua hora de entrar"
              title="Três lotes transparentes. O melhor momento é agora."
              text="O primeiro lote está disponível por R$ 47. As próximas faixas já estão visíveis para você decidir com clareza."
            />
            <div className="lot-grid">
              <Reveal className="lot-card lot-current">
                <div className="lot-status">Lote atual</div>
                <p>1º lote</p><h3><span>R$</span> 47,00</h3>
                <small>Pagamento processado pela Hotmart</small>
                <Cta label="Garantir por R$ 47" />
              </Reveal>
              <Reveal className="lot-card" delay={90}>
                <div className="lot-status">Próximo lote</div>
                <p>2º lote</p><h3><span>R$</span> 79,90</h3>
                <small>Valor da próxima faixa</small>
              </Reveal>
              <Reveal className="lot-card" delay={180}>
                <div className="lot-status">Lote final</div>
                <p>3º lote</p><h3><span>R$</span> 179,90</h3>
                <small>Valor da última faixa</small>
              </Reveal>
            </div>
            <Reveal className="deadline-card">
              <div>
                <p>A Imersão começa em</p>
                <h3>Sábado, 26 de setembro, às 7h</h3>
                <span>Inscrições até sexta-feira, 25 de setembro, às 23h59.</span>
              </div>
              <Countdown />
            </Reveal>
          </div>
        </section>

        <section className="guarantee">
          <div className="container guarantee-inner">
            <Reveal className="guarantee-seal">
              <span>7</span><strong>dias</strong><small>garantia integral</small>
            </Reveal>
            <Reveal className="guarantee-copy" delay={80}>
              <p className="kicker">Experimente com tranquilidade</p>
              <h2>Você decide depois de viver a experiência.</h2>
              <p>Você tem 7 dias depois do evento para solicitar o reembolso integral pela própria plataforma. Sem perguntas e sem justificativas.</p>
              <Cta label="Quero participar com garantia" />
            </Reveal>
          </div>
        </section>

        <section className="faq section-light">
          <div className="container faq-grid">
            <SectionHeading kicker="Perguntas frequentes" title="O que você precisa saber antes de entrar." />
            <Reveal className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}<span aria-hidden="true">+</span></summary>
                  <p>{answer}</p>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-lines" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="container final-inner">
            <Reveal>
              <Logo />
              <p className="kicker">Sábado, 26 de setembro</p>
              <h2>Chega de repetir a música. Comece a compreendê-la.</h2>
              <p>Uma manhã ao vivo para transformar cifra em linguagem, teoria em decisão e repertório em criação.</p>
              <Cta label="Garantir minha vaga por R$ 47" />
            </Reveal>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-inner">
          <Logo />
          <p>Imersão Natação da Harmonia com Jonny Cruz.</p>
          <a href="#inicio">Voltar ao início</a>
        </div>
      </footer>

      <div className="mobile-cta"><Cta label="Garantir vaga por R$ 47" /></div>
    </>
  );
}

function ThankYouPage() {
  useEffect(() => {
    document.title = "Inscrição confirmada | Imersão Natação da Harmonia";
  }, []);

  return (
    <main className="thanks-page">
      <div className="thanks-ambient" aria-hidden="true"><i /><i /><i /></div>
      <div className="container thanks-layout">
        <div className="thanks-logo"><Logo /></div>
        <Reveal className="thanks-card">
          <div className="confirmation-icon"><CheckIcon /></div>
          <p className="kicker">Inscrição confirmada</p>
          <h1>Agora você está dentro.</h1>
          <p className="thanks-lead">A compra foi concluída. O acesso ao grupo no WhatsApp e todas as instruções da Imersão chegam pela plataforma.</p>
          <div className="thanks-steps">
            <div><span>01</span><p><strong>Confira seu e-mail</strong>Procure a confirmação enviada pela Hotmart.</p></div>
            <div><span>02</span><p><strong>Acesse a plataforma</strong>É lá que você encontra as instruções e o acesso ao grupo.</p></div>
            <div><span>03</span><p><strong>Reserve a manhã</strong>Sábado, 26 de setembro, das 7h às 12h30.</p></div>
          </div>
          <a className="button button-dark" href="https://consumer.hotmart.com" target="_blank" rel="noreferrer"><span>Acessar minhas compras</span><ArrowIcon /></a>
        </Reveal>
        <p className="thanks-footnote">Nos vemos na Imersão Natação da Harmonia.</p>
      </div>
    </main>
  );
}

function App() {
  const normalizedPath = window.location.pathname.replace(/\/$/, "") || "/a1";
  if (normalizedPath === "/obrigado") return <ThankYouPage />;
  return <SalesPage variant={heroVariants[normalizedPath] ?? heroVariants["/a1"]} />;
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
