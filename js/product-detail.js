// ── BUSCA O PRODUTO PELA URL ─────────────────────────────

const products = window.products;

const params = new URLSearchParams(window.location.search);

const productId = params.get('id');

// Se o produto não for encontrado, mostra uma mensagem simples
const currentProduct = products.find(product => product.id === productId);

if (!currentProduct) {
    document.body.innerHTML = `
        <main class="not-found-page">
            <section class="not-found-card">
                <span class="not-found-code">404</span>

                <h1>Produto não encontrado</h1>

                <p>
                    O equipamento que você tentou acessar não existe, foi removido
                    ou o link informado está incorreto.
                </p>

                <div class="not-found-actions">
                    <a href="products.html" class="not-found-btn primary">
                        Ver produtos
                    </a>

                    <a href="../index.html" class="not-found-btn secondary">
                        Voltar para Home
                    </a>
                </div>
            </section>
        </main>
    `;

    throw new Error('Produto não encontrado');
}

document.title = `${currentProduct.name} | DevLoop`;


// ── PREENCHIMENTO DAS INFORMAÇÕES DO PRODUTO ─────────────────

document.getElementById('breadcrumbProductName').textContent =
    currentProduct.name;

document.getElementById('productChip').textContent =
    currentProduct.chip;

document.getElementById('productBadge').textContent =
    currentProduct.badge;

document.getElementById('productBrand').textContent =
    currentProduct.brand;

document.getElementById('productName').textContent =
    currentProduct.name;

document.getElementById('productDescription').textContent =
    currentProduct.description;

document.getElementById('productPrice').textContent =
    `R$ ${currentProduct.price}`;


// ── SPECS RÁPIDAS ─────────────────────

const quickRam = currentProduct.ram.replace('RAM', '').trim();
const quickStorage = currentProduct.storage.replace('SSD', '').trim();

document.getElementById('quickRam').textContent = quickRam;
document.getElementById('quickStorage').textContent = quickStorage;
document.getElementById('quickCpu').textContent = currentProduct.cpu;
document.getElementById('quickDisplay').textContent = currentProduct.display;


// ── ESPECIFICAÇÕES TÉCNICAS ─────────────────────

const technicalSpecsGrid = document.getElementById('technicalSpecsGrid');

const technicalSpecs = [
    {
        title: 'Memória',
        value: currentProduct.ram
    },
    {
        title: 'Armazenamento',
        value: currentProduct.storage
    },
    {
        title: 'Processador',
        value: currentProduct.cpu
    },
    {
        title: 'Sistema Operacional',
        value: currentProduct.os
    },
    {
        title: 'Tela',
        value: currentProduct.displayDetail
    },
    {
        title: 'Conectividade',
        value: currentProduct.connectivity
    }
];

technicalSpecsGrid.innerHTML = '';

technicalSpecs.forEach(spec => {

    technicalSpecsGrid.innerHTML += `
        <div class="spec-item">
            <span class="spec-key">${spec.title}</span>
            <span class="spec-val">${spec.value}</span>
        </div>
    `;

});


// ── IDEAL PARA ─────────────────────

const idealForList = document.getElementById('idealForList');

let idealFor = [];

if (currentProduct.brand === 'Apple') {

    idealFor = [
        'Desenvolvimento iOS',
        'Desenvolvimento Web',
        'Docker & Containers',
        'Edição de vídeo',
        'Projetos profissionais'
    ];

} else if (currentProduct.name.includes('ProArt')) {

    idealFor = [
        'Criação de conteúdo',
        'Design gráfico',
        'Edição de vídeo',
        'Aplicações com IA',
        'Projetos criativos'
    ];

} else if (currentProduct.category === 'thinkpad') {

    idealFor = [
        'Desenvolvimento Web',
        'Backend',
        'Ambientes Linux',
        'Produtividade profissional',
        'Projetos acadêmicos'
    ];

} else if (currentProduct.category === 'performance') {

    idealFor = [
        'Desenvolvimento Full Stack',
        'Virtualização',
        'Docker & Containers',
        'Multitarefa avançada',
        'Projetos de alta demanda'
    ];

} else if (currentProduct.category === 'workstation') {

    idealFor = [
        'Engenharia',
        'Modelagem 3D',
        'Renderização',
        'Inteligência Artificial',
        'Aplicações profissionais'
    ];

}

idealForList.innerHTML = '';

idealFor.forEach(item => {

    idealForList.innerHTML += `
        <div class="check-item">
            <span class="check-icon">✓</span>${item}
        </div>
    `;

});


// ── PRODUTOS RELACIONADOS ─────────────────────

const relatedProductsGrid = document.getElementById('relatedProductsGrid');

// Primeiro tenta pegar produtos da mesma categoria
let relatedProducts = products.filter(product => {
    return product.category === currentProduct.category &&
        product.id !== currentProduct.id;
});

// Se tiver menos de 3, completa com outros produtos do catálogo
if (relatedProducts.length < 3) {

    const otherProducts = products.filter(product => {
        return product.category !== currentProduct.category &&
            product.id !== currentProduct.id;
    });

    relatedProducts = relatedProducts.concat(otherProducts);
}

// Limita para mostrar apenas 3 produtos
relatedProducts = relatedProducts.slice(0, 3);

relatedProductsGrid.innerHTML = '';

relatedProducts.forEach(product => {

    relatedProductsGrid.innerHTML += `
        <div class="product-card">
            <div class="card-image">
                <img 
                    src="${product.imageMain}" 
                    alt="${product.name}"
                    onerror="this.style.opacity='.2'">
                <span class="card-chip">${product.chip}</span>
            </div>

            <div class="card-body">
                <p class="card-category">${product.brand}</p>
                <h3 class="card-name">${product.name}</h3>
                <p class="card-specs">${product.ram} · ${product.storage} · ${product.cpu}</p>
            </div>

            <div class="card-footer">
                <span class="card-price">R$ ${product.price}<span>/mês</span></span>
                <a href="product-detail.html?id=${product.id}" class="btn-ver">Ver detalhes</a>
            </div>
        </div>
    `;

});


// ── IMAGENS DO PRODUTO ─────────────────────

const mainImage = document.getElementById('mainImage');
const productThumbs = document.getElementById('productThumbs');

const productFolder = currentProduct.imageMain.replace('/img1.png', '');

const productImages = [
    `${productFolder}/img1.png`,
    `${productFolder}/img2.png`,
    `${productFolder}/img3.png`,
    `${productFolder}/img4.png`,
    `${productFolder}/img5.png`
];

mainImage.src = productImages[0];
mainImage.alt = currentProduct.name;

productThumbs.innerHTML = '';

productImages.forEach((image, index) => {

    productThumbs.innerHTML += `
        <img 
            class="thumb ${index === 0 ? 'active' : ''}" 
            src="${image}" 
            alt="${currentProduct.name}">
    `;

});


// ── GALERIA DE IMAGENS ─────────────────────
// Ao clicar em uma miniatura, ela vira a imagem principal

const thumbs = document.querySelectorAll('.thumb');

thumbs.forEach(thumb => {

    thumb.addEventListener('click', () => {

        mainImage.src = thumb.src;

        thumbs.forEach(t => {
            t.classList.remove('active');
        });

        thumb.classList.add('active');

    });

});


// ── ADICIONAR AO CARRINHO ─────────────────────

const addToCartBtn = document.getElementById('addToCartBtn');

addToCartBtn.addEventListener('click', () => {

    const cart = JSON.parse(localStorage.getItem('devloopCart')) || [];

    const productAlreadyInCart = cart.find(item => item.id === currentProduct.id);

    if (productAlreadyInCart) {
        productAlreadyInCart.quantity += 1;
    } else {
        cart.push({
            id: currentProduct.id,
            name: currentProduct.name,
            brand: currentProduct.brand,
            price: currentProduct.price,
            image: currentProduct.imageMain,
            ram: currentProduct.ram,
            storage: currentProduct.storage,
            cpu: currentProduct.cpu,
            quantity: 1
        });
    }

    localStorage.setItem('devloopCart', JSON.stringify(cart));

    addToCartBtn.textContent = 'Adicionado ao carrinho ✓';

    setTimeout(() => {
        addToCartBtn.textContent = 'Adicionar ao carrinho';
    }, 1800);

});