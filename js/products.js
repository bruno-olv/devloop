// ───────────────────────────────────────────
// CATÁLOGO DE PRODUTOS VIA BACKEND SPRING
// Os produtos agora vêm da API: http://localhost:8080/produtos
// ───────────────────────────────────────────

let products = [];

const API_URL = 'http://localhost:8080/produtos';


// ── RENDERIZAÇÃO DOS PRODUTOS ─────────────────────────────────

const renderProducts = () => {

    const productsGrid = document.getElementById('productsGrid');

    productsGrid.innerHTML = '';

    products.forEach(product => {

        productsGrid.innerHTML += `
        
        <div class="product-card reveal" data-category="${product.category}">

            <div class="card-image">

                <img src="${product.imageMain}" alt="${product.name}" class="img-main">

                <img src="${product.imageHover}" alt="${product.name}" class="img-hover">

                <span class="card-chip">${product.chip}</span>

                ${product.badge
                ? `<span class="featured-badge">${product.badge}</span>`
                : ''}

            </div>

            <div class="card-body">

                <h3 class="card-name">${product.name}</h3>

                <p class="card-category">${product.brand}</p>

                <div class="card-specs">

                    <span>${product.ram}</span>
                    <br>

                    <span>${product.storage}</span>
                    <br>

                    <span>${product.cpu}</span>

                </div>

                <p class="card-desc">
                    ${product.description}
                </p>

                <div class="card-meta">

                    <span class="status available">
                        Disponível
                    </span>

                    <span class="delivery">
                        Entrega 24h
                    </span>

                    <span class="insurance">
                        Seguro incluso
                    </span>

                </div>

            </div>

            <div class="card-footer">

                <p class="price-label">
                    A partir de
                </p>

                <div class="card-price">
                    R$ ${product.price}<span>/mês</span>
                </div>

                <div class="card-actions">

                    <a href="product-detail.html?id=${product.id}"
                        class="btn-detalhes">

                        Ver detalhes

                    </a>

                </div>

            </div>

        </div>

        `;
    });

};


// ── SCROLL REVEAL ─────────────────────────────────────────────

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);

            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });


const observeProductCards = () => {

    document
        .querySelectorAll('.product-card.reveal')
        .forEach(card => {
            revealObserver.observe(card);
        });

};


// ── FILTROS ────────────────────────────────────────────────────

const filterBtns = document.querySelectorAll('.filter-btn');

const getCards = () => {
    return document.querySelectorAll('.product-card');
};

filterBtns.forEach(btn => {

    btn.addEventListener('click', () => {

        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        getCards().forEach(card => {

            const match =
                filter === 'all' ||
                card.dataset.category === filter;

            card.style.display = match ? '' : 'none';

        });

        setTimeout(() => {
            checkEmpty();
        }, 10);

    });

});


// ── BUSCA ──────────────────────────────────────────────────────

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {

    const query = searchInput.value.toLowerCase().trim();

    filterBtns.forEach(btn =>
        btn.classList.remove('active')
    );

    document
        .querySelector('[data-filter="all"]')
        .classList.add('active');

    getCards().forEach(card => {

        const text = card.innerText.toLowerCase();

        const match = text.includes(query);

        card.style.display = match ? '' : 'none';

    });

    setTimeout(() => {
        checkEmpty();
    }, 10);

});


// ── CONTADOR DE RESULTADOS ─────────────────────────────────────

const resultsCount = document.getElementById('resultsCount');

const updateResultsCount = () => {

    const visibleCards = [...getCards()].filter(card => {
        return window.getComputedStyle(card).display !== 'none';
    });

    const count = visibleCards.length;

    resultsCount.textContent =
        `${count} equipamento${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;

};


// ── ESTADO VAZIO ───────────────────────────────────────────────

const checkEmpty = () => {

    const emptyState = document.getElementById('emptyState');

    const visibleCards = [...getCards()].filter(card => {
        return window.getComputedStyle(card).display !== 'none';
    });

    if (emptyState) {

        emptyState.style.display =
            visibleCards.length === 0
                ? 'block'
                : 'none';

    }

    updateResultsCount();

};


// ── CARREGAR PRODUTOS DO BACKEND ───────────────────────────────

const loadProductsFromBackend = async () => {

    const productsGrid = document.getElementById('productsGrid');

    try {

        const response = await fetch(API_URL);

        products = await response.json();

        renderProducts();

        observeProductCards();

        updateResultsCount();

    } catch (error) {

        console.error('Erro ao carregar produtos:', error);

        productsGrid.innerHTML = `
            <p class="empty-message">
                Não foi possível carregar os produtos. Verifique se o servidor Spring Boot está rodando.
            </p>
        `;

        resultsCount.textContent = '0 equipamentos encontrados';

    }

};


// ── INICIALIZAÇÃO ──────────────────────────────────────────────

loadProductsFromBackend();