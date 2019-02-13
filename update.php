<?php

$drivers = json_decode(file_get_contents('data/drivers.json'));
$deliveries = json_decode(file_get_contents('data/deliveries.json'));

if (!isset($_GET['id'])) {
    die('Missing delivery ID');
}

$id = $_GET['id'];

if (!is_numeric($id) || !isset($deliveries->items->{$id})) {
    die('Invalid delivery ID');
}

$delivery = $deliveries->items->{$id};

$driver_id = $delivery->driver_id;

$errors = [];

if ('POST' == $_SERVER['REQUEST_METHOD']) {
    $driver_id = $_POST['driver_id'];

    if (!isset($driver_id) || empty($driver_id)) {
        $errors['driver_id'] = 'Please choose a driver';
    } elseif (!is_numeric($driver_id)) {
        $errors['driver_id'] = 'Please choose a valid driver';
    } elseif (!isset($drivers->items->{$driver_id})) {
        $errors['driver_id'] = 'Please choose a valid driver';
    }

    if (0 == count($errors)) {
        $deliveries->items->{$id}->driver_id = $driver_id;

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
                            <a class="nav-link" href="/create.php">New Delivery</a>
                        </li>
                    </ul>
                </nav>
                <h3 class="text-muted">CartonCloud</h3>
            </header>
            <main role="main">
                <h1>Edit Delivery</h1>
                <form action="update.php?id=<?php echo htmlentities($id); ?>" method="POST">
                    <div class="form-group row">
                        <label for="deliveryDate" class="col-sm-2 col-form-label">Date</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="<?php echo htmlentities($delivery->date); ?>" readonly/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="deliveryName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="<?php echo htmlentities($delivery->name); ?>" readonly/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="deliveryDriver" class="col-sm-2 col-form-label">Driver</label>
                        <div class="col-sm-10">
                            <select class="form-control <?php if (isset($errors['driver_id'])): ?>is-invalid<?php endif; ?>" id="deliveryDriver" name="driver_id">
                                <option value="" <?php if ('' == $delivery->driver_id): ?>selected<?php endif; ?>>- Select One -</option>
                                <?php foreach ($drivers->items as $id => $driver): ?>
                                    <option value="<?php echo $id; ?>" <?php if ($id == $delivery->driver_id): ?>selected<?php endif; ?>><?php echo $driver->name; ?></option>
                                <?php endforeach; ?>
                            </select>
                            <?php if (isset($errors['driver_id'])): ?>
                                <div class="invalid-feedback">
                                    <?php echo htmlentities($errors['driver_id']); ?>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Update</button>
                </form>
            </main>
        </div>
    </body>
</html>