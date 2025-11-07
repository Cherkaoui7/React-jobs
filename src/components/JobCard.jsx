// src/components/JobCard.jsx
import { Link } from 'react-router-dom';

const JobCard = ({ title, company, location, salary, description, _id }) => {
  return (
    <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 
      border border-white/10 overflow-hidden transition-all duration-500
      hover:bg-black/70 hover:border-indigo-500/50 hover:text-white">
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 
        transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 animate-pulse"></div>
      </div>

     
<span className="text-xs bg-indigo-500 font-bold text-yellow-400 px-2 py-1 rounded-full">Full-Time</span>
<h3 className="font-bold text-lg mt-1 text-black-900 group-hover:text-indigo-700 transition">{title}</h3>
<p className="text-sm  mt-1  hover:text-green-600">{company}</p>
<p className=" mb-4 line-clamp-2 text-sm ">{description}</p>
<span className="text-sm font-semibold text-indigo-700">${salary} / Year</span>
        <Link 
          to={`/job/${_id}`} 
          className="flex items-center text-indigo-300 hover:text-white transition-all group/link"
        >
          <span>Details</span>
          <span className="ml-1 group-hover/link:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
    
  );
};

export default JobCard;