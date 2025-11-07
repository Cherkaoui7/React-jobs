// server/routes/jobs.js
const express = require('express');
const Job = require('../models/Job');

const router = express.Router();

// POST /api/jobs
router.post('/', async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;
    const job = new Job({
      title: title || 'Untitled Job',
      company: company || 'Unknown Company',
      location: location || 'Remote',
      salary: salary || 'Negotiable',
      description: description || 'No description provided.'
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error('Job creation error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/jobs/:id ← NOUVEAU
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;