package com.skilldistillery.algorithmpractice.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.entities.Solution;
import com.skilldistillery.algorithmpractice.repositories.AlgorithmRepository;
import com.skilldistillery.algorithmpractice.repositories.LanguageRepository;
import com.skilldistillery.algorithmpractice.repositories.SolutionRepository;

@Service 
public class SolutionServiceImpl implements SolutionService {

	@Autowired 
	private SolutionRepository sRepo;
	
	@Autowired 
	private AlgorithmRepository aRepo;
	
	@Autowired 
	private LanguageRepository lRepo;

	@Override
	public Solution findSolutionById(Integer sId) {
		Optional<Solution> sOpt = sRepo.findById(sId);
		 if (sOpt.isPresent()) {
			 Solution solution = sOpt.get();
			 return solution;
		 } return null;
	}

	@Override
	public Solution createNewSolution(Integer id, Solution solution) {
		Optional<Algorithm> aOpt = aRepo.findById(id);
		if (aOpt.isPresent()) {
			Algorithm algorithm = aOpt.get();
			solution.setAlgorithm(algorithm);
			sRepo.saveAndFlush(solution);
			return solution;
		} return null;
	}

	@Override
	public Solution updateSolution(Integer sId, Solution solution, Integer id) {
		Optional<Algorithm> aOpt = aRepo.findById(id);
		if (aOpt.isPresent()) {
			Algorithm algorithm = aOpt.get();
			solution.setAlgorithm(algorithm);
			sRepo.saveAndFlush(solution);
			return solution;
		} return null;
	}


	@Override
	public boolean deleteSolutionById(Integer sId) {
		boolean deleted = false; 
		Optional<Solution> aOpt = sRepo.findById(sId);
		if (aOpt.isPresent()) {
			Solution solution = aOpt.get();
			sRepo.delete(solution);
			deleted = true;
			return deleted;
		} return deleted;
	}

	@Override
	public List<Solution> getSolutionByLanguage(Integer lId) {
		if (! lRepo.existsById(lId)) {
			return null;
		} List<Solution> solutions = sRepo.findByLanguage_Id(lId);
		return solutions;
	}

	
}
