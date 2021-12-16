import React from 'react';

export const InputText = props => {
    return (
        <div className={`col ${props.size || 's12'}`}>
            <div className="input-field">
                <input {...props.input} id={props.id} type="text" autoComplete="off"/>
                <label htmlFor={props.id}>{props.label}</label>
            </div>
        </div>
    );
};
