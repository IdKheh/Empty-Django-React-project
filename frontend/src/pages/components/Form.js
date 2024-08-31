import React, { useState, useRef } from 'react';
import axios from "axios";

const Form = ({ setResult }) => {
    const [models, setModels] = useState([
        { model: "Model 1", check: false },
        { model: "Model 2", check: false },
        { model: "Model 3", check: false },
    ]);

    const [methods, setMethods] = useState([
        { method: "Method 1", check: false },
        { method: "Method 2", check: false },
        { method: "Method 3", check: false },
        { method: "Method 4", check: false },
        { method: "Method 5", check: false },
        { method: "Method 6", check: false },
    ]);

    const inputRef = useRef();

    const handleChangeModels = (check, i) => {
        let tmp = models[i];
        tmp.check = !check;
        let modelsClone = [...models];
        modelsClone[i] = tmp;
        setModels([...modelsClone]);
    };

    const handleChangeMethods = (check, i) => {
        let tmp = methods[i];
        tmp.check = !check;
        let methodsClone = [...methods];
        methodsClone[i] = tmp;
        setMethods([...methodsClone]);
    };

    const sendRequest = () => {
        const filteredModels = models.filter(item => item.check);
        const model = filteredModels.map(item => item.model);
        const filteredMethods = methods.filter(item => item.check);
        const method = filteredMethods.map(item => item.method);

        axios.get(`http://localhost:8000/test/?modelsNLP=[${model}]&methods=[${method}]&textThema=${inputRef.current.value}`)
            .then(function (response) {
                setResult(response.data.message);
            });
    };

    return (
        <div id='content'>     
            <div id='nlpModels' className='checkboxes'>
                <p className='nameCheckbox'>NLP models</p>
                {models.map(({ model, check }, i) => (
                    <div key={i}>
                        <label htmlFor={`model-${i}`}>
                            <input id={`model-${i}`} type="checkbox" onChange={() => handleChangeModels(check, i)} checked={check}/>
                            <span>{model}</span>
                        </label>
                    </div>
                ))}
            </div>

            <div id='methods' className='checkboxes'>
                <p className='nameCheckbox'>Methods</p>
                {methods.map(({ method, check }, i) => (
                    <div key={i}>
                        <label htmlFor={`method-${i}`}>
                            <input id={`method-${i}`} type="checkbox" onChange={() => handleChangeMethods(check, i)} checked={check}/>
                            <span>{method}</span>
                        </label>
                    </div>
                ))}
            </div>
            <textarea id='thema' ref={inputRef} placeholder='Write text there...' rows={5} cols={50}></textarea>
            <button id='submitButton' onClick={() => sendRequest()}>Generate report</button>
        </div>
    );
};

export default Form;