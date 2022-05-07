<?php

include __DIR__ . "/../../models/product_model.php";
include __DIR__ . "/../../models/partner_model.php";
include __DIR__ . "/../../models/prestation_model.php";

class Product{

    public static function post(){
        $partner = PartnerModel::getAllWithIdUser($_POST['id']);
        $product = ProductModel::insert($_POST['name'],$_POST['actual_price'],$_POST['description'],"image.jpg", $_POST['quantity']);
        $info = PrestationModel::insert($product, $idPartner['id']);
        echo json_encode($info);
    }

}
?>