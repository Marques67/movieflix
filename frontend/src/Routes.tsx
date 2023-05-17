import { Route, Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Movies from './pages/Movies';
import historyt from './util/history';

const Routes = () => {
  return (
    <Router history={historyt}>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <PrivateRoute path="/movies">
          <Route path="/movies" exact>
            <Movies></Movies>
          </Route>
          <Route path="/movies/:movieId" exact>
            <MovieDetails></MovieDetails>
          </Route>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
