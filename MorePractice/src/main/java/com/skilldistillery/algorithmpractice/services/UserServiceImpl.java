package com.skilldistillery.algorithmpractice.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.entities.User;
import com.skilldistillery.algorithmpractice.repositories.UserRepository;

@Service 
public class UserServiceImpl implements UserService {

	@Autowired 
	private UserRepository uRepo;

	@Override
	public User findUserById(Integer userId) {
		 Optional<User> uOpt = uRepo.findById(userId);
		 if (uOpt.isPresent()) {
			 User user = uOpt.get();
			 return user;
		 } return null;
	}

	@Override
	public User updateUserInfo(User user, Integer userId) {
		if (uRepo.existsById(userId)) {
			return uRepo.save(user);
		} return null;
	}
	
	@Override
	public User findUserByUsernameAndPassword(String username, String password) {
		User user = uRepo.findByUsernameAndPassword(username, password); 
		if (user != null) {
			return user;
		} return null;
	}
}
