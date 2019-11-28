---
id: readme
title: Como Contribuir
sidebar_label: Como Contribuir
---

## Como Contribuir

### 1. Orientações

* Se você for um colaborador externo, dê um fork no projeto.

* A criação de issues deve seguir a [política de issues](https://fga-eps-mds.github.io/2019.2-Git-Breakdown/issues/).

* A criação de branches deve seguir a [política de branches](https://fga-eps-mds.github.io/2019.2-Git-Breakdown/branches/).

* No desenvolvimento, usar nossa [política de commits](https://fga-eps-mds.github.io/2019.2-Git-Breakdown/commits/).

* Pull requests só serão aceitos se estiverem passando na integração.



### 2. Política de Branches deste repositorio.



### **Master**

A master será nossa branch de produção, ou seja, nela estará a versão estável do projeto. E por questões de segurança ela será bloqueada para commits e push.A interação com a master vai se dá através da de Pull requests que virão das branch de documentos.



### **Branches de documentos**

As branches de documentos são criadas a partir da master, e serve para criação ou refatoração de documentos seguindo a issue do mesmo. No final essa branch deve ser enviada para a master, através de um pull request.

## Instalação 

### Instalando do google chrome

Página do Git Breakdown na [Chrome Store](https://chrome.google.com/webstore/detail/gitbreakdown/fihbcllomkpnojkpncebdabiaonfpjea?hl=pt-BR)

### Rodando Localmente

É preciso ter algumas dependências para rodar a aplicação localmente.

Primeiro você precisa ter o [Docker](https://docs.docker.com/install/) e o [Docker-Compose](https://docs.docker.com/compose/install/) instalado na sua máquina.

#### Rodando Add-on

Downloading

```bash
cd ~/your/directory/
git clone https://github.com/fga-eps-mds/2019.2-Git-Breakdown.git
cd 2019.2-2019.2-Git-Breakdown
```

Rode os seguintes comandos no terminal

```bash
sudo docker-compose build --no-cache
docker-compose up
```

Vá ate a configurações de [extensões do chrome](chrome://extensions/)

<img src="https://i.ibb.co/3SSppw5/Captura-de-Tela-20191127210925.png" alt="tela-extensão-chrome">

e ative o **Modo desenvolvedor**

vá ate **Carregar sem compacttação** 
e adicione a pasta **extension** do diretório raíz do projeto.

A extensão estará fuincionando na aba do github.