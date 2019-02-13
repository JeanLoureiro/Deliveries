<?php

$drivers = json_decode(file_get_contents('data/drivers.json'));

$date = '';
$name = '';
$driver_id = '';

$errors = [];

if ('POST' == $_SERVER['REQUEST_METHOD']) {
    $date = $_POST['date'];
    $name = $_POST['name'];
    $driver_id = $_POST['driver_id'];

    if (!isset($date)) {
        $errors['date'] = 'Please enter a date';
    } elseif (!preg_match('/\d{4}\-\d{2}-\d{2}/', $date)) {
        $errors['date'] = 'Please enter a valid date';
    } else {
        $checkDate = date('Y-m-d', strtotime($date));
        if ($checkDate != $date) {
            $errors['date'] = 'Please enter a valid date';
        }
    }

    if (!isset($name) || empty($name)) {
        $errors['name'] = 'Please enter a name';
    } else {
        $checkName = trim($name);

        if (empty($checkName)) {
            $errors['name'] = 'Please enter a valid name';
        }
    }

    if (!isset($driver_id) || empty($driver_id)) {
        $errors['driver_id'] = 'Please choose a driver';
    } elseif (!is_numeric($driver_id)) {
        $errors['driver_id'] = 'Please choose a valid driver';
    } elseif (!isset($drivers->items->{$driver_id})) {
        $errors['driver_id'] = 'Please choose a valid driver';
    }

    if (0 == count($errors)) {
        $deliveries = json_decode(file_get_contents('data/deliveries.json'));

        $id = $deliveries->next_id;

        $deliveries->items->{$id} = [
            'date' => $date,
            'name' => $name,
            'driver_id' => $driver_id,
        ];

        $deliveries->next_id++;

        file_put_contents('data/deliveries.json', json_encode($deliveries));

        header('Location: /');
    }
}

?>
<html>
    <head>
        <title>Deliveries</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"/>
        <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css"/>
        <link rel="stylesheet" href="css/main.css"/>
        <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script>
            $(function() {
                $('#deliveryDate').datepicker({
                    'dateFormat': 'yy-mm-dd'
                });
            });
        </script>
    </head>
    <body>
        <div class="container">
            <header class="header clearfix">
                <nav>
                    <ul class="nav nav-pills float-right">
                        <li class="nav-item">
                            <a class="nav-link" href="/">Deliveries</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/create.php">New Delivery</a>
                        </li>
                    </ul>
                </nav>
                <h3 class="text-muted">CartonCloud</h3>
            </header>
            <main role="main">
                <h1>Create Delivery</h1>
                <form action="create.php" method="POST">
                    <div class="form-group row">
                        <label for="deliveryDate" class="col-sm-2 col-form-label">Date</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control <?php if (isset($errors['date'])): ?>is-invalid<?php endif; ?>" id="deliveryDate" name="date" value="<?php echo htmlentities($date); ?>"/>
                            <?php if (isset($errors['date'])): ?>
                                <div class="invalid-feedback">
                                    <?php echo htmlentities($errors['date']); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="deliveryName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control <?php if (isset($errors['name'])): ?>is-invalid<?php endif; ?>" id="deliveryName" name="name", value="<?php echo htmlentities($name); ?>"/>
                            <?php if (isset($errors['name'])): ?>
                                <div class="invalid-feedback">
                                    <?php echo htmlentities($errors['name']); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="deliveryDriver" class="col-sm-2 col-form-label">Driver</label>
                        <div class="col-sm-10">
                            <select class="form-control <?php if (isset($errors['driver_id'])): ?>is-invalid<?php endif; ?>" id="deliveryDriver" name="driver_id">
                                <option value="" <?php if ('' == $driver_id): ?>selected<?php endif; ?>>- Select One -</option>
                                <?php foreach ($drivers->items as $id => $driver): ?>
                                    <option value="<?php echo $id; ?>" <?php if ($id == $driver_id): ?>selected<?php endif; ?>><?php echo $driver->name; ?></option>
                                <?php endforeach; ?>
                            </select>
                            <?php if (isset($errors['driver_id'])): ?>
                                <div class="invalid-feedback">
                                    <?php echo htmlentities($errors['driver_id']); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                </form>
            </main>
        </div>
    </body>
</html>