/* =========================================================
   SISTEMA DE DECK BUILDER & BOTÃO ALEATÓRIO
   ========================================================= */
function initDeckBuilder() {
    const btnCost = document.getElementById("sort-cost");
    if(btnCost) btnCost.onclick = () => { currentSortMode = "cost"; renderVitrine(); playSound("click"); };
    
    const btnRar = document.getElementById("sort-rarity");
    if(btnRar) btnRar.onclick = () => { currentSortMode = "rarity"; renderVitrine(); playSound("click"); };
    
    const btnType = document.getElementById("sort-type");
    if(btnType) btnType.onclick = () => { currentSortMode = "type"; renderVitrine(); playSound("click"); };
    
    const btnClose = document.getElementById("btn-close-inspect");
    if(btnClose) btnClose.onclick = () => { playSound("click"); document.getElementById("inspect-modal").classList.remove("active"); };

    // 🔥 INJETOR DO BOTÃO "DECK ALEATÓRIO" 🔥
    let toolbar = document.querySelector(".toolbar");
    if(toolbar && !document.getElementById("btn-random-deck")) {
        let btnRand = document.createElement("button");
        btnRand.id = "btn-random-deck";
        btnRand.className = "cmd-btn";
        btnRand.style.width = "auto";
        btnRand.style.padding = "5px 15px";
        btnRand.style.fontSize = "0.7rem";
        btnRand.style.borderColor = "#00ff00";
        btnRand.style.color = "#00ff00";
        btnRand.innerText = "🎲 ALEATÓRIO";
        btnRand.onclick = generateRandomDeck;
        toolbar.appendChild(btnRand);
    }

    renderVitrine();
    
    let btnBack = document.getElementById("btn-back-from-deck");
    if(btnBack) btnBack.onclick = () => { playSound("click"); document.getElementById("deck-builder-screen").classList.remove("active"); document.getElementById("hero-screen").classList.add("active"); };
}

// 🔥 GERADOR DE DECK ALEATÓRIO 🔥
function generateRandomDeck() {
    playSound("click");
    customDeck = [];
    let pool = [...playerCollection];
    
    // Embaralha a coleção
    for(let i = pool.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    
    // Pesca 15 cartas respeitando o limite de 3 cópias
    for(let card of pool) {
        if(customDeck.length >= 15) break;
        if(customDeck.filter(c => c.title === card.title).length < 3) {
            customDeck.push({...card});
        }
    }
    updateDeckUI();
}
