<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="{{ asset('css/navigation.css') }}">
</head>
<body>
    @include('layout.nav')
    <h1>PROJECT PAGE BLABLABLA</h1>
    
    <table>
        <tr>
            <th>NO</th>
            <th>PROJECT</th>
            <th>SEMESTER</th>
            <th>DESCRIPTION</th>
        </tr>
        @php($projects = ['Calculator', 'Accounting', 'Student Report','POS Resto', 'Online Store', 'Pet Shop'])
        @php($i=0)
        @foreach ($projects as $pro)
        @php ($i++)
        @if ($i % 2 == 0)
        @php($semester = "EVEN")
        @else
        @php($semester = "ODD")
        @endif
        <tr>
            <td>{{ $i }}</td>
            <td>{{ $pro }}</td>
            <td>{{ $semester }}</td>
            <td>
                @if ($i == 1)
                My very FIRST project
                @elseif($i==count($projects))
                My LAST project
                @else
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus accusamus corrupti perspiciatis provident impedit placeat. Harum est repudiandae repellat ipsam earum esse, cumque quas ipsa quisquam molestiae ut neque sunt.
                @endif
            </td>
        </tr>
        @endforeach
    </table>
    
</body>
</html>