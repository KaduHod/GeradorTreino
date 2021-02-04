function mesMenorQueDez(mes){
    if(mes < 10){
        novoMes = "0"+mes
        return novoMes
    }else{
        return mes
    }
}
function diaMenorQueDez(dia){
    if(dia < 10){
        novoDia = "0"+dia
        return novoDia
    }else{
        return dia
    }
}
function dataDDMMYY(data){
    newData = diaMenorQueDez((data.getDate())) + "/"+mesMenorQueDez((data.getMonth()+1))+"/"+(data.getFullYear())
    return newData
}

module.exports ={
    dataDDMMYY
}