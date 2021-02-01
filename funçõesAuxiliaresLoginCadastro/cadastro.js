const mongoose = require('mongoose')
const { NovoUser } = require("../models/usuario")

async function verificaCadastro(objInputs){
    objErros = {}
    for(var [chave, valor] of Object.entries(objInputs)){
        if(chave == 'nome'){
            if(valor.length < 5){
                objErros.nome = 'Nome curto' 
            }
        }
        if(chave == 'email'){
            VerificaEmailDB = await NovoUser.findOne({email: valor}).then((email2)=>{
                return email2
            }).catch((err)=>{
                console.log('erro: '+ err)
            })
            if(VerificaEmailDB !== null){
                objErros.email = 'Email ja cadastrado'
            }
        }
        if(chave == 'userName'){
            if(valor.length < 5){
                if(Array.isArray(objErros.userName)==false){objErros.userName = []}
                objErros.userName.push('Nome de usuario curto') 
            }
            VerificaUserNameDB = await NovoUser.findOne({userName: valor}).then((userName2)=>{
                return userName2
            }).catch((err)=>{
                console.log('erro: '+ err)
            })
            if(VerificaUserNameDB !== null){
                if(Array.isArray(objErros.userName)==false){objErros.userName = []}
                objErros.userName.push('User name ja cadastrado')
            }
        }
        if(chave == 'senha'){
            if(valor !== objInputs.confirmSenha){
                if(Array.isArray(objErros.senha)==false){objErros.senha = []}
                objErros.senha.push('Senhas não conferem')
            }
            if(valor.length < 7){
                if(Array.isArray(objErros.senha)==false){objErros.senha = []}
                objErros.senha.push('Senha curta')
            }
        }
        if(chave == 'nascimento'){
            nascimento2 = parseInt(valor)
            if((new Date().getFullYear()) - nascimento2 > 110 || (new Date().getFullYear()) - nascimento2 < 8){
                objErros.nascimento = 'Nascimento invalido!'
            }
        }
    }
    return await objErros
    
}

module.exports = {verificaCadastro}