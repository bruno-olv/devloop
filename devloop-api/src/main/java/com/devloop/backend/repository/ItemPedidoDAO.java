package com.devloop.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devloop.backend.model.ItemPedido;

public interface ItemPedidoDAO extends JpaRepository<ItemPedido, String> {

}