import React from 'react';
import {Route} from 'react-router'
import {HashRouter} from 'react-router-dom'

import Home from '../views/Home';
import Detail from '../views/Detail';


const routes = (
    <HashRouter>
        <Route path="/" component={Home} />
        <Route path="/detail/:id" component={Detail} />
    </HashRouter>
);
export default routes;