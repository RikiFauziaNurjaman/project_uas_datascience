import React from "react";

function ResultPredict({ isLoading, predictResult }) {
  if (isLoading) return <div>Memproses...</div>;

  if (!predictResult) return <div>Hasil akan muncul di sini.</div>;

  if (predictResult.error) return <div style={{ color: "#f43f5e" }}>Error: {predictResult.error}</div>;

  return (
    <div className="result-predict">
      <h3>Hasil Prediksi</h3>
      <p><strong>Tipe:</strong> {predictResult.type || "Prediksi resiko penyakit jantung"}</p>
      <p><strong>Kelas:</strong> {predictResult.kelas}</p>
      <p><strong>Probabilitas:</strong> {predictResult.presentase_probabilitas || predictResult.probabilitas}</p>
      <p><strong>Kesimpulan klinis:</strong> {predictResult.kesimpulan_klinis}</p>
    </div>
  );
}

export default ResultPredict;
