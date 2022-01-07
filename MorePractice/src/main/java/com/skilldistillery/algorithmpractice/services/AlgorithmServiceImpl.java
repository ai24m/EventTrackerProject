package com.skilldistillery.algorithmpractice.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.repositories.AlgorithmRepository;

@Service 
public class AlgorithmServiceImpl implements AlgorithmService {

	@Autowired 
	private AlgorithmRepository ap;
	
	@Override
	public List<Algorithm> getAllAlgorithms() {
		return ap.findAll();
	}

}
