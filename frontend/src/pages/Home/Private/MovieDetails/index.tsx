import { AxiosRequestConfig } from 'axios';
import ReviewCard from 'Components/ReviewCard';
import ReviewForm from 'Components/ReviewForm';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie } from 'types/movie';
import { Review } from 'types/review';
import { hasAnyRoles } from 'util/auth';
import { requestBackend } from 'util/requests';

import './styles.css';

type UrlParams = {
  movieId: string;
};

const MovieDetails = () => {
  const { movieId } = useParams<UrlParams>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackend(params).then((response) => {
      setReviews(response.data);
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  };

  useEffect(() => {
    const getMovies: AxiosRequestConfig = {
      method: 'GET',
      url: `/movies/${movieId}`,
      withCredentials: true,
    };
    requestBackend(getMovies).then((response) => {
      setMovie(response.data);
    });
  }, [setMovie, movieId]);

  return (
    <>
      <div className="container movie-details-container">
        <div className="base-card movie-details-card">
          <div className="movie-card-top-container">
            <img src={movie?.imgUrl} alt={movie?.title} />
          </div>
          <div className="movie-card-bottom-container">
            <h6>{movie?.title}</h6>
            <span>{movie?.year}</span>
            <p>{movie?.subTitle}</p>
            <div className="base-card movie-review-card">
              <p>{movie?.synopsis}</p>
            </div>
          </div>
        </div>
        {hasAnyRoles(['ROLE_MEMBER']) && (
          <ReviewForm movieId={movieId} onInsertReview={handleInsertReview} />
        )}
        <ReviewCard reviews={reviews} />
      </div>
    </>
  );
};

export default MovieDetails;
