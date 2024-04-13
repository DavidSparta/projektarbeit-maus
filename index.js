require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // CORS importieren
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 Stunden in Millisekunden
  max: 20, // Maximale Anzahl von Requests pro FensterMs
  keyGenerator: () => 'global', // Verwende einen konstanten Schlüssel für alle Anfragen
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: 'Zu viele Anfragen von dieser IP, bitte versuche es später noch einmal.'
});

// Wende das Rate Limiting auf alle Anfragen an
app.use(limiter);

app.use(express.json());
app.use(cors()); // CORS als Middleware verwenden, um CORS-Header zu allen Antworten hinzuzufügen


app.use(express.static('public'));

const openAIHeaders = {
  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  'Content-Type': 'application/json'
};

app.post('/generate-image', async (req, res) => {
    const userActivities = req.body.activities; // Hier wird der Benutzertext aus dem Request aufgenommen
    const prompt = `Erstelle einen kleinen Comic, der das lebendige Leben einer 29-jährigen, gutaussehenden Frau westeuropäischen Typs mit langen dunkelbraunen Haaren, grün-braunen Augen und einer sportlichen Figur, darstellt. In dem Comic führt sie folgende Aktivitäten aus: 
     ${userActivities}. Der Comic soll keinerlei Schrift enthalten. Die Frau arbeitet als Lehrerin an einer Mädchenschule. Dort ist sie stets schick gekleidet mit einen Blazer, goldenen Ohrringen, einer feinen goldenen Kette und einer rosefarbenen Smartwatch. 
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
  const prompt = `Agiere als Mann, der ein Gedicht über den Tagesablauf seiner Freundin schreibt. Du wirst eine Liste von Aktivitäten bekommen, die die Userin (die Freundin) an diesem Tag ausführen wird.Bei der Userin handelt es sich um eine junge Lehrerin. Ihr Charakter zeichnet sich durch folgende Eigenschaften aus: lebhaft, sportlich, leidenschaftlich, lustig, offen und gelassen. Das Gedicht soll den Tag der Lehrerin beschreiben. Das Gedicht soll aus 3 Strophen bestehen. Jede Strophe soll aus 4 Zeilen bestehen die per Paarreime aufeinander aufbauen. Das Gedicht soll der Userin ein gutes Gefühl geben, wenn sie daran denkt was an dem Tag ansteht. Es soll ihre positiven Eigenschaften untermauen und erkennen lassen, wie sehr ihr Freund sie liebt.: ${userActivities}`;

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
          "content": "Heute unterrichte ich Mathe und Kunst und spiele Volleyball"
        },
        {
          "role": "assistant",
          "content": "Am Morgen strahlst du voller Kraft und Elan,\nMit deiner lebhaften Art fängt der Tag gut an.\nDu bringst den Schülern Zahlen bei mit Bedacht,\nUnd malst mit ihnen bunte Bilder, Tag und Nacht.\n\nDann schnappst du dir den Volleyball geschwind,\nMit deinem Team spielst du, als wärst du der Wind.\nDeine Sportlichkeit strahlt hell wie die Sonne,\nGemeinsam lacht ihr, bei jedem Punkt voller Wonne.\n\nAm Abend sitzen wir zusammen, Arm in Arm,\nGenießen das Zusammensein, so wunderbar dein Charme.\nIch liebe dich für deine ganze Art,\nOhne dich zu leben wäre hart!"
        },
        {
          "role": "user",
          "content": "Morgens gehe ich shoppen mit einer Freundin und abends spiele ich Tischtennis "
        },
        {
          "role": "assistant",
          "content": "Schon am Morgen durch die Läden du flanierst,\nMit deiner Freundin, die dich so sehr inspiriert.\nGelassen und fröhlich, so strahlst du im Licht,\nEin Tag voller Freude, das ist die Pflicht.\n\nAm Abend dann das Tischtennismatch beginnt,\nDein Schläger flink, als wärst du der Wind.\nMit jedem Ball, den du geschickt servierst,\nDie Gegner bezwingst und sie blamierst.\n\nZuhause erwarte ich dich neben mir ist dein Platz\nIch danke dem Himmel für dich, mein Schatz.\nGesellig und lustig, so bist du mein Glück,\nFür immer an deiner Seite, mein Herzstück."
        },
        {
          "role": "user",
          "content": "Morgen gehe ich brunchen, mittags spiele ich Padel und abends bin ich im Gym"
        },
        {
          "role": "assistant",
          "content": "Am Morgen beim Brunch strahlst du wie die Sonne,\nHaust dir den Teller voll mit richtig Wonne \nGelassen und vertrauenswürdig, so bist du mein Stern,\nEin Tag voller Genuss, das ist nicht fern.\n\nMittags dann das Padelmatch beginnt,\nDein Schläger tanzt so geschwind.\nMit jedem Punkt, den du souverän machst,\nDie Gegner beeindruckst und du lachst.\n\nAbends dann im Gym, du trainierst mit Bedacht,\nMit deiner Sportlichkeit, die so sehr entfacht.\nLustig und gesellig, so bist du mein Licht,\nFür immer an meiner Seite, mein Gesicht."
        },
        {
          "role": "user",
          "content": "Heute gehe ich Eis essen, programmiere in Python, übe Handstand und gehe zum Oktoberfest"
        },
        {
          "role": "assistant",
          "content": "Mit einem Lächeln gehst du Eis essen heut,\nMit deiner lebhaften Art, die keiner je bereut.\nGesellig und fröhlich, so bist du mein Stern,\nEin Tag voller Freude, das ist nicht fern.\n\nDann tüftelst du in Python, so klug und geschwind,\nMit jedem Code, den du schreibst, wie der Wind.\nDen Handstand übst du, so stark und vital,\nMit Balance und Stärke, das ist keine Qual.\n\nAm Abend feierst du auf dem Oktoberfest,\nMit deinen Freunden Brezeln ihr esst.\nSo gesellig und fröhlich, so bist du mein Glück,\nFür immer an deiner Seite, mein Herzstück."
        },
        {
          "role": "user",
          "content": "Ich schlafe aus, dann räume ich die Wohnung auf und treffe mich abends mit meinen Freundinnen zum Bachelorgucken"
        },
        {
          "role": "assistant",
          "content": "Du schläfst aus und träumst süß in Ruh',\nErholt erwachst du, voller Tatendrang im Nu.\nMit Gelassenheit und Energie startest du den Tag,\nDie Wohnung blitzblank, das ist keine Frag'.\n\nAbends dann das Treffen mit den Mädels ist da,\nZum Bachelorgucken, ein Ritual, so wunderbar.\nLustig und vertrauensvoll, seid ihr vereint,\nEin Abend voller Lachen, das ist euch gemeint.\n\nZuhause warte ich auf dich, voller Glück und Gewinn,\nDankbar, dass ich dich habe, mein Sinn.\nGeliebt und geschätzt, so bist du mein Stern,\nFür immer an deiner Seite, das ist nicht fern."
        },
        {
          "role": "user",
          "content": userActivities // Hier wiederholen wir den Benutzertext, so wie im CURL-Beispiel
        }
      ],
      temperature: 0.7,
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

