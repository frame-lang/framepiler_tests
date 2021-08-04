```
#![allow(non_snake_case)]
#![allow(unused_mut)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_parens)]
#![allow(non_camel_case_types)]

```
--- Rust Playground
--- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=7286ff3bd57d5662040a34f065fab6bd

--- v0.4.1 syntax

#HistoryStateContext

    -interface-

    start @(|>>|)
    switchState
    gotoDeadEnd
    back

    -machine-

    $Start
        |>>| -> $S0 ^

    $S0
        var enterMsg:String = "Enter $S0"

        |>| print(&enterMsg) ^
        |switchState| -> "Switch\nState" $S1 ^
        |gotoDeadEnd| $$[+] -> "Goto\nDead End" $DeadEnd ^

    $S1
        |>| print(&"Enter $S1") ^
        |switchState| -> "Switch\nState" $S0 ^
        |gotoDeadEnd| $$[+] -> "Goto\nDead End" $DeadEnd ^

    $DeadEnd
        |>| print(&"Enter $DeadEnd") ^
        |back| -> "Go Back" $$[-] ^

    -actions-


    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}


##