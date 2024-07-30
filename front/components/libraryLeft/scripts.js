document.addEventListener('DOMContentLoaded', function() {
    let gamesData = []; // Variable para almacenar los datos recuperados

    // Fetch data when the DOM is fully loaded
    const Hash = sessionStorage.getItem('token');

    if (Hash) {
        fetch('http://localhost:3010/profile/myLibrary', {
            method: 'GET',
            headers: {
                'tokenauth': `${Hash}`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Almacena los datos recuperados
            gamesData = data;
            // Renderiza los juegos inicialmente
            renderGames(gamesData);
        })
        .catch(error => {
            // Maneja los errores aquí
            console.error('There was a problem with the fetch operation:', error);
        });
    } else {
        console.error('No token found in sessionStorage');
    }

    // Search filter functionality
    document.getElementById('search').addEventListener('input', function() {
        const searchTerm = this.value;
        const filteredGames = gamesData.filter(game => game.name.includes(searchTerm));
        renderGames(filteredGames);
    });

    // Function to render games
    function renderGames(games) {
        const container = document.querySelector('.game-container');
        container.innerHTML = ''; // Clear any existing content

        games.forEach(game => {
            const button = document.createElement('button');
            button.className = 'value';

            const h4 = document.createElement('h4');
            h4.textContent = game.name; // Assuming each game object has a 'name' property

            button.appendChild(h4);
            container.appendChild(button);

            button.onclick = () => {
                const selectedGame = game.name;
                console.log('Selected Game:', selectedGame);
                sessionStorage.setItem('changeGame', selectedGame);
                window.parent.postMessage('changeGame', 'http://127.0.0.1:5500');
            };
        });
    }
});
