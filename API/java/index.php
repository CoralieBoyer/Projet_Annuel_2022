<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

/**
 * @see https://www.php.net/manual/en/migration70.new-features.php#migration70.new-features.null-coalesce-op
 */
$route = $_REQUEST["route"] ?? "home";

/**
 * @see https://www.php.net/manual/en/reserved.variables.server.php
 */
$method = $_SERVER["REQUEST_METHOD"];

if ($route === "product") {
    include __DIR__ . "/controllers/product.php";
    if ($method === "POST") {
        Product::post();
        die();
    }
}

if ($route === "profile") {
    include __DIR__ . "/controllers/profile.php";
    if ($method === "POST") {
        Profile::post();
        die();
    }
}

if ($route === "prestation") {
    include __DIR__ . "/controllers/prestation.php";
    if ($method === "POST") {
        Prestation::post();
        die();
    }
}

{
    include __DIR__ . "/../library/response.php";
    echo Response::json(404, ["Content-Type" => "application/json"], "Not found");
}

?>