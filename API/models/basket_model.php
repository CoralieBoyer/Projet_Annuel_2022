<?php

include_once __DIR__ . "/../database/connect_db.php";

class BasketModel{

  public static function getHistoricUser($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT CUSTOMER.id FROM CUSTOMER WHERE id_user = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $customer = $req->fetch(PDO::FETCH_ASSOC);

    $q = "SELECT BASKET.id, BASKET.date_validation, PRODUCT.name, INCLUDE.count FROM BASKET,PRODUCT,INCLUDE WHERE PRODUCT.id = INCLUDE.id_product AND BASKET.id = INCLUDE.id_basket AND BASKET.id_customer = :id AND BASKET.status = 1";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $customer['id']
    ]);
    $result = $req->fetchAll();
    return $result;
  }

  public static function getIdWithUser($id,$status){
    $databaseConnection = Database::getConnection();

    $q = "SELECT CUSTOMER.id FROM CUSTOMER WHERE id_user = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $customer = $req->fetch(PDO::FETCH_ASSOC);

    $q = "SELECT id FROM BASKET WHERE id_customer = :id AND status=:status";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $customer['id'],
      'status' => $status
    ]);
    $result = $req->fetchAll();
    return $result;
  }

  public static function getProduct($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM PRODUCT,INCLUDE WHERE PRODUCT.id = INCLUDE.id_product AND INCLUDE.id_basket = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
        'id' => $id
    ]);
    $result = $req->fetchAll();
    return $result;
  }

  public static function ChangeStatusAndAddNew($idBasket, $idCustomer){
    $databaseConnection = Database::getConnection();

    $q = "UPDATE BASKET SET status = 1 WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
        'id' => $idBasket
    ]);

    $q = "INSERT INTO BASKET (id_customer,status) VALUES (:id,0)";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
        'id' => $idCustomer
    ]);
  }

}

?>
