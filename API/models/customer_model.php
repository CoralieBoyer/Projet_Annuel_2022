<?php

include_once __DIR__ . "/../database/connect_db.php";

class CustomerModel{

  public static function insert($firstname,$address,$zip_code,$city,$phone_number,$id_user){
    $databaseConnection = Database::getConnection();

      $q = "INSERT INTO CUSTOMER (firstname,address,zip_code,city,phone_number,id_user) VALUES(:firstname,:address,:zip_code,:city,:phone_number,:id_user)";
      $req = $databaseConnection->prepare($q);
      $response = $req->execute([
        'firstname' => $firstname,
        'address' => $address,
        'zip_code' => $zip_code,
        'city' => $city,
        'phone_number' => $phone_number,
        'id_user' => $id_user
    ]);
  }

  public static function getAllWithIdUser($id){
    $databaseConnection = Database::getConnection();

      $q = "SELECT * FROM CUSTOMER WHERE id_user = :id";
      $req = $databaseConnection->prepare($q);
      $response = $req->execute([
        'id' => $id
    ]);
      $result = $req->fetch(PDO::FETCH_ASSOC);
      return $result;
  }

  public static function modify($firstname, $phone_number, $id){
    $databaseConnection = Database::getConnection();

    $q = "UPDATE CUSTOMER SET firstname = :firstname, phone_number = :phone_number WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'firstname' => $firstname,
      'phone_number' => $phone_number,
      'id' => $id
    ]);
  }

  public static function modifyWithIdUser($firstname, $address, $zip_code, $city, $phone_number, $id){
    $databaseConnection = Database::getConnection();

    $q = "UPDATE CUSTOMER SET firstname = :firstname, address= :address, zip_code= :zip_code, city= :city, phone_number = :phone_number WHERE id_user = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'firstname' => $firstname,
      "address" => $address,
      "zip_code" => $zip_code,
      "city" => $city,
      'phone_number' => $phone_number,
      'id' => $id
    ]);
  }

  public static function delete($id){
    $databaseConnection = Database::getConnection();

    $q = "DELETE FROM CUSTOMER WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
  }

  public static function getCount(){
    $databaseConnection = Database::getConnection();

    $q = "SELECT COUNT(*) FROM CUSTOMER";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return($result['COUNT(*)']);
  }

}

?>
