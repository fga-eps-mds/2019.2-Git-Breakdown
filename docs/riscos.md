---
id: risco
title: Plano Gerenciamento de Riscos
sidebar_label: Gerenciamento de riscos 
---

# Plano de Gerenciamento de Riscos

## Histórico de revisões

| Data | Autor | Descrição | Versão |
|--|--|--|--|
| 27/08 | Lucas Midlhey | Estrutura Inicial | 1.0 |
| 28/08 | Lucas Midlhey | Levantamento de categoria de riscos e análise quantitativa | 1.1 |
| 28/08 | Lucas Midlhey | Riscos Levantados | 1.2 |

## Introdução

O plano de gerenciamento de riscos busca encontrar possíveis riscos para se preparar para um possível impacto futuro no projeto.

O mais importante é que todos os riscos sejam identificados, e para aqueles que possam causar grandes consequências (negativas) aos objetivos do projeto, sempre exista uma ação de resposta apropriada que reduza ou elimine o impacto do risco caso ele ocorra ou possa ocorrer. Também devemos nos preocupar aqui em aumentar o impacto ou probabilidade de um risco positivo e da mesma forma, ter uma ação de resposta.

## Estrutura Analítica de Riscos

A EAR busca facilitar a identificação de riscos em projetos, pois serve como guia para análise do contexto, da documentação e também para questionamento das partes interessadas.[1]

## Categoria de Riscos

  ### 4.1.Riscos Técnicos


-   Segurança da Informação: Quais tipos de dados irão trafegar, confidencialidade, tipo de acesso e proteção

-   Domínio da tecnologia: A equipe de desenvolvimento entende sobre o que é necessário trabalhar e os impactos de baixo conhecimento

-   Framework não existente: A ferramenta que foi utilizada deve atender as necessidades da equipe

-   Integrações e Interfaces: A comunicação entre partes do sistema

-   Infraestrutura: necessidade de onde o software vai se estabelecer e o material necessário para sua produção

-   Operação: O sistema ter suporte para todas as áreas de trabalho




### 4.2.Riscos de qualidade


-   Funcionalidade: Garantir que os requisitos foram atendidos, e averiguar se realmente atende a necessidade e como fornecerá os resultados precisos

-   Confiabilidade: Maturação do software, atendendo o ciclo de desenvolvimento

-   Usabilidade: Atender as necessidades do usuário para melhor uso do software

-   Eficiência: Garantir que o software responda no tempo adequado

-   Manutenibilidade: Garantir que o software tenha padrões para o processo de manutenção ocorra menos desvios

-   Portabilidade: Garantir que o software trabalhe nas plataformas e sistemas operacionais desejados.




### 4.3.Riscos Organizacionais


-   Estratégia: Garantir que o projeto atende as ideias do escopo e que não tenha muita perda nos processos em caso de mudança

-   Financeiro: Garantir que haja infraestrutura inicial para produção do projeto

-   Estrutura: Garantir adequidade ao cliente, no caso a ideia do software

-   Prioridade de projeto: Garantir que o desenvolvimento não tenha grandes perdas de produção em eventuais mudanças

-   Processos adequados: Garantir política de controle para os gerenciamentos do processo




### 4.4.Riscos Externos


-   Condições de trabalho: Garantir que as outras atividades da equipe não atrapalhe o desenvolvimento do projeto

-   Fatores Pessoais: Garantir que a equipe se adeque a eventuais faltas de algum membro




### 4.5.Riscos de gerenciamento do projeto


-   Mudança de Escopo: Garantir que eventuais mudanças não acarretem em grandes atrasos e grandes perdas no trabalho já desenvolvido

-   Prazo: Garantir que o plano de tempo seja atendido analisada com a margem de erro existente

-   Eventuais gastos: Garantir que caso haja uma necessidade de gastos, tenhamos uma maneira de reverter

-   Inadequação dos recursos humanos: Garantir que tenha disponível treinamentos para que a equipe esteja salientada do projeto.

-   Stakeholders: Garantir que a parte interessada esteja bem identificada.

-   Comunicação: Garantir que o plano de comunicação esteja bem empregado no projeto


## Análise Quantitativa de Riscos

### Impacto

Para se quantificar o impacto do risco no projeto o custo, o tempo, o escopo e a qualidade devem ser levados em conta.

A tabela abaixo deve ser usada como referência:

| Impacto | Intervalo | Descrição | Representação |
|--|--|--|--|
|**Muito baixo** | menor que 20% | Impacto pouco expressivo no desenvolvimento do projeto | 1 |
| **Baixo** | de 21% a 40% | Possui certo impacto porém é facilmente recuperado | 2 |
| **Médio** | de 41% a 60% | Possui certo impacto porém é facilmente recuperado | 3 |
| **Alto** | de 61% a 80% | Há grande impacto no desenvolvimento do projeto | 4 |
| **Muito Alto** | Acima de 80% | O impacto inviabiliza o projeto | 5 |

### Probabilidade

Para quantificar um risco em relação a sua probabilidade de ocorrência a tabela a seguir deve ser utilizada:

| Probabilidde | Intervalo | Representação |
|--|--|--|
| Muito Baixa | menor que 10% | ' |
| Baixa | de 11% a 30% | 2 |
| Média | de 31% a 50% | 3 |
| Alta | de 51% a 60% | 4 |
| Muito Alta | maior de 60% | 5 |


### Prioridade

Para definir a prioridade do risco deve-se relacionar a Probabilidade com o Impacto por meio da matriz Probabilidade x Impacto a seguir:

| Probabilidade / Impacto | Muito Baixa | Baixa | Média | Alta | Muito Alta |
|--|--|--|--|--|--|
| Muito baixo | 1 | 2 | 3 | 4 | 5 |
| Baixo | 2 | 4 |6  | 8 | 10 |
| Médio | 3 | 6 | 9 | 12 | 15 |
|Alto| 4 | 8 | 12 | 16 | 20 |
| Muito Alto | 5 | 10 | 15 | 20 | 25 |

O valor da prioridade definido na matriz Probabilidade x Impacto deve ser traduzido, utilizando a seguinte tabela:

| Prioridade | Interva |
|--|--|
| Muito Baixa | 1~4 |
| Baixa | 5~9 |
| Média | 10~14 |
| Alta | 15~19 |
| Muito Alta | 20~25 |


## Riscos Levantados

| Riscos | Descrição | Categoria EAR | Probabilidade | Impacto | Ação | Prioridade |
|--|--|--|--|--|--|--|
| R01 | Dificuldade com as tecnologias | Técnico - Tecnologia | Alta | Muito Alto | Estudo e pareamentos efetivos | 20 |
| R02 | Redução dos membros da equipe | Externo - Fatores pessoais | Baixa | Muito Alto | Comunicação efetiva, motivação, e redistribuição das tarefas | 10 |
| R03 | Mudança de escopo | Gerenciamento do projeto - Planejamento | Alta | Médio | Redefinir o escopo e redistribuir as novas tarefas | 12 |
| R04 | Falta de comunicação | Organizacionais - Estratégias | Média | Médio | Usar meios de comunicações comuns entre os membros | 9 |
| R05 | Perda de equipamentos da equipe | Externo - Fatores pessoais | Muito Baixa | Muito Alto | Definir pareamentos que permitam ocorrer presencialmente | 5 |
| R06 | Alteração nas datas da disciplina | Externo - Ambiente acadêmico | Média | Alto | Redefinir datas das entregas | 12 |
| R07 | Entregas atrasadas | Gerenciamento do projeto - Planejamento | Alta | Alto | Definição de uma nova data para a entrega e se necessário um novo pareamento | 16 |
| R08 | Dependência das atividades | Gerenciamento do projeto - Planejamento | Muito Baixa | Alto | Redefinição das tarefas a fim de acabar com a dependência | 4 |
| R09 | Qualidade do projeto não atender às expectativas do Product Owner | Externo - "Cliente" | Média | Alta | Acompanhamento do desenvolvimento junto ao Product Owner | 12 |
| R10 | Fácil adaptação a tecnologia | Técnico - Tecnologia | Baixa | Médio | Possibilidade de adição de novas features | 6 |
| R11 | Falta nas reuniões | Externo- Condições de trabalho | Baixa | Alto | Acompanhar o motivo da falta e buscar recuperar o atraso | 8 |
| R12 | Pareamento não efetivos | Externo- Fatores Pessoais | Médio | Alto | Tentar aumentar a comunicação entre os membros, se possível alguém da equipe de EPS monitorar o pareamento, e se extremamente necessário realocar membros em outras atividades. | 12 |
| R13 | Conflito de entregas em outras disciplinas | Externo- Fatores pessoais | Muito Alto | Médio | Produzir backlog de sprints reduzidos | 15 |
