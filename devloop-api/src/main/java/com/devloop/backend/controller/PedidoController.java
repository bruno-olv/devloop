package com.devloop.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devloop.backend.model.Pedido;
import com.devloop.backend.repository.PedidoDAO;
import com.devloop.backend.repository.ProdutoDAO;

@RestController
@RequestMapping("pedidos")
@CrossOrigin("*")
public class PedidoController {

    @Autowired
    private PedidoDAO dao;

    @Autowired
    private ProdutoDAO produtoDAO;

    @PostMapping
    public Pedido inserir(@RequestBody Pedido pedido){

        for (var item : pedido.getItens()) {
            var produto = produtoDAO.findById(item.getProduto().getId());

            if (produto.isEmpty()) {
                throw new RuntimeException("Produto não encontrado!");
            }

            var produtoBanco = produto.get();

            if (produtoBanco.quantidadeEstoque < item.getQuantidade()) {
                throw new RuntimeException("Estoque insuficiente");
            }

            produtoBanco.quantidadeEstoque -= item.getQuantidade();

            produtoDAO.save(produtoBanco);

        }


    return dao.save(pedido);

  }
  
}