const NovoMusculo = require("./models/models")
require("../../_muscles/musculos")
//MusculosSimples = [Panturrilha, PosteriorCoxa, Quadriceps, Gluteo, Lombar, Dorso, SerratilPosterior, Psoas, Peitoral, Trapezio, Antebraco, Triceps, Ombro, serratilAnterior, Biceps, Abdomen]

// Arquivo utilizado para transferir objetos dos musculos ao Banco de dados

function adicionaMusculoDB(arraymusculo){
    arraymusculo.map((musculo)=>{
        new NovoMusculo.NovoMusculo({
            nome: musculo.nome,
            regiao: musculo.regiao,
            porcoes: musculo.porcoes
        }).save().then(()=>{
            console.log('Musculo salvo com sucesso!')
        }).catch((err)=>{
            console.log("Erro ao salvar musculo na DB: "+ err)
        })
    })
}









