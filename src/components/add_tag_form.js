import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {addTag} from '../actions';
import Input from './helpers/input.js';

class AddTagForm extends Component {
    handleAddTag = (values) => {
        const {id, tagsList, addTag, reset} = this.props;
        for (const key in values) {
            if (values.hasOwnProperty(key)) {
                const tag = values[key];
                if (tagsList !== null) {
                    const tagsListIndex = tagsList.findIndex(element => element.id === id);
                    if (tagsListIndex > -1) { 
                        // Checks if tag already exists
                        if (tagsList[tagsListIndex].tags.includes(tag)) {
                            reset();
                            throw new SubmissionError({[key]: "'" + tag + "' already exists. Please enter a new tag."});
                        } else {
                            addTag(values);
                            reset();
                        }
                    } else {
                        addTag(values);
                        reset();
                    }
                } else {
                    addTag(values);
                    reset();
                }
            }
        }
    }

	render() {
        const {handleSubmit, id, data, parentDom, clearSubmitErrors} = this.props;
        return (
            <div className="row">
                <form onSubmit={handleSubmit(this.handleAddTag)}>
                    <Field name={`addTag${id}`} label="Add a tag" size="col s10 m8" type="text" component={Input} liRefs={parentDom}
                        id={`addTag${id}`} data={data} onBlur={clearSubmitErrors}/>
                </form>
            </div>
        );
    }
}

AddTagForm = connect(null, {
    addTag: addTag
})(AddTagForm);

export default reduxForm({
    form: "add-tag-form"
})(AddTagForm);
