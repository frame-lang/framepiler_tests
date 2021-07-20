fn main () {
    let mut test = ConditionalSyntax::new();
    test.start();
    test.doBoolTests(true);
    test.next();

    test.doBasicStringTests(String::from("Elizabeth"));
    test.doBasicStringTests(String::from("Robert"));
    test.doBasicStringTests(String::from("Someone"));

    test.doAdvancedStringTests(String::from("Elizabeth"));
    test.doAdvancedStringTests(String::from("Beth"));
    test.doAdvancedStringTests(String::from("Robert"));
    test.doAdvancedStringTests(String::from("Bob"));
    test.doAdvancedStringTests(String::from("Someone"));
    test.next();

    test.doIntTests(1);
    test.doIntTests(2);
    test.doIntTests(3);
    test.doIntTests(50000000);

    test.doFloatTests(1.0);
    test.doFloatTests(101.1);
    test.doFloatTests(104.1);
    test.next();

    test.doBoolTransitionTests(false);
}