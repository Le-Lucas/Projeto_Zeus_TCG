/* =========================================================
   🚀 PROJETO ZEUS - MOTOR V10.6 (MASTER BRANCH BLINDADO)
   ========================================================= */

console.log("Conexão JS Estabelecida. Matriz Limpa: Fases, Botão 3D, VFX e IA Ativos.");
window.onerror = function(msg, url, line) { 
    if (msg.includes("gsap is not defined")) return true; 
    alert("🚨 ERRO NA MATRIZ: " + msg + " | Linha: " + line); 
    return false; 
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ==========================================
// 🟢 SISTEMA DE PRÉ-CARREGAMENTO (PRELOADER)
// ==========================================
function preloadAssets() {
    const imageUrls = new Set();
    baseDeck.forEach(card => { if(card.img && card.img.startsWith('http')) imageUrls.add(card.img); });
    campaignData.forEach(cena => {
        if(cena.bgImg) imageUrls.add(cena.bgImg);
        if(cena.bossImg) imageUrls.add(cena.bossImg);
        cena.dialogo.forEach(d => { if(d.img) imageUrls.add(d.img); });
    });
    imageUrls.forEach(url => { const img = new Image(); img.src = url; });
    console.log(`[SISTEMA] Iniciando download fantasma de ${imageUrls.size} texturas...`);
}

// ==========================================
// 1. MOTOR DE ESCALA E TOASTS
// ==========================================
function initZeusEngineScale() {
    const container = document.getElementById("zeus-engine-container");
    if (!container) return;
    const BASE_WIDTH = 1366; const BASE_HEIGHT = 768;
    function resizeGame() {
        let scale = Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT);
        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }
    window.addEventListener("resize", resizeGame);
    window.addEventListener("orientationchange", () => setTimeout(resizeGame, 200));
    resizeGame(); 
}

window.alert = function(msg) {
    let toast = document.getElementById("cyber-toast");
    if (!toast) {
        toast = document.createElement("div"); toast.id = "cyber-toast"; document.body.appendChild(toast);
        const style = document.createElement("style");
        style.innerHTML = `#cyber-toast { position: fixed; bottom: 150px; right: 20px; background: rgba(10, 5, 5, 0.95); border: 1px solid #ff0000; border-left: 5px solid #ff0000; color: #ff4444; padding: 15px 20px; border-radius: 4px; font-family: 'Courier New', monospace; font-weight: bold; font-size: 0.8rem; box-shadow: 0 0 20px rgba(255, 0, 0, 0.6); z-index: 99999; transform: translateX(120%); transition: transform 0.3s; pointer-events: none; text-transform: uppercase; max-width: 280px; } #cyber-toast.show { transform: translateX(0); }`;
        document.head.appendChild(style);
    }
    if (msg.includes("Recompensa") || msg.includes("MISSÃO") || msg.includes("ESTABELECIDA") || msg.includes("SISTEMA") || msg.includes("COMPRADO")) {
        toast.style.borderColor = "#00ffff"; toast.style.color = "#00ffff"; toast.style.boxShadow = "0 0 20px rgba(0, 255, 255, 0.6)"; toast.style.borderLeft = "5px solid #00ffff";
    } else {
        toast.style.borderColor = "#ff0000"; toast.style.color = "#ff4444"; toast.style.boxShadow = "0 0 20px rgba(255, 0, 0, 0.6)"; toast.style.borderLeft = "5px solid #ff0000";
    }
    toast.innerHTML = `<span style="color:#fff;">[ ALERTA ]</span><br><br>${msg}`;
    toast.classList.add("show"); clearTimeout(toast.timer); toast.timer = setTimeout(() => { toast.classList.remove("show"); }, 3500);
};

const sfx = { bgm: new Audio("https://files.catbox.moe/5j62nk.mp3"), click: new Audio("https://files.catbox.moe/nslg07.wav"), deploy: new Audio("https://files.catbox.moe/bi22a9.wav"), hit: new Audio("https://files.catbox.moe/vwoemb.wav"), error: new Audio("https://files.catbox.moe/f1wdc8.mp3") };
sfx.bgm.loop = true; sfx.bgm.volume = 0.4;
function playSound(type) { if(sfx[type]) { if(type !== 'bgm') sfx[type].currentTime = 0; sfx[type].play().catch(()=>{}); } }
function screenShake() { const b = document.getElementById("board"); if(b) { b.animate([{ transform: "translate(8px, 8px)" }, { transform: "translate(-8px, -8px)" }, { transform: "translate(8px, -8px)" }, { transform: "translate(0, 0)" }], { duration: 400 }); } }

// ==========================================
// 2. BANCO DE DADOS (CAMPANHA & CARTAS)
// ==========================================
const imgDiretor = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXT1IcOkgyVdfxJRupj-0q2LwH3pIRyYWTbg&s";
const imgOperador = "https://plus.unsplash.com/premium_photo-1682097238346-3f2a677ccfe6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29sZGFkb3xlbnwwfHwwfHx8MA%3D%3D";
const imgAdao = "https://img.freepik.com/fotos-premium/retrato-de-um-homem-palido-olhando-para-a-camera-com-um-olhar-assustador-contra-um-fundo-escuro-no-estudio_236854-66039.jpg";

const campaignData = [
    { name: "CENA 1: COMPLEXO MILITAR", bossName: "DEFESA DO PERÍMETRO", bossHp: 15, bossImg: "https://files.catbox.moe/ui0skk.png", bgImg: "https://i.postimg.cc/ZY8N7bVC/cena1.jpg", deckTema: ["Agente Novato", "Drone de Varredura", "Segurança Aegis", "Atirador Furtivo", "Drone de Sucata"], dialogo: [{ ator: "O DIRETOR", img: imgDiretor, texto: "Operador, detectamos uma anomalia térmica no Setor X8E. Parece uma detonação não autorizada." }, { ator: "O DIRETOR", img: imgDiretor, texto: "Nossa inteligência sugere que operações clandestinas do Projeto Zeus estão acontecendo lá. Infiltre-se e neutralize a ameaça." }, { ator: "OPERADOR", img: imgOperador, texto: "Entendido, Diretor. Iniciando varredura no perímetro externo da base." }] },
    { name: "CENA 2: CELA DAS COBAIAS", bossName: "HORDAS DA INCUBAÇÃO", bossHp: 20, bossImg: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png", bgImg: "https://i.postimg.cc/05YSWkcj/cena2.jpg", deckTema: ["Cobaia Estágio 1", "Mutante Instável", "Ciborgue Falho", "Unidade K-9 Cibernética"], dialogo: [{ ator: "OPERADOR", img: imgOperador, texto: "Diretor, o perímetro foi limpo. Mas não houve explosão propriamente dita... os portões do Sub-1 foram arrombados de dentro para fora." }, { ator: "O DIRETOR", img: imgDiretor, texto: "Isso é impossível. Proceda com extrema cautela ao descer." }, { ator: "OPERADOR", img: imgOperador, texto: "Espera... tem algo se movendo nas sombras. Contato! Cobaias soltas e frenéticas! Cortando comunicação para engajamento!" }] },
    { name: "CENA 3: LABS ZEUS", bossName: "ADÃO: O PRIMEIRO", bossHp: 40, bossImg: imgAdao, bgImg: "https://i.postimg.cc/ry14nVQz/cena3.jpg", deckTema: ["Projeto Zeus: Alfa", "O Punho da Resistência", "Sentinela Ômega", "Hack de Sobrecarga"], dialogo: [{ ator: "OPERADOR", img: imgOperador, texto: "Subnível 2 alcançado. Esquadrão de segurança abatido. Cientistas também... mas estão todos vivos, apenas nocauteados." }, { ator: "ADÃO", img: imgAdao, texto: "Se eu sou apenas um homem... por que não me canso igual a eles?" }, { ator: "ADÃO", img: imgAdao, texto: "Eles dizem que sou uma arma. A arma perfeita. Então por que eu hesito em puxar o gatilho?" }, { ator: "ADÃO", img: imgAdao, texto: "Ah... mais soldados chegando. Isso é tão irritante. Desliguem-se." }] }
];

const baseDeck = [
    { title: "Agente Novato", tipo: "tropa", raridade: "comum", custo: 1, atk: 1, def: 2, efeito: "nenhum", img: "https://i.postimg.cc/3JgCTq5Q/soldado-novato.png" },
    { title: "Drone de Varredura", tipo: "tropa", raridade: "comum", custo: 1, atk: 2, def: 1, efeito: "nenhum", img: "https://i.postimg.cc/pXDYHSbN/Drone-de-Varredura.png" },
    { title: "Segurança Aegis", tipo: "tropa", raridade: "comum", custo: 2, atk: 2, def: 3, efeito: "provocar", img: "https://i.postimg.cc/284FDtps/Seguranca-Aegis.png" },
    { title: "Atirador Furtivo", tipo: "tropa", raridade: "comum", custo: 2, atk: 3, def: 1, efeito: "nenhum", img: "https://i.postimg.cc/Fsjg46t8/Atirador-Furtivo.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Ciborgue Falho", tipo: "tropa", raridade: "comum", custo: 3, atk: 3, def: 3, efeito: "nenhum", img: "https://i.postimg.cc/65dLXPsS/Ciborgue-Falho.png" },
    { title: "Mercenário", tipo: "tropa", raridade: "comum", custo: 3, atk: 4, def: 2, efeito: "nenhum", img: "https://i.postimg.cc/4Nzbg0C2/Mercenario.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Infiltrador das Sombras", tipo: "humano", raridade: "comum", custo: 1, atk: 2, def: 1, efeito: "furtividade", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZoPOtDbsR6X1lPe9V86rfBHlh2Q9TrW7sg&s" },
    { title: "Sucateiro da Zona Sul", tipo: "humano", raridade: "comum", custo: 2, atk: 1, def: 3, efeito: "reciclar", img: "https://files.catbox.moe/dbnyi2.png" },
    { title: "Cadete de Patrulha", tipo: "soldado", raridade: "comum", custo: 1, atk: 1, def: 3, efeito: "provocar", img: "https://files.catbox.moe/ui0skk.png" },
    { title: "Escudeiro de Elite", tipo: "soldado", raridade: "comum", custo: 3, atk: 2, def: 5, efeito: "escudo_divino", img: "https://files.catbox.moe/ebt0u6.png" },
    { title: "Barreira Eletrônica", tipo: "estrutura", raridade: "comum", custo: 2, atk: 0, def: 7, efeito: "provocar", img: "https://files.catbox.moe/b097ur.png" },
    { title: "Unidade K-9 Cibernética", tipo: "automato", raridade: "comum", custo: 2, atk: 3, def: 1, efeito: "investida", img: "https://files.catbox.moe/lc3rez.png" },
    { title: "Interceptor de Zeus", tipo: "automato", raridade: "comum", custo: 2, atk: 2, def: 3, efeito: "provocar", img: "https://files.catbox.moe/05e01v.png" },
    { title: "Cobaia Estágio 1", tipo: "tropa", raridade: "rara", custo: 4, atk: 3, def: 6, efeito: "provocar", img: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png" },
    { title: "Sobrevivente Rebelde", tipo: "tropa", raridade: "rara", custo: 4, atk: 5, def: 2, efeito: "ataque_duplo", img: "https://i.postimg.cc/bNQHh5Xx/Sobrevivente-Rebelde.png" },
    { title: "Exoesqueleto Mk.II", tipo: "tropa", raridade: "rara", custo: 6, atk: 5, def: 5, efeito: "nenhum", img: "https://i.postimg.cc/qMfXWTFQ/Exoesqueleto-Mk-II.png" },
    { title: "Médico de Combate", tipo: "tropa", raridade: "rara", custo: 3, atk: 1, def: 4, efeito: "cura_turno", img: "https://i.postimg.cc/65sLFXPh/Medico-de-Combate.png" },
    { title: "Mutante Instável", tipo: "tropa", raridade: "rara", custo: 5, atk: 4, def: 5, efeito: "regeneracao", img: "https://i.postimg.cc/mg1SnrL7/Mutante-Instavel.png" },
    { title: "Hacker do Mainframe", tipo: "humano", raridade: "rara", custo: 4, atk: 2, def: 2, efeito: "roubo_energia", img: "https://files.catbox.moe/tl6rvy.png" },
    { title: "Blindado de Transporte", tipo: "mecanizado", raridade: "rara", custo: 5, atk: 3, def: 8, efeito: "evocar_recruta", img: "https://files.catbox.moe/997fyd.png" },
    { title: "Quimera Alada", tipo: "tropa", raridade: "epica", custo: 4, atk: 3, def: 4, efeito: "furia", img: "https://i.postimg.cc/mrcscCyq/Quimera-Alada.png" },
    { title: "Ceifador da Unidade", tipo: "tropa", raridade: "epica", custo: 6, atk: 6, def: 5, efeito: "roubo_vida", img: "https://i.postimg.cc/pLcvXqzj/Ceifador-da-Unidade.png" },
    { title: "Sentinela Ômega", tipo: "tropa", raridade: "epica", custo: 7, atk: 5, def: 7, efeito: "escudo", img: "https://i.postimg.cc/q7tTtyx1/Sentinela-Omega.png", som_ataque: "https://files.catbox.moe/5nlm3z.wav" },
    { title: "Projeto Zeus: Alfa", tipo: "tropa", raridade: "lendaria", custo: 8, atk: 8, def: 8, efeito: "nenhum", img: "https://i.postimg.cc/0yXv2cDX/Projeto-Zeus-Alfa.png" },
    { title: "General Mão de Ferro", tipo: "humano", raridade: "lendaria", custo: 7, atk: 6, def: 7, efeito: "aura_defesa", img: "https://files.catbox.moe/wkfzj3.png" },
    { title: "O Punho da Resistência", tipo: "mecanizado", raridade: "lendaria", custo: 7, atk: 7, def: 7, efeito: "furia", img: "https://files.catbox.moe/nuxefh.png" },
    { title: "Pacificador V.9", tipo: "mecanizado", raridade: "lendaria", custo: 8, atk: 9, def: 9, efeito: "anular_efeito", img: "https://files.catbox.moe/7cjywl.png" },
    { title: "Enxame de Nanobots", tipo: "automato", raridade: "rara", custo: 4, atk: 2, def: 2, efeito: "sinergia_automato", text: "Ganha +1/+1 por Autômato.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKmEat6w4aafi5kCkFL9_gVZvCcdfsufUR6A&s" },
    { title: "Esquadrão Tático", tipo: "humano", raridade: "comum", custo: 4, atk: 3, def: 2, efeito: "tropa_coordenada", text: "Invoca Aegis ou +1/+1.", img: "https://files.catbox.moe/vynjlp.png" }, 
    { title: "Clone Instável", tipo: "tropa", raridade: "comum", custo: 0, atk: 2, def: 1, efeito: "provocar", img: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png" },
    { title: "Kit Médico Tático", tipo: "feitico", raridade: "comum", custo: 1, atk: 0, def: 0, efeito: "cura_3", img: "https://i.postimg.cc/DyqdTNV5/Kit-Medico-Tatico.png" },
    { title: "Sobrecarga de Sistema", tipo: "feitico", raridade: "comum", custo: 1, atk: 0, def: 0, efeito: "dano_2", text: "Causa 2 de dano a uma unidade.", img: "https://i.postimg.cc/B6WDKkNS/Sobrecarga-de-Sistema.png" },
    { title: "Hack de Sobrecarga", tipo: "feitico", raridade: "rara", custo: 3, atk: 0, def: 0, efeito: "dano_4", img: "https://files.catbox.moe/tl6rvy.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Colete de Kevlar", tipo: "equipamento", raridade: "comum", custo: 1, atk: 0, def: 2, efeito: "nenhum", text: "Concede +2 de HP.", img: "https://i.postimg.cc/Gm5vcHy5/Colete-de-klevar.png" },
    { title: "Rifle de Plasma", tipo: "equipamento", raridade: "comum", custo: 2, atk: 2, def: 0, efeito: "nenhum", text: "Concede +2 de ATK.", img: "https://i.postimg.cc/R0KzzDWy/rifle.png" },
    { title: "Chip Berserker", tipo: "equipamento", raridade: "epica", custo: 3, atk: 3, def: -3, efeito: "nenhum", text: "+3 ATK, Fúria, perde -3 HP.", img: "https://i.postimg.cc/bvkjjBGh/chip.png" },
    // UNIDADES DE ALERTA (Agentes e Resistência)
    { title: "Gladiador de Subsolo", tipo: "agente", raridade: "rara", custo: 2, atk: 2, def: 2, efeito: "sobrecarga", text: "⚡ Sobrecarga", img: "./gladiador.png" },
    { title: "Inspetor de Perimetro", tipo: "automato", raridade: "comum", custo: 1, atk: 1, def: 1, efeito: "sobrecarga", text: "⚡ Sobrecarga", img: "./drone2.png"},
    { title: "Hacker de Elite", tipo: "agente", raridade: "epica", custo: 4, atk: 3, def: 3, efeito: "sobrecarga", text: "⚡ Sobrecarga", img: "./hacker_elite.png" },
    { title: "Sentinela Corp Muralha", tipo: "automato", raridade: "rara", custo: 5, atk: 2, def: 7, efeito: "provocar", text: "⚡ Sobrecarga", img: "./muralha.png" },
    { title: "Infiltrado Fantasma", tipo: "agente", raridade: "epica", custo: 3, atk: 2, def: 2, efeito: "sobrecarga", text: "⚡ Sobrecarga", img: "./fantasma.png" },
    { title: "Propagandista Digital", tipo: "resistencia", raridade: "rara", custo: 3, atk: 1, def: 4, efeito: "sobrecarga", text: "⚡ Sobrecarga", img: "./propagandista.png" },
    { title: "Estação de Monitoramento", tipo: "estrutura", raridade: "rara", custo: 4, atk: 0, def: 5, efeito: "sobrecarga", text: "⚡ Sobrecarga", img: "./estacao.png" },

    // FEITIÇOS E EQUIPAMENTOS DE ALERTA
    //{ title: "Protocolo de Caos", tipo: "feitico", raridade: "rara", custo: 3, atk: 0, def: 0, efeito: "sobrecarga +2", text: "Aumenta sobrecarga em 2.", img: "./caos.png" },
   // { title: "Sobrecarga de BIOS", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "dano 2", text: "Causa 2 de dano.", img: "./bios.png" },
   // { title: "Silenciar Alarmes", tipo: "feitico", raridade: "comum", custo: 1, atk: 0, def: 0, efeito: "sobrecarga -2", text: "Reduza o seu sobrecarga ou o do oponente em -2.", img: "./silenciar.png" },
   // { title: "Backup de Emergência", tipo: "feitico", raridade: "epica", custo: 4, atk: 0, def: 0, efeito: "sobrecarga +5", text: "Sobe seu sobrecarga para 5.", img: "./backup.png" },
   // { title: "Blecaute Total", tipo: "feitico", raridade: "lendaria", custo: 6, atk: 0, def: 0, efeito: "sobrecarga -5", text: "Zera sobrecarga inimiga", img: "./blecaute.png" },
   // { title: "Espelho de Frequência", tipo: "feitico", raridade: "epica", custo: 7, atk: 0, def: 0, efeito: "sobrecarga-3", text: "sobrecarga -3", img: "./espelho.png" },
   // { title: "Carga de Sacrifício", tipo: "feitico", raridade: "epica", custo: 5, atk: 0, def: 0, efeito: "dano 4", text:"causa 4 de dano a uma unidade inimiga", img: "./sacrificio.png" },
    //{ title: "Amplificador de Sinal", tipo: "equipamento", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "sobrecarga", text: "Equipar: Ao final do turno, aumente seu sobrecarga em +1.", img: "./amplificador.png" }
];

// ==========================================
// 3. VARIÁVEIS GLOBAIS DE ESTADO
// ==========================================
let currentLevel = 0, playerCollection = [], customDeck = [], playerDeck = [];
let graveyard = { player: [], enemy: [] };
let playerFragments = 9999, currentSortMode = "cost";
let maxMana = 3, playerMana = 3, maxLife = 20, playerLife = 20, enemyLife = 20, currentTurn = 1;

let attackToken = "player"; // Quem ataca na rodada
let currentStep = "deploy_attacker"; // deploy_attacker -> deploy_defender -> combat
let isPlayerTurn = true; 
let selectedAttacker = null, selectedCardFromHand = null, turnTime = 80, timerInterval, gameIsOver = false, isSystemLocked = false, draggedCard = null, selectedHeroObj = null;
// Memória das correntes de Sobrecarga
let sobrecargaAtiva = { player: 0, enemy: 0 };

// ==========================================
// 4. INICIALIZAÇÃO
// ==========================================
function bootTerminal() {
    initZeusEngineScale(); 
    preloadAssets(); // CHAMA O PRELOADER!
    playerCollection = [];
    baseDeck.forEach(c => { playerCollection.push({...c}); playerCollection.push({...c}); playerCollection.push({...c}); });
    
    selectedHeroObj = { id: "COMANDANTE", imgUrl: "https://files.catbox.moe/wkfzj3.png" }; 
    const nomesDeckInicial = ["Agente Novato", "Atirador Furtivo", "Sucateiro da Zona Sul", "Segurança Aegis", "Unidade K-9 Cibernética", "Mercenário", "Médico de Combate", "Sobrevivente Rebelde", "Quimera Alada", "Exoesqueleto Mk.II", "Blindado de Transporte", "Sobrecarga de Sistema", "Kit Médico Tático", "Rifle de Plasma", "Colete de Kevlar", "Chip Berserker", "Enxame de Nanobots", "Esquadrão Tático"];
    customDeck = [];
    nomesDeckInicial.forEach(nome => { let carta = baseDeck.find(c => c.title === nome); if(carta) customDeck.push({...carta}); });

    initMultiplayer();
    
    document.getElementById("btn-start").onclick = () => { 
        if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(()=>{});
        document.getElementById("start-screen").classList.remove("active"); 
        document.getElementById("hero-screen").classList.add("active"); 
        playSound("click"); playSound("bgm"); 
        document.getElementById("fragment-count").textContent = playerFragments;
    };
    
    document.querySelectorAll(".hero-choice").forEach(choice => {
        choice.onclick = () => {
            playSound("click");
            document.querySelectorAll(".hero-choice").forEach(c => { c.classList.remove("selected"); const old = c.querySelector('.selection-particles'); if(old) old.remove(); });
            choice.classList.add("selected");
            selectedHeroObj = { id: choice.dataset.hero, imgUrl: choice.dataset.img };
            customDeck = []; nomesDeckInicial.forEach(nome => { let carta = baseDeck.find(c => c.title === nome); if(carta) customDeck.push({...carta}); });
            document.getElementById("hero-actions").style.display = "flex";
            const particleContainer = document.createElement("div"); particleContainer.className = "selection-particles";
            particleContainer.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; overflow:hidden; border-radius:inherit;";
            choice.appendChild(particleContainer);
            for (let i = 0; i < 15; i++) {
                const p = document.createElement("div");
                let size = Math.random() * 4 + 2;
                let colors = ["#ff2a2a", "#ff9900", "#ffffff"]; 
                if (choice.classList.contains("ESTRATEGISTA")) colors = ["#00ffff", "#3399ff", "#ffffff"];
                if (choice.classList.contains("BIOMEDICO")) colors = ["#00ff66", "#00cc66", "#ffffff"];
                const color = colors[Math.floor(Math.random() * colors.length)];
                p.style.cssText = `position:absolute; width:${size}px; height:${size}px; background:${color}; box-shadow:0 0 8px ${color}; border-radius:50%; bottom:5%; left:${Math.random() * 100}%; opacity:${Math.random() * 0.8 + 0.2};`;
                particleContainer.appendChild(p);
                gsap.to(p, { y: -(Math.random() * 150 + 50), x: (Math.random() * 30 - 15), scale: Math.random() * 0.6 + 0.8, opacity: 0, repeat: -1, duration: Math.random() * 1.5 + 1.5, ease: "sine.inOut" });
            }
        }; 
    }); 

    document.getElementById("btn-start-battle-direct").onclick = () => { playSound("click"); document.getElementById("mode-selection-modal").classList.add("active"); };
    document.getElementById("btn-cancel-mode").onclick = () => { playSound("click"); document.getElementById("mode-selection-modal").classList.remove("active"); };
    const btnModeStory = document.getElementById("btn-mode-story");
    if(btnModeStory) { btnModeStory.onclick = () => { playSound("click"); document.getElementById("mode-selection-modal").classList.remove("active"); currentLevel = 0; startCampaignScene(); }; }
    
    document.getElementById("btn-cancel-arena").onclick = () => { playSound("click"); document.getElementById("arena-selection-modal").classList.remove("active"); };
    document.getElementById("btn-mode-casual").onclick = () => { playSound("click"); document.getElementById("mode-selection-modal").classList.remove("active"); document.getElementById("arena-selection-modal").classList.add("active"); };
    document.querySelectorAll(".btn-arena").forEach(btn => {
        btn.onclick = () => { playSound("click"); document.getElementById("arena-selection-modal").classList.remove("active"); startGameDirect("casual", btn.getAttribute("data-arena")); };
    });
    document.getElementById("btn-edit-deck").onclick = () => { document.getElementById("hero-screen").classList.remove("active"); document.getElementById("deck-builder-screen").classList.add("active"); initDeckBuilder(); };
    
    const actionBtn = document.getElementById("actionBtn"); if(actionBtn) actionBtn.onclick = handleActionBtn;
    const btnHome = document.getElementById("btn-home"); if(btnHome) btnHome.onclick = () => { playSound("click"); location.reload(); };

    document.getElementById("board").onclick = (e) => {
        if (!e.target.closest('.slot') && !e.target.closest('.card-base') && !e.target.closest('.hero-panel') && !e.target.closest('.hero-panel-game')) {
            if(selectedCardFromHand) { selectedCardFromHand.classList.remove("deployment-selected"); selectedCardFromHand = null; arrangeHand(); }
            if(selectedAttacker) { selectedAttacker.classList.remove("attacker-selected"); selectedAttacker = null; }
        }
    };
   
    const btnMarket = document.getElementById("btn-market"); 
    if(btnMarket) { btnMarket.onclick = () => { playSound("click"); document.querySelectorAll(".screen").forEach(s => s.classList.remove("active")); document.getElementById("market-screen").classList.add("active"); initMarket(); }; }
    const btnBackMarket = document.getElementById("btn-back-market"); 
    if(btnBackMarket) { btnBackMarket.onclick = () => { playSound("click"); document.getElementById("market-screen").classList.remove("active"); document.getElementById("hero-screen").classList.add("active"); }; }

    const btnGrave = document.getElementById("btn-graveyard");
    if(btnGrave) {
        btnGrave.onclick = () => {
            playSound("click"); const grid = document.getElementById("graveyard-grid");
            if(grid) {
                grid.innerHTML = "";
                graveyard.player.forEach(cData => {
                    const el = createCard(cData); el.style.position = "relative"; el.style.transform = "scale(0.85)"; el.onclick = null; el.ondragstart = null; grid.appendChild(el);
                });
                document.getElementById("graveyard-modal").classList.add("active");
            }
        };
    }
} 

// ==========================================
// 5. DECK BUILDER E MERCADO NEGRO
// ==========================================
function initDeckBuilder() {
    document.getElementById("sort-cost").onclick = () => { currentSortMode = "cost"; renderVitrine(); playSound("click"); };
    document.getElementById("sort-rarity").onclick = () => { currentSortMode = "rarity"; renderVitrine(); playSound("click"); };
    document.getElementById("sort-type").onclick = () => { currentSortMode = "type"; renderVitrine(); playSound("click"); };
    document.getElementById("btn-close-inspect").onclick = () => { playSound("click"); document.getElementById("inspect-modal").classList.remove("active"); };
    let toolbar = document.querySelector(".toolbar");
    if(toolbar && !document.getElementById("btn-random-deck")) {
        let btnRand = document.createElement("button"); btnRand.id = "btn-random-deck"; btnRand.className = "cmd-btn sort-btn";
        btnRand.style.borderColor = "#00ff00"; btnRand.style.color = "#00ff00"; btnRand.innerText = "🎲 ALEATÓRIO";
        btnRand.onclick = () => { playSound("click"); customDeck = []; let pool = [...playerCollection]; for(let i = pool.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; } for(let c of pool) { if(customDeck.length >= 15) break; if(customDeck.filter(x => x.title === c.title).length < 3) customDeck.push({...c}); } updateDeckUI(); };
        toolbar.appendChild(btnRand);
    }
    renderVitrine();
    document.getElementById("btn-back-from-deck").onclick = () => { playSound("click"); document.getElementById("deck-builder-screen").classList.remove("active"); document.getElementById("hero-screen").classList.add("active"); };
}

function renderVitrine() {
    const poolGrid = document.getElementById("card-pool-grid"); if(!poolGrid) return; poolGrid.innerHTML = "";
    let uniqueCards = []; playerCollection.forEach(card => { if(!uniqueCards.find(c => c.title === card.title)) uniqueCards.push(card); });
    uniqueCards.sort((a, b) => { if (currentSortMode === "cost") return a.custo - b.custo; if (currentSortMode === "type") return a.tipo.localeCompare(b.tipo); const peso = { "comum": 1, "rara": 2, "epica": 3, "lendaria": 4 }; return peso[b.raridade] - peso[a.raridade]; });
    uniqueCards.forEach(card => { const div = document.createElement("div"); div.className = `pool-card ${card.raridade}`; div.innerHTML = `<div class="inspect-btn" title="Inspecionar">👁️</div><img src="${card.img}" class="pool-img"><div class="pool-info"><div class="pool-title">${card.title}</div><div class="pool-cost">${card.custo}⚡</div></div>`; div.onclick = (e) => { if(e.target.classList.contains("inspect-btn")) openInspectModal(card); else addCardToDeck(card); }; poolGrid.appendChild(div); });
    updateDeckUI();
}

function openInspectModal(cardData) {
    playSound("click"); const container = document.getElementById("inspect-card-container"); if(!container) return; container.innerHTML = ""; const visualCard = createCard(cardData); visualCard.onclick = null; visualCard.ondragstart = null; visualCard.style.position = "relative"; visualCard.style.cursor = "default"; container.appendChild(visualCard); document.getElementById("inspect-modal").classList.add("active");
}

function addCardToDeck(card) { if (customDeck.length < 15) { if (customDeck.filter(c => c.title === card.title).length < 3) { customDeck.push({...card}); updateDeckUI(); } else { playSound("error"); alert("Máximo de 3 cópias iguais no deck."); } } }
function removeCardFromDeck(index) { customDeck.splice(index, 1); updateDeckUI(); }

function updateDeckUI() {
    const deckList = document.getElementById("current-deck-list"); if(!deckList) return; deckList.innerHTML = ""; customDeck.sort((a,b) => a.custo - b.custo);
    customDeck.forEach((card, index) => { const d = document.createElement("div"); d.className="deck-item"; d.innerHTML=`<span>${card.title}</span> <span style="color:cyan">${card.custo}⚡</span>`; d.onclick=()=>removeCardFromDeck(index); deckList.appendChild(d); });
    document.getElementById("deck-count").innerText = `${customDeck.length}/15`;
    const btnStart = document.getElementById("btn-start-battle");
    if(btnStart) { btnStart.style.display = (customDeck.length === 15) ? "block" : "none"; btnStart.onclick = () => { playSound("click"); document.getElementById("deck-builder-screen").classList.remove("active"); startGameDirect("casual", "theme-lab"); }; }
}

function initMarket() {
    const grid = document.getElementById("market-grid"); if(!grid) return; grid.innerHTML = "";
    baseDeck.forEach(card => {
        const copies = playerCollection.filter(c => c.title === card.title).length; const div = document.createElement("div"); div.className = `pool-card ${copies > 0 ? card.raridade : 'comum'}`;
        div.innerHTML = `<div class="copies-badge" style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.9); color: cyan; font-size: 0.8rem; font-weight: bold; padding: 3px 8px; border: 1px solid cyan; border-radius: 4px; z-index: 5;">x${copies}</div><img src="${card.img}" class="pool-img" style="filter: grayscale(${copies > 0 ? 0 : 1}) contrast(1.2); opacity: ${copies > 0 ? 1 : 0.4};"><div class="pool-info"><div class="pool-title" style="color: ${copies > 0 ? '#fff' : '#555'};">${card.title}</div><div class="pool-cost" style="color: ${copies > 0 ? '#00ffff' : '#444'};">${card.custo}⚡</div></div>`;
        div.onclick = () => { playSound("click"); openMarketModal(card, copies); }; grid.appendChild(div);
    });
}

function openMarketModal(card, copies) {
    document.getElementById("transact-title").innerText = card.title; document.getElementById("transact-copies").innerText = copies; document.getElementById("transaction-modal").classList.add("active");
    const custo = card.raridade === 'lendaria' ? 500 : (card.raridade === 'epica' ? 200 : (card.raridade === 'rara' ? 100 : 50));
    document.getElementById("btn-buy-card").innerText = `COMPRAR (${custo}💽)`;
    document.getElementById("btn-buy-card").onclick = () => { if(playerFragments >= custo) { playerFragments -= custo; playerCollection.push({...card}); initMarket(); openMarketModal(card, copies+1); playSound("deploy"); document.getElementById("fragment-count").textContent = playerFragments; } else { playSound("error"); alert("HDs INSUFICIENTES"); } };
    document.getElementById("btn-sell-card").innerText = `VENDER (+${custo/5}💽)`;
    document.getElementById("btn-sell-card").onclick = () => { if(copies > 0) { playerFragments += custo/5; const idx = playerCollection.findIndex(c => c.title === card.title); if(idx > -1) playerCollection.splice(idx,1); initMarket(); openMarketModal(card, copies-1); playSound("click"); document.getElementById("fragment-count").textContent = playerFragments; } };
    
    // 🚨 A CHAVE QUE FALTAVA ERA AQUI!
    document.getElementById("btn-close-transaction").onclick = () => document.getElementById("transaction-modal").classList.remove("active");
}

// ==========================================
// 6. STATUS, SINERGIAS E EFEITOS
// ==========================================
function recalculateStats(c) {
    let eqBaseAtk = parseInt(c.dataset.equipBaseAtk) || 0;
    let eqBaseHp = parseInt(c.dataset.equipBaseHp) || 0;
    
    let baseAtk = parseInt(c.dataset.baseAtk) || 0; let baseHp = parseInt(c.dataset.baseHp) || 0; let damageTaken = parseInt(c.dataset.damageTaken) || 0; 
    let auAtk = parseInt(c.dataset.auraAtk) || 0; let auHp = parseInt(c.dataset.auraHp) || 0;
    
    let finalAtk = baseAtk + eqBaseAtk + auAtk; let maxHp = baseHp + eqBaseHp + auHp; let currentHp = maxHp - damageTaken;
    c.dataset.attack = finalAtk; c.dataset.hp = currentHp; 
    
    const atkNode = c.querySelector(".stat-atk"); const defNode = c.querySelector(".stat-def"); if(atkNode) atkNode.innerText = finalAtk > 0 ? finalAtk : 0; if(defNode) defNode.innerText = currentHp;
    let activeEffect = c.dataset.equipEffect || c.dataset.originalEffect; c.dataset.effect = activeEffect; 
    
    c.classList.remove("taunt-card", "double-attack-card", "lifesteal-card", "shield-card", "stealth-card", "fury-card");
    if (activeEffect === "provocar" || c.classList.contains("aura-taunt")) c.classList.add("taunt-card"); 
    if (activeEffect === "ataque_duplo") c.classList.add("double-attack-card");
    if (activeEffect === "roubo_vida") c.classList.add("lifesteal-card"); 
    if (activeEffect === "escudo_divino" && !c.dataset.shieldBroken) c.classList.add("shield-card"); 
    if (activeEffect === "furtividade") c.classList.add("stealth-card"); 
    if (activeEffect === "furia") c.classList.add("fury-card");
    
    if (c.dataset.type !== "feitico" && currentHp <= 0 && c.dataset.dead !== "true") { 
        c.dataset.dead = "true"; 
        processCardEffect("UltimoSuspiro", c, c.parentElement.dataset.owner); 
        if(window.VFX && window.VFX.death) VFX.death(c); else c.remove(); 
        setTimeout(updateAuras, 300); 
    }
}

function updateAuras() {
    ;["player-field", "enemy-field"].forEach(f => {
        const field = document.getElementById(f); if(!field) return;
        const owner = f.split("-")[0];
        const cards = Array.from(field.querySelectorAll('.card-base')); 
        
        cards.forEach(c => { c.dataset.auraAtk = 0; c.dataset.auraHp = 0; c.classList.remove("aura-taunt"); });
        const temGeneral = cards.some(c => c.dataset.name === "General Mão de Ferro" && c.dataset.dead !== "true");

        const tropasSobrecarga = cards.filter(c => {
            let ef = c.dataset.effect || c.dataset.originalEffect || "";
            return ef.includes("sobrecarga") && c.dataset.dead !== "true" && c.dataset.type !== "feitico";
        });
        
        let nivelSobrecarga = tropasSobrecarga.length;
        sobrecargaAtiva[owner] = nivelSobrecarga; 

        cards.forEach(c => {
            if (c.dataset.dead === "true" || c.dataset.type === "feitico") return;
            let aAtk = 0; let aHp = 0; 
            
            if (temGeneral && c.dataset.name !== "General Mão de Ferro") { aHp += 2; c.classList.add("aura-taunt"); }
            
            let ef = c.dataset.effect || c.dataset.originalEffect || "";
            if (nivelSobrecarga === 5 && ef.includes("sobrecarga")) {
                aAtk += 5;
                aHp += 5;
                if(window.VFX && window.VFX.pulse && !c.dataset.pulsingSobrecarga) {
                    c.dataset.pulsingSobrecarga = "true";
                    VFX.pulse(c, "#00ffff", 1.2, 2000); 
                }
            } else {
                c.dataset.pulsingSobrecarga = ""; 
            }

            c.dataset.auraAtk = aAtk; c.dataset.auraHp = aHp; recalculateStats(c);
        });
    });

    atualizarHudSobrecarga();
} // 🚨 A CHAVE DO UPDATEAURAS ESTÁ AQUI

function atualizarHudSobrecarga() {
    let sbHud = document.getElementById("sobrecarga-hud");
    if (!sbHud) {
        sbHud = document.createElement("div");
        sbHud.id = "sobrecarga-hud";
        sbHud.style.cssText = "position:absolute; right: 20px; top: 35%; transform:translateY(-50%); background:rgba(10,5,5,0.9); border:2px solid #ff3300; padding:10px; color:#ff3300; font-family:'Courier New', monospace; font-weight:bold; box-shadow:0 0 15px rgba(255,0,0,0.5); border-radius:5px; z-index:50; text-align:center; pointer-events:none; transition: all 0.3s ease;";
        document.body.appendChild(sbHud);
    }

    if (sobrecargaAtiva.player > 0 || sobrecargaAtiva.enemy > 0) {
        sbHud.style.display = "block";
        
        let pText = sobrecargaAtiva.player === 5 ? "MAX (BÔNUS ATIVO!)" : `${sobrecargaAtiva.player}/5`;
        let eText = sobrecargaAtiva.enemy === 5 ? "MAX (BÔNUS ATIVO!)" : `${sobrecargaAtiva.enemy}/5`;
        let pColor = sobrecargaAtiva.player === 5 ? "#00ffff" : "#ff3300";
        let eColor = sobrecargaAtiva.enemy === 5 ? "#00ffff" : "#ff3300";

        sbHud.innerHTML = `<div style="color:#fff; margin-bottom:8px;">⚠️ NÍVEL DE SOBRECARGA ⚠️</div>
                           <div style="color:${pColor}; text-shadow:0 0 5px ${pColor};">Sua Tropa: ${pText}</div>
                           <div style="color:${eColor}; text-shadow:0 0 5px ${eColor};">Inimiga: ${eText}</div>`;

        if(sobrecargaAtiva.player === 5 || sobrecargaAtiva.enemy === 5) {
            sbHud.style.borderColor = "#00ffff";
            sbHud.style.boxShadow = "0 0 25px rgba(0,255,255,0.8)";
        } else {
            sbHud.style.borderColor = "#ff3300";
            sbHud.style.boxShadow = "0 0 15px rgba(255,0,0,0.5)";
        }
    } else {
        sbHud.style.display = "none";
    }
}

function getCardDesc(item) {
    if (item.text) return item.text; let eff = item.efeito; if (!eff || eff === "nenhum") return "";
    const dict = { "sobrecarga": "⚡ Sobrecarga: Com 5 no campo, todas ganham +5/+5.", "provocar": "🛡️ Provocar: Inimigos devem atacar esta unidade.", "ataque_duplo": "⚔️ Ataque Duplo: Pode atacar 2 vezes.", "roubo_vida": "❤️ Roubo de Vida.", "escudo_divino": "🔰 Escudo Divino.", "escudo": "🔰 Escudo.", "furtividade": "🥷 Furtividade.", "voar": "🦅 Voar.", "regeneracao": "🧬 Regeneração 1.", "cura_turno": "💉 Cura 1 HP do Herói.", "reciclar": "♻️ Reciclar.", "investida": "⚡ Ataque Rápido.", "ataque_rapido": "⚡ Ataque Rápido.", "atordoar": "🔌 Atordoar.", "dano_area": "💥 Dano em Área." };
    return dict[eff] || `Efeito: ${eff.replace(/_/g, ' ').toUpperCase()}`;
}

function createCard(item) { 
    if(!item) return document.createElement("div"); 
    let isSpell = (item.tipo === 'feitico'); let isEquip = (item.tipo === 'equipamento'); let baseClass = (isSpell || isEquip) ? "feitico" : "tropa"; 
    const c = document.createElement("div"); c.className = `card-base ${item.raridade || 'comum'} ${baseClass}`;
    let safeAtk = Number(item.atk)||0; let safeDef = Number(item.def)||0; let safeCost = Number(item.custo)||0;
    
    c.dataset.baseAtk = safeAtk; c.dataset.baseHp = safeDef; c.dataset.baseCost = safeCost; c.dataset.damageTaken = 0; c.dataset.equipBaseAtk = 0; c.dataset.equipBaseHp = 0; c.dataset.auraAtk = 0; c.dataset.auraHp = 0; c.dataset.originalEffect = item.efeito; c.dataset.equipEffect = "";
    c.draggable = true; c.dataset.name = item.title; c.dataset.attack = safeAtk; c.dataset.hp = safeDef; c.dataset.cost = safeCost; c.dataset.type = baseClass; c.dataset.raca = item.tipo; c.dataset.effect = item.efeito; c.dataset.hasAttacked = "false";
    let typeIcon = "⚔️"; if(["mecanizado","drone","ciborgue", "automato"].includes(item.tipo)) typeIcon = "⚙️"; if(["humano","medico","soldado"].includes(item.tipo)) typeIcon = "🧬"; if(item.tipo === "estrutura") typeIcon = "🏗️"; if(isSpell) typeIcon = "💣"; if(isEquip) typeIcon = "🎒"; 
    let starsCount = item.raridade === "lendaria" ? 5 : (item.raridade === "epica" ? 3 : (item.raridade === "rara" ? 2 : 1)); let starsHTML = '<div class="card-stars">'; for(let i=0; i<starsCount; i++) starsHTML += '<div class="star">★</div>'; starsHTML += '</div>';
    let statsHTML = !(isSpell || isEquip) ? `<div class="card-stats"><div class="stat-badge stat-atk">${safeAtk}</div><div class="stat-badge stat-def">${safeDef}</div></div>` : `<div class="card-stats"><div class="stat-badge stat-atk" style="background:#b0279b; font-size:0.6rem;">${isEquip ? 'EQP' : 'MAG'}</div></div>`;
    let cardDescription = getCardDesc(item); let descHTML = cardDescription ? `<div class="card-body"><div class="card-text">${cardDescription}</div></div>` : "";
    c.innerHTML = `<div class="card-title">${item.title}</div><div class="card-art-box"><img src="${item.img || ''}" class="card-art" draggable="false"></div><div class="card-type-icon">${typeIcon}</div>${starsHTML}${descHTML}${statsHTML}<div class="card-cost">${safeCost}</div>`;
    
    let pressTimer; 
    c.onmouseenter = () => { 
        if(c.parentElement && c.parentElement.id === "hand" && !draggedCard && !selectedCardFromHand) { 
            gsap.to(c, { y: -40, scale: 0.85, zIndex: 100, duration: 0.2 }); 
        } 
    };
    c.onmouseleave = () => { 
        clearTimeout(pressTimer); 
        if(c.parentElement && c.parentElement.id === "hand" && !draggedCard && selectedCardFromHand !== c) { 
            gsap.to(c, { y: 0, scale: 0.7, zIndex: c.dataset.origZ, duration: 0.2 }); 
        } 
    };
    c.onclick = handleCardClick; 
    c.oncontextmenu = (e) => { e.preventDefault(); openInspectModal(item); };
    c.ontouchstart = () => { pressTimer = setTimeout(() => { openInspectModal(item); }, 500); };
    c.ontouchend = () => { clearTimeout(pressTimer); };

    c.ondragstart = (e) => { e.dataTransfer.setData('text/plain', 'carta'); if(isSystemLocked || c.parentElement.id !== "hand") { e.preventDefault(); return; } if(isSpell || isEquip) { e.preventDefault(); playSound("error"); alert("SISTEMA: Clique na carta na mão e depois no alvo."); return; } draggedCard = c; };
    c.ondragend = () => { if (draggedCard) draggedCard = null; }; recalculateStats(c); return c; 
}

// ==========================================
// 7. SISTEMA DE CLIQUES E EFEITOS
// ==========================================
function handleCardClick(e) {
    if(isSystemLocked) return; 
    const c = e.currentTarget; const p = c.parentElement; 
    const isSpellSelected = selectedCardFromHand && selectedCardFromHand.dataset.raca === "feitico";
    const isEquipSelected = selectedCardFromHand && selectedCardFromHand.dataset.raca === "equipamento";

    if(p.id === "hand"){ 
        playSound("click"); 
        if(selectedCardFromHand === c){ 
            selectedCardFromHand = null; 
            c.classList.remove("deployment-selected"); 
            arrangeHand(); 
        } 
        else { 
            if(selectedCardFromHand) selectedCardFromHand.classList.remove("deployment-selected"); 
            selectedCardFromHand = c; 
            c.classList.add("deployment-selected"); 
            gsap.to(c, { scale: 0.10, y: -20, rotation: 0, zIndex: 100, duration: 0.3, ease: "back.out(1.7)" }); 
            arrangeHand(c); 
        } 
    } 
    else if (isSpellSelected) { executeSpell(selectedCardFromHand, c, p.dataset.owner); }
    else if (isEquipSelected) { executeEquip(selectedCardFromHand, c, p.dataset.owner); }
    else if(p.dataset.owner === "player" && currentStep === "combat" && attackToken === "player"){ 
        if(c.dataset.hasAttacked === "true" || c.classList.contains("exhausted")) { playSound("error"); return; }
        
        if(selectedAttacker === c) { 
            selectedAttacker = null; 
            c.classList.remove("attacker-selected"); 
            gsap.to(c, { scale: 0.60, y: 0, duration: 0.2, zIndex: 10 }); 
        } 
        else { 
            if(selectedAttacker) {
                selectedAttacker.classList.remove("attacker-selected"); 
                gsap.to(selectedAttacker, { scale: 0.60, y: 0, duration: 0.2, zIndex: 10 }); 
            }
            selectedAttacker = c; 
            c.classList.add("attacker-selected"); 
            playSound("click"); 
            gsap.to(c, { scale: 0.68, y: -20, duration: 0.2, ease: "back.out(2)", zIndex: 100 }); 
        } 
    }
    else if(p.dataset.owner === "enemy" && selectedAttacker){ 
        const taunts = document.getElementById("enemy-field").querySelectorAll('.taunt-card');
        if (taunts.length > 0 && !c.classList.contains('taunt-card')) { playSound("error"); alert("ALVO INVÁLIDO! Há inimigos com Provocar na frente."); return; }
        let attacker = selectedAttacker; selectedAttacker = null; attacker.classList.remove("attacker-selected");
        resolveCombat(attacker, c, true); 
    } 
}

function handleHeroClick(heroElement, owner) {
    if (isSystemLocked) return;
    const isSpellSelected = selectedCardFromHand && selectedCardFromHand.dataset.raca === "feitico";
    if (isSpellSelected) { executeSpell(selectedCardFromHand, heroElement, owner); } 
    else if (selectedAttacker && owner === "enemy" && currentStep === "combat" && attackToken === "player") {
        const taunts = document.getElementById("enemy-field").querySelectorAll('.taunt-card');
        if (taunts.length > 0) { playSound("error"); alert("ALVO INVÁLIDO! Destrua as tropas com Provocar primeiro."); return; }
        let attacker = selectedAttacker; selectedAttacker = null; attacker.classList.remove("attacker-selected");
        resolveCombat(attacker, heroElement, true);
    }
}

function executeEquip(equipCard, targetElement, targetOwner) {
    if (currentStep === "combat") { playSound("error"); alert("Apenas Fase de Deploy."); return; }
    if (targetOwner !== "player" && !(window.conexao && window.conexao.open)) { playSound("error"); alert("Equipe suas tropas!"); return; } 
    if (targetElement.id.includes("hero")) { playSound("error"); alert("Heróis não usam equipamentos!"); return; }
    const cost = parseInt(equipCard.dataset.cost) || 0;
    
    if (equipCard.parentElement && equipCard.parentElement.id === "hand") {
        if (playerMana < cost) { playSound("error"); alert("RAM INSUFICIENTE!"); return; }
        playerMana -= cost; updateLifeAndMana();
        if(window.conexao && window.conexao.open) { let slotIndex = Array.from(targetElement.parentElement.parentElement.children).indexOf(targetElement.parentElement); window.enviarPacote({ acao: "JOGAR_EQUIPAMENTO", cardName: equipCard.dataset.name, slotIndex: slotIndex }); }
        equipCard.remove(); arrangeHand(); selectedCardFromHand = null; draggedCard = null;
    }
    playSound("deploy"); 
    
    let novoAtk = parseInt(equipCard.dataset.baseAtk) || 0;
    let novoHp = parseInt(equipCard.dataset.baseHp) || 0;
    
    targetElement.dataset.equipBaseAtk = (parseInt(targetElement.dataset.equipBaseAtk) || 0) + novoAtk; 
    targetElement.dataset.equipBaseHp = (parseInt(targetElement.dataset.equipBaseHp) || 0) + novoHp; 
    
    if(equipCard.dataset.effect && equipCard.dataset.effect !== "nenhum") {
        targetElement.dataset.equipEffect = equipCard.dataset.effect; 
    }
    
    let namePlate = targetElement.querySelector(".card-title"); if(namePlate) namePlate.style.color = "#ff00ff"; if(window.VFX && window.VFX.pulse) VFX.pulse(targetElement, "#ff00ff"); recalculateStats(targetElement); updateAuras();
}

function executeSpell(spellCard, targetElement, targetOwner) {
    if (currentStep === "combat") { playSound("error"); alert("Magias na Fase de Deploy."); return; }
    if (targetElement.dataset && targetElement.dataset.effect === "furtividade") { playSound("error"); alert("ALVO FURTIVO!"); return; }
    const cost = parseInt(spellCard.dataset.cost) || 0; let isLocalCaster = spellCard.parentElement && spellCard.parentElement.id === "hand";

    if (isLocalCaster) {
        if (playerMana < cost) { playSound("error"); alert("RAM INSUFICIENTE!"); return; }
        const efeito = spellCard.dataset.effect;
        if (efeito.includes("cura") && targetOwner !== "player") { playSound("error"); alert("Apenas em aliados!"); return; }
        if (efeito.includes("dano") && !efeito.includes("area") && !efeito.includes("total") && targetOwner !== "enemy") { playSound("error"); alert("Apenas em inimigos!"); return; }

        playerMana -= cost; updateLifeAndMana(); 
        if (window.conexao && window.conexao.open) { let tType = targetElement.id.includes("hero") ? "hero" : "card"; let dSlot = null; if (tType === "card") dSlot = Array.from(targetElement.parentElement.parentElement.children).indexOf(targetElement.parentElement); window.enviarPacote({ acao: "LANCAR_MAGIA", cardName: spellCard.dataset.name, targetOwner: targetOwner, targetType: tType, defSlot: dSlot }); }
        spellCard.remove(); arrangeHand(); selectedCardFromHand = null; draggedCard = null;
    }
    if(spellCard.dataset.somDrop) { let d = new Audio(spellCard.dataset.somDrop); d.play().catch(()=>{}); } else { playSound("hit"); }
    const efeito = spellCard.dataset.effect;

    if(efeito === "dano_total" || efeito === "dano_area") { document.getElementById(isLocalCaster ? "enemy-field" : "player-field").querySelectorAll('.card-base').forEach(inimigo => applyDamage(inimigo, 3)); if(efeito === "dano_total") { if(isLocalCaster) enemyLife -= 4; else playerLife -= 4; } screenShake(); } else if (efeito.includes("dano_")) { let dmg = parseInt(efeito.split("_")[1]) || 0; if(targetElement.id.includes("hero")) { if(targetElement.id === "enemy-hero") enemyLife -= dmg; else playerLife -= dmg; if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(targetElement, "#ff0000"); } else { applyDamage(targetElement, dmg); } screenShake(); } else if (efeito.includes("cura_")) { let heal = parseInt(efeito.split("_")[1]) || 0; if(targetElement.id.includes("hero")) { if(targetElement.id === "player-hero") playerLife += heal; else enemyLife += heal; if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(targetElement, "#00ff00"); } else { targetElement.dataset.damageTaken = Math.max(0, (parseInt(targetElement.dataset.damageTaken) || 0) - heal); recalculateStats(targetElement); if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(targetElement, "#00ff00"); } } else if (efeito === "atordoar" && !targetElement.id.includes("hero")) { targetElement.classList.add("exhausted"); targetElement.dataset.hasAttacked = "true"; if(window.VFX && window.VFX.stun) VFX.stun(targetElement); }
    checkGameOver(); updateLifeAndMana(); 
}

function processCardEffect(gatilho, cartaObj, owner) {
    const efeito = cartaObj.dataset.effect || cartaObj.dataset.originalEffect; 
    const isPlayer = owner === "player";

    if (gatilho === "AoJogar") {
        if (efeito === "reciclar" && isPlayer && graveyard.player.length > 0) { 
            let revivida = graveyard.player.pop(); updateLifeAndMana(); 
            let novaCarta = createCard(revivida); document.getElementById("hand").appendChild(novaCarta); 
            gsap.fromTo(novaCarta, { y: 200, scale: 0.2, opacity: 0 }, { y: 0, scale: 0.7, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }); 
            if(typeof arrangeHand === "function") arrangeHand(); playSound("deploy"); 
        }
        
        if (efeito === "atordoar") { 
            const targets = document.getElementById(isPlayer ? "enemy-field" : "player-field").querySelectorAll('.card-base'); 
            if(targets.length > 0) { 
                const t = targets[Math.floor(Math.random() * targets.length)]; t.classList.add("exhausted"); t.dataset.hasAttacked = "true"; if(window.VFX && window.VFX.stun) VFX.stun(t); 
            } 
        }
        
        if (efeito === "roubo_energia" && isPlayer) { 
            enemyLife -= 1; updateLifeAndMana(); if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(document.getElementById("enemy-hero"), "#ff00ff"); 
        }
        
        const field = document.getElementById(isPlayer ? "player-field" : "enemy-field");
        
        if (efeito === "tropa_coordenada") {
            const emptySlots = Array.from(field.children).filter(s => !s.querySelector('.card-base'));
            if (emptySlots.length > 0) { 
                const recruta = createCard(baseDeck.find(c => c.title === "Segurança Aegis")); 
                recruta.dataset.owner = owner; emptySlots[0].appendChild(recruta); 
                gsap.set(recruta, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0 }); 
                recruta.dataset.hasAttacked = "false"; recruta.classList.remove("exhausted"); 
                if(window.VFX && window.VFX.onSummon) VFX.onSummon(recruta, "provocar"); playSound("deploy"); 
            } 
            else { 
                cartaObj.dataset.baseAtk = (parseInt(cartaObj.dataset.baseAtk) || 0) + 1; 
                cartaObj.dataset.baseHp = (parseInt(cartaObj.dataset.baseHp) || 0) + 1; 
                recalculateStats(cartaObj); if(window.VFX && window.VFX.pulse) VFX.pulse(cartaObj, "#00ff00"); playSound("hit"); 
            }
        }
        
        const racasMaquinas = ["automato", "mecanizado", "drone", "ciborgue"];
        if (racasMaquinas.includes(cartaObj.dataset.raca)) {
            const aliados = field.querySelectorAll('.card-base'); 
            aliados.forEach(aliado => { 
                let ef = aliado.dataset.effect || aliado.dataset.originalEffect;
                if (ef === "sinergia_automato" && aliado !== cartaObj) { 
                    aliado.dataset.baseAtk = (parseInt(aliado.dataset.baseAtk) || 0) + 1; 
                    aliado.dataset.baseHp = (parseInt(aliado.dataset.baseHp) || 0) + 1; 
                    recalculateStats(aliado); if(window.VFX && window.VFX.pulse) VFX.pulse(aliado, "#00ffff"); 
                } 
            });
        }
    }
    
    if (gatilho === "UltimoSuspiro") { 
        graveyard[owner].push(baseDeck.find(c => c.title === cartaObj.dataset.name)); 

        if (efeito === "evocar_recruta") { 
            const slot = cartaObj.parentElement; 
            setTimeout(() => { 
                if(slot && !slot.querySelector('.card-base')) { 
                    const recruit = createCard(baseDeck.find(c => c.title === "Cadete de Patrulha")); 
                    recruit.dataset.owner = owner; 
                    gsap.set(recruit, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0 }); 
                    slot.appendChild(recruit); 
                    recruit.dataset.hasAttacked="false"; 
                    if(window.VFX && window.VFX.onSummon) VFX.onSummon(recruit, "provocar"); 
                } 
            }, 500); 
        } 
    }

    if (gatilho === "FimDeTurno") { 
        if (efeito === "cura_turno" && isPlayer) { 
            playerLife = Math.min(playerLife+1, maxLife); 
            if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(document.getElementById("player-hero"), "#00ff00"); 
        } 
        if (efeito === "regeneracao") { 
            cartaObj.dataset.damageTaken = Math.max(0, (parseInt(cartaObj.dataset.damageTaken) || 0) - 1); 
            recalculateStats(cartaObj); 
            if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(cartaObj, "#00ff00"); 
        } 
    }
}

// ==========================================
// 8. O MOTOR DE FASES (PING-PONG)
// ==========================================
function startGameDirect(mode, arenaClass) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active")); document.getElementById("game-screen").classList.add("active");
    document.body.className = arenaClass || "theme-lab"; document.getElementById("board").className = arenaClass || "theme-lab";
    initGame(mode === "campaign" ? 0 : "casual", arenaClass || "theme-lab");
}

function initGame(levelIndex, arenaClass) {
    currentLevel = levelIndex; 
    let levelData = levelIndex === "casual" ? { bossName: "SIMULACRO", bossHp: 20, bossImg: "https://files.catbox.moe/05e01v.png" } : campaignData[levelIndex];
    const enHero = document.getElementById("enemy-hero"); if(enHero) { enHero.querySelector(".hero-avatar").src = levelData.bossImg; enHero.querySelector(".hero-stats span:last-child").innerHTML = `VIDA: <span id="enemy-life">${levelData.bossHp}</span>`; enHero.onclick = () => handleHeroClick(enHero, "enemy"); }
    const plHero = document.getElementById("player-hero"); if(plHero) { plHero.onclick = () => handleHeroClick(plHero, "player"); if(selectedHeroObj) document.getElementById("player-avatar-img").src = selectedHeroObj.imgUrl; }

    enemyLife = levelData.bossHp; playerLife = 20; maxMana = 3; playerMana = 3; currentTurn = 1; gameIsOver = false; 

    if (window.conexao && window.conexao.open) { if (window.isHost) { attackToken = "player"; isSystemLocked = false; } else { attackToken = "enemy"; isSystemLocked = true; } } 
    else { attackToken = "player"; isSystemLocked = false; }
    currentStep = "deploy_attacker";

    playerDeck = [...customDeck]; for (let i = playerDeck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [playerDeck[i], playerDeck[j]] = [playerDeck[j], playerDeck[i]]; }
    graveyard = { player: [], enemy: [] };
    
    document.getElementById("player-field").innerHTML = ""; document.getElementById("enemy-field").innerHTML = ""; document.getElementById("hand").innerHTML = "";
    createSlots(document.getElementById("player-field"), "player"); createSlots(document.getElementById("enemy-field"), "enemy");

    // COMPRA SÍNCRONA (Garante que as 3 cartas não se percam)
    drawCard(); 
    drawCard(); 
    drawCard(); 

    updateUIState(); updateLifeAndMana(); 
    if(window.initAvatarParticles) setTimeout(window.initAvatarParticles, 500); 
}

function handleActionBtn() { 
    if(isSystemLocked) return; 
    playSound("click"); 
    let stepAntes = currentStep; 
    advancePhase(false); 
    if(window.conexao && window.conexao.open && stepAntes !== "combat") { window.enviarPacote({ acao: "AVANCAR_FASE" }); } 
}

function advancePhase(fromNetwork = false) {
    if (gameIsOver) return;
    if (currentStep === "deploy_attacker") currentStep = "deploy_defender";
    else if (currentStep === "deploy_defender") currentStep = "combat";
    else if (currentStep === "combat") { startNewRound(fromNetwork); return; }
    updateUIState();
}

function startNewRound(fromNetwork = false) {
    if(gameIsOver) return; 
    currentTurn++; 
    
    attackToken = (attackToken === "player") ? "enemy" : "player"; 
    currentStep = "deploy_attacker"; 
    
    document.querySelectorAll('.card-base').forEach(c => { 
        try {
            c.dataset.hasAttacked = "false"; 
            c.dataset.attacksMade = "0"; 
            c.classList.remove("exhausted"); 
            let dono = c.parentElement && c.parentElement.dataset ? c.parentElement.dataset.owner : "player";
            processCardEffect("FimDeTurno", c, dono); 
        } catch(erroOculto) { console.error(erroOculto); }
    });
    
    if (attackToken === "player" || (!window.conexao)) { 
        if(maxMana < 10) maxMana++; 
        playerMana = maxMana; 
        drawCard(); 
    }
    
    updateUIState();
    if(window.conexao && window.conexao.open && attackToken === "enemy" && !fromNetwork) { window.enviarPacote({ acao: "PASSAR_TURNO" }); }
}

function setButton3DState(btn, text, color) {
    if (!btn || btn.innerText === text) return;
    if (btn.parentElement) btn.parentElement.style.perspective = "800px";
    gsap.timeline()
        .to(btn, { rotationX: 90, duration: 0.15, ease: "power2.in" })
        .call(() => {
            btn.innerText = text;
            btn.style.color = color;
            btn.style.borderColor = color;
            btn.style.boxShadow = `0 0 15px ${color}, inset 0 0 10px rgba(0,0,0,0.8)`;
        })
        .to(btn, { rotationX: 0, duration: 0.3, ease: "back.out(1.5)" });
}

function updateUIState() {
    updateLifeAndMana(); clearInterval(timerInterval); document.getElementById("turn-display").innerText = `TURNO ${currentTurn}`;
    
    if (window.lastAttackToken !== attackToken) { gsap.to(".cyber-gear", { rotation: "+=360", duration: 0.6, ease: "power2.inOut" }); window.lastAttackToken = attackToken; }
    const pGear = document.getElementById("gear-player"); const eGear = document.getElementById("gear-enemy");
    if (pGear && eGear) {
        if (attackToken === "player") { pGear.classList.add("active"); eGear.classList.remove("active"); pGear.style.animationDirection = "normal"; eGear.style.animationDirection = "reverse"; } 
        else { pGear.classList.remove("active"); eGear.classList.add("active"); pGear.style.animationDirection = "reverse"; eGear.style.animationDirection = "normal"; }
    }
    
    const btn = document.getElementById("actionBtn"); const phaseDisp = document.getElementById("phase-display");
    const pFrame = document.querySelector("#player-hero .hero-avatar-frame"); const eFrame = document.querySelector("#enemy-hero .hero-avatar-frame");
    if(pFrame && eFrame) {
        pFrame.style.boxShadow = "0 0 10px var(--theme-glow)"; eFrame.style.boxShadow = "0 0 10px rgba(255,0,0,0.3)";
        if(attackToken === "player") pFrame.style.boxShadow = "0 0 35px #00ffff"; else eFrame.style.boxShadow = "0 0 35px #ff0000"; 
    }
    
    let isP2P = (window.conexao && window.conexao.open); 
    const colorCyan = "#00ffff"; const colorRed = "#ff0055"; const colorYellow = "#ffcc00";

    if (currentStep === "deploy_attacker") {
        if (attackToken === "player") { 
            phaseDisp.innerText = "SUA FASE DE DEPLOY"; setButton3DState(btn, "[ PASSA P/ INIMIGO ]", colorCyan); 
            isSystemLocked = false; startTimer(80); 
        } else { 
            phaseDisp.innerText = isP2P ? "DEPLOY INIMIGO" : "DEPLOY DA IA"; setButton3DState(btn, "[ AGUARDE ]", colorRed); 
            isSystemLocked = true; if(!isP2P) aiDeployPhase(); 
        }
    } else if (currentStep === "deploy_defender") {
        if (attackToken === "enemy") { 
            phaseDisp.innerText = "DEFENDA-SE!"; setButton3DState(btn, "[ PASSA P/ COMBATE ]", colorYellow); 
            isSystemLocked = false; startTimer(80); 
        } else { 
            phaseDisp.innerText = isP2P ? "DEFESA INIMIGA" : "DEFESA DA IA"; setButton3DState(btn, "[ AGUARDE ]", colorRed); 
            isSystemLocked = true; if(!isP2P) aiDeployPhase(); 
        }
    } else if (currentStep === "combat") {
        if (attackToken === "player") { 
            phaseDisp.innerText = "FASE DE COMBATE"; setButton3DState(btn, "[ FIM DE TURNO ]", colorCyan); 
            isSystemLocked = false; startTimer(60); 
        } else { 
            phaseDisp.innerText = isP2P ? "ATAQUE INIMIGO" : "ATAQUE DA IA"; setButton3DState(btn, "[ AGUARDE ]", colorRed); 
            isSystemLocked = true; if(!isP2P) aiCombatPhase(); 
        }
    }
}

let maxTurnTime = 80;
function startTimer(s) { turnTime = s; maxTurnTime = s; const container = document.getElementById("elevator-timer"); if (container && container.children.length !== s) { container.innerHTML = ""; for(let i = 1; i <= s; i++) { let node = document.createElement("div"); node.className = "timer-node pending"; node.id = "timer-node-" + i; node.innerText = i; container.appendChild(node); } } updateElevatorTimer(); clearInterval(timerInterval); timerInterval = setInterval(() => { if(!isSystemLocked && !gameIsOver) { turnTime--; updateElevatorTimer(); if(turnTime <= 0) handleActionBtn(); } }, 1000); }
function updateElevatorTimer() { const container = document.getElementById("elevator-timer"); if(!container) return; let elapsed = maxTurnTime - turnTime + 1; for(let i = 1; i <= maxTurnTime; i++) { let node = document.getElementById("timer-node-" + i); if (node) { if (i === elapsed) node.className = "timer-node active"; else if (i < elapsed) node.className = "timer-node passed"; else node.className = "timer-node pending"; } } }
function updateLifeAndMana() { 
    if(document.getElementById("mana")) document.getElementById("mana").innerText = `${playerMana}/${maxMana}`; 
    if(document.getElementById("player-life")) document.getElementById("player-life").innerText = playerLife; 
    if(document.getElementById("enemy-life")) document.getElementById("enemy-life").innerText = enemyLife; 
    if(document.getElementById("cards-in-deck")) document.getElementById("cards-in-deck").innerText = playerDeck.length; 
    if(document.getElementById("cards-in-grave")) document.getElementById("cards-in-grave").innerText = graveyard.player.length; 
}

function createSlots(f, o) { for(let i=0; i<5; i++) { const s = document.createElement("div"); s.className = "slot"; s.dataset.owner = o; if(o === "player") { s.onclick = (e) => { if(selectedCardFromHand) executePlayCard(e.currentTarget, selectedCardFromHand); }; s.ondragover = (e) => { e.preventDefault(); }; s.ondrop = (e) => { e.preventDefault(); if (isSystemLocked || !draggedCard || draggedCard.dataset.type === "feitico") return; executePlayCard(e.currentTarget, draggedCard); }; } f.appendChild(s); } }

function executePlayCard(slot, card) {
    if(card.dataset.type === "feitico") return; 
    if(slot.querySelector('.card-base')) { playSound("error"); alert("SISTEMA: Slot Ocupado!"); return; }
    let cst = parseInt(card.dataset.cost) || 0; let donoDoSlot = slot.dataset.owner; 
    if(playerMana >= cst) {
        playerMana -= cst; slot.appendChild(card); 
        if(donoDoSlot === "player" && window.conexao && window.conexao.open) { let slotIndex = Array.from(slot.parentElement.children).indexOf(slot); window.enviarPacote({ acao: "JOGAR_CARTA", cardName: card.dataset.name, slotIndex: slotIndex }); }
       card.classList.remove("deployment-selected"); gsap.killTweensOf(card); 
        gsap.set(card, { clearProps: "all" });
       // 👇 Âncora de chumbo: top 50, left 50, recua 50% e escala 0.6!
        gsap.set(card, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, x: 0, y: 0, rotation: 0, opacity: 1, zIndex: 10, margin: 0 });
        card.dataset.hasAttacked = "false"; card.classList.remove("exhausted");
        processCardEffect("AoJogar", card, donoDoSlot);
        playSound("deploy"); updateLifeAndMana(); setTimeout(updateAuras, 100); draggedCard = null; selectedCardFromHand = null; arrangeHand();
    } else { playSound("error"); alert("RAM INSUFICIENTE!"); }
}

// ==========================================
// ⚔️ MOTOR DE COMBATE BLINDADO (Bate e Volta)
// ==========================================
function resolveCombat(atkCard, defCard, isPlayer, onFinish) {
    const rectAtk = atkCard.getBoundingClientRect(); 
    const rectDef = defCard.getBoundingClientRect();
    const moveX = rectDef.left - rectAtk.left; 
    const moveY = rectDef.top - rectAtk.top; 
    
    atkCard.style.zIndex = "100";
    
    // 1. A CARTA VOA ATÉ AO ALVO
    gsap.to(atkCard, {
        x: moveX, y: moveY, duration: 0.28, ease: "power3.in",
        onUpdate: () => { if(window.VFX && window.VFX.createTrail) window.VFX.createTrail(atkCard); },
        onComplete: () => {
            // 2. CAIXA DE *****ÂNIO: Impede a carta de ficar presa se der erro
            try {
                let ef = atkCard.dataset.effect || ""; // Proteção de efeito vazio
                
                if(window.VFX && window.VFX.onAttack) VFX.onAttack(atkCard, defCard, ef);
                if(atkCard.dataset.somAtaque) { let a = new Audio(atkCard.dataset.somAtaque); a.play().catch(()=>{}); } else { playSound("hit"); }
                
                let dmgToDef = parseInt(atkCard.dataset.attack) || 0; 
                let dmgToAtk = 0;
                if(!defCard.id.includes("hero")) dmgToAtk = parseInt(defCard.dataset.attack) || 0; 
                
                if(defCard.id.includes("hero")) { 
                    if(isPlayer) enemyLife -= dmgToDef; else playerLife -= dmgToDef; 
                    screenShake(); 
                } else { 
                    applyDamage(defCard, dmgToDef); 
                }
                
                if (dmgToAtk > 0) applyDamage(atkCard, dmgToAtk);
                if (ef.includes("roubo_vida") && isPlayer) playerLife = Math.min(playerLife + dmgToDef, maxLife);
                
                checkGameOver(); updateLifeAndMana(); 
                
                let attackerAlive = (parseInt(atkCard.dataset.hp) || 0) > 0; 
                let defenderDied = !defCard.id.includes("hero") && (parseInt(defCard.dataset.hp) || 0) <= 0;
                
                if (attackerAlive) {
                    if (ef.includes("furia") && defenderDied) { atkCard.dataset.hasAttacked = "false"; atkCard.classList.remove("exhausted"); if(window.VFX && window.VFX.fury) VFX.fury(atkCard); } 
                    else if (ef.includes("ataque_duplo") && atkCard.dataset.attacksMade !== "1") { atkCard.dataset.attacksMade = "1"; atkCard.dataset.hasAttacked = "false"; atkCard.classList.remove("exhausted"); } 
                    else { atkCard.dataset.hasAttacked = "true"; atkCard.classList.add("exhausted"); }
                }
                
                atkCard.classList.remove("attacker-selected"); 
                
                // 3. O REGRESSO (A Mágica de Voltar)
                if (attackerAlive) { 
                    gsap.to(atkCard, { x: 0, y: 0, scale: 0.60, duration: 0.45, ease: "power2.out", onComplete: () => { atkCard.style.zIndex = "10"; if(onFinish) onFinish(); } }); 
                } else { 
                    if(onFinish) onFinish(); 
                }
            } catch(e) {
                console.error("Erro oculto no combate isolado!", e);
                // FAIL-SAFE: Força a carta a voltar para o slot independentemente de qualquer erro!
                gsap.to(atkCard, { x: 0, y: 0, scale: 0.60, duration: 0.45, ease: "power2.out", onComplete: () => { atkCard.style.zIndex = "10"; if(onFinish) onFinish(); }});
            }
        }
    });
}
function applyDamage(target, dmg) {
    if(target.dataset.dead === "true") return; 
    let currentEffect = target.dataset.effect || target.dataset.originalEffect;
    if(currentEffect === "escudo_divino" && !target.dataset.shieldBroken) { target.dataset.shieldBroken = "true"; target.classList.remove("shield-card"); if(window.VFX && window.VFX.shield) VFX.shield(target); return; }
    if(window.VFX && window.VFX.onDamage) VFX.onDamage(target, currentEffect); target.dataset.damageTaken = (parseInt(target.dataset.damageTaken) || 0) + dmg; recalculateStats(target);
}

function checkGameOver() { 
    if (playerLife > 0 && enemyLife > 0) return; if (gameIsOver) return; 
    gameIsOver = true; clearInterval(timerInterval); isSystemLocked = true; 
    const playerWon = playerLife > 0; const modal = document.getElementById("game-over-modal"); let recompensaHTML = "";
    if (playerWon) { let ganho = Math.floor(Math.random() * 100) + 50; playerFragments += ganho; recompensaHTML = `<h2 style="color: #00ffff; margin: 15px 0; text-shadow: 0 0 10px #00ffff;">+${ganho} 💽 HDs EXTRAÍDOS</h2>`; playSound("deploy"); } else { playSound("error"); }
    
    let botoesAcao = `<button class="cmd-btn" onclick="location.reload()" style="margin-top: 20px;">[ RETORNAR AO MENU ]</button>`;
    if (playerWon && currentLevel !== "casual") {
        if (currentLevel < campaignData.length - 1) { botoesAcao = `<button class="open-btn" onclick="nextCampaignLevel()" style="margin-top: 20px; color: #00ff00; border-color: #00ff00;">[ AVANÇAR PARA SETOR ${currentLevel + 2} ]</button><button class="cmd-btn" onclick="location.reload()" style="margin-top: 10px; border-color: #444; color: #777;">[ EXTRAIR E SAIR ]</button>`; } 
        else { recompensaHTML += `<h3 style="color: gold; text-shadow: 0 0 15px gold; margin-top: 10px;">👑 PROJETO ZEUS ENCERRADO 👑</h3><p style="color: #fff;">A Matriz está limpa, Operador.</p>`; }
    }
    modal.innerHTML = `<div class="modal-content final-screen" style="border-color: ${playerWon ? '#00ff00' : '#ff0000'}; background: rgba(5,5,10,0.95);"><h1 class="final-title" style="color: ${playerWon ? '#00ff00' : '#ff0000'}; font-size: 2.5rem; margin-top: 15px;">${playerWon ? "SISTEMA HACKEADO" : "FALHA CRÍTICA"}</h1>${recompensaHTML}<div style="display: flex; flex-direction: column; gap: 10px; align-items: center;">${botoesAcao}</div></div>`;
    setTimeout(() => modal.classList.add("active"), 1000); 
}

// ==========================================
// 9. FUNÇÕES DE MÃO E MULTIPLAYER
// ==========================================
window.nextCampaignLevel = function() { playSound("click"); document.getElementById("game-over-modal").classList.remove("active"); currentLevel++; startCampaignScene(); };

function drawCard() { 
    if(playerDeck.length > 0) { 
        const novaCarta = createCard(playerDeck.pop()); 
        document.getElementById("hand").appendChild(novaCarta); 
        gsap.set(novaCarta, { y: -500, x: 200, rotationY: 180, scale: 0.2, opacity: 0 }); 
        arrangeHand(); 
        gsap.to(novaCarta, { rotationY: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }); 
        updateLifeAndMana(); 
    } 
}

function arrangeHand(cartaParaIgnorar = null) { 
    const cards = Array.from(document.getElementById("hand").children); 
    for (let i = 0; i < cards.length; i++) { 
        const card = cards[i]; if (card === cartaParaIgnorar) continue; 
        card.dataset.origZ = i; gsap.set(card, { zIndex: i }); 
        const angle = -15 + (30) * (cards.length > 1 ? i / (cards.length - 1) : 0.5); 
        const targetLeft = `calc(50% + ${(i - (cards.length - 1) / 2) * 110}px)`; 
        const targetBottom = `${(Math.abs(angle) * 2) - 30}px`; 
        gsap.to(card, { left: targetLeft, bottom: targetBottom, y: 0, rotation: angle, xPercent: -50, scale: 0.7, duration: 0.4, ease: "power2.out" }); 
    } 
}

function initMultiplayer() {
    const btnOpenP2P = document.getElementById("btn-open-p2p");
    if(btnOpenP2P) { btnOpenP2P.onclick = () => { playSound("click"); document.getElementById("p2p-modal").classList.add("active"); if(!window.peer) { document.getElementById("meu-status").innerText = "GERANDO CHAVE..."; document.getElementById("meu-status").style.color = "yellow"; let codigoSala = 'ZEUS-' + Math.random().toString(36).substr(2, 4).toUpperCase(); window.peer = new Peer(codigoSala); window.peer.on('open', function(id) { document.getElementById("meu-status").innerText = "SEU ID: " + id; document.getElementById("meu-status").style.color = "#00ffcc"; }); window.peer.on('connection', function(conn) { window.conexao = conn; window.isHost = true; prepararBatalha(); }); } }; }
    const btnClient = document.getElementById("btn-client");
    if(btnClient) { btnClient.onclick = () => { playSound("click"); let codigo = document.getElementById("id-alvo").value.toUpperCase().trim(); if(!codigo) { playSound("error"); alert("SISTEMA: Digite o ID do Host."); return; } if(!window.peer) window.peer = new Peer(); document.getElementById("meu-status").innerText = "CONECTANDO..."; window.conexao = window.peer.connect(codigo); window.conexao.on('open', function() { window.isHost = false; prepararBatalha(); }); }; }
}

function prepararBatalha() {
    playSound("deploy"); document.getElementById("p2p-modal").classList.remove("active"); alert("CONEXÃO ESTABELECIDA!"); startGameDirect("casual", "theme-lab"); 
    window.conexao.on('data', function(pacote) {
        if(pacote.acao === "PASSAR_TURNO") { playSound("deploy"); startNewRound(true); }
        else if(pacote.acao === "AVANCAR_FASE") { advancePhase(true); }
        else if(pacote.acao === "JOGAR_CARTA") { playSound("deploy"); const cardData = baseDeck.find(c => c.title === pacote.cardName); if(cardData) { const enemyCard = createCard(cardData); enemyCard.dataset.owner = "enemy"; enemyCard.ondragstart = (e) => e.preventDefault(); const slotInimigo = document.getElementById("enemy-field").children[4 - pacote.slotIndex]; if(slotInimigo) { slotInimigo.appendChild(enemyCard); gsap.set(enemyCard, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0, x: 0, y: 0, rotation: 0 }); if(window.VFX && window.VFX.onSummon) VFX.onSummon(enemyCard, enemyCard.dataset.effect); processCardEffect("AoJogar", enemyCard, "enemy"); setTimeout(updateAuras, 100); } } }
        else if(pacote.acao === "JOGAR_EQUIPAMENTO") { const cardData = baseDeck.find(c => c.title === pacote.cardName); const slotInimigo = document.getElementById("enemy-field").children[4 - pacote.slotIndex]; if(slotInimigo && cardData) { const targetCard = slotInimigo.querySelector('.card-base'); if(targetCard) { const dummyEquip = createCard(cardData); executeEquip(dummyEquip, targetCard, "enemy"); } } }
        else if(pacote.acao === "ATACAR") { const enemySlot = document.getElementById("enemy-field").children[4 - pacote.atkSlot]; const atkCard = enemySlot ? enemySlot.querySelector('.card-base') : null; let defCard; if(pacote.targetType === "hero") defCard = document.getElementById("player-hero"); else { const mySlot = document.getElementById("player-field").children[4 - pacote.defSlot]; defCard = mySlot ? mySlot.querySelector('.card-base') : null; } if(atkCard && defCard) { resolveCombat(atkCard, defCard, false); } }
        else if(pacote.acao === "LANCAR_MAGIA") { const cardData = baseDeck.find(c => c.title === pacote.cardName); if (!cardData) return; const dummySpell = createCard(cardData); let targetElement; if (pacote.targetOwner === "enemy" && pacote.targetType === "hero") targetElement = document.getElementById("player-hero"); else if (pacote.targetOwner === "player" && pacote.targetType === "hero") targetElement = document.getElementById("enemy-hero"); else if (pacote.targetOwner === "enemy" && pacote.targetType === "card") { const slot = document.getElementById("player-field").children[4 - pacote.defSlot]; targetElement = slot.querySelector('.card-base'); } else if (pacote.targetOwner === "player" && pacote.targetType === "card") { const slot = document.getElementById("enemy-field").children[4 - pacote.defSlot]; targetElement = slot.querySelector('.card-base'); } if(targetElement) executeSpell(dummySpell, targetElement, pacote.targetOwner === "enemy" ? "player" : "enemy"); }
    });
}

window.enviarPacote = function(dados) { if(window.conexao && window.conexao.open) window.conexao.send(dados); }
window.addEventListener('DOMContentLoaded', bootTerminal);

function startCampaignScene() {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active")); const diagScreen = document.getElementById("dialogue-screen"); if(!diagScreen) { alert("ERRO: Tela de diálogo não encontrada no HTML!"); return; } diagScreen.classList.add("active"); diagScreen.style.display = "flex"; dialogueIndex = 0; showNextDialogue();
    diagScreen.onclick = (e) => { if(e.target.id === "btn-skip-dialogue") return; playSound("click"); dialogueIndex++; showNextDialogue(); };
    const btnSkip = document.getElementById("btn-skip-dialogue"); if(btnSkip) { btnSkip.onclick = () => { playSound("deploy"); iniciarCombateDaCampanha(); }; }
}

function showNextDialogue() {
    const data = campaignData[currentLevel];
    if (dialogueIndex < data.dialogo.length) { const line = data.dialogo[dialogueIndex]; const nameEl = document.getElementById("dialogue-name"); if(line.ator === "O DIRETOR") { nameEl.style.color = "#ffaa00"; nameEl.style.textShadow = "0 0 10px #ffaa00"; document.getElementById("dialogue-avatar").style.borderColor = "#ffaa00"; } else if(line.ator === "ADÃO") { nameEl.style.color = "#ff0055"; nameEl.style.textShadow = "0 0 10px #ff0055"; document.getElementById("dialogue-avatar").style.borderColor = "#ff0055"; } else { nameEl.style.color = "#00ffff"; nameEl.style.textShadow = "0 0 10px #00ffff"; document.getElementById("dialogue-avatar").style.borderColor = "#00ffff"; } nameEl.innerText = line.ator; document.getElementById("dialogue-avatar").src = line.img; document.getElementById("dialogue-text").innerText = line.texto; } else { iniciarCombateDaCampanha(); }
}

function iniciarCombateDaCampanha() { const data = campaignData[currentLevel]; const diagScreen = document.getElementById("dialogue-screen"); diagScreen.classList.remove("active"); diagScreen.style.display = "none"; document.getElementById("game-screen").classList.add("active"); const board = document.getElementById("board"); board.style.backgroundImage = `url('${data.bgImg}')`; board.style.backgroundSize = "cover"; board.style.backgroundPosition = "center"; initGame(currentLevel); }

// ==========================================
// 10. CÉREBRO DA IA (JOGA E ATACA EM 1 TURNO)
// ==========================================
async function aiDeployPhase() {
    if (currentLevel === 2) { 
        let emptySlots = Array.from(document.getElementById("enemy-field").children).filter(s=>!s.hasChildNodes());
        let cobaiasToSpawn = Math.min(2, emptySlots.length);
        for(let i=0; i < cobaiasToSpawn; i++) {
            const cobaiaToken = { title: "Clone Instável", tipo: "tropa", raridade: "comum", custo: 0, atk: 2, def: 1, efeito: "provocar", img: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png" };
            const el = createCard(cobaiaToken); el.dataset.owner="enemy"; emptySlots[i].appendChild(el); playSound("deploy");
            gsap.set(el, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, x: 0, y: 0, rotation: 0, margin: 0 });
            el.dataset.hasAttacked = "false"; el.classList.remove("exhausted");
            if(window.VFX && window.VFX.onSummon) VFX.onSummon(el, "provocar"); processCardEffect("AoJogar", el, "enemy"); await sleep(500);
        }
    }
    const slots = Array.from(document.getElementById("enemy-field").children).filter(s=>!s.hasChildNodes()); 
    if(slots.length > 0 && Math.random() > 0.1) { 
        let pool = []; if (currentLevel !== "casual" && campaignData[currentLevel] && campaignData[currentLevel].deckTema) { pool = baseDeck.filter(x => campaignData[currentLevel].deckTema.includes(x.title) && x.custo <= maxMana); } else { pool = baseDeck.filter(x => x.tipo !== "feitico" && x.tipo !== "equipamento" && x.custo <= maxMana); }
        if (pool.length > 0) { 
            const c = pool[Math.floor(Math.random() * pool.length)]; const el = createCard(c); el.dataset.owner="enemy"; slots[0].appendChild(el); playSound("deploy");
            gsap.set(el, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0, x: 0, y: 0, rotation: 0 });
            el.dataset.hasAttacked = "false"; el.classList.remove("exhausted");
            if(window.VFX && window.VFX.onSummon) VFX.onSummon(el, el.dataset.effect); processCardEffect("AoJogar", el, "enemy"); updateAuras();
        }
    } 
    await sleep(1000); 
    if (!gameIsOver) advancePhase();
}

async function aiCombatPhase() {
    const enemies = Array.from(document.getElementById("enemy-field").querySelectorAll('.card-base'));
    for (let e of enemies) {
        if (gameIsOver) break;
        if (e.dataset.hasAttacked === "false") {
            const playerCards = Array.from(document.getElementById("player-field").querySelectorAll('.card-base'));
            let target = null;
            if (playerCards.length > 0) {
                const taunts = playerCards.filter(c => c.classList.contains('taunt-card'));
                if (taunts.length > 0) target = taunts[Math.floor(Math.random() * taunts.length)]; else target = playerCards[Math.floor(Math.random() * playerCards.length)]; 
            } else target = document.getElementById("player-hero"); 
            if (target) { resolveCombat(e, target, false); await sleep(1500); }
        }
    }
    await sleep(500); 
    if (!gameIsOver) advancePhase();
}

// ==========================================
// 🕵️ OVERRIDE DO DIRETOR (EASTER EGG)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const avatarDiretor = document.getElementById("player-avatar") || document.querySelector(".player-profile img"); 
    
    if (avatarDiretor) {
        let clickCount = 0;
        let clickTimer = null;

        avatarDiretor.addEventListener("click", () => {
            clickCount++;
            
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0; 
                }, 1000); 
            }
            
            if (clickCount === 3) {
                clearTimeout(clickTimer);
                clickCount = 0;
                
                if (window.AutoBattler) {
                    playSound("deploy"); 
                    document.body.style.transition = "filter 0.1s";
                    document.body.style.filter = "invert(1) hue-rotate(180deg)";
                    setTimeout(() => document.body.style.filter = "none", 150);
                    
                    setTimeout(() => {
                        alert("⚠️ OVERRIDE DO DIRETOR: PROTOCOLO AUTO-BATTLER INICIADO ⚠️");
                        AutoBattler.init(); 
                    }, 200);
                } else {
                    console.error("Módulo battler.js não encontrado!");
                }
            }
        });
        avatarDiretor.style.cursor = "crosshair"; 
    }
});
