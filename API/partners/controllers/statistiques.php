<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/partner_model.php";
include __DIR__ . "/../../models/prestation_model.php";
include __DIR__ . "/../../models/purchase_model.php";

class Statistiques{

    public static function post(){
        $user = UserModel::getAllWithPartnerWithId($_POST['id']);
        $lastContribution = PartnerModel::getLastContributionWithId($user['id']);
        $lastContribution = substr($lastContribution['date'],0,4);
        $firstContribution = PartnerModel::getFirstContributionWithId($user['id']);
        $firstContribution = substr($firstContribution['date'],0,4);
        if($lastContribution == date('Y'))
            $lastContribution = true;
        else
            $lastContribution = false;

        $prestations = PrestationModel::getByPartner($user['id']);
        $purchase = PurchaseModel::getAllByYear($_POST['year']);

        $countPrestations = 0;
        $pricePrestations = 0;
        $countPrestationsSold = 0;
        $pricePrestationsSold = 0;
        $mounts = array("01","02","03","04","05","06","07","08","09","10","11","12");
        $statsPrestationsSold = array_fill_keys($mounts, 0);

        for($i = 0; $i < count($prestations); $i++){
            for($j = 0; $j < count($purchase); $j++)
                if($prestations[$i]['id_product'] == $purchase[$j]['id_product']){
                    $countPrestationsSold++;
                    $pricePrestationsSold += $prestations[$i]['price'];
                    $statsPrestationsSold[substr($purchase[$j]['date'] ,5,2)] += $prestations[$i]['price'];
                }
            $countPrestations += $prestations[$i]['quantity'];
            $pricePrestations += $prestations[$i]['price'] * $prestations[$i]['quantity'];
        }

        for($i = 0; $i < 12; $i++){
            $saleData[$i] = array(
                "name" => $mounts[$i],
                "value" => $statsPrestationsSold[$mounts[$i]]
            );
        }

        $infos = [
            "contribution" => $lastContribution,
            "firstContribution" => $firstContribution,
            "countPrestations" => $countPrestations,
            "pricePrestations" => $pricePrestations,
            "countPrestationsSold" => $countPrestationsSold,
            "pricePrestationsSold" => $pricePrestationsSold,
            "saleData" => $saleData
        ];

        echo json_encode($infos);
    }

}

?>