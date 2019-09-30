# Política de Commits

## Histórico de Versões

 |Data| Autor |Descrição| Versão|
 |--|--|--|--|
 | 30/08/2019| Mateus Oliveira  | Criação do documento| 1 |

## Princípios básicos

### 1 - Faça  _commits_  atômicos

Sempre dividir o trabalho em pequenos e significativos _commits_ fazendo com que cada _commit_ implemente apenas uma funcionalidade.

### 2 - Sempre escrever  _commits_ em **INGLÊS**

A fim de deixar o projeto mais acessível ao público global, o idioma padrão adotado tanto para o código quanto para tudo o que se relaciona diretamente ao mesmo é o inglês, logo as mensagens dos _commits_ devem estar completamente em inglês.

### 3 - Seguir regra 50/72

As mensagens devem possuir no máximo 50 caracteres, caso seja necessário uma mensagem melhor, escreva um resumo de até 50 caracteres, adicione uma linha em branco e descreva melhor o _commit_ em quantas linhas forem necessárias, porém cada linha deve respeitar o tamanho máximo de 72 caracteres. Caso seu _commit_ necessite mais espaço que isso ele não é atômico.

## Anatomia do Commit

A anatomia do commit deve seguir o seguinte padrão:

**Formato**:

```
<tipo>(#número da issue): assunto

<corpo>
..
```

### Assunto

-   Máximo de 50 caracteres
-   Tipo de escopo devem estar em letras minúsculas

Exemplo:

`feat(#35): add route /login`.

Os valores permitidos para o  `tipo`  são:

-   `feat`: nova funcionalidade
-   `style`: formatação geral no código
-   `refact`: refatoração de código
-   `test`: adicionar/refatorar testes
-   `fix`: correções
-   `docs`: relacionado a documentação

### Corpo

Se é necessário contextualizar o commit e explicar o porquê das mudanças, descreva o corpo do commit de acordo com o seguinte:

-   Deve conter o  `o que`  e o  `por que`  foi feito
-   Máximo de 72 caracteres por linha

Exemplo:

```
refactor(#25): change login method to oauth 

The previous login method was insecure due a new exploit discovered
```