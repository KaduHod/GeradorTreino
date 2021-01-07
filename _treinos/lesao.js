require("../_muscles/musculos")

function lesao(musculo, porcao_lesionada){
    if(porcao_lesionada.length > 0){
        for(chaves in musculo.porcoes){
            if(Array.isArray(musculo.porcoes[chaves])){
                for(chave_da_lesao of porcao_lesionada){
                    if(chaves == chave_da_lesao){
                        musculo.porcoes[chaves] = ['Musculo lesionado']
                    }
                }   
            }else{
                for(porcao_secundaria in musculo.porcoes[chaves]){
                    musculo.porcoes[chaves][porcao_secundaria] = ['Musculo lesionado']
                    
                    
                }
            }
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