// ── PRODUTOS EM DESTAQUE NA HOME ─────────────────────
// Busca alguns produtos no backend e mostra na seção "Disponíveis agora".

document.addEventListener('DOMContentLoaded', () => {

    console.log('home.js carregado');

    const HOME_API_URL = 'http://localhost:8080/produtos';

    const homeProductsGrid = document.getElementById('homeProductsGrid');

    // Produtos escolhidos para aparecer na Home
    const featuredProductIds = [
        'macbook-m4-pro',
        'thinkpad-x1-carbon-gen12',
        'dell-xps-15',
        'mac-mini-m4-pro'
    ];

    const loadHomeProducts = async () => {

        // Se essa grid não existir, o código para aqui
        if (!homeProductsGrid) {
            console.error('Grid de produtos da Home não encontrada.');
            return;
        }

        try {

            // Busca todos os produtos no backend Spring Boot
            const response = await fetch(HOME_API_URL);

            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }

            const products = await response.json();

            console.log('Produtos recebidos do backend:', products.length);

            // Filtra apenas os produtos escolhidos para destaque
            const featuredProducts = products.filter(product => {
                return featuredProductIds.includes(product.id);
            });

            console.log('Produtos em destaque:', featuredProducts.length);

            homeProductsGrid.innerHTML = '';

            featuredProducts.forEach(product => {

                // A Home está fora da pasta pages, então o caminho da imagem muda
                const imagePath = product.imageMain.replace('../assets', 'assets');

                // Limpa RAM e SSD para não ficar texto repetido
                const cleanRam = product.ram.replace('RAM', '').trim();
                const cleanStorage = product.storage.replace('SSD', '').trim();

                homeProductsGrid.innerHTML += `
                    <div class="product-card visible">
                        <div class="card-image">
                            <img src="${imagePath}" alt="${product.name}" class="card-img">
                            <span class="card-chip">${product.chip}</span>
                        </div>

                        <div class="card-body">
                            <p class="card-name">${product.name}</p>

                            <p class="card-specs">
                                ${product.cpu} · ${cleanRam} RAM · ${cleanStorage} SSD
                                <br>
                                ${product.displayDetail}
                            </p>

                            <div class="card-footer">
                                <p class="card-price">
                                    R$ ${product.price}<span>/mês</span>
                                </p>

                                <div class="card-actions">
                                    <a href="pages/product-detail.html?id=${product.id}" class="btn-detalhes">
                                        Detalhes
                                    </a>

                                    <button class="btn-add-cart" type="button" data-id="${product.id}">
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            });


            // Adiciona evento nos botões de carrinho dos cards da Home
            document.querySelectorAll('.btn-add-cart').forEach(button => {

                button.addEventListener('click', () => {

                    const productId = button.dataset.id;

                    const selectedProduct = products.find(product => {
                        return product.id === productId;
                    });

                    if (!selectedProduct) return;

                    const cart = JSON.parse(localStorage.getItem('devloopCart')) || [];

                    const productAlreadyInCart = cart.find(item => {
                        return item.id === selectedProduct.id;
                    });

                    if (productAlreadyInCart) {
                        productAlreadyInCart.quantity += 1;
                    } else {
                        cart.push({
                            id: selectedProduct.id,
                            name: selectedProduct.name,
                            brand: selectedProduct.brand,
                            price: selectedProduct.price,
                            image: selectedProduct.imageMain,
                            ram: selectedProduct.ram,
                            storage: selectedProduct.storage,
                            cpu: selectedProduct.cpu,
                            quantity: 1
                        });
                    }

                    localStorage.setItem('devloopCart', JSON.stringify(cart));

                    if (window.updateNavCartBadge) {
                        window.updateNavCartBadge();
                    }

                    button.textContent = 'Adicionado ✓';

                    setTimeout(() => {
                        button.textContent = 'Adicionar';
                    }, 1600);

                });

            });

        } catch (error) {

            console.error('Erro ao carregar produtos da Home:', error);

            homeProductsGrid.innerHTML = `
                <p class="empty-message">
                    Não foi possível carregar os produtos em destaque.
                </p>
            `;

        }

    };

    loadHomeProducts();

});