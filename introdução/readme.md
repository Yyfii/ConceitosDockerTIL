# Primeiro container no docker:

---

utilizando a imagem: docker/hello-world.`

- docker `vendor(dono da imagem)`
- hello-world `imagem (conjunto de configurações necessárias para a criação de um setup(ambiente de desenvolvimento))`

```
> docker pull hello-world

> docker run hello-world

> docker ps

> docker images
```

- Containers: Pacote de código que pode executar uma aplicação (resultado da execução de uma imagem). Os nossos projetos são executados dentro dos containers que criamos. Containers utilizam `imagens` para poderem ser executados. Múltiplos containers podem rodar juntos, ex: um para PHP e outro para Mysql.
- Imagem: é o projeto que será executao pelo container. Container é o docker rodando alguma imagem, consequentemente execultando algum código proposto por ela.

`Fluxo: programamos uma imagem e a executamos por meio de um container`

DockerHub -> repositório de imagens.

`> docker ps ou docker container ls`
`docker ps -a` -> todos os containers já executados na máquina.

- -it : t -> tty, i -> interactive, stdin aberto.
- -d(detached) : executa um container um background. Faz com que o container rode como um daemon, sem interatividade.

- Apesar de ser uma tarefa simples, quando você executou o comando "docker container run hello-world" foram necessárias quatro etapas para sua conclusão, vamos ver quais:

O comando "docker" se comunica com o daemon do Docker informando a ação desejada.

O daemon do Docker verifica se a imagem "hello-world" existe em seu host; caso ainda não, o Docker faz o download da imagem diretamente do Docker Hub.

O daemon do Docker cria um novo container utilizando a imagem que você acabou de baixar.

O daemon do Docker envia a saída para o comando "docker", que imprime a mensagem em seu terminal.

- Os containers de docker não tem conexão com nada de fora deles; Por isso precisamos expor portas, a flag `-p`: -p 80:80. O container ficará acessível na porta 80.
  `>docker stop <id_container>` ex: `>docker stop a2b`

- `> docker start a2b`
- ** o run sempre cria um novo container.**

- `--name` : define o nome do container.
- `docker logs <id_container>`
- `docker -rm <id>`
  Se o container ainda estiver rodando: -f (force)
- `docker -rm  -f <id>`
- `docker ps -s`

---

`export USER=$(echo whoiam)`
` usermod -aG docker $USER`

```
sudo apt-get remove docker docker-engine docker.io
sudo apt-get install docker-ce
```

---

## Cada container é dividido em uma funcionalidade.

- Imagem é o projeto que será executado no container, todas as intruções serão declaradas nela, contendo que arquivo tem que copiar do projeto, que comando vai ter que executar pro projeto rodar, que arquivo vai iniciar a aplicação. Que portas esse container vai expor para o mundo externo, que imagem base vai ser utilizada para criar o nosso projeto. A imagem vai conter todo tipo de configuração para um projeto, ele vai ter um arquivo chamado Dockerfile que basicamente é a imagem, tudo nele é a configuração que um container vai rodar.

- Já o container é o docker rodando uma imagem, ele pega as intruções do Dockerfile e vai executar, ele vai copiar arquivo, executar comandos, expor portas, elevai executar uma série de passos para que a nossa aplicação rode por meio de umj container.

- Rodando uma imagem:
  Instalação:
  ` docker ps, docker pull hello-world, docker run hello-world, docker ps, docker images`

- As imagens se encontram no https://hub.docker.com
  Exemplo: imagem do Ubuntu(oficiais). PHP.

# Rodando ubuntu:

```
> docker run ubuntu
```

- Ele apenas roda o container, mas não faz nada, pois não passamos nenhum comando.

```
> docker run -it ubuntu
/# ls
/# exit
```

Em outro terminal:

```
> docker ps
```

Ele roda o container e para.

- Verificando containers executados ou que estão executando.

```
#Todos os containers que já rodaram na máquina.
> docker ps -a
```

```
> docker run -it node
>2 + 2
> console.log("Olá Mundo!");
```

```
#Acessar um container em execução:
> docker container attach <id_container>
> docker container stop <id_container>
> docker container ls
> docker container start <id_container>
> docker container restart <id_container>
> docker container pause <id_container>
> docker container unpause <id_container>

# Visualizando o consumo de recursos pelo container:
> docker container stats <id_container>
> docker container stats

#Visualizar quais processos estão em execução em determinado container:
> docker container top <id_container>

#Verificar os logs
>docker container logs <id_container>

#Logs em tempo real
> docker container logs -f <id_container>
* Lembre-se do tail -f

#Remover container
> docker container rm <id_container>

#mesmo se estiver em execuçao
>docker container rm -f <id_container>
> docker container ls -a

```

```
#run no modo attached
>docker run nginx
#modo detached
>docker stop <id_container>
> docker ps
> docker run -d nginx
>docker ps
#mas, não consigo acessar ele no meu localhost, pois o conatiner não tem conexão externa, e para isso precismaos expor uma porta.
```

## Como podemos acessar um servidor?

Bom, o container do docker é isolado e não possui conexao externa, e precisamos abri-la. Podemos fazer isso expondo uma porta. `flag -p` ex: `-p 80:80`, desta forma estamos espondo a porta 80 do container, em uma porta que queremos acessar.

```
> docker run -d -p 80:80 nginx
#Browser: localhost
>docker stop <id_container>
# porta do meu px: 3000, porta do container: 80
>docker stop <id_container>
> docker ps
> docker run -d -p 3000:80 nginx
#Browser: localhost:3000
```

# Um container rodando vai estar consumindo..

um pouco da cpu do host ou servidor.

```
> docker ps -a
> docker start b43
```

# Definir nome para um container

por que nomes aleatórios podem ser um problema para aplicações profissionais:

- - --name
- - --run

```
>docker run -d -p 3000:80 --name nginx_app nginx
>docker stop nginx_app
>docker start nginx_app
```

## Logs:

```
> docker logs <id_conatiner> or <container_name>
```

## Remover container:

```
> docker rm <id_container>
ou
> docker rm -f <id_container>
```

---

# Rodando containers com as próprias imagens

---

- - Imagens são originadas de arquivos que programamos, ao radas um container baseado na imagem, as instruções serão executadas em camadas.
    In dockerhub search apache, httpd(imagem oficial)

```
> docker run -d -p 80:80 --name meu_apache httpd
#Browser: localhost
```

# Criando nossa primeira imagem

---

- - Pricisamos de um arquivo Dockerfile em uma pasta que ficará o projeto, ele vai precisar de algumas instruções para ser executado:
- - `FROM`: imagem base;
- - `WORKDIR`: diretório da aplicação;
- - `EXPOSE`: porta da aplicação;
- - `COPY`: quais arquivos precisam ser copiados.

# Iniciando projeto node

---

```
> cd ProjetoNode
> npm init -y (vai iniciar um projeto node)
#instalar framework express, para executar essa aplicação no browser
> npm install express
#crie um arquivo app.js vai ser o arquivo principal da nossa aplicação. (file no diretorio)

> node app.js

#Browser: localhost:3000, está funcionando, e agora iremos criar a imagem:
# Crie um Dockerfile, a imagem é composta por camadas e cada linha do arquivo é uma camada, então ele vai criar um cache em cda um dos espaços, se alterarmos a porta por exemplo, ele não via executar toda a imagem, mas sim apenas da linha que foi mudada em diante.

```

# Executando uma imagem

---

- - Primeiramente vamos precisar fazer o build dela para o docker entender, que aquilo agora é uma imagem de fato. `docker build <dir_imagem>`; Depois utilizamos o `docker run <imagem>` para executá-la.

```
>docker build .
>docker image ls
> docker run e2dfa3da28d8
#no browser não vai funcionar, por que a porta está exposta somente na camada da imagem.
> docker stop e2dfa3da28d8
#rodar a mesma imagem em outro container, é necessário especificar a porta no comando do run.
> docker run -d -p 3000:3000 e2dfa3da28d8
#ele vai funcionar agora
> docker stop 82c
82c

#dando um nome
>docker run -d
-p 3000:3000 --name node_app e2dfa3da28d8
```

# Alterando uma imagem

---

- - Sempre que alterarmos um código de uma imagem vamos precisar fazer o build novamente; Para o docker é como se fosse uma imagem completamente nova; Após fazer o build vamos executá-la por o outro id único criada com o docker run.

```
#Edite o texto no app.js
>docker ps
>docker stop d25
> docker build .
#o que é rápido pois ele tem cache.
>docker images
> docker run -d -p 3000:3000 --name node_app_v2 1ffa2ab56691
```

# Camadas das imagens

---

- - As imagens do Docker são divididas em camadas(layers); Cada instrução do Dockerfile representa uma layer; Quando algo é atualizado apenas as layers depois da linha atualizada são refeitas; O resto perfamenece em cache, tornando o build mais rápido.

#mude para FROM node:14

> .>docker build .
> ele vai refazer tudo.

# Download de imagens

---

- `docker pull <imagem>`

```
> docker pull python
> docker run -it python
>>> 2 + 2
>>> exit
> docker images
```

# Múltiplas aplicações com o mesmo container.

---

- Podemos inicializar vários containers com a mesma imagem, as aplicações funcionarão em paralelo; Para testar isso, podemos determinar uma porta diferente para cada uma e rodar no modo detached. ex: um container com imagem do node, rodando em diversas portas e servindo a aplicação.

```
> docker ps
> docker run -d -p 3000:3000 --name node_app4 docker run -d -p 3000:3000 --name node_app_v5 1ffa2ab56691
```

# Alterando o nome da imagem e tag

- Podemos nomear a imagem que criamos, vamos utilizar o comando `docker tag <nome>`, também podemos modificar a tag que seria como uma versão da imagem, semelhante ao git.
