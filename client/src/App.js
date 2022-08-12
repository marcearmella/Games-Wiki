import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import VideogameForm from './components/VideogameForm/VideogameForm'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/videogameform' component={VideogameForm} />
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
