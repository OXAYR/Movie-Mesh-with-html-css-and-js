document.addEventListener("DOMContentLoaded", fetchAndDisplayMovies);
fetch('../navbar/dist/index.html')
            .then(response => response.text())
            .then(navbarHTML => {
                document.getElementById('menu-bar').innerHTML = navbarHTML;
            })
            .catch(error => console.error(error));
            

function fetchAndDisplayMovies() {
    console.log("click occurred");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/movies", true);
    xhr.setRequestHeader('x-access-token', localStorage.getItem('UserAuth'), "Content-Type", "application/json");
    xhr.onprogress = function () {
        console.log("in progress");
    };
    xhr.onload = function () {
        if (this.status == 200) {
            const response = JSON.parse(xhr.responseText);
            console.log("response --> ", response)
            const moviesData = response.data.movies;
            let cart = JSON.parse(localStorage.getItem('cart')) || [];

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
                cardText.textContent = `Released on: ${movie.released_on}, Price: ${movie.price}, Seats: ${movie.seats}`;

                const buyButton = document.createElement("button");
                buyButton.className = "btn btn-buy";
                buyButton.textContent = "BUY";

                buyButton.addEventListener("click", function(event){
                    event.preventDefault();
                    
                    const existingCartItem = cart.find(item => item.cart.id === movie.id);
                
                    if (existingCartItem) {
                        if (existingCartItem.cart.ticket < 5) {
                            existingCartItem.cart.ticket += 1;
                        } else {
                            alert("You cannot add more than 5 tickets of a movie");
                        }
                    } else {
                        const cartElement = {
                            id: movie.id,
                            name: movie.name,
                            date: movie.released_on,
                            price: movie.price,
                            ticket: 1
                        };
                
                        const {_id} = JSON.parse(localStorage.getItem("User")); 
                
                        const userCart = {
                            userId: _id,
                            cart: cartElement
                        };
                
                        cart.push(userCart);
                    }
                
                    localStorage.setItem('cart', JSON.stringify(cart));
                    console.log("element in the cart------>", cart);
                });
                

                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(buyButton);

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
    };
    xhr.send();
}
