document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const selectedProductsList = document.getElementById('selected-products-list');
    const totalPriceElement = document.getElementById('total-price');

    function updateCheckout() {
        let total = 0;
        selectedProductsList.innerHTML = '';

        cart.forEach(function (item, index) {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.productName} - ${item.price}`;
            
            // Create a remove button
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', function () {
                // Remove the item from the cart
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCheckout(); // Refresh the checkout list
            });

            listItem.appendChild(removeButton);
            selectedProductsList.appendChild(listItem);

            // Calculate total price
            const price = parseFloat(item.price.substring(1));
            total += price;
        });

        totalPriceElement.textContent = total.toFixed(2);
    }

    updateCheckout();
});

