const NovoAluno_cadastro = require("./models/models")  
require('../../calculosAntropometricos/classeAluno')
console.log(AlunoNovo)
// Lançando aluno para o banco de dados
function adicionaAlunoDB(Aluno){
    new NovoAluno_cadastro.NovoAluno({
        objNSNIPA: Aluno.objNSNIPA,
        objMedidas: Aluno.objMedidas,
        objPesoKG_RMOG:Aluno.objPesoKG_RMOG,
        objPorcem:Aluno.objPorcem,
        objRate:Aluno.objRate,
        Metabolismo_Basal:Aluno.Metabolismo_Basal ,
        Imc:Aluno.Imc ,
        GorduraVisceral: Aluno.GorduraVisceral ,
        Porcem_Gordurathis:Aluno.Porcem_Gordura ,
        dobras:Aluno.dobras
        
        
    }).save().then(()=>{
        console.log('ALUNO CADASTRADO COM SUCESSO!')
    }).catch((err)=>{
        console.log("ERROR: " + err)
    })
}
console.log(AlunoNovo)
adicionaAlunoDB(AlunoNovo)