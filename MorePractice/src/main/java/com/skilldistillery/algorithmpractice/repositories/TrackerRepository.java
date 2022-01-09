package com.skilldistillery.algorithmpractice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.algorithmpractice.entities.Tracker;

public interface TrackerRepository extends JpaRepository<Tracker, Integer>{

}
