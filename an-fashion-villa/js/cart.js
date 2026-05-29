// Cart items display karo
function displayCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; padding: 40px; font-size: 18px; color: #666;">Your cart is empty 😔</p>';
        document.getElementById('subtotal').textContent = 'PKR 0';
        document.getElementById('shipping').textContent = 'PKR 0';
        document.getElementById('total').textContent = 'PKR 0';
        return;
    }

    container.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 100px; object-fit: cover; border-radius: 8px; margin-right: 15px;">
                <div>
                    <h4>${item.name}</h4>
                    <p class="price">PKR ${item.price.toLocaleString()}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                        <span class="qty-value">${item.qty}</span>
                        <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                    </div>
                </div>
            </div>
            <div class="cart-item-actions">
                <p class="item-total">PKR ${(item.price * item.qty).toLocaleString()}</p>
                <button class="delete-btn" onclick="removeFromCart(${index})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

// Quantity update karo
function updateQty(index, change) {
    if (cart[index]) {
        cart[index].qty += change;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
}

// Cart se delete karo
function removeFromCart(index) {
    if (confirm('Kya tum realmente yeh product remove karna chahate ho?')) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
}

// Cart summary update karo
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = subtotal > 0 ? 150 : 0;
    const total = subtotal + shipping;

    document.getElementById('subtotal').textContent = `PKR ${subtotal.toLocaleString()}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'PKR 0' : `PKR ${shipping}`;
    document.getElementById('total').textContent = `PKR ${total.toLocaleString()}`;
}

// Cart page load hote hi display karo
displayCart();