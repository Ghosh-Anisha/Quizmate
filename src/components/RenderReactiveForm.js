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
    const [index,setIndex] = useState(3)
    const [status, setStatus] = useState([]);
    const [start, setStart] = useState(false);
    
    const startTime =  () => {
        setLoad(true)
        setTime1([...time1,Date.now()]);
        setLoad(false)
        console.log(time1);
    }

    const endTime =   () => {
        setIndex(index + 1);
        setLoad(true)
        setTime2([...time2,Date.now()]);
        setTime1([...time1,Date.now()])
        setLoad(false)
        console.log(time2);
        console.log(time2-time1);
    }

    const onstart = () => {
        setStart(true);
        setTime1([...time1,Date.now()])
        console.log(fillableModel[index]["type"])
    }

    const handleSubmit = async () => {
        console.log("inside handle submit");
        setErr("")
        if(loading) return

        let error = hasError(fillableModel, model.id)
        console.log(error);
        if(error) return setErr(error) 
        setLoading(true)
        console.log(fillableModel)
        let submitableModel = createSubmitableModel(fillableModel)
        try{
            console.log("inside try block");
            await submitForm(submitableModel, model.id,time1,time2,hard)
            setLoading(false)
            onSubmitted()
        }catch(e){
            console.log("inside catch block");
            setErr(e.message)
            console.log(err)
            setLoading(false)
        }
    }
    while(true){
    if(index == fillableModel.length){
        console.log("broken bro");
        break;
    }
    else if(!start){
        return (
            <div id= "mainform" className="main-form mt-1">
                <div key = {0} className="input">
                <label>{fillableModel[0]["title"]}{fillableModel[0]["required"] && <span className="err">*</span>}</label>
                        <input name="mand" type = "text" onChange = {e => updateArrOfObjState(setFillableModel, fillableModel, 0, "value", e.target.value)} />
                    </div>
                    <div key = {1} className="input">
                        <label>{fillableModel[1]["title"]}{fillableModel[1]["required"] && <span className="err">*</span>}</label>
                        <input name="mand" type = "text" onChange = {e => updateArrOfObjState(setFillableModel, fillableModel, 1, "value", e.target.value)} />
                    </div>
                    <div key = {2} className="input">
                        <label>{fillableModel[2]["title"]}{fillableModel[2]["required"] && <span className="err">*</span>}</label>
                        <input name="mand" type = "text" onChange = {e => updateArrOfObjState(setFillableModel, fillableModel, 2, "value", e.target.value)} />
                    </div>
                    <button className="btn" onClick={onstart}>{ loading ? <span className="spinner white"></span> : <span>Start Test</span>}</button>
            </div>
        )
    } else if(fillableModel[index]["type"] === "number"){
        console.log(fillableModel[index]["type"]);
        return (
            <div className="grey-container mb-1">
              <div key={index} className="input">
              <label>{fillableModel[index]["title"]}{fillableModel[index]["required"] && <span className="err">*</span>}</label>
                  <input name={fillableModel[index]["type"] === "number" ? "number" : "short"} type={fillableModel[index]["type"] === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                  <div>
                  <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Next</span>}</button>
                  </div>
                  <div className="input">
                  <label><span className="err">Rate Dfficulty of this task on a scale of 1-10</span></label>
                  <input type= "number" onChange = {e =>  setHard([...hard,e.target.value])} />
                  </div>
                  </div>
            </div>
        )
    } else if(fillableModel[index]["type"] === "number"){
        return (
            <div className="grey-container mb-1">
                <div key={index} className="input">
                <label>{fillableModel[index]["title"]}{fillableModel[index]["required"] && <span className="err">*</span>}</label>
                    <input name={fillableModel[index]["type"] === "number" ? "number" : "short"} type={fillableModel[index]["type"] === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                    <div>
                    <button className="btn" onClick={endTime}>${ loadingtime ? <span className="spinner white"></span> : <span>Next</span>}</button>
                    </div>
                    <div className="input">
                    <label><span className="err">Rate Dfficulty of this task on a scale of 1-10</span></label>
                    <input type= "number" onChange = {e =>  setHard([...hard,e.target.value])} />
                    </div>
                </div>
            </div>
        )
    } else if(fillableModel[index]["type"] === "short-text"){
        return (
        <div className="grey-container mb-1">
            <div key={index} className="input">
            <label>{fillableModel[index]["title"]}${fillableModel[index]["required"] && <span className="err">*</span>}</label>
                <input name={fillableModel[index]["type"] === "number" ? "number" : "short"} type={fillableModel[index]["type"] === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
                <div>
                <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Next</span>}</button>
                </div>
                <div className="input">
                <label><span className="err">Rate Dfficulty of this task on a scale of 1-10</span></label>
                <input type= "number" onChange = {e =>  setHard([...hard,e.target.value])} />
                </div>
            </div>
        </div>
        )
    }
     
}
    console.log("I've reached the end");
    return <button className='btn' onClick={handleSubmit}>end</button>;   
}

export default RenderReactiveForm;