package com.skilldistillery.algorithmpractice.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.entities.User;
import com.skilldistillery.algorithmpractice.services.AlgorithmService;
import com.skilldistillery.algorithmpractice.services.UserService;

@RestController 
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4202"})
//@CrossOrigin({"*", "http://localhost:57448"})

public class AlgorithmController {

	@Autowired 
	private AlgorithmService aSvc;
	
	@Autowired 
	private UserService uSvc;
	
	@GetMapping("algorithms")
	public List<Algorithm> allAlgorithms() {
		return aSvc.getAllAlgorithms();
	}
	
	@GetMapping("algorithms/find/{id}")
	public Algorithm findAlgorithmById(@PathVariable Integer id,
			HttpServletResponse res) {
		Algorithm algorithm = aSvc.findAlgorithmById(id);
		if (algorithm == null) {
			res.setStatus(404);
		} return algorithm;
	}
	
	@GetMapping("algorithms/search/{keyword}")
	public List<Algorithm> getAlgorithmsByTitleOrDescription(@PathVariable String keyword, 
			HttpServletResponse res) {
		List <Algorithm> algorithms = aSvc.findByTitleDescLike(keyword);;
		if (algorithms == null) {
			res.setStatus(404);
		} return algorithms;
	}

	@PostMapping("users/{userId}/algorithms")
	public Algorithm createNewAlgorithm(@RequestBody Algorithm algorithm, @PathVariable Integer userId,
			HttpServletRequest req, HttpServletResponse res) {
		User user = uSvc.findUserById(userId);
		if (user != null) {
			Algorithm newAlgorithm = aSvc.createNewAlgorithm(algorithm);
			if (newAlgorithm == null) {
				res.setStatus(404);
		} else {
				res.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(algorithm.getId());
				res.setHeader("location", url.toString());
			}
			return newAlgorithm;
		} res.setStatus(403);
		return null;
	}
	
	@PutMapping("users/{userId}/algorithms/{id}")
	public Algorithm updateAlgorithm(@PathVariable Integer id, @RequestBody Algorithm algorithm, 
			@PathVariable Integer userId, HttpServletResponse res){
		try {
			User user = uSvc.findUserById(userId);
			if (algorithm.getUser().getId() == user.getId()) {
				algorithm = aSvc.updateAlgorithm(id, algorithm);
				if (algorithm == null) {
					res.setStatus(404); //404 request body does not exisy
				} 
			}
		} catch (Exception e) {
			res.setStatus(400); //400 request body is bad data 
			e.printStackTrace();
			algorithm = null;
		} return algorithm;
	} 
	
	@DeleteMapping("users/{userId}/algorithms/{id}")
	public void deleteAlgorithm(@PathVariable Integer id, @PathVariable Integer userId, HttpServletResponse res) {
		try {
			User user = uSvc.findUserById(userId);
			if (user.getId() == 1) {
				if (aSvc.deleteAlgorithmById(id)) {
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


//
//| List<Algorithms> | GET         | /api/algorithms      |              | List     |
//| Algorithm        | GET         | /api/algorithms/{id} |              | Retrieve |  
//| Algorithm        | POST        | /api/algorithms      | JSON         | Create   |
//| Algorithm        | PUT         | /api/algorithms/{id} | JSON         | Update   |
//| Algorithm        | DELETE      | /api/algorithms/{id} |              | Delete   |