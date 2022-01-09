package com.skilldistillery.algorithmpractice.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.algorithmpractice.entities.Language;

public interface LanguageRepository extends JpaRepository<Language, Integer> {

}
