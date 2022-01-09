package com.skilldistillery.algorithmpractice.services;

import com.skilldistillery.algorithmpractice.entities.Solution;

public interface SolutionService {

	Solution findSolutionById(Integer sId);

	Solution createNewSolution(Integer sId, Solution tracker);

	Solution updateSolution(Integer sId, Solution tracker, Integer id);

	boolean deleteSolutionById(Integer sId);



}
