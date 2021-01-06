const class_dobras = require('./classeSeteDobras')

class Aluno {
    constructor(nome, nascimento, sexo, dobras, peso, altura ,  circunCintura, circunQuadril){
        this.nome = nome
        this.sexo = sexo
        this.nascimento = nascimento
        this.dobras = dobras
        this.idade = undefined
        this.now = new Date
        this.idade =  this.now.getFullYear() - this.nascimento.ano 
        this.peso = peso
        this.altura = altura
        this.Densidade_Corporal = 0
        this.soma_7_dobras = dobras.total7dobras
        this.DBRU = dobras.DBRU
        this.DBDF = dobras.DBDF
        this.circunQuadril = circunQuadril
        this.circunCintura = circunCintura
        this.GorduraVisceral = "Não calculado ainda"
        this.GorduraPorcem = " Não calculado, ainda"
        this.Peso_Gordura_KG = " Não calculado, ainda"
        this.Peso_Osseo_KG = " Não calculado, ainda"
        this.Peso_Muscular_KG = "  Não calculado, ainda"
        this.Metabolismo_Basal = " Não calculado, ainda"
        this.Imc = " Não calculado, ainda"
        this.Peso_Residual_KG = " Não calculado ainda"
        this.Porcem_Musculo = " Não calculado ainda"
        this.Porcem_Gordura = " Não calculado ainda"     
        this.Porcem_Residual = " Não calculado ainda"
        this.Porcem_Osseo = " Não calculado ainda"
    }
    calcGorduraVisceral(){
        this.GorduraVisceral = this.circunCintura/this.circunQuadril
    }

    calcIMC(){
        this.Imc = this.peso/(Math.pow(this.altura,2))
    }
    calcDensidade(){
        this.Densidade_Corporal = 1.112 - 0.00043499 * (this.soma_7_dobras) + 0.00000055 * (this.soma_7_dobras) *2 - 0.00028826 * (this.soma_7_dobras)
        //this.Densidade_Corporal += " G/CM ³" 
    }
    calcGordura(){
        this.GorduraPorcem = (495/this.Densidade_Corporal) - 450
        //this.GorduraPorcem += " %"
    }
    calcPesoGordura(){
        this.Peso_Gordura_KG = (this.GorduraPorcem * this.peso)/100
    }
    calcPesoOsseo(){
        this.Peso_Osseo_KG = (3.02 * (Math.pow(this.altura, 2)) * (this.DBRU/1000) * (this.DBDF/1000) * 400)
        this.Peso_Osseo_KG = Math.pow(this.Peso_Osseo_KG, 0.712)
    }
    calcPesoResidual(){
        if(this.sexo == 'm'){
            this.Peso_Residual_KG = this.peso * 0.241
        }else{
            this.Peso_Residual_KG = this.peso * (20.9/100)
        } 
    }
    calcPesoMuscular(){
        this.Peso_Muscular_KG = this.peso -(this.Peso_Osseo_KG + this.Peso_Residual_KG + this.Peso_Gordura_KG) 
    }
    calcMetabolismoBasal(){
        if(this.sexo == 'm'){
            this.Metabolismo_Basal = (66 + (13.8 * this.peso) + (5 *(this.altura*100)) + (6.8 * this.idade))
        }else{
            this.Metabolismo_Basal = (655 + (9.6 * this.peso) + (1.8 *(this.altura*100)) + (4.7 * this.idade))
        }
        
    }
    calcPorcentagemPeso(){
        this.Porcem_Musculo = (this.Peso_Muscular_KG * 100)/this.peso
        this.Porcem_Gordura = (this.Peso_Gordura_KG* 100)/this.peso
        this.Porcem_Residual = (this.Peso_Residual_KG * 100)/this.peso
        this.Porcem_Osseo = (this.Peso_Osseo_KG * 100)/this.peso
    }
}

dataNasc = {
    dia: 12,
    mes: 10,
    ano: 1998
}


//console.log(AlunoNovo)

Carlos = new class_dobras.dadosAntropometricos(10 ,8, 25, 8, 25, 1, 22, 55, 98)
Carlos.Total7dobras()


AlunoNovo = new Aluno('Carlos', dataNasc, 'm', Carlos, 71, 1.80, 60, 85)
AlunoNovo.calcDensidade()
AlunoNovo.calcGordura()
AlunoNovo.calcPesoGordura()
AlunoNovo.calcPesoOsseo()
AlunoNovo.calcPesoResidual()
AlunoNovo.calcPesoMuscular()
AlunoNovo.calcMetabolismoBasal()
AlunoNovo.calcIMC()
AlunoNovo.calcGorduraVisceral()
AlunoNovo.calcPorcentagemPeso()

console.log(AlunoNovo)
