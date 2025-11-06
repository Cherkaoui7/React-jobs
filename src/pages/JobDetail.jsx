// src/pages/JobDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/jobs/${id}`);
        if (!res.ok) throw new Error('Job not found');
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error('Error loading job:', err);
        alert('❌ Job not found or server error');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading job details...</div>;
  }

  if (!job) {
    return (
      <div className="text-center py-10">
        <p>Job not found.</p>
        <Link to="/jobs" className="text-indigo-600 hover:underline">Back to Jobs</Link>
      </div>
    );
  }

  return (
    <div className="py-10 px-6 max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm mb-2">Full-Time</span>
            <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-lg text-gray-500 mt-1">{job.company}</p>
          </div>
          <div className="text-gray-400 text-sm flex items-center">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L7 11H5v-2L2.05 6.05zm6.95 6.95L8 14.95V17h2l2.95-2.95z" clipRule="evenodd" />
            </svg>
            {job.location}
          </div>
        </div>

        {/* Salary */}
        <div className="mb-6">
          <div className="flex items-center text-indigo-600 font-semibold">
            💰 <span className="ml-2">${job.salary} / Year</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">📌 About the Role</h2>
          <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">✅ Requirements</h3>
            <ul className="list-disc list-inside text-blue-700">
              <li>Experience with React.js</li>
              <li>Strong JavaScript skills</li>
              <li>Ability to work in a team</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✨ Benefits</h3>
            <ul className="list-disc list-inside text-green-700">
              <li>Remote work</li>
              <li>Flexible hours</li>
              <li>Professional development</li>
            </ul>
          </div>
        </div>

        {/* Back button */}
        <div className="mt-6">
          <Link to="/jobs" className="text-indigo-600 hover:underline font-medium">
            ← Back to All Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;