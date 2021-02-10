const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    userName: {
        type:String,
        required: true
    },
    nome: {
        type: String,
        required: true
    },
    sexo:{
        type: String,
        required:true
    },
    nascimento: {
        type: Date,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    EhAdmin: {
        type: Boolean,
        required: false
    },
    cadAluno: {
        type: Object,
        required: false
    },
    EhAluno: {
        type: Boolean,
        required: false
    }
})

mongoose.model('User', User)
const NovoUser = mongoose.model('User')


module.exports ={
    NovoUser
}