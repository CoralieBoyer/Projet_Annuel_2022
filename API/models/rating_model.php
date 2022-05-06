<?php

include_once __DIR__ . "/../database/connect_db.php";

class RatingModel{

  public static function getAllWithIdProduct($id){
    $databaseConnection = Database::getConnection();

    $q = "SELECT * FROM RATING,USER WHERE RATING.id_product = :id AND RATING.id_user = USER.id";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      'id' => $id
    ]);
    $result = $req->fetchAll();
    return $result;
  }

  public static function insert($ratingNubmer, $title, $comments, $created, $id_product, $id_user){
    $databaseConnection = Database::getConnection();

    $q = "INSERT INTO RATING (rating_number, title, comments, created, id_product, id_user) VALUES('$ratingNubmer', '$title', '$comments', '$created', $id_product, $id_user)";
    $req = $databaseConnection->prepare($q);
    $response = $req->execute([
      "ratingNubmer" => $ratingNubmer,
      "title" => $title,
      "comments" => $comments,
      "created" => $created,
      "id_product" => $id_product,
      "id_user" => $id_user
    ]);
    return $q;
  }

}

?>
