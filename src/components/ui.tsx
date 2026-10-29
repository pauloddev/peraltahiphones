import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode, type ElementType, type CSSProperties } from 'react'
import { WhatsappLogo, X, MapPin } from '@phosphor-icons/react'
import { STORES, MSG, whatsapp, mapsUrl } from '../data/site'

/* ---------- Seletor de unidade (WhatsApp) ---------- */
type Ctx = { open: (message?: string, title?: string) => void }
const StoreCtx = createContext<Ctx>({ open: () => {} })
export const useStorePicker = () => useContext(StoreCtx)

export function StorePickerProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [msg, setMsg] = useState(MSG.geral)
  const [title, setTitle] = useState('Escolha a unidade')
  const lastFocus = useRef<HTMLElement | null>(null)

  const open = useCallback((message = MSG.geral, t = 'Escolha a unidade') => {
    lastFocus.current = document.activeElement as HTMLElement
    setMsg(message)
    setTitle(t)
    ref.current?.showModal()
  }, [])

  const close = () => ref.current?.close()

  useEffect(() => {
    const d = ref.current
    if (!d) return
    const onClose = () => lastFocus.current?.focus()
    const onClick = (e: MouseEvent) => { if (e.target === d) d.close() }
    d.addEventListener('close', onClose)
    d.addEventListener('click', onClick)
    return () => { d.removeEventListener('close', onClose); d.removeEventListener('click', onClick) }
  }, [])

  return (
    <StoreCtx.Provider value={{ open }}>
      {children}
      <dialog ref={ref} className="picker" aria-labelledby="picker-title">
        <div className="picker__panel glass glass--dark">
          <header className="picker__head">
            <div>
              <p className="eyebrow">Atendimento pelo WhatsApp</p>
              <h2 id="picker-title" className="picker__title">{title}</h2>
            </div>
            <button className="icon-btn" onClick={close} aria-label="Fechar seleção de unidade"><X size={20} /></button>
          </header>
          <ul className="picker__list">
            {STORES.map((s) => (
              <li key={s.id} className="picker__store">
                <div className="picker__store-head">
                  <span className="picker__city">{s.city}</span>
                  <span className="picker__label">{s.label}</span>
                </div>
                <p className="picker__addr"><MapPin size={14} weight="fill" aria-hidden /> {s.address}</p>
                <div className="picker__contacts">
                  {s.contacts.map((c) => (
                    <a key={c.phone} className="btn btn--glass btn--sm" href={whatsapp(c.phone, msg)} target="_blank" rel="noopener noreferrer" onClick={close}>
                      <WhatsappLogo size={18} weight="fill" aria-hidden />
                      {s.contacts.length > 1 ? `Falar com ${c.name}` : 'Falar com esta unidade'}
                    </a>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </StoreCtx.Provider>
  )
}

/* ---------- Revelação ao rolar ---------- */
let io: IntersectionObserver | null = null
const seen = new WeakMap<Element, () => void>()
function getIO() {
  if (io || typeof window === 'undefined') return io
  io = new IntersectionObserver(
    (entries) => entries.forEach((e) => { if (e.isIntersecting) { seen.get(e.target)?.(); io!.unobserve(e.target) } }),
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  )
  return io
}
export function useInView<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, set] = useState(false)
  useEffect(() => {
    const el = ref.current; const o = getIO()
    if (!el || !o) { set(true); return }
    seen.set(el, () => set(true)); o.observe(el)
    return () => o.unobserve(el)
  }, [])
  return [ref, inView] as const
}

type RevealProps = { as?: ElementType; className?: string; delay?: number; variant?: 'up' | 'photo' | 'line' | 'fade'; children: ReactNode; style?: CSSProperties; [k: string]: unknown }
export function Reveal({ as: Tag = 'div', className = '', delay = 0, variant = 'up', children, style, ...rest }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag ref={ref} className={`rv rv--${variant} ${inView ? 'is-in' : ''} ${className}`} style={{ ...style, '--d': `${delay}ms` } as CSSProperties} {...rest}>
      {children}
    </Tag>
  )
}

/* Título com linhas que sobem por trás de uma máscara */
export function SplitTitle({ as: Tag = 'h2', lines, className = '', accent, id }: { as?: ElementType; lines: string[]; className?: string; accent?: number; id?: string }) {
  const [ref, inView] = useInView<HTMLElement>()
  return (
    <Tag ref={ref} id={id} aria-label={lines.join(' ').replace(/[{}]/g, '')} className={`split ${inView ? 'is-in' : ''} ${className}`}>
      {lines.map((l, i) => (
        <span className="split__mask" key={i} aria-hidden>
          <span className={`split__line ${accent === i ? 'accent' : ''}`} style={{ '--d': `${i * 90}ms` } as CSSProperties}>{l.split(/(\{[^}]+\})/).map((part, j) => part.startsWith('{') ? <span key={j} className="accent">{part.slice(1, -1)}</span> : part)}{i < lines.length - 1 ? ' ' : ''}</span>
        </span>
      ))}
    </Tag>
  )
}

/* ---------- Vídeo em loop que só toca visível ---------- */
export function LoopVideo({ src, poster, label, className = '' }: { src: string; poster?: string; label: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.play().catch(() => {}); else el.pause() }, { threshold: 0.25 })
    o.observe(el)
    return () => o.disconnect()
  }, [])
  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="none" aria-label={label} />
}

export function mapLink(address: string) { return mapsUrl(address) }
