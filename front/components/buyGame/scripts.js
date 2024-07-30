window.addEventListener('message', function(event) {
    // Verifica el origen del mensaje por seguridad
    if (event.origin === 'http://127.0.0.1:5500') {
       if (event.data === 'searchedGame') {
        searchGame();
    } else {
      console.warn('Mensaje recibido de origen no permitido:', event.origin);
    }
    }
  });

  function searchGame() {
    const gameName = sessionStorage.getItem('searchedGame');
    
    if (!gameName) {
        console.error('No game name found in sessionStorage');
        return;
    }
    
    const url = `http://localhost:3010/games/game/${encodeURIComponent(gameName)}`;
    console.log('Searching game:', gameName, 'at:', url);
    
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Searched Game data:', data); // Verifica la estructura de la respuesta

            // Ajustar para obtener el objeto de datos del juego
            if (data && data.data) {
                const gameData = data.data;
                console.log('Populating game details...');
                console.log(gameData); // Verifica los datos antes de pasarlos a populateGameDetails
                populateGameDetails(gameData);
            } else {
                console.error('Data format is incorrect:', data);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}


// Función para obtener los parámetros de la URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const urlParams = {
        name: params.get('name'),
        description: params.get('description'),
        owner: params.get('owner'),
        mainPicture: params.get('mainPicture'),
        pictures: params.get('pictures') ? params.get('pictures').split(',') : [],
        categories: params.get('categories') ? params.get('categories').split(',') : [],
        price: params.get('price'),
        id: params.get('id'),
    };

    console.log('URL Parameters:', urlParams);
    
    return urlParams;
}

// Función para actualizar el contenido del HTML con los datos del juego
function populateGameDetails(gameData) {
    // Verifica que gameData tenga las propiedades esperadas
    console.log('Populating game details...');
    console.log(gameData);
    if (!gameData) {
        console.error('No game data provided');
        return;
    }

    // Verifica y actualiza el nombre del juego
    if (gameData.name) {
        document.querySelector('.GameName').textContent = gameData.name;
    }

    // Verifica y actualiza la imagen principal
    if (gameData.mainPicture) {
        const mainImg = document.querySelector('.mainImg');
        mainImg.style.backgroundImage = `url(${gameData.mainPicture})`;
        mainImg.style.backgroundSize = 'cover';
        mainImg.style.backgroundPosition = 'center';
    }

    // Verifica y actualiza el propietario
    if (gameData.owner) {
        document.querySelector('.OwnerFont').textContent = gameData.owner;
    }

    // Verifica y actualiza las categorías
    if (Array.isArray(gameData.categories)) {
        const categoryList = document.getElementById('categoryList');
        categoryList.innerHTML = ''; // Limpia las categorías anteriores
        gameData.categories.forEach(category => {
            const li = document.createElement('li');
            li.className = 'tag__name';
            li.textContent = category;
            categoryList.appendChild(li);
        });
    } else {
        console.warn('No categories provided or categories is not an array');
    }

    // Verifica y actualiza la descripción
    if (gameData.description) {
        document.querySelector('.DescriptionText').textContent = gameData.description;
    }

    // Verifica y actualiza las imágenes secundarias
    if (Array.isArray(gameData.pictures)) {
        const secondaryImages = document.querySelectorAll('.SecondaryImage');
        gameData.pictures.forEach((picture, index) => {
            if (secondaryImages[index]) {
                secondaryImages[index].style.backgroundImage = `url(${picture})`;
                secondaryImages[index].style.backgroundSize = 'cover';
                secondaryImages[index].style.backgroundPosition = 'center';
            }
        });
    } else {
        console.warn('No pictures provided or pictures is not an array');
    }
}

// Llamar a getUrlParams cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = getUrlParams();
    populateGameDetails(urlParams);
});

async function buyGame(hash, receiverName, gameName) {
    try {
        const response = await fetch('http://localhost:3010/buyGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'tokenauth': `${hash}`
            },
            body: JSON.stringify({ gameName, receiverName })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
        }

        const result = await response.json();
        console.log('Success:', result);
        alert('Game purchased successfully!');
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

document.querySelector('.BuyButton').addEventListener('click', function() {
    const gameName = document.querySelector('.GameName').textContent;
    const receiverName = sessionStorage.getItem('gameOwner');
    const token = sessionStorage.getItem('token');
    console.log( receiverName, gameName, token);

    if (!gameName || !receiverName || !token) {
        console.error('Missing required parameters: gameName, receiverName, or token.');
        return;
    }

    buyGame(token, receiverName, gameName)
        .then(result => {
            console.log('Game purchase successful:', result);
        })
        .catch(error => {
            console.error('Game purchase failed:', error);
        });
});
