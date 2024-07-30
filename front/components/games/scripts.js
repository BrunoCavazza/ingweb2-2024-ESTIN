let currentPage = 1;
let pageAmount = 2;  // Asegúrate de actualizar esto según la respuesta del servidor

document.addEventListener("DOMContentLoaded", function () {
    fetchGames(currentPage);
    setupPaginator();
});

function fetchGames(page) {
    const url = 'http://localhost:3010/games/search/?page=' + page + "&category=" + sessionStorage.getItem('selectedCategory');
    console.log('Fetching games from:', url);
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Received data:', data);  // Log the received data
            if (data && Array.isArray(data.game)) {
                createGameCards(data.game);
                pageAmount = data.pageAmount; // Update the total pages
                setupPaginator();
                console.log('Games:', data.game);
            } else {
                console.error('Expected an array but got:', data);
                alert('Error: Received data is not in expected format.');
            }
        })
        .catch(error => console.error('Error fetching games:', error));
}

function createGameCards(games) {
    const gamesRow = document.getElementById('gamesRow');
    gamesRow.innerHTML = '';  // Clear any existing content

    games.forEach(game => {
        const col = document.createElement('div');
        col.className = 'col-3';

        const card = document.createElement('div');
        card.className = 'card gameCard';
        card.style.width = '18rem';

        const img = document.createElement('img');
        img.src = game.mainPicture;  // url imagen
        img.className = 'card-img-top';
        img.alt = game.name;  // nombre del juego texto alternativo

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const gameName = document.createElement('h5');
        gameName.className = 'GameName';
        gameName.textContent = game.name;  // nombre juego

        const gameDetail = document.createElement('p');
        gameDetail.className = 'GameDetail';
        gameDetail.textContent = game.price + "$";  // descripcion

        const gameButton = document.createElement('div');
        gameButton.className = 'GameButton';

        const button = document.createElement('button');
        button.className = 'buy';
        button.onclick = function() {
            const gameInfo = {
                name: game.name,
                description: game.description,
                owner: game.owner,
                mainPicture: game.mainPicture,
                pictures: game.pictures.join(','), 
                categories: game.categories.join(','), 
                price: game.price,
            };
            sessionStorage.setItem('gameId', game.id);
            sessionStorage.setItem('gameOwner', game.owner);
            changeIframeBtn('../buyGame/buyGame.html', gameInfo);
        };
        button.innerHTML = `
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text">View</span>
        `;

        gameButton.appendChild(button);
        cardBody.appendChild(gameName);
        cardBody.appendChild(gameDetail);
        cardBody.appendChild(gameButton);
        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        gamesRow.appendChild(col);
    });
}

function setupPaginator() {
    const paginator = document.querySelector('.pagination');
    paginator.innerHTML = '';

    const prevPage = document.createElement('li');
    prevPage.className = 'page-item';
    const prevLink = document.createElement('a');
    prevLink.className = 'page-link PaginatorFont';
    prevLink.href = '#';
    prevLink.setAttribute('aria-label', 'Previous');
    prevLink.innerHTML = '<span aria-hidden="true">«</span>';
    prevLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            fetchGames(currentPage);
        }
    });
    prevPage.appendChild(prevLink);
    paginator.appendChild(prevPage);

    for (let i = 1; i <= pageAmount; i++) {
        const pageItem = document.createElement('li');
        pageItem.className = 'page-item';
        if (i === currentPage) {
            pageItem.classList.add('active');
        }
        const pageLink = document.createElement('a');
        pageLink.className = 'page-link PaginatorFont';
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', (event) => {
            event.preventDefault();
            currentPage = i;
            fetchGames(currentPage);
        });
        pageItem.appendChild(pageLink);
        paginator.appendChild(pageItem);
    }

    const nextPage = document.createElement('li');
    nextPage.className = 'page-item';
    const nextLink = document.createElement('a');
    nextLink.className = 'page-link PaginatorFont';
    nextLink.href = '#';
    nextLink.setAttribute('aria-label', 'Next');
    nextLink.innerHTML = '<span aria-hidden="true">»</span>';
    nextLink.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < pageAmount) {
            currentPage++;
            fetchGames(currentPage);
        }
    });
    nextPage.appendChild(nextLink);
    paginator.appendChild(nextPage);
}


function changeIframeBtn(url, gameInfo) {
    const params = new URLSearchParams(gameInfo).toString();
    window.location.href = `${url}?${params}`;
}
