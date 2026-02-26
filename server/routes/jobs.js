// server/routes/jobs.js
const express = require('express');
const Job = require('../models/Job');

const router = express.Router();

const { body, validationResult } = require('express-validator');

// Middleware to check API Key
const requireApiKey = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ message: 'Unauthorized: Invalid or missing API Key' });
  }
  next();
};

// POST /api/jobs
router.post(
  '/',
  requireApiKey,
  [
    body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 100 }),
    body('company').trim().notEmpty().withMessage('Company is required').isLength({ max: 100 }),
    body('location').trim().notEmpty().withMessage('Location is required').isLength({ max: 100 }),
    body('salary').trim().notEmpty().withMessage('Salary is required').isLength({ max: 50 }),
    body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 5000 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ ObjectType: "Error", errors: errors.array() });
      }

      const { title, company, location, salary, description } = req.body;
      const job = new Job({
        title,
        company,
        location,
        salary,
        description
      });
      await job.save();
      res.status(201).json(job);
    } catch (err) {
      console.error('Job creation error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectID to prevent CastError crashes
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: 'Invalid Job ID format' });
    }

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.error('Job fetching error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;