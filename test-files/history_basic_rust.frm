```
#![allow(non_snake_case)]
#![allow(unused_mut)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_parens)]
#![allow(non_camel_case_types)]

```
--- Rust Playground
--- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=4de397332dda2d16f57a70339967e53a

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
        |>| print(&"Enter $S0") ^
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