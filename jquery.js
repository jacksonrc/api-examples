$(document).ready(function() {

    $('#app').prepend('<img src="images/logo.png" alt="logo"/>')
        .append('<div class="container"></div>');

    const url = 'https://ghibliapi.herokuapp.com/films';

    $.get(url).done(function(data) {
        data.forEach(movie => {
            $('.container').append(
                '<div class="card">'
                + '<h1>' + movie.title + '</h1>'
                + '<p>' + `${movie.description.substring(0, 500)}...` + '</p>'
                + '</div>'
            );
        });
    })
    .fail(function(error) {
        $('.container').append(
            '<div class="card">'
            +'<h1>Oh, no! Something went wrong!</h1>'
            +'<p>' + error.status + ': ' 
            + ' ' + error.statusText + '</p>'
            +'</div>'
        );
    });

});


