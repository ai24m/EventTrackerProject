package com.skilldistillery.algorithmpractice.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.algorithmpractice.entities.*;
import com.skilldistillery.algorithmpractice.services.UserService;

@RestController 
@RequestMapping("api")
public class UserController {

	@Autowired 
	private UserService uSvc;
	
	@GetMapping("users/{userId}")
	public User findAlgorithmById(@PathVariable Integer userId, 
			HttpServletResponse res) {
		User user = uSvc.findUserById(userId);
		if (user == null) {
			res.setStatus(404);
		} return user;
	}
	
	@GetMapping("users/{userId}/algorithms")
	public List<Algorithm> findAlgorithmsByUserId(@PathVariable Integer userId, 
			HttpServletResponse res) {
		User user = uSvc.findUserById(userId);
		if (user == null) {
			res.setStatus(404);
		} return user.getAlgorithms();
	}
	
	@GetMapping("users/{userId}/solutions")
	public List<Solution> findSolutionsByUserId(@PathVariable Integer userId, 
			HttpServletResponse res) {
		User user = uSvc.findUserById(userId);
		if (user == null) {
			res.setStatus(404);
		} return user.getSolutions();
	}
	
	@PutMapping("users/{userId}")
	public User updateUserInfo(@RequestBody User user, 
			@PathVariable Integer userId, HttpServletResponse res){
		try {
			user = uSvc.updateUserInfo(user, userId);
			if (user == null) {
				res.setStatus(404); //404 request body does not exisy
			} 
		} catch (Exception e) {
			res.setStatus(400); //400 request body is bad data 
			e.printStackTrace();
			user = null;
		} return user;
	} 
}
