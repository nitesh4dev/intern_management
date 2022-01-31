import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import TrendsMain from './subtrends/TrendsMain';


export default function Dashboard() {
    const path = "/ams";
    return (
        <div >
            <Router>
                <Switch>
                    <Route path={`/trends`} component={TrendsMain} />
                </Switch>
            </Router>
        </div>
    )
}

