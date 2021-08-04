
#ChangingState

    -interface-

    transition_
    changeState_

    -machine-

    $S0
        |<| print("Exiting S0") ^
        |transition_| -> "transition" $S1 ^

    $S1
        |>| print("Entering $S1") ^
        |changeState_| print("Changing state to $S0 from $S1") ->> "change state" $S0 ^

    -actions-

    print[msg:&String] {`
        println!("{}", &format!("{}",msg));
    `}
##