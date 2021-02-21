const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {ExerciciosCross, NovoMusculo} = require('../models/models')
require('../_muscles/Cross/chamaTreinoCross/VariaveisAtalhoCross')
const {pegaExerciciosCross} = require('../_muscles/Cross/chamaTreinoCross/MontaTreinoCross')
const {montaTreino} = require('../_muscles/Cross/chamaTreinoCross/MontaTreinoCross')
const {TreinoEstruturado} = require('../_muscles/Cross/chamaTreinoCross/MontaTreinoCross')
const {au_hasardCroos} = require('../funçõesAuxiliares/random')


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

router.post('/filtraCross', async (req, res)=>{
    

    crossObjInputs = {Categoria :req.body.Categoria,Parte_do_corpo_ecrutada: req.body.Parte_do_corpo_recrutada,Equipamento :req.body.Equipamento}

    //console.log(req.body)

    arrayExercicio = [
        dupla1 = [], dupla2 = [], dupla3 = [], dupla4 = []
    ]
    for(prop in crossObjInputs){
        dupla1.push(crossObjInputs[prop][0])
        dupla2.push(crossObjInputs[prop][1])
        dupla3.push(crossObjInputs[prop][2])
        dupla4.push(crossObjInputs[prop][3])
    }
    //console.log('---')
    //console.log(arrayExercicio)
    ExerciciosCross.find().then((query)=>{
        function ExerciciosPossiveisDoTreino(duplas_, query){
            ExerciciosPossiveisDoTreino = []
            duplas_.map((duplas)=>{// percorro as condições de cada dupla
                console.log(duplas)
                exerciciosDaDupla = []
     
                 query.map((exercicio)=>{ // percorro cada exercicio da query
     
                 exercicio_ = exercicio.exercicio
                     if(duplas.indexOf('Peso corporal') > -1 && exercicio_.Equipamento == 'Peso corporal' && exercicio_.Categoria == duplas[0] && exercicio_.Parte_do_corpo_recrutada == duplas[1]){// se o exercicio for das condições
                        indice_a_ser_removido = query.indexOf(exercicio)
                         exerciciosDaDupla.push(exercicio)
                         query.splice(indice_a_ser_removido,1)
                     }else{
                         
                         if(duplas.indexOf('Peso corporal') == -1 && exercicio_.Categoria == duplas[0] && exercicio_.Parte_do_corpo_recrutada == duplas[1]){ // se o exercicio for das condições
                             exerciciosDaDupla.push(exercicio)
                             indice_a_ser_removido = query.indexOf(exercicio)
                             query.splice(indice_a_ser_removido,1)
                         }
                         
                     }
                 })
                
                ExerciciosPossiveisDoTreino.push(exerciciosDaDupla) 
            })
            return ExerciciosPossiveisDoTreino
        }
        ExerciciosPossiveisDoTreino = ExerciciosPossiveisDoTreino(arrayExercicio, query)
        //console.log(ExerciciosPossiveisDoTreino)

        function adicionaExercicioFaltantes_ao_ExerciciosPossiveisDoTreino(exerciciosPossiveis, query){
            // filtrar exercicios multiarticulares
            exerciciosMulti_articulares = []
            query.map((el)=>{
                if(el.exercicio.Parte_do_corpo_recrutada == 'Multi-articular'){
                    exerciciosMulti_articulares.push(el)
                    
                }
            })


            // PArte que adiciono exercicios multiarticulares a dupla com menos de dois exercicios
            exerciciosPossiveis.map((el)=>{
                if(el.length < 2){
                    //bloco que ira tratar duplas com menos de dois exercicios
                    console.log(exerciciosMulti_articulares.length)
                    indiceMA = 0
                    while(el.length < 2){
                        el.push(exerciciosMulti_articulares[indiceMA])
                        exerciciosMulti_articulares.splice(indiceMA,1)
                        indiceMA ++

                    }

                    /*
                    exerciciosMulti_articulares.map((exercicioMUlticArticular)=>{
                        while(el.length < 2){
                            if(exerciciosMulti_articulares.indexOf(exercicioMUlticArticular) !== -1){
                                el.push(exercicioMUlticArticular)
                            }
                            
                            indice_a_ser_removido = exerciciosMulti_articulares.indexOf(exercicioMUlticArticular)
                            console.log(indice_a_ser_removido)
                            exerciciosMulti_articulares.splice(indice_a_ser_removido,1)
                        }
                    })*/
                    
                }else{
                    console.log('Duplas preenchidas')
                }
            })
            return exerciciosPossiveis
        }
        ExerciciosPossiveisDoTreinoVerificado = adicionaExercicioFaltantes_ao_ExerciciosPossiveisDoTreino(ExerciciosPossiveisDoTreino, query)

        function sorteia_Exercicios_para_o_treino(exerciciosVerificados){
            treino = []
            exerciciosVerificados.map((el)=>{
                dupla = []
                if(el.length == 2){
                    dupla = el
                }else{
                    while(dupla.length < 2){
                        indiceRandomico = au_hasardCroos(el)
                        if(el[indiceRandomico] !== undefined){
                            dupla.push(el[indiceRandomico])
                            el.splice(el[indiceRandomico], 1)
                        }
                    }                 
                   //console.log(el)
                   
                }
                treino.push(dupla)
            })
            return treino
            
        }

        treino = sorteia_Exercicios_para_o_treino(ExerciciosPossiveisDoTreinoVerificado)

        //Crio array para ficar mais facil o posicionamento dos dados no html
        arrNomesExer = []
        arrCatExer = []
        arrRegiaoExer = []
        arrEquipExer = []
        treino.map((el)=>{
            el.map((el2)=>{
                arrNomesExer.push(el2.exercicio.Nome_exercicio)
                arrCatExer.push(el2.exercicio.Categoria)
                arrRegiaoExer.push(el2.exercicio.Parte_do_corpo_recrutada)
                arrEquipExer.push(el2.exercicio.Equipamento)
            })
        })

        //Organizo os array para que os exercicios fiquem separados em duas partes primeiros quatro sao referente a o primeiro indice de cada dupla e os outros 4 são referente ao segundo indice de cada dupla
        arrNomesExer2 = []
        arrRegiaoExer2 = []
        arrCatExer2 = []
        arrEquipExer2 = []
        /*for(i=0; arrNomesExer.length; i++){
            if(i%2 == 0){
                arrNomesExer2.push(arrNomesExer[i])
                arrRegiaoExer2.push(arrRegiaoExer[i])
                arrCatExer2.push(arrCatExer[i])
                arrEquipExer2.push(arrEquipExer[i])
            }
        }
        for(i=0; arrNomesExer.length; i++){
            if(i%2 !== 0){
                arrNomesExer2.push(arrNomesExer[i])
                arrRegiaoExer2.push(arrRegiaoExer[i])
                arrCatExer2.push(arrCatExer[i])
                arrEquipExer2.push(arrEquipExer[i])
            }
        }*/

        
        //console.log(treino)
         
        res.render('cross/testeTabataPersonalizado',{dados:  req.body, treino:treino, nomes: arrNomesExer, categorias: arrCatExer, regioes: arrRegiaoExer, equipamentos: arrEquipExer})

    })
    


    
    //console.log(arrayExercicio)

    
        
        
        
    
})


module.exports = router