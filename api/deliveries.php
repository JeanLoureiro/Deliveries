<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');


$drivers = json_decode(file_get_contents('../data/drivers.json'));
$deliveries = json_decode(file_get_contents('../data/deliveries.json'));

$response = [];

$errors = [];

$body = json_decode(file_get_contents('php://input'));

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];

            if (empty($id) || !is_numeric($id) || !isset($deliveries->items->{$id})) {
                $errors['id'] = 'Invalid delivery ID';
            }

            if (0 == count($errors)) {
                $response = $deliveries->items->{$id};
            }
        } else {
            $response = $deliveries->items;
        }

        break;
    case 'POST':
        if (!isset($_POST['date'])) {
            $errors['date'] = 'Please enter a date';
        } elseif (!preg_match('/\d{4}\-\d{2}-\d{2}/', $_POST['date'])) {
            $errors['date'] = 'Please enter a valid date';
        } else {
            $checkDate = date('Y-m-d', strtotime($_POST['date']));
            if ($checkDate != $_POST['date']) {
                $errors['date'] = 'Please enter a valid date';
            }
        }

        if (!isset($_POST['name']) || empty($_POST['name'])) {
            $errors['name'] = 'Please enter a name';
        } else {
            $checkName = trim($_POST['name']);

            if (empty($checkName)) {
                $errors['name'] = 'Please enter a valid name';
            }
        }

        if (!isset($_POST['driver_id']) || empty($_POST['driver_id'])) {
            $errors['driver_id'] = 'Please choose a driver';
        } elseif (!is_numeric($_POST['driver_id'])) {
            $errors['driver_id'] = 'Please choose a valid driver';
        } elseif (!isset($drivers->items->{$_POST['driver_id']})) {
            $errors['driver_id'] = 'Please choose a valid driver';
        }

        if (0 == count($errors)) {
            $deliveries = json_decode(file_get_contents('../data/deliveries.json'));

            $id = $deliveries->next_id;

            $deliveries->items->{$id} = [
                'date' => $_POST['date'],
                'name' => $_POST['name'],
                'driver_id' => $_POST['driver_id'],
            ];

            $deliveries->next_id++;

            file_put_contents('../data/deliveries.json', json_encode($deliveries));

            header('HTTP/1.0 201 Created');

            $response = $deliveries->items->{$id};
        }

        break;
    case 'PUT':
        if (!isset($_GET['id'])) {
            $errors['id'] = 'Missing delivery ID';
        } else {
            $id = $_GET['id'];

            if (!is_numeric($id) || !isset($deliveries->items->{$id})) {
                $errors['id'] = 'Invalid delivery ID';
            }
        }

        if (0 == count($errors)) {
            if (!isset($_GET['driver_id']) || empty($_GET['driver_id'])) {
                $errors['driver_id'] = 'Missing driver ID';
            } elseif (!is_numeric($_GET['driver_id']) || !isset($drivers->items->{$_GET['driver_id']})) {
                $errors['driver_id'] = 'Invalid driver ID';
            }

            if (0 == count($errors)) {
                $deliveries->items->{$id}->driver_id = (int)$_GET['driver_id'];

                file_put_contents('../data/deliveries.json', json_encode($deliveries));

                $response = $deliveries->items->{$id};
            }
        }

        break;
    case 'DELETE':
        if (!isset($_GET['id'])) {
            $errors['id'] = 'Missing delivery ID';
        } else {
            $id = $_GET['id'];

            if (!is_numeric($id) || !isset($deliveries->items->{$id})) {
                $errors['id'] = 'Invalid delivery ID';
            }
        }

        if (0 == count($errors)) {
            $delivery = $deliveries->items->{$id};

            unset($deliveries->items->{$id});

            file_put_contents('../data/deliveries.json', json_encode($deliveries));
        }

        break;
    
    case 'OPTIONS' :

        break;

    default:
        echo $_SERVER['REQUEST_METHOD'];
        header('HTTP/1.0 405 Method Not Allowed');

        exit;
}

if (count($errors) > 0) {
    header('HTTP/1.0 400 Bad Request');

    $response['errors'] = $errors;
    $response['body'] = $body;
}


echo json_encode($response);
