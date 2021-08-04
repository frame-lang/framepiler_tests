```
#![allow(non_snake_case)]
#![allow(non_camel_case_types)]
#![allow(unused_mut)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_parens)]

```
--- Rust Playground
--- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=9b82851d416ee0da4957b574f6f6c5a8

#ExitEventHistoryRustSpec

    -interface-

    e1

    -machine-

    $S0
        |<|[x:String] print(&x)  ^
        |e1| $$[+] ("bye") -> $S1 ^

    $S1
        |>| ("hi") -> $$[-] ^
        |<|[x:String] print(&x) ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

##