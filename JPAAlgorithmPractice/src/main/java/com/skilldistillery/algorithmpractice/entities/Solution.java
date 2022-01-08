package com.skilldistillery.algorithmpractice.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
	
//  constructors 
	public Solution() {
		super();
	}

	public Solution(int id, String title, String imageUrl, String description) {
		super();
		this.id = id;
		this.title = title;
		this.imageUrl = imageUrl;
		this.description = description;
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

//	toString 
	@Override
	public String toString() {
		return "Solution [id=" + id + ", title=" + title + ", imageUrl=" + imageUrl + ", description=" + description
				+ "]";
	} 
}
