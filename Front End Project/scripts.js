// Execute these functions when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayCart();
});

// Function to fetch and display product details
function displayProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const productSection = document.getElementById('product-section');
            data.products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product-item';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div>
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price.toFixed(2)}</p>
                        <button onclick="addProductToCart('${product.id}', '${product.name}', ${product.price})">Add to Cart</button>
                    </div>
                `;
                productSection.appendChild(productDiv);
            });
        });
}

// Function to add selected product to the shopping cart
function addProductToCart(id, name, price) {
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    shoppingCart.push({ id, name, price });
    localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
    displayCart();
}

// Function to display the shopping cart contents
function displayCart() {
    const cartItemsList = document.getElementById('cart-items-list');
    const totalAmount = document.getElementById('total-amount');
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    cartItemsList.innerHTML = '';
    let total = 0;

    // Loop through each item in the cart and create a list element
    shoppingCart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItemsList.appendChild(listItem);
        total += item.price;
    });

    // Update the total amount in the cart
    totalAmount.textContent = total.toFixed(2);
}

// Function to clear all items from the shopping cart
function emptyCart() {
    localStorage.removeItem('shoppingCart');
    displayCart();
}

// Open the payment window
function openPaymentWindow() {
    const paymentModal = document.getElementById('payment-modal');
    const paymentSummaryList = document.getElementById('payment-summary-list');
    const paymentTotalAmount = document.getElementById('payment-total-amount');

    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    paymentSummaryList.innerHTML = '';
    let total = 0;

    // Loop through each item in the cart and display it in the payment modal
    shoppingCart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        paymentSummaryList.appendChild(listItem);
        total += item.price;
    });

    // Update the total amount in the payment modal
    paymentTotalAmount.textContent = total.toFixed(2);

    // Show the modal
    paymentModal.style.display = 'flex';
}

// Close the payment window
function closePaymentWindow() {
    const paymentModal = document.getElementById('payment-modal');
    paymentModal.style.display = 'none';
}

// Confirm purchase (mock)
function confirmPurchase() {
    alert('Purchase confirmed! Thank you for shopping.');
    localStorage.removeItem('shoppingCart');
    displayCart();
    closePaymentWindow();
}

