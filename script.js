const screenshots = document.getElementById("screenshots");
const similarGames = document.querySelector(".juegos-similares");
const artZoomOverlay = document.getElementById("art_zoom_overlay");
const artZoomImg = document.getElementById("art_zoom_img");

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