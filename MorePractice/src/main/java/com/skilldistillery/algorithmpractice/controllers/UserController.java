package com.skilldistillery.algorithmpractice.controllers;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.entities.Solution;
import com.skilldistillery.algorithmpractice.entities.Tracker;
import com.skilldistillery.algorithmpractice.entities.User;
import com.skilldistillery.algorithmpractice.services.UserService;

@RestController 
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4202"})

public class UserController {

	@Autowired 
	private UserService uSvc;
	
	@Autowired
	private HttpSession session;
	
	@GetMapping("profile/{userId}")
	public User findUserById(@PathVariable Integer userId, 
			HttpServletResponse res) {
		User user = uSvc.findUserById(userId);
		if (user == null) {
			res.setStatus(404);
		} return user;
	}
	
	@GetMapping("login/{username}/{password}")
	public User getUserLogin(@PathVariable String username, @PathVariable String password,
			HttpServletResponse res, HttpSession session) throws IOException {
		User user = uSvc.findUserByUsernameAndPassword(username, password);
		if (user == null) {
			res.setStatus(404);
		} session.setAttribute("user", user); 
		return user;
	}

	
//	@PostMapping("login")
//	public User checkUserLogin(@RequestBody User user,
//			HttpServletResponse res) {
//		User check = uSvc.findUserByUsernameAndPassword(user.getPassword(), user.getUsername());
//		if (check == null) {
//			res.setStatus(404); 
//		} session.setAttribute("user", check);
//		return check;
//	}
	
	
//	function passUser(username, password) {
//		let xhr = new XMLHttpRequest();
//
//		xhr.open('POST', '/api/login/', true);
//		
//		xhr.setRequestHeader("Content-type", "application/json"); // Specify JSON request body
//		
//		xhr.onreadystatechange = function(){
//			if (xhr.readyState === 4) {
//				if (xhr.status === 200) {
//					// convert responseText to JSON
//					let user = JSON.parse(xhr.responseText);
//					console.log(user);
//					let check = getUser(user.id);
//					if (check === null) {
//						console.error("login failed");
//					}
//				} 
//			} else if (xhr.readyState === 4 && xhr.status >= 400) {
//				displayError("Trackers" + " not found"); 
//			} else {
//				displayError("Error retrieving trackers: " + xhr.status);
//			}
//		}; let userObject = {
//			username: username,
//			password: password
//		}; 
//		let userObjectJson = JSON.stringify(userObject); 
//		xhr.send(userObjectJson);
//	}
	
	@GetMapping("user/{userId}/algorithms")
	public List<Algorithm> findAlgorithmsByUserId(@PathVariable Integer userId, 
			HttpServletResponse res) {
		User user = uSvc.findUserById(userId);
		if (user == null) {
			res.setStatus(404);
		} return user.getAlgorithms();
	}
	
	@GetMapping("user/{userId}/solutions")
	public List<Solution> findSolutionsByUserId(@PathVariable Integer userId, 
			HttpServletResponse res) {
		User user = uSvc.findUserById(userId);
		if (user == null) {
			res.setStatus(404);
		} return user.getSolutions();
	}
	
	@GetMapping("user/{userId}/trackers")
	public List<Tracker> findTrackersByUserId(@PathVariable Integer userId, 
			HttpServletResponse res) {
		User user = uSvc.findUserById(userId);
		if (user == null) {
			res.setStatus(404);
		} return user.getTrackers(); 
	}
	
	@PutMapping("profile/{userId}")
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
