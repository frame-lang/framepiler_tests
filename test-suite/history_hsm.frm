```
#![allow(non_camel_case_types)]
#![allow(dead_code)]
#![allow(non_snake_case)]
```

#HistoryHsm

    -interface-

    start @(|>>|)
    switchState
    gotoDeadEnd
    back

    -machine-

    $Start
        |>>| -> $S0 ^

    $S0 => $Common
        |>| print(&"Enter $S0") ^
        |switchState| -> "Switch\nState" $S1 ^
        
    $S1 => $Common
        |>| print(&"Enter $S1") ^
        |switchState| -> "Switch\nState" $S0 ^

    $Common
        |>| print(&"Enter $Common") ^
        |gotoDeadEnd| $$[+] -> "Goto\nDead End" $DeadEnd ^

    $DeadEnd
        |>| print(&"Enter $DeadEnd") ^
        |back| -> "Go Back" $$[-] ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}
##