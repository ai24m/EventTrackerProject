package com.skilldistillery.algorithmpractice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.algorithmpractice.entities.Solution;

public interface SolutionRepository extends JpaRepository<Solution, Integer>{

}
