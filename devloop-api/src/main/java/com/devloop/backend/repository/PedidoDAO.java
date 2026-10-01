package com.devloop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devloop.backend.model.Pedido;

public interface PedidoDAO extends JpaRepository<Pedido, String> {

}