const NovoMUsculoSimples = require("./testando")
require("../../_muscles/musculos")
MusculosSimples = [Panturrilha, PosteriorCoxa, Quadriceps, Gluteo, Lombar, Dorso, SerratilPosterior, Psoas, Peitoral, Trapezio, Antebraco, Triceps, Ombro, serratilAnterior]
function adicionaMusculoDB(arraymusculo){
    arraymusculo.map((musculo)=>{
        new NovoMUsculoSimples.NovoMusculoSimples({
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


