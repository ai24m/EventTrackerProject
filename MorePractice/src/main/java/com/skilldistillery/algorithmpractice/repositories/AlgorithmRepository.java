package com.skilldistillery.algorithmpractice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.algorithmpractice.entities.Algorithm;

public interface AlgorithmRepository extends JpaRepository<Algorithm, Integer> {

}
