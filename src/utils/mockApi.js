// src/utils/mockApi.js

// Initial Seed Data
const initialJobs = [
    {
        _id: "1",
        title: "Senior React Developer",
        company: "TechCorp",
        location: "Remote",
        salary: "120K - 150K",
        description: "Looking for an experienced React developer to lead our frontend team."
    },
    {
        _id: "2",
        title: "Frontend Engineer",
        company: "Innovate Inc",
        location: "New York, NY",
        salary: "90K - 110K",
        description: "Join our fast-paced startup to build awesome UIs with React and Tailwind."
    },
    {
        _id: "3",
        title: "Full Stack Developer (MERN)",
        company: "WebSolutions",
        location: "San Francisco, CA",
        salary: "110K - 130K",
        description: "Deep knowledge of MongoDB, Express, React, and Node.js required."
    }
];

// Helper to simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getStorageJobs = () => {
    const jobs = localStorage.getItem('reactjobs_data');
    if (!jobs) {
        // Seed initial data if none exists
        localStorage.setItem('reactjobs_data', JSON.stringify(initialJobs));
        return initialJobs;
    }
    return JSON.parse(jobs);
};

export const fetchJobs = async () => {
    await delay(500); // simulate 500ms network delay
    return getStorageJobs();
};

export const fetchJobById = async (id) => {
    await delay(500);
    const jobs = getStorageJobs();
    const job = jobs.find(j => j._id === id);
    if (!job) {
        throw new Error('Job not found');
    }
    return job;
};

export const createJob = async (jobData) => {
    await delay(800);

    // Basic validation
    if (!jobData.title || !jobData.company || !jobData.location || !jobData.salary || !jobData.description) {
        const error = new Error('Validation failed');
        error.status = 400;
        error.data = { message: "All fields are required" };
        throw error;
    }

    const jobs = getStorageJobs();
    const newJob = {
        ...jobData,
        _id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString()
    };

    jobs.unshift(newJob); // Add to beginning
    localStorage.setItem('reactjobs_data', JSON.stringify(jobs));

    return newJob;
};
