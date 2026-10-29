# Peraltah iPhones — landing page

Landing page das três lojas Peraltah iPhones (Dourados e Maracaju/MS).
React + TypeScript + Vite, sem backend.

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera a pasta dist/ (é ela que vai para o Vercel)
```

No Vercel: framework **Vite**, build `npm run build`, saída `dist`.

## Onde editar

- **Contatos, endereços, Instagram e WhatsApp:** `src/data/site.ts` (`STORES`).
- **Mensagens pré-preenchidas do WhatsApp:** `src/data/site.ts` (`MSG`).
- **Fotos e vídeos:** `public/img/` e `public/video/`, separados por pasta
  (`iphones`, `acessorios`, `clientes`, `equipe`, `ceo`, `marcas`, `logo`).
  Todas as fotos estão em 4:5 e os vídeos da vitrine em 16:9.
- **Textos das seções:** `src/components/Sections.tsx`.
- **Cores, tipografia e animações:** variáveis no topo de `src/index.css`.
- **Intro (assinatura → maçã):** `src/components/Intro.tsx`. Toca uma vez por sessão,
  pode ser pulada e não aparece para quem ativa a redução de movimento.
