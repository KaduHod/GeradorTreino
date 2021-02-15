const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const { NovoMusculo } = require('../models/models')
require('../models/models')
const Musculo = mongoose.model('Muscle')
const {MontaTreino} = require('../_treinos/_treinoMuscFuncoes/MontaTreino')// retorna array com objs do treino
const {formaArrayHandlebarsTable} = require('../_treinos/_treinoMuscFuncoes/MontaTreino') // retorna array com treino para a tabela no handlebars
const {formaTabelaHandlebars} = require('../_treinos/_treinoMuscFuncoes/MontaTreino')


router.post('/', (req, res)=>{
    Musculo.find().then((query)=>{
        res.render('treinos/formularioMusculacao',{musculos: query, user: req.body})
    })
})
// SO VOU CONSEGUIR FAZER A PARTE DE LESOE COM OUTRA TAMPLATE ENGINE POIS NÃO CONSIGO SEPARAR ATRIBUTOS DE UM OBJETO DENTRO DE OUTRO OBJETO (NÃO CONSIGO REFERENCIAR QUAL LESÃO É DO MUSCULO ESCOLHIDO)
/*router.post('/lesao', (req, res)=>{// pagina que vai registrar as lesoes
    chaves = Object.keys(req.body)
    userData = req.body
    chavesUserData = []
    chavesMusculos = []
    arrUserData = []
    chaves.map((valorChave)=>{
        if(valorChave == 'musculo' || valorChave == 'musculo1' || valorChave == 'musculo2'){
            chavesMusculos.push(valorChave)
            //delete userData[valorChave]
        }else{
            chavesUserData.push(valorChave)
        }
    }) 
    var musculo_form = req.body.musculo
    var musculo1_form = req.body.musculo1
    var musculo2_form = req.body.musculo2
    arr_musc_form = [musculo_form, musculo1_form, musculo2_form]
    arrObjMusc = []
    arr_musc_form.map((nomeMusc)=>{
        Musculo.findOne({nome:nomeMusc}).then((query)=>{
            musculo = query

            // tenho que tirar area adicional das porcoes
            chavesPorcoes = Object.keys(musculo.porcoes)
            indexAreaAdicional = chavesPorcoes.indexOf('areaAdicional')
            if(indexAreaAdicional > -1){
                delete musculo.porcoes['areaAdicional']
            }   
            arrObjMusc.push(musculo)
            if(arrObjMusc.length > 2){ 
                console.log(arrObjMusc)               
                res.render('treinos/lesao', {musculo: arrObjMusc, userData: userData})
            }
        })
        
    })
})*/


// pagina que vai montar o treino

//preciso saber quais inputs das porcoes foram marcados foram marcados
router.post('/geraTreino', (req, res)=>{
    
    userData = req.body
    arr_objMuscEscolhidos = []
    NovoMusculo.findOne({nome: req.body.musculo}).then((query)=>{
        arr_objMuscEscolhidos.push(query)
        NovoMusculo.findOne({nome: req.body.musculo1}).then((query2)=>{
            arr_objMuscEscolhidos.push(query2)
            NovoMusculo.findOne({nome: req.body.musculo2}).then((query3)=>{
                arr_objMuscEscolhidos.push(query3)
                const treino = MontaTreino(arr_objMuscEscolhidos)
                arrHandlebars = formaArrayHandlebarsTable(treino)
                userData.treino = treino
                

                arr_tabela = formaTabelaHandlebars(userData.treino)
                console.log(arr_tabela)

                arr_nomes = arr_tabela[0]
                arr_linha1 = arr_tabela[1]
                arr_linha2 = arr_tabela[2]
                arr_linha3 = arr_tabela[3]
                arr_linha4 = arr_tabela[4]


                res.render('treinos/geraTreino', {dados: userData, nomesMusculos: arr_nomes, linha1: arr_linha1, linha2: arr_linha2, linha3: arr_linha3, linha4: arr_linha4})
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
    
    
})



module.exports = router
