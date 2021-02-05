const express = require("express")
const router = express.Router()
const mongoose = require('mongoose')




router.post('/', (req, res)=>{
    res.render('alunos/alunosCad', {dados: req.body})
})



module.exports = router