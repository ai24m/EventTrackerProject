package com.skilldistillery.algorithmpractice.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.algorithmpractice.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	User findByUsernameAndPassword(String username, String password);
	
}
