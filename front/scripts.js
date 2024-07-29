document.addEventListener('DOMContentLoaded', () => {
    const loginbtn = document.getElementById('loginbtn');
    const loginButton = document.getElementById('loginButton');
    const userContainer = document.getElementById('userContainer');
    const userNameElement = document.getElementById('userName');
    const modalogin = document.getElementById('modalogin');
    const modalInstance = modalogin ? bootstrap.Modal.getInstance(modalogin) : null;
    const logoutButton = document.getElementById('logoutButton'); //logout button
    const registerForm = document.getElementById('registerForm');
    const registerButton = document.getElementById('registerButton');

    // Function to show logged in UI
    function showLoggedInUI(username) {
        loginbtn.style.display = 'none';
        if (modalInstance) modalInstance.hide();
        userContainer.style.display = 'block';
        userNameElement.textContent = username;
        if(sessionStorage.getItem('role') === 'provider') {
            document.getElementById('libraryButton').style.display = 'none';
        }
        if(sessionStorage.getItem('role') === 'customer') {
            document.getElementById('newGameButton').style.display = 'none';
        }
    }
    

    registerButton.addEventListener('click', function (event) {
        event.preventDefault();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }else{
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const role = document.getElementById('registerRole').value;
            const data = { username, password, email, role };
            fetch('http://localhost:3010/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                if (response.ok) {
                    alert('User registered successfully');
                    modalInstance.hide();
                } else {    
                    response.json().then(data => {
                        alert('Error: ' + data.error);
                    });
                }
            }).catch(error => {
                console.error('Error:', error);
            });
        };
    });


    // Check if already logged in
    const token = sessionStorage.getItem('token');
    if (token) {
        // Optionally, retrieve and set the username if stored in sessionStorage or another method
        const username = sessionStorage.getItem('username'); // Assuming username is stored
        showLoggedInUI(username || 'User'); // Default to 'User' if username not available
    }

    loginButton.addEventListener('click', async (e) => {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:3010/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login exitoso!');
                console.log('Token saved:', data.token);
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('username', username); 
                sessionStorage.setItem('role', data.role);
                console.log(data);
                showLoggedInUI(username);
            } else {
                alert('Error: ' + data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
    logoutButton.addEventListener('click', () => {
        logoutUser();
    });

    function logoutUser() {
        // Remove the token and username from sessionStorage
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        loginbtn.style.display = 'block'; 
        userContainer.style.display = 'none'; 
        window.location.reload(); 
        document.getElementById('libraryButton').style.display = 'block';
        document.getElementById('newGameButton').style.display = 'block';
    }

    window.addEventListener('message', function(event) {
        // Verifica el origen del mensaje por seguridad
        if (event.origin === 'http://127.0.0.1:5500') {
          if (event.data === 'changeCategory') {
            changeCategory();
          } if (event.data === 'searchedGame') {
            searchGame();
          }
        } else {
          console.warn('Mensaje recibido de origen no permitido:', event.origin);
        }
      });
   
      
    function changeCategory() {
        const iframe = document.getElementById('MainContent');
        iframe.src = './components/games/games.html';
    }
    function searchGame() {
        const iframe = document.getElementById('MainContent');
        iframe.src = './components/games/games.html';
        
        iframe.onload = function() {
            const iframeWindow = iframe.contentWindow;
            if (iframeWindow && typeof iframeWindow.updateContent === 'searchGame') {
                iframeWindow.updateContent();
            }
        };
    }
});

function updateIframes() {
    const leftFrame = document.getElementById('LeftContent');
    const mainFrame = document.getElementById('MainContent');

    leftFrame.src = './components/libraryLeft/libraryLeft.html';
    mainFrame.src = '';
}

// Add event listener to the Library button
document.getElementById('libraryButton').addEventListener('click', updateIframes);

function updateIframesHome() {
    const leftFrame = document.getElementById('LeftContent');
    const mainFrame = document.getElementById('MainContent');

    leftFrame.src = './components/categories/categories.html';
    mainFrame.src = './components/inicio/inicio.html';
}

// Add event listener to the Library button
document.getElementById('homeButton').addEventListener('click', updateIframesHome);


function updateIframesnewGame() {
    const leftFrame = document.getElementById('LeftContent');
    const mainFrame = document.getElementById('MainContent');

    leftFrame.src = '';
    mainFrame.src = './components/newGame/newGame.html';
}

// Add event listener to the Library button
document.getElementById('newGameButton').addEventListener('click', updateIframesnewGame);