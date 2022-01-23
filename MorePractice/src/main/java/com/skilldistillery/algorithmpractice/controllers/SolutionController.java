package com.skilldistillery.algorithmpractice.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.entities.Solution;
import com.skilldistillery.algorithmpractice.entities.Solution;
import com.skilldistillery.algorithmpractice.services.AlgorithmService;
import com.skilldistillery.algorithmpractice.services.SolutionService;

@RestController 
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4202"})
//@CrossOrigin({"*", "http://localhost:57448"})

public class SolutionController {
	
	@Autowired 
	private SolutionService sSvc;
	
	@Autowired 
	private AlgorithmService aSvc;
	
	@GetMapping("algorithms/{id}/solutions")
	public List <Solution> findAllSolutionsToAlgorithm(@PathVariable Integer id, HttpServletResponse res) {
		Algorithm algorithm = aSvc.findAlgorithmById(id);
		if (algorithm == null) {
			res.setStatus(404);
		} return algorithm.getSolutions();
	}
	
	@GetMapping("algorithms/solutions/{sId}")
	public Solution findSolutionById(@PathVariable Integer sId, HttpServletResponse res) {
		Solution solution = sSvc.findSolutionById(sId);
		if (solution == null) {
			res.setStatus(404);
		} else {
			return solution;
		} return null;
	}
	
//	@GetMapping("algorithms/{id}/solutions/search/language/{lId}")
//	public List<Solution> getSolutionByLanguage(@PathVariable Integer lId, 
//			HttpServletResponse res) {
//		List<Solution> posts = sSvc.getSolutionByLanguage(lId); 
//		if (posts == null) {
//			res.setStatus(404);
//		} return posts;
//	}
	@GetMapping("algorithms/{id}/solutions/search/language/{keyword}")
	public List<Solution> getSolutionByLanguage(@PathVariable String keyword, 
			HttpServletResponse res) {
		List<Solution> posts = sSvc.getSolutionByLanguage(keyword); 
		if (posts == null) {
			res.setStatus(404);
		} return posts;
	}
	
	@PostMapping("algorithms/{id}/solutions")
	public Solution createSolution(@RequestBody Solution solution, @PathVariable Integer id,
			HttpServletResponse res, HttpServletRequest req) {
		Algorithm algorithm = aSvc.findAlgorithmById(id);
		if (solution == null | algorithm == null) {
			res.setStatus(404);
		} else {
			solution = sSvc.createNewSolution(id, solution);
			if (solution == null) {
				res.setStatus(404);
			} else {
				res.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(solution.getId());
				res.setHeader("location", url.toString());
			}
			return solution; 
		} res.setStatus(403);
		return null; 
	}
	
	@PutMapping("algorithms/{id}/solutions/{sId}")
	public Solution updateSolution(@RequestBody Solution solution, 
			@PathVariable Integer id, @PathVariable Integer sId, HttpServletResponse res){
		try {
			solution = sSvc.updateSolution(sId, solution, id);
			if (solution == null) {
				res.setStatus(404); //404 request body does not exisy
			} 
		} catch (Exception e) {
			res.setStatus(400); //400 request body is bad data 
			e.printStackTrace();
			solution = null;
		} return solution;
	} 
	
	@DeleteMapping("algorithms/{id}/solutions/{sId}")
	public void deleteAlgorithm(@PathVariable Integer id, @PathVariable Integer sId, 
			HttpServletResponse res) {
		try {
			Solution solution = sSvc.findSolutionById(sId);
			if (solution != null) {
				if (sSvc.deleteSolutionById(sId)) {
					res.setStatus(204);
				} else {
					res.setStatus(404); //not found, invalid id 
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
		}
	}
}

