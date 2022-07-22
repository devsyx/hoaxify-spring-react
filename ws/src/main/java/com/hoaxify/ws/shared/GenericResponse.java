package com.hoaxify.ws.shared;

public class GenericResponse {
	private String message;

	public GenericResponse(String message) {
		super();
		this.setMessage(message);
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}
	
}
