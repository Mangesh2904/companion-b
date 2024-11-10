// models/checklist.js
import mongoose from 'mongoose';

const checklistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  content: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for better query performance
checklistSchema.index({ userId: 1, createdAt: -1 });

const Checklist = mongoose.model('Checklist', checklistSchema);

export default Checklist;