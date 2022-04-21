# justissimo-backend


comandos para iniciar projeto: prompt - backend

#Parte 1
Instalar gerenciador de depêndencias yarn:
-npm install --global yarn

iniciar uma aplicação node:
-yarn init -y 

#Parte 2
Instalando as dependencias

-yarn add express <br>
-yarn add -D @types/express

Estamos instalando o Express e as definições de typos do Express porque nosso projeto será feito em typescript e requer
typagem.

Instalando o TypeScript como dependência de desenvolvimento:<br>
-yarn add -D typescript

#Criar arquivo de configuração que irá converter o fonte typescript em Javascript no momento em que compilarmos o projeto (buildar):

O comando abaixo cria um arquivo .json de configuração chamado: tsconfig.json:<br>
-yarn tsc --init

#Criar as pastas principais do projeto, onde 'dist' será o nosso código compilado em JavaScript e a pasta 'scr' será a pasta principal da aplicação.
