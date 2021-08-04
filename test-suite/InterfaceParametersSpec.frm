```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
```

#InterfaceParametersSpec

    -interface-

    start[msg:String]

    -machine-

    $Working
        |start|[msg:String] 
            print(&msg) ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

##