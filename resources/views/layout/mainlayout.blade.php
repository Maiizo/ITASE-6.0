<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css">
    <title>@yield("title")</title>
</head>
<body>
    @@include('layout.navigation')

    <div>
        @yield("main_content")
    </div>

    <footer class="footer fixed-bottom bg-warning text-center">
        <div class="container"><span class="text-dark">Copyright Project Catalog @2021</span></div>
        </footer>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>