const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
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
    }
})