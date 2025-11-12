
    
        // Declaração das variáveis principais do jogo
        let numbers = [];           // Armazena os números embaralhados
        let sortedNumbers = [];     // Armazena os números em ordem crescente
        let tempoInicial = 10;      // Tempo inicial da fase (em segundos)
        let tempoRestante = tempoInicial; // Contador regressivo
        let intervaloTempo;         // Guardará o setInterval
        let fase = 1;               // Número da fase atual
        let jogoAtivo = false;      // Impede iniciar várias vezes
        let tempoMinimo = 5;        // Tempo mínimo para o jogo não ficar impossível

        // Função que gera 10 números aleatórios (de 1 a 10)
        function gerarNumeros() {
            numbers = []; // Zera a lista
            for (let i = 1; i <= 10; i++) {
                numbers.push(i); // Adiciona números de 1 a 10
            }

            // Embaralha os números aleatoriamente
            numbers.sort(() => Math.random() - 0.5);

            // Cria uma cópia ordenada (para comparar se o jogador clicou certo)
            sortedNumbers = [...numbers].sort((a, b) => a - b);
        }

        // Exibe os números na tela
        function exibirNumeros() {
            const container = document.getElementById("numbers"); // Pega a div
            container.innerHTML = ""; // Limpa antes de desenhar novamente

            // Cria um bloco visual para cada número
            numbers.forEach((num, index) => {
                const div = document.createElement("div"); // Cria a div
                div.className = "number"; // Adiciona a classe CSS
                div.textContent = num; // Coloca o número dentro
                div.onclick = () => verificarClique(index); // Define o evento de clique
                container.appendChild(div); // Adiciona à tela
            });
        }

        // Função principal que inicia o jogo
        function iniciarJogo() {
            if (jogoAtivo) return; // Impede reiniciar se já estiver ativo

            jogoAtivo = true; // Marca o jogo como ativo
            gerarNumeros(); // Cria os números
            exibirNumeros(); // Mostra os números na tela
            document.getElementById("mensagem").innerHTML = "<p>Boa sorte!</p>"; // Mensagem inicial
            tempoRestante = tempoInicial; // Reinicia o tempo
            atualizarTempo(); // Mostra o tempo na tela

            // Cria um cronômetro que desconta 1 segundo a cada vez
            intervaloTempo = setInterval(() => {
                tempoRestante--; // Diminui 1 segundo
                atualizarTempo(); // Atualiza o texto do tempo

                // Se o tempo chegar a 0
                if (tempoRestante <= 0) {
                    clearInterval(intervaloTempo); // Para o contador
                    alert("Tempo esgotado! Tente novamente."); // Mensagem de derrota
                    jogoAtivo = false; // Desativa o jogo
                }
            }, 1000); // Intervalo de 1 segundo
        }

        // Atualiza o texto de tempo na tela
        function atualizarTempo() {
            document.getElementById("tempo").textContent = `Tempo: ${tempoRestante}s`;
        }

        // Verifica se o número clicado está correto
        function verificarClique(index) {
            if (!jogoAtivo) return; // Se o jogo não começou, ignora o clique

            // Se o número clicado for o primeiro da ordem correta
            if (numbers[index] === sortedNumbers[0]) {
                numbers.splice(index, 1); // Remove o número clicado da lista
                sortedNumbers.shift(); // Remove o primeiro da lista correta
                exibirNumeros(); // Atualiza os números na tela

                // Se o jogador acertou todos
                if (numbers.length === 0) {
                    clearInterval(intervaloTempo); // Para o tempo

                    // Se já chegou ao tempo mínimo, o jogador venceu
                    if (tempoInicial <= tempoMinimo) {
                        venceuJogo();
                    } else {
                        alert(`Fase ${fase} completada!`); // Avança de fase
                        proximaFase();
                    }
                }
            } else {
                // Se clicou fora da ordem
                alert("Ordem errada! Reinicie o jogo.");
                clearInterval(intervaloTempo);
                jogoAtivo = false;
            }
        }

        // Prepara a próxima fase
        function proximaFase() {
            // Reduz o tempo inicial até o mínimo permitido
            tempoInicial = Math.max(tempoMinimo, tempoInicial - 1);
            fase++; // Avança a fase
            document.getElementById("fase").textContent = `Fase: ${fase}`; // Atualiza texto
            document.getElementById("mensagem").innerHTML = "<p>Preparando próxima fase...</p>";
            jogoAtivo = false; // Pausa o jogo

            // Espera 2 segundos e inicia automaticamente a próxima fase
            setTimeout(() => {
                iniciarJogo();
            }, 2000);
        }

        // Função executada quando o jogador vence o jogo
        function venceuJogo() {
            jogoAtivo = false; // Para o jogo
            document.getElementById("numbers").innerHTML = ""; // Limpa os números
            document.getElementById("mensagem").innerHTML = `
                <h2>Parabéns! Você venceu o jogo!</h2>
                <p>Você completou todas as fases!</p>
                <button onclick="resetarJogo()">Jogar novamente</button>
            `;
        }

        // Reinicia o jogo do zero
        function resetarJogo() {
            clearInterval(intervaloTempo); // Para qualquer contador ativo
            fase = 1; // Volta para a primeira fase
            tempoInicial = 10; // Restaura o tempo inicial
            tempoRestante = 10; // Reseta o contador
            document.getElementById("fase").textContent = "Fase: 1"; // Atualiza o texto
            document.getElementById("tempo").textContent = "Tempo: 10s"; // Atualiza o tempo
            document.getElementById("mensagem").innerHTML = '<button onclick="iniciarJogo()">Começar Jogo</button>'; // Mostra o botão inicial
            document.getElementById("numbers").innerHTML = ""; // Limpa a tela
            jogoAtivo = false; // Define que o jogo não está ativo
        }
   
