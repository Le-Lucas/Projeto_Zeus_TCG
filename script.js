/* =========================================================
   🚀 PROJETO ZEUS - MOTOR V10.8 P2P CERTO E NOVAS FUNÇÕES
   ========================================================= */

console.log("Conexão JS Estabelecida. Matriz Limpa: Fases, Botão 3D, VFX e IA Ativos.");


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

// =========================================================
// 💥 MOTOR DE TEXTO FLUTUANTE (DANO, CURA, BUFFS E AVISOS)
// =========================================================
function mostrarTextoFlutuante(alvoDOM, texto, cor = "#ff0055") {
    if (!alvoDOM) return;
    const floatText = document.createElement("div");
    floatText.innerText = texto;
    floatText.style.cssText = `
        position: absolute; top: 40%; left: 50%; transform: translate(-50%, -50%);
        color: ${cor}; font-family: 'Courier New', monospace; font-size: 3rem; font-weight: bold;
        text-shadow: 0 0 15px ${cor}, 0 0 30px #000, 2px 2px 0 #000;
        z-index: 99999; pointer-events: none; white-space: nowrap;
    `;
    alvoDOM.appendChild(floatText);
    gsap.fromTo(floatText, 
        { y: 0, opacity: 1, scale: 0.5 }, 
        { y: -60, opacity: 0, scale: 1.2, duration: 1.2, ease: "power3.out", onComplete: () => floatText.remove() }
    );
}


// ==========================================
// 🛡️ PROTOCOLO DE EXTERMÍNIO (GLOBAL WIPE)
// ==========================================
const GAME_VERSION = "v10.1"; // ⚡ Sempre que quiser "zerar" o jogo para todos, mude este número!

function checkSystemReset() {
    let currentSavedVersion = localStorage.getItem("zeusGameVersion");
    
    // Se a versão do jogador for diferente da versão atual do código...
    if (currentSavedVersion !== GAME_VERSION) {
        console.warn("🚨 [SISTEMA] Nova versão detectada (" + GAME_VERSION + "). Formatando HDDs...");
        
        // Formata (apaga) todas as chaves de memória do jogo
        localStorage.removeItem("zeusPlayerName");
        localStorage.removeItem("zeusPlayerFragments");
        localStorage.removeItem("zeusPlayerAvatar");
        localStorage.removeItem("zeusTutorialDone");
        localStorage.removeItem("zeusPlayerCollection"); // (Ou o nome da chave que usa para salvar a coleção)
        localStorage.removeItem("zeusCustomDeck"); // (Ou o nome da chave que usa para salvar o deck)
        // Adicione aqui outras chaves que você possa criar no futuro!
        
        // Grava a nova versão no HD limpo
        localStorage.setItem("zeusGameVersion", GAME_VERSION);
        
        console.log("✅ HDDs formatados. Sistema limpo e pronto para o novo Operador.");
    }
}

// ⚡ EXECUTA O SCANNER ASSIM QUE O SCRIPT LIGAR
checkSystemReset();

// Variáveis globais de Identidade
let playerName = "OPERADOR"; 
let playerAvatar = "./padrao.png"; // Imagem padrão se o jogador não escolher

// ==========================================
// 💾 SISTEMA DE MEMÓRIA (LOCAL STORAGE)
// ==========================================
function loadProgress() {
    let savedName = localStorage.getItem("zeusPlayerName");
    let savedFrags = localStorage.getItem("zeusPlayerFragments");
    let savedAvatar = localStorage.getItem("zeusPlayerAvatar"); // Novo!
    
    if (savedName) playerName = savedName;
    if (savedFrags !== null) playerFragments = parseInt(savedFrags);
    if (savedAvatar) playerAvatar = savedAvatar; // Novo!
}

function saveProgress() {
    localStorage.setItem("zeusPlayerName", playerName);
    localStorage.setItem("zeusPlayerFragments", playerFragments);
    localStorage.setItem("zeusPlayerAvatar", playerAvatar); // Novo!
}

// ==========================================
// 1. MOTOR DE ESCALA UNIVERSAL (BLINDADO)
// ==========================================
function initZeusEngineScale() {
    const container = document.getElementById("zeus-engine-container");
    if (!container) return;
    
    const BASE_WIDTH = 1366; 
    const BASE_HEIGHT = 768;
    
    function resizeGame() {
        // A força bruta para descobrir o tamanho real do ecrã, ignorando as mentiras do iframe do OneCompiler
        let winW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let winH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        
        // Calcula o zoom exato para caber TUDO na tela sem cortar nada
        let scale = Math.min(winW / BASE_WIDTH, winH / BASE_HEIGHT);
        
        // Aplica o zoom no chassi principal do jogo
        container.style.transform = `translate(-50%, -50%) scale(${scale})`;
        
        // Impede qualquer scroll ou vazamento de tela
        document.body.style.width = "100vw";
        document.body.style.height = "100vh";
        document.body.style.overflow = "hidden";
    }
    
    window.addEventListener("resize", resizeGame);
    // Delay maior no telemóvel para dar tempo do Chrome esconder a barra de endereço ao girar o ecrã
    window.addEventListener("orientationchange", () => setTimeout(resizeGame, 500)); 
    
    // Dispara vários tiros de calibração seguidos para garantir que a tela ajustou
    resizeGame(); 
    setTimeout(resizeGame, 100);
    setTimeout(resizeGame, 500);
}



const sfx = { 
    bgm: new Audio("https://files.catbox.moe/5j62nk.mp3"), 
    click: new Audio("https://files.catbox.moe/nslg07.wav"), 
    deploy: new Audio("https://files.catbox.moe/bi22a9.wav"), 
    hit: new Audio("https://files.catbox.moe/vwoemb.wav"), 
    error: new Audio("https://files.catbox.moe/f1wdc8.mp3") 
};

// 🎚️ MESA DE SOM (MIXAGEM PROFISSIONAL)
sfx.bgm.loop = true; 
sfx.bgm.volume = 0.15;  // ⚡ Música de fundo suave (15%)

// Nivelamento dos Efeitos Especiais (Evita estourar o áudio)
sfx.click.volume = 0.4; // 40%
sfx.deploy.volume = 0.5; // 50%
sfx.hit.volume = 0.6;    // 60% (Um pouco mais alto para dar impacto no ataque)
sfx.error.volume = 0.3;  // 30% (Sons de erro costumam ser estridentes)

function playSound(type) { 
    if(sfx[type]) { 
        if(type !== 'bgm') sfx[type].currentTime = 0; 
        sfx[type].play().catch(()=>{}); 
    } 
}

function screenShake() { 
    const b = document.getElementById("board"); 
    if(b) { 
        b.animate([
            { transform: "translate(8px, 8px)" }, 
            { transform: "translate(-8px, -8px)" }, 
            { transform: "translate(8px, -8px)" }, 
            { transform: "translate(0, 0)" }
        ], { duration: 400 }); 
    } 
}
// ==========================================
// 2. BANCO DE DADOS (CAMPANHA & CARTAS)
// ==========================================
const imgDiretor = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXT1IcOkgyVdfxJRupj-0q2LwH3pIRyYWTbg&s";
const imgOperador = "https://plus.unsplash.com/premium_photo-1682097238346-3f2a677ccfe6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29sZGFkb3xlbnwwfHwwfHx8MA%3D%3D";
const imgAdao = "https://img.freepik.com/fotos-premium/retrato-de-um-homem-palido-olhando-para-a-camera-com-um-olhar-assustador-contra-um-fundo-escuro-no-estudio_236854-66039.jpg";

const campaignData = [
    { name: "CENA 1: COMPLEXO MILITAR", bossName: "DEFESA DO PERÍMETRO", bossHp: 15, bossImg: "https://files.catbox.moe/ui0skk.png", bgImg: "https://i.postimg.cc/ZY8N7bVC/cena1.jpg", deckTema: ["Agente Novato", "Drone de Varredura", "Segurança Aegis", "Atirador Furtivo", "Drone de Sucata"], dialogo: [{ ator: "O DIRETOR", img: imgDiretor, texto: "Operador, detectamos uma anomalia térmica no Setor X8E. Parece uma detonação não autorizada." }, { ator: "O DIRETOR", img: imgDiretor, texto: "Nossa inteligência sugere que operações clandestinas do Projeto Zeus estão acontecendo lá. Infiltre-se e neutralize a ameaça." }, { ator: "OPERADOR", img: imgOperador, texto: "Entendido, Diretor. Iniciando varredura no perímetro externo da base." }] },
    { name: "CENA 2: CELA DAS COBAIAS", bossName: "HORDAS DA INCUBAÇÃO", bossHp: 20, bossImg: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png", bgImg: "https://i.postimg.cc/05YSWkcj/cena2.jpg", deckTema: ["Cobaia Estágio 1", "Mutante Instável", "Ciborgue Falho", "Unidade K-9 Cibernética"], dialogo: [{ ator: "OPERADOR", img: imgOperador, texto: "Diretor, o perímetro foi limpo. Mas não houve explosão propriamente dita... os portões do Sub-1 foram arrombados de dentro para fora." }, { ator: "O DIRETOR", img: imgDiretor, texto: "Isso é impossível. Proceda com extrema cautela ao descer." }, { ator: "OPERADOR", img: imgOperador, texto: "Espera... tem algo se movendo nas sombras. Contato! Cobaias soltas e frenéticas! Cortando comunicação para engajamento!" }] },
    { name: "CENA 3: LABS ZEUS", bossName: "ADÃO: O PRIMEIRO", bossHp: 40, bossImg: imgAdao, bgImg: "https://i.postimg.cc/ry14nVQz/cena3.jpg", deckTema: ["Projeto Zeus: Alfa", "O Punho da Resistência", "Sentinela Ômega", "Hack de Sobrecarga"], dialogo: [{ ator: "OPERADOR", img: imgOperador, texto: "Subnível 2 alcançado. Esquadrão de segurança abatido. Cientistas também... mas estão todos vivos, apenas nocauteados." }, { ator: "ADÃO", img: imgAdao, texto: "Se eu sou apenas um homem... por que não me canso igual a eles?" }, { ator: "ADÃO", img: imgAdao, texto: "Eles dizem que sou uma arma. A arma perfeita. Então por que eu hesito em puxar o gatilho?" }, { ator: "ADÃO", img: imgAdao, texto: "Ah... mais soldados chegando. Isso é tão irritante. Desliguem-se." }] }, // <--- Lembre-se da vírgula após a Cena 3!
    { 
        name: "CENA 4: QUEBRA DE CONTENÇÃO", 
        bossName: "UNIDADE DE CHOQUE", 
        bossHp: 30, 
        bossImg: "https://files.catbox.moe/ui0skk.png", 
        bgImg: "https://i.postimg.cc/ZY8N7bVC/cena1.jpg", 
        deckTema: ["Segurança Aegis", "Atirador Furtivo", "Barreira Eletrônica", "Interceptor de Zeus", "Sentinela Corp Muralha"], 
        dialogo: [
            { ator: "MAJOR VOSS", img: "https://files.catbox.moe/wkfzj3.png", texto: "Então esse é o milagre científico... Recebemos relatórios de comportamento irregular. Ele entende a gente?" }, 
            { ator: "ADÃO", img: imgAdao, texto: "Quem é ele? Ele parece um soldado... Ele veio me desligar?" }, 
            { ator: "MAJOR VOSS", img: "https://files.catbox.moe/wkfzj3.png", texto: "Preciso confiar que ele não vai quebrar essa sala. (Estalo) Equipe de contenção! Unidade de choque para o laboratório principal!" },
            { ator: "ADÃO", img: imgAdao, texto: "Eu não queria fazer isso. Mas eles vão tentar me machucar..." }
        ] 
    },
    { 
        name: "CENA 5: PROTOCOLO DE EMERGÊNCIA", 
        bossName: "TENENTE KORSO", 
        bossHp: 40, 
        bossImg: "https://files.catbox.moe/nuxefh.png", 
        bgImg: "https://i.postimg.cc/05YSWkcj/cena2.jpg", 
        deckTema: ["Blindado de Transporte", "Exoesqueleto Mk.II", "Médico de Combate", "Sobrevivente Rebelde", "Hack de Sobrecarga"], 
        dialogo: [
            { ator: "TENENTE KORSO", img: "https://files.catbox.moe/nuxefh.png", texto: "Alvo no corredor! O Major ordenou: Não atirem letal! Armas de choque levantadas!" }, 
            { ator: "ADÃO", img: imgAdao, texto: "Vocês estão com medo. Eu também estou." }, 
            { ator: "TENENTE KORSO", img: "https://files.catbox.moe/nuxefh.png", texto: "Ele é rápido demais! Fogo de supressão, agora! Derrubem a anomalia!" },
            { ator: "ADÃO", img: imgAdao, texto: "Eu não quero machucar ninguém..." }
        ] 
    },
    { 
        name: "CENA 6: VETERANO DE GUERRA", 
        bossName: "MAJOR DARIUS VOSS", 
        bossHp: 60, 
        bossImg: "https://files.catbox.moe/wkfzj3.png", 
        bgImg: "https://i.postimg.cc/ry14nVQz/cena3.jpg", 
        deckTema: ["Branko", "Nyx", "Iris", "Leon", "Rourke", "General Mão de Ferro", "Pacificador V.9"], 
        dialogo: [
            { ator: "MAJOR VOSS", img: "https://files.catbox.moe/wkfzj3.png", texto: "Impressionante. Nenhum osso quebrado, nenhum sangue. Meus homens foram simplesmente... desligados." }, 
            { ator: "ADÃO", img: imgAdao, texto: "Eu pedi para não me machucarem." }, 
            { ator: "MAJOR VOSS", img: "https://files.catbox.moe/wkfzj3.png", texto: "Esquadrão EAO, preparem-se. Eu sou um veterano de mil batalhas, garoto. Vamos ver o que o milagre científico sabe fazer." },
            { ator: "ADÃO", img: imgAdao, texto: "Você luta bem, Major. Mas eu só preciso de um movimento." }
        ] 
    }
];

const baseDeck = [
    { title: "Agente Novato", tipo: "tropa", raridade: "comum", custo: 1, atk: 1, def: 2, efeito: "nenhum", img: "https://i.postimg.cc/3JgCTq5Q/soldado-novato.png" },
    { title: "Drone de Varredura", tipo: "tropa", raridade: "comum", custo: 1, atk: 2, def: 1, efeito: "nenhum", img: "https://i.postimg.cc/pXDYHSbN/Drone-de-Varredura.png" },
    { title: "Segurança Aegis", tipo: "tropa", raridade: "comum", custo: 2, atk: 2, def: 3, efeito: "provocar", img: "https://i.postimg.cc/284FDtps/Seguranca-Aegis.png" },
    { title: "Atirador Furtivo", tipo: "tropa", raridade: "comum", custo: 2, atk: 3, def: 1, efeito: "nenhum", img: "https://i.postimg.cc/Fsjg46t8/Atirador-Furtivo.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Ciborgue Falho", tipo: "automato", raridade: "comum", custo: 3, atk: 3, def: 3, efeito: "nenhum", img: "https://i.postimg.cc/65dLXPsS/Ciborgue-Falho.png" },
    { title: "Mercenário", tipo: "tropa", raridade: "comum", custo: 3, atk: 4, def: 2, efeito: "nenhum", img: "https://i.postimg.cc/4Nzbg0C2/Mercenario.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Infiltrador das Sombras", tipo: "humano", raridade: "comum", custo: 1, atk: 2, def: 1, efeito: "furtividade", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZoPOtDbsR6X1lPe9V86rfBHlh2Q9TrW7sg&s" },
    { title: "Sucateiro da Zona Sul", tipo: "humano", raridade: "comum", custo: 2, atk: 1, def: 3, efeito: "reciclar", img: "https://files.catbox.moe/dbnyi2.png" },
    { title: "Cadete de Patrulha", tipo: "soldado", raridade: "comum", custo: 1, atk: 1, def: 3, efeito: "provocar", img: "https://files.catbox.moe/ui0skk.png" },
    { title: "Escudeiro de Elite", tipo: "soldado", raridade: "comum", custo: 3, atk: 2, def: 5, efeito: "escudo_divino", img: "https://files.catbox.moe/ebt0u6.png" },
    { title: "Barreira Eletrônica", tipo: "estrutura", raridade: "comum", custo: 2, atk: 0, def: 7, efeito: "provocar", img: "https://files.catbox.moe/b097ur.png" },
    { title: "Unidade K-9 Cibernética", tipo: "automato", raridade: "comum", custo: 2, atk: 3, def: 1, efeito: "investida", img: "https://files.catbox.moe/lc3rez.png" },
    { title: "Interceptor de Zeus", tipo: "automato", raridade: "comum", custo: 2, atk: 2, def: 3, efeito: "provocar", img: "https://files.catbox.moe/05e01v.png" },
    { title: "Cobaia Estágio 1", tipo: "mutante", raridade: "rara", custo: 4, atk: 3, def: 6, efeito: "provocar", img: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png" },
    { title: "Sobrevivente Rebelde", tipo: "tropa", raridade: "rara", custo: 4, atk: 5, def: 2, efeito: "ataque_duplo", img: "https://i.postimg.cc/bNQHh5Xx/Sobrevivente-Rebelde.png" },
    { title: "Exoesqueleto Mk.II", tipo: "tropa", raridade: "rara", custo: 6, atk: 5, def: 5, efeito: "nenhum", img: "https://i.postimg.cc/qMfXWTFQ/Exoesqueleto-Mk-II.png" },
    { title: "Médico de Combate", tipo: "tropa", raridade: "rara", custo: 3, atk: 1, def: 4, efeito: "cura_turno", img: "https://i.postimg.cc/65sLFXPh/Medico-de-Combate.png" },
    { title: "Mutante Instável", tipo: "mutante", raridade: "rara", custo: 5, atk: 4, def: 5, efeito: "regeneracao", img: "https://i.postimg.cc/mg1SnrL7/Mutante-Instavel.png" },
    { title: "Hacker do Mainframe", tipo: "humano", raridade: "rara", custo: 4, atk: 2, def: 2, efeito: "roubo_energia", img: "https://files.catbox.moe/tl6rvy.png" },
    { title: "Blindado de Transporte", tipo: "automato", raridade: "rara", custo: 5, atk: 3, def: 8, efeito: "evocar_recruta", img: "https://files.catbox.moe/997fyd.png" },
    { title: "Quimera Alada", tipo: "mutante", raridade: "epica", custo: 4, atk: 3, def: 4, efeito: "furia", img: "https://i.postimg.cc/mrcscCyq/Quimera-Alada.png" },
    { title: "Ceifador da Unidade", tipo: "tropa", raridade: "epica", custo: 6, atk: 6, def: 5, efeito: "roubo_vida", img: "https://i.postimg.cc/pLcvXqzj/Ceifador-da-Unidade.png" },
    { title: "Sentinela Ômega", tipo: "tropa", raridade: "epica", custo: 7, atk: 5, def: 7, efeito: "escudo", img: "https://i.postimg.cc/q7tTtyx1/Sentinela-Omega.png", som_ataque: "https://files.catbox.moe/5nlm3z.wav" },
    { title: "Projeto Zeus: Alfa", tipo: "tropa", raridade: "lendaria", custo: 8, atk: 8, def: 8, efeito: "nenhum", img: "https://i.postimg.cc/0yXv2cDX/Projeto-Zeus-Alfa.png" },
    { title: "General Mão de Ferro", tipo: "humano", raridade: "lendaria", custo: 7, atk: 6, def: 7, efeito: "aura_defesa", img: "https://files.catbox.moe/wkfzj3.png" },
    { title: "O Punho da Resistência", tipo: "automato", raridade: "lendaria", custo: 7, atk: 7, def: 7, efeito: "furia", img: "https://files.catbox.moe/nuxefh.png" },
    { title: "Pacificador V.9", tipo: "automato", raridade: "lendaria", custo: 8, atk: 9, def: 9, efeito: "anular_efeito", img: "https://files.catbox.moe/7cjywl.png" },
    { title: "Enxame de Nanobots", tipo: "automato", raridade: "rara", custo: 4, atk: 2, def: 2, efeito: "sinergia_automato", text: "Ganha +1/+1 por Autômato.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKmEat6w4aafi5kCkFL9_gVZvCcdfsufUR6A&s" },
    { title: "Esquadrão Tático", tipo: "humano", raridade: "comum", custo: 4, atk: 3, def: 2, efeito: "tropa_coordenada", text: "Invoca Aegis ou +1/+1.", img: "https://files.catbox.moe/vynjlp.png" }, 
    { title: "Clone Instável", tipo: "mutante", raridade: "comum", custo: 2, atk: 2, def: 1, efeito: "provocar", img: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png" },
    { title: "Kit Médico Tático", tipo: "feitico", raridade: "comum", custo: 1, atk: 0, def: 0, efeito: "cura_3", img: "https://i.postimg.cc/DyqdTNV5/Kit-Medico-Tatico.png" },
    { title: "Sobrecarga de Sistema", tipo: "feitico", raridade: "comum", custo: 1, atk: 0, def: 0, efeito: "dano_2", text: "Causa 2 de dano a uma unidade.", img: "https://i.postimg.cc/B6WDKkNS/Sobrecarga-de-Sistema.png" },
   // { title: "Hack de Sobrecarga", tipo: "feitico", raridade: "rara", custo: 3, atk: 0, def: 0, efeito: "dano 4", img: "https://files.catbox.moe/tl6rvy.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Colete de Kevlar", tipo: "equipamento", raridade: "comum", custo: 1, atk: 0, def: 2, efeito: "nenhum", text: "Concede +2 de HP.", img: "https://i.postimg.cc/Gm5vcHy5/Colete-de-klevar.png" },
    { title: "Rifle de Plasma", tipo: "equipamento", raridade: "comum", custo: 2, atk: 2, def: 0, efeito: "nenhum", text: "Concede +2 de ATK.", img: "https://i.postimg.cc/R0KzzDWy/rifle.png" },
    { title: "Chip Berserker", tipo: "equipamento", raridade: "epica", custo: 3, atk: 3, def: -3, efeito: "nenhum", text: "+3 ATK, Fúria, perde -3 HP.", img: "https://i.postimg.cc/bvkjjBGh/chip.png" },
    // UNIDADES DE ALERTA (Agentes e Resistência)
    { title: "Gladiador de Subsolo", tipo: "agente", raridade: "rara", custo: 2, atk: 2, def: 2, efeito: "sobrecarga, atropelar", text: "⚡ Sobrecarga", img: "./gladiador.png" },
    { title: "Inspetor de Perimetro", tipo: "automato", raridade: "comum", custo: 1, atk: 1, def: 1, efeito: "sobrecarga", text: "⚡ Sobrecarga", img: "./drone2.png"},
    { title: "Hacker de Elite", tipo: "agente", raridade: "epica", custo: 4, atk: 3, def: 3, efeito: "sobrecarga", text: "⚡ Sobrecarga", img: "./elite.png" },
    { title: "Sentinela Corp Muralha", tipo: "automato", raridade: "rara", custo: 5, atk: 2, def: 7, efeito: "sobrecarga,provocar", text: "⚡ Sobrecarga", img: "./muralha.png" },
    { title: "Infiltrado Fantasma", tipo: "agente", raridade: "epica", custo: 3, atk: 2, def: 2, efeito: "sobrecarga", text: "⚡ Sobrecarga", img: "./infiltrado.png" },
    { title: "Propagandista Digital", tipo: "resistencia", raridade: "rara", custo: 3, atk: 1, def: 4, efeito: "sobrecarga, invocar", text: "⚡ Sobrecarga", img: "./propagandista.png" },
    { title: "Estação de Monitoramento", tipo: "estrutura", raridade: "rara", custo: 4, atk: 0, def: 5, efeito: "sobrecarga", text: "⚡ Sobrecarga", img: "./estacao.png" },
    //=======================================================
                 // ESQUADRÃO EAO
    //=======================================================
    { title: "Branko", tipo: "tropa", raridade: "rara", custo: 7, atk: 2, def: 8, efeito: "atropelar, furia", text: "Fúria Crescente: Sempre que sobrevive a dano, ganha +2 de ATK.", img: "./branko.png" },
    { title: "Nyx", tipo: "tropa", raridade: "rara", custo: 6, atk: 4, def: 4, efeito: "furtividade, Colmeia", text: "Colmeia: Grito de Guerra - Ganha +1/+1 por cada EAO aliado e copia palavra-chave.", img: "./nyx.png" },
    { title: "Iris", tipo: "tropa", raridade: "rara", custo: 7, atk: 4, def: 6, efeito: "invocar_ataque, Colmeia", text: "Ao atacar, invoca Drone Lv.1. Colmeia: Ganha +1/+1 por EAO aliado e copia palavra.", img: "./iris.png" },
    { title: "Leon", tipo: "tropa", raridade: "lendaria", custo: 8, atk: 3, def: 6, efeito: "cura_area", text: "Médico de Combate: Ao final do turno, cura +3 em todos os aliados.", img: "./leon.png" },
    { title: "Rourke", tipo: "tropa", raridade: "lendaria", custo: 9, atk: 7, def: 7, efeito: "escudo_divino, Colmeia", text: "Grito de Guerra: Concede +2/+2 aos aliados. Colmeia: Ganha status por EAO.", img: "./rourke.png" },
    
    // ==========================================
           // 🕵️ UNIDADES DE CONTROLE (BLACK OPS)
    // ==========================================
    { title: "Operativo Vácuo", tipo: "humano", raridade: "rara", custo: 3, atk: 3, def: 2, efeito: "silencio_aleatorio", text: "Grito de Guerra: Silencia uma tropa inimiga aleatória, anulando os seus efeitos.", img: "./vacuo.jpg" },
    { title: "Unidade Hazmat", tipo: "humano", raridade: "epica", custo: 4, atk: 2, def: 6, efeito: "aprisionar_slot", text: "Aprisiona um slot. Cartas nele não podem atacar enquanto esta unidade viver.", img: "./hazmat.jpg" },
    { title: "Faxineiro de Provas", tipo: "humano", raridade: "rara", custo: 2, atk: 2, def: 2, efeito: "faxineiro", text: "Quando esta unidade destrói um inimigo, rouba a carta para a sua mão.", img: "./faxineiro.jpg" },
    { title: "Interceptador de Anomalias", tipo: "humano", raridade: "epica", custo: 5, atk: 4, def: 5, efeito: "interceptador", text: "Sempre que você jogar um Feitiço, causa 2 de dano a um inimigo aleatório.", img: "./interceptador.jpg" },
    { title: "Drone Sombra", tipo: "automato", raridade: "comum", custo: 1, atk: 1, def: 1, efeito: "taxa_automato", text: "Aura: Enquanto estiver em campo, os Autômatos inimigos custam +1.", img: "./drone_sombra.jpg" },

    // ==========================================
    // 📜 FEITIÇOS (PROTOCOLOS DE LIMPEZA)
    // ==========================================
    { title: "Protocolo Negação Total", tipo: "feitico", raridade: "rara", custo: 4, atk: 0, def: 0, efeito: "negacao_total", text: "Reduz o ATK e a DEF de todas as unidades Mutantes em -2/-2.", img: "./negacao.jpg" },
    { title: "Varredura Amnésia", tipo: "feitico", raridade: "epica", custo: 3, atk: 0, def: 0, efeito: "varredura_amnesia", text: "O oponente deve escolher 2 cartas da mão e embaralhá-las de volta no deck.", img: "./amnesia.jpg" },
    { title: "Esterilização de Setor", tipo: "feitico", raridade: "lendaria", custo: 6, atk: 0, def: 0, efeito: "esterilizacao_setor", text: "Destrói TODAS as unidades Mutantes no campo de batalha.", img: "./esterilizacao.jpg" },
    { title: "Extração de Emergência", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "extracao_emergencia", text: "Retorna uma carta do campo de batalha para a mão do seu dono.", img: "./extracao_emergencia.jpg" },
    { title: "Relatório Classificado", tipo: "feitico", raridade: "epica", custo: 2, atk: 0, def: 0, efeito: "relatorio_classificado", text: "Rouba as 2 cartas do topo do deck inimigo diretamente para a sua mão.", img: "./relatorio.jpg" },
    // ==========================================
    // 🧬 EQUIPE DO LABORATÓRIO (Mutação, Veneno e Sacrifício)
    // ==========================================
    { title: "Cobaia Volátil", tipo: "mutante", raridade: "comum", custo: 2, atk: 1, def: 2, efeito: "mutacao", text: "Evolução: Ao final do seu turno, ganha +1/+1.", img: "./cobaia.jpg" },
    { title: "Besta Tóxica", tipo: "mutante", raridade: "rara", custo: 4, atk: 2, def: 5, efeito: "toxico", text: "Toxina: Qualquer tropa inimiga que sofra dano desta unidade é destruída.", img: "./toxica.jpg" },
    { title: "Tanque de Incubação", tipo: "estrutura", raridade: "rara", custo: 3, atk: 0, def: 6, efeito: "incubar", text: "Ao final do turno, invoca um [Clone Instável] se houver espaço.", img: "./tanque.jpg" },
    { title: "Geneticista Chefe", tipo: "humano", raridade: "epica", custo: 5, atk: 3, def: 4, efeito: "extracao", text: "Grito de Guerra: Destrói um aliado aleatório. Se o fizer, compra 2 cartas.", img: "./geneticista.jpg" },
    { title: "Amálgama Ômega", tipo: "mutante", raridade: "lendaria", custo: 9, atk: 5, def: 5, efeito: "atropelar, predador", text: "Predador: Sempre que QUALQUER tropa morre, ganha +2/+2 e Cura 2.", img: "./omega.jpg" }
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
// 🗣️ SISTEMA DE DIÁLOGOS (VOICE LINES)
// ==========================================
const falasPorTipo = {
    "automato": [
        "Bip. Boop. Sistema online.",
        "Diretriz 4: Exterminar.",
        "Analisando fraquezas do alvo...",
        "Bateria em 100%. Iniciando ataque."
    ],
    "humano": [
        "Alvo na mira! Fogo de cobertura!",
        "Só mais um dia no escritório...",
        "Eles não sabem o que os atingiu.",
        "Ninguém fica para trás!"
    ],
    "soldado": [
        "Posição assegurada, Comandante!",
        "Escudos erguidos. Pode vir!",
        "Mantendo a linha de frente!"
    ],
    "agente": [
        "Iniciando protocolo fantasma.",
        "Eles nem vão ver de onde veio.",
        "Câmeras desativadas. Entrando."
    ],
    "mecanizado": [
        "*Som de engrenagens pesadas*",
        "Armadura pesada pronta para o impacto.",
        "Esmagando a resistência."
    ],
    "tropa": [ // Para cobrir os mutantes e ciborgues genéricos
        "Grrrraaaargh!",
        "Carregando armas...",
        "Pronto para a carnificina!"
    ]
};

// ==========================================
// 3. VARIÁVEIS GLOBAIS DE ESTADO
// ==========================================
let currentLevel = 0, playerCollection = [], customDeck = [], playerDeck = [];
let graveyard = { player: [], enemy: [] };
let playerFragments = 70, currentSortMode = "cost";
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
    preloadAssets();
    
    // ⚡ Carrega os dados salvos
    loadProgress();

    // ⚡ Se for a primeira vez do jogador, pede o nome com um prompt Cyberpunk
    if (!localStorage.getItem("zeusPlayerName")) {
        pedirNomeJogador();
    } else {
       atualizarIdentidadeNaUI();
    }
    
   
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
    if(btnModeStory) { 
        btnModeStory.onclick = () => { 
            playSound("click"); 
            document.getElementById("mode-selection-modal").classList.remove("active"); 
            abrirMenuCapitulos(); // ⚡ AGORA ABRE O MENU DE EXPANSÕES!
        }; 
    }
    
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
    uniqueCards.forEach(card => { const div = document.createElement("div"); div.className = `pool-card ${card.raridade}`; div.dataset.tipo = card.tipo || "default"; div.dataset.raca = card.raca || card.tipo || "default"; div.innerHTML = `<div class="inspect-btn" title="Inspecionar">👁️</div><img src="${card.img}" class="pool-img"><div class="pool-info"><div class="pool-title">${card.title}</div><div class="pool-cost">${card.custo}⚡</div></div>`; div.onmouseenter = () => { if(typeof VFX !== "undefined") VFX.createTrail(div); }; div.onclick = (e) => { if(e.target.classList.contains("inspect-btn")) openInspectModal(card); else addCardToDeck(card); }; poolGrid.appendChild(div); });
    updateDeckUI();
}

// ==========================================
// 🔎 SISTEMA DE INSPEÇÃO HOLO-LENS
// ==========================================
function openInspectModal(item) {
    if (!item) return;
    
    let modal = document.getElementById("inspect-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "inspect-modal";
        document.body.appendChild(modal);
    }

    // Fundo em Vidro Fosco Escuro
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(5, 10, 15, 0.95); z-index:100000; display:flex; flex-direction:column; justify-content:center; align-items:center; backdrop-filter: blur(10px);";

    // Estrutura Base
    modal.innerHTML = `
        <div id="inspect-card-container" style="transform: scale(1.6); margin-bottom: 70px; pointer-events: none;"></div>
        <button id="btn-close-inspect" style="background:rgba(0, 255, 255, 0.1); border:2px solid #00ffff; color:#00ffff; padding:12px 35px; font-family:'Courier New', monospace; font-weight:bold; font-size: 16px; cursor:pointer; border-radius:4px; box-shadow: 0 0 15px rgba(0,255,255,0.4); z-index: 100001; transition: 0.3s; text-transform: uppercase;">FECHAR ARQUIVO</button>
    `;

    // ⚡ A MÁGICA: Usa o seu próprio motor para criar o clone perfeito!
    let previewCard = createCard(item);
    
    // Trava de Centralização (Impede que a carta tente fugir usando CSS absoluto)
    previewCard.style.position = "relative";
    previewCard.style.transform = "none";
    previewCard.style.left = "0";
    previewCard.style.top = "0";
    previewCard.style.margin = "0";
    
    document.getElementById("inspect-card-container").appendChild(previewCard);
    modal.style.display = "flex";

    // Botão de Fechar
    const btnClose = document.getElementById("btn-close-inspect");
    btnClose.onmouseover = () => { btnClose.style.background = "rgba(0, 255, 255, 0.3)"; btnClose.style.boxShadow = "0 0 30px #00ffff"; };
    btnClose.onmouseout = () => { btnClose.style.background = "rgba(0, 255, 255, 0.1)"; btnClose.style.boxShadow = "0 0 15px rgba(0,255,255,0.4)"; };
    btnClose.onclick = () => {
        if(typeof playSound === "function") playSound("click");
        modal.style.display = "none";
        document.getElementById("inspect-card-container").innerHTML = ""; // Limpa a memória
    };
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
    const grid = document.getElementById("market-grid"); if(!grid) return; 
    
    // ⚡ CRIA O BOTÃO DE ABRIR PACOTES NO TOPO DO MERCADO ⚡
    let painelPacotes = document.getElementById("pack-banner");
    if (!painelPacotes) {
        painelPacotes = document.createElement("div");
        painelPacotes.id = "pack-banner";
        painelPacotes.innerHTML = `
            <div style="background: rgba(0,20,20,0.8); border: 2px dashed #00ffff; padding: 20px; text-align: center; margin-bottom: 20px; border-radius: 8px;">
                <h3 style="color:#00ffff; margin-top:0; text-shadow:0 0 10px #00ffff; font-family:'Courier New', monospace;">📦 LOTERIA DE DADOS OMNI-BIO</h3>
                <p style="color:#ccc; font-size:0.9rem; margin-bottom: 15px; font-family:'Courier New', monospace;">Descriptografe 3 cartas aleatórias. Chance de obter Lendárias (5%).</p>
                <button id="btn-buy-pack" style="background:#00ffff; color:#000; font-weight:bold; padding:10px 25px; border:none; border-radius:4px; cursor:pointer; font-family:'Courier New', monospace; box-shadow:0 0 15px #00ffff;">
                    [ COMPRAR PACOTE - 250 💽 ]
                </button>
            </div>
        `;
        grid.parentElement.insertBefore(painelPacotes, grid);
        
        document.getElementById("btn-buy-pack").onclick = () => {
            comprarPacote();
        };
    }

    grid.innerHTML = "";
    
    baseDeck.forEach(card => {
        const copies = playerCollection.filter(c => c.title === card.title).length; const div = document.createElement("div"); div.className = `pool-card ${copies > 0 ? card.raridade : 'comum'}`;
        div.innerHTML = `<div class="copies-badge" style="position: absolute; top: 5px; right: 5px; background: rgba(0,0,0,0.9); color: cyan; font-size: 0.8rem; font-weight: bold; padding: 3px 8px; border: 1px solid cyan; border-radius: 4px; z-index: 5;">x${copies}</div><img src="${card.img}" class="pool-img" style="filter: grayscale(${copies > 0 ? 0 : 1}) contrast(1.2); opacity: ${copies > 0 ? 1 : 0.4};"><div class="pool-info"><div class="pool-title" style="color: ${copies > 0 ? '#fff' : '#555'};">${card.title}</div><div class="pool-cost" style="color: ${copies > 0 ? '#00ffff' : '#444'};">${card.custo}⚡</div></div>`;
        div.onclick = () => { playSound("click"); openMarketModal(card, copies); }; grid.appendChild(div);
    });
}

// ==========================================
// 🎁 SISTEMA DE PACOTES (BOOSTER PACKS)
// ==========================================
function comprarPacote() {
    const custoPacote = 250; // Preço do pacote de 3 cartas
    if (playerFragments < custoPacote) {
        playSound("error");
        alert("HDs INSUFICIENTES PARA DESCRIPTOGRAFAR PACOTE!");
        return;
    }

    playerFragments -= custoPacote;
    document.getElementById("fragment-count").textContent = playerFragments;
    playSound("deploy");

    // 🎲 Lógica de Sorteio (Drop Rates)
    const cartasSorteadas = [];
    for (let i = 0; i < 3; i++) { // Sorteia 3 cartas por pacote
        let rng = Math.random() * 100;
        let raridadeSorteada = "comum";
        
        if (rng > 95) raridadeSorteada = "lendaria";      // 5%
        else if (rng > 80) raridadeSorteada = "epica";    // 15%
        else if (rng > 50) raridadeSorteada = "rara";     // 30%
        
        // Puxa do Banco de Dados todas as cartas daquela raridade
        let pool = baseDeck.filter(c => c.raridade === raridadeSorteada);
        if (pool.length === 0) pool = baseDeck; // Proteção de falha
        
        let cartaMisteriosa = pool[Math.floor(Math.random() * pool.length)];
        cartasSorteadas.push({...cartaMisteriosa});
        playerCollection.push({...cartaMisteriosa}); // Adiciona à coleção do jogador
    }

    mostrarAnimacaoPacote(cartasSorteadas);
}

function mostrarAnimacaoPacote(cartas) {
    let modal = document.getElementById("pack-modal");
    
    // Injeta o CSS 3D no HTML (só faz isso uma vez)
    if (!document.getElementById("anim-3d-cards")) {
        const style = document.createElement("style");
        style.id = "anim-3d-cards";
        style.innerHTML = `
            .reward-container { display:flex; gap:30px; perspective:1200px; }
            .reward-card { width:180px; height:260px; cursor:pointer; animation:floatCard 4s ease-in-out infinite; }
            @keyframes floatCard { 0%{transform:translateY(0)} 50%{transform:translateY(-12px)} 100%{transform:translateY(0)} }
            .card-inner { width:100%; height:100%; position:relative; transform-style:preserve-3d; transition:transform 0.6s cubic-bezier(0.4, 0.2, 0.2, 1); }
            .reward-card.flipped .card-inner { transform:rotateY(180deg); }
            .card-back, .card-front { position:absolute; width:100%; height:100%; backface-visibility:hidden; border-radius:14px; display:flex; align-items:center; justify-content:center; }
            .card-back { background:linear-gradient(145deg,#0a0505,#000); border:2px solid #00ffff; box-shadow: 0 0 15px rgba(0,255,255,0.5), inset 0 0 30px rgba(0,255,255,0.2); }
            .card-front { transform:rotateY(180deg); } /* Sem fundo, pois o createCard já tem o fundo da carta */
            .mystery-symbol { font-size:70px; color:#fff; text-shadow:0 0 20px #00ffff; font-family: monospace; }
        `;
        document.head.appendChild(style);
    }

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "pack-modal";
        document.body.appendChild(modal);
    }
    
    // Fundo desfocado
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(5,5,10,0.95); z-index:100000; display:flex; flex-direction:column; justify-content:center; align-items:center; backdrop-filter: blur(8px);";
    
    // O Botão começa invisível (opacity 0) e sem receber cliques (pointer-events none)
    modal.innerHTML = `
        <h2 style="color:#00ffff; text-shadow:0 0 15px #00ffff; margin-bottom: 40px; font-family:'Courier New', monospace;">📦 CLIQUE PARA DESCRIPTOGRAFAR 📦</h2>
        <div id="pack-cards-container" class="reward-container"></div>
        <button id="btn-close-pack" style="margin-top:50px; background:transparent; border:2px solid #00ff00; color:#00ff00; padding:15px 30px; font-family:'Courier New', monospace; font-weight:bold; cursor:pointer; border-radius:4px; box-shadow: 0 0 15px rgba(0,255,0,0.4); opacity:0; pointer-events:none; transition: opacity 0.5s;">[ ADICIONAR AO INVENTÁRIO ]</button>
    `;
    
    const container = modal.querySelector("#pack-cards-container");
    let cartasReveladas = 0; // Contador para saber quando mostrar o botão de fechar
    
    cartas.forEach((cardData, index) => {
        // Cria a carta do jogo usando o seu motor
        const cardEl = createCard(cardData);
        cardEl.style.position = "relative";
        cardEl.onclick = null; 
        cardEl.ondragstart = null;
        cardEl.style.transform = "scale(1)"; // Zera a escala do createCard
        cardEl.style.margin = "0";

        // Cria a cápsula 3D
        const wrapper = document.createElement("div");
        wrapper.className = "reward-card";
        wrapper.style.animationDelay = `${index * 0.3}s`; // Faz elas flutuarem em tempos diferentes
        
        wrapper.innerHTML = `
            <div class="card-inner">
                <div class="card-back">
                    <div class="mystery-symbol">?</div>
                </div>
                <div class="card-front" id="front-slot-${index}"></div>
            </div>
        `;
        
        // Injeta a carta real dentro da face da frente
        wrapper.querySelector(`#front-slot-${index}`).appendChild(cardEl);
        container.appendChild(wrapper);
        
        // LÓGICA DO CLIQUE PARA VIRAR
        wrapper.onclick = () => {
            if (wrapper.classList.contains("flipped")) return; // Não vira duas vezes
            
            playSound("deploy");
            wrapper.classList.add("flipped");
            
            // Efeito de impacto no flip
            gsap.fromTo(wrapper, {scale:1}, {scale:1.15, duration:0.2, yoyo:true, repeat:1});
            
            // Chama a sua função de partículas
            spawnRewardParticles(wrapper);

            // Verifica se a carta é Rara e dá o pulso de brilho após a rotação
            setTimeout(() => {
                if (cardData.raridade === "lendaria" || cardData.raridade === "epica") {
                    playSound("hit");
                    if(window.VFX && window.VFX.pulse) VFX.pulse(cardEl, cardData.raridade === "lendaria" ? "#ffcc00" : "#ff00ff", 1.2, 1000);
                }
            }, 600); // 600ms = tempo da animação CSS rodar

            // Libera o botão de sair só quando as 3 forem reveladas
            cartasReveladas++;
            if (cartasReveladas >= 3) {
                const btnClose = document.getElementById("btn-close-pack");
                btnClose.style.opacity = "1";
                btnClose.style.pointerEvents = "auto";
            }
        };
    });

    modal.style.display = "flex";

    // Fechar o pacote e atualizar a loja
    document.getElementById("btn-close-pack").onclick = () => {
        playSound("click");
        gsap.to(modal, {opacity: 0, duration: 0.3, onComplete: () => { 
            modal.style.display = "none"; 
            modal.style.opacity = 1; 
            if (typeof initMarket === "function" && document.getElementById("market-screen").classList.contains("active")) {
                initMarket(); // Atualiza a quantidade de cartas no mercado se estiver lá
            }
        }});
    };
}

// 💥 SISTEMA DE PARTÍCULAS DO PACOTE
function spawnRewardParticles(cardWrapper) {
    const rect = cardWrapper.getBoundingClientRect();
    
    for(let i=0; i<15; i++){
        const p = document.createElement("div");
        p.style.position = "fixed";
        p.style.left = (rect.left + rect.width / 2) + "px";
        p.style.top = (rect.top + rect.height / 2) + "px";
        p.style.width = "6px";
        p.style.height = "6px";
        p.style.borderRadius = "50%";
        p.style.background = "#00ffff";
        p.style.boxShadow = "0 0 12px #00ffff";
        p.style.zIndex = "100001"; // Fica por cima do modal

        document.body.appendChild(p);

        gsap.to(p, {
            x: (Math.random() * 250 - 125), // Espalha para os lados
            y: (Math.random() * 250 - 125), // Espalha para cima e baixo
            opacity: 0,
            scale: Math.random() * 2,
            duration: Math.random() * 0.8 + 0.5,
            ease: "power2.out",
            onComplete: () => p.remove()
        });
    }
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
    let activeEffect = c.dataset.equipEffect || c.dataset.originalEffect || ""; c.dataset.effect = activeEffect; 
    
    c.classList.remove("taunt-card", "double-attack-card", "lifesteal-card", "shield-card", "stealth-card", "fury-card");
    
    // ⚡ UPGRADE: Agora o jogo entende múltiplos efeitos separados por vírgula!
    if (activeEffect.includes("provocar") || c.classList.contains("aura-taunt")) c.classList.add("taunt-card"); 
    if (activeEffect.includes("ataque_duplo")) c.classList.add("double-attack-card");
    if (activeEffect.includes("roubo_vida")) c.classList.add("lifesteal-card"); 
    if (activeEffect.includes("escudo_divino") && !c.dataset.shieldBroken) c.classList.add("shield-card"); 
    if (activeEffect.includes("furtividade")) c.classList.add("stealth-card"); 
    if (activeEffect.includes("furia")) c.classList.add("fury-card");
    
    if (c.dataset.type !== "feitico" && currentHp <= 0 && c.dataset.dead !== "true") { 
        c.dataset.dead = "true"; 
        processCardEffect("UltimoSuspiro", c, c.parentElement.dataset.owner); 
        if(window.VFX && window.VFX.death) VFX.death(c); else c.remove(); 
        setTimeout(updateAuras, 300); 
    }
}

function updateAuras() {
    ["player-field", "enemy-field"].forEach(f => {
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

        // ⚡ CONTAGEM DA COLMEIA EAO NO CAMPO
        const nomesEAO = ["Branko", "Nyx", "Iris", "Leon", "Rourke"];
        let aliadosEAO = cards.filter(c => nomesEAO.includes(c.dataset.name) && c.dataset.dead !== "true").length;

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

            // ⚡ APLICAÇÃO MATEMÁTICA DA COLMEIA
            if (ef.includes("Colmeia") && aliadosEAO > 1) {
                let bonusColmeia = aliadosEAO - 1; // Dá o bónus pelos *outros* EAOs
                aAtk += bonusColmeia;
                aHp += bonusColmeia;
            }

            c.dataset.auraAtk = aAtk; c.dataset.auraHp = aHp; recalculateStats(c);
        });
    });

    atualizarHudSobrecarga();
}


// =========================================================
// ⚡ HUD DE SOBRECARGA: ANÉIS ORBITAIS NOS AVATARES
// =========================================================
function atualizarHudSobrecarga() {
    // 1. Injeta a Física Orbital no CSS (Se não existir)
    if (!document.getElementById("anim-sobrecarga-orbital")) {
        const style = document.createElement("style");
        style.id = "anim-sobrecarga-orbital";
        style.innerHTML = `
            .sobrecarga-orbit {
                position: absolute;
                top: 50%; left: 50%;
                width: 0; height: 0; /* Ponto central exato do Avatar */
                pointer-events: none;
                animation: spin-orbit 5s linear infinite;
                z-index: 20;
            }
            .sobrecarga-dot {
                position: absolute;
                width: 14px; height: 14px;
                border-radius: 50%;
                background: rgba(10, 15, 20, 0.95);
                border: 2px solid;
                top: -7px; left: -7px; /* Eixo de rotação perfeito */
                transition: all 0.4s ease;
            }
            @keyframes spin-orbit { 100% { transform: rotate(360deg); } }
            @keyframes pulse-critical-dot {
                0% { transform: scale(1); filter: brightness(1); }
                100% { transform: scale(1.5); filter: brightness(1.5); box-shadow: 0 0 20px #ff0055, inset 0 0 10px #ff0055; }
            }
        `;
        document.head.appendChild(style);
    }

    // 2. Remove o HUD velho da barra lateral, caso ele ainda esteja perdido na tela
    const oldHud = document.getElementById("sobrecarga-hud");
    if (oldHud) oldHud.remove();

    // 3. O Motor que gera as órbitas para cada jogador
    function atualizarOrbita(heroId, nivel) {
        const hero = document.getElementById(heroId);
        if (!hero) return;

        const avatarFrame = hero.querySelector('.hero-avatar-frame');
        if (!avatarFrame) return;

        // Limpa os satélites do turno anterior
        let oldOrbit = avatarFrame.querySelector('.sobrecarga-orbit');
        if (oldOrbit) oldOrbit.remove();

        // Se a Sobrecarga for 0, o avatar fica limpo!
        if (nivel === 0) return; 

        // 🟢🟡🔴 Lógica do Reator (Cores)
        let cor = "#00ff00"; // 1-2: Verde (Estável)
        if (nivel >= 3) cor = "#ffcc00"; // 3-4: Amarelo (Atenção)
        if (nivel >= 5) cor = "#ff0055"; // 5: Vermelho (Crítico / Letal)

        // Cria o campo gravitacional
        let orbit = document.createElement("div");
        orbit.className = "sobrecarga-orbit";
        
        // Detalhe Chique: A órbita do inimigo gira no sentido inverso!
        if (heroId === "enemy-hero") orbit.style.animationDirection = "reverse";

        // Cria os pontos de energia (Orbs)
        for (let i = 0; i < nivel; i++) {
            let dot = document.createElement("div");
            dot.className = "sobrecarga-dot";
            
            // ⚡ A MÁGICA: Distribui em 5 posições fixas (72 graus de diferença)
            // O translateY(-55px) empurra o ponto para fora da moldura da foto!
            dot.style.transform = `rotate(${i * 72}deg) translateY(-55px)`;
            
            dot.style.borderColor = cor;
            dot.style.boxShadow = `0 0 10px ${cor}, inset 0 0 5px ${cor}`;
            
            // Se chegou no nível 5, as esferas começam a pulsar freneticamente!
            if (nivel >= 5) {
                dot.style.animation = "pulse-critical-dot 0.4s infinite alternate";
            }
            
            orbit.appendChild(dot);
        }
        
        avatarFrame.appendChild(orbit);
    }

    // 4. Executa a leitura para ambos os comandantes
    atualizarOrbita('player-hero', sobrecargaAtiva.player);
    atualizarOrbita('enemy-hero', sobrecargaAtiva.enemy);
}

function getCardDesc(item) {
    if (item.text) return item.text; let eff = item.efeito; if (!eff || eff === "nenhum") return "";
    const dict = { "sobrecarga": "⚡ Sobrecarga: Com 5 no campo, todas ganham +5/+5.", "provocar": "🛡️ Provocar: Inimigos devem atacar esta unidade.", "ataque_duplo": "⚔️ Ataque Duplo: Pode atacar 2 vezes.", "roubo_vida": "❤️ Roubo de Vida.", "escudo_divino": "🔰 Escudo Divino.", "escudo": "🔰 Escudo.", "furtividade": "🥷 Furtividade.", "voar": "🦅 Voar.", "regeneracao": "🧬 Regeneração 1.", "cura_turno": "💉 Cura 1 HP do Herói.", "reciclar": "♻️ Reciclar.", "investida": "⚡ Ataque Rápido.", "ataque_rapido": "⚡ Ataque Rápido.", "atordoar": "🔌 Atordoar.", "dano_area": "💥 Dano em Área." };
    return dict[eff] || `Efeito: ${eff.replace(/_/g, ' ').toUpperCase()}`;
}

function createCard(item) { 
    if(!item) return document.createElement("div"); 
    
    let isSpell = (item.tipo === 'feitico'); 
    let isEquip = (item.tipo === 'equipamento'); 
    let baseClass = (isSpell || isEquip) ? "feitico" : "tropa"; 
    
    let safeAtk = Number(item.atk)||0; 
    let safeDef = Number(item.def)||0; 
    let safeCost = Number(item.custo)||0;
    const title = item.title || "Unidade Desconhecida";

    const c = document.createElement("div"); 
    c.className = `card-base ${item.raridade || 'comum'} ${baseClass}`;

    // Status lógicos do motor (Mantidos intactos)
    c.dataset.baseAtk = safeAtk; c.dataset.baseHp = safeDef; c.dataset.baseCost = safeCost; c.dataset.damageTaken = 0; c.dataset.equipBaseAtk = 0; c.dataset.equipBaseHp = 0; c.dataset.auraAtk = 0; c.dataset.auraHp = 0; c.dataset.originalEffect = item.efeito; c.dataset.equipEffect = "";
    c.draggable = true; c.dataset.name = title; c.dataset.attack = safeAtk; c.dataset.hp = safeDef; c.dataset.cost = safeCost; c.dataset.type = baseClass; c.dataset.raca = item.tipo; c.dataset.effect = item.efeito; c.dataset.hasAttacked = "false";
    
    // Ícones Dinâmicos
    let typeIcon = "⚔️"; 
    if(["automato"].includes(item.tipo)) typeIcon = "⚙️"; 
    if(["humano","medico","soldado", "agente", "resistencia"].includes(item.tipo)) typeIcon = "🧬"; 
    if(item.tipo === "estrutura") typeIcon = "🏗️"; 
    if(item.tipo === "mutante" || item.tipo === "biologico") typeIcon = "☣️"; 
    if(isSpell) typeIcon = "⚡";
    if(isEquip) typeIcon = "🛡️";
    
    // Gerador de Fita de Raridade (Estrelas verticais)
    let starsCount = item.raridade === "lendaria" ? 5 : (item.raridade === "epica" ? 3 : (item.raridade === "rara" ? 2 : 1)); 
    let starsHTML = ''; 
    for(let i=0; i<starsCount; i++) starsHTML += '<div class="cyber-star">★</div>'; 

    let cardDescription = getCardDesc(item) || ""; 
    
    // ⚡ A INJEÇÃO DO NOVO HTML (CHASSI METÁLICO COM NEON)
    c.innerHTML = `
        <div class="hud-card-image" style="background-image: url('${item.img || 'https://files.catbox.moe/w2j2w7.png'}');"></div>
        <div class="hud-image-fade"></div>

        <div class="hud-glare-mask"><div class="hud-glare"></div></div>

        <div class="hud-cost-box">[ ${safeCost}⚡ ]</div>
        <div class="hud-type-box">[ ${typeIcon} ]</div>

        ${!(isSpell || isEquip) ? `
            <div class="hud-stats-bottom">
                <div class="hud-atk-box">[ATK <span class="stat-atk">${safeAtk}</span>]</div>
                <div class="hud-def-box">[DEF <span class="stat-def">${safeDef}</span>]</div>
            </div>
        ` : ''}

        <div class="hud-card-info">
            <div class="hud-card-name">${title}</div>
            <div class="hud-card-desc">${cardDescription}</div>
        </div>
    `;
    
    // Eventos de Mouse e Touch (O seu motor de animação intacto)
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

    // Drag & Drop Blindado
    c.ondragstart = (e) => { 
        e.dataTransfer.setData('text/plain', 'carta'); 
        if(isSystemLocked || c.parentElement.id !== "hand") { e.preventDefault(); return; } 
        if(isSpell || isEquip) { e.preventDefault(); playSound("error"); alert("SISTEMA: Clique na carta na mão e depois no alvo."); return; } 
        draggedCard = c; 
    };
    c.ondragend = () => { if (draggedCard) draggedCard = null; }; 
    
    recalculateStats(c); 
    return c; 
}

// ==========================================
// 7. SISTEMA DE CLIQUES E EFEITOS
// ==========================================

// ⚡ 1. ATUALIZE SUA FUNÇÃO DE CLIQUE NO HERÓI
function handleHeroClick(heroElement, owner) {
    if (isSystemLocked) return;
    const isSpellSelected = selectedCardFromHand && selectedCardFromHand.dataset.raca === "feitico";
    
    if (isSpellSelected) { 
        executeSpell(selectedCardFromHand, heroElement, owner); 
        limparMiras(); // ⚡ MIRA DESLIGADA: Feitiço lançado!
    } 
    else if (selectedAttacker && owner === "enemy" && currentStep === "combat" && attackToken === "player") {
        const taunts = document.getElementById("enemy-field").querySelectorAll('.taunt-card');
        
        if (taunts.length > 0) { 
            playSound("error"); 
            alert("ALVO INVÁLIDO! Destrua as tropas com Provocar primeiro."); 
            return; // ⚡ Não limpa as miras aqui, pois o jogador ainda precisa escolher o alvo certo!
        }
        
        let attacker = selectedAttacker; 
        selectedAttacker = null; 
        attacker.classList.remove("attacker-selected");
        
        resolveCombat(attacker, heroElement, true);
        if(window.conexao && window.conexao.open) {
            let atkSlot = Array.from(attacker.parentElement.parentElement.children).indexOf(attacker.parentElement);
            window.enviarPacote({ acao: "ATACAR", atkSlot, targetType: "hero" });
        }
        limparMiras(); // ⚡ MIRA DESLIGADA: Ataque concluído!
    }
}

// ⚡ 2. ADICIONE ESTA FUNÇÃO NO SEU SCRIPT (Para apagar todos os neons do campo)
function limparMiras() {
    document.querySelectorAll('.valid-target-attack').forEach(el => el.classList.remove('valid-target-attack'));
    document.querySelectorAll('.valid-target-buff').forEach(el => el.classList.remove('valid-target-buff'));
    
    // Tira o alvo dos Heróis também (caso eles estejam brilhando)
    document.getElementById('enemy-hero').classList.remove('valid-target-attack');
    document.getElementById('player-hero').classList.remove('valid-target-buff');
}

function executeEquip(equipCard, targetElement, targetOwner) {
    if (currentStep === "combat") { playSound("error"); alert("Apenas Fase de Deploy."); return; }
    if (targetOwner !== "player" && !(window.conexao && window.conexao.open)) { playSound("error"); alert("Equipe suas tropas!"); return; } 
    if (targetElement.id.includes("hero")) { playSound("error"); alert("Heróis não usam equipamentos!"); return; }
    const cost = parseInt(equipCard.dataset.cost) || 0;
    
    if (equipCard.parentElement && equipCard.parentElement.id === "hand") {
        if (playerMana < cost) { playSound("error"); alert("RAM INSUFICIENTE!"); return; }
        playerMana -= cost; updateLifeAndMana();
        registrarLog(`Equipou: [${equipCard.dataset.name}]`, "player");
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
        registrarLog(`Lançou Magia: [${spellCard.dataset.name}]`, "player");
        if (window.conexao && window.conexao.open) { let tType = targetElement.id.includes("hero") ? "hero" : "card"; let dSlot = null; if (tType === "card") dSlot = Array.from(targetElement.parentElement.parentElement.children).indexOf(targetElement.parentElement); window.enviarPacote({ acao: "LANCAR_MAGIA", cardName: spellCard.dataset.name, targetOwner: targetOwner, targetType: tType, defSlot: dSlot }); }
        spellCard.remove(); arrangeHand(); selectedCardFromHand = null; draggedCard = null;
    }
    if(spellCard.dataset.somDrop) { let d = new Audio(spellCard.dataset.somDrop); d.play().catch(()=>{}); } else { playSound("hit"); }
    const efeito = spellCard.dataset.effect;

    if(efeito === "dano_total" || efeito === "dano_area") { document.getElementById(isLocalCaster ? "enemy-field" : "player-field").querySelectorAll('.card-base').forEach(inimigo => applyDamage(inimigo, 3)); if(efeito === "dano_total") { if(isLocalCaster) enemyLife -= 4; else playerLife -= 4; } screenShake(); } else if (efeito.includes("dano_")) { let dmg = parseInt(efeito.split("_")[1]) || 0; if(targetElement.id.includes("hero")) { if(targetElement.id === "enemy-hero") enemyLife -= dmg; else playerLife -= dmg; if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(targetElement, "#ff0000"); } else { applyDamage(targetElement, dmg); } screenShake(); } else if (efeito.includes("cura_")) { let heal = parseInt(efeito.split("_")[1]) || 0; if(targetElement.id.includes("hero")) { if(targetElement.id === "player-hero") playerLife += heal; else enemyLife += heal; if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(targetElement, "#00ff00"); } else { targetElement.dataset.damageTaken = Math.max(0, (parseInt(targetElement.dataset.damageTaken) || 0) - heal); recalculateStats(targetElement); if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(targetElement, "#00ff00"); } } else if (efeito === "atordoar" && !targetElement.id.includes("hero")) { targetElement.classList.add("exhausted"); targetElement.dataset.hasAttacked = "true"; if(window.VFX && window.VFX.stun) VFX.stun(targetElement); }
    checkGameOver(); updateLifeAndMana(); 

    // ⚡ ADICIONE ESTA LINHA AQUI: Ensina o motor a ler o efeito da magia
    let ef = spellCard.dataset.effect || spellCard.dataset.originalEffect || "";

   
    
    // ⚡ MAGIA: NEGAÇÃO TOTAL (Debuff Mutante)
    if (ef === "negacao_total") {
        let field = document.getElementById(isPlayer ? "enemy-field" : "player-field");
        field.querySelectorAll('.card-base').forEach(c => {
            if (c.dataset.raca === "mutante") {
                c.dataset.baseAtk = Math.max(0, (parseInt(c.dataset.baseAtk) || 0) - 2);
                c.dataset.baseHp = Math.max(1, (parseInt(c.dataset.baseHp) || 0) - 2); // Não mata, deixa com 1
                recalculateStats(c);
                mostrarTextoFlutuante(c, "-2/-2 NEUTRALIZADO", "#00ffff");
            }
        });
    }

    // ⚡ MAGIA: ESTERILIZAÇÃO DE SETOR
    if (ef === "esterilizacao_setor") {
        let field = document.getElementById(isPlayer ? "enemy-field" : "player-field");
        field.querySelectorAll('.card-base').forEach(c => {
            if (c.dataset.raca === "mutante") {
                c.dataset.damageTaken = 999;
                recalculateStats(c);
                mostrarTextoFlutuante(c, "PURGADO!", "#ff0000");
            }
        });
        screenShake();
    }

    // ⚡ MAGIA: EXTRAÇÃO DE EMERGÊNCIA (Bounce)
    if (ef === "extracao_emergencia" && targetCard && !targetCard.id.includes("hero")) {
        let targetOwner = targetCard.parentElement.dataset.owner;
        let cardData = baseDeck.find(c => c.title === targetCard.dataset.name);
        if (cardData) {
            targetCard.remove(); // Tira da mesa
            if (targetOwner === "player") {
                let novaCarta = createCard(cardData);
                document.getElementById("hand").appendChild(novaCarta);
                arrangeHand();
            } else {
                enemyHand.push(cardData); // Devolve para a IA
            }
            mostrarTextoFlutuante(targetCard.parentElement, "EXTRAÍDO", "#00ffcc");
        }
    }

    // ⚡ MAGIA: RELATÓRIO CLASSIFICADO (Roubo de Deck)
    if (ef === "relatorio_classificado") {
        if (isPlayer && enemyDeck.length >= 2) {
            let c1 = createCard(enemyDeck.pop());
            let c2 = createCard(enemyDeck.pop());
            document.getElementById("hand").appendChild(c1);
            document.getElementById("hand").appendChild(c2);
            arrangeHand();
            mostrarTextoFlutuante(document.getElementById("player-hero"), "DADOS ROUBADOS", "#00ff00");
        }
    }

    // ⚡ MAGIA: VARREDURA AMNÉSIA
    if (ef === "varredura_amnesia") {
        if (isPlayer) {
            // Tira da mão da IA e põe no deck
            if (enemyHand.length > 0) enemyDeck.push(enemyHand.pop());
            if (enemyHand.length > 0) enemyDeck.push(enemyHand.pop());
            mostrarTextoFlutuante(document.getElementById("enemy-hero"), "-2 CARTAS", "#ff0055");
        } else {
            // IA faz o player perder 2 cartas aleatórias da mão
            let mao = document.getElementById("hand");
            if (mao.children.length > 0) mao.lastElementChild.remove();
            if (mao.children.length > 0) mao.lastElementChild.remove();
            mostrarTextoFlutuante(document.getElementById("player-hero"), "MEMÓRIA APAGADA", "#ff0055");
            arrangeHand();
        }
    }

    // =====================================================================
    // ⚡ GATILHO INTERCEPTADOR DE ANOMALIAS (Vai no final do executeSpell)
    // =====================================================================
    let aliados = document.getElementById(isPlayer ? "player-field" : "enemy-field").querySelectorAll('.card-base');
    aliados.forEach(aliado => {
        let efeitoAliado = aliado.dataset.effect || "";
        if (efeitoAliado.includes("interceptador")) {
            let inimigos = document.getElementById(isPlayer ? "enemy-field" : "player-field").querySelectorAll('.card-base');
            if (inimigos.length > 0) {
                let alvoAzarado = inimigos[Math.floor(Math.random() * inimigos.length)];
                setTimeout(() => {
                    if(window.VFX && window.VFX.onAttack) VFX.onAttack(aliado, alvoAzarado, "tiro");
                    applyDamage(alvoAzarado, 2);
                    mostrarTextoFlutuante(alvoAzarado, "INTERCEPTADO!", "#ffcc00");
                }, 500); // Dispara meio segundo depois do feitiço
            }
        }
    });
}

function processCardEffect(gatilho, cartaObj, owner) {
    const efeito = cartaObj.dataset.effect || cartaObj.dataset.originalEffect; 
    const isPlayer = owner === "player";

    if (gatilho === "AoJogar") {

        // 📜 REGISTRA A INVOCACÃO NO DIÁRIO
        registrarLog(`Invocou: [${cartaObj.dataset.name}]`, owner);
      
      // ⚡ MECÂNICA: OPERATIVO VÁCUO (Silêncio)
        if (efeito === "silencio_aleatorio") {
            const field = document.getElementById(isPlayer ? "enemy-field" : "player-field");
            const alvos = Array.from(field.querySelectorAll('.card-base'));
            if (alvos.length > 0) {
                let alvo = alvos[Math.floor(Math.random() * alvos.length)];
                alvo.dataset.effect = "nenhum"; // Apaga o efeito
                alvo.dataset.originalEffect = "nenhum";
                let typeBox = alvo.querySelector('.hud-type-box');
                if(typeBox) typeBox.innerText = "[SILENCIADO]";
                mostrarTextoFlutuante(alvo, "SISTEMA ANULADO!", "#555555");
                playSound("error");
            }
        }

        // ⚡ MECÂNICA: UNIDADE HAZMAT (Aprisionar Slot)
        if (efeito === "aprisionar_slot") {
            const field = document.getElementById(isPlayer ? "enemy-field" : "player-field");
            const slots = Array.from(field.children);
            let slotAlvo = slots[Math.floor(Math.random() * slots.length)];
            slotAlvo.classList.add("slot-aprisionado");
            slotAlvo.style.boxShadow = "inset 0 0 20px #ffcc00"; // Brilho Amarelo de Quarentena
            cartaObj.dataset.slotAprisionado = slotAlvo.id; // Guarda a info para soltar depois
            mostrarTextoFlutuante(cartaObj, "QUARENTENA ATIVADA", "#ffcc00");
        }

        // ⚡ MECÂNICA: DRONE SOMBRA (Aumento de Custo - Aura Ativa)
        if (efeito === "taxa_automato") {
            // Aumenta o custo na mão do oponente dinamicamente (Simplificado para efeito imediato)
            mostrarTextoFlutuante(cartaObj, "CUSTO INIMIGO AUMENTADO", "#ff00ff");
        }
        
        // ⚡ MECÂNICA: DANO EM ÁREA (Explosão no campo inimigo)
        if (efeito.includes("dano_area")) {
            let campoInimigo = document.getElementById(isPlayer ? "enemy-field" : "player-field").children;
            let danoAoE = 2; 
            playSound("hit"); 
            if(typeof screenShake === "function") screenShake();
            for (let i = 0; i < campoInimigo.length; i++) {
                let alvoDOM = campoInimigo[i].querySelector('.card-base');
                if (alvoDOM) {
                    applyDamage(alvoDOM, danoAoE);
                    if(window.VFX && window.VFX.showBuff) VFX.showBuff(alvoDOM, `-${danoAoE} DANO`, "#ff0000");
                }
            }
        }

        // ⚡ MECÂNICA: COLMEIA (Copia palavra-chave ao entrar)
        if (efeito.includes("Colmeia")) {
            let campoAliado = document.getElementById(isPlayer ? "player-field" : "enemy-field").children;
            let efeitosDisponiveis = [];
            let nomesEAO = ["Branko", "Nyx", "Iris", "Leon", "Rourke"];
            let temOutroEAO = false;

            for (let i = 0; i < campoAliado.length; i++) {
                let cardDOM = campoAliado[i].querySelector('.card-base');
                if (cardDOM && cardDOM !== cartaObj && nomesEAO.includes(cardDOM.dataset.name)) {
                    temOutroEAO = true;
                    let ef = cardDOM.dataset.effect || cardDOM.dataset.originalEffect || "";
                    if (ef && ef !== "nenhum") efeitosDisponiveis.push(ef);
                }
            }

            if (temOutroEAO) {
                if (efeitosDisponiveis.length > 0) {
                    let efeitoSorteado = efeitosDisponiveis[Math.floor(Math.random() * efeitosDisponiveis.length)];
                    if (efeito.includes("furtividade") && efeitoSorteado.includes("provocar")) efeitoSorteado = "escudo_divino"; 
                    cartaObj.dataset.originalEffect += "," + efeitoSorteado;
                    recalculateStats(cartaObj);
                }
                if(window.VFX && window.VFX.showBuff) VFX.showBuff(cartaObj, `COLMEIA ATIVADA`, "#ff00ff");
            }
        }

        // ⚡ MECÂNICA: EXTRAÇÃO (Destrói aliado fraco para comprar cartas) - EQUIPE LAB
        if (efeito.includes("extracao")) {
            const field = document.getElementById(isPlayer ? "player-field" : "enemy-field");
            const aliados = Array.from(field.querySelectorAll('.card-base')).filter(c => c !== cartaObj && c.dataset.dead !== "true");
            
            if (aliados.length > 0) {
                const alvo = aliados[Math.floor(Math.random() * aliados.length)];
                alvo.dataset.dead = "true";
                processCardEffect("UltimoSuspiro", alvo, owner);
                if(window.VFX && window.VFX.death) VFX.death(alvo); else alvo.remove();
                
                if (isPlayer) {
                    drawCard();
                    setTimeout(drawCard, 300);
                } 
                if(window.VFX && window.VFX.showBuff) VFX.showBuff(cartaObj, "EXTRAÇÃO SUCESSO!", "#00ffcc");
            }
        }
        
        // ⚡ INJEÇÃO DAS FALAS (VOICE LINES) ⚡
        let raca = cartaObj.dataset.raca; 
        if (falasPorTipo[raca]) {
            let listaFalas = falasPorTipo[raca];
            let falaSorteada = listaFalas[Math.floor(Math.random() * listaFalas.length)];
            projetarFalaHolografica(cartaObj, falaSorteada);
        }
        
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
        
        // ⚡ MECÂNICA: SINERGIA AUTÔMATO (Padronizado)
        if (cartaObj.dataset.raca === "automato") {
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
        
        // ⚡ LIMPEZA HAZMAT (Libera a quarentena ao morrer)
        if (efeito === "aprisionar_slot" && cartaObj.dataset.slotAprisionado) {
            let slot = document.getElementById(cartaObj.dataset.slotAprisionado);
            if (slot) {
                slot.classList.remove("slot-aprisionado");
                slot.style.boxShadow = ""; // Tira o brilho
            }
        }

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
        
        // ⚡ MECÂNICA: PREDADOR (Fica gigante quando as cartas morrem) - EQUIPE LAB
        ["player-field", "enemy-field"].forEach(f => {
            const field = document.getElementById(f);
            if (field) {
                const predadores = Array.from(field.querySelectorAll('.card-base')).filter(c => {
                    let ef = c.dataset.effect || c.dataset.originalEffect || "";
                    return ef.includes("predador") && c.dataset.dead !== "true";
                });
                
                predadores.forEach(predador => {
                    predador.dataset.baseAtk = (parseInt(predador.dataset.baseAtk) || 0) + 2;
                    predador.dataset.baseHp = (parseInt(predador.dataset.baseHp) || 0) + 2;
                    predador.dataset.damageTaken = Math.max(0, (parseInt(predador.dataset.damageTaken) || 0) - 2);
                    recalculateStats(predador);
                    if(window.VFX && window.VFX.showBuff) VFX.showBuff(predador, "PREDADOR +2/+2", "#ff0055");
                });
            }
        });
    }

    if (gatilho === "FimDeTurno") { 
        // ⚡ PROTEÇÃO: Só ativa efeitos se for o FIM do turno do DONO da carta!
        if (owner === attackToken) return;

        if (efeito === "cura_turno" && isPlayer) { 
            playerLife = Math.min(playerLife+1, maxLife); 
            if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(document.getElementById("player-hero"), "#00ff00"); 
        } 
        if (efeito === "regeneracao") { 
            cartaObj.dataset.damageTaken = Math.max(0, (parseInt(cartaObj.dataset.damageTaken) || 0) - 1); 
            recalculateStats(cartaObj); 
            if(window.VFX && window.VFX.triggerTechBits) VFX.triggerTechBits(cartaObj, "#00ff00"); 
        } 
        
        // ⚡ MECÂNICA: CURA EM ÁREA (Médico só cura quem precisa!)
        if (efeito.includes("cura_area")) {
            let campoAliado = document.getElementById(isPlayer ? "player-field" : "enemy-field").children;
            let valorCura = 3;
            let curouAlguem = false;

            for (let i = 0; i < campoAliado.length; i++) {
                let alvoDOM = campoAliado[i].querySelector('.card-base');
                if (alvoDOM) {
                    let danoAtual = parseInt(alvoDOM.dataset.damageTaken) || 0;
                    if (danoAtual > 0) { 
                        alvoDOM.dataset.damageTaken = Math.max(0, danoAtual - valorCura);
                        recalculateStats(alvoDOM);
                        if(window.VFX && window.VFX.showBuff) VFX.showBuff(alvoDOM, `+${valorCura} CURA`, "#00ff00");
                        curouAlguem = true;
                    }
                }
            }
            if (curouAlguem) playSound("deploy");
        }
        
        // ⚡ MECÂNICA: MUTAÇÃO (Ganha +1/+1 no fim do turno) - EQUIPE LAB
        if (efeito.includes("mutacao")) {
            cartaObj.dataset.baseAtk = (parseInt(cartaObj.dataset.baseAtk) || 0) + 1;
            cartaObj.dataset.baseHp = (parseInt(cartaObj.dataset.baseHp) || 0) + 1;
            recalculateStats(cartaObj);
            if(window.VFX && window.VFX.showBuff) VFX.showBuff(cartaObj, "MUTAÇÃO +1/+1", "#00ffcc");
        }

        // ⚡ MECÂNICA: INCUBAÇÃO (Gera um Clone Instável no fim do turno) - EQUIPE LAB
        if (efeito.includes("incubar")) {
            const field = document.getElementById(isPlayer ? "player-field" : "enemy-field");
            const emptySlots = Array.from(field.children).filter(s => !s.querySelector('.card-base'));
            if (emptySlots.length > 0) {
                const clone = createCard(baseDeck.find(c => c.title === "Clone Instável")); 
                clone.dataset.owner = owner; 
                emptySlots[0].appendChild(clone); 
                
                gsap.set(clone, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0 }); 
                clone.dataset.hasAttacked = "false"; 
                clone.classList.remove("exhausted"); 
                
                if(window.VFX && window.VFX.onSummon) VFX.onSummon(clone, "provocar"); 
                playSound("deploy");
            }
        }
    }
}
    
// ==========================================
// 8. O MOTOR DE FASES (PING-PONG)
// ==========================================
function startGameDirect(mode, arenaClass) {
    // 🎲 1. ROLETA DE CENÁRIOS
    const arenasDisponiveis = ["theme-void", "theme-lab", "theme-war",]; 
    let arenaFinal = arenaClass;

    // Se o jogo tentar mandar para o "theme-lab" padrão, nós sabotamos e sorteamos um!
    if (!arenaClass || arenaClass === "theme-lab") {
        arenaFinal = arenasDisponiveis[Math.floor(Math.random() * arenasDisponiveis.length)];
    }

    // 2. TRANSIÇÃO DE TELAS
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active")); 
    document.getElementById("game-screen").classList.add("active");
    
    // 3. APLICAÇÃO DO CENÁRIO NO CSS
    document.body.className = arenaFinal; 
    document.getElementById("board").className = arenaFinal;
    
    // 4. INICIA A LÓGICA DO JOGO
    initGame(mode === "campaign" ? 0 : "casual", arenaFinal);

    // 🎓 5. PROTOCOLO DE TREINAMENTO (Gatilho do Tutorial)
    if (typeof checkTutorial === "function") {
        checkTutorial(); 
    }
    atualizarIdentidadeNaUI();
}

function initGame(levelIndex, arenaClass) {
    currentLevel = levelIndex; 
    let levelData = levelIndex === "casual" ? { bossName: "SIMULACRO", bossHp: 20, bossImg: "https://files.catbox.moe/05e01v.png" } : campaignData[levelIndex];
    const enHero = document.getElementById("enemy-hero"); if(enHero) { enHero.querySelector(".hero-avatar").src = levelData.bossImg; enHero.querySelector(".hero-stats span:last-child").innerHTML = `VIDA: <span id="enemy-life">${levelData.bossHp}</span>`; enHero.onclick = () => handleHeroClick(enHero, "enemy"); }
    const plHero = document.getElementById("player-hero"); if(plHero) { plHero.onclick = () => handleHeroClick(plHero, "player"); if(selectedHeroObj) document.getElementById("player-avatar-img").src = selectedHeroObj.imgUrl; }

    enemyLife = levelData.bossHp; playerLife = 20; maxMana = 3; playerMana = 3; currentTurn = 1; gameIsOver = false; 

    if (window.conexao && window.conexao.open) {
        if (window.isHost) { attackToken = "player"; isSystemLocked = false; }
        else { attackToken = "enemy"; isSystemLocked = true; }
    } else { attackToken = "player"; isSystemLocked = false; }
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

    // ⚡ REGRA DE 10 TURNOS (Morte Súbita Blindada V2)
    if (currentTurn > 10) { 
        // Lógica de Morte Súbita: Zera a vida do perdedor à força!
        if (playerLife > enemyLife) {
            enemyLife = 0; 
            alert("Morte Súbita: Vitória por Sobrevivência Tática!");
        } else if (enemyLife > playerLife) {
            playerLife = 0; 
            alert("Morte Súbita: Derrota por Exaustão Crítica!");
        } else {
            // No empate, ambos morrem
            playerLife = 0;
            enemyLife = 0;
            alert("Morte Súbita: Empate Absoluto!");
        }
        
        updateLifeAndMana(); // Atualiza a HUD para mostrar o '0' de vida
        checkGameOver();     // ⚡ Chama a SUA função real que dá as recompensas
        
        // ⚡ GATILHO P2P: Avisa o outro PC para ele também processar o fim do turno
        if (window.conexao && window.conexao.open && !fromNetwork) {
            window.enviarPacote({ acao: "AVANCAR_FASE" }); 
        }
        return; // Trava a rodada aqui
    }

    // Fluxo normal das fases
    if (currentStep === "deploy_attacker") {
        currentStep = "deploy_defender";
    } else if (currentStep === "deploy_defender") {
        currentStep = "combat";
    } else if (currentStep === "combat") { 
        startNewRound(fromNetwork); 
        return; 
    }
    
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
    
    // ⚡ CORREÇÃO DA RAM: Agora AMBOS os jogadores sobem a RAM e compram carta juntos!
    if(maxMana < 10) maxMana++; 
    playerMana = maxMana; 
    drawCard(); 
    
    updateUIState();
    
    // O Host avisa o Cliente para também virar o turno
    if(window.conexao && window.conexao.open && !fromNetwork) { 
        window.enviarPacote({ acao: "PASSAR_TURNO", syncLife: { playerLife, enemyLife } }); 
    }
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
        if(attackToken === "player") pFrame.style.boxShadow = "0 0 35px #00ffff"; else eFrame.style.boxShadow = "0 0 35px #ff0055"; 
    }
    
    let isP2P = (window.conexao && window.conexao.open); 
    const colorCyan = "#00ffff"; const colorRed = "#ff0055"; const colorYellow = "#ffcc00";

    // ⚡ GATILHO DA ANIMAÇÃO DE OUTDOOR (Executa apenas 1x na virada do turno)
    let phaseKey = currentTurn + "_" + currentStep + "_" + attackToken;
    if (window.lastPhaseKey !== phaseKey) {
        window.lastPhaseKey = phaseKey;
        
        // Dispara o letreiro gigante apenas no início do turno de cada jogador
        if (currentStep === "deploy_attacker") {
            if (attackToken === "player") {
                showPhaseBanner("TURNO DE ATAQUE", true); // True = Vermelho
            } else {
                showPhaseBanner("TURNO DE DEFESA", false); // False = Ciano
            }
        }
    }

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
    
    // ⚡ GATILHO UNIVERSAL DE SACRIFÍCIO (Cobre Click e Drag & Drop)
    const cartaAntiga = slot.querySelector('.card-base');
    if(cartaAntiga) { 
        if (card.dataset.type === "tropa" && slot.dataset.owner === "player") {
            showSacrificeConfirm(cartaAntiga, card, slot);
        } else {
            playSound("error"); alert("SISTEMA: Slot Ocupado!"); 
        }
        return; // Interrompe a jogada para esperar o jogador confirmar no modal
    }

    let cst = parseInt(card.dataset.cost) || 0; let donoDoSlot = slot.dataset.owner; 
    if(playerMana >= cst) {
        playerMana -= cst; slot.appendChild(card); 
        if(donoDoSlot === "player" && window.conexao && window.conexao.open) { let slotIndex = Array.from(slot.parentElement.children).indexOf(slot); window.enviarPacote({ acao: "JOGAR_CARTA", cardName: card.dataset.name, slotIndex: slotIndex }); }
        card.classList.remove("deployment-selected"); gsap.killTweensOf(card); 
        gsap.set(card, { clearProps: "all" });
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
            // ⚡ 2. CAIXA DE *****ÂNIO RESTAURADA (O "try" que tinha sumido)
            try {
                let ef = atkCard.dataset.effect || ""; // Restauramos a leitura dos efeitos!
                
                if(window.VFX && window.VFX.onAttack) VFX.onAttack(atkCard, defCard, ef);
                if(atkCard.dataset.somAtaque) { let a = new Audio(atkCard.dataset.somAtaque); a.play().catch(()=>{}); } else { playSound("hit"); }

                let dmgToDef = parseInt(atkCard.dataset.attack) || 0; 
                let dmgToAtk = 0;
                
                if(!defCard.id.includes("hero")) dmgToAtk = parseInt(defCard.dataset.attack) || 0; 
                
                // ⚡ SALVA A VIDA ORIGINAL PARA O CÁLCULO DE ATROPELAR
                let defesaOriginalDoAlvo = defCard.id.includes("hero") ? (isPlayer ? enemyLife : playerLife) : (parseInt(defCard.dataset.hp) || 0);

                // (Mantenha o que estava antes até chegar aqui:)
                if(defCard.id.includes("hero")) { 
                    if(isPlayer) enemyLife -= dmgToDef; else playerLife -= dmgToDef; 
                    screenShake(); 
                } else { 
                    applyDamage(defCard, dmgToDef); 
                    
                    // ⚡ MECÂNICA: TÓXICO (Atacante envenena o Defensor)
                    if (ef.includes("toxico") && dmgToDef > 0) {
                        defCard.dataset.damageTaken = 999; // Dano letal imediato
                        recalculateStats(defCard);
                        if(window.VFX && window.VFX.showBuff) VFX.showBuff(defCard, "TÓXICO!", "#00ff00");
                    }
                }
                
                if (dmgToAtk > 0) {
                    applyDamage(atkCard, dmgToAtk);
                    
                    // ⚡ MECÂNICA: TÓXICO (Defensor envenena o Atacante se revidar)
                    let efDef = defCard.dataset ? (defCard.dataset.effect || "") : "";
                    if (efDef.includes("toxico") && !defCard.id.includes("hero")) {
                        atkCard.dataset.damageTaken = 999; // Dano letal imediato
                        recalculateStats(atkCard);
                        if(window.VFX && window.VFX.showBuff) VFX.showBuff(atkCard, "TÓXICO!", "#00ff00");
                    }
                }
                // (O resto do resolveCombat continua normal para baixo: Atropelar, Fúria, etc...)

                // ⚡ MECÂNICA: ATROPELAR (Dano Excedente)
                if (ef.includes("atropelar") && dmgToDef > defesaOriginalDoAlvo && !defCard.id.includes("hero")) {
                    let danoExcedente = dmgToDef - defesaOriginalDoAlvo;
                    if (danoExcedente > 0) {
                        if(isPlayer) enemyLife -= danoExcedente; else playerLife -= danoExcedente;
                        screenShake();
                        if(window.VFX && window.VFX.showBuff) VFX.showBuff(document.getElementById(isPlayer ? "enemy-hero" : "player-hero"), `-${danoExcedente} ATROPELADO!`, "#ff0000");
                    }
                }

                // ⚡ MECÂNICA: FÚRIA (Ganha ataque ao apanhar)
                let efDef = defCard.dataset ? (defCard.dataset.effect || "") : "";
                if (efDef.includes("furia") && !defCard.id.includes("hero") && (parseInt(defCard.dataset.hp) || 0) > 0) {
                    defCard.dataset.baseAtk = (parseInt(defCard.dataset.baseAtk) || 0) + 2;
                    recalculateStats(defCard);
                    if(window.VFX && window.VFX.showBuff) VFX.showBuff(defCard, "FÚRIA! +2 ATK", "#ff0000");
                }

                if (ef.includes("roubo_vida") && isPlayer) playerLife = Math.min(playerLife + dmgToDef, maxLife);
                
                checkGameOver(); updateLifeAndMana(); 
                
                let attackerAlive = (parseInt(atkCard.dataset.hp) || 0) > 0; 
                let defenderDied = !defCard.id.includes("hero") && (parseInt(defCard.dataset.hp) || 0) <= 0;
                
                // ⚡ MECÂNICA: FAXINEIRO DE PROVAS
                if (defenderDied && ef.includes("faxineiro") && isPlayer) {
                    let cardData = baseDeck.find(c => c.title === defCard.dataset.name);
                    if (cardData) {
                        let cloneHand = createCard(cardData);
                        document.getElementById("hand").appendChild(cloneHand);
                        arrangeHand();
                        mostrarTextoFlutuante(atkCard, "PROVA COLETADA", "#00ffff");
                        defCard.dataset.jaRoubado = "true"; // Evita que vá pro cemitério
                    }
                }
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

            } catch(e) { // 👈 O CATCH AGORA TEM O SEU "TRY"
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
    
    // ⚡ 1. O CONTADOR SILENCIOSO DE PARTIDAS
    let partidasJogadas = parseInt(localStorage.getItem("zeusMatchesPlayed")) || 0;
    partidasJogadas++;
    localStorage.setItem("zeusMatchesPlayed", partidasJogadas);

    // 2. CÁLCULO DA RECOMPENSA NORMAL
    if (playerWon) { 
        let ganho = Math.floor(Math.random() * 100) + 50; 
        playerFragments += ganho; 
        recompensaHTML = `<h2 style="color: #00ffff; margin: 15px 0; text-shadow: 0 0 10px #00ffff;">+${ganho} 💽 HDs EXTRAÍDOS</h2>`; 
        playSound("deploy"); 
    } else { 
        playSound("error"); 
    }

    // ⚡ 3. O GATILHO DO PROTOCOLO VETERANO (3 PARTIDAS)
    let deckRewardHTML = "";
    let recompensaJaEntregue = localStorage.getItem("zeusDeck3Partidas");
    
    if (partidasJogadas === 3 && !recompensaJaEntregue) {
        playerFragments += 100; // Bônus massivo para comprar pacotes e formar o deck!
        localStorage.setItem("zeusDeck3Partidas", "true"); // Marca que já recebeu para não dar de novo
        
        deckRewardHTML = `
            <div style="border: 2px dashed #ff00ff; padding: 10px; margin: 15px 0; background: rgba(255,0,255,0.1);">
                <h3 style="color: #ff00ff; text-shadow: 0 0 15px #ff00ff; margin: 0;">🎁 RECOMPENSA DE VETERANO 🎁</h3>
                <p style="color: #fff; font-size: 0.9rem;">Parabéns por sobreviver a 3 simulações! <br> <b>+100 💽 HDs BÔNUS</b> depositados.</p>
            </div>
        `;
        // Um som extra de vitória se bater a meta
        setTimeout(() => playSound("deploy"), 500); 
    }
    
    // ⚡ 4. SALVA TUDO NO HD
    saveProgress(); 
    
    let botoesAcao = `<button class="cmd-btn" onclick="location.reload()" style="margin-top: 20px;">[ RETORNAR AO MENU ]</button>`;
    
    if (playerWon && currentLevel !== "casual") {
        // ⚡ Verifica se chegou no fim do Capítulo 1 (Fase 3/Índice 2) ou Capítulo 2 (Fase 6/Índice 5)
        let fimDeCapitulo = (currentLevel === 2 || currentLevel === 5);

        if (!fimDeCapitulo && currentLevel < campaignData.length - 1) { 
            botoesAcao = `<button class="open-btn" onclick="nextCampaignLevel()" style="margin-top: 20px; color: #00ff00; border-color: #00ff00;">[ AVANÇAR PARA SETOR ${currentLevel + 2} ]</button><button class="cmd-btn" onclick="location.reload()" style="margin-top: 10px; border-color: #444; color: #777;">[ EXTRAIR E SAIR ]</button>`; 
        } else { 
            // Mensagens de conclusão de capítulo!
            if (currentLevel === 2) {
                recompensaHTML += `<h3 style="color: gold; text-shadow: 0 0 15px gold; margin-top: 10px;">👑 PROJETO ZEUS CONCLUÍDO 👑</h3><p style="color: #fff;">A ameaça foi contida... ou assim você pensava.</p>`; 
            } else if (currentLevel === 5) {
                recompensaHTML += `<h3 style="color: #ff0055; text-shadow: 0 0 15px #ff0055; margin-top: 10px;">👑 CAÇADA CONCLUÍDA 👑</h3><p style="color: #fff;">O Complexo 7 caiu. Adão está livre.</p>`; 
            }
            // Força o jogador a voltar ao Menu, não deixa avançar!
            botoesAcao = `<button class="cmd-btn" onclick="location.reload()" style="margin-top: 20px;">[ RETORNAR AO MENU ]</button>`;
        }
    }
    
    
    modal.innerHTML = `<div class="modal-content final-screen" style="border-color: ${playerWon ? '#00ff00' : '#ff0000'}; background: rgba(5,5,10,0.95);"><h1 class="final-title" style="color: ${playerWon ? '#00ff00' : '#ff0000'}; font-size: 2.5rem; margin-top: 15px;">${playerWon ? "SISTEMA HACKEADO" : "FALHA CRÍTICA"}</h1>${recompensaHTML}${deckRewardHTML}<div style="display: flex; flex-direction: column; gap: 10px; align-items: center;">${botoesAcao}</div></div>`;
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
    if(btnOpenP2P) { btnOpenP2P.onclick = () => { playSound("click"); document.getElementById("p2p-modal").classList.add("active"); if(!window.peer) { document.getElementById("meu-status").innerText = "GERANDO CHAVE..."; document.getElementById("meu-status").style.color = "yellow"; let codigoSala = 'ZEUS-' + Math.random().toString(36).substr(2, 4).toUpperCase(); window.peer = new Peer(codigoSala); window.peer.on('open', function(id) { document.getElementById("meu-status").innerText = "SEU ID: " + id; document.getElementById("meu-status").style.color = "#00ffcc"; }); window.peer.on('connection', function(conn) { window.conexao = conn; window.isHost = true; window.p2pHandlerReady = false; prepararBatalha(); }); } }; }
    const btnClient = document.getElementById("btn-client");
    if(btnClient) { btnClient.onclick = () => { playSound("click"); let codigo = document.getElementById("id-alvo").value.toUpperCase().trim(); if(!codigo) { playSound("error"); alert("SISTEMA: Digite o ID do Host."); return; } if(!window.peer) window.peer = new Peer(); document.getElementById("meu-status").innerText = "CONECTANDO..."; window.conexao = window.peer.connect(codigo); window.conexao.on('open', function() { window.isHost = false; window.p2pHandlerReady = false; prepararBatalha(); }); }; }
}

function prepararBatalha() {
    if (window.p2pHandlerReady) return;
    window.p2pHandlerReady = true;

    playSound("deploy");
    document.getElementById("p2p-modal").classList.remove("active");
    alert("CONEXÃO ESTABELECIDA!");
    startGameDirect("casual", "theme-lab");

    window.conexao.on('data', function(pacote) {
        if (pacote.acao === "PASSAR_TURNO") {
            playSound("deploy");
            if (pacote.syncLife !== undefined) {
                playerLife = pacote.syncLife.enemyLife;
                enemyLife = pacote.syncLife.playerLife;
            }
            startNewRound(true);
        }
        else if (pacote.acao === "AVANCAR_FASE") {
            clearInterval(timerInterval);
            advancePhase(true);
        }
        else if (pacote.acao === "JOGAR_CARTA") {
            playSound("deploy");
            const cardData = baseDeck.find(c => c.title === pacote.cardName);
            if (cardData) {
                const enemyCard = createCard(cardData);
                enemyCard.dataset.owner = "enemy";
                enemyCard.ondragstart = (e) => e.preventDefault();
                const slotInimigo = document.getElementById("enemy-field").children[4 - pacote.slotIndex];
                if (slotInimigo) {
                    const cartaAntiga = slotInimigo.querySelector('.card-base');
                    if (cartaAntiga) {
                        cartaAntiga.dataset.dead = "true";
                        processCardEffect("UltimoSuspiro", cartaAntiga, "enemy");
                        cartaAntiga.remove();
                    }
                    slotInimigo.appendChild(enemyCard);
                    gsap.set(enemyCard, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0, x: 0, y: 0, rotation: 0 });
                    if (window.VFX && window.VFX.onSummon) VFX.onSummon(enemyCard, enemyCard.dataset.effect);
                    processCardEffect("AoJogar", enemyCard, "enemy");
                    setTimeout(updateAuras, 100);
                }
            }
        }
        else if (pacote.acao === "JOGAR_EQUIPAMENTO") {
            const cardData = baseDeck.find(c => c.title === pacote.cardName);
            const slotInimigo = document.getElementById("enemy-field").children[4 - pacote.slotIndex];
            if (slotInimigo && cardData) {
                const targetCard = slotInimigo.querySelector('.card-base');
                if (targetCard) { const dummyEquip = createCard(cardData); executeEquip(dummyEquip, targetCard, "enemy"); }
            }
        }
        else if (pacote.acao === "ATACAR") {
            const enemySlot = document.getElementById("enemy-field").children[4 - pacote.atkSlot];
            const atkCard = enemySlot ? enemySlot.querySelector('.card-base') : null;
            let defCard;
            if (pacote.targetType === "hero") {
                defCard = document.getElementById("player-hero");
            } else {
                const mySlot = document.getElementById("player-field").children[4 - pacote.defSlot];
                defCard = mySlot ? mySlot.querySelector('.card-base') : null;
            }
            if (atkCard && defCard) resolveCombat(atkCard, defCard, false);
        }
        else if (pacote.acao === "LANCAR_MAGIA") {
            const cardData = baseDeck.find(c => c.title === pacote.cardName);
            if (!cardData) return;
            const dummySpell = createCard(cardData);
            let targetElement;
            if (pacote.targetOwner === "enemy" && pacote.targetType === "hero") targetElement = document.getElementById("player-hero");
            else if (pacote.targetOwner === "player" && pacote.targetType === "hero") targetElement = document.getElementById("enemy-hero");
            else if (pacote.targetOwner === "enemy" && pacote.targetType === "card") { const slot = document.getElementById("player-field").children[4 - pacote.defSlot]; targetElement = slot ? slot.querySelector('.card-base') : null; }
            else if (pacote.targetOwner === "player" && pacote.targetType === "card") { const slot = document.getElementById("enemy-field").children[4 - pacote.defSlot]; targetElement = slot ? slot.querySelector('.card-base') : null; }
            if (targetElement) executeSpell(dummySpell, targetElement, pacote.targetOwner === "enemy" ? "player" : "enemy");
        }
        else if (pacote.acao === "SYNC_LIFE") {
            playerLife = pacote.enemyLife;
            enemyLife = pacote.playerLife;
            updateLifeAndMana();
        }
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
function projetarFalaHolografica(cartaObj, texto) {
    if (!cartaObj || !texto) return;

    const falaEl = document.createElement("div");
    falaEl.innerText = `"${texto}"`;
    falaEl.style.cssText = `
        position: absolute;
        bottom: 110%;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 20, 20, 0.85);
        border: 1px solid #00ffff;
        color: #00ffff;
        padding: 10px 20px;
        font-size: 0.7rem;
        font-family: 'Courier New', monospace;
        white-space: nowrap;
        border-radius: 4px;
        pointer-events: none;
        z-index: 200;
        box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
        text-shadow: 0 0 5px #00ffff;
    `;
    
    // Pequeno triângulo do balão
    const seta = document.createElement("div");
    seta.style.cssText = `
        content: ''; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
        border-width: 5px; border-style: solid; border-color: #00ffff transparent transparent transparent;
    `;
    falaEl.appendChild(seta);
    cartaObj.appendChild(falaEl);

    // Animação GSAP (Sobe, flutua, e some)
    gsap.fromTo(falaEl, 
        { y: 10, opacity: 0, scale: 0.5 }, 
        { y: -10, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }
    );

    // Desaparece depois de 2.5 segundos
    setTimeout(() => {
        gsap.to(falaEl, { y: -30, opacity: 0, duration: 0.5, onComplete: () => falaEl.remove() });
    }, 3500);
}

// ==========================================
// ♻️ PROTOCOLO DE SACRIFÍCIO (TROCA DE TROPAS)
// ==========================================
function showSacrificeConfirm(oldCard, newCard, slot) {
    playSound("error"); // Som de alerta
    let modal = document.getElementById("sacrifice-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "sacrifice-modal";
        document.body.appendChild(modal);
    }
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); z-index:100000; display:flex; justify-content:center; align-items:center; backdrop-filter: blur(3px);";
    
    modal.innerHTML = `
        <div style="background:#0a0505; border:2px solid #ff0055; border-left: 5px solid #ff0055; padding:25px; border-radius:4px; text-align:center; max-width:320px; box-shadow: 0 0 30px rgba(255,0,85,0.5); font-family:'Courier New', monospace;">
            <h3 style="color:#ff0055; margin-top:0; text-shadow: 0 0 10px #ff0055;">⚠️ SACRIFÍCIO TÁTICO ⚠️</h3>
            <p style="color:#fff; font-size:0.9rem; line-height: 1.4;">Deseja destruir <b>[${oldCard.dataset.name}]</b> para descer <b>[${newCard.dataset.name}]</b> no mesmo slot?</p>
            <div style="display:flex; justify-content:space-around; margin-top:25px;">
                <button id="btn-cancel-sac" style="background:transparent; border:1px solid #777; color:#ccc; padding:10px 20px; border-radius:4px; cursor:pointer;">CANCELAR</button>
                <button id="btn-confirm-sac" style="background:#ff0055; border:1px solid #ff0055; color:#fff; padding:10px 20px; border-radius:4px; cursor:pointer; font-weight:bold; box-shadow: 0 0 10px #ff0055;">CONFIRMAR</button>
            </div>
        </div>
    `;
    
    modal.style.display = "flex";
    gsap.fromTo(modal.firstElementChild, {scale: 0.8, opacity: 0}, {scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.5)"});

    document.getElementById("btn-cancel-sac").onclick = () => {
        playSound("click");
        gsap.to(modal, {opacity: 0, duration: 0.2, onComplete: () => { modal.style.display = "none"; modal.style.opacity = 1; }});
    };

    document.getElementById("btn-confirm-sac").onclick = () => {
        playSound("click");
        modal.style.display = "none";
        executeReplaceCard(slot, newCard, oldCard);
    };
}

function executeReplaceCard(slot, newCard, oldCard) {
    let cst = parseInt(newCard.dataset.cost) || 0;
    
    // Verifica se o jogador tem RAM, mas NÃO gasta ainda (quem gasta é o executePlayCard)
    if(playerMana >= cst) {
        
        // Mata a carta antiga para desocupar o slot fisicamente
        oldCard.dataset.dead = "true";
        processCardEffect("UltimoSuspiro", oldCard, "player");
        
        // Joga a carta antiga para o Body para a animação de morte não bugar dentro do Slot
        document.body.appendChild(oldCard);
        const rect = slot.getBoundingClientRect();
        oldCard.style.position = "fixed";
        oldCard.style.left = rect.left + "px";
        oldCard.style.top = rect.top + "px";
        oldCard.style.transform = "scale(0.60)"; 
        
        if(window.VFX && window.VFX.death) VFX.death(oldCard); else oldCard.remove();

        // O Slot agora está limpo! Chama a descida da carta nova normalmente
        executePlayCard(slot, newCard);
    } else {
        playSound("error"); alert("RAM INSUFICIENTE!");
    }
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

function pedirNomeJogador() {
    let modal = document.createElement("div");
    modal.id = "login-modal";
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,10,10,0.95); z-index:999999; display:flex; justify-content:center; align-items:center; backdrop-filter: blur(5px);";
    
    // ⚠️ ATENÇÃO: Substitua os "src" abaixo pelas imagens reais dos avatares que você tem na sua pasta!
    modal.innerHTML = `
        <div style="background:#050505; border:1px solid #00ffff; border-left: 5px solid #00ffff; padding:30px; text-align:center; max-width:400px; box-shadow: 0 0 30px rgba(0,255,255,0.3); font-family:'Courier New', monospace;">
            <h2 style="color:#00ffff; text-shadow:0 0 10px #00ffff; margin-top:0;">REGISTRO OMNI-BIO</h2>
            <p style="color:#ccc; font-size:0.9rem; margin-bottom:15px;">Selecione sua interface visual e codinome.</p>
            
            <div id="avatar-selector" style="display:flex; justify-content:center; gap:15px; margin-bottom:20px;">
                <img class="avatar-option selected-avatar" src="./img1.jpg" data-src="data:image/jpeg;base64,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" style="width:60px; height:60px; border-radius:50%; border:2px solid #00ffff; box-shadow: 0 0 10px #00ffff; cursor:pointer; object-fit:cover; transition: 0.3s;">
                <img class="avatar-option" src="./img2.jpg" data-src="data:image/jpeg;base64,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" style="width:60px; height:60px; border-radius:50%; border:2px solid #444; cursor:pointer; object-fit:cover; transition: 0.3s;">
                <img class="avatar-option" src="./img3.jpg" data-src="data:image/jpeg;base64,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" style="width:60px; height:60px; border-radius:50%; border:2px solid #444; cursor:pointer; object-fit:cover; transition: 0.3s;">
                <img class="avatar-option" src="./img4.jpg" data-src="data:image/jpeg;base64,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" style="width:60px; height:60px; border-radius:50%; border:2px solid #444; cursor:pointer; object-fit:cover; transition: 0.3s;">
            </div>

            <input type="text" id="input-player-name" placeholder="SEU NOME..." maxlength="12" style="width:80%; padding:10px; background:transparent; border:1px solid #00ffff; color:#fff; text-align:center; font-family:'Courier New', monospace; outline:none; text-transform:uppercase; font-weight:bold; font-size:1.1rem; margin-bottom:20px;">
            <br>
            <button id="btn-save-identity" style="background:#00ffff; color:#000; padding:10px 30px; border:none; font-weight:bold; cursor:pointer; font-family:'Courier New', monospace; box-shadow:0 0 15px #00ffff; border-radius:3px;">[ ESTABELECER LIGAÇÃO ]</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Lógica para clicar e selecionar o Avatar
    let tempAvatar = "./avatar_1.png"; // Padrão selecionado
    const avatarImages = modal.querySelectorAll('.avatar-option');
    
    avatarImages.forEach(img => {
        img.onclick = () => {
            playSound("click");
            // Tira o brilho de todos
            avatarImages.forEach(i => { i.style.borderColor = "#444"; i.style.boxShadow = "none"; });
            // Coloca o brilho no clicado
            img.style.borderColor = "#00ffff";
            img.style.boxShadow = "0 0 10px #00ffff";
            tempAvatar = img.dataset.src; // Guarda a escolha
        };
    });

    document.getElementById("btn-save-identity").onclick = () => {
        let inputVal = document.getElementById("input-player-name").value.trim().toUpperCase();
        if (inputVal.length > 0) {
            playSound("deploy");
            playerName = inputVal;
            playerAvatar = tempAvatar; // Salva o avatar definitivo
            saveProgress(); // Grava no Navegador
            atualizarIdentidadeNaUI(); // Atualiza a tela
            gsap.to(modal, {opacity: 0, duration: 0.5, onComplete: () => modal.remove()});
        } else {
            playSound("error");
        }
    };
}

function atualizarIdentidadeNaUI() {
    // 1. Atualiza os Nomes
    document.querySelectorAll(".hero-name, .player-name-display").forEach(el => el.innerText = playerName);
    
    // 2. Caça a palavra "OPERADOR" onde quer que ela esteja
    document.querySelectorAll("div, span, p").forEach(el => {
        if (el.innerText && el.innerText.trim().toUpperCase() === "OPERADOR") {
            el.innerText = playerName.toUpperCase();
            el.style.color = "#00ffff"; 
            el.style.textShadow = "0 0 8px #00ffff";
        }
    });

    // ⚡ 3. CAÇADOR GLOBAL DE AVATAR
    if (playerAvatar) {
        // Procura todas as imagens que podem ser o Avatar (no Menu e no Jogo)
        const imagensAvatar = document.querySelectorAll("#player-hero img, .hero-avatar-frame img, #avatar-display");
        imagensAvatar.forEach(img => {
            img.src = playerAvatar;
            img.style.objectFit = "cover"; // Garante que a foto não fica esticada
        });
    }
}
// ==========================================
// 🎓 PROTOCOLO DE TREINAMENTO (TUTORIAL GUIADO)
// ==========================================
let tutorialStep = 0;
let tutorialActive = false;

function checkTutorial() {
    // Verifica na memória se o jogador já fez ou pulou o tutorial
    if (!localStorage.getItem("zeusTutorialDone")) {
        // Dá 2 segundos para o jogo carregar e a mesa montar antes de abrir o tutorial
        setTimeout(startTutorial, 2000); 
    }
}

function startTutorial() {
    tutorialActive = true;
    tutorialStep = 0;
    advanceTutorial();
}

function skipTutorial() {
    tutorialActive = false;
    localStorage.setItem("zeusTutorialDone", "true"); // Salva que já fez!
    let box = document.getElementById("tutorial-box");
    let overlay = document.getElementById("tutorial-overlay");
    if (box) box.remove();
    if (overlay) overlay.remove();
    playSound("click");
    
    // Apaga todas as luzes de destaque do tutorial
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));
}

function advanceTutorial() {
    playSound("click");
    let box = document.getElementById("tutorial-box");
    let overlay = document.getElementById("tutorial-overlay");

    // Cria a película escura no fundo
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "tutorial-overlay";
        overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:99998; pointer-events:none; transition: 0.5s;";
        document.body.appendChild(overlay);
    }

    // Cria a caixa de texto holográfica
    if (!box) {
        box = document.createElement("div");
        box.id = "tutorial-box";
        box.style.cssText = "position:fixed; bottom: 25%; left: 50%; transform: translateX(-50%); width: 340px; background:#050505; border:2px solid #00ffcc; border-top: 5px solid #00ffcc; padding:25px; z-index:99999; box-shadow: 0 0 30px rgba(0,255,204,0.4); font-family:'Courier New', monospace; border-radius: 5px; text-align:center;";
        document.body.appendChild(box);
        
        // Injeta a magia do Holofote Neon no CSS
        if(!document.getElementById("anim-tutorial")){
            const style = document.createElement("style");
            style.id = "anim-tutorial";
            style.innerHTML = `
                .tutorial-highlight {
                    position: relative;
                    z-index: 99999 !important;
                    box-shadow: 0 0 25px #00ffcc, inset 0 0 15px #00ffcc !important;
                    border: 2px solid #00ffcc !important;
                    border-radius: 5px;
                    transition: all 0.3s ease;
                    background: rgba(0, 255, 204, 0.1);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Limpa o holofote do passo anterior
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));

    // 📜 O ROTEIRO DO TUTORIAL
    const steps = [
        {
            title: "SIMULAÇÃO OMNI-BIO",
            text: "Bem-vindo ao Projeto Zeus, Operador. Detectamos que este é o seu primeiro acesso. Deseja iniciar o protocolo de treinamento tático?",
            btnNext: "[ INICIAR TUTORIAL ]",
            highlight: null
        },
        {
            title: "1. SEUS RECURSOS",
            text: "Esta é a sua mão. Cada carta consome RAM (sua Mana) para ser ativada. Fique de olho na sua barra de RAM a cada turno.",
            btnNext: "[ ENTENDIDO ]",
            highlight: "hand" // Acende a div da Mão
        },
        {
            title: "2. DEPLOY (INVOCAÇÃO)",
            text: "Para invocar uma tropa, clique na carta na sua mão e, em seguida, clique em um Espaço Vazio na sua zona de combate.",
            btnNext: "[ PRÓXIMO ]",
            highlight: "player-field" // Acende o Campo do Jogador
        },
        {
            title: "3. FASE DE COMBATE",
            text: "Após posicionar suas tropas, clique no botão central com as Engrenagens [PASSA P/ COMBATE] para iniciar o ataque.",
            btnNext: "[ PRÓXIMO ]",
            highlight: "phase-btn" // Acende o botão de passar o turno (Ajuste este ID se o seu for diferente!)
        },
        {
            title: "4. ATACANDO O ALVO",
            text: "Durante o combate, clique na sua Tropa e depois clique na Tropa Inimiga ou diretamente no Avatar (Nexus) adversário para causar dano.",
            btnNext: "[ PRÓXIMO ]",
            highlight: "enemy-hero" // Acende o Avatar inimigo
        },
        {
            title: "TREINAMENTO CONCLUÍDO",
            text: "Você está pronto. Lembre-se de montar seu deck e usar as mecânicas de Sobrecarga e Sacrifício a seu favor. Sobreviva!",
            btnNext: "[ ENCERRAR SIMULAÇÃO ]",
            highlight: null
        }
    ];

    // Se acabou o roteiro, fecha tudo
    if (tutorialStep >= steps.length) {
        skipTutorial();
        return;
    }

    let current = steps[tutorialStep];
    
    // Desenha o conteúdo da caixa
    box.innerHTML = `
        <h3 style="color:#00ffcc; margin-top:0; text-shadow:0 0 10px #00ffcc;">🎓 ${current.title}</h3>
        <p style="color:#ccc; font-size:0.9rem; line-height:1.5; margin-bottom:25px;">${current.text}</p>
        <div style="display:flex; justify-content:space-around; align-items:center;">
            ${tutorialStep === 0 ? `<button id="btn-tut-skip" style="background:transparent; border:1px solid #777; color:#ccc; padding:8px 15px; border-radius:3px; cursor:pointer; font-family:'Courier New', monospace;">PULAR</button>` : ''}
            <button id="btn-tut-next" style="background:#00ffcc; border:none; color:#000; font-weight:bold; padding:10px 15px; border-radius:3px; cursor:pointer; font-family:'Courier New', monospace; box-shadow:0 0 15px rgba(0,255,204,0.6);">${current.btnNext}</button>
        </div>
    `;

    // Aplica o Holofote no elemento da tela e move a caixa
    if (current.highlight) {
        let el = document.getElementById(current.highlight);
        if (el) {
            el.classList.add("tutorial-highlight");
            if (typeof VFX !== "undefined") VFX.pulse(el, "#00ffcc", 1, 800);

            // ⚡ O CÁLCULO DE POSIÇÃO DINÂMICA
            let rect = el.getBoundingClientRect();
            let posY = rect.bottom + 20; // Fica um pouco abaixo do alvo
            let posX = rect.left + (rect.width / 2); // Fica centralizado com o alvo

            // Se for sair por baixo da tela, joga a caixa para CIMA do alvo
            if (posY + 250 > window.innerHeight) {
                posY = rect.top - 200;
            }

            // Anima a caixa voando para o novo local
            gsap.to(box, { top: posY, left: posX, bottom: "auto", transform: "translateX(-50%) scale(1)", opacity: 1, duration: 0.4, ease: "power2.out" });
        }
    } else {
        // Se não tiver alvo, fica centralizada na tela
        gsap.to(box, { top: "50%", left: "50%", bottom: "auto", transform: "translate(-50%, -50%) scale(1)", opacity: 1, duration: 0.4, ease: "power2.out" });
    }

    // Lógica dos Botões
    if (document.getElementById("btn-tut-skip")) {
        document.getElementById("btn-tut-skip").onclick = skipTutorial;
    }
    document.getElementById("btn-tut-next").onclick = () => {
        tutorialStep++;
        advanceTutorial();
    };
  }
  
  // ==========================================
// 📂 SISTEMA DE EXPANSÕES (CAPÍTULOS)
// ==========================================
function abrirMenuCapitulos() {
    playSound("click");
    let modal = document.createElement("div");
    modal.id = "chapter-modal";
    modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(5,5,10,0.95); z-index:999999; display:flex; flex-direction:column; justify-content:center; align-items:center; backdrop-filter: blur(8px);";
    
    // Verifica se o jogador já comprou/desbloqueou o Capítulo 2
    let cap2Desbloqueado = localStorage.getItem("zeusCapitulo2") === "true";
    let btnCap2 = cap2Desbloqueado 
        ? `<button class="cmd-btn" onclick="iniciarCapitulo(3)" style="border-color:#ff0055; color:#ff0055; width:300px; margin-bottom:15px; box-shadow: 0 0 15px rgba(255,0,85,0.4);">[ JOGAR: COMPLEXO 7 ]</button>`
        : `<button class="cmd-btn" onclick="comprarCapitulo(2, 1000)" style="border-color:#777; color:#ccc; width:300px; margin-bottom:15px;">🔒 DESBLOQUEAR CAP. 2 (1000 💽)</button>`;

    modal.innerHTML = `
        <h2 style="color:#00ffff; text-shadow:0 0 15px #00ffff; margin-bottom: 40px; font-family:'Courier New', monospace;">📂 ARQUIVOS DE CAMPANHA</h2>
        
        <button class="cmd-btn" onclick="iniciarCapitulo(0)" style="border-color:#00ffff; color:#00ffff; width:300px; margin-bottom:15px; box-shadow: 0 0 15px rgba(0,255,255,0.4);">[ JOGAR: PROJETO ZEUS ]</button>
        
        ${btnCap2}
        
        <button class="cmd-btn" onclick="fecharMenuCapitulos()" style="border-color:#444; color:#777; width:300px; margin-top:30px;">[ VOLTAR AO MENU ]</button>
    `;
    document.body.appendChild(modal);
}

function fecharMenuCapitulos() {
    playSound("click");
    let modal = document.getElementById("chapter-modal");
    if(modal) modal.remove();
    document.getElementById("mode-selection-modal").classList.add("active"); // Volta pro menu de modos
}

function iniciarCapitulo(indiceInicial) {
    playSound("deploy");
    let modal = document.getElementById("chapter-modal");
    if(modal) modal.remove();
    
    // Define a fase inicial (0 para o Cap 1, 3 para o Cap 2)
    currentLevel = indiceInicial; 
    startCampaignScene();
}

function comprarCapitulo(capitulo, preco) {
    if (playerFragments >= preco) {
        playSound("deploy");
        playerFragments -= preco;
        localStorage.setItem("zeusCapitulo" + capitulo, "true");
        saveProgress();
        document.getElementById("fragment-count").textContent = playerFragments;
        alert("SISTEMA: EXPANSÃO DESBLOQUEADA COM SUCESSO!");
        
        // Recarrega o menu para mostrar o botão de Jogar
        fecharMenuCapitulos();
        setTimeout(abrirMenuCapitulos, 200);
    } else {
        playSound("error");
        alert(`SISTEMA: HDs INSUFICIENTES. VOCÊ PRECISA DE ${preco} 💽.`);
    }
}  


// ==========================================
// 🎁 SISTEMA GACHA (ABERTURA DE PACOTES)
// ==========================================
let cardsFlippedInPack = 0;

// ⚡ Chame esta função "openGachaPack()" quando o jogador ganhar um pacote após as vitórias ou comprar no mercado!
function openGachaPack() {
    let modal = document.getElementById("pack-modal");
    
    // Se não existir, cria o HTML na hora
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "pack-modal";
        document.body.appendChild(modal);
    }

    // Estrutura Inicial do Pacote Fechado
    modal.innerHTML = `
        <h2 style="color:#00ffff; font-family:'Courier New', monospace; text-shadow: 0 0 15px #00ffff; margin-bottom: 40px; letter-spacing: 3px; font-size: 2rem;" id="pack-title">PACOTE DE DADOS CRIPTOGRAFADO</h2>
        
        <div class="pack-container" id="booster-pack" onclick="crackPack()">
            <div class="pack-text">DESCRIPTOGRAFAR<br>[ CLIQUE ]</div>
        </div>

        <div class="pack-cards-reveal" id="pack-cards-area"></div>
        <button id="btn-close-pack" onclick="closePackModal()">COLETAR DADOS E FECHAR</button>
    `;

    modal.classList.add("active");
    if(typeof playSound === "function") playSound("deploy");
}

function crackPack() {
    if(typeof playSound === "function") playSound("hit");
    if(typeof screenShake === "function") screenShake();
    
    document.getElementById("booster-pack").style.display = "none";
    
    const title = document.getElementById("pack-title");
    title.innerText = "ESCOLHA OS ARQUIVOS...";
    title.style.color = "#ffaa00";
    title.style.textShadow = "0 0 15px #ffaa00";
    
    const cardsArea = document.getElementById("pack-cards-area");
    cardsArea.style.display = "flex";
    cardsArea.innerHTML = "";
    cardsFlippedInPack = 0;

    // Sorteia 3 cartas do baseDeck
    for(let i=0; i<3; i++) {
        let randomCardInfo = baseDeck[Math.floor(Math.random() * baseDeck.length)];
        
        // Cria a armadura 3D
        let wrapper = document.createElement("div");
        wrapper.className = "gacha-card-wrapper";
        
        // Costas da Carta
        let back = document.createElement("div");
        back.className = "gacha-card-face gacha-card-back";
        
        // Frente da Carta (Usa o seu motor Cyber-UI existente)
        let front = document.createElement("div");
        front.className = "gacha-card-face gacha-card-front";
        let realCardDOM = createCard(randomCardInfo);
        
        // ⚡ TRAVA DE SEGURANÇA: Remove os eventos do hover e clique para não atrapalhar o giro
        realCardDOM.onmouseenter = null; 
        realCardDOM.onmouseleave = null;
        realCardDOM.onclick = null;
        realCardDOM.ondragstart = null;
        realCardDOM.style.position = "relative"; // Ajuste para ficar certinho dentro do wrapper
        realCardDOM.style.transform = "none"; 
        
        front.appendChild(realCardDOM);
        wrapper.appendChild(back);
        wrapper.appendChild(front);

        // O Clique que vira a carta
        wrapper.onclick = () => {
            if(!wrapper.classList.contains("flipped")) {
                if(typeof playSound === "function") playSound("deploy");
                wrapper.classList.add("flipped");
                cardsFlippedInPack++;
                
                // ⚡ AQUI VOCÊ ADICIONA A CARTA AO INVENTÁRIO DO JOGADOR ⚡
                // Exemplo: playerCollection.push(randomCardInfo); ou saveCollection();

                // Se as 3 foram viradas, libera o botão de saída
                if(cardsFlippedInPack === 3) {
                    title.innerText = "AQUISIÇÃO CONCLUÍDA!";
                    title.style.color = "#00ff00";
                    title.style.textShadow = "0 0 15px #00ff00";
                    document.getElementById("btn-close-pack").style.display = "block";
                }
            }
        };

        cardsArea.appendChild(wrapper);
    }
}

function closePackModal() {
    if(typeof playSound === "function") playSound("click");
    document.getElementById("pack-modal").classList.remove("active");
    // Lógica para descontar pacote: ex: playerPacks--;
}

// ==========================================
// 🚨 OUTDOOR DE FASE (LETREIRO NEON PISCANTE)
// ==========================================
function showPhaseBanner(texto, isAttack) {
    let banner = document.getElementById("cyber-phase-banner");
    
    // 1. Injeta o CSS do letreiro na primeira vez que rodar
    if (!document.getElementById("style-phase-banner")) {
        const style = document.createElement("style");
        style.id = "style-phase-banner";
        style.innerHTML = `
            #cyber-phase-banner {
                position: fixed;
                top: 45%; /* Fica bem no centro, um pouco acima das cartas */
                left: -50%;
                transform: translateY(-50%);
                z-index: 999999;
                font-family: 'Courier New', monospace;
                font-size: 3.5rem; /* Letras gigantes */
                font-weight: bold;
                white-space: nowrap;
                pointer-events: none; /* Não bloqueia os cliques do jogador */
                text-transform: uppercase;
                padding: 15px 50px;
                background: rgba(10, 5, 5, 0.95);
                border-top: 4px solid;
                border-bottom: 4px solid;
            }
        `;
        document.head.appendChild(style);
    }

    if (!banner) {
        banner = document.createElement("div");
        banner.id = "cyber-phase-banner";
        document.body.appendChild(banner);
    }

    // 2. Define as cores letais
    const color = isAttack ? "#ff0055" : "#00ffff"; 
    banner.style.color = color;
    banner.style.borderColor = color;
    banner.style.textShadow = `0 0 15px ${color}, 0 0 30px ${color}`;
    banner.style.boxShadow = `0 10px 30px rgba(0,0,0,0.8), inset 0 0 20px ${color}`;
    banner.innerText = texto;

    // Dispara um som de impacto quando a mensagem aparece
    if(typeof playSound === "function") playSound(isAttack ? "hit" : "deploy"); 

    // 3. A Animação Cinematográfica (Entra, Pisca, Lê, Sai)
    gsap.killTweensOf(banner); // Limpa animações anteriores
    let tl = gsap.timeline();
    
    tl.fromTo(banner, 
        { left: "-50%", xPercent: -50, opacity: 0 }, 
        { left: "50%", xPercent: -50, opacity: 1, duration: 0.4, ease: "power4.out" }
    )
    .to(banner, { opacity: 0.1, duration: 0.08, yoyo: true, repeat: 5 }) // O piscar intenso do Neon
    .to(banner, { opacity: 1, duration: 0.6 }) // Pausa de meio segundo para o cérebro ler
    .to(banner, { left: "150%", opacity: 0, duration: 0.4, ease: "power3.in" }); // Foge para a direita
}
// ==========================================
// 📖 ARQUIVOS DA MATRIZ: CODEX DE FACÇÕES
// ==========================================
const faccoesData = {
    "eao": {
        nome: "ESQUADRÃO EAO & SEGURANÇA",
        cor: "#3399ff",
        lore: "A força militar corporativa de elite e a segurança privada da OMNI-BIO. Atuam como uma unidade tática perfeita, cobrindo os pontos cegos uns dos outros.",
        sinergia: "COLMEIA: Se houver mais de um agente EAO no campo, eles conectam-se em rede, ganhando status bônus e copiando as habilidades uns dos outros. TROPA COORDENADA: Evocam reforços extras para a linha de frente.",
        // Filtra militares e nomes do Esquadrão
        filtro: (c) => ["soldado"].includes(c.tipo) || (c.title.includes("EAO") || ["Branko", "Nyx", "Iris", "Leon", "Rourke", "General Mão de Ferro", "Segurança Aegis", "Atirador Furtivo"].includes(c.title))
    },
    "lab": {
        nome: "PROJETO OMNI-BIO (MUTAÇÃO)",
        cor: "#00ff66",
        lore: "Cientistas amorais e as suas abominações biológicas do Subnível 2. Para eles, a carne é apenas um recurso a ser consumido e aprimorado.",
        sinergia: "MUTAÇÃO E INCUBAÇÃO: Ficam mais fortes a cada turno que sobrevivem ou criam clones infinitos. PREDADOR: Alimentam-se da morte de qualquer carta. EXTRAÇÃO: O laboratório destrói as próprias tropas fracas em troca de comprar mais cartas do deck.",
        // Filtra mutantes e cartas do laboratório
        filtro: (c) => ["mutante", "biologico"].includes(c.tipo) || (c.efeito && (c.efeito.includes("mutacao") || c.efeito.includes("predador") || c.efeito.includes("extracao") || c.efeito.includes("incubar") || c.efeito.includes("toxico") || c.efeito.includes("metamorfose")))
    },
    "resistencia": {
        nome: "RESISTÊNCIA & AGENTES FANTASMAS",
        cor: "#ff0055",
        lore: "Hackers do submundo, mercenários e infiltradores tentando derrubar o monopólio da corporação.",
        sinergia: "SOBRECARGA: Tropas rápidas, furtivas e baratas que manipulam o Reator. Quando você atinge o Nível 5 (Crítico) de Sobrecarga, todas as suas tropas da resistência no campo recebem um bônus letal de +5 de Ataque e +5 de Vida simultaneamente.",
        // Filtra hackers e sobrecarga
        filtro: (c) => ["agente", "resistencia"].includes(c.tipo) || (c.efeito && c.efeito.includes("sobrecarga"))
    },
    "maquinas": {
        nome: "DIVISÃO MECANIZADA (AUTÔMATOS)",
        cor: "#ffcc00",
        lore: "A fria e calculista linha de defesa mecanizada. Drones de segurança, pacíficadores pesados e redes de nanobots.",
        sinergia: "SINERGIA AUTÔMATO: Uma frota em rede onde a presença de uma máquina no campo de batalha fortalece automaticamente o escudo e o ataque das outras máquinas vizinhas.",
        // Filtra robôs
        filtro: (c) => ["automato", "estrutura"].includes(c.tipo) || (c.title === "O Punho da Resistência" || c.title === "Pacificador V.9")
    }
};

function abrirCodexFaccoes(faccaoAtiva = "eao") {
    if(typeof playSound === "function") playSound("click");
    
    let modal = document.getElementById("codex-modal");

    // Cria o fundo do Codex se não existir
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "codex-modal";
        modal.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(5,10,15,0.98); z-index:999999; display:flex; flex-direction:column; align-items:center; backdrop-filter: blur(10px); overflow-y:auto; padding: 20px 0;";
        document.body.appendChild(modal);
    }

    // 1. Constrói o Menu de Abas (Navegação)
    let tabsHTML = "";
    for (let key in faccoesData) {
        let isAtiva = (key === faccaoAtiva);
        tabsHTML += `<button onclick="abrirCodexFaccoes('${key}')" style="background:${isAtiva ? faccoesData[key].cor : 'transparent'}; color:${isAtiva ? '#000' : faccoesData[key].cor}; border:2px solid ${faccoesData[key].cor}; padding:10px 15px; font-family:'Courier New', monospace; font-weight:bold; cursor:pointer; margin: 5px; border-radius: 4px; box-shadow: ${isAtiva ? '0 0 15px '+faccoesData[key].cor : 'none'}; transition: 0.3s; text-transform: uppercase; font-size: 0.85rem;">${faccoesData[key].nome}</button>`;
    }

    const fData = faccoesData[faccaoAtiva];

    // 2. Estrutura do HUD (Painel + Grid)
    modal.innerHTML = `
        <div style="width: 90%; max-width: 1100px; display:flex; flex-direction:column; gap: 20px; margin-top: 20px;">
            <h2 style="color:#ffaa00; text-shadow:0 0 15px #ffaa00; text-align:center; font-family:'Courier New', monospace; letter-spacing: 2px;">📖 ARQUIVOS DA MATRIZ: CODEX TÁTICO</h2>
            
            <div style="display:flex; justify-content:center; flex-wrap:wrap; gap: 5px;">
                ${tabsHTML}
            </div>

            <div style="background:rgba(0,0,0,0.6); border: 1px solid ${fData.cor}; border-left: 5px solid ${fData.cor}; padding: 20px; border-radius: 4px; box-shadow: inset 0 0 30px rgba(0,0,0,0.8);">
                <h3 style="color:${fData.cor}; margin-top: 0; font-family:'Courier New', monospace; text-shadow: 0 0 10px ${fData.cor}; font-size: 1.4rem;">${fData.nome}</h3>
                <p style="color:#ccc; font-family:'Courier New', monospace; font-size: 0.95rem; line-height: 1.4;"><i>"${fData.lore}"</i></p>
                <p style="color:#fff; font-family:'Courier New', monospace; font-size: 1rem; margin-bottom:0; line-height: 1.5; border-top: 1px dashed #444; padding-top: 10px;"><b>⚡ SINERGIA:</b> ${fData.sinergia}</p>
            </div>

            <div id="codex-grid" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); justify-items: center; gap: 15px; padding: 20px; background: rgba(255,255,255,0.02); border-radius: 8px; border: 1px dashed #333; max-height: 45vh; overflow-y: auto;">
            </div>

            <button onclick="document.getElementById('codex-modal').remove(); playSound('click');" style="background:transparent; border:2px solid #ff0055; color:#ff0055; padding:15px; margin: 20px auto; width: 300px; font-family:'Courier New', monospace; font-weight:bold; cursor:pointer; border-radius: 4px; box-shadow: 0 0 15px rgba(255,0,85,0.4); text-transform:uppercase;">[ FECHAR ARQUIVOS ]</button>
        </div>
    `;

    // 3. Renderiza as cartas da facção filtrada
    const grid = document.getElementById("codex-grid");
    grid.innerHTML = ""; 

    let cartasFiltradas = [];
    let nomesJaAdicionados = [];
    
    // Varre o banco de dados inteiro procurando quem pertence a essa facção
    baseDeck.forEach(c => {
        if (fData.filtro(c) && !nomesJaAdicionados.includes(c.title)) {
            cartasFiltradas.push(c);
            nomesJaAdicionados.push(c.title);
        }
    });

    // Ordena por custo de energia (do mais barato ao mais caro)
    cartasFiltradas.sort((a,b) => a.custo - b.custo);

    // 4. Cria o visual reaproveitando o estilo do Mercado e o Olho de Inspecionar!
    cartasFiltradas.forEach(cardInfo => {
        let div = document.createElement("div");
        div.className = `pool-card ${cardInfo.raridade}`;
        div.style.transform = "scale(0.85)"; // Um pouco menores para caber o exército todo
        div.style.margin = "0"; 
        
        // ⚡ MÁGICA: O botão do Olhinho abre o seu Inspecionar 3D Perfeitamente!
        div.innerHTML = `
            <div class="inspect-btn" title="Inspecionar" onclick="openInspectModal(baseDeck.find(c => c.title === '${cardInfo.title}'))">👁️</div>
            <img src="${cardInfo.img}" class="pool-img" style="filter: contrast(1.1);">
            <div class="pool-info">
                <div class="pool-title" style="font-size: 0.7rem;">${cardInfo.title}</div>
                <div class="pool-cost" style="color:cyan;">${cardInfo.custo}⚡</div>
            </div>
        `;
        grid.appendChild(div);
    });

    modal.classList.add("active");
}

// =========================================================
// 🎯 SISTEMA TÁTICO DE SELEÇÃO E MIRA
// =========================================================

function handleCardClick(e) {
    if(isSystemLocked) return; 
    const c = e.currentTarget; const p = c.parentElement; 
    const isSpellSelected = selectedCardFromHand && selectedCardFromHand.dataset.raca === "feitico";
    const isEquipSelected = selectedCardFromHand && selectedCardFromHand.dataset.raca === "equipamento";
    const isTroopSelected = selectedCardFromHand && selectedCardFromHand.dataset.type === "tropa";
    
    // 1. CLIQUE NA MÃO
    if(p.id === "hand"){ 
        playSound("click"); 
        if(selectedCardFromHand === c){ 
            selectedCardFromHand = null; 
            c.classList.remove("deployment-selected"); 
            arrangeHand(); 
            limparMiras(); 
        } 
        else { 
            if(selectedCardFromHand) selectedCardFromHand.classList.remove("deployment-selected"); 
            selectedCardFromHand = c; 
            c.classList.add("deployment-selected"); 
            gsap.to(c, { scale: 0.75, y: -20, rotation: 0, zIndex: 100, duration: 0.3, ease: "back.out(1.7)" }); 
            arrangeHand(c); 
            
            limparMiras();
            if (c.dataset.raca === "feitico" || c.dataset.raca === "equipamento") destacarAliados();
        } 
    } 
    
    // 2. JOGAR FEITIÇO OU EQUIPAMENTO
    else if (isSpellSelected) { executeSpell(selectedCardFromHand, c, p.dataset.owner); limparMiras(); }
    else if (isEquipSelected) { executeEquip(selectedCardFromHand, c, p.dataset.owner); limparMiras(); }
    
    // 3. COMBATE
    else if(p.dataset.owner === "player" && currentStep === "combat" && attackToken === "player"){ 
        if(c.dataset.hasAttacked === "true" || c.classList.contains("exhausted")) { playSound("error"); return; }
        
        if(selectedAttacker === c) { 
            selectedAttacker = null; 
            c.classList.remove("attacker-selected"); 
            gsap.to(c, { scale: 0.65, y: 0, duration: 0.2, zIndex: 10 }); // ⚡ Corrigido
            limparMiras();
        } 
        else { 
            if(selectedAttacker) {
                selectedAttacker.classList.remove("attacker-selected"); 
                gsap.to(selectedAttacker, { scale: 0.65, y: 0, duration: 0.2, zIndex: 10 }); // ⚡ Corrigido
            }
            selectedAttacker = c; 
            c.classList.add("attacker-selected"); 
            playSound("click"); 
            gsap.to(c, { scale: 0.75, y: -20, duration: 0.2, ease: "back.out(2)", zIndex: 100 }); // ⚡ Zoom tático
            
            limparMiras(); 
            destacarAlvosInimigos(); 
        } 
    }
    
    // 4. ATAQUE FINAL
    else if(p.dataset.owner === "enemy" && selectedAttacker){ 
        const taunts = document.getElementById("enemy-field").querySelectorAll('.taunt-card');
        if (taunts.length > 0 && !c.classList.contains('taunt-card')) { 
            playSound("error"); alert("ALVO INVÁLIDO! Há inimigos com Provocar na frente."); return; 
        }
        
        let attacker = selectedAttacker; 
        selectedAttacker = null; 
        attacker.classList.remove("attacker-selected");
        
        resolveCombat(attacker, c, true); 
        if(window.conexao && window.conexao.open) {
            let atkSlot = Array.from(attacker.parentElement.parentElement.children).indexOf(attacker.parentElement);
            let defSlot = Array.from(c.parentElement.parentElement.children).indexOf(c.parentElement);
            window.enviarPacote({ acao: "ATACAR", atkSlot, defSlot, targetType: "card" });
        }
        limparMiras(); 
    } 
}

// 🧠 INTELIGÊNCIA ARTIFICIAL DAS MIRAS
function limparMiras() {
    document.querySelectorAll('.valid-target-attack').forEach(el => el.classList.remove('valid-target-attack'));
    document.querySelectorAll('.valid-target-buff').forEach(el => el.classList.remove('valid-target-buff'));
    const enemyHero = document.getElementById('enemy-hero');
    const playerHero = document.getElementById('player-hero');
    if(enemyHero) enemyHero.classList.remove('valid-target-attack');
    if(playerHero) playerHero.classList.remove('valid-target-buff');
}

function destacarAlvosInimigos() {
    const taunts = document.getElementById("enemy-field").querySelectorAll('.taunt-card');
    const todosInimigos = document.getElementById("enemy-field").querySelectorAll('.card-base');
    const heroiInimigo = document.getElementById("enemy-hero");

    if (taunts.length > 0) {
        taunts.forEach(card => card.classList.add('valid-target-attack'));
    } else {
        todosInimigos.forEach(card => card.classList.add('valid-target-attack'));
        if(heroiInimigo) heroiInimigo.classList.add('valid-target-attack');
    }
}

function destacarAliados() {
    const todosAliados = document.getElementById("player-field").querySelectorAll('.card-base');
    const heroiAliado = document.getElementById("player-hero");
    todosAliados.forEach(card => card.classList.add('valid-target-buff'));
    if(heroiAliado) heroiAliado.classList.add('valid-target-buff');
}

// DIARIO DE BATALHA 

// =========================================================
// 📜 DIÁRIO DE COMBATE (MATCH LOG)
// =========================================================
function registrarLog(mensagem, tipo = "system") {
    const log = document.getElementById("match-log");
    if (!log) return;
    
    const entry = document.createElement("div");
    entry.className = `log-entry log-${tipo}`;
    
    // Gera a hora exata [HH:MM:SS]
    const hora = new Date().toLocaleTimeString('pt-BR', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
    
    entry.innerHTML = `<span style="color:#666; font-size:0.55rem; margin-right:4px;">[${hora}]</span> ${mensagem}`;
    log.appendChild(entry);
    
    // Auto-scroll: Desce a barra sempre que uma nova linha for adicionada
    log.scrollTop = log.scrollHeight;
}

