<!-- resources/views/layouts/app.blade.php -->

<!DOCTYPE html>
<html>
<head>
    <title>My web site</title>
</head>
<body>
<link href="{{ asset('css/base_layout.css') }}" rel="stylesheet">
<div class="top_panel">
@guest
<div class="top_panel_element">
<a href="login">Log in</a>
</div>
<div class="top_panel_element">
<a href="register">Register</a>
</div>
@endguest

@auth
<div class="top_panel_element">
<p> {{ Auth::user()->name }} </p>
</div>

<div class="top_panel_element">
<a href="register">Personal account</a>
</div>

<div class="top_panel_element">
<p> balance: {{ Auth::user()->balance }} </p>
</div>

@endauth
</div>

    @yield('content')

    <footer>
        <!-- Здесь подвал сайта -->
    </footer>

</body>
</html>
