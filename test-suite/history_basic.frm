--- v0.4.1 syntax

#HistoryBasic

    -interface-

    start @(|>>|)
    switchState
    gotoDeadEnd
    back

    -machine-

    $Start
        |>>| -> $S0 ^

    $S0
        |>| print("Enter S0") ^
        |switchState| -> "Switch\nState" $S1 ^
        |gotoDeadEnd| $$[+] -> "Goto\nDead End" $DeadEnd ^

    $S1
        |>| print("Enter S1") ^
        |switchState| -> "Switch\nState" $S0 ^
        |gotoDeadEnd| $$[+] -> "Goto\nDead End" $DeadEnd ^

    $DeadEnd
        |>| print("Enter $DeadEnd") ^
        |back| -> "Go Back" $$[-] ^

    -actions-

    print[msg:String] 

##