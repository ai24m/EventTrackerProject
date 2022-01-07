package com.skilldistillery.algorithmpractice.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.services.AlgorithmService;

@RestController 
public class AlgorithmController {

	@Autowired 
	private AlgorithmService as;
	
	@GetMapping("algorithms")
	public List<Algorithm> allAlgorithms() {
		return as.getAllAlgorithms();
	}
}
