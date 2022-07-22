package com.hoaxify.ws.auth;

import com.hoaxify.ws.user.vm.UserVM;

import lombok.Data;

@Data
public class AuthResponse {

	private UserVM userVM;

	private String token;

}
