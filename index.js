require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

const openAIHeaders = {
  'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  'Content-Type': 'application/json'
};

app.post('/generate-image', async (req, res) => {
    const userActivities = req.body.activities; // Hier wird der Benutzertext aus dem Request aufgenommen
    const prompt = `Create a detailed and vibrant artwork showcasing a young woman with long dark hair and a sporty figure, ${userActivities}. She should appear joyful, trustworthy, lively, and sociable, reflecting her loving and relaxed personality. The style should be realistic with a touch of idealization to emphasize her positive characteristics.`;
  
    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
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
          "content": "Heute unterrichte ich Mathe und Kunst und spiele Volleyball"
        },
        {
            "role": "assistant",
            "content": "Am Morgen strahlst du voller Kraft und Elan,\nMit deiner lebhaften Art fängt der Tag gut an.\nDu bringst den Schülern Zahlen bei mit Bedacht,\nUnd malst mit ihnen bunte Bilder, Tag und Nacht.\n\nDann schnappst du dir den Volleyball geschwind,\nMit deinem Team spielst du, als wärst du der Wind.\nDeine Sportlichkeit strahlt hell wie die Sonne,\nGemeinsam lacht ihr, bei jedem Punkt voller Wonne.\n\nAm Abend sitzen wir zusammen, Arm in Arm,\nGenießen das Zusammensein, so wunderbar dein Charme.\nIch liebe dich für deine ganze Art,\nOhne dich zu leben wäre hart!"
        },
        {
            "role": "user",
            "content": "Heute gehe ich ins Fitnessstudio und besuche meinen Vater. "
        },
        {
            "role": "assistant",
            "content": "Im Fitnessstudio trainierst du mit Eifer und Schwung,\nBewegst dich mit Grazie, so sportlich und jung.\nDein Lächeln strahlt, wie die Sonne am Morgen,\nIn deiner Gegenwart fühle ich mich geborgen.\n\nDann besuchst du deinen Vater, mit Liebe im Blick,\nGemeinsam lacht ihr, über jeden kleinen Schlick.\nDeine Vertrauenswürdigkeit, sie strahlt so klar,\nFür mich bist du das kostbarste Juwel, das wunderbar.\n\nZum Schluss des Tages, wenn die Sterne funkeln so hell,\nSpüre ich, wie sehr du mein Herz erhellt.\nMit dir an meiner Seite, gesellig und fein,\nMöchte ich für immer dein Lebensbegleiter sein."
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
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
