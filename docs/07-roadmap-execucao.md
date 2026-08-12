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

### F3-T01 · Eliminar as rotas fantasma ✅

Mover os seis `src/app/section-*/page.tsx` para `src/components/sections/*.tsx` como
componentes nomeados. Deletar os diretórios `src/app/section-*/`. Mover
`section-experience/components/card.tsx` junto.

Remover o padrão `if (!mounted) return null` de Skills e Footer; onde um asset depende do
tema, usar `dark:hidden` / `hidden dark:block`.

**Aceite:** `src/app/` contém apenas arquivos de rota · `/section-about` e similares
retornam 404 · `curl -s localhost:3000 | grep -i "linkedin"` encontra o link do footer no
HTML servido (hoje não encontra).

**Referência:** P1-1 · P1-2

**Nota de execução:** em vez de "mover como está" e só depois reescrever em T02–T07, os
seis `section-*` foram eliminados e substituídos diretamente pelos componentes finais
(`SiteHeader`, `SiteFooter`, `Hero`, `ExperienceTimeline`, `ContactSection`, `/about`),
já que T02–T07 os reescreveriam por completo de qualquer forma. Nenhum conteúdo Skills
sobrevive como seção da home — a parede de logos é eliminada (P0-5) e a seção não existe
mais como bloco da home (a home nova não tem bloco de Skills; ele migrou para `/about`
conforme `02-arquitetura-informacao.md`). O padrão `if (!mounted) return null` não precisou
de tratamento porque as seções que o usavam (Skills, Footer) deixaram de existir nesse
formato.

### F3-T02 · `SiteHeader` ✅

Header fixo, sempre visível, sem esconder ao rolar. Logotipo textual, navegação
condicional (`Work`, `Writing`, `About`), toggle de tema, indicação de rota ativa. Sem
menu hambúrguer se os itens couberem em mobile.

Deletar `src/components/navbar.tsx` e o `ContactMeDialog` da navegação.

**Aceite:** sem `setTimeout` nem listener de `scroll` no header · sem listener de `resize` ·
`navbar.tsx` deletado · funciona em 360px de largura.

**Referência:** P2-4

**Nota de execução:** navegação mostra apenas `About` por enquanto — `/work` e `/writing`
ainda não existem (dependem da infraestrutura de conteúdo da F4) e a regra de renderização
condicional (`02-arquitetura-informacao.md`) proíbe linkar para rota inexistente. `Work` e
`Writing` entram quando F4 criar essas rotas. Header usa `position: sticky` (não `fixed`) —
mesmo efeito de "sempre visível", sem necessidade de compensar altura com padding.
`ContactMeDialog` foi deletado junto com `contact-me/` inteiro (T06 já cobre contato inline).

### F3-T03 · `SiteFooter` ✅

Nome, ano, links sociais com ícones `lucide-react`, navegação secundária, link para o
repositório. Tudo vindo de `site-config.ts`. Presente em todas as rotas via layout.

**Aceite:** nenhum `logos/*.png` social em uso · presente em todas as rotas · Server
Component.

### F3-T04 · `Hero` ✅

Conforme `02-arquitetura-informacao.md`. `<h1>`, linha de posicionamento com senioridade,
stack e disponibilidade, dois parágrafos no máximo, ações primárias, links persistentes.

Sem imagem dividindo a tela ao meio. Sem `min-h-screen`. Sem animação de entrada.

Se o conteúdo do bloco 1 do briefing (`05-estrategia-conteudo.md`) ainda não existir, usar
um marcador explícito `TODO(content)` no código — **nunca** inventar o texto.

**Aceite:** senioridade, stack e disponibilidade visíveis sem rolar em 1280×720 e em
390×844 · Server Component · sem `whileInView`.

**Nota de execução:** bloco 1 do briefing foi respondido pelo dono em 2026-08-08 e o texto
do Hero (linha de posicionamento + dois parágrafos) já reflete as respostas reais. Nenhum
dado foi inventado.

**Reescrito em 2026-08-12** a partir de `E:\code\career-review` (ver nota longa em F3-T05).
A primeira versão era genérica — "aberto a qualquer vaga de desenvolvimento", "aberto a
qualquer faixa salarial" — porque era o que o dono tinha dito. O material da auditoria de
carreira permitiu um posicionamento muito mais forte e igualmente verdadeiro: foco em
frontend declarado, domínio nomeado (inteligência corporativa e antifraude), disponibilidade
com sobreposição ao horário comercial dos EUA, e o inglês C2 conectado aos três anos como
professor. Saíram do Hero: menção a faixa salarial (não pertence a um portfólio público) e
"aberto a qualquer coisa", que lê como falta de direção em vez de flexibilidade. Sem avatar (nem
anime, nem placeholder cinza) — retrato real pendente de F2-T07. Ação primária de CTA para
case study/`\`/work\`` omitida por ora (rota não existe sem conteúdo, mesma regra de
renderização condicional); mantido apenas "Download résumé" e os links persistentes
(GitHub, LinkedIn, e-mail). Bloco "Selected work" da home (item 3 do mapa de blocos) também
não foi implementado — depende da infraestrutura de conteúdo MDX da F4 (`SelectedWork`,
F4-T07); a home hoje pula direto de Hero para Experience, o que é o comportamento correto
enquanto não há case study publicado.

### F3-T05 · `ExperienceTimeline` ✅

Timeline tipográfica, sem card, sem borda, sem imagem por cargo. Cada entrada segue o
template de `05-estrategia-conteudo.md`.

Deletar `card.tsx` e as cinco imagens `public/hamasaki/exp-*.png`.

**Aceite:** sem `motion` · sem `scale: 0` · sem largura arbitrária tipo `md:w-185` ·
imagens deletadas · legível em 360px.

**Referência:** P0-4 · P2-3 · P2-5

**Nota de execução:** bloco 2 do briefing foi respondido pelo dono em 2026-08-08 e as três
entradas da ODEEN já têm conteúdo real. `card.tsx` e as cinco imagens `exp-*.png` foram
deletados.

Duas ressalvas registradas explicitamente:

1. **Sem métricas.** O dono não tem números e pediu para "usar da lábia". Não foi feito —
   nenhum número foi inventado (regra de honestidade #1). Onde não há métrica, o texto
   descreve o **efeito qualitativo e o escopo**, que é a saída prevista pela própria spec:
   "rotas expostas sem middleware → passaram a ter camada de autenticação/autorização",
   "service layer plano e misturado → arquitetura por feature". Isso sustenta entrevista
   técnica; número inventado não.
2. **Granularidade por cargo.** O dono forneceu um resumo consolidado da ODEEN, não uma
   resposta separada por cargo, e não soube apontar entregas específicas do período júnior.
   O material real foi distribuído pela natureza do trabalho (middleware e refatoração de
   arquitetura de back-end → cargo full stack atual; câmeras em tempo real sobre mapa →
   cargo front-end pleno; telas/tabelas/mapas → júnior), e a entrada júnior ficou
   deliberadamente mais curta em vez de inflada. **Vale revisitar** com o dono para separar
   melhor o que pertence a cada período — a pergunta 7 do bloco 2 ("o que mudou entre um
   cargo e o outro?"), que é o que justifica as promoções, segue sem resposta detalhada.

**Reescrita em 2026-08-12 a partir de `E:\code\career-review`.** O dono forneceu uma pasta
com auditoria de carreira completa (`career-audit/respostas.md` = respostas a 30 blocos de
perguntas; `resume-v2/` = currículo e perfil de LinkedIn já reescritos e auditados por
honestidade). A timeline foi refeita inteiramente a partir desse material, que é muito mais
rico e específico que o resumo verbal anterior. Três correções de honestidade aplicadas:

1. **Cargo desinflado.** O site dizia "Mid-Level Full Stack Developer" / "Mid-Level
   Front-End Developer". Q-26 revela que a progressão real foi *front júnior → front pleno →
   full stack **júnior*** — ou seja, "Mid-Level Full Stack" era acima do título real. Seguindo
   a decisão já tomada em `resume-v2`, o nível foi **omitido** ("Full Stack Developer"),
   que é defensável em verificação e alinha com o LinkedIn.
2. **Autokiniton dividida em dois cargos.** Era uma entrada única "Human Resources Analyst
   2015–2021"; na verdade foram estágio (abr/2015–mar/2017) e analista de administração de
   pessoal (mar/2017–mar/2021). O audit confirma que o LinkedIn estava certo e o currículo
   antigo é que estava errado. Nome da empresa também corrigido para Autokiniton.
3. **Sem métricas inventadas, de novo.** Q-01 diz que o produto de câmeras trouxe "algumas
   centenas de milhares de reais" mas que o dono não sabe quantificar, e Q-02 sugere "pode
   colocar aí umas 500" para número de integrações. Nenhum dos dois virou número no site.
   O que entrou foi o que é verificável: ~100 analistas, operação 24/7, e os nomes dos
   clientes (Vivo, TIM, Claro) — que calibram porte melhor que qualquer número estimado.
   Os nomes das operadoras foram mantidos genéricos ("Brazil's largest mobile operators")
   por prudência de confidencialidade.

Pendência conhecida: `resume-v2` marca a migração Java → TypeScript como `[VERIFICAR]`, e
a data de início na Skill Idiomas tem divergência (2012 no currículo, 2013 numa das entradas
do LinkedIn). O site usa 2012. Confirmar antes de divulgar.

### F3-T06 · `ContactSection` (só UI) ✅

Seção inline no fim da home e do `/about`: chamada, e-mail em texto selecionável +
`mailto:`, LinkedIn, GitHub, e o formulário. O envio real vem na F6 — até lá o botão fica
desabilitado com aviso claro, ou o formulário é omitido.

**Proibido** deixar o formulário aparentando funcionar sem enviar. É o defeito P0-2.

**Aceite:** e-mail selecionável como texto · sem dialog/modal · formulário não simula
sucesso falso.

**Nota de execução:** escolhida a opção "botão desabilitado com aviso claro" em vez de
omitir o formulário — os campos (nome, e-mail, mensagem) usam `ui/input`, `ui/textarea` e
`ui/label` reais, todos com `disabled`, sem nenhum `onSubmit` ou lógica de envio, e um
texto abaixo do botão explica que o formulário ainda não está ligado e sugere o e-mail
direto. Isso mantém `input.tsx`/`textarea.tsx`/`label.tsx` em uso real (evitando conflito
com a F3-T09, que exige todo arquivo de `ui/` importado em algum lugar) e deixa o trabalho
da F6 (F6-T02/T03) mais direto — só remover `disabled` e ligar à Server Action.

### F3-T07 · Página `/about` ✅

Conforme `02-arquitetura-informacao.md`. Narrativa expandida, `child.png` com legenda,
"como eu trabalho", skills agrupadas por profundidade em texto, download de currículo
(EN e PT), contato.

Deletar `src/components/skill-logo.tsx` e as catorze `public/logos/*.png` de tecnologia.

**Aceite:** nenhum logo de tecnologia em uso · skills como texto agrupado · ambos os PDFs
baixáveis · um `<h1>` só.

**Referência:** P0-5

**Nota de execução:** a narrativa dos quatro parágrafos existentes foi migrada verbatim
(é conteúdo real já publicado, não invenção) — "desenvolvê-la" depende do bloco 4 do
briefing, marcado `TODO(content)`. "Como eu trabalho" é inteiramente novo (bloco 4) e
também está `TODO(content)`. Skills deixou de ser parede de logos e virou lista textual
(`skill-logo.tsx` e os 18 arquivos de `public/logos/` — 14 de tecnologia + 4 sociais —
deletados), mas o **agrupamento por profundidade** (working daily / comfortable /
familiar) exige autoavaliação honesta que só o dono pode fazer (regra de honestidade #2 em
`05-estrategia-conteudo.md`) — por isso a lista está sem agrupamento, com `TODO(content)`
pedindo essa categorização. Currículo EN/PT mantido via `DownloadResumeButton` existente,
sem alteração de comportamento. Um único `<h1>` na página.

**Concluída em 2026-08-12** a partir de `E:\code\career-review` (ver nota longa em F3-T05).
Os três `TODO(content)` foram resolvidos com material real:

- **Narrativa** reescrita e expandida. Mantém os fatos do texto antigo (nascimento, o pai
  designer, a virada durante a pandemia) e acrescenta o que a auditoria trouxe: os três anos
  como professor de inglês, os seis anos na Autokiniton divididos entre estágio e analista,
  e o detalhe que mais rende — o que ele mais gostava no trabalho de RH era construir os
  relatórios e cruzar dados em Excel, que é literalmente o mesmo trabalho que faz hoje com
  outra ferramenta. Isso responde "por que RH importa" de forma concreta, em vez do genérico
  "aprimorou minhas habilidades interpessoais" do texto antigo.
- **"How I work"** escrito a partir de Q-04, Q-09 e Q-23: a briga pelas convenções (Biome,
  pnpm, branching por release) e o fato de terem sido mantidas apesar da resistência; a
  postura em decisões técnicas; o uso pesado de IA, declarado abertamente; e o inglês diário.
- **Skills agrupadas por profundidade**, usando exatamente a estratificação já auditada em
  `resume-v2`: *Working daily* / *Comfortable* / *Work alongside*. A terceira categoria é a
  mais importante em termos de honestidade — GCP, CI/CD, JWT/OAuth, RBAC e LGPD aparecem
  (são keywords reais e o contexto é verdadeiro) mas com uma frase explícita dizendo que ele
  trabalha dentro disso sem ter construído, porque infra e auth pertencem a outras pessoas
  do time. Isso vem direto da recomendação de `resume-v2`.

**Skills removidas por falta de evidência**, seguindo a auditoria: `NestJS` (usa Express),
`Prisma` (SQL direto, sem ORM), `PostgreSQL` (só MySQL no trabalho) e `Python` (Q-11: apenas
estudo inicial). Todas as quatro estavam no site e nenhuma se sustenta em entrevista.

### F3-T08 · `not-found.tsx` ✅

Mensagem curta, link para `/` e para `/work`.

**Aceite:** rota inexistente retorna 404 com header e footer.

**Nota de execução:** o link é para `/` e `/about` — `/work` ainda não existe (F4). Trocar
por `/work` quando a rota existir.

### F3-T09 · Limpar `src/components/ui/` ✅

Executar **por último** nesta fase. Deletar todo componente sem uso e as dependências que
ficarem órfãs (`vaul` se `drawer` sair, `tailwindcss-animate` se não for usado).

**Aceite:** todo arquivo em `ui/` é importado em algum lugar · `pnpm build` passa ·
`package.json` sem dependência órfã.

**Nota de execução:** deletados `card.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `tooltip.tsx`,
`sheet.tsx` e `form.tsx` (zero uso confirmado por grep). Dependências órfãs removidas:
`vaul`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-tooltip`. `tailwindcss-animate`
mantido — `dialog.tsx` ainda usa as classes `animate-in`/`fade-in-0`/`zoom-in-95` do plugin.
`input.tsx`, `textarea.tsx`, `label.tsx`, `dialog.tsx` e `sonner.tsx` mantidos por terem uso
real (via T06 e `download-resume-button.tsx`), conforme a tabela de componentes de
`03-design-system.md` já antecipava para a F6. Variantes de botão `outline` e `link` — que
ainda tinham uso no início da F3 (navbar, dialog de contato antigos) — ficaram sem nenhum
consumidor ao final da fase e foram removidas de `button.tsx`, restando `default`,
`secondary` e `ghost`.

---

## F4 — Camada de conteúdo

**Objetivo.** Implementar a infraestrutura MDX de `04-especificacao-tecnica.md`.

**Depende de:** F3.

### F4-T01 · Instalar dependências de conteúdo ✅

`next-mdx-remote`, `gray-matter`, `rehype-pretty-code`, `shiki`, `remark-gfm`,
`rehype-slug`, `rehype-autolink-headings`, `reading-time`.

Criar `content/work/` e `content/writing/` com um `.gitkeep`.

**Aceite:** `pnpm build` passa com os diretórios vazios.

**Nota de execução:** `unified` também foi adicionado como devDependency — só para expor
os tipos de `PluggableList` usados em `mdx-components.tsx`; já existia como transitiva.

### F4-T02 · `src/lib/schemas.ts` ✅

Schemas Zod de `04-especificacao-tecnica.md` e tipos inferidos.

**Aceite:** tipos exportados · frontmatter inválido produz erro descritivo com o nome do
arquivo.

### F4-T03 · `src/lib/content.ts` ✅

Implementar o contrato completo de leitura. Filtro de rascunho por ambiente. Memoização
com `cache()`. Diretório ausente retorna lista vazia sem lançar erro.

**Aceite:** build passa sem nenhum conteúdo · `draft: true` invisível em produção e
visível em desenvolvimento · frontmatter inválido quebra o build.

### F4-T04 · `Prose` e `mdx-components` ✅

Wrapper de estilo (medida de 68ch) e mapeamento de componentes. Destaque de sintaxe com
tema claro e escuro. Âncoras em títulos.

**Aceite:** MDX de teste renderiza com tipografia correta nos dois temas · bloco de código
com destaque nos dois temas · imagem em MDX usa `next/image` sem deslocamento de layout.

**Nota de execução:** verificado com um arquivo MDX temporário em `content/work/`
(nunca commitado, removido logo depois do teste) — títulos, parágrafos, links, lista e
bloco de código renderizaram corretamente, com `--shiki-light`/`--shiki-dark` presentes e
alternando conforme o tema. `img` usa `next/image` com `fill` dentro de um contêiner
`aspect-video` (não há como obter as dimensões reais de uma imagem só a partir do markdown
sem uma lib adicional de leitura de metadados — ainda não instalada; revisitar quando
houver imagem real em conteúdo).

**Limitação encontrada e documentada (não é bug meu):** `next-mdx-remote@6.0.0` quebra com
500 ao renderizar MDX em `pnpm dev` — tanto com `--turbopack` quanto sem —, com o erro
"Attempted to render ... without development properties". Causa: `next-mdx-remote/dist/serialize.js`
força `development: process.env.NODE_ENV !== 'production'` por cima de qualquer opção
passada (não dá para desativar via `mdxOptions`), e o runtime `jsx-dev-runtime` que a lib
carrega via `require()` (CJS) não é a mesma instância que o React/Next usam internamente —
um caso de "dual package hazard" agravado pela validação mais estrita de elementos no
React 19. **Build de produção (`pnpm build` + `pnpm start`) renderiza tudo corretamente**,
inclusive destaque de sintaxe nos dois temas — é isso que importa para o site publicado.
Falta hoje: preview local de MDX em `pnpm dev`. Não há correção limpa sem trocar de
biblioteca (ex.: `@mdx-js/mdx` direto) ou esperar um patch upstream — fora do escopo desta
tarefa. Sinalizado como dívida técnica para quando o dono for escrever o primeiro case
study de verdade.

### F4-T05 · Rotas `/work` e `/work/[slug]` ✅

`generateStaticParams`, 404 para slug inexistente, navegação anterior/próximo, chamada de
contato ao final. Ambas retornam 404 se não houver conteúdo publicado.

**Aceite:** com zero case studies, `/work` retorna 404 e o link some do header · com um
case study, ambas as rotas funcionam e são estáticas no output do build.

### F4-T06 · Rotas `/writing` e `/writing/[slug]` ✅

Análogo, com data, tempo de leitura e ordenação cronológica reversa.

**Aceite:** mesmas condições · tempo de leitura calculado · ordenação correta.

### F4-T07 · `SelectedWork` na home ✅

Dois a três itens com `featured: true`, ordenados por `order`. Seção inteira não renderiza
se não houver conteúdo.

**Aceite:** sem conteúdo, a seção não aparece no HTML · link "All work" só aparece se
houver mais itens do que os exibidos.

### F4-T08 · `rss.xml` ✅

Route Handler gerando o feed dos artigos publicados. `<link rel="alternate">` no `<head>`.
404 se não houver artigo.

**Aceite:** feed validado em `validator.w3.org/feed` · URLs absolutas.

**Nota de execução:** não validado em `validator.w3.org/feed` porque o feed só existe com
pelo menos um artigo publicado — hoje retorna 404 (testado). Revalidar quando `content/writing/`
tiver o primeiro artigo. URLs absolutas via `siteConfig.url` (que hoje aponta para
`localhost:3000` até `NEXT_PUBLIC_SITE_URL` ser configurada em produção — F6-T01/F5).

---

## F5 — SEO, performance e acessibilidade

**Objetivo.** Atingir as metas de `06-seo-performance-a11y.md`.

**Depende de:** F3 e F4 (exceto F5-T01).

### F5-T01 · Medir a linha de base ⛔ *pulada — decisão do dono em 2026-08-08*

Lighthouse mobile e desktop no site atual em produção. Registrar na tabela de
`06-seo-performance-a11y.md`.

**Aceite:** linha preenchida com data e valores reais.

**Nota:** o dono decidiu pular a medição de linha de base e seguir direto para a F1,
mesmo sabendo que o ideal era medir antes. Não há comparação "antes vs. depois"
disponível — a tabela de medições em `06-seo-performance-a11y.md` continua vazia.

### F5-T02 · Metadata por rota ✅

`metadataBase`, template de título, `description` única por rota, canonical, `noindex` em
rascunho. Substituir `"Welcome to my website!"`.

**Aceite:** toda rota tem título e descrição únicos · descrições entre 120 e 160
caracteres · canonical absoluto e sem barra final.

**Referência:** P1-3

**Nota de execução:** `siteConfig.description` deixou de ser o placeholder e passou a
usar o mesmo texto real do Hero (posicionamento do bloco 1 do briefing). Descrições únicas
por rota, todas entre 120–160 caracteres. `robots: { index: false, follow: false }` em
`/work/[slug]` e `/writing/[slug]` quando `frontmatter.draft` for `true`.

### F5-T03 · Imagens Open Graph ✅

`opengraph-image.tsx` no site, em `/work/[slug]` e em `/writing/[slug]`.

**Aceite:** as três geram 1200×630 · fonte carregada corretamente no runtime do `next/og` ·
LinkedIn Post Inspector mostra o card completo.

**Nota de execução:** o padrão documentado do Next (`fetch(new URL('./font.ttf', import.meta.url))`)
só funciona de forma confiável no runtime Edge — no runtime Node.js (o padrão destas rotas)
ele quebra o build com "Failed to parse URL" ao tentar buscar um asset já processado pelo
bundler. Troquei por leitura direta do arquivo via `fs.readFile` (`src/lib/og-fonts.ts`,
compartilhado pelas três rotas), lendo `public/fonts/Inter-Bold.ttf` e
`public/fonts/Newsreader-Medium.ttf` — baixados da Google Fonts (Inter e Newsreader, ambas
OFL, redistribuição livre) especificamente para este uso; não são as mesmas instâncias
carregadas por `next/font` no site (que o runtime do `next/og` não consegue usar).
Verificado com `pnpm build && pnpm start`: as três imagens geram no tamanho certo, com as
fontes corretas — não testado no LinkedIn Post Inspector real, que exige o site publicado
com `NEXT_PUBLIC_SITE_URL` configurada (F6-T01/deploy).

### F5-T04 · JSON-LD ✅

`Person` na home, `BlogPosting` nos artigos, `CreativeWork` nos case studies.

**Aceite:** sem erro no Rich Results Test · renderizado no servidor.

**Nota de execução:** os três tipos renderizam via `<script type="application/ld+json">`
no servidor (Server Components, sem JS no cliente). Não testado no Rich Results Test real
— também depende do site publicado.

### F5-T05 · `sitemap.ts` e `robots.ts` ✅

Gerados a partir do conteúdo real, com `lastModified` vindo do frontmatter.

**Aceite:** sitemap lista exatamente as rotas existentes · nenhuma rota `section-*` ·
robots aponta para o sitemap.

**Nota de execução:** verificado — hoje o sitemap lista só `/` e `/about` (sem conteúdo
publicado). `/work`, `/writing` e seus slugs entram automaticamente quando existirem,
com `lastModified` calculado a partir de `frontmatter.year` (case study) ou
`updatedAt`/`publishedAt` (artigo), nunca da data do build.

### F5-T06 · Auditoria de acessibilidade 🟡

Percorrer o checklist manual completo de `06-seo-performance-a11y.md`, incluindo o teste
com leitor de tela. Corrigir tudo que aparecer.

**Aceite:** checklist inteiro marcado · Lighthouse Accessibility 100 em todas as rotas ·
skip link presente e funcional.

**Nota de execução:** verificado manualmente (sem Lighthouse real, ambiente sem Chrome
completo disponível para rodar o CLI): skip link adicionado como primeiro elemento focável
(faltava — corrigido agora); hierarquia de títulos sem pular nível em `/` e `/about`;
landmarks (`header`, `nav`, `main`, `footer`) presentes; `lang="en"` no `<html>`; foco
visível global (F2); sem rolagem horizontal em 320px em `/` e `/about`; alvo de toque do
botão `icon` estava em 36px (abaixo do mínimo de 44px) — corrigido para `size-11` em
`button.tsx`. **Não verificado:** teste real com leitor de tela (NVDA/VoiceOver) e
Lighthouse Accessibility numérico — exigem execução manual fora deste ambiente. Formulário
de contato ainda não tem `aria-live` porque está desabilitado (F6 liga isso).

### F5-T07 · Orçamento de performance 🟡

Medir e ajustar até atingir as metas. Auditar o bundle, confirmar que só o esperado é
client component.

**Aceite:** todas as metas de `06-seo-performance-a11y.md` atingidas · nova linha na tabela
de medições · JS da home < 90 KB comprimido.

**Nota de execução:** sem Lighthouse real disponível neste ambiente (sem Chrome completo
para o CLI), então as metas de LCP/CLS/INP/TTFB/notas do Lighthouse **não foram medidas**
— a tabela de `06-seo-performance-a11y.md` continua vazia; precisa ser preenchida com
Lighthouse real antes do lançamento. O que dá para confirmar pelo output do `pnpm build`:
First Load JS da home = **114 kB**, acima da meta de 90 KB. A maior parte (102 kB) é
overhead de framework compartilhado entre todas as rotas (React 19 + runtime do Next App
Router) — não há muito código de aplicação para cortar (a home em si soma 911 B). Reduzir
esse número exigiria uma intervenção mais profunda (ex.: menos client components no root
layout — `ThemeProvider`, `ThemeToggle` e `Toaster` são os únicos hoje) e está fora do que
dá para resolver com ajuste pontual; fica registrado como gap conhecido para revisitar
antes do lançamento, não escondido. Client components confirmados como só os esperados:
toggle de tema e (quando ligado, F6) formulário de contato — nenhum outro.

---

## F6 — Contato funcional

**Objetivo.** Resolver P0-2 e P0-3 conforme ADR-006.

**Depende de:** F3-T06.

### F6-T01 · Configurar a Resend 🟡 *modo de teste — domínio próprio ainda pendente*

Criar conta, verificar domínio remetente, gerar chave de API, configurar as variáveis de
ambiente localmente e no ambiente de deploy.

**Aceite:** domínio verificado · variáveis presentes em ambos os ambientes · nenhuma
chave versionada.

**Nota de execução:** conta criada e API key gerada em 2026-08-08. O dono não tem domínio
próprio ainda, então `CONTACT_FROM_EMAIL` usa `onboarding@resend.dev` (remetente de teste
do Resend, sem verificação de domínio) — funciona, mas só entrega para o e-mail cadastrado
na conta Resend (`felipehama@gmail.com`), não para qualquer visitante do site. Variáveis
configuradas em `.env.local` (não versionado, confirmado com `git check-ignore`). **Não
configuradas no ambiente de deploy** — não existe deploy ainda. Quando o dono tiver um
domínio, revisitar: verificar domínio no Resend, trocar `CONTACT_FROM_EMAIL` para um
endereço desse domínio, e só aí o formulário passa a atender visitantes reais.

### F6-T02 · Server Action `sendContact` ✅

Implementar conforme o contrato de `04-especificacao-tecnica.md`: revalidação Zod no
servidor, honeypot, rate limit de 3 por hora por IP, `reply_to` com o e-mail do visitante
e `from` do domínio verificado, sem log de conteúdo.

**Aceite:** payload inválido retorna `validation` · honeypot preenchido retorna `ok: true`
sem enviar · quarto envio na mesma hora retorna `rate_limit` · e-mail chega com
`reply_to` correto.

**Nota de execução:** rate limit em memória (`Map` por IP), conforme a spec permite
enquanto o volume for baixo — se o deploy for serverless com instâncias efêmeras, revisitar
com Upstash Redis (a própria spec já antecipa isso). Schema Zod do formulário
(`contactFormSchema`) vive em `src/lib/schemas.ts`, compartilhado entre cliente e servidor
— a mesma validação dos dois lados, como o contrato exige.

### F6-T03 · Ligar o formulário ✅

Conectar `contact-form.tsx` à action. Estado de carregamento, sucesso e erro via `sonner`.
Mensagem de erro oferece o `mailto:` como alternativa.

**Aceite:** envio real chega à caixa de entrada · erro exibe alternativa · campos limpos
após sucesso · `aria-live` anuncia o resultado.

**Nota de execução:** testado com envio real pelo dono — mensagem chegou. Um problema de
usabilidade apareceu no teste: o e-mail do visitante só ia no cabeçalho `reply_to`, invisível
no corpo da mensagem em clientes como o Gmail (só afeta para onde vai a resposta). Corrigido
incluindo `From: {nome} <{email}>` como primeira linha do corpo do e-mail — testado de novo,
confirmado funcionando.

### F6-T04 · Verificação ponta a ponta 🟡 *só em desenvolvimento — produção pendente*

Testar em produção, incluindo mobile. Confirmar que a mensagem chega e que responder ao
e-mail vai para o remetente correto.

**Aceite:** teste real bem-sucedido em produção · resposta ao e-mail chega ao visitante.

**Nota de execução:** testado com sucesso em `pnpm dev` (dono enviou de verdade, e-mail
chegou com o remetente visível). **Não testado em produção** — não há deploy ainda. Também
não testado em mobile. Revisitar quando o site for publicado.

---

## F7 — Produção de conteúdo

⛔ **Bloqueada — depende integralmente do dono do projeto.**

Nenhum agente pode executar estas tarefas. Ver `05-estrategia-conteudo.md`, seção
"Regras de honestidade" e "Briefing".

| # | Tarefa | Esforço | Desbloqueia | Status |
|---|---|---|---|---|
| F7-T01 | Responder bloco 1 do briefing (posicionamento) | 15 min | F3-T04 (hero) | ✅ |
| F7-T02 | Responder bloco 2 do briefing (ODEEN) | 90 min | F3-T05 (timeline) | 🟡 |
| F7-T03 | Responder blocos 3 e 4 | 50 min | F3-T07 (`/about`) | ✅ |
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
| **M1 — Repositório limpo** | F1 concluída | ✅ |
| **M2 — Nova identidade visual** | F2 concluída | ✅ |
| **M3 — Pronto para ir ao ar** | F3 + F5-T02..T06 + F6, com F7-T01..T03 | ⬜ |
| **M4 — Vitrine ativa** | F4 + F7-T05 (`/work` existe com um case study) | ⬜ |
| **M5 — Portfólio completo** | F7 concluída, metas de performance atingidas | ⬜ |

**M3 é o marco que importa.** A partir dele o site já é substancialmente melhor que o
atual e pode ser divulgado — mesmo tendo apenas `/` e `/about`. Não espere o M5 para
publicar.
