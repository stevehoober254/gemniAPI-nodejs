require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMNI_API_KEY);

// ... Model params
const generationConfig = {
    stopSequences: ["red"],
    temperature: 0.9,
    topP: 0.1,
    topK: 16
}
const MODE_NAME = "gemini-1.5-flash"

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: MODE_NAME, generationConfig });

async function run() {
  
    const prompt = "write me a reusable react component for generating maps. should receive array of coordinates and create markers on the map. should also receive map type param."
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
run();