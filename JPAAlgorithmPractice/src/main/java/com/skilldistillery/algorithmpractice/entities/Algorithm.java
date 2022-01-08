package com.skilldistillery.algorithmpractice.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

@Entity 
public class Algorithm {

//	fields 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private String title; 
	
	private String description; 
	
	private int rating;
	
	@OneToMany(mappedBy = "algorithm")
	private List<Solution> solutions;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user; 
	
//	constructors 
	public Algorithm() {} 

	public Algorithm(int id, String title, String description, int rating, List<Solution> solutions, User user) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.rating = rating;
		this.solutions = solutions;
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

	public List<Solution> getSolutions() {
		return solutions;
	}

	public void setSolutions(List<Solution> solutions) {
		this.solutions = solutions;
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
