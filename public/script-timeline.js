function checkCode() {
    const inputElement = document.getElementById('codeInput');
    const errorMessage = document.getElementById('error-message');
    const inputCode = inputElement.value;
    let isValidCode = false;

    switch(inputCode) {
        case 'W!1':
            document.getElementById("timeline-item2").style.display = 'block';
            localStorage.setItem('progress', 'Code1');
            isValidCode = true;
            break;
        case '15TD':
            document.getElementById("timeline-item3").style.display = 'block';
            localStorage.setItem('progress', 'Code2');
            isValidCode = true;
            break;
        case 'UM!':
            document.getElementById("timeline-item4").style.display = 'block';
            localStorage.setItem('progress', 'Code3');
            isValidCode = true;
            break;            
        case '(HH3':
            document.getElementById("timeline-item5").style.display = 'block';
            document.getElementById("timeline-item6").style.display = 'block';
            document.getElementById("timeline-item7").style.display = 'block';
            document.getElementById("timeline-item8").style.display = 'block';
            localStorage.setItem('progress', 'Code4');
            isValidCode = true;
            break;   
        case '!R4':
            document.getElementById("timeline-item9").style.display = 'block';
            document.getElementById("timeline-item10").style.display = 'block';
            document.getElementById("timeline-item11").style.display = 'block';
            document.getElementById("timeline-item12").style.display = 'block';
            document.getElementById("timeline-item13").style.display = 'block';
            localStorage.setItem('progress', 'Code5');
            isValidCode = true;
            break; 

        case 'T3N?':
            document.getElementById("timeline-item14").style.display = 'block';
            document.getElementById("timeline-item15").style.display = 'block';
            document.getElementById("timeline-item16").style.display = 'block';
            localStorage.setItem('progress', 'Code6');
            isValidCode = true;
            break;

        case 'JA':
            document.getElementById("timeline-item17").style.display = 'block';
            document.getElementById("promptBox").style.display = 'none';
            localStorage.setItem('progress', 'Code7');
            isValidCode = true;
            break;
    

        default:
            alert('Falscher Code!');
            break;
    }

    if (isValidCode) {
        errorMessage.style.display = 'none'; // Fehlermeldung verstecken
        inputElement.value = ''; // Eingabefeld leeren
    } else {
        errorMessage.textContent = 'Falscher Code'; // Fehlermeldung setzen
        errorMessage.style.display = 'block'; // Fehlermeldung anzeigen
    }
}


//laden des Zutands aus dem local storage
function loadProgress() {
    const progress = localStorage.getItem('progress');
    if (progress) {
        switch(progress) {
            case 'Code1':
                document.getElementById("timeline-item2").style.display = 'block';
                break;
            case 'Code2':
                document.getElementById("timeline-item2").style.display = 'block';
                document.getElementById("timeline-item3").style.display = 'block';
                break;
            case 'Code3':
                document.getElementById("timeline-item2").style.display = 'block';
                document.getElementById("timeline-item3").style.display = 'block';
                document.getElementById("timeline-item4").style.display = 'block';
                break;
            case 'Code4':
                document.getElementById("timeline-item2").style.display = 'block';
                document.getElementById("timeline-item3").style.display = 'block';
                document.getElementById("timeline-item4").style.display = 'block';
                document.getElementById("timeline-item5").style.display = 'block';
                document.getElementById("timeline-item6").style.display = 'block';
                document.getElementById("timeline-item7").style.display = 'block';
                document.getElementById("timeline-item8").style.display = 'block';
                break;
            case 'Code5':
                document.getElementById("timeline-item2").style.display = 'block';
                document.getElementById("timeline-item3").style.display = 'block';
                document.getElementById("timeline-item4").style.display = 'block';
                document.getElementById("timeline-item5").style.display = 'block';
                document.getElementById("timeline-item6").style.display = 'block';
                document.getElementById("timeline-item7").style.display = 'block';
                document.getElementById("timeline-item8").style.display = 'block';
                document.getElementById("timeline-item9").style.display = 'block';
                document.getElementById("timeline-item10").style.display = 'block';
                document.getElementById("timeline-item11").style.display = 'block';
                document.getElementById("timeline-item12").style.display = 'block';
                document.getElementById("timeline-item13").style.display = 'block';
                break;
            case 'Code6':
                document.getElementById("timeline-item2").style.display = 'block';
                document.getElementById("timeline-item3").style.display = 'block';
                document.getElementById("timeline-item4").style.display = 'block';
                document.getElementById("timeline-item5").style.display = 'block';
                document.getElementById("timeline-item6").style.display = 'block';
                document.getElementById("timeline-item7").style.display = 'block';
                document.getElementById("timeline-item8").style.display = 'block';
                document.getElementById("timeline-item9").style.display = 'block';
                document.getElementById("timeline-item10").style.display = 'block';
                document.getElementById("timeline-item11").style.display = 'block';
                document.getElementById("timeline-item12").style.display = 'block';
                document.getElementById("timeline-item13").style.display = 'block';
                document.getElementById("timeline-item14").style.display = 'block';
                document.getElementById("timeline-item15").style.display = 'block';
                document.getElementById("timeline-item16").style.display = 'block';
                break;
            case 'Code7':
                document.getElementById("timeline-item2").style.display = 'block';
                document.getElementById("timeline-item3").style.display = 'block';
                document.getElementById("timeline-item4").style.display = 'block';
                document.getElementById("timeline-item5").style.display = 'block';
                document.getElementById("timeline-item6").style.display = 'block';
                document.getElementById("timeline-item7").style.display = 'block';
                document.getElementById("timeline-item8").style.display = 'block';
                document.getElementById("timeline-item9").style.display = 'block';
                document.getElementById("timeline-item10").style.display = 'block';
                document.getElementById("timeline-item11").style.display = 'block';
                document.getElementById("timeline-item12").style.display = 'block';
                document.getElementById("timeline-item13").style.display = 'block';
                document.getElementById("timeline-item14").style.display = 'block';
                document.getElementById("timeline-item15").style.display = 'block';
                document.getElementById("timeline-item16").style.display = 'block';
                document.getElementById("timeline-item17").style.display = 'block';
                document.getElementById("promptBox").style.display = 'none';
                break;
        }
    }
}

// Diese Funktion beim Laden der Seite aufrufen
window.onload = loadProgress;

