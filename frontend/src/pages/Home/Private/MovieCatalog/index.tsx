import { AxiosRequestConfig } from 'axios';
import MovieCard from 'Components/MovieCard';
import MovieFilter, { MovieFilterData } from 'Components/MovieFilter';
import Pagination from 'Components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movie';
import { MoviePage } from 'types/vendor/movieflix';
import { requestBackend } from 'util/requests';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const Movies = () => {
  const [page, setPage] = useState<MoviePage<Movie>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: {
        genre: null,
      },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/movies',
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genre?.id,
      },
    };

    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="container my-4 moviecatalog-container">
      <MovieFilter onSubmitFilter={handleSubmitFilter} />
      <div className="row moviecatalog-card-container">
        {page?.content.map((movie) => (
          <div className="col-sm-6 col-lg-6 col-xl-3" key={movie.id}>
            <Link to={`/movies/${movie?.id}`}>
              <MovieCard movie={movie} />
            </Link>
          </div>
        ))}
      </div>
      <div className="row">
        <Pagination
          pageCount={page ? page?.totalPages : 0}
          forcePage={page?.number}
          range={1}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Movies;
