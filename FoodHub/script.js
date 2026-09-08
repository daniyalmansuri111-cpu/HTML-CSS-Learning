const foods = [
    {
        id: 1,
        name: "Classic Smash Burger",
        category: "burger",
        description: "Double patty · cheddar · caramelized onion",
        price: 299,
        image: "photo.png"
    },
    {
        id: 2,
        name: "Truffle Mushroom Pizza",
        category: "pizza",
        description: "Mozzarella · wild mushrooms · truffle oil",
        price: 399,
        image: "photo1.png"
    },
    {
        id: 3,
        name: "Creamy Alfredo",
        category: "pasta",
        description: "Parmesan · herbs · creamy white sauce",
        price: 329,
        image: "photo3.png"
    },
    {
        id: 4,
        name: "Crispy Chicken Burger",
        category: "burger",
        description: "Crispy chicken · lettuce · house mayo",
        price: 279,
        image: "photo4.png"
    },
    {
        id: 5,
        name: "Four Cheese Pizza",
        category: "pizza",
        description: "Mozzarella · parmesan · cheddar · blue cheese",
        price: 449,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=85"
    },
    {
        id: 6,
        name: "Chocolate Lava Cake",
        category: "dessert",
        description: "Dark chocolate · molten center · vanilla",
        price: 199,
        image: "photo6.png"
    }
];

let cart = JSON.parse(localStorage.getItem("foodhubCart")) || [];

const foodGrid = document.getElementById("foodGrid");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const cartContent = document.getElementById("cartContent");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const toast = document.getElementById("toast");

function renderFoods(filter = "all") {

    const filtered =
        filter === "all"
            ? foods
            : foods.filter(food => food.category === filter);

    foodGrid.innerHTML = filtered.map((food, index) => {

        const media = food.video
            ? `
                <video
                    src="${food.image}"
                    autoplay
                    muted
                    loop
                    playsinline
                ></video>
            `
            : `
                <img
                    src="${food.image}"
                    alt="${food.name}"
                    loading="lazy"
                >
            `;

        return `
            <article class="food-card">

                <div class="food-image">

                    ${media}

                    ${
                        index === 0
                            ? `<span class="food-tag">BESTSELLER</span>`
                            : ""
                    }

                    <button
                        class="add-food"
                        onclick="addToCart(${food.id})"
                    >
                        <i class="fa-solid fa-plus"></i>
                    </button>

                </div>

                <div class="food-info">

                    <div>
                        <h3>${food.name}</h3>

                        <p>
                            ${food.description}
                        </p>
                    </div>

                    <span class="food-price">
                        ₹${food.price}
                    </span>

                </div>

            </article>
        `;

    }).join("");
}

function addToCart(id) {

    const existing = cart.find(
        item => item.id === id
    );

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            id,
            quantity: 1
        });
    }

    saveCart();
    updateCart();

    const food = foods.find(
        item => item.id === id
    );

    showToast(`${food.name} added to cart`);

    openCartPanel();
}

function updateQuantity(id, amount) {

    const item = cart.find(
        item => item.id === id
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(
            item => item.id !== id
        );
    }

    saveCart();
    updateCart();
}

function removeItem(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();
    updateCart();

    showToast("Item removed");
}

function updateCart() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = count;

    if (!cart.length) {

        cartContent.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>
                    Add something delicious.
                </p>

            </div>
        `;

        cartTotal.textContent = "₹0";

        return;
    }

    let total = 0;

    cartContent.innerHTML = cart.map(item => {

        const food = foods.find(
            food => food.id === item.id
        );

        const itemTotal =
            food.price * item.quantity;

        total += itemTotal;

        return `
            <div class="cart-item">

                <img
                    src="${food.video ? "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80" : food.image}"
                    alt="${food.name}"
                >

                <div>

                    <h4>
                        ${food.name}
                    </h4>

                    <div class="cart-item-price">
                        ₹${itemTotal}
                    </div>

                    <div class="quantity">

                        <button
                            onclick="updateQuantity(${food.id}, -1)"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            onclick="updateQuantity(${food.id}, 1)"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove"
                    onclick="removeItem(${food.id})"
                >
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

    }).join("");

    cartTotal.textContent = `₹${total}`;
}

function saveCart() {

    localStorage.setItem(
        "foodhubCart",
        JSON.stringify(cart)
    );
}

function openCartPanel() {

    cartPanel.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeCartPanel() {

    cartPanel.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.style.overflow = "";
}

document.getElementById("openCart")
    .addEventListener(
        "click",
        openCartPanel
    );

document.getElementById("closeCart")
    .addEventListener(
        "click",
        closeCartPanel
    );

cartOverlay.addEventListener(
    "click",
    closeCartPanel
);

document.querySelectorAll(".filter")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter")
                    .forEach(btn => {
                        btn.classList.remove("active");
                    });

                button.classList.add("active");

                renderFoods(
                    button.dataset.filter
                );

            }
        );

    });

const searchPanel =
    document.getElementById("searchPanel");

const searchInput =
    document.getElementById("searchInput");

const searchResults =
    document.getElementById("searchResults");

document.getElementById("openSearch")
    .addEventListener(
        "click",
        () => {

            searchPanel.classList.add("active");

            document.body.style.overflow = "hidden";

            setTimeout(
                () => searchInput.focus(),
                300
            );

        }
    );

document.getElementById("closeSearch")
    .addEventListener(
        "click",
        closeSearch
    );

function closeSearch() {

    searchPanel.classList.remove("active");

    document.body.style.overflow = "";

    searchInput.value = "";

    searchResults.innerHTML = "";
}

searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();

        if (!query) {

            searchResults.innerHTML = "";

            return;
        }

        const results = foods.filter(food =>
            food.name
                .toLowerCase()
                .includes(query) ||
            food.category
                .toLowerCase()
                .includes(query) ||
            food.description
                .toLowerCase()
                .includes(query)
        );

        if (!results.length) {

            searchResults.innerHTML =
                "No dishes found.";

            return;
        }

        searchResults.innerHTML =
            results.map(food => `
                <div style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:15px 0;
                    border-bottom:1px solid #333;
                ">

                    <span>
                        ${food.name}
                    </span>

                    <strong style="color:#ff5b2e">
                        ₹${food.price}
                    </strong>

                </div>
            `).join("");
    }
);

document.getElementById("mobileMenu")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("mobileNav")
                .classList.toggle("active");

        }
    );

document.querySelectorAll(".mobile-nav a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                document
                    .getElementById("mobileNav")
                    .classList.remove("active");

            }
        );

    });

window.addEventListener(
    "scroll",
    () => {

        const navbar =
            document.getElementById("navbar");

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    }
);

document.getElementById("copyCode")
    .addEventListener(
        "click",
        async () => {

            try {

                await navigator.clipboard.writeText(
                    "WELCOME30"
                );

                showToast(
                    "WELCOME30 copied"
                );

            } catch {

                showToast(
                    "Code: WELCOME30"
                );

            }

        }
    );

document.getElementById("scrollStory")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("story")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );

document.getElementById("checkout")
    .addEventListener(
        "click",
        () => {

            if (!cart.length) {

                showToast(
                    "Your cart is empty"
                );

                return;
            }

            closeCartPanel();

            document
                .getElementById("orderModal")
                .classList.add("active");

        }
    );

document.getElementById("closeOrder")
    .addEventListener(
        "click",
        () => {

            document
                .getElementById("orderModal")
                .classList.remove("active");

        }
    );

document.getElementById("doneOrder")
    .addEventListener(
        "click",
        () => {

            cart = [];

            saveCart();

            updateCart();

            document
                .getElementById("orderModal")
                .classList.remove("active");

            showToast(
                "Thanks for ordering ❤️"
            );

        }
    );

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
        window.toastTimeout
    );

    window.toastTimeout =
        setTimeout(
            () => {
                toast.classList.remove("show");
            },
            2500
        );
}

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeSearch();

            closeCartPanel();

            document
                .getElementById("orderModal")
                .classList.remove("active");

            document.body.style.overflow = "";

        }

    }
);

renderFoods();
updateCart();