```
#![allow(non_snake_case)]
#![allow(non_camel_case_types)]
#![allow(unused_mut)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_parens)]
#![allow(unused_imports)]

```

--- This spec demonstrates the differences between transitions and change state operators. (Rust version)

--- see Rust Playground:
--- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=54fd31121b1f102916405b0e0d129877

#ChangingState

    -interface-

    transition_do
    changeState_do

    -machine-

    $S0
        |<| print(&"Exiting S0") ^
        |transition_do| -> "transition" $S1 ^

    $S1
        |>| print(&"Entering $S1") ^
        |changeState_do| print(&"Changing state to $S0 from $S1") ->> "change state" $S0 ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}
##