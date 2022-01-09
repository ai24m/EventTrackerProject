package com.skilldistillery.algorithmpractice.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.algorithmpractice.repositories.LanguageRepository;

@Service  
public class LanguageServiceImpl implements LanguageService {

	@Autowired 
	private LanguageRepository lr;
}
