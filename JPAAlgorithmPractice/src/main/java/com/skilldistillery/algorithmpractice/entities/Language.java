package com.skilldistillery.algorithmpractice.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Language {
//	fields 
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id; 
	
	private String name; 
	
//	constructors 
	public Language() {}

	public Language(int id, String name) {
		super();
		this.id = id;
		this.name = name;
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

//	toString 
	@Override
	public String toString() {
		return "Language [id=" + id + ", name=" + name + "]";
	} 
}
