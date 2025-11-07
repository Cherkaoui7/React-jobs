// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 px-6 py-4 transition-all duration-500 
      bg-white/50 backdrop-blur-md border-b border-black/10  mr-5 shadow-xl
      text-black/90">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          {/* Logo 3D animé */}
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 
            rounded-xl flex items-center justify-center text-white font-bold text-xl
            transform transition-transform duration-700 hover:rotate-180 hover:scale-105">
            <span className="transform -rotate-12">⚛️</span>
          </div>
          <span className="font-bold text-xl tracking-tight">
            <span className="font-heading text-indigo-200">React</span>
            <span className="text-white">Jobs</span>
          </span>
        </div>
        <div className="flex space-x-8">
          <Link to="/" className="hover:text-indigo-300 font-medium transition relative group">
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 
              group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/jobs" className="hover:text-indigo-300 font-medium transition relative group">
            Jobs
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 
              group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link to="/add-job" className="hover:text-indigo-300 font-medium transition relative group">
            Add Job
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 
              group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;