<?php

$userJSONText = $_POST["userJSONText"];
$userPHPObject = json_decode($userJSONText);

$connection = new mysqli("localhost", "root", "SEngineer,531", "chatpilot");

$s_table = $connection->query("SELECT * FROM `user` WHERE `id` != '" . $userPHPObject->id . "' AND `name` LIKE '" . $_POST["text"] . "%'");

$phpResponseArray = array();

for ($y = 0; $y < $s_table->num_rows; $y++) {

    $s_data = $s_table->fetch_assoc();

    $phpArrayItemObject = new stdClass();

    $phpArrayItemObject->id = $s_data["id"];
    $phpArrayItemObject->pic = $s_data["profile_url"];
    $phpArrayItemObject->name = $s_data["name"];

    array_push($phpResponseArray, $phpArrayItemObject);
}

$jsonResponseText = json_encode($phpResponseArray);
echo ($jsonResponseText);
