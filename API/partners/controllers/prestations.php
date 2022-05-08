<?php

include __DIR__ . "/../../models/product_model.php";
include __DIR__ . "/../../models/partner_model.php";
include __DIR__ . "/../../models/prestation_model.php";

class Prestations{

    public static function post(){
        if($_POST['action'] == "getInfos"){
            $result = ProductModel::getProductsPartner($_POST['id']);
            echo json_encode($result);
        }
        elseif($_POST['action'] == "add"){
            $idPartner = PartnerModel::getAllWithIdUser($_POST['id']);
            $idProduct = ProductModel::insert($_POST['name'], $_POST['price'], $_POST['description'], "image.jpg", $_POST['quantity']);
            PrestationModel::insert($idProduct, $idPartner['id']);
            echo json_encode($idProduct);
        }
        elseif($_POST['action'] == "delete"){
            ProductModel::deletePrestation($_POST['id']);
            echo json_encode('Suppression effectuée.');
          }
    }

}

?>