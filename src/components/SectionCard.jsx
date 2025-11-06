// src/components/SectionCard.jsx
import { Link } from 'react-router-dom';

const SectionCard = ({ title, description, buttonLabel, onClick, variant = "default" }) => {
  const bgColor = variant === "employer" ? "bg-blue-50" : "bg-white";
  const textColor = variant === "employer" ? "text-blue-800" : "text-gray-800";
  const buttonBg = variant === "employer" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700";

  return (
    <div className={`p-6 rounded-xl shadow-md ${bgColor} border border-gray-100 max-w-md mx-auto transition-transform hover:scale-105 hover:shadow-lg`}>
      <h2 className={`text-xl font-bold mb-2 ${textColor}`}>{title}</h2>
      <p className={`mb-4 ${textColor} opacity-80`}>{description}</p>
      <Link
        to="/jobs"  // ← Redirection vers la page des jobs
        className={`${buttonBg} text-white px-5 py-2 rounded-lg font-medium transition`}
      >
        {buttonLabel}
      </Link>
    </div>
  );
};

export default SectionCard;