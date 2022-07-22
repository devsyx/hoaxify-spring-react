package com.hoaxify.ws.user;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;

public class UniqueUsernameValidator implements ConstraintValidator<UniqueUsername, String> {

	@Autowired
	UserRepository userRepository;

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		User user = userRepository.findByUsername(value);
		if (user != null) {
			return false;
		}
		return true;
	}
}
