package com.skilldistillery.algorithmpractice.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.entities.Tracker;
import com.skilldistillery.algorithmpractice.entities.User;
import com.skilldistillery.algorithmpractice.repositories.AlgorithmRepository;
import com.skilldistillery.algorithmpractice.repositories.TrackerRepository;
import com.skilldistillery.algorithmpractice.repositories.UserRepository;

@Service
public class TrackerServiceImpl implements TrackerService {

	@Autowired 
	private TrackerRepository tRepo;
	
	@Autowired 
	private AlgorithmRepository aRepo;
	
	@Autowired
	private UserRepository uRepo;
	
	@Override
	public Tracker findTrackerById(Integer tId) {
		Optional<Tracker> tOpt = tRepo.findById(tId);
		Algorithm algorithm = tRepo.findByAlgorithm_Id(tId);
		if (tOpt.isPresent()) {
			Tracker tracker = tOpt.get();
			tracker.setAlgorithm(algorithm);
			return tracker;
		} return null;
	}

	@Override
	public Tracker createNewTracker(Integer userId, Integer id, Tracker tracker) {
		Optional<Algorithm> aOpt = aRepo.findById(id);
		Optional<User> uOpt = uRepo.findById(userId);
		if (aOpt.isPresent() & uOpt.isPresent()) {
			Algorithm algorithm = aOpt.get();
			User user = uOpt.get();
			tracker.setAlgorithm(algorithm);
			tracker.setUser(user);
			tRepo.saveAndFlush(tracker);
			return tracker;
		} return null;
	}

	@Override
	public Tracker updateTracker(Integer tId, Tracker tracker, Integer userId, Integer id) {
		Optional<Algorithm> aOpt = aRepo.findById(id);
		Optional<User> uOpt = uRepo.findById(userId);
		if (aOpt.isPresent() & uOpt.isPresent()) {
			Algorithm algorithm = aOpt.get();
			User user = uOpt.get();
			tracker.setAlgorithm(algorithm);
			tracker.setUser(user);
			tRepo.saveAndFlush(tracker);
			return tracker;
		} return null;
	}
	
	@Override
	public boolean deleteTrackerById(Integer tId) {
		boolean deleted = false; 
		Optional<Tracker> tOpt = tRepo.findById(tId);
		if (tOpt.isPresent()) {
			Tracker tracker = tOpt.get();
			tRepo.delete(tracker);
			deleted = true;
			return deleted;
		} return deleted;
	}

	@Override
	public List<Tracker> findTrackersByAlgorithmId(Integer id) {
		Algorithm algorithm = tRepo.findByAlgorithm_Id(id);
		if (algorithm != null) {
			List <Tracker> trackers = algorithm.getTrackers();
			return trackers;
		} return null;
	}

	@Override
	public List<Tracker> findAllTrackers() {
		List<Tracker> trackers = tRepo.findAll();
		return trackers;
	}
}
