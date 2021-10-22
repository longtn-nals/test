import React from 'react';
import routes from './routes';
import { Route, Switch } from 'react-router';

function Dashboard() {
// console.log(routes)
  return (
    <div>
      <Switch>
        {routes.map((item, index) => {
            return (
              <Route
                exact
                path={item.path}
                component={item.component}
                name={item.name}
                key={index}
              />
            );
        })}
      </Switch>
    </div>
  );
}
export default Dashboard;
