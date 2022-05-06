<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/partner_model.php";
include __DIR__ . "/../../models/customer_model.php";
include __DIR__ . "/../../models/admin_model.php";

class Connexion{

  public static function post(){
    $infos = UserModel::getAllWithEmailPassword($_POST['name'], $_POST['password']);

    if($infos){
      $partner = PartnerModel::getAllWithIdUser($infos['id']);
      $customer = CustomerModel::getAllWithIdUser($infos['id']);
      $admin = AdminModel::getAllWithIdUser($infos['id']);
      if($partner)
        $user = 'partner';
      if($customer)
        $user = 'customer';
      if($admin)
        $user = 'admin';
      setcookie("id", $infos['id'], time() + 2 * 24 * 60 * 60);
      echo json_encode([
        "user" => $user,
        "id" => $infos['id']
      ]);
    }else{
      echo json_encode([
        "user" => "false"
      ]);
    }
  }

}

?>