console.log("MÓDULO DE REDE P2P INICIADO.");

let peer;
let conexao;
let isHost = false;

// 1. O HOST (Quem gera o código da sala) - VERSÃO DIAGNÓSTICO
function criarSala() {
    console.log("SISTEMA: Iniciando protocolo de Host...");
    
    try {
        let codigoSala = 'ZEUS-' + Math.random().toString(36).substr(2, 4).toUpperCase();
        console.log("SISTEMA: Código local gerado: " + codigoSala);
        
        // Tenta conectar na "Telefonista"
        peer = new Peer(codigoSala);
        
        document.getElementById("meu-status").innerText = "Conectando ao satélite...";
        document.getElementById("meu-status").style.color = "yellow";

        peer.on('open', function(id) {
            console.log("SISTEMA: Conexão com satélite estabelecida! ID: " + id);
            const statusEl = document.getElementById("meu-status");
            statusEl.innerText = "AGUARDANDO INIMIGO... SEU CÓDIGO: " + id;
            statusEl.style.color = "#00ffcc";
            statusEl.style.fontWeight = "bold";
            isHost = true;
        });

        // 👇 O DEDO DURO: Se o PeerJS der erro, ele avisa aqui!
        peer.on('error', function(err) {
            console.error("ERRO CRÍTICO DE REDE:", err);
            document.getElementById("meu-status").innerText = "FALHA DE REDE: " + err.type;
            document.getElementById("meu-status").style.color = "#ff0000";
        });

        peer.on('connection', function(conn) {
            conexao = conn;
            prepararBatalha();
        });

    } catch (e) {
        console.error("ERRO DE SINTAXE NO SCRIPT:", e);
    }
}
// 2. O CLIENT (Quem digita o código e invade a sala)
function conectarNaSala() {
    let codigo = document.getElementById("id-alvo").value.toUpperCase().trim();
    if(!codigo) { playSound("error"); alert("SISTEMA: Digite o código do Host."); return; }

    peer = new Peer(); 
    document.getElementById("meu-status").innerText = "Conectando ao terminal " + codigo + "...";

    peer.on('open', function() {
        conexao = peer.connect(codigo);
        
        // Quando a conexão for aceita pelo Host
        conexao.on('open', function() {
            prepararBatalha();
        });
    });
}

// 3. O APERTO DE MÃO (O que acontece quando se acham)
function prepararBatalha() {
    playSound("deploy");
    document.getElementById("p2p-modal").classList.remove("active");
    
    // Mostra o pop-up Cyber-Toast que criamos!
    alert("Conexão P2P Estabelecida! Sincronizando Matrizes...");
    
    // O Escutador de Pacotes Inimigos
    conexao.on('data', function(pacote) {
        console.log("SINAL INIMIGO INTERCEPTADO:", pacote);
        // O código vai reagir aqui no futuro
    });
}

// 4. O DISPARADOR (Como mandamos um pacote pro inimigo)
function enviarPacote(dados) {
    if(conexao && conexao.open) {
        conexao.send(dados);
    }
}
