import React from "react";

const FormField = ({ fieldname, changeFn }) => {
    return (
        <div className="field">
            <label htmlFor={`${fieldname}`}>{`${fieldname}: `}</label>
            <input type="text" placeholder={`${fieldname}`} 
                required={true} onChange={(e) => changeFn(e)} />
        </div>
    )
}

export default FormField;