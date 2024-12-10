FROM node:14

WORKDIR /app
#copia o arquivo para o /app, nosso dir de trabalho
COPY package*.json . 

#precisamos instalar os pacotes do projeto que estão no copy
RUN npm install

#Copia os demais arquivos da aplicação, para o /app
COPY . .

#EXPOR UMA PORTA
EXPOSE 3000

#Comando que incializa a aplicação, exatamente o comando que utilizei para executar a aplicação: node app.js

CMD ["node", "app.js"]