const loader = document.querySelector(".loader");

document.querySelector(".loader")
setInterval(closeloader, 5000);

function closeloader() {
    loader.style.display = "none";
}