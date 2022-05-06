<?php

class Database
{
    public static function getConnection()
    {
        $driver = "mysql";
        $databaseName = "SAC_FIDELITY";
        $host = "localhost";
        $dsn = "$driver:dbname=$databaseName;host=$host";
        $user = "root";
        $passwd = "root";
        $options = [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC];
        $databaseConnection = new PDO($dsn, $user, $passwd, $options);

        return $databaseConnection;
    }
}

?>