package com.devloop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devloop.backend.model.Produto;

public interface ProdutoDAO extends JpaRepository<Produto, String> {

}