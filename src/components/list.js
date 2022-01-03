import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllStudents} from '../actions';
import Tags from './tags';
import AddTagForm from './add_tag_form';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: []
        }
        this.liRefs = React.createRef();
    }
    
    componentDidMount() {
        this.props.getAllStudents();
        this.instance = M.Collapsible.init(this.collapsible, {accordian: false});
    }

    componentDidUpdate(prevProps) {
        if (prevProps.results !== this.props.results.length) {
            this.instance = M.Collapsible.init(this.collapsible);
        }
    }

    handleDisplayGrades = (data, id) => {
        const collapsibleElement = this.liRefs.current[data.findIndex(element => element.id === id)].getElementsByClassName("collapsible-body")[0];
        if (this.state.isOpen.includes(id)) {
            collapsibleElement.style.display= "none";
            const arrayCopy = [...this.state.isOpen];
            const elIndex = arrayCopy.indexOf(id);
            if (elIndex > -1) {
                arrayCopy.splice(elIndex, 1);
                this.setState({isOpen: arrayCopy});
            }
        } else {
            collapsibleElement.style.display = "block";
            this.setState({isOpen: [...this.state.isOpen, id]});     
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
            return (
                <li className="collapsible card col s12 m6 l4" key={item.id} ref={addToRefs}>
                    <section>
                        <div className="collapsible-header row">
                            <div className="col s3">
                                <img src={item.pic} alt="student avatar"/>
                            </div>
                            <div className="col s9">
                                <div className="row">
                                    <p className="col s9">{item.firstName + " " + item.lastName}</p>
                                    <button className="col s3" onClick={() => this.handleDisplayGrades(results, item.id)}>
                                        {this.state.isOpen.includes(item.id) ? <span>&#8722;</span> : <span>&#43;</span>}
                                    </button>
                                </div>
                                <p>Email: {item.email}</p>
                                <p>Company: {item.company}</p>
                                <p>Skill: {item.skill}</p>
                                <p>Average: {(eval(item.grades.join("+"))/item.grades.length) + "%"}</p>
                            </div>
                        </div>
                        <div ref={(element) => this.collapsible = element} className="collapsible-body row">
                            <div className="col s3"></div>
                            <div className="col s9">
                                <ul>
                                    {
                                        item.grades.map((score, index) => {
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
                                        const tags = tagsList.find(tagObj => tagObj.id === item.id);
                                        if (tags) {
                                            return (
                                                <Tags tags={tags}/>
                                            );
                                        }
                                    }
                                })()}
                                <AddTagForm parentDom={this.liRefs.current} data={results} id={item.id}/>       
                            </div>       
                        </div>
                    </section>
                </li>
            );
        });

        return (
            <ul className="row">
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
        results: state.list.results
    }
}

export default connect(mapStateToProps, {
    getAllStudents: getAllStudents,
})(List);
