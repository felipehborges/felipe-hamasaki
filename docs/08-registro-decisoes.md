# 08 — Registro de Decisões (ADRs)

Cada decisão arquitetural relevante, com contexto, alternativas consideradas e
consequências. Se você quer reverter alguma delas, escreva um novo ADR que a supersede —
não edite o original.

Formato: contexto → decisão → alternativas → consequências.

---

## ADR-001 · Single-page com âncoras → multi-página

**Status:** Aceito · 2026-08-08

**Contexto.** O site atual é uma única página que compõe seis seções, navegadas por
âncoras (`#about`, `#skills`…). O objetivo do projeto exige case studies com profundidade
e artigos técnicos — conteúdo longo que precisa ser compartilhado individualmente.

**Decisão.** Migrar para multi-página. Rotas reais para `/work/[slug]`, `/writing/[slug]`
e `/about`. A home passa a ser uma vitrine curada que aponta para elas.

**Alternativas consideradas.**

- *Manter single-page.* Rejeitado: uma URL única não pode ser compartilhada apontando
  para um projeto específico, e todo o conteúdo compete pelo mesmo título e descrição
  de SEO.
- *Single-page + modais para os projetos.* Rejeitado: conteúdo em modal não é indexável
  nem linkável, e case study longo em modal é hostil para leitura.

**Consequências.**

- Cada case study tem URL própria, colável em candidatura, LinkedIn e cover letter.
- Metadata e imagem de compartilhamento por página.
- Mais superfície para manter. Aceitável no volume previsto.
- As seis pastas `src/app/section-*/` deixam de existir — vira `src/components/sections/`.

---

## ADR-002 · Site em inglês apenas; i18n fora de escopo

**Status:** Aceito · 2026-08-08

**Contexto.** O site já está escrito em inglês. Existe um `button-change-lang.tsx` nunca
importado e resquícios de `[locale]` no `tsconfig.json`, indicando uma tentativa
abandonada de internacionalização. Existem currículos em PT e EN.

**Decisão.** O site é 100% em inglês. Nenhuma infraestrutura de i18n será implementada.
`button-change-lang.tsx` é deletado. Os resquícios de `[locale]` no `tsconfig.json` são
removidos.

**Alternativas consideradas.**

- *Implementar i18n PT/EN completo.* Rejeitado: o público-alvo definido (D1) é
  internacional. Suportar português dobraria o custo de manutenção de todo texto,
  incluindo case studies e artigos, para atender um público secundário.
- *Detectar idioma pelo navegador.* Rejeitado pelo mesmo motivo, com complexidade extra.

**Consequências.**

- Menos código, menos superfície de tradução, mensagem mais clara para o público-alvo.
- Perde-se apelo para recrutador brasileiro que não lê inglês. Aceito conscientemente —
  e um recrutador de vaga que exige inglês vai ler inglês.
- O PDF de currículo em português **permanece disponível** para download. Custo zero,
  utilidade real.
- Se o objetivo mudar no futuro, o esforço de adicionar i18n é maior — mas conteúdo
  em MDX facilita, bastando `content/pt/`.

---

## ADR-003 · Conteúdo em MDX versionado, sem CMS

**Status:** Aceito · 2026-08-08

**Contexto.** Case studies e artigos precisam de conteúdo rico: código com destaque de
sintaxe, imagens, diagramas, listas. O autor é desenvolvedor e trabalha em editor de
código diariamente.

**Decisão.** Conteúdo em arquivos `.mdx` versionados no Git, em `content/work/` e
`content/writing/`. Frontmatter validado com Zod. Leitura via `gray-matter` +
`next-mdx-remote/rsc`. Sem CMS, sem banco de dados, sem build tooling adicional.

**Alternativas consideradas.**

- *CMS headless (Sanity, Contentful, Payload).* Rejeitado: introduz serviço externo,
  chave de API, custo potencial e um ponto de falha, para um autor que já vive no editor.
- *Content Collections / Velite / Contentlayer.* Considerado seriamente — dão tipagem
  automática e cache de build. Rejeitado por ora: adiciona etapa de build e uma
  dependência a mais para um volume de conteúdo pequeno (menos de 10 arquivos previstos).
  `gray-matter` + Zod entrega tipagem suficiente com dependência mínima.
  **Reavaliar** se o volume passar de ~25 arquivos.
- *Markdown puro sem MDX.* Rejeitado: perde componentes embutidos, úteis para blocos de
  callout e comparação de código em case studies.

**Consequências.**

- Escrever conteúdo é `git commit`. Preview local pelo `next dev`.
- Nenhum custo de infraestrutura.
- Sem preview visual antes do commit. Aceitável para um autor desenvolvedor.
- Necessário escrever a camada de leitura e validação à mão (~100 linhas).
  Especificada em `04-especificacao-tecnica.md`.

---

## ADR-004 · Refatorar a base existente, não reescrever

**Status:** Aceito · 2026-08-08

**Contexto.** O site tem problemas sérios de conteúdo, arquitetura de informação e
consistência visual — mas a stack subjacente é moderna e adequada.

**Decisão.** Refatorar incrementalmente sobre o repositório atual. Preservar Next.js 15,
React 19, Tailwind 4, TypeScript strict, shadcn/ui, Radix, Biome e pnpm.

**Alternativas consideradas.**

- *Reescrever do zero com a mesma stack.* Rejeitado: o resultado final seria quase
  idêntico ao da refatoração, com mais tempo gasto e perda do histórico de commits.
- *Migrar para Astro.* Considerado — para um site majoritariamente estático, Astro entrega
  menos JavaScript por padrão e o próprio ato de migrar seria uma demonstração de decisão
  técnica. Rejeitado: o alvo de vaga é full stack **TypeScript/React/Next**, e o portfólio
  deve estar construído na stack que o candidato quer ser contratado para usar. Next.js
  com Server Components atinge as metas de performance de `06-seo-performance-a11y.md`
  sem trocar de framework.

**Consequências.**

- Histórico de commits preservado, mostrando evolução.
- Risco menor: o site continua funcionando durante todas as fases.
- Herda-se algum débito estrutural. Mitigado pelas tarefas de saneamento da fase F1.

---

## ADR-005 · Minimalismo editorial como direção visual

**Status:** Aceito · 2026-08-08

**Contexto.** O visual atual mistura duas linguagens incompatíveis: neobrutalismo (bordas
pretas de 2px, sombras sólidas `4px_4px_0px_#000`) e cards shadcn genéricos. A paleta
amarela reprova em contraste WCAG AA. Quatro direções foram avaliadas com o dono:
minimalismo editorial, neobrutalismo assumido, técnico/terminal e criativo/ilustrado.

**Decisão.** Minimalismo editorial. Tipografia como elemento estrutural principal, muito
espaço em branco, paleta neutra com um único acento, dark mode como padrão, animação
sutil e funcional.

**Alternativas consideradas.**

- *Neobrutalismo assumido.* Levar até o fim o que já existe. Rejeitado: é memorável, mas
  arriscado com recrutador corporativo internacional, e compete com o conteúdo pela
  atenção — problema quando o conteúdo é justamente o que precisa ser lido.
- *Técnico/terminal.* Fala bem com dev, mal com recrutador — que é o primeiro filtro
  na ordem de prioridade do público (ver `00-contexto-e-decisoes.md`).
- *Criativo/ilustrado.* Exige produção visual autoral significativa. Com acervo de
  projetos pequeno (D2), o esforço deve ir para conteúdo, não para ilustração.

**Consequências.**

- O neobrutalismo é removido por completo: bordas pretas, sombras duras, amarelo saturado.
- Envelhece bem e não precisa ser refeito a cada mudança de tendência.
- O conteúdo passa a carregar o peso — o que expõe conteúdo fraco. Isso é intencional:
  força a trilha B.
- Tokens concretos em `03-design-system.md`.

---

## ADR-006 · Contato via Server Action + Resend

**Status:** Aceito · 2026-08-08

**Contexto.** O formulário atual só faz `console.log` (P0-2). Existe um handler nodemailer
morto no formato errado (P0-3). Mensagens estão sendo perdidas.

**Decisão.** Server Action do Next.js chamando a API da Resend. Validação com o mesmo
schema Zod no cliente e no servidor. Honeypot e rate limit por IP. `nodemailer` é removido.

**Alternativas consideradas.**

- *Corrigir o nodemailer e usar SMTP do Gmail.* Rejeitado: exige senha de aplicativo em
  variável de ambiente, entregabilidade ruim, e o Gmail limita envio programático.
- *Route Handler (`app/api/contact/route.ts`) em vez de Server Action.* Funcionaria.
  Server Action foi preferida por eliminar o fetch manual, o estado de loading manual
  e o endpoint público — menos código e menos superfície.
- *Serviço de formulário externo (Formspree, Tally).* Rejeitado: dependência externa
  visível no HTML de um portfólio de desenvolvedor é um sinal negativo sutil.
- *Remover o formulário e deixar só `mailto:`.* Considerado — é a opção de menor
  superfície e muitos portfólios excelentes fazem exatamente isso. Rejeitado porque o
  formulário já existe e concluí-lo custa pouco. **O `mailto:` e o LinkedIn permanecem
  visíveis de qualquer forma**, porque recrutador frequentemente prefere o próprio canal.

**Consequências.**

- Requer conta Resend e domínio verificado para o remetente. Plano gratuito comporta
  o volume esperado com folga.
- Variáveis de ambiente novas. Documentadas em `04-especificacao-tecnica.md`.
- Se a Resend falhar, o `mailto:` visível continua sendo caminho de contato.

---

## ADR-007 · Manter shadcn/ui e Radix

**Status:** Aceito · 2026-08-08

**Contexto.** Existem 13 componentes shadcn em `src/components/ui/`. A mudança de direção
visual (ADR-005) poderia justificar recomeçar a camada de UI.

**Decisão.** Manter. Reestilizar os componentes usados via tokens; deletar os não usados
após a refatoração das páginas.

**Alternativas consideradas.**

- *Escrever todos os componentes do zero.* Rejeitado: reimplementar acessibilidade de
  dialog, drawer e tooltip é trabalho considerável e propenso a erro — foco de teclado,
  ARIA, scroll lock, portal.
- *Trocar por outra biblioteca.* Rejeitado sem motivo que justifique.

**Consequências.**

- shadcn é código local, não dependência: reestilizar é editar arquivo, sem brigar com
  a biblioteca.
- Componentes não usados ao final da F3 devem ser deletados (princípio "menos superfície").
  Candidatos prováveis: `card.tsx`, `dropdown-menu.tsx`, `sheet.tsx`, `drawer.tsx`.

---

## ADR-008 · Sem 3D, WebGL ou three.js

**Status:** Aceito · 2026-08-08

**Contexto.** `three` e `@types/three` estão no `package.json`. `src/components/three-scene.tsx`
existe e nunca é importado.

**Decisão.** Remover ambas as dependências e o componente. Não reintroduzir.

**Alternativas consideradas.**

- *Implementar uma cena 3D no hero.* Rejeitado por três motivos: adiciona centenas de
  kilobytes ao caminho crítico, conflitando com as metas de performance
  (`06-seo-performance-a11y.md`); contradiz o minimalismo editorial (ADR-005); e não
  demonstra competência relevante para vaga full stack TypeScript.

**Consequências.**

- Bundle menor.
- Perde-se um elemento potencialmente memorável. Aceito: memorabilidade virá do conteúdo
  e da tipografia.

---

## ADR-009 · Dark mode como padrão

**Status:** Aceito · 2026-08-08

**Contexto.** O tema atual usa `defaultTheme="system"`. A paleta clara é creme (`#fef2e8`)
com amarelo, e reprova em contraste.

**Decisão.** Dark como tema padrão, com toggle preservado e persistência da escolha.
Ambos os temas são desenhados com o mesmo cuidado e ambos precisam passar em WCAG AA.

**Alternativas consideradas.**

- *Manter `system`.* Rejeitado como padrão porque a identidade visual pretendida é
  dark-first: o tema claro é uma adaptação, não o desenho original. Um visitante em
  máquina configurada para claro veria a versão secundária primeiro.
- *Apenas dark, sem toggle.* Rejeitado: hostil para quem tem preferência ou necessidade
  de tema claro, e remove uma funcionalidade que já existe e funciona.

**Consequências.**

- Manter `next-themes`, mudando `defaultTheme` para `'dark'`.
- `suppressHydrationWarning` no `<html>` permanece necessário.
- **Não** usar o padrão `if (!mounted) return null` em seções inteiras (P1-2). Onde um
  asset depender do tema, resolver com CSS (`dark:hidden` / `hidden dark:block`) ou
  `<picture>`, mantendo o conteúdo sempre presente no HTML.

---

## ADR-011 · Retrato real pequeno no lugar do avatar anime

**Status:** Aceito · 2026-08-08

**Contexto.** `public/hamasaki/home-me-anime.png` ocupa metade da primeira tela do hero,
empurrando para baixo a informação que o recrutador busca nos primeiros 7 segundos
(senioridade, stack, disponibilidade). Duas opções foram avaliadas com o dono, conforme
`03-design-system.md`, seção "Imagem e identidade".

**Decisão.** Opção A. Retrato fotográfico real, pequeno (96–128px), posicionado ao lado do
nome no hero. O hero deixa de ser dividido ao meio por imagem.

**Alternativas consideradas.**

- *Opção B — nenhuma foto no hero,* com o avatar anime reduzido a favicon. Rejeitada em
  favor de A: para vaga remota internacional, um rosto real gera confiança que um avatar
  ilustrado não gera, e o recrutador frequentemente cruza o site com o perfil do LinkedIn.
- *Manter o avatar anime em tamanho grande.* Rejeitada: é a causa direta do problema de
  primeira dobra descrito em `02-arquitetura-informacao.md`.

**Consequências.**

- **Requer um novo asset:** fotografia de retrato, enquadramento de cabeça e ombros, fundo
  neutro, boa iluminação. Sem isso, F3-T04 (hero) fica bloqueada nessa parte.
- Formato quadrado, servido em AVIF/WebP via `next/image`, com `width`/`height` explícitos
  e `priority` (é a única imagem acima da dobra).
- `alt` descritivo real — por exemplo `"Felipe Hamasaki"` — nunca o `"Hamasaki in Anime"`
  herdado (P2-3).
- O avatar anime **não é deletado**: passa a ser usado como favicon e ícone em contextos
  pequenos, onde funciona bem.
- Coerência com o LinkedIn: usar a mesma fotografia nos dois lugares ajuda o recrutador a
  fazer a ligação.

---

## ADR-010 · Sem animação de entrada por seção

**Status:** Aceito · 2026-08-08

**Contexto.** Toda seção usa `whileInView` do `motion`. Cards de experiência entram de
`scale: 0` com mola. Logos de skills têm `delay` escalonado até 3.25 segundos.

**Decisão.** Remover as animações de entrada por seção. Movimento fica restrito a
micro-interações (hover, foco, transição de tema, estado de formulário) e a, no máximo,
uma revelação sutil na primeira dobra. Todo movimento respeita `prefers-reduced-motion`.

**Alternativas consideradas.**

- *Manter, reduzindo durações.* Rejeitado: o problema não é a duração e sim o padrão —
  conteúdo que só aparece após rolagem penaliza quem lê rápido, que é exatamente o
  comportamento do recrutador.

**Consequências.**

- Conteúdo imediatamente legível ao rolar.
- `motion` continua no projeto para micro-interações. Reavaliar na F5: se restar pouco
  uso, substituir por transições CSS e remover a dependência.
