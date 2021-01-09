/* objt exercicioCrossTRainning :
            {
                Categoria: Potencia, Resistencia, Isometria  e mobilidade
                Nome_exercicio:
                execução: "Não sei se vou ter que descrever os exercicios por ser muito trabalho
                Parte_do_corpo_atingida : membros inferiores, core, membros superiores
                Equipamento: Barra, Barra fixa, Halter, Ketbell, jump, corda, escada etc
                "aqui preciso criar uma propriedade que descreve o descanso entre exercicios, seria interessante criar um metodo que analisa a categoria do exercicio e seta um tempo de descanso ou tipo de descanso de acordo com a categoria"

            }
            // OBJ exerciciosAquecimentoCRoss  Pensar em como vou organizar os treinos
            {
                Categoria
                Nome:
            }
            */

class exercicioCrossTrainning{
    constructor(Categoria, Nome_exercicio, Parte_do_corpo_recrutada, Equipamento){
        this.Categoria = Categoria
        this.Nome_exercicio = Nome_exercicio
        this.Parte_do_corpo_recrutada = Parte_do_corpo_recrutada
        this.Equipamento = Equipamento

    }
}


module.exports = {
    exercicioCrossTrainning
}