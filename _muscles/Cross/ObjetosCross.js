const importaCrossExercicio = require("./crossTrainingClass")




//POtencia
    //Membros superiores
        Dip = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Dip', 'Membro superior', 'Paralela'
            )
        Remada = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Remada', 'Membro superior', 'Barra , halter'
        )
        
        BarraFixa = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Barra fixa', 'Membro superior', 'Barra fixa'
        )
        RoscaBiceps = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Rosca Biceps', 'Membro superior', 'Halteres ou barra'
        )
    //Membros inferiores
        AirSaquat = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Agachamento', 'Membro inferior','Peso corporal' 
            )
        BackSquat = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'BackSquat', 'Membro inferior', 'Barra com pesos'
        )
        FrontSquat = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Agachamento Front', 'Membro inferior', 'Barra com pesos'
        )
        OverHeadSquat = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Agachamento Over Head', 'Membro inferior', 'Barra com pesos'
        )
        Pistol = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Agachamento com uma perna', 'Membro inferior', 'Peso corporal'
        )
        
          
    
    //CORE
        ToesToBar = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Toes to bar', 'Core', 'Barra fixa'
        )
        Obliquo = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Abd Obliquo', 'Core', 'Anilha'
        )
        AbdominalInvertido = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Abdominal invertido', 'Core', 'Caneleira' 
        )
        Tesoura = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Tesoura', 'Core', 'Peso corporal'
        )  

    // Multi-articular
        Thruster = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Thruster', 'Multi-articular', 'Barra com pesos'
        )

        LevantamentoOLimpico = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Levantamento Olimpico', 'Multi-articular', 'Barra com pesos'
        )
        Terra = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Agachamento terra', 'Multi-articular', 'Barra com peso'
        )
        ShoulderPress = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Shoulder Press', 'Multi-articular', 'Barra com pesos'
        )
        Flexão_de_braço = new importaCrossExercicio.exercicioCrossTrainning(
            'Potencia', 'Flexão', 'Multi-articular', 'Peso corporal'
        )
        

        

//Mobilidade ESTA PARTE DE MOBILIDADE SERA A ULTIMA A SER EXECUTADA NO TREINO, FORA DO BLOCO DO TREINO PRINCIPAL
    

//Resistencia
    //Membro superior
        CordaNaval = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Corda Naval', 'Membro superior', 'Corda Naval'
        )
        KetBellSwing = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'KettleBell Swing', 'Membro superior','Kettlebell'
            )
        FlexãoTRX = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Flexão de braço', 'Membro superior', 'TRX'
        )
        CrucifixoInverso = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia','Crucifixo inverso', 'Membro superior', 'TRX'
        )
    //Membro inferior
        BoxJump = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Box Jump', 'Membro inferior', 'Box'
            )
        WalkingLounges = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Lounges', 'Membro inferior', 'Peso corporal'
        )
        AgachamentoUnilateral = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Agachamento unilateral', 'Membro inferior', 'TRX'
        )
        BoxHighKneeAlternado = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Degrau com impulsão de joelho', 'Membro inferior', 'TRX'
        )


        
    //Multi-articular
        Burpee = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Burpee', 'Multi-articular', 'Peso corporal'
        )
        PularCorda = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Pular corda', 'Multi-articular', 'Corda fina'
        )
    //Core
        Bicicleta = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Bike Abdominal', 'Core', 'Peso corporal'
        )
        
        SuperMan = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Superman', 'Core', 'Peso corporal'
        )
        Rotação = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Rotação de tronco', 'Core', 'Peso Corporal' 
        )
        RotaçãoToncoComPeso = new importaCrossExercicio.exercicioCrossTrainning(
            'Resistencia', 'Rotação de tronco', 'Core', 'Ket bell / Anilha / Barra' 
        )
       

//Isometria
    //Membros superiores
    HoldPullUp = new importaCrossExercicio.exercicioCrossTrainning(
        'Isometria','Supensão na barra', 'Membro superior', 'Peso corporal'
    )
    ElevacaoLateralIso = new importaCrossExercicio.exercicioCrossTrainning(
        'Isometria','Elevação lateral', 'Membro superior','halter'
    )
    ElevacaoFrontalIso = new importaCrossExercicio.exercicioCrossTrainning(
        'Isometria','Elevação frontal', 'Membro superior','halter'
    )

    //Menbros inferiores
    Cadeira = new importaCrossExercicio.exercicioCrossTrainning(
        'Isometria', 'Cadeira', 'Membro inferior', 'Bola de pilates ou parede'
    )

    //Core
    prancha = new importaCrossExercicio.exercicioCrossTrainning(
        'Isometria',   'Prancha', 'Core', 'Peso corporal'
    )
    pranchaShoulderTouch = new importaCrossExercicio.exercicioCrossTrainning(
        'Isometria', 'Prancha shoulder touch', 'Core', 'Peso corporal'
    )

    crossExercicios = 
    [
        Dip,Remada,BarraFixa,RoscaBiceps,AirSaquat,BackSquat,FrontSquat,OverHeadSquat,OverHeadSquat,Pistol,ToesToBar,Obliquo,AbdominalInvertido,AbdominalInvertido,Tesoura,Thruster,LevantamentoOLimpico,Terra,ShoulderPress,Flexão_de_braço, CordaNaval, KetBellSwing, FlexãoTRX, CrucifixoInverso, BoxJump, WalkingLounges, AgachamentoUnilateral, BoxHighKneeAlternado, Burpee, PularCorda, Bicicleta, SuperMan, Rotação, RotaçãoToncoComPeso, HoldPullUp, ElevacaoLateralIso, ElevacaoFrontalIso, Cadeira, prancha, pranchaShoulderTouch
    ]   


