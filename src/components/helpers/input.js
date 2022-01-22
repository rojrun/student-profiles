import React from 'react';

const Input = props => {
    return (
        <div className={`col ${props.size || 's12'}`}>
            <div className="input-field">
                <input {...props.input} id={props.id} type={props.type} autoComplete="off"/>
                <label htmlFor={props.id}>{props.label}</label>
            </div>
            <p className="red-text text-darken-4">{props.meta.touched && props.meta.error}</p>
        </div>
    );
};

export default Input;
