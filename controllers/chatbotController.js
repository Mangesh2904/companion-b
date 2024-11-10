import { askGemini } from '../services/geminiService.js';
import Chat from '../models/Chat.js';
import { AppError } from '../utils/errorHandler.js';

export const askChatbot = async (req, res, next) => {
  try {
    const { message } = req.body;
    const userId = req.user.id;

    const botResponse = await askGemini(message);

    const chat = new Chat({
      userId,
      userMessage: message,
      botResponse
    });
    await chat.save();

    res.status(200).json({ response: botResponse });
  } catch (error) {
    next(new AppError('Failed to get response from chatbot', 500));
  }
};

export const getChatHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const history = await Chat.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ history });
  } catch (error) {
    next(new AppError('Failed to fetch chat history', 500));
  }
};