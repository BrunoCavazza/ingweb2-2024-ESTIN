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

    // Configurar el botón de compra
    const buyButton = document.querySelector('.BuyButton');
    buyButton.onclick = function() {
        alert(`You are buying: ${gameData.name} for ${gameData.price}$`);
        // Aquí puedes agregar la lógica para el proceso de compra
    };
}

// Ejecutar la función para obtener los parámetros y actualizar el contenido
document.addEventListener('DOMContentLoaded', () => {
    const gameData = getUrlParams();
    populateGameDetails(gameData);
});
