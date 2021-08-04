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

#VariablesSpec

    -interface-

    start @(|>>|)
    
    -machine-

    $Start
        |>>| -> $Working ^

    $Working 
        var stateVar:String = "State Variable"

        |>|
            var eventHandlerVar:String 
                        = "Event Handler Variable"

            print(&domainVar)
            print(&eventHandlerVar)
            print(&stateVar) ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

    -domain-

    var domainVar:String = "Domain Variable"
##

