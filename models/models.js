require("../_muscles/musculos")
    const mongoose = require('mongoose')
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
    // collection//colocando o musculo no banco de dados
    mongoose.model('Muscle', MusclesSchema)
    const NovoMusculo = mongoose.model('Muscle')

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

     // collection Aluno
     mongoose.model('Aluno', AlunoSchema)
     const NovoAluno = mongoose.model('Aluno')

    const ExercicioCrossSchema = mongoose.Schema({
        exercicio: {
            type:Object,
            required: true
        }
    })
    // Collection exercicio cross
    mongoose.model('Exercicios_Cross', ExercicioCrossSchema)
    const ExerciciosCross = mongoose.model('Exercicios_Cross')

   

    

    //Models de variaveis atalhos do cross
    const CrossMembroSuperiorSchema = mongoose.Schema({
        exercicio: {
            type:Object,
            required: true
        }
    })

    mongoose.model('ExercicioCrossMS', CrossMembroSuperiorSchema)
    const ExercicioCrossMS = mongoose.model('ExercicioCrossMS')

    const CrossMembroInferiorSchema = mongoose.Schema({
        exercicio: {
            type:Object,
            required: true
        }
    })

    mongoose.model('ExercicioCrossMI', CrossMembroInferiorSchema)
    const ExercicioCrossMI = mongoose.model('ExercicioCrossMI')

    const CrossCoreSchema = mongoose.Schema({
        exercicio: {
            type:Object,
            required: true
        }
    })

    mongoose.model('ExercicioCrossCore', CrossCoreSchema)
    const ExercicioCrossCore = mongoose.model('ExercicioCrossCore')

    const CrossMulti_articularSchema = mongoose.Schema({
        exercicio: {
            type:Object,
            required: true
        }
    })
    mongoose.model('ExercicioCrossMult', CrossMulti_articularSchema)
    const ExercicioCrossMult = mongoose.model('ExercicioCrossMult')

module.exports = {
    NovoMusculo,
    NovoAluno,
    ExerciciosCross,
    ExercicioCrossMS,
    ExercicioCrossMI,
    ExercicioCrossCore,
    ExercicioCrossMult
}