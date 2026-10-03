// Painel simples de produtos, integrado ao CRUD do backend.
(function () {
    if (localStorage.getItem('role') !== 'ROLE_ADMIN' || !localStorage.getItem('id')) {
        window.location.replace('login.html');
        return;
    }

    const API_PRODUTOS = 'http://localhost:8080/produtos';
    const form = document.getElementById('produtoForm');
    const formSection = document.getElementById('formSection');
    const titulo = document.getElementById('formTitulo');
    const mensagem = document.getElementById('mensagem');
    const lista = document.getElementById('listaProdutos');
    const total = document.getElementById('totalProdutos');
    const novoButton = document.getElementById('novoProduto');
    const atualizarButton = document.getElementById('atualizarProdutos');
    const salvarButton = document.getElementById('salvarProduto');
    const categorias = {
        apple: 'Apple',
        thinkpad: 'ThinkPad',
        performance: 'Performance',
        workstation: 'Workstation'
    };

    let produtos = [];
    let produtoEmEdicao = null;
    let emOperacao = false;

    function mostrarMensagem(texto, tipo = 'error') {
        mensagem.textContent = texto;
        mensagem.className = `admin-message ${tipo}`;
        mensagem.hidden = false;
        mensagem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function definirOcupado(ocupado) {
        emOperacao = ocupado;
        document.getElementById('produtoCampos').disabled = ocupado;
        novoButton.disabled = ocupado;
        atualizarButton.disabled = ocupado;
        lista.querySelectorAll('button').forEach(button => {
            button.disabled = ocupado;
        });
    }

    function mostrarLinhaVazia(texto) {
        const linha = document.createElement('tr');
        const celula = document.createElement('td');
        celula.colSpan = 5;
        celula.className = 'admin-empty';
        celula.textContent = texto;
        linha.appendChild(celula);
        lista.replaceChildren(linha);
    }

    function renderizarProdutos() {
        lista.replaceChildren();
        total.textContent = `${produtos.length} produto${produtos.length === 1 ? '' : 's'}`;

        if (produtos.length === 0) {
            mostrarLinhaVazia('Nenhum produto cadastrado. Clique em Novo produto para começar.');
            return;
        }

        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            const nome = document.createElement('td');
            const marca = document.createElement('small');
            nome.textContent = produto.name;
            marca.textContent = produto.brand;
            nome.appendChild(marca);
            linha.appendChild(nome);

            const valores = [
                categorias[produto.category] || produto.category,
                Number(produto.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
                produto.quantidadeEstoque ?? 0
            ];
            valores.forEach(valor => {
                const celula = document.createElement('td');
                celula.textContent = valor;
                linha.appendChild(celula);
            });

            const acoes = document.createElement('td');
            const botoes = document.createElement('div');
            botoes.className = 'admin-row-actions';
            ['Editar', 'Excluir'].forEach(acao => {
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = acao;
                button.className = `admin-button${acao === 'Excluir' ? ' danger' : ''}`;
                button.setAttribute('aria-label', `${acao} ${produto.name}`);
                button.disabled = emOperacao;
                button.addEventListener('click', () => {
                    if (emOperacao) return;
                    if (acao === 'Editar') abrirFormulario(produto);
                    else excluirProduto(produto);
                });
                botoes.appendChild(button);
            });
            acoes.appendChild(botoes);
            linha.appendChild(acoes);
            lista.appendChild(linha);
        });
    }

    async function buscarProdutos() {
        const resposta = await fetch(API_PRODUTOS);
        if (!resposta.ok) throw new Error('Não foi possível carregar os produtos. Tente atualizar a lista.');
        const dados = await resposta.json();
        if (!Array.isArray(dados)) throw new Error('A API não retornou uma lista de produtos válida.');
        return dados;
    }

    async function carregarProdutos() {
        produtos = await buscarProdutos();
        renderizarProdutos();
    }

    async function atualizarLista() {
        if (emOperacao) return;
        definirOcupado(true);
        mensagem.hidden = true;
        total.textContent = 'Carregando produtos...';
        try {
            await carregarProdutos();
        } catch (erro) {
            total.textContent = 'Lista indisponível. Tente atualizar novamente.';
            mostrarLinhaVazia('Não foi possível carregar os produtos.');
            mostrarMensagem('Não foi possível carregar os produtos. Confira se o backend está rodando em localhost:8080.');
        } finally {
            definirOcupado(false);
        }
    }

    function abrirFormulario(produto = null) {
        form.reset();
        produtoEmEdicao = produto;
        titulo.textContent = produto ? 'Editar produto' : 'Cadastrar produto';
        document.getElementById('detalhesExtras').open = false;
        document.getElementById('produtoId').readOnly = Boolean(produto);

        if (produto) {
            Object.keys(produto).forEach(campo => {
                const input = form.elements.namedItem(campo);
                if (input) input.value = produto[campo] ?? '';
            });
        }

        mensagem.hidden = true;
        formSection.hidden = false;
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.getElementById(produto ? 'produtoNome' : 'produtoId').focus({ preventScroll: true });
    }

    function fecharFormulario() {
        form.reset();
        produtoEmEdicao = null;
        document.getElementById('produtoId').readOnly = false;
        formSection.hidden = true;
        novoButton.focus();
    }

    // Atualizar a tabela pode falhar mesmo depois de a API salvar ou excluir.
    async function atualizarAposAlteracao(textoSucesso) {
        mostrarMensagem(textoSucesso, 'success');
        try {
            await carregarProdutos();
        } catch (erro) {
            mostrarLinhaVazia('Atualize a lista para consultar os produtos.');
            total.textContent = 'Atualização pendente';
            mostrarMensagem(`${textoSucesso} Não foi possível atualizar a tabela. Clique em Atualizar lista.`);
        }
    }

    form.addEventListener('submit', async event => {
        event.preventDefault();
        if (emOperacao || !form.reportValidity()) return;

        const campos = Object.fromEntries(new FormData(form));
        Object.keys(campos).forEach(campo => { campos[campo] = campos[campo].trim(); });
        campos.price = Number(campos.price);
        campos.quantidadeEstoque = Number(campos.quantidadeEstoque);

        const obrigatorios = ['id', 'name', 'brand', 'category', 'ram', 'storage', 'cpu', 'description', 'imageMain'];
        if (obrigatorios.some(campo => !campos[campo])) {
            mostrarMensagem('Preencha os campos obrigatórios com valores válidos.');
            return;
        }
        if (![campos.price, campos.quantidadeEstoque].every(valor => Number.isInteger(valor) && valor >= 0 && valor <= 2147483647)) {
            mostrarMensagem('Preço e estoque devem ser números inteiros a partir de zero.');
            return;
        }

        const editando = produtoEmEdicao !== null;
        const produto = { ...(produtoEmEdicao || {}), ...campos };
        produto.fullDescription = campos.fullDescription || campos.description;
        produto.imageHover = campos.imageHover || campos.imageMain;
        if (editando) produto.id = produtoEmEdicao.id;

        definirOcupado(true);
        salvarButton.textContent = 'Salvando...';
        try {
            // O POST atual também atualiza IDs existentes; evite sobrescrever um cadastro.
            if (!editando) {
                const existentes = await buscarProdutos();
                if (existentes.some(item => item.id === produto.id)) {
                    throw new Error('Já existe um produto com esse identificador. Escolha outro ou edite o produto existente.');
                }
            }

            const url = editando ? `${API_PRODUTOS}/${encodeURIComponent(produto.id)}` : API_PRODUTOS;
            const resposta = await fetch(url, {
                method: editando ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(produto)
            });
            if (!resposta.ok) throw new Error('Não foi possível salvar o produto. Confira os dados e tente novamente.');
            const salvo = await resposta.json().catch(() => null);
            if (!salvo || salvo.id !== produto.id) {
                throw new Error('O produto não foi confirmado pela API. Atualize a lista antes de tentar novamente.');
            }

            fecharFormulario();
            await atualizarAposAlteracao(editando ? 'Produto atualizado com sucesso.' : 'Produto cadastrado com sucesso.');
        } catch (erro) {
            mostrarMensagem(erro instanceof TypeError
                ? 'Não foi possível conectar ao backend. Confira se ele está rodando em localhost:8080.'
                : erro.message);
        } finally {
            definirOcupado(false);
            salvarButton.textContent = 'Salvar produto';
        }
    });

    async function excluirProduto(produto) {
        if (!confirm(`Excluir "${produto.name}"? Essa ação remove o produto do catálogo.`)) return;
        definirOcupado(true);
        try {
            const resposta = await fetch(`${API_PRODUTOS}/${encodeURIComponent(produto.id)}`, { method: 'DELETE' });
            if (!resposta.ok) {
                throw new Error('Não foi possível excluir o produto. Ele pode estar vinculado a um pedido.');
            }
            // O DELETE não retorna JSON.
            if (produtoEmEdicao && produtoEmEdicao.id === produto.id) fecharFormulario();
            await atualizarAposAlteracao('Produto excluído com sucesso.');
        } catch (erro) {
            mostrarMensagem(erro instanceof TypeError
                ? 'Não foi possível conectar ao backend. Tente novamente.'
                : erro.message);
        } finally {
            definirOcupado(false);
        }
    }

    novoButton.addEventListener('click', () => abrirFormulario());
    document.getElementById('cancelarEdicao').addEventListener('click', fecharFormulario);
    atualizarButton.addEventListener('click', atualizarLista);
    atualizarLista();
})();
