import { useEffect, useRef, useState } from 'react'
import {
  WhatsappLogo, InstagramLogo, Watch, DeviceTablet, Headphones, DeviceMobileSpeaker, SpeakerHifi, Drone, ShieldCheck, MapPin, ArrowRight, ArrowsLeftRight, List, X, Storefront, ChatsCircle,
  Wrench, SquaresFour, CurrencyCircleDollar, Money, CreditCard, Cardholder, PixLogo,
  DeviceMobile, BatteryCharging, Cpu, DeviceMobileCamera, Plug, Camera, UserFocus, SpeakerHigh, Microphone, Power, Drop, ArrowsClockwise,
} from '@phosphor-icons/react'
import {
  asset, STORES, MSG, whatsapp, mapsUrl, BRANDS, IPHONE_PHOTOS, VITRINE, CLIENT_FEATURE, CLIENT_CAROUSEL, TEAM, SERVICES, PAYMENTS,
} from '../data/site'
import { useStorePicker, Reveal, SplitTitle, LoopVideo } from './ui'
import { FocusCarousel, RailCarousel } from './Carousels'
import { openCookiePolicy } from './Cookies'

const NAV = [
  { href: '#inicio', label: 'Início' },
  { href: '#iphones', label: 'iPhones' },
  { href: '#eletronicos', label: 'Eletrônicos' },
  { href: '#a-peraltah', label: 'A Peraltah' },
  { href: '#lojas', label: 'Nossas lojas' },
]

/* ---------------- HEADER ---------------- */
export function Header() {
  const { open } = useStorePicker()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 24)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : ''
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [menu])
  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${menu ? 'is-open' : ''}`}>
      <div className="nav__bar glass glass--dark">
        <a href="#inicio" className="nav__logo" aria-label="Peraltah iPhones, voltar ao início">
          <img src={asset('img/logo/logo-1.webp')} alt="Peraltah" width={1176} height={494} />
        </a>
        <nav className="nav__links" aria-label="Principal">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
        <button className="btn btn--gold btn--sm nav__cta" onClick={() => open()}>
          <WhatsappLogo size={18} weight="fill" aria-hidden /> Falar com a Peraltah
        </button>
        <button className="icon-btn nav__burger" aria-expanded={menu} aria-controls="mobile-menu" aria-label={menu ? 'Fechar menu' : 'Abrir menu'} onClick={() => setMenu((m) => !m)}>
          {menu ? <X size={22} /> : <List size={22} />}
        </button>
      </div>
      <div id="mobile-menu" className="nav__sheet glass glass--dark" hidden={!menu}>
        <nav aria-label="Menu móvel">
          {NAV.map((n, k) => <a key={n.href} href={n.href} onClick={(e) => { e.preventDefault(); setMenu(false); document.body.style.overflow = ''; requestAnimationFrame(() => { document.querySelector(n.href)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); history.replaceState(null, '', n.href) }) }} style={{ '--d': `${k * 40}ms` } as React.CSSProperties}>{n.label}</a>)}
        </nav>
        <button className="btn btn--gold" onClick={() => { setMenu(false); open() }}>
          <WhatsappLogo size={20} weight="fill" aria-hidden /> Falar com a Peraltah
        </button>
      </div>
    </header>
  )
}

/* ---------------- HERO (preto) ---------------- */
export function Hero() {
  const { open } = useStorePicker()
  return (
    <section id="inicio" className="sec sec--dark hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden />
      <div className="wrap hero__inner">
        <div className="hero__copy">
          <Reveal variant="fade" className="eyebrow eyebrow--gold">Peraltah iPhones · Dourados e Maracaju</Reveal>
          <SplitTitle id="hero-title" as="h1" className="display" lines={['O iPhone que', 'você quer', 'tá aqui.']} accent={2} />
          <Reveal as="p" className="lead" delay={260}>
            iPhones e tecnologia para acompanhar sua rotina. Escolha seu próximo dispositivo e fale com a nossa equipe.
          </Reveal>
          <Reveal className="hero__ctas" delay={360}>
            <button className="btn btn--gold btn--lg" onClick={() => open(MSG.iphone, 'Onde você quer ser atendido?')}>
              Encontrar meu próximo iPhone <ArrowRight size={18} weight="bold" aria-hidden />
            </button>
            <a className="btn btn--glass btn--lg" href="#lojas"><Storefront size={18} aria-hidden /> Conhecer nossas lojas</a>
          </Reveal>
          <Reveal as="ul" className="hero__facts" delay={460}>
            <li><strong>3</strong><span>lojas físicas<br />em MS</span></li>
            <li><strong>iPhone</strong><span>usado aceito<br />na troca</span></li>
            <li><strong>PIX</strong><span>dinheiro e<br />cartões</span></li>
          </Reveal>
        </div>

        <div className="hero__art">
          <Reveal variant="photo" className="hero__main frame">
            <img src={asset('img/iphones/laranja.webp')} alt="iPhone laranja na mão, recém-saído da caixa na Peraltah" fetchPriority="high" width={960} height={1200} />
          </Reveal>
          <Reveal variant="photo" delay={180} className="hero__second frame">
            <img src={asset('img/iphones/17promax-caixas.webp')} alt="Caixas de iPhone 17 Pro Max laranja e prateado" width={960} height={1200} />
          </Reveal>
          <Reveal delay={420} className="hero__chip glass glass--dark">
            <span className="dot" aria-hidden /> Consulte modelos e cores disponíveis
          </Reveal>
          <div className="hero__ring" aria-hidden />
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAIXA DE MARCAS (branco) ---------------- */
export function BrandStrip() {
  const row = [...BRANDS, ...BRANDS, ...BRANDS]
  return (
    <section className="sec sec--light strip" aria-label="Marcas que você encontra na Peraltah">
      <p className="strip__title wrap">Tecnologia desejada. Atendimento de verdade.</p>
      <div className="marquee">
        <div className="marquee__track">
          {[0, 1].map((g) => (
            <ul className="marquee__group" key={g} aria-hidden={g === 1}>
              {row.map((b, k) => <li key={k}><img src={b.src} alt={g === 0 && k < BRANDS.length ? b.name : ''} width={516} height={186} loading="lazy" /></li>)}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- IPHONES (preto) ---------------- */
export function Iphones() {
  const { open } = useStorePicker()
  return (
    <section id="iphones" className="sec sec--dark iph" aria-labelledby="iph-title">
      <div className="wrap iph__grid">
        <Reveal variant="photo" className="iph__feature frame">
          <img src={asset('img/iphones/variedade.webp')} alt="Cinco caixas de iPhone em cores diferentes alinhadas abaixo do letreiro Peraltah iPhones" loading="lazy" width={960} height={1200} />
          <figcaption className="iph__cap glass glass--dark">Variedade de modelos, cores e capacidades para consultar.</figcaption>
        </Reveal>
        <div className="iph__copy">
          <Reveal className="eyebrow eyebrow--gold">iPhones</Reveal>
          <SplitTitle id="iph-title" className="h2" lines={['Seu próximo', 'iPhone, na', 'Peraltah.']} accent={2} />
          <Reveal as="p" className="body" delay={160}>
            Do modelo de entrada ao Pro Max. Encontre seu próximo iPhone e descubra os acessórios e dispositivos que fazem parte do seu dia a dia.
          </Reveal>
          <Reveal delay={240}>
            <button className="btn btn--gold" onClick={() => open(MSG.iphone, 'Consultar modelos e valores')}>
              <WhatsappLogo size={18} weight="fill" aria-hidden /> Consultar modelos e valores
            </button>
          </Reveal>
          <div className="iph__pair">
            <Reveal variant="photo" delay={120} className="frame"><LoopVideo src={asset('video/iphones-bancada.mp4')} poster={asset('video/iphones-bancada.jpg')} label="Caixas de iPhone organizadas na bancada da loja" /></Reveal>
            <Reveal variant="photo" delay={200} className="frame"><LoopVideo src={asset('video/iphones-azul.mp4')} poster={asset('video/iphones-azul.jpg')} label="iPhone azul nas mãos, mostrando o módulo de câmeras" /></Reveal>
          </div>
        </div>
      </div>
      <div className="wrap">
        <ul className="iph__row" aria-label="Fotos de iPhones na loja">
          {IPHONE_PHOTOS.map((p, k) => (
            <Reveal as="li" variant="photo" delay={k * 70} key={p.src} className="frame">
              <img src={p.src} alt={p.alt} loading="lazy" width={960} height={1200} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ---------------- VITRINE (branco) ---------------- */
export function Vitrine() {
  return (
    <section className="sec sec--light vit" aria-labelledby="vit-title">
      <div className="wrap vit__head">
        <SplitTitle id="vit-title" className="h2" lines={['Tecnologia que dá', 'vontade de levar.']} accent={1} />
        <Reveal as="p" className="body" delay={120}>Detalhes, cores e acabamentos da linha iPhone. Passe pelas setas ou deslize.</Reveal>
      </div>
      <Reveal variant="fade" className="wrap--wide"><FocusCarousel slides={VITRINE} label="Vitrine iPhone" /></Reveal>
    </section>
  )
}

/* ---------------- ELETRÔNICOS E ACESSÓRIOS (preto) ---------------- */
/* Logo Stanley como ícone: usa a cor do texto (dourado), no mesmo tamanho dos ícones Phosphor */
function StanleyIcon({ size = 28 }: { size?: number; weight?: string }) {
  const url = `url(${asset('img/marcas/stanley-icone.png')})`
  return <span className="mask-icon" style={{ width: size, height: size, WebkitMaskImage: url, maskImage: url }} />
}
const CATS = [
  { t: 'Apple Watch', d: 'Modelos para treino, rotina e estilo.', q: 'Apple Watch', I: Watch },
  { t: 'iPad', d: 'Para estudar, trabalhar e criar.', q: 'iPad', I: DeviceTablet },
  { t: 'AirPods', d: 'Áudio sem fio do ecossistema Apple.', q: 'AirPods', I: Headphones },
  { t: 'Samsung', d: 'Smartphones e dispositivos Galaxy.', q: 'produtos Samsung', I: DeviceMobile },
  { t: 'Xiaomi', d: 'Smartphones e eletrônicos Xiaomi.', q: 'produtos Xiaomi', I: DeviceMobileSpeaker },
  { t: 'JBL', d: 'Caixas de som e fones.', q: 'produtos JBL', I: SpeakerHifi },
  { t: 'DJI', d: 'Drones, câmeras e estabilizadores.', q: 'produtos DJI', I: Drone },
  { t: 'Stanley original', d: 'Copos, garrafas e térmicos.', q: 'produtos Stanley', I: StanleyIcon },
  { t: 'Capas e acessórios', d: 'Proteção, carregadores e cabos.', q: 'capas e acessórios', I: ShieldCheck },
]
export function Eletronicos() {
  const { open } = useStorePicker()
  return (
    <section id="eletronicos" className="sec sec--dark ele" aria-labelledby="ele-title">
      <div className="wrap ele__head">
        <Reveal className="eyebrow eyebrow--gold">Eletrônicos e acessórios</Reveal>
        <SplitTitle id="ele-title" className="h2" lines={['Além do iPhone,', 'o que completa', 'sua rotina.']} accent={2} />
        <Reveal as="p" className="body" delay={140}>Escolha a categoria e consulte com a equipe o que está disponível na unidade mais perto de você.</Reveal>
      </div>
      <ul className="wrap cats">
        {CATS.map(({ t, d, q, I }, k) => (
          <Reveal as="li" key={t} delay={(k % 3) * 70} className="cat glass glass--dark">
            <span className="cat__icon" aria-hidden><I size={28} weight="duotone" /></span>
            <h3 className="cat__title">{t}</h3>
            <p className="cat__desc">{d}</p>
            <button className="cat__cta" onClick={() => open(MSG.categoria(q), `Consultar ${t}`)}>
              Consultar <ArrowRight size={16} weight="bold" aria-hidden />
            </button>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- NA PRATELEIRA (branco): fotos e vídeo de acessórios ---------------- */
export function Prateleira() {
  const fotos = [
    { src: 'img/acessorios/apple-watch-ultra.webp', alt: 'Apple Watch Ultra com pulseira cinza saindo da caixa' },
    { src: 'img/acessorios/stanley-quencher.webp', alt: 'Copos Stanley Quencher cinza e preto' },
    { src: 'img/acessorios/stanley-copos.webp', alt: 'Copos térmicos Stanley verde e preto' },
    { src: 'img/acessorios/stanley-quickflip.webp', alt: 'Garrafa Stanley Quick Flip cinza' },
    { src: 'img/acessorios/stanley-tampa.webp', alt: 'Tampa da garrafa Stanley Quick Flip aberta' },
    { src: 'img/acessorios/loja-capinhas.webp', alt: 'Parede de capas e películas na loja Peraltah' },
  ]
  return (
    <section className="sec sec--light shelf" aria-labelledby="shelf-title">
      <div className="wrap shelf__head">
        <SplitTitle id="shelf-title" className="h2" lines={['Na prateleira', 'da Peraltah.']} accent={1} />
        <Reveal as="p" className="body" delay={120}>Acessórios e eletrônicos que você encontra na nossa loja.</Reveal>
      </div>
      <ul className="wrap shelf__grid">
        {fotos.map((f, k) => (
          <Reveal as="li" key={f.src} variant="photo" delay={k * 70} className="frame"><img src={asset(f.src)} alt={f.alt} loading="lazy" width={960} height={1200} /></Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- TROCA (branco) ---------------- */
export function Troca() {
  const { open } = useStorePicker()
  return (
    <section className="sec sec--light troca" aria-labelledby="troca-title">
      <div className="troca__glow" aria-hidden />
      <div className="wrap troca__grid">
        <div className="troca__art">
          <Reveal variant="photo" className="frame troca__a"><img src={asset('img/iphones/16-azul-preto.webp')} alt="Caixas de iPhone 16 azul e preto" loading="lazy" /></Reveal>
          <Reveal delay={200} className="troca__swap glass" aria-hidden><ArrowsLeftRight size={26} weight="bold" /></Reveal>
          <Reveal variant="photo" delay={140} className="frame troca__b"><img src={asset('img/iphones/laranja-caixas.webp')} alt="Duas caixas de iPhone laranja da linha Pro" loading="lazy" /></Reveal>
        </div>
        <div className="troca__copy">
          <Reveal className="eyebrow">Troca de iPhone usado</Reveal>
          <SplitTitle id="troca-title" className="h2" lines={['De olho em um', 'iPhone novo?', 'Chama a Peraltah.']} accent={2} />
          <Reveal as="p" className="body" delay={140}>
            Seu iPhone atual pode abrir caminho para o próximo. Fale com a equipe e consulte as possibilidades de avaliação do seu aparelho — cada caso é analisado individualmente.
          </Reveal>
          <Reveal delay={220}>
            <button className="btn btn--dark" onClick={() => open(MSG.troca, 'Consultar minha troca')}>
              <ArrowsLeftRight size={18} weight="bold" aria-hidden /> Quero consultar minha troca
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- CLIENTES (preto) ---------------- */
export function Clientes() {
  return (
    <section className="sec sec--dark cli" aria-labelledby="cli-title">
      <div className="wrap cli__grid">
        <div className="cli__photos">
          <Reveal variant="photo" className="frame cli__big"><img src={CLIENT_FEATURE.big.src} alt={CLIENT_FEATURE.big.alt} loading="lazy" /></Reveal>
          <div className="cli__smalls">
            {CLIENT_FEATURE.small.map((p, k) => (
              <Reveal key={p.src} variant="photo" delay={120 + k * 90} className="frame"><img src={p.src} alt={p.alt} loading="lazy" /></Reveal>
            ))}
          </div>
        </div>
        <div className="cli__copy">
          <Reveal className="eyebrow eyebrow--gold">Clientes</Reveal>
          <SplitTitle id="cli-title" className="h2" lines={['Quem saiu daqui', 'com o iPhone', 'que queria.']} accent={2} />
          <Reveal as="p" className="body" delay={140}>
            Cada foto é de um cliente de verdade, na loja, no dia em que levou o aparelho novo. Gente de Dourados e Maracaju que escolheu com calma, conversou com a equipe e saiu com a sacola na mão.
          </Reveal>
          <Reveal as="p" className="cli__note" delay={220}>Registros publicados no Instagram da Peraltah.</Reveal>
        </div>
      </div>
      <Reveal variant="fade" className="wrap cli__rail">
        <RailCarousel items={CLIENT_CAROUSEL.filter((m) => m.kind === 'image')} label="Fotos de clientes" />
      </Reveal>
    </section>
  )
}

/* ---------------- CLIENTES EM VÍDEO (branco) ---------------- */
export function ClientesVideo() {
  return (
    <section className="sec sec--light unbox" aria-labelledby="unbox-title">
      <div className="wrap shelf__head">
        <SplitTitle id="unbox-title" className="h2" lines={['Aquele unboxing', 'que a gente acompanha', 'de perto.']} accent={2} />
        <Reveal as="p" className="body" delay={120}>Clientes abrindo o aparelho novo nas nossas lojas.</Reveal>
      </div>
      <Reveal variant="fade" className="wrap">
        <RailCarousel items={CLIENT_CAROUSEL.filter((m) => m.kind === 'video')} label="Vídeos de clientes abrindo o aparelho" />
      </Reveal>
    </section>
  )
}

/* ---------------- POR QUE + PAGAMENTO (branco) ---------------- */
export function PorQue() {
  const items = [
    { i: <Storefront size={24} weight="duotone" />, t: 'Três lojas físicas', d: 'Duas em Dourados e uma em Maracaju, para ver de perto antes de decidir.' },
    { i: <ChatsCircle size={24} weight="duotone" />, t: 'Atendimento pelo WhatsApp', d: 'Fale direto com a unidade mais perto de você.' },
    { i: <ArrowsLeftRight size={24} weight="duotone" />, t: 'Troca de iPhone usado', d: 'Consulte a avaliação do seu aparelho com a equipe.' },
    { i: <SquaresFour size={24} weight="duotone" />, t: 'Muito além do iPhone', d: 'Ecossistema Apple, Samsung, Xiaomi, JBL, DJI e Stanley.' },
    { i: <Wrench size={24} weight="duotone" />, t: 'Assistência técnica', d: 'Também disponível para o seu aparelho.' },
  ]
  const payIcon = [<PixLogo key="p" size={22} />, <Money key="m" size={22} />, <CreditCard key="c" size={22} />, <Cardholder key="d" size={22} />]
  return (
    <section id="a-peraltah" className="sec sec--light why" aria-labelledby="why-title">
      <div className="wrap why__grid">
        <div className="why__copy">
          <Reveal className="eyebrow">Por que conhecer a Peraltah</Reveal>
          <SplitTitle id="why-title" className="h2" lines={['Tecnologia é o produto.', 'A escolha certa', 'faz a diferença.']} accent={1} />
          <Reveal as="p" className="body" delay={140}>Na hora de escolher um aparelho, poder conversar com uma equipe e conhecer as opções faz parte da experiência.</Reveal>
        </div>
        <ol className="why__list">
          {items.map((x, k) => (
            <Reveal as="li" key={x.t} delay={k * 70} className="why__item glass">
              <span className="why__icon" aria-hidden>{x.i}</span>
              <div><h3>{x.t}</h3><p>{x.d}</p></div>
            </Reveal>
          ))}
        </ol>
      </div>
      <div className="wrap">
        <Reveal className="pay glass" variant="fade">
          <div className="pay__title"><CurrencyCircleDollar size={22} weight="duotone" aria-hidden /> <h3>Escolha como prefere pagar.</h3></div>
          <ul className="pay__list">
            {PAYMENTS.map((p, k) => <li key={p}>{payIcon[k]}<span>{p.startsWith('Cartão de ') ? <><span className="hide-sm">Cartão de </span>{p.slice(10)}</> : p}</span></li>)}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- CEO (preto) ---------------- */
export function Ceo() {
  return (
    <section className="sec sec--dark ceo" aria-labelledby="ceo-title">
      <div className="ceo__glow" aria-hidden />
      <div className="wrap ceo__grid">
        <div className="ceo__art">
          <Reveal variant="photo" className="frame ceo__main"><img src={asset('img/ceo/gabriel.webp')} alt="Gabriel Peraltah, CEO da Peraltah iPhones, segurando duas caixas de iPhone na loja" loading="lazy" /></Reveal>
          <Reveal variant="photo" delay={180} className="frame ceo__second"><img src={asset('img/ceo/gabriel-caixas.webp')} alt="Gabriel Peraltah com cinco caixas de iPhone em frente ao letreiro" loading="lazy" /></Reveal>
        </div>
        <div className="ceo__copy">
          <Reveal className="eyebrow eyebrow--gold">Conheça o CEO</Reveal>
          <SplitTitle id="ceo-title" className="h2" lines={['Por trás', 'da Peraltah.']} accent={1} />
          <Reveal as="p" className="ceo__quote" delay={140}>
            Gabriel Peraltah está à frente da marca que conecta tecnologia, produtos desejados e atendimento presencial em suas três unidades.
          </Reveal>
          <Reveal className="ceo__sign" delay={240}>
            <img src={asset('img/logo/logo-1.webp')} alt="" aria-hidden width={1176} height={494} />
            <div><strong>Gabriel Peraltah</strong><span>CEO · Peraltah iPhones</span></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- EQUIPE (branco) ---------------- */
export function Equipe() {
  return (
    <section className="sec sec--dark team" aria-labelledby="team-title">
      <div className="wrap team__head">
        <Reveal className="eyebrow">Equipe</Reveal>
        <SplitTitle id="team-title" className="h2" lines={['Quem te atende', 'nas nossas lojas.']} accent={1} />
        <Reveal as="p" className="body" delay={120}>Gente que conhece o produto, mostra as opções e acompanha você do primeiro contato até a entrega.</Reveal>
      </div>
      <ul className="wrap team__grid">
        {TEAM.map((p, k) => (
          <Reveal as="li" key={p.src} variant="photo" delay={k * 90} className="frame"><img src={p.src} alt={p.alt} loading="lazy" /></Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- ASSISTÊNCIA (preto) ---------------- */
const ICONS = {
  screen: DeviceMobile, battery: BatteryCharging, board: Cpu, back: DeviceMobileCamera, plug: Plug, camera: Camera,
  face: UserFocus, speaker: SpeakerHigh, mic: Microphone, power: Power, drop: Drop, software: ArrowsClockwise,
}
export function Assistencia() {
  const { open } = useStorePicker()
  return (
    <section className="sec sec--dark assist" aria-labelledby="assist-title">
      <div className="wrap assist__grid">
        <Reveal variant="photo" className="assist__art">
          <img src={asset('img/assistencia-iphone-interno.webp')} alt="Interior de um iPhone aberto mostrando placa, bateria e componentes" loading="lazy" width={767} height={1300} />
        </Reveal>
        <div className="assist__side">
          <Reveal className="eyebrow eyebrow--gold">Assistência técnica</Reveal>
          <SplitTitle id="assist-title" className="h2 assist__title" lines={['Seu dispositivo também', 'merece {atenção.}']} />
          <ul className="svc">
            {SERVICES.map((s, k) => {
              const I = ICONS[s.icon]
              return (
                <Reveal as="li" key={s.t} delay={(k % 4) * 60} className="svc__item">
                  <span className="svc__icon" aria-hidden><I size={20} weight="duotone" /></span>
                  <div><h3>{s.t}</h3><p>{s.d}</p></div>
                </Reveal>
              )
            })}
          </ul>
          <Reveal delay={200}>
            <button className="btn btn--glass" onClick={() => open(MSG.assistencia, 'Consultar assistência técnica')}>
              <Wrench size={18} aria-hidden /> Consultar assistência técnica
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ---------------- LOJAS (branco) ---------------- */
export function Lojas() {
  return (
    <section id="lojas" className="sec sec--light lojas" aria-labelledby="lojas-title">
      <div className="lojas__glow" aria-hidden />
      <div className="wrap lojas__head">
        <Reveal className="eyebrow">Nossas lojas</Reveal>
        <SplitTitle id="lojas-title" className="h2" lines={['Dourados e Maracaju.', 'A Peraltah tá por perto.']} accent={1} />
        <Reveal as="p" className="body" delay={120}>Escolha a unidade mais conveniente para você e fale diretamente com a equipe.</Reveal>
      </div>
      <ul className="wrap lojas__grid">
        {STORES.map((s, k) => (
          <Reveal as="li" key={s.id} delay={k * 100} className={`store glass store--${k + 1}`}>
            <div className="store__top">
              <span className="store__label">{s.label}</span>
              <h3 className="store__city">{s.city}<span>/MS</span></h3>
            </div>
            <p className="store__addr"><MapPin size={18} weight="fill" aria-hidden /> {s.address}</p>
            <div className="store__wa">
              {s.contacts.length > 1 ? (
                <>
                  <p className="store__hint">Falar com a loja — escolha quem te atende:</p>
                  {s.contacts.map((c) => (
                    <a key={c.phone} className="btn btn--gold btn--block" href={whatsapp(c.phone, MSG.geral)} target="_blank" rel="noopener noreferrer">
                      <WhatsappLogo size={18} weight="fill" aria-hidden /> Falar com {c.name}
                    </a>
                  ))}
                </>
              ) : (
                <a className="btn btn--gold btn--block" href={whatsapp(s.contacts[0].phone, MSG.geral)} target="_blank" rel="noopener noreferrer">
                  <WhatsappLogo size={18} weight="fill" aria-hidden /> Falar com esta unidade
                </a>
              )}
            </div>
            <div className="store__links">
              <a className="btn btn--glass-light btn--sm" href={mapsUrl(s.address)} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden /> <span className="hide-sm">Ver&nbsp;</span>localização</a>
              <a className="btn btn--glass-light btn--sm" href={s.instagram} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${s.instagramHandle}`}><InstagramLogo size={16} aria-hidden /> Instagram</a>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* ---------------- CTA FINAL (preto) ---------------- */
export function CtaFinal() {
  const { open } = useStorePicker()
  return (
    <section className="sec sec--dark cta" aria-labelledby="cta-title">
      <div className="cta__glow" aria-hidden />
      <div className="wrap cta__inner">
        <SplitTitle id="cta-title" className="h2 cta__title" lines={['Seu próximo iPhone', 'pode estar a uma', 'conversa de distância.']} accent={2} />
        <Reveal as="p" className="lead" delay={140}>Conte à nossa equipe o que você procura e consulte os modelos, valores e opções disponíveis.</Reveal>
        <Reveal delay={240}>
          <button className="btn btn--gold btn--lg" onClick={() => open(MSG.geral, 'Escolha a unidade')}>
            <WhatsappLogo size={20} weight="fill" aria-hidden /> Falar com a Peraltah
          </button>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------------- FOOTER (branco) ---------------- */
export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot__top">
        <div className="foot__brand">
          <img src={asset('img/logo/logo-2.png')} alt="Peraltah iPhones" width={1176} height={494} loading="lazy" />
          <p>iPhones, ecossistema Apple e tecnologia em três lojas físicas em Mato Grosso do Sul. Assistência técnica também disponível.</p>
        </div>
        <nav className="foot__nav" aria-label="Rodapé">
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
        </nav>
      </div>
      <div className="wrap foot__stores">
        {STORES.map((s) => (
          <div className="foot__col" key={s.id}>
            <h3>{s.city} · {s.label}</h3>
            <p className="foot__addr"><MapPin size={15} weight="fill" aria-hidden /> {s.address}</p>
            <div className="foot__links">
              <a href={s.instagram} target="_blank" rel="noopener noreferrer"><InstagramLogo size={15} aria-hidden /> {s.instagramHandle}</a>
              {s.contacts.map((c) => (
                <a key={c.phone} href={whatsapp(c.phone)} target="_blank" rel="noopener noreferrer"><WhatsappLogo size={15} aria-hidden /> {s.contacts.length > 1 ? c.name : 'WhatsApp'}</a>
              ))}
              {s.bio && <a href={s.bio} target="_blank" rel="noopener noreferrer">Links da unidade</a>}
            </div>
          </div>
        ))}
      </div>
      <div className="wrap foot__bottom">
        <p>Pagamento: {PAYMENTS.join(' · ')}</p>
        <p>© {new Date().getFullYear()} Peraltah iPhones. Todos os direitos reservados. · <button className="link" onClick={openCookiePolicy}>Política de cookies</button></p>
      </div>
    </footer>
  )
}

/* ---------------- BOTÃO FLUTUANTE ---------------- */
export function FloatWhats() {
  const { open } = useStorePicker()
  const [show, setShow] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const nearEnd = window.innerHeight + window.scrollY > document.body.scrollHeight - 700
      let ok = window.scrollY > 700 && !nearEnd
      const el = ref.current
      if (ok && el) {
        // não cobrir botões, links nem cards de conteúdo
        const r = el.getBoundingClientRect()
        const pts: [number, number][] = [[r.left + r.width / 2, r.top + r.height / 2], [r.left + 4, r.top + 4], [r.right - 4, r.top + 4], [r.left + 4, r.bottom - 4], [r.right - 4, r.bottom - 4]]
        for (const [x, y] of pts) {
          const under = document.elementsFromPoint(x, y).find((n) => !el.contains(n))
          if (under?.closest('a, button, .svc__item, .why__item, .cat, .store, .pay, .frame, .rail__item, .tile, figure')) { ok = false; break }
        }
      }
      setShow(ok)
    }
    const f = () => { if (!raf) raf = requestAnimationFrame(check) }
    check(); window.addEventListener('scroll', f, { passive: true }); window.addEventListener('resize', f)
    return () => { window.removeEventListener('scroll', f); window.removeEventListener('resize', f); cancelAnimationFrame(raf) }
  }, [])
  return (
    <button ref={ref} className={`float glass glass--dark ${show ? 'is-in' : ''}`} onClick={() => open()} aria-label="Falar com a Peraltah pelo WhatsApp" tabIndex={show ? 0 : -1}>
      <WhatsappLogo size={26} weight="fill" aria-hidden />
    </button>
  )
}
