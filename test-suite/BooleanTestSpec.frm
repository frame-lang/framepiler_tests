```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
```

#BooleanTestSpec

    -interface-

    doTest[value:bool]

    -machine-

    $Test
        |>| print(&"Return to Test State") ^
        |doTest|[value:bool]
            value ? 
                -> "Tis True" $True ^
            :
                -> "Twas Not" $False ^
            :: ^

    $True 
        |>|
            print(&"True")
            -> $Test ^

    $False
        |>|
            print(&"False")
            -> $Test ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}
##

