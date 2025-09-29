{{-- <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    @include('layout.nav')
    <h1>project page</h1>

    <table>
        <tr>
            <th>NO</th>
            <th>PROJECT </th>
            <th>SEMESTER</th>
            <th>DESC</th>
        </tr>
        @php ($projects = ['calculator', 'Acc', 'Student report', 'POS Resto' ,'Online store' , 'Pet Shop'])
        @php ($i=0)
        @foreach ($projects as $pro)
            @php($i++)
            @if ($i % 2 == 0)
                @php($semester = 'EVEN')
            @else
                @php($semester = 'ODD')
            @endif
            <tr>
                <td>{{ $i }}</td>
                <td>{{ $pro }}</td>
                <td>{{ $semester }}</td>
                <td>
                    @if ($i == 1)
                        My very FIRST project
                    @elseif ($i == count($projects))
                        My LAST project
                    @else
                        Lorem ipsum dolor sit amet.
                    @endif
                </td>
            </tr>
        @endforeach
</body>

</html> --}}




@extends('layout.default-layout')

@section('title', 'Project Page')

@section('content')
    <project>
        <h1>Project Page</h1>

        <table>
            <tr>
                <th>NO</th>
                <th>PROJECT </th>
                <th>SEMESTER</th>
                <th>DESC</th>
            </tr>
            @php($projects = ['calculator', 'Acc', 'Student report', 'POS Resto', 'Online store', 'Pet Shop'])
            @php($i = 0)
            @foreach ($projects as $pro)
                @php($i++)
                @if ($i % 2 == 0)
                    @php($semester = 'EVEN')
                @else
                    @php($semester = 'ODD')
                @endif
                <tr>
                    <td>{{ $i }}</td>
                    <td>{{ $pro }}</td>
                    <td>{{ $semester }}</td>
                    <td>
                        @if ($i == 1)
                            My very FIRST project
                        @elseif ($i == count($projects))
                            My LAST project
                        @else
                            Lorem ipsum dolor sit amet.
                        @endif
                    </td>
                </tr>
            @endforeach
        </table>
    </project>
@endsection
