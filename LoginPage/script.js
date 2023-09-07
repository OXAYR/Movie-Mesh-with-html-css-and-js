document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const validationErrors = document.getElementById("validationErrors");
    const loginButton = document.getElementById("login-button");

    loginButton.addEventListener("click", function (event) {
        console.log('i am running after login ')
        event.preventDefault();
        
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
       
        validationErrors.textContent = "";

        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/\-='|"']).{8,}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const user = {email: email, password: password}

        const errors = [];


        if (!passwordPattern.test(password)) {
            errors.push("Password must start with a capital letter and contain a number and a special character.");
        }

        if (!emailPattern.test(email)) {
            errors.push("Invalid email.");
        }

        if (errors.length > 0) {
            validationErrors.textContent = errors.join(" ");
        } else {
            const xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:3000/users/authenticate", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        
                        const response = JSON.parse(xhr.responseText);
                        console.log("Response after authentication------>",response.data.token)
                        localStorage.setItem("UserAuth",response.data.token )
                        localStorage.setItem("User",JSON.stringify(response.data.user))
                        alert("Registration successful!");
                    } else {
                        const response = JSON.parse(xhr.responseText);
                        alert("Registration failed: " + response.message);
                    }
                }
            };
            xhr.send(JSON.stringify(user));
        }
    });
});

