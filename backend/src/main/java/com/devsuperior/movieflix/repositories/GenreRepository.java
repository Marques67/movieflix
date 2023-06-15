package com.devsuperior.movieflix.repositories;

import com.devsuperior.movieflix.entitites.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
}
