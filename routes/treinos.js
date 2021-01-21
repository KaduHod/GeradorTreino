const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/models')
const Musculo = mongoose.model('Muscle')
const {MontaTreino} = require('../_treinos/_treinoMuscFuncoes/MontaTreino')// retorna array com objs do treino
const {formaArrayHandlebarsTable} = require('../_treinos/_treinoMuscFuncoes/MontaTreino') // retorna array com treino para a tabela no handlebars


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
       
        musculo = Musculo.findOne({nome: musculo_form}).then((musculo)=>{
            return musculo
        }).then((musculo)=>{
            arr=[]
            arr.push(musculo)
            return arr
        }).then((arr)=>{
            Musculo.findOne({nome: musculo1_form}).then((musculo)=>{
                arr.push(musculo)
                console.log('---')
                return arr
            }).then((arr)=>{
                Musculo.findOne({nome: musculo2_form}).then((musculo)=>{
                    arr.push(musculo)
                    treino = MontaTreino(arr)// ESTE TREINO RETORNA UM ARRAY COM OBJETOS CONTENDO NOME DO MUSCULO E EXERCICIOS SORTEADOS
                    
                    treino_arr_handlebars = formaArrayHandlebarsTable(treino)// cada indice do array retornado sera uma linha na tabela da interface do usuario
                    
                    res.render('treinos/geraTreino', {treino_arr_handlebars1:treino_arr_handlebars[0],treino_arr_handlebars2:treino_arr_handlebars[1],treino_arr_handlebars3:treino_arr_handlebars[2]})
                    
                }).catch((err)=>{
                    console.log(`Erro em` + err)
                })
            }).catch((err)=>{
                console.log(`Erro em` + err)
            })
        }).catch((err)=>{
            console.log(`Erro em` + err)
        })

       
        
       
        
        

        

        
        


        
        
    
    

    
    
})



module.exports = router
