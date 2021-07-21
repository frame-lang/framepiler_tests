fn main() {
    let mut test = HistoryStateContext::new();
    test.start();
    test.switchState();
    test.gotoDeadEnd();

    test.back();
    test.switchState();
    test.gotoDeadEnd();

    test.back();
}