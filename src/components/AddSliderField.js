import { useState } from 'react'

function AddSliderField({inputType, add, close}){
    const [err, setErr ] = useState("")
    const [value,setValue] = useState("")
    const [title, setTitle] = useState("")


    const [required, setRequired] = useState(false)

    const addField = () => {
        if(!title.trim()) return setErr("title is required")
        if(title.trim().length < 3) return setErr("title should be atleast 3 characters long")

        add({
            title,
            value,
            required,
            type: inputType
        })
        close()
    }

    return (
        <div>
            <div className="input">
                <label>Enter title</label>
                <input type="text" placeholder={`Eg. Rate this product`} onChange={e => setTitle(e.target.value)} />
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

export default AddSliderField