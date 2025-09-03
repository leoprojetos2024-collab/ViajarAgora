document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-button');
    const clearCartButton = document.getElementById('clear-cart-button');
    const addToCartButtons = document.querySelectorAll('.btn');
    const cartNotification = document.querySelector('.cart-notification');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartNotification() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        if (cartNotification) {
            cartNotification.textContent = totalItems;
            cartNotification.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    // Function to save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to render cart items
    function renderCart() {
        if (!cartItemsContainer) {
            updateCartNotification();
            return;
        }
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<h3>Seu carrinho está vazio.</h3>';
            totalPriceElement.textContent = 'R$ 0,00';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${item.name}</span>
                    <span>R$ ${item.price.toFixed(2)}</span>
                    <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="item-quantity">
                    <button class="remove-item-button btn" data-index="${index}">Remover</button>
                `;
                cartItemsContainer.appendChild(cartItem);
                totalPrice += item.price * item.quantity;
            });

            totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
        }
        updateCartNotification();
    }

    // Function to add item to cart
    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        saveCart();
        renderCart();
        alert(`${name} foi adicionado ao carrinho!`);
    }

    // Function to update item quantity
    function updateQuantity(index, quantity) {
        if (quantity <= 0) {
            cart.splice(index, 1);
        } else {
            cart[index].quantity = quantity;
        }
        saveCart();
        renderCart();
    }

    // Function to remove item from cart
    function removeFromCart(index) {
        cart.splice(index, 1);
        saveCart();
        renderCart();
    }

    // Function to clear the cart
    function clearCart() {
        cart = [];
        saveCart();
        renderCart();
    }

    // Event Listeners
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn') && (event.target.textContent === 'Comprar' || event.target.textContent === 'Alugar' || event.target.textContent === 'Reservar' || event.target.textContent === 'Comprar Pacote')) {
                const offerCard = event.target.closest('.offer-card');
                const name = offerCard.querySelector('h3').textContent;
                const priceText = offerCard.querySelector('h4').textContent;
                const price = parseFloat(priceText.replace(/[^0-9,.-]+/g, "").replace('.', '').replace(',', '.'));
                addToCart(name, price);
            }
        });
    });

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('change', (event) => {
            if (event.target.classList.contains('item-quantity')) {
                const index = event.target.dataset.index;
                const quantity = parseInt(event.target.value);
                updateQuantity(index, quantity);
            }
        });

        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item-button')) {
                const index = event.target.dataset.index;
                removeFromCart(index);
            }
        });
    }

    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Função de checkout ainda não implementada.');
        });
    }

    const comprarPacoteRioButton = document.getElementById('comprar-pacote-rio');
    if (comprarPacoteRioButton) {
        comprarPacoteRioButton.addEventListener('click', (event) => {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            addToCart(name, price);
        });
    }

    renderCart();
});