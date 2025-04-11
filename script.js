document.addEventListener("DOMContentLoaded", () => {
    console.log("Website loaded successfully!");

    const productGrid = document.querySelector(".product-grid");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const sellLink = document.querySelector('a[href="#sell-section"]');
    const sellSection = document.getElementById("sell-section");

    // Smooth scroll to seller section
    if (sellLink && sellSection) {
        sellLink.addEventListener("click", (event) => {
            event.preventDefault();
            sellSection.style.display = "block";
            sellSection.scrollIntoView({ behavior: "smooth" });
        });
    }

    // =============== FETCH AND DISPLAY PRODUCTS ===============
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            let filteredProducts = products;

            const displayProducts = (items) => {
                if (!productGrid) return;
                productGrid.innerHTML = "";
                items.forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                        <button 
                            class="btn add-to-cart" 
                            data-id="${product.id}" 
                            data-name="${product.name}" 
                            data-price="${product.price}">
                            Add to Cart
                        </button>
                    `;
                    productGrid.appendChild(productCard);
                });

                bindAddToCart();
            };

            filterButtons.forEach(button => {
                button.addEventListener("click", () => {
                    const selectedCategory = button.getAttribute("data-category");
                    filteredProducts = selectedCategory === "all"
                        ? products
                        : products.filter(p => p.category === selectedCategory);
                    displayProducts(filteredProducts);
                });
            });

            displayProducts(filteredProducts);
        })
        .catch(error => console.error("Error loading products:", error));

    // =============== CART FUNCTIONALITY ===============
    function bindAddToCart() {
        document.querySelectorAll(".add-to-cart").forEach(button => {
            button.addEventListener("click", function () {
                const id = this.dataset.id;
                const name = this.dataset.name;
                const price = parseFloat(this.dataset.price);

                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                const existingItem = cart.find(item => item.id === id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({ id, name, price, quantity: 1 });
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartCount();
                alert(`${name} added to cart!`);
            });
        });
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.getElementById("cart-count");
        if (cartCount) cartCount.textContent = count;
    }

    updateCartCount();

    // =============== SELLER REGISTRATION ===============
    const sellerForm = document.getElementById("seller-form");
    if (sellerForm) {
        sellerForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const sellerName = document.getElementById("seller-name").value;
            const sellerEmail = document.getElementById("seller-email").value;
            const sellerPhone = document.getElementById("seller-phone").value;
            const sellerPassword = document.getElementById("seller-password").value;

            const sellerData = {
                name: sellerName,
                email: sellerEmail,
                phone: sellerPhone,
                password: sellerPassword
            };

            localStorage.setItem("seller", JSON.stringify(sellerData));

            alert("Seller registered successfully!");
            window.location.href = "dashboard.html";
        });
    }

    // =============== PRODUCT UPLOAD ===============
    const productForm = document.getElementById("product-form");
    if (productForm) {
        productForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const productName = document.getElementById("product-name").value;
            const productPrice = document.getElementById("product-price").value;
            const productCategory = document.getElementById("product-category").value;
            const productDescription = document.getElementById("product-description").value;
            const productImage = document.getElementById("product-image").value;

            console.log("Product Uploaded:", {
                productName, productPrice, productCategory,
                productDescription, productImage
            });

            alert("Product uploaded!");
        });
    }

    // =============== SIGN IN FORM ===============
    const signinForm = document.getElementById("signin-form");
    if (signinForm) {
        signinForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const dummyUser = { email: "user@example.com", password: "password123" };

            if (email === dummyUser.email && password === dummyUser.password) {
                alert("Login successful!");
                window.location.href = "dashboard.html";
            } else {
                alert("Invalid email or password.");
            }
        });
    }

    // =============== SELLER DASHBOARD ACCESS CONTROL ===============
    const currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "dashboard.html") {
        const seller = JSON.parse(localStorage.getItem("seller"));
        if (!seller) {
            alert("Access denied. Please register as a seller first.");
            window.location.href = "register.html";
        }
    }
});
