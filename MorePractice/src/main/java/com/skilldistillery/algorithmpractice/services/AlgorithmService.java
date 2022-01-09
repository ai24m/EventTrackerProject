package com.skilldistillery.algorithmpractice.services;

import java.util.List;

import com.skilldistillery.algorithmpractice.entities.Algorithm;


public interface AlgorithmService {

	List<Algorithm> getAllAlgorithms();

	Algorithm findAlgorithmById(Integer id);

	Algorithm createNewAlgorithm(Algorithm algorithm);

	Algorithm updateAlgorithm(Integer id, Algorithm algorithm);

	boolean deleteAlgorithmById(Integer id);
}
