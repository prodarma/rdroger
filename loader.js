const loader = document.querySelector(".loader");

function closeloader() {
    loader.style.display = "none";
}

let alreadySeen = false
if (localStorage.getItem("alreadySeen") == "true") {
    loader.style.display = "none";
}
else {
    document.querySelector(".loader")
    setInterval(closeloader, 5000);
    localStorage.setItem("alreadySeen", "true");
}