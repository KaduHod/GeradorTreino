require("../../../_muscles/musculos")



// aprendendo a se conectar
    const mongoose = require('mongoose')
    mongoose.Promisse = global.Promisse
    mongoose.connect("mongodb://localhost/AppStudioNFit",{useMongoClient: true}).then(()=>{
        console.log("Conectado ao banco de dados com sucesso")
    }).catch((err)=>{
        console.log("Erro:" + err)
    })
// quero adicionar os musculos a base de dados
//DEfinindo um model
    //exemplo MUsculo simples
    const MusclesSchema = mongoose.Schema({
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
            required: true
        }
        
    })

    const AlunoSchema = mongoose.Schema({
        objNSNIPA:{
            type: Object,
            required: true
        },
        objMedidas:{
            type:Object,
            required: true
        },
        objPesoKG_RMOG:{
            type: Object,
            required:true
        },
        objPorcem:{
            type:Object,
            required: true
        },
        objRate:{
            type:Object,
            required:true
        }
        
    })

// collection//colocando o musculo no banco de dados
mongoose.model('Muscle', MusclesSchema)
const NovoMusculo = mongoose.model('Muscle')

// collection Aluno
mongoose.model('Aluno', AlunoSchema)
const NovoAluno = mongoose.model('Aluno')




module.exports = {
    NovoMusculo,
    NovoAluno
}