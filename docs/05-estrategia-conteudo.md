# 05 — Estratégia de Conteúdo

Este é o documento mais importante do projeto.

O site atual não falha por causa da stack — falha porque não tem o que mostrar
(P0-1, P0-4, P0-5). O trabalho técnico das fases F1 a F6 constrói a vitrine. Sem o
conteúdo desta fase, a vitrine fica vazia e o objetivo não é atingido.

**Boa parte deste conteúdo só pode vir do dono do projeto.** Nenhum agente pode inventá-lo.

## Regras de honestidade

Invioláveis. Valem para qualquer pessoa ou agente que escreva conteúdo para este site.

1. **Nenhuma métrica sem fonte.** Se o dono não forneceu o número, ele não existe. Não
   arredonde, não estime, não escreva "significativamente" para disfarçar a ausência de
   dado. Descreva o escopo em vez disso.
2. **Nenhuma tecnologia não usada de verdade.** Ter lido a documentação não é experiência.
   O agrupamento por profundidade em `/about` existe justamente para permitir honestidade
   sem parecer fraqueza.
3. **Nenhum exercício apresentado como produto.** Um projeto de estudo pode virar case
   study excelente — desde que apresentado como o que é.
4. **Nenhuma responsabilidade de time apresentada como individual.** Use "eu" para o que
   você fez e "o time" para o que o time fez. Isso não diminui você; recrutador
   experiente lê a distinção como maturidade.
5. **Confidencialidade da ODEEN respeitada.** Não publicar nome de cliente, dado de
   negócio, captura de tela de sistema interno ou trecho de código proprietário. A saída
   é descrever o **problema técnico e a decisão** em termos genéricos — que é justamente
   o que interessa ao leitor.

O custo de inflar é assimétrico: o ganho é uma resposta a mais; a perda é ser desmascarado
numa entrevista técnica, com a reputação junto.

## Modelo de conteúdo

| Peça | Onde vive | Quantidade alvo | Prioridade |
|---|---|---|---|
| Posicionamento do hero | `src/components/sections/hero.tsx` | 1 | **P0** |
| Entradas de experiência | `src/lib/` ou `content/` | 5 | **P0** |
| Narrativa do `/about` | `src/app/about/page.tsx` | 1 | **P1** |
| Agrupamento de skills | `src/app/about/page.tsx` | 1 | **P1** |
| Case studies | `content/work/*.mdx` | 3 a 4 | **P1** |
| Artigos | `content/writing/*.mdx` | 2 | **P2** |

Ordem de produção deliberada: o que dá mais retorno por hora de esforço vem primeiro.
Experiência e posicionamento usam informação que o dono **já tem** — só nunca foi escrita.
Projetos-vitrine exigem construir software, que é o item mais caro.

## Tom de voz

O site é em inglês (ADR-002).

- **Primeira pessoa, direto.** "I built", "I chose", "I'd do differently".
- **Concreto acima de adjetivo.** Não "highly performant"; sim "p95 dropped from 800ms to 120ms".
- **Frases curtas.** Inglês técnico simples lê melhor que inglês elaborado, inclusive para
  falantes nativos.
- **Sem jargão de currículo.** Proibidos: *passionate*, *results-driven*, *team player*,
  *hard worker*, *fast learner*, *ninja*, *rockstar*, *leverage*, *synergy*.
- **Opinião é permitida e desejável.** "I think X is usually the wrong tool because Y" vale
  mais que uma descrição neutra. É o que faz o site "ler como uma pessoa" em vez de currículo.

Nota: o texto atual do hero diz *"I'm a Brazilian passionate Full Stack Developer... I love
learning new things and sharing knowledge with others"*. É exatamente o registro a ser
substituído — não diz nada que outro candidato não diria.

---

## Briefing para o dono do projeto

**Esta seção é um formulário.** Responda em texto corrido, sem se preocupar com redação —
a formatação é trabalho da fase de implementação. Respostas ruins aqui produzem um site
ruim; nenhuma quantidade de trabalho técnico compensa.

### Bloco 1 — Posicionamento (15 min) · desbloqueia o hero

1. Se você tivesse **uma frase** para um engineering manager em Berlim ou Toronto explicando
   o que você faz e em que nível, qual seria?
2. Que tipo de vaga você quer? (produto ou consultoria; tamanho da empresa; front-end,
   back-end ou full stack de verdade; algum domínio de interesse?)
3. Qual sua situação de disponibilidade? (aberto a propostas agora / procurando ativamente /
   só oportunidades excepcionais). Contratação como PJ, contractor, EOR? Fuso horário
   com que consegue trabalhar?
4. Que restrições existem? (visto, relocação, faixa salarial mínima, exclusividade)

### Bloco 2 — Experiência ODEEN (60–90 min) · maior retorno de todo o projeto

Este bloco sozinho resolve o P0-4 e é o conteúdo mais valioso que você pode produzir hoje.

**Para cada um dos três cargos** (Front-End Júnior 2022–2023, Front-End Pleno 2023–2025,
Full Stack Pleno 2025–presente), responda:

1. Qual era o **produto ou sistema** em que você trabalhou? Descreva em termos genéricos
   o suficiente para não violar confidencialidade — "plataforma de monitoramento de
   segurança usada por operadores em tempo real" já é o bastante.
2. Qual era o **problema técnico** mais difícil que você enfrentou nesse período?
3. **O que você construiu** com as próprias mãos? Seja específico: quais telas, quais
   endpoints, qual módulo, qual integração.
4. **Que decisão técnica você tomou** e qual alternativa você descartou? Por quê?
5. **O que mudou** por causa disso? Número se existir (tempo, volume, quantidade de bugs,
   tempo de build, tamanho do time). Se não existir número, descreva o efeito qualitativo.
6. **Escala do contexto:** tamanho do time, quantidade de usuários, volume de dados,
   frequência de deploy — o que você puder dizer.
7. **O que mudou entre um cargo e o outro?** O que você passou a fazer que não fazia antes?
   Isso é o que justifica a promoção e é o que o leitor quer entender.

Se ficar travado, use este gatilho: *"lembra daquela semana em que algo estava quebrado ou
lento e você resolveu?"* — quase todo bom case study nasce daí.

### Bloco 3 — Acervo existente (30 min)

1. Liste **todos** os repositórios que você tem, mesmo os que considera pequenos ou
   inacabados. Para cada um: o que é, funciona, está publicado em algum lugar?
2. Algum deles resolve um problema **seu**, real? (Esses são os melhores candidatos a
   case study — problema pessoal genuíno é mais convincente que exercício.)
3. Você tem algo feito para terceiros — freelance, favor, projeto de amigo?
4. Você automatizou alguma coisa no seu próprio trabalho ou na sua vida? Script, bot,
   integração? Isso conta e costuma ser subestimado.

### Bloco 4 — Narrativa pessoal (20 min)

O texto atual de `/about` já é bom. Estas perguntas o aprofundam:

1. O que especificamente na programação te prendeu, durante a pandemia? Qual foi a
   primeira coisa que você construiu que fez você pensar "é isso"?
2. O que dos seis anos em RH você usa hoje como desenvolvedor? Seja concreto —
   evite "trabalhar com pessoas".
3. Como você prefere trabalhar? (assíncrono ou síncrono, pareamento, code review,
   documentação) O que te faz produtivo e o que te trava?
4. O que você está aprendendo agora, e por quê?

### Bloco 5 — Assuntos para escrita (15 min)

1. Sobre que você poderia falar por 30 minutos sem preparo?
2. O que você aprendeu recentemente que gostaria de ter sabido um ano atrás?
3. Alguma opinião técnica sua é impopular ou contraintuitiva? (Ótimo material de artigo.)

---

## Templates

### Case study — `content/work/<slug>.mdx`

Frontmatter conforme `04-especificacao-tecnica.md`. Corpo:

```markdown
## The problem

Qual era a situação e por que era um problema. Duas ou três frases.
Escreva para quem não conhece o domínio.

## Constraints

O que limitava a solução: prazo, time, stack existente, requisito de compatibilidade,
regra de negócio. Restrição é o que separa engenharia de exercício acadêmico — mostrar
que você projetou sob restrição é sinal de senioridade.

## What I built

O que existe hoje que não existia antes. Concreto. Se houver diagrama de arquitetura,
é aqui.

## Key decisions

A seção mais importante da página. Uma subseção por decisão relevante.

### <A decisão>

O que você escolheu, a alternativa que descartou e o critério que usou.

Formato que funciona:
"Escolhi X em vez de Y porque Z. O custo dessa escolha foi W, que aceitei porque V."

Escrever a alternativa descartada é o que demonstra raciocínio. Sem isso a decisão
parece sorte.

## Results

O que mudou. Número quando existir; escopo quando não existir.
Nunca invente número (ver Regras de honestidade).

## What I'd do differently

Uma ou duas coisas que você faria diferente hoje, e por quê.

Esta seção é opcional em teoria e obrigatória na prática: é o que mais separa
sênior de júnior aos olhos de quem contrata. Não é confissão de erro — é evidência
de que você continua avaliando o próprio trabalho.
```

### Entrada de experiência

Três campos além dos metadados. Máximo três linhas de corpo — o detalhe vive no case study.

```
Cargo · Empresa · Período
<Uma linha de contexto: qual produto, qual escala, qual time.>
<Uma a duas linhas do que você construiu e do que mudou.>
[link opcional para o case study relacionado]
```

Comparação — o que existe hoje contra o alvo:

> **Hoje:** Mid-Level Full Stack Developer · ODEEN · 2025–Present · Mogi das Cruzes, SP
>
> **Alvo:** Mid-Level Full Stack Developer · ODEEN · 2025–Present
> *Security monitoring platform used by operations teams in real time.*
> *Moved from front-end to owning end-to-end features across a NestJS API and a
> PostgreSQL schema. Led the migration of X, which cut Y.*

A segunda versão responde "o que essa pessoa sabe fazer?". A primeira não.

### Artigo — `content/writing/<slug>.mdx`

Sem estrutura obrigatória. Diretrizes:

- 800 a 1500 palavras. Suficiente para ter substância, curto o bastante para ser lido.
- Abra com o problema concreto, não com contexto histórico.
- Código real, executável, que ilustre o ponto.
- Feche com o que o leitor deve fazer diferente.
- Um artigo com uma tese defendida vale mais que um tutorial que já existe em dez lugares.

---

## Projetos-vitrine

Decisão D2: o acervo é pequeno e precisa ser construído. **Dois projetos bem feitos, não
cinco medianos.**

### Critérios

Um bom projeto-vitrine para vaga full stack TypeScript remota:

| Critério | Por quê |
|---|---|
| Resolve um problema real, de preferência seu | Motivação genuína aparece na escrita |
| Exige **decisão de arquitetura**, não só CRUD | É o que o case study vai discutir |
| Tem deploy público e funcionando | Recrutador clica. Se cair, é pior que não existir. |
| Código aberto, com README de qualidade | O dev do time vai olhar o repositório |
| Tem alguma dificuldade real | Concorrência, cache, tempo real, migração de dados, autenticação, processamento em background |
| Terminável em 3 a 6 semanas em paralelo ao trabalho | Projeto ambicioso demais nunca é lançado |

### Antipadrões

Evitar: todo list, clone de rede social, app de clima, calculadora, clone de e-commerce
sem pagamento real, "dashboard" com dados falsos. Não porque sejam ruins de construir —
porque não diferenciam.

### Direções sugeridas

Sugestões, não prescrição. A escolha final é do dono, e um problema pessoal genuíno
vence qualquer sugestão desta lista.

1. **Ferramenta que resolve um incômodo seu.** A melhor categoria. Se você já sofreu com
   algo repetidamente, provavelmente outros também.
2. **Serviço com concorrência real** — fila de jobs, processamento assíncrono, webhooks
   com retry e idempotência. Demonstra pensamento de back-end de verdade e rende um
   case study forte sobre garantias de entrega.
3. **Aplicação com dados em tempo real** — WebSocket ou SSE, estado otimista, resolução
   de conflito. Rende discussão sobre trade-off de consistência.
4. **Projeto que aproveita seu background em RH.** Ninguém mais tem essa combinação.
   Uma ferramenta de domínio de RH construída por quem foi analista de RH é uma história
   que só você pode contar.

### Checklist de conclusão

Um projeto-vitrine está pronto quando:

- [ ] Roda em produção numa URL pública estável
- [ ] README explica o que é, por que existe e como rodar localmente
- [ ] Tem tratamento de erro — não quebra na tela branca
- [ ] É usável no celular
- [ ] Tem teste onde teste importa
- [ ] Tem um case study escrito em `content/work/`
- [ ] O código não tem segredo commitado nem `console.log` esquecido

## Sequência de produção sugerida

| Ordem | Item | Esforço | Desbloqueia |
|---|---|---|---|
| 1 | Bloco 1 do briefing | 15 min | Hero — a primeira dobra deixa de ser genérica |
| 2 | Bloco 2 do briefing | 90 min | Timeline de experiência com substância. **Maior retorno de todo o projeto.** |
| 3 | Blocos 3 e 4 | 50 min | `/about` e seleção de case studies |
| 4 | Case study do melhor item existente | 3–4 h | Rota `/work` passa a existir |
| 5 | Artigo 1 | 4–6 h | Rota `/writing` passa a existir |
| 6 | Projeto-vitrine 1 + case study | 3–6 semanas | Prova técnica de peso |
| 7 | Artigo 2 | 4–6 h | Consistência de escrita |
| 8 | Projeto-vitrine 2 + case study | 3–6 semanas | Profundidade |

Os itens 1 a 3 custam menos de três horas somadas e resolvem os problemas P0-4 e P0-5,
que são os que mais custam oportunidade hoje. **Comece por eles.**

O site vai ao ar depois do item 3, com `/` e `/about` apenas — e já será
substancialmente melhor que o atual. As demais rotas surgem conforme o conteúdo existe
(ver a regra de renderização condicional em `02-arquitetura-informacao.md`).
