const importaClasse = require('./_treinos/classeTreino/musculoSimples')//Arquivco contendo a classe
const importaLesao = require('./_treinos/lesao')// Arquivo contendo a função de lesão
const impTreino = require('./_treinos/mostraTreino')// Arquivo com a função de mostrar o treino
require('./_muscles/musculos')

//var MusculoLesionado = importaLesao.lesao(Abdomen, lesionado)

lesao = []
var BIcepsLesionado = importaLesao.lesao(Biceps, lesao)
var treinoBiceps = impTreino.mostraTreino(BIcepsLesionado)
console.log(BIcepsLesionado)

console.log(treinoBiceps)

