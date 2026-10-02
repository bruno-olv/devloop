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
import com.devloop.backend.repository.UsuarioDAO;

@RestController
@RequestMapping("pedidos")
@CrossOrigin("*")
public class PedidoController {

    @Autowired
    private PedidoDAO dao;

    @Autowired
    private ProdutoDAO produtoDAO;
    
    @Autowired
    private UsuarioDAO usuarioDAO;

    @PostMapping
    public Pedido inserir(@RequestBody Pedido pedido){
    	
    	int totalCalculado = 0;

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
            
            item.setPedido(pedido); 
            
            totalCalculado += produtoBanco.price * item.getQuantidade();

        }
        
        pedido.setTotal(totalCalculado);
        
        if (pedido.getUsuario() != null && pedido.getUsuario().getId() != null) {
            var usuario = usuarioDAO.findById(pedido.getUsuario().getId());
            if (usuario.isPresent()) {
                pedido.setUsuario(usuario.get());
            }
        }

    return dao.save(pedido);

  }
  
}