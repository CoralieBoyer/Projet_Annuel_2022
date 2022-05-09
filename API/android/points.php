<?php
require "conn.php";

$token = $_POST['token'];


if($_POST['price'] <= 0){
    echo json_encode("Price must be positive");
    die();
}
$points = $_POST["price"]*0.3;
while ($_POST['price'] >= 100) {
    $points += 1;
    $_POST['price'] -= 100;
}
if (fmod($points,1) >= 0.5)
    $points = ceil($points);
else
    $points = floor($points);


$sqlLogin = "SELECT * FROM CUSTOMER WHERE loyalty_number = '$token'";
$loginQuery = mysqli_query($conn,$sqlLogin);
$row= mysqli_fetch_array($loginQuery);

$customer = $row['points'] + $points;

$sqlLogin = "UPDATE CUSTOMER SET points = $customer WHERE id_user = '$row[id_user]'";
$loginQuery = mysqli_query($conn,$sqlLogin);
