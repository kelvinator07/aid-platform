import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';

function App() {
  return (
    <div>
            <Layout>
              {/* <Route path="/" exact component={Home}/> */}
              <Redirect to="/home" />
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