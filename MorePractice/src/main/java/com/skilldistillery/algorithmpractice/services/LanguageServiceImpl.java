package com.skilldistillery.algorithmpractice.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.entities.Language;
import com.skilldistillery.algorithmpractice.repositories.LanguageRepository;

@Service  
public class LanguageServiceImpl implements LanguageService {

	@Autowired 
	private LanguageRepository lRepo;

	@Override
	public List<Language> getAllLanguages() {
		return lRepo.findAll();
	}
}
