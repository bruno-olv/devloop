(function () {
    "use strict";
    alert("auth.js carregou");

    // ─── Referências DOM ──────────────────────────────────────────────────────
    const form            = document.getElementById("registerForm");
    const firstNameInput  = document.getElementById("firstName");
    const lastNameInput   = document.getElementById("lastName");
    const emailInput      = document.getElementById("email");
    const passwordInput   = document.getElementById("password");
    const confirmInput    = document.getElementById("confirmPassword");
    const termsCheckbox   = document.getElementById("terms");
    const submitBtn       = document.getElementById("submitBtn");

    const strengthSegments = [
        document.getElementById("s1"),
        document.getElementById("s2"),
        document.getElementById("s3"),
        document.getElementById("s4"),
    ];
    const strengthLabel = document.getElementById("strengthLabel");

    // ─── Utilitários ─────────────────────────────────────────────────────────

    /**
     * Exibe ou esconde mensagem de erro para um campo.
     * @param {HTMLInputElement} input
     * @param {string} errorId - ID do elemento de erro
     * @param {boolean} isValid
     */
    function setFieldValidity(input, errorId, isValid) {
        const errorEl = document.getElementById(errorId);
        if (isValid) {
            input.classList.remove("error");
            errorEl.classList.remove("visible");
        } else {
            input.classList.add("error");
            errorEl.classList.add("visible");
        }
    }

    /**
     * Mostra um toast de feedback.
     * @param {string} message
     * @param {"success"|"error"} type
     */
    function showToast(message, type = "success") {
        const toast   = document.getElementById("toast");
        const icon    = document.getElementById("toastIcon");
        const msgEl   = document.getElementById("toastMsg");

        icon.className = `toast-icon ${type}`;
        icon.innerHTML = type === "success"
            ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
            : `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

        msgEl.textContent = message;
        toast.classList.add("show");

        setTimeout(() => toast.classList.remove("show"), 3500);
    }

    // ─── Validações individuais ───────────────────────────────────────────────

    function validateFirstName() {
        const valid = firstNameInput.value.trim().length >= 2;
        setFieldValidity(firstNameInput, "firstNameError", valid);
        return valid;
    }

    function validateLastName() {
        const valid = lastNameInput.value.trim().length >= 2;
        setFieldValidity(lastNameInput, "lastNameError", valid);
        return valid;
    }

    function validateEmail() {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valid = re.test(emailInput.value.trim());
        setFieldValidity(emailInput, "emailError", valid);
        return valid;
    }

    function validatePassword() {
        const valid = passwordInput.value.length >= 8;
        setFieldValidity(passwordInput, "passwordError", valid);
        return valid;
    }

    function validateConfirmPassword() {
        const valid =
            confirmInput.value.length > 0 &&
            confirmInput.value === passwordInput.value;
        setFieldValidity(confirmInput, "confirmPasswordError", valid);
        return valid;
    }

    // ─── Força da senha ───────────────────────────────────────────────────────

    /**
     * Calcula força da senha de 0 a 4.
     * Critérios: comprimento ≥ 8, letras minúsculas, maiúsculas, números, especiais.
     */
    function getPasswordStrength(value) {
        let score = 0;
        if (value.length >= 8)              score++;
        if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
        if (/\d/.test(value))               score++;
        if (/[^a-zA-Z0-9]/.test(value))    score++;
        return score;
    }

    const STRENGTH_LABELS = ["", "Fraca", "Razoável", "Boa", "Forte"];
    const STRENGTH_COLORS = ["", "weak", "medium", "strong", "strong"];

    function updateStrengthBar(value) {
        const score = value.length === 0 ? 0 : getPasswordStrength(value);

        strengthSegments.forEach((seg, i) => {
            seg.className = "strength-segment";
            if (i < score) seg.classList.add(STRENGTH_COLORS[score]);
        });

        strengthLabel.textContent = score > 0 ? STRENGTH_LABELS[score] : "";
    }

    // ─── Alternância de visibilidade ──────────────────────────────────────────

    function setupToggle(buttonId, inputEl) {
        const btn = document.getElementById(buttonId);
        btn.addEventListener("click", () => {
            const isText = inputEl.type === "text";
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

    setupToggle("togglePassword", passwordInput);
    setupToggle("toggleConfirm",  confirmInput);

    // ─── Eventos de validação em tempo real ──────────────────────────────────

    firstNameInput.addEventListener("blur", validateFirstName);
    lastNameInput.addEventListener("blur",  validateLastName);
    emailInput.addEventListener("blur",     validateEmail);

    passwordInput.addEventListener("input", () => {
        updateStrengthBar(passwordInput.value);
        if (passwordInput.classList.contains("error")) validatePassword();
        if (confirmInput.value) validateConfirmPassword();
    });

    passwordInput.addEventListener("blur", validatePassword);
    confirmInput.addEventListener("blur",  validateConfirmPassword);
    confirmInput.addEventListener("input", () => {
        if (confirmInput.classList.contains("error")) validateConfirmPassword();
    });

    // ─── Armazenamento simulado ───────────────────────────────────────────────

    /**
     * Verifica se o e-mail já está cadastrado no localStorage.
     * @param {string} email
     * @returns {boolean}
     */
    function emailAlreadyExists(email) {
        const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        return users.some((u) => u.email === email.toLowerCase());
    }

    /**
     * Persiste novo usuário no localStorage.
     * ATENÇÃO: em produção, nunca armazene senhas em texto puro — use hashing no backend.
     */
    function saveUser(data) {
        const users = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
        users.push({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email.toLowerCase(),
    password: data.password,
    createdAt: new Date().toISOString(),
});
        localStorage.setItem("registeredUsers", JSON.stringify(users));
    }

    // ─── Submit ───────────────────────────────────────────────────────────────

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Valida todos os campos
        const allValid =
            validateFirstName()       &
            validateLastName()        &
            validateEmail()           &
            validatePassword()        &
            validateConfirmPassword();

        if (!allValid) {
            showToast("Corrija os campos destacados antes de continuar.", "error");
            return;
        }

        if (!termsCheckbox.checked) {
            showToast("Aceite os Termos de Uso para continuar.", "error");
            return;
        }

        if (emailAlreadyExists(emailInput.value.trim())) {
            setFieldValidity(emailInput, "emailError", false);
            document.getElementById("emailError").textContent = "Este e-mail já está cadastrado.";
            document.getElementById("emailError").classList.add("visible");
            showToast("E-mail já cadastrado. Tente fazer login.", "error");
            return;
        }

        // Simula um breve delay de rede
        submitBtn.disabled = true;
        submitBtn.textContent = "Criando conta…";

        setTimeout(() => {
            saveUser({
            firstName: firstNameInput.value.trim(),
            lastName: lastNameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value
});

            showToast(`Bem-vindo, ${firstNameInput.value.trim()}! Conta criada com sucesso.`, "success");
            form.reset();
            updateStrengthBar("");
            submitBtn.disabled = false;
            submitBtn.textContent = "Criar conta";
        }, 900);
    });

})();