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

            // arrays separas por categoria
                Membros_inferiores_Resistencia = categorias_Membros_inferiores.Resistencia
                Membros_inferiores_Isometria = categorias_Membros_inferiores.Isometria
                Membros_inferiores_Potencia = categorias_Membros_inferiores.Potencia
            
            //Aqui vou separar cada um dos arrays acima em arrays sem exercicios com necessidade de equipamentos
            //Array  de resistencia separando exercicios com e sem equipamento
                Membros_inferiores_Resistencia_SeparaEquipamento = Membros_inferiores_Resistencia.reduce((Membros_inferiores_Resistencia_SeparaEquipamento, exercicio)=>
                {
                    if(exercicio.Equipamento == 'Peso corporal'){
                        Membros_inferiores_Resistencia_SeparaEquipamento['Peso corporal'].push(exercicio)
                    }else{
                        Membros_inferiores_Resistencia_SeparaEquipamento['Com equipamento'].push(exercicio)
                    }
                    return Membros_inferiores_Resistencia_SeparaEquipamento
                    
                }, {'Peso corporal': [], 'Com equipamento': []})

               // console.log(Membros_inferiores_Resistencia_SeparaEquipamento)
            //Array  de potencia separando exercicios com e sem equipamento
            
                Membros_inferiores_Potencia_SeparaEquipamento = Membros_inferiores_Potencia.reduce((Membros_inferiores_Potencia_SeparaEquipamento, exercicio)=>
                {
                    if(exercicio.Equipamento == 'Peso corporal'){
                        Membros_inferiores_Potencia_SeparaEquipamento['Peso corporal'].push(exercicio)
                    }else{
                        Membros_inferiores_Potencia_SeparaEquipamento['Com equipamento'].push(exercicio)
                    }
                    return Membros_inferiores_Potencia_SeparaEquipamento

                },{'Peso corporal': [], 'Com equipamento': []})

                //console.log(Membros_inferiores_Potencia_SeparaEquipamento)

            //Array  de potencia separando exercicios com e sem equipamento
                Membros_inferiores_Isometria_SeparaEquipamento = Membros_inferiores_Isometria.reduce((Membros_inferiores_Isometria_SeparaEquipamento, exercicio)=>
                    {
                        if(exercicio.Equipamento == 'Peso corporal'){
                            Membros_inferiores_Isometria_SeparaEquipamento['Peso corporal'].push(exercicio)
                        }else{
                            Membros_inferiores_Isometria_SeparaEquipamento['Com equipamento'].push(exercicio)
                        }
                        return Membros_inferiores_Isometria_SeparaEquipamento

                    },{'Peso corporal': [], 'Com equipamento': []})

                    //console.log(Membros_inferiores_Isometria_SeparaEquipamento)

            

            
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

            // arrays separas por categoria
                Membros_superiores_Resistencia = categorias_Membros_superiores.Resistencia
                Membros_superiores_Isometria = categorias_Membros_superiores.Isometria
                Membros_superiores_Potencia = categorias_Membros_superiores.Potencia

                //Array  de resistencia separando exercicios com e sem equipamento

                    Membros_superiores_Resistencia_SeparaEquipamento = Membros_superiores_Resistencia.reduce((Membros_superiores_Resistencia_SeparaEquipamento, exercicio)=>
                    {
                        if(exercicio.Equipamento == 'Peso corporal'){
                            Membros_superiores_Resistencia_SeparaEquipamento['Peso corporal'].push(exercicio)
                        }else{
                            Membros_superiores_Resistencia_SeparaEquipamento['Com equipamento'].push(exercicio)
                        }
                        return Membros_superiores_Resistencia_SeparaEquipamento
                        
                    }, {'Peso corporal': [], 'Com equipamento': []})
                    //console.log(Membros_superiores_Resistencia_SeparaEquipamento)

                //Array  de potencia separando exercicios com e sem equipamento

                    Membros_superiores_Potencia_SeparaEquipamento = Membros_superiores_Potencia.reduce((Membros_superiores_Potencia_SeparaEquipamento, exercicio)=>
                    {
                        if(exercicio.Equipamento == 'Peso corporal'){
                            Membros_superiores_Potencia_SeparaEquipamento['Peso corporal'].push(exercicio)
                        }else{
                            Membros_superiores_Potencia_SeparaEquipamento['Com equipamento'].push(exercicio)
                        }
                        return Membros_superiores_Potencia_SeparaEquipamento
                        
                    }, {'Peso corporal': [], 'Com equipamento': []})
                    //console.log(Membros_superiores_Potencia_SeparaEquipamento)

                //Array  de isometria separando exercicios com e sem equipamento

                    Membros_superiores_Isometria_SeparaEquipamento = Membros_superiores_Isometria.reduce((Membros_superiores_Isometria_SeparaEquipamento, exercicio)=>
                        {
                            if(exercicio.Equipamento == 'Peso corporal'){
                                Membros_superiores_Isometria_SeparaEquipamento['Peso corporal'].push(exercicio)
                            }else{
                                Membros_superiores_Isometria_SeparaEquipamento['Com equipamento'].push(exercicio)
                            }
                            return Membros_superiores_Isometria_SeparaEquipamento
                            
                        }, {'Peso corporal': [], 'Com equipamento': []})
                        //console.log(Membros_superiores_Isometria_SeparaEquipamento)
                
            
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

            // arrays separas por categoria
                Core_Resistencia = categorias_Core.Resistencia
                Core_Isometria = categorias_Core.Isometria
                Core_Potencia = categorias_Core.Potencia
            
            //Array  de isometria separando exercicios com e sem equipamento

                Core_Resistencia_SeparaEquipamento = Core_Resistencia.reduce((Core_Resistencia_SeparaEquipamento, exercicio)=>
                    {
                        if(exercicio.Equipamento == 'Peso corporal'){
                            Core_Resistencia_SeparaEquipamento['Peso corporal'].push(exercicio)
                        }else{
                            Core_Resistencia_SeparaEquipamento['Com equipamento'].push(exercicio)
                        }
                        return Core_Resistencia_SeparaEquipamento
                        
                    }, {'Peso corporal': [], 'Com equipamento': []})
                    //console.log(Core_Resistencia_SeparaEquipamento)
                
            //Array  de potencia separando exercicios com e sem equipamento

                Core_Potencia_SeparaEquipamento = Core_Potencia.reduce((Core_Potencia_SeparaEquipamento, exercicio)=>
                {
                    if(exercicio.Equipamento == 'Peso corporal'){
                        Core_Potencia_SeparaEquipamento['Peso corporal'].push(exercicio)
                    }else{
                        Core_Potencia_SeparaEquipamento['Com equipamento'].push(exercicio)
                    }
                    return Core_Potencia_SeparaEquipamento
                    
                }, {'Peso corporal': [], 'Com equipamento': []})
                //console.log(Core_Potencia_SeparaEquipamento)

            //Array  de Isometria separando exercicios com e sem equipamento

            Core_Isometria_SeparaEquipamento = Core_Isometria.reduce((Core_Isometria_SeparaEquipamento, exercicio)=>
            {
                if(exercicio.Equipamento == 'Peso corporal'){
                    Core_Isometria_SeparaEquipamento['Peso corporal'].push(exercicio)
                }else{
                    Core_Isometria_SeparaEquipamento['Com equipamento'].push(exercicio)
                }
                return Core_Isometria_SeparaEquipamento
                
            }, {'Peso corporal': [], 'Com equipamento': []})
            //console.log(Core_Isometria_SeparaEquipamento)

            
            

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

            // arrays separas por categoria
                Multi_articular_Resistencia = categorias_Multi_articular.Resistencia
                Multi_articular_Isometria = categorias_Multi_articular.Isometria
                Multi_articular_Potencia = categorias_Multi_articular.Potencia
            //Array  de Resistencia separando exercicios com e sem equipamento

                Multi_articular_Resistencia_SeparaEquipamento = Multi_articular_Resistencia.reduce((Multi_articular_Resistencia_SeparaEquipamento, exercicio)=>
                {
                    if(exercicio.Equipamento == 'Peso corporal'){
                        Multi_articular_Resistencia_SeparaEquipamento['Peso corporal'].push(exercicio)
                    }else{
                        Multi_articular_Resistencia_SeparaEquipamento['Com equipamento'].push(exercicio)
                    }
                    return Multi_articular_Resistencia_SeparaEquipamento
                    
                }, {'Peso corporal': [], 'Com equipamento': []})
                //console.log(Multi_articular_Resistencia_SeparaEquipamento)
            
            //Array  de potencia separando exercicios com e sem equipamento

                Multi_articular_Potencia_SeparaEquipamento = Multi_articular_Potencia.reduce((Multi_articular_Potencia_SeparaEquipamento, exercicio)=>
                    {
                        if(exercicio.Equipamento == 'Peso corporal'){
                            Multi_articular_Potencia_SeparaEquipamento['Peso corporal'].push(exercicio)
                        }else{
                            Multi_articular_Potencia_SeparaEquipamento['Com equipamento'].push(exercicio)
                        }
                        return Multi_articular_Potencia_SeparaEquipamento
                        
                    }, {'Peso corporal': [], 'Com equipamento': []})
                    //console.log(Multi_articular_Potencia_SeparaEquipamento)

                //Array  de isometria separando exercicios com e sem equipamento

                Multi_articular_Isometria_SeparaEquipamento = Multi_articular_Isometria.reduce((Multi_articular_Isometria_SeparaEquipamento, exercicio)=>
                    {
                        if(exercicio.Equipamento == 'Peso corporal'){
                            Multi_articular_Isometria_SeparaEquipamento['Peso corporal'].push(exercicio)
                        }else{
                            Multi_articular_Isometria_SeparaEquipamento['Com equipamento'].push(exercicio)
                        }
                        return Multi_articular_Isometria_SeparaEquipamento
                        
                    }, {'Peso corporal': [], 'Com equipamento': []})
                    //console.log(Multi_articular_Isometria_SeparaEquipamento)

                
            
            
//-------------------------------------------------------------------------------------------------------------------
