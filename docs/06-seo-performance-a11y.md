# 06 — SEO, Performance e Acessibilidade

Metas mensuráveis e checklists de verificação. Requisito, não aspiração
(princípio 4 em `00-contexto-e-decisoes.md`).

## Metas

### Performance

Medido em Lighthouse mobile, throttling padrão, build de produção.

| Métrica | Meta | Falha se |
|---|---|---|
| LCP | < 1.5 s | > 2.5 s |
| CLS | < 0.05 | > 0.1 |
| INP | < 150 ms | > 200 ms |
| TTFB | < 400 ms | > 800 ms |
| Lighthouse Performance | ≥ 95 | < 90 |
| Lighthouse Accessibility | 100 | < 100 |
| Lighthouse Best Practices | ≥ 95 | < 90 |
| Lighthouse SEO | 100 | < 100 |
| JS transferido na home | < 90 KB comprimido | > 150 KB |

**Justificativa da meta de acessibilidade em 100.** Os erros que o Lighthouse detecta são
mecânicos — `alt` faltando, contraste insuficiente, `label` sem associação, ordem de
títulos quebrada. Não há motivo para tolerar nenhum. Nota 100 no Lighthouse **não**
significa acessível; significa apenas que os erros triviais foram eliminados. O checklist
manual mais abaixo é que faz o trabalho real.

### Descoberta

| Item | Meta |
|---|---|
| Páginas indexáveis | Apenas as rotas de `02-arquitetura-informacao.md` |
| Rotas indesejadas indexadas | 0 (hoje são 6 — ver P1-1) |
| Compartilhamento no LinkedIn | Card com imagem, título e descrição corretos |
| Sitemap | Presente e completo |
| Dados estruturados | Válidos no Rich Results Test |

## Metadata por rota

`metadataBase` definido em `src/app/layout.tsx` a partir de `NEXT_PUBLIC_SITE_URL`.
Sem isso, todas as URLs relativas de OG quebram.

| Rota | `title` | `description` |
|---|---|---|
| `/` | `Felipe Hamasaki — Full Stack Developer` | Posicionamento, 150–160 caracteres, com stack e disponibilidade |
| `/work` | `Work — Felipe Hamasaki` | O que a página lista |
| `/work/[slug]` | `{frontmatter.title} — Felipe Hamasaki` | `{frontmatter.summary}` |
| `/about` | `About — Felipe Hamasaki` | Uma frase da narrativa |
| `/writing` | `Writing — Felipe Hamasaki` | O que a página lista |
| `/writing/[slug]` | `{frontmatter.title} — Felipe Hamasaki` | `{frontmatter.summary}` |

Template no layout raiz: `` { template: '%s — Felipe Hamasaki', default: '...' } ``.

**Regras:**
- `description` entre 120 e 160 caracteres. Nunca duplicada entre rotas.
- Substituir `"Welcome to my website!"` (P1-3) — não diz nada e desperdiça o espaço que
  o recrutador vê no resultado de busca.
- `alternates.canonical` em toda página, absoluto, sem barra final.
- Páginas com `draft: true` recebem `robots: { index: false, follow: false }`.

## Imagem de compartilhamento (Open Graph)

Gerada dinamicamente com `next/og` (ImageResponse), 1200×630.

| Escopo | Arquivo | Conteúdo |
|---|---|---|
| Padrão do site | `src/app/opengraph-image.tsx` | Nome, papel, URL |
| Case study | `src/app/work/[slug]/opengraph-image.tsx` | Título, ano, stack |
| Artigo | `src/app/writing/[slug]/opengraph-image.tsx` | Título, data |

**Regras:** contraste alto, texto em corpo grande (legível em miniatura), fonte carregada
via `fetch` do arquivo local dentro da rota (o runtime de `next/og` não enxerga `next/font`),
tipografia e paleta idênticas às de `03-design-system.md`.

Também declarar `twitter: { card: 'summary_large_image' }`.

**Por que isso importa mais do que parece:** o canal principal de distribuição do site é o
LinkedIn, colado em candidatura e mensagem para recrutador. Hoje o link renderiza um card
cinza vazio (P1-3). É o primeiro contato visual do recrutador com o trabalho.

## Dados estruturados (JSON-LD)

| Rota | Tipo |
|---|---|
| `/` | `Person` — `name`, `jobTitle`, `url`, `sameAs` (GitHub, LinkedIn), `knowsAbout` |
| `/writing/[slug]` | `BlogPosting` — `headline`, `datePublished`, `dateModified`, `author` |
| `/work/[slug]` | `CreativeWork` |

Injetar via `<script type="application/ld+json">` renderizado no servidor.
Validar em `search.google.com/test/rich-results`.

## `sitemap.ts` e `robots.ts`

**Sitemap** — gerado a partir do conteúdo real:
- Rotas estáticas: `/`, `/about`
- `/work` e cada `/work/[slug]` publicado — só se `hasWork()`
- `/writing` e cada `/writing/[slug]` publicado — só se `hasArticles()`
- `lastModified` a partir do frontmatter, não da data do build

**Robots:**
```ts
{
  rules: [{ userAgent: '*', allow: '/' }],
  sitemap: `${siteConfig.url}/sitemap.xml`
}
```

Não bloquear nada. Após a F3 não existirão mais rotas indesejadas para esconder — elas
simplesmente deixam de existir.

## RSS

`src/app/rss.xml/route.ts`, gerado dos artigos publicados. `<link rel="alternate" type="application/rss+xml">`
no `<head>`. Rota retorna 404 se não houver artigo publicado.

## Orçamento de performance

**Fontes.** Quatro arquivos no máximo (ver `03-design-system.md`). Todas via `next/font`,
com `display: 'swap'` e `preload` apenas na família usada acima da dobra. Isso corrige
P1-4, onde treze arquivos de peso são carregados hoje.

**JavaScript.** A home deve ser quase inteiramente Server Components. Client components
esperados: toggle de tema, formulário de contato. Nada mais deveria precisar.

**Imagens.** `next/image` sempre, com `width`/`height` explícitos. AVIF/WebP.
`priority` apenas na imagem acima da dobra — no máximo uma. Sem imagem decorativa
pesada. As catorze `logos/*.png` e as cinco `hamasaki/exp-*.png` saem do projeto
(ver `03-design-system.md`).

**Terceiros.** Nenhum script de terceiro no caminho crítico. Se houver analytics,
usar Vercel Analytics ou uma alternativa sem cookies, carregada de forma diferida.
Sem Google Analytics, sem gestor de tags, sem widget de chat.

**Deslocamento de layout.** Origens conhecidas hoje: o padrão `if (!mounted) return null`
em Skills e Footer (P1-2) e imagens sem dimensão. Ambos eliminados nas fases F1 e F3.

## Acessibilidade — checklist manual

O Lighthouse cobre o mecânico. Este checklist cobre o resto. Verificar antes de cada
release.

**Estrutura**
- [ ] Um único `<h1>` por página
- [ ] Hierarquia de títulos sem pular nível (`h1` → `h2` → `h3`)
- [ ] Marcos semânticos: `<header>`, `<nav>`, `<main>`, `<footer>`
- [ ] Link "pular para o conteúdo" como primeiro elemento focável
- [ ] `<html lang="en">`

**Teclado**
- [ ] Todo elemento interativo alcançável por Tab
- [ ] Ordem de foco corresponde à ordem visual
- [ ] Anel de foco visível, contraste ≥ 3:1 (ver `03-design-system.md`)
- [ ] Sem armadilha de foco
- [ ] Dialog: foco entra ao abrir, retorna ao gatilho ao fechar, Esc fecha

**Conteúdo**
- [ ] `alt` descritivo e **específico** em toda imagem informativa — corrigir P2-3, onde
      os cinco cards de experiência compartilham o mesmo `alt` de um avatar
- [ ] `alt=""` em imagem puramente decorativa
- [ ] Texto de link faz sentido isolado — sem "clique aqui" ou "leia mais"
- [ ] Link externo indicado, com `rel="noopener noreferrer"`
- [ ] Formulário: todo campo com `<label>` associado; erro anunciado por `aria-live`;
      erro não indicado apenas por cor

**Visual**
- [ ] Contraste conforme a tabela de `03-design-system.md`, nos dois temas
- [ ] Legível com zoom de 200%
- [ ] Sem rolagem horizontal em 320px de largura
- [ ] `prefers-reduced-motion` respeitado
- [ ] Nenhuma informação transmitida apenas por cor
- [ ] Alvos de toque ≥ 44×44px em mobile

**Teste com leitor de tela**
- [ ] Navegar a home inteira com NVDA (Windows) ou VoiceOver
- [ ] Título de cada página anunciado ao navegar entre rotas
- [ ] Enviar o formulário de contato e confirmar que o resultado é anunciado

## Procedimento de verificação

Executar antes de cada release e ao final de cada fase.

```bash
pnpm build
```

```bash
pnpm dlx @lhci/cli autorun --collect.url=http://localhost:3000 --collect.settings.preset=desktop
```

Manual, contra o build de produção (`pnpm build && pnpm start`):

1. Lighthouse mobile e desktop em `/`, `/about` e um `/work/[slug]`
2. Checklist de teclado na home
3. Checklist visual de `03-design-system.md` nos dois temas
4. DevTools em 320px, 375px, 768px, 1280px, 1920px
5. Colar a URL no LinkedIn Post Inspector e conferir o card
6. Rich Results Test na home e num artigo
7. `curl -s <url> | grep -i "<h1"` — confirmar que o conteúdo está no HTML servido,
   não injetado por JavaScript

## Registro de medições

Preencher a cada release para acompanhar regressão.

| Data | Rota | LCP | CLS | INP | Perf | A11y | SEO | Nota |
|---|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — | Linha de base ainda não medida |

**Primeira ação da fase F5:** medir o site atual antes de qualquer otimização, para ter
uma linha de base honesta de comparação.
