# COUNCIL REVIEW — SpotVibe
**Data:** 2026-05-03

---

## 1. Veredito em 3 linhas

O projeto não deve continuar como está. O modelo financeiro está errado por uma ordem de magnitude (R$17/mês real vs R$336 projetado), há uma vulnerabilidade de segurança ativa no código em produção, e a premissa central — que o gargalo é descoberta geográfica — contradiz os próprios dados da pesquisa (59% descobre por amigos, não por mapa). Pivotar o produto e corrigir os bugs são pré-requisitos antes de qualquer outro passo.

---

## 2. Três problemas terminais (por urgência)

### Problema 1 — Segurança: banco de dados exposto hoje
**O que é:** SQL injection ativa em `backend/src/modules/events/events.service.ts:39`. A variável `category` é interpolada diretamente na string SQL via `$queryRawUnsafe`. Qualquer requisição com `category=funk' OR '1'='1` expõe a base inteira. Agravante: `backend/src/modules/admin/admin.routes.ts` expõe `/api/admin/stats`, `/api/admin/clicks` e `/api/admin/events/popular` sem nenhum middleware de autenticação — qualquer pessoa com a URL lê os dados de analytics do app.
**Quem apontou:** Cetico e Pragmatico, convergencia total.
**Acao imediata:** Esta semana. Ver secao 3.

### Problema 2 — Financeiro: o modelo nao fecha, nem perto
**O que e:** O modelo projetado usa CTR de 12%, comissao de 2-3% e conversao clique->compra de 25%. Os numeros reais de mercado sao CTR 3-5%, comissao 0,5-1% (sem volume para negociar com Sympla/Ingresse) e conversao 3-8%. Receita Fase 1 corrigida: ~R$17/mês com 2.000 MAU, contra infra minima de R$300-500/mês. LTV/CAC calculado resulta em 1:137 — inviavel por definicao. Com R$50K de runway e burn real, voce tem ~2 meses.
**Quem apontou:** Quantitativo (convergencia com Cetico).
**Acao imediata:** Recalcular o modelo financeiro com as metricas reais antes de gastar mais com aquisicao. O modelo atual e ficção.

### Problema 3 — Produto: voce esta construindo pra um problema que os dados nao confirmam
**O que e:** A tese "gargalo e descoberta geografica" e refutada pelos proprios dados: 59% ja descobre festas por amigos (canal social, nao geografico). O usuario nao abre o mapa — ele pergunta no grupo do WhatsApp. O Vibometro so faz sentido dentro da festa (pós-decisão), nao antes. O mapa vazio com 18 eventos no Rio inteiro nao tem utilidade — o usuario vai voltar pro Instagram em 30 segundos. Tres revisores (Primeiros Principios, Empatico, Cetico) chegaram a mesma conclusao por caminhos diferentes.
**Acao imediata:** Antes de construir mais qualquer coisa, validar se usuarios reabrem o app sem ser empurrados. Se retencao semana-2 e abaixo de 20%, o produto atual esta errado na raiz.

---

## 3. Tres correcoes rapidas — esta semana

**Correcao 1 — SQL injection**
Arquivo: `C:\ProjetoE\Spotvibe\backend\src\modules\events\events.service.ts`, linha 39.
Substituir `$queryRawUnsafe` por `$queryRaw` com template literal do Prisma (Prisma.sql``), que parametriza automaticamente. Para o filtro de `category`, usar um enum validado no nivel do controller antes de chegar ao service — nunca interpolar string de entrada do usuario em SQL.

**Correcao 2 — Admin sem autenticacao**
Arquivo: `C:\ProjetoE\Spotvibe\backend\src\modules\admin\admin.routes.ts`, linhas 6-8.
Adicionar middleware de autenticacao antes de todos os handlers. No minimo: verificar um header `x-admin-key` contra uma variavel de ambiente `ADMIN_SECRET`. Nao e autenticacao robusta, mas fecha o endpoint publico hoje. JWT com role admin e a solucao correta a seguir.

**Correcao 3 — JWT de 30 dias e Zod sem limite**
Reduzir expiracao do JWT de 30 para 7 dias (limita janela de tokens roubados). Adicionar `z.string().max(500)` no campo `description` dos eventos — sem isso, qualquer usuario autenticado pode enviar payloads arbitrariamente grandes. Sao 5 linhas de codigo.

---

## 4. Dois movimentos estrategicos antes de queimar mais runway

### Movimento 1 — Ligar pra Sympla antes de construir Fase 2
A transicao afiliado→venda direta cria conflito direto com Sympla. Eles podem cortar o programa de afiliados no momento em que voce começa a vender ingressos proprios — e voce perde a unica fonte de receita da Fase 1 antes de ter a da Fase 2. O Estrategico e o Cetico convergiram aqui. A acao e uma call com o time de parcerias da Sympla para mapear se existe um modelo de co-existencia (white-label, revenue share maior, API licenciada). Se a resposta for nao, a Fase 2 como desenhada e suicida. Se a resposta for sim, voce tem um hedge real.

### Movimento 2 — Testar dado de valor B2B antes de escalar B2C
O Expansionista apontou que dados comportamentais de usuarios (quais festas geram interesse, por zona, por perfil demografico) valem R$100-200k/mês para Heineken, Ambev, Red Bull e Uber — 10 a 100 vezes mais que comissao de afiliado. Voce nao precisa de 10.000 MAU para testar isso: com 500 usuarios e dados de clique por categoria e bairro, e possivel apresentar um deck para uma marca e cobrar R$3-5k por relatorio mensal. Isso financia o runway enquanto o produto B2C amadurece. A acao e: montar um relatorio de dados dos proximos 60 dias e apresentar para uma marca antes de gastar com aquisicao de usuarios.

---

## 5. Veredito do MVP atual

| Componente | Decisao | Justificativa |
|---|---|---|
| SQL injection / admin sem auth | Corrigir agora | Vulnerabilidade ativa, nao ha debate |
| Mapa como tela principal | Pivotar para feed | Mapa vazio mata retencao; feed e mais barato de popular |
| Vibometro em tempo real | Manter como experimento | Unico diferencial real, mas validar com densidade minima de 10 users/evento |
| PostGIS + Redis | Simplificar | Schema usa Float; Haversine puro funciona para MVP. Redis e prematura optimization |
| Push notifications agendadas | Documentar limitacao | expo-notifications nao dispara com app fechado; usuarios vao achar que e bug |
| Checkout in-app (Fase 2) | Postergar ate validar Sympla | Construir isso sem acordo com Sympla e construir sobre areia |
| Afiliado como receita Fase 1 | Manter com expectativa correta | R$17-50/mes, nao R$336. Serve para provar mecanica, nao para pagar infra |
| WhatsApp como canal social | Manter | Ja e onde o usuario vive; nao brigar com comportamento existente |
| Universidades como canal de aquisicao | Adicionar | CAC proximo de zero, concentracao geografica, efeito rede natural |
| Testes automatizados | Adicionar antes do proximo sprint | Sprints 0-3 marcados como concluidos sem cobertura de teste nenhuma |

---

## 6. A pergunta que decide o destino do projeto

**Dos usuarios que instalaram o app ate hoje, quantos abriram espontaneamente (sem push notification) mais de uma vez na mesma semana — e por que abriram?**

Se voce nao sabe responder isso com dado, nao sabe se o produto tem valor. Nao e NPS, nao e rating na loja, nao e feedback qualitativo. E comportamento real. Se a retencao semana-2 espontanea for abaixo de 20%, o produto atual resolve um problema que os usuarios nao tem com urgencia suficiente para criar habito. Tudo o mais — mapa, vibometro, push, afiliado — e secundario ate essa pergunta ter resposta.

---

## Mudancas aplicadas em relacao as analises originais

- **Financeiro (Quantitativo):** Incorporado integralmente. Os numeros corretos sao os dele, nao os do modelo original.
- **Segurança (Cetico + Pragmatico):** Ambos concordaram; correcoes detalhadas com arquivo e linha.
- **Premissa de produto (Primeiros Principios + Empatico):** Convergencia real; o veredito de "pivotar feed vs mapa" reflete os dois.
- **B2B Data (Expansionista):** Incorporado como movimento estrategico prioritario porque o argumento e solido e contrabalanca o problema financeiro de curto prazo.
- **Sympla hedge (Estrategico):** Incorporado como urgente porque o risco de corte do afiliado e real e imediato.

## Criticas descartadas

- **Criativo — Bluetooth offline-first:** Interessante tecnicamente, irrelevante para os problemas atuais. O projeto nao tem problema de infraestrutura de rede; tem problema de retencao e modelo financeiro. Descartado como distração.
- **Expansionista — turismo Carnaval/Réveillon e eventos corporativos:** Oportunidades reais, mas prematuras. Voce nao tem produto com retencao provada para o publico primario; escalar para turistas e corporativos antes disso e dispersar o foco. Descartado por timing.
- **Criativo — Vibometro anonimo sem login (Waze de festa):** A analogia e boa, mas o argumento ignora que o Waze so funciona com densidade geografica alta. O problema de densidade que o Cetico e o Estrategico apontaram se aplica aqui com mais forca. Descartado por mesma razao do problema terminal 3.
- **Lock-in geografico como ameaça terminal (Estrategico):** O argumento de cap de valuation de R$2-5M e valido para fundraising venture, nao para um projeto que ainda nao provou retencao basica. E um problema de fase 3, nao de hoje. Descartado como prematura para o estagio atual.
