const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const models = require('../models/models')
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

router.post('/crossPersonalizado', (req, res)=>{
    res.send('Pagina de treino de cross personalizado')
})


module.exports = router