package com.devsuperior.movieflix.service;

import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.entitites.Movie;
import com.devsuperior.movieflix.entitites.Review;
import com.devsuperior.movieflix.repositories.MovieRepository;
import com.devsuperior.movieflix.repositories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository repository;

    @Autowired
    private AuthService authService;

    @Autowired
    private MovieRepository movieRepository;

    @Transactional(readOnly = true)
    public List<ReviewDTO> findMovieReviews(Long id) {
        Movie movie = movieRepository.getOne(id);
        List<Review> list = repository.findMovieReviews(movie);
        return list.stream().map(x -> new ReviewDTO(x)).collect(Collectors.toList());
    }

    @Transactional
    public ReviewDTO insert(ReviewDTO dto) {
        Review entity = new Review();
        entity.setText(dto.getText());
        entity.setMovie(movieRepository.getOne(dto.getMovieId()));
        entity.setUser(authService.authenticated());

        entity = repository.save(entity);

        return new ReviewDTO(entity);
    }

}
