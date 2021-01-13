// aprendendo a se conectar
    const mongoose = require('mongoose')

    mongoose.connect("mongodb://localhost/bancoTesteDois",{useMongoClient: true}).then(()=>{
        console.log("Conectado ao banco de dados com sucesso")
    }).catch((err)=>{
        console.log("Erro:" + err)
    })