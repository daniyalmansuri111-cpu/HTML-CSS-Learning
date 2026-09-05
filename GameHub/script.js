const games = [
    {
        title: "Cyberpunk 2077",
        category: "RPG",
        rating: "4.8",
        price: "$59.99",
        year: "2020",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg",
        description: "Explore Night City in a massive open-world action RPG where your choices shape the story."
    },
    {
        title: "Red Dead Redemption 2",
        category: "Adventure",
        rating: "4.9",
        price: "$59.99",
        year: "2019",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1174180/header.jpg",
        description: "Experience an epic western adventure across a huge and beautifully detailed open world."
    },
    {
        title: "Elden Ring",
        category: "RPG",
        rating: "4.9",
        price: "$59.99",
        year: "2022",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg",
        description: "Explore the mysterious Lands Between and face challenging enemies in an unforgettable fantasy adventure."
    },
    {
        title: "Grand Theft Auto V",
        category: "Action",
        rating: "4.8",
        price: "$29.99",
        year: "2015",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/271590/header.jpg",
        description: "Explore Los Santos and experience an action-packed open-world crime adventure."
    },
    {
        title: "The Witcher 3",
        category: "RPG",
        rating: "4.9",
        price: "$39.99",
        year: "2015",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/292030/header.jpg",
        description: "Become Geralt of Rivia and hunt monsters across a vast fantasy world."
    },
    {
        title: "Forza Horizon 5",
        category: "Racing",
        rating: "4.7",
        price: "$59.99",
        year: "2021",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1551360/header.jpg",
        description: "Race across the stunning landscapes of Mexico in an open-world racing experience."
    },
    {
        title: "Hogwarts Legacy",
        category: "Adventure",
        rating: "4.6",
        price: "$59.99",
        year: "2023",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/header.jpg",
        description: "Experience life as a student at Hogwarts and uncover an exciting magical adventure."
    },
    {
        title: "God of War",
        category: "Action",
        rating: "4.8",
        price: "$49.99",
        year: "2022",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1593500/header.jpg",
        description: "Join Kratos and Atreus on a powerful journey through the Norse realms."
    },
    {
        title: "Marvel's Spider-Man",
        category: "Action",
        rating: "4.8",
        price: "$59.99",
        year: "2022",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1817070/header.jpg",
        description: "Swing through New York City and experience the life of Spider-Man."
    },
    {
        title: "Horizon Zero Dawn",
        category: "Adventure",
        rating: "4.7",
        price: "$49.99",
        year: "2020",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1151640/header.jpg",
        description: "Explore a beautiful world filled with mysterious machines and ancient secrets."
    },
    {
        title: "Dying Light 2",
        category: "Action",
        rating: "4.4",
        price: "$49.99",
        year: "2022",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/534380/header.jpg",
        description: "Survive a dangerous zombie apocalypse using parkour and brutal combat."
    },
    {
        title: "Resident Evil 4",
        category: "Action",
        rating: "4.8",
        price: "$59.99",
        year: "2023",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2050650/header.jpg",
        description: "Survive a terrifying mission filled with enemies, mysteries and horror."
    },
    {
        title: "Sekiro",
        category: "Action",
        rating: "4.9",
        price: "$59.99",
        year: "2019",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/814380/header.jpg",
        description: "Master the blade and fight your way through a dangerous Japanese-inspired world."
    },
    {
        title: "Assassin's Creed Odyssey",
        category: "Adventure",
        rating: "4.6",
        price: "$59.99",
        year: "2018",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/812140/header.jpg",
        description: "Travel across ancient Greece and shape your own legendary journey."
    },
    {
        title: "Need for Speed Heat",
        category: "Racing",
        rating: "4.3",
        price: "$69.99",
        year: "2019",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1222680/header.jpg",
        description: "Race through Palm City and build your reputation both day and night."
    },
    {
        title: "F1 24",
        category: "Racing",
        rating: "4.1",
        price: "$69.99",
        year: "2024",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2488620/header.jpg",
        description: "Experience the speed and intensity of Formula 1 racing."
    },
    {
        title: "EA Sports FC 24",
        category: "Sports",
        rating: "4.2",
        price: "$69.99",
        year: "2023",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/header.jpg",
        description: "Build your dream football team and compete across multiple game modes."
    },
    {
        title: "NBA 2K25",
        category: "Sports",
        rating: "4.1",
        price: "$69.99",
        year: "2024",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2878980/header.jpg",
        description: "Experience competitive basketball with realistic gameplay and career modes."
    },
    {
        title: "TEKKEN 8",
        category: "Action",
        rating: "4.6",
        price: "$69.99",
        year: "2024",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/header.jpg",
        description: "Enter the King of Iron Fist Tournament and master powerful fighters."
    },
    {
        title: "Baldur's Gate 3",
        category: "RPG",
        rating: "4.9",
        price: "$59.99",
        year: "2023",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg",
        description: "Create your own hero and embark on an unforgettable fantasy adventure."
    },
    {
        title: "Monster Hunter Wilds",
        category: "Adventure",
        rating: "4.5",
        price: "$69.99",
        year: "2025",
        image: "https://cdn.cloudflare.steamstatic.com/steam/apps/2246340/header.jpg",
        description: "Hunt massive monsters and explore a living, evolving wilderness."
    }
];

const gameGrid = document.getElementById("gameGrid");
const searchInput = document.getElementById("searchInput");
const categories = document.querySelectorAll(".category");
const emptyState = document.getElementById("emptyState");
const wishlistCount = document.getElementById("wishlistCount");
const mobileMenu = document.getElementById("mobileMenu");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const exploreButton = document.getElementById("exploreButton");
const seeAllButton = document.getElementById("seeAllButton");
const multiplayerButton = document.getElementById("multiplayerButton");
const heroVideo = document.getElementById("heroVideo");
const heroDetailsButton = document.getElementById("heroDetailsButton");
const gameModal = document.getElementById("gameModal");
const modalClose = document.getElementById("modalClose");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalRating = document.getElementById("modalRating");
const modalYear = document.getElementById("modalYear");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalWishlist = document.getElementById("modalWishlist");
const wishlistLink = document.getElementById("wishlistLink");

let wishlist = [];
let selectedGame = null;

function displayGames(gameList) {

    gameGrid.innerHTML = "";

    if (gameList.length === 0) {
        emptyState.style.display = "block";
        return;
    }

    emptyState.style.display = "none";

    gameList.forEach((game) => {

        const card = document.createElement("article");

        card.className = "game-card";

        const isSaved = wishlist.includes(game.title);

        card.innerHTML = `
            <div class="game-image">

                <img
                    src="${game.image}"
                    alt="${game.title}"
                    loading="lazy"
                >

                <div class="image-overlay"></div>

                <div class="rating">
                    ★ ${game.rating}
                </div>

                <button
                    class="wishlist ${isSaved ? "saved" : ""}"
                    aria-label="Add ${game.title} to wishlist"
                >
                    ${isSaved ? "♥" : "♡"}
                </button>

            </div>

            <div class="game-body">

                <div class="game-title-row">

                    <h3 class="game-title">
                        ${game.title}
                    </h3>

                    <span class="game-price">
                        ${game.price}
                    </span>

                </div>

                <div class="game-details">

                    <span>
                        ${game.category}
                    </span>

                    <span>
                        ${game.year}
                    </span>

                </div>

            </div>
        `;

        const wishlistButton =
            card.querySelector(".wishlist");

        wishlistButton.addEventListener(
            "click",
            function(event) {

                event.stopPropagation();

                toggleWishlist(game.title);

            }
        );

        card.addEventListener(
            "click",
            function() {

                openGameModal(game);

            }
        );

        gameGrid.appendChild(card);

    });
}

categories.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categories.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            const category =
                button.dataset.category;

            if (category === "All") {
                displayGames(games);
                return;
            }

            const filteredGames =
                games.filter(
                    game =>
                        game.category === category
                );

            displayGames(filteredGames);

        }
    );

});

searchInput.addEventListener(
    "input",
    () => {

        const searchTerm =
            searchInput.value
                .toLowerCase()
                .trim();

        const filteredGames =
            games.filter(game =>
                game.title
                    .toLowerCase()
                    .includes(searchTerm)
                ||
                game.category
                    .toLowerCase()
                    .includes(searchTerm)
            );

        displayGames(filteredGames);

    }
);

function toggleWishlist(title) {

    if (wishlist.includes(title)) {

        wishlist =
            wishlist.filter(
                item =>
                    item !== title
            );

    } else {

        wishlist.push(title);

    }

    updateWishlistCount();

    refreshCurrentGames();

    updateModalWishlist();
}

function updateWishlistCount() {

    wishlistCount.textContent =
        wishlist.length;

}

function refreshCurrentGames() {

    const activeCategory =
        document
            .querySelector(".category.active")
            .dataset.category;

    let currentGames = games;

    if (activeCategory !== "All") {

        currentGames =
            games.filter(
                game =>
                    game.category ===
                    activeCategory
            );

    }

    const searchTerm =
        searchInput.value
            .toLowerCase()
            .trim();

    if (searchTerm) {

        currentGames =
            currentGames.filter(game =>
                game.title
                    .toLowerCase()
                    .includes(searchTerm)
                ||
                game.category
                    .toLowerCase()
                    .includes(searchTerm)
            );

    }

    displayGames(currentGames);

}

function openGameModal(game) {

    selectedGame = game;

    modalImage.style.backgroundImage =
        `url("${game.image}")`;

    modalTitle.textContent =
        game.title;

    modalCategory.textContent =
        game.category;

    modalRating.textContent =
        `★ ${game.rating}`;

    modalYear.textContent =
        game.year;

    modalPrice.textContent =
        game.price;

    modalDescription.textContent =
        game.description;

    updateModalWishlist();

    gameModal.classList.add("show");

    document.body.style.overflow =
        "hidden";
}

function closeModal() {

    gameModal.classList.remove("show");

    document.body.style.overflow =
        "";

}

function updateModalWishlist() {

    if (!selectedGame) {
        return;
    }

    const saved =
        wishlist.includes(
            selectedGame.title
        );

    modalWishlist.textContent =
        saved
            ? "♥ REMOVE FROM WISHLIST"
            : "♡ ADD TO WISHLIST";
}

modalWishlist.addEventListener(
    "click",
    () => {

        if (!selectedGame) {
            return;
        }

        toggleWishlist(
            selectedGame.title
        );

    }
);

modalClose.addEventListener(
    "click",
    closeModal
);

gameModal.addEventListener(
    "click",
    event => {

        if (event.target === gameModal) {
            closeModal();
        }

    }
);

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {
            closeModal();
        }

    }
);

heroDetailsButton.addEventListener(
    "click",
    () => {

        const cyberpunk =
            games.find(
                game =>
                    game.title ===
                    "Cyberpunk 2077"
            );

        openGameModal(cyberpunk);

    }
);

exploreButton.addEventListener(
    "click",
    () => {

        document
            .getElementById("discover")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

seeAllButton.addEventListener(
    "click",
    () => {

        categories.forEach(btn => {
            btn.classList.remove("active");
        });

        categories[0].classList.add("active");

        searchInput.value = "";

        displayGames(games);

        document
            .getElementById("discover")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

multiplayerButton.addEventListener(
    "click",
    () => {

        categories.forEach(btn => {
            btn.classList.remove("active");
        });

        categories[0].classList.add("active");

        searchInput.value = "";

        displayGames(games);

        document
            .getElementById("discover")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

wishlistLink.addEventListener(
    "click",
    event => {

        event.preventDefault();

        const wishlistGames =
            games.filter(
                game =>
                    wishlist.includes(
                        game.title
                    )
            );

        categories.forEach(btn => {
            btn.classList.remove("active");
        });

        displayGames(wishlistGames);

        document
            .getElementById("discover")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);

mobileMenu.addEventListener(
    "click",
    () => {

        sidebar.classList.add("open");

        overlay.classList.add("active");

    }
);

overlay.addEventListener(
    "click",
    () => {

        sidebar.classList.remove("open");

        overlay.classList.remove("active");

    }
);

document
    .querySelectorAll(".menu-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                sidebar.classList.remove("open");

                overlay.classList.remove("active");

            }
        );

    });

document.addEventListener(
    "keydown",
    event => {

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);

window.addEventListener(
    "load",
    () => {

        heroVideo.muted = true;

        heroVideo.play()
            .catch(() => {});

    }
);

heroVideo.addEventListener(
    "canplay",
    () => {

        heroVideo.play()
            .catch(() => {});

    }
);

heroVideo.addEventListener(
    "error",
    () => {

        console.error(
            "Unable to load cyberpunk.mp4"
        );

    }
);

displayGames(games);

updateWishlistCount();