// src/pages/Home.jsx
import { useState, useEffect } from 'react';

import SectionCard from '../components/SectionCard';
import JobCard from '../components/JobCard';
import { Link } from 'react-router-dom';
const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('https://react-jobs-production.up.railway.app/api/jobs');
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('Error loading jobs:', err);
        alert('❌ Failed to load jobs. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div>
      {/* Bannière avec bouton “Browse All Jobs” */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-10 rounded-full -translate-y-12 translate-x-12"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-5 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            Become a React Dev
          </h1>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Find the perfect React job that fits your skills, salary, and location — curated for you.
          </p>
          <Link
            to="/jobs"
            className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300"
          >
            Browse All Jobs →
          </Link>
        </div>
      </div>

      <div className="py-10 px-6">
        <div className="flex flex-col md:flex-row gap-6 justify-center mb-10">
          <SectionCard
            title="For Developers"
            description="Browse our React jobs and start your career today"
            buttonLabel="Browse Jobs"
            variant="default"
          />
          <SectionCard
            title="For Employers"
            description="List your job to find the perfect developer for the role"
            buttonLabel="Add Job"
            variant="employer"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">Browse Jobs</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <p className="text-center col-span-3 text-gray-500">No jobs available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;