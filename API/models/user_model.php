<?php

include_once __DIR__ . "/../database/connect_db.php";

class UserModel{

  public static function getCustomerAll(){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM USER,CUSTOMER WHERE USER.ID = CUSTOMER.id_user ORDER BY USER.name";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetchAll();
    return $result;
  }

  public static function getPartnerAll(){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM USER,PARTNER WHERE USER.ID = PARTNER.id_user ORDER BY USER.name";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetchAll();
    return $result;
  }
  
  
  public static function getAllWithCustomer(){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM USER,CUSTOMER WHERE USER.id = CUSTOMER.id_user ORDER BY USER.name";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetchAll();
    return $result;
  }

  public static function getAllWithCustomerWithId($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM USER,CUSTOMER WHERE USER.id = CUSTOMER.id_user AND USER.id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

  public static function getAllWithPartner(){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM USER,PARTNER WHERE USER.id = PARTNER.id_user ORDER BY USER.name";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetchAll();
    return $result;
  }

  public static function getAllWithPartnerWithId($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM USER,PARTNER WHERE USER.id = PARTNER.id_user AND USER.id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return $result;
  }

  public static function getAllWithAdmin(){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM USER,ADMINISTRATOR WHERE USER.id = ADMINISTRATOR.id_user ORDER BY USER.name";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetchAll();
    return $result;
  }

  public static function getAllWithEmailPassword($email, $password){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM USER WHERE email = :email AND password = :password";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'email' => $email,
      'password' => hash('sha512', $password)
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return($result);
  }

  public static function getAllWithId($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM USER WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return($result);
  }

  public static function insert($name, $password, $email){
    $databaseConnection = Database::getConnection();

    $q = "INSERT INTO USER (name,password, email) VALUES(:name,:password, :email)";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'name' => $name,
      'password' => hash('sha512', $password),
      'email' => $email
    ]);
  }

  public static function modify($name, $email, $id){
    $databaseConnection = Database::getConnection();

    $q = "UPDATE USER SET name = :name, email = :email WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'name' => $name,
      'email' => $email,
      'id' => $id
    ]);
  }

  public static function modifyName($name, $id){
        $databaseConnection = Database::getConnection();

    $q = "UPDATE USER SET name = :name WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'name' => $name,
      'id' => $id
    ]);
  }

  public static function delete($id){
    $databaseConnection = Database::getConnection();

    $q = "DELETE FROM USER WHERE id = :id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
  }

  public static function getCount(){
        $databaseConnection = Database::getConnection();

    $q = "SELECT COUNT(*) FROM USER";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute();
    $result = $req->fetch(PDO::FETCH_ASSOC);
    return($result['COUNT(*)']);
  }

}

?>
