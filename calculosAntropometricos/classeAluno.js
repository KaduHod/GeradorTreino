const { model } = require('mongoose')
const class_dobras = require('./classeSeteDobras')

class Aluno {
    constructor(nome, nascimento, sexo, dobras, peso, altura ,  circunCintura, circunQuadril, circunPunho){
        this.nome = nome//foi array
        this.sexo = sexo//foi array
        this.nascimento = nascimento//foi array

        this.dobras = dobras
        this.now = new Date

        this.idade =  this.now.getFullYear() - this.nascimento.ano //foi array
        this.peso = peso//foi array
        this.altura = altura//foi array
        this.objNSNIPA = {
            nome: this.nome,
            sexo: this.sexo,
            nascimento: this.nascimento,
            idade: this.idade,
            peso: this.peso,
            altura: this.altura
        }

        this.Densidade_Corporal = 0//foi array
        this.soma_7_dobras = dobras.total7dobras//foi array
        this.DBRU = dobras.DBRU//foi array
        this.DBDF = dobras.DBDF//foi array
        this.circunPunho = circunPunho//foi array
        this.circunQuadril = circunQuadril//foi array
        this.circunCintura = circunCintura//foi array
        this.objMedidas = {
            Densidade_Corporal: this.Densidade_Corporal ,
            soma_7_dobras:this.soma_7_dobras,
            DBRU:this.DBRU,
            DBDF:this.DBDF ,
            circunPunho:this.circunPunho ,
            circunQuadril:this.circunQuadril ,
            circunCintura:this.circunCintura
        }

        this.Peso_Gordura_KG = " Não calculado, ainda"//foi array
        this.Peso_Osseo_KG = " Não calculado, ainda"//foi array
        this.Peso_Muscular_KG = "  Não calculado, ainda"//foi array
        this.Peso_Residual_KG = " Não calculado ainda"//foi array
        this.objPesoKG_RMOG = {
            Peso_Residual_KG: this.Peso_Residual_KG, 
            Peso_Muscular_KG: this.Peso_Muscular_KG, 
            Peso_Osseo_KG: this.Peso_Osseo_KG, 
            Peso_Gordura_KG: this.Peso_Gordura_KG
        }

        this.GorduraVisceral = "Não calculado ainda"
        this.Porcem_Gordura = "Não calculado ainda"

        this.Porcem_Musculo = " Não calculado ainda"//foi array
        this.Porcem_Residual = " Não calculado ainda"//foi array
        this.Porcem_Osseo = " Não calculado ainda"//foi array
        this.Porcem_Gordura = " Não calculado ainda"//foi array
        this.objPorcem = {
            Porcem_Musculo:this.Porcem_Musculo ,
            Porcem_Residual:this.Porcem_Residual ,
            Porcem_Osseo:this.Porcem_Osseo ,
            Porcem_Gordura:this.Porcem_Gordura, 
        }

        this.Metabolismo_Basal = " Não calculado, ainda"
        this.Imc = " Não calculado, ainda"

        this.muscle_Rate = " Não calculado ainda"//foi array
        this.Body_Fat_rate = "Não calculado ainda"//foi array
        this.bone_Rate = " Não calculado ainda"//foi array
        this.objRate = {
            muscle_Rate:this.muscle_Rate ,
            Body_Fat_rate: this.Body_Fat_rate ,
            bone_Rate:this.bone_Rate
            }
        
    }
    calcGorduraVisceral(){
        this.GorduraVisceral = this.circunCintura/this.circunQuadril
    }

    calcIMC(){
        this.Imc = this.peso/(Math.pow(this.altura,2))
    }
    calcDensidade(){
        this.Densidade_Corporal = 1.112 - 0.00043499 * (this.soma_7_dobras) + 0.00000055 * (this.soma_7_dobras) *2 - 0.00028826 * (this.soma_7_dobras)
        this.objMedidas.Densidade_Corporal = this.Densidade_Corporal
        
    }
    calcGordura(){
        this.GorduraPorcem = (495/this.Densidade_Corporal) - 450
        //this.GorduraPorcem += " %"
        

    }
    calcPesoGordura(){
        this.Peso_Gordura_KG = (this.GorduraPorcem * this.peso)/100
        this.objPesoKG_RMOG.Peso_Gordura_KG = this.Peso_Gordura_KG
        
    }
    calcPesoOsseo(){
        this.Peso_Osseo_KG = (3.02 * (Math.pow(this.altura, 2)) * (this.DBRU/1000) * (this.DBDF/1000) * 400)
        this.Peso_Osseo_KG = Math.pow(this.Peso_Osseo_KG, 0.712)
        this.objPesoKG_RMOG.Peso_Osseo_KG = this.Peso_Osseo_KG
    }
    calcPesoResidual(){
        if(this.sexo == 'm'){
            this.Peso_Residual_KG = this.peso * 0.241
            this.objPesoKG_RMOG.Peso_Residual_KG = this.Peso_Residual_KG
        }else{
            this.Peso_Residual_KG = this.peso * (20.9/100)
            this.objPesoKG_RMOG.Peso_Residual_KG = this.Peso_Residual_KG
        } 
    }
    calcPesoMuscular(){
        this.Peso_Muscular_KG = this.peso -(this.Peso_Osseo_KG + this.Peso_Residual_KG + this.Peso_Gordura_KG)
        this.objPesoKG_RMOG.Peso_Muscular_KG = this.Peso_Muscular_KG 
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

        this.objPorcem.Porcem_Musculo = this.Porcem_Musculo
        this.objPorcem.Porcem_Gordura = this.Porcem_Gordura
        this.objPorcem.Porcem_Residual = this.Porcem_Residual
        this.objPorcem.Porcem_Osseo = this.Porcem_Osseo
    }
    analisaGordura(){
        if(this.sexo=="m"){
            if(this.idade <= 18 && this.idade >= 20 ){
                if(this.Porcem_Gordura <= 6.2){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 6.2 && this.Porcem_Gordura <= 14.3 ){
                    this.Body_Fat_rate = " Ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 14.3 && this.Porcem_Gordura <= 20.2  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 20.2 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 20 && this.idade <= 25 ){
                if(this.Porcem_Gordura <= 7.3){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 7.3 && this.Porcem_Gordura <= 14.4 ){
                    this.Body_Fat_rate = "Normal" 
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 15.4 && this.Porcem_Gordura <= 21.2  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 21.2){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 25  || this.idade <= 30 ){
                if(this.Porcem_Gordura < 10.6){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 10.6 && this.Porcem_Gordura <= 16.4 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 16.4 && this.Porcem_Gordura <= 23.4  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 23.4 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 30  || this.idade <= 35 ){
                if(this.Porcem_Gordura < 11.6){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 11.6 && this.Porcem_Gordura <= 17.5 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 17.5 && this.Porcem_Gordura <= 24.5  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 24.5 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 35  || this.idade <= 40 ){
                if(this.Porcem_Gordura < 12.7){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 12.7 && this.Porcem_Gordura <= 20.2){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 20.2 && this.Porcem_Gordura <= 25.6  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 25.6 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 40  || this.idade <= 45 ){
                if(this.Porcem_Gordura < 13.8){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 13.8 && this.Porcem_Gordura <= 21.3 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 21.3 && this.Porcem_Gordura <= 26.6  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 26.6 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 45  || this.idade <= 50 ){
                if(this.Porcem_Gordura < 14.8){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 16.9 && this.Porcem_Gordura <= 22.4 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 22.4 && this.Porcem_Gordura <= 27.7  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 27.7 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 50  || this.idade <= 55 ){
                if(this.Porcem_Gordura < 18){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 18 && this.Porcem_Gordura <= 23.4 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 23.4 && this.Porcem_Gordura <= 29.7  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 29.7 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 55){
                if(this.Porcem_Gordura < 19.1){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 19.1 && this.Porcem_Gordura <= 26 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 26 && this.Porcem_Gordura <= 30.8  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 30.8 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }
        }else{
            if(this.idade <= 18 && this.idade >= 20 ){
                if(this.Porcem_Gordura <= 17.7){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 17.7 && this.Porcem_Gordura <= 23.2 ){
                    this.Body_Fat_rate = " Ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 23.2 && this.Porcem_Gordura <= 29  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 29 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 20 && this.idade <= 25 ){
                if(this.Porcem_Gordura <= 18.4){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 18.4 && this.Porcem_Gordura <= 23.8 ){
                    this.Body_Fat_rate = "Normal" 
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 23.8 && this.Porcem_Gordura <= 30.8 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 30.8){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 25  || this.idade <= 30 ){
                if(this.Porcem_Gordura < 19){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 19 && this.Porcem_Gordura <= 24.5 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 24.5 && this.Porcem_Gordura <= 31.5  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 31.5 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 30  || this.idade <= 35 ){
                if(this.Porcem_Gordura < 21.5){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 21.5 && this.Porcem_Gordura <= 26.7 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 26.7 && this.Porcem_Gordura <= 32.1  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 32.1 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 35  || this.idade <= 40 ){
                if(this.Porcem_Gordura < 22.2){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 22.2 && this.Porcem_Gordura <= 27.3){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 27.3 && this.Porcem_Gordura <= 33.8 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 33.8 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 40  || this.idade <= 45 ){
                if(this.Porcem_Gordura < 22.8){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 22.8 && this.Porcem_Gordura <= 2.9 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 27.9 && this.Porcem_Gordura <= 34.4){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 34.4 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 45  || this.idade <= 50 ){
                if(this.Porcem_Gordura < 23.4){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 23.4 && this.Porcem_Gordura <= 28.6 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 28.6 && this.Porcem_Gordura <= 35 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 35 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 50  || this.idade <= 55 ){
                if(this.Porcem_Gordura < 25.9){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 25.9 && this.Porcem_Gordura <= 30.7 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 30.7 && this.Porcem_Gordura <= 36.6  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 36.6 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }else if(this.idade > 55){
                if(this.Porcem_Gordura < 26.5){
                    this.Body_Fat_rate = "Abaixo do ideal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 26.5 && this.Porcem_Gordura <= 31.3 ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 31.3 && this.Porcem_Gordura <= 37.2  ){
                    this.Body_Fat_rate = "Normal "
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }if(this.Porcem_Gordura > 37.2 ){
                    this.Body_Fat_rate = "Acima do normal"
                    this.objRate.Body_Fat_rate = this.Body_Fat_rate
                }
            }
        }
    }
    analisaMusculo(){
        if(this.sexo == 'f'){
            if(this.Porcem_Musculo < 25){
                this.muscle_Rate = ' Abaixo do ideal'
                this.objRate.muscle_Rate = this.muscle_Rate
            }else if(this.Porcem_Musculo > 25 && this.Porcem_Musculo <= 30 ){
                this.muscle_Rate = ' Ideal'
                this.objRate.muscle_Rate = this.muscle_Rate
            }else{
                this.muscle_Rate = 'Muito bom!'
                this.objRate.muscle_Rate = this.muscle_Rate
            }
        }else{
            if(this.Porcem_Musculo < 33){
                this.muscle_Rate = ' Abaixo do ideal'
                this.objRate.muscle_Rate = this.muscle_Rate
            }else if(this.Porcem_Musculo > 33){
                this.muscle_Rate = ' Ideal'
                this.objRate.muscle_Rate = this.muscle_Rate
            }
        }
    }
    calcEstruturaOssea(){
        this.estrutra_Ossea = (this.altura*100)/this.circunPunho

    }
    analisaOssos(){
        if(this.sexo = 'm'){
            if(this.estrutra_Ossea > 10.4){
                this.bone_Rate = "Estrutura pequena" 
                this.objRate = this.bone_Rate
            }else if(this.estrutra_Ossea <= 10.4 && this.estrutra_Ossea >= 9.6){
                this.bone_Rate = "Estrutura média"
                this.objRate = this.bone_Rate
            }else if(this.estrutra_Ossea < 9.6) {
                this.bone_Rate = "Estrutura grande"
                this.objRate = this.bone_Rate 
            }
        }else{
            if(this.estrutra_Ossea > 10.9){
                this.bone_Rate = "Estrutura pequena"
                this.objRate = this.bone_Rate
            }else if(this.estrutra_Ossea <= 10.9 && this.estrutra_Ossea >= 9.4){
                this.bone_Rate = "Estrutura média"
                this.objRate = this.bone_Rate
            }else if(this.estrutra_Ossea < 9.4){
                this.bone_Rate = "Estrutura grande"
                this.objRate = this.bone_Rate
            }
        }
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


AlunoNovo = new Aluno('Carlos', dataNasc, 'm', Carlos, 71, 1.80, 60, 85, 12)
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
AlunoNovo.analisaGordura()
AlunoNovo.analisaMusculo()
AlunoNovo.calcEstruturaOssea()
AlunoNovo.analisaOssos()
//console.log(AlunoNovo)

model.exports = {
    AlunoNovo
}
