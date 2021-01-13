const express = require('express')
const app = express()
const porta = 8080
const handlebars = require('express-handlebars')

// Config
    // Tamplate engin
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine','handlebars')


// rota principal
app.get("/", (req, res)=>{
    res.send("Pagina principal")
})

app.get("/Categorias_de_treinos", (req, res)=>{
    res.send("Pagina onde vou listar as categorias de treinos gerados pela aplicação")
})

app.get("/Cross-Training", (req, res)=>{
    //res.sendFile(__dirname + "/routes/Cross.html")
})

app.get("/Musculacao", (req, res)=>{
    //res.sendFile(__dirname + '/routes/Musculacao.html')
})

app.get("/Aluno", (req, res)=>{
    res.send("Pagina onde o aluno vera os seus dados gerados pelos calculos antropometricos")
})



app.listen(porta, 'localhost', ()=>{
    console.log(`SERVIDOR RODANDO EM http://localhost:${porta}`)
})