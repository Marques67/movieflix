import { Route, Router, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import Navbar from 'Components/Navbar';
import history from 'util/history';
import PrivateRoute from 'Components/PrivateRoute';
import Movie from 'pages/Home/Private/MovieCatalog';
import MovieDetails from 'pages/Home/Private/MovieDetails';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <PrivateRoute path="/movies">
        <Route path="/movies" exact>
          <Movie />
        </Route>
        <Route path="/movies/:movieId" exact>
          <MovieDetails />
        </Route>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
