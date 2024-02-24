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

//Karussel 
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    let currentIndex = 0;

    // Funktion zum Initialisieren der Indikatoren
    function initIndicators() {
        slides.forEach((_, index) => {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (index === currentIndex) indicator.classList.add('active');
            indicatorsContainer.appendChild(indicator);
            indicator.addEventListener('click', () => goToSlide(index));
        });
    }

    // Funktion zum Aktualisieren der aktiven Indikator-Anzeige
    function updateIndicators() {
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Funktion zum Wechseln der Slides
    function goToSlide(index) {
        const width = document.querySelector('.carousel-container').offsetWidth;
        document.querySelector('.carousel-container').scrollLeft = width * index;
        currentIndex = index;
        updateIndicators();
    }

    // Funktion zum Implementieren des endlosen Wischens
    function setupSwipe() {
        let startX, endX;
        document.querySelector('.carousel-container').addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        document.querySelector('.carousel-container').addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });

        document.querySelector('.carousel-container').addEventListener('touchend', () => {
            if (startX - endX > 50) {
                // Wischen nach links
                const nextIndex = (currentIndex + 1) % slides.length;
                goToSlide(nextIndex);
            } else if (startX - endX < -50) {
                // Wischen nach rechts
                const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                goToSlide(prevIndex);
            }
        });
    }

    initIndicators();
    setupSwipe();
});

