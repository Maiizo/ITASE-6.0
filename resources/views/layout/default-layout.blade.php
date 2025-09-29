<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/nav.css">
    <link rel="stylesheet" href="/css/home.css">
    <title>@yield("title")</title>
</head>
<body>
    @include('layout.nav')
    @yield("content")
</body>
</html>