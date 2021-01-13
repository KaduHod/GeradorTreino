require('../../_muscles/musculos')

//console.log(Triceps)

// Vou fazer primerio um algoritimo que pega o musculo e adiciona as lesão a ele
// A função recebe como parametro um objeto musculo e um array contendo as lesões
// o array de lesoes deve conter o nome das porções corretamente, ele sera feito com a interface que o usuario tera no front end

// primeiro vou fazer a verificaçãp das porções, esta função tem qeretornar true se a porção lesionada é do musculo passado como parametro

/*Triceps2.porcoes.map((valor)=>{// este loop itera sobre o array porcoes
    chaves_valor = Object.keys(valor)
    console.log(chaves_valor)
    
})*/

function VerificaPorcaoLesao2(musculo, lesoes){// este loop retorna true se as lesoes sao do musculo passado como parametro
    // vou ter que pegar as porcoes do musculo e as porções lesionadas passadas como parametro
    if(lesoes.length == 0){
        return true
    }else{
        arr_musculo_porcoes = Object.keys(musculo.porcoes)
        VerificaPorcaoLesao = lesoes.map((valor_lesao)=>{// valor_lesao retorna as lesoes
        //console.log(valor_lesao)
            if(arr_musculo_porcoes.indexOf(valor_lesao) > -1 ){// Aqui eu verifico se a porção da lesão confere com as porcoes do musculo
                return true
            }else{
                return false
            }
        }) 
        if(VerificaPorcaoLesao.indexOf(false) > -1){// Aqui eu verifico se A lesao foi cadastrada corretamente ou nao
            return false
        }else{
            return true
        }
    }
    

    
}



module.exports = {
    VerificaPorcaoLesao
}

