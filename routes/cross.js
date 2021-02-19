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
    

    crossObjInputs = {Categoria :req.body.Categoria,Parte_do_corpo_ecrutada: req.body.Parte_do_corpo_recrutada,Equipamento :req.body.Equipamento}

    arrayExercicio = [
        dupla1 = [], dupla2 = [], dupla3 = [], dupla4 = []
    ]
    for(prop in crossObjInputs){
        dupla1.push(crossObjInputs[prop][0])
        dupla2.push(crossObjInputs[prop][1])
        dupla3.push(crossObjInputs[prop][2])
        dupla4.push(crossObjInputs[prop][3])
    }
    


    
    console.log(arrayExercicio)

    ExerciciosCross.find().then((query)=>{
        exerciciosDentroDasCondições = []
        query.map((el)=>{
            arrayExercicio.map((elArrayExercicio)=>{
                if(elArrayExercicio[2] == 'Peso corporal'){
                    
                    if(el.exercicio.Equipamento == 'Peso corporal' && el.exercicio.Categoria == elArrayExercicio[0] && el.exercicio.Parte_do_corpo_recrutada == elArrayExercicio[1]){
                        exerciciosDentroDasCondições.push(el)
                    }
                }else{
                    if(el.exercicio.Equipamento !== 'Peso corporal'){
                        if(el.exercicio.Equipamento !== 'Peso corporal' && el.exercicio.Categoria == elArrayExercicio[0] && el.exercicio.Parte_do_corpo_recrutada == elArrayExercicio[1]){
                            exerciciosDentroDasCondições.push(el)
                        }
                    }
                }
            })            
        })

        console.log(exerciciosDentroDasCondições)

      
        
        
        
         
        res.render('cross/testeTabataPersonalizado',{dados:  req.body})
    })
})


module.exports = router