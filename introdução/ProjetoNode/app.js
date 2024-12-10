//Chamando o framework
const express = require('express')
//Inicializando o express
const app = express()
//Porta da aplicação, onde vou expor na porta da imagem e onde iremos utilizar uma porta do container para expor a imagem e assim ter acesso a aplicação.
const port = 3000

//criar uma rota de get, que vai acessar o / da nossa aplicação e vai nos retornar uma requisição com resposta.
app.get('/', (req, res) => {
    res.send('Olá Ana futura DevOps!');
})

//Indica a porta que ele vai estar escutando.
app.listen(port, ()=>{
    console.log(`Executando na porta: ${port}`)
});