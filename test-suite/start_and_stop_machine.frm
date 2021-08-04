#StartAndStopMachine

    -interface-

    start @(|>>|)
    stop @(|<<|)

    -machine-

    $Begin
        |>>| -> $Working ^

    $Working
        |<<| -> $End ^        

    $End   
##