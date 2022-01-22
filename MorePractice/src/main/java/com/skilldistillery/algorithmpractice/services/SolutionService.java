package com.skilldistillery.algorithmpractice.services;

import java.util.List;

import com.skilldistillery.algorithmpractice.entities.Solution;

public interface SolutionService {

	Solution findSolutionById(Integer sId);

	Solution createNewSolution(Integer sId, Solution tracker);

	Solution updateSolution(Integer sId, Solution tracker, Integer id);

	boolean deleteSolutionById(Integer sId);

//	List<Solution> getSolutionByLanguage(Integer lId);

	List<Solution> getSolutionByLanguage(String keyword);

}
