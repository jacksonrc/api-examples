// create HTML via DOM manipulation
const app = document.getElementById('app');

const logo = document.createElement('img');
logo.src = 'images/logo.png';
app.appendChild(logo);

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);

// create a new HTTP request to retrieve the list of films
let request = new XMLHttpRequest();

// opens the request, but does not send it.
request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

// must be below the 'request.open()' method
// this allows us to access the data retrieved from the API endpoint
request.onload = function() {
    let data = JSON.parse(this.response);

    if (request.status >= 200 && request.status < 400) {
        data.forEach(movie => {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            const header = document.createElement('h1');
            header.textContent = movie.title;

            const p = document.createElement('p');
            p.textContent = movie.description.substring(0, 300);
            p.textContent = `${movie.description}...`;

            container.appendChild(card);
            card.appendChild(header);
            card.appendChild(p);
        });
    } else {
        console.log('Error: ' + this.statusText);
        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const header = document.createElement('h1');
        header.textContent = 'Oh, no! Something went wrong!';

        const p = document.createElement('p');
        p.textContent = 'An error occurred: ' 
            + this.responseURL + ' - ' 
            + this.status + ' - (' 
            + this.statusText + ').';

        container.appendChild(card);
        card.appendChild(header);
        card.appendChild(p);

    }
}

// sends the request to retrieve the data (see 'Network' tab in dev tools)
request.send();