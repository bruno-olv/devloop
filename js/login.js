const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const password = document
        .getElementById("password")
        .value;

    const users = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
    );

    const user = users.find(u =>
        u.email === email &&
        u.password === password
    );

    const msg = document.getElementById("msg");

    if(user){

        localStorage.setItem(
            "loggedUser",
            JSON.stringify(user)
        );

        msg.innerHTML =
            `Bem-vindo ${user.firstName}!`;

        setTimeout(() => {
            window.location.href =
                "home.html";
        }, 1000);

    }else{

        msg.innerHTML =
            "Email ou senha incorretos.";

    }

});