document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalElement = document.getElementById("cart-total");
    const emptyCartMessage = document.getElementById("empty-cart");

    function loadCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        cartItemsContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            emptyCartMessage.style.display = "block";
            cartTotalElement.textContent = "₦0";
            return;
        } else {
            emptyCartMessage.style.display = "none";
        }

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <span class="cart-name">${item.name}</span>
                <span class="cart-price">₦${item.price}</span>
                <div class="cart-quantity">
                    <button class="decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(itemElement);

            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = `₦${total.toLocaleString()}`;

        addCartControls();
    }

    function addCartControls() {
        document.querySelectorAll(".increase").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                updateQuantity(index, 1);
            });
        });

        document.querySelectorAll(".decrease").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                updateQuantity(index, -1);
            });
        });

        document.querySelectorAll(".remove-item").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = btn.dataset.index;
                removeItem(index);
            });
        });
    }

    function updateQuantity(index, change) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        if (!cart[index]) return;

        cart[index].quantity += change;
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCart();
    }

    loadCart();
});
