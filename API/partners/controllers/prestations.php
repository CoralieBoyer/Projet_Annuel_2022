<?php

include __DIR__ . "/../../models/product_model.php";

class Prestations{

    public static function post(){
        if($_POST['action'] == "getInfos"){
            $result = ProductModel::getProductsPartner($_POST['id']);
            echo json_encode($result);
        }
    }

}

?>