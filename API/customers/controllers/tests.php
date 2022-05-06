<?php

include __DIR__ . "/../../models/user_model.php";

class Tests{
  
    public static function get(){
        $infos = [
            "customers" => UserModel::getCustomerAll(),
            "partners" => UserModel::getPartnerAll()
        ];

        echo json_encode($infos);
    }

}

?>