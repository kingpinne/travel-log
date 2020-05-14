const { Router } = require('express');

const LogEntry = require('../models/LogEntry');

const router = Router();

//get all
router.get('/', async (req, res, next) => {
  try {
    const entries = await LogEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

//get 1 by id
router.get('/:id', async (req, res, next) => {
  try {
    const entry = await LogEntry.findById(req.params.id);
    res.json(entry);
  } catch (error) {
    next(error);
  }
});

//update a log
router.patch('/:id', async (req, res, next) => {
  try {
    const updatedEntry = await LogEntry.findByIdAndUpdate(
      req.params.id,
      req.body,
    );
    res.json(updatedEntry);
  } catch (error) {
    next(error);
  }
});

//Create a log
router.post('/', async (req, res, next) => {
  try {
    const logEntry = new LogEntry(req.body);
    const createdEntry = await logEntry.save();
    res.json(createdEntry);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    next(error);
  }
});

//delete a log
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedEntry = await LogEntry.findByIdAndDelete(req.params.id);
    res.json(deletedEntry);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
