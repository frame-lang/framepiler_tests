```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
#![allow(unused_mut)]
```

#TransitionEnterEventParametersSpec

    -interface-

    start[msg:String]

    -machine-

    $Start 
        |start|[msg:String]
            -> (msg) "Pass msg to $Print first" $Print ^

    $Print
        |>|[msg:String] 
            print(&msg) ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

##