import FormPredict from "./components/formPredict.jsx";
import ResultPredict from "./components/resultPredict.js";

function PredictPage() {
    const [predictResult,setPredictResult] = require("react").useState(null);
    const [isLoading,setLoading] = require("react").useState(false);
    return (
        <div className="predict-page">
            <h1>Prediksi Jantung</h1>
            <p>Isi formulir di bawah ini untuk memprediksi risiko penyakit jantung.</p>
            <FormPredict
                isLoading={isLoading}
                setLoading={setLoading}
                predictResult={predictResult}
                setPredictResult={setPredictResult}
            />  
            <ResultPredict
                isLoading={isLoading}
                predictResult={predictResult}
            />
        </div>
    );
}