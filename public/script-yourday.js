//Backendintegration für Gedicht- und Bildgenerierung
document.addEventListener('DOMContentLoaded', function() {
    const generateButton = document.querySelector('button');
    const activitiesInput = document.getElementById('userActivities');
    const generatedImage = document.getElementById('generatedImage');
    const generatedPoem = document.getElementById('generatedPoem');
    const instructionText = document.getElementById('instruction');

    // Versuche, gespeicherte Inhalte beim Laden der Seite anzuzeigen
    const storedImage = sessionStorage.getItem('generatedImage');
    const storedPoem = sessionStorage.getItem('generatedPoem');

    if (storedImage && storedPoem) {
        generatedImage.src = storedImage;
        generatedImage.hidden = false;
        generatedPoem.textContent = storedPoem;
        generatedPoem.hidden = false;
        instructionText.hidden = true;
    }

    generateButton.addEventListener('click', function() {
        const activities = activitiesInput.value.trim();
        if (!activities) {
            alert('Bitte gib deine geplanten Aktivitäten ein.');
            return;
        }

        // Ladeanzeige einblenden und SessionStorage für neue Inhalte vorbereiten
        sessionStorage.removeItem('generatedImage');
        sessionStorage.removeItem('generatedPoem');
        instructionText.textContent = 'Lädt...';
        generatedImage.hidden = true;
        generatedPoem.hidden = true;

        generateContent(activities);
    });

    async function generateContent(activities) {
        try {
            // Sende parallele Anfragen für Bild und Gedicht
            const imageResponse = await fetch('https://projektarbeit-maus.cyclic.app/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ activities }),
            });

            const poemResponse = await fetch('https://projektarbeit-maus.cyclic.app/generate-poem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ activities }),
            });

            // Warte auf beide Antworten
            const imageData = await imageResponse.json();
            const poemData = await poemResponse.json();

            // Ergebnisse anzeigen und im SessionStorage speichern
            generatedImage.src = imageData.imageUrl;
            generatedImage.hidden = false;
            generatedPoem.textContent = poemData.poem;
            generatedPoem.hidden = false;
            instructionText.hidden = true; // Verstecke Anweisungstext

            sessionStorage.setItem('generatedImage', imageData.imageUrl);
            sessionStorage.setItem('generatedPoem', poemData.poem);
        } catch (error) {
            console.error('Fehler beim Generieren der Inhalte:', error);
            instructionText.textContent = 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';
        }
    }
});


