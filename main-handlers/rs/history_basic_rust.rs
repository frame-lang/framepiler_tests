fn main() {

    let mut test = HistoryBasic::new();
    test.start();
    test.gotoDeadEnd();
    test.back();
    test.switchState();
    test.gotoDeadEnd();
    test.back();
}