```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
```

#NumberTestSpec

    -interface-

    start @(|>>|)

    -machine-

    $NumberTest
        |>>|
            getSize() ?#
                /1|2/   -> "1|2"  $Small  :>
                /10/  -> "10" $Medium :>
                /100/   -> "100"  $Large 
            :
                -> "Sumthin' else" $OtherSize 
            :: ^

    $Small 
        |>| print(&"This is a small number either 1 or 2") ^

    $Medium
        |>| print(&"Entered number is 10") ^

    $Large 
        |>| print(&"Entered number is 100") ^

    $OtherSize
        |>| print(&"You enter something else") ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

    getSize[] : u8 {`
        1
    `}

##