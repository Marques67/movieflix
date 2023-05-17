import { Link } from 'react-router-dom';
import './styles.css';

type Props = {
  id: number;
};

const MovieCard = ({ id }: Props) => {
  return (
    <div className="movie-card-container">
      <Link to={'movies/' + id}>
        <p>Acessar/movies/{id}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
