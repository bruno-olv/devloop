// usei isso para pegar o formulario de login
const form = document.getElementById("loginForm");

// fiz isso para escutar quando o formulario for enviado 
// (agora a funcao e async por causa do fetch)
form.addEventListener("submit", async function(e){

    // impede a pagina de recarregar quando envia o form
    e.preventDefault();

    // criei uma variavel para pegar o email digitado
    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    // criei uma variavel para pegar a senha digitada
    const password = document
        .getElementById("password")
        .value;

    // elemento para mostrar a mensagem
    const msg = document.getElementById("msg");

    // usei try/catch para tratar erros de conexao com o back-end
    try {
        // usei await fetch para mandar email e senha pro back-end
        const res = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        // se o back recusou (email ou senha errados, ou usuario nao existe...)
        if(!res.ok){
            msg.innerHTML = "Email ou senha incorretos.";
            return;
        }

        // usei await res.json() para ler a resposta do back
        const data = await res.json();
        console.log(data); // console.log para conferir os nomes dos campos

        // salva role, name e id no localStorage (para usar depois)
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("id", data.id);

        // mostra a mensagem de boas vindas
        msg.innerHTML = `Bem-vindo ${data.name}!`;

        // espera 1 segundo e manda pra pagina inicial
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 1000);

    } catch (err) {
        // back-end desligado ou erro de conexao
        msg.innerHTML = "Não foi possível conectar ao servidor.";
    }

});