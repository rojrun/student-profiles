import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllStudents} from '../actions';

class List extends Component {
    state = {
        isOpen: false
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
        console.log("index: ", index);
        this.setState({isOpen: !this.state.isOpen});
        if (this.state.isOpen) {
            event.collapsible.style.display = "block";
        } else {
            event.collapsible.style.display = "none";
        }
    }

    gradeAverage(array) {
        const average = eval(array.join("+"))/array.length;
        return average + "%";
    }

    renderList() {
        const {originalData, inputFilter} = this.props;
        
        if (!originalData){
            return <h1 className="center">Loading...</h1>
        }

        if (!originalData.length){
            return <h5 className="center">No Students Available.</h5>;
        }

        let results;
        if (inputFilter) {
            results = originalData.filter(student => 
                student.firstName.toLowerCase().includes(inputFilter) || student.lastName.toLowerCase().includes(inputFilter)
            );
        } else {
            results = originalData;
        }
        
        const listElements = results.map((item, index) => {
            return (
                <li className="collection-item" key={index}>
                    <div className="collapsible-header row">
                        <div className="col s3">
                            <img src={item.pic} alt="student avatar"/>
                        </div>
                        <div className="col s9">
                            <div>
                                <div className="row">
                                    <p className="col s9">{item.firstName + " " + item.lastName}</p>
                                    <button className="col s3" onClick={() => this.handleDisplayGrades(index)}>
                                        {this.state.isOpen ? <span>&#8722;</span> : <span>&#43;</span>}
                                    </button>
                                </div>
                                <p>Email: {item.email}</p>
                                <p>Company: {item.company}</p>
                                <p>Skill: {item.skill}</p>
                                <p>Average: {this.gradeAverage(item.grades)}</p>
                            </div>
                        </div>
                    </div>
                    <div ref={(element) => this.collapsible = element} className="collapsible-body">
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
        inputFilter: state.list.inputFilter
    }
}

export default connect(mapStateToProps, {
    getAllStudents: getAllStudents,
})(List);
