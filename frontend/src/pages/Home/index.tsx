import './styles.css';
import { ReactComponent as ImageHome } from '../../assets/images/Desenho.svg';
import Login from './Login';

const Home = () => {
  return (
    <main className="home-container">
      <div className="home-content">
        <h1>Avalie Filmes</h1>

        <p>Diga o que você achou do seu filme favorito</p>

        <ImageHome></ImageHome>
      </div>
      <Login></Login>
    </main>
  );
};

export default Home;
