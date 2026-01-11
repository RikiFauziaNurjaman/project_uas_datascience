import React from "react";

function ResultPredict({ isLoading, predictResult }) {
  const cardClass =
    "bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 lg:sticky lg:top-24";

  // Loading State
  if (isLoading) {
    return (
      <div className={cardClass}>
        <div className="text-center py-8">
          <div className="w-16 h-16 border-4 border-white/10 border-t-purple-500 rounded-full mx-auto mb-6 animate-spin"></div>
          <p className="text-white/60 text-lg">
            Menganalisis data kesehatan...
          </p>
          <p className="text-white/40 text-sm mt-2">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!predictResult) {
    return (
      <div className={cardClass}>
        <div className="text-center py-8">
          <div className="text-6xl mb-4 opacity-50">🫀</div>
          <h3 className="text-xl font-semibold text-white/70 mb-2">
            Menunggu Analisis
          </h3>
          <p className="text-white/50 text-sm leading-relaxed">
            Lengkapi formulir dan klik tombol{" "}
            <span className="text-purple-400">"Analisis Risiko Jantung"</span>{" "}
            untuk melihat hasil prediksi.
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (predictResult.error) {
    return (
      <div className={cardClass}>
        <div className="text-center py-6 px-4 bg-red-500/10 rounded-xl border border-red-500/20">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-400 mb-2">
            Terjadi Kesalahan
          </h3>
          <p className="text-white/60 text-sm">{predictResult.error}</p>
        </div>
      </div>
    );
  }

  // Calculate risk level
  const probability = predictResult.probabilitas || 0;
  const isRisk = probability > 0.4;
  const percentageWidth = Math.min(probability * 100, 100);

  return (
    <div className={cardClass}>
      <div>
        {/* Status Icon */}
        <div className="text-center mb-6">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 ${
              isRisk ? "bg-red-500/20" : "bg-green-500/20"
            }`}
          >
            {isRisk ? "⚠️" : "✅"}
          </div>
          <h2
            className={`text-2xl font-bold mb-1 ${
              isRisk ? "text-red-400" : "text-green-400"
            }`}
          >
            {predictResult.kesimpulan_klinis || (isRisk ? "BERISIKO" : "SEHAT")}
          </h2>
          <p className="text-white/50 text-sm">
            Hasil Analisis Prediksi Jantung
          </p>
        </div>

        {/* Probability Meter */}
        <div className="bg-black/20 rounded-xl p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-white/60 text-sm">Tingkat Risiko</span>
            <span className="text-xl font-bold text-white">
              {predictResult.presentase_probabilitas ||
                `${(probability * 100).toFixed(1)}%`}
            </span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 transition-all duration-1000 ease-out"
              style={{ width: `${percentageWidth}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-white/40 mt-2">
            <span>Rendah</span>
            <span>Sedang</span>
            <span>Tinggi</span>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-3 border-t border-white/10 pt-5">
          <div className="flex justify-between items-center py-2">
            <span className="text-white/50 text-sm">Tipe Prediksi</span>
            <span className="text-white font-medium text-sm">
              {predictResult.type || "Penyakit Jantung"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-white/5">
            <span className="text-white/50 text-sm">Klasifikasi</span>
            <span
              className={`font-semibold text-sm px-3 py-1 rounded-full ${
                predictResult.kelas === 1
                  ? "bg-red-500/20 text-red-400"
                  : "bg-green-500/20 text-green-400"
              }`}
            >
              {predictResult.kelas === 1
                ? "Positif (Risiko)"
                : "Negatif (Aman)"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-white/5">
            <span className="text-white/50 text-sm">Skor Probabilitas</span>
            <span className="text-white font-mono text-sm">
              {probability.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
          <p className="text-yellow-400/80 text-xs text-center leading-relaxed">
            ⚠️ <strong>Disclaimer:</strong> Hasil ini hanya untuk referensi dan
            bukan diagnosis medis. Konsultasikan dengan dokter untuk pemeriksaan
            lebih lanjut.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResultPredict;
