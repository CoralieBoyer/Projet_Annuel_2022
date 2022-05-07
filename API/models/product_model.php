<?php

include_once __DIR__ . "/../database/connect_db.php";

class ProductModel{

  public static function getCount(){
    $databaseConnection = Database::getConnection();
    
    $q = "SELECT COUNT(*) FROM PRODUCT";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return($result['COUNT(*)']);
  }

  public static function getProductsPartner($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT id FROM PARTNER WHERE id_user = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $partner = $req->fetch(PDO::FETCH_ASSOC);

    $q = "SELECT * FROM PRODUCT,PRESTATION WHERE PRESTATION.id_partner = :id AND PRESTATION.id_product = PRODUCT.id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $partner['id']
    ]);
    $result = $req->fetchAll();
    return($result);
  }

  public static function getAllWithPrestations(){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM PRODUCT,PRESTATION WHERE PRODUCT.id = PRESTATION.id_product ORDER BY PRODUCT.name";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetchAll();
    return $result;
  }

  public static function getAllWithObjects(){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM PRODUCT,OBJECT WHERE PRODUCT.id = OBJECT.id_product ORDER BY PRODUCT.name";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetchAll();
    return $result;
  }

  public static function getAllWithId($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM PRODUCT WHERE PRODUCT.id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

  public static function getPrestation($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM PRESTATION WHERE id_product = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

  public static function getObject($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM OBJECT WHERE id_product = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

  public static function getAllHistoricalWithId($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM HISTORICAL WHERE id_product = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetchAll();
    return $result;
  }

  public static function insert($name,$price,$description,$image,$quantity){
      $databaseConnection = Database::getConnection();

    $q = "INSERT INTO PRODUCT(name, price, description, image, quantity) VALUES (:name, :price, :description, :image, :quantity)";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
    'name' => $name,
    'price' => $price,
    'description' => $description,
    'image' => $image,
    'quantity' => $quantity
    ]);

    $q = "SELECT id FROM PRODUCT WHERE name = :name AND price = :price AND description = :description AND image = :image AND quantity = :quantity";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
    'name' => $name,
    'price' => $price,
    'description' => $description,
    'image' => $image,
    'quantity' => $quantity
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return $result['id'];
  }

  public static function deletePrestation($id){
    $databaseConnection = Database::getConnection();

    $q = "DELETE FROM PRODUCT WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);

    $q = "DELETE FROM PRESTATION WHERE id_product = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    
  }

  public static function insertJava($name,$price,$description,$quantity,$id){
    $databaseConnection = Database::getConnection();

    $q = "INSERT INTO PRODUCT(name, price, description,quantity ) VALUES (:name, :price, :description, :quantity)";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
    'name' => $name,
    'price' => $price,
    'description' => $description,
    'quantity' => $quantity
    ]);


    $q = "SELECT id FROM PRODUCT WHERE name = :name AND price = :price AND description = :description AND quantity = :quantity";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
    'name' => $name,
    'price' => $price,
    'description' => $description,
    'quantity' => $quantity
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);

    $q = "INSERT INTO PRESTATION (id_partner,id_product) VALUES (:id_partner,:id_product)";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
    'id_partner' => $id,
    'id_product' => $result['id']
    ]);
  }

}

?>
