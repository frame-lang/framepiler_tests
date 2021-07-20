```
#![allow(non_snake_case)]
#![allow(non_camel_case_types)]
#![allow(unused_mut)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_parens)]
#![allow(unused_imports)]

```

--- This spec shows how to use transition enter arguments,
--- state arguments and state variables. (Rust version)

--- see Rust Playground:
--- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=881d4d80f2085af450f18cae50731e7c


#BasicStateContext

    -interface-

    start @(|>>|)

    -machine-

    $Begin
        |>>| -> ("Enter Argument") $Working("State Argument") ^

    $Working[stateArgument:String]

        var stateVariable:String = "State Variable"

        |>|[enterArgument:String]
            print(&stateArgument)
            print(&stateVariable)
            print(&enterArgument)
            ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}
##