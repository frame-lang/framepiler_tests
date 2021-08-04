```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
```

#StateMachineTransitionSpec

    -interface-

    start
    stop

    -machine-

    $Begin
        |start| 
            print(&"Starting") 
            -> $Working ^

    $Working
        |>| print(&"Enter $Working") ^
        |<| print(&"Exit $Working") ^
        |stop| -> $End ^

    $End
        |>| print(&"Enter $End") ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

##