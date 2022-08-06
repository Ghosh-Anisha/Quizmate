import { useState } from 'react'

import { arrayToggle } from "../utils"

function MultiOptionField({fieldModel, onSelected }){
    const [selected, setSelected] = useState([])
    const [Status, setStatus] = useState({})

    const addOption = opt => {
        let _selected = [...selected]
        _selected = [opt]
        setSelected(_selected)
        onSelected(_selected)
    }

    const focusHandler = function() {
        var name = this.name;
        console.log("Focus", name, Status[name]);
        if (!Status[name]) Status[name] = {
            total: 0,
            focus: Date.now()
        }
        else Status[name].focus = Date.now();
    }
    const blurHandler = function() {
        var name = this.name;
        if (Status[name]) {
            Status[name].total += Date.now() - Status[name].focus;
        }
    }

    return (
        <div className="input">
            <label>{fieldModel.title}{fieldModel.required && <span className="err">*</span>}</label>
            {fieldModel.options.map((option, index) => (
                <div className="input inline" key={index}>
                    <input type={fieldModel.type === "multioption-multianswer" ? "checkbox" : "radio"}  className="mr-1" name={fieldModel.title.replace(" ", "")} 
                        onChange={() => addOption(option)} 
                        onFocus={focusHandler}
                        onBlur={blurHandler}/>
                    <label>{option}</label>
                </div>
            ))}
        </div>
    )
}

export default MultiOptionField