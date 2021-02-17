require('../../_muscles/Cross/ObjetosCross')
require('../../_muscles/Cross/chamaTreinoCross/VariaveisAtalhoCross')
const {ExerciciosCross} = require('../../models/models')

const ModelCross = require('../../models/models')

function AdicionaExerciciosCrossParteCorpoRecrutada(arrayexercicios){
    arrayexercicios.map((exercicios)=>{
        if(exercicios.Parte_do_corpo_recrutada == 'Membro superior'){
            new ModelCross.ExercicioCrossMS({
                exercicio: exercicios
            }).save().then(()=>{
                console.log('Exercicio de Membro superior salvo com sucesso')
            }).catch((err)=>{
                console.log('Erro: '+ err)
            })
        }else if(exercicios.Parte_do_corpo_recrutada == 'Membro inferior'){
            new ModelCross.ExercicioCrossMI({
                exercicio: exercicios
            }).save().then(()=>{
                console.log('Exercicio de Membro inferior salvo com sucesso')
            }).catch((err)=>{
                console.log('Erro: '+ err)
            })
        }else if(exercicios.Parte_do_corpo_recrutada == 'Core'){
            new ModelCross.ExercicioCrossCore({
                exercicio: exercicios
            }).save().then(()=>{
                console.log('Exercicio de Core salvo com sucesso')
            }).catch((err)=>{
                console.log('Erro: '+ err)
            })
        }else if(exercicios.Parte_do_corpo_recrutada == 'Multi-articular'){
            new ModelCross.ExercicioCrossMult({
                exercicio: exercicios
            }).save().then(()=>{
                console.log('Exercicio Multi-articular salvo com sucesso')
            }).catch((err)=>{
                console.log('Erro: '+ err)
            })
        }
    })
}

// SALVEI EXERCICIOS DE CROSS NA DB E TMB SALVEI OS EXERCICIOS SEPARADOS POR PARTE DO CORPO RECRUTADO
//PARA AMANHA IREI SALVAR AS CATEGORIAS E OS EXERCICIOS SEPARADOS POR PESO CORPORAL E PESO DE EQUIPAMENTO