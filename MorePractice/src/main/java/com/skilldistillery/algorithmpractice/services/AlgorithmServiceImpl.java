package com.skilldistillery.algorithmpractice.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.repositories.AlgorithmRepository;

@Service 
public class AlgorithmServiceImpl implements AlgorithmService {

	@Autowired 
	private AlgorithmRepository aRepo;
	
	@Override
	public List<Algorithm> getAllAlgorithms() {
		return aRepo.findAll();
	}

	@Override
	public Algorithm findAlgorithmById(Integer id) {
		 Optional<Algorithm> aOpt = aRepo.findById(id);
		 if (aOpt.isPresent()) {
			 Algorithm algorithm = aOpt.get();
			 return algorithm;
		 } return null;
	}

	@Override
	public Algorithm createNewAlgorithm(Algorithm algorithm) {
		if (algorithm != null) {
			aRepo.saveAndFlush(algorithm);
			return algorithm;
		} return null;
	}

	@Override
	public Algorithm updateAlgorithm(Integer id, Algorithm algorithm) {
		if (aRepo.existsById(id)) {
			return aRepo.save(algorithm);
		} return null;
	}

	@Override
	public boolean deleteAlgorithmById(Integer id) {
		boolean deleted = false; 
		Optional<Algorithm> aOpt = aRepo.findById(id);
		if (aOpt.isPresent()) {
			Algorithm algorithm = aOpt.get();
			aRepo.delete(algorithm);
			deleted = true;
			return deleted;
		} return deleted;
	} 
}
