document.addEventListener("DOMContentLoaded", function () {
    fetchGames();
});

function fetchGames() {
    const url = 'http://localhost:3010/games/';
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (Array.isArray(data)) {
                createGameCards(data);
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
        id: game.id
    };
   
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

function changeIframeBtn(url, gameInfo) {
    const params = new URLSearchParams(gameInfo).toString();
    window.location.href = `${url}?${params}`;
}
