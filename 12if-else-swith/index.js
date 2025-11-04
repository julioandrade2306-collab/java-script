function ligar(){
    var valor1 = document.getElementById("numero").value;
    var valor2 = 14;

    if (valor1 == valor2){

        document.getElementById("botao1").s
        document.getElementById("botao1")
        document.getElementById("numero2").innerHTML = "Acertou!!!";
    } else {
        
        if (valor1 < 10){
            document.getElementById("numero2").innerHTML = "Não foi desta vez!!!";
        }
        if (valor1 > 9 && valor1 < 14){
            document.getElementById("numero2").innerHTML = "Continue tentando!!!";
        }
        if (valor1 > 14 && valor1 < 17){
            document.getElementById("numero2").innerHTML = "Tente mais uma!!!";
        }

        var x = 0;
        document.getElementById("contar").innerHTML = (valor1 != valor2) ? "" : "";
    }
}

var contarVal = 0

function contarClick(){
    updateDisplay(++contarVal);
}

function resetarContador(){
    contarVal = 0;
    updateDisplay(contarVal);
}

function updateDisplay(val){
    document.getElementById("contartentativas").innerHTML = val;
}

var btn = document.querySelector("#resetar");
btn.addEventListener("click", function(){ 

    location.reload();
})

function verificarnumero(){
    let teste1 = document.getElementById("testenumero").value;

    switch (teste1){
        case "2":
            document.getElementById("botao10").style.backgroundColor = "yellow";
            document.getElementById("botao3").innerHTML = "Parabens!!! você acertou o numero!!";
            document.getElementById("botao10").style.color = "red";
            break;

        default:
            document.getElementById("numero3").innerHTML = "Não foi desta vez, Tente novamente!!!";
    }
}

var ganhou = Math.floor(Math.random() * 9) + 1;

function testar(elem){
    var num = parseInt(elem.innerHTML);
    switch (num){
        case ganhou:
            document.querySelector("#resposta").innerHTML = "Parabens!!! Você achou a caixa correta!!";
            document.querySelector("#resposta").style.backgroundColor = "yellow";

            break
        case ganhou:
            document.querySelector(".caixa").innerHTML = "Parabens!!! Você achou a caixa correta!!";
            document.querySelector(".caixa").style.backgroundColor = "yellow";

        default:
            alert("Perdeu!");
            break
    }
}
function contarClick2(){
    updateDisplay2(++contarVal);
}
function updateDisplay2(){
    document.getElementById("contartentativas2").innerHTML = val;
}
var btn = document.querySelector("#resetar2");
btn.addEventListener("click", function(){
    location.reload();
})