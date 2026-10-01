package com.devloop.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.devloop.backend.model.Produto;
import com.devloop.backend.model.Usuario;
import com.devloop.backend.repository.ProdutoDAO;
import com.devloop.backend.repository.UsuarioDAO;

@Component
public class ProdutoLoader implements CommandLineRunner {

	@Autowired
	private ProdutoDAO dao;

	@Autowired
	private UsuarioDAO usuarioDAO;

	@Override
	public void run(String... args) throws Exception {

	    if (usuarioDAO.findByEmail("admin@devloop.com").isEmpty()) {
	        Usuario admin = new Usuario();
	        admin.setName("Administrador");
	        admin.setEmail("admin@devloop.com");
	        admin.setPassword("admin123");
	        admin.setRole("ROLE_ADMIN");

	        usuarioDAO.save(admin);
	    }
    											
    	

        if (dao.count() > 0) {
            return;
        }

        dao.save(new Produto(
                "macbook-m4-pro",
                "MacBook Pro M4",
                "Apple",
                "apple",
                "Apple Silicon",
                "Mais alugado",
                "16GB RAM",
                "512GB SSD",
                "Apple M4 Pro",
                "Ideal para desenvolvimento iOS, Flutter e projetos profissionais.",
                "O MacBook Pro M4 é uma excelente escolha para desenvolvedores que buscam alto desempenho, eficiência energética e integração com o ecossistema Apple. Ideal para desenvolvimento iOS, aplicações web, containers e projetos profissionais, oferece compilação rápida, grande autonomia de bateria e uma experiência fluida para tarefas exigentes.",
                449,
                "../assets/images/MacBook M4 Pro/img1.png",
                "../assets/images/MacBook M4 Pro/img2.png",
                "14\"",
                "macOS Sequoia",
                "14\" Liquid Retina XDR",
                "Thunderbolt 5, HDMI e Wi-Fi 6E",
                10
        ));

        dao.save(new Produto(
                "thinkpad-x1-carbon-gen12",
                "ThinkPad X1 Carbon Gen 12",
                "Lenovo",
                "thinkpad",
                "Intel Evo",
                "Preferido dos devs",
                "32GB RAM",
                "1TB SSD",
                "Intel Core Ultra 7",
                "Ideal para desenvolvimento web, backend, Linux e produtividade profissional.",
                "O ThinkPad X1 Carbon Gen 12 é uma excelente escolha para desenvolvedores que buscam mobilidade sem abrir mão de desempenho. Seu design ultraleve, aliado ao processador Intel Core Ultra e aos 32GB de memória RAM, proporciona uma experiência fluida para desenvolvimento web, aplicações backend, ambientes Linux e multitarefa profissional. Ideal para quem trabalha remotamente, estuda ou precisa de produtividade em qualquer lugar.",
                379,
                "../assets/images/ThinkPad X1 Carbon Gen 12/img1.png",
                "../assets/images/ThinkPad X1 Carbon Gen 12/img2.png",
                "14\"",
                "Windows 11 Pro",
                "14\" OLED profissional",
                "USB-C, Thunderbolt 4, HDMI e Wi-Fi 6E",
                12
        ));

        dao.save(new Produto(
                "dell-xps-15",
                "Dell XPS 15",
                "Dell",
                "performance",
                "Intel Evo",
                "Premium",
                "32GB RAM",
                "1TB SSD",
                "Intel Core Ultra 7",
                "Excelente para desenvolvimento full stack, virtualização, multitarefa pesada e produtividade profissional.",
                "O Dell XPS 15 combina desempenho, portabilidade e acabamento premium em um equipamento voltado para profissionais exigentes. Equipado com processador Intel Core Ultra, 32GB de memória RAM e armazenamento SSD de alta velocidade, oferece excelente desempenho para desenvolvimento full stack, virtualização, containers, multitarefa pesada e fluxos de trabalho profissionais. Sua construção refinada, tela de alta qualidade e experiência de uso confortável fazem dele uma escolha versátil para quem busca produtividade sem abrir mão da mobilidade.",
                399,
                "../assets/images/Dell XPS 15/img1.png",
                "../assets/images/Dell XPS 15/img2.png",
                "15\"",
                "Windows 11 Pro",
                "15\" InfinityEdge de alta resolução",
                "USB-C, Thunderbolt 4 e Wi-Fi 6E",
                8
        ));

        dao.save(new Produto(
                "galaxy-book4-ultra",
                "Galaxy Book4 Ultra",
                "Samsung",
                "performance",
                "Intel Evo",
                "Tela AMOLED",
                "32GB RAM",
                "1TB SSD",
                "Intel Core Ultra 9",
                "Ideal para desenvolvimento, multitarefa avançada e produtividade com tela AMOLED de alta qualidade.",
                "O Galaxy Book4 Ultra oferece uma combinação equilibrada de desempenho, mobilidade e qualidade visual para profissionais de tecnologia. Equipado com processador Intel Core Ultra 9, 32GB de memória RAM e uma tela AMOLED de alta resolução, proporciona uma experiência fluida para desenvolvimento de software, multitarefa avançada e longas jornadas de trabalho. Sua tela com excelente fidelidade de cores também beneficia atividades relacionadas a design, criação de conteúdo e consumo de mídia, tornando-o uma opção versátil para diferentes perfis de desenvolvedores.",
                389,
                "../assets/images/Galaxy Book4 Ultra/img1.png",
                "../assets/images/Galaxy Book4 Ultra/img2.png",
                "16\"",
                "Windows 11 Pro",
                "16\" AMOLED de alta resolução",
                "USB-C, HDMI e Wi-Fi 6E",
                15
        ));

        dao.save(new Produto(
                "rog-zephyrus-g16",
                "ASUS ROG Zephyrus G16",
                "ASUS",
                "performance",
                "AMD Ryzen AI",
                "Alto desempenho",
                "32GB RAM",
                "1TB SSD",
                "Ryzen 9 AI HX 370",
                "Ideal para desenvolvimento, virtualização, containers e projetos de alta demanda.",
                "O ASUS ROG Zephyrus G16 entrega alto desempenho para desenvolvedores que trabalham com ambientes complexos e cargas de trabalho intensivas. Equipado com processador Ryzen 9 AI HX 370, 32GB de memória RAM e hardware preparado para multitarefa avançada, oferece excelente desempenho para virtualização, containers, inteligência artificial, compilação de grandes projetos e desenvolvimento de aplicações exigentes. Sua combinação de potência, eficiência e construção premium o torna uma excelente escolha para profissionais que precisam de desempenho sem limitações.",
                429,
                "../assets/images/Asus Rog Zephyrus G16/img1.png",
                "../assets/images/Asus Rog Zephyrus G16/img2.png",
                "16\"",
                "Windows 11 Pro",
                "16\" OLED de alta performance",
                "USB-C, HDMI e Wi-Fi 6E",
                6
        ));

        dao.save(new Produto(
                "hp-zbook-firefly-g11",
                "HP ZBook Firefly G11",
                "HP",
                "workstation",
                "Intel Xeon",
                "Workstation móvel",
                "32GB RAM",
                "1TB SSD",
                "Ryzen 9 PRO",
                "Projetado para engenharia, virtualização e aplicações profissionais de alta produtividade.",
                "O HP ZBook Firefly G11 foi desenvolvido para profissionais que precisam de mobilidade sem abrir mão da confiabilidade de uma workstation. Com 32GB de memória RAM e hardware otimizado para aplicações profissionais, oferece excelente desempenho para engenharia, virtualização, modelagem, análise de dados e ambientes corporativos exigentes. Seu design portátil facilita o trabalho remoto e a produtividade em diferentes cenários, mantendo a estabilidade necessária para projetos complexos e fluxos de trabalho profissionais.",
                369,
                "../assets/images/HP ZBook Firefly G11/img1.png",
                "../assets/images/HP ZBook Firefly G11/img2.png",
                "14\"",
                "Windows 11 Pro",
                "14\" IPS profissional",
                "USB-C, HDMI e Wi-Fi 6E",
                10
        ));

        dao.save(new Produto(
                "mac-mini-m4-pro",
                "Mac Mini M4 Pro",
                "Apple",
                "apple",
                "Apple Silicon",
                "Compacto e poderoso",
                "24GB RAM",
                "512GB SSD",
                "Apple M4 Pro",
                "Ideal para desenvolvimento iOS, backend, containers e produtividade avançada.",
                "O Mac Mini M4 Pro oferece o desempenho dos chips Apple Silicon em um formato compacto e eficiente, sendo uma excelente opção para desenvolvedores que trabalham com o ecossistema Apple. Equipado com 24GB de memória unificada e o poderoso chip M4 Pro, proporciona excelente desempenho para desenvolvimento iOS, aplicações backend, containers, automações e multitarefa avançada. Seu tamanho reduzido permite criar um ambiente de trabalho organizado sem abrir mão da potência necessária para projetos profissionais e fluxos de desenvolvimento modernos.",
                479,
                "../assets/images/Mac Mini M4 Pro/img1.png",
                "../assets/images/Mac Mini M4 Pro/img2.png",
                "Sem tela",
                "macOS Sequoia",
                "Não acompanha tela",
                "Thunderbolt 5, HDMI, Ethernet e Wi-Fi 6E",
                15
        ));

        dao.save(new Produto(
                "thinkpad-p1-gen7",
                "ThinkPad P1 Gen 7",
                "Lenovo",
                "thinkpad",
                "Intel Core Ultra",
                "Workstation Premium",
                "64GB RAM",
                "2TB SSD",
                "RTX 4070",
                "Projetado para projetos complexos, modelagem 3D, IA e desenvolvimento profissional.",
                "O ThinkPad P1 Gen 7 é uma workstation premium desenvolvida para profissionais que trabalham com projetos complexos e aplicações de alto desempenho. Equipado com 64GB de memória RAM, RTX 4070 e hardware preparado para cargas intensivas, oferece excelente desempenho para modelagem 3D, inteligência artificial, virtualização, desenvolvimento avançado e processamento de grandes volumes de dados. Sua combinação de potência, confiabilidade e mobilidade torna o equipamento ideal para profissionais que exigem alto desempenho em qualquer ambiente de trabalho.",
                529,
                "../assets/images/ThinkPad P1 Gen 7/img1.png",
                "../assets/images/ThinkPad P1 Gen 7/img2.png",
                "16\"",
                "Windows 11 Pro",
                "16\" OLED profissional",
                "USB-C, Thunderbolt 4, HDMI e Wi-Fi 6E",
                11
        ));

        dao.save(new Produto(
                "dell-precision-5690",
                "Dell Precision 5690",
                "Dell",
                "workstation",
                "Intel Core Ultra",
                "Renderização 3D",
                "64GB RAM",
                "2TB SSD",
                "RTX 4000 Ada",
                "Projetado para engenharia, renderização 3D e aplicações profissionais de alto desempenho.",
                "O Dell Precision 5690 é uma workstation profissional desenvolvida para cargas de trabalho exigentes e ambientes corporativos de alto nível. Equipado com 64GB de memória RAM, RTX 4000 Ada e hardware otimizado para aplicações avançadas, oferece excelente desempenho para engenharia, renderização 3D, modelagem, simulações, virtualização e desenvolvimento de projetos complexos. Sua combinação de potência, estabilidade e confiabilidade permite executar fluxos de trabalho intensivos com eficiência, atendendo às demandas de profissionais que precisam de desempenho consistente em tarefas críticas.",
                549,
                "../assets/images/Dell Precision 5690/img1.png",
                "../assets/images/Dell Precision 5690/img2.png",
                "16\"",
                "Windows 11 Pro",
                "16\" IPS profissional",
                "USB-C, HDMI e Wi-Fi 6E",
                10
        ));

        dao.save(new Produto(
                "asus-proart-p16",
                "ASUS ProArt P16",
                "ASUS",
                "workstation",
                "AMD Ryzen AI",
                "Criadores de Conteúdo",
                "64GB RAM",
                "2TB SSD",
                "Ryzen AI 9 HX 370",
                "Ideal para criação de conteúdo, design, edição de vídeo e aplicações com IA.",
                "O ASUS ProArt P16 foi desenvolvido para profissionais criativos que precisam de desempenho, precisão visual e recursos avançados para projetos exigentes. Equipado com 64GB de memória RAM, armazenamento de alta velocidade e processador otimizado para cargas intensivas, oferece excelente desempenho para criação de conteúdo, design gráfico, edição de vídeo, modelagem 3D e aplicações com inteligência artificial. Sua tela de alta qualidade e hardware robusto proporcionam uma experiência fluida para profissionais que trabalham com fluxos criativos e projetos de grande complexidade.",
                499,
                "../assets/images/Asus ProArt P16/img1.png",
                "../assets/images/Asus ProArt P16/img2.png",
                "16\"",
                "Windows 11 Pro",
                "16\" OLED profissional",
                "USB-C, HDMI e Wi-Fi 6E",
                7
        ));

        dao.save(new Produto(
                "hp-z2-tower-g9",
                "HP Z2 Tower G9",
                "HP",
                "workstation",
                "Intel Xeon",
                "Workstation Desktop",
                "64GB RAM",
                "2TB SSD",
                "RTX 4000 Ada",
                "Projetada para engenharia, renderização, IA e fluxos de trabalho profissionais intensivos.",
                "O HP Z2 Tower G9 é uma workstation desktop desenvolvida para profissionais que exigem máximo desempenho em projetos complexos e cargas de trabalho intensivas. Equipado com 64GB de memória RAM, RTX 4000 Ada e hardware otimizado para aplicações profissionais, oferece excelente desempenho para engenharia, renderização, inteligência artificial, simulações, análise de dados e desenvolvimento avançado. Sua arquitetura robusta garante estabilidade, escalabilidade e capacidade para executar múltiplas tarefas exigentes simultaneamente, tornando-o uma solução ideal para ambientes profissionais que demandam potência e confiabilidade.",
                599,
                "../assets/images/HP Z2 Tower G9/img1.png",
                "../assets/images/HP Z2 Tower G9/img2.png",
                "Sem tela",
                "Windows 11 Pro",
                "Não acompanha tela",
                "USB-C, HDMI, Ethernet e Wi-Fi",
                5
        ));

        dao.save(new Produto(
                "mac-studio-m4-max",
                "Mac Studio M4 Max",
                "Apple",
                "apple",
                "Apple Silicon",
                "Performance Extrema",
                "64GB RAM",
                "2TB SSD",
                "Apple M4 Max",
                "Potência de nível profissional para desenvolvimento, IA, edição de vídeo e cargas de trabalho avançadas.",
                "O Mac Studio M4 Max entrega desempenho de nível profissional para desenvolvedores, equipes técnicas e criadores que trabalham com cargas de trabalho extremamente exigentes. Equipado com 64GB de memória unificada e o poderoso chip M4 Max, oferece excelente desempenho para inteligência artificial, edição de vídeo, processamento de grandes volumes de dados, virtualização e desenvolvimento avançado. Sua arquitetura otimizada pelo Apple Silicon garante alta eficiência energética, multitarefa fluida e capacidade para executar projetos complexos com rapidez e estabilidade, tornando-o uma das soluções mais poderosas disponíveis no ecossistema Apple.",
                649,
                "../assets/images/Mac Studio M4 Max/img1.png",
                "../assets/images/Mac Studio M4 Max/img2.png",
                "Sem tela",
                "macOS Sequoia",
                "Não acompanha tela",
                "Thunderbolt, HDMI, Ethernet e Wi-Fi 6E",
                7
		));
	}
}