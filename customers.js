// product list, not the best placement but whatever
var products = [
  {
    name: "Broccoli",
    imageLink:"../images/broccoli.jpg",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    id: "broc",
    price: 1.99,

  },
  {
    name: "Lettuce",
    imageLink:"../images/beef.jpg",
    vegetarian: true,
    glutenFree: true,
    organic: true,
    id: "lett",
    price: 2.99
  },
  {
    name: "Milk Chocolate",
    imageLink:"./images/chocolate.jpg",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    id: "choc",
    price: 4.99
  },
  {
    name: "Oatmeal",
    imageLink:"./images/oatmeal.jpg",
    vegetarian: false,
    glutenFree: true,
    organic: false,
    id: "oats",
    price: 4.99
  },
  {
    name: "Orange Juice",
    imageLink:"./images/OrangeJuice.jpg",
    vegetarian: true,
    glutenFree: true,
    organic: false,
    id: "oran",
    price: 5.45
  },
  {
    name: "Nuts",
    imageLink:"./images/peanuts.png",
    vegetarian: false,
    glutenFree: true,
    organic: false,
    id: "nuts",
    price: 7.50
  },
  {
    name: "Eggs",
    imageLink:"./images/eggs.jpg",
    vegetarian: false,
    glutenFree: true,
    organic: true,
    id: "eggs",
    price: 7.50
  },
  {
    name: "Chicken Breast",
    imageLink:"./images/ChickenBreast.jpg",
    vegetarian: false,
    glutenFree: true,
    organic: false,
    id: "chic",
    price: 10.00
  },
  {
    name: "Cake",
    imageLink:"./images/cake.jpg",
    vegetarian: true,
    glutenFree: false,
    organic: false,
    id: "cake",
    price: 10.00
  },
  {
    name: "Beef",
    imageLink:"./images/beef.jpg",
    vegetarian: false,
    glutenFree: false,
    organic: true,
    id: "beef",
    price: 12.99
  },
]




document.addEventListener('DOMContentLoaded', function () {
  var vegetarianCheckbox = document.getElementById('vegetarian');
  var glutenCheckbox = document.getElementById('glutenFree');
  var organicCheckbox = document.getElementById('organic');

  // not the best way of doing it but this function updates the list of products
  function updateProductList() {
    var productList = createProductList();
    console.log(productList);

    localStorage.setItem('filteredProducts', JSON.stringify(productList));
  }

  //each time a slider is moved it will update the product list.
  function handleSliderToggle(checkbox, slider) {
    checkbox.checked = !checkbox.checked;
    localStorage.setItem(checkbox.id + 'Checked', checkbox.checked);
    updateSliderStyles(checkbox, slider);
    updateProductList();
  }

  // sets inital check boxes
  vegetarianCheckbox.checked = localStorage.getItem('vegetarianChecked') === 'true';
  glutenCheckbox.checked = localStorage.getItem('glutenFreeChecked') === 'true';
  organicCheckbox.checked = localStorage.getItem('organicChecked') === 'true';

  // changed up way to handle the toggle portion and the styling, tried to keep it the same as @Dante's/Brian's method?
  // but with some small changes since each time it gets toggled there needs to be an update
  var vegetarianToggle = document.getElementById('vegetarianToggle');
  vegetarianToggle.addEventListener('click', function () {
    handleSliderToggle(vegetarianCheckbox, vegetarianToggle.querySelector('.slider'));
  });

  var glutenToggle = document.getElementById('glutenToggle');
  glutenToggle.addEventListener('click', function () {
    handleSliderToggle(glutenCheckbox, glutenToggle.querySelector('.slider'));
  });

  var organicToggle = document.getElementById('organicToggle');
  organicToggle.addEventListener('click', function () {
    handleSliderToggle(organicCheckbox, organicToggle.querySelector('.slider'));
  });

  // using initial styles update and product list calculation
  updateSliderStyles(vegetarianCheckbox, vegetarianToggle.querySelector('.slider'));
  updateSliderStyles(glutenCheckbox, glutenToggle.querySelector('.slider'));
  updateSliderStyles(organicCheckbox, organicToggle.querySelector('.slider'));
  updateProductList();
});

function updateSliderStyles(checkbox, slider) {
  if (checkbox.checked) {
    slider.style.backgroundColor = '#4CAF50'; // Green color
  } else {
    slider.style.backgroundColor = '#ccc'; // Default color
  }
}

// this function will create a product list from the selected checkboxe states found in storage.
function createProductList() {
  var vegetarianChecked = localStorage.getItem('vegetarianChecked') === 'true';
  var glutenFreeChecked = localStorage.getItem('glutenFreeChecked') === 'true';
  var organicChecked = localStorage.getItem('organicChecked') === 'true';

  var filteredProducts = [];

  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var addProduct = true; // bool used to determine if the product should be added


    // maybe not the best way to handle this since O(n) on each product update but oh well.
    // there's only 10 products LOL
    if (vegetarianChecked && !product.vegetarian) {
      addProduct = false;
    }

    if (glutenFreeChecked && !product.glutenFree) {
      addProduct = false;
    }

    if (organicChecked && !product.organic) {
      addProduct = false;
    }

    // If the product meets all the criteria, add it to the filtered list
    if (addProduct) {
      filteredProducts.push(product);
    }
  }
  // returns updated product list
  return filteredProducts;
}




