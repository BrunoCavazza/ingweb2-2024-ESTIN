
function changeIframeSource(url) {
    document.getElementById('MainContent').src = url;
}

const categories = [
    {name: "Action"},
    {name: "Adventure"},
    {name: "Casual"},
    {name: "Indie"},
    {name: "Multiplayer"},
    {name: "Racing"},
    {name: "RPG"},
    {name: "Simulation"},
    {name: "Shooter"},
    {name: "Sports"},
    {name: "Strategy"},
    {name: "MOBA"},
    {name: "MMORPG"},
    {name: "Battle Royale"},
    {name: "Souls-like"},
    {name: "Sandbox"},
    {name: "Roguelike"},
    {name: "Singleplayer"},
    {name: "Fantasy"},
    {name: "Horror"},
    {name: "PVP"},
    {name: "PVE"},
    {name: "CO-OP"},
    {name: "Realistic"},
    {name: "Logic"},
    {name: "Survival"},
    {name: "Romance"},
    {name: "Mature"},
    {name: "Platformer"},
    {name: "Fighting"},
    {name: "Puzzle"},
    {name: "Music"},
    {name: "Educational"},
    {name: "VR"},
    {name: "Anime"},
    {name: "Sci-fi"},
    {name: "Cyberpunk"},
    {name: "Post-apocalyptic"},
    {name: "Historical"},
    {name: "Medieval"},
    {name: "Futuristic"},
    {name: "Western"},
    {name: "Military"},
    {name: "Gacha"},
    {name: "Open World"},
    {name: "Zombies"},
    {name: "RNG"}
];

function createCategoryList(categories) {
    const categoryList = document.getElementById('categoryList');
    categories.forEach(category => {
        const li = document.createElement('li');
        li.className = 'tag__name';
        li.textContent = category.name;
        categoryList.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    createCategoryList(categories);
});