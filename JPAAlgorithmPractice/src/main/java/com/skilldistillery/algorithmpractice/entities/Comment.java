package com.skilldistillery.algorithmpractice.entities;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity 
public class Comment {
//	fields
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private String content; 
	
	@Column(name="created_at")
	@CreationTimestamp
	private LocalDateTime createdAt; 
	
	@Column(name="updated_at")
	@UpdateTimestamp
	private LocalDateTime updatedAt;
	
	@ManyToOne
	@JoinColumn(name="solution_id")
	private Solution solution;
	
	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;
	
//  constructors 
	public Comment() {} 
	
	public Comment(int id, String content, LocalDateTime createdAt, LocalDateTime updatedAt, Solution solution,
			User user) {
		super();
		this.id = id;
		this.content = content;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.solution = solution;
		this.user = user;
	}

//	getters and setters 
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Solution getSolution() {
		return solution;
	}

	public void setSolution(Solution solution) {
		this.solution = solution;
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
		return "Comment [id=" + id + ", content=" + content + ", createdAt=" + createdAt + ", updatedAt=" + updatedAt
				+ "]";
	}
}
