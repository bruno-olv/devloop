// usei isso pra pegar o formulario de login
const form = document.getElementById("loginForm");

// fiz isso pra escutar quando o formulario for enviado
form.addEventListener("submit", function(e){

    // impede a pagina de recarregar quando envia o form
    e.preventDefault();

    // criei uma variavel pra pegar o email digitado
    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    // criei uma variavel pra pegar a senha digitada
    const password = document
        .getElementById("password")
        .value;

    // usei isso pra pegar todos os usuarios cadastrados no localStorage
    const users = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
    );

    // fiz isso pra procurar um usuario com esse email e essa senha
    const user = users.find(u =>
        u.email === email &&
        u.password === password
    );

    // usei isso pra pegar o elemento que mostra a mensagem
    const msg = document.getElementById("msg");

    // se achou o usuario faz isso
    if(user){

        // salva o usuario logado no localStorage
        localStorage.setItem(
            "loggedUser",
            JSON.stringify(user)
        );

        // mostra a mensagem de boas vindas
        msg.innerHTML =
            `Bem-vindo ${user.firstName}!`;

        // fiz isso pra esperar 1 segundo e mandar pra pagina inicial
        setTimeout(() => {
            window.location.href =
                "../index.html";
        }, 1000);

    }else{

        // se nao achou mostra mensagem de erro
        msg.innerHTML =
            "Email ou senha incorretos.";

    }

});
