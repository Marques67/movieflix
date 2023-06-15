package com.devsuperior.movieflix.controller;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.service.MovieService;
import com.devsuperior.movieflix.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/movies")
public class MovieController {

    @Autowired
    private MovieService service;

    @Autowired
    private ReviewService reviewService;

    @GetMapping(value = "/{id}")
    public ResponseEntity<MovieDTO> findById(@PathVariable Long id) {
        MovieDTO dto = service.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping
    public ResponseEntity<Page<MovieDTO>> findMoviesByGenre(@RequestParam(value = "genreId", defaultValue = "0") Long genreId,
                                                            Pageable pageable) {
        Page<MovieDTO> dto = service.findMoviesByGenre(genreId, pageable);
        return ResponseEntity.ok().body(dto);
    }

    @GetMapping(value = "/{id}/reviews")
    public ResponseEntity<List<ReviewDTO>> findMovieReviews(@PathVariable Long id) {
        List<ReviewDTO> dto = reviewService.findMovieReviews(id);
        return ResponseEntity.ok().body(dto);
    }
}
