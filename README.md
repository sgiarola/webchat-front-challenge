# Webchat Front

# Overview

Esta aplicação front-end foi criada para auxílio na utilização do back-end (sgiarola/webchat-challenge), expondo suas funcionalidades. A estrutura tem como base a utilização do framework AngularJS, envolvendo principalmente:

- Agular Websocket
- Angular Cookies
- Angular Resource
- Angular Route
- Bootstrap

Assim como tecnologias que ajudam no build e gestão de dependências como Grunt e Bower.

# Configuração

Para configurar este ambiente deve-se fazer um clone do projeto no mesmo host que o back-end foi instalado e rodar os seguintes comandos:

- bower install
- npm install
- grunt serve

Após subir o ambiente a aplicação abrirá em localhost:9000.
A conversa tanto via rest quanto websocket é na porta 8080.

# Utilização

Na página inicial será disponibilizada a possibilidade de login, mas para primeiro acesso existe um link para cadastramento do usuário, o qual permite um auto-login após submissão do formulário.
A primeira tela pós login é a de lista, que mostrará tanto a lista de amigos (os que estão online e offline) com seus respectivos status ao lado, quanto a lista de mensagens que foram recebidas enquanto estava offline. Nesta tela também tem um link que redireciona para tela de adicionar amigos pelo username.
Ao clicar em um amigo você é redirecionado para tela de chat onde mensagens podem ser trocadas em tempo real. Aqueles amigos offline também podem ser selecionadas e suas mensagens serão salvas em banco de dados (Embedded MongoDB - Em memória) para posteriormente poderem ser lidas.
