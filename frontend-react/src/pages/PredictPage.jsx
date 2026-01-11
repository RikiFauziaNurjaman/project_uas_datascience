import React, { useState } from "react";
import FormPredict from "./components/formPredict.jsx";
import ResultPredict from "./components/resultPredict.jsx";

function PredictPage() {
  const [predictResult, setPredictResult] = useState(null);
  const [isLoading, setLoading] = useState(false);

  return (
    <div className="animate-pulse-once">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
          🫀 Deteksi Risiko Penyakit Jantung
        </h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed">
          Sistem prediksi berbasis{" "}
          <span className="text-purple-400 font-medium">Machine Learning</span>{" "}
          untuk membantu analisis awal risiko penyakit jantung berdasarkan data
          kesehatan Anda.
        </p>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start">
        {/* Form Section */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 lg:p-8">
          {/* Form Header */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg">
              📋
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                Data Kesehatan Pasien
              </h2>
              <p className="text-sm text-white/50">
                Lengkapi semua formulir di bawah ini
              </p>
            </div>
          </div>

          {/* Form Component */}
          <FormPredict
            isLoading={isLoading}
            setLoading={setLoading}
            predictResult={predictResult}
            setPredictResult={setPredictResult}
          />
        </div>

        {/* Result Section */}
        <ResultPredict isLoading={isLoading} predictResult={predictResult} />
      </div>
    </div>
  );
}

export default PredictPage;
