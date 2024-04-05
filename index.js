require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // CORS importieren

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors()); // CORS als Middleware verwenden, um CORS-Header zu allen Antworten hinzuzufügen


app.use(express.static('.'));

const openAIHeaders = {
  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  'Content-Type': 'application/json'
};

app.post('/generate-image', async (req, res) => {
    const userActivities = req.body.activities; // Hier wird der Benutzertext aus dem Request aufgenommen
    const prompt = `Erstelle einen kleinen Comic, der das lebendige Leben einer 29-jährigen, gutaussehenden Frau westeuropäischen Typs mit langen dunkelbraunen Haaren, grün-braunen Augen und einer sportlichen Figur, darstellt. In dem Comic führt sie folgende Aktivitäten aus: 
     ${userActivities}. Der Comic soll aus 4 Paneln bestehen und enthält keinerlei Schrift. Die Frau arbeitet als Lehrerin an einer Mädchenschule. Dort ist sie stets schick gekleidet mit einen Blazer, goldenen Ohrringen, einer feinen goldenen Kette und einer rosefarbenen Smartwatch. 
    Die Frau ist bekannt für ihre lebensfrohe, vertrauenserweckende und positive Ausstrahlung. Der Comic soll die Aktivitäten fröhlich darstellen.`;
  
    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        model: "dall-e-3",
        prompt: prompt,
        n: 1, // Generiere 1 Bild
      }, { headers: openAIHeaders });
  
      // Sende die Bild-URL oder das Bild direkt als Antwort zurück
      res.json({ imageUrl: response.data.data[0].url });
    } catch (error) {
      console.error("Fehler bei der Anfrage: ", error);
      res.status(500).send("Ein Fehler ist bei der Generierung des Bildes aufgetreten.");
    }
  });
  

app.post('/generate-poem', async (req, res) => {
  const userActivities = req.body.activities; // Der Benutzertext aus dem Request
  const prompt = `Agiere als Mann, der ein Gedicht über den Tagesablauf seiner Freundin schreibt. Du wirst eine Liste von Aktivitäten bekommen, die die Userin (die Freundin) an diesem Tag ausführen wird.\nBei der Userin handelt es sich um eine junge Lehrerin. Ihr Charakter zeichnet sich durch folgende Eigenschaften aus: lebhaft, sportlich, vertrauenswürdig, lustig, gesellig und gelassen. \nDas Gedicht soll den Tag der Lehrerin beschreiben. Für jede Aktivität, die die Userin nennt, soll das Gedicht eine Strophe enthalten. Jede Strophe soll aus 4 Zeilen bestehen die per Paarreime aufeinander aufbauen. Das Gedicht soll der Userin ein gutes Gefühl geben, wenn sie daran denkt was an dem Tag ansteht. Es soll ihre positiven Eigenschaften untermauen und erkennen lassen, wie sehr ihr Freund sie liebt. Die Aktivitäten des Tages sind: ${userActivities}`;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": prompt
        },
        {
          "role": "user",
          "content": "Mathe und Religion unterrichten & abends spiele ich Beachvolleyball"
        },
        {
          "role": "assistant",
          "content": "Im Morgengrauen, wenn der Tag erwacht,\nlehrt sie Mathe mit erstaunlicher Macht.\nIn Religion, mit Güte und Verstand,\nführt sie ihre Schüler an Gottes Hand.\n\nNachmittags, wenn die Schule ist vorbei,\nist sie noch lange nicht frei.\nMit Volleyball, im Sand so fein,\nihre sportliche Seite, niemand bekommt sie klein. \n\nSie springt und schlägt, mit Kraft und Mut,\ndie Gegner sind schon auf der Hut.\nDoch nach dem Spiel, in der geselligen Runde,\nerfüllt ihr Lachen jede Stunde.\n\nMeine Liebe, so lebhaft und gelassen,\ndu wirst mein Herz niemals verlassen.\nMit jedem Tag, in jeder Stund,\nwächst meine Liebe, so tief und rund."
        },
        {
          "role": "user",
          "content": "Geburtstagsbrunch bei meiner besten Freundin und trainieren im Fitnessstudio"
        },
        {
          "role": "assistant",
          "content": "In der Früh, wenn der Tag beginnt,\nsie zu ihrer Freundin hinrennt.\nMit Lachen, Freude, voller Glück,\nfeiern sie den Geburtstag, Stück für Stück.\n\nSie teilen Erinnerungen, lachen und weinen,\nsind da füreinander, in guten und schlechten Zeiten.\nSie sind mehr als Freunde, sie sind wie Schwestern,\nübereinander würden sie niemals lästern.\n\nDann ins Fitnessstudio, mit sportlichem Eifer,\nmacht sie ihre Übungen, immer heiter.\nMit Gewichten, Laufen, sie gibt nicht auf,\nihre Ausdauer kennt keinen Verlauf.\n\nSo endet der Tag, mit Schweiß und Lachen,\nsie hat es geschafft, alles zu machen.\nMeine Liebe, so stark und wahr,\ndu bist mein Licht, das ist doch klar!"
        },
        {
          "role": "user",
          "content": "Ausschlafen und dann in den Urlaub nach Spanien fliegen"
        },
        {
          "role": "assistant",
          "content": "Am Morgen, wenn der Tag erwacht,\nbleibt sie im Bett, ganz unbeschwert und lacht.\nSie träumt und ruht, ganz ohne Sorgen,\nfreut sich auf den neuen Morgen.\n\nDann packt sie ihre Sachen, mit einem Lachen,\nbereit, neue Abenteuer zu machen.\nSie fliegt nach Spanien, ins Land der Sonne,\nihre Augen strahlen, voller Wonne.\n\nAm Strand, mit Sand zwischen den Zehen,\nlässt sie die Seele baumeln, das Meer zu sehen.\nDie Wellen rauschen, der Himmel so weit,\nsie genießt die Ruhe, die Freiheit, die Zeit.\n\nMeine Liebe, so frei und ungebunden,\ndu bist das Glück, das ich gefunden.\nMit jedem Tag, in jedem Augenblick,\nliebe ich dich mehr, Stück für Stück."
        },
        {
          "role": "user",
          "content": userActivities // Hier wiederholen wir den Benutzertext, so wie im CURL-Beispiel
        }
      ],
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    }, { headers: openAIHeaders });

    // Sende das generierte Gedicht als Antwort zurück
    // Wir nehmen an, dass das letzte Element in der "messages" das generierte Gedicht ist.
    const poem = response.data.choices[0].message.content;
    res.json({ poem: poem });
  } catch (error) {
    console.error("Fehler bei der Anfrage: ", error);
    res.status(500).send("Ein Fehler ist bei der Generierung des Gedichts aufgetreten.");
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});

