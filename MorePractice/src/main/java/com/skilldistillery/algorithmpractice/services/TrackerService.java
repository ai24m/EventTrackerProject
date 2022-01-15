package com.skilldistillery.algorithmpractice.services;

import java.util.List;

import com.skilldistillery.algorithmpractice.entities.Tracker;

public interface TrackerService {

	Tracker createNewTracker(Integer userId, Integer id, Tracker tracker);

	Tracker findTrackerById(Integer tId);

	Tracker updateTracker(Integer tId, Tracker tracker, Integer userId, Integer id);

	boolean deleteTrackerById(Integer tId);

	List<Tracker> findTrackersByAlgorithmId(Integer id);

	List<Tracker> findAllTrackers();

}
