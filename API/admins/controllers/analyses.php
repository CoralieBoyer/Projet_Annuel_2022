<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/partner_model.php";
include __DIR__ . "/../../models/customer_model.php";
include __DIR__ . "/../../models/product_model.php";

class Analyses{

  public static function get(){
    $infos = [
      'users' => UserModel::getCount(),
      'partners' => PartnerModel::getCount(),
      'customers' => CustomerModel::getCount(),
      'produces' => ProductModel::getCount()
    ];

    echo json_encode($infos);
  }

}

?>
