require("../../_muscles/musculos")

// aprendendo a se conectar
    const mongoose = require('mongoose')
    mongoose.Promisse = global.Promisse
    mongoose.connect("mongodb://localhost/bancoTesteDois",{useMongoClient: true}).then(()=>{
        console.log("Conectado ao banco de dados com sucesso")
    }).catch((err)=>{
        console.log("Erro:" + err)
    })
// quero adicionar os musculos a base de dados
//DEfinindo um model
    //exemplo MUsculo simples
    const MuscleSimplesSchema = mongoose.Schema({
        nome:{
            type: String,
            required: true
        },
        regiao:{
            type: String,
            required: true
        },
        porcoes:{
            type: Object,
            require: true
        }
        
    })

// collection//colocando o musculo no banco de dados
mongoose.model('MuscleSimples', MuscleSimplesSchema)
const NovoMusculoSimples = mongoose.model('MuscleSimples')

/*new NovoMusculoSimples({
    nome: Triceps.nome,
    regiao: Triceps.regiao,
    porcoes: Triceps.porcoes
}).save().then(()=>{
    console.log("Musculo cadastrado com sucesso")
}).catch((err)=>{
    console.log("Erro: "+ err)
})*/

module.exports = {
    NovoMusculoSimples,
    
}