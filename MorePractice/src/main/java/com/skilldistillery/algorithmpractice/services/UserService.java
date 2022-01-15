package com.skilldistillery.algorithmpractice.services;

import com.skilldistillery.algorithmpractice.entities.Algorithm;
import com.skilldistillery.algorithmpractice.entities.User;

public interface UserService {

	User findUserById(Integer userId);

	User updateUserInfo(User user, Integer userId);

	User findUserByUsernameAndPassword(String username, String password);

}
