// funcao que verifica se tem usuario logado
// isso aqui roda tudo dentro de uma funcao pra nao bagunçar o escopo global
(function () {

    // funcao para mostrar que ta loggado
    function updateAuthLinks() {
        // usei isso pra pegar a div dos links de login/cadastro
        var authLinks = document.querySelector(".auth-links");
        // se nao achar a div para tudo aqui
        if (!authLinks) return;

        // criei 2 variaveis pra pegar os botoes de cadastrar e entrar
        var signupLink = authLinks.querySelector(".btn-signup");
        var loginLink  = authLinks.querySelector(".btn-login");
        // se nao achar os botoes para tudo aqui tambem
        if (!signupLink || !loginLink) return;

        // usei isso pra pegar o usuario que ta salvo no localStorage
        var user = JSON.parse(localStorage.getItem("loggedUser") || "null");
        // se nao tiver ninguem logado nao faz nada
        if (!user) return;

        // fiz isso pra trocar o texto do botao de cadastrar pelo nome do usuario
        signupLink.textContent = "Olá, " + user.firstName;
        // tirei o link ja que agora so mostra o nome
        signupLink.removeAttribute("href");

        // fiz aquilo pra trocar o botao de entrar pelo botao de sair
        loginLink.textContent = "Sair";
        loginLink.href = "#";
        // adicionei um evento de clique no botao de sair
        loginLink.addEventListener("click", function (e) {
            // impede o link de recarregar a pagina pro topo
            e.preventDefault();
            // apaga o usuario logado do localStorage
            localStorage.removeItem("loggedUser");
            // recarrega a pagina pra atualizar os links
            window.location.reload();
        });
    }

    // chama a funcao assim que a pagina terminar de carregar
    document.addEventListener("DOMContentLoaded", updateAuthLinks);
})();
