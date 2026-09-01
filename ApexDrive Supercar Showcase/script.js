const cars = [
    {
        id: 1,
        brand: "Ferrari",
        name: "SF90 Stradale",
        year: "2024",
        power: "986 HP",
        speed: "340 KM/H",
        zero: "2.5s",
        engine: "V8 HYBRID",
        image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=1600&q=90",
        description: "A technological masterpiece combining Ferrari's V8 engine with hybrid electric power for extraordinary acceleration and control."
    },
    {
        id: 2,
        brand: "Lamborghini",
        name: "Revuelto",
        year: "2024",
        power: "1,001 HP",
        speed: "350 KM/H",
        zero: "2.5s",
        engine: "V12 HYBRID",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1600&q=90",
        description: "A new-generation V12 flagship bringing electrified performance to Lamborghini's legendary twelve-cylinder DNA."
    },
    {
        id: 3,
        brand: "Porsche",
        name: "911 GT3 RS",
        year: "2024",
        power: "518 HP",
        speed: "296 KM/H",
        zero: "3.2s",
        engine: "4.0 FLAT-6",
        image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=90",
        description: "A road-legal track weapon built around aerodynamic efficiency, lightweight engineering and surgical precision."
    },
    {
        id: 4,
        brand: "McLaren",
        name: "750S",
        year: "2024",
        power: "740 HP",
        speed: "332 KM/H",
        zero: "2.8s",
        engine: "4.0 V8",
        image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?auto=format&fit=crop&w=1600&q=90",
        description: "McLaren's lightweight supercar delivering explosive acceleration with an obsessive focus on driver engagement."
    },
    {
        id: 5,
        brand: "Ferrari",
        name: "296 GTB",
        year: "2024",
        power: "819 HP",
        speed: "330 KM/H",
        zero: "2.9s",
        engine: "V6 HYBRID",
        image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1600&q=90",
        description: "A compact Ferrari blending a high-revving V6 with electric performance and exceptional agility."
    },
    {
        id: 6,
        brand: "Lamborghini",
        name: "Huracán STO",
        year: "2024",
        power: "631 HP",
        speed: "310 KM/H",
        zero: "3.0s",
        engine: "V10",
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=90",
        description: "A road-legal race-inspired Lamborghini engineered for maximum involvement and aerodynamic performance."
    }
];

let activeBrand = "all";
let favorites = JSON.parse(localStorage.getItem("apexFavorites")) || [];
let comparison = [];

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {

    setTimeout(() => {
        loader.classList.add("loaded");
    }, 1700);

});

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

window.addEventListener("mousemove", event => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

});

function animateCursor() {

    ringX += (mouseX - ringX) * .12;
    ringY += (mouseY - ringY) * .12;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

document.querySelectorAll("a,button").forEach(element => {

    element.addEventListener("mouseenter", () => {

        cursorRing.style.width = "55px";
        cursorRing.style.height = "55px";

    });

    element.addEventListener("mouseleave", () => {

        cursorRing.style.width = "34px";
        cursorRing.style.height = "34px";

    });

});

window.addEventListener("scroll", () => {

    const scroll =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight);

    document.querySelector(".scroll-progress").style.width =
        `${scroll * 100}%`;

    document
        .querySelector(".navbar")
        .classList.toggle(
            "scrolled",
            window.scrollY > 60
        );

});

const revealObserver =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                if (
                    entry.target.classList.contains("number-card")
                ) {
                    animateNumber(entry.target);
                }

            }

        });

    }, {
        threshold: .15
    });

document
    .querySelectorAll(".reveal,.number-card")
    .forEach(element =>
        revealObserver.observe(element)
    );

function animateNumber(card) {

    const number =
        card.querySelector("[data-count]");

    if (!number || number.dataset.done) return;

    number.dataset.done = "true";

    const target =
        parseFloat(number.dataset.count);

    const decimal =
        String(target).includes(".");

    const start =
        performance.now();

    const duration = 1500;

    function update(time) {

        const progress =
            Math.min(
                (time - start) / duration,
                1
            );

        const eased =
            1 - Math.pow(1 - progress, 4);

        const value =
            target * eased;

        number.textContent =
            decimal
                ? value.toFixed(1)
                : Math.floor(value);

        if (progress < 1) {
            requestAnimationFrame(update);
        }

    }

    requestAnimationFrame(update);
}

function renderCars() {

    const grid =
        document.getElementById("carGrid");

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase();

    const filtered =
        cars.filter(car => {

            const brandMatch =
                activeBrand === "all" ||
                car.brand === activeBrand;

            const searchMatch =
                car.name
                    .toLowerCase()
                    .includes(search) ||
                car.brand
                    .toLowerCase()
                    .includes(search);

            return brandMatch && searchMatch;

        });

    grid.innerHTML = "";

    if (!filtered.length) {

        grid.innerHTML = `
            <div class="col-span-full text-center py-20">
                <div class="text-neutral-700 text-3xl">
                    <i class="fa-solid fa-car"></i>
                </div>

                <h3 class="mt-5 text-xl">
                    Machine not found
                </h3>

                <p class="text-neutral-600 text-sm mt-2">
                    Try another search.
                </p>
            </div>
        `;

        return;
    }

    filtered.forEach((car,index) => {

        const favorite =
            favorites.includes(car.id);

        const compared =
            comparison.includes(car.id);

        const card =
            document.createElement("article");

        card.className = "car-card";

        card.innerHTML = `
            <div
                class="car-image"
                onclick="openCar(${car.id})"
            >
                <img
                    src="${car.image}"
                    alt="${car.name}"
                    loading="lazy"
                >
            </div>

            <div class="car-actions">

                <button
                    class="icon-button ${favorite ? "active" : ""}"
                    onclick="toggleFavorite(event,${car.id})"
                >
                    <i class="${favorite ? "fa-solid" : "fa-regular"} fa-heart"></i>
                </button>

                <button
                    class="icon-button ${compared ? "active" : ""}"
                    onclick="toggleCompare(event,${car.id})"
                >
                    <i class="fa-solid fa-scale-balanced"></i>
                </button>

            </div>

            <div
                class="car-info"
                onclick="openCar(${car.id})"
            >

                <span class="car-brand">
                    ${car.brand} · ${car.year}
                </span>

                <h3 class="car-name">
                    ${car.name}
                </h3>

                <div class="car-specs">

                    <div>
                        <strong>${car.power}</strong>
                        <span>POWER</span>
                    </div>

                    <div>
                        <strong>${car.zero}</strong>
                        <span>0—100</span>
                    </div>

                    <div>
                        <strong>${car.speed}</strong>
                        <span>TOP SPEED</span>
                    </div>

                </div>

            </div>
        `;

        grid.appendChild(card);

        setTimeout(() => {
            card.classList.add("visible");
        }, index * 90);

        addTilt(card);

    });
}

function addTilt(card) {

    card.addEventListener("mousemove", event => {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const rotateX =
            ((y - rect.height / 2) /
            (rect.height / 2)) * -4;

        const rotateY =
            ((x - rect.width / 2) /
            (rect.width / 2)) * 4;

        card.style.transform =
            `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-5px)
            scale(1.015)
            `;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)";

    });

}

function setBrand(brand,button) {

    activeBrand = brand;

    document
        .querySelectorAll(".filter")
        .forEach(item =>
            item.classList.remove("active")
        );

    button.classList.add("active");

    renderCars();

}

function filterCars() {
    renderCars();
}

function toggleFavorite(event,id) {

    event.stopPropagation();

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(item =>
                item !== id
            );

        showToast("Removed from favorites");

    } else {

        favorites.push(id);

        showToast("Added to favorites");

    }

    localStorage.setItem(
        "apexFavorites",
        JSON.stringify(favorites)
    );

    updateFavoriteCount();

    renderCars();

}

function updateFavoriteCount() {

    document.getElementById("favoriteCount")
        .textContent = favorites.length;

}

function showFavorites() {

    if (!favorites.length) {

        showToast("Your garage is empty");

        return;
    }

    const favoriteCars =
        cars.filter(car =>
            favorites.includes(car.id)
        );

    const grid =
        document.getElementById("carGrid");

    grid.innerHTML = "";

    favoriteCars.forEach(car => {

        const card =
            document.createElement("article");

        card.className =
            "car-card visible";

        card.innerHTML = `
            <div
                class="car-image"
                onclick="openCar(${car.id})"
            >
                <img
                    src="${car.image}"
                    alt="${car.name}"
                >
            </div>

            <div class="car-actions">

                <button
                    class="icon-button active"
                    onclick="toggleFavorite(event,${car.id})"
                >
                    <i class="fa-solid fa-heart"></i>
                </button>

            </div>

            <div
                class="car-info"
                onclick="openCar(${car.id})"
            >

                <span class="car-brand">
                    ${car.brand} · ${car.year}
                </span>

                <h3 class="car-name">
                    ${car.name}
                </h3>

                <div class="car-specs">

                    <div>
                        <strong>${car.power}</strong>
                        <span>POWER</span>
                    </div>

                    <div>
                        <strong>${car.zero}</strong>
                        <span>0—100</span>
                    </div>

                    <div>
                        <strong>${car.speed}</strong>
                        <span>TOP SPEED</span>
                    </div>

                </div>

            </div>
        `;

        grid.appendChild(card);

        addTilt(card);

    });

    document
        .getElementById("collection")
        .scrollIntoView({
            behavior: "smooth"
        });

}

function toggleCompare(event,id) {

    event.stopPropagation();

    if (comparison.includes(id)) {

        comparison =
            comparison.filter(item =>
                item !== id
            );

        showToast("Removed from comparison");

    } else {

        if (comparison.length >= 3) {

            showToast(
                "Maximum of 3 machines"
            );

            return;
        }

        comparison.push(id);

        showToast("Added to comparison");
    }

    renderCars();
    renderComparison();

}

function renderComparison() {

    const area =
        document.getElementById("compareArea");

    if (!comparison.length) {

        area.innerHTML = `
            <div class="compare-empty">

                <div class="compare-icon">
                    <i class="fa-solid fa-scale-balanced"></i>
                </div>

                <h3>THE GRID IS EMPTY</h3>

                <p>
                    Add machines from the collection
                    to begin your comparison.
                </p>

                <a href="#collection">
                    Select a machine
                    <i class="fa-solid fa-arrow-right"></i>
                </a>

            </div>
        `;

        return;
    }

    const selected =
        cars.filter(car =>
            comparison.includes(car.id)
        );

    area.innerHTML = `
        <div class="overflow-x-auto">

            <table class="compare-table">

                <thead>

                    <tr>

                        <th>DNA</th>

                        ${selected.map(car => `
                            <th>

                                <img
                                    src="${car.image}"
                                    class="compare-image"
                                    alt="${car.name}"
                                >

                                <span class="text-neutral-500 text-xs">
                                    ${car.brand}
                                </span>

                                <div class="text-lg mt-1">
                                    ${car.name}
                                </div>

                            </th>
                        `).join("")}

                    </tr>

                </thead>

                <tbody>

                    <tr>
                        <td>POWER</td>
                        ${selected.map(car =>
                            `<td>${car.power}</td>`
                        ).join("")}
                    </tr>

                    <tr>
                        <td>0—100 KM/H</td>
                        ${selected.map(car =>
                            `<td>${car.zero}</td>`
                        ).join("")}
                    </tr>

                    <tr>
                        <td>TOP SPEED</td>
                        ${selected.map(car =>
                            `<td>${car.speed}</td>`
                        ).join("")}
                    </tr>

                    <tr>
                        <td>ENGINE</td>
                        ${selected.map(car =>
                            `<td>${car.engine}</td>`
                        ).join("")}
                    </tr>

                </tbody>

            </table>

            <button
                class="outline-button mt-5"
                onclick="clearComparison()"
            >
                Clear Grid
            </button>

        </div>
    `;

}

function clearComparison() {

    comparison = [];

    renderComparison();
    renderCars();

}

function openCar(id) {

    const car =
        cars.find(item =>
            item.id === id
        );

    document.getElementById("modalContent").innerHTML = `

        <div class="modal-car">

            <div class="modal-car-image">

                <img
                    src="${car.image}"
                    alt="${car.name}"
                >

            </div>

            <div class="modal-info">

                <span class="section-label">
                    ${car.brand} · ${car.year}
                </span>

                <h2>
                    ${car.name}
                </h2>

                <p>
                    ${car.description}
                </p>

                <div class="modal-specs">

                    <div class="modal-spec">
                        <span>POWER</span>
                        <strong>${car.power}</strong>
                    </div>

                    <div class="modal-spec">
                        <span>0—100 KM/H</span>
                        <strong>${car.zero}</strong>
                    </div>

                    <div class="modal-spec">
                        <span>TOP SPEED</span>
                        <strong>${car.speed}</strong>
                    </div>

                    <div class="modal-spec">
                        <span>ENGINE</span>
                        <strong>${car.engine}</strong>
                    </div>

                </div>

                <button
                    class="primary-button mt-5"
                    onclick="
                        toggleCompare(event,${car.id});
                        bootstrap.Modal.getInstance(
                            document.getElementById('carModal')
                        ).hide();
                    "
                >
                    Add To Comparison
                    <i class="fa-solid fa-scale-balanced"></i>
                </button>

            </div>

        </div>
    `;

    new bootstrap.Modal(
        document.getElementById("carModal")
    ).show();

}

function openFeatured() {
    openCar(3);
}

function showToast(message) {

    document.getElementById("toastText")
        .textContent = message;

    new bootstrap.Toast(
        document.getElementById("toast")
    ).show();

}

document
    .querySelectorAll(".magnetic")
    .forEach(button => {

        button.addEventListener("mousemove", event => {

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * .12}px,${y * .12}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0,0)";

        });

    });

const heroVideo =
    document.querySelector(".hero-video");

window.addEventListener("scroll", () => {

    if (!heroVideo) return;

    const offset =
        Math.min(
            window.scrollY,
            window.innerHeight
        );

    heroVideo.style.transform =
        `scale(1.05) translateY(${offset * .07}px)`;

});

renderCars();
updateFavoriteCount();
renderComparison();