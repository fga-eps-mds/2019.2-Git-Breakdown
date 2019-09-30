# Política de Branches

## Histórico de Versões

 |Data| Autor |Descrição| Versão|
 |--|--|--|--|
 | 30/08/2019| Mateus Oliveira  | Criação do documento| 1 |

## Fluxo de Branches

Para garantir um fluxo de trabalho contínuo e de forma padronizada possibilitando o rastreamento das funcionalidades desenvolvidas e facilitando a implementação de  _pipelines_  de integração(CI) e entrega(CD) contínua, será utilizada a estratégia de  **Git Flow**  com a seguinte exceção: 
- Não será utilizada o fluxo de branch para  `hotfix`, `release` ou `docs`.

Os conceitos chave para implementação da estratégia de  **Git Flow**  que serão utilizadas pelo grupo são:

`Main Branches`

`Feature Branch`

`Pull Request`

Exemplo do fluxo de branches:

![](https://i.imgur.com/hUZvZ7p.png)

### Branches Principais

Essencialmente o repositório deve possuir duas branches principais: `master` e `develop`

A branch  `master`  possui sempre a versão mais estável da aplicação, ou seja a versão que deve estar pronta para produção.

Já a branch  `develop`  possui a última versão desenvolvida da aplicação. Essa branch pode ser considerada a branch de integração, onde as diferentes funcionalidades desenvolvidas vão ser unidas em uma nova versão do sistema.

### Feature Branch

Consiste na criação de uma nova branch a partir da branch com a última versão da aplicação sempre que for iniciado o trabalho em uma nova funcionalidade ou história de usuário.

## Pull Request

Toda nova _feature_ desenvolvida deve ser integrada à branch `develop` por meio de um processo de **Pull Request**, que consiste em revisar o código a ser integrado, além de validar a integridade da nova funcionalidade utilizando das ferramentas de integração contínua.

Para publicar uma nova versão estável da aplicação na branch `master` é necessário realizar um **Pull Request** da branch `develop` para a `master`. Assim garantido a revisão da nova versão do código.

## Nomenclatura

Toda branch deve estar necessariamente estar relacionada a uma funcionalidade ou correção, logo a uma _Issue_. O nome da branch deve estar em INGLÊS seguindo o padrão:

- Para funcionalidades: `feat#NÚMERO_DA_ISSUE/descrição_curta`
    
- Para correções: `fix#NÚMERO_DA_ISSUE/descrição_curta`
    

Exemplo: `feat#24/easy_auth`
