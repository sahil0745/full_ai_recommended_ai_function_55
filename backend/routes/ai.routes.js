const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { authMiddleware } = require('../middleware/auth.middleware');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// @route   POST /api/ai/trip-planner
// @desc    Generate AI trip plan
// @access  Private
router.post('/trip-planner', authMiddleware, async (req, res) => {
  try {
    const { destination, days, budget, interests, groupSize } = req.body;

    const prompt = `Create a detailed ${days}-day trip itinerary for ${destination} with the following details:
- Budget: $${budget}
- Group size: ${groupSize} people
- Interests: ${interests.join(', ')}

Please provide:
1. Day-by-day itinerary with activities
2. Recommended hotels with price ranges
3. Must-visit places
4. Estimated daily costs
5. Travel tips
6. Best time to visit each place

Format the response as a structured JSON with sections for each day.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a professional travel planner with expertise in creating personalized trip itineraries."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const itinerary = completion.choices[0].message.content;

    res.json({
      success: true,
      itinerary
    });
  } catch (error) {
    console.error('AI Trip Planner Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating trip plan'
    });
  }
});

// @route   POST /api/ai/chat
// @desc    AI chatbot for travel queries
// @access  Public
router.post('/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    const messages = [
      {
        role: "system",
        content: "You are TravelGenie AI, a helpful travel assistant. Help users with travel planning, destination recommendations, booking queries, and travel tips. Be friendly, informative, and concise."
      },
      ...history,
      {
        role: "user",
        content: message
      }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.8,
      max_tokens: 500
    });

    const reply = completion.choices[0].message.content;

    res.json({
      success: true,
      reply
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing chat message'
    });
  }
});

// @route   POST /api/ai/recommendations
// @desc    Get AI-powered recommendations
// @access  Public
router.post('/recommendations', async (req, res) => {
  try {
    const { location, preferences } = req.body;

    const prompt = `Recommend top 5 places to visit in ${location} based on these preferences: ${preferences.join(', ')}. Include a brief description for each.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a travel expert providing personalized recommendations."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const recommendations = completion.choices[0].message.content;

    res.json({
      success: true,
      recommendations
    });
  } catch (error) {
    console.error('AI Recommendations Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error getting recommendations'
    });
  }
});

module.exports = router;
