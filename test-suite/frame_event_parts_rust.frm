```
#![allow(non_snake_case)]
#![allow(non_camel_case_types)]
#![allow(unused_mut)]
#![allow(dead_code)]
#![allow(unused_variables)]
#![allow(unused_parens)]
#![allow(unused_imports)]

```

--- https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&gist=f6d97135fa42eb28684e57879f0fd190

#FrameEventSyntax

    -interface-

    event_parameter_assignment [p1:String]
    return_assignment:String
    return_expression:String

    -machine-

    $S0

        |event_assignment|
            var frameEvent:FrameEvent = @
            frameEventParm(frameEvent) ^

        |event_parameter_assignment|[p1:String]
            var x:String = @[p1]
            var y:String = p1
            print(&x)
            print(&@[p1])
            ^

        |event_msg_assignment|
            var msg:String = @||
            print(&msg)
            ^

        |return_assignment|:String
            @^ = @||
            print(&@^)
            ^

        |return_expression|:String
            ^(@||)

    -actions-


    frameEventParm[evt:FrameEvent] {`
        println!("{}", &format!("{}",evt.message));
    `}

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}

    print_bool[b:bool] {`
        println!("{}", &format!("{}",b.to_string()));
    `}
##