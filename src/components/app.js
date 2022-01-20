import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import React from 'react';
import SearchByNameForm from './search_by_name_form';
import SearchByTagForm from './search_by_tag_form';
import ButtonsGroup from './buttons_group';
import List from './list';
import '../assets/css/app.css';

const App = () => (
    <div className="container">
        <h1 className="center">Student Profiles</h1>
        <SearchByNameForm/>
        <SearchByTagForm/>
        <ButtonsGroup/>
        <List/>
    </div>
);

export default App;
