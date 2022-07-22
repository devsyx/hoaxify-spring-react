package com.hoaxify.ws;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.hoaxify.ws.hoax.HoaxService;
import com.hoaxify.ws.hoax.vm.HoaxSubmitVM;
import com.hoaxify.ws.user.User;
import com.hoaxify.ws.user.UserService;

@SpringBootApplication
public class WsApplication {

	public static void main(String[] args) {
		SpringApplication.run(WsApplication.class, args);
	}

	@Bean
	CommandLineRunner createInitialUsers(UserService userService, HoaxService hoaxService) {
		return (args) -> {
			for (int i = 1; i <= 10; i++) {
				try {
					userService.getByUsername("user" + i);
				} catch (Exception e) {
					User user = new User();
					user.setUsername("user" + i);
					user.setDisplayName("display" + i);
					user.setPassword("Safa1905");
					userService.save(user);
					HoaxSubmitVM hoax = new HoaxSubmitVM();
					hoax.setContent("Hey there! I am using Hoaxify.");
					hoaxService.save(hoax, user);
				}
			}
		};
	}
}
