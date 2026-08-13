# 04 — Especificação Técnica

Stack, estrutura, convenções e contratos de dados. Normativo.

## Stack

### Mantido (ADR-004)

| Tecnologia | Versão alvo | Nota |
|---|---|---|
| Next.js | `^15` **estável** | Hoje está em `15.2.0-canary.71`. Migrar para o release estável mais recente da linha 15. |
| React | `^19` | |
| TypeScript | `^5` | `strict: true` já ativo |
| Tailwind CSS | `^4` | Via `@tailwindcss/postcss` |
| shadcn/ui + Radix | atual | ADR-007 |
| Biome | `1.9.4` | Ativar `organizeImports` |
| pnpm | atual | |
| next-themes | `^0.4` | `defaultTheme: 'dark'` (ADR-009) |
| Zod | `^3` | Validação de formulário e de frontmatter |
| react-hook-form + @hookform/resolvers | atual | |
| sonner | `^2` | Feedback do formulário |
| lucide-react | atual | Ícones |
| motion | `^12` | Só micro-interações. Reavaliar na F5. |

### A adicionar

| Pacote | Motivo |
|---|---|
| `next-mdx-remote` | Renderizar MDX em RSC (`next-mdx-remote/rsc`) |
| `gray-matter` | Parse de frontmatter |
| `rehype-pretty-code` + `shiki` | Destaque de sintaxe com temas claro e escuro |
| `remark-gfm` | Tabelas e listas de tarefa em MDX |
| `resend` | Envio do formulário de contato (ADR-006) |
| `reading-time` | Tempo de leitura dos artigos |

### A remover

| Pacote | Motivo |
|---|---|
| `three`, `@types/three` | ADR-008 · componente nunca importado |
| `nodemailer` | ADR-006 · substituído pela Resend |
| `vaul` | Se `ui/drawer.tsx` for removido (ver `03-design-system.md`) |
| `tailwindcss-animate` | Verificar uso real após F2. Provável remoção. |

## Estrutura de diretórios alvo

```
docs/                            esta especificação
content/
  work/                          case studies em MDX
    <slug>.mdx
  writing/                       artigos em MDX
    <slug>.mdx
public/
  hamasaki/child.png             mantido
  resume/eng-resume.pdf
  resume/pt-resume.pdf
src/
  app/
    layout.tsx                   root layout, fontes, tema, metadata base
    page.tsx                     home
    not-found.tsx
    sitemap.ts
    robots.ts
    opengraph-image.tsx          OG padrão do site
    about/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
    work/[slug]/opengraph-image.tsx
    writing/page.tsx
    writing/[slug]/page.tsx
    writing/[slug]/opengraph-image.tsx
    rss.xml/route.ts
  components/
    layout/
      site-header.tsx
      site-footer.tsx
      theme-toggle.tsx
      theme-provider.tsx
    sections/
      hero.tsx
      selected-work.tsx
      experience-timeline.tsx
      contact-section.tsx
    content/
      prose.tsx                  wrapper de estilo do MDX
      mdx-components.tsx         mapeamento de componentes MDX
      work-list-item.tsx
      article-list-item.tsx
    contact/
      contact-form.tsx           client component
    ui/                          shadcn — apenas o que estiver em uso
  lib/
    content.ts                   leitura e validação de MDX
    schemas.ts                   schemas Zod
    site-config.ts               constantes do site
    utils.ts                     cn()
  actions/
    send-contact.ts              Server Action
  styles/
    globals.css
```

**Regra fundamental:** `src/app/` contém **apenas rotas**. Nenhuma seção de página vive
ali. Isso corrige P1-1 — hoje `src/app/section-about/page.tsx` gera a URL pública
`/section-about`.

## Convenções de código

**Server Components por padrão.** `'use client'` é exceção, permitida somente quando o
componente usa hook de estado, hook de efeito, manipulador de evento do DOM ou API de
navegador. Componentes puramente apresentacionais nunca são client — isso inclui
`typography.tsx`, que hoje é client sem motivo (P1-5).

Empurre `'use client'` para a folha mais distante da árvore. Um botão interativo é client;
a seção que o contém não precisa ser.

**Proibido o padrão `if (!mounted) return null`** em seções (P1-2). Se um asset depende do
tema, resolva com CSS (`dark:hidden` / `hidden dark:block`) e mantenha o conteúdo sempre
presente no HTML.

**Nomes de arquivo:** kebab-case. Componentes React em PascalCase. Um componente principal
por arquivo, exportado como nomeado (`export function SiteHeader()`), salvo em arquivos de
rota do Next, que exigem `export default`.

**Imports:** sempre pelo alias `@/`. Nunca `../../`.

**Tipos:** `import type` para importação apenas de tipo (Biome já avisa). Evitar `any`;
se inevitável, comentar o porquê.

**Estilo:** classes Tailwind via `cn()`. Nada de CSS-in-JS. Nada de valores arbitrários
para cor ou espaçamento — usar os tokens de `03-design-system.md`. Valores arbitrários de
largura como `md:w-185` e `lg:w-220` (presentes hoje em `section-experience/components/card.tsx`)
estão proibidos.

**Formatação:** Biome. Aspas simples, sem ponto e vírgula, sem vírgula final. Ativar
`organizeImports` (hoje desabilitado em `biome.json`).

## Camada de conteúdo

ADR-003: MDX versionado, sem CMS. Implementação em `src/lib/`.

### Frontmatter — case study

Arquivo: `content/work/<slug>.mdx`

```yaml
---
title: 'Real-time alert pipeline'
summary: 'Cut alert delivery latency from 40s to under 2s by replacing polling with a push-based pipeline.'
role: 'Full stack developer'
year: 2025
stack: ['TypeScript', 'NestJS', 'PostgreSQL', 'Redis']
repo: 'https://github.com/felipehborges/...'    # opcional
demo: 'https://...'                              # opcional
featured: true
draft: false
order: 1                                          # opcional, ordena os destaques
---
```

### Frontmatter — artigo

Arquivo: `content/writing/<slug>.mdx`

```yaml
---
title: 'Why I stopped reaching for useEffect'
summary: 'A practical rule for deciding when an effect is the wrong tool.'
publishedAt: '2026-09-14'      # ISO 8601
updatedAt: '2026-09-20'        # opcional
tags: ['react', 'frontend']
draft: false
---
```

### Schemas — `src/lib/schemas.ts`

Validar todo frontmatter com Zod. **Falha de validação deve quebrar o build**, não ser
silenciada — conteúdo inválido em produção é pior que build vermelho.

```ts
import { z } from 'zod'

export const workFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(200),
  role: z.string().min(1),
  year: z.number().int().min(2020).max(2100),
  stack: z.array(z.string()).min(1),
  repo: z.string().url().optional(),
  demo: z.string().url().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(true),
  order: z.number().int().optional()
})

export const articleFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(200),
  publishedAt: z.string().date(),
  updatedAt: z.string().date().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(true)
})

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>
export type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>
```

### API de leitura — `src/lib/content.ts`

Contrato que o resto do código consome:

```ts
getAllWork(): Promise<WorkEntry[]>          // publicados, ordem cronológica reversa
getFeaturedWork(): Promise<WorkEntry[]>     // featured: true, ordenado por `order`
getWorkBySlug(slug): Promise<WorkEntry | null>
getAllArticles(): Promise<ArticleEntry[]>   // publicados, mais recentes primeiro
getArticleBySlug(slug): Promise<ArticleEntry | null>
hasWork(): Promise<boolean>                 // controla a existência da rota /work
hasArticles(): Promise<boolean>             // controla a existência da rota /writing
```

Onde `WorkEntry = { slug, frontmatter, content }`.

**Regras:**
- Em produção (`NODE_ENV === 'production'`), itens com `draft: true` são excluídos de
  todas as consultas. Em desenvolvimento, aparecem com indicação visual de rascunho.
- Ler o sistema de arquivos apenas em Server Components e em `generateStaticParams`.
- Se `content/work/` não existir, retornar lista vazia — não lançar erro. O site precisa
  buildar num repositório sem conteúdo ainda.
- Resultados memoizados com `cache()` do React para não reler o disco a cada chamada.

### Pipeline de renderização MDX

`next-mdx-remote/rsc` com:

- `remark-gfm` — tabelas, listas de tarefa, autolink
- `rehype-slug` — ids em títulos
- `rehype-autolink-headings` — âncoras clicáveis
- `rehype-pretty-code` com Shiki, temas `github-dark-default` e `github-light` mapeados
  aos temas do site

Mapeamento de componentes em `src/components/content/mdx-components.tsx`: `img` → `next/image`,
`a` externo → `target="_blank" rel="noopener noreferrer"`, títulos e parágrafos herdando a
escala tipográfica.

## Formulário de contato

ADR-006. Server Action + Resend.

### Contrato

`src/actions/send-contact.ts`:

```ts
'use server'

type ContactResult =
  | { ok: true }
  | { ok: false; error: 'validation' | 'rate_limit' | 'send_failed' }

export async function sendContact(data: unknown): Promise<ContactResult>
```

### Requisitos

1. **Revalidar no servidor** com o mesmo schema Zod usado no cliente. Nunca confiar na
   validação de cliente.
2. **Honeypot**: campo oculto (por exemplo `company`) que humano não preenche. Se vier
   preenchido, retornar `{ ok: true }` sem enviar nada — não sinalizar ao bot que foi
   detectado.
3. **Rate limit** por IP: máximo 3 envios por hora. Em memória é suficiente para o volume
   esperado; se o deploy for serverless com instâncias efêmeras, usar Upstash Redis.
4. **Remetente** é um endereço do domínio verificado na Resend. O e-mail do visitante vai
   em `reply_to`, **nunca** em `from` — usar o endereço do visitante como remetente causa
   falha de SPF/DKIM e queda em spam. (É exatamente o que o handler morto atual faz:
   `from: email` em `src/api/contact-me/index.js`.)
5. **Nunca registrar em log** o conteúdo da mensagem nem o e-mail do remetente.
6. **Erro é visível ao usuário** via `sonner`, com o `mailto:` como alternativa no texto
   do erro.

### Variáveis de ambiente

Documentar em `.env.example` (versionado; `.env*` real já está no `.gitignore`):

```
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=
NEXT_PUBLIC_SITE_URL=https://...
```

`NEXT_PUBLIC_SITE_URL` é obrigatória para `metadataBase`, sitemap, canonical e RSS.

## Configuração a corrigir

### `next.config.ts`

Hoje é um arquivo inteiramente comentado, sem export (P1-7). Substituir por:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp']
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  }
}

export default nextConfig
```

### `tsconfig.json`

Remover do `include` os caminhos inexistentes (P2-2):
`src/app/[locale]/section-footer`, `src/app/[locale]/section-about`,
`src/app/[locale]/section-home`, `src/api/contact-me/index.js`.

Considerar elevar `target` de `ES2017` para `ES2022`.

### `biome.json`

Ativar `organizeImports`. Ativar `vcs.useIgnoreFile`.

### `.gitignore`

Adicionar `*.stackdump`. Deletar o `bash.exe.stackdump` já versionado (P2-1).

## `src/lib/site-config.ts`

Fonte única para dados repetidos em metadata, JSON-LD, footer e RSS:

```ts
export const siteConfig = {
  name: 'Felipe Hamasaki',
  role: 'Full Stack Developer',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  description: '...',            // ver 06-seo-performance-a11y.md
  email: 'felipehama@gmail.com',
  location: 'São Paulo, Brazil',
  links: {
    github: 'https://github.com/felipehborges',
    linkedin: 'https://www.linkedin.com/in/felipehborges/',
    repo: 'https://github.com/felipehborges/felipe-hamasaki'
  },
  resume: {
    en: '/resume/eng-resume.pdf',
    pt: '/resume/pt-resume.pdf'
  }
} as const
```

Nenhuma URL, e-mail ou nome deve aparecer literal em componente. Tudo vem daqui.

## Definição de pronto (por tarefa de código)

- [ ] `pnpm build` passa sem erro nem aviso novo
- [ ] `pnpm biome check .` limpo
- [ ] `tsc --noEmit` limpo
- [ ] Sem `'use client'` desnecessário
- [ ] Sem literal de cor, URL ou e-mail fora dos tokens / `site-config`
- [ ] Checklist visual de `03-design-system.md` cumprido, se houver UI
- [ ] Critérios de aceite da tarefa em `07-roadmap-execucao.md` verificados
- [ ] Status da tarefa atualizado em `07-roadmap-execucao.md` no mesmo commit
