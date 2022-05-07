<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/partner_model.php";
include __DIR__ . "/../../models/contribution_model.php";

class Contributions{

    public static function post(){
        $user = UserModel::getAllWithPartnerWithId($_POST['id']);
        if($_POST['action'] == "getInfos")
            $infos = PartnerModel::getContributionWithId($user['id']);

        if($_POST['action'] == "payment"){
            $lastContribution = PartnerModel::getLastContributionWithId($user['id']);
            $lastContribution = substr($lastContribution['date'],0,4);
            if($lastContribution == date('Y'))
                $infos = "false";
            else{
                $idPartner = PartnerModel::getAllWithIdUser($_POST['id']);
                if($_POST['turnover'] < "200000") // 200 000 €
                    $contribution = 0;
                elseif($_POST['turnover'] < "800000") // 800 000
                    $contribution = $_POST['turnover'] * 0.008;
                elseif($_POST['turnover'] < "1500000") // 1 0500 000
                    $contribution = $_POST['turnover'] * 0.006;
                elseif($_POST['turnover'] < "3000000") // 3 0000 000
                    $contribution = $_POST['turnover'] * 0.004;
                else
                    $contribution = $_POST['turnover'] * 0.003;
                ContributionModel::insert($contribution, $idPartner['id']);
                $infos = $contribution;
            }
        }
        echo json_encode($infos);

    }
}

?>