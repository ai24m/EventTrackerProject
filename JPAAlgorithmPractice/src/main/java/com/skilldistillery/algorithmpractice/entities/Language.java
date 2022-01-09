package com.skilldistillery.algorithmpractice.entities;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Language {
//	fields 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private String name; 
	
	@JsonIgnore
	@OneToMany(mappedBy="language")
	private List<Solution> solution;
	
//	constructors 
	public Language() {}

	public Language(int id, String name, List<Solution> solution) {
		super();
		this.id = id;
		this.name = name;
		this.solution = solution;
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

	public List<Solution> getSolution() {
		return solution;
	}

	public void setSolution(List<Solution> solution) {
		this.solution = solution;
	}

	//	toString 
	@Override
	public String toString() {
		return "Language [id=" + id + ", name=" + name + "]";
	} 
}
