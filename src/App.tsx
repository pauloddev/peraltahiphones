import { StorePickerProvider } from './components/ui'
import { CookieConsent } from './components/Cookies'
import { Intro } from './components/Intro'
import {
  Header, Hero, BrandStrip, Iphones, Vitrine, Eletronicos, Prateleira, ClientesVideo, Troca, Clientes, PorQue, Ceo, Equipe, Assistencia, Lojas, CtaFinal, Footer, FloatWhats,
} from './components/Sections'

export default function App() {
  return (
    <StorePickerProvider>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo">
        <Hero />
        <BrandStrip />
        <Iphones />
        <Vitrine />
        <Eletronicos />
        <Prateleira />
        <Clientes />
        <ClientesVideo />
        <Equipe />
        <Troca />
        <Ceo />
        <PorQue />
        <Assistencia />
        <Lojas />
        <CtaFinal />
      </main>
      <Footer />
      <FloatWhats />
      <CookieConsent />
      <Intro />
    </StorePickerProvider>
  )
}
