require("../_muscles/musculos")

function lesao(musculo, porcao_lesionada){
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
    return musculo
}
//lesionado = ["Obliquo", "Reto"]//Array que guarda as porções lesionadas





module.exports = {
    lesao
};