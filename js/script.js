//sanfted Hochscrollen
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("backToTop").addEventListener("click", function(e) {
        e.preventDefault(); // Verhindert die Standard-Sprungmarkenfunktion
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});


