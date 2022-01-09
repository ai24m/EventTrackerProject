package com.skilldistillery.algorithmpractice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.algorithmpractice.entities.Algorithm;

public interface AlgorithmRepository extends JpaRepository<Algorithm, Integer> {

	List<Algorithm> findByTitleLikeOrDescriptionLike(String keyword1, String keyword2);
}
