

class Aluno {
    constructor(nome, nascimento, sexo, dobras, peso){
        this.nome = nome
        this.sexo = sexo
        this.nascimento = nascimento
        this.dobras = dobras
        this.idade = undefined
        this.now = new Date
        this.idade =  this.now.getFullYear() - this.nascimento.ano + " anos"
        this.peso = peso
        this.dc_ = 0
    }

    DC(){
        if(this.sexo == 'm'){
            this.dc_ = 1.1093800 - 0.0008267 *(this.dobras) + 0.00000016 * ((this.dobras)*(this.dobras)) - 0.0002574
        }else{
            this.dc_ = 1.099492 - 0.0009929 *(this.dobras) + 0.00000023 * ((this.dobras)*(this.dobras)) - 0.0001392
        }
    }
}
dobras = {
    PT: 15,
    ABD: 20,
    CX: 22,
    soma: 15 + 20 + 22
}

data = {
    dia: 12,
    mes: 10,
    ano: 1998
}
AlunoNovo = new Aluno('Carlos', data, 'f', dobras.soma, 71)
AlunoNovo.DC('m')
console.log(AlunoNovo)
