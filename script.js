console.log("Conexão JS Estabelecida. MOTOR V7.0: Contra-Ataque Ativo, Anti-NaN e VFX Integrado.");

window.onerror = function(msg) { if (msg.includes("gsap is not defined")) return true; return false; };
const sleep = ms => new Promise(r => setTimeout(r, ms));

const sfx = { 
    bgm: new Audio("https://files.catbox.moe/5j62nk.mp3"), 
    click: new Audio("https://files.catbox.moe/nslg07.wav"), 
    deploy: new Audio("https://files.catbox.moe/bi22a9.wav"), 
    hit: new Audio("https://files.catbox.moe/vwoemb.wav"), 
    error: new Audio("https://files.catbox.moe/f1wdc8.mp3") 
};
sfx.bgm.loop = true; sfx.bgm.volume = 0.4;
function playSound(type) { if(sfx[type]) { if(type !== 'bgm') sfx[type].currentTime = 0; sfx[type].play().catch(e=>{}); } }

function screenShake() { 
    const b = document.getElementById("board"); 
    if(b) { 
        b.animate([
            { transform: "translate(8px, 8px) rotate(2deg)" },
            { transform: "translate(-8px, -8px) rotate(-2deg)" },
            { transform: "translate(8px, -8px) rotate(2deg)" },
            { transform: "translate(0, 0) rotate(0deg)" }
        ], { duration: 400 });
    } 
}

const campaignData = [
    { name: "SETOR 1: PERÍMETRO", bossName: "UNIDADE DE CONTROLE", bossHp: 15, bossImg: "https://files.catbox.moe/05e01v.png", arena: "arena-neon", briefing: "A barreira da Zona 4 está vulnerável." },
    { name: "SETOR 2: BIOLAB", bossName: "ESPÉCIME 042", bossHp: 25, bossImg: "https://files.catbox.moe/nvlqhz.png", arena: "arena-toxic", briefing: "O Espécime 042 está fora de controle." },
    { name: "SETOR 3: TORRE ZEUS", bossName: "GENERAL MÃO DE FERRO", bossHp: 40, bossImg: "https://files.catbox.moe/wkfzj3.png", arena: "arena-blood", briefing: "O General protege o núcleo pessoalmente." }
];

const baseDeck = [
    { title: "Agente Novato", tipo: "tropa", raridade: "comum", custo: 1, atk: 1, def: 2, efeito: "nenhum", text: "Eles não sabem o que os espera lá embaixo.", img: "https://i.postimg.cc/3JgCTq5Q/soldado-novato.png" },
    { title: "Drone de Varredura", tipo: "tropa", raridade: "comum", custo: 1, atk: 2, def: 1, efeito: "nenhum", text: "Identificando anomalias no setor 4.", img: "https://i.postimg.cc/pXDYHSbN/Drone-de-Varredura.png" },
    { title: "Segurança Aegis", tipo: "tropa", raridade: "comum", custo: 2, atk: 2, def: 3, efeito: "provocar", text: "Blindagem pesada. Bloqueia o avanço inimigo.", img: "https://i.postimg.cc/284FDtps/Seguranca-Aegis.png" },
    { title: "Atirador Furtivo", tipo: "tropa", raridade: "comum", custo: 2, atk: 3, def: 1, efeito: "nenhum", text: "Um tiro. Uma baixa. Nenhum rastro.", img: "https://i.postimg.cc/Fsjg46t8/Atirador-Furtivo.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Ciborgue Falho", tipo: "tropa", raridade: "comum", custo: 3, atk: 3, def: 3, efeito: "nenhum", text: "A fusão de carne e metal não foi perfeita.", img: "https://i.postimg.cc/65dLXPsS/Ciborgue-Falho.png" },
    { title: "Mercenário", tipo: "tropa", raridade: "comum", custo: 3, atk: 4, def: 2, efeito: "nenhum", text: "Só se importa com os créditos na conta.", img: "https://i.postimg.cc/4Nzbg0C2/Mercenario.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Protocolo: EMP", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "dano_2", text: "Pulso Eletromagnético. Causa 2 de dano direto a um alvo.", img: "https://i.postimg.cc/fTxjNP4H/Protocolo-EMP.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Kit Médico Tático", tipo: "feitico", raridade: "comum", custo: 1, atk: 0, def: 0, efeito: "cura_3", text: "Injeção de coagulantes. Restaura 3 de Vida de um aliado.", img: "https://i.postimg.cc/DyqdTNV5/Kit-Medico-Tatico.png" },
    { title: "Cobaia Estágio 1", tipo: "tropa", raridade: "rara", custo: 4, atk: 3, def: 6, efeito: "provocar", text: "Músculos expostos. Fúria cega.", img: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png" },
    { title: "Sobrevivente Rebelde", tipo: "tropa", raridade: "rara", custo: 4, atk: 5, def: 2, efeito: "ataque_duplo", text: "Age duas vezes.", img: "https://i.postimg.cc/bNQHh5Xx/Sobrevivente-Rebelde.png" },
    { title: "Especialista em Explosivos", tipo: "tropa", raridade: "rara", custo: 5, atk: 4, def: 4, efeito: "nenhum", text: "O cheiro de pólvora é seu perfume.", img: "https://i.postimg.cc/kXrFLmHs/Especialista-em-Explosivos.png" },
    { title: "Protocolo: Purga", tipo: "feitico", raridade: "rara", custo: 4, atk: 0, def: 0, efeito: "dano_area", text: "2 dano em TODAS as ameaças inimigas.", img: "https://i.postimg.cc/ZKkFXSQV/Protocolo-Purga.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Exoesqueleto Mk.II", tipo: "tropa", raridade: "rara", custo: 6, atk: 5, def: 5, efeito: "nenhum", text: "Engrenagens esmagam ossos com facilidade.", img: "https://i.postimg.cc/qMfXWTFQ/Exoesqueleto-Mk-II.png" },
    { title: "Médico de Combate", tipo: "tropa", raridade: "rara", custo: 3, atk: 1, def: 4, efeito: "cura_turno", text: "Restaura 1 de Integridade sua ao fim de cada ciclo.", img: "https://i.postimg.cc/65sLFXPh/Medico-de-Combate.png" },
    { title: "Mutante Instável", tipo: "tropa", raridade: "rara", custo: 5, atk: 4, def: 5, efeito: "regeneracao", text: "Células se replicam rápido. Cura si mesmo.", img: "https://i.postimg.cc/mg1SnrL7/Mutante-Instavel.png" },
    { title: "Hack de Sobrecarga", tipo: "feitico", raridade: "rara", custo: 3, atk: 0, def: 0, efeito: "dano_4", text: "4 de dano letal direto a um alvo.", img: "https://files.catbox.moe/tl6rvy.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Quimera Alada", tipo: "tropa", raridade: "epica", custo: 4, atk: 3, def: 4, efeito: "voar", text: "Asas de morcego costuradas num torso humano.", img: "https://i.postimg.cc/mrcscCyq/Quimera-Alada.png" },
    { title: "Ceifador da Unidade", tipo: "tropa", raridade: "epica", custo: 6, atk: 6, def: 5, efeito: "roubo_vida", text: "Sua lâmina drena a energia vital do alvo.", img: "https://i.postimg.cc/pLcvXqzj/Ceifador-da-Unidade.png" },
    { title: "Sentinela Ômega", tipo: "tropa", raridade: "epica", custo: 7, atk: 5, def: 7, efeito: "escudo", text: "Um tanque de guerra bípede quase indestrutível.", img: "https://i.postimg.cc/q7tTtyx1/Sentinela-Omega.png", som_ataque: "https://files.catbox.moe/5nlm3z.wav" },
    { title: "Projeto Zeus: Alfa", tipo: "tropa", raridade: "lendaria", custo: 8, atk: 8, def: 8, efeito: "nenhum", text: "A perfeição evolutiva. O fim da humanidade.", img: "https://i.postimg.cc/0yXv2cDX/Projeto-Zeus-Alfa.png" },
    { title: "Infiltrador das Sombras", tipo: "humano", raridade: "comum", custo: 1, atk: 2, def: 1, efeito: "furtividade", text: "Não pode ser alvo de feitiços até atacar.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZoPOtDbsR6X1lPe9V86rfBHlh2Q9TrW7sg&s" },
    { title: "Sucateiro da Zona Sul", tipo: "humano", raridade: "comum", custo: 2, atk: 1, def: 3, efeito: "reciclar", text: "Grito de Guerra: Devolve uma carta do cemitério.", img: "https://files.catbox.moe/dbnyi2.png" },
    { title: "Cadete de Patrulha", tipo: "soldado", raridade: "comum", custo: 1, atk: 1, def: 3, efeito: "provocar", text: "A primeira linha de defesa contra o caos.", img: "https://files.catbox.moe/ui0skk.png" },
    { title: "Escudeiro de Elite", tipo: "soldado", raridade: "comum", custo: 3, atk: 2, def: 5, efeito: "escudo_divino", text: "Ignora a primeira instância de dano recebida.", img: "https://files.catbox.moe/ebt0u6.png" },
    { title: "Hacker do Mainframe", tipo: "humano", raridade: "rara", custo: 4, atk: 2, def: 2, efeito: "roubo_energia", text: "Grito de Guerra: Destrói 1 de Mana do inimigo.", img: "https://files.catbox.moe/tl6rvy.png" },
    { title: "Barreira Eletrônica", tipo: "estrutura", raridade: "comum", custo: 2, atk: 0, def: 7, efeito: "provocar", text: "Um muro de energia.", img: "https://files.catbox.moe/b097ur.png" },
    { title: "Atirador de Supressão", tipo: "soldado", raridade: "rara", custo: 4, atk: 4, def: 3, efeito: "reduzir_atk", text: "Alvos perdem 2 de ATK permanentemente.", img: "https://files.catbox.moe/vynjlp.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Blindado de Transporte", tipo: "mecanizado", raridade: "rara", custo: 5, atk: 3, def: 8, efeito: "evocar_recruta", text: "Último Suspiro: Evoca dois Cadetes.", img: "https://files.catbox.moe/997fyd.png" },
    { title: "Especialista em Contenção", tipo: "humano", raridade: "rara", custo: 3, atk: 3, def: 2, efeito: "atordoar", text: "Grito de Guerra: Atordoa um inimigo.", img: "https://files.catbox.moe/nvlqhz.png" },
    { title: "Bombardeio Orbital", tipo: "feitico", raridade: "epica", custo: 6, atk: 0, def: 0, efeito: "dano_total", text: "Causa 4 de dano a TODOS os inimigos.", img: "https://files.catbox.moe/8pzmk6.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Unidade K-9 Cibernética", tipo: "ciborgue", raridade: "comum", custo: 2, atk: 3, def: 1, efeito: "investida", text: "Pode atacar no mesmo turno.", img: "https://files.catbox.moe/lc3rez.png" },
    { title: "General Mão de Ferro", tipo: "humano", raridade: "lendaria", custo: 7, atk: 6, def: 7, efeito: "aura_defesa", text: "Suas outras unidades recebem +2 DEF e Provocar.", img: "https://files.catbox.moe/wkfzj3.png" },
    { title: "O Punho da Resistência", tipo: "mecanizado", raridade: "lendaria", custo: 7, atk: 7, def: 7, efeito: "furia", text: "Pode atacar novamente se matar.", img: "https://files.catbox.moe/nuxefh.png" },
    { title: "Pacificador V.9", tipo: "mecanizado", raridade: "lendaria", custo: 8, atk: 9, def: 9, efeito: "anular_efeito", text: "Inimigos perdem habilidades.", img: "https://files.catbox.moe/7cjywl.png" },
    { title: "Interceptor de Zeus", tipo: "drone", raridade: "comum", custo: 2, atk: 2, def: 3, efeito: "sentinela", text: "Ataca Furtivos automaticamente.", img: "https://files.catbox.moe/05e01v.png" },
    { title: "Agente da PIDE-Tec", tipo: "humano", raridade: "rara", custo: 3, atk: 2, def: 4, efeito: "nenhum", text: "Espionagem e sabotagem de dados.", img: "https://files.catbox.moe/nifj2x.png" }
];

let currentLevel = 0, gameMode = "campaign", playerCollection = [], customDeck = [], playerDeck = [];
let graveyard = { player: [], enemy: [] };
let playerFragments = 0, totalWins = 0, currentSortMode = "cost";
let maxMana = 3, playerMana = 3, maxLife = 20, playerLife = 20, enemyLife = 20, currentTurn = 1;
let attackToken = "player", currentStep = "deploy_attacker"; 
let selectedAttacker = null, selectedCardFromHand = null, turnTime = 80, timerInterval, gameIsOver = false, selectedHeroObj = null, isSystemLocked = false, draggedCard = null; 

function loadSaveData() {
    playerCollection = [];
    baseDeck.forEach(card => { playerCollection.push({...card}); playerCollection.push({...card}); playerCollection.push({...card}); });
    playerFragments = 9999;
}

function bootTerminal() {
    loadSaveData();
    const btnStart = document.getElementById("btn-start");
    if(btnStart) btnStart.onclick = () => { 
        document.getElementById("start-screen").classList.remove("active"); document.getElementById("hero-screen").classList.add("active"); 
        playSound("click"); playSound("bgm"); 
        document.getElementById("fragment-count").innerText = playerFragments;
    };
    if(document.getElementById("btn-home")) document.getElementById("btn-home").onclick = () => location.reload();

    document.querySelectorAll(".hero-choice").forEach(choice => {
        choice.onclick = () => {
            playSound("click");
            document.querySelectorAll(".hero-choice").forEach(c => c.classList.remove("selected"));
            choice.classList.add("selected");
            selectedHeroObj = { id: choice.dataset.hero, imgUrl: choice.dataset.img };
            customDeck = baseDeck.slice(0,15); 
            document.getElementById("hero-actions").style.display = "flex";
        };
    });

    const btnMission = document.getElementById("btn-start-battle-direct");
    const modalMode = document.getElementById("mode-selection-modal");
    if(btnMission) btnMission.onclick = () => { playSound("click"); if(modalMode) modalMode.classList.add("active"); else startGameDirect("casual"); };
    if(document.getElementById("btn-mode-story")) document.getElementById("btn-mode-story").onclick = () => { modalMode.classList.remove("active"); startGameDirect("campaign"); };
    if(document.getElementById("btn-mode-casual")) document.getElementById("btn-mode-casual").onclick = () => { modalMode.classList.remove("active"); startGameDirect("casual"); };
    if(document.getElementById("btn-cancel-mode")) document.getElementById("btn-cancel-mode").onclick = () => modalMode.classList.remove("active");

    const btnDeck = document.getElementById("btn-edit-deck");
    if(btnDeck) btnDeck.onclick = () => { document.getElementById("hero-screen").classList.remove("active"); document.getElementById("deck-builder-screen").classList.add("active"); initDeckBuilder(); };
    const btnMarket = document.getElementById("btn-open-market");
    if(btnMarket) btnMarket.onclick = () => { document.getElementById("hero-screen").classList.remove("active"); document.getElementById("market-screen").classList.add("active"); initMarket(); };
    const btnBackMarket = document.getElementById("btn-leave-market");
    if(btnBackMarket) btnBackMarket.onclick = () => { document.getElementById("market-screen").classList.remove("active"); document.getElementById("hero-screen").classList.add("active"); };

    const handInd = document.getElementById("hand-indicator");
    if(handInd) handInd.onclick = (e) => { e.stopPropagation(); document.getElementById("hand").classList.toggle("expanded"); };
    
    document.getElementById("board").onclick = (e) => {
        if (!e.target.closest('.slot') && !e.target.closest('.card-base') && !e.target.closest('.hero-panel')) {
            document.getElementById("hand").classList.remove("expanded");
            if(selectedCardFromHand) { selectedCardFromHand.classList.remove("deployment-selected"); selectedCardFromHand = null; }
            if(selectedAttacker) { selectedAttacker.classList.remove("attacker-selected"); selectedAttacker = null; }
        }
    };
    if(document.getElementById("actionBtn")) document.getElementById("actionBtn").onclick = handleActionBtn;
}

function initDeckBuilder() {
    if(document.getElementById("sort-cost")) document.getElementById("sort-cost").onclick = () => { currentSortMode = "cost"; renderVitrine(); playSound("click"); };
    if(document.getElementById("sort-rarity")) document.getElementById("sort-rarity").onclick = () => { currentSortMode = "rarity"; renderVitrine(); playSound("click"); };
    if(document.getElementById("sort-type")) document.getElementById("sort-type").onclick = () => { currentSortMode = "type"; renderVitrine(); playSound("click"); };
    if(document.getElementById("btn-close-inspect")) document.getElementById("btn-close-inspect").onclick = () => { playSound("click"); document.getElementById("inspect-modal").classList.remove("active"); };

    renderVitrine();
    let btnBack = document.getElementById("btn-back-from-deck");
    if(btnBack) btnBack.onclick = () => { playSound("click"); document.getElementById("deck-builder-screen").classList.remove("active"); document.getElementById("hero-screen").classList.add("active"); };
}

function renderVitrine() {
    const poolGrid = document.getElementById("card-pool-grid"); 
    if(!poolGrid) return;
    poolGrid.innerHTML = "";
    let uniqueCards = []; playerCollection.forEach(card => { if(!uniqueCards.find(c => c.title === card.title)) uniqueCards.push(card); });
    
    uniqueCards.sort((a, b) => {
        if (currentSortMode === "cost") return a.custo - b.custo;
        if (currentSortMode === "type") return a.tipo.localeCompare(b.tipo);
        if (currentSortMode === "rarity") { const peso = { "comum": 1, "rara": 2, "epica": 3, "lendaria": 4 }; return peso[b.raridade] - peso[a.raridade]; }
    });

    uniqueCards.forEach(card => {
        const div = document.createElement("div"); div.className = `pool-card ${card.raridade}`;
        const imgUrl = card.img ? card.img : `https://placehold.co/100x80/111/ff0000?text=IMG`;
        div.innerHTML = `<div class="inspect-btn" title="Inspecionar">👁️</div><img src="${imgUrl}" class="pool-img"><div class="pool-info"><div class="pool-title">${card.title}</div><div class="pool-cost">${card.custo}⚡</div></div>`;
        div.onclick = (e) => { if(e.target.classList.contains("inspect-btn")) openInspectModal(card); else addCardToDeck(card); };
        poolGrid.appendChild(div);
    });
    updateDeckUI();
}

function openInspectModal(cardData) {
    playSound("click");
    const container = document.getElementById("inspect-card-container"); 
    if(!container) return;
    container.innerHTML = "";
    const visualCard = createCard(cardData);
    visualCard.onclick = null; visualCard.ondragstart = null; visualCard.style.position = "relative"; visualCard.style.cursor = "default";
    container.appendChild(visualCard);
    document.getElementById("inspect-modal").classList.add("active");
}

function addCardToDeck(card) { 
    if (customDeck.length < 15) { 
        const inDeckCount = customDeck.filter(c => c.title === card.title).length;
        if (inDeckCount < 3) { customDeck.push({...card}); updateDeckUI(); } else { playSound("error"); alert("Máximo de 3 cópias iguais no deck."); }
    } 
}

function removeCardFromDeck(index) { customDeck.splice(index, 1); updateDeckUI(); }
function updateDeckUI() {
    const deckList = document.getElementById("current-deck-list"); if(!deckList) return;
    deckList.innerHTML = ""; customDeck.sort((a,b) => a.custo - b.custo);
    customDeck.forEach((card, index) => { 
        const d = document.createElement("div"); d.className="deck-item"; 
        d.innerHTML=`<span>${card.title}</span> <span style="color:cyan">${card.custo}⚡</span>`; d.onclick=()=>removeCardFromDeck(index); deckList.appendChild(d); 
    });
    if(document.getElementById("deck-count")) document.getElementById("deck-count").innerText = `${customDeck.length}/15`;
    const btnStart = document.getElementById("btn-start-battle");
    if(btnStart) {
        btnStart.style.display = (customDeck.length === 15) ? "block" : "none";
        btnStart.onclick = () => { document.getElementById("deck-builder-screen").classList.remove("active"); document.getElementById("game-screen").classList.add("active"); startGameDirect("casual"); };
    }
}

function initMarket() {
    const grid = document.getElementById("market-grid"); if(!grid) return;
    grid.className = "pool-grid"; grid.innerHTML = "";
    baseDeck.forEach(card => {
        const copies = playerCollection.filter(c => c.title === card.title).length;
        const div = document.createElement("div"); div.className = `pool-card ${copies > 0 ? card.raridade : 'comum'}`;
        const imgUrl = card.img ? card.img : `https://placehold.co/100x80/111/ff0000?text=IMG`;
        div.innerHTML = `<div class="copies-badge" style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.9); color: cyan; font-size: 0.8rem; font-weight: bold; padding: 3px 8px; border: 1px solid cyan; border-radius: 4px; z-index: 5;">x${copies}</div><img src="${imgUrl}" class="pool-img" style="filter: grayscale(${copies > 0 ? 0 : 1}) contrast(1.2); opacity: ${copies > 0 ? 1 : 0.4};"><div class="pool-info"><div class="pool-title" style="color: ${copies > 0 ? '#fff' : '#555'};">${card.title}</div><div class="pool-cost" style="color: ${copies > 0 ? '#00ffff' : '#444'};">${card.custo}⚡</div></div>`;
        div.onclick = () => { playSound("click"); openMarketModal(card, copies); };
        grid.appendChild(div);
    });
}

function openMarketModal(card, copies) {
    document.getElementById("transact-title").innerText = card.title; document.getElementById("transact-copies").innerText = copies; document.getElementById("transaction-modal").classList.add("active");
    const custo = card.raridade === 'lendaria' ? 500 : (card.raridade === 'epica' ? 200 : (card.raridade === 'rara' ? 100 : 50));
    document.getElementById("btn-buy-card").innerText = `COMPRAR (${custo}💽)`;
    document.getElementById("btn-buy-card").onclick = () => { if(playerFragments >= custo) { playerFragments -= custo; playerCollection.push({...card}); initMarket(); openMarketModal(card, copies+1); playSound("deploy"); } else { playSound("error"); alert("HDs INSUFICIENTES"); } };
    document.getElementById("btn-sell-card").innerText = `VENDER (+${custo/5}💽)`;
    document.getElementById("btn-sell-card").onclick = () => { if(copies > 0) { playerFragments += custo/5; const idx = playerCollection.findIndex(c => c.title === card.title); if(idx > -1) playerCollection.splice(idx,1); initMarket(); openMarketModal(card, copies-1); playSound("click"); } };
    document.getElementById("btn-close-transaction").onclick = () => document.getElementById("transaction-modal").classList.remove("active");
}

/* =========================================================
   BLINDAGEM CONTRA NaN E CONTRA-ATAQUE (MOTOR V7.0)
   ========================================================= */
function createCard(item) { 
    if(!item) return document.createElement("div"); // Prevenção 1
    const c = document.createElement("div"); 
    c.className = `card-base ${item.raridade || 'comum'} ${item.tipo || 'tropa'}`;
    
    // BLINDAGEM MATEMÁTICA ANTI-NaN
    let safeAtk = Number(item.atk); if(isNaN(safeAtk)) safeAtk = 0;
    let safeDef = Number(item.def); if(isNaN(safeDef)) safeDef = 0;
    let safeCost = Number(item.custo); if(isNaN(safeCost)) safeCost = 0;

    c.draggable = true; 
    c.dataset.name = item.title; 
    c.dataset.attack = safeAtk; 
    c.dataset.hp = safeDef; 
    c.dataset.cost = safeCost; 
    c.dataset.type = item.tipo; 
    c.dataset.effect = item.efeito; 
    c.dataset.hasAttacked = "false";
    
    let typeIcon = item.tipo === "tropa" ? "⚔️" : "⚡"; if(item.tipo === "mecanizado" || item.tipo === "drone" || item.tipo === "ciborgue") typeIcon = "⚙️"; if(item.tipo === "humano" || item.tipo === "medico" || item.tipo === "soldado") typeIcon = "🧬"; if(item.tipo === "estrutura") typeIcon = "🏗️";
    let starsCount = item.raridade === "lendaria" ? 5 : (item.raridade === "epica" ? 3 : (item.raridade === "rara" ? 2 : 1));
    let starsHTML = '<div class="card-stars">'; for(let i=0; i<starsCount; i++) starsHTML += '<div class="star">★</div>'; starsHTML += '</div>';
    
    // Status Visuais 100% Números (Sem letras ou vazios)
    let statsHTML = item.tipo !== 'feitico' ? `<div class="card-stats"><div class="stat-badge stat-atk">${safeAtk}</div><div class="stat-badge stat-def">${safeDef}</div></div>` : `<div class="card-stats"><div class="stat-badge stat-atk" style="background:#b0279b; font-size:0.6rem;">MAG</div></div>`;
    const imgUrl = item.img ? item.img : `https://placehold.co/200x150/111/ff0000?text=IMG`;
    c.innerHTML = `<div class="card-title">${item.title}</div><div class="card-art-box"><img src="${imgUrl}" class="card-art" draggable="false"></div><div class="card-type-icon">${typeIcon}</div>${starsHTML}<div class="card-body"><div class="card-text">${item.text || ""}</div></div>${statsHTML}<div class="card-cost">${safeCost}</div>`;
    
    c.onclick = handleCardClick; 
    c.ondragstart = (e) => { 
        if(isSystemLocked || c.parentElement.id !== "hand") { e.preventDefault(); return; } 
        if(c.dataset.type === "feitico") { e.preventDefault(); playSound("error"); alert("MAGIAS: Clique nela na mão e depois clique no alvo."); return; }
        draggedCard = c; 
    };
    return c; 
}

function startGameDirect(mode) {
    document.getElementById("hero-screen").classList.remove("active"); document.getElementById("game-screen").classList.add("active");
    if(selectedHeroObj) document.getElementById("player-avatar-img").src = selectedHeroObj.imgUrl;
    gameMode = mode; currentLevel = 0; initGame(mode === "campaign" ? 0 : "casual");
}

function advancePhase() {
    if (gameIsOver) return;
    if (currentStep === "deploy_attacker") currentStep = "deploy_defender";
    else if (currentStep === "deploy_defender") currentStep = "combat";
    else if (currentStep === "combat") { startNewRound(); return; }
    updateUIState();
}
function handleActionBtn() { if(isSystemLocked) return; playSound("click"); advancePhase(); }

function startNewRound() {
    if(gameIsOver) return; currentTurn++; attackToken = (attackToken === "player") ? "enemy" : "player"; currentStep = "deploy_attacker";
    document.querySelectorAll('.card-base').forEach(c => { c.dataset.hasAttacked = "false"; c.classList.remove("exhausted"); processCardEffect("FimDeTurno", c, c.parentElement.dataset.owner); });
    if(maxMana < 10) maxMana++; playerMana = maxMana; drawCard(); updateUIState();
}

function updateUIState() {
    updateLifeAndMana(); clearInterval(timerInterval); document.getElementById("turn-display").innerText = `TURNO ${currentTurn}`;
    const btn = document.getElementById("actionBtn"); const phaseDisp = document.getElementById("phase-display");
    if (currentStep === "deploy_attacker") {
        if (attackToken === "player") { phaseDisp.innerText = "SEU DEPLOY"; phaseDisp.style.color = "#00ffff"; btn.innerText = "FIM DEPLOY"; btn.style.opacity = 1; isSystemLocked = false; startTimer(80); } 
        else { phaseDisp.innerText = "IA: INVOCANDO"; phaseDisp.style.color = "#ff0000"; btn.innerText = "AGUARDE"; btn.style.opacity = 0.5; isSystemLocked = true; aiDeployPhase(); }
    } else if (currentStep === "deploy_defender") {
        if (attackToken === "enemy") { phaseDisp.innerText = "SUA DEFESA"; phaseDisp.style.color = "#00ffff"; btn.innerText = "FIM DEPLOY"; btn.style.opacity = 1; isSystemLocked = false; startTimer(80); } 
        else { phaseDisp.innerText = "IA: DEFENDENDO"; phaseDisp.style.color = "#ff0000"; btn.innerText = "AGUARDE"; btn.style.opacity = 0.5; isSystemLocked = true; aiDeployPhase(); }
    } else if (currentStep === "combat") {
        if (attackToken === "player") { phaseDisp.innerText = "SEU ATAQUE"; phaseDisp.style.color = "#ff9900"; btn.innerText = "FIM TURNO"; btn.style.opacity = 1; isSystemLocked = false; startTimer(60); } 
        else { phaseDisp.innerText = "IA: ATACANDO"; phaseDisp.style.color = "#ff0000"; btn.innerText = "AGUARDE"; btn.style.opacity = 0.5; isSystemLocked = true; aiCombatPhase(); }
    }
}
function startTimer(s){ turnTime=s; document.getElementById("timer").innerText=turnTime; timerInterval=setInterval(()=>{ if(!isSystemLocked && !gameIsOver){ turnTime--; document.getElementById("timer").innerText=turnTime; if(turnTime<=0) handleActionBtn(); } },1000); }

async function aiDeployPhase() {
    await sleep(1500); if(gameIsOver) return;
    const slots = Array.from(document.getElementById("enemy-field").children).filter(s=>!s.hasChildNodes()); 
    if(slots.length > 0 && Math.random() > 0.2) { 
        const c = baseDeck.filter(x=>x.tipo!=="feitico")[Math.floor(Math.random() * 5)]; 
        const el = createCard(c); el.dataset.owner="enemy"; slots[0].appendChild(el); playSound("deploy");
        el.style.position = "absolute"; el.style.top = "50%"; el.style.left = "50%"; el.style.transform = "translate(-50%, -50%) scale(0.60)"; el.style.margin = "0";
        if(typeof VFX !== 'undefined') VFX.onSummon(el, el.dataset.effect);
        processCardEffect("AoJogar", el, "enemy"); updateAuras();
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
                if (taunts.length > 0) target = taunts[Math.floor(Math.random() * taunts.length)];
                else target = playerCards[Math.floor(Math.random() * playerCards.length)]; 
            } else target = document.getElementById("player-hero"); 
            if (target) { resolveCombat(e, target, false); await sleep(1500); }
        }
    }
    await sleep(500); if (!gameIsOver) advancePhase();
}

function initGame(levelIndex) {
    let levelData = levelIndex === "casual" ? { name: "SIMULAÇÃO", bossName: "SIMULACRO", bossHp: 20, bossImg: campaignData[0].bossImg, arena: "arena-neon", briefing: null } : campaignData[levelIndex];
    document.getElementById("board").className = levelData.arena;
    const enHero = document.getElementById("enemy-hero"); enHero.querySelector(".hero-avatar").src = levelData.bossImg; enHero.querySelector(".hero-stats span:first-child").innerText = levelData.bossName;
    enHero.onclick = () => handleHeroClick(enHero, "enemy"); document.getElementById("player-hero").onclick = () => handleHeroClick(document.getElementById("player-hero"), "player");

    enemyLife = levelData.bossHp; playerLife = 20; maxMana = 3; playerMana = 3; currentTurn = 1; gameIsOver = false; isSystemLocked = false;
    playerDeck = [...customDeck]; for (let i = playerDeck.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [playerDeck[i], playerDeck[j]] = [playerDeck[j], playerDeck[i]]; }
    graveyard = { player: [], enemy: [] };
    
    document.getElementById("player-field").innerHTML = ""; document.getElementById("enemy-field").innerHTML = ""; document.getElementById("hand").innerHTML = "";
    createSlots(document.getElementById("player-field"), "player"); createSlots(document.getElementById("enemy-field"), "enemy");

    drawCard(); drawCard(); drawCard(); attackToken = "player"; updateUIState(); updateLifeAndMana();
    if(gameMode === "campaign" && levelData.briefing) alert(`>>> MISSÃO: ${levelData.name} <<<\n${levelData.briefing}`); else playSound("deploy");
}

function updateLifeAndMana() {
    document.getElementById("mana").innerText = `${playerMana}/${maxMana}`; document.getElementById("player-life").innerText = playerLife; document.getElementById("enemy-life").innerText = enemyLife;
    if(document.getElementById("cards-in-deck")) document.getElementById("cards-in-deck").innerText = playerDeck.length;
}

function createSlots(f, o) { 
    for(let i=0; i<5; i++) { 
        const s = document.createElement("div"); s.className = "slot"; s.dataset.owner = o; 
        if(o === "player") { 
            s.onclick = (e) => { if(selectedCardFromHand && !e.currentTarget.querySelector('.card-base')) executePlayCard(e.currentTarget, selectedCardFromHand); }; 
            s.ondragover = (e) => e.preventDefault();
            s.ondrop = (e) => { 
                if (isSystemLocked || !draggedCard) return; 
                if(draggedCard.dataset.type === "feitico") { playSound("error"); alert("Magias: Clique nela e depois no Alvo!"); return; }
                if (e.currentTarget.querySelector('.card-base')) return; 
                executePlayCard(e.currentTarget, draggedCard); 
            };
        } 
        f.appendChild(s); 
    } 
}

function handleCardClick(e) {
    if(isSystemLocked) return; const c = e.currentTarget; const p = c.parentElement; 
    const isSpellSelected = selectedCardFromHand && selectedCardFromHand.dataset.type === "feitico";

    if(p.id==="hand"){ 
        playSound("click"); 
        if(selectedCardFromHand===c){ selectedCardFromHand=null; c.classList.remove("deployment-selected"); } 
        else { if(selectedCardFromHand) selectedCardFromHand.classList.remove("deployment-selected"); selectedCardFromHand=c; c.classList.add("deployment-selected"); } 
    } 
    else if (isSpellSelected) { executeSpell(selectedCardFromHand, c, p.dataset.owner); }
    else if(p.dataset.owner==="player" && currentStep==="combat" && attackToken==="player"){ 
        if(selectedAttacker===c) { selectedAttacker=null; c.classList.remove("attacker-selected"); } 
        else { if(selectedAttacker) selectedAttacker.classList.remove("attacker-selected"); selectedAttacker=c; c.classList.add("attacker-selected"); } 
    }
    else if(p.dataset.owner==="enemy" && selectedAttacker){ 
        const taunts = document.getElementById("enemy-field").querySelectorAll('.taunt-card');
        if (taunts.length > 0 && !c.classList.contains('taunt-card')) { playSound("error"); alert("ALVO INVÁLIDO! Há tropas com Provocar protegendo o campo."); return; }
        resolveCombat(selectedAttacker, c, true); 
    } 
}

function handleHeroClick(heroElement, owner) {
    if (isSystemLocked || gameIsOver) return;
    const isSpellSelected = selectedCardFromHand && selectedCardFromHand.dataset.type === "feitico";
    if (isSpellSelected) { executeSpell(selectedCardFromHand, heroElement, owner); return; }
    if (currentStep === "combat" && attackToken === "player" && selectedAttacker) {
        if (owner === "enemy") {
            const enemyCards = document.getElementById("enemy-field").querySelectorAll('.card-base');
            if (enemyCards.length > 0) { playSound("error"); alert("VANGUARDA INIMIGA ATIVA!"); return; }
            resolveCombat(selectedAttacker, heroElement, true);
        }
    }
}

function executeSpell(spellCard, targetElement, targetOwner) {
    if (currentStep === "combat") { playSound("error"); alert("Magias só podem ser lançadas na Fase de Deploy."); return; }
    if (targetElement.dataset && targetElement.dataset.effect === "furtividade") { playSound("error"); alert("ALVO FURTIVO: Imune a magias!"); return; }

    const cost = parseInt(spellCard.dataset.cost) || 0;
    if (playerMana < cost) { playSound("error"); alert("RAM INSUFICIENTE!"); return; }
    
    const efeito = spellCard.dataset.effect;
    if (efeito.includes("cura") && targetOwner !== "player") { playSound("error"); alert("Você não pode curar o inimigo!"); return; }
    if (efeito.includes("dano") && targetOwner !== "enemy") { playSound("error"); alert("Você não quer atacar suas próprias tropas!"); return; }

    playerMana -= cost; updateLifeAndMana(); 
    if(spellCard.dataset.somDrop) { let d = new Audio(spellCard.dataset.somDrop); d.play().catch(e=>{}); } else { playSound("hit"); }
    spellCard.classList.remove("deployment-selected");
    
    if(efeito === "dano_total") {
        const inimigos = document.getElementById("enemy-field").querySelectorAll('.card-base');
        inimigos.forEach(inimigo => applyDamage(inimigo, 4));
        enemyLife -= 4; screenShake();
    } else if (efeito.includes("dano_")) {
        let dmg = parseInt(efeito.split("_")[1]) || 0;
        if(targetElement.id.includes("hero")) { enemyLife -= dmg; if(typeof VFX !== 'undefined') VFX.particles(targetElement, "#ff0000"); }
        else { applyDamage(targetElement, dmg); }
        screenShake();
    } else if (efeito.includes("cura_")) {
        let heal = parseInt(efeito.split("_")[1]) || 0;
        if(targetElement.id.includes("hero")) { playerLife += heal; if(typeof VFX !== 'undefined') VFX.particles(targetElement, "#00ff00"); }
        else { 
            let curHp = parseInt(targetElement.dataset.hp) || 0;
            targetElement.dataset.hp = curHp + heal; 
            if(targetElement.querySelector(".stat-def")) targetElement.querySelector(".stat-def").innerText = targetElement.dataset.hp; 
            if(typeof VFX !== 'undefined') VFX.particles(targetElement, "#00ff00"); 
        }
    }
    
    checkGameOver(); updateLifeAndMana();
    selectedCardFromHand = null; draggedCard = null;
    spellCard.remove(); document.getElementById("hand").classList.remove("expanded"); arrangeHand();
}

function executePlayCard(slot, card) {
    if(card.dataset.type === "feitico") return; 
    let cst = parseInt(card.dataset.cost) || 0;
    if(playerMana >= cst) {
        playerMana -= cst; slot.appendChild(card); card.classList.remove("deployment-selected");
        card.style.position = "absolute"; card.style.top = "50%"; card.style.left = "50%"; card.style.margin = "0"; card.style.transform = "translate(-50%, -50%) scale(0.60)";
        if (card.dataset.effect === "investida") card.dataset.hasAttacked = "false"; else { card.dataset.hasAttacked = "true"; card.classList.add("exhausted"); }
        selectedCardFromHand = null; draggedCard = null; playSound("deploy"); updateLifeAndMana();
        
        if(typeof VFX !== 'undefined') VFX.onSummon(card, card.dataset.effect);
        processCardEffect("AoJogar", card, "player"); updateAuras();
        document.getElementById("hand").classList.remove("expanded"); arrangeHand();
    } else { playSound("error"); alert("RAM INSUFICIENTE!"); }
}

// O CÉREBRO DO CONTRA-ATAQUE
function resolveCombat(atkCard, defCard, isPlayer) {
    if(typeof VFX !== 'undefined') VFX.onAttack(atkCard, defCard, atkCard.dataset.effect);
    if(atkCard.dataset.somAtaque) { let a = new Audio(atkCard.dataset.somAtaque); a.play().catch(e=>{}); } else { playSound("hit"); }
    
    setTimeout(() => {
        let dmgToDef = parseInt(atkCard.dataset.attack) || 0;
        let dmgToAtk = 0;

        // Se o alvo for uma tropa, pega o ataque dela para revidar
        if(!defCard.id.includes("hero")) {
            dmgToAtk = parseInt(defCard.dataset.attack) || 0;
        }
        
        // 1. Dano no Defensor
        if(defCard.id.includes("hero")) { 
            if(isPlayer) enemyLife -= dmgToDef; else playerLife -= dmgToDef; screenShake(); 
        } else { 
            applyDamage(defCard, dmgToDef); 
        }
        
        // 2. Dano no Atacante (Contra-Ataque)
        if (dmgToAtk > 0) {
            applyDamage(atkCard, dmgToAtk);
        }
        
        if (atkCard.dataset.effect === "roubo_vida" && isPlayer) playerLife = Math.min(playerLife + dmgToDef, maxLife);

        checkGameOver(); updateLifeAndMana(); 
        
        let attackerAlive = (parseInt(atkCard.dataset.hp) || 0) > 0;
        let defenderDied = !defCard.id.includes("hero") && (parseInt(defCard.dataset.hp) || 0) <= 0;

        if (attackerAlive && atkCard.dataset.effect === "furia" && defenderDied) {
            atkCard.dataset.hasAttacked = "false"; atkCard.classList.remove("exhausted"); if(typeof VFX !== 'undefined') VFX.fury(atkCard);
        } else if (attackerAlive) {
            atkCard.dataset.hasAttacked = "true"; atkCard.classList.add("exhausted"); 
        }
        
        atkCard.classList.remove("attacker-selected"); selectedAttacker = null;
    }, 450); // Sincronizado para explodir quando o pulo terminar
}

function applyDamage(target, dmg) {
    if(target.dataset.dead === "true") return; // Prevenção de zumbis

    if(target.dataset.effect === "escudo_divino" && !target.dataset.shieldBroken) {
        target.dataset.shieldBroken = "true"; target.classList.remove("shield-card");
        if(typeof VFX !== 'undefined') VFX.shield(target);
        return; 
    }
    
    let currentHp = parseInt(target.dataset.hp) || 0;
    let finalHp = currentHp - dmg;
    target.dataset.hp = finalHp;
    
    if(target.querySelector(".stat-def")) target.querySelector(".stat-def").innerText = finalHp;
    if(typeof VFX !== 'undefined') VFX.onDamage(target, target.dataset.effect);

    if(finalHp <= 0) {
        target.dataset.dead = "true"; // Flag de morte
        processCardEffect("UltimoSuspiro", target, target.parentElement.dataset.owner);
        if(typeof VFX !== 'undefined') VFX.death(target); else target.remove();
        setTimeout(updateAuras, 750); 
    }
}

function processCardEffect(gatilho, cartaObj, owner) {
    const efeito = cartaObj.dataset.effect;
    const isPlayer = owner === "player";

    if (gatilho === "AoJogar") {
        if (efeito === "reciclar" && isPlayer && graveyard.player.length > 0) { playerDeck.push(graveyard.player.pop()); updateLifeAndMana(); }
        if (efeito === "atordoar") {
            const targets = document.getElementById(isPlayer ? "enemy-field" : "player-field").querySelectorAll('.card-base');
            if(targets.length > 0) { const t = targets[Math.floor(Math.random() * targets.length)]; t.classList.add("exhausted"); t.dataset.hasAttacked = "true"; if(typeof VFX !== 'undefined') VFX.stun(t); }
        }
        if (efeito === "roubo_energia" && isPlayer) { enemyLife -= 1; updateLifeAndMana(); if(typeof VFX !== 'undefined') VFX.particles(document.getElementById("enemy-hero"), "#ff00ff"); }
    }
    if (gatilho === "UltimoSuspiro") {
        graveyard[owner].push(baseDeck.find(c => c.title === cartaObj.dataset.name)); 
        if (efeito === "evocar_recruta") {
            const slot = cartaObj.parentElement;
            setTimeout(() => {
                if(slot && !slot.querySelector('.card-base')) { 
                    const recruit = createCard(baseDeck.find(c => c.title === "Cadete de Patrulha"));
                    recruit.dataset.owner = owner; recruit.style.position = "absolute"; recruit.style.top = "50%"; recruit.style.left = "50%"; recruit.style.margin = "0"; recruit.style.transform = "translate(-50%, -50%) scale(0.60)";
                    slot.appendChild(recruit); if(typeof VFX !== 'undefined') VFX.onSummon(recruit, "provocar");
                }
            }, 500);
        }
    }
    if (gatilho === "FimDeTurno") {
        if (efeito === "cura_turno" && isPlayer) { playerLife = Math.min(playerLife+1, maxLife); if(typeof VFX !== 'undefined') VFX.particles(document.getElementById("player-hero"), "#00ff00"); }
        if (efeito === "regeneracao") { 
            let regHp = (parseInt(cartaObj.dataset.hp) || 0) + 1; 
            cartaObj.dataset.hp = regHp; 
            if(cartaObj.querySelector(".stat-def")) cartaObj.querySelector(".stat-def").innerText = regHp; 
            if(typeof VFX !== 'undefined') VFX.particles(cartaObj, "#00ff00"); 
        }
    }
}

function updateAuras() {
    ["player-field", "enemy-field"].forEach(f => {
        const field = document.getElementById(f);
        if(!field) return;
        const general = field.querySelector('.card-base[data-effect="aura_defesa"]');
        
        field.querySelectorAll('.card-base').forEach(c => {
            if(c.dataset.effect === "aura_defesa" || c.dataset.dead === "true") return; // Ignora o general e os mortos
            
            let curHp = parseInt(c.dataset.hp) || 0; 
            
            if(general) {
                if(!c.dataset.buffed) { c.dataset.hp = curHp + 2; c.dataset.buffed="true"; c.classList.add("taunt-card"); if(c.querySelector(".stat-def")) c.querySelector(".stat-def").innerText = c.dataset.hp; }
            } else {
                if(c.dataset.buffed) { c.dataset.hp = curHp - 2; c.dataset.buffed=""; if(c.dataset.effect !== "provocar") c.classList.remove("taunt-card"); if(c.querySelector(".stat-def")) c.querySelector(".stat-def").innerText = c.dataset.hp; }
            }
        });
    });
}

function checkGameOver() { 
    if (playerLife <= 0 || enemyLife <= 0) { 
        gameIsOver = true; clearInterval(timerInterval);
        const modal = document.getElementById("game-over-modal");
        modal.innerHTML = `<div class="modal-content"><h1 style="color:${playerLife<=0?'red':'green'}">${playerLife<=0?'DERROTA':'VITÓRIA'}</h1><button class="cmd-btn" onclick="location.reload()">VOLTAR</button></div>`;
        modal.classList.add("active");
    } 
}

function drawCard(){ if(playerDeck.length>0){ document.getElementById("hand").appendChild(createCard(playerDeck.pop())); arrangeHand(); updateLifeAndMana(); } }
function arrangeHand() { 
    const cards = Array.from(document.getElementById("hand").children); 
    for (let i = 0; i < cards.length; i++) { 
        const angle = -15 + (30) * (cards.length > 1 ? i / (cards.length - 1) : 0.5); 
        cards[i].style.left = `calc(50% + ${(i - (cards.length - 1) / 2) * 120}px)`; cards[i].style.bottom = `${Math.abs(angle) * 2}px`; cards[i].style.transform = `translateX(-50%) rotate(${angle}deg) scale(0.7)`; 
    } 
}

bootTerminal();
