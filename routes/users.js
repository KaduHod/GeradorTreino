const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')
const { NovoUser } = require("../models/usuario")
require('./../models/usuario')
const {verificaCadastro} = require('../funçõesAuxiliares/cadastro')
const {encriptografa} = require('../funçõesAuxiliares/bcrypt')
const bcrypt = require('bcryptjs')
const {dataDDMMYY} = require('../funçõesAuxiliares/datas')

//Pagina meus dados
    router.get('/', (req, res)=>{
        res.redirect('users/index')
    })

//Login
    router.get('/login', (req, res)=>{
        res.render('users/login')
    })

    router.post('/verificaLogin', async (req,res)=>{
        
        async function queryDB(){
            query = await NovoUser.find({email: req.body.email})
            //onsole.log(query[0])
            return query[0]
        }
        ComparaSenha = await queryDB().then((queryDB)=>{
            //console.log(queryDB)
            return bcrypt.compareSync(req.body.Senha, queryDB.senha)
        }).catch((err)=>{
            console.log(err)
        })
            dados = await queryDB()
            req.session.userName = dados.userName
            req.session.email = dados.email
            req.session.sexo = dados.sexo
            req.session.nascimento = dataDDMMYY(dados.nascimento)
            req.session.nascimentoISO = dados.nascimento
            req.session.nome = dados.nome
            req.session.idDB = dados._id
            if(!req.session.idDB){
                res.redirect('/')
            }else{
                console.log('true')
                if(ComparaSenha == true){
            
                    if(dados.EhAdmin == true){
                        if(!req.session.viewCoutn){
                            req.session.viewCoutn =1
                        }else{
                            req.session.viewCoutn +=1
                        }
                        
                        res.render('admin/inicioAdmin', {dados: dados, viewCount: req.session.viewCoutn, session: req.session})
                    }else{
                        //console.log(dados)
                        if(!req.session.viewCoutn){
                            req.session.viewCoutn =1
                        }else{
                            req.session.viewCoutn +=1
                        }
                       
                        res.render('users/userInicio', {dados: dados, viewCount: req.session.viewCoutn,  session: req.session})
                        
                    }
                    
                }else{
                    error_msg = 'Senha invalida!'
                    res.render('users/login', {dados: error_msg})
                }
                
            }
        
       
        
    })

// Cadastro
    router.get('/cadastro', (req, res)=>{
        res.render('users/cadastro')
    })
    router.post('/verificaCadastro', (req,res)=>{

        async function verificaCad(){
            verificaCadastro2 = await verificaCadastro(req.body, false)
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
                    senha: passHash,
                    EhAdmin: false
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