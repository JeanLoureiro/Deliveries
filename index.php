<?php

$drivers = json_decode(file_get_contents('data/drivers.json'));
$deliveries = json_decode(file_get_contents('data/deliveries.json'));

?>
<html>
    <head>
        <title>Deliveries</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"/>
        <link rel="stylesheet" href="css/main.css"/>
    </head>
    <body>
        <div class="container">
            <header class="header clearfix">
                <nav>
                    <ul class="nav nav-pills float-right">
                        <li class="nav-item">
                            <a class="nav-link active" href="/">Deliveries</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/create.php">New Delivery</a>
                        </li>
                    </ul>
                </nav>
                <h3 class="text-muted">CartonCloud</h3>
            </header>
            <main role="main">
                <h1>Deliveries</h1>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Name</th>
                            <th scope="col">Driver</th>
                            <th scope="col">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($deliveries->items as $id => $delivery): ?>
                            <tr>
                                <th scope="row"><?php echo $id; ?></th>
                                <td><?php echo $delivery->date; ?></td>
                                <td><?php echo $delivery->name; ?></td>
                                <td><?php echo $drivers->items->{$delivery->driver_id}->name; ?></td>
                                <td class="text-right">
                                    <a class="btn btn-outline-primary" href="update.php?id=<?php echo $id; ?>">Edit</a>
                                    <a class="btn btn-outline-danger" href="delete.php?id=<?php echo $id; ?>">Delete</a>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </main>
        </div>
    </body>
</html>