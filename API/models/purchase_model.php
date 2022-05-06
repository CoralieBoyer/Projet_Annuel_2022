<?php

include_once __DIR__ . "/../database/connect_db.php";

class PurchaseModel{

    public static function insertBasket($brand, $country, $exp_month, $exp_year, $client_ip, $amount, $id_basket){
        $databaseConnection = Database::getConnection();

        $insert = "INSERT INTO PURCHASE (number_credit_card, brand, country, exp_month, exp_year, client_ip, amount, date, id_basket) VALUES (:number_credit_card, :brand, :country, :exp_month, :exp_year, :client_ip, :amount, :date, :id_basket)";
        $req = $databaseConnection->prepare($insert);
        $response = $req->execute([
        'number_credit_card' => $_POST['number_credit_card'],
        'brand' => $brand,
        'country' => $country,
        'exp_month' => $exp_month,
        'exp_year' => $exp_year,
        'client_ip' => $client_ip,
        'amount' => $amount,
        'date' => date("Y-m-d H:i:s"),
        'id_basket' => $id_basket
        ]);
    }

    public static function insertProduct($brand, $country, $exp_month, $exp_year, $client_ip, $amount, $id_product){
        $databaseConnection = Database::getConnection();

        $insert = "INSERT INTO PURCHASE (number_credit_card, brand, country, exp_month, exp_year, client_ip, amount, date, id_product) VALUES (:number_credit_card, :brand, :country, :exp_month, :exp_year, :client_ip, :amount, :date, :id_product)";
        $req = $databaseConnection->prepare($insert);
        $response = $req->execute([
        'number_credit_card' => $_POST['number_credit_card'],
        'brand' => $brand,
        'country' => $country,
        'exp_month' => $exp_month,
        'exp_year' => $exp_year,
        'client_ip' => $client_ip,
        'amount' => $amount,
        'date' => date("Y-m-d H:i:s"),
        'id_product' => $id_product
        ]);
    }

    public static function getAllByYear($year){
        $databaseConnection = Database::getConnection();

        $select = "SELECT * FROM PURCHASE WHERE DATE_FORMAT(date,'%Y') = :date";
        $req = $databaseConnection->prepare($select);
        $response = $req->execute([ 'date' => $year ]);
        $result = $req->fetchAll();
        return $result;
    }

}

?>