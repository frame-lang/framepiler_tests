--- This spec shows how to use transition enter arguments, 
--- state arguments and state variables. 

#StateContextBasic

    -interface-

    start @(|>>|)

    -machine-

    $Begin
        |>>| -> ("Enter Argument") $Working("State Argument") ^

    $Working[stateArgument:String]

        var stateVariable:String = "State Variable"
        
        |>|[enterArgument:String]
            print(stateArgument)
            print(stateVariable)
            print(enterArgument)
            ^

    -actions-

    print[msg:String] 
##