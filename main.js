require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ... Model params
const generationConfig = {
    stopSequences: ["red"], // Stop generation on encountering "red"
    temperature: 0.9,  // Controls randomness (higher = more creative, less coherent)
    topP: 0.1,         // Probability distribution weighting (higher = favors more probable words)
    topK: 16,          // Maximum number of words to consider at each step
};
const MODE_NAME = "gemini-1.5-flash"; // Versatile model for most use cases

// The Gemini 1.5 models are versatile and work with most use cases
const model = genAI.getGenerativeModel({ model: MODE_NAME, generationConfig });

// Function for text generation
async function generateText(prompt) {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

// Function for text with image generation (requires additional configuration)
async function generateTextWithImage(prompt, imageUrl) {
  // Configure additional safety params (example)
  const safetyParams = {
    contentFilterLevel: GoogleGenerativeAI.ContentFilterLevel.SAFE, // Ensure safe content
  };

  // Configure image input (example)
  const imageInput = {
    content: imageUrl, // Replace with the actual image URL
  };

  const result = await model.generateContent({
    prompt,
    imageInput,
    safetyParams,
  });

  const response = await result.response;
  const text = response.text();
  console.log(text);
}

// Function for text with chat history generation (requires additional configuration)
async function generateTextWithChatHistory(prompt, chatHistory) {
  // Configure conversation history input (example)
  const conversation = chatHistory.map((message) => ({
    role: message.role, // Identify message sender (user/agent)
    text: message.text, // Message content
  }));

  const result = await model.generateContent({
    prompt,
    conversation,
  });

  const response = await result.response;
  const text = response.text();
  console.log(text);
}

// Run the functions (replace prompts and arguments as needed)
// Text generation example
generateText("Write a poem about nature.");

// Text with image generation example (configure safety and image URL)
generateTextWithImage("Describe the image", "https://cdn.example.com/image.jpg");

// Text with chat history generation example (configure conversation)
const chatHistory = [
  { role: "user", text: "Hello, how can I help you today?" },
  { role: "agent", text: "Hi there! What would you like to know?" },
];
generateTextWithChatHistory("Continue the conversation", chatHistory);
