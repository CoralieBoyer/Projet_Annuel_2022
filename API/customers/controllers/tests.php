<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/customer_model.php";

class Tests{
  
    public static function get(){
        $infos = [
            "customers" => UserModel::getCustomerAll(),
            "partners" => UserModel::getPartnerAll()
        ];

        echo json_encode($infos);
    }

    public static function post(){
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
        $customer = CustomerModel::getAll($_POST['id']);
        $customer = $customer["points"] + $points;
        CustomerModel::updatePoints($customer,$_POST['id']);
        echo json_encode($points);
    }

}

?>