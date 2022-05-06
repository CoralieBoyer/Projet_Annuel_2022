<?php

include __DIR__ . "/../../models/user_model.php";
include __DIR__ . "/../../models/admin_model.php";

class Profile{

    public static function get(){
        $user = UserModel::getAllWithId($_POST['id']);
        if($_POST['action'] == "get")
            $infos = [
                'user' => $user,
                'admin' => AdminModel::getAllWithIdUser($_POST['id'])
            ];

        else if($_POST['action'] == "modify"){
            if(hash('sha512', $_POST['old']) == $user['password']){
                UserModel::modify($_POST['name'], $_POST['email'], $_POST['new'], $_POST['id']);
                $infos = [
                    "message" => "true"
                ];
            }else
                $infos = [
                    "message" => "false"
                ];
        }
        echo json_encode($infos);
    }

}
?>