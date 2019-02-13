<?php

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
        if (!isset($body->date)) {
            $errors['date'] = 'Please enter a date';
        } elseif (!preg_match('/\d{4}\-\d{2}-\d{2}/', $body->date)) {
            $errors['date'] = 'Please enter a valid date';
        } else {
            $checkDate = date('Y-m-d', strtotime($body->date));
            if ($checkDate != $body->date) {
                $errors['date'] = 'Please enter a valid date';
            }
        }

        if (!isset($body->name) || empty($body->name)) {
            $errors['name'] = 'Please enter a name';
        } else {
            $checkName = trim($body->name);

            if (empty($checkName)) {
                $errors['name'] = 'Please enter a valid name';
            }
        }

        if (!isset($body->driver_id) || empty($body->driver_id)) {
            $errors['driver_id'] = 'Please choose a driver';
        } elseif (!is_numeric($body->driver_id)) {
            $errors['driver_id'] = 'Please choose a valid driver';
        } elseif (!isset($drivers->items->{$body->driver_id})) {
            $errors['driver_id'] = 'Please choose a valid driver';
        }

        if (0 == count($errors)) {
            $deliveries = json_decode(file_get_contents('../data/deliveries.json'));

            $id = $deliveries->next_id;

            $deliveries->items->{$id} = [
                'date' => $body->date,
                'name' => $body->name,
                'driver_id' => $body->driver_id,
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
            if (!isset($body->driver_id) || empty($body->driver_id)) {
                $errors['driver_id'] = 'Missing driver ID';
            } elseif (!is_numeric($body->driver_id) || !isset($drivers->items->{$body->driver_id})) {
                $errors['driver_id'] = 'Invalid driver ID';
            }

            if (0 == count($errors)) {
                $deliveries->items->{$id}->driver_id = $body->driver_id;

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
    default:
        header('HTTP/1.0 405 Method Not Allowed');

        exit;
}

if (count($errors) > 0) {
    header('HTTP/1.0 400 Bad Request');

    $response['errors'] = $errors;
}

header('Content-Type: application/json');

echo json_encode($response);
