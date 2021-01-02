require("../_muscles/musculos")

au_hasard = function(array){
    range = array.length
    la_chance  = Math.floor(Math.random() * range)
    return la_chance;
}


function mostraTreino(obj){// função que vai pegar um exercicio de cada porção muscular
    //Objeto que vai armazenar informações separadas nesta função
        tabela_musculo = {}   
        tabela_musculo.nome = obj.nome
        tabela_musculo.exercicios = []

    // Variavel que armazena a parte que possui os exericio do objeto passado como parametro 
        obj_porcoes = obj.porcoes

    // Loops que vão separar os exercicios
        for(chave in obj_porcoes){
            if(Array.isArray(obj_porcoes[chave])){
                //console.log(obj_porcoes[chave][au_hasard(obj_porcoes[chave])]+"-" + chave )***
                tabela_musculo.exercicios.push(obj_porcoes[chave][au_hasard(obj_porcoes[chave])])
                //console.log(tabela_musculo)***
            }else{
                Porcao_secundaria = obj_porcoes[chave]
                for(porcao in Porcao_secundaria){
                   //console.log(Porcao_secundaria[porcao][au_hasard(Porcao_secundaria[porcao])]) *** 
                   tabela_musculo.exercicios.push(Porcao_secundaria[porcao][au_hasard(Porcao_secundaria[porcao])])
                   
                }
            }
        }
    return tabela_musculo
}
tabela = mostraTreino(Quadriceps)

console.log(tabela)