<?php

include_once __DIR__ . "/../database/connect_db.php";

class AdminModel{

  public static function getAllWithIdUser($id){
    $databaseConnection = Database::getConnection();

      $q = "SELECT * FROM ADMINISTRATOR WHERE id_user = :id";
      $req = $databaseConnection->prepare($q);
      $response = $req->execute([
        'id' => $id
    ]);
      $result = $req->fetch(PDO::FETCH_ASSOC);
      return $result;
  }

  public static function insert($firstname, $id_user){
    $databaseConnection = Database::getConnection();

    $q = "INSERT INTO ADMINISTRATOR (firstname,id_user,label_role) VALUES(:firstname,:id,'adm')";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'firstname' => $firstname,
      'id' => $id_user
    ]);
  }

  public static function modify($firstname, $email, $id){ //FAIRE AUSSI POUR CLIENT
    $databaseConnection = Database::getConnection();

    $q = "UPDATE ADMINISTRATOR SET firstname = :firstname, email = :email WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'firstname' => $firstname,
      'email' => $email,
      'id' => $id
    ]);
  }

  public static function delete($id){
    $databaseConnection = Database::getConnection();

    $q = "DELETE FROM ADMINISTRATOR WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
  }

}

?>
