import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import React from 'react';
import SearchByNameForm from './search_by_name_form';
import SearchByTagForm from './search_by_tag_form';
import List from './list';

const App = () => (
    <div className="container">
        <SearchByNameForm/>
        <SearchByTagForm/>
        <List/>
    </div>
);

export default App;
