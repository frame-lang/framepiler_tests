```
#![allow(non_snake_case)]
#![allow(non_camel_case_types)]
#![allow(unused_mut)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_parens)]
#![allow(unused_imports)]

```

--- This spec shows how to start and stop a Frame state machine. (Rust version)

--- see Rust Playground:
--- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=52cd16ade3f1e3e59c9919e1691421f5


#StartAndStopMachine

    -interface-

    start @(|>>|)
    stop @(|<<|)

    -machine-

    $Begin
        |>>| 
            print(&"Started")
            -> $Working ^

    $Working
        |>|
            print(&"Working") ^

        |<<| 
            print(&"Stopped")
            -> $End ^        

    $End  
        |>|
            print(&"Done") ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `} 
##