import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 px-6 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">R</div>
          <span className="font-bold text-xl text-gray-800">React Jobs</span>
        </div>
        <div className="flex space-x-8">
          <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">Home</Link>
          <Link to="/jobs" className="text-gray-700 hover:text-indigo-600 font-medium transition">Jobs</Link>
          <Link to="/add-job" className="text-gray-700 hover:text-indigo-600 font-medium transition">Add Job</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;