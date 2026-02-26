// src/utils/api.js
import * as mockApi from './mockApi';

export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const API_KEY = process.env.REACT_APP_API_KEY || 'supersecretkey';

// Check if we should use the LocalStorage mock Database
const USE_MOCK = process.env.REACT_APP_USE_MOCK_API === 'true';

// GET all jobs
export const fetchJobs = async () => {
    if (USE_MOCK) return mockApi.fetchJobs();

    const res = await fetch(`${API_URL}/jobs`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return await res.json();
};

// GET job by ID
export const fetchJobById = async (id) => {
    if (USE_MOCK) return mockApi.fetchJobById(id);

    const res = await fetch(`${API_URL}/jobs/${id}`);
    if (!res.ok) throw new Error('Job not found');
    return await res.json();
};

// POST new job
export const createJob = async (jobData) => {
    if (USE_MOCK) return mockApi.createJob(jobData);

    const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        },
        body: JSON.stringify(jobData)
    });

    const data = await res.json();
    if (!res.ok) {
        const error = new Error('Job creation failed');
        error.status = res.status;
        error.data = data;
        throw error;
    }
    return data;
};
