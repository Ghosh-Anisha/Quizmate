import { useState } from 'react'

function AddTextField({inputType, add, close}){
    const [err, setErr ] = useState("")

    const [question, setQuestion] = useState("")

    const [title, setTitle] = useState("")

    const [marks, setMarks] = useState()


    const [required, setRequired] = useState(false)

    const addField = () => {
        if(!question.trim()) return setErr("question is required")
        if(question.trim().length < 3) return setErr("question should be atleast 3 characters long")

        add({
            question,
            title,
            required,
            marks,
            type: inputType
        })
        close()
    }

    return (
        <div>
            <div className="input">
                <label>Enter question</label>
                <input type="text" placeholder={`Eg. Enter your ${inputType === "short-text" ? "Username" : inputType === "long-text" ? "information" : "age"}`} onChange={e => setQuestion(e.target.value)} />
            </div>
            <div className="input">
                <label>Enter answer</label>
                <input type="text" placeholder={`Eg. Enter  ${inputType === "short-text" ? "title" : inputType === "long-text" ? "title" : "title"}`} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="input">
                <label>Enter marks to be assigned</label>
                <input type='number' placeholder={`Eg. Enter ${inputType === "short-text" ? "marks" : inputType === "long-text" ? "marks" : "marks"}`} onChange={e => setMarks(e.target.value)} />
            </div>
            <div className="input inline">
                <label>Required: </label>
                <input type="checkbox" onChange={() => setRequired(!required)} />
            </div>
            {err && <p className="err mb-1">{err}</p>}
            <button className="btn" onClick={addField}>add question</button>
        </div>
    )
}

export default AddTextField