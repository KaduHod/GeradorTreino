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
    
    
})

router.get('/Formulario', (req , res)=>{// pagina para escolher musculo do treino
    
    res.render('treinos/formularioMusculacao')
})

router.post('/lesao', (req, res)=>{// pagina que vai registrar as lesoes
    var musculo_form = req.body.musculo
    var musculo1_form = req.body.musculo1
    var musculo2_form = req.body.musculo2
    arr_musc_form = [musculo_form, musculo1_form, musculo2_form]
    
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
