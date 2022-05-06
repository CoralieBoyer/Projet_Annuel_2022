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

if ($route === "analyses") {
    include __DIR__ . "/controllers/analyses.php";
    if ($method === "GET") {
        Analyses::get();
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

if ($route === "customers") {
    include __DIR__ . "/controllers/gestion_customers.php";
    if ($method === "GET") {
        Customers::get();
        die();
    }
    if ($method === "POST") {
        Customers::post();
        die();
    }
}

if ($route === "partners") {
    include __DIR__ . "/controllers/gestion_partners.php";
    if ($method === "GET") {
        Partners::get();
        die();
    }
    if ($method === "POST") {
        Partners::post();
        die();
    }
}

if ($route === "admins") {
    include __DIR__ . "/controllers/gestion_admins.php";
    if ($method === "GET") {
        Admins::get();
        die();
    }
    if ($method === "POST") {
        Admins::post();
        die();
    }
}

{
    include __DIR__ . "/../library/response.php";
    echo Response::json(404, ["Content-Type" => "application/json"], "Not found");
}
