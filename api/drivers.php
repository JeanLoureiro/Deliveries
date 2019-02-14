<?php

$drivers = json_decode(file_get_contents('../data/drivers.json'));

$response = [];

$errors = [];

$body = json_decode(file_get_contents('php://input'));

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            if (empty($id) || !is_numeric($id) || !isset($drivers->items->{$id})) {
                $errors['id'] = 'Invalid delivery ID';
            }

            if (0 == count($errors)) {
                $response = $drivers->items->{$id};
            }
        } else {
            $response = $drivers->items;
        }

        break;
    default:
        header('HTTP/1.0 405 Method Not Allowed');

        exit;
}

if (count($errors) > 0) {
    header('HTTP/1.0 400 Bad Request');

    $response['errors'] = $errors;
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

echo json_encode($response);
