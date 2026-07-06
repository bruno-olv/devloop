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

// ── CARRINHO DE COMPRAS ─────────────────────────────
// Chave usada para salvar/ler o carrinho no localStorage
const CART_KEY = 'devloopCart'

// Garante que o script só rode depois que o HTML da página estiver totalmente carregado 
// (evita erros de elementos ainda não existentes)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

// monta a tabela do carrinho assim que a página abre
function ready() {
  renderCart()

   // Liga o botão "Finalizar Compra" à função de compra
  const purchaseButton = document.querySelector('.purchase-button')
  if (purchaseButton) {
    purchaseButton.addEventListener('click', makePurchase)
  }

  // Liga o botão "Limpar carrinho" à função de limpeza
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

// Formata número pra "R$ 1.234,56"
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

// Remove um item do carrinho a partir do botão clicado
function removeProduct(event) {
  const index = Number(event.target.dataset.index)
  const cart = getCart()

  cart.splice(index, 1)
  saveCart(cart)
  renderCart()
}

// Atualiza a quantidade de um produto
function changeQuantity(event) {
  const index = Number(event.target.dataset.index)
  const newQuantity = Number(event.target.value)
  const cart = getCart()

  if (newQuantity <= 0) { // Se a quantidade for zero ou negativa, remove o produto
    cart.splice(index, 1)
  } else {
    cart[index].quantity = newQuantity
  }

  saveCart(cart)
  renderCart()
}

// Recalcula o valor total do carrinho e atualiza o subtotal/total na tela
function updateTotal(cart) {
  const total = cart.reduce((sum, product) => {
    return sum + product.price * product.quantity
  }, 0)

  const subtotalEl = document.getElementById('subtotal')
  const totalEl = document.getElementById('total')

  // Verifica se os elementos existem antes de atualizar (evita erros)
  if (subtotalEl) subtotalEl.textContent = formatPrice(total)
  if (totalEl) totalEl.textContent = formatPrice(total)
}

// Executa a "compra": valida o carrinho, mostra o valor total e o esvazia
function makePurchase() {
  const cart = getCart()

  // Valida se o carrinho está vazio antes de prosseguir
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!')
    return
  }

  const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0)

  alert(
    `Obrigado pela sua compra!\nValor do pedido: ${formatPrice(total)}\n\nVolte sempre :)`
  )

  saveCart([]) // esvazia o carrinho após a compra
  renderCart()
}

// Remove todos os produtos do carrinho manualmente (botão "Limpar carrinho")
function clearCart() {
  saveCart([])
  renderCart()
}
