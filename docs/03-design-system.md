# 03 — Design System

Direção visual: **minimalismo editorial** (ADR-005). Dark-first (ADR-009).

Este documento é normativo. Nenhum valor de cor, tamanho, espaçamento ou duração deve ser
escrito diretamente em componente — tudo vem dos tokens definidos aqui.

## Princípios visuais

1. **Tipografia é a estrutura.** Hierarquia se resolve com tamanho, peso e espaço —
   não com caixa, borda e sombra.
2. **Um acento só.** Uma cor de destaque, usada com parcimônia: links, foco, um elemento
   por tela. Se tudo é destaque, nada é.
3. **Espaço em branco é conteúdo.** Densidade baixa, respiro generoso entre blocos.
4. **Sem decoração sem função.** Toda borda, sombra ou gradiente precisa comunicar algo.
5. **Movimento serve ao entendimento.** Feedback de interação, sim. Coreografia de
   entrada, não (ADR-010).

## Cores

Paleta neutra quente com um único acento âmbar. O âmbar preserva continuidade com a
identidade anterior (que era amarela) em uma versão que passa em contraste.

### Tema escuro (padrão)

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#0D0C0B` | Fundo da página |
| `--bg-subtle` | `#141312` | Faixas alternadas, blocos de código |
| `--surface` | `#1A1917` | Superfície elevada (input, popover) |
| `--border` | `#2A2825` | Divisórias, bordas de input |
| `--border-strong` | `#3A3733` | Borda em hover e foco |
| `--text` | `#F2F0ED` | Texto principal |
| `--text-muted` | `#A39E96` | Texto secundário, legendas, metadados |
| `--text-subtle` | `#6E6862` | Apenas texto grande ou elemento de UI |
| `--accent` | `#E8B04B` | Links, foco, destaque |
| `--accent-hover` | `#F0C169` | Estado hover do acento |
| `--accent-contrast` | `#0D0C0B` | Texto sobre fundo de acento |

### Tema claro

| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#FBFAF8` | Fundo da página |
| `--bg-subtle` | `#F4F2EE` | Faixas alternadas, blocos de código |
| `--surface` | `#FFFFFF` | Superfície elevada |
| `--border` | `#E3DFD8` | Divisórias |
| `--border-strong` | `#CFC9BF` | Borda em hover e foco |
| `--text` | `#171613` | Texto principal |
| `--text-muted` | `#5C574F` | Texto secundário |
| `--text-subtle` | `#8A847A` | Apenas texto grande ou elemento de UI |
| `--accent` | `#96601A` | Links, foco, destaque |
| `--accent-hover` | `#7A4E12` | Estado hover do acento |
| `--accent-contrast` | `#FFFFFF` | Texto sobre fundo de acento |

### Contraste verificado

Calculado pela fórmula WCAG 2.x. Todos os valores abaixo foram medidos, não estimados.

| Combinação | Razão | Veredito |
|---|---|---|
| `--text` sobre `--bg` (escuro) | 17.3:1 | ✅ AAA |
| `--text-muted` sobre `--bg` (escuro) | 7.4:1 | ✅ AAA |
| `--text-subtle` sobre `--bg` (escuro) | 3.6:1 | ⚠️ apenas texto grande e UI |
| `--accent` sobre `--bg` (escuro) | 10.0:1 | ✅ AAA |
| `--accent-contrast` sobre `--accent` (escuro) | 10.0:1 | ✅ AAA |
| `--text` sobre `--bg` (claro) | 17.3:1 | ✅ AAA |
| `--text-muted` sobre `--bg` (claro) | 6.9:1 | ✅ AAA |
| `--text-subtle` sobre `--bg` (claro) | 3.6:1 | ⚠️ apenas texto grande e UI |
| `--accent` sobre `--bg` (claro) | 5.1:1 | ✅ AA |

**Regra sobre `--text-subtle`:** proibido para texto corrido. Permitido apenas em texto
≥ 24px, ou ≥ 18.66px em negrito, e em elementos de interface não textuais (ícone
decorativo, borda). Na dúvida, use `--text-muted`.

**Proibido:** reutilizar `#f5d90a`, `#F5AA0A`, `#fef2e8` ou `#424242` da paleta antiga.
As três primeiras reprovam em contraste (P1-6) e a última é um cinza que não pertence
à família cromática.

### Implementação

Definir em `src/styles/globals.css` como CSS custom properties em `:root` (escuro) e
`.light` (claro), expostas ao Tailwind 4 via `@theme inline`. Manter os aliases que os
componentes shadcn esperam (`--background`, `--foreground`, `--primary`, `--muted`…)
apontando para os tokens acima, para não precisar reescrever cada componente `ui/`.

## Tipografia

Três famílias, carregadas por `next/font` (self-hosted, sem requisição externa).

| Papel | Família | Pesos | Onde |
|---|---|---|---|
| Display | **Newsreader** | 400, 500 + itálico 400 | `<h1>`, `<h2>`, citações |
| Corpo / UI | **Inter** (variável) | variável | Todo o resto |
| Mono | **JetBrains Mono** | 400 | Código, metadados, rótulos técnicos |

**Racional.** O serif no display cria o caráter editorial e distingue o site do padrão
"todo portfólio usa Inter em tudo". O sans no corpo garante legibilidade. O mono ancora
a identidade técnica sem transformar o site em terminal.

**Isso substitui** Poppins com nove pesos e Domine com quatro (P1-4). Reduz de 13 arquivos
de fonte para 4. Ao implementar, corrigir também o bug de `--font-poppins` sendo usado
para registrar Domine, e remover as referências a `--font-geist-*` em `globals.css`,
que apontam para fontes nunca instaladas.

### Escala

Fluida via `clamp()`. Valores em `rem`.

| Token | Valor | Uso |
|---|---|---|
| `--text-display` | `clamp(2.75rem, 6vw, 4.5rem)` | `<h1>` do hero |
| `--text-h1` | `clamp(2rem, 4vw, 3rem)` | `<h1>` de páginas internas |
| `--text-h2` | `clamp(1.5rem, 2.5vw, 2rem)` | Títulos de seção |
| `--text-h3` | `1.25rem` | Subtítulos |
| `--text-lg` | `1.125rem` | Corpo de prose (case studies, artigos) |
| `--text-base` | `1rem` | Corpo de UI |
| `--text-sm` | `0.875rem` | Metadados, legendas |
| `--text-xs` | `0.75rem` | Rótulos mono |

### Regras

- **Altura de linha:** 1.15 em display, 1.25 em títulos, 1.7 em prose, 1.5 em UI.
- **Espaçamento entre letras:** `-0.02em` em display e `<h1>`, `-0.01em` em `<h2>`,
  normal no corpo, `0.05em` em rótulos mono maiúsculos.
- **Medida:** prose limitada a `68ch`. Nunca texto corrido em largura total.
- **Alinhamento:** sempre à esquerda. **Proibido `text-justify`** — o site atual usa
  `text-justify` em vários blocos (`section-home`, `section-about`), o que cria rios de
  espaço em branco e piora a legibilidade em telas estreitas.
- **Órfãs:** evitar palavra sozinha na última linha de títulos usando `text-wrap: balance`
  em `<h1>`/`<h2>` e `text-wrap: pretty` em parágrafos.

## Espaçamento

Base de 4px. Usar apenas os degraus da escala.

`4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128`

**Ritmo vertical:**

| Contexto | Espaçamento |
|---|---|
| Entre seções da página | `96px` mobile · `128px` desktop |
| Entre blocos dentro de uma seção | `48px` |
| Entre parágrafos | `24px` |
| Entre itens de lista | `12px` |

**Regra: `min-h-screen` está proibido em seções de conteúdo.** O padrão atual — cinco
seções de altura de viewport (P2-6) — força rolagem artificial. A altura de uma seção é
determinada pelo conteúdo dela. Exceção única: o hero da home pode usar altura mínima
parcial (por exemplo `min-h-[70svh]`), nunca `100vh`.

Usar `svh`/`dvh` em vez de `vh` para não quebrar com a barra de endereço do mobile.

## Layout

- **Container:** `max-width: 72rem` (1152px), `padding-inline` de 24px em mobile e
  32px em desktop.
- **Prose:** `max-width: 68ch` dentro do container.
- **Breakpoints:** os padrões do Tailwind (`sm 640` · `md 768` · `lg 1024` · `xl 1280`).
  Não introduzir novos. O código atual usa `2xl` e larguras arbitrárias como `md:w-185`
  e `lg:w-220` — eliminar.
- **Mobile-first.** Escrever o estilo base para mobile e adicionar breakpoints para cima.

## Bordas, raios e elevação

| Token | Valor |
|---|---|
| `--radius-sm` | `4px` |
| `--radius-md` | `8px` |
| `--radius-full` | `9999px` |

**Sombras: nenhuma.** Elevação se comunica por cor de superfície (`--surface` sobre `--bg`)
e por borda de 1px. Isto elimina explicitamente o `shadow-[4px_4px_0px_#000]` e as
`border-2 border-black` do neobrutalismo atual (ADR-005).

Espessura de borda é sempre `1px`. Nunca `2px` ou `4px`.

## Movimento

| Token | Valor | Uso |
|---|---|---|
| `--duration-fast` | `150ms` | Hover, foco, mudança de cor |
| `--duration-base` | `250ms` | Transição de tema, abertura de disclosure |
| `--ease` | `cubic-bezier(0.16, 1, 0.3, 1)` | Padrão para tudo |

**Permitido:** mudança de cor em hover, anel de foco, sublinhado animado em link, estado
de carregamento de botão, transição de tema.

**Proibido** (ADR-010): `whileInView` em seções, `scale: 0` como estado inicial, molas
com `bounce`, `delay` escalonado, parallax, animação de contador.

**Obrigatório:** respeitar `prefers-reduced-motion`. Implementar globalmente em
`globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Note que isso também desabilita o `scroll-behavior: smooth` que hoje está em
`globals.css` sem essa proteção.

## Foco e estados

**Anel de foco visível e consistente**, obrigatório em todo elemento interativo:

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

Nunca remover outline sem substituir por algo com contraste ≥ 3:1.

**Links de texto:** sublinhado com `text-underline-offset: 0.2em`. Cor `--accent` ao
passar o mouse. Link não pode ser identificado apenas por cor.

**Alvos de toque:** mínimo 44×44px em mobile.

## Imagem e identidade

Decisão sobre os assets atuais:

| Asset | Destino |
|---|---|
| `hamasaki/home-me-anime.png` | **Sai do hero.** Ver decisão abaixo. |
| `hamasaki/child.png` | Vai para `/about`, com legenda |
| `hamasaki/exp-*.png` (5 arquivos) | **Removidos.** A timeline é tipográfica. |
| `logos/*.png` de tecnologia (14) | **Removidos.** Skills vira texto agrupado. |
| `logos/logo-github-*`, `logo-linkedin`, `logo-gmail`, `logo-whatsapp` | Substituídos por ícones `lucide-react` |

**Sobre o avatar anime.** Ele ocupa metade do hero hoje e empurra a informação relevante
para baixo, competindo com os 7 segundos do recrutador. Duas opções aceitáveis, a decidir
na F2 com o dono:

- **A** — Retrato real, pequeno (96–128px), ao lado do nome ou no `/about`. Para vaga
  internacional, um rosto real cria confiança que um avatar não cria.
- **B** — Nenhuma foto no hero. O avatar anime vira favicon e ícone de identidade em
  contextos pequenos, onde funciona bem.

Em ambos os casos o hero deixa de ser dividido ao meio por uma imagem.

**Regras para toda imagem:** `next/image` com `width`/`height` explícitos, `alt`
descritivo e específico (corrigir P2-3, onde os cinco cards usam o mesmo `alt`), formato
AVIF ou WebP, `priority` apenas na imagem acima da dobra.

## Componentes

Reestilizar via tokens. Deletar o que ficar sem uso ao final da F3.

| Componente | Situação |
|---|---|
| `ui/button.tsx` | Manter. Variantes: `primary`, `ghost`, `link`. Remover as não usadas. |
| `ui/input.tsx`, `ui/textarea.tsx`, `ui/label.tsx`, `ui/form.tsx` | Manter — formulário de contato |
| `ui/tooltip.tsx` | Provável remoção — existia para a parede de logos |
| `ui/card.tsx` | Provável remoção — não há mais card com borda e sombra |
| `ui/drawer.tsx`, `ui/sheet.tsx` | Provável remoção — sem menu hambúrguer |
| `ui/dialog.tsx` | Manter apenas se o seletor de idioma do currículo continuar em modal |
| `ui/dropdown-menu.tsx` | Provável remoção |
| `ui/sonner.tsx` | Manter — feedback do formulário |
| `components/typography.tsx` | Reescrever: remover `'use client'`, remover o carregamento de fonte de dentro do arquivo, alinhar à nova escala |

**Componentes novos a criar:** `SiteHeader`, `SiteFooter`, `Prose` (wrapper de MDX),
`WorkListItem`, `ExperienceTimeline`, `ContactSection`, `ThemeToggle` (adaptar o existente).

## Checklist de conformidade visual

Antes de dar qualquer tarefa de UI por concluída:

- [ ] Nenhum valor de cor literal no componente — tudo via token
- [ ] Funciona nos dois temas, verificado visualmente
- [ ] Contraste de texto ≥ 4.5:1 (ou ≥ 3:1 se texto grande)
- [ ] Foco visível ao navegar por Tab
- [ ] Sem `min-h-screen` fora do hero
- [ ] Sem sombra, sem borda maior que 1px
- [ ] Sem `text-justify`
- [ ] Sem animação de entrada por rolagem
- [ ] Legível em 360px de largura sem rolagem horizontal
- [ ] Respeita `prefers-reduced-motion`
