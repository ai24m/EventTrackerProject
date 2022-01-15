package com.skilldistillery.algorithmpractice.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity 
public class User {
	
//	fields 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private String name; 
	
	private String password; 
	
	private String username; 
	
	private String email;
	
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List <Tracker> trackers;
	
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<Algorithm> algorithms;
	
	@JsonIgnore
	@OneToMany(mappedBy="user")
	private List<Solution> solutions;
	
//	constructors 
	public User() {} 

	public User(int id, String name, String password, String username, String email, List<Tracker> trackers,
		List<Algorithm> algorithms, List<Solution> solutions) {
	super();
	this.id = id;
	this.name = name;
	this.password = password;
	this.username = username;
	this.email = email;
	this.trackers = trackers;
	this.algorithms = algorithms;
	this.solutions = solutions;
}
	//	getters and setters 
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
	
	public List<Tracker> getTrackers() {
		return trackers;
	}

	public void setComments(List<Tracker> trackers) {
		this.trackers = trackers;
	}

	public List<Algorithm> getAlgorithms() {
		return algorithms;
	}

	public void setAlgorithms(List<Algorithm> algorithms) {
		this.algorithms = algorithms;
	}

	public List<Solution> getSolutions() {
		return solutions;
	}

	public void setSolutions(List<Solution> solutions) {
		this.solutions = solutions;
	}

	// tostring 
	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", username=" + username + ", email=" + email + "]";
	}
}