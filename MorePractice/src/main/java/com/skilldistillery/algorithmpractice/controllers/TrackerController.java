package com.skilldistillery.algorithmpractice.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.entities.Tracker;
import com.skilldistillery.algorithmpractice.entities.User;
import com.skilldistillery.algorithmpractice.services.AlgorithmService;
import com.skilldistillery.algorithmpractice.services.TrackerService;
import com.skilldistillery.algorithmpractice.services.UserService;

@RestController 
@RequestMapping("api")
public class TrackerController {

	@Autowired 
	private TrackerService tSvc;
	
	@Autowired 
	private UserService uSvc;
	
	@Autowired 
	private AlgorithmService aSvc;
	
	@GetMapping("users/{userId}/trackers/{tId}")
	public Tracker findTrackerById(@PathVariable Integer userId, 
			@PathVariable Integer tId, 
			HttpServletResponse res) {
		User user = uSvc.findUserById(userId);
		if (user == null) {
			res.setStatus(404);
		} else {
			Tracker tracker = tSvc.findTrackerById(tId); 
			if (tracker.getUpdatedAt().getDayOfMonth() == 0) {
				
			};
			return tracker;
		} return null;
	}
	
//	@GetMapping("/find/algorithms/{id}/trackers/")
//	public List<Tracker> getTrackersForAlgorithm(@PathVariable Integer id) {
//		List<Tracker> trackers = tSvc.findTrackersByAlgorithmId(id);
//		return trackers; 
//	}
//	
	@GetMapping("/find/algorithms/{id}/trackers/")
	public List<Tracker> getAllTrackers(@PathVariable Integer id) {
		List<Tracker> trackers = tSvc.findAllTrackers();
		List<Tracker> trackersWithAlgorithmId = new ArrayList<>();
		for (Tracker t : trackers) {
			if (t.getAlgorithm().getId() == id) {
				trackersWithAlgorithmId.add(t);
			} 
		} return trackersWithAlgorithmId;
	}
	
	@PostMapping("users/{userId}/algorithms/{id}/trackers")
	public Tracker createTracker(@RequestBody Tracker tracker, 
			@PathVariable Integer userId, @PathVariable Integer id,
			HttpServletResponse res, HttpServletRequest req) {
		User user = uSvc.findUserById(userId);
		Algorithm algorithm = aSvc.findAlgorithmById(id);
		if (user == null | algorithm == null) {
			res.setStatus(404);
		} else {
			Tracker newTracker = tSvc.createNewTracker(userId, id, tracker);
			if (tracker == null) {
				res.setStatus(404);
			} else {
				res.setStatus(201);
				StringBuffer url = req.getRequestURL();
				url.append("/").append(tracker.getId());
				res.setHeader("location", url.toString());
			}
			return newTracker; 
		} res.setStatus(403);
		return null; 
	}
	
	@PutMapping("users/{userId}/algorithms/{id}/trackers/{tId}")
	public Tracker updateTracker(@PathVariable Integer tId, @RequestBody Tracker tracker, 
			@PathVariable Integer id, @PathVariable Integer userId, HttpServletResponse res){
		try {
			tracker = tSvc.updateTracker(tId, tracker, userId, id);
			if (tracker == null) {
				res.setStatus(404); //404 request body does not exisy
			} return tracker; 
		} catch (Exception e) {
			res.setStatus(400); //400 request body is bad data 
			e.printStackTrace();
			tracker = null;
		} return tracker; 
	} 
	
	@DeleteMapping("users/{userId}/algorithms/{id}/trackers/{tId}")
	public void deleteAlgorithm(@PathVariable Integer tId, @RequestBody Tracker tracker, 
			@PathVariable Integer id, @PathVariable Integer userId, HttpServletResponse res) {
		try {
			User user = uSvc.findUserById(userId);
			if (user != null) {
				if (tSvc.deleteTrackerById(tId)) {
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
