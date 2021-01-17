const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/models')
const Musculo = mongoose.model('Muscle')


router.get('/', (req, res)=>{
    res.render('treinos/index')
})

router.get('/Musculos', (req,res)=>{
    res.render('treinos/musculos')
})

router.post('/Musculos/mostra', (req, res)=>{
    res.render('treinos/mostraMusculo')
    /*const ConsultaMusculo = {
        nome: req.body.musc // dado do input musc é guradado neste objeto
    }

    Musculo.findOne({"nome": ConsultaMusculo.nome}).then(()=>{
        console.log('COnsulta feita com sucesso')
        res.redirect('treinos/mostraMusculo')
    }).catch((err)=>{
        console.log('Erro ao consultar ' + err)
        res.redirect('/Musculos')
    })*/
})



module.exports = router