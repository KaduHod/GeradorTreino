const ExercicioCross = require('./models/models')
require('../../_muscles/Cross/ObjetosCross')
require('../../_muscles/Cross/chamaTreinoCross/VariaveisAtalhoCross')

//Adicioanando exercicios na DB
function AdicionaExCrossDB(arrayExercicios){
    arrayExercicios.map((exercicio_)=>{
        new ExercicioCross.ExerciciosCross({
            exercicio : exercicio_
        }).save().then(()=>{
            console.log('Exercicio salvo na db com sucesso!')
        }).catch((err)=>{
            console.log('ERro: '+ err)
        })
    })
}



