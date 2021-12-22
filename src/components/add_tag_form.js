import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {addTag} from '../actions';
import InputText from './helpers/input_text.js';

class AddTagForm extends Component {
    handleAddTag = (el, index) => {
        const tagInput = el['addTag' + index.toString()];
        this.props.addTag(index, tagInput);
        this.props.reset();
        // this.props.untouch();   
    }

	render() {
        const {handleSubmit, liIndex} = this.props;
        
        return (
            <div className="row">
                <form onSubmit={handleSubmit((evt) => this.handleAddTag(evt, liIndex))} >
                    <Field name={`addTag${liIndex}`} size="col s12 m8" component={InputText} id={`addTag${liIndex}`} label="Add a tag"/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

AddTagForm = connect(null, {
    addTag: addTag,
})(AddTagForm);

export default reduxForm({
    form: "add-tag-form",
})(AddTagForm);
