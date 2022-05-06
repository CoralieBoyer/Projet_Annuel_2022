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

if ($route === "statistiques") {
    include __DIR__ . "/controllers/statistiques.php";
    if ($method === "POST") {
        Statistiques::post();
        die();
    }
}

if ($route === "prestations") {
    include __DIR__ . "/controllers/prestations.php";
    if ($method === "POST") {
        Prestations::post();
        die();
    }
}

if ($route === "contributions") {
    include __DIR__ . "/controllers/contributions.php";
    if ($method === "POST") {
        Contributions::post();
        die();
    }
}

{
    include __DIR__ . "/../library/response.php";
    echo Response::json(404, ["Content-Type" => "application/json"], "Not found");
}
