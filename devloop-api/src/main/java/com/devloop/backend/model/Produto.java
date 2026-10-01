package com.devloop.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Produto {

    @Id
    public String id;
    
    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

    public String name;
    public String brand;
    public String category;
    

	public String chip;
    public String badge;

    public String ram;
    public String storage;
    public String cpu;

    @Column(length = 1000)
    public String description;

    @Column(length = 2000)
    public String fullDescription;

    public Integer price;
    public Integer quantidadeEstoque;

    public String imageMain;
    public String imageHover;

    public String display;
    public String os;
    public String displayDetail;
    public String connectivity;

    public Produto() {
    }

    public Produto(
            String id,
            String name,
            String brand,
            String category,
            String chip,
            String badge,
            String ram,
            String storage,
            String cpu,
            String description,
            String fullDescription,
            Integer price,
            String imageMain,
            String imageHover,
            String display,
            String os,
            String displayDetail,
            String connectivity,
            Integer quantidadeEstoque
    ) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.category = category;
        this.chip = chip;
        this.badge = badge;
        this.ram = ram;
        this.storage = storage;
        this.cpu = cpu;
        this.description = description;
        this.fullDescription = fullDescription;
        this.price = price;
        this.imageMain = imageMain;
        this.imageHover = imageHover;
        this.display = display;
        this.os = os;
        this.displayDetail = displayDetail;
        this.connectivity = connectivity;
        this.quantidadeEstoque = quantidadeEstoque;
    }
}