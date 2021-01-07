//const importaClasse = require('./_treinos/classeTreino/musculoSimples')//Arquivco contendo a classe
const importaLesao = require('./_treinos/lesao')// Arquivo contendo a função de lesão
const impTreino = require('./_treinos/mostraTreino')// Arquivo com a função de mostrar o treino
require('./_muscles/musculos')

//var MusculoLesionado = importaLesao.lesao(Abdomen, lesionado)

lesaoBiceps = ['Braquial', 'Coracobraquial']
lesao = []
//console.log(Peitoral.porcoes)

var BIcepsLesionado = importaLesao.lesao(Biceps, lesaoBiceps)
var TreinoBiceps = impTreino.mostraTreino(BIcepsLesionado)

var PeitoralVerificaLesão  = importaLesao.lesao(Peitoral, lesao) 
var TreinoPeitoral = impTreino.mostraTreino(PeitoralVerificaLesão)

var DorsoVerificaLesão  = importaLesao.lesao(Dorso, lesao) 
var TreinoDorso = impTreino.mostraTreino(DorsoVerificaLesão)
//console.log(BIcepsLesionado)
console.log(TreinoPeitoral.exercicios)
console.log(TreinoBiceps.exercicios)
console.log(TreinoDorso.exercicios)



