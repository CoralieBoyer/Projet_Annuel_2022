<?php
require "conn.php";                                                                                                                                                                require "conn.php";
$email = $_POST["email"];
$password = hash( 'sha512',$_POST["psw"]);
//$email = "abdo@gmail.com"; $password = "123456";
$isValidEmail = filter_var($email, FILTER_VALIDATE_EMAIL);
if($conn){
if( $isValidEmail === false){
echo "This Email is not valid";
}else{
$sqlCheckEmail = "SELECT * FROM user WHERE email LIKE '$email'";
$usernameQuery = mysqli_query($conn,$sqlCheckEmail);
if(mysqli_num_rows($usernameQuery) > 0){
$sqlLogin = "SELECT * FROM user WHERE email LIKE '$email' AND password LIKE '$password'";
$loginQuery = mysqli_query($conn,$sqlLogin);
$row= mysqli_fetch_array($loginQuery);
if(mysqli_num_rows($loginQuery) > 0){
echo "Login Success Welcome";
}
else{
echo "Wrong Password";
}
}else{
echo $_POST["email"];
}
}
}
else{
echo "Connection Error";
} ?>