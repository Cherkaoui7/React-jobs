// src/components/SectionCard.jsx
import { Link } from 'react-router-dom';

const SectionCard = ({ title, description, buttonLabel, variant = "default" }) => {
  const bgColor = variant === "employer" ? "bg-blue-100" : "bg-indigo-100";
const textColor = variant === "employer" ? "text-blue-900" : "text-indigo-900";
  const buttonBg = variant === "employer" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700";

  return (
    <div className="w-80 h-96 [perspective:1000px] cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]
        hover:[transform:rotateY(180deg)]">
        
        {/* Front */}
        <div className={`absolute inset-0 bg-gradient-to-br ${bgColor} backdrop-blur-sm 
          rounded-2xl p-6 border border-white/10 [backface-visibility:hidden]`}>
          <h2 className={`text-2xl font-bold mb-4 ${textColor}`}>{title}</h2>
          <p className={`mb-6 text-300`}>{description}</p>
          <div className="flex items-center text-red-500 font-medium">
            <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
            <span>Hover to reveal more</span>
          </div>
        </div>

        
        <div className={`absolute inset-0 bg-gradient-to-br ${buttonBg} text-white rounded-2xl p-6 
          [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col justify-center`}>
          <div className="text-4xl mb-4">✨</div>
          <h3 className="text-xl font-bold mb-3">You’re in control</h3>
          <p className="text-indigo-100 mb-6 text-sm">
            {variant === "employer" 
              ? "Post in 30 seconds. No approval. No limits."
              : "Browse 100+ vetted opportunities. Remote-first."
            }
          </p>
          <Link 
            to={buttonLabel === "Add Job" ? "/add-job" : "/jobs"}
            className="mt-auto px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium 
              transition border border-white/30 text-center"
          >
            {variant === "employer" ? "Start Hiring" : "Find Your Role"}
          </Link>
        </div>
      </div>
    </div>
    
  );
  
};

export default SectionCard;