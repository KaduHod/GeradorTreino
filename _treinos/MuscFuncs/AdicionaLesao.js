require('../../_muscles/musculos')
const filtraLesao = require('./VerificaPorcaoLesao')


array_lesao_triceps = ['Longa']

//verificaLesao = filtraLesao.VerificaPorcaoLesao(Triceps, array_lesao_triceps)

// tenho que fazer uma função que adiciona as lesoes ao musculo passado como parametro
function oi(){
    alert('oi')
}


function adicionaLesao2(musculo, arr_lesao){
    verificaLesao = filtraLesao.VerificaPorcaoLesao(musculo, arr_lesao)
    musculoFiltrado = musculo
    if(verificaLesao == true){
        // array que contem musculos que não podem ser treinados com uma lesao
        afeta_musculo_inteiro = [Biceps.nome, Triceps.nome, Antebraco.nome, Peitoral.nome, Abdomen.nome, Psoas.nome, Dorso.nome, Gluteo.nome, Quadriceps.nome, PosteriorCoxa.nome]

        // Array que armazena as chaves das porcoes do musculo
        arr_musculo_porcoes = Object.keys(musculoFiltrado.porcoes)

        if(afeta_musculo_inteiro.indexOf(musculoFiltrado.nome) == -1){// Aqui eu verifico se o musculo esta na condição afeta musculo inteiro
            arr_lesao.map((porcao_lesionada)=>{
                musculoFiltrado.porcoes[porcao_lesionada] = ['Musculo lesionado']
            })
            return musculoFiltrado
        }else{

            //Se o treino completo do musculo deve ser filtrado
            for(porcao in musculoFiltrado.porcoes){
                if(Array.isArray(musculoFiltrado.porcoes[porcao]) == true){
                    musculoFiltrado.porcoes[porcao] = ['Musculo lesionado']
                }else{
                    for(subPorcao in musculo.porcoes[porcao]){
                        musculoFiltrado.porcoes[porcao][subPorcao] = ['Musculo lesionado']
                    }
                }
            }
            return musculoFiltrado
        }
    }else{
        return false
    }
}

//console.log(adicionaLesao(Trapezio, array_lesao_triceps))

