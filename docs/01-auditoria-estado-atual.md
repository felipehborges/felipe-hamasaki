# 01 — Auditoria do Estado Atual

Auditoria completa do código em `main` no commit `d341796`, feita em 2026-08-08.

Este documento existe para que ninguém precise reauditar o código legado. Ele lista o que
existe, o que está quebrado e onde, e o que deve sobreviver à refatoração.

## Inventário

### Configuração

| Arquivo | Estado |
|---|---|
| `package.json` | Next `15.2.0-canary.71` (canary fixado), React 19, Tailwind 4, Biome 1.9.4, pnpm |
| `next.config.ts` | **Inteiramente comentado.** Não exporta nada. |
| `tsconfig.json` | `include` referencia `src/app/[locale]/*` — pastas que não existem |
| `biome.json` | Funcional. `organizeImports` desabilitado. |
| `components.json` | shadcn/ui, estilo new-york, baseColor zinc, RSC habilitado |
| `.gitignore` | Adequado |
| `bash.exe.stackdump` | Arquivo de crash dump versionado por engano |
| `README.md` | **Não existe** |

### Código-fonte

```
src/
├── api/contact-me/
│   ├── index.js              handler nodemailer — CÓDIGO MORTO
│   └── types.ts
├── app/
│   ├── layout.tsx            root layout, ThemeProvider, Poppins
│   ├── page.tsx              home — compõe as seções
│   ├── favicon.ico
│   ├── section-home/page.tsx        ← rota indesejada /section-home
│   ├── section-about/page.tsx       ← rota indesejada /section-about
│   ├── section-skills/page.tsx      ← rota indesejada /section-skills
│   ├── section-experience/page.tsx  ← rota indesejada /section-experience
│   ├── section-experience/components/card.tsx
│   ├── section-projects/page.tsx    ← rota indesejada /section-projects
│   └── section-footer/page.tsx      ← rota indesejada /section-footer
├── components/
│   ├── navbar.tsx
│   ├── typography.tsx
│   ├── skill-logo.tsx
│   ├── theme-provider.tsx
│   ├── button-change-theme.tsx
│   ├── button-change-lang.tsx       ← nunca importado
│   ├── three-scene.tsx              ← nunca importado
│   ├── download-resume-button.tsx
│   ├── contact-me/
│   │   ├── contact-me-dialog.tsx
│   │   └── contact-me-form.tsx
│   └── ui/                          13 componentes shadcn
├── lib/utils.ts
└── styles/globals.css
```

### Assets em `public/`

| Caminho | Uso |
|---|---|
| `hamasaki/home-me-anime.png` | Avatar anime na home |
| `hamasaki/child.png` | Foto de infância na seção About |
| `hamasaki/exp-teacher.png`, `exp-hr.png`, `exp-dev1.png`, `exp-dev2.png`, `exp-dev3.png` | Imagens dos cards de experiência |
| `logos/*.png` | 14 logos de tecnologia + 4 logos sociais |
| `resume/eng-resume.pdf`, `resume/pt-resume.pdf` | Currículos para download |

## Catálogo de problemas

Severidade: **P0** custa oportunidades agora · **P1** compromete qualidade ou descoberta ·
**P2** dívida técnica e higiene.

### P0 — Crítico

#### P0-1 · Seção de projetos vazia

`src/app/section-projects/page.tsx`

A seção renderiza um ícone de martelo e o texto "Still in progress...". Ocupa uma tela
inteira. É a seção que todas as referências de contratação apontam como a mais importante,
e hoje comunica ausência de trabalho.

#### P0-2 · Formulário de contato não envia nada

`src/components/contact-me/contact-me-form.tsx:41`

```ts
async function onSubmit(formData: FormSchemaType) {
  console.log(formData)
}
```

O formulário valida com Zod, mostra estado de carregamento e não faz absolutamente nada
com os dados. Qualquer pessoa que tenha tentado contato pelo site teve a mensagem perdida
silenciosamente.

#### P0-3 · Handler de e-mail é código morto no formato errado

`src/api/contact-me/index.js`

Handler estilo Pages Router (`export default async function handler(req, res)`) dentro de
`src/api/`, que não é um diretório de rotas em nenhuma convenção do Next.js. Nunca foi
executado. A dependência `nodemailer` existe apenas por causa dele.

#### P0-4 · Experiência sem substância

`src/app/section-experience/page.tsx`

Cinco cards com cargo, período, empresa, localização e imagem. Nenhuma informação sobre
o que foi construído, com qual stack, resolvendo qual problema, com qual resultado.
É exatamente o "currículo transposto para HTML" que o público-alvo desconsidera.

#### P0-5 · Skills é uma parede de logos

`src/app/section-skills/page.tsx`

Quatorze imagens com tooltip de nome. Sinal informacional próximo de zero: não diz
profundidade, contexto de uso, nem tempo de experiência. Além disso, os `delay` de
animação vão de `0.1` até `3.25` segundos — o último logo leva mais de três segundos
para aparecer.

### P1 — Alto

#### P1-1 · Seções são rotas reais

`src/app/section-*/page.tsx` (6 arquivos)

No App Router, `src/app/section-about/page.tsx` gera a URL `/section-about`. Existem hoje
seis páginas públicas e indexáveis renderizando fragmentos soltos, sem navbar, sem
contexto. Isso polui o índice de busca e é um erro conceitual de uso do framework:
seções são componentes, não rotas.

#### P1-2 · Conteúdo ausente do HTML servido

`src/app/section-skills/page.tsx` e `src/app/section-footer/page.tsx`

```ts
const [mounted, setMounted] = useState(false)
useEffect(() => { setMounted(true) }, [])
if (!mounted) return null
```

As seções de Skills e Footer retornam `null` no primeiro render. O HTML entregue ao
crawler e ao usuário não contém nem as habilidades nem os links de contato. Também causa
deslocamento de layout quando o conteúdo aparece.

O padrão foi usado para evitar erro de hidratação com `next-themes`, mas resolve o
problema errado — só as imagens que dependem do tema precisam desse tratamento, não a
seção inteira.

#### P1-3 · Metadados praticamente inexistentes

`src/app/layout.tsx:17-20`

```ts
export const metadata: Metadata = {
  title: 'Felipe Hamasaki',
  description: 'Welcome to my website!'
}
```

Sem description real, sem Open Graph, sem Twitter Card, sem imagem de compartilhamento,
sem `metadataBase`, sem canonical. Não existem `sitemap.ts`, `robots.ts` nem dados
estruturados JSON-LD.

Efeito prático: compartilhar o link no LinkedIn produz um card cinza sem imagem nem
descrição — no canal onde recrutador internacional efetivamente circula.

#### P1-4 · Duas famílias de fonte carregadas, uma com nove pesos

`src/app/layout.tsx:8-12` carrega **Poppins** com os pesos `100,200,300,400,500,600,700,800,900`.
`src/components/typography.tsx:11-15` carrega **Domine** com quatro pesos.

Treze arquivos de fonte para um site que usa efetivamente dois ou três pesos.

Bug adicional: em `typography.tsx:12`, a fonte Domine é registrada sob a variável
`--font-poppins`, sobrescrevendo o nome da outra família. Copy-paste não corrigido.

Bug relacionado: `src/styles/globals.css:6-7` declara `--font-sans: var(--font-geist-sans)`
e `--font-mono: var(--font-geist-mono)`. Nenhuma das duas variáveis é definida em lugar
algum — Geist nunca foi instalado.

#### P1-5 · Tudo é client component

Todas as seções, `typography.tsx` inclusive, começam com `'use client'`. `typography.tsx`
exporta componentes puramente apresentacionais (H1, P, Blockquote…) que não usam nenhum
hook e não precisam ser client.

Nenhum benefício de SSR está sendo aproveitado num site que é essencialmente conteúdo
estático.

#### P1-6 · Contraste insuficiente

`src/styles/globals.css`

- `--primary: #f5d90a` (amarelo) sobre `--background-page: #fef2e8` (creme) no tema claro:
  razão de contraste ≈ 1.5:1. Muito abaixo do mínimo 4.5:1 do WCAG AA. O texto
  "Felipe Hamasaki" no hero usa exatamente essa combinação.
- `--secondary: #F5AA0A` sobre o mesmo fundo: ≈ 2.2:1. Também reprovado.
- No tema escuro, `--background-page: #424242` é um cinza neutro que não conversa com o
  resto da paleta (que é quente, base `#0d0b0a`).

#### P1-7 · `next.config.ts` não exporta configuração

O arquivo contém apenas um bloco comentado. Um arquivo de configuração TypeScript sem
export default é, na melhor das hipóteses, inútil, e impede qualquer configuração de
imagens, headers ou redirects.

### P2 — Higiene e dívida

#### P2-1 · Dependências e arquivos mortos

| Item | Situação |
|---|---|
| `three` + `@types/three` | `three-scene.tsx` nunca é importado. Dependência pesada sem uso. |
| `nodemailer` | Usado só pelo handler morto `src/api/contact-me/index.js` |
| `button-change-lang.tsx` | Nunca importado. Resquício de i18n abandonado. |
| `bash.exe.stackdump` | Crash dump versionado por engano |

#### P2-2 · `tsconfig.json` aponta para pastas inexistentes

```json
"include": [
  ...,
  "src/app/[locale]/section-footer",
  "src/app/[locale]/section-about",
  "src/app/[locale]/section-home",
  "src/api/contact-me/index.js"
]
```

Nenhum desses caminhos existe. Resquício da tentativa de i18n.

#### P2-3 · Texto alternativo copiado errado

`src/app/section-experience/components/card.tsx:37`

```tsx
alt="Hamasaki in Anime"
```

Todos os cinco cards de experiência — imagens de empresas diferentes — usam o mesmo
texto alternativo, herdado do avatar do hero. Falha de acessibilidade direta.

#### P2-4 · Navbar com controle de estado frágil

`src/components/navbar.tsx`

- Esconde a navbar ao clicar num link e reativa com `setTimeout(1000)` (`navButtonClicked`).
  Solução por temporizador para um problema de scroll.
- Listener de `scroll` sem throttle nem `requestAnimationFrame`, com `lastScrollY` no state,
  causando re-render a cada evento de rolagem.
- Detecção de mobile via `window.innerWidth` em listener de `resize`, duplicando o que os
  breakpoints CSS já resolvem.
- `useEffect` com `biome-ignore` de `useExhaustiveDependencies` sem explicação.

#### P2-5 · Animação prejudicando a leitura

- `src/app/section-experience/components/card.tsx:22-33` — cards entram de `scale: 0` com
  mola (`bounce: 0.5`). Distrai e atrasa a leitura do conteúdo mais importante da página.
- `src/app/section-skills/page.tsx` — `delay` escalonado até 3.25s.
- `src/components/skill-logo.tsx` usa `motion` sem `'use client'` próprio; funciona apenas
  porque é importado por um client component. Frágil.

#### P2-6 · Monotonia estrutural

Cinco seções `min-h-screen`, quase todas seguindo o padrão "card centralizado com título".
Rolagem longa e previsível até um destino vazio.

#### P2-7 · Erro de digitação visível ao usuário

`src/app/section-skills/page.tsx` — tooltip do Fastify diz `"Fatisfy"`.

## O que preservar

Nem tudo precisa mudar. Estes elementos são bons e devem sobreviver:

| Item | Por quê |
|---|---|
| Stack base (Next 15, React 19, Tailwind 4, TypeScript strict) | Moderna e adequada. O problema nunca foi a stack. |
| shadcn/ui + Radix | Base acessível e sem lock-in. Componentes são código local. |
| Biome | Rápido, configuração enxuta, já funcionando |
| pnpm | Mantém |
| Toggle de tema (`button-change-theme.tsx`) | Funciona bem. Só precisa deixar de causar `return null` de seções inteiras. |
| Narrativa RH → dev | Ativo de conteúdo genuíno. Migra para `/about` expandida. |
| Foto de infância (`child.png`) | Calor humano real. Mantém em `/about`. |
| Avatar anime (`home-me-anime.png`) | Decidir na F2. Ver `03-design-system.md`, seção "Imagem e identidade". |
| PDFs de currículo | Mantém ambos, EN e PT |
| `lib/utils.ts` (`cn`) | Padrão, mantém |

## Resumo quantitativo

| Métrica | Valor atual |
|---|---|
| Rotas públicas indesejadas | 6 |
| Seções ausentes do HTML servido | 2 |
| Dependências sem uso | 3 (`three`, `@types/three`, `nodemailer`) |
| Arquivos sem uso | 3 (`three-scene.tsx`, `button-change-lang.tsx`, `src/api/contact-me/`) |
| Famílias de fonte carregadas | 2 (13 arquivos de peso) |
| Projetos exibidos | 0 |
| Formulários funcionais | 0 |
| Combinações de cor reprovadas em WCAG AA | ≥ 2 |
