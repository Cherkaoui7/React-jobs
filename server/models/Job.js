const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, default: 'Untitled Job' },
  company: { type: String, default: 'Unknown Company' },
  location: { type: String, default: 'Remote' },
  salary: { type: String, default: 'Negotiable' },
  description: { type: String, default: 'No description provided.' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);