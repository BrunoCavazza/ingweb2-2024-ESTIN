// Función para obtener los parámetros de la URL
function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        name: params.get('name'),
        description: params.get('description'),
        owner: params.get('owner'),
        mainPicture: params.get('mainPicture'),
        pictures: params.get('pictures') ? params.get('pictures').split(',') : [],
        categories: params.get('categories') ? params.get('categories').split(',') : [],
        price: params.get('price'),
        id: params.get('id')
    };
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
    gameData.categories.forEach(category => {
        const li = document.createElement('li');
        li.className = 'tag__name';
        li.textContent = category;
        categoryList.appendChild(li);
    });

    // Actualizar la descripción
    document.querySelector('.DescriptionText').textContent = gameData.description;

    // Actualizar las imágenes secundarias
    const secondaryImages = document.querySelectorAll('.SecondaryImage');
    gameData.pictures.forEach((picture, index) => {
        if (secondaryImages[index]) {
            secondaryImages[index].style.backgroundImage = `url(${picture})`;
            secondaryImages[index].style.backgroundSize = 'cover';
            secondaryImages[index].style.backgroundPosition = 'center';
        }
    });
    const gameId = gameData.name;
    const tokenId = sessionStorage.getItem('token');
    const receiverId = gameData.owner;
    async function buyGame(tokenId, receiverId, gameId) {
        const url = 'http://localhost:3010/games/buyGame';
        const data = {
            tokenId: tokenId,
            receiverId: receiverId,
            gameId: gameId
        };
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            console.log('Success:', result);
            return result;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }
    
    
    buyGame(tokenId, receiverId, gameId)
        .then(result => {
            // Manejar la respuesta aquí
            console.log('Respuesta del servidor:', result);
        })
        .catch(error => {
            // Manejar el error aquí
            console.error('Error en la solicitud:', error);
        });
    
    /*
    // Configurar el botón de compra
    Button.className = 'BuyButton';
    Button.onclick = buyGame(tokenId, receiverId, gameId);
    
        alert(`You are buying: ${gameData.name} for ${gameData.price}$`);
        // Función para comprar el juego
        function buyGame(tokenId, receiverId, gameId) {
            console.log("ENTREEEEEE!!!!");
            // Crear el cuerpo de la solicitud
            const requestBody = {
                token: {
                    id: tokenId
                },
                receiverId: receiverId,
                gameId: gameId
            };
        
            // Realizar la solicitud POST para comprar el juego
            fetch('http://localhost:3010/games/buyGame', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody) // Enviar datos en el cuerpo de la solicitud
            })
            .then(response => response.json())
            .then(data => {
                console.log('Compra exitosa:', data);
                // Acciones adicionales tras la compra exitosa
            })
            .catch((error) => {
                console.error('Error en la compra:', error);
            });
        }
   */
};
