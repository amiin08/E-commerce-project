
let cart = [];

function addToCart(product, price) {
    const existingItem = cart.find(item => item.product === product);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ product, price, quantity: 1 });
    }
    
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateQuantity(index, change) {
    if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
    } else {
        removeFromCart(index);
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement('li');
        li.className = 'cart-item';
        li.innerHTML = `
            <div class="item-info">
                <span>${item.product}</span>
                <span class="item-price">KES ${item.price.toFixed(0)} x ${item.quantity}</span>
            </div>
            <div class="quantity-controls">
                <button onclick="updateQuantity(${index}, -1)" class="qty-btn">−</button>
                <span class="qty-display">${item.quantity}</span>
                <button onclick="updateQuantity(${index}, 1)" class="qty-btn">+</button>
                <button onclick="removeFromCart(${index})" class="remove-btn">Remove</button>
            </div>
        `;
        cartItems.appendChild(li);
    });

    totalElement.textContent = total.toFixed(0);
    checkoutBtn.style.display = cart.length > 0 ? 'block' : 'none';
}

function openCheckout() {
    // Calculate total
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.quantity;
    });
    document.getElementById('amount').value = total.toFixed(0);
    document.getElementById('checkout-modal').style.display = 'block';
}

function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function submitCheckout(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    alert(`Order placed successfully!\n\nThank you, ${name}!\nA confirmation email will be sent to ${email}.\nPlease complete payment via M-Pesa to ${phone}.`);
    
    cart = [];
    updateCart();
    closeCheckout();
    document.getElementById('checkout-form').reset();
}

window.onclick = function(event) {
    const modal = document.getElementById('checkout-modal');
    if (event.target === modal) {
        closeCheckout();
    }
}