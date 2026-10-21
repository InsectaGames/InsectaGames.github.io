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