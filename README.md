<span align="center">

<!-- ## <img src="https://raw.githubusercontent.com/iampavangandhi/iampavangandhi/master/gifs/Hi.gif" width="30px"> Olá seja bem-vindo(a)!</h2> -->
## <h2> Olá seja bem-vindo(a)!</h2>
</span>

<p align="center">
  Sou <strong>Engenheiro de Software</strong> e <strong>Engenheiro Civil</strong> com Pós <strong> Graduação em Empreendedorismo e Novas Tecnologias</strong>.<br />
Criei essa <strong>API Rest</strong> 
rapidamente, gostaria de ter mais tempo para fazer alguns ajustes e criar mais testes unitário. Durante a semana deixarei 100%</strong>.
</p>
<br>

<p align="center">
  Utilizei: <strong>MySql, NodeJS e JavaScript.</strong>
</p>

<p align="center">
  frameworks: <strong>bcryptjs, cors, dotenv, express, express-validator, Jest, jsonwebtoken e mysql2</strong>
</p>

## Tecnologias & Ferramentas

<p align="center">

<img src="https://img.shields.io/badge/javascript-%23F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black" height="25"/>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="25"/>
<img src="https://img.shields.io/badge/-npm-CB3837?style=flat-square&logo=npm" height="25"/>
<img src="https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=github" height="25"/>
<img src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white" height="25"/>

</p>
Para acessar a AIP, deve ser chamada a rota: [https://exameflavio.herokuapp.com/oapi/authenticate], usando o verbo POST, passando como parametro { "user": "110677", "password": "110677" },
será retornado um Token.
<br>
<br>
Atráves da rota POST [https://exameflavio.herokuapp.com/api/resultInsert], juntamente com o token gerado, passamos o [Authorization Bearer: token] 
podemos inserir uma amostra de exame no banco de dados,
e teremos como retorno um JSON com o a validação dessa amostra, exemplo:
<br>
"maiorQueReferencia": true <br>
"valor": 0.678 <br>
"positivo": false <br>
<br>
<br>
<code>
[
    "99999999",
    {
        "cocaina": {
            "maiorQueReferencia": true,
            "valor": 0.678,
            "positivo": false
        },
        "anfetamina": {
            "maiorQueReferencia": false,
            "valor": 0.1,
            "positivo": false
        },
        "metanfetamina": {
            "maiorQueReferencia": false,
            "valor": 0.1,
            "positivo": false
        },
        "mda": {
            "maiorQueReferencia": false,
            "valor": 0.1,
            "positivo": false
        },
        "mdma": {
            "maiorQueReferencia": false,
            "valor": 0,
            "positivo": false
        },
        "thc": {
            "maiorQueReferencia": true,
            "valor": 0.1,
            "positivo": true
        },
        "morfina": {
            "maiorQueReferencia": false,
            "valor": 0.1,
            "positivo": false
        },
        "codeina": {
            "maiorQueReferencia": false,
            "valor": 0.1,
            "positivo": false
        },
        "heroina": {
            "maiorQueReferencia": false,
            "valor": 0.1,
            "positivo": false
        },
        "benzoilecgonina": {
            "maiorQueReferencia": false,
            "valor": 0,
            "positivo": false
        },
        "cocaetileno": {
            "maiorQueReferencia": false,
            "valor": 0,
            "positivo": false
        },
        "norcocaina": {
            "maiorQueReferencia": false,
            "valor": 0,
            "positivo": false
        }
    }
]
</code>

<br>
<br>
<br>
<br>

Atráves da rota POST [https://exameflavio.herokuapp.com/api/listResult], juntamente com o token gerado, passamos o [Authorization Bearer: token] <br>
com o parametro [codigo_amostra: "000"] a API retorna o resultado dessa amostra. <br>  Se não passarmos parametros, a API retorna uma lista TOP 100 das amostras cadastradas.

<p align = "center">

</p>

