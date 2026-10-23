const screenshots = document.getElementById("screenshots");
const similarGames = document.querySelector(".juegos-similares");
const artZoomOverlay = document.getElementById("art_zoom_overlay");
const artZoomImg = document.getElementById("art_zoom_img");

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