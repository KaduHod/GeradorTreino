const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
const { NovoUser } = require("../models/usuario")
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





module.exports = router