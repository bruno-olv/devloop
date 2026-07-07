// ── PAGAMENTO (checkout.html) ───────────────────────────────
// Usa as funções pegarCarrinho / salvarCarrinho / formatarPreco do cart.js

document.addEventListener("DOMContentLoaded", function () {
    const listaItens = document.getElementById("checkout-itens");
    if (!listaItens) return; // não estamos na página de pagamento

    const carrinho = pegarCarrinho();

    if (carrinho.length === 0) {
        window.location.href = "cart.html";
        return;
    }

    renderizarResumoCheckout(carrinho);
    gerarCodigoPix();
    configurarAbas();
    configurarPix();
    configurarFormularioCartao();
});

function renderizarResumoCheckout(carrinho) {
    const lista = document.getElementById("checkout-itens");
    let total = 0;
    let html = "";

    carrinho.forEach((item) => {
        const subtotalItem = item.preco * item.qtd;
        total += subtotalItem;

        html += `
            <div class="item-carrinho">
                <img src="${item.imagem}" alt="${item.nome}" style="width:48px;height:48px;object-fit:cover;border-radius:8px;">
                <div class="item-info">
                    <div class="item-nome">${item.nome} <span style="color:#64748b;">x${item.qtd}</span></div>
                    <div class="item-subtotal">${formatarPreco(subtotalItem)}</div>
                </div>
            </div>
        `;
    });

    lista.innerHTML = html;
    document.getElementById("checkout-subtotal").textContent = formatarPreco(total);
    document.getElementById("checkout-total").textContent = formatarPreco(total);

    montarParcelas(total);
}

// Parcelamento simples: até 12x sem juros, parcela mínima de R$ 20
function montarParcelas(total) {
    const select = document.getElementById("parcelas");
    const maxParcelas = Math.max(1, Math.min(12, Math.floor(total / 20)));

    let opcoes = "";
    for (let i = 1; i <= maxParcelas; i++) {
        opcoes += `<option value="${i}">${i}x de ${formatarPreco(total / i)} sem juros</option>`;
    }
    select.innerHTML = opcoes;
}

// Gera um código Pix "copia e cola" fictício, só para efeito visual
function gerarCodigoPix() {
    const aleatorio = Math.random().toString(36).slice(2, 12).toUpperCase();
    const codigo =
        "00020126580014BR.GOV.BCB.PIX0136" + aleatorio +
        "5204000053039865802BR5913DEVLOOP LTDA6009SAO PAULO6304" +
        Math.floor(1000 + Math.random() * 9000);

    document.getElementById("pixCodigo").value = codigo;
}

function configurarAbas() {
    const abas = document.querySelectorAll(".payment-tab");
    abas.forEach((aba) => {
        aba.addEventListener("click", () => {
            abas.forEach((a) => a.classList.remove("active"));
            aba.classList.add("active");

            document.getElementById("painel-pix").hidden = aba.dataset.metodo !== "pix";
            document.getElementById("painel-cartao").hidden = aba.dataset.metodo !== "cartao";
        });
    });
}

function configurarPix() {
    document.getElementById("btnCopiarPix").addEventListener("click", function () {
        const input = document.getElementById("pixCodigo");
        input.select();
        navigator.clipboard.writeText(input.value);

        this.textContent = "Copiado!";
        setTimeout(() => (this.textContent = "Copiar"), 1500);
    });

    document.getElementById("btnConfirmarPix").addEventListener("click", function () {
        finalizarPagamento("Recebemos a confirmação do seu Pix. Obrigado por escolher a DevLoop!");
    });
}

function configurarFormularioCartao() {
    const numero = document.getElementById("numeroCartao");
    const validade = document.getElementById("validadeCartao");
    const cvv = document.getElementById("cvvCartao");
    const erro = document.getElementById("erroCartao");

    numero.addEventListener("input", () => {
        numero.value = numero.value
            .replace(/\D/g, "")
            .slice(0, 16)
            .replace(/(.{4})/g, "$1 ")
            .trim();
    });

    validade.addEventListener("input", () => {
        let valor = validade.value.replace(/\D/g, "").slice(0, 4);
        if (valor.length > 2) valor = valor.slice(0, 2) + "/" + valor.slice(2);
        validade.value = valor;
    });

    cvv.addEventListener("input", () => {
        cvv.value = cvv.value.replace(/\D/g, "").slice(0, 4);
    });

    document.getElementById("formCartao").addEventListener("submit", function (e) {
        e.preventDefault();
        erro.textContent = "";

        const numeroLimpo = numero.value.replace(/\s/g, "");
        const nome = document.getElementById("nomeCartao").value.trim();

        if (numeroLimpo.length < 13) {
            erro.textContent = "Número do cartão inválido.";
            return;
        }
        if (nome.length < 3) {
            erro.textContent = "Informe o nome impresso no cartão.";
            return;
        }
        if (!/^\d{2}\/\d{2}$/.test(validade.value)) {
            erro.textContent = "Validade inválida. Use o formato MM/AA.";
            return;
        }
        if (cvv.value.length < 3) {
            erro.textContent = "CVV inválido.";
            return;
        }

        const botao = e.target.querySelector(".btn-pagar");
        botao.disabled = true;
        botao.textContent = "Processando...";

        setTimeout(() => {
            finalizarPagamento("Seu cartão foi aprovado. Obrigado por escolher a DevLoop!");
        }, 1200);
    });
}

function finalizarPagamento(mensagem) {
    document.getElementById("checkoutLayout").hidden = true;
    document.getElementById("sucessoMsg").textContent = mensagem;
    document.getElementById("sucessoPagamento").hidden = false;

    salvarCarrinho([]); // esvazia o carrinho e atualiza o badge do menu
}
