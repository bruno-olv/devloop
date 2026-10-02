// isso aqui roda tudo dentro de uma funcao pra nao bagunçar o escopo global
(function () {
    // usei isso pra deixar o modo estrito ligado
    "use strict";

    // criei essas variaveis pra pegar o formulario e os campos do cadastro
    const form            = document.getElementById("registerForm");
    const firstNameInput  = document.getElementById("firstName");
    const emailInput      = document.getElementById("email");
    const passwordInput   = document.getElementById("password");
    const confirmInput    = document.getElementById("confirmPassword");
    const termsCheckbox   = document.getElementById("terms");
    const submitBtn       = document.getElementById("submitBtn");

    // funcao para mostrar ou esconder erro num campo
    function setFieldValidity(input, errorId, isValid) {
        // pega o elemento de erro pelo id
        const errorEl = document.getElementById(errorId);
        // se ta valido tira o erro
        if (isValid) {
            input.classList.remove("error");
            errorEl.classList.remove("visible");
        } else {
            // se nao ta valido mostra o erro
            input.classList.add("error");
            errorEl.classList.add("visible");
        }
    }

    // funcao para mostrar aquele toast de aviso na tela
    function showToast(message, type = "success") {
        // criei essas variaveis pra pegar as partes do toast
        const toast   = document.getElementById("toast");
        const icon    = document.getElementById("toastIcon");
        const msgEl   = document.getElementById("toastMsg");

        // troca a classe do icone dependendo se é sucesso ou erro
        icon.className = `toast-icon ${type}`;
        // fiz isso pra colocar o svg certo, um check ou um x
        icon.innerHTML = type === "success"
            ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
            : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

        // coloca a mensagem que veio por parametro
        msgEl.textContent = message;
        // mostra o toast na tela
        toast.classList.add("show");

        // fiz isso pra esconder o toast depois de 3.5 segundos
        setTimeout(() => toast.classList.remove("show"), 3500);
    }

    // funcao para validar o nome, tem que ter só letras e no minimo 3
    function validateFirstName() {
        // usei isso pra aceitar só letras (com acento) e espaço, sem numero ou caractere especial
        const re = /^[A-Za-zÀ-ÿ\s]{3,}$/;
        // testa o nome digitado com a regex
        const valid = re.test(firstNameInput.value.trim());
        // chama a funcao que mostra/esconde o erro
        setFieldValidity(firstNameInput, "firstNameError", valid);
        // devolve se é valido
        return valid;
    }

    // funcao para validar o email com uma regex
    function validateEmail() {
        // usei isso pra pegar o formato basico de email
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // testa o email digitado com a regex
        const valid = re.test(emailInput.value.trim());
        // mostra/esconde o erro do email
        setFieldValidity(emailInput, "emailError", valid);
        // devolve se é valido
        return valid;
    }

    // funcao para validar se a senha tem no minimo 8 caracteres
    function validatePassword() {
        // criei essa variavel pra guardar se é valido
        const valid = passwordInput.value.length >= 8;
        // mostra/esconde o erro da senha
        setFieldValidity(passwordInput, "passwordError", valid);
        // devolve se é valido
        return valid;
    }

    // funcao para validar se a confirmação bate com a senha
    function validateConfirmPassword() {
        // fiz isso pra checar se preencheu e se é igual a senha
        const valid =
            confirmInput.value.length > 0 &&
            confirmInput.value === passwordInput.value;
        // mostra/esconde o erro da confirmação
        setFieldValidity(confirmInput, "confirmPasswordError", valid);
        // devolve se é valido
        return valid;
    }

    // funcao para configurar o botao de mostrar/esconder senha
    function setupToggle(buttonId, inputEl) {
        // usei isso pra pegar o botao do olhinho
        const btn = document.getElementById(buttonId);
        // adicionei um evento de clique no botao
        btn.addEventListener("click", () => {
            // criei essa variavel pra saber se ta mostrando como texto
            const isText = inputEl.type === "text";
            // troca o tipo do input entre texto e senha
            inputEl.type = isText ? "password" : "text";

            // Troca ícone (olho aberto / olho fechado)
            btn.innerHTML = isText
                ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                       <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                       <circle cx="12" cy="12" r="3"/>
                   </svg>`
                : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                       <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                       <line x1="1" y1="1" x2="23" y2="23"/>
                   </svg>`;
        });
    }

    // chamei a funcao pra configurar o olhinho do campo senha
    setupToggle("togglePassword", passwordInput);
    // chamei a funcao pra configurar o olhinho do campo confirmar senha
    setupToggle("toggleConfirm",  confirmInput);

    // fiz isso pra validar o nome quando sair do campo
    firstNameInput.addEventListener("blur", validateFirstName);
    // fiz isso pra validar o email quando sair do campo
    emailInput.addEventListener("blur",     validateEmail);

    // adicionei um evento pra rodar toda vez que digita na senha
    passwordInput.addEventListener("input", () => {
        // se ja tava com erro revalida enquanto digita
        if (passwordInput.classList.contains("error")) validatePassword();
        // se a confirmação ja tiver algo revalida ela tambem
        if (confirmInput.value) validateConfirmPassword();
    });

    // fiz isso pra validar a senha quando sair do campo
    passwordInput.addEventListener("blur", validatePassword);
    // fiz isso pra validar a confirmação quando sair do campo
    confirmInput.addEventListener("blur",  validateConfirmPassword);
    // adicionei um evento pra revalidar a confirmação enquanto digita
    confirmInput.addEventListener("input", () => {
        // so revalida se ja tava com erro
        if (confirmInput.classList.contains("error")) validateConfirmPassword();
    });

    // fiz isso pra escutar o envio do formulario de cadastro
    form.addEventListener("submit", async function (e) {
        // impede a pagina de recarregar ao enviar
        e.preventDefault();

        // Valida todos os campos
        // fiz isso pra validar tudo de uma vez e guardar se ta tudo certo
        const allValid =
            validateFirstName()       &
            validateEmail()           &
            validatePassword()        &
            validateConfirmPassword();

        // se algum campo ta invalido mostra o toast de erro e para
        if (!allValid) {
            showToast("Corrija os campos destacados antes de continuar.", "error");
            return;
        }

        // se nao marcou os termos mostra erro e para
        if (!termsCheckbox.checked) {
            showToast("Aceite os Termos de Uso para continuar.", "error");
            return;
        }

        // desabilita o botao pra nao clicar duas vezes
        submitBtn.disabled = true;

        // criei uma variavel para guardar o nome antes 
        // porque o form.reset() apaga os campos
        const nome = firstNameInput.value.trim();

        try {
            // usei fetch para mandar os dados pro back-end
            const res = await fetch("http://localhost:8080/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: nome,
                    email: emailInput.value.trim().toLowerCase(),
                    password: passwordInput.value
                })
            });

            if (res.ok) {
                // mostra o toast de sucesso com o nome do usuario
                showToast(`Bem-vindo, ${nome}! Conta criada com sucesso.`, "success");
                // limpa o formulario depois de salvar
                form.reset();

                // manda pra tela de login depois de 1,5 segundos
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 1500);
            } else {
                 // usei await res.json() para ler a mensagem de erro que o back mandou
                 // mas de modo que nao quebre se nao vier json (ex: back desligado)
                const erro = await res.json().catch(() => null);
                console.log(erro); // o erro deve aparecer no console

                // se o back recusou (ex: email ja cadastrado)
                setFieldValidity(emailInput, "emailError", false);
                document.getElementById("emailError").textContent = "Não foi possível cadastrar. Este e-mail pode já estar cadastrado.";
                showToast("Não foi possível criar a conta.", "error");
            }
        } catch (err) {
            // back-end desligado ou erro de conexao
            showToast("Não foi possível conectar ao servidor.", "error");
        } finally {
            // libera o botao de novo
            submitBtn.disabled = false;
            submitBtn.textContent = "Criar conta";
        }
    });

})();