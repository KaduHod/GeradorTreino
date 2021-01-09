require("../_muscles/musculos")

function lesao(musculo, porcao_lesionada){
    afeta_musculo_inteiro = [Biceps.nome, Triceps.nome, Antebraco.nome, Peitoral.nome, Abdomen.nome, Psoas.nome, Dorso.nome, Gluteo.nome, Quadriceps.nome, PosteriorCoxa.nome]
    for(lesao_ of porcao_lesionada){//loop que verifica que lesao esta em uma porcao do musculo analisado
        arr_verifica_lesao = Object.keys(musculo.porcoes)
        if(arr_verifica_lesao.indexOf(lesao_) > -1){
            //console.log("Lesao confere com musculo")
            if(porcao_lesionada.length > 0 ){// aqui verifico se o array de lesoes esta vazio
                if(afeta_musculo_inteiro.indexOf(musculo.nome) !== -1){// Se o musculo entra na condição afeta tds os musculos
                    for(porcao in musculo.porcoes){
                        if((Array.isArray(musculo.porcoes[porcao]) == true)){
                            musculo.porcoes[porcao] = ['Musculo lesionado']
                        }else{
                            for(subPorcao in musculo.porcoes[porcao]){
                                musculo.porcoes[porcao][subPorcao] = ['Musculo lesionado']
                            }
                        }
                    }
                }else{// aqui vou ter qeanalisar o array com porções lesionadas passado como parametro
                    //console.log(porcao_lesionada)
                    for(porcao in musculo.porcoes){
                        for(porcaoLesionada of porcao_lesionada){
                            if(porcao == porcaoLesionada){
                                musculo.porcoes[porcaoLesionada] = ['Musculo lesionado']
                            }
                        }
                    }
            
                }
            }
        }else{
            //console.log("Lesao n confere com o musculo")
            //Aqui vai um req.flash((error_massege: "Erro ao analisar a lesão, porcção muscular não confere com o musculo"))
        }
    }

    //Tenho que criar uma função que verifica se o musculo esta com todas as suas porções validas lesionadas, se sim, verificar se este musculo possui uma chave chama area adicional, caso tenho cortar o treino desta parte tmb
    chaves_do_musculo_pos_verificaLesao =Object.keys(musculo.porcoes)
    verifica_areaAdicional_existe = chaves_do_musculo_pos_verificaLesao.indexOf('areaAdicional')
    cont_porcao_lesionada = 0
    //ESTOU COM PROBLEMA AO CHAMAR O TREINO DE PEITORAL
    if(verifica_areaAdicional_existe !== -1 ){ // VERIFICO SE AREA ADICIONAL EXISTE
        for(chave of chaves_do_musculo_pos_verificaLesao){
            if(chave !== 'areaAdicional'){
                if(musculo.porcoes[chave][0] == 'Musculo lesionado'){// VERIFICO SE OUTRAS PORÇÕES ESTAO LESIONADAS
                    cont_porcao_lesionada ++
                }
            }
        } 
        if((cont_porcao_lesionada + 1) == chaves_do_musculo_pos_verificaLesao.length){
            musculo.porcoes['areaAdicional'] = ['Musculo lesionado']
            return musculo
        }else{
            return musculo
        }
    }else{
        return musculo
        
    }
}
//lesionado = ["Obliquo", "Reto"]//Array que guarda as porções lesionadas





module.exports = {
    lesao
};