package com.devloop.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devloop.backend.model.Produto;
import com.devloop.backend.repository.ProdutoDAO;

@RestController
@RequestMapping("produtos")
@CrossOrigin("*")
public class ProdutoController {

    @Autowired
    private ProdutoDAO dao;

    @GetMapping
    public List<Produto> obterTodos() {
        return dao.findAll();
    }

    @GetMapping("/{id}")
    public Produto obterPorId(@PathVariable String id) {
        return dao.findById(id).orElse(null);
    }

    @PostMapping
    public Produto inserir(@RequestBody Produto produto) {
        dao.save(produto);
        return produto;
    }
    
    @PutMapping("/{id}")
    public Produto atualizarPorId(@PathVariable String id, @RequestBody Produto produto) {
    	if (dao.existsById(id)) {
    		produto.setId(id); // garante que o objeto usará o ID correto da URL
    		return dao.save(produto); // O save atualiza o produto se o ID já existir
    	}
    	return null;
    }
    
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable String id) {
    	dao.deleteById(id);
    }
    
}