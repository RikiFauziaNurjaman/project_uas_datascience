const { useState } = require("react");


function FormPredict({
    isLoading,
    setLoading,
    predictResult,
    setPredictResult
})
{

    const [form,setForm] = useState({
        Age : 0,
        TrestBPS : 0,
        Chol : 0,
        Thalch : 0,
        Oldpeak : 0,
        Sex : " ",
        CP : " ",
        Fbs : " ",
        RestECG : " ",
    })

    const handleChange =(event) => {
        const {name,value} = event.target;
        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        setLoading(true);
        setPredictResult(null);
    }
}
