<?php

$deliveries = json_decode(file_get_contents('data/deliveries.json'));

if (!isset($_GET['id'])) {
    die('Missing delivery ID');
}

$id = $_GET['id'];

if (!is_numeric($id) || !isset($deliveries->items->{$id})) {
    die('Invalid delivery ID');
}

$delivery = $deliveries->items->{$id};

if ('POST' == $_SERVER['REQUEST_METHOD']) {
    unset($deliveries->items->{$id});

    file_put_contents('data/deliveries.json', json_encode($deliveries));

    header('Location: /');
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
                <h1>Delete Delivery</h1>
                <form action="delete.php?id=<?php echo htmlentities($id); ?>" method="POST">
                    <p>Are you sure you want to delete this delivery?</p>
                    <button type="submit" class="btn btn-danger">Delete</button>
                </form>
            </main>
        </div>
    </body>
</html>