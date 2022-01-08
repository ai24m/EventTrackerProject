package com.skilldistillery.algorithmpractice.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Solution {
//	fields 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private String title;
	
	@Column(name="image_url")
	private String imageUrl;
	
	private String description;
	
	@ManyToOne 
	@JoinColumn(name="algorithm_id")
	private Algorithm algorithm; 
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user; 
	
	@ManyToOne
	@JoinColumn(name="language_id")
	private Language language;
	
//  constructors 
	public Solution() {
		super();
	}

	public Solution(int id, String title, String imageUrl, String description, Algorithm algorithm, User user,
			Language language) {
		super();
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
		this.algorithm = algorithm;
		this.user = user;
		this.language = language;
	}

	//	getters and setters 
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

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Algorithm getAlgorithm() {
		return algorithm;
	}

	public void setAlgorithm(Algorithm algorithm) {
		this.algorithm = algorithm;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Language getLanguage() {
		return language;
	}

	public void setLanguage(Language language) {
		this.language = language;
	}

	//	toString 
	@Override
	public String toString() {
		return "Solution [id=" + id + ", title=" + title + ", imageUrl=" + imageUrl + ", description=" + description
				+ "]";
	} 
}
