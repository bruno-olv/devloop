package com.devloop.backend.dto;

public class LoginRequest {

	private String email;
	private String password;

	// Construtor padrão (obrigatório para o Spring)
	public LoginRequest() {
	}

	// Construtor com parâmetros (esse é opcional, mas bom ter)
	public LoginRequest(String email, String password) {
		this.email = email;
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
