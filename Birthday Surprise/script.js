const introScreen =
    document.getElementById("introScreen");

const birthdayPage =
    document.getElementById("birthdayPage");

const nameInput =
    document.getElementById("nameInput");

const startButton =
    document.getElementById("startButton");

const errorMessage =
    document.getElementById("errorMessage");

const personName =
    document.getElementById("personName");

const wishName =
    document.getElementById("wishName");

const bouquetName =
    document.getElementById("bouquetName");

const finalName =
    document.getElementById("finalName");

const footerName =
    document.getElementById("footerName");

const surpriseButton =
    document.getElementById("surpriseButton");

const birthdayMusic =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

const birthdayVideo =
    document.getElementById("birthdayVideo");

const fireworksVideo =
    document.getElementById("fireworksVideo");

const cakeWishButton =
    document.getElementById("cakeWishButton");

const giftBox =
    document.getElementById("giftBox");

const giftHint =
    document.getElementById("giftHint");

const bouquetOverlay =
    document.getElementById("bouquetOverlay");

const closeBouquet =
    document.getElementById("closeBouquet");

const bouquetWishButton =
    document.getElementById("bouquetWishButton");

const confettiContainer =
    document.getElementById("confettiContainer");

const fireworksContainer =
    document.getElementById("fireworksContainer");

const fireworksSection =
    document.getElementById("fireworksSection");

let musicStarted = false;
let wishGranted = false;

function startBirthday() {

    const name =
        nameInput.value.trim();

    if (!name) {

        errorMessage.classList.add("show");

        nameInput.focus();

        return;
    }

    errorMessage.classList.remove("show");

    const formattedName =
        name.charAt(0).toUpperCase() +
        name.slice(1);

    personName.textContent =
        formattedName;

    wishName.textContent =
        formattedName;

    bouquetName.textContent =
        formattedName;

    finalName.textContent =
        formattedName;

    footerName.textContent =
        formattedName;

    introScreen.classList.add("hide");

    birthdayPage.classList.remove("hidden");

    birthdayVideo.currentTime = 0;

    birthdayVideo.play().catch(function() {});

    fireworksVideo.pause();

    fireworksVideo.currentTime = 0;

    createConfetti(120);

    birthdayMusic.volume = 0.5;

    birthdayMusic.currentTime = 0;

    const musicPromise =
        birthdayMusic.play();

    if (musicPromise !== undefined) {

        musicPromise
            .then(function() {

                musicStarted = true;

                musicButton.textContent =
                    "🔊";

            })
            .catch(function() {

                musicStarted = false;

                musicButton.textContent =
                    "🔇";

            });

    }
}

startButton.addEventListener(
    "click",
    startBirthday
);

nameInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            startBirthday();

        }

    }
);

musicButton.addEventListener(
    "click",
    function() {

        if (birthdayMusic.paused) {

            birthdayMusic
                .play()
                .then(function() {

                    musicStarted = true;

                    musicButton.textContent =
                        "🔊";

                })
                .catch(function() {

                    musicButton.textContent =
                        "🔇";

                });

        } else {

            birthdayMusic.pause();

            musicStarted = false;

            musicButton.textContent =
                "🔇";

        }

    }
);

surpriseButton.addEventListener(
    "click",
    function() {

        document
            .querySelector(".cake-section")
            .scrollIntoView({
                behavior: "smooth"
            });

        createConfetti(100);

    }
);

giftBox.addEventListener(
    "click",
    function() {

        giftBox.classList.add("open");

        giftHint.textContent =
            "💐 A bouquet just for you!";

        setTimeout(
            function() {

                bouquetOverlay.classList.add(
                    "show"
                );

            },
            450
        );

        createConfetti(80);

    }
);

closeBouquet.addEventListener(
    "click",
    function() {

        bouquetOverlay.classList.remove(
            "show"
        );

    }
);

bouquetOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            bouquetOverlay
        ) {

            bouquetOverlay.classList.remove(
                "show"
            );

        }

    }
);

function makeWish() {

    if (wishGranted) {
        return;
    }

    wishGranted = true;

    const flames =
        document.querySelectorAll(
            ".flame"
        );

    flames.forEach(
        function(flame, index) {

            setTimeout(
                function() {

                    flame.classList.add(
                        "off"
                    );

                },
                index * 100
            );

        }
    );

    bouquetWishButton.textContent =
        "🎉 Wish Granted!";

    bouquetWishButton.disabled =
        true;

    bouquetWishButton.style.opacity =
        "0.9";

    createConfetti(180);

    setTimeout(
        function() {

            bouquetOverlay.classList.remove(
                "show"
            );

        },
        900
    );

    setTimeout(
        function() {

            fireworksVideo.currentTime = 0;

            fireworksVideo.play().catch(
                function() {}
            );

            createFireworks(22);

            fireworksSection.scrollIntoView({
                behavior: "smooth"
            });

        },
        1000
    );
}

bouquetWishButton.addEventListener(
    "click",
    makeWish
);

cakeWishButton.addEventListener(
    "click",
    function() {

        bouquetOverlay.classList.add(
            "show"
        );

    }
);

function createConfetti(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );

        confetti.classList.add(
            "confetti"
        );

        confetti.style.left =
            Math.random() * 100 +
            "vw";

        confetti.style.animationDelay =
            Math.random() * 1.5 +
            "s";

        confetti.style.animationDuration =
            3 +
            Math.random() * 3 +
            "s";

        const size =
            5 +
            Math.random() * 9;

        confetti.style.width =
            size + "px";

        confetti.style.height =
            size * 1.5 + "px";

        const colors = [
            "#ff5ca8",
            "#ffdd5c",
            "#74e5ff",
            "#b47cff",
            "#ffffff",
            "#72ffb6"
        ];

        confetti.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        confettiContainer.appendChild(
            confetti
        );

        setTimeout(
            function() {

                confetti.remove();

            },
            7000
        );

    }
}

function createFireworks(amount) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        setTimeout(
            createSingleFirework,
            i * 250
        );

    }
}

function createSingleFirework() {

    const x =
        10 +
        Math.random() * 80;

    const y =
        10 +
        Math.random() * 65;

    const center =
        document.createElement(
            "div"
        );

    center.classList.add(
        "firework"
    );

    center.style.left =
        x + "%";

    center.style.top =
        y + "%";

    fireworksContainer.appendChild(
        center
    );

    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const particle =
            document.createElement(
                "div"
            );

        particle.classList.add(
            "firework"
        );

        particle.style.left =
            x + "%";

        particle.style.top =
            y + "%";

        const angle =
            Math.random() *
            Math.PI *
            2;

        const distance =
            60 +
            Math.random() *
            170;

        particle.style.setProperty(
            "--x",
            `${Math.cos(angle) * distance}px`
        );

        particle.style.setProperty(
            "--y",
            `${Math.sin(angle) * distance}px`
        );

        const colors = [
            "#ff5ca8",
            "#ffd84d",
            "#74e5ff",
            "#c68cff",
            "#ffffff"
        ];

        particle.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        fireworksContainer.appendChild(
            particle
        );

        setTimeout(
            function() {

                particle.remove();

            },
            1600
        );

    }

    setTimeout(
        function() {

            center.remove();

        },
        1600
    );
}

setInterval(
    function() {

        if (
            introScreen.classList.contains(
                "hide"
            )
        ) {

            if (
                Math.random() > 0.65
            ) {

                createConfetti(8);

            }

        }

    },
    2500
);

document.addEventListener(
    "mousemove",
    function(event) {

        if (
            !introScreen.classList.contains(
                "hide"
            )
        ) {
            return;
        }

        if (
            Math.random() > 0.9
        ) {

            const sparkle =
                document.createElement(
                    "div"
                );

            sparkle.style.position =
                "fixed";

            sparkle.style.left =
                event.clientX + "px";

            sparkle.style.top =
                event.clientY + "px";

            sparkle.style.width =
                "5px";

            sparkle.style.height =
                "5px";

            sparkle.style.borderRadius =
                "50%";

            sparkle.style.background =
                "white";

            sparkle.style.pointerEvents =
                "none";

            sparkle.style.zIndex =
                "200";

            sparkle.style.boxShadow =
                "0 0 12px #fff";

            document.body.appendChild(
                sparkle
            );

            sparkle.animate(
                [
                    {
                        opacity: 1,
                        transform: "scale(1)"
                    },
                    {
                        opacity: 0,
                        transform:
                            "scale(0) translateY(-20px)"
                    }
                ],
                {
                    duration: 700,
                    easing: "ease-out"
                }
            );

            setTimeout(
                function() {

                    sparkle.remove();

                },
                700
            );

        }

    }
);