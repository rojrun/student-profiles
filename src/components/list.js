import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllStudents, addRef, addIdToIsOpen, removeIdFromIsOpen} from '../actions';
import Tags from './tags';
import AddTagForm from './add_tag_form';

class List extends Component {
    constructor(props) {
        super(props);
        this.liRefs = React.createRef();
    }
    
    componentDidMount() {
        this.props.getAllStudents();
        this.instance = M.Collapsible.init(this.collapsible, {accordian: false});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.results !== this.props.results.length) {
            this.instance = M.Collapsible.init(this.collapsible);
            this.props.addRef(this.liRefs.current);
        }
    }

    handleDisplayGrades = (data, id) => {
        const collapsibleElement = this.liRefs.current[data.findIndex(element => element.id === id)].getElementsByClassName("collapsible-body")[0];
        if (this.props.isOpen.includes(id)) {
            collapsibleElement.style.display = "none";
            this.props.removeIdFromIsOpen(id);
        } else {
            collapsibleElement.style.display = "block";
            this.props.addIdToIsOpen(id); 
        }     
    }

    renderList() {
        const {tagsList, results} = this.props;
        this.liRefs.current = [];
        const addToRefs = (el) => {
            if (el && !this.liRefs.current.includes(el)) {
                this.liRefs.current.push(el);
            }
        };

        if (!results) {    
            return <h1 className="center">Loading...</h1>
        }

        if (!results.length) {    
            return <h5 className="center">No Students Available.</h5>;
        }
        
        const listElements = results.map((item) => {
            const {id, pic, firstName, lastName, email, company, skill, grades} = item;
            return (
                <li className="card" key={id} ref={addToRefs}>
                    <div className="collapsible-header row">
                        <div className="col s3">
                            <img src={pic} alt="student avatar"/>
                        </div>
                        <div className="col s9">
                            <div className="row">
                                <p className="col s9">{firstName + " " + lastName}</p>
                                <button className="col s3 right-align" onClick={() => this.handleDisplayGrades(results, id)}>
                                    {this.props.isOpen.includes(id) ? <span>&#8722;</span> : <span>&#43;</span>}
                                </button>
                            </div>
                            <p>Email: {email}</p>
                            <p>Company: {company}</p>
                            <p>Skill: {skill}</p>
                            <p>Average: {(eval(grades.join("+"))/grades.length) + "%"}</p>
                        </div>
                    </div>
                    <div className="collapsible-body row">
                        <div className="col s3"></div>
                        <div className="col s9">
                            <ul>
                                {
                                    grades.map((score, index) => {
                                        return (
                                            <li key={index}>
                                                <p>Test {index + 1}:&emsp;{score}%</p>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s3"></div>    
                        <div className="col s9">
                            {(() => {
                                if (tagsList) {
                                    const tags = tagsList.find(tagObj => tagObj.id === id);
                                    if (tags) {
                                        return (
                                            <Tags tags={tags}/>
                                        );
                                    }
                                }
                            })()}
                            <AddTagForm parentDom={this.liRefs.current} data={results} id={id}/>       
                        </div>       
                    </div>
                </li>
            );
        });

        return (
            <ul className="collapsible">
                {listElements}
            </ul>
        );
    }
    
    render() {
        return (
            <>
                {this.renderList()}
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        tagsList: state.list.tagsList,
        results: state.list.results,
        isOpen: state.list.isOpen
    }
}

export default connect(mapStateToProps, {
    getAllStudents: getAllStudents,
    addRef: addRef,
    addIdToIsOpen: addIdToIsOpen,
    removeIdFromIsOpen: removeIdFromIsOpen
})(List);
