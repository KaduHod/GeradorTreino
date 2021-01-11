require('./main')

// Preciso criar um objeto que contem o treino
// preciso decidir qual a ordem do treino
// O treino precisa ter um numero de quantos exercicios?
// qual o tempo de descanso?
//VOu criar Um tabata
//COntem 8 exercicios
// 20 segundos de exercicio
// 10 de descanso
// Cada treino deve ter 2 exercicios de membros superiores, 2 exercicios de membros inferiores, 2 exercicios de core e 2 exercicios multiarticulares
// preciso criar o algoritmo que pega dois exercicios de cada "porcao".

/*console.log(Membros_inferiores_Resistencia)
console.log(Membros_superiores_Resistencia)
console.log(Core_Resistencia)*/

ArrayTabata = [ Multi_articular, Membros_inferiores, Membros_superior, Core]
console.log((ArrayTabata.length-1))




function pegaExerciciosCross(arrayPartesTreino){// ESta função pega dois exercicios de cada parte do corpor atingida
    TreinoCross = arrayPartesTreino.map((umDosValores)=>{
        Exercicio_De_Categoria = []
        var aleatorio = Math.floor(Math.random() * (arrayPartesTreino.length) );
        Exercicio_De_Categoria.push(umDosValores[aleatorio])
        umDosValores.splice(aleatorio,1)
        var aleatorio2 = Math.floor(Math.random() * (arrayPartesTreino.length) );
        Exercicio_De_Categoria.push(umDosValores[aleatorio2])
            return Exercicio_De_Categoria
        } 
    )
    return TreinoCross
}

ExerciciosCroos = pegaExerciciosCross(ArrayTabata)

function montaTreino(ExerciciosCroos){// ESta função cria um array com os exercicios do treino principal
    Treino = []
    ExerciciosCroos.map((array)=>{
        Treino.push(array[0])
    })
    ExerciciosCroos.map((array)=>{
        Treino.push(array[1])
    })
    return Treino
}
TreinoEstruturado = montaTreino(ExerciciosCroos)

/*TreinoEstruturado.map(()=>{

})*/
console.log(TreinoEstruturado[1].Nome_exercicio)
