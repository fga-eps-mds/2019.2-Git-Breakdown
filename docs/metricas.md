---
id: metricas
title: Métricas Coletadas
sidebar_label: Métricas
---

O plugin Git Breakdown é uma aplicação de análise de métricas para identificar o nível de atividade de produção dos diversos repositórios, trazendo informações detalhadas do quanto que cada desenvolvedor está contribuindo no repositório  

Foram escolhidas algumas métricas que são referências de atividade de um repositório. São essas métricas: 

1.  Issues
2.  Commits
3.  Branches     
4.  PR's

## Página de contribuição geral
Será feita uma análise de forma geral do repositório coletando informações de issues, branches e pull requests. Essa análise será responsável por informar o quão ativo o repositório se encontra. Após a coleta de informações será feito cálculos de comparações entre períodos.

- Um ranking será mostrado com um cálculo de score das métricas de cada desenvolvedor. Trazendo uma análise de quem está contribuindo mais no repositório

## Ranking de contribuição

O Ranking é uma junção dos scores de cada desenvolvedor. O score são métricas coletadas onde há a aplicação de pesos que definirá as métricas mais importantes para o cálculo desse score

## Página de perfil do desenvolvedor
Será levantados os detalhes das métricas referentes a cada desenvolvedor e o que ajudou no cáculo do score e consequentemente na posição no ranking.
