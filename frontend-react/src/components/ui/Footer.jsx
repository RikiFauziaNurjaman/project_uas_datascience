import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/80 backdrop-blur-xl border-t border-white/10 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-white/60 text-sm">
          © {currentYear}{" "}
          <span className="font-semibold text-white/80">HeartRisk AI</span> —
          Sistem Prediksi Berbasis Machine Learning
        </p>
        <p className="text-white/40 text-xs mt-2">
          Dibuat untuk Tugas UAS Pemrograman Web II
        </p>
      </div>
    </footer>
  );
}
