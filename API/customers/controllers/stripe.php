<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$driver = "mysql";
$databaseName = "SAC_FIDELITY";
$host = "localhost";
$dsn = "$driver:dbname=$databaseName;host=$host";
$user = "root";
$passwd = "root";
$options = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];

/** @see https://www.php.net/manual/en/pdo.construct.php */
$databaseConnection = new PDO($dsn, $user, $passwd, $options);


$q = "INSERT INTO PURCHASE (number_credit_card, brand, country, exp_month, exp_year, client_ip, amount, date, id_basket) VALUES (:number_credit_card, :brand, :country, :exp_month, :exp_year, :client_ip, :amount, :date, 7)";
$req = $databaseConnection->prepare($q);
$response = $req->execute([
'number_credit_card' => $_POST['number_credit_card'],
'brand' => $_POST['brand'],
'country' => $_POST['country'],
'exp_month' => $_POST['exp_month'],
'exp_year' => $_POST['exp_year'],
'client_ip' => $_POST['client_ip'],
'amount' => $_POST['amount'],
'date' => date("Y-m-d H:i:s")
]);

?>