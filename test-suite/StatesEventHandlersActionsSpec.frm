```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
```

#StatesEventHandlersActionsSpec

    -interface-

    start
    
    -machine-

    $Begin
        |start| 
            print(&"Howdy") ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

##