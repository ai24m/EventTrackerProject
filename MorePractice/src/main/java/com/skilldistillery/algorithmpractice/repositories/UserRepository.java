package com.skilldistillery.algorithmpractice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.algorithmpractice.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
