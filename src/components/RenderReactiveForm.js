import { useState } from 'react'

import { createFillableModel, createSubmitableModel, updateArrOfObjState, hasError } from "../utils"

import { submitForm } from "../db"

import MultiOptionField from "./MultiOptionField"

function RenderReactiveForm({ model, onSubmitted }){
    const [fillableModel, setFillableModel] = useState(createFillableModel(model))
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    var Status = {};

    var inputs = document.getElementsByTagName('input');
    
    var focusHandler = function() {
        var name = this.name;
        console.log("Focus", name, Status[name]);
        if (!Status[name]) Status[name] = {
            total: 0,
            focus: Date.now()
        }
        else Status[name].focus = Date.now();
    }
    var blurHandler = function() {
        var name = this.name;
        if (Status[name]) {
            Status[name].total += Date.now() - Status[name].focus;
        }
    }
    
    for (var i = 0, l = inputs.length; i < l; i++) {
        console.log(inputs.length);
        inputs[i].onfocus = focusHandler;
        inputs[i].onblur = blurHandler;
    }
    
    document.getElementsByTagName('button').onclick = function() {
        console.log(Status);
    };

    const handleSubmit = async () => {

        setErr("")
        if(loading) return

        let error = hasError(fillableModel, model.id)
        if(error) return setErr(error)

        setLoading(true)

        let submitableModel = createSubmitableModel(fillableModel)
        
        try{
            await submitForm(submitableModel, model.id)
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
                    <input name='short' type={field.type === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
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