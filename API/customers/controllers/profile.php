<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/customer_model.php";
include __DIR__ . "/../../models/basket_model.php";

class Profile{
  
    public static function post(){
        $user = UserModel::getAllWithId($_POST['id']);
        if($_POST['action'] == "get"){
            $idBaskets = BasketModel::getIdWithUser($_POST['id'],1);
            $baskets = [];
            foreach($idBaskets as $basket){
                $baskets[$basket['id']] = BasketModel::getProduct($basket['id']);
            }
            $infos = [
                'user' => $user,
                'customer' => CustomerModel::getAllWithIdUser($_POST['id']),
                'idBaskets' => $idBaskets,
                'baskets' => $baskets
            ];
        }
        else if($_POST['action'] == "modifyPassword"){
            if(hash('sha512', $_POST['old']) == $user['password']){
                UserModel::modify($_POST['name'], $_POST['email'], $_POST['new'], $_POST['id']);
                $infos = [
                    "message" => "true"
                ];
            }else
                $infos = [
                    "message" => "false"
                ];
        }else if($_POST['action'] == "modifyInfos"){
            UserModel::modifyName($_POST['name'], $_POST['id']);
            CustomerModel::modifyWithIdUser($_POST['firstname'], $_POST['address'], $_POST['zip_code'], $_POST['city'], $_POST['phone_number'], $_POST['id']);
        }
        echo json_encode($infos);
    }
  
  }

?>