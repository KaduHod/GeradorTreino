const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const {dadosAntropometricos} = require('../calculosAntropometricos/classeSeteDobras')
const {Aluno} = require('../calculosAntropometricos/classeAluno')
const {dataDDMMYY} = require('../funçõesAuxiliares/datas')




router.post('/', (req, res)=>{

    res.render('alunos/alunosCad', {dados: req.body})
})
router.post('/verificaCad', (req, res)=>{

    //Pegando o nascimento do formulario
        data = req.body.nascimento[1]
        arrayData = data.split('/')
        
        dataNascForm = {
            dia: arrayData[0],
            mes: arrayData[1],
            ano: arrayData[2]
        }

    // Pegando dados da classe de 7 dobras cutaneas
        const SeteDobras = new dadosAntropometricos(parseFloat(req.body.tricipital), parseFloat(req.body.subescapular), parseFloat(req.body.peitoral), parseFloat(req.body.axilar_media), parseFloat(req.body.abdominal), parseFloat(req.body.suprailiaca), parseFloat(req.body.coxa), parseFloat(req.body.dbru),parseFloat(req.body.dbdf ))
        SeteDobras.Total7dobras()
    
    //Criando objeto aluno
        AlunoNovo = new Aluno(req.body.nome, dataNascForm, req.body.sexo, SeteDobras, parseFloat(req.body.peso), parseFloat(req.body.altura), parseFloat(req.body.circunCintura), parseFloat(req.body.circunQuadril), parseFloat(req.body.circunPunho))

        // acionando metodos!!
            AlunoNovo.calcDensidade()
            AlunoNovo.calcGordura()
            AlunoNovo.calcPesoGordura()
            AlunoNovo.calcPesoOsseo()
            AlunoNovo.calcPesoResidual()
            AlunoNovo.calcPesoMuscular()
            AlunoNovo.calcMetabolismoBasal()
            AlunoNovo.calcIMC()
            AlunoNovo.calcGorduraVisceral()
            AlunoNovo.calcPorcentagemPeso()
            AlunoNovo.analisaGordura()
            AlunoNovo.analisaMusculo()
            AlunoNovo.calcEstruturaOssea()
            AlunoNovo.analisaOssos()

    console.log(AlunoNovo)

    
})


module.exports = router