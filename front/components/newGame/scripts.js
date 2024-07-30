const categories = [
    { name: "Action" }, { name: "Adventure" }, { name: "Casual" }, { name: "Indie" },
    { name: "Multiplayer" }, { name: "Racing" }, { name: "RPG" }, { name: "Simulation" },
    { name: "Shooter" }, { name: "Sports" }, { name: "Strategy" }, { name: "MOBA" },
    { name: "MMORPG" }, { name: "Battle Royale" }, { name: "Souls-like" }, { name: "Sandbox" },
    { name: "Roguelike" }, { name: "Singleplayer" }, { name: "Fantasy" }, { name: "Horror" },
    { name: "PVP" }, { name: "PVE" }, { name: "CO-OP" }, { name: "Realistic" }, { name: "Logic" },
    { name: "Survival" }, { name: "Romance" }, { name: "Mature" }, { name: "Platformer" },
    { name: "Fighting" }, { name: "Puzzle" }, { name: "Music" }, { name: "Educational" },
    { name: "VR" }, { name: "Anime" }, { name: "Sci-fi" }, { name: "Cyberpunk" },
    { name: "Post-apocalyptic" }, { name: "Historical" }, { name: "Medieval" },
    { name: "Futuristic" }, { name: "Western" }, { name: "Military" }, { name: "Gacha" },
    { name: "Open World" }, { name: "Zombies" }, { name: "RNG" }    
];

function createCategoryList(categories) {
    const categorySelect1 = document.getElementById('category1');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.text = category.name;
        categorySelect1.appendChild(option);
    });
    const categorySelect2 = document.getElementById('category2');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.text = category.name;
        categorySelect2.appendChild(option);
    });
    const categorySelect3 = document.getElementById('category3');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.text = category.name;
        categorySelect3.appendChild(option);
    });
    const categorySelect4 = document.getElementById('category4');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.name;
        option.text = category.name;
        categorySelect4.appendChild(option);
    });
    
}

// Ensure the DOM is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    createCategoryList(categories);
});

function submitForm() {
    // Obtener los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const mainPicture = document.getElementById('mainPicture').value;
    const pictures = document.getElementById('pictures').value.split(',').map(p => p.trim());
    const category1 = document.getElementById('category1').value;
    const category2 = document.getElementById('category2').value;
    const category3 = document.getElementById('category3').value;
    const category4 = document.getElementById('category4').value;
    const categories = [category1, category2, category3, category4].filter(category => category !== "Add Category");

    // Obtener el hash de sessionStorage
    const hash = sessionStorage.getItem('token');

    // Verificar si el hash está disponible
    if (!hash) {
        alert('Please login again.');
        return;
    }

    // Crear un objeto con los datos del formulario
    const gameData = {
        name: name,
        description: description,
        price: parseFloat(price),
        mainPicture: mainPicture,
        pictures: pictures,
        categories: categories
    };
    
    const body = JSON.stringify(gameData);

    // Enviar los datos usando fetch con el método POST
    fetch('http://localhost:3010/games/createGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'tokenauth': `${hash}`
        
        },
        body: body
        
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Game uploaded successfully!');
        console.log(body);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error uploading game.');
        console.log(body);
    });
}
 