```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
```

#HierarchicalStateMachine

    -interface-

    start @(|>>|)
    stop @(|<<|)

    -machine-

    $Begin
        |>>| print(&"Starting in $Begin")
             -> "start" $Working ^

    $Working => $Default
        |>| print(&"Enter $Working") ^
        |<| print(&"Exit $Working") ^

    $End
        |>| print(&"Enter $End") ^

    $Default
        |<<| print(&"Stopping handled in $Default")
             -> "stop" $End ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

##
