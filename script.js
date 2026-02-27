/* =========================================================
   🚀 PROJETO ZEUS - MOTOR V9.8 (SINC TOTAL E MANA DISCIPLINADA)
   ========================================================= */

console.log("Conexão JS Estabelecida. MOTOR V9.8: Mana e Turnos Sincronizados.");
window.onerror = function(msg) { if (msg.includes("gsap is not defined")) return true; return false; };
const sleep = ms => new Promise(r => setTimeout(r, ms));

// 1. MOTOR DE ESCALA UNIVERSAL E MENSAGENS
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
    if (msg.includes("Recompensa") || msg.includes("MISSÃO") || msg.includes("ESTABELECIDA") || msg.includes("SISTEMA")) {
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

// 2. BANCO DE DADOS
const campaignData = [
    { name: "SETOR 1", bossName: "UNIDADE DE CONTROLE", bossHp: 15, bossImg: "https://files.catbox.moe/05e01v.png", arena: "arena-neon" },
    { name: "SETOR 2", bossName: "ESPÉCIME 042", bossHp: 25, bossImg: "https://files.catbox.moe/nvlqhz.png", arena: "theme-lab" },
    { name: "SETOR 3", bossName: "GENERAL MÃO DE FERRO", bossHp: 40, bossImg: "https://files.catbox.moe/wkfzj3.png", arena: "theme-war" }
];

const baseDeck = [
    { title: "Agente Novato", tipo: "tropa", raridade: "comum", custo: 1, atk: 1, def: 2, efeito: "nenhum", img: "https://i.postimg.cc/3JgCTq5Q/soldado-novato.png" },
    { title: "Drone de Varredura", tipo: "tropa", raridade: "comum", custo: 1, atk: 2, def: 1, efeito: "nenhum", img: "https://i.postimg.cc/pXDYHSbN/Drone-de-Varredura.png" },
    { title: "Segurança Aegis", tipo: "tropa", raridade: "comum", custo: 2, atk: 2, def: 3, efeito: "provocar", img: "https://i.postimg.cc/284FDtps/Seguranca-Aegis.png" },
    { title: "Atirador Furtivo", tipo: "tropa", raridade: "comum", custo: 2, atk: 3, def: 1, efeito: "nenhum", img: "https://i.postimg.cc/Fsjg46t8/Atirador-Furtivo.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Ciborgue Falho", tipo: "tropa", raridade: "comum", custo: 3, atk: 3, def: 3, efeito: "nenhum", img: "https://i.postimg.cc/65dLXPsS/Ciborgue-Falho.png" },
    { title: "Mercenário", tipo: "tropa", raridade: "comum", custo: 3, atk: 4, def: 2, efeito: "nenhum", img: "https://i.postimg.cc/4Nzbg0C2/Mercenario.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Protocolo: EMP", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "dano_2", img: "https://i.postimg.cc/fTxjNP4H/Protocolo-EMP.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Kit Médico Tático", tipo: "feitico", raridade: "comum", custo: 1, atk: 0, def: 0, efeito: "cura_3", img: "https://i.postimg.cc/DyqdTNV5/Kit-Medico-Tatico.png" },
    { title: "Cobaia Estágio 1", tipo: "tropa", raridade: "rara", custo: 4, atk: 3, def: 6, efeito: "provocar", img: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png" },
    { title: "Sobrevivente Rebelde", tipo: "tropa", raridade: "rara", custo: 4, atk: 5, def: 2, efeito: "ataque_duplo", img: "https://i.postimg.cc/bNQHh5Xx/Sobrevivente-Rebelde.png" },
    { title: "Especialista em Explosivos", tipo: "tropa", raridade: "rara", custo: 5, atk: 4, def: 4, efeito: "nenhum", img: "https://i.postimg.cc/kXrFLmHs/Especialista-em-Explosivos.png" },
    { title: "Protocolo: Purga", tipo: "feitico", raridade: "rara", custo: 4, atk: 0, def: 0, efeito: "dano_area", img: "https://i.postimg.cc/ZKkFXSQV/Protocolo-Purga.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Exoesqueleto Mk.II", tipo: "tropa", raridade: "rara", custo: 6, atk: 5, def: 5, efeito: "nenhum", img: "https://i.postimg.cc/qMfXWTFQ/Exoesqueleto-Mk-II.png" },
    { title: "Médico de Combate", tipo: "tropa", raridade: "rara", custo: 3, atk: 1, def: 4, efeito: "cura_turno", img: "https://i.postimg.cc/65sLFXPh/Medico-de-Combate.png" },
    { title: "Mutante Instável", tipo: "tropa", raridade: "rara", custo: 5, atk: 4, def: 5, efeito: "regeneracao", img: "https://i.postimg.cc/mg1SnrL7/Mutante-Instavel.png" },
    { title: "Hack de Sobrecarga", tipo: "feitico", raridade: "rara", custo: 3, atk: 0, def: 0, efeito: "dano_4", img: "https://files.catbox.moe/tl6rvy.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Quimera Alada", tipo: "tropa", raridade: "epica", custo: 4, atk: 3, def: 4, efeito: "voar", img: "https://i.postimg.cc/mrcscCyq/Quimera-Alada.png" },
    { title: "Ceifador da Unidade", tipo: "tropa", raridade: "epica", custo: 6, atk: 6, def: 5, efeito: "roubo_vida", img: "https://i.postimg.cc/pLcvXqzj/Ceifador-da-Unidade.png" },
    { title: "Sentinela Ômega", tipo: "tropa", raridade: "epica", custo: 7, atk: 5, def: 7, efeito: "escudo", img: "https://i.postimg.cc/q7tTtyx1/Sentinela-Omega.png", som_ataque: "https://files.catbox.moe/5nlm3z.wav" },
    { title: "Projeto Zeus: Alfa", tipo: "tropa", raridade: "lendaria", custo: 8, atk: 8, def: 8, efeito: "nenhum", img: "https://i.postimg.cc/0yXv2cDX/Projeto-Zeus-Alfa.png" },
    { title: "Infiltrador das Sombras", tipo: "humano", raridade: "comum", custo: 1, atk: 2, def: 1, efeito: "furtividade", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZoPOtDbsR6X1lPe9V86rfBHlh2Q9TrW7sg&s" },
    { title: "Sucateiro da Zona Sul", tipo: "humano", raridade: "comum", custo: 2, atk: 1, def: 3, efeito: "reciclar", img: "https://files.catbox.moe/dbnyi2.png" },
    { title: "Cadete de Patrulha", tipo: "soldado", raridade: "comum", custo: 1, atk: 1, def: 3, efeito: "provocar", img: "https://files.catbox.moe/ui0skk.png" },
    { title: "Escudeiro de Elite", tipo: "soldado", raridade: "comum", custo: 3, atk: 2, def: 5, efeito: "escudo_divino", img: "https://files.catbox.moe/ebt0u6.png" },
    { title: "Hacker do Mainframe", tipo: "humano", raridade: "rara", custo: 4, atk: 2, def: 2, efeito: "roubo_energia", img: "https://files.catbox.moe/tl6rvy.png" },
    { title: "Barreira Eletrônica", tipo: "estrutura", raridade: "comum", custo: 2, atk: 0, def: 7, efeito: "provocar", img: "https://files.catbox.moe/b097ur.png" },
    { title: "Atirador de Supressão", tipo: "soldado", raridade: "rara", custo: 4, atk: 4, def: 3, efeito: "reduzir_atk", img: "https://files.catbox.moe/vynjlp.png" },
    { title: "Blindado de Transporte", tipo: "mecanizado", raridade: "rara", custo: 5, atk: 3, def: 8, efeito: "evocar_recruta", img: "https://files.catbox.moe/997fyd.png" },
    { title: "Especialista em Contenção", tipo: "humano", raridade: "rara", custo: 3, atk: 3, def: 2, efeito: "atordoar", img: "https://files.catbox.moe/nvlqhz.png" },
    { title: "Bombardeio Orbital", tipo: "feitico", raridade: "epica", custo: 6, atk: 0, def: 0, efeito: "dano_total", img: "https://files.catbox.moe/8pzmk6.png" },
    { title: "Unidade K-9 Cibernética", tipo: "ciborgue", raridade: "comum", custo: 2, atk: 3, def: 1, efeito: "investida", img: "https://files.catbox.moe/lc3rez.png" },
    { title: "General Mão de Ferro", tipo: "humano", raridade: "lendaria", custo: 7, atk: 6, def: 7, efeito: "aura_defesa", img: "https://files.catbox.moe/wkfzj3.png" },
    { title: "O Punho da Resistência", tipo: "mecanizado", raridade: "lendaria", custo: 7, atk: 7, def: 7, efeito: "furia", img: "https://files.catbox.moe/nuxefh.png" },
    { title: "Pacificador V.9", tipo: "mecanizado", raridade: "lendaria", custo: 8, atk: 9, def: 9, efeito: "anular_efeito", img: "https://files.catbox.moe/7cjywl.png" },
    { title: "Interceptor de Zeus", tipo: "drone", raridade: "comum", custo: 2, atk: 2, def: 3, efeito: "sentinela", img: "https://files.catbox.moe/05e01v.png" },
    { title: "Agente da PIDE-Tec", tipo: "humano", raridade: "rara", custo: 3, atk: 2, def: 4, efeito: "nenhum", img: "https://files.catbox.moe/nifj2x.png" },
    { title: "Pulso Eletromagnético", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "atordoar", text: "Atordoa unidade inimiga.", img: "Pulso.png" },
    { title: "Injeção de Nanobots", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "cura_2", text: "Cura 2 de uma unidade aliada.", img: "Injecao_Nanobots.png" },
    { title: "Sobrecarga de Sistema", tipo: "feitico", raridade: "comum", custo: 1, atk: 0, def: 0, efeito: "dano_2", text: "Causa 2 de dano a uma unidade.", img: "" },
    { title: "Campo de Força Portátil", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "escudo_divino", text: "Concede Escudo Divino.", img: "campo_de_forca_portatil.png" },
    { title: "Drone de Sucata", tipo: "automato", raridade: "comum", custo: 1, atk: 1, def: 1, efeito: "nenhum", text: "Máquina simples.", img: "" },
    { title: "Sonda de Vigilância", tipo: "automato", raridade: "comum", custo: 1, atk: 0, def: 3, efeito: "sentinela", text: "Ataca Furtivos.", img: "" },
    { title: "Módulo de Escudo", tipo: "automato", raridade: "comum", custo: 2, atk: 0, def: 4, efeito: "provocar", text: "Provocar.", img: "" },
    { title: "Guardião de Protocolo", tipo: "automato", raridade: "rara", custo: 3, atk: 3, def: 4, efeito: "anti_feitico", text: "Imune a magias.", img: "" },
    { title: "Demolidor Série-X", tipo: "automato", raridade: "rara", custo: 4, atk: 5, def: 3, efeito: "nenhum", text: "Puro dano.", img: "demolidor_x.png" },
    { title: "Colete de Kevlar", tipo: "equipamento", raridade: "comum", custo: 1, atk: 0, def: 2, efeito: "nenhum", text: "Concede +2 de HP.", img: "Colete_kevlar.png" },
    { title: "Rifle de Plasma", tipo: "equipamento", raridade: "comum", custo: 2, atk: 2, def: 0, efeito: "nenhum", text: "Concede +2 de ATK.", img: "rifle.png" },
    { title: "Escudo de Energia", tipo: "equipamento", raridade: "comum", custo: 2, atk: 0, def: 3, efeito: "escudo_divino", text: "Concede +3 HP e Escudo Divino.", img: "" },
    { title: "Chip Berserker", tipo: "equipamento", raridade: "epica", custo: 3, atk: 3, def: -3, efeito: "furia", text: "+3 ATK, Fúria, perde -3 HP.", img: "Chip_berserker.png" },
    { title: "Manto de Camuflagem", tipo: "equipamento", raridade: "rara", custo: 2, atk: 0, def: 0, efeito: "furtividade", text: "Concede Furtividade.", img: "manto_camuflagem.png" }
];

let currentLevel = 0, playerCollection = [], customDeck = [], playerDeck = [];
let graveyard = { player: [], enemy: [] };
let playerFragments = 9999, currentSortMode = "cost";
let maxMana = 1, playerMana = 1, maxLife = 20, playerLife = 20, enemyLife = 20, currentTurn = 1;
let attackToken = "player", currentStep = "deploy_attacker"; 
let selectedAttacker = null, selectedCardFromHand = null, turnTime = 80, timerInterval, gameIsOver = false, isSystemLocked = false, draggedCard = null, selectedHeroObj = null;

// 3. INICIALIZAÇÃO E MENUS
function bootTerminal() {
    initZeusEngineScale(); 
    playerCollection = [];
    baseDeck.forEach(c => { playerCollection.push({...c}); playerCollection.push({...c}); playerCollection.push({...c}); });
    
    // Fallback caso conecte direto no P2P sem montar deck
    customDeck = baseDeck.slice(0, 15); 
    selectedHeroObj = { id: "orc", imgUrl: "https://files.catbox.moe/wkfzj3.png" }; 

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
            document.querySelectorAll(".hero-choice").forEach(c => c.classList.remove("selected"));
            choice.classList.add("selected");
            selectedHeroObj = { id: choice.dataset.hero, imgUrl: choice.dataset.img };
            customDeck = baseDeck.slice(0, 15);
            document.getElementById("hero-actions").style.display = "flex";
        };
    });

    document.getElementById("btn-start-battle-direct").onclick = () => { playSound("click"); document.getElementById("mode-selection-modal").classList.add("active"); };
    document.getElementById("btn-cancel-mode").onclick = () => { playSound("click"); document.getElementById("mode-selection-modal").classList.remove("active"); };
    document.getElementById("btn-cancel-arena").onclick = () => { playSound("click"); document.getElementById("arena-selection-modal").classList.remove("active"); };
    document.getElementById("btn-mode-casual").onclick = () => { playSound("click"); document.getElementById("mode-selection-modal").classList.remove("active"); document.getElementById("arena-selection-modal").classList.add("active"); };
    document.querySelectorAll(".btn-arena").forEach(btn => {
        btn.onclick = () => { playSound("click"); document.getElementById("arena-selection-modal").classList.remove("active"); startGameDirect("casual", btn.getAttribute("data-arena")); };
    });
    document.getElementById("btn-edit-deck").onclick = () => { document.getElementById("hero-screen").classList.remove("active"); document.getElementById("deck-builder-screen").classList.add("active"); initDeckBuilder(); };
    
    const actionBtn = document.getElementById("actionBtn");
    if(actionBtn) { actionBtn.onclick = handleActionBtn; }

    document.getElementById("board").onclick = (e) => {
        if (!e.target.closest('.slot') && !e.target.closest('.card-base') && !e.target.closest('.hero-panel') && !e.target.closest('.hero-panel-game')) {
            if(selectedCardFromHand) { selectedCardFromHand.classList.remove("deployment-selected"); selectedCardFromHand = null; arrangeHand(); }
            if(selectedAttacker) { selectedAttacker.classList.remove("attacker-selected"); selectedAttacker = null; }
        }
    };
}

// 4. DECK BUILDER
function initDeckBuilder() {
    document.getElementById("sort-cost").onclick = () => { currentSortMode = "cost"; renderVitrine(); playSound("click"); };
    document.getElementById("sort-rarity").onclick = () => { currentSortMode = "rarity"; renderVitrine(); playSound("click"); };
    document.getElementById("sort-type").onclick = () => { currentSortMode = "type"; renderVitrine(); playSound("click"); };
    document.getElementById("btn-close-inspect").onclick = () => { playSound("click"); document.getElementById("inspect-modal").classList.remove("active"); };
    
    // 👇 BOTÃO ALEATÓRIO DE VOLTA 👇
    let toolbar = document.querySelector(".toolbar");
    if(toolbar && !document.getElementById("btn-random-deck")) {
        let btnRand = document.createElement("button"); btnRand.id = "btn-random-deck"; btnRand.className = "cmd-btn sort-btn";
        btnRand.style.borderColor = "#00ff00"; btnRand.style.color = "#00ff00"; btnRand.innerText = "🎲 ALEATÓRIO";
        btnRand.onclick = () => {
            playSound("click"); customDeck = []; let pool = [...playerCollection];
            for(let i = pool.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
            for(let c of pool) { if(customDeck.length >= 15) break; if(customDeck.filter(x => x.title === c.title).length < 3) customDeck.push({...c}); }
            updateDeckUI();
        };
        toolbar.appendChild(btnRand);
    }

    renderVitrine();
    document.getElementById("btn-back-from-deck").onclick = () => { playSound("click"); document.getElementById("deck-builder-screen").classList.remove("active"); document.getElementById("hero-screen").classList.add("active"); };
}

function renderVitrine() {
    const poolGrid = document.getElementById("card-pool-grid"); if(!poolGrid) return; poolGrid.innerHTML = "";
    let uniqueCards = []; playerCollection.forEach(card => { if(!uniqueCards.find(c => c.title === card.title)) uniqueCards.push(card); });
    uniqueCards.sort((a, b) => {
        if (currentSortMode === "cost") return a.custo - b.custo;
        if (currentSortMode === "type") return a.tipo.localeCompare(b.tipo);
        const peso = { "comum": 1, "rara": 2, "epica": 3, "lendaria": 4 }; return peso[b.raridade] - peso[a.raridade];
    });
    uniqueCards.forEach(card => {
        const div = document.createElement("div"); div.className = `pool-card ${card.raridade}`;
        div.innerHTML = `<div class="inspect-btn" title="Inspecionar">👁️</div><img src="${card.img}" class="pool-img"><div class="pool-info"><div class="pool-title">${card.title}</div><div class="pool-cost">${card.custo}⚡</div></div>`;
        div.onclick = (e) => { if(e.target.classList.contains("inspect-btn")) openInspectModal(card); else addCardToDeck(card); };
        poolGrid.appendChild(div);
    });
    updateDeckUI();
}

function openInspectModal(cardData) {
    playSound("click"); const container = document.getElementById("inspect-card-container"); if(!container) return;
    container.innerHTML = ""; const visualCard = createCard(cardData);
    visualCard.onclick = null; visualCard.ondragstart = null; visualCard.style.position = "relative"; visualCard.style.cursor = "default";
    container.appendChild(visualCard); document.getElementById("inspect-modal").classList.add("active");
}

function addCardToDeck(card) { 
    if (customDeck.length < 15) { 
        if (customDeck.filter(c => c.title === card.title).length < 3) { customDeck.push({...card}); updateDeckUI(); } 
        else { playSound("error"); alert("Máximo de 3 cópias iguais no deck."); }
    } 
}
function removeCardFromDeck(index) { customDeck.splice(index, 1); updateDeckUI(); }
function updateDeckUI() {
    const deckList = document.getElementById("current-deck-list"); if(!deckList) return; deckList.innerHTML = ""; customDeck.sort((a,b) => a.custo - b.custo);
    customDeck.forEach((card, index) => { 
        const d = document.createElement("div"); d.className="deck-item"; 
        d.innerHTML=`<span>${card.title}</span> <span style="color:cyan">${card.custo}⚡</span>`; d.onclick=()=>removeCardFromDeck(index); deckList.appendChild(d); 
    });
    document.getElementById("deck-count").innerText = `${customDeck.length}/15`;
    const btnStart = document.getElementById("btn-start-battle");
    if(btnStart) {
        btnStart.style.display = (customDeck.length === 15) ? "block" : "none";
        btnStart.onclick = () => { playSound("click"); document.getElementById("deck-builder-screen").classList.remove("active"); startGameDirect("casual", "theme-lab"); };
    }
}

// 5. CÉREBRO DE STATUS DINÂMICOS
function recalculateStats(c) {
    let baseAtk = parseInt(c.dataset.baseAtk) || 0; let baseHp = parseInt(c.dataset.baseHp) || 0; let damageTaken = parseInt(c.dataset.damageTaken) || 0; 
    let eqAtk = parseInt(c.dataset.equipAtk) || 0; let eqHp = parseInt(c.dataset.equipHp) || 0;
    let auAtk = parseInt(c.dataset.auraAtk) || 0; let auHp = parseInt(c.dataset.auraHp) || 0;

    let finalAtk = baseAtk + eqAtk + auAtk; let maxHp = baseHp + eqHp + auHp; let currentHp = maxHp - damageTaken;

    c.dataset.attack = finalAtk; c.dataset.hp = currentHp; 
    const atkNode = c.querySelector(".stat-atk"); const defNode = c.querySelector(".stat-def");
    if(atkNode) atkNode.innerText = finalAtk > 0 ? finalAtk : 0; if(defNode) defNode.innerText = currentHp;

    let activeEffect = c.dataset.equipEffect || c.dataset.originalEffect; c.dataset.effect = activeEffect; 
    c.classList.remove("taunt-card", "double-attack-card", "lifesteal-card", "shield-card", "stealth-card");
    if (activeEffect === "provocar" || c.classList.contains("aura-taunt")) c.classList.add("taunt-card"); 
    if (activeEffect === "ataque_duplo" || activeEffect === "furia") c.classList.add("double-attack-card"); 
    if (activeEffect === "roubo_vida") c.classList.add("lifesteal-card"); 
    if (activeEffect === "escudo_divino" && !c.dataset.shieldBroken) c.classList.add("shield-card"); 
    if (activeEffect === "furtividade") c.classList.add("stealth-card"); 

    if (c.dataset.type !== "feitico" && currentHp <= 0 && c.dataset.dead !== "true") {
        c.dataset.dead = "true"; processCardEffect("UltimoSuspiro", c, c.parentElement.dataset.owner);
        if(window.VFX) VFX.death(c); else c.remove(); setTimeout(updateAuras, 300); 
    }
}

function updateAuras() {
    ["player-field", "enemy-field"].forEach(f => {
        const field = document.getElementById(f); if(!field) return;
        const cards = Array.from(field.querySelectorAll('.card-base'));
        cards.forEach(c => { c.dataset.auraAtk = 0; c.dataset.auraHp = 0; c.classList.remove("aura-taunt"); });

        const temGeneral = cards.some(c => c.dataset.name === "General Mão de Ferro" && c.dataset.dead !== "true");
        cards.forEach(c => {
            if (c.dataset.dead === "true" || c.dataset.type === "feitico") return;
            let aAtk = 0; let aHp = 0;
            if (temGeneral && c.dataset.name !== "General Mão de Ferro") { aHp += 2; c.classList.add("aura-taunt"); }
            c.dataset.auraAtk = aAtk; c.dataset.auraHp = aHp; recalculateStats(c);
        });
    });
}

// 6. MOTOR DE CARTAS
function createCard(item) { 
    if(!item) return document.createElement("div"); 
    let isSpell = (item.tipo === 'feitico'); let isEquip = (item.tipo === 'equipamento'); let baseClass = (isSpell || isEquip) ? "feitico" : "tropa"; 
    
    const c = document.createElement("div"); c.className = `card-base ${item.raridade || 'comum'} ${baseClass}`;
    let safeAtk = Number(item.atk)||0; let safeDef = Number(item.def)||0; let safeCost = Number(item.custo)||0;
    
    c.dataset.baseAtk = safeAtk; c.dataset.baseHp = safeDef; c.dataset.baseCost = safeCost; c.dataset.damageTaken = 0; c.dataset.equipAtk = 0; c.dataset.equipHp = 0; c.dataset.auraAtk = 0; c.dataset.auraHp = 0; c.dataset.originalEffect = item.efeito; c.dataset.equipEffect = "";
    c.draggable = true; c.dataset.name = item.title; c.dataset.attack = safeAtk; c.dataset.hp = safeDef; c.dataset.cost = safeCost; c.dataset.type = baseClass; c.dataset.raca = item.tipo; c.dataset.effect = item.efeito; c.dataset.hasAttacked = "false";
    
    let typeIcon = "⚔️"; if(["mecanizado","drone","ciborgue", "automato"].includes(item.tipo)) typeIcon = "⚙️"; if(["humano","medico","soldado"].includes(item.tipo)) typeIcon = "🧬"; if(item.tipo === "estrutura") typeIcon = "🏗️"; if(isSpell) typeIcon = "💣"; if(isEquip) typeIcon = "🎒"; 
    
    let starsCount = item.raridade === "lendaria" ? 5 : (item.raridade === "epica" ? 3 : (item.raridade === "rara" ? 2 : 1)); let starsHTML = '<div class="card-stars">'; for(let i=0; i<starsCount; i++) starsHTML += '<div class="star">★</div>'; starsHTML += '</div>';
    let statsHTML = !(isSpell || isEquip) ? `<div class="card-stats"><div class="stat-badge stat-atk">${safeAtk}</div><div class="stat-badge stat-def">${safeDef}</div></div>` : `<div class="card-stats"><div class="stat-badge stat-atk" style="background:#b0279b; font-size:0.6rem;">${isEquip ? 'EQP' : 'MAG'}</div></div>`;
    
    c.innerHTML = `<div class="card-title">${item.title}</div><div class="card-art-box"><img src="${item.img || ''}" class="card-art" draggable="false"></div><div class="card-type-icon">${typeIcon}</div>${starsHTML}<div class="card-body"><div class="card-text">${item.text || ""}</div></div>${statsHTML}<div class="card-cost">${safeCost}</div>`;
    
    c.onmouseenter = () => { if(c.parentElement && c.parentElement.id === "hand" && !draggedCard && selectedCardFromHand !== c) { gsap.to(c, { y: -30, scale: 0.85, zIndex: 100, duration: 0.2 }); } };
    c.onmouseleave = () => { if(c.parentElement && c.parentElement.id === "hand" && !draggedCard && selectedCardFromHand !== c) { gsap.to(c, { y: 0, scale: 0.7, zIndex: c.dataset.origZ, duration: 0.2 }); } };
    
    c.onclick = handleCardClick; 
    c.ondragstart = (e) => { e.dataTransfer.setData('text/plain', 'carta'); if(isSystemLocked || c.parentElement.id !== "hand") { e.preventDefault(); return; } if(isSpell || isEquip) { e.preventDefault(); playSound("error"); alert("SISTEMA: Clique na carta na mão e depois no alvo."); return; } draggedCard = c; };
    c.ondragend = () => { if (draggedCard) draggedCard = null; };
    recalculateStats(c); return c; 
}

function handleCardClick(e) {
    if(isSystemLocked) return; const c = e.currentTarget; const p = c.parentElement; 
    const isSpellSelected = selectedCardFromHand && selectedCardFromHand.dataset.raca === "feitico";
    const isEquipSelected = selectedCardFromHand && selectedCardFromHand.dataset.raca === "equipamento";

    if(p.id==="hand"){ 
        playSound("click"); 
        if(selectedCardFromHand === c){ selectedCardFromHand = null; c.classList.remove("deployment-selected"); arrangeHand(); } 
        else { 
            if(selectedCardFromHand) selectedCardFromHand.classList.remove("deployment-selected");
            selectedCardFromHand = c; c.classList.add("deployment-selected"); 
            gsap.to(c, { scale: 1.3, y: -120, rotation: 0, zIndex: 100, duration: 0.3, ease: "back.out(1.7)" }); arrangeHand(c); 
        } 
    } 
    else if (isSpellSelected) { executeSpell(selectedCardFromHand, c, p.dataset.owner); }
    else if (isEquipSelected) { executeEquip(selectedCardFromHand, c, p.dataset.owner); } 
    else if(p.dataset.owner==="player" && currentStep==="combat" && attackToken==="player"){ 
        if(c.dataset.hasAttacked === "true") { playSound("error"); return; }
        if(selectedAttacker===c) { selectedAttacker=null; c.classList.remove("attacker-selected"); } 
        else { if(selectedAttacker) selectedAttacker.classList.remove("attacker-selected"); selectedAttacker=c; c.classList.add("attacker-selected"); } 
    }
    else if(p.dataset.owner==="enemy" && selectedAttacker){ 
        const taunts = document.getElementById("enemy-field").querySelectorAll('.taunt-card');
        if (taunts.length > 0 && !c.classList.contains('taunt-card')) { playSound("error"); alert("ALVO INVÁLIDO!"); return; }
        resolveCombat(selectedAttacker, c, true); 
    } 
}

// 7. MECÂNICAS (MAGIAS E EQUIPAMENTOS)
function executeEquip(equipCard, targetElement, targetOwner) {
    if (currentStep === "combat") { playSound("error"); alert("Apenas Fase de Deploy."); return; }
    if (targetOwner !== "player" && !(window.conexao && window.conexao.open)) { playSound("error"); alert("Equipe suas tropas!"); return; } 
    if (targetElement.id.includes("hero")) { playSound("error"); alert("Heróis não usam equipamentos!"); return; }
    const cost = parseInt(equipCard.dataset.cost) || 0;
    
    if (equipCard.parentElement && equipCard.parentElement.id === "hand") {
        if (playerMana < cost) { playSound("error"); alert("RAM INSUFICIENTE!"); return; }
        playerMana -= cost; updateLifeAndMana();
        if(window.conexao && window.conexao.open) { 
            let slotIndex = Array.from(targetElement.parentElement.parentElement.children).indexOf(targetElement.parentElement); 
            window.enviarPacote({ acao: "JOGAR_EQUIPAMENTO", cardName: equipCard.dataset.name, slotIndex: slotIndex }); 
        }
        equipCard.remove(); arrangeHand(); selectedCardFromHand = null; draggedCard = null;
    }

    playSound("deploy"); 
    targetElement.dataset.equipAtk = equipCard.dataset.attack; targetElement.dataset.equipHp = equipCard.dataset.hp; targetElement.dataset.equipEffect = equipCard.dataset.effect;
    let namePlate = targetElement.querySelector(".card-title"); if(namePlate) namePlate.style.color = "#ff00ff"; 
    if(window.VFX) VFX.pulse(targetElement, "#ff00ff");
    recalculateStats(targetElement); updateAuras();
}

function executeSpell(spellCard, targetElement, targetOwner) {
    if (currentStep === "combat") { playSound("error"); alert("Magias na Fase de Deploy."); return; }
    if (targetElement.dataset && targetElement.dataset.effect === "furtividade") { playSound("error"); alert("ALVO FURTIVO!"); return; }
    const cost = parseInt(spellCard.dataset.cost) || 0; 
    
    let isLocalCaster = spellCard.parentElement && spellCard.parentElement.id === "hand";

    if (isLocalCaster) {
        if (playerMana < cost) { playSound("error"); alert("RAM INSUFICIENTE!"); return; }
        const efeito = spellCard.dataset.effect;
        if (efeito.includes("cura") && targetOwner !== "player") { playSound("error"); alert("Apenas em aliados!"); return; }
        if (efeito.includes("dano") && targetOwner !== "enemy") { playSound("error"); alert("Apenas em inimigos!"); return; }
        playerMana -= cost; updateLifeAndMana(); 

        if (window.conexao && window.conexao.open) {
            let tType = targetElement.id.includes("hero") ? "hero" : "card";
            let dSlot = null;
            if (tType === "card") dSlot = Array.from(targetElement.parentElement.parentElement.children).indexOf(targetElement.parentElement);
            window.enviarPacote({ acao: "LANCAR_MAGIA", cardName: spellCard.dataset.name, targetOwner: targetOwner, targetType: tType, defSlot: dSlot });
        }
        spellCard.remove(); arrangeHand(); selectedCardFromHand = null; draggedCard = null;
    }
    
    if(spellCard.dataset.somDrop) { let d = new Audio(spellCard.dataset.somDrop); d.play().catch(()=>{}); } else { playSound("hit"); }
    const efeito = spellCard.dataset.effect;

    if(efeito === "dano_total") {
        document.getElementById(isLocalCaster ? "enemy-field" : "player-field").querySelectorAll('.card-base').forEach(inimigo => applyDamage(inimigo, 4)); if(isLocalCaster) enemyLife -= 4; else playerLife -= 4; screenShake();
    } else if (efeito.includes("dano_")) {
        let dmg = parseInt(efeito.split("_")[1]) || 0;
        if(targetElement.id.includes("hero")) { if(targetElement.id === "enemy-hero") enemyLife -= dmg; else playerLife -= dmg; if(window.VFX) VFX.particles(targetElement, "#ff0000"); } else { applyDamage(targetElement, dmg); } screenShake();
    } else if (efeito.includes("cura_")) {
        let heal = parseInt(efeito.split("_")[1]) || 0;
        if(targetElement.id.includes("hero")) { if(targetElement.id === "player-hero") playerLife += heal; else enemyLife += heal; if(window.VFX) VFX.particles(targetElement, "#00ff00"); } else { targetElement.dataset.damageTaken = Math.max(0, (parseInt(targetElement.dataset.damageTaken) || 0) - heal); recalculateStats(targetElement); if(window.VFX) VFX.particles(targetElement, "#00ff00"); }
    }
    checkGameOver(); updateLifeAndMana(); 
}

// 8. O MOTOR DO JOGO E IA (CÁLCULO DE TURNOS CORRIGIDO)
function startGameDirect(mode, arenaClass) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById("game-screen").classList.add("active");
    document.body.className = arenaClass || "theme-lab"; document.getElementById("board").className = arenaClass || "theme-lab";
    initGame(mode === "campaign" ? 0 : "casual", arenaClass || "theme-lab");
}

function initGame(levelIndex, arenaClass) {
    let levelData = levelIndex === "casual" ? { bossName: "SIMULACRO", bossHp: 20, bossImg: "https://files.catbox.moe/05e01v.png" } : campaignData[levelIndex];
    const enHero = document.getElementById("enemy-hero"); 
    if(enHero) { enHero.querySelector(".hero-avatar").src = levelData.bossImg; enHero.querySelector(".hero-stats span:last-child").innerHTML = `VIDA: <span id="enemy-life">${levelData.bossHp}</span>`; enHero.onclick = () => handleHeroClick(enHero, "enemy"); }
    const plHero = document.getElementById("player-hero");
    if(plHero) { plHero.onclick = () => handleHeroClick(plHero, "player"); if(selectedHeroObj) document.getElementById("player-avatar-img").src = selectedHeroObj.imgUrl; }

    enemyLife = levelData.bossHp; playerLife = 20; currentTurn = 1; gameIsOver = false; 

    // 👇 A MAGIA DA MANA JUSTA 👇
    if (window.conexao && window.conexao.open) {
        if (window.isHost) { 
            attackToken = "player"; isSystemLocked = false; 
            maxMana = 1; playerMana = 1; // Host começa com 1/1
        } else { 
            attackToken = "enemy"; isSystemLocked = true; 
            maxMana = 0; playerMana = 0; // Cliente começa com 0/0
        }
    } else { 
        attackToken = "player"; isSystemLocked = false; 
        maxMana = 1; playerMana = 1; 
    }
    currentStep = "deploy_attacker";

    playerDeck = [...customDeck]; for (let i = playerDeck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [playerDeck[i], playerDeck[j]] = [playerDeck[j], playerDeck[i]]; }
    graveyard = { player: [], enemy: [] };
    
    document.getElementById("player-field").innerHTML = ""; document.getElementById("enemy-field").innerHTML = ""; document.getElementById("hand").innerHTML = "";
    createSlots(document.getElementById("player-field"), "player"); createSlots(document.getElementById("enemy-field"), "enemy");

    drawCard(); drawCard(); drawCard(); 
    updateUIState(); updateLifeAndMana(); 
    if(window.initAvatarParticles) setTimeout(window.initAvatarParticles, 500); 
}

function advancePhase(fromNetwork = false) {
    if (gameIsOver) return;
    if (currentStep === "deploy_attacker") currentStep = "deploy_defender";
    else if (currentStep === "deploy_defender") currentStep = "combat";
    else if (currentStep === "combat") { startNewRound(fromNetwork); return; }
    updateUIState();
}

function handleActionBtn() { 
    if(isSystemLocked) return; 
    playSound("click"); 
    let stepAntes = currentStep;
    advancePhase(false); 
    if(window.conexao && window.conexao.open && stepAntes !== "combat") {
        window.enviarPacote({ acao: "AVANCAR_FASE" });
    }
}

function startNewRound(fromNetwork = false) {
    if(gameIsOver) return; currentTurn++; 
    
    attackToken = (attackToken === "player") ? "enemy" : "player"; 
    currentStep = "deploy_attacker";
    
    document.querySelectorAll('.card-base').forEach(c => { c.dataset.hasAttacked = "false"; c.classList.remove("exhausted"); processCardEffect("FimDeTurno", c, c.parentElement.dataset.owner); });
    
    // 👇 A MANA SÓ SOBE QUANDO É O SEU TURNO 👇
    if (attackToken === "player") {
        if(maxMana < 10) maxMana++; 
        playerMana = maxMana; 
        drawCard(); 
    }
    
    updateUIState();
    
    if(window.conexao && window.conexao.open && attackToken === "enemy" && !fromNetwork) { 
        window.enviarPacote({ acao: "PASSAR_TURNO" }); 
    }
}

function updateUIState() {
    updateLifeAndMana(); clearInterval(timerInterval); 
    // Mostra o turno de forma agrupada (Ronda 1, Ronda 2, etc.)
    document.getElementById("turn-display").innerText = `TURNO ${Math.ceil(currentTurn / 2)}`;
    
    const btn = document.getElementById("actionBtn"); const phaseDisp = document.getElementById("phase-display");
    const pFrame = document.querySelector("#player-hero .hero-avatar-frame"); const eFrame = document.querySelector("#enemy-hero .hero-avatar-frame");
    if(pFrame && eFrame) {
        pFrame.style.boxShadow = "0 0 10px var(--theme-glow)"; eFrame.style.boxShadow = "0 0 10px rgba(255,0,0,0.3)";
        if(attackToken === "player") pFrame.style.boxShadow = "0 0 35px #00ffff"; else eFrame.style.boxShadow = "0 0 35px #ff0000"; 
    }
    
    let isP2P = (window.conexao && window.conexao.open); 

    if (currentStep === "deploy_attacker") {
        if (attackToken === "player") { phaseDisp.innerText = "FASE DE CARTAS"; btn.innerText = "DEFESA INIMIGA"; isSystemLocked = false; startTimer(80); } 
        else { phaseDisp.innerText = isP2P ? "TURNO INIMIGO" : "TURNO DA IA"; btn.innerText = "AGUARDE"; isSystemLocked = true; if(!isP2P) aiDeployPhase(); }
    } else if (currentStep === "deploy_defender") {
        if (attackToken === "enemy") { phaseDisp.innerText = "DEFENDA-SE!"; btn.innerText = "COMBATE INIMIGO"; isSystemLocked = false; startTimer(80); } 
        else { phaseDisp.innerText = isP2P ? "DEFESA INIMIGA" : "DEFESA DA IA"; btn.innerText = "AGUARDE"; isSystemLocked = true; if(!isP2P) aiDeployPhase(); }
    } else if (currentStep === "combat") {
        if (attackToken === "player") { phaseDisp.innerText = "FASE DE COMBATE"; btn.innerText = "PASSAR TURNO"; isSystemLocked = false; startTimer(60); } 
        else { phaseDisp.innerText = isP2P ? "ATAQUE INIMIGO" : "ATAQUE DA IA"; btn.innerText = "AGUARDE"; isSystemLocked = true; if(!isP2P) aiCombatPhase(); }
    }
}

function initMarket() {
    const grid = document.getElementById("market-grid"); if(!grid) return; grid.innerHTML = "";
    baseDeck.forEach(card => {
        const copies = playerCollection.filter(c => c.title === card.title).length;
        const div = document.createElement("div"); div.className = `pool-card ${copies > 0 ? card.raridade : 'comum'}`;
        div.innerHTML = `<div class="copies-badge" style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.9); color: cyan; font-size: 0.8rem; font-weight: bold; padding: 3px 8px; border: 1px solid cyan; border-radius: 4px; z-index: 5;">x${copies}</div><img src="${card.img}" class="pool-img" style="filter: grayscale(${copies > 0 ? 0 : 1}) contrast(1.2); opacity: ${copies > 0 ? 1 : 0.4};"><div class="pool-info"><div class="pool-title" style="color: ${copies > 0 ? '#fff' : '#555'};">${card.title}</div><div class="pool-cost" style="color: ${copies > 0 ? '#00ffff' : '#444'};">${card.custo}⚡</div></div>`;
        div.onclick = () => { playSound("click"); openMarketModal(card, copies); };
        grid.appendChild(div);
    });
}

function openMarketModal(card, copies) {
    document.getElementById("transact-title").innerText = card.title; document.getElementById("transact-copies").innerText = copies; document.getElementById("transaction-modal").classList.add("active");
    const custo = card.raridade === 'lendaria' ? 500 : (card.raridade === 'epica' ? 200 : (card.raridade === 'rara' ? 100 : 50));
    
    document.getElementById("btn-buy-card").innerText = `COMPRAR (${custo}💽)`;
    document.getElementById("btn-buy-card").onclick = () => { 
        if(playerFragments >= custo) { 
            playerFragments -= custo; playerCollection.push({...card}); initMarket(); openMarketModal(card, copies+1); playSound("deploy"); 
        } else { playSound("error"); alert("HDs INSUFICIENTES"); } 
    };
    
    document.getElementById("btn-sell-card").innerText = `VENDER (+${custo/5}💽)`;
    document.getElementById("btn-sell-card").onclick = () => { 
        if(copies > 0) { 
            playerFragments += custo/5; const idx = playerCollection.findIndex(c => c.title === card.title); 
            if(idx > -1) playerCollection.splice(idx,1); initMarket(); openMarketModal(card, copies-1); playSound("click"); 
        } 
    };
    
    document.getElementById("btn-close-transaction").onclick = () => document.getElementById("transaction-modal").classList.remove("active");
}
function startTimer(s){ turnTime=s; document.getElementById("timer").innerText=turnTime; clearInterval(timerInterval); timerInterval=setInterval(()=>{ if(!isSystemLocked && !gameIsOver){ turnTime--; document.getElementById("timer").innerText=turnTime; if(turnTime<=0) handleActionBtn(); } },1000); }

function updateLifeAndMana() {
    if(document.getElementById("mana")) document.getElementById("mana").innerText = `${playerMana}/${maxMana}`; 
    if(document.getElementById("player-life")) document.getElementById("player-life").innerText = playerLife; 
    if(document.getElementById("enemy-life")) document.getElementById("enemy-life").innerText = enemyLife;
    if(document.getElementById("cards-in-deck")) document.getElementById("cards-in-deck").innerText = playerDeck.length;
}

function createSlots(f, o) { 
    for(let i=0; i<5; i++) { 
        const s = document.createElement("div"); s.className = "slot"; s.dataset.owner = o; 
        if(o === "player") { 
            s.onclick = (e) => { if(selectedCardFromHand) executePlayCard(e.currentTarget, selectedCardFromHand); }; 
            s.ondragover = (e) => { e.preventDefault(); };
            s.ondrop = (e) => { e.preventDefault(); if (isSystemLocked || !draggedCard || draggedCard.dataset.type === "feitico") return; executePlayCard(e.currentTarget, draggedCard); }; 
        } 
        f.appendChild(s); 
    } 
}

function executePlayCard(slot, card) {
    if(card.dataset.type === "feitico") return; let cst = parseInt(card.dataset.cost) || 0; let donoDoSlot = slot.dataset.owner; 
    if(playerMana >= cst) {
        playerMana -= cst; slot.appendChild(card); 
        
        if(donoDoSlot === "player" && window.conexao && window.conexao.open) { let slotIndex = Array.from(slot.parentElement.children).indexOf(slot); window.enviarPacote({ acao: "JOGAR_CARTA", cardName: card.dataset.name, slotIndex: slotIndex }); }

        card.classList.remove("deployment-selected"); gsap.killTweensOf(card); gsap.set(card, { clearProps: "all" }); 
        gsap.set(card, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0, x: 0, y: 0, rotation: 0 });
        card.dataset.hasAttacked = "true"; card.classList.add("exhausted");
        playSound("deploy"); updateLifeAndMana(); setTimeout(updateAuras, 100); draggedCard = null; selectedCardFromHand = null; arrangeHand();
    } else { playSound("error"); alert("RAM INSUFICIENTE!"); }
}

function resolveCombat(atkCard, defCard, isPlayer) {
    const rectAtk = atkCard.getBoundingClientRect(); const rectDef = defCard.getBoundingClientRect();
    const moveX = rectDef.left - rectAtk.left; const moveY = rectDef.top - rectAtk.top;
    atkCard.style.zIndex = "100";

    if (isPlayer && window.conexao && window.conexao.open) {
        let atkSlot = Array.from(atkCard.parentElement.parentElement.children).indexOf(atkCard.parentElement);
        let targetType = defCard.id.includes("hero") ? "hero" : "card";
        let defSlot = targetType === "card" ? Array.from(defCard.parentElement.parentElement.children).indexOf(defCard.parentElement) : null;
        window.enviarPacote({ acao: "ATACAR", atkSlot: atkSlot, targetType: targetType, defSlot: defSlot });
    }

    gsap.to(atkCard, {
        x: moveX, y: moveY, duration: 0.28, ease: "power3.in",
        onComplete: () => {
            if(window.VFX) VFX.onAttack(atkCard, defCard, atkCard.dataset.effect);
            if(atkCard.dataset.somAtaque) { let a = new Audio(atkCard.dataset.somAtaque); a.play().catch(()=>{}); } else { playSound("hit"); }
            
            let dmgToDef = parseInt(atkCard.dataset.attack) || 0; let dmgToAtk = 0;
            if(!defCard.id.includes("hero")) dmgToAtk = parseInt(defCard.dataset.attack) || 0; 
            
            if(defCard.id.includes("hero")) { if(isPlayer) enemyLife -= dmgToDef; else playerLife -= dmgToDef; screenShake(); } 
            else { applyDamage(defCard, dmgToDef); gsap.fromTo(defCard, {x: -5}, {x: 5, duration: 0.05, yoyo: true, repeat: 5}); }
            
            if (dmgToAtk > 0) applyDamage(atkCard, dmgToAtk);
            if (atkCard.dataset.effect === "roubo_vida" && isPlayer) playerLife = Math.min(playerLife + dmgToDef, maxLife);

            checkGameOver(); updateLifeAndMana(); 
            
            let attackerAlive = (parseInt(atkCard.dataset.hp) || 0) > 0;
            let defenderDied = !defCard.id.includes("hero") && (parseInt(defCard.dataset.hp) || 0) <= 0;

            if (attackerAlive && atkCard.dataset.effect === "furia" && defenderDied) { atkCard.dataset.hasAttacked = "false"; atkCard.classList.remove("exhausted"); if(window.VFX) VFX.fury(atkCard); } 
            else if (attackerAlive) { atkCard.dataset.hasAttacked = "true"; atkCard.classList.add("exhausted"); }
            
            atkCard.classList.remove("attacker-selected"); selectedAttacker = null;
            if (attackerAlive) { gsap.to(atkCard, { x: 0, y: 0, duration: 0.45, ease: "power2.out", onComplete: () => { atkCard.style.zIndex = ""; } }); }
        }
    });
}

function applyDamage(target, dmg) {
    if(target.dataset.dead === "true") return; 
    let currentEffect = target.dataset.effect || target.dataset.originalEffect;
    if(currentEffect === "escudo_divino" && !target.dataset.shieldBroken) { target.dataset.shieldBroken = "true"; target.classList.remove("shield-card"); if(window.VFX) VFX.shield(target); return; }
    if(window.VFX) VFX.onDamage(target, currentEffect);
    target.dataset.damageTaken = (parseInt(target.dataset.damageTaken) || 0) + dmg;
    recalculateStats(target);
}

function processCardEffect(gatilho, cartaObj, owner) {
    const efeito = cartaObj.dataset.effect; const isPlayer = owner === "player";
    if (gatilho === "AoJogar") {
        if (efeito === "reciclar" && isPlayer && graveyard.player.length > 0) { playerDeck.push(graveyard.player.pop()); updateLifeAndMana(); }
        if (efeito === "atordoar") { const targets = document.getElementById(isPlayer ? "enemy-field" : "player-field").querySelectorAll('.card-base'); if(targets.length > 0) { const t = targets[Math.floor(Math.random() * targets.length)]; t.classList.add("exhausted"); t.dataset.hasAttacked = "true"; if(window.VFX) VFX.stun(t); } }
        if (efeito === "roubo_energia" && isPlayer) { enemyLife -= 1; updateLifeAndMana(); if(window.VFX) VFX.particles(document.getElementById("enemy-hero"), "#ff00ff"); }
    }
    if (gatilho === "UltimoSuspiro") {
        graveyard[owner].push(baseDeck.find(c => c.title === cartaObj.dataset.name)); 
        if (efeito === "evocar_recruta") { const slot = cartaObj.parentElement; setTimeout(() => { if(slot && !slot.querySelector('.card-base')) { const recruit = createCard(baseDeck.find(c => c.title === "Cadete de Patrulha")); recruit.dataset.owner = owner; gsap.set(recruit, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0 }); slot.appendChild(recruit); if(window.VFX) VFX.onSummon(recruit, "provocar"); } }, 500); }
    }
    if (gatilho === "FimDeTurno") {
        if (efeito === "cura_turno" && isPlayer) { playerLife = Math.min(playerLife+1, maxLife); if(window.VFX) VFX.particles(document.getElementById("player-hero"), "#00ff00"); }
        if (efeito === "regeneracao") { cartaObj.dataset.damageTaken = Math.max(0, (parseInt(cartaObj.dataset.damageTaken) || 0) - 1); recalculateStats(cartaObj); if(window.VFX) VFX.particles(cartaObj, "#00ff00"); }
    }
}

async function aiDeployPhase() {
    await sleep(1500); if(gameIsOver) return;
    const slots = Array.from(document.getElementById("enemy-field").children).filter(s=>!s.hasChildNodes()); 
    if(slots.length > 0 && Math.random() > 0.1) { 
        const pool = baseDeck.filter(x => x.tipo !== "feitico" && x.tipo !== "equipamento"); 
        const c = pool[Math.floor(Math.random() * pool.length)]; 
        const el = createCard(c); el.dataset.owner="enemy"; slots[0].appendChild(el); playSound("deploy");
        gsap.set(el, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0, x: 0, y: 0, rotation: 0 });
        if (el.dataset.effect === "investida") el.dataset.hasAttacked = "false"; else { el.dataset.hasAttacked = "true"; el.classList.add("exhausted"); }
        if(window.VFX) VFX.onSummon(el, el.dataset.effect); processCardEffect("AoJogar", el, "enemy"); updateAuras();
    } 
    await sleep(1000); if (!gameIsOver) advancePhase();
}

async function aiCombatPhase() {
    await sleep(1000); if(gameIsOver) return;
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
    await sleep(500); if (!gameIsOver) advancePhase();
}

function checkGameOver() { 
    if (playerLife > 0 && enemyLife > 0) return; 
    gameIsOver = true; clearInterval(timerInterval); isSystemLocked = true; 
    const playerWon = playerLife > 0; const modal = document.getElementById("game-over-modal");
    modal.innerHTML = `<div class="modal-content final-screen"><img src="https://i.pinimg.com/originals/03/95/34/0395349bcc0db6334319650be9574588.gif" class="final-gif"><h1 class="final-title">${playerWon ? "VITÓRIA" : "DERROTA"}</h1><button class="cmd-btn" onclick="location.reload()">[ RETORNAR ]</button></div>`;
    setTimeout(() => modal.classList.add("active"), 1000); 
}

function drawCard() { 
    if(playerDeck.length > 0) { 
        const novaCarta = createCard(playerDeck.pop()); document.getElementById("hand").appendChild(novaCarta); 
        gsap.set(novaCarta, { y: -500, x: 200, rotationY: 180, scale: 0.2, opacity: 0 }); arrangeHand(); gsap.to(novaCarta, { rotationY: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }); updateLifeAndMana(); 
    } 
}

function arrangeHand(cartaParaIgnorar = null) { 
    const cards = Array.from(document.getElementById("hand").children); 
    for (let i = 0; i < cards.length; i++) { 
        const card = cards[i]; if (card === cartaParaIgnorar) continue;
        card.dataset.origZ = i; gsap.set(card, { zIndex: i }); 
        const angle = -15 + (30) * (cards.length > 1 ? i / (cards.length - 1) : 0.5); 
        const targetLeft = `calc(50% + ${(i - (cards.length - 1) / 2) * 110}px)`; const targetBottom = `${(Math.abs(angle) * 2) - 30}px`; 
        gsap.to(card, { left: targetLeft, bottom: targetBottom, y: 0, rotation: angle, xPercent: -50, scale: 0.7, duration: 0.4, ease: "power2.out" });
    } 
}

/* =========================================================
   📡 MÓDULO DE REDE P2P
   ========================================================= */
function initMultiplayer() {
    const btnOpenP2P = document.getElementById("btn-open-p2p");
    if(btnOpenP2P) {
        btnOpenP2P.onclick = () => {
            playSound("click"); document.getElementById("p2p-modal").classList.add("active");
            if(!window.peer) {
                document.getElementById("meu-status").innerText = "GERANDO CHAVE..."; document.getElementById("meu-status").style.color = "yellow";
                let codigoSala = 'ZEUS-' + Math.random().toString(36).substr(2, 4).toUpperCase();
                window.peer = new Peer(codigoSala);
                window.peer.on('open', function(id) { document.getElementById("meu-status").innerText = "SEU ID: " + id; document.getElementById("meu-status").style.color = "#00ffcc"; });
                window.peer.on('connection', function(conn) { window.conexao = conn; window.isHost = true; prepararBatalha(); });
            }
        };
    }
    const btnClient = document.getElementById("btn-client");
    if(btnClient) {
        btnClient.onclick = () => {
            playSound("click"); let codigo = document.getElementById("id-alvo").value.toUpperCase().trim(); 
            if(!codigo) { playSound("error"); alert("SISTEMA: Digite o ID do Host."); return; }
            if(!window.peer) window.peer = new Peer(); 
            document.getElementById("meu-status").innerText = "CONECTANDO...";
            window.conexao = window.peer.connect(codigo);
            window.conexao.on('open', function() { window.isHost = false; prepararBatalha(); });
        };
    }
}

function prepararBatalha() {
    playSound("deploy"); document.getElementById("p2p-modal").classList.remove("active"); alert("CONEXÃO ESTABELECIDA!"); 
    startGameDirect("casual", "theme-lab"); 

    window.conexao.on('data', function(pacote) {
        if(pacote.acao === "AVANCAR_FASE") {
            advancePhase(true);
        }
        else if(pacote.acao === "PASSAR_TURNO") { 
            playSound("deploy");
            startNewRound(true);
        }
        else if(pacote.acao === "JOGAR_CARTA") {
            playSound("deploy"); const cardData = baseDeck.find(c => c.title === pacote.cardName);
            if(cardData) {
                const enemyCard = createCard(cardData); enemyCard.dataset.owner = "enemy"; enemyCard.ondragstart = (e) => e.preventDefault(); 
                const slotInimigo = document.getElementById("enemy-field").children[4 - pacote.slotIndex];
                if(slotInimigo) { 
                    slotInimigo.appendChild(enemyCard); 
                    gsap.set(enemyCard, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0, x: 0, y: 0, rotation: 0 });
                    if(window.VFX) VFX.onSummon(enemyCard, enemyCard.dataset.effect); processCardEffect("AoJogar", enemyCard, "enemy"); setTimeout(updateAuras, 100); 
                }
            }
        }
        else if(pacote.acao === "JOGAR_EQUIPAMENTO") {
            const cardData = baseDeck.find(c => c.title === pacote.cardName);
            const slotInimigo = document.getElementById("enemy-field").children[4 - pacote.slotIndex];
            if(slotInimigo && cardData) {
                const targetCard = slotInimigo.querySelector('.card-base');
                if(targetCard) { const dummyEquip = createCard(cardData); executeEquip(dummyEquip, targetCard, "enemy"); }
            }
        }
        else if(pacote.acao === "ATACAR") {
            const enemySlot = document.getElementById("enemy-field").children[4 - pacote.atkSlot];
            const atkCard = enemySlot ? enemySlot.querySelector('.card-base') : null;
            let defCard;
            if(pacote.targetType === "hero") defCard = document.getElementById("player-hero"); 
            else {
                const mySlot = document.getElementById("player-field").children[4 - pacote.defSlot];
                defCard = mySlot ? mySlot.querySelector('.card-base') : null;
            }
            if(atkCard && defCard) { resolveCombat(atkCard, defCard, false); }
        }
        else if(pacote.acao === "LANCAR_MAGIA") {
            const cardData = baseDeck.find(c => c.title === pacote.cardName);
            if (!cardData) return;
            const dummySpell = createCard(cardData);
            let targetElement;
            if (pacote.targetOwner === "enemy" && pacote.targetType === "hero") targetElement = document.getElementById("player-hero");
            else if (pacote.targetOwner === "player" && pacote.targetType === "hero") targetElement = document.getElementById("enemy-hero");
            else if (pacote.targetOwner === "enemy" && pacote.targetType === "card") {
                const slot = document.getElementById("player-field").children[4 - pacote.defSlot];
                targetElement = slot.querySelector('.card-base');
            }
            else if (pacote.targetOwner === "player" && pacote.targetType === "card") {
                const slot = document.getElementById("enemy-field").children[4 - pacote.defSlot];
                targetElement = slot.querySelector('.card-base');
            }
            if(targetElement) executeSpell(dummySpell, targetElement, pacote.targetOwner === "enemy" ? "player" : "enemy"); 
        }
    });
}

window.enviarPacote = function(dados) { if(window.conexao && window.conexao.open) window.conexao.send(dados); }
window.addEventListener('DOMContentLoaded', bootTerminal);
