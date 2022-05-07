<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/partner_model.php";
include __DIR__ . "/../../models/product_model.php";

class Partners{

  public static function get(){
    $result = UserModel::getAllWithPartner();
    echo json_encode($result);
  }

  public static function post(){
    if($_POST['action'] == "getInfos"){
      $user = UserModel::getAllWithPartnerWithId($_POST['id']);
      $result = [
        'infos' => $user,
        'produces' => ProductModel::getProductsPartner($_POST['id']),
        'cautisations' => PartnerModel::getContributionWithId($user['id'])
      ];
    }
    elseif($_POST['action'] == "modify"){
      UserModel::modify($_POST['name'], $_POST['email'], $_POST['id_user']);
      PartnerModel::modify($_POST['siret'], $_POST['status'], $_POST['id']);
      $result = 'Modifications effectuées.';
    }
    elseif($_POST['action'] == "delete"){
      PartnerModel::delete($_POST['id']);
      UserModel::delete($_POST['id_user']);
      $result = 'Suppression effectuée.';
    }
    elseif($_POST['action'] == "deleteProduct"){
      $result = ProductModel::deletePrestation($_POST['id']);
      $result = 'Suppression effectuée.';
    }
    echo json_encode($result);
  }

}
?>
