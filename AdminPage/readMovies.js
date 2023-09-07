// Event listener for when the DOM is ready
document.addEventListener("DOMContentLoaded", fetchAndDisplayMovies());
function fetchAndDisplayMovies() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/movies", true);
    xhr.setRequestHeader("x-access-token", localStorage.getItem("UserAuth"));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.response);
                console.log(response.data.movies)
                const moviesData = response.data.movies;

                const list = document.getElementById("list");
                list.innerHTML = "";

                let row;

                moviesData.forEach((movie, index) => {
                    if (index % 4 === 0) {
                        row = document.createElement("div");
                        row.className = "row mb-3";
                    }

                    const column = document.createElement("div");
                    column.className = "col-md-3";

                    const card = document.createElement("div");
                    card.className = "card";

                    const cardBody = document.createElement("div");
                    cardBody.className = "card-body";

                    const cardTitle = document.createElement("h5");
                    cardTitle.className = "card-title";
                    cardTitle.textContent = movie.name;

                    const cardText = document.createElement("p");
                    cardText.className = "card-text";
                    cardText.innerHTML = `Released on: ${movie.released_on}<br>Price: ${movie.price}<br>Seats: ${movie.seats}`;

                
                    const updateButton = document.createElement("button");
                    updateButton.className = "btn btn-primary";
                    updateButton.textContent = "Update Movie Details";

            
                    const deleteButton = document.createElement("button");
                    deleteButton.className = "btn btn-danger";
                    deleteButton.textContent = "Delete Movie";

                    
                    deleteButton.addEventListener("click", function () {
                        
                        deleteMovie(movie.id);
                    });

                    updateButton.addEventListener("click", function (){
                        var id = movie.id;
                        console.log("Id of the movie----->", id)
                        var queryString = "?movieId=" + id;
                        console.log("Id of the movie in the params----->", queryString)
                       window.location.href = "./editMovie.html" + queryString;
                    });

                    
                    cardBody.appendChild(cardTitle);
                    cardBody.appendChild(cardText);
                    cardBody.appendChild(updateButton);
                    cardBody.appendChild(deleteButton);

                    
                    card.appendChild(cardBody);

                    
                    column.appendChild(card);

                    
                    row.appendChild(column);

                    
                    if (index % 4 === 3 || index === moviesData.length - 1) {
                        list.appendChild(row);
                    }
                });
            } else {
                console.log("something looks wrong");
            }
        }
    };
    xhr.send();
}


function deleteMovie(movieId) {
    const xhr = new XMLHttpRequest();
    
    xhr.open("DELETE", `http://localhost:3000/movies/${movieId}`, true);
    
    xhr.setRequestHeader("x-access-token", localStorage.getItem("UserAuth"));
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
            
                fetchAndDisplayMovies();
            } else {
                console.log("Failed to delete the movie");
            }
        }
    };
    
    xhr.send();
}

