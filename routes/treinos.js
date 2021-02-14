const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/models')
const Musculo = mongoose.model('Muscle')
const {MontaTreino} = require('../_treinos/_treinoMuscFuncoes/MontaTreino')// retorna array com objs do treino
const {formaArrayHandlebarsTable} = require('../_treinos/_treinoMuscFuncoes/MontaTreino') // retorna array com treino para a tabela no handlebars


router.post('/', (req, res)=>{
    Musculo.find().then((query)=>{
        res.render('treinos/formularioMusculacao',{musculos: query, user: req.body})
    })
})

router.post('/lesao', (req, res)=>{// pagina que vai registrar as lesoes
    chaves = Object.keys(req.body)
    chavesUserData = []
    chavesMusculos = []
    chaves.map((valorChave)=>{
        if(valorChave == 'musculo' || valorChave == 'musculo1' || valorChave == 'musculo2'){
            chavesMusculos.push(valorChave)
        }else{
            chavesUserData.push(valorChave)
        }
    })
    arrMusc = []
    arrUserData = []
    /*for(i=0; i<req.body.length; i++){
        chavesUserData.map((chave)=>{

        })


        chavesMusculos.map((chave))
    }*/
    //console.log(chavesUserData)
    //console.log(chavesMusculos)

    
    // tenho que criar um array com musculos e um array com os dados do usuario

    

    var musculo_form = req.body.musculo
    var musculo1_form = req.body.musculo1
    var musculo2_form = req.body.musculo2
    arr_musc_form = [musculo_form, musculo1_form, musculo2_form]
    console.log(req.body.nome + ` escolheu ${req.body.musculo}, ${req.body.musculo1}, ${req.body.musculo2}`)
    res.render('treinos/lesao')
    
})


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
    
    
})



module.exports = router
