function checkCode() {
    const inputElement = document.getElementById('codeInput');
    const errorMessage = document.getElementById('error-message');
    const inputCode = inputElement.value;
    let isValidCode = false;

    switch(inputCode) {
        case 'W!1':
            document.getElementById("timeline-item2").style.display = 'block';
            isValidCode = true;
            break;
        case '15TD':
            document.getElementById("timeline-item3").style.display = 'block';
            isValidCode = true;
            break;
        case 'UM!':
            document.getElementById("timeline-item4").style.display = 'block';
            isValidCode = true;
            break;            
        case '(HH3':
            document.getElementById("timeline-item5").style.display = 'block';
            document.getElementById("timeline-item6").style.display = 'block';
            document.getElementById("timeline-item7").style.display = 'block';
            document.getElementById("timeline-item8").style.display = 'block';
            isValidCode = true;
            break;   
        case '!R4':
            document.getElementById("timeline-item9").style.display = 'block';
            document.getElementById("timeline-item10").style.display = 'block';
            document.getElementById("timeline-item11").style.display = 'block';
            document.getElementById("timeline-item12").style.display = 'block';
            document.getElementById("timeline-item13").style.display = 'block';
            isValidCode = true;
            break; 

        case 'T3N':
            document.getElementById("timeline-item14").style.display = 'block';
            document.getElementById("timeline-item15").style.display = 'block';
            document.getElementById("timeline-item16").style.display = 'block';
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
