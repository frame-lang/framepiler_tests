#ConditionalSyntax

    -interface-

    start @(|>>|)
    next
    doBoolTests[b:bool]
    doBasicStringTests[name:String]
    doAdvancedStringTests[name:String]
    doIntTests[i:i32]
    doFloatTests[f:f32]
    doBoolTransitionTests[b:bool]

    -machine-

    $Start
        |>>|
            print("starting...")
            ->  $BooleanConditionals ^

    $BooleanConditionals
        |>| print("enter $BooleanConditionals") ^
        |<| print("exit $BooleanConditionals") ^
        |doBoolTests|[b:bool]
            b ?  print("was true") : print("was false") ::
            b ?! print("was false") : print("was true") :: ^
        |next| -> $StringConditionals ^

    $StringConditionals
        |doBasicStringTests|[name:String]
            name ?~
                /Elizabeth/ hiElizabeth()   :>
                /Robert/    hiRobert()      :
                            whoAreYou()     :: ^

        |doAdvancedStringTests|[name:String]
            name ?~
                /Elizabeth|Beth/ hiElizabeth()   :>
                /Robert|Bob/     hiRobert()      :
                                 whoAreYou()     :: ^

         |next| -> $NumberConditionals ^

     $NumberConditionals
        |doIntTests|[i:i32]
            i ?#
                /1/ print("It's a 1")   :>
                /2/ print("It's a 2")   :
                    print("It's a lot") ::
            ^

        |doFloatTests|[f:f32]
            f ?#
                /1.0|2.0/       print("It's a 1.0 or 2.0")  :>
                /101.1|100.1/   print("It's over 100.0 a bit")  :
                                print("It's a different number")     ::
            ^
         |next| -> $ConditionalTransitions ^

    $ConditionalTransitions
        |doBoolTransitionTests|[b:bool]
            b ?
                -> "true path" $True
            :
                -> "false path" $False
            :: ^

    $True
        |>| print("It's true. Stopping now.") ^

    $False
        |>| print("It's false. Stopping now.") ^

    -actions-

    name :String 
    foo :bool 
    print[msg] 
    whoAreYou 
    hiElizabeth 
    hiRobert 
    fooNotTrue 
    fooTrue 


##