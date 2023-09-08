document.addEventListener("DOMContentLoaded", function (){

    fetch('../navbar/dist/index.html')
    .then(response => response.text())
    .then(navbarHTML => {
        document.getElementById('menu-bar').innerHTML = navbarHTML;
    })
    .catch(error => console.error(error));


    const updateButton = document.getElementById("update-button")
    const emailInput = document.getElementById('email-field');
    let { _id,email } = JSON.parse(localStorage.getItem("User"));
    emailInput.innerHTML = email

    updateButton.addEventListener("click", function (event) {
        event.preventDefault();

        const usernameInput = document.getElementById("name-input");
        const passwordInput = document.getElementById("new-password-input");

        const newUsername = usernameInput.value;
        const newPassword = passwordInput.value;


        if (_id != null) {
            
            const newUser = {
                username: newUsername,
                password: newPassword
            };

            const xhr = new XMLHttpRequest();
            xhr.open("PUT", `http://localhost:3000/users/${_id}/updateUser`);
            
        
            xhr.setRequestHeader("Content-Type", "application/json");

            
            xhr.send(JSON.stringify(newUser));
        }
    });

});