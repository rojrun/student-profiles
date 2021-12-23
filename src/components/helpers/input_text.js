import React from 'react';

const InputText = props => {
    return (
        <div className={`col ${props.size || 's12'}`}>
            <div className="input-field">
                <input {...props.input} id={props.id} type="text" autoComplete="off"/>
                <label htmlFor={props.id}>{props.label}</label>
            </div>
            <p className="red-text text-darken-2">{props.warning}</p>
        </div>
    );
};

export default InputText;
