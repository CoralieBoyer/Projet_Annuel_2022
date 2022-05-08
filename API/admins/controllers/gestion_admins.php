<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/admin_model.php";

class Admins{

  public static function get(){
    $result = UserModel::getAllWithAdmin();
    echo json_encode($result);
  }

  public static function post(){
    if($_POST['action'] == "add"){
      UserModel::insert($_POST['name'], $_POST['password'], $_POST['email']);
      $result = UserModel::getAllWithEmailPassword($_POST['email'], $_POST['password']);
      AdminModel::insert($_POST['firstname'], $result['id']);
      echo json_encode('Ajout effectué.');
    }

    elseif($_POST['action'] == "modify"){
      UserModel::modify($_POST['name'], $_POST['email'], $_POST['id_user']);
      AdminModel::modify($_POST['firstname'], $_POST['id']);
      echo json_encode("Modification effectuée.");
    }
    elseif($_POST['action'] == "modifyPassword"){
      UserModel::modifyPasswd($_POST['newPassword'], $_POST['id_user']);
    }
    elseif($_POST['action'] == "delete"){
      UserModel::delete($_POST['id_user']);
      AdminModel::delete($_POST['id']);
      echo json_encode('Suppression effectuée.');
    }
  }

}
?>
