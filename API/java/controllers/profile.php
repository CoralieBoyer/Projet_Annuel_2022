<?php

include __DIR__ . "/../../models/partner_model.php";
include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/customer_model.php";

class Profile{

    public static function post(){
        if($_POST['action'] == "modifyUserInfos"){
            UserModel::modify($_POST['name'],$_POST['email'],$_POST['password'],$_POST['id']); 
            $infos = "Changement effectué.";
        }
        else if($_POST['action'] == "modifyPartnerInfos"){
            PartnerModel::modify($_POST['siret'], $_POST['status'], $_POST['id_user']);
            $infos = "Changement effectué.";
        }
        else if($_POST['action'] == "getAllWithIdUser"){
            $infos = UserModel::getAllWithPartnerWithId($_POST['id']);
        }
        echo json_encode($infos);
    }

}
   
?>