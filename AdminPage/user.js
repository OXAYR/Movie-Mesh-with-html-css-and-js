document.addEventListener("DOMContentLoaded", function () {

    function fetchUserData() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://localhost:3000/users/all", true);

        xhr.onload = function () {
            if (xhr.status === 200) {
                var userData = JSON.parse(xhr.responseText);
                console.log("usrData--->",userData.data.users)
                displayUserData(userData.data.users);
            } else {
                console.error("Error fetching user data.");
            }
        };

        xhr.send();
    }

    function displayUserData(userData) {
        var tableBody = document.getElementById("userTableBody");

        
        tableBody.innerHTML = "";

    
        userData.forEach(function (user) {
            var row = document.createElement("tr");

            var name = document.createElement("td");
            name.textContent = user.name;
            row.appendChild(name);

            var email = document.createElement("td");
            email.textContent = user.email;
            row.appendChild(email);

            var userRole = document.createElement("td");
            
            var dropDown = document.createElement("select");
            dropDown.className = "border border-gray-300 rounded-md p-1 mr-2";
            var userOption = document.createElement("option");
            userOption.value = "user";
            userOption.textContent = "User";
            var adminOption = document.createElement("option");
            adminOption.value = "admin";
            adminOption.textContent = "Admin";
            dropDown.appendChild(userOption);
            dropDown.appendChild(adminOption);
            dropDown.value = user.userRole;
            dropDown.addEventListener("change", function (event) {
                event.preventDefault();
                console.log("User role before edit---->",user.userRole)
                console.log("User id------>", user._id)
                user.userRole = dropDown.value;
                editRole(user._id, user.userRole)
                console.log("User role after edit---->",user.userRole)
            });
            userRole.appendChild(dropDown);
            row.appendChild(userRole);

    
            tableBody.appendChild(row);
        });
    }

    

    fetchUserData();

    
function editRole(userId, userRole) {
    const xhr = new XMLHttpRequest();
    const user={
        role: userRole
    }
    console.log("role of the user in the edit role------> ", user.role)
    xhr.open("PUT", `http://localhost:3000/users/${userId}/updateRole`, true);
    
    xhr.setRequestHeader("x-access-token", localStorage.getItem("UserAuth"));
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                const response = JSON.parse(xhr.responseText)
                alert(response.message)
                fetchUserData();
            } else {
                console.log("Failed to edit the user");
            }
        }
    };
    
    xhr.send(JSON.stringify(user));
}
});