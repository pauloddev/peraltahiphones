// Conteúdo central da Peraltah iPhones.
// Para atualizar contatos, endereços ou mídias, edite somente este arquivo.

const B = import.meta.env.BASE_URL

export const asset = (p: string) => `${B}${p}`

export type Contact = { name: string; phone: string }
export type Store = {
  id: string
  label: string
  city: string
  address: string
  instagram: string
  instagramHandle: string
  contacts: Contact[]
  bio?: string
}

export const STORES: Store[] = [
  {
    id: 'dourados-1',
    label: 'Unidade 1',
    city: 'Dourados',
    address: 'Rua Joaquim Alves Taveira, Altos da Monte Alegre, Dourados — MS, CEP 79823-080',
    instagram: 'https://www.instagram.com/peraltahiphones',
    instagramHandle: '@peraltahiphones',
    bio: 'https://linktr.ee/peraltahiphones',
    contacts: [
      { name: 'Isabela', phone: '5567996811655' },
      { name: 'Vitória', phone: '5567996893002' },
      { name: 'Luiz Henrique', phone: '5567997151948' },
    ],
  },
  {
    id: 'dourados-2',
    label: 'Unidade 2',
    city: 'Dourados',
    address:
      'Rua Vereador Vitório José Pederiva, 520, na lateral do Parque do Lago, em frente às quadras de jogos, Dourados — MS',
    instagram: 'https://www.instagram.com/peraltahiphones2/',
    instagramHandle: '@peraltahiphones2',
    contacts: [{ name: 'Unidade 2', phone: '5567999710330' }],
  },
  {
    id: 'maracaju',
    label: 'Unidade 3',
    city: 'Maracaju',
    address: 'Rua José Pereira da Rosa, 420, Cambaraí, Maracaju — MS, CEP 79150-000',
    instagram: 'https://www.instagram.com/peraltahiphonesmaracaju/',
    instagramHandle: '@peraltahiphonesmaracaju',
    contacts: [{ name: 'Unidade Maracaju', phone: '5567999227588' }],
  },
]

export const whatsapp = (phone: string, text?: string) =>
  `https://api.whatsapp.com/send/?phone=${phone}${text ? `&text=${encodeURIComponent(text)}` : '&text'}&type=phone_number&app_absent=0`

export const mapsUrl = (address: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

export const MSG = {
  geral: 'Olá! Vim pelo site e gostaria de falar com a Peraltah.',
  iphone: 'Olá! Gostaria de consultar os modelos e valores de iPhones disponíveis na Peraltah.',
  troca: 'Olá! Tenho um iPhone usado e gostaria de consultar as possibilidades de troca na Peraltah.',
  assistencia: 'Olá! Gostaria de consultar os serviços de assistência técnica da Peraltah.',
  categoria: (c: string) => `Olá! Gostaria de consultar os modelos e valores de ${c} disponíveis na Peraltah.`,
}

export const BRANDS = [
  { name: 'Apple', src: asset('img/marcas/apple.webp') },
  { name: 'Samsung', src: asset('img/marcas/samsung.webp') },
  { name: 'Xiaomi', src: asset('img/marcas/xiaomi.webp') },
  { name: 'JBL', src: asset('img/marcas/jbl.webp') },
  { name: 'DJI', src: asset('img/marcas/dji.webp') },
  { name: 'Prodigee', src: asset('img/marcas/prodigee.webp') },
]

export const IPHONE_PHOTOS = [
  { src: asset('img/iphones/17pro-branco.webp'), alt: 'Caixa de iPhone 17 Pro branco na mão, com o letreiro da Peraltah ao fundo' },
  { src: asset('img/iphones/16-azul-preto.webp'), alt: 'Duas caixas de iPhone 16, azul e preto' },
  { src: asset('img/iphones/18pro-bordo.webp'), alt: 'iPhone 18 Pro bordô saindo da caixa' },
  { src: asset('img/iphones/18promax-preto.webp'), alt: 'iPhone 18 Pro Max preto saindo da caixa' },
  { src: asset('img/iphones/17pro-caixa.webp'), alt: 'Caixa de iPhone 17 Pro prateado na mão' },
  { src: asset('img/iphones/laranja-caixas.webp'), alt: 'Duas caixas de iPhone laranja da linha Pro' },
]

export type Slide = { kind: 'video' | 'image'; src: string; poster?: string; alt: string }
const v = (n: string, alt: string): Slide => ({ kind: 'video', src: asset(`vitrine/${n}.mp4`), poster: asset(`vitrine/${n}.jpg`), alt })
export const VITRINE: Slide[] = [
  v('iphone-camera-azul', 'Detalhe do módulo de câmeras de um iPhone azul'),
  v('chip-a20', 'Chip Apple A20 Pro iluminado'),
  v('dobravel-tela', 'iPhone dobrável na mão mostrando a tela inicial'),
  v('iphone-lateral-bordo', 'Lateral de um iPhone bordô em movimento'),
  v('iphone-941-lateral', 'iPhone na horizontal com a tela de bloqueio'),
  v('dobravel-941', 'iPhone dobrável aberto com a tela de bloqueio'),
]

export const CLIENT_FEATURE = {
  big: { src: asset('img/clientes/c08.webp'), alt: 'Cliente sorrindo na loja com a caixa do novo iPhone' },
  small: [
    { src: asset('img/clientes/c10.webp'), alt: 'Cliente com o novo iPhone ao lado de Gabriel Peraltah' },
    { src: asset('img/clientes/c14.webp'), alt: 'Cliente recebendo o iPhone das mãos de Gabriel Peraltah' },
  ],
}

type Media = { kind: 'image' | 'video'; src: string; poster?: string; alt: string }
const ci = (n: string, alt: string): Media => ({ kind: 'image', src: asset(`img/clientes/${n}.webp`), alt })
const cv = (n: string, alt: string): Media => ({ kind: 'video', src: asset(`video/${n}.mp4`), poster: asset(`video/${n}.jpg`), alt })
export const CLIENT_CAROUSEL: Media[] = [
  ci('c01', 'Cliente com sacola da Peraltah e iPhone na mão'),
  cv('cliente-unboxing-1', 'Cliente abrindo a caixa do iPhone na loja'),
  ci('c02', 'Cliente com sacola da Peraltah e iPhone'),
  ci('c12', 'Cliente com iPhone e Gabriel Peraltah segurando a sacola'),
  cv('cliente-unboxing-2', 'Cliente desembalando o iPhone no balcão'),
  ci('c03', 'Cliente com iPhone e caixa em frente ao letreiro'),
  ci('c13', 'Duas clientes mostrando os iPhones novos'),
  cv('cliente-unboxing-3', 'Cliente abrindo o iPhone novo'),
  ci('c04', 'Cliente com iPhone e sacola branca'),
  ci('c11', 'Cliente com iPhone e AirPods ao lado de Gabriel Peraltah'),
  cv('cliente-ipad', 'Cliente abrindo a caixa do iPad'),
  ci('c15', 'Casal de clientes com os novos iPhones'),
  ci('c05', 'Cliente com o iPhone novo nas mãos'),
  cv('cliente-unboxing-4', 'Cliente desembalando o iPhone'),
  ci('c16', 'Cliente com a sacola da Peraltah'),
  ci('c09', 'Cliente na loja antes de abrir o presente'),
  cv('cliente-unboxing-5', 'Cliente sorrindo ao abrir a caixa'),
  ci('c06', 'Cliente abrindo a caixa do iPhone'),
  ci('c07', 'Cliente fazendo o upgrade de iPhone no balcão'),
]

export const TEAM = [
  { src: asset('img/equipe/e01.webp'), alt: 'Integrante da equipe Peraltah segurando a sacola da loja' },
  { src: asset('img/equipe/e03.webp'), alt: 'Integrante da equipe Peraltah com caixas de Apple Watch' },
  { src: asset('img/equipe/e02.webp'), alt: 'Integrante da equipe Peraltah com caixas de iPhone' },
  { src: asset('img/equipe/e04.webp'), alt: 'Integrante da equipe Peraltah em frente ao letreiro da loja' },
]

export const SERVICES = [
  { t: 'Troca de tela', d: 'Display trincado, manchas ou toque falhando', icon: 'screen' },
  { t: 'Troca de bateria', d: 'Duração baixa ou desligamentos inesperados', icon: 'battery' },
  { t: 'Reparo em placa', d: 'Diagnóstico e reparo de componentes da placa', icon: 'board' },
  { t: 'Vidro traseiro', d: 'Traseira quebrada ou trincada', icon: 'back' },
  { t: 'Conector de carga', d: 'Carregamento intermitente ou que não reconhece', icon: 'plug' },
  { t: 'Câmera traseira', d: 'Foco, lente ou imagem com falha', icon: 'camera' },
  { t: 'Câmera frontal e Face ID', d: 'Reconhecimento facial e selfies', icon: 'face' },
  { t: 'Alto-falante', d: 'Som baixo, chiado ou sem áudio', icon: 'speaker' },
  { t: 'Microfone', d: 'Chamadas e áudios sem captação', icon: 'mic' },
  { t: 'Botões', d: 'Power, volume e silencioso', icon: 'power' },
  { t: 'Contato com líquido', d: 'Avaliação após queda na água', icon: 'drop' },
  { t: 'Software e restauração', d: 'Travamentos, atualização e reinstalação', icon: 'software' },
] as const

export const PAYMENTS = ['PIX', 'Dinheiro', 'Cartão de crédito', 'Cartão de débito']
