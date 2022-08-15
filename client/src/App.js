import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import VideogameForm from './components/VideogameForm/VideogameForm';
import Detail from './components/Detail/Detail'
import NotFound404 from './components/404/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route exact path='/videogameform' component={VideogameForm} />
          <Route exact path='/gamedetail/:id' component={Detail} />
          <Route exact path='/' component={LandingPage} />
          <Route exact path="*" component={NotFound404} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
