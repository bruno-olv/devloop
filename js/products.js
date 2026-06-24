// ── SCROLL REVEAL ─────────────────────────────────────────────
// Quando um card entra na tela, adiciona a classe .visible
// Isso faz o card aparecer suavemente (opacity 0 → 1, translateY)

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Delay escalonado: cada card aparece 80ms depois do anterior
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            revealObserver.unobserve(entry.target); // para de observar depois de revelar
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.product-card.reveal').forEach(card => {
    revealObserver.observe(card);
});


// ── FILTROS ────────────────────────────────────────────────────
// Ao clicar num filtro, esconde os cards que não pertencem
// àquela categoria

const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {

        // Marca o botão clicado como ativo
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter; // "all", "macbook", etc.

        cards.forEach(card => {
            const match = filter === 'all' || card.dataset.category === filter;
            // Esconde ou mostra com transição suave
            card.style.transition = 'opacity 0.25s, transform 0.25s';
            card.style.opacity = match ? '1' : '0';
            card.style.transform = match ? 'translateY(0)' : 'translateY(8px)';
            card.style.pointerEvents = match ? 'auto' : 'none';

            // Remove do fluxo depois da transição
            setTimeout(() => {
                card.style.display = match ? '' : 'none';
            }, match ? 0 : 250);
        });

        checkEmpty();
    });
});


// ── BUSCA ──────────────────────────────────────────────────────
// Filtra os cards em tempo real conforme o usuário digita

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase().trim();

    // Reseta os filtros de categoria quando o usuário usa a busca
    filterBtns.forEach(b => b.classList.remove('active'));
    document.querySelector('[data-filter="all"]').classList.add('active');

    cards.forEach(card => {
        // Pega o texto visível do card pra comparar
        const text = card.innerText.toLowerCase();
        const match = text.includes(query);

        card.style.display = match ? '' : 'none';
        card.style.opacity = match ? '1' : '0';
        card.style.transform = match ? 'translateY(0)' : 'translateY(8px)';
        card.style.pointerEvents = match ? 'auto' : 'none';
    });

    checkEmpty();
});


// ── ESTADO VAZIO ───────────────────────────────────────────────
// Mostra uma mensagem quando nenhum card está visível

function checkEmpty() {
    const emptyState = document.getElementById('emptyState');
    const visibleCards = [...cards].filter(c => c.style.display !== 'none');
    emptyState.style.display = visibleCards.length === 0 ? 'block' : 'none';
}