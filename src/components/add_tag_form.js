import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {addTag} from '../actions';
import Input from './helpers/input.js';

class AddTagForm extends Component {
    // handleAddTag = (id, data) => {    
    //     const node = this.props.parentDom[(data.findIndex(element => element.id === id))].getElementsByTagName("input")[0];
    //     const value = node.value;
    //     this.props.addTag(id, value);
    //     this.props.reset();
    // }
    handleAddTag = (values) => {
        console.log("SubmissionError: ", SubmissionError);
        this.props.addTag(values);
        this.props.reset();
    }

	render() {
        const {handleSubmit, id, data, tagExistsWarning, parentDom} = this.props;
        return (
            <div className="row">
                {/* <form onSubmit={handleSubmit(() => this.handleAddTag(id, data))}> 
                    <Field name={`addTag${id}`} label="Add a tag" size="col s10 m8" type="text" component={Input} liRefs={parentDom}
                        id={`addTag${id}`} data={data} warning={tagExistsWarning}/>
                </form>*/}

                <form onSubmit={handleSubmit(this.handleAddTag)}>
                    <Field name={`addTag${id}`} label="Add a tag" size="col s10 m8" type="text" component={Input} liRefs={parentDom}
                        id={`addTag${id}`} data={data} warning={tagExistsWarning}/>
                </form>
            </div>
        );
    }
}

// Check if tag already exists
function validate(values, props) {
    // console.log("validate values: ", values);
    // console.log("props: ", props);
    const error = {};
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            // const id = key.slice(6);
            const id = props.id;
            const tag = values[key];
            // console.log("id: ", id);
            // console.log("tag: ", tag);
            if (props.tagsList !== null) {
                const tagsListIndex = props.tagsList.findIndex(element => element.id === id);
                if (tagsListIndex > -1) {
                    if (props.tagsList[tagsListIndex].tags.includes(tag)) {
                        error[key] = "'" + tag + "' already exists. Please enter a new tag.";
                    }
                }
            }
        }
    }
    // console.log('error: ', error);
    return error;
}

function mapStateToProps(state) {
    return {
        tagExistsWarning: state.list.tagExistsWarning
    }
}

AddTagForm = connect(mapStateToProps, {
    addTag: addTag
})(AddTagForm);

export default reduxForm({
    form: "add-tag-form",
    validate: validate
})(AddTagForm);
