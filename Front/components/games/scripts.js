document.addEventListener("DOMContentLoaded", function() {
    fetchGames();
});

function fetchGames() {
    const url = 'http://localhost:3010/games';  
    fetch(url)
        .then(response => response.json())
        .then(data => createGameCards(data))
        .catch(error => console.error('Error fetching games:', error));
}

function createGameCards(games) {
    const gamesRow = document.getElementById('gamesRow');
    games.forEach(game => {
        const col = document.createElement('div');
        col.className = 'col-3';

        const card = document.createElement('div');
        card.className = 'card gameCard';
        card.style.width = '18rem';

        const img = document.createElement('img');
        img.src = game.image;  // url imagen
        img.className = 'card-img-top';
        img.alt = game.name;  // nombre del juego texto alternativo
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const gameName = document.createElement('h5');
        gameName.className = 'GameName';
        gameName.textContent = game.name;  // nombre juego

        const gameDetail = document.createElement('p');
        gameDetail.className = 'GameDetail';
        gameDetail.textContent = game.description;  // descripcion

        const gameButton = document.createElement('div');
        gameButton.className = 'GameButton';

        const button = document.createElement('button');
        button.className = 'buy';
        button.innerHTML = `
            <span class="shadow"></span>
            <span class="edge"></span>
            <span class="front text">buy</span>
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