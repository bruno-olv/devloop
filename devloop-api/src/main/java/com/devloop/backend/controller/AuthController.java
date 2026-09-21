package com.devloop.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devloop.backend.dto.LoginRequest;
import com.devloop.backend.model.Usuario;
import com.devloop.backend.repository.UsuarioDAO;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthController {

	@Autowired
	private UsuarioDAO usuarioDAO;

	@PostMapping("/login")
	public Usuario login(@RequestBody LoginRequest loginRequest) {
		// Busca o usuário pelo e-mail enviado no corpo da requisição
		Optional<Usuario> optionalUsuario = usuarioDAO.findByEmail(loginRequest.getEmail());

		// Verifica se o e-mail foi encontrado no banco
		if (optionalUsuario.isPresent()) {
			Usuario usuario = optionalUsuario.get();

			// Compara a senha informada no login com a senha salva no banco
			if (usuario.getPassword().equals(loginRequest.getPassword())) {
				return usuario; // Login bem-sucedido: retorna os dados do usuário
			}
		}

		// Se o e-mail não existir ou a senha estiver incorreta
		return null;
	}

	@PostMapping("/register")
	public Usuario register(@RequestBody Usuario usuario) {

		// 1. Regra de negócio: Se a role veio nula, define como "ROLE_CLIENTE"
		if (usuario.getRole() == null) {
			usuario.setRole("ROLE_CLIENTE");
		}

		// 2. Salva no banco e retorna o usuário criado
		return usuarioDAO.save(usuario);
	}
}