import { useEffect, useState } from 'react'

import { createFillableModel, createSubmitableModel, updateArrOfObjState, hasError } from "../utils"

import { submitForm } from "../db"

import MultiOptionField from "./MultiOptionField"

function RenderReactiveForm({ model, onSubmitted }){
    const [fillableModel, setFillableModel] = useState(createFillableModel(model))
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState("")
    const [time1, setTime1] = useState([]);
    const [time2, setTime2] = useState([]);
    const [diff,setDiff] = useState(0)
    const [hard,setHard] = useState([])
    const [loadingtime,setLoad] = useState(false)
    
    const [status, setStatus] = useState([]);
    
    /*
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
    */
   const startTime =  () => {
        setLoad(true)
        setTime1([...time1,Date.now()]);
        setLoad(false)
        console.log(time1);
   }

   const endTime =   () => {
        setLoad(true)
        setTime2([...time2,Date.now()]);
        setLoad(false)
        console.log(time2);
        console.log(time2-time1);
   }


    const handleSubmit = async () => {
        setErr("")
        if(loading) return

        let error = hasError(fillableModel, model.id)
        if(error) return setErr(error) 
        setLoading(true)

        let submitableModel = createSubmitableModel(fillableModel)
        
        try{
            await submitForm(submitableModel, model.id,time1,time2,hard)
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
                <div className="grey-container mb-1">
                <div key={index} className="input">
                    <label>{field.title}{field.required && <span className="err">*</span>}</label>
                    <input name={field.type === "number" ? "number" : "short"} type={field.type === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                    <div>
                    <button className="btn" onClick={startTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Start timer</span>}</button>
                    <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>stop timer</span>}</button>
                    </div>
                    <div className="input">
                    <label><span className="err">Rate Dfficulty of this task on a scale of 1-10</span></label>
                    <input type= "number" onChange = {e =>  setHard([...hard,e.target.value])} />
                    </div>
                </div>
                </div>
            ) : field.type=== "mandatory" ?(
                <div key = {index} className="input">
                    <label>{field.title}{field.required && <span className="err">*</span>}</label>
                    <input name="mand" type = "text" onChange = {e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                </div>
            )
            :field.type === "long-text" ? (
                <div className="grey-container mb-1">
                <div key={index} className="input">
                    <label>{field.title}{field.required && <span className="err">*</span>}</label>
                    <textarea onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)}></textarea>
                    <div>
                    <button className="btn" onClick={startTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Start timer</span>}</button>
                    <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>stop timer</span>}</button>
                    <div className="input">
                    <label><span className="err">Rate Dfficulty of this task on a scale of 1-10</span></label>
                    <input type= "number" onChange = {e =>  setHard([...hard,e.target.value])} />
                    </div>
                    </div>
                </div>
                </div>
            ) : field.type === "multioption-singleanswer" ? (
                <div className="grey-container mb-1">
                <MultiOptionField key={index} fieldModel={field} onSelected={res => updateArrOfObjState(setFillableModel, fillableModel, index, "value", res)} />
                </div>
            ) : field.type === "slider"?(
                <div className="grey-container mb-1">
                <div key={index} className="input">
                <label>{field.title}{field.required && <span className="err">*</span>}</label>
                <input name="slide" type = "range" onChange = {e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                <div>
                <button className="btn" onClick={startTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Start timer</span>}</button>
                    <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>stop timer</span>}</button>
                    </div>
                    <div className="input">
                    <label><span className="err">Rate Dfficulty of this task on a scale of 1-10</span></label>
                    <input type= "number" onChange = {e =>  setHard([...hard,e.target.value])} />
                    </div>
                </div>
                </div>
            )
            : <p key={index}>Unknown field type</p>)}
            {err && <p className="err mb-1">{err}</p>}
            <button className="btn" onClick={handleSubmit}>{ loading ? <span className="spinner white"></span> : <span>submit</span>}</button>
        </div>
    )
}

export default RenderReactiveForm