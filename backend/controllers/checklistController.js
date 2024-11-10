import Checklist from '../models/Checklist.js';
import { AppError } from '../utils/errorHandler.js';

export const getChecklist = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const checklist = await Checklist.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ checklist });
  } catch (error) {
    next(new AppError('Failed to fetch checklist', 500));
  }
};

export const addToChecklist = async (req, res, next) => {
  try {
    const { content } = req.body;
    const userId = req.user.id;

    const checklistItem = new Checklist({
      userId,
      content,
    });
    await checklistItem.save();

    res.status(201).json({ message: 'Added to checklist', item: checklistItem });
  } catch (error) {
    next(new AppError('Failed to add to checklist', 500));
  }
};

export const removeChecklistItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const removedItem = await Checklist.findOneAndRemove({ _id: id, userId });

    if (!removedItem) {
      return next(new AppError('Checklist item not found', 404));
    }

    res.status(200).json({ message: 'Checklist item removed', item: removedItem });
  } catch (error) {
    next(new AppError('Failed to remove checklist item', 500));
  }
};

export const updateChecklistItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { completed } = req.body;
    const userId = req.user.id;

    const updatedItem = await Checklist.findOneAndUpdate(
      { _id: id, userId },
      { completed },
      { new: true }
    );

    if (!updatedItem) {
      return next(new AppError('Checklist item not found', 404));
    }

    res.status(200).json({ message: 'Checklist item updated', item: updatedItem });
  } catch (error) {
    next(new AppError('Failed to update checklist item', 500));
  }
};