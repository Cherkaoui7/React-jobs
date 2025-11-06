// src/components/JobCard.jsx
import { Link } from 'react-router-dom';

// Déstructurez _id dans les props
const JobCard = ({ title, company, location, salary, description, _id }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Full-Time</span>
          <h3 className="font-bold text-lg mt-1 group-hover:text-indigo-600 transition">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{company}</p>
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L7 11H5v-2L2.05 6.05zm6.95 6.95L8 14.95V17h2l2.95-2.95z" clipRule="evenodd" />
          </svg>
          {location}
        </div>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-2 text-sm">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-indigo-600">${salary} / Year</span>
        {/* ✅ Utilisez _id ici — il est bien déstructuré ci-dessus */}
        <Link to={`/job/${_id}`} className="text-indigo-600 text-sm font-medium hover:underline">
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default JobCard;