document.addEventListener("DOMContentLoaded", function(){

    const cartData = JSON.parse(localStorage.getItem('cart'));
    
    const userId = JSON.parse(localStorage.getItem('User'))._id;
    
    const container = document.querySelector('.cart-container');
    
    const userCartData = cartData.filter(item => item.userId === userId);
    
    if (userCartData.length > 0) {
        const cartDiv = document.createElement('div');
        cartDiv.classList.add('mx-32', 'my-32', 'text-silver');
    
        const header = document.createElement('h1');
        header.classList.add('font-bold', 'text-3xl', 'text-left');
        header.textContent = `MY CART (${userCartData.length})`;
        cartDiv.appendChild(header);
    
        const itemList = document.createElement('ul');
        itemList.classList.add('p-4', 'mt-4', 'card', 'divide-y', 'divide-slate-300', 'text-left', 'shadow-md', 'bg-blue');
    
        userCartData.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('px-2', 'grid', 'grid-cols-12', 'gap-4');
    
            const itemDetails = document.createElement('div');
            itemDetails.classList.add('col-span-9');
    
            const itemName = document.createElement('p');
            itemName.classList.add('font-bold', 'mt-4');
            itemName.textContent = item.cart.name;
    
            const itemQuantity = document.createElement('p');
            itemQuantity.textContent = `Tickets: ${item.cart.ticket}`;
    
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
                
                const itemIndex = userCartData.findIndex(userCartItem => userCartItem.cart.id === item.cart.id);
                if (itemIndex !== -1) {
                    userCartData.splice(itemIndex, 1);
                }
                
                localStorage.setItem('cart', JSON.stringify(userCartData));
            
                listItem.remove();
                
                header.textContent = `MY CART (${userCartData.length})`;
            });
    
            listItem.appendChild(itemDetails);
            listItem.appendChild(removeButtonContainer);
    
            itemList.appendChild(listItem);
        });
    
        
        cartDiv.appendChild(itemList);
    
        
        container.appendChild(cartDiv);
    } else {
        
        const emptyCartMessage = document.createElement('div');
        emptyCartMessage.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'text-center');
    
        const emptyCartImage = document.createElement('div');

        emptyCartImage.innerHTML = `<img src="../assets/undraw_empty_cart_co35.svg" alt="empty cart" class="max-w-full h-auto max-h-48 mx-auto drop-shadow-lg" />`;
    
        const emptyCartText = document.createElement('p');
        emptyCartText.classList.add('font-semibold', 'mt-2');
        emptyCartText.textContent = 'Your Cart is Empty';
    
        emptyCartMessage.appendChild(emptyCartImage);
        emptyCartMessage.appendChild(emptyCartText);
    
        container.appendChild(emptyCartMessage);
    }
})

