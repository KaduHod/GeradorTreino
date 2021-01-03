const importaClasse = require('../classeTreino/musculoSimples')//Arquivco contendo a classe
const importaLesao = require('../lesao')// Arquivo contendo a função de lesão
const importaTreino = require('../mostraTreino')// Arquivo com a função de mostrar o treino
require('../../_muscles/musculos')

lesao = ['Soleo','Tibial',"Gastrocnemio"] // variavel que armazena as lesoes ele deve conter o nome da porção lesionada
//var BIcepsLesionado = importaLesao.lesao(Biceps, lesao)
//var treinoBiceps = importaTreino.mostraTreino(BIcepsLesionado)
//console.log(BIcepsLesionado)

//console.log(treinoBiceps)

// Preciso criar uma função que chama a funcção de lesoes, e com o seu retorno, chama a funcção mostra treino!
// Peciso de alguns dados: Objeto do musculo, e array com as porções lesionadas
// Será insteressante aplicar as validações para esses dados
// As porções devem ser condizentes com o do objeto musculo
// caso um musculo tenha movimentos unicos todas as porções devem ser adicionadas as lesoes
//VOu criar uma listade musculo uma lesão afeta a funcionalidade das outras porções

function filtraTreino(Musculo, Lesoes){
    arr_retorno_principal = []
    afeta_musculo_inteiro = [Biceps.nome, Triceps.nome, Antebraco.nome, Peitoral.nome, Abdomen.nome, Psoas.nome, Dorso.nome, Gluteo.nome, Quadriceps.nome, PosteriorCoxa.nome]// Array qe cntem os musculos que n podem ser treinados com uma lesão

    acha_nome_afeta_todas_as_porcoes = afeta_musculo_inteiro.find(nome => nome == Musculo.nome)

    if(acha_nome_afeta_todas_as_porcoes == Musculo.nome){// verifica se o musculo passado como parametro entra na condição de lesao afeta tudo
        verifica_erro = 0
        Chaves_das_porcoes= Object.keys(Musculo.porcoes)
        for(lesao of Lesoes){
            if(Chaves_das_porcoes.indexOf(lesao) < 0){
                verifica_erro++
            }
        }
        if(verifica_erro>0){
            //console.log('Não podemos prosseguir')
        }else{
            arr_retorno_principal[0] = Musculo
            arr_retorno_principal[1] = Lesoes
        }
    }else{
        if(Musculo.nome == 'Panturrilha'){
            arr_pantu = ['Gastrocnemio', 'Soleo','Tibial']
            cont_erro =0
            for(porcao_Lesoes of Lesoes){
                if(arr_pantu.indexOf(porcao_Lesoes) < 0){
                    //console.log("Achei um erro não podemos continuar")
                    cont_erro++
                }
            }
            if(cont_erro > 0){
                //console.log("Não podemos continuar, houve um erro nas lesoes de panturrilha")
            }else{
                arr_retorno_principal[0] = Musculo
                arr_retorno_principal[1] = Lesoes
            }
        }else{
            //verificar trapezio e outros musculos que não se encaixam nos afeta_todos e panturrilha
        }
    }
    return arr_retorno_principal
}

teste = filtraTreino(Panturrilha, lesao)

console.log(teste)
