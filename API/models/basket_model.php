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

  public static function getAllWithUser($id,$status){
    $databaseConnection = Database::getConnection();

    $q = "SELECT CUSTOMER.id FROM CUSTOMER WHERE id_user = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $customer = $req->fetch(PDO::FETCH_ASSOC);

    $q = "SELECT * FROM BASKET WHERE id_customer = :id AND status=:status";
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

    $q = "UPDATE BASKET SET status = 1, date = :date WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'date' => date("Y-m-d H:i:s"),
      'id' => $idBasket
    ]);

    $q = "INSERT INTO BASKET (id_customer,status) VALUES (:id,0)";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
        'id' => $idCustomer
    ]);
  }

  public static function InsertInclude($idBasket, $idProduct, $count){
    $databaseConnection = Database::getConnection();

    $q = "INSERT INTO INCLUDE (count, id_basket, id_product) VALUES (:count, :idBasket, :idProduct)";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
        'count' => $count,
        'idBasket' => $idBasket,
        'idProduct' => $idProduct
    ]);
  }

  public static function deleteInclude($idBasket, $idProduct){
    $databaseConnection = Database::getConnection();

    $q = "DELETE FROM INCLUDE WHERE id_basket = :idBasket AND id_product = :idProduct";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
        'idBasket' => $idBasket,
        'idProduct' => $idProduct
    ]);
  }

}

?>
