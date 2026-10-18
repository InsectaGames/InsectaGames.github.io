function redirect(where) {
    switch (where) {
        case "twitter":
            window.location.href = "https://x.com/insectagames";
            break;
        case "youtube":
            window.location.href = "https://www.youtube.com/@InsectaGames";
            break;
        case "instagram":
            window.location.href = "https://www.instagram.com/insectagames";
            break;
        case "steam":
            window.location.href = "https://store.steampowered.com/app/960090/Bloons_TD_6/";
            break;
        case "itchio":
            window.location.href = "https://insectagames.itch.io/nest-invaders";
            break;
        case "inicio":
            window.location.href = "#";
            break;
    }
}

const screenshots = document.getElementById("screenshots");
const artZoomOverlay = document.getElementById("art_zoom_overlay");
const artZoomImg = document.getElementById("art_zoom_img");

screenshots.addEventListener("click", (e) => {
    const img = e.target;

    artZoomImg.src = img.src;
    artZoomOverlay.classList.add("active");
});

artZoomOverlay.addEventListener("click", () => {
    artZoomOverlay.classList.remove("active");
});