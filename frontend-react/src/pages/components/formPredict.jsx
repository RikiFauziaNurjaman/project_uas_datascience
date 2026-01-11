import React, { useState } from "react";
import http from "../../api/apiClient";

function FormPredict({
  isLoading,
  setLoading,
  predictResult,
  setPredictResult,
}) {
  const [form, setForm] = useState({
    age: 50,
    trestbps: 120,
    chol: 200,
    thalch: 150,
    oldpeak: 1.0,
    sex: "Male",
    cp: "typical angina",
    fbs: "0",
    restecg: "normal",
    exang: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPredictResult(null);
    try {
      const sexValue = form.sex === "Male" ? "1" : "0";

      const cpMap = {
        "typical angina": "0",
        "atypical angina": "1",
        "non-anginal": "2",
        asymptomatic: "3",
      };

      const restecgMap = {
        normal: "0",
        "lv hypertrophy": "2",
      };

      const payload = {
        age: Number(form.age),
        trestbps: Number(form.trestbps),
        chol: Number(form.chol),
        thalch: Number(form.thalch),
        oldpeak: Number(form.oldpeak),
        sex: sexValue,
        cp: cpMap[form.cp] || "0",
        fbs: form.fbs,
        restecg: restecgMap[form.restecg] || "0",
        exang: form.exang,
      };

      const res = await http.post("/api/predict-heart", payload);
      if (res.data && res.data.status === "success") {
        setPredictResult(res.data.data);
      } else {
        setPredictResult({ error: res.data?.message || "Unknown response" });
      }
    } catch (err) {
      setPredictResult({ error: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 hover:bg-white/10";

  const selectClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 hover:bg-white/10 cursor-pointer";

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Age */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <span>👤</span> Umur (Age)
          </label>
          <input
            className={inputClass}
            name="age"
            type="number"
            min="1"
            max="120"
            value={form.age}
            onChange={handleChange}
            placeholder="Masukkan umur"
          />
          <span className="text-xs text-white/40">Usia pasien dalam tahun</span>
        </div>

        {/* Sex */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <span>⚧</span> Jenis Kelamin (Sex)
          </label>
          <select
            className={selectClass}
            name="sex"
            value={form.sex}
            onChange={handleChange}
          >
            <option value="Male" className="bg-slate-800">
              Laki-laki (Male)
            </option>
            <option value="Female" className="bg-slate-800">
              Perempuan (Female)
            </option>
          </select>
        </div>

        {/* Blood Pressure */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <span>💉</span> Tekanan Darah (Trestbps)
          </label>
          <input
            className={inputClass}
            name="trestbps"
            type="number"
            min="80"
            max="250"
            value={form.trestbps}
            onChange={handleChange}
            placeholder="mmHg"
          />
          <span className="text-xs text-white/40">
            Tekanan darah istirahat (mmHg)
          </span>
        </div>

        {/* Cholesterol */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <span>🩸</span> Kolesterol (Chol)
          </label>
          <input
            className={inputClass}
            name="chol"
            type="number"
            min="100"
            max="600"
            value={form.chol}
            onChange={handleChange}
            placeholder="mg/dl"
          />
          <span className="text-xs text-white/40">
            Kolesterol serum (mg/dl)
          </span>
        </div>

        {/* Max Heart Rate */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <span>💓</span> Detak Jantung Maks (Thalch)
          </label>
          <input
            className={inputClass}
            name="thalch"
            type="number"
            min="60"
            max="220"
            value={form.thalch}
            onChange={handleChange}
            placeholder="bpm"
          />
          <span className="text-xs text-white/40">
            Detak jantung maksimal tercapai
          </span>
        </div>

        {/* Oldpeak */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <span>📉</span> Penurunan ST (Oldpeak)
          </label>
          <input
            className={inputClass}
            name="oldpeak"
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={form.oldpeak}
            onChange={handleChange}
            placeholder="0.0"
          />
          <span className="text-xs text-white/40">
            Depresi ST setelah olahraga
          </span>
        </div>

        {/* Chest Pain Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <span>🫁</span> Tipe Nyeri Dada (CP)
          </label>
          <select
            className={selectClass}
            name="cp"
            value={form.cp}
            onChange={handleChange}
          >
            <option value="typical angina" className="bg-slate-800">
              Typical Angina
            </option>
            <option value="atypical angina" className="bg-slate-800">
              Atypical Angina
            </option>
            <option value="non-anginal" className="bg-slate-800">
              Non-Anginal Pain
            </option>
            <option value="asymptomatic" className="bg-slate-800">
              Asymptomatic
            </option>
          </select>
          <span className="text-xs text-white/40">
            Jenis nyeri dada yang dialami
          </span>
        </div>

        {/* Fasting Blood Sugar */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <span>🍬</span> Gula Darah Puasa (FBS)
          </label>
          <select
            className={selectClass}
            name="fbs"
            value={form.fbs}
            onChange={handleChange}
          >
            <option value="0" className="bg-slate-800">
              ≤ 120 mg/dl (Normal)
            </option>
            <option value="1" className="bg-slate-800">
              &gt; 120 mg/dl (Tinggi)
            </option>
          </select>
          <span className="text-xs text-white/40">Gula darah saat puasa</span>
        </div>

        {/* Resting ECG */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <span>📊</span> Hasil EKG Istirahat (RestECG)
          </label>
          <select
            className={selectClass}
            name="restecg"
            value={form.restecg}
            onChange={handleChange}
          >
            <option value="normal" className="bg-slate-800">
              Normal
            </option>
            <option value="lv hypertrophy" className="bg-slate-800">
              LV Hypertrophy
            </option>
          </select>
          <span className="text-xs text-white/40">
            Hasil elektrokardiografi
          </span>
        </div>

        {/* Exercise Induced Angina */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <span>🏃</span> Angina saat Olahraga (Exang)
          </label>
          <select
            className={selectClass}
            name="exang"
            value={form.exang}
            onChange={handleChange}
          >
            <option value="0" className="bg-slate-800">
              Tidak
            </option>
            <option value="1" className="bg-slate-800">
              Ya
            </option>
          </select>
          <span className="text-xs text-white/40">
            Nyeri dada saat berolahraga
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Menganalisis...
          </>
        ) : (
          <>🔍 Analisis Risiko Jantung</>
        )}
      </button>
    </form>
  );
}

export default FormPredict;
