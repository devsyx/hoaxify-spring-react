package com.hoaxify.ws.error;

import java.util.Date;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Data;
@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class ApiError {
	
	private int status;
	
	private String message;
	
	private String path;
	
	private long time = new Date().getTime();
	
	private Map<String, String> validationErrors;

	public ApiError(int status, String message, String path) {
		super();
		this.status = status;
		this.message = message;
		this.path = path;
	}
}
