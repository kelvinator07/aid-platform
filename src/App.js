import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes';
import { getCurrentUser } from './containers/Util/auth';

function App(props) {
  return (
    <div>
            <Layout cableApp={props.cableApp} consumer={props.consumer}>
              {/* <Route path="/" exact component={Home}/> */}
              <Redirect to={getCurrentUser() ? "/home" : "/signin"}  />
              <Switch>
                  {routes.map((prop, key) => {
                  return (
                      <Route 
                      // render={(props) => <PropsPage {...props} title={`Props through render`} />}
                      consumer={props.consumer}
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