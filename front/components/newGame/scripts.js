function submitForm() {
    // Obtener los valores de los campos del formulario
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const owner = document.getElementById('owner').value;
    const mainPicture = document.getElementById('mainPicture').value;
    const pictures = document.getElementById('pictures').value.split(',').map(p => p.trim());
    const categories = document.getElementById('categories').value.split(',').map(c => c.trim());

    // Crear un objeto con los datos del formulario
    const gameData = {
        name: name,
        description: description,
        price: parseFloat(price),
        owner: owner,
        mainPicture: mainPicture,
        pictures: pictures,
        categories: categories
    };

    // Enviar los datos usando fetch con el método POST
    fetch('http://localhost:3010/games/createGame', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Game uploaded successfully!');
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while uploading the game.');
    });
}