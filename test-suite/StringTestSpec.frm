```
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_imports)]
#![allow(unused_parens)]
#![allow(unreachable_code)]
```

#StringTestSpec

    -interface-

    showRole[name:String]

    -machine-

    $RockGroupTest
        |showRole|[name:String]
            name ?~
                /Mick Jagger/    -> "The Mick" $Singer :>
                /Keith Richards/  -> "Keith"  $Guitarist :>
                /Charlie Watts/     -> "Charlie" $Drummer 
            :
                -> "Others" $OtherStones 
            :: ^

    $Singer 
        |>| print(&"Singer") -> $RockGroupTest ^

    $Guitarist
       |>| print(&"Guitarist") -> $RockGroupTest ^

    $Drummer 
       |>| print(&"Drummer") -> $RockGroupTest ^

    $OtherStones
       |>| print(&"OtherStones") -> $RockGroupTest ^
    
    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

##

