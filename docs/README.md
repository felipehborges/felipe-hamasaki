# Especificação — Reformulação do Portfólio

Documentação spec-driven da reestruturação completa de `felipe-hamasaki`.

Estes documentos são a **fonte de verdade** do projeto. Foram escritos para serem
autossuficientes: qualquer pessoa — ou qualquer agente de IA, em qualquer sessão nova,
sem contexto prévio — deve conseguir ler esta pasta e executar o trabalho sem precisar
reauditar o código ou readivinhar decisões.

## Como usar

**Se você é um agente de IA iniciando uma sessão nova:**

1. Leia `00-contexto-e-decisoes.md` — entende o objetivo e o que já está decidido.
2. Leia `07-roadmap-execucao.md` — encontra a próxima tarefa não concluída.
3. Leia o documento de referência citado na tarefa.
4. Execute **apenas** a tarefa. Não antecipe fases futuras.
5. Verifique contra os critérios de aceite da tarefa.
6. Marque a tarefa como concluída em `07-roadmap-execucao.md` no mesmo commit.

**Regras invioláveis para quem executa:**

- Nenhuma decisão travada em `00-contexto-e-decisoes.md` ou `08-registro-decisoes.md`
  pode ser revertida sem registrar um novo ADR explicando por quê.
- Nenhum conteúdo textual do site pode ser inventado. Métricas, resultados e
  responsabilidades vêm exclusivamente do dono do projeto. Ver `05-estrategia-conteudo.md`,
  seção "Regras de honestidade".
- Se uma tarefa parecer ambígua, o problema é da spec. Corrija a spec primeiro,
  depois execute.

## Índice

| Documento | Conteúdo | Quando ler |
|---|---|---|
| [00-contexto-e-decisoes.md](00-contexto-e-decisoes.md) | Objetivo, público-alvo, decisões travadas, princípios, não-objetivos | Sempre, primeiro |
| [01-auditoria-estado-atual.md](01-auditoria-estado-atual.md) | Inventário do código existente e catálogo de problemas com localização | Antes de mexer em código legado |
| [02-arquitetura-informacao.md](02-arquitetura-informacao.md) | Mapa de rotas, spec de cada página, navegação, URLs | Ao criar ou alterar páginas |
| [03-design-system.md](03-design-system.md) | Tokens de cor, tipografia, espaçamento, motion, componentes | Ao escrever qualquer CSS ou componente visual |
| [04-especificacao-tecnica.md](04-especificacao-tecnica.md) | Stack, estrutura de pastas, convenções, camada de conteúdo, contatos | Ao escrever qualquer código |
| [05-estrategia-conteudo.md](05-estrategia-conteudo.md) | Modelo de conteúdo, tom de voz, templates, briefing para o dono | Ao escrever ou estruturar conteúdo |
| [06-seo-performance-a11y.md](06-seo-performance-a11y.md) | Metas mensuráveis, metadata por rota, checklists | Nas fases de SEO e antes de cada release |
| [07-roadmap-execucao.md](07-roadmap-execucao.md) | Fases, tarefas atômicas, critérios de aceite, status | Sempre, para saber o que fazer |
| [08-registro-decisoes.md](08-registro-decisoes.md) | ADRs — decisões arquiteturais e seus porquês | Ao questionar uma decisão |

## Estado do projeto

| Fase | Descrição | Status |
|---|---|---|
| F0 | Especificação | ✅ Concluída |
| F1 | Saneamento técnico | ✅ Concluída |
| F2 | Design system | 🟡 Código concluído (T01–T05); T06 decidida; T07 bloqueada (dono) |
| F3 | Arquitetura de informação e rotas | ⬜ Não iniciada |
| F4 | Camada de conteúdo (MDX) | ⬜ Não iniciada |
| F5 | SEO, performance, acessibilidade | ⬜ Não iniciada |
| F6 | Contato funcional | ⬜ Não iniciada |
| F7 | Produção de conteúdo | ⬜ Não iniciada — depende do dono |

Fonte de verdade do status: `07-roadmap-execucao.md`. Esta tabela é apenas um resumo.

## Nota sobre o idioma desta documentação

Estes documentos estão em português porque são material de trabalho do dono do projeto.
**O site em si é 100% em inglês** (ver ADR-002).

Atenção: o repositório `felipehborges/felipe-hamasaki` é público, e recrutadores
frequentemente inspecionam o repositório de um portfólio. Uma pasta `docs/` bem
estruturada é um sinal positivo de disciplina de planejamento — mas em português ela é
ilegível para o público-alvo internacional. Duas saídas, a decidir antes do lançamento:

1. Traduzir esta pasta para inglês ao final do projeto.
2. Manter em português e adicionar um `docs/README.en.md` com um resumo executivo.

Nenhuma das duas é urgente. Registrar a decisão em `08-registro-decisoes.md` quando tomada.
