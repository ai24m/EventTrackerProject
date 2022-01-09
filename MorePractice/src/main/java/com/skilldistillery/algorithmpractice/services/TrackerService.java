package com.skilldistillery.algorithmpractice.services;

import com.skilldistillery.algorithmpractice.entities.Tracker;

public interface TrackerService {

	Tracker createNewTracker(Integer userId, Integer id, Tracker tracker);

	Tracker findTrackerById(Integer tId);

	Tracker updateTracker(Integer tId, Tracker tracker, Integer userId, Integer id);

	boolean deleteTrackerById(Integer tId);

}
