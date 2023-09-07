var queryString = decodeURIComponent(window.location.search); 
console.log("in the edit movie page---->",queryString)

if (queryString.includes('movieId=')) {
    var id = queryString.split('movieId=')[1];
    console.log("Id of the movie in the edit page after split---->", id);
} else {
    console.log("No 'movieId' parameter found in the query string.");
}

document.addEventListener("DOMContentLoaded", function(){
    const titleField = document.getElementById("title-field").value;
    const releasedOnField = document.getElementById("date-field").value;
    const updateButton = document.getElementById("update-button");
    const newMovie = {
        name : titleField,
        releasedOn : releasedOnField
    }

    updateButton.addEventListener('click', function(event){
               event.preventDefault();
               const xhr = new XMLHttpRequest();
               xhr.open("PUT", `http://localhost:3000/movies/${id}`, true)
               xhr.setRequestHeader("x-access-token", localStorage.getItem("UserAuth"));
               xhr.setRequestHeader("Content-Type", "application/json");
               xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                    
                        alert(response.message)
                        window.location.href = './Admin.html'
                    }
                    else{
                        alert("Unable to edit movie try again")
                    }
                }
                }
                xhr.send(JSON.stringify(newMovie))

    })


});