<?php

include __DIR__ . "/../../models/product_model.php";

class Admins{

  public static function get(){
    $result = ProductModel::getAllWithObjects();
    echo json_encode($result);
  }

  public static function post(){
    if($_POST['action'] == "add"){
      UserModel::insert($_POST['name'], $_POST['password'], $_POST['email']);
      echo json_encode('Ajout effectué.');
    }

    elseif($_POST['action'] == "modify"){
      UserModel::modify($_POST['name'], $_POST['email'], $_POST['id_user']);
      AdminModel::modify($_POST['firstname'], $_POST['id']);
      echo json_encode("Modification effectuée.");
    }
    elseif($_POST['action'] == "delete"){
      ProductModel::deletePrestation($_POST['id']);
      ProductModel::deleteObject($_POST['id']);
      echo json_encode('Suppression effectuée.');
    }
  }

}
?>
