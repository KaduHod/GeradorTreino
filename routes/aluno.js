const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const {dadosAntropometricos} = require('../calculosAntropometricos/classeSeteDobras')
const {Aluno} = require('../calculosAntropometricos/classeAluno')
const {dataDDMMYY} = require('../funçõesAuxiliares/datas')
const { NovoUser } = require("../models/usuario")



router.post('/', (req, res)=>{
    if(req.body.EhAluno == 'true'){
        res.render('alunos/alunosAtualiza', {dados: req.body})
    }else{
        console.log('não ta indo pra pagina certa!!!')
        res.render('alunos/alunosCad', {dados: req.body})
    }
    
    
})
router.post('/verificaCad', (req, res)=>{
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
                    NovoUser.findOneAndUpdate(filter, update, {new: true}).then(()=>{
                        filter2 = {email: req.body.email}
                        update2 = {EhAluno: true}
                        NovoUser.findOneAndUpdate(filter2, update2, {new: true}).then((result)=>{
                            console.log(result)
                            res.render('alunos/alunosInicio', {dadoGerais: geral, pesos : pesos, porcem: porcem, infoAdi: InfoAdcional, taixas: taixas })
                        }).catch((err)=>{console.log(err)})
                    }).catch((err)=>{console.log(err)})

            
        }
})

router.post('/visualizaCad', (req, res)=>{
    NovoUser.findOne({_id: req.body.idDB}).then((query)=>{
        nsnipa = {
            'Nome': query.cadAluno.objNSNIPA.nome,
            'Sexo': query.cadAluno.objNSNIPA.sexo,
            'Nascimento': query.cadAluno.objNSNIPA.nascimento,
            'Idade': query.cadAluno.objNSNIPA.idade,
            'Peso': query.cadAluno.objNSNIPA.peso,
            'Altura': query.cadAluno.objNSNIPA.altura,
        }
        pesosKG = {
            'Peso residual' : query.cadAluno.objPesoKG_RMOG.Peso_Residual_KG,
            'Peso muscular' : query.cadAluno.objPesoKG_RMOG.Peso_Muscular_KG,
            'Peso osseo' : query.cadAluno.objPesoKG_RMOG.Peso_Osseo_KG,
            'Peso adiposo' : query.cadAluno.objPesoKG_RMOG.Peso_Gordura_KG
        }
        
        porcem = {
            'Musculo': query.cadAluno.objPorcem.Porcem_Musculo,
            'Residual' : query.cadAluno.objPorcem.Porcem_Residual,
            'Osseo' : query.cadAluno.objPorcem.Porcem_Osseo,
            'Gordura' : query.cadAluno.objPorcem.Porcem_Gordura
        }
        
        rate = {
            'Musculo': query.cadAluno.muscle_Rate,
            'Gordura' : query.cadAluno.Body_Fat_rate,
            'Osso' : query.cadAluno.bone_Rate
        }

        other = {
            'IMC' : query.cadAluno.Imc,
            'Densidade corporal': query.cadAluno.Densidade_Corporal,
            'Metabolismo basal' : query.cadAluno.Metabolismo_Basal,

        }


        res.render('alunos/visualizaAlunoDados', {nsnipa: nsnipa, pesosKG: pesosKG, porcem: porcem, rate: rate, other: other})
    })

})


module.exports = router