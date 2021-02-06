class dadosAntropometricos{

    constructor(triciptal, subscapular , peitoral, axilar_media, abdominal, suprailiaca, coxa, DBRU, DBDF){
        this.triciptal = triciptal 
        this.subscapular = subscapular
        this.peitoral = peitoral
        this.axilar_media = axilar_media
        this.abdominal = abdominal
        this.suprailiaca = suprailiaca
        this.coxa = coxa
        this.DBRU = DBRU
        this.DBDF = DBDF
        this.total7dobras = 0
    }
    Total7dobras (){
        this.total7dobras = parseFloat(this.triciptal) + parseFloat(this.subscapular) + parseFloat(this.peitoral) + parseFloat(this.axilar_media) + parseFloat(this.abdominal) + parseFloat(this.suprailiaca) + parseFloat(this.coxa) + parseFloat(this.subscapular) 
    }

}



module.exports = {
    dadosAntropometricos
}