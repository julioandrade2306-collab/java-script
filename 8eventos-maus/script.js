// ==============================
// Funções dos botões e áreas
// ==============================

// Clique simples
function area1ClicMouse() {
    const area1 = document.getElementById("area1");
    area1.style.backgroundColor = "#4CAF50";
    area1.innerHTML = "<h1>Você clicou!</h1>";
}

// Clique duplo
function area1Clicduplo() {
    const area1 = document.getElementById("area1");
    area1.style.backgroundColor = "#8BC34A";
    area1.innerHTML = "<h1>Clique duplo detectado!</h1>";
}

// Passar o mouse sobre
function area1PasseMouse() {
    const area2 = document.getElementById("area2");
    area2.style.backgroundColor = "#FFEB3B";
    area2.innerHTML = "<h1>Mouse sobre!</h1>";
}

// Tirar o mouse de cima
function area1TiraMouse() {
    const area2 = document.getElementById("area2");
    area2.style.backgroundColor = "#fff";
    area2.innerHTML = "<h1>Mouse saiu!</h1>";
}

// Movimento do mouse dentro da área 3
function eventoMoverMouse() {
    const area3 = document.getElementById("area3");
    const bolinha = document.getElementById("areainterna");

    // Gera coordenadas aleatórias para a bolinha
    const maxX = area3.offsetWidth - bolinha.offsetWidth;
    const maxY = area3.offsetHeight - bolinha.offsetHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    bolinha.style.left = `${x}px`;
    bolinha.style.top = `${y}px`;
}

// Pressionar botão do mouse
function eventoPressionaMouse() {
    const area3 = document.getElementById("area3");
    area3.style.backgroundColor = "#FF5722";
    area3.querySelector("h1").innerText = "Botão pressionado!";
}

// Soltar botão do mouse
function eventoSoltaMouse() {
    const area3 = document.getElementById("area3");
    area3.style.backgroundColor = "#2196F3";
    area3.querySelector("h1").innerText = "Botão solto!";
}

// Quando o campo ganha foco
function eventoFoco() {
    const area4 = document.getElementById("area4");
    area4.style.borderColor = "#4CAF50";
    area4.placeholder = "Campo em foco!";
}

// Quando o campo perde o foco
function eventoSaiFoco() {
    const area4 = document.getElementById("area4");
    area4.style.borderColor = "#ccc";
    area4.placeholder = "onblur (perdeu foco)";
}

// Quando o valor de um campo muda
function eventoAlterou() {
    alert("O valor foi alterado!");
}

// Reset do formulário
function eventoReset() {
    alert("Formulário resetado!");
}

// Evento de tecla pressionada
document.getElementById("area5").onkeypress = function () {
    this.style.backgroundColor = "#E1BEE7";
};

// Evento de tecla segurada
document.getElementById("area6").onkeydown = function () {
    this.style.backgroundColor = "#C8E6C9";
};

// Evento de tecla solta
document.getElementById("area7").onkeyup = function () {
    this.style.backgroundColor = "#FFCDD2";
};
