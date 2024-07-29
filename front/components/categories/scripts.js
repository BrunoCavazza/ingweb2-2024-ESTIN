const categories = [
    {name: "ALL"},{name: "Action"}, {name: "Adventure"}, {name: "Casual"}, {name: "Indie"}, 
    {name: "Multiplayer"}, {name: "Racing"}, {name: "RPG"}, {name: "Simulation"}, 
    {name: "Shooter"}, {name: "Sports"}, {name: "Strategy"}, {name: "MOBA"}, 
    {name: "MMORPG"}, {name: "Battle Royale"}, {name: "Souls-like"}, {name: "Sandbox"}, 
    {name: "Roguelike"}, {name: "Singleplayer"}, {name: "Fantasy"}, {name: "Horror"}, 
    {name: "PVP"}, {name: "PVE"}, {name: "CO-OP"}, {name: "Realistic"}, {name: "Logic"}, 
    {name: "Survival"}, {name: "Romance"}, {name: "Mature"}, {name: "Platformer"}, 
    {name: "Fighting"}, {name: "Puzzle"}, {name: "Music"}, {name: "Educational"}, 
    {name: "VR"}, {name: "Anime"}, {name: "Sci-fi"}, {name: "Cyberpunk"}, 
    {name: "Post-apocalyptic"}, {name: "Historical"}, {name: "Medieval"}, 
    {name: "Futuristic"}, {name: "Western"}, {name: "Military"}, {name: "Gacha"}, 
    {name: "Open World"}, {name: "Zombies"}, {name: "RNG"}
];

    function createCategoryList(categories) {
        const categoryList = document.getElementById('categoryList');
        categories.forEach(category => {
            const li = document.createElement('li');
            li.className = 'tag__name';
            li.textContent = category.name;
            li.addEventListener('click', () => {
                if (category.name === 'ALL') {
                    sessionStorage.setItem('selectedCategory',  ' ');
                    window.parent.postMessage('changeCategory', 'http://127.0.0.1:5500');
                        } else {
                const selectedCategory = category.name;
                const url = "../buyGame/buyGame.html";
                console.log('Selected Category:', selectedCategory);
                sessionStorage.setItem('selectedURL', url);
                sessionStorage.setItem('selectedCategory', selectedCategory);
                window.parent.postMessage('changeCategory', 'http://127.0.0.1:5500');
                        }
            });
            categoryList.appendChild(li);
        });
    }
    function searchGame() {
        const search = document.getElementById('search').value;
        sessionStorage.setItem('searchedGame', search);
        window.parent.postMessage('searchedGame', 'http://127.0.0.1:5500');
    }
    
document.addEventListener("DOMContentLoaded", function() {
    createCategoryList(categories);
    const searchInput = document.getElementById('search');
    
        searchInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                searchGame();
            }
        });
});