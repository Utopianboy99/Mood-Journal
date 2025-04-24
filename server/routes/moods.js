import express from 'express';
import Mood from '../models/Mood.js';

const router = express.Router();

// GET all moods
router.get('/', async (req, res) => {
  const moods = await Mood.find().sort({ createdAt: -1 });
  res.json(moods);
});

// POST a new mood
router.post('/', async (req, res) => {
  try {
    const newMood = new Mood(req.body);
    const savedMood = await newMood.save();
    res.status(201).json(savedMood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT (update) a mood
router.put('/:id', async (req, res) => {
  try {
    const updatedMood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a mood
router.delete('/:id', async (req, res) => {
  try {
    await Mood.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
