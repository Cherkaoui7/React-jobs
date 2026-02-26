// src/pages/JobDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJobById } from '../utils/api';
import Toast from '../components/Toast';
import { AnimatePresence } from 'framer-motion';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const data = await fetchJobById(id);
        setJob(data);
      } catch (err) {
        console.error('Error loading job:', err);
        setToast({ message: 'Job not found', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    loadJob();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading job details...</div>;
  }

  if (!job) {
    return (
      <div className="text-center py-10">
        <AnimatePresence>
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </AnimatePresence>
        <p>Job not found.</p>
        <Link to="/jobs" className="text-indigo-600 hover:underline">Back to Jobs</Link>
      </div>
    );
  }

  return (
    // src/pages/JobDetail.jsx (extrait clé)
    <div className="max-w-4xl mx-auto px-6 pt-24 relative">
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>
      <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-indigo-900/80 to-cyan-900/80 
      backdrop-blur-md text-white p-8">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-3">🚀 Featured</span>
              <h1 className="text-3xl font-bold font-heading">{job?.title}</h1>
              <p className="text-indigo-200 mt-2">{job?.company} • {job?.location}</p>
            </div>
            <div className="text-3xl">💼</div>
          </div>
        </div>

        <div className="p-8">
          {/* Salary badge */}
          <div className="inline-block bg-gradient-to-r from-indigo-600 to-cyan-600 
        text-white px-4 py-2 rounded-full font-bold mb-6">
            💰 ${job?.salary} / Year
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white flex items-center mb-4 font-heading">
              <span className="mr-2">📌</span> About the Role
            </h2>
            <p className="text-gray-900 whitespace-pre-line">{job?.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Requirements */}
            <div className="bg-indigo-900/30 border border-indigo-500/30 rounded-xl p-5">
              <h3 className="font-bold text-indigo-700 mb-3 flex items-center">
                <span className="mr-2">✅</span> Requirements
              </h3>
              <ul className="text-black space-y-1">
                <li>• 3+ years React experience</li>
                <li>• TypeScript proficiency</li>
                <li>• CI/CD familiarity</li>
              </ul>
            </div>

            {/* Benefits */}
            <div className="bg-cyan-900/30 border border-cyan-500/30 rounded-xl p-5">
              <h3 className="font-bold text-cyan-900 mb-3 flex items-center">
                <span className="mr-2">✨</span> Perks & Benefits
              </h3>
              <ul className="text-cyan-100 space-y-1">
                <li>• 💰 Competitive salary</li>
                <li>• 🌍 Remote-first</li>
                <li>• 🎓 $3,000 learning stipend</li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 
          text-white font-bold rounded-xl shadow-lg hover:shadow-xl 
          transition-all transform hover:-translate-y-1 relative overflow-hidden">
              <span className="relative z-10">Apply Now →</span>
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 
            rounded-xl animate-ping"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;