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

