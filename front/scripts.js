document.addEventListener('DOMContentLoaded', () => {
    const loginbtn = document.getElementById('loginbtn');
    const modalogin = document.getElementById('modalogin');
    const loginButton = document.getElementById('loginButton');
    const userContainer = document.getElementById('userContainer');
    const userNameElement = document.getElementById('userName');

    console.log(loginButton);




        loginButton.addEventListener('click', async (e) => {
            e.preventDefault();

            const modalElement = document.getElementById('modalogin');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
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
                    loginbtn.style.display = 'none';
                    modalInstance.hide();
                    userContainer.style.display = 'block';
                    userNameElement.textContent = username;
                } else {
                    alert('Error: ' + data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });

});