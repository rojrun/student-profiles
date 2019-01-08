import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import NavButton from './nav_button';

class AddItem extends Component {
    render(){
        return (
            <div>
                <h1 className="center">Add Item</h1>
                <NavButton color="black white-text" to="/">Back to List</NavButton>
            </div>
        );
    }
}

export default reduxForm({
    form: 'add-item'
})(AddItem);