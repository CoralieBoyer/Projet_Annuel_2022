<?php

include __DIR__ . "/../../models/partner_model.php";
include __DIR__ . "/../../models/product_model.php";

class Home{

    public static function get(){
        $result = [
          "partners" => PartnerModel::getAllPartnerWithStatus(),
          "prestations" => ProductModel::getAllWithPrestations(),
          "objects" => ProductModel::getAllWithObjects()
        ];
        echo json_encode($result);
    }

    public static function post(){
        $result = ProductModel::getAllWithId($_POST['id']);
        echo json_encode($result);
    }

  }

?>
