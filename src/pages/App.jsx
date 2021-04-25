import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Users from './Users'
import CommonAreaPhrase from './CommonAreaPhrase'
import Etiquette from './Etiquette'
import Calendar from './Calendar'
import Degree from './Degree'
import Financials from './Financials'
import Contributions from './Contributions'
import Donations from './Donations'
import Stock from './Stock'
import Norms from './Norms'

const Main = () => (
    <main>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Users" component={Users} />
            <Route exact path="/CommomArea" component={CommonAreaPhrase} />
            <Route exact path="/Etiquette" component={Etiquette} />
            <Route exact path="/Calendar" component={Calendar} />
            <Route exact path="/Degree" component={Degree} />
            <Route exact path="/Financials" component={Financials} />
            <Route exact path="/Contributions" component={Contributions} />
            <Route exact path="/Donations" component={Donations} />
            <Route exact path="/Stock" component={Stock} />
            <Route exact path="/Norms" component={Norms} />
        </Switch>
    </main>
);

export default Main