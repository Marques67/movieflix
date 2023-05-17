import './styles.css';
import { Movie } from '../../types/movie';
import { requestBackend } from '../../util/requests';
import { useEffect, useState } from 'react';
import { SpringPage } from '../../types/vendor/spring';
import MovieCard from '../../components/MovieCard';
import { AxiosRequestConfig } from 'axios';

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies`,
      withCredentials: true,
      params: {
        page: 0,
        size: 2,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);

  return (
    <main className="movies-container">
      <h1>Tela listagem de filmes</h1>
      {page?.content.map((movie) => (
        <div className="movies-content" key={movie.id}>
          <MovieCard id={movie.id}></MovieCard>
        </div>
      ))}
    </main>
  );
};

export default Movies;
