# 00 — Contexto e Decisões

## Sobre o dono do projeto

Felipe Hamasaki (Felipe H. Borges). Desenvolvedor brasileiro, nascido em dezembro de 1994.

Trajetória relevante:

- 2012–2014 — Professor de inglês, Skill Idiomas (Arujá, SP)
- 2015–2021 — Analista de Recursos Humanos, Tower International / Autokiniton (Arujá, SP)
- 2022–2023 — Desenvolvedor Front-End Júnior, ODEEN (Mogi das Cruzes, SP)
- 2023–2025 — Desenvolvedor Front-End Pleno, ODEEN
- 2025–presente — Desenvolvedor Full Stack Pleno, ODEEN

Stack declarada: TypeScript, JavaScript, Python, React, Next.js, Node.js, NestJS, Fastify,
Prisma, PostgreSQL, MySQL, Tailwind CSS, Git.

Ativos narrativos genuínos:

- **Transição de carreira tardia e bem-sucedida.** Seis anos em RH, descoberta da
  programação durante a pandemia, reconstrução completa de carreira. É uma história real
  e diferenciadora, não um clichê de bootcamp.
- **Progressão consistente na mesma empresa.** Júnior → pleno → full stack em quatro anos
  na ODEEN. Sinaliza confiança do empregador e crescimento de escopo, não job hopping.
- **Inglês de nível profissional.** Foi professor de inglês por dois anos. Para vaga remota
  internacional isso é um diferencial concreto e verificável, não uma autoavaliação vaga.
- **Background em RH.** Comunicação, trabalho com pessoas, entendimento de processo
  organizacional. Em times remotos distribuídos isso vale mais do que costuma ser
  reconhecido em currículo técnico.

Repositório: `https://github.com/felipehborges/felipe-hamasaki` (público)
E-mail de contato público: `felipehama@gmail.com`
LinkedIn: `https://www.linkedin.com/in/felipehborges/`

## Objetivo do projeto

**Conseguir uma vaga remota internacional como desenvolvedor full stack.**

Todas as decisões deste projeto devem ser avaliadas contra este objetivo único.
Se uma feature não aumenta a probabilidade de um recrutador ou engineering manager
internacional entrar em contato, ela não entra.

### Público-alvo, em ordem de prioridade

1. **Recrutador técnico internacional.** Passa 7 a 30 segundos na primeira visita.
   Precisa extrair em uma tela: nome, senioridade, stack, prova de trabalho, como contatar.
   Filtra por sinal, não por estética.
2. **Engineering manager / tech lead.** Chega depois do recrutador. Quer saber se você
   sabe tomar decisão técnica e justificá-la. Lê case studies e artigos. Avalia
   comunicação escrita, porque é assim que você vai trabalhar em time remoto.
3. **Desenvolvedor do time.** Vai olhar o GitHub, a qualidade do código, o README dos
   projetos. Avalia se você seria um bom colega de codebase.

### O que este público valoriza (e o que ignora)

| Valoriza | Ignora ou penaliza |
|---|---|
| Case study com problema, decisão e resultado | Parede de logos de tecnologia |
| Número real de impacto | "Apaixonado por tecnologia" |
| Código público legível com README decente | Lista de cursos concluídos |
| Texto técnico bem escrito em inglês | Barra de proficiência em % |
| Escopo e responsabilidade descritos | Cargo e data sem contexto |
| Site rápido e navegável no celular | Animação de entrada em cada seção |

## Decisões travadas

Decididas com o dono do projeto. Não reverter sem novo ADR em `08-registro-decisoes.md`.

| # | Decisão | Consequência prática |
|---|---|---|
| D1 | Objetivo é **vaga remota internacional** | Inglês como único idioma. Case studies com profundidade. Ênfase em comunicação escrita. |
| D2 | Acervo de projetos é **pequeno; precisa ser construído** | O site não pode esperar estar cheio para ir ao ar. Trilha técnica e trilha de conteúdo correm em paralelo. Experiência ODEEN vira o conteúdo âncora. |
| D3 | Direção visual: **minimalismo editorial** | Tipografia como elemento principal. Muito espaço em branco. Dark mode como padrão. Animação sutil. Fim do neobrutalismo (bordas pretas, sombras duras). |
| D4 | **Refatorar** a base atual, não reescrever | Mantém Next.js, Tailwind 4, shadcn/ui, Radix, Biome, pnpm. Reduz risco e aproveita o que funciona. |
| D5 | **i18n sai de escopo** | Decorrência de D1. Site apenas em inglês. `button-change-lang.tsx` é deletado, não implementado. O PDF de currículo em português permanece disponível para download. |
| D6 | Single-page com âncoras → **multi-página** | Cada case study e artigo tem URL própria, indexável e compartilhável. |

## Princípios norteadores

Use estes princípios para resolver ambiguidades que a spec não cobre.

**1. Prova acima de afirmação.**
Nunca escreva que sabe algo — mostre onde usou e o que resultou. "Experiente em NestJS"
é ruído; "Migrei a API de autenticação para NestJS reduzindo o tempo de resposta de X
para Y" é sinal.

**2. Honestidade acima de impressão.**
Com acervo pequeno existe a tentação de inflar: chamar exercício de "produto", listar
tecnologia tocada uma vez, arredondar métrica inexistente. Recrutador internacional
detecta isso na entrevista técnica e o custo é maior do que ter um portfólio modesto.
Profundidade honesta em poucas coisas vence amplitude fabricada. Ver `05-estrategia-conteudo.md`.

**3. O conteúdo dita o layout.**
Nenhuma seção existe porque "portfólio tem que ter". Se não há projeto pronto, a seção
de projetos não aparece vazia — ela simplesmente não é renderizada. Uma tela dizendo
"em construção" é pior do que ausência.

**4. Velocidade é parte do argumento.**
Você está se candidatando a construir software. Um portfólio lento é uma demonstração
negativa. Metas em `06-seo-performance-a11y.md` são requisito, não aspiração.

**5. Server-first.**
`'use client'` é exceção justificada por interação real, não padrão. Todo conteúdo textual
precisa existir no HTML servido.

**6. Menos superfície.**
Cada dependência, componente e arquivo precisa se justificar. Código morto no repositório
de um portfólio é lido como descuido — e o repositório é público.

## Não-objetivos

Explicitamente fora de escopo. Não implementar, mesmo que pareça boa ideia.

- **Internacionalização / seletor de idioma.** Ver D5.
- **CMS ou painel administrativo.** Conteúdo é MDX versionado no Git. Ver ADR-003.
- **3D, WebGL, three.js.** A dependência já existe no `package.json` sem uso e será
  removida. Não reintroduzir. Ver ADR-008.
- **Animação de entrada em cada seção.** O padrão atual (`whileInView` em tudo, cards
  entrando com `scale: 0` e mola) atrapalha leitura e atrasa conteúdo. Ver `03-design-system.md`.
- **Comentários, curtidas, contador de visitas.** Superfície sem retorno para o objetivo.
- **Seção de depoimentos.** Fora de escopo por ora — foi considerada e descartada porque
  o objetivo é emprego, não cliente freelance.
- **Blog com cadência fixa.** Dois artigos bem feitos servem ao objetivo. Comprometer-se
  com publicação semanal cria dívida.
- **Testes automatizados de UI extensivos.** Um portfólio estático não justifica.
  Exceção: se um projeto-vitrine precisar demonstrar competência em teste, o teste vive
  no repositório daquele projeto, não neste.

## Glossário

- **Case study** — página dedicada a um projeto, estruturada como Problema → Decisões →
  Resultado → Retrospectiva. Vive em `content/work/*.mdx`.
- **Projeto-vitrine** — projeto autoral construído especificamente para demonstrar
  competência técnica, com deploy público e código aberto.
- **Trilha A** — trabalho técnico no site. Executável por qualquer agente.
- **Trilha B** — produção de conteúdo. Depende de informação que só o dono possui.
