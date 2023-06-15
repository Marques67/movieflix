package com.devsuperior.movieflix.controller;

import com.devsuperior.movieflix.dto.GenreDTO;
import com.devsuperior.movieflix.dto.ReviewDTO;
import com.devsuperior.movieflix.service.GenreService;
import com.devsuperior.movieflix.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/reviews")
public class ReviewController {

    @Autowired
    private ReviewService service;

    @PreAuthorize("hasAnyRole('MEMBER')")
    @PostMapping()
    public ResponseEntity<ReviewDTO> insertReview(@Valid @RequestBody ReviewDTO reviewDTO) {
        reviewDTO = service.insert(reviewDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(reviewDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(reviewDTO);
    }
}
