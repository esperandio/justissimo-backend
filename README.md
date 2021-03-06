# justissimo-backend

[![Build App on Heroku](https://github.com/esperandio/justissimo-backend/actions/workflows/build-heroku-app.yml/badge.svg)](https://github.com/esperandio/justissimo-backend/actions/workflows/build-heroku-app.yml)

comandos para iniciar projeto: prompt - backend

## Parte 1

Instalar gerenciador de depêndencias yarn:

```
npm install --global yarn
```

iniciar uma aplicação node:

```
yarn init -y 
```

## Parte 2

Instalando as dependencias

```
-yarn add express 
```

```
-yarn add -D @types/express
```

Estamos instalando o Express e as definições de typos do Express porque nosso projeto será feito em typescript e requer typagem.

Instalando o TypeScript como dependência de desenvolvimento:

```
yarn add -D typescript
```

## Criar arquivo de configuração que irá converter o fonte typescript em Javascript no momento em que compilarmos o projeto (buildar):

O comando abaixo cria um arquivo .json de configuração chamado: tsconfig.json:

```
yarn tsc --init
```

## Criar as pastas principais do projeto, onde 'dist' será o nosso código compilado em JavaScript e a pasta 'scr' será a pasta principal da aplicação.


O comando abaixo é responsavel por compilar o fonte typescript em javascript:

```
yarn tsc
```

## Instalar ferramenta de ORM prisma:

```
yarn add prisma --dev
```

```
yarn add @prisma/client
```

Criar configuração do prisma, o comando abaixo cria a pasta Prisma na raíz do projeto e o arquivo .env que contém a conexão com o banco Postgres:

```
npx prisma init
```

Após definido as tabelas do banco de dados (models) o comando abaixo cria uma migração ou seja cria todos os models no banco de dados:

```
npx prisma migrate dev --name create_table_teste
```

Após as migrations estiverem definidas em um formato final o comando abaixo é responsável por criar todas as tabelas definidas no banco de dados:

```
yarn prisma migrate deploy
```

Se houver erro em alguma tabela
```
yarn prisma generate
```

Biblioteca Bcrypt

```
yarn add bcryptjs
```

Tipagem bcrypt

```
yarn add @types/bcryptjs -D
```
Instalar as dependencias do JWT e tipagem de desenvolvimento
```
yarn add jsonwebtoken
```
```
yarn add @types/jsonwebtoken -D
```
Instalar as dependencias do NodeMailer e sua tipagem de desenvolvimento:
```
yarn add nodemailer
```
```
yarn add @types/nodemailer -D
```

## Docker

### Comando para criar container docker rodando node

```
docker run --rm -i --tty --volume $PWD:/app -p 3333:3333 -w /app node bash
```
