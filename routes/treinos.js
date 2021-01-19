const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/models')
const Musculo = mongoose.model('Muscle')


router.get('/', (req, res)=>{
    res.render('treinos/index')
})

router.get('/Musculos', (req,res)=>{
    Musculo.find().then((musculos)=>{
        res.render('treinos/musculos', {musculos: musculos})
    }).catch((err)=>{
        req.flash("error_msg","HOuve um erro ao listar os musculo")
        res.redirect('/')
    })
    
})

router.get('/Formulario', (req , res)=>{// pagina para escolher musculo do treino
    Musculo.find().then((musculos)=>{
        res.render('treinos/formularioMusculacao', {musculos: musculos})
    }).catch((err)=>{
        req.flash("error_msg","HOuve um erro ao listar os musculo")
        res.redirect('/')
        console.log("ERRO "+ err)
    })
})

/*router.post('/lesao', (req, res)=>{// pagina que vai registrar as lesoes
    var musculo_form = req.body.musculo
    var musculo1_form = req.body.musculo1
    var musculo2_form = req.body.musculo2
    arr_musc_form = [musculo_form, musculo1_form, musculo2_form]
    
    
    // tenho que fazerum script que busca os 3 musculos escolhidos para o treino
    // para isso vou ter que fazer um loop que itera sobre o array que contem os musculos dos inputs
    //agora tenho que buscar as porcoes de cada musculo
    array_Com_Musculos = []
    arr_musc_form.map((nomeMusculo)=>{
        Musculo.findOne({'nome': nomeMusculo}).then((musculo)=>{
            musculo2 = musculo
            //console.log(musculo2)
            array_Com_Musculos.push(musculo2)
            //console.log(array_Com_Musculos)
        }).catch((err)=>{
            console.log("Erro na consulta "+err)
        })
        //console.log(array_Com_Musculos)
        return array_Com_Musculos
    })

    
    
    res.render('treinos/lesao', {array_Com_Musculos:array_Com_Musculos })
})*/

// pagina que vai montar o treino

//preciso saber quais inputs das porcoes foram marcados foram marcados
router.post('/geraTreino', (req, res)=>{

    // require das funções para a lesao
        require('../_muscles/musculos')
        const filtraLesao = require('../_treinos/_treinoMuscFuncoes/VerificaPorcaoLesao')

    //dados do formulario com os nomes dos musculos
        var musculo_form = req.body.musculo
        var musculo1_form = req.body.musculo1
        var musculo2_form = req.body.musculo2
        arr_musc_form = [musculo_form, musculo1_form, musculo2_form]


        
        arr_muscs_db = []
        /*async function retornaMusc(nomeMusc, nomeMusc2 ,nomeMusc2){
            
            musculooo = Musculo.findOne({nome: nomeMusc}).then((musculo_)=>{
                //console.log(musculo_)
                return musculo_
            })
            return musculooo
        }
         retornaMusc(musculo_form).then((v) =>{
            arr_muscs_db.push(v)
            console.log(arr_muscs_db)
        })*/


        musculo = Musculo.findOne({nome: musculo_form}).then((musculo)=>{
            return musculo
        }).then((musculo)=>{
            arr=[]
            arr.push(musculo)
            console.log(arr)
            return arr
        }).then((arr)=>{
            Musculo.findOne({nome: musculo1_form}).then((musculo)=>{
                arr.push(musculo)
                console.log('---')
                return arr
            }).then((arr)=>{
                Musculo.findOne({nome: musculo2_form}).then((musculo)=>{
                    arr.push(musculo)
                    return arr
                }).then((arr)=>{
                    arr2 = []
                    arr.map((musc)=>{
                        arr2.push(musc.porcoes)
                        // preciso separar um exercicio de cada porção
                    })
                    //console.log(arr2)
                })
            })
        })

       
        res.render('treinos/geraTreino')
       
        
        

        

        
        


        
        
    
    au_hasard = Math.floor(Math.random() * 4)

    
    
})



module.exports = router
