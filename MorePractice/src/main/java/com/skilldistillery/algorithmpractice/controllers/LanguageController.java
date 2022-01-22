package com.skilldistillery.algorithmpractice.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.entities.Language;
import com.skilldistillery.algorithmpractice.entities.Solution;
import com.skilldistillery.algorithmpractice.services.AlgorithmService;
import com.skilldistillery.algorithmpractice.services.LanguageService;
import com.skilldistillery.algorithmpractice.services.SolutionService;

@RestController 
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4202"})

public class LanguageController {

	@Autowired
	private LanguageService lSvc;
	
	@Autowired
	private AlgorithmService aSvc;
	
	@Autowired
	private SolutionService sSvc;
	
	@GetMapping("algorithms/{id}/solutions/search/language")
	public List <Language> findAllLanguages(@PathVariable Integer id,
			HttpServletResponse res) {
		Algorithm algorithm = aSvc.findAlgorithmById(id);
		if (algorithm == null) {
			res.setStatus(404);
		} List<Solution> solutions = algorithm.getSolutions();
		List<Language> languages = new ArrayList<>();
		for (Solution solution : solutions) {
			if (solution.getLanguage().getName() != null) {
				languages.add(solution.getLanguage());
			} 
		} return languages;
	}
}
