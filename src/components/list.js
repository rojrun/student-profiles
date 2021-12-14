import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllStudents} from '../actions';
import NavButton from './nav_button';

class List extends Component {
    componentDidMount() {
        this.props.getAllStudents();
    }

    renderList() {
        const {students} = this.props;

        if (!students){
            return <h1 className="center">Loading...</h1>
        }

        if (!students.length){
            return <h5 className="center">No Students Available.</h5>;
        }

        const listElements = students.map(item => {
            return <li className="collection-item" key={item.id}>
                        <h2>{item.firstName + " " + item.lastName}</h2>
                        <p>{item.email}</p>
                        <p>{item.company}</p>
                        <p>{item.skill}</p>
                        <p>{this.gradeAverage(item.grades)}</p>
                    </li>;
        });

        return (
            <ul className="collection">
                {listElements}
            </ul>
        );
    }

    gradeAverage(array) {
        const average = array => array.reduce((a,b) => a + b) / array.length;
        return (Math.round(average * 100) / 100).toFixed(3) + "%";
    }

    render(){
        return (
            <div>
                <div className="center">
                    <h1>STUDENTS</h1>
                </div>
                {/* <NavButton color="black white-text" to="/add-item">Add Item</NavButton> */}
                {this.renderList()}
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        students: state.list.all
    }
}

export default connect(mapStateToProps, {
    getAllStudents: getAllStudents
})(List);