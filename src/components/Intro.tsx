import { useEffect, useState } from 'react'
import { asset } from '../data/site'

/*
  Intro: a assinatura Peraltah é "escrita" da esquerda para a direita (máscara inclinada
  no ângulo da caligrafia + feixe de luz dourado), vira a maçã branca e se dissolve
  revelando a landing page. Toca uma vez por sessão; some com movimento reduzido.
*/
const KEY = 'peraltah-intro-v1'
const TOTAL = 3600

function shouldPlay() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try { return !sessionStorage.getItem(KEY) } catch { return true }
}

export const INTRO_PLAYS = shouldPlay()
if (INTRO_PLAYS) document.documentElement.dataset.intro = 'on'

export function Intro() {
  const [phase, setPhase] = useState<'play' | 'leave' | 'done'>(INTRO_PLAYS ? 'play' : 'done')

  useEffect(() => {
    if (phase === 'done') return
    document.body.style.overflow = 'hidden'
    const finish = () => setPhase('leave')
    const t = window.setTimeout(finish, TOTAL - 500)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') finish() }
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey) }
  }, [phase])

  useEffect(() => {
    if (phase !== 'leave') return
    try { sessionStorage.setItem(KEY, '1') } catch { /* sem armazenamento: toca de novo na próxima visita */ }
    delete document.documentElement.dataset.intro
    window.dispatchEvent(new Event('peraltah-intro-done'))
    const t = window.setTimeout(() => { document.body.style.overflow = ''; setPhase('done') }, 650)
    return () => clearTimeout(t)
  }, [phase])

  if (phase === 'done') return null
  return (
    <div className={`intro ${phase === 'leave' ? 'is-leaving' : ''}`} role="presentation" onClick={() => setPhase('leave')}>
      <div className="intro__tex" aria-hidden />
      <div className="intro__scan" aria-hidden />
      <div className="intro__stage" aria-hidden>
        <div className="intro__sign">
          <img src={asset('img/logo/intro-peraltah.png')} alt="" width={1176} height={408} />
          <span className="intro__pen" />
        </div>
        <img className="intro__apple" src={asset('img/logo/apple-branca.png')} alt="" width={204} height={250} />
      </div>
      <p className="sr-only">Peraltah iPhones</p>
      <button className="intro__skip" onClick={(e) => { e.stopPropagation(); setPhase('leave') }}>Pular intro</button>
    </div>
  )
}
