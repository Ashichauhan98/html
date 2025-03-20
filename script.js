// Array to store cart items
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add items to the cart
// Function to add items to the cart
function addToCart(name, price) {
    let item = cart.find(product => product.name === name);
    if (item) {
        item.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${name} added to cart!`);
    updateCartCount();
}

// Function to display cart items on cart.html
// Function to display cart items
function displayCart() {
    let cartTable = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let emptyCartMessage = document.getElementById("empty-cart-message");

    cartTable.innerHTML = ""; // Clear previous items

    if (cart.length === 0) {
        emptyCartMessage.style.display = "block";
        cartTotal.innerText = "₹0.00";
        return;
    } else {
        emptyCartMessage.style.display = "none";
    }

    let total = 0;
    cart.forEach((item, index) => {
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price.toLocaleString()}</td>
                <td>${item.quantity}</td>
                <td><button onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
        cartTable.innerHTML += row;
        total += item.price * item.quantity;
    });

    cartTotal.innerText = `₹${total.toLocaleString()}`;
}


// Function to remove items from the cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Function to handle checkout form submission
function handleCheckout(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let payment = document.getElementById("payment").value;

    if (!name || !address) {
        alert("Please fill in all required fields.");
        return;
    }

    alert(`Thank you, ${name}! Your order has been placed.`);
    localStorage.removeItem("cart"); // Clear cart after checkout
    window.location.href = "index.html"; // Redirect to homepage
}

// Run cart display function only if on cart page
if (window.location.pathname.includes("cart.html")) {
    displayCart();
}

// Attach event listener for checkout form
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("checkout-form")) {
        document.getElementById("checkout-form").addEventListener("submit", handleCheckout);
    }
});
// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-count").innerText = cart.length;
}

// Run cart count update on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
// Function to display cart items
function displayCart() {
    let cartTable = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");
    let checkoutSection = document.querySelector(".cart-total");
    let emptyCartMessage = document.getElementById("empty-cart-message");

    cartTable.innerHTML = ""; // Clear previous items

    if (cart.length === 0) {
        cartTable.innerHTML = "<tr><td colspan='4'>Your cart is empty</td></tr>";
        cartTotal.innerText = "₹0.00";
        checkoutSection.style.display = "none"; // Hide checkout section if cart is empty
        emptyCartMessage.style.display = "block"; // Show empty cart message
        return;
    } else {
        checkoutSection.style.display = "block"; // Show checkout section
        emptyCartMessage.style.display = "none"; // Hide empty cart message
    }

    let total = 0;
    cart.forEach((item, index) => {
        let row = `
            <tr>
                <td>${item.name}</td>
                <td>₹${item.price.toLocaleString()}</td>
                <td>
                    <span onclick="updateQuantity(${index}, -1)" style="cursor: pointer;">➖</span>
                    <span>${item.quantity}</span>
                    <span onclick="updateQuantity(${index}, 1)" style="cursor: pointer;">➕</span>
                </td>
                <td><button class="remove-btn" onclick="removeFromCart(${index})">Remove</button></td>
            </tr>
        `;
        cartTable.innerHTML += row;
        total += item.price * item.quantity;
    });

    cartTotal.innerText = `₹${total.toLocaleString()}`;
}

// Function to update item quantity
function updateQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        cart.splice(index, 1); // Remove item if quantity is 0
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// Function to handle payment button
function payNow() {
    alert("Redirecting to payment gateway...");
    window.location.href = "payment.html"; // Redirect to a payment page (you can create this)
}

// Run cart display function only if on cart page
document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
    if (document.getElementById("cart-items")) {
        displayCart();
    }
});
function proceedToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty. Add items before proceeding to checkout.");
        return;
    }
    window.location.href = "checkout.html"; // Redirect to checkout page
}
document.addEventListener("DOMContentLoaded", function () {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));

    if (product) {
        document.getElementById("product-image").src = product.image;
        document.getElementById("product-name").innerText = product.name;
        document.getElementById("product-description").innerText = product.description;
        document.getElementById("product-price").innerText = `₹${product.price}`;
    }
});

// Function to add item to cart from details page
function addToCartFromDetails() {
    const product = JSON.parse(localStorage.getItem("selectedProduct"));
    if (product) {
        addToCart(product.name, product.price);
    }
}
