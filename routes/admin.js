const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const { NovoUser } = require("../models/usuario")
const models = require('../models/models')
const {dataDDMMYY} = require('../funçõesAuxiliares/datas')
const {verificaCadastro} = require('../funçõesAuxiliares/cadastro')


router.get('/', (req, res)=>{
    res.render('/inicioAdmin')
})

router.get('/crud', (req, res)=>{
    res.render('admin/crudOptions')
})

router.get('/AlunoCrud', (req, res)=>{
    NovoUser.find({EhAluno:true}).then((query)=>{
        arrayDeAlunosFiltrado = []
            query.map((Aluno)=>{
                objDeAlunoFiltrado = {}
                objDeAlunoFiltrado._id =Aluno._id
                objDeAlunoFiltrado.nome = Aluno.nome
                objDeAlunoFiltrado.email = Aluno.email
                objDeAlunoFiltrado.sexo = Aluno.sexo
                objDeAlunoFiltrado.idade = Aluno.cadAluno.idade
                objDeAlunoFiltrado.peso = Aluno.cadAluno.peso
                arrayDeAlunosFiltrado.push(objDeAlunoFiltrado)
                
            })
            console.log(arrayDeAlunosFiltrado)

            res.render('admin/crudAlunos', {dados: arrayDeAlunosFiltrado})
        //console.log(query[0].cadAluno.objNSNIPA)
    }).catch((err)=>{
        console.log(err)
    })
        
})

router.get('/userCrud', async(req, res)=>{
    NovoUser.find().then((usuarios)=>{
        /*data = usuarios[0].nascimento.getFullYear();
        console.log(data)*/
        usuarios.map((usuarios)=>{
            dataFormatada = dataDDMMYY(usuarios.nascimento) 
            usuarios.nascimento2 = dataFormatada
        })
        //console.log(usuarios[0].nascimento)
        res.render('admin/crudUsers', {dados:usuarios})
    }).catch((err)=>{
        console.log(err)
    })
})

router.get('/edit/:id', (req, res)=>{
    NovoUser.findOne({_id: req.params.id}).then((user)=>{
        user.nascimento2 = dataDDMMYY(user.nascimento)
        res.render('admin/editUser', {dados: user})
    })
})

router.post('/edit/update', (req, res)=>{
    NovoUser.updateOne({_id: req.body.id}, {$set:{nome: req.body.nome, nascimento: req.body.nascimento,userName: req.body.username, sexo: req.body.sexo, EhAdmin: req.body.EhAdmin}}, {multi:true}).then(()=>{
        console.log('Sucesso ao salvar atualização de '+req.body.nome)
        success_msg = `User ${req.body.nome} atualizado com com sucesso! `
        res.render('admin/crudOptions', {dados_atualiza:success_msg})
    }).catch((err)=>{
        console.log(err)
    })
})

router.get('/exclude/:id', (req, res)=>{
    NovoUser.deleteOne({_id: req.params.id}).then((user)=>{
        res.redirect('/admin/userCrud')
    }).catch((err)=>{
        console.log(err)
    })
})

router.get('/CrudGeral', (req, res)=>{
    NovoUser.find().then((queryUser)=>{
        queryUser.forEach((user)=>{
            user.nascimento2 = dataDDMMYY(user.nascimento)
            
        })
        return queryUser
       
    }).then((queryUser)=>{
        arrQuerys = [queryUser]
        models.NovoAluno.find().then(queryAlunos => {
            arrQuerys.push(queryAlunos)
            return arrQuerys
            
        }).then((arrQuerys)=>{
            models.NovoMusculo.find().then((queryMusculos)=>{
                // indice 6 = abdomen
                // indice 14 = poeitoral
                //vou separar os exercicios de peitoral
                PeitoralMaior = queryMusculos[14].porcoes.Maior
                exerciciosPM = []
                for(porcao in PeitoralMaior){
                    PeitoralMaior[porcao].forEach((exercicio)=>{
                        exerciciosPM.push(exercicio)
                    })
                }
                //console.log(exerciciosPM)

                AbdomenObliquo = queryMusculos[6].porcoes.Obliquo
                exerciciosAO = []
                for(porcao in AbdomenObliquo){
                    AbdomenObliquo[porcao].forEach((exercicio)=>{
                        exerciciosAO.push(exercicio)
                    })
                }
                //console.log(exerciciosAO)
                arrQuerys.push(queryMusculos)
                arrNecessario = [arrQuerys, exerciciosPM, exerciciosAO]
                return arrNecessario
                
            }).then((arrNecessario)=>{
                models.ExerciciosCross.find().then((queryCross)=>{
                    //console.log(queryCross)
                    arrQuerys.push(queryCross)
                    res.render('admin/CrudGeralOptions', {User:arrNecessario[0][0], Alunos: arrNecessario[0][1], Musculos: arrNecessario[0][2], Cross: arrNecessario[0][3], PeitoralMaior: arrNecessario[1], AbdomenObliquo:arrNecessario[2]})
                })

                
            })
        }).catch(err=>console.log(err))
        
    }).catch((err)=>{
        console.log(err + 'Erro ao consultar dados de users')
    })

    
})




module.exports = router