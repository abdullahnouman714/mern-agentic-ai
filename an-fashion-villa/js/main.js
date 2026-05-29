let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ✅ UPDATED: Short, Clean & Professional Titles
const products = [
    { 
        id: 1, 
        name: 'Minimalist Summer Tops', 
        price: 2499, 
        category: 'unstitched', 
        image: 'images/1.jpg', 
        description: 'Clean and minimalist summer tops for casual wear' 
    },
    { 
        id: 2, 
        name: 'Cozy Autumn Knits', 
        price: 3999, 
        category: 'stitched', 
        image: 'images/2.jpg', 
        description: 'Warm and cozy knitted pieces perfect for autumn season' 
    },
    { 
        id: 3, 
        name: 'Urban Streetwear Jackets', 
        price: 1799, 
        category: 'stitched', 
        image: 'images/3.jpg', 
        description: 'Trendy urban streetwear jackets for modern style' 
    },
    { 
        id: 4, 
        name: 'Maroon Corduroy Dress', 
        price: 999, 
        category: 'accessories', 
        image: 'images/4.jpg', 
        description: 'Elegant maroon corduroy dress with classic fit' 
    },
    { 
        id: 5, 
        name: 'Teal Embroidered Kurta', 
        price: 2199, 
        category: 'unstitched', 
        image: 'images/5.jpg', 
        description: 'Traditional teal kurta with fine embroidery work' 
    },
    { 
        id: 6, 
        name: 'Premium Silk Scarf', 
        price: 4499, 
        category: 'stitched', 
        image: 'images/6.jpg', 
        description: 'Luxurious premium silk scarf with elegant design' 
    },
    { 
        id: 7, 
        name: 'Vintage Denim Jacket', 
        price: 3299, 
        category: 'unstitched', 
        image: 'images/7.jpg', 
        description: 'Classic vintage denim jacket with retro style' 
    },
    { 
        id: 8, 
        name: 'Kids Denim Vest Set', 
        price: 5499, 
        category: 'stitched', 
        image: 'images/8.jpg', 
        description: 'Stylish denim vest set for kids with comfortable fit' 
    },
    { 
        id: 9, 
        name: 'High-Neck Winter Knit', 
        price: 1299, 
        category: 'accessories', 
        image: 'images/9.jpg', 
        description: 'Warm high-neck knit piece for winter season' 
    },
    { 
        id: 10, 
        name: 'Classic Leather Jacket', 
        price: 1599, 
        category: 'stitched', 
        image: 'images/10.jpg', 
        description: 'Timeless classic leather jacket with premium quality' 
    }
];

// Slider variables
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
let slideInterval;

if (slides.length > 0) {
    showSlide(slideIndex);
    startAutoSlide();
}

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    slides[slideIndex].classList.add('active');
    updateDots();
}

function nextSlide() { slideIndex++; showSlide(slideIndex); resetAutoSlide(); }
function prevSlide() { slideIndex--; showSlide(slideIndex); resetAutoSlide(); }
function currentSlide(n) { slideIndex = n; showSlide(slideIndex); resetAutoSlide(); }

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => dot.classList.toggle('active', index === slideIndex));
}

function startAutoSlide() {
    slideInterval = setInterval(() => { slideIndex++; showSlide(slideIndex); }, 5000);
}

function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
}

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) cartCountEl.textContent = count;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) existingItem.qty++;
        else cart.push({ ...product, qty: 1 });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('✅ Added to cart!');
    }
}

function addToCartFromDetail() {
    const productId = new URLSearchParams(window.location.search).get('id');
    const qty = parseInt(document.getElementById('product-qty').value);
    const product = products.find(p => p.id === parseInt(productId));
    if (product) {
        const existingItem = cart.find(item => item.id === parseInt(productId));
        if (existingItem) existingItem.qty += qty;
        else cart.push({ ...product, qty });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('✅ Added to cart!');
    }
}

document.querySelector('.hamburger')?.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

updateCartCount();