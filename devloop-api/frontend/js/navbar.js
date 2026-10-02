// pega os blocos do header
const authGuest = document.getElementById("auth-guest");
const authUser  = document.getElementById("auth-user");
const userName  = document.getElementById("user-name");
const adminLink = document.getElementById("admin-link");
const logoutBtn = document.getElementById("logout-btn");

// le o que esta salvo no localStorage
const name = localStorage.getItem("name");
const role = localStorage.getItem("role");

if (name) {
    // usuario logado
    authGuest.style.display = "none";
    authUser.style.display = "flex";

    userName.textContent = `Olá, ${name}`;

    if (role === "ROLE_ADMIN") {
        adminLink.style.display = "inline-block";
    }
} else {
    // ninguem logado
    authGuest.style.display = "flex";
    authUser.style.display = "none";
}

// logout
logoutBtn.addEventListener("click", () => {
    const confirmar = confirm("Tem certeza que deseja sair?");
    if (!confirmar) return;

    localStorage.clear();
    const emPages = window.location.pathname.includes("/pages/");
    window.location.href = emPages ? "../index.html" : "index.html";
});