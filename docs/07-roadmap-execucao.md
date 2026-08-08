# 07 — Roadmap de Execução

Documento operacional. É aqui que se descobre o que fazer em seguida.

## Como usar

1. Percorra as fases em ordem. Dentro de uma fase, as tarefas podem ser paralelizadas,
   salvo dependência declarada.
2. Execute **uma tarefa por vez**. Não antecipe trabalho de fases futuras.
3. Verifique contra os critérios de aceite da tarefa **e** contra a definição de pronto de
   `04-especificacao-tecnica.md`.
4. Atualize o status da tarefa **neste arquivo, no mesmo commit** que implementa a tarefa.
5. Se a tarefa estiver ambígua, o defeito é da spec: corrija a spec, depois execute.

Legenda de status: ⬜ pendente · 🟡 em andamento · ✅ concluída · ⛔ bloqueada

Convenção de commit sugerida: `F1-T01: remove dead code and unused dependencies`

## Grafo de dependências

```
F1 (saneamento) ──┬──> F2 (design system) ──> F3 (rotas e seções) ──┬──> F4 (MDX)
                  │                                                 └──> F6 (contato)
                  └──────────────────────────────────────────────────────> F5 (SEO/perf)

F7 (conteúdo, dono do projeto) corre em paralelo desde já.
Trava o resultado final, não a execução técnica.
```

F5 depende de F3 e F4 estarem concluídas para a auditoria final, mas a medição de linha de
base (F5-T01) deve ser feita **antes** da F1.

---

## F1 — Saneamento técnico

**Objetivo.** Deixar o repositório limpo e a configuração correta antes de construir
qualquer coisa nova. Resolve os problemas P2 e parte dos P1 de `01-auditoria-estado-atual.md`.

**Pré-requisito.** Executar F5-T01 antes, para ter a linha de base de performance.

### F1-T01 · Remover código e dependências mortas ✅

Deletar:
- `src/components/three-scene.tsx`
- `src/components/button-change-lang.tsx`
- `src/api/` (diretório inteiro — `contact-me/index.js` e `types.ts`)
- `bash.exe.stackdump`

Remover do `package.json`: `three`, `@types/three`, `nodemailer`.

Adicionar `*.stackdump` ao `.gitignore`.

**Aceite:** `pnpm build` passa · `grep -r "three\|nodemailer\|ChangeLang" src/` não retorna
nada · `pnpm-lock.yaml` atualizado · nenhum arquivo listado acima existe.

**Referência:** `01-auditoria-estado-atual.md` P2-1 · ADR-008 · ADR-002

### F1-T02 · Corrigir `next.config.ts` ✅

Substituir o arquivo comentado pela configuração de `04-especificacao-tecnica.md`.

**Aceite:** exporta `NextConfig` tipado como default · `pnpm build` passa sem aviso de
configuração.

**Referência:** P1-7

### F1-T03 · Limpar `tsconfig.json` ✅

Remover do `include` os quatro caminhos inexistentes (`src/app/[locale]/*`,
`src/api/contact-me/index.js`). Elevar `target` para `ES2022`.

**Aceite:** `pnpm tsc --noEmit` limpo · nenhum caminho do `include` aponta para diretório
inexistente.

**Referência:** P2-2

### F1-T04 · Ajustar Biome ✅

Ativar `organizeImports.enabled` e `vcs.useIgnoreFile`. Rodar `pnpm biome check --write .`.

**Aceite:** `pnpm biome check .` limpo em todo o repositório.

### F1-T05 · Migrar Next.js de canary para estável ✅

De `15.2.0-canary.71` para o release estável mais recente da linha 15 (`15.5.23`,
confirmada via npm em 2026-08-08).

**Aceite:** `package.json` sem `canary` · `pnpm build` passa · `pnpm dev` sobe e a home
renderiza sem erro de console.

### F1-T06 · Criar `src/lib/site-config.ts` ✅

Conforme o contrato em `04-especificacao-tecnica.md`. Substituir todas as ocorrências
literais de e-mail, URL de GitHub, URL de LinkedIn e caminho de currículo — hoje espalhadas
por `section-footer/page.tsx`, `navbar.tsx` e `download-resume-button.tsx`.

**Aceite:** `grep -rn "linkedin.com\|github.com/felipehborges\|felipehama@gmail" src/`
retorna apenas `site-config.ts`.

**Exceção aprovada pelo dono do projeto em 2026-08-08:** `src/app/section-experience/page.tsx`
mantém a URL literal `companyUrl="https://www.linkedin.com/company/skill-idiomas..."` — é o
link de uma empresa, não do dono, e não faz parte do contrato de `site-config.ts`. A seção
inteira é escopo de F3, não de F1. `navbar.tsx` não continha nenhum dos literais listados
na tarefa; `contact-me-dialog.tsx`, não citado no texto original da tarefa, também os
continha e foi migrado.

### F1-T07 · Criar `.env.example` e `README.md` do repositório ✅

`.env.example` com as quatro variáveis de `04-especificacao-tecnica.md`, sem valores reais.

`README.md` na raiz, em **inglês** — é lido por recrutador e por dev do time (ver percursos
em `02-arquitetura-informacao.md`): o que é o projeto, stack, como rodar localmente,
variáveis de ambiente necessárias, link para `docs/`.

**Aceite:** ambos existem · `.env.example` não contém segredo · seguir o README do zero
sobe o projeto localmente.

---

## F2 — Design system

**Objetivo.** Implementar `03-design-system.md`. Nenhuma mudança estrutural de página aqui —
apenas a fundação visual.

**Depende de:** F1.

### F2-T01 · Tokens de cor ✅

Reescrever a camada de cores de `src/styles/globals.css` com os tokens da nova paleta,
nos temas escuro e claro. Manter os aliases que os componentes shadcn consomem apontando
para os novos tokens. Remover `--background-page`, `--card-secondary` e os `--chart-*`
não utilizados.

Alterar `defaultTheme` para `'dark'` em `src/app/layout.tsx` (ADR-009).

**Aceite:** nenhum dos hex `#f5d90a`, `#F5AA0A`, `#fef2e8`, `#424242` aparece no
repositório · alternar tema não quebra nenhuma tela · contraste verificado conforme a
tabela de `03-design-system.md`.

**Referência:** P1-6 · ADR-005 · ADR-009

### F2-T02 · Fontes ✅

Remover Poppins de `layout.tsx` e Domine de `typography.tsx`. Carregar Newsreader, Inter e
JetBrains Mono via `next/font` no layout raiz, expostas como variáveis CSS. Remover as
referências mortas a `--font-geist-sans` e `--font-geist-mono` de `globals.css`.

**Aceite:** exatamente três famílias carregadas, no máximo quatro arquivos de peso · nenhum
carregamento de fonte fora de `layout.tsx` · a aba Network não mostra requisição a
`fonts.googleapis.com`.

**Referência:** P1-4

### F2-T03 · Reescrever `typography.tsx` ✅

Remover `'use client'`. Remover o carregamento de fonte de dentro do arquivo. Alinhar à
escala de `03-design-system.md`. Aplicar `text-wrap: balance` em títulos e `pretty` em
parágrafos. Remover `text-justify` de todo o projeto.

**Aceite:** arquivo sem `'use client'` · sem `next/font` · `grep -rn "text-justify" src/`
vazio.

**Referência:** P1-5

### F2-T04 · Tokens estruturais e regras globais ✅

Nota: a escala de espaçamento (4·8·12·16·24·32·48·64·96·128) já corresponde exatamente à
escala padrão do Tailwind 4 (base `--spacing: 0.25rem` = 4px), então não foram criados
tokens CSS redundantes para isso — apenas raios, durações e curva de easing (que exigiam
valores diferentes do padrão) foram declarados explicitamente em `globals.css`.

Em `globals.css`: escala de espaçamento, raios, durações e curva de easing; regra global
de `:focus-visible`; bloco de `prefers-reduced-motion`.

**Aceite:** navegar por Tab mostra anel de foco visível em todo elemento interativo ·
com movimento reduzido ativado no SO, nenhuma transição visível ocorre e o scroll deixa
de ser suave · nenhuma sombra permanece no projeto.

### F2-T05 · Realinhar componentes `ui/` ✅

Ajustar `button`, `input`, `textarea`, `label`, `form`, `sonner` aos novos tokens.
Remover variantes de botão não utilizadas. Eliminar toda `border-2 border-black` e
`shadow-[...]` do projeto.

**Aceite:** `grep -rn "border-black\|shadow-\[" src/` vazio · botões e campos consistentes
nos dois temas.

**Nota de execução:** removida apenas a variante `destructive` do botão (confirmada sem
nenhum uso no código). `03-design-system.md` também lista `outline` e `secondary` como
variantes a remover ("Manter. Variantes: primary, ghost, link"), mas ambas seguem em uso
ativo em `navbar.tsx`, `contact-me-dialog.tsx` e `download-resume-button.tsx` — componentes
que só são substituídos/removidos na F3 (`SiteHeader`, exclusão do `ContactMeDialog`).
Removê-las agora quebraria o build antes da hora. Revisitar a redução final do conjunto de
variantes ao final de F3, quando os componentes antigos que as consomem já não existirem.
`bg-red-500` hardcoded no `sonner.tsx` (bug: todo toast aparecia vermelho) também foi
corrigido para `bg-popover`, por estar diretamente dentro do escopo desta tarefa.

### F2-T06 · Decisão sobre identidade visual ✅

**Decidido: opção A** — retrato fotográfico real, pequeno (96–128px), ao lado do nome no
hero. Registrado em `08-registro-decisoes.md` como ADR-011.

Pendência que decorre da decisão, e que não é tarefa de código:

### F2-T07 · Fornecer a fotografia de retrato ⛔ *bloqueada — requer o dono*

Retrato de cabeça e ombros, fundo neutro, boa iluminação, enquadramento quadrado.
De preferência a mesma foto usada no LinkedIn. Salvar em `public/hamasaki/portrait.jpg`.

Enquanto não existir, F3-T04 renderiza o hero sem a imagem — **nunca** com placeholder
cinza nem com o avatar anime de volta em tamanho grande.

**Aceite:** arquivo presente em `public/hamasaki/` · lado mínimo de 256px para permitir
tela de alta densidade · sem metadado EXIF de localização.

---

## F3 — Arquitetura de informação e rotas

**Objetivo.** Implementar `02-arquitetura-informacao.md`. É a fase que muda a forma do site.

**Depende de:** F2.

### F3-T01 · Eliminar as rotas fantasma ⬜

Mover os seis `src/app/section-*/page.tsx` para `src/components/sections/*.tsx` como
componentes nomeados. Deletar os diretórios `src/app/section-*/`. Mover
`section-experience/components/card.tsx` junto.

Remover o padrão `if (!mounted) return null` de Skills e Footer; onde um asset depende do
tema, usar `dark:hidden` / `hidden dark:block`.

**Aceite:** `src/app/` contém apenas arquivos de rota · `/section-about` e similares
retornam 404 · `curl -s localhost:3000 | grep -i "linkedin"` encontra o link do footer no
HTML servido (hoje não encontra).

**Referência:** P1-1 · P1-2

### F3-T02 · `SiteHeader` ⬜

Header fixo, sempre visível, sem esconder ao rolar. Logotipo textual, navegação
condicional (`Work`, `Writing`, `About`), toggle de tema, indicação de rota ativa. Sem
menu hambúrguer se os itens couberem em mobile.

Deletar `src/components/navbar.tsx` e o `ContactMeDialog` da navegação.

**Aceite:** sem `setTimeout` nem listener de `scroll` no header · sem listener de `resize` ·
`navbar.tsx` deletado · funciona em 360px de largura.

**Referência:** P2-4

### F3-T03 · `SiteFooter` ⬜

Nome, ano, links sociais com ícones `lucide-react`, navegação secundária, link para o
repositório. Tudo vindo de `site-config.ts`. Presente em todas as rotas via layout.

**Aceite:** nenhum `logos/*.png` social em uso · presente em todas as rotas · Server
Component.

### F3-T04 · `Hero` ⬜

Conforme `02-arquitetura-informacao.md`. `<h1>`, linha de posicionamento com senioridade,
stack e disponibilidade, dois parágrafos no máximo, ações primárias, links persistentes.

Sem imagem dividindo a tela ao meio. Sem `min-h-screen`. Sem animação de entrada.

Se o conteúdo do bloco 1 do briefing (`05-estrategia-conteudo.md`) ainda não existir, usar
um marcador explícito `TODO(content)` no código — **nunca** inventar o texto.

**Aceite:** senioridade, stack e disponibilidade visíveis sem rolar em 1280×720 e em
390×844 · Server Component · sem `whileInView`.

### F3-T05 · `ExperienceTimeline` ⬜

Timeline tipográfica, sem card, sem borda, sem imagem por cargo. Cada entrada segue o
template de `05-estrategia-conteudo.md`.

Deletar `card.tsx` e as cinco imagens `public/hamasaki/exp-*.png`.

**Aceite:** sem `motion` · sem `scale: 0` · sem largura arbitrária tipo `md:w-185` ·
imagens deletadas · legível em 360px.

**Referência:** P0-4 · P2-3 · P2-5

### F3-T06 · `ContactSection` (só UI) ⬜

Seção inline no fim da home e do `/about`: chamada, e-mail em texto selecionável +
`mailto:`, LinkedIn, GitHub, e o formulário. O envio real vem na F6 — até lá o botão fica
desabilitado com aviso claro, ou o formulário é omitido.

**Proibido** deixar o formulário aparentando funcionar sem enviar. É o defeito P0-2.

**Aceite:** e-mail selecionável como texto · sem dialog/modal · formulário não simula
sucesso falso.

### F3-T07 · Página `/about` ⬜

Conforme `02-arquitetura-informacao.md`. Narrativa expandida, `child.png` com legenda,
"como eu trabalho", skills agrupadas por profundidade em texto, download de currículo
(EN e PT), contato.

Deletar `src/components/skill-logo.tsx` e as catorze `public/logos/*.png` de tecnologia.

**Aceite:** nenhum logo de tecnologia em uso · skills como texto agrupado · ambos os PDFs
baixáveis · um `<h1>` só.

**Referência:** P0-5

### F3-T08 · `not-found.tsx` ⬜

Mensagem curta, link para `/` e para `/work`.

**Aceite:** rota inexistente retorna 404 com header e footer.

### F3-T09 · Limpar `src/components/ui/` ⬜

Executar **por último** nesta fase. Deletar todo componente sem uso e as dependências que
ficarem órfãs (`vaul` se `drawer` sair, `tailwindcss-animate` se não for usado).

**Aceite:** todo arquivo em `ui/` é importado em algum lugar · `pnpm build` passa ·
`package.json` sem dependência órfã.

---

## F4 — Camada de conteúdo

**Objetivo.** Implementar a infraestrutura MDX de `04-especificacao-tecnica.md`.

**Depende de:** F3.

### F4-T01 · Instalar dependências de conteúdo ⬜

`next-mdx-remote`, `gray-matter`, `rehype-pretty-code`, `shiki`, `remark-gfm`,
`rehype-slug`, `rehype-autolink-headings`, `reading-time`.

Criar `content/work/` e `content/writing/` com um `.gitkeep`.

**Aceite:** `pnpm build` passa com os diretórios vazios.

### F4-T02 · `src/lib/schemas.ts` ⬜

Schemas Zod de `04-especificacao-tecnica.md` e tipos inferidos.

**Aceite:** tipos exportados · frontmatter inválido produz erro descritivo com o nome do
arquivo.

### F4-T03 · `src/lib/content.ts` ⬜

Implementar o contrato completo de leitura. Filtro de rascunho por ambiente. Memoização
com `cache()`. Diretório ausente retorna lista vazia sem lançar erro.

**Aceite:** build passa sem nenhum conteúdo · `draft: true` invisível em produção e
visível em desenvolvimento · frontmatter inválido quebra o build.

### F4-T04 · `Prose` e `mdx-components` ⬜

Wrapper de estilo (medida de 68ch) e mapeamento de componentes. Destaque de sintaxe com
tema claro e escuro. Âncoras em títulos.

**Aceite:** MDX de teste renderiza com tipografia correta nos dois temas · bloco de código
com destaque nos dois temas · imagem em MDX usa `next/image` sem deslocamento de layout.

### F4-T05 · Rotas `/work` e `/work/[slug]` ⬜

`generateStaticParams`, 404 para slug inexistente, navegação anterior/próximo, chamada de
contato ao final. Ambas retornam 404 se não houver conteúdo publicado.

**Aceite:** com zero case studies, `/work` retorna 404 e o link some do header · com um
case study, ambas as rotas funcionam e são estáticas no output do build.

### F4-T06 · Rotas `/writing` e `/writing/[slug]` ⬜

Análogo, com data, tempo de leitura e ordenação cronológica reversa.

**Aceite:** mesmas condições · tempo de leitura calculado · ordenação correta.

### F4-T07 · `SelectedWork` na home ⬜

Dois a três itens com `featured: true`, ordenados por `order`. Seção inteira não renderiza
se não houver conteúdo.

**Aceite:** sem conteúdo, a seção não aparece no HTML · link "All work" só aparece se
houver mais itens do que os exibidos.

### F4-T08 · `rss.xml` ⬜

Route Handler gerando o feed dos artigos publicados. `<link rel="alternate">` no `<head>`.
404 se não houver artigo.

**Aceite:** feed validado em `validator.w3.org/feed` · URLs absolutas.

---

## F5 — SEO, performance e acessibilidade

**Objetivo.** Atingir as metas de `06-seo-performance-a11y.md`.

**Depende de:** F3 e F4 (exceto F5-T01).

### F5-T01 · Medir a linha de base ⬜ *executar ANTES da F1*

Lighthouse mobile e desktop no site atual em produção. Registrar na tabela de
`06-seo-performance-a11y.md`.

**Aceite:** linha preenchida com data e valores reais.

### F5-T02 · Metadata por rota ⬜

`metadataBase`, template de título, `description` única por rota, canonical, `noindex` em
rascunho. Substituir `"Welcome to my website!"`.

**Aceite:** toda rota tem título e descrição únicos · descrições entre 120 e 160
caracteres · canonical absoluto e sem barra final.

**Referência:** P1-3

### F5-T03 · Imagens Open Graph ⬜

`opengraph-image.tsx` no site, em `/work/[slug]` e em `/writing/[slug]`.

**Aceite:** as três geram 1200×630 · fonte carregada corretamente no runtime do `next/og` ·
LinkedIn Post Inspector mostra o card completo.

### F5-T04 · JSON-LD ⬜

`Person` na home, `BlogPosting` nos artigos, `CreativeWork` nos case studies.

**Aceite:** sem erro no Rich Results Test · renderizado no servidor.

### F5-T05 · `sitemap.ts` e `robots.ts` ⬜

Gerados a partir do conteúdo real, com `lastModified` vindo do frontmatter.

**Aceite:** sitemap lista exatamente as rotas existentes · nenhuma rota `section-*` ·
robots aponta para o sitemap.

### F5-T06 · Auditoria de acessibilidade ⬜

Percorrer o checklist manual completo de `06-seo-performance-a11y.md`, incluindo o teste
com leitor de tela. Corrigir tudo que aparecer.

**Aceite:** checklist inteiro marcado · Lighthouse Accessibility 100 em todas as rotas ·
skip link presente e funcional.

### F5-T07 · Orçamento de performance ⬜

Medir e ajustar até atingir as metas. Auditar o bundle, confirmar que só o esperado é
client component.

**Aceite:** todas as metas de `06-seo-performance-a11y.md` atingidas · nova linha na tabela
de medições · JS da home < 90 KB comprimido.

---

## F6 — Contato funcional

**Objetivo.** Resolver P0-2 e P0-3 conforme ADR-006.

**Depende de:** F3-T06.

### F6-T01 · Configurar a Resend ⛔ *parcialmente bloqueada — requer o dono*

Criar conta, verificar domínio remetente, gerar chave de API, configurar as variáveis de
ambiente localmente e no ambiente de deploy.

**Aceite:** domínio verificado · variáveis presentes em ambos os ambientes · nenhuma
chave versionada.

### F6-T02 · Server Action `sendContact` ⬜

Implementar conforme o contrato de `04-especificacao-tecnica.md`: revalidação Zod no
servidor, honeypot, rate limit de 3 por hora por IP, `reply_to` com o e-mail do visitante
e `from` do domínio verificado, sem log de conteúdo.

**Aceite:** payload inválido retorna `validation` · honeypot preenchido retorna `ok: true`
sem enviar · quarto envio na mesma hora retorna `rate_limit` · e-mail chega com
`reply_to` correto.

### F6-T03 · Ligar o formulário ⬜

Conectar `contact-form.tsx` à action. Estado de carregamento, sucesso e erro via `sonner`.
Mensagem de erro oferece o `mailto:` como alternativa.

**Aceite:** envio real chega à caixa de entrada · erro exibe alternativa · campos limpos
após sucesso · `aria-live` anuncia o resultado.

### F6-T04 · Verificação ponta a ponta ⬜

Testar em produção, incluindo mobile. Confirmar que a mensagem chega e que responder ao
e-mail vai para o remetente correto.

**Aceite:** teste real bem-sucedido em produção · resposta ao e-mail chega ao visitante.

---

## F7 — Produção de conteúdo

⛔ **Bloqueada — depende integralmente do dono do projeto.**

Nenhum agente pode executar estas tarefas. Ver `05-estrategia-conteudo.md`, seção
"Regras de honestidade" e "Briefing".

| # | Tarefa | Esforço | Desbloqueia | Status |
|---|---|---|---|---|
| F7-T01 | Responder bloco 1 do briefing (posicionamento) | 15 min | F3-T04 (hero) | ⬜ |
| F7-T02 | Responder bloco 2 do briefing (ODEEN) | 90 min | F3-T05 (timeline) | ⬜ |
| F7-T03 | Responder blocos 3 e 4 | 50 min | F3-T07 (`/about`) | ⬜ |
| F7-T04 | Responder bloco 5 | 15 min | F7-T07 | ⬜ |
| F7-T05 | Escrever o primeiro case study | 3–4 h | Rota `/work` | ⬜ |
| F7-T06 | Escolher os dois projetos-vitrine | 1 h | F7-T08 | ⬜ |
| F7-T07 | Escrever o artigo 1 | 4–6 h | Rota `/writing` | ⬜ |
| F7-T08 | Construir o projeto-vitrine 1 | 3–6 semanas | Case study 2 | ⬜ |
| F7-T09 | Escrever o artigo 2 | 4–6 h | — | ⬜ |
| F7-T10 | Construir o projeto-vitrine 2 | 3–6 semanas | Case study 3 | ⬜ |

**F7-T01, T02 e T03 somam menos de 3 horas e resolvem os problemas P0-4 e P0-5** — os que
mais custam oportunidade hoje. São a maior alavanca de todo o projeto e devem ser feitos
primeiro, em paralelo à F1.

## Marcos

| Marco | Condição | Estado |
|---|---|---|
| **M1 — Repositório limpo** | F1 concluída | ⬜ |
| **M2 — Nova identidade visual** | F2 concluída | ⬜ |
| **M3 — Pronto para ir ao ar** | F3 + F5-T02..T06 + F6, com F7-T01..T03 | ⬜ |
| **M4 — Vitrine ativa** | F4 + F7-T05 (`/work` existe com um case study) | ⬜ |
| **M5 — Portfólio completo** | F7 concluída, metas de performance atingidas | ⬜ |

**M3 é o marco que importa.** A partir dele o site já é substancialmente melhor que o
atual e pode ser divulgado — mesmo tendo apenas `/` e `/about`. Não espere o M5 para
publicar.
