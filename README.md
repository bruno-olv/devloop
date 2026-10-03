# DevLoop

Projeto acadêmico de Front-end e Desenvolvimento Dinâmico.

## Como executar o backend

1. Abrir a pasta `devloop-api` no Spring Tools Suite.
2. Executar o projeto como Spring Boot App.
3. A API ficará disponível em:

http://localhost:8080/produtos

## Como executar o front-end

1. Abrir a pasta `devloop` no Visual Studio Code.
2. Executar o `devloop-api/frontend/index.html` com Live Server.
3. Usar o endereço aberto pelo Live Server no navegador.

## Painel administrativo

1. Com o backend rodando, entrar pela página de login com `admin@devloop.com` e senha `admin123`.
2. Clicar em **Admin** no menu para acessar `devloop-api/frontend/pages/admin.html`.
3. Usar **Novo produto** para cadastrar um equipamento, **Editar** para alterar os dados e **Excluir** para removê-lo.
4. No cadastro, informar um identificador único (ex.: `notebook-teste`) e um caminho de imagem existente (ex.: `../assets/images/Dell XPS 15/img1.png`). As especificações adicionais ficam em **Mais informações**.

O painel impede identificadores repetidos e mantém as especificações ao editar. Preço mensal e estoque usam números inteiros a partir de zero.

A verificação de administrador é feita no frontend usando a role retornada pelo login. O backend atual não aplica autorização nas rotas de produtos.

O banco configurado é H2 em memória: cadastros, alterações e exclusões são perdidos ao reiniciar o backend, que recria os dados iniciais.

## Funcionalidades

- Catálogo de produtos dinâmico
- Busca e filtros de produtos
- Página de detalhes dinâmica por ID
- Galeria de imagens por produto
- Produtos relacionados
- Carrinho com localStorage
- Integração com backend Spring Boot
- Painel administrativo com cadastro, edição e exclusão de produtos
