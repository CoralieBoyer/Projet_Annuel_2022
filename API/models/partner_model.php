<?php

include_once __DIR__ . "/../database/connect_db.php";

class PartnerModel{

  public static function insert($siret,$id){
    $databaseConnection = Database::getConnection();

      $q = "INSERT INTO PARTNER (siret,id_user) VALUES(:siret,:id)";
      $req = $databaseConnection->prepare($q);
      $response = $req->execute([
        'siret' => $siret,
        'id' => $id
    ]);
  }

  public static function getAllWithIdUser($id){
    $databaseConnection = Database::getConnection();

      $q = "SELECT * FROM PARTNER WHERE id_user = :id";
      $req = $databaseConnection->prepare($q);
      $response = $req->execute([
        'id' => $id
    ]);
      $result = $req->fetch(PDO::FETCH_ASSOC);
      return $result;
  }

  public static function modify($siret, $status, $id){
    $databaseConnection = Database::getConnection();

    $q = "UPDATE PARTNER SET siret = :siret, status = :status WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'siret' => $siret,
      'status' => $status,
      'id' => $id
    ]);
  }

  public static function delete($id){
    $databaseConnection = Database::getConnection();

    $q = "DELETE FROM PARTNER WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
  }

  public static function getCount(){
    $databaseConnection = Database::getConnection();

    $q = "SELECT COUNT(*) FROM PARTNER";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetch();
    return($result['COUNT(*)']);
  }

  public static function getAllPartnerWithStatus(){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM USER,PARTNER WHERE USER.id = PARTNER.id_user AND PARTNER.status = 1  ORDER BY USER.name";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetchAll();
    return $result;
  }

  public static function getContributionWithId($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT price as value, payment_date as name FROM CONTRIBUTION WHERE id_partner = :id ORDER BY payment_date";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetchAll();
    return $result;
  }

  public static function getLastContributionWithId($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT MAX(payment_date) AS date FROM CONTRIBUTION WHERE id_partner = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);;
    return $result;
  }

  public static function getFirstContributionWithId($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT MIN(payment_date) AS date FROM CONTRIBUTION WHERE id_partner = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);;
    return $result;
  }

}

?>
