package com.skilldistillery.algorithmpractice.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity 
public class Algorithm {

//	fields 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private String title; 
	
	private String description; 
	
	private int rating;
	
//	constructors 
	public Algorithm() {} 
	
	public Algorithm(int id, String title, String description, int rating) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.rating = rating;
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

	
//	toString
	@Override
	public String toString() {
		return "Algorithm [id=" + id + ", title=" + title + ", description=" + description + ", rating=" + rating + "]";
	} 

	
}
