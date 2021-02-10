const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const {dadosAntropometricos} = require('../calculosAntropometricos/classeSeteDobras')
const {Aluno} = require('../calculosAntropometricos/classeAluno')
const {dataDDMMYY} = require('../funçõesAuxiliares/datas')
const { NovoUser } = require("../models/usuario")



router.post('/', (req, res)=>{
    console.log(req.body.email)
    res.render('alunos/alunosCad', {dados: req.body})
})
router.post('/verificaCad', (req, res)=>{
    console.log(req.body.email)
    // verificação de tamanho de string digitada no form
        arrErrosCadAluno = []
        for(chaves in req.body){
            if(req.body[chaves].length < 1){
                arrErrosCadAluno.push(chaves)
            }         
        }

        if(arrErrosCadAluno.length > 0){
            res.render('alunos/alunosCad', {error: arrErrosCadAluno})
        }else{
             //Pegando o nascimento do formulario
            data = req.body.nascimento
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

                    // Dados gerais
                    geral = AlunoNovo.objNSNIPA
                    geral.nascimento = data

                    //Dados de peso
                    pesos = AlunoNovo.objPesoKG_RMOG

                    //Dados de porcentagem
                    porcem = AlunoNovo.objPorcem
                    
                    //Informações adicionais
                    InfoAdcional = {
                        dc: AlunoNovo.Densidade_Corporal,
                        imc: AlunoNovo.Imc,
                        Mb: AlunoNovo.Metabolismo_Basal
                    }

                    //Taixas
                    taixas = {
                        mr: AlunoNovo.muscle_Rate,
                        br: AlunoNovo.bone_Rate,
                        bf: AlunoNovo.Body_Fat_rate
                    }
                    //Tenho que salvar os dados do alunos no db dentro de seu cadastro de aluno
                    var filter = {email: req.body.email}
                    var update = {cadAluno: AlunoNovo}
                    NovoUser.findOneAndUpdate(filter, update, {new: true}).then((result)=>{
                        console.log(result)
                    })

            res.render('alunos/alunosInicio', {dadoGerais: geral, pesos : pesos, porcem: porcem, infoAdi: InfoAdcional, taixas: taixas })
        }
})


module.exports = router