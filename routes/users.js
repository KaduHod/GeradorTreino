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
            if(dados.EhAluno !== true){
                req.session.nascimento = dataDDMMYY(dados.nascimento)
            }
            req.session.nascimentoISO = dados.nascimento
            req.session.nome = dados.nome
            req.session.idDB = dados._id
            req.session.logged = true
            if(dados.EhAluno == true){req.session.EhAluno = dados.EhAluno}
            
            
            
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
                        //console.log(req.session)
                        if(!req.session.viewCoutn){
                            req.session.viewCoutn =1
                        }else{
                            req.session.viewCoutn +=1
                        }
                       if(dados.EhAluno == true){
                           dadosCadAluno1 = dados.cadAluno.dobras
                           dadosCadAluno2 = dados.cadAluno.objMedidas
                           delete dadosCadAluno2.DBRU
                           delete dadosCadAluno2.DBDF
                           delete dados.cadAluno.objNSNIPA.nome
                           dadosCadAluno3 = dados.cadAluno.objNSNIPA
                        res.render('users/userInicioAluno', {dados: dados, viewCount: req.session.viewCoutn,  session: req.session, dadosCadAluno1: dadosCadAluno1, dadosCadAluno2: dadosCadAluno2, dadosCadAluno3: dadosCadAluno3})
                       }else{
                        res.render('users/userInicio', {dados: dados, viewCount: req.session.viewCoutn,  session: req.session})
                       }
                        
                        
                    }
                    
                }else{
                    error_msg = 'Senha invalida!'
                    res.render('users/login', {dados: error_msg})
                }
                
            }
        
       
        
    })

//Volta pagina inicial
    router.post('/paginaInicial' ,(req, res)=>{
        NovoUser.findOne({email: req.body.email}).then((query)=>{
            //ESta rota é usada para retornar a pagina principal de aluno
            // nele uso o email passado como parametro para pesquisar o usuario na db e depois pegar os dados necessarios para a pagina inicial

            dados = query
            dadosCadAluno1 = dados.cadAluno.dobras
            dadosCadAluno2 = dados.cadAluno.objMedidas
            delete dadosCadAluno2.DBRU
            delete dadosCadAluno2.DBDF
            delete dados.cadAluno.objNSNIPA.nome
            dadosCadAluno3 = dados.cadAluno.objNSNIPA


            req.session.userName = dados.userName
            req.session.email = dados.email
            req.session.sexo = dados.sexo
            req.session.nascimentoISO = dados.nascimento
            if(dados.EhAluno !== true){
                req.session.nascimento = dataDDMMYY(dados.nascimento)
            }
            req.session.nome = dados.nome
            req.session.idDB = dados._id
            req.session.logged = true
            req.session.EhAluno = dados.EhAluno

            res.render('users/userInicioAluno', {dados: dados, viewCount: req.session.viewCoutn,  session: req.session, dadosCadAluno1: dadosCadAluno1, dadosCadAluno2: dadosCadAluno2, dadosCadAluno3: dadosCadAluno3})
        }).catch((err)=>{
            console.log(err)
        })
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