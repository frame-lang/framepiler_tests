fn main() {
    let mut test = EchoSpec::new();
    test.echo(String::from("A message from EchoSpec"));
    test.echo(String::from("Another message from EchoSpec"));
}