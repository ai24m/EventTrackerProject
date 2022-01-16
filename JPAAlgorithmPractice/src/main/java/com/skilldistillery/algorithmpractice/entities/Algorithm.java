package com.skilldistillery.algorithmpractice.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity 
public class Algorithm {

//	fields 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private String title; 
	
	private String description; 
	
	private int rating;
	
	private String sample;
	
	@JsonIgnore
	@OneToMany(mappedBy = "algorithm")
	private List<Solution> solutions;
	
	@JsonIgnore
	@OneToMany(mappedBy = "algorithm")
	private List<Tracker> trackers;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user; 
	
//	constructors 
	public Algorithm() {} 

	public Algorithm(int id, String title, String description, int rating, String sample, List<Solution> solutions,
		List<Tracker> trackers, User user) {
	super();
	this.id = id;
	this.title = title;
	this.description = description;
	this.rating = rating;
	this.sample = sample;
	this.solutions = solutions;
	this.trackers = trackers;
	this.user = user;
	}

	//  getters and setters 
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

	public String getSample() {
		return sample;
	}

	public void setSample(String sample) {
		this.sample = sample;
	}

	public List<Solution> getSolutions() {
		return solutions;
	}

	public void setSolutions(List<Solution> solutions) {
		this.solutions = solutions;
	}
	
	public List<Tracker> getTrackers() {
		return trackers;
	}
	
	public void setTrackers(List<Tracker> trackers) {
		this.trackers = trackers;
	}

	public void setComments(List<Tracker> trackers) {
		this.trackers = trackers;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	//	toString
	@Override
	public String toString() {
		return "Algorithm [id=" + id + ", title=" + title + ", description=" + description + ", rating=" + rating + "]";
	} 

	
}
