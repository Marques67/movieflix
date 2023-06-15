package com.devsuperior.movieflix.service;

import com.devsuperior.movieflix.entitites.User;
import com.devsuperior.movieflix.repositories.UserRepository;
import com.devsuperior.movieflix.service.exceptions.ForbiddenException;
import com.devsuperior.movieflix.service.exceptions.UnauthorizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private UserRepository repository;

    @Transactional(readOnly = true)
    public User authenticated() {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            return repository.findByEmail(username);
        } catch (Exception e) {
            throw new UnauthorizedException("Invalid user");
        }
    }

    public void validateSelfOrAdmin(Long userId) {
        User user = authenticated();
        if (!user.getId().equals(userId) && !user.hasHole("VISITOR_OR_MEMBER")) {
            throw new ForbiddenException("Access denied");
        }
    }
}
