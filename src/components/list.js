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
        if (prevProps.originalData !== this.props.originalData.length) {
            this.instance = M.Collapsible.init(this.collapsible);
        }
    }

    handleDisplayGrades = (index) => {
        const collapsibleElement = document.getElementsByClassName("collapsible")[0].children[index].getElementsByClassName("collapsible-body")[0];
        if (this.state.isOpen.includes(index)) {
            collapsibleElement.style.display= "none";
            const arrayCopy = [...this.state.isOpen];
            const elIndex = arrayCopy.indexOf(index);
            if (elIndex > -1) {
                arrayCopy.splice(elIndex, 1);
                this.setState({isOpen: arrayCopy});
            }
        } else {
            collapsibleElement.style.display = "block";
            this.setState({isOpen: [...this.state.isOpen, index]});           
        }
    }

    gradeAverage(array) {
        const average = eval(array.join("+"))/array.length;
        return average + "%";
    }

    renderList() {
        const {originalData, nameFilter} = this.props;

        this.liRefs.current = [];
        const addToRefs = (el) => {
            if (el && !this.liRefs.current.includes(el)) {
                this.liRefs.current.push(el);
            }
        };

        
        if (!originalData){
            return <h1 className="center">Loading...</h1>
        }

        if (!originalData.length){
            return <h5 className="center">No Students Available.</h5>;
        }

        let results;
        if (nameFilter) {
            results = originalData.filter(student => 
                student.firstName.toLowerCase().includes(nameFilter) || student.lastName.toLowerCase().includes(nameFilter)
            );
        } else {
            results = originalData;
        }
        
        const listElements = results.map((item, index) => {
            return (
                <li className="collection-item" key={index} ref={addToRefs}>
                    <section>
                        <div className="collapsible-header row">
                            <div className="col s3">
                                <img src={item.pic} alt="student avatar"/>
                            </div>
                            <div className="col s9">
                                <div className="row">
                                    <p className="col s9">{item.firstName + " " + item.lastName}</p>
                                    <button className="col s3" onClick={() => this.handleDisplayGrades(index)}>
                                        {this.state.isOpen.includes(index) ? <span>&#8722;</span> : <span>&#43;</span>}
                                    </button>
                                </div>
                                <p>Email: {item.email}</p>
                                <p>Company: {item.company}</p>
                                <p>Skill: {item.skill}</p>
                                <p>Average: {this.gradeAverage(item.grades)}</p>
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
                                <Tags liIndex={index}/>
                                <AddTagForm tagInput={this.liRefs} liIndex={index}/>       
                            </div>       
                        </div>
                    </section>
                </li>
            );
        });

        return (
            <ul className="collection">
                <div className="collapsible">
                    {listElements}
                </div>
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
        originalData: state.list.originalData,
        nameFilter: state.list.nameFilter
    }
}

export default connect(mapStateToProps, {
    getAllStudents: getAllStudents,
})(List);
