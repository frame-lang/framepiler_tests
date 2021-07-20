--- https://frame-lang.org

#FrameReturnSyntaxTestSpec

    -interface-

    returnAssignment:int
    returnExpression:int
    eventPartsAssignment:string
    eventPartsExpression:string

    -machine-

    $S0
        |returnAssignment| @^ = (42) ^
        |returnExpression| ^(42)
        |eventPartsAssignment| @^ = format_event_parts(@ @|| @[x] @^) ^
        |eventPartsExpression| ^(format_event_parts(@ @|| @[x] @^))


    -actions-

    format_event_parts [e:FrameEvent msg:string param:object ret:object]
##