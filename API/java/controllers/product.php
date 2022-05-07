<?php

include __DIR__ . "/../../models/product_model.php";
include __DIR__ . "/../../models/partner_model.php";

class Product{

    public static function post(){
        $partner = PartnerModel::getAllWithIdUser($_POST['id']);
        $result = ProductModel::insertJava($_POST['name'],$_POST['actual_price'],$_POST['description'],$_POST['quantity'],$partner['id']);
        echo json_encode($result);
    }

}
?>