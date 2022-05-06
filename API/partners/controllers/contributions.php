<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/partner_model.php";

class Contributions{

    public static function post(){
        $user = UserModel::getAllWithPartnerWithId($_POST['id']);
        if($_POST['action'] == "getInfos")
            $infos = PartnerModel::getContributionWithId($user['id']);

        if($_POST['action'] == "payment"){
            $infos = "OK"; // A FAIRE
        }

        echo json_encode($infos);
    }

}

?>