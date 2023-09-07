document.addEventListener("DOMContentLoaded", function (){



    const deleteButton = document.getElementById("delete-button")
    let { _id, name, email } = JSON.parse(localStorage.getItem("User"));
    const nameField = document.getElementById("name-field")
    const emailField = document.getElementById("email-field")
    
    nameField.innerHTML = name;
    emailField.innerHTML = email;
    deleteButton.addEventListener("click", function(event){
        console.log("in the delete event ")
        event.preventDefault();
        if(_id!=null){
            const xhr = new XMLHttpRequest();

            xhr.open("DELETE", `http://localhost:3000/users/${_id}`)
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send();
        }
        else{
            alert("USER NOT FOUND")
        }
    })
});