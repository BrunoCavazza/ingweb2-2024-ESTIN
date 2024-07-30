document.addEventListener('DOMContentLoaded', function() {
    // Retrieve game data from sessionStorage
    let gameData = sessionStorage.getItem('changeGame'); // Ensure 'gameDataKey' is the correct key
    console.log('Game data from sessionStorage:', gameData);
    
    if (!gameData) {
        console.error('No game found in sessionStorage or gamesData');
    } else {
        try {
            gameData = JSON.parse(gameData);
            console.log('Found game data:', gameData);
            // Proceed with game initialization using gameData
        } catch (e) {
            console.error('Error parsing game data:', e);
        }
    }

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
            console.log('Fetched gamesData:', gamesData);
            
            // Llama a getGameDataFromSession y populateGameDetails cuando los datos se hayan recuperado
            const gameData = getGameDataFromSession();
            if (gameData) {
                populateGameDetails(gameData);
            } else {
                console.error('No game found in sessionStorage or gamesData');
            }
        })
        .catch(error => {
            // Maneja los errores aquí
            console.error('There was a problem with the fetch operation:', error);
        });
    } else {
        console.error('No token found in sessionStorage');
    }

    // Función para obtener los datos del juego almacenados en sessionStorage
    function getGameDataFromSession() {
        const gameId = sessionStorage.getItem('changeGame');
        console.log('Game ID from sessionStorage:', gameId);
        if (gameId && gamesData.length > 0) {
            const game = gamesData.find(game => game.name === gameId);
            console.log('Found game data:', game);
            return game;
        }
        return null;
    }

    // Función para actualizar el contenido del HTML con los datos del juego
    function populateGameDetails(gameData) {
        // Actualizar el nombre del juego
        document.querySelector('.GameName').textContent = gameData.name;

        // Actualizar la imagen principal
        const mainImg = document.querySelector('.mainImg');
        mainImg.style.backgroundImage = `url(${gameData.mainPicture})`;
        mainImg.style.backgroundSize = 'cover';
        mainImg.style.backgroundPosition = 'center';

        // Actualizar el propietario
        document.querySelector('.OwnerFont').textContent = gameData.owner;

        // Actualizar las categorías
        const categoryList = document.getElementById('categoryList');
        categoryList.innerHTML = ''; // Clear existing categories
        gameData.categories.forEach(category => {
            const li = document.createElement('li');
            li.className = 'tag__name';
            li.textContent = category.name; // Assuming the category object has a 'name' property
            categoryList.appendChild(li);
        });

        // Actualizar la descripción
        document.querySelector('.DescriptionTitle').textContent = gameData.description;

        // Actualizar las imágenes secundarias
        const secondaryImages = document.querySelectorAll('.SecondaryImage');
        gameData.pictures.forEach((picture, index) => {
            if (secondaryImages[index]) {
                secondaryImages[index].style.backgroundImage = `url(${picture})`;
                secondaryImages[index].style.backgroundSize = 'cover';
                secondaryImages[index].style.backgroundPosition = 'center';
            }
        });
    }

    document.querySelector('.BuyButton').addEventListener('click', function() {
        alert('Anda a jugar al patio mejor nene');
    });
});
