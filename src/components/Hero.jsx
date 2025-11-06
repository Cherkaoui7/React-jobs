const Hero = () => {
  return (
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
        <button 
          onClick={() => window.scrollTo(0, document.body.scrollHeight)}
          className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300">
          Browse All Jobs →
        </button>
      </div>
    </div>
  );
};

export default Hero;