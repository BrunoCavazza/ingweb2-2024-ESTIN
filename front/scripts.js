document.addEventListener('DOMContentLoaded', () => {
    const loginbtn = document.getElementById('loginbtn');
    const loginButton = document.getElementById('loginButton');
    const userContainer = document.getElementById('userContainer');
    const userNameElement = document.getElementById('userName');
    const modalogin = document.getElementById('modalogin');
    const modalInstance = modalogin ? bootstrap.Modal.getInstance(modalogin) : null;
    const logoutButton = document.getElementById('logoutButton'); //logout button

    // Function to show logged in UI
    function showLoggedInUI(username) {
        loginbtn.style.display = 'none';
        if (modalInstance) modalInstance.hide();
        userContainer.style.display = 'block';
        userNameElement.textContent = username;
    }

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
    }
   
});