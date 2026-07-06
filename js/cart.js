// ── BADGE DO CARRINHO NA NAV ─────────────────────

(function () {

    function getCartCount() {
        try {
            var cart = JSON.parse(localStorage.getItem('devloopCart')) || [];
            return cart.reduce(function (total, item) {
                return total + (item.quantity || 1);
            }, 0);
        } catch (e) {
            return 0;
        }
    }

    function updateNavCartBadge() {
        var badge = document.getElementById('navCartBadge');
        if (!badge) return;
        var count = getCartCount();
        badge.textContent = count > 99 ? '99+' : count;
        badge.hidden = count === 0;
    }

    document.addEventListener('DOMContentLoaded', updateNavCartBadge);
    window.addEventListener('storage', updateNavCartBadge);
    window.updateNavCartBadge = updateNavCartBadge;
})();
