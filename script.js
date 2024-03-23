//sanftes Hochscrollen
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("backToTop").addEventListener("click", function(e) {
        e.preventDefault(); // Verhindert die Standard-Sprungmarkenfunktion
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

//Karrusell Funktionalität
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    let currentIndex = 0; // Startindex

    function showSlide(index) {
        // Alle Slides verstecken
        slides.forEach(slide => {
            slide.style.display = 'none'; 
        });

        // Den gewünschten Slide anzeigen
        slides[index].style.display = 'flex';
    }

    // Ersten Slide beim Laden anzeigen
    showSlide(currentIndex);

    // Funktion zum Navigieren zu vorherigen/nächsten Slide
    function navigate(direction) {
        currentIndex += direction;

        // Überprüfen, ob der Index über die Grenzen hinausgeht
        if (currentIndex < 0) {
            currentIndex = slides.length - 1; // Zum letzten Slide springen
        } else if (currentIndex >= slides.length) {
            currentIndex = 0; // Zurück zum ersten Slide
        }

        showSlide(currentIndex);
    }

    // Event-Delegation für Pfeil-Navigation
    document.querySelector('.carousel-container').addEventListener('click', function(e) {
        if (e.target.matches('.right-arrow')) {
            navigate(1);
        } else if (e.target.matches('.left-arrow')) {
            navigate(-1);
        }
    });

    // Einfache Swipe-Detektion
    let touchStartX = 0;
    document.querySelector('.carousel-container').addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
    }, false);

    document.querySelector('.carousel-container').addEventListener('touchend', function(e) {
        let touchEndX = e.changedTouches[0].clientX;
        if (touchStartX - touchEndX > 50) {
            navigate(1); // Swipe links
        } else if (touchStartX - touchEndX < -50) {
            navigate(-1); // Swipe rechts
        }
    }, false);
});



//Backendintegration für Gedicht- und Bildgenerierung
document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.querySelector('button');
    const activitiesInput = document.getElementById('userActivities');
    const generatedImage = document.getElementById('generatedImage');
    const generatedPoem = document.getElementById('generatedPoem');
    const instructionText = document.getElementById('instruction');

    generateButton.addEventListener('click', function() {
        const activities = activitiesInput.value.trim();
        if (!activities) {
            alert('Bitte gib deine geplanten Aktivitäten ein.');
            return;
        }

        // Ladeanzeige einblenden
        instructionText.textContent = 'Lädt...';
        generatedImage.hidden = true;
        generatedPoem.hidden = true;

        generateContent(activities);
    });

    async function generateContent(activities) {
        try {
            // Sende parallele Anfragen für Bild und Gedicht
            const imageResponse = await fetch('http://192.168.178.31:3000/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ activities }),
            });

            const poemResponse = await fetch('http://192.168.178.31:3000/generate-poem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ activities }),
            });

            // Warte auf beide Antworten
            const imageData = await imageResponse.json();
            const poemData = await poemResponse.json();

            // Ergebnisse anzeigen
            generatedImage.src = imageData.imageUrl;
            generatedImage.hidden = false;
            generatedPoem.textContent = poemData.poem;
            generatedPoem.hidden = false;
            instructionText.hidden = true; // Diese Zeile hinzugefügt
        } catch (error) {
            console.error('Fehler beim Generieren der Inhalte:', error);
            instructionText.textContent = 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';
        }
    }
});
