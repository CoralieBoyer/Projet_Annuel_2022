<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/customer_model.php";
include __DIR__ . "/../../models/basket_model.php";
include __DIR__ . "/../../models/purchase_model.php";

class ShoppingCart{
  
  public static function post(){
    if($_POST['action'] == "getInfos"){
      $idCustomer = CustomerModel::getAllWithIdUser($_POST['id']);
      $idBaskets = BasketModel::getAllWithUser($_POST['id'],0);
      foreach($idBaskets as $basket){
          $baskets = BasketModel::getProduct($basket['id']);
      }
      $result = [
        'infos' => UserModel::getAllWithCustomerWithId($_POST['id']),
        'idBaskets' => $idBaskets[0]['id'],
        'baskets' => $baskets
      ];
      echo json_encode($result);
    }

    if($_POST['action'] == "payment"){
      PurchaseModel::insertBasket($_POST['brand'], $_POST['country'], $_POST['exp_month'], $_POST['exp_year'], $_POST['client_ip'], $_POST['amount'], $_POST['id_basket']);
      $idCustomer = CustomerModel::getAllWithIdUser($_POST['id']);
      BasketModel::ChangeStatusAndAddNew($_POST['id_basket'], $idCustomer['id']);
    }

    if($_POST['action'] == "delete"){
      BasketModel::deleteInclude($_POST['id_basket'], $_POST['id_product']);
    }
  }

}
?>