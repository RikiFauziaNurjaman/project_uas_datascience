import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib 

app = Flask(__name__)
CORS(app)

BASE_DIR = os.getcwd()
HEART_MODEL_PATH = os.path.join(BASE_DIR, 'models', 'model_jantung_rf.pkl')
HEART_COLUMNS_PATH = os.path.join(BASE_DIR, 'models', 'model_columns.pkl')

jantung_model = None
jantung_model_columns = None
try:
    if os.path.exists(HEART_MODEL_PATH) and os.path.exists(HEART_COLUMNS_PATH):
        jantung_model = joblib.load(HEART_MODEL_PATH)
        jantung_model_columns = joblib.load(HEART_COLUMNS_PATH)
        print("Model jantung ditemukan.")
    else:
        print(f"File model jantung tidak ditemukan")
except Exception as e:
    print(f"GAGAL model jantung: {e}")

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "message": "Aplikasi deteksi risiko penyakit jantung",
        "status": "aktif",
        "model_loaded": jantung_model is not None
    })

@app.route("/api/predict-heart", methods=["POST"])
def predict_heart():
    if jantung_model is None:
        return jsonify({
            "status": "error",
            "message": "Model jantung tidak ditemukan"
        }), 500

    try:
        data = request.json if request.is_json else request.form.to_dict()
        
        if not data:
             return jsonify({
                "status": "error",
                "message": "Tidak ada data yang dikirim"
            }), 400
        
        input_df = pd.DataFrame([data])
        
        cat_cols = ['cp', 'restecg', 'sex', 'exang', 'fbs']
        input_df = pd.get_dummies(input_df, columns=cat_cols, drop_first=True)
        
        input_df = input_df.reindex(columns=jantung_model_columns, fill_value=0)
            
        probabilitas = jantung_model.predict_proba(input_df)[0][1]
        prediksi_kelas = 1 if probabilitas > 0.5 else 0

        status_teks = "BERISIKO" if probabilitas > 0.4 else "SEHAT/RISIKO RENDAH"
        
        return jsonify({
            "status": "success",
            "data": {
                "type": "Prediksi resiko penyakit jantung",
                "kelas": int(prediksi_kelas),
                "probabilitas": float(probabilitas),
                "presentase_probabilitas": f"{probabilitas:.2%}",
                "kesimpulan_klinis": status_teks
            }
        })

    except Exception as e:
        print(f"Error Jantung: {e}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)