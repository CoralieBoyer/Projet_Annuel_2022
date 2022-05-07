<?php

include_once __DIR__ . "/../database/connect_db.php";

class ContributionModel{
    public static function insert($price, $id){
        $databaseConnection = Database::getConnection();
    
          $q = "INSERT INTO CONTRIBUTION (payment_date, price, id_partner) VALUES(:payment_date,:price,:id)";
          $req = $databaseConnection->prepare($q);
          $response = $req->execute([
            'payment_date' => date("Y-m-d H:i:s"),
            'price' => $price,
            'id' => $id
        ]);
      }
}
?>