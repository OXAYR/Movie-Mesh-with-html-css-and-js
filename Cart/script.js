// Retrieve cart data from local storage (assuming it's stored as a JSON string)
const cartData = JSON.parse(localStorage.getItem('cart'));

// Get the container element where you want to append the generated HTML
const container = document.querySelector('.cart-container');

// Check if cartData is not empty
if (cartData && cartData.length > 0) {
    // Create a new div element to hold the cart content
    const cartDiv = document.createElement('div');
    cartDiv.classList.add('mx-32', 'my-32', 'text-silver');

    // Create the cart header
    const header = document.createElement('h1');
    header.classList.add('font-bold', 'text-3xl', 'text-left');
    header.textContent = `MY CART (${cartData.length})`;
    cartDiv.appendChild(header);

    // Create the cart items list
    const itemList = document.createElement('ul');
    itemList.classList.add('p-4', 'mt-4', 'card', 'divide-y', 'divide-slate-300', 'text-left', 'shadow-md', 'bg-blue');

    // Iterate through cartData and create list items for each item in the cart
    cartData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('px-2', 'grid', 'grid-cols-12', 'gap-4');

        const itemDetails = document.createElement('div');
        itemDetails.classList.add('col-span-9');

        const itemName = document.createElement('p');
        itemName.classList.add('font-bold', 'mt-4');
        itemName.textContent = item.name;

        const itemQuantity = document.createElement('p');
        itemQuantity.textContent = `Tickets: ${item.ticket}`;

        itemDetails.appendChild(itemName);
        itemDetails.appendChild(itemQuantity);

        const removeButtonContainer = document.createElement('div');
        removeButtonContainer.classList.add('col-span-3', 'flex', 'flex-col', 'items-end', 'py-2', 'mt-4');

        const removeButton = document.createElement('button');
        removeButton.classList.add('text-darkBlue', 'bg-silver', 'font-medium', 'text-md', 'text-center', 'rounded-full', 'px-2', 'm-3');
        removeButton.textContent = 'x';

        removeButtonContainer.appendChild(removeButton);

        removeButton.addEventListener("click", function(event) {
            event.preventDefault();
            // Remove the cart element at the current index
            cartData.splice(item.id, 1);
            // Update the local storage with the modified cartData
            localStorage.setItem('cart', JSON.stringify(cartData));
            // Remove the list item from the DOM
            listItem.remove();
            // Update the cart header with the new cartData length
            header.textContent = `MY CART (${cartData.length})`;
        });

        listItem.appendChild(itemDetails);
        listItem.appendChild(removeButtonContainer);

        itemList.appendChild(listItem);
    });

    // Create the total bill section (you can uncomment this if needed)
    // const totalBillDiv = document.createElement('div');
    // totalBillDiv.classList.add('p-4', 'mt-4', 'card', 'divide-y', 'divide-slate-300', 'text-left', 'shadow-md');
    // totalBillDiv.innerHTML = `<p><strong>Total Bill:</strong> $50.00</p>`;

    // Create the error message section (you can uncomment this if needed)
    // const errorDiv = document.createElement('div');
    // errorDiv.classList.add('p-4', 'mt-4', 'card', 'bg-red-200');
    // errorDiv.innerHTML = `<p>Error message goes here</p><button class="text-red-800">Dismiss</button>`;

    // Append elements to the cartDiv
    cartDiv.appendChild(itemList);
    // cartDiv.appendChild(totalBillDiv);
    // cartDiv.appendChild(errorDiv);

    // Append the cartDiv to the container
    container.appendChild(cartDiv);
} else {
    // If the cart is empty, you can display a different message here
    const emptyCartMessage = document.createElement('div');
    emptyCartMessage.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'text-center');

    const emptyCartImage = document.createElement('div');
    // Add the image source here
    emptyCartImage.innerHTML = `<img src="../assets/undraw_empty_cart_co35.svg" alt="empty cart" class="max-w-full h-auto max-h-48 mx-auto drop-shadow-lg" />`;

    const emptyCartText = document.createElement('p');
    emptyCartText.classList.add('font-semibold', 'mt-2');
    emptyCartText.textContent = 'Your Cart is Empty';

    emptyCartMessage.appendChild(emptyCartImage);
    emptyCartMessage.appendChild(emptyCartText);

    container.appendChild(emptyCartMessage);
}
