---
id: readme
title: Readme
sidebar_label: Readme 
---

## Instalação 

### Instalando do google chrome

Página do Git Breakdown na [Chrome Store](https://chrome.google.com/webstore/detail/gitbreakdown/fihbcllomkpnojkpncebdabiaonfpjea?hl=pt-BR)

### Rodando Localmente

É preciso ter algumas dependências para rodar a aplicação localmente.

Primeiro você precisa ter o [Docker](https://docs.docker.com/install/) e o [Docker-Compose](https://docs.docker.com/compose/install/) instalado na sua máquina.

#### Rodando a aplicação

Downloading

```bash
cd ~/your/directory/
git clone https://github.com/fga-eps-mds/2019.2-Git-Breakdown.git
cd 2019.2-2019.2-Git-Breakdown
```

Vá ate a configurações de [extensões do chrome](chrome://extensions/)

<a href="https://ibb.co/JrrvvNW"><img src="https://i.ibb.co/3SSppw5/Captura-de-Tela-20191127210925.png" alt="Captura-de-Tela-20191127210925" border="0"></a>

There you go!

```bash
docker-compose build
docker-compose up
```

If everything was done right, you now have the HubCare running on your machine. Just navigate to `0.0.0.0:8000` and you should see something. There are services running on ports [8000..8003].

Test it on http://0.0.0.0:8000/hubcare_indicators/fga-eps-mds/2019.1-hubcare-api

**Obs:** If you ever need to change the values of `NAME` or `TOKEN`, rerun `docker-compose build`. Those variables are got in build time.

#### Running the Add-on

Downloading

```bash
cd ~/your/directory/
git clone https://github.com/fga-eps-mds/2019.1-hubcare-plugin.git
cd 2019.1-hubcare-plugin
```

Building and uping things:

```bash
docker-compose build
docker-compose up
```

This should be enough to turn the service on ( ͡° ͜ʖ ͡°).

Then, open Google Chrome on [chrome://extensions/](chrome://extensions/), activate `Developer mode` on top right corner.

![Developer Mode](docs/images/chromeext.png)

You now shoud see hubcare extension, just activate it.

Just go to some GitHub repo to see it working. I recommend [this one](https://github.com/fga-eps-mds/2019.1-hubcare-api), you can even give it a star! :wink:

#### Running the... Docs?

Okay, I undertand, you don't believe on internet info, wanna see it on your own machine, right?

There you go then

```bash
cd ~/your/directory/
git clone https://github.com/fga-eps-mds/2019.1-hubcare-docs.git
cd 2019.1-hubcare-docs
```

Yeah, now run the docs, girl! Run the docs, boy!

```bash
docker-compose up --build
```

Now, [localhost:8000](localhost:8000) should have a beautyful documentation page.

**Obs:** If you ever want to contribute to docs, make sure to check if the MKDocs is rendering as you wish with the proceed above.

## Deployment

It's set on [GitLab](https://gitlab.com/cjjcastro/2019-1-hubcare-api), so we can use GitLab CI.
