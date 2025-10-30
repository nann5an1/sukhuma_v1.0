import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';
import dotenv, { parse } from 'dotenv';

dotenv.config();

const app = express();
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
function buildPrompt(skinData){
    const {
    type,
    sensitivity,
    skincare_exp,
    age,
    acnetype,
    skinConcerns,
    allergies,
    preferences,
    diet,
    lifestyle,
    budget
    } = skinData;

    return `You are an expert dermatologist and skincare specialist. Based on the following customer profile, create a comprehensive personalized skincare routine.

    CUSTOMER PROFILE:
    - Skin Type: ${type}
    - Sensitivity Level: ${sensitivity}
    - Skincare Experience: ${skincare_exp}
    - Age: ${age}
    - Acne Type: ${acnetype || "None"}
    - Skin Concerns: ${skinConcerns.join(", ") || "None"}
    - Allergies/Sensitivities: ${allergies.join(", ") || "None"}
    - Product Preferences: ${preferences.join(", ") || "None"}
    - Diet: ${diet.join(", ") || "Not specified"}
    - Lifestyle: ${lifestyle.join(", ") || "Not specified"}
    - Budget: ${budget}

    IMPORTANT: Respond with ONLY valid JSON, no markdown, no code blocks, no extra text. Just the raw JSON object.
    NOTE: The steps for the routines can be more than 3 steps. The recommended products must be always 3 products per step.
    Please provide a detailed skincare routine in this exact JSON format:

{
  "data": [
    {
      "time": "Morning",
      "routine": [
        {
          "id": 1,
          "title": "step name (e.g., Cleanser, Toner, Serum, etc.)",
          "products": ["product1", "product2", "product3"],
          "info": "application instructions and benefits (no more than 50 words)."
        },
        {
          "id": 2,
          "title": "step name",
          "products": ["product1", "product2", "product3"],
          "info": "application instructions and benefits (no more than 50 words)."
        },
        {
          "id": 3,
          "title": "step name",
          "products": ["product1", "product2", "product3"],
          "info": "application instructions and benefits (no more than 50 words)."
        }
      ]
    },
    {
      "time": "Evening",
      "routine": [
        {
          "id": 1,
          "title": "step name",
          "products": ["product1", "product2", "product3"],
          "info": "application instructions and benefits (no more than 50 words)."
        },
        {
          "id": 2,
          "title": "step name",
          "products": ["product1", "product2", "product3"],
          "info": "application instructions and benefits (no more than 50 words)."
        },
        {
          "id": 3,
          "title": "step name",
          "products": ["product1", "product2", "product3"],
          "info": "application instructions and benefits (no more than 50 words)."
        }
      ]
    }
  ],
  "treatments": {
    "weekelytreatments": [
      {
        "id": 1,
        "treatment": "treatment name",
        "info": "treatment description and benefits",
        "times": "1-2x per week"
      },
      {
        "id": 2,
        "treatment": "treatment name",
        "info": "treatment description and benefits",
        "times": "2-3x per week"
      }
    ],
    "tips": [
      {
        "id": 1,
        "info": "lifestyle tip 1"
      },
      {
        "id": 2,
        "info": "lifestyle tip 2"
      }
    ]
  },
  "precautions": "important precautions based on allergies/sensitivities"`
}


app.use(cors({
  origin: "* ",
}));
app.use(express.json());


app.post("/skincareroutine", (req, res) => {
    // console.log("request received", req.body);
    //destruct the data into the variables first
    const skindata = req.body; 

    //build a prompt for the model
    const prompt = buildPrompt(skindata);
    fetchFromLlama();
    async function fetchFromLlama() {
        try {
            const message = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            max_tokens: 2000,
            messages: [
                {
                role: "user",
                content: prompt,
                },
            ],
            });
            let responseText = message.choices[0]?.message?.content || '';
            responseText = responseText.trim();

            // remove markdown fences
            if (responseText.startsWith("```")) {
            responseText = responseText.replace(/```(json)?/g, "").trim();
            }

            // Try to fix unescaped quotes
            responseText = responseText
            .replace(/\n/g, " ")
            .replace(/\\'/g, "'");

            // Then safely parse
            let parsedData;
            try {
                parsedData = JSON.parse(responseText);
                res.json(parsedData);
            } catch (err) {
            console.error("Failed to parse JSON:", err.message);
            console.error("Offending text:", responseText);
            res.status(500).json({ error: "Invalid JSON from model", raw: responseText });
            return;
            }
        } catch (error) {
            console.log("error in getting response to frontend", error);
        }
    }
});


// app.listen(process.env.PORT, () => {
//     console.log("Server is running on port 3000");
// });

export default app;