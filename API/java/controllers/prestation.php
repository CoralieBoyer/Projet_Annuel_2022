<?php

include __DIR__ . "/../../models/product_model.php";

class Prestation{

    public static function post(){
        $result = ProductModel::getProductsPartner($_POST['id']);
        echo json_encode($result);
    }

}
?>