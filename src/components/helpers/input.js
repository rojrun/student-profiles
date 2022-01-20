import React from 'react';

const Input = props => {
    if (props.warning) {
        const dataIndex = props.data.findIndex(el => el.id === props.warning[0]);
        const node = props.liRefs[dataIndex].getElementsByTagName("form")[0].getElementsByTagName("p")[0];
        node.innerHTML = props.warning[1];
        // setTimeout(() => {
        //     node.innerHTML = "";
        // }, 4000);
    }   

    return (
        <div className={`col ${props.size || 's12'}`}>
            <div className="input-field">
                <input {...props.input} id={props.id} type={props.type} autoComplete="off"/>
                <label htmlFor={props.id}>{props.label}</label>
            </div>
            <p className="red-text text-darken-4"></p>
        </div>
    );
};

export default Input;
