# 02 — Arquitetura de Informação

Mapa de rotas, especificação de cada página e regras de navegação.

Ler junto com `03-design-system.md` (como cada coisa se parece) e
`05-estrategia-conteudo.md` (o que cada coisa diz).

## Mapa de rotas

| Rota | Tipo | Renderização | Existe se |
|---|---|---|---|
| `/` | Estática | RSC | Sempre |
| `/work` | Estática | RSC | Houver ≥ 1 case study publicado |
| `/work/[slug]` | Estática (`generateStaticParams`) | RSC | Por arquivo em `content/work/` |
| `/about` | Estática | RSC | Sempre |
| `/writing` | Estática | RSC | Houver ≥ 1 artigo publicado |
| `/writing/[slug]` | Estática (`generateStaticParams`) | RSC | Por arquivo em `content/writing/` |
| `/rss.xml` | Route Handler | Estática | Houver ≥ 1 artigo publicado |
| `/sitemap.xml` | `sitemap.ts` | Gerada | Sempre |
| `/robots.txt` | `robots.ts` | Gerada | Sempre |
| `/opengraph-image` | `next/og` | Gerada por rota | Sempre |
| `/not-found` | Estática | RSC | Sempre |

### Regra de renderização condicional

Decorre do princípio 3 em `00-contexto-e-decisoes.md`: **conteúdo vazio não é renderizado.**

- Se `content/work/` não tem nenhum arquivo com `draft: false`, a rota `/work` retorna 404,
  o link "Work" some da navegação e a seção de destaques da home não é renderizada.
- Mesma regra para `/writing`.
- Nunca renderizar placeholder do tipo "em breve", "em construção" ou skeleton permanente.

Isso significa que o site pode ir ao ar com apenas `/` e `/about`, e ganhar rotas conforme
a trilha B produz conteúdo. É o comportamento desejado.

## Convenção de URLs

- Minúsculas, hífen como separador, sem acento, sem data no caminho.
  `✅ /work/pipeline-de-alertas`  `❌ /work/2026/01/Pipeline_de_Alertas`
- O `slug` é o nome do arquivo sem extensão. `content/work/foo-bar.mdx` → `/work/foo-bar`.
- Slug é permanente. Se precisar mudar, criar redirect 301 em `next.config.ts`.
- Sem barra final. Canonical sempre sem barra final.

## Especificação das páginas

Cada spec segue: objetivo → blocos em ordem → regras.

---

### `/` — Home

**Objetivo.** Em uma tela, responder: quem é, o que faz, qual o nível, qual a prova.
Em duas rolagens, dar caminho para tudo o mais.

**Restrição dura.** Toda a informação essencial cabe em no máximo duas rolagens completas
em desktop e três em mobile. Não são cinco telas de altura como hoje.

**Blocos, em ordem:**

**1. Header** (persistente em todas as rotas)
- Logotipo textual: `Felipe Hamasaki`, link para `/`
- Navegação: `Work` · `Writing` · `About` (itens condicionais conforme a regra acima)
- Toggle de tema
- Sem "Contact" na navegação — o contato vive no rodapé e no fim da home

**2. Hero**
- `<h1>` com o nome
- Uma linha de posicionamento com **senioridade, stack e disponibilidade**.
  Deve conter a informação que o recrutador procura nos primeiros 7 segundos.
  Modelo: *"Full stack developer — TypeScript, React, Node. 4 years shipping production
  software. Open to remote roles."*
- Dois a três parágrafos curtos, no máximo. Não é a biografia — é o gancho.
- Ações primárias: link para o primeiro case study em destaque, ou para `/work`; e
  `Download résumé`
- Links persistentes: GitHub, LinkedIn, e-mail
- **Sem avatar grande ocupando metade da tela.** Ver `03-design-system.md`,
  seção "Imagem e identidade".
- Sem animação de entrada além de, no máximo, um fade sutil.

**3. Selected work** — condicional
- Título de seção
- Dois a três case studies marcados com `featured: true` no frontmatter
- Cada item: título, uma linha de resumo, stack (texto, não logo), ano, link para o
  case study completo
- Link "All work →" apontando para `/work`, só se houver mais itens do que os exibidos
- **Não renderizar a seção se não houver nenhum case study publicado**

**4. Experience** — condensada
- Timeline vertical com os cargos
- Cada entrada: cargo, empresa, período, e **uma a três linhas do que foi construído
  e com qual impacto**. Isso é o que falta hoje. Ver `05-estrategia-conteudo.md`.
- Sem imagem por cargo (as `exp-*.png` atuais saem da home)
- Sem card com borda e sombra — timeline tipográfica
- Link para `/about` para a narrativa completa

**5. Contato**
- Uma linha de chamada direta
- E-mail visível como texto selecionável e link `mailto:` — recrutador frequentemente
  copia para o próprio ATS
- LinkedIn e GitHub
- Formulário: ver decisão de posicionamento abaixo

**6. Footer**
- Nome, ano
- Repetição dos links sociais
- Link para o repositório do próprio site

**Decisão sobre o formulário de contato.** O formulário vive no fim da home e no `/about`,
sempre acompanhado do e-mail em texto. Não usar dialog/modal como hoje — um formulário
escondido atrás de um botão numa navbar que se esconde ao rolar tem atrito desnecessário.
O `ContactMeDialog` atual é substituído por uma seção inline.

---

### `/work` — Índice de case studies

**Objetivo.** Listar todo o trabalho de forma escaneável.

**Blocos:**
- `<h1>` "Work" + uma linha de contexto
- Lista cronológica reversa. Cada item: título, ano, resumo de uma linha, stack, link
- Sem filtro nem busca enquanto houver menos de 8 itens. Complexidade sem retorno.
- Sem grid de cards com thumbnail. Lista tipográfica densa é mais rápida de escanear
  e não exige produzir imagem para cada projeto.

---

### `/work/[slug]` — Case study

**Objetivo.** Provar competência técnica através de uma decisão real, bem explicada.
É a página que converte engineering manager.

**Blocos:**

1. **Cabeçalho** — título, ano, papel exercido, stack, links (repositório, demo ao vivo)
2. **Resumo** — 2 a 3 frases. O que era o problema e o que mudou. Legível isoladamente.
3. **Corpo em MDX**, seguindo a estrutura obrigatória de `05-estrategia-conteudo.md`:
   - `## The problem`
   - `## Constraints`
   - `## What I built`
   - `## Key decisions` — a seção mais importante; cada decisão com a alternativa descartada
   - `## Results`
   - `## What I'd do differently`
4. **Navegação** — anterior / próximo case study
5. **Contato** — chamada curta ao final

**Regras:**
- Código com destaque de sintaxe, temas claro e escuro
- Imagens com dimensão explícita, via `next/image`, sem causar deslocamento de layout
- Largura de leitura limitada (ver `03-design-system.md`, medida de 68ch)
- Cada case study tem `opengraph-image` própria com o título

---

### `/about` — Sobre

**Objetivo.** A narrativa que diferencia. Aqui a biografia é bem-vinda — na home não é.

**Blocos:**
1. `<h1>` + linha de abertura
2. **Narrativa** — a história RH → dev, expandida. Este é o ativo de conteúdo mais forte
   que já existe no site atual. Migrar o texto de `section-about` e desenvolver.
3. **Foto** — `public/hamasaki/child.png` cabe bem aqui, com legenda
4. **Como eu trabalho** — parágrafo curto sobre método, comunicação, o que ele valoriza
   num time. Relevante para vaga remota, onde autonomia e comunicação escrita são critério.
5. **Skills, reposicionado** — ver regra abaixo
6. **Currículo** — download em EN e PT
7. **Contato**

**Regra para a seção de skills.** A parede de 14 logos é eliminada (P0-5). Substituída por
agrupamento textual por profundidade real:

```
Working daily     TypeScript · React · Next.js · Node.js · PostgreSQL
Comfortable       NestJS · Fastify · Prisma · Tailwind CSS · Python
Familiar          MySQL · Docker · ...
```

Os rótulos são honestos, não inflados. Quando uma tecnologia aparece num case study,
o texto pode linkar para ele — é o que transforma lista em prova.

Os arquivos `public/logos/*.png` de tecnologia deixam de ser usados. Manter os logos
sociais (GitHub, LinkedIn) apenas se necessário; preferir ícones `lucide-react`.

---

### `/writing` e `/writing/[slug]` — Artigos

**Objetivo.** Demonstrar comunicação técnica escrita em inglês — critério direto de
avaliação para vaga remota internacional.

`/writing`: lista cronológica reversa com título, data, tempo de leitura, resumo.

`/writing/[slug]`: cabeçalho (título, data, tempo de leitura), corpo em MDX, navegação
entre artigos, link para o RSS.

**Regra.** A rota só existe com ≥ 1 artigo publicado. Um blog vazio é pior que blog nenhum.

---

### `/not-found` — 404

Simples e útil: mensagem curta, link para a home e para `/work`. Sem piada elaborada.

## Navegação

**Header.** Fixo no topo, sempre visível. **Não esconder ao rolar** — o comportamento
atual (P2-4) usa `setTimeout` para controlar visibilidade e cria um estado imprevisível.
Um header simples que permanece é mais previsível e mais barato.

Em mobile: os itens de navegação são poucos o bastante (no máximo três) para caberem
sem menu hambúrguer. O `Drawer` atual pode ser eliminado — verificar na F3 e deletar
`ui/drawer.tsx` se ficar sem uso.

**Estado ativo.** A rota atual é indicada visualmente no header.

**Footer.** Presente em todas as rotas. Navegação secundária, links sociais, link para
o repositório.

**Hierarquia de links.** Todo caminho de conversão termina em contato. Nenhuma página é
um beco sem saída: case study leva a outro case study ou a contato; `/about` leva a
`/work` ou a contato.

## Fluxo do visitante

Desenhar contra estes três percursos:

**Recrutador (7–30 s).** Chega em `/` por LinkedIn. Lê o hero. Precisa extrair senioridade,
stack e disponibilidade sem rolar. Se rolar, encontra trabalho em destaque e experiência
com impacto. Sai copiando o e-mail ou baixando o currículo.

**Engineering manager (3–10 min).** Chega em `/` ou direto num `/work/[slug]` compartilhado.
Lê um case study inteiro. Avalia `## Key decisions`. Pode ir para `/writing`. Sai formando
opinião sobre capacidade de raciocínio técnico.

**Desenvolvedor do time (1–5 min).** Vai direto ao GitHub pelo link do header. Volta para
ver o case study do projeto que achou interessante. Avalia coerência entre o que o site
diz e o que o código mostra — motivo pelo qual o repositório precisa estar limpo (F1).
