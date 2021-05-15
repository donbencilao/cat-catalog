import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Home from './pages/home';
import Single from './pages/single';

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/single/:id" component={Single} />
        </Switch>
      </BrowserRouter>
  );
}

export default App;
