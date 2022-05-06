<?php

include_once __DIR__ . "/../database/connect_db.php";

class PrestationModel{

    public static function getAll(){
        $databaseConnection = Database::getConnection();

        $select = "SELECT * FROM PRODUCT,PRESTATION WHERE PRODUCT.id = PRESTATION.id_product";
        $req = $databaseConnection->prepare($select);
        $response = $req->execute();
        $result = $req->fetchAll();
        return $result;
    }

    public static function getByPartner($id){
        $databaseConnection = Database::getConnection();

        $select = "SELECT * FROM PRODUCT,PRESTATION WHERE PRODUCT.id = PRESTATION.id_product AND PRESTATION.id_partner = :id";
        $req = $databaseConnection->prepare($select);
        $response = $req->execute([ 'id' => $id ]);
        $result = $req->fetchAll();
        return $result;
    }

}