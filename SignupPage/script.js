//import { userApi } from '../Api/user'; 


document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const validationErrors = document.getElementById("validationErrors");
    const signupButton = document.getElementById("signup-button");

    signupButton.addEventListener("click", function (event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        const user = {
            name: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        }
        validationErrors.textContent = "";

        const usernamePattern = /^(?=.*[0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/\-='|"'])\S+/;
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/\-='|"']).{8,}$/;
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const errors = [];

        if (!usernamePattern.test(username)) {
            errors.push("Add a number in the name and remove empty spaces.");
        }

        if (!passwordPattern.test(password)) {
            errors.push("Password must start with a capital letter and contain a number and a special character.");
        }

        if (password !== confirmPassword) {
            errors.push("Passwords do not match.");
        }

        if (!emailPattern.test(email)) {
            errors.push("Invalid email.");
        }

        if (errors.length > 0) {
            validationErrors.textContent = errors.join(" ");
        } else {
          const xhr = new XMLHttpRequest();
          xhr.open("POST", "http://localhost:3000/users/register", true);
          xhr.setRequestHeader("Content-Type", "application/json");
          xhr.onreadystatechange = function () {
              if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
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
