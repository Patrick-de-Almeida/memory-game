document.addEventListener("DOMContentLoaded", () => {
    const grade = document.querySelector(".jogo-memoria");
    const telaInicio = document.querySelector(".tela-inicio");
    const telaVitoria = document.querySelector(".tela-vitoria");

    let arrayCartoes = [
        { name: "carlos", img: "images/carlos.jpg" },
        { name: "carlos", img: "images/carlos.jpg" },
        { name: "garro", img: "images/garro.jpg" },
        { name: "garro", img: "images/garro.jpg" },
        { name: "romero", img: "images/romero.jpg" },
        { name: "romero", img: "images/romero.jpg" },
        { name: "yuri", img: "images/yuri.jpg" },
        { name: "yuri", img: "images/yuri.jpg" },
        { name: "fagner", img: "images/fagner.jpg" },
        { name: "fagner", img: "images/fagner.jpg" },
        { name: "felix", img: "images/felix.jpg" },
        { name: "felix", img: "images/felix.jpg" },
        { name: "raniele", img: "images/raniele.jpg" },
        { name: "raniele", img: "images/raniele.jpg" },
        { name: "wesley", img: "images/wesley.jpg" },
        { name: "wesley", img: "images/wesley.jpg" },
    ];

    let cartoesEscolhidos = [];
    let idsCartoesEscolhidos = [];
    let cartoesVencidos = 0;

    function iniciarJogo() {
        grade.innerHTML = "";
        arrayCartoes.sort(() => 0.5 - Math.random());
        arrayCartoes.forEach((cartao, index) => {
            const elementoCartao = document.createElement("div");
            elementoCartao.classList.add("cartao");
            elementoCartao.setAttribute("data-id", index);

            const imagemCartao = document.createElement("img");
            imagemCartao.src = cartao.img;
            imagemCartao.alt = cartao.name;
            elementoCartao.appendChild(imagemCartao);

            elementoCartao.addEventListener("click", virarCartao);
            grade.appendChild(elementoCartao);
        });
        telaInicio.style.display = "none";
        grade.style.display = "grid";
        telaVitoria.style.display = "none";
    }

    function virarCartao() {
        let idCartao = this.getAttribute("data-id");
        if (!idsCartoesEscolhidos.includes(idCartao) && !this.hasAttribute("data-combinado")) {
            cartoesEscolhidos.push(arrayCartoes[idCartao].name);
            idsCartoesEscolhidos.push(idCartao);
            this.classList.add("virado");
            if (cartoesEscolhidos.length === 2) {
                setTimeout(verificarCombinacao, 500);
            }
        }
    }

    function verificarCombinacao() {
        const cartoes = document.querySelectorAll(".cartao");
        const [primeiroId, segundoId] = idsCartoesEscolhidos;
        if (cartoesEscolhidos[0] === cartoesEscolhidos[1] && primeiroId !== segundoId) {
            alert("Você encontrou um par!");
            cartoes[primeiroId].setAttribute("data-combinado", "true");
            cartoes[segundoId].setAttribute("data-combinado", "true");
            cartoesVencidos += 2;
        } else {
            cartoes[primeiroId].classList.remove("virado");
            cartoes[segundoId].classList.remove("virado");
        }
        cartoesEscolhidos = [];
        idsCartoesEscolhidos = [];

        if (cartoesVencidos === arrayCartoes.length) {
            grade.style.display = "none";
            telaVitoria.style.display = "flex";
        }
    }

    function reiniciarJogo() {
        cartoesVencidos = 0;
        iniciarJogo();
    }

    window.iniciarJogo = iniciarJogo;
    window.reiniciarJogo = reiniciarJogo;
});
