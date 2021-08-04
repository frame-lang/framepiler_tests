```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
```

#EchoSpec 

    -interface-

    echo[msg:String] 

    -machine-

    $WhatSay 
        |echo|[msg:String] print(&msg) ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}
##
