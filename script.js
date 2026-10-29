const screenshots = document.getElementById("screenshots");
const similarGames = document.querySelector(".juegos-similares");
const artZoomOverlay = document.getElementById("art_zoom_overlay");
const artZoomImg = document.getElementById("art_zoom_img");
const header = document.querySelector("header");
const menuToggle = header.querySelector(".menu-toggle");
const navigation = header.querySelector("#main-navigation");
const mobileNavigationQuery = window.matchMedia("(max-width: 1100px)");

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

const openArtZoom = (e) => {
    const img = e.target;

    if (!(img instanceof HTMLImageElement)) {
        return;
    }

    artZoomImg.src = img.src;
    artZoomOverlay.classList.add("active");
};

screenshots.addEventListener("click", openArtZoom);
similarGames.addEventListener("click", openArtZoom);

artZoomOverlay.addEventListener("click", () => {
    artZoomOverlay.classList.remove("active");
});