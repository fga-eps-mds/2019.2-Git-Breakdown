---
id: arquitetura
title: Documento de Arquitetura
sidebar_label: Documento de Arquitetura
---

## Histórico de versões

| Data | Versão | Descrição | Autor |
| --- | --- | --- | --- |
| 29/08/2019 | 0.1 | Estrutura inicial | Pedro Daniel |
| 06/09/2019 | 0.2 | Criando introdução e representação da arquitetura | Pedro Daniel |
| 07/09/2019 | 0.3 | Restrições de arquitetura e visão de implementação | Pedro Daia, João V. |
| 07/09/2019 | 0.4 | Implementação do diagrama de classes | Victor H. |
| 07/09/2019 | 1.0 | Criação da tabela de tecnologias e diagrama de pacotes | Paulo, Pedro Daniel |
| 10/09/2019 | 1.1 | Revisão e adaptação para markdown | Pedro Daniel, João V. |
| 25/09/2019 | 1.2 | Adicionando API Gateway e microsserviços | Pedro Daniel |
| 26/09/2019 | 1.3 | Revisando introdução e representação da arquitetura | Pedro Daniel |
| 28/09/2019 | 1.4 | Finalizando a revisão do documento | João V., Paulo H., Pedro Daia, Pedro Daniel, Victor H. |

---

## 1. Introdução
### 1.1. Finalidade

Este documento tem como objetivo descrever a arquitetura do plugin Git Breakdown. Ele apresenta as decisões arquiteturais para o projeto de forma objetiva e contém informações que serão utilizadas para os desenvolvedores e gestores compreenderem a arquitetura utilizada no desenvolvimento, o fluxo de informações e as tecnologias envolvidas no projeto.

### 1.2. Escopo

Este documento esclarece as decisões arquiteturais do plugin Git Breakdown, os seguintes tópicos serão descritos no documento: a representação da arquitetura, as metas e restrições da arquitetura e a visão lógica.

### 1.3. Definições, Acrônimos e Abreviações

- **API** - Application Programming Interface: conjunto de rotinas e padrões estabelecidos por um software para a utilização das suas funcionalidades por demais aplicativos que desejam utilizar seu serviço
- **API Gateway** - É uma interface que recebe as chamadas para seus sistemas internos, sendo uma grande porta de entrada.
- **Microsserviços** - Refere-se aos serviços individuais em uma arquitetura de microsserviços. Por sua vez, uma arquitetura de microsserviço é um estilo moderno de arquitetura para web services.
- **Arquitetura Serverless** - Refere-se a aplicativos que dependem significativamente de serviços de terceiros (conhecido como Backend como Serviço ou “BaaS”) ou no código personalizado que é executado em contêineres efêmeros (Função como Serviço ou “FaaS”).

### 1.4. Visão Geral

O documento detalha a arquitetura utilizada para o desenvolvimento do projeto. Para isso, é explicada a arquitetura individual dentro de cada tecnologia escolhida e como estas se encaixam no contexto. Depois da introdução de cada tecnologia, são descritas: as metas e as restrições dessa arquitetura, uma visão dos casos de uso do projeto e uma visão lógica de como os dados serão armazenados.

## 2.  Representação de Arquitetura
### 2.1. Node.js

O Node.js pode ser definido como um ambiente de execução _Javascript_ _server-side_, ou seja, com o Node.js é possível criar aplicações _Javascript_ para rodar como uma aplicação standalone em uma máquina, não dependendo de um _browser_ para a execução. Os principais motivos de sua adoção são a sua alta escalabilidade e seu notável suporte à assincronicidade. Além disso, sua arquitetura, flexibilidade e baixo custo, o tornam uma boa escolha para implementação de microsserviços e componentes da arquitetura _serverless_.

### 2.2. Express

O _Express_ é um _framework_ para aplicações web do Node.js, minimalista e flexível que fornece um conjunto robusto de recursos. Com uma infinidade de métodos utilitários HTTP e _middleware_ disponíveis, com o _Express_ é possível criar uma API robusta de forma rápida e com facilidade. O _Express_ fornece uma camada fina de recursos fundamentais para aplicações, sem obscurecer os recursos do Node.js.

### 2.3. Plugin Google Chrome

_Plugins_ para o _google_ _chrome_ são pequenos programas utilizados para customizar a experiência de um usuário ao utilizar o _browser_. São extensões que permitem a utilização de novas funcionalidades. Os _plugins_ são feitos em tecnologias web, como HTML, CSS e _JavaScript_. No Git Breakdown, o _plugin_ será responsável por trocar informações com o _backend_ e mostrá-las na página do GitHub acessada pelo usuário. Para isso, deve-se editar o conteúdo HTML presente na página, acrescentando as informações recebidas pelo backend. A arquitetura do _plugin_ é composta por 4 componentes: popup.html, popup.js, background.js e contentscript.js.

- **Popup.html** - janela feita em HTML que sobrepõe o conteúdo da página
- **Popup.js** - controla as funcionalidades da popup.html
- **Background.js** - script responsável pelos eventos que ocorrem na página e precisam ser observados pelo plugin. O módulo background deve ficar desabilitado quando não é utilizado, e carregado apenas quando necessário.
- **Contentscript.js** - responsável pela leitura e escrita em uma página web. Ele lê e modifica o DOM de páginas web acessadas pelo browser.

A imagem a seguir mostra a representação dessa arquitetura:

![alt text](https://developer.chrome.com/static/images/overview/messagingarc.png "Arquitetura de Plugin Google Chrome")
 

### 2.4. GitHub API v3

A API do GitHub é consumida pelo backend da extensão, os dados provenientes da API são processados de acordo com os critérios adotados, gerando as métricas desejadas que retornarão ao plugin do Google Chrome.

### 2.5. API Gateway e Microsserviços

A API _Gateway_ ficará responsável por fazer a mediação entre o frontend e os microsserviços, redirecionando as requisições para o microsserviço correspondente e retornando a respectiva resposta para a origem da requisição.

Será desenvolvido um microsserviço para cada métrica, são elas:
 - _commits_;
 - _issues_;
 - _pullrequests_;
 - _branches_.

### 2.6. Visão Geral da Arquitetura

<iframe frameborder="0" style="width:100%;height:450px;" src="https://www.draw.io/?lightbox=1&highlight=0000ff&layers=1&nav=1&title=vis%C3%A3o%20geral%20da%20arquitetura#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1-iZbdzQnqdeggyvf_r0IBU6btVb7TLN9%26export%3Ddownload"></iframe>

## 3. Metas e Restrições da Arquitetura

### 3.1. Tecnologias utilizadas para o desenvolvimento

| Tecnologias | Descrição |
| --- | --- |
| NodeJS | Utilizado no desenvolvimento do backend da aplicação |
| Express | Atua no desenvolvimento da API |
| JavaScript | Linguagem de desenvolvimento frontend |
| HTML/CSS | Alia-se ao desenvolvimento frontend junto com JavaScript |
| Web Extension | Biblioteca NodeJS que converte a estrutura node para arquitetura chrome |
| Google Chrome | Navegador padrão da aplicação |
| Docker | Utilizado para configurar o ambiente de desenvolvimento |

### 3.2. Restrições de arquitetura

- Depende de conexão com internet
- A extensão é restrita ao navegador Google Chrome
- Número de requisições feitas para a API do GitHub limitam-se a 50 por hora quando não autenticado, e a 5000 quando autenticado
- Extensão do chrome realiza requisições apenas do tipo HTTPS

## 4. Visão Lógica

### 4.1. Diagrama de Pacotes

<iframe frameborder="0" style="width:100%;height:400px;" src="https://www.draw.io/?lightbox=1&highlight=0000ff&layers=1&nav=1&title=diagrama_pacotes#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1lTElQYFR9i2iboMN7G_sRBQSBKthyDOC%26export%3Ddownload"></iframe>

## 5. Visão de implementação

### 5.1. Plugin Google Chrome

A extensão será desenvolvida utilizando Node.js, essa ferramenta facilita o processo de assincronicidade de execução, evitando conflitos ao utilizar  a mesma tecnologia tanto para o _frontend_ quanto para o _backend_.

Será utilizada a biblioteca Web Extension, que adapta a estrutura do Node.js para ser aplicável à estrutura do Chrome.

### 5.2. Express Framework

Será utilizado o _framework_ Express para a criação e desenvolvimento da API.

## 6. Referências Bibliográficas

1. Hubcare (acessado em 07/09/2019)

[https://cjjcastro.gitlab.io/2019-1-hubcare-docs/project/architecture-document](https://cjjcastro.gitlab.io/2019-1-hubcare-docs/project/architecture-document)

2. Google Chrome Developer (acessado em 07/09/2019)

[https://developer.chrome.com/extensions](https://developer.chrome.com/extensions)

3. Express Framework (acessado em 07/09/2019)

[https://expressjs.com/pt-br/](https://expressjs.com/pt-br/)