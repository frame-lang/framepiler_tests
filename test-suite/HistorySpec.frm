```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
```

#HistorySpec

    -interface-

    start @(|>>|)
    next

    -machine-

    $Start
        |>>| -> $Waiting ^

    $Waiting
        |>| print(&"Enter $Waiting") ^
        |next| $$[+] -> "Goto\nDead End" $DeadEnd ^

    $DeadEnd
        |>| print(&"Enter $DeadEnd") ^
        |next| -> "Go Back" $$[-] ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

##
