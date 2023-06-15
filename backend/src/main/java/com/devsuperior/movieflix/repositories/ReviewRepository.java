package com.devsuperior.movieflix.repositories;

import com.devsuperior.movieflix.entitites.Movie;
import com.devsuperior.movieflix.entitites.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT obj FROM Review obj JOIN FETCH obj.user WHERE obj.movie = :movie")
    List<Review> findMovieReviews(Movie movie);
}
