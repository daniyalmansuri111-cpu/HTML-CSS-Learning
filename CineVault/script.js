const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const themeToggle = document.getElementById("themeToggle");
const surpriseBtn = document.getElementById("surpriseBtn");
const exploreBtn = document.getElementById("exploreBtn");
const viewAllBtn = document.getElementById("viewAllBtn");
const movieSectionTitle = document.getElementById("movieSectionTitle");
const noResults = document.getElementById("noResults");
const regionCards = document.querySelectorAll(".region-card");

const movies = [
    {
        title: "Parasite",
        year: 2019,
        genre: "Thriller",
        rating: 8.5,
        region: "korean",
        badge: "KOREAN",
        image: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
    },
    {
        title: "Oldboy",
        year: 2003,
        genre: "Thriller",
        rating: 8.1,
        region: "korean",
        badge: "KOREAN",
        image: "https://image.tmdb.org/t/p/w500/sdwjQEM869JFwMytTmvr6ggvaUl.jpg"
    },
    {
        title: "Memories of Murder",
        year: 2003,
        genre: "Crime",
        rating: 8.1,
        region: "korean",
        badge: "KOREAN",
        image: "https://image.tmdb.org/t/p/w500/fz5NYI8PUmPplu3UA70AOqEDJL7.jpg"
    },

    {
        title: "3 Idiots",
        year: 2009,
        genre: "Comedy",
        rating: 8.4,
        region: "indian",
        badge: "INDIAN",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSW5tXcNZgPHs6j1UwF9M7l2Sn3sa9dNvmEhg7FD7Zjg&s=10"
    },
    {
        title: "Dangal",
        year: 2016,
        genre: "Drama",
        rating: 8.3,
        region: "indian",
        badge: "INDIAN",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAxp7zi6TKNvrY48-HC8I4ggfEk5BDRvb7EA0XLbXpuw&s=10https://image.tmdb.org/t/p/w500/p2lV4e3sQwXq3ZQ4V2s2n4JQmVv.jpg"
    },
    {
        title: "Dilwale Dulhania Le Jayenge",
        year: 1995,
        genre: "Romance",
        rating: 8.5,
        region: "indian",
        badge: "INDIAN",
        image: "https://image.tmdb.org/t/p/w500/lfRkUr7DYdHldAqi3PwdQGBRBPM.jpg"
    },

    {
        title: "Interstellar",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.7,
        region: "american",
        badge: "HOLLYWOOD",
        image: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
        title: "Inception",
        year: 2010,
        genre: "Thriller",
        rating: 8.8,
        region: "american",
        badge: "HOLLYWOOD",
        image: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg"
    },
    {
        title: "The Dark Knight",
        year: 2008,
        genre: "Action",
        rating: 9.0,
        region: "american",
        badge: "HOLLYWOOD",
        image: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
    {
        title: "Oppenheimer",
        year: 2023,
        genre: "Drama",
        rating: 8.6,
        region: "american",
        badge: "HOLLYWOOD",
        image: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"
    },
    {
        title: "Avengers: Endgame",
        year: 2019,
        genre: "Action",
        rating: 8.4,
        region: "american",
        badge: "HOLLYWOOD",
        image: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
    },
    {
        title: "Spider-Man: No Way Home",
        year: 2021,
        genre: "Action",
        rating: 8.2,
        region: "american",
        badge: "HOLLYWOOD",
        image: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"
    },
    {
        title: "Dune: Part Two",
        year: 2024,
        genre: "Sci-Fi",
        rating: 8.6,
        region: "american",
        badge: "HOLLYWOOD",
        image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"
    },
    {
        title: "Joker",
        year: 2019,
        genre: "Drama",
        rating: 8.4,
        region: "american",
        badge: "HOLLYWOOD",
        image: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
    },

    {
        title: "Your Name",
        year: 2016,
        genre: "Romance",
        rating: 8.5,
        region: "japanese",
        badge: "JAPANESE",
        image: "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg"
    },
    {
        title: "Spirited Away",
        year: 2001,
        genre: "Fantasy",
        rating: 8.5,
        region: "japanese",
        badge: "JAPANESE",
        image: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg"
    },
    {
        title: "Princess Mononoke",
        year: 1997,
        genre: "Fantasy",
        rating: 8.3,
        region: "japanese",
        badge: "JAPANESE",
        image: "https://image.tmdb.org/t/p/w500/cMYCDADoLKLbB83g4WnJegaZimC.jpg"
    },

    {
        title: "The Wandering Earth II",
        year: 2023,
        genre: "Sci-Fi",
        rating: 7.2,
        region: "chinese",
        badge: "CHINESE",
        image: "https://image.tmdb.org/t/p/w500/pR858ihc6Ls9xohpdRJVjV787ml.jpg"
    },
    {
        title: "In the Mood for Love",
        year: 2000,
        genre: "Romance",
        rating: 8.1,
        region: "chinese",
        badge: "CHINESE",
        image: "https://image.tmdb.org/t/p/w500/9iciwUJTFBbjnmwfgkg6jmt8zHa.jpg"
    },

    {
        title: "Harry Potter and the Philosopher's Stone",
        year: 2001,
        genre: "Fantasy",
        rating: 7.6,
        region: "british",
        badge: "BRITISH",
        image: "https://image.tmdb.org/t/p/w500/fbxQ44VRdM2PVzHSNajUseUteem.jpg"
    },
    {
        title: "1917",
        year: 2019,
        genre: "War",
        rating: 8.2,
        region: "british",
        badge: "BRITISH",
        image: "https://image.tmdb.org/t/p/w500/iZf0KyrE25z1sage4SYFLCCrMi9.jpg"
    }
];

let selectedRegion = "all";

const regionNames = {
    all: "Popular Movies",
    korean: "Korean Movies",
    indian: "Indian Movies",
    american: "Hollywood Movies",
    japanese: "Japanese Movies",
    chinese: "Chinese Movies",
    british: "British Movies"
};

function createMovieCard(movie) {
    return `
        <article
            class="movie-card"
            data-region="${movie.region}"
            data-title="${movie.title.toLowerCase()}"
        >

            <div
                class="movie-image"
                style="background-image: url('${movie.image}');"
            >

                <span class="movie-badge">
                    ${movie.badge}
                </span>

                <button
                    class="favorite-btn"
                    data-title="${movie.title}"
                >
                    ♡
                </button>

                <div class="movie-hover">

                    <button
                        class="play-btn"
                        data-title="${movie.title}"
                    >
                        ▶
                    </button>

                </div>

            </div>

            <div class="movie-info">

                <h3>
                    ${movie.title}
                </h3>

                <div class="movie-meta">

                    <span>
                        ${movie.year}
                    </span>

                    <span>
                        •
                    </span>

                    <span>
                        ${movie.genre}
                    </span>

                </div>

                <div class="rating">
                    ⭐
                    <strong>
                        ${movie.rating}
                    </strong>
                </div>

            </div>

        </article>
    `;
}

function renderMovies() {
    const searchValue = searchInput.value
        .toLowerCase()
        .trim();

    const filteredMovies = movies.filter((movie) => {

        const matchesRegion =
            selectedRegion === "all" ||
            movie.region === selectedRegion;

        const matchesSearch =
            movie.title
                .toLowerCase()
                .includes(searchValue);

        return matchesRegion && matchesSearch;
    });

    movieGrid.innerHTML = filteredMovies
        .map(createMovieCard)
        .join("");

    movieSectionTitle.textContent =
        searchValue
            ? `Results for "${searchInput.value}"`
            : regionNames[selectedRegion];

    noResults.style.display =
        filteredMovies.length === 0
            ? "block"
            : "none";

    addMovieEvents();
}

function addMovieEvents() {

    document
        .querySelectorAll(".favorite-btn")
        .forEach((button) => {

            const movieTitle =
                button.dataset.title;

            const favorites =
                JSON.parse(
                    localStorage.getItem(
                        "cinevault-favorites"
                    )
                ) || [];

            if (favorites.includes(movieTitle)) {
                button.classList.add("liked");
                button.textContent = "♥";
            }

            button.addEventListener(
                "click",
                () => {

                    let favorites =
                        JSON.parse(
                            localStorage.getItem(
                                "cinevault-favorites"
                            )
                        ) || [];

                    if (
                        favorites.includes(
                            movieTitle
                        )
                    ) {

                        favorites =
                            favorites.filter(
                                (title) =>
                                    title !== movieTitle
                            );

                        button.classList.remove(
                            "liked"
                        );

                        button.textContent = "♡";

                    } else {

                        favorites.push(
                            movieTitle
                        );

                        button.classList.add(
                            "liked"
                        );

                        button.textContent = "♥";
                    }

                    localStorage.setItem(
                        "cinevault-favorites",
                        JSON.stringify(
                            favorites
                        )
                    );
                }
            );
        });


    document
        .querySelectorAll(".play-btn")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const title =
                        button.dataset.title;

                    alert(
                        `🎬 Trailer for "${title}" coming soon!`
                    );
                }
            );
        });
}

regionCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            selectedRegion =
                card.dataset.regionFilter;

            regionCards.forEach(
                (item) =>
                    item.classList.remove(
                        "active"
                    )
            );

            card.classList.add("active");

            searchInput.value = "";

            renderMovies();

            document
                .getElementById("movies")
                .scrollIntoView({
                    behavior: "smooth"
                });
        }
    );
});


searchBtn.addEventListener(
    "click",
    () => {
        selectedRegion = "all";

        regionCards.forEach(
            (card) =>
                card.classList.remove(
                    "active"
                )
        );

        renderMovies();
    }
);


searchInput.addEventListener(
    "input",
    () => {
        renderMovies();
    }
);


searchInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {
            searchBtn.click();
        }

    }
);


viewAllBtn.addEventListener(
    "click",
    () => {

        selectedRegion = "all";

        searchInput.value = "";

        regionCards.forEach(
            (card) =>
                card.classList.remove(
                    "active"
                )
        );

        renderMovies();

        document
            .getElementById("movies")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
);


exploreBtn.addEventListener(
    "click",
    () => {

        document
            .getElementById("movies")
            .scrollIntoView({
                behavior: "smooth"
            });
    }
);


surpriseBtn.addEventListener(
    "click",
    () => {

        const visibleMovies =
            Array.from(
                document.querySelectorAll(
                    ".movie-card"
                )
            );

        if (!visibleMovies.length) {
            return;
        }

        const randomMovie =
            visibleMovies[
                Math.floor(
                    Math.random() *
                    visibleMovies.length
                )
            ];

        randomMovie.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        randomMovie.style.transform =
            "scale(1.04)";

        setTimeout(() => {
            randomMovie.style.transform =
                "";
        }, 1000);
    }
);


themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );

        const isLight =
            document.body.classList.contains(
                "light"
            );

        themeToggle.textContent =
            isLight ? "🌙" : "☀️";

        localStorage.setItem(
            "cinevault-theme",
            isLight ? "light" : "dark"
        );
    }
);


const savedTheme =
    localStorage.getItem(
        "cinevault-theme"
    );

if (savedTheme === "light") {

    document.body.classList.add(
        "light"
    );

    themeToggle.textContent = "🌙";
}


document
    .querySelector(
        '.region-card[data-region-filter="all"]'
    )
    .classList.add("active");


renderMovies();