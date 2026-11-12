const screenshots = document.getElementById("screenshots");
const gameplayShowcase = document.getElementById("gameplayShowcase");
const screenshotPrevious = screenshots.querySelector(".screenshot-arrow.previous");
const screenshotNext = screenshots.querySelector(".screenshot-arrow.next");
const gameDescription = document.getElementById("gameDescription");
const devlog = document.getElementById("devlog");
const skills = document.getElementById("habilidades");
const artZoomOverlay = document.getElementById("art_zoom_overlay");
const artZoomImg = document.getElementById("art_zoom_img");
const header = document.querySelector("header");
const menuToggle = header.querySelector(".menu-toggle");
const navigation = header.querySelector("#main-navigation");
const mobileNavigationQuery = window.matchMedia("(max-width: 1100px)");

const createSlideIndicators = (container, slideCount, onSelect) => {
    const buttons = Array.from({ length: slideCount }, (_, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-label", `Mostrar imagen ${index + 1}`);
        button.addEventListener("click", () => onSelect(index));
        container.append(button);
        return button;
    });

    return {
        setActiveSlide: (activeIndex) => {
            buttons.forEach((button, index) => {
                if (index === activeIndex) {
                    button.setAttribute("aria-current", "true");
                } else {
                    button.removeAttribute("aria-current");
                }
            });
        }
    };
};

if (!(gameplayShowcase instanceof HTMLImageElement) ||
    !(screenshotPrevious instanceof HTMLButtonElement) ||
    !(screenshotNext instanceof HTMLButtonElement) ||
    !(gameDescription instanceof HTMLDivElement)) {
    throw new Error("No se pudo inicializar el carrusel de imágenes de Nest Invaders.");
}

const gameSlides = [
    {
        src: "images/screenshots/gameplay.gif",
        alt: "Gameplay de Nest Invaders",
        title: "Una colmena en peligro",
        description: "Explora el campo de batalla, reúne recursos y prepara tus defensas antes de que avance la amenaza enemiga."
    },
    {
        src: "images/screenshots/screenshot_1.png",
        alt: "Captura de pantalla de Nest Invaders",
        title: "Planifica tu estrategia",
        description: "Cada decisión cuenta: distribuye tus unidades con cabeza y encuentra el momento ideal para atacar."
    },
    {
        src: "images/screenshots/screenshot_2.png",
        alt: "Captura de pantalla de Nest Invaders durante una batalla",
        title: "Defiende tu territorio",
        description: "Refuerza los puntos vulnerables de la colmena y resiste las oleadas que intentan abrirse paso."
    },
    {
        src: "images/screenshots/screenshot_3.png",
        alt: "Captura de pantalla del mundo de Nest Invaders",
        title: "Conquista el reino insecto",
        description: "Avanza por un mundo lleno de rivales y lleva a tu colonia hasta la victoria."
    }
];

let activeGameSlide = 0;
const gameIndicatorsContainer = screenshots.querySelector(".slide-indicators");
if (!(gameIndicatorsContainer instanceof HTMLDivElement)) {
    throw new Error("No se pudieron inicializar los indicadores del carrusel de Nest Invaders.");
}

const gameIndicators = createSlideIndicators(
    gameIndicatorsContainer,
    gameSlides.length,
    (index) => showGameSlide(index)
);
const showGameSlide = (index) => {
    activeGameSlide = (index + gameSlides.length) % gameSlides.length;
    const slide = gameSlides[activeGameSlide];

    gameplayShowcase.src = slide.src;
    gameplayShowcase.alt = slide.alt;
    gameDescription.querySelector("h3").textContent = slide.title;
    gameDescription.querySelector("p").textContent = slide.description;
    gameIndicators.setActiveSlide(activeGameSlide);
};

gameIndicators.setActiveSlide(activeGameSlide);
screenshotPrevious.addEventListener("click", () => showGameSlide(activeGameSlide - 1));
screenshotNext.addEventListener("click", () => showGameSlide(activeGameSlide + 1));

const artGallerySlides = {
    characters: [
        { src: "images/skills/babosa.png", alt: "Render de la Babosa Recolectora" },
        { src: "images/skills/arañaOgro.png", alt: "Concept de la Araña Ogro" },
        { src: "images/screenshots/screenshot_1.png", alt: "Placeholder de personaje en el campo de batalla" }
    ],
    scenarios: [
        { src: "images/skills/bg_forest.jpeg", alt: "Escenario del bosque de Nest Invaders" },
        { src: "images/screenshots/screenshot_1.png", alt: "Placeholder de escenario de Nest Invaders" },
        { src: "images/screenshots/screenshot_2.png", alt: "Placeholder de otro escenario de Nest Invaders" }
    ],
    concepts: [
        { src: "images/skills/arañaOgro.png", alt: "Concept de la Araña Ogro" },
        { src: "images/screenshots/bocetoInicial.png", alt: "Boceto inicial de Nest Invaders" },
        { src: "images/screenshots/AlphaNestInvaders.gif", alt: "Placeholder de concepto en la etapa Alpha" }
    ],
    interface: [
        { src: "images/skills/ui.png", alt: "Render de la interfaz de Nest Invaders" },
        { src: "images/screenshots/screenshot_2.png", alt: "Placeholder de interfaz durante una partida" },
        { src: "images/screenshots/screenshot_3.png", alt: "Placeholder de otra vista de la interfaz" }
    ]
};

skills.querySelectorAll(".skills-art-images[data-art-gallery]").forEach((gallery) => {
    const galleryName = gallery.dataset.artGallery;
    const slides = artGallerySlides[galleryName];
    const image = gallery.querySelector("img");
    const previous = gallery.querySelector(".art-gallery-arrow.previous");
    const next = gallery.querySelector(".art-gallery-arrow.next");
    const indicatorsContainer = gallery.querySelector(".slide-indicators");

    if (!slides || !(image instanceof HTMLImageElement) ||
        !(previous instanceof HTMLButtonElement) || !(next instanceof HTMLButtonElement) ||
        !(indicatorsContainer instanceof HTMLDivElement)) {
        throw new Error(`No se pudo inicializar la galería de arte: ${galleryName}`);
    }

    let activeSlide = 0;
    const indicators = createSlideIndicators(
        indicatorsContainer,
        slides.length,
        (index) => showSlide(index)
    );
    const showSlide = (index) => {
        activeSlide = (index + slides.length) % slides.length;
        image.src = slides[activeSlide].src;
        image.alt = slides[activeSlide].alt;
        indicators.setActiveSlide(activeSlide);
    };

    indicators.setActiveSlide(activeSlide);
    previous.addEventListener("click", () => showSlide(activeSlide - 1));
    next.addEventListener("click", () => showSlide(activeSlide + 1));
});

const setNavigationOpen = (isOpen, returnFocus = false) => {
    navigation.classList.toggle("is-open", isOpen);
    header.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación");

    if (returnFocus) {
        menuToggle.focus();
    }
};

header.classList.add("mobile-nav-ready");
setNavigationOpen(false);

menuToggle.addEventListener("click", () => {
    setNavigationOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setNavigationOpen(false));
});

document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) {
        setNavigationOpen(false);
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setNavigationOpen(false, true);
    }
});

mobileNavigationQuery.addEventListener("change", (event) => {
    if (!event.matches) {
        setNavigationOpen(false);
    }
});

window.addEventListener("resize", () => {
    if (!mobileNavigationQuery.matches) {
        setNavigationOpen(false);
    }
});

document.querySelectorAll(".member[aria-controls]").forEach((member) => {
    const profile = document.getElementById(member.getAttribute("aria-controls"));

    if (!(profile instanceof HTMLDialogElement)) {
        throw new Error(`No se encontró el perfil del miembro: ${member.getAttribute("aria-controls")}`);
    }

    const openProfile = () => profile.showModal();

    member.addEventListener("click", openProfile);
    member.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProfile();
        }
    });

    profile.querySelector(".member-profile-close").addEventListener("click", () => profile.close());
    profile.addEventListener("click", (event) => {
        if (event.target === profile) {
            profile.close();
        }
    });
    profile.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            event.preventDefault();
            profile.close();
        }
    });
});

document.querySelectorAll(".project-card[aria-controls]").forEach((project) => {
    const profile = document.getElementById(project.getAttribute("aria-controls"));

    if (!(profile instanceof HTMLDialogElement)) {
        throw new Error(`No se encontró el panel del proyecto: ${project.getAttribute("aria-controls")}`);
    }

    project.addEventListener("click", () => profile.showModal());
    profile.querySelector(".member-profile-close").addEventListener("click", () => profile.close());
    profile.addEventListener("click", (event) => {
        if (event.target === profile) {
            profile.close();
        }
    });
    profile.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            event.preventDefault();
            profile.close();
        }
    });
});

const openArtZoom = (e) => {
    const img = e.target;

    if (!(img instanceof HTMLImageElement)) {
        return;
    }

    artZoomImg.src = img.src;
    artZoomOverlay.classList.add("active");
};

screenshots.addEventListener("click", openArtZoom);
devlog.addEventListener("click", openArtZoom);
skills.addEventListener("click", openArtZoom);

artZoomOverlay.addEventListener("click", () => {
    artZoomOverlay.classList.remove("active");
});