```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
```

#FrameSpec

    -interface-
    next

    -machine-

    $MyFirstState
        |next| -> $MySecondState ^
        
    $MySecondState
        |>| print(&"Enter $MySecondState") ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

##