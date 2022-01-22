package com.skilldistillery.algorithmpractice.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.algorithmpractice.entities.Solution;

public interface SolutionRepository extends JpaRepository<Solution, Integer>{

//	List<Solution> findByLanguage_Id(Integer lId);

	List<Solution> findByLanguage_NameLike(String keyword);

	
}
