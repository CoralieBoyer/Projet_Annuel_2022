<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/customer_model.php";
include __DIR__ . "/../../models/partner_model.php";

class Inscritpion {

  public static function post(){
    $infos = UserModel::getAllWithEmailPassword($_POST['newEmail'], $_POST['newPassword']);
    if($infos){
      echo json_encode("false");
    }else{
      UserModel::insert($_POST['newName'], $_POST['newPassword'], $_POST['newEmail']);
      $id = UserModel::getAllWithEmailPassword($_POST['newEmail'], $_POST['newPassword']);
      if(!empty($_POST['newFirstName'])){
        CustomerModel::insert($_POST['newFirstName'], $_POST['newAddress'],$_POST['newCode'],$_POST['newCity'],$_POST['newPhoneNumber'],$id['id']);
        echo json_encode("customer");
      }
      if(!empty($_POST['newSiret'])){
        PartnerModel::insert($_POST['newSiret'],$id['id']);
        echo json_encode("partner");
      }

    }
  }

}

?>
