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

if ($route === "accueil") {
    include __DIR__ . "/controllers/home_customer.php";
    if ($method === "GET") {
        Home::get();
        die();
    }
    if ($method === "POST") {
        Home::post();
        die();
    }
}

if ($route === "connexion") {
    include __DIR__ . "/controllers/connexion.php";
    if ($method === "POST") {
        Connexion::post();
        die();
    }
}

if ($route === "inscription") {
    include __DIR__ . "/controllers/inscription.php";
    if ($method === "POST") {
        Inscritpion::post();
        die();
    }
}

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

if ($route === "shopping_cart") {
    include __DIR__ . "/controllers/shopping_cart.php";
    if ($method === "POST") {
        ShoppingCart::post();
        die();
    }
}

if ($route === "tests") {
    include __DIR__ . "/controllers/tests.php";
    if ($method === "GET") {
        Tests::get();
        die();
    }
}

{
    include __DIR__ . "/../library/response.php";
    echo Response::json(404, ["Content-Type" => "application/json"], "Not found");
}
