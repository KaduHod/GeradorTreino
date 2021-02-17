const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {ExerciciosCross} = require('../models/models')
require('../_muscles/Cross/chamaTreinoCross/VariaveisAtalhoCross')
const {pegaExerciciosCross} = require('../_muscles/Cross/chamaTreinoCross/MontaTreinoCross')
const {montaTreino} = require('../_muscles/Cross/chamaTreinoCross/MontaTreinoCross')
const {TreinoEstruturado} = require('../_muscles/Cross/chamaTreinoCross/MontaTreinoCross')


router.post('/', (req, res)=>{
    res.render('cross/inicioCross' , {dados: req.body})
})

router.post('/Tabata', (req, res)=>{
    res.render('cross/tabataOptions', {dados: req.body})
})
router.post('/geraTreinoTabata', (req, res)=>{
    exercicios = []
    for(i=1; i<=8; i++){
        exercicios.push('Exercício '+i)
    }
    res.render('cross/tabataTreino', {dados: req.body, treino: TreinoEstruturado, numExer: exercicios})
})

router.post('/crossPersonalizado', (req, res)=>{
    res.render('cross/tabataPersonalizadoOptions',{dados:req.body})
    
})

router.post('/filtraCross', (req, res)=>{
    
    function filtraExercicio(query, inputs){
        arrExercicios = []
        for(i=0; i<4; i++){
            arrValoresDoExercicio = []
            for(propriedade in inputs){                
                if(propriedade == "Categoria"){
                    arrValoresDoExercicio.push(inputs[propriedade][i])
                }
                if(propriedade == 'Parte_do_corpo_recrutada'){
                    arrValoresDoExercicio.push(inputs[propriedade][i])
                }
                if(propriedade == 'Equipamento'){
                    arrValoresDoExercicio.push(inputs[propriedade][i])
                    
                }


                

                /*if(arrValoresDoExercicio.length == 2){
                    console.log(arrValoresDoExercicio)
                    Result = query.filter((el)=>{
                        arrExerciciosAntesArray = []
    
                        if(arrValoresDoExercicio[2] == 'Peso corporal'){
                            if(el.exercicio.Categoria == arrValoresDoExercicio[0] && el.exercicio.Parte_do_corpo_recrutada == arrValoresDoExercicio[1] && el.exercicio.Equipamento == 'Peso corporal'){
                                console.log(el)
                                arrExerciciosAntesLoop.push(el)
                            }
                        }else{
                            if(arrValoresDoExercicio[2] !== 'Peso corporal'){
                                if(el.exercicio.Categoria == arrValoresDoExercicio[0] && el.exercicio.Parte_do_corpo_recrutada == arrValoresDoExercicio[1] && el.exercicio.Equipamento !== 'Peso corporal'){
                                    console.log(el)
                                    arrExerciciosAntesLoop.push(el)
                                }
                            }
                        }
                    })
                    arrExercicios.push(Result) 
                }*/
                
                 
            }
            console.log(arrValoresDoExercicio.length)
            if(arrValoresDoExercicio.length == 3){
                console.log(arrValoresDoExercicio)
            }
            
        }
        //return arrExercicios







        /*Result = query.filter((el)=>{
            arrExerciciosAntesLoop = []
            
                if(inputs[i].Equipamento == 'Peso corporal'){
                    if(el.exercicio.Categoria == inputs[i].Categoria && el.exercicio.Parte_do_corpo_recrutada == inputs[i].Parte_do_corpo_recrutada && el.exercicio.Equipamento == 'Peso corporal'){
                        arrExerciciosAntesLoop.push(el)
                    }
                }else{
                    if(inputs[i].Equipamento !== 'Peso corporal'){
                        if(el.exercicio.Categoria == inputs[i].Categoria && el.exercicio.Parte_do_corpo_recrutada == inputs[i].Parte_do_corpo_recrutada && el.exercicio.Equipamento !== 'Peso corporal'){
                            arrExerciciosAntesLoop.push(el)
                        }
                    }
                }
                console.log(i)
            
            return arrExerciciosAntesLoop
        })
        
        return Result*/

    }

    crossObjInputs = {Categoria :req.body.Categoria,Parte_do_corpo_recrutada: req.body.Parte_do_corpo_recrutada,Equipamento :req.body.Equipamento}
    

    ExerciciosCross.find().then((query)=>{
        ExerciciosNaoFiltrados = filtraExercicio(query, crossObjInputs)
        console.log(ExerciciosNaoFiltrados)
        
         
        res.render('cross/testeTabataPersonalizado',{dados:  req.body, treino: ExerciciosNaoFiltrados})
    })
})


module.exports = router