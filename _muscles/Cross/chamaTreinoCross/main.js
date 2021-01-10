require('../ObjetosCross')

//Para criar a aplicação preciso separar e ordenar os exercicios
// Em primeira ordem tenhoqe separar os exercicios por parte do corpor recrutada
// DEpois pela sua categoria e depois por uso de equipamento
// para que isso?
// esses metodos novos vão me dar arrays contendo os exercicios separados
// 1 passo -  separa por porcao-> depois cada proção vai ser separa em categoria -> depois cada categoria sera separa por uso de euipamento ou nao

// SEPARAR POR PARTE DO CORPO RECRUTADA

    Array_exercicios_parte_do_corpo_recrutada = crossExercicios.reduce((array_SupInfCoreMult, exercicio)=>{
        if(exercicio.Parte_do_corpo_recrutada == 'Membro inferior'){
            sup_inf_core_mult = 'Membro inferior'
        }else if(exercicio.Parte_do_corpo_recrutada == 'Membro superior'){
            sup_inf_core_mult = 'Membro superior'
        }else if(exercicio.Parte_do_corpo_recrutada == 'Core'){
            sup_inf_core_mult = 'Core'
        }else if(exercicio.Parte_do_corpo_recrutada ==  'Multi-articular'){
            sup_inf_core_mult =  'Multi-articular'
        }else{
            sup_inf_core_mult =  'escape'
        }

        array_SupInfCoreMult[sup_inf_core_mult].push(exercicio)
        return array_SupInfCoreMult
    }, {'Membro inferior': [], 'Membro superior': [], 'Core': [], 'Multi-articular':[], 'escape': []})

// SEPARAR POR CATEGORIA
    // arrays de cada parte do corpo
        Membros_inferiores = Array_exercicios_parte_do_corpo_recrutada['Membro inferior']
        Membros_superior = Array_exercicios_parte_do_corpo_recrutada['Membro superior']
        Core = Array_exercicios_parte_do_corpo_recrutada['Core']
        Multi_articular = Array_exercicios_parte_do_corpo_recrutada['Multi-articular']
    
    // Separando por categorias 
        // membros inferiores
            categorias_Membros_inferiores = Membros_inferiores.reduce((categorias_Membros_inferiores, exercicio)=>
            {
                if(exercicio.Categoria == 'Potencia'){
                    pot_res_iso = 'Potencia'
                }else if(exercicio.Categoria == 'Resistencia'){
                    pot_res_iso = 'Resistencia'
                }else if(exercicio.Categoria == 'Isometria'){
                    pot_res_iso = 'Isometria'
                }else {
                    pot_res_iso = 'escape'
                }
                categorias_Membros_inferiores[pot_res_iso].push(exercicio)
                return categorias_Membros_inferiores

            }, {'Potencia': [], 'Resistencia': [], 'Isometria': [], 'escape': []})
            
        // membros superiores
          categorias_Membros_superiores = Membros_superior.reduce((categorias_Membros_superiores, exercicio)=>
          {
            if(exercicio.Categoria == 'Potencia'){
                pot_res_iso = 'Potencia'
            }else if(exercicio.Categoria == 'Resistencia'){
                pot_res_iso = 'Resistencia'
            }else if(exercicio.Categoria == 'Isometria'){
                pot_res_iso = 'Isometria'
            }else {
                pot_res_iso = 'escape'
            }
            categorias_Membros_superiores[pot_res_iso].push(exercicio)
            return categorias_Membros_superiores

          },{'Potencia': [], 'Resistencia': [], 'Isometria': [], 'escape': []})
          
        // Core
        categorias_Core = Core.reduce((categorias_Core, exercicio)=>
          {
            if(exercicio.Categoria == 'Potencia'){
                pot_res_iso = 'Potencia'
            }else if(exercicio.Categoria == 'Resistencia'){
                pot_res_iso = 'Resistencia'
            }else if(exercicio.Categoria == 'Isometria'){
                pot_res_iso = 'Isometria'
            }else {
                pot_res_iso = 'escape'
            }
            categorias_Core[pot_res_iso].push(exercicio)
            return categorias_Core

          },{'Potencia': [], 'Resistencia': [], 'Isometria': [], 'escape': []})
          console.log(categorias_Core)

        // Multi-articular
        categorias_Multi_articular = Multi_articular.reduce((categorias_Multi_articular, exercicio)=>
          {
            if(exercicio.Categoria == 'Potencia'){
                pot_res_iso = 'Potencia'
            }else if(exercicio.Categoria == 'Resistencia'){
                pot_res_iso = 'Resistencia'
            }else if(exercicio.Categoria == 'Isometria'){
                pot_res_iso = 'Isometria'
            }else {
                pot_res_iso = 'escape'
            }
            categorias_Multi_articular[pot_res_iso].push(exercicio)
            return categorias_Multi_articular

          },{'Potencia': [], 'Resistencia': [], 'Isometria': [], 'escape': []})
          console.log(categorias_Multi_articular)
            
