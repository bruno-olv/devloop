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

const CART_KEY = 'devloopCart'

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

function ready() {
  renderCart()

  const purchaseButton = document.querySelector('.purchase-button')
  if (purchaseButton) {
    purchaseButton.addEventListener('click', makePurchase)
  }

  const clearButton = document.getElementById('btn-limpar')
  if (clearButton) {
    clearButton.addEventListener('click', clearCart)
  }
}

// Lê o carrinho salvo no localStorage
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || []
}

// Salva o carrinho no localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
}

// Formata número pra "R$ 1.500,00"
function formatPrice(value) {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

// Renderiza a tabela inteira + resumo, a partir do localStorage
function renderCart() {
  const cart = getCart()
  const tableBody = document.querySelector('.cart-table tbody')
  const resumo = document.getElementById('resumo')
  const badge = document.getElementById('badge-inline')

  tableBody.innerHTML = ''

  cart.forEach((product, index) => {
    const row = document.createElement('tr')
    row.classList.add('cart-product')

    row.innerHTML = `
      <td class="product-identification">
        <img src="${product.image}" alt="${product.name}" class="cart-product-image">
        <strong class="cart-product-title">${product.name}</strong>
      </td>
      <td>
        <span class="cart-product-price">${formatPrice(product.price)}</span>
      </td>
      <td>
        <input type="number" value="${product.quantity}" min="1" class="product-qtd-input" data-index="${index}">
        <button type="button" class="remove-product-button" data-index="${index}">Remover</button>
      </td>
    `

    tableBody.appendChild(row)
  })

  // Liga os eventos das linhas recém-criadas
  tableBody.querySelectorAll('.remove-product-button').forEach(button => {
    button.addEventListener('click', removeProduct)
  })

  tableBody.querySelectorAll('.product-qtd-input').forEach(input => {
    input.addEventListener('change', changeQuantity)
  })

  // Mostra/esconde o resumo e o badge dependendo se o carrinho tem itens
  if (resumo) {
    resumo.hidden = cart.length === 0
  }

  if (badge) {
    if (cart.length > 0) {
      badge.hidden = false
      badge.textContent = cart.length
    } else {
      badge.hidden = true
    }
  }

  updateTotal(cart)
}

function removeProduct(event) {
  const index = Number(event.target.dataset.index)
  const cart = getCart()

  cart.splice(index, 1)
  saveCart(cart)
  renderCart()
}

function changeQuantity(event) {
  const index = Number(event.target.dataset.index)
  const newQuantity = Number(event.target.value)
  const cart = getCart()

  if (newQuantity <= 0) {
    cart.splice(index, 1)
  } else {
    cart[index].quantity = newQuantity
  }

  saveCart(cart)
  renderCart()
}

function updateTotal(cart) {
  const total = cart.reduce((sum, product) => {
    return sum + product.price * product.quantity
  }, 0)

  const subtotalEl = document.getElementById('subtotal')
  const totalEl = document.getElementById('total')

  if (subtotalEl) subtotalEl.textContent = formatPrice(total)
  if (totalEl) totalEl.textContent = formatPrice(total)
}

function makePurchase() {
  const cart = getCart()

  if (cart.length === 0) {
    alert('Seu carrinho está vazio!')
    return
  }

  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0)

  alert(
    `Obrigado pela sua compra!\nValor do pedido: ${formatPrice(total)}\n\nVolte sempre :)`
  )

  saveCart([])
  renderCart()
}

function clearCart() {
  saveCart([])
  renderCart()
}
