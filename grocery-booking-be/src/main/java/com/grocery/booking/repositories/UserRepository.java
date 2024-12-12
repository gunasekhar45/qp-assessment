package com.grocery.booking.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.grocery.booking.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}


