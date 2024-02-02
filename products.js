// re-did entire products script
// essentially this just is supposed to take the products from the storage,
// and then display them using the style created using createElement function
document.addEventListener('DOMContentLoaded', function() {
    // getting product container
    var productContainer = document.getElementById('productContainer');
    // retrieves product list from local storage
    var products = JSON.parse(localStorage.getItem('filteredProducts'));
    // adds items selected into cart from local storage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // created the function to add to put in cart
    function addToCart(product) {
        cart.push({ productName: product.name, price: `$${product.price.toFixed(2)}`});
        localStorage.setItem('cart', JSON.stringify(cart))
    }

    // looping through product list using forEach()
    if (products && products.length > 0) {
        products.forEach(function(product) {

            // this follows the format you guys created, except using the
            var itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.id = product.id;

            var nameDiv = document.createElement('div');
            nameDiv.textContent = product.name;

            var priceP = document.createElement('p');
            priceP.className = 'price';
            priceP.textContent = `$${product.price.toFixed(2)}`;

            var image = document.createElement('img');
            image.className = 'image';
            image.src = product.imageLink;


            var selectButton = document.createElement('button');
            selectButton.className = 'select-button';
            selectButton.textContent = 'Select';
            selectButton.addEventListener('click', function(){
                addToCart(product);
            });
            


            itemDiv.appendChild(nameDiv);
            itemDiv.appendChild(priceP);
            itemDiv.appendChild(image);
            itemDiv.appendChild(selectButton);


            productContainer.appendChild(itemDiv);
        });
    } else {
        // this should never be reached since with all combinations of selections there will be at least one item
        productContainer.textContent = 'No products available';
    }
});

