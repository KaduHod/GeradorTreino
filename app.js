const express = require('express')
const app = express()
const porta = 8080
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const treinos = require('./routes/treinos')// rota para treinos
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('connect-flash')

// Config
    //Session
        app.use(session({
            secret: "Aplicacao Gerador de treinos",
            resave: true,
            saveUnitialized: true
        }))
        app.use(flash())
    
    //Middleware
        app.use((req, res, next)=>{
            res.locals.success_msg = req.flash('success_msg'),
            res.locals.error_msg = req.flash('error_msg'),
            next()
        })

    // Tamplate engine HANDLEBARS
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine','handlebars')

    // bodyparser
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())

    // Mongoose
        const mongoose = require('mongoose')
        mongoose.Promisse = global.Promisse
        mongoose.connect("mongodb://localhost/AppStudioNFit",{useMongoClient: true}).then(()=>{
            console.log("Conectado ao banco de dados com sucesso")
        }).catch((err)=>{
            console.log("Erro:" + err)
        })

    // Public (bootstrap)
        app.use(express.static(path.join(__dirname, 'public')))

//Rotas
    // rota principal
    app.get("/",(req, res)=>{
        res.send('Pagina principal da aplicação')
    })

    //Rotas de treinos
    app.use('/treinos',treinos)

   


//Outros
    app.listen(porta, 'localhost', ()=>{
        console.log(`SERVIDOR RODANDO EM http://localhost:${porta}`)
    })