import { useState } from 'react'

function AddTextField({inputType, add, close}){
    const [err, setErr ] = useState("")

    const [title, setTitle] = useState("")

    const [answer, setAnswer] = useState("")

    const [marks, setMarks] = useState()


    const [required, setRequired] = useState(false)

    const addField = () => {
        if(!title.trim()) return setErr("title is required")
        if(title.trim().length < 3) return setErr("title should be atleast 3 characters long")

        add({
            title,
            answer,
            required,
            marks,
            type: inputType
        })
        close()
    }

    return (
        <div>
            <div className="input">
                <label>Enter title</label>
                <input type="text" placeholder={`Eg. Enter your ${inputType === "short-text" ? "Username" : inputType === "long-text" ? "information" : "age"}`} onChange={e => setTitle(e.target.value)} />
            </div>
            <div className="input">
                <label>Enter answer</label>
                <input type="text" placeholder={`Eg. Enter  ${inputType === "short-text" ? "answer" : inputType === "long-text" ? "answer" : "answer"}`} onChange={e => setAnswer(e.target.value)} />
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
            <button className="btn" onClick={addField}>add title</button>
        </div>
    )
}

export default AddTextField