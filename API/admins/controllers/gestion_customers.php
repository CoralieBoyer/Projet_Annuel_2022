<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/customer_model.php";
include __DIR__ . "/../../models/basket_model.php";

class Customers{

  public static function get(){
    $result = UserModel::getAllWithCustomer();
    echo json_encode($result);
  }

  public static function post(){
    if($_POST['action'] == "getInfos"){
      $idBaskets = BasketModel::getAllWithUser($_POST['id'], 1);
      $baskets = [];
      foreach($idBaskets as $basket){
          $baskets[$basket['id']] = BasketModel::getProduct($basket['id']);
      }
      $result = [
        'infos' => UserModel::getAllWithCustomerWithId($_POST['id']),
        'idBaskets' => $idBaskets,
        'baskets' => $baskets
      ];
    }
    if($_POST['action'] == "modify"){
      UserModel::modify($_POST['name'], $_POST['email'], $_POST['password'], $_POST['id_user']);
      CustomerModel::modify($_POST['firstname'], $_POST['phone_number'], $_POST['id']);
      $result = 'Modifications effectuées.';
    }
    if($_POST['action'] == "delete"){
      UserModel::delete($_POST['id_user']);
      CustomerModel::delete($_POST['id']);
      $result = 'Suppression effectuée.';
    }
    echo json_encode($result);
  }

}
?>
