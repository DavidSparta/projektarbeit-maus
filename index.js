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
    const prompt = `Schreiben Sie ein Gedicht, das den Tag einer jungen Lehrerin beschreibt, die lebhaft, sportlich, vertrauenswürdig, lustig, gesellig und entspannt ist. Das Gedicht sollte für jede Aktivität eine Strophe haben und Paarreime verwenden, um einen fröhlichen und positiven Ton zu erzeugen. Die Aktivitäten des Tages sind: ${userActivities}`;
  
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
            "content": userActivities // Hier wiederholen wir den Benutzertext, so wie im CURL-Beispiel
          }
        ],
        temperature: 1,
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
