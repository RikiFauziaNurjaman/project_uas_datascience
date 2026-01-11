import React, { useState } from "react";
import http from "../../api/apiClient";

function FormPredict({ isLoading, setLoading, predictResult, setPredictResult }) {
    const [form, setForm] = useState({
        age: 50,
        trestbps: 120,
        chol: 200,
        thalch: 150,
        oldpeak: 1.0,
        sex: "1",
        cp: "0",
        fbs: "0",
        restecg: "0",
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
            const payload = {
                age: Number(form.age),
                trestbps: Number(form.trestbps),
                chol: Number(form.chol),
                thalch: Number(form.thalch),
                oldpeak: Number(form.oldpeak),
                sex: form.sex,
                cp: form.cp,
                fbs: form.fbs,
                restecg: form.restecg,
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

    return (
        <form onSubmit={handleSubmit} className="form-predict">
            <div>
                <label>Age</label>
                <input name="age" type="number" value={form.age} onChange={handleChange} />
            </div>
            <div>
                <label>TrestBPS</label>
                <input name="trestbps" type="number" value={form.trestbps} onChange={handleChange} />
            </div>
            <div>
                <label>Chol</label>
                <input name="chol" type="number" value={form.chol} onChange={handleChange} />
            </div>
            <div>
                <label>Thalch</label>
                <input name="thalch" type="number" value={form.thalch} onChange={handleChange} />
            </div>
            <div>
                <label>Oldpeak</label>
                <input name="oldpeak" type="number" step="0.1" value={form.oldpeak} onChange={handleChange} />
            </div>
            <div>
                <label>Sex</label>
                <select name="sex" value={form.sex} onChange={handleChange}>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                </select>
            </div>
            <div>
                <label>CP (Chest pain)</label>
                <select name="cp" value={form.cp} onChange={handleChange}>
                    <option value="0">typical angina</option>
                    <option value="1">atypical angina</option>
                    <option value="2">non-anginal pain</option>
                    <option value="3">asymptomatic</option>
                </select>
            </div>
            <div>
                <label>FBS (&gt; 120 mg/dl)</label>
                <select name="fbs" value={form.fbs} onChange={handleChange}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>
            <div>
                <label>RestECG</label>
                <select name="restecg" value={form.restecg} onChange={handleChange}>
                    <option value="0">Normal</option>
                    <option value="1">ST-T wave abnormality</option>
                    <option value="2">Left ventricular hypertrophy</option>
                </select>
            </div>
            <div>
                <label>Exang (exercise induced angina)</label>
                <select name="exang" value={form.exang} onChange={handleChange}>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>

            <div style={{ marginTop: 12 }}>
                <button type="submit" disabled={isLoading}>{isLoading ? "Loading..." : "Predict"}</button>
            </div>
        </form>
    );
}

export default FormPredict;
