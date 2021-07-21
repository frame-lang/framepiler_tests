fn main() {
    let mut test = HistoryHsm::new();
    test.start();
    test.gotoDeadEnd();
    test.back();

    test.switchState();
    test.gotoDeadEnd();
    test.back();
}