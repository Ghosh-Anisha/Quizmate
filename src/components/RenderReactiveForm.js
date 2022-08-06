
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
        console.log(index)
        console.log(fillableModel);
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
        console.log(fillableModel[index]["type"])
    }

    const handleSubmit = async () => {
        setErr("")
        if(loading) return

        let error = hasError(fillableModel, model.id)
        if(error) return setErr(error) 
        setLoading(true)
        console.log(fillableModel)
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
    if(!start){
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
    return <button className='btn' onClick={handleSubmit}>end</button>;   
}

export default RenderReactiveForm;

// import { useEffect, useState } from 'react'

// import { createFillableModel, createSubmitableModel, updateArrOfObjState, hasError } from "../utils"

// import { submitForm } from "../db"

// import MultiOptionField from "./MultiOptionField"
// import { Slide } from 'react-toastify'

// function RenderReactiveForm({ model, onSubmitted }){
//     const [fillableModel, setFillableModel] = useState(createFillableModel(model))
//     const [loading, setLoading] = useState(false)
//     const [err, setErr] = useState("")
//     const [time1, setTime1] = useState([]);
//     const [time2, setTime2] = useState([]);
//     const [hard,setHard] = useState([])
//     const [loadingtime,setLoad] = useState(false)
    
    

//    const startTime =  () => {
//         setLoad(true)
//         setTime1([...time1,Date.now()]);
//         setLoad(false)
//         console.log(time1);
//    }

//    const endTime =   () => {
//         setLoad(true)
//         setTime2([...time2,Date.now()]);
//         setLoad(false)
//         console.log(time2);
//         console.log(time2-time1);
//    }


//     const handleSubmit = async () => {
//         setErr("")
//         if(loading) return

//         let error = hasError(fillableModel, model.id)
//         if(error) return setErr(error) 
//         setLoading(true)

//         let submitableModel = createSubmitableModel(fillableModel)
        
//         try{
//             await submitForm(submitableModel, model.id,time1,time2,hard)
//             setLoading(false)
//             onSubmitted()
//         }catch(e){
//             setErr(e.message)
//             setLoading(false)
//         }
//     }

//     return (
//         <div className="main-form mt-1">
//             { fillableModel.map((field, index) => ["short-text", "number"].indexOf(field.type) > -1
//             ? (
//                 <div className="grey-container mb-1">
//                 <button className="btn" onClick={startTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Start Task</span>}</button>
//                 {time1.length >0 ?(
//                 <div key={index} className="input">
//                     <label>{field.title}{field.required && <span className="err">*</span>}</label>
//                     <div>
//                         <input name={field.type === "number" ? "number" : "short"} type={field.type === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
//                         <div className="input">
//                             <label><span className="input">Rate Dfficulty of this task on a scale of 1-10</span></label>
//                             <input type= "number" onChange = {e =>  setHard([...hard,e.target.value])} />
//                         </div>
//                     <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>stop timer</span>}</button>
//                     </div>
//                 </div>
//                 ):(<p>Please start task</p>)}
//             </div>
    
//             ): field.type=== "mandatory" ?(
//                 <div key = {index} className="input">
//                     <label>{field.title}{field.required && <span className="err">*</span>}</label>
//                     <input name="mand" type = "text" onChange = {e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
//                 </div>
//             ) :field.type === "long-text" ? (
//                 <div className="grey-container mb-1">
//                 <button className="btn" onClick={startTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Start timer</span>}</button>
//                 {time1.length >0 ?(
//                     <div key={index} className="input">
//                     <label>{field.title}{field.required && <span className="err">*</span>}</label>
//                     <textarea onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)}></textarea>
//                     <div>
//                         <div className="input">
//                             <label><span className="input">Rate Dfficulty of this task on a scale of 1-10</span></label>
//                             <input type= "number" onChange = {e =>  setHard([...hard,e.target.value])} />
//                         </div>
//                         <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>stop timer</span>}</button>
//                     </div>
//                 </div>) : (<p>Please start task</p>)}

//                 </div>
//             ) : field.type === "multioption-singleanswer" ? (
//                 <div className="grey-container mb-1">
//                 <MultiOptionField key={index} fieldModel={field} onSelected={res => updateArrOfObjState(setFillableModel, fillableModel, index, "value", res)} />
//                 </div>
//             ) : field.type === "slider"?(
//                 <div className="grey-container mb-1">
//                     <div key={index} className="input">
//                         <label>{field.title}{field.required && <span className="err">*</span>}</label>
//                         <input name="slide" type = "range" step="1" onChange = {e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)}/>
//                         <output>{fillableModel[index].value}</output>
//                         <div>
//                             <button className="btn" onClick={startTime}>{ loadingtime ? <span className="spinner white"></span> : <span>Start timer</span>}</button>
//                             <button className="btn" onClick={endTime}>{ loadingtime ? <span className="spinner white"></span> : <span>stop timer</span>}</button>
//                         </div>
//                     <div className="input">
//                     <label><span className="err">Rate Dfficulty of this task on a scale of 1-10</span></label>
//                     <input type= "number" onChange = {e =>  setHard([...hard,e.target.value])} />
//                     </div>
//                 </div>
//                 </div>
//             )
//             : <p key={index}>Unknown field type</p>)}
//             {err && <p className="err mb-1">{err}</p>}
//             <button className="btn" onClick={handleSubmit}>{ loading ? <span className="spinner white"></span> : <span>submit</span>}</button>
//         </div>
//     )
// }

// export default RenderReactiveForm