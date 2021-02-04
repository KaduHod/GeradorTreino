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
        verificaCadastro(req.body, true).then((errosDoCadastro)=>{
            if((Object.keys(errosDoCadastro).length)>0){

                //CONTINUAR DESTA PARTE. PELO QUE EU PENSEI PRECISO MONTAR UM SCRIPT DE VERIFICAÇÃO DE INPUST NA PAGINA DE VIEWS POIS , APARENTEMENTE NÃO É POSSIVEL RENDERIZAR A PAGINA COM AS INFORMAÇÕES DE ERRO QUE EU PRECISO
                res.redirect(`/admin/edit/${req.body.id}`,{dados:errosDoCadastro})
                console.log(errosDoCadastro)
            }else{
                console.log("Tudo certo ")
                res.redirect('../crud')
            }
        })
        console.log('Sucesso ao salvar atualização de '+req.body.nome)
        
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