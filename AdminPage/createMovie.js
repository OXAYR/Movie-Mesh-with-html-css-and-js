
document.addEventListener("DOMContentLoaded", function () {
    const createButton = document.getElementById("create-button")
    createButton.addEventListener("click", function (event) {
        event.preventDefault();

        const movie = {
            name: document.getElementById("title").value,
            released_on: document.getElementById("released_on").value,
            ticketCount: document.getElementById("ticketCount").value,
        };
        console.log("Movie---->", movie)

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/movies/", true);

        // Set headers
        xhr.setRequestHeader("x-access-token", localStorage.getItem("UserAuth"));
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log("Movie created successfully:", JSON.parse(xhr.response));
            } else {
                console.log("Something went wrong:", xhr.status, xhr.statusText);
            }
        };

        xhr.send(JSON.stringify(movie));
    });
});
