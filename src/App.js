import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import { getCurrentUser } from './containers/Util/auth';

function App() {
  return (
    <div>
            <Layout>
              {/* <Route path="/" exact component={Home}/> */}
              <Redirect to={getCurrentUser() ? "/home" : "/signin"}  />
              <Switch>
                  {routes.map((prop, key) => {
                  return (
                      <Route
                      path={prop.path}
                      component={prop.component}
                      key={key}
                      />
                  );
                  })}
              </Switch>
            </Layout>
        </div>
  );
}

export default App;