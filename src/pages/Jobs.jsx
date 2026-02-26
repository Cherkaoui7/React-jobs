// src/pages/Jobs.jsx
import { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import { fetchJobs } from '../utils/api';
import Toast from '../components/Toast';
import { AnimatePresence } from 'framer-motion';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const data = await fetchJobs();
        setJobs(data);
      } catch (err) {
        console.error('Error loading jobs:', err);
        setToast({ message: 'Failed to load jobs.', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <div className="py-10 px-6 max-w-4xl mx-auto">
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Jobs</h1>
      <p className="text-gray-600 mb-4">
        Browse all available jobs.
      </p>

      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <JobCard
                key={job._id}
                _id={job._id}
                title={job.title}
                company={job.company}
                location={job.location}
                salary={job.salary}
                description={job.description}
              />
            ))
          ) : (
            <p className="text-center col-span-2 text-gray-500">No jobs available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Jobs;