// src/components/Hero.jsx
const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cosmos background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900"></div>
      
      {/* Stars */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`,
            }}
          ></div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute top-20 left-10 w-8 h-8 rounded-full bg-indigo-400 opacity-40 animate-float" style={{ animationDelay: '0s' }}></div>
      <div className="absolute bottom-32 right-20 w-6 h-6 rounded-full bg-cyan-400 opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-4 h-4 rounded-full bg-pink-400 opacity-60 animate-float" style={{ animationDelay: '2s' }}></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight 
          font-heading text-transparent bg-clip-text 
          bg-gradient-to-r from-white via-indigo-200 to-cyan-200">
          Code the <span className="text-indigo-300">Future</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Find your dream React role — where innovation meets impact.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 
          text-white font-bold rounded-2xl shadow-lg shadow-cyan-500/20
          hover:shadow-xl hover:shadow-cyan-500/40 transition-all duration-500
          transform hover:-translate-y-1 hover:scale-105 relative overflow-hidden">
          <span className="relative z-10">Explore Opportunities →</span>
          <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 rounded-2xl animate-ping"></span>
        </button>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default Hero;