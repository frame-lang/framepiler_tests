```
#![allow(non_snake_case)]
#![allow(non_camel_case_types)]
#![allow(unused_mut)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_parens)]

```
--- Rust Playground
--- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=75b3438778a3a8ba4318d2ace7fd7ebb

#InterfaceAndStateParameters

    -interface-

    e1[x:String]

    -machine-

    $S0

        @|e1|[x:String]
            print(&x)
            -> $S1(x) ^

    $S1[msg:String]
        |>| print(&msg) ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}
##