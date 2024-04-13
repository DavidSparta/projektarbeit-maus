
// Diese Funktion wird aufgerufen, um die Authentifizierung zu überprüfen
function checkAuthentication() {
    if (sessionStorage.getItem("authenticated") === "true") {
        // Wenn der Benutzer authentifiziert ist, verstecke den passwordPrompt und zeige den .site-content Bereich
        document.getElementById('passwordPrompt').style.display = 'none';
        document.querySelector('.site-content').style.display = 'block';
        document.querySelector('.site-footer').style.display = 'block';
    } else {
        // Wenn der Benutzer nicht authentifiziert ist, zeige den passwordPrompt
        document.getElementById('passwordPrompt').style.display = 'flex';
        //  Verstecke den .site-content und footer Bereich, falls dieser sichtbar sein sollte
        document.querySelector('.site-content').style.display = 'none';
        document.querySelector('.site-footer').style.display = 'none';
    }
}


// Diese Funktion wird aufgerufen, wenn der Benutzer auf den Bestätigen-Button klickt
function authenticate() {
    var password = document.getElementById('passwordInput').value;
    if (password === "21.08.2012") { // Ersetze dies durch dein tatsächliches Passwort
        // Wenn das Passwort korrekt ist, setze den Authentifizierungsstatus und verstecke den Dialog
        sessionStorage.setItem("authenticated", "true");
        document.getElementById('passwordPrompt').style.display = 'none';
        // Zeige den .site-content Bereich
        document.querySelector('.site-content').style.display = 'block';
    } else {
        // Wenn das Passwort falsch ist, zeige eine Fehlermeldung
        document.getElementById('errorText').style.display = 'block';
    }
}

// Überprüfe die Authentifizierung, sobald die Seite geladen wird
document.addEventListener('DOMContentLoaded', (event) => {
    checkAuthentication();
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