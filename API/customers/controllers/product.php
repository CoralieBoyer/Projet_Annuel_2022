<?php

include __DIR__ . "/../../models/product_model.php";
include __DIR__ . "/../../models/rating_model.php";
include __DIR__ . "/../../models/purchase_model.php";
include __DIR__ . "/../../models/basket_model.php";

class Product{
  
  public static function post(){
    if(isset($_POST['action']) && $_POST['action'] == 'payment'){
      PurchaseModel::insertProduct($_POST['brand'], $_POST['country'], $_POST['exp_month'], $_POST['exp_year'], $_POST['client_ip'], $_POST['amount'], $_POST['id_product']);
      $result = "";
    }

    else if(isset($_POST['action']) && $_POST['action'] == 'addBasket'){
      $idBasket = BasketModel::getAllWithUser($_POST['idUser'],0);
      $idBasket = $idBasket[0]['id'];
      BasketModel::InsertInclude($idBasket, $_POST['idProduct'], 1);
      $result = "ok";
    }

    else if(isset($_POST['id'])){
      if(isset($_POST['note'])){
        RatingModel::insert($_POST['note'], $_POST['title'], $_POST['comment'], date("Y-m-d H:i:s"), $_POST['id'], $_POST['user']);
      }
      $result = [
        "rating" => RatingModel::getAllWithIdProduct($_POST['id']),
        "product" => ProductModel::getAllWithId($_POST['id']),
        "prestation" => ProductModel::getPrestation($_POST['id']),
        "object" => ProductModel::getObject($_POST['id'])
      ];
    }
    echo json_encode($result);
  }
}

?>
