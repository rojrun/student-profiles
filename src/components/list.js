import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllStudents} from '../actions';

class List extends Component {
    componentDidMount() {
        this.props.getAllStudents();
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
        
        const listElements = results.map(item => {
            return (
                <li className="collection-item row" key={item.id}>
                    <div className="col s3">
                        <img src={item.pic} alt="student avatar"/>
                    </div>
                    <div className="col s9">
                        <h2>{item.firstName + " " + item.lastName}</h2>
                        <p>Email: {item.email}</p>
                        <p>Company: {item.company}</p>
                        <p>Skill: {item.skill}</p>
                        <p>Average: {this.gradeAverage(item.grades)}</p>
                    </div>
                </li>
            );
        });

        return (
            <ul className="collection">
                {listElements}
            </ul>
        );
    }
    
    gradeAverage(array) {
        const average = eval(array.join("+"))/array.length;
        return average + "%";
    }
    
    render(){
        return (
            <div>
                {this.renderList()}
            </div>
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
