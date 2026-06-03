<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Авторизация</title>
</head>
<body>

<h1>Авторизация пользователя</h1>

<form method="POST">

    <p>Логин:</p>
    <input type="text" name="login">

    <p>Пароль:</p>
    <input type="password" name="password">

    <br><br>

    <button type="submit">Войти</button>

</form>

<?php

if (isset($_POST['login']) && isset($_POST['password'])) {

    $login = $_POST['login'];
    $password = $_POST['password'];

    if ($login == "admin" && $password == "12345") {

        echo "<h2>Добро пожаловать, admin!</h2>";

    } else {

        echo "<h2>Неверный логин или пароль</h2>";

    }
}

?>

</body>
</html>