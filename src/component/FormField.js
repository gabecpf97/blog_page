import React from "react";

const FormField = ({ fieldname, changeFn }) => {
    return (
        <div className="field">
            <label htmlFor={fieldname}>{fieldname.replace('_', ' ')}: </label>
            <input type="text" placeholder={fieldname.replace('_', ' ')} 
                required={true} onChange={(e) => changeFn(e)} />
        </div>
    )
}

export default FormField;