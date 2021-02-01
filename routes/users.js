const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const { NovoUser } = require("../models/usuario")
require('./../models/usuario')
const {verificaCadastro} = require('../funçõesAuxiliaresLoginCadastro/cadastro')
const {encriptografa} = require('../funçõesAuxiliaresLoginCadastro/bcrypt')
const bcrypt = require('bcryptjs')

//Login
    router.get('/login', (req, res)=>{
        res.render('users/login')
    })

    router.post('/verificaLogin', async (req,res)=>{
        
        async function queryDB(){
            query = await NovoUser.find({email: req.body.email})
            return query[0]
        }
        ComparaSenha = await queryDB().then((queryDB)=>{
            return bcrypt.compareSync(req.body.Senha, queryDB.senha)
        }).catch((err)=>{
            console.log(err)
        })
        
        if(ComparaSenha == true){
            dados = await queryDB()
            res.render('inicio', {dados: dados})
        }else{
            error_msg = 'Senha invalida!'
            res.render('users/login', {dados: error_msg})
        }
        
        
    })

// Cadastro
    router.get('/cadastro', (req, res)=>{
        res.render('users/cadastro')
    })
    router.post('/verificaCadastro', (req,res)=>{

        async function verificaCad(){
            verificaCadastro2 = await verificaCadastro(req.body)
            return verificaCadastro2
        }

        verificaCad().then(async (errosDoCadastro)=>{
            if((Object.keys(errosDoCadastro).length)>0){
                res.render('users/cadastro', {dados: errosDoCadastro})
            }else{
                const salt = bcrypt.genSaltSync(10)
                const passHash = await bcrypt.hash(req.body.senha, salt)

                await new NovoUser({
                    userName : req.body.userName,
                    nome: req.body.nome,
                    email: req.body.email,
                    sexo: req.body.sexo,
                    nascimento: req.body.nascimento,
                    senha: passHash
                }).save().then(()=>{
                    console.log(`User ${req.body.userName} salvo com sucesso`)  
                }).catch((err)=>{
                    console.log('ERROR: ' + err)
                }) 

                res.render('users/login')
            }
        }).catch((err)=>{
            console.log(err)
        })
    })



module.exports = router