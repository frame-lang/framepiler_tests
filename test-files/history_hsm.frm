#HistoryHsm

    -interface-

    switchState
    gotoDeadEnd
    back

    -machine-

    $S0 => $Common
        |switchState| -> "Switch\nState" $S1 ^
        
    $S1 => $Common
        |switchState| -> "Switch\nState" $S0 ^

    $Common
        |gotoDeadEnd| $$[+] -> "Goto\nDead End" $DeadEnd ^

    $DeadEnd
        |back| -> "Go Back" $$[-] ^
##