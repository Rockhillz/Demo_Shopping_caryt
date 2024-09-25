let laptops = [
    {
      productImg: "https://cdn.pixabay.com/photo/2016/02/17/15/37/laptop-1205256_640.jpg",
      price: 1200,
      productName: "Dell XPS 13",
      quantity: 1,
      description: "A high-performance laptop with a 13.3-inch 4K UHD display, 16GB RAM, and 512GB SSD."
    },
    {
      productImg: "https://img.lovepik.com/element/45012/8521.png_860.png",
      price: 1500,
      productName: "Apple MacBook Pro",
      quantity: 1,
      description: "A powerful laptop with a 14-inch Retina display, M1 chip, 16GB RAM, and 1TB SSD."
    },
    {
      productImg: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA%3D",
      price: 900,
      productName: "HP Spectre x360",
      quantity: 1,
      description: "A versatile 2-in-1 laptop with a 13.3-inch touchscreen, 8GB RAM, and 256GB SSD."
    },
    {
      productImg: "https://img.freepik.com/free-photo/3d-rendering-laptop_23-2151004314.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1726963200&semt=ais_hybrid",
      price: 1100,
      productName: "Lenovo ThinkPad X1 Carbon",
      quantity: 1,
      description: "A durable business laptop with a 14-inch display, Intel i7 processor, 16GB RAM, and 512GB SSD."
    },
    {
      productImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Or3XT6CxL8eRSUBXRYOgKtCCRCZmKs_ONw&s",
      price: 800,
      productName: "Acer Aspire 5",
      quantity: 1,
      description: "A budget-friendly laptop with a 15.6-inch display, AMD Ryzen 5, 8GB RAM, and 512GB SSD."
    }
  ];
  

//   render product to dom 
const cartContainer = document.getElementById("shoppingList")

// get total element from span 
const allTotal = document.getElementById("total")


// handle increment logic 
function increaseQtn(param) {
    let clickProductName = param.target.id;
    // find the product in the array 
    let product;
    for (item of laptops) {
        if (item.productName === clickProductName) {
            product = item;
            break;
        }
    }

    // increament the product 
    product.quantity++;

    // find the quantity element and update it 
    let quantityElem = document.getElementById(`quantity-${clickProductName}`);

    quantityElem.textContent = product.quantity;

    // update laptop array 

    let index = laptops.indexOf(product);
    laptops[index] = product;
    // quantityElem.textContent = product.quantity
    allTotal.textContent = sumProduct()

}


// Handle decrement logic
function decreaseQtn(param) {

    let clickProductName = param.target.id;
    // find the product in the array 
    let product;
    for (item of laptops) {
        if (item.productName === clickProductName) {
            product = item;
            break;
        }
    }

    // decrement the product 
    if (product.quantity > 1) {
        product.quantity--;
    }
    
    // find the quantity element and update it 
    // let quantityElem = document.getElementById("quantity");
    // update the quantity element for this product
    let quantityElem = document.getElementById(`quantity-${clickProductName}`);
    quantityElem.textContent = product.quantity;

    // update laptop array not needed 
    // let index = laptops.indexOf(product);
    // laptops[index] = product;
    allTotal.textContent = sumProduct()
}


// calculate total prices 
function sumProduct() {
    let total = 0;
    for (product of laptops) {
        total += product.price * product.quantity;
    }

    return total;
}


// remove the item from the cart
function removeQtn(param) {
    let clickProductName = param.target.id;
    console.log(clickProductName)
    
    let product;
    for (item of laptops) {
        if (item.productName === clickProductName) {
            product = item;
            break;
        }
    }

    // index over items in array and remove
    let index = laptops.indexOf(product);
    laptops.splice(index, 1);


    // Remove the item from DOM 
    let productCardRemoval = param.target.parentElement.parentElement;
    cartContainer.removeChild(productCardRemoval)

    allTotal.textContent = sumProduct()
} 


// handle rendering of products 
function renderProducts() {
    for (product of laptops) {
        let productCard = document.createElement("div");
        productCard.setAttribute("class", "productCard");

        let productImage = document.createElement("img");
        productImage.src = product.productImg;
        productImage.setAttribute("class", "prodImg")
        productCard.appendChild(productImage);

        let prodName = document.createElement("h3");
        prodName.textContent = product.productName;
        productCard.appendChild(prodName);

        let prodPrice = document.createElement("p");
        prodPrice.textContent = product.price;
        productCard.appendChild(prodPrice);

        let prodDesc = document.createElement("p");
        prodDesc.textContent = product.description;
        productCard.appendChild(prodDesc);


        // Buttons 
        let incrementBtn = document.createElement("button");
        incrementBtn.textContent = "+";
        incrementBtn.setAttribute("id", product.productName);
        incrementBtn.addEventListener("click", function(eventObj) {
            increaseQtn(eventObj);
        });

        let decrementBtn = document.createElement("button");
        decrementBtn.textContent = "-";
        decrementBtn.setAttribute("id", product.productName);
        decrementBtn.addEventListener("click", function(eventObj) {
            decreaseQtn(eventObj);
        });

        let quantities = document.createElement("p");
        quantities.textContent = product.quantity;
        quantities.setAttribute("id", `quantity-${product.productName}`)

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Remove";
        deleteBtn.setAttribute("id", product.productName);
        deleteBtn.addEventListener("click", function(eventObj) {
            removeQtn(eventObj)
        });

        let leftBox = document.createElement("div");
        leftBox.setAttribute("class", "left-box");
        leftBox.appendChild(decrementBtn);
        leftBox.appendChild(quantities);
        leftBox.appendChild(incrementBtn);

        let actionBox = document.createElement("div");
        actionBox.setAttribute("class", "action-box");
        actionBox.appendChild(leftBox);
        actionBox.appendChild(deleteBtn);
        productCard.appendChild(actionBox)


        cartContainer.appendChild(productCard);
    }
}

renderProducts();



// Paystack api: go and register in paystack api