import { useEffect, useState } from 'react'

import { createFillableModel, createSubmitableModel, updateArrOfObjState, hasError } from "../utils"

import { submitForm } from "../db"

import MultiOptionField from "./MultiOptionField"

function RenderReactiveForm({ model, onSubmitted }){
    const [fillableModel, setFillableModel] = useState(createFillableModel(model))
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const [time, setTime] = useState(Date.now());
    const [status, setStatus] = useState([]);
    var Status = {};
    var inputs = document.getElementsByTagName('input');
    
    var focusHandler = function(e) {
        var name = e.target.name;
        console.log("Focus", name, Status[name]);
        if (!Status[name]){
                Status[name] = {
                total: 0,
                focus: Date.now()
            }
            let newStatus = [...status, Status[name]]
            setStatus(newStatus);
        }
        else {
            Status[name].focus = Date.now();
            let newStatus = [...status, Status[name]]
            setStatus(newStatus);
        }
    }
    var blurHandler = function(e) {
        var name = e.target.name;
        if (Status[name]) {
            Status[name].total += Date.now() - Status[name].focus;
            let newStatus = [...status, Status[name]];
            setStatus(newStatus);
        }
    }
    
    for (var i = 0; i < inputs.length; i++) {
        console.log(inputs.length);
        inputs[i].onfocus = focusHandler;
        inputs[i].onblur = blurHandler;
    }
    
    // document.getElementsByTagName('button').onclick = function() {
    //     console.log(Status);
    // };

    const handleSubmit = async () => {
        console.log(status);
        console.log(Date.now(), time);
        console.log('time spent = ' + ((Date.now() - time)/1000).toString());
        let finalTime = (Date.now() - time);
        console.log(finalTime)
        //setTime(finalTime);
        console.log(time)
        setErr("")
        if(loading) return

        let error = hasError(fillableModel, model.id)
        if(error) return setErr(error)

        setLoading(true)

        let submitableModel = createSubmitableModel(fillableModel)
        
        try{
            await submitForm(submitableModel, model.id, finalTime / 1000)
            setLoading(false)
            onSubmitted()
        }catch(e){
            setErr(e.message)
            setLoading(false)
        }
    }

    return (
        <div className="main-form mt-1">
            { fillableModel.map((field, index) => ["short-text", "number"].indexOf(field.type) > -1
            ? (
                <div key={index} className="input">
                    <label>{field.title}{field.required && <span className="err">*</span>}</label>
                    <input name={field.type === "number" ? "number" : "short"} type={field.type === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                </div>
            ) : field.type === "long-text" ? (
                <div key={index} className="input">
                    <label>{field.title}{field.required && <span className="err">*</span>}</label>
                    <textarea onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)}></textarea>
                </div>
            ) : field.type === "multioption-singleanswer" ? (
                <MultiOptionField key={index} fieldModel={field} onSelected={res => updateArrOfObjState(setFillableModel, fillableModel, index, "value", res)} />
            ) : field.type === "slider"?(
                <div key={index} className="input">
                <label>{field.title}{field.required && <span className="err">*</span>}</label>
                <input name="slide" type = "range" onChange = {e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                </div>
            )
            : <p key={index}>Unknown field type</p>)}
            {err && <p className="err mb-1">{err}</p>}
            <button className="btn" onClick={handleSubmit}>{ loading ? <span className="spinner white"></span> : <span>submit</span>}</button>
        </div>
    )
}

export default RenderReactiveForm