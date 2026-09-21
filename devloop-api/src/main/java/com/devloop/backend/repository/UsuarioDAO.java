package com.devloop.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.devloop.backend.model.Usuario;

public interface UsuarioDAO extends JpaRepository<Usuario, String> {
	
	public Optional<Usuario> findByEmail(String email);

}
