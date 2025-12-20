import os
import numpy as np
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.mobilenet_v3 import preprocess_input
from PIL import Image
import io
import pandas as pd
import joblib 

app = Flask(__name__)

BASE_DIR = os.getcwd()
MODEL_PATH_SAMPAH = os.path.join(BASE_DIR, 'models', 'model_sampah.keras')
HEART_MODEL_PATH = os.path.join(BASE_DIR, 'models', 'model_jantung_rf.pkl')
HEART_COLUMNS_PATH = os.path.join(BASE_DIR, 'models', 'model_columns.pkl')
TARGET_SIZE = (224, 224)

LABELS_MAP = {
    0: 'O (Organik)', 
    1: 'R (Recycle)'
}

model_sampah = None
try:
    model_sampah = load_model(MODEL_PATH_SAMPAH, custom_objects={'preprocess_input': preprocess_input})
except Exception as e:
    print(f"GAGAL: {e}")

jantung_model    = None
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

def prepare_image(image, target_size):
    if image.mode != "RGB":
        image = image.convert("RGB")
    
    image = image.resize(target_size)
    
    image = img_to_array(image)
    
    image = np.expand_dims(image, axis=0)

    image = preprocess_input(image)
    
    return image

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "message": "Aplikasi cek jenis sampah dan deteksi jantung",
        "status": "aktif",
        "model_loaded": {
            "sampah": model_sampah is not None,
            "jantung": jantung_model is not None
        }
    })

@app.route("/api/predict", methods=["POST"])
def predict():
    if model_sampah is None:
        return jsonify({
            "status": "error",
            "message": "Model gagal dimuat server"
        }), 500

    if "file" not in request.files:
        return jsonify({
            "status": "error",
            "message": "Key 'file' tidak ditemukan dalam request"
        }), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({
            "status": "error",
            "message": "Tidak ada file yang dipilih"
        }), 400

    try:
        image = Image.open(io.BytesIO(file.read()))
        processed_image = prepare_image(image, TARGET_SIZE)
        
        prediction = model_sampah.predict(processed_image)
        
        score = float(prediction[0][0])
        
        if score < 0.5:
            label = LABELS_MAP[0]
            confidence = 1 - score 
        else:
            label = LABELS_MAP[1]
            confidence = score    

        return jsonify({
            "status": "success",
            "data": {
                "class": label,
                "score_confidence": confidence,
                "presentase_confidence": f"{confidence:.2%}",
                "score": score
            }
        })

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

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