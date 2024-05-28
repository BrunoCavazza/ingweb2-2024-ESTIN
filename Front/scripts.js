document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');

    console.log(loginButton);
        
   
    
        
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
                    alert('Login exitoso. Token: ' + data.token);
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    
});

function changeIframeSource(url) {
    document.getElementById('MainContent').src = url;
}