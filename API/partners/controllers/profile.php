<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/partner_model.php";

class Profile{

    public static function post(){
        if(!isset($_POST['action'])){
            $user = UserModel::getAllWithPartnerWithId($_POST['id']);
            echo json_encode($user);
        }
        elseif($_POST['action'] == 'modify')
            PartnerModel::modifyProfile($_POST['siret'], $_POST['link'], $_POST['id']);
    }

}

?>