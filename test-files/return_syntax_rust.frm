```
#![allow(non_snake_case)]
#![allow(unused_mut)]
#![allow(dead_code)]
#![allow(unused_variables)]
```
--- https://frame-lang.org

#FrameReturnSyntaxTestSpec

    -interface-

    returnAssignment:i32
    returnExpression:i32

    -machine-

    $S0
        |returnAssignment| @^ = (42) ^
        |returnExpression| ^(42)


    -actions-

 ##