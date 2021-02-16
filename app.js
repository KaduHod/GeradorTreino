const express = require('express')
const app = express()
const porta = 8080
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
//ROTAS
    const treinos = require('./routes/treinos')
    const users = require('./routes/users')
    const admin = require('./routes/admin')
    const aluno = require('./routes/aluno')
    const cross = require('./routes/cross')

const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')

// Config    

    // Public (bootstrap)
    app.use(express.static(path.join(__dirname, 'public')))

    //Session
    app.use(session({
        secret: "secret-key",
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
        app.engine('handlebars', handlebars({
            defaultLayout: 'main',
            runtimeOptions: {
                allowProtoPropertiesByDefault: true,
                allowProtoMethodsByDefault: true,
            },
        }))
        app.set('view engine','handlebars')

    // bodyparser
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())

    // Mongoose
        const mongoose = require('mongoose')
        mongoose.Promisse = global.Promisse
        mongoose.connect("mongodb://localhost/AppStudioNFit").then(()=>{
            console.log("Conectado ao banco de dados com sucesso")
        }).catch((err)=>{
            console.log("Erro:" + err)
        })


    
    

//Rotas
    // rota principal
    app.get("/",(req, res)=>{
        res.render(__dirname + '/views/inicio.handlebars')
    })

    //Rotas 

        //Rota para os treinos de musculaçao
        app.use('/treinos',treinos)

        //Rota dos alunos
        app.use('/users', users)

        //Rota admin
        app.use('/admin', admin)

        //Rota Aluno
        app.use('/aluno', aluno)

        //Rota para treino de Cross
        app.use('/cross', cross)

   


//Outros
    app.listen(porta, 'localhost', ()=>{
        console.log(`SERVIDOR RODANDO EM http://localhost:${porta}`)
    })