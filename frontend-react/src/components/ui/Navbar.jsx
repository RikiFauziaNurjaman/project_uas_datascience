import React from "react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <a href="/" className="flex items-center gap-3 group">
            {/* Logo */}
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow duration-300">
              🫀
            </div>
            {/* Brand Text */}
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight">
                HeartRisk <span className="text-purple-400">AI</span>
              </h1>
              <p className="text-xs text-white/50 -mt-0.5">
                Prediksi Penyakit Jantung
              </p>
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
