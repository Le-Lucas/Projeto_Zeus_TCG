/* =========================================================
   🚀 PROJETO ZEUS - MOTOR V10.1 (COMBATE FLUIDO + LIMPEZA)
   ========================================================= */

console.log("Conexão JS Estabelecida. Matriz Restaurada e Limpa.");
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

// 2. BANCO DE DADOS E VARIÁVEIS GLOBAIS
const imgDiretor = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXT1IcOkgyVdfxJRupj-0q2LwH3pIRyYWTbg&s";
const imgOperador = "https://plus.unsplash.com/premium_photo-1682097238346-3f2a677ccfe6?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c29sZGFkb3xlbnwwfHwwfHx8MA%3D%3D";
const imgAdao = "https://img.freepik.com/fotos-premium/retrato-de-um-homem-palido-olhando-para-a-camera-com-um-olhar-assustador-contra-um-fundo-escuro-no-estudio_236854-66039.jpg";

const campaignData = [
    { name: "CENA 1: COMPLEXO MILITAR", bossName: "DEFESA DO PERÍMETRO", bossHp: 15, bossImg: "https://files.catbox.moe/ui0skk.png", bgImg: "https://i.postimg.cc/ZY8N7bVC/cena1.jpg", deckTema: ["Agente Novato", "Drone de Varredura", "Segurança Aegis", "Atirador Furtivo", "Drone de Sucata"], dialogo: [{ ator: "O DIRETOR", img: imgDiretor, texto: "Operador, detectamos uma anomalia térmica no Setor X8E. Parece uma detonação não autorizada." }, { ator: "O DIRETOR", img: imgDiretor, texto: "Nossa inteligência sugere que operações clandestinas do Projeto Zeus estão acontecendo lá. Infiltre-se e neutralize a ameaça." }, { ator: "OPERADOR", img: imgOperador, texto: "Entendido, Diretor. Iniciando varredura no perímetro externo da base." }] },
    { name: "CENA 2: CELA DAS COBAIAS", bossName: "HORDAS DA INCUBAÇÃO", bossHp: 20, bossImg: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png", bgImg: "https://i.postimg.cc/05YSWkcj/cena2.jpg", deckTema: ["Cobaia Estágio 1", "Mutante Instável", "Ciborgue Falho", "Unidade K-9 Cibernética"], dialogo: [{ ator: "OPERADOR", img: imgOperador, texto: "Diretor, o perímetro foi limpo. Mas não houve explosão propriamente dita... os portões do Sub-1 foram arrombados de dentro para fora." }, { ator: "O DIRETOR", img: imgDiretor, texto: "Isso é impossível. Proceda com extrema cautela ao descer." }, { ator: "OPERADOR", img: imgOperador, texto: "Espera... tem algo se movendo nas sombras. Contato! Cobaias soltas e frenéticas! Cortando comunicação para engajamento!" }] },
    { name: "CENA 3: LABS ZEUS", bossName: "ADÃO: O PRIMEIRO", bossHp: 40, bossImg: imgAdao, bgImg: "https://i.postimg.cc/ry14nVQz/cena3.jpg", deckTema: ["Projeto Zeus: Alfa", "O Punho da Resistência", "Sentinela Ômega", "Hack de Sobrecarga"], dialogo: [{ ator: "OPERADOR", img: imgOperador, texto: "Subnível 2 alcançado. Esquadrão de segurança abatido. Cientistas também... mas estão todos vivos, apenas nocauteados." }, { ator: "ADÃO", img: imgAdao, texto: "Se eu sou apenas um homem... por que não me canso igual a eles?" }, { ator: "ADÃO", img: imgAdao, texto: "Eles dizem que sou uma arma. A arma perfeita. Então por que eu hesito em puxar o gatilho?" }, { ator: "ADÃO", img: imgAdao, texto: "Ah... mais soldados chegando. Isso é tão irritante. Desliguem-se." }] }
];

const baseDeck = [
    // TROPAS COMUNS
    { title: "Agente Novato", tipo: "tropa", raridade: "comum", custo: 1, atk: 1, def: 2, efeito: "nenhum", img: "./soldado_novato.png" },
    { title: "Drone de Varredura", tipo: "tropa", raridade: "comum", custo: 1, atk: 2, def: 1, efeito: "nenhum", img: "./drone_de_varredura.png" },
    { title: "Segurança Aegis", tipo: "tropa", raridade: "comum", custo: 2, atk: 2, def: 3, efeito: "provocar", img: "./seguranca_aegis.png" },
    { title: "Atirador Furtivo", tipo: "tropa", raridade: "comum", custo: 2, atk: 3, def: 1, efeito: "nenhum", img: "https://i.postimg.cc/Fsjg46t8/Atirador-Furtivo.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Ciborgue Falho", tipo: "tropa", raridade: "comum", custo: 3, atk: 3, def: 3, efeito: "nenhum", img: "https://i.postimg.cc/65dLXPsS/Ciborgue-Falho.png" },
    { title: "Mercenário", tipo: "tropa", raridade: "comum", custo: 3, atk: 4, def: 2, efeito: "nenhum", img: "https://i.postimg.cc/4Nzbg0C2/Mercenario.png", som_ataque: "https://files.catbox.moe/mij0mg.wav" },
    { title: "Infiltrador das Sombras", tipo: "humano", raridade: "comum", custo: 1, atk: 2, def: 1, efeito: "furtividade", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZoPOtDbsR6X1lPe9V86rfBHlh2Q9TrW7sg&s" },
    { title: "Sucateiro da Zona Sul", tipo: "humano", raridade: "comum", custo: 2, atk: 1, def: 3, efeito: "reciclar", img: "https://files.catbox.moe/dbnyi2.png" },
    { title: "Cadete de Patrulha", tipo: "soldado", raridade: "comum", custo: 1, atk: 1, def: 3, efeito: "provocar", img: "https://files.catbox.moe/ui0skk.png" },
    { title: "Escudeiro de Elite", tipo: "soldado", raridade: "comum", custo: 3, atk: 2, def: 5, efeito: "escudo_divino", img: "https://files.catbox.moe/ebt0u6.png" },
    { title: "Barreira Eletrônica", tipo: "estrutura", raridade: "comum", custo: 2, atk: 0, def: 7, efeito: "provocar", img: "https://files.catbox.moe/b097ur.png" },
    { title: "Unidade K-9 Cibernética", tipo: "automato", raridade: "comum", custo: 2, atk: 3, def: 1, efeito: "investida", img: "https://files.catbox.moe/lc3rez.png" },
    { title: "Interceptor de Zeus", tipo: "automato", raridade: "comum", custo: 2, atk: 2, def: 3, efeito: "sentinela", img: "https://files.catbox.moe/05e01v.png" },
    { title: "Drone de Sucata", tipo: "automato", raridade: "comum", custo: 1, atk: 1, def: 1, efeito: "nenhum", text: "Máquina simples.", img: "https://i.postimg.cc/tgnW7p32/Drone-de-Varredura.png" },
    { title: "Sonda de Vigilância", tipo: "automato", raridade: "comum", custo: 1, atk: 0, def: 3, efeito: "sentinela", text: "Ataca Furtivos.", img: "https://i.postimg.cc/MGfVXq0T/Varredura-de-Satelite.png" },
    { title: "Módulo de Escudo", tipo: "automato", raridade: "comum", custo: 2, atk: 0, def: 4, efeito: "provocar", text: "Provocar.", img: "modulo_escudo.png" },
    // TROPAS RARAS
    { title: "Cobaia Estágio 1", tipo: "tropa", raridade: "rara", custo: 4, atk: 3, def: 6, efeito: "provocar", img: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png" },
    { title: "Sobrevivente Rebelde", tipo: "tropa", raridade: "rara", custo: 4, atk: 5, def: 2, efeito: "ataque_duplo", img: "https://i.postimg.cc/bNQHh5Xx/Sobrevivente-Rebelde.png" },
    { title: "Especialista em Explosivos", tipo: "tropa", raridade: "rara", custo: 5, atk: 4, def: 4, efeito: "nenhum", img: "https://i.postimg.cc/kXrFLmHs/Especialista-em-Explosivos.png" },
    { title: "Exoesqueleto Mk.II", tipo: "tropa", raridade: "rara", custo: 6, atk: 5, def: 5, efeito: "nenhum", img: "https://i.postimg.cc/qMfXWTFQ/Exoesqueleto-Mk-II.png" },
    { title: "Médico de Combate", tipo: "tropa", raridade: "rara", custo: 3, atk: 1, def: 4, efeito: "cura_turno", img: "https://i.postimg.cc/65sLFXPh/Medico-de-Combate.png" },
    { title: "Mutante Instável", tipo: "tropa", raridade: "rara", custo: 5, atk: 4, def: 5, efeito: "regeneracao", img: "https://i.postimg.cc/mg1SnrL7/Mutante-Instavel.png" },
    { title: "Hacker do Mainframe", tipo: "humano", raridade: "rara", custo: 4, atk: 2, def: 2, efeito: "roubo_energia", img: "https://files.catbox.moe/tl6rvy.png" },
    { title: "Atirador de Supressão", tipo: "soldado", raridade: "rara", custo: 4, atk: 4, def: 3, efeito: "reduzir_atk", img: "https://files.catbox.moe/vynjlp.png" },
    { title: "Blindado de Transporte", tipo: "mecanizado", raridade: "rara", custo: 5, atk: 3, def: 8, efeito: "evocar_recruta", img: "https://files.catbox.moe/997fyd.png" },
    { title: "Especialista em Contenção", tipo: "humano", raridade: "rara", custo: 3, atk: 3, def: 2, efeito: "atordoar", img: "https://files.catbox.moe/nvlqhz.png" },
    { title: "Agente da PIDE-Tec", tipo: "humano", raridade: "rara", custo: 3, atk: 2, def: 4, efeito: "nenhum", img: "https://files.catbox.moe/nifj2x.png" },
    { title: "Guardião de Protocolo", tipo: "automato", raridade: "rara", custo: 3, atk: 3, def: 4, efeito: "anti_feitico", text: "Imune a magias.", img: "" },
    { title: "Demolidor Série-X", tipo: "automato", raridade: "rara", custo: 4, atk: 5, def: 3, efeito: "nenhum", text: "Puro dano.", img: "demolidor_x.png" },
    // TROPAS ÉPICAS & LENDÁRIAS
    { title: "Quimera Alada", tipo: "tropa", raridade: "epica", custo: 4, atk: 3, def: 4, efeito: "voar", img: "https://i.postimg.cc/mrcscCyq/Quimera-Alada.png" },
    { title: "Ceifador da Unidade", tipo: "tropa", raridade: "epica", custo: 6, atk: 6, def: 5, efeito: "roubo_vida", img: "https://i.postimg.cc/pLcvXqzj/Ceifador-da-Unidade.png" },
    { title: "Sentinela Ômega", tipo: "tropa", raridade: "epica", custo: 7, atk: 5, def: 7, efeito: "escudo", img: "https://i.postimg.cc/q7tTtyx1/Sentinela-Omega.png", som_ataque: "https://files.catbox.moe/5nlm3z.wav" },
    { title: "Projeto Zeus: Alfa", tipo: "tropa", raridade: "lendaria", custo: 8, atk: 8, def: 8, efeito: "nenhum", img: "https://i.postimg.cc/0yXv2cDX/Projeto-Zeus-Alfa.png" },
    { title: "General Mão de Ferro", tipo: "humano", raridade: "lendaria", custo: 7, atk: 6, def: 7, efeito: "aura_defesa", img: "https://files.catbox.moe/wkfzj3.png" },
    { title: "O Punho da Resistência", tipo: "mecanizado", raridade: "lendaria", custo: 7, atk: 7, def: 7, efeito: "furia", img: "https://files.catbox.moe/nuxefh.png" },
    { title: "Pacificador V.9", tipo: "mecanizado", raridade: "lendaria", custo: 8, atk: 9, def: 9, efeito: "anular_efeito", img: "https://files.catbox.moe/7cjywl.png" },
    // SINERGIAS E TOKENS
    { title: "Enxame de Nanobots", tipo: "automato", raridade: "rara", custo: 4, atk: 2, def: 2, efeito: "sinergia_automato", text: "Ganha +1/+1 por Autômato.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKmEat6w4aafi5kCkFL9_gVZvCcdfsufUR6A&s" },
    { title: "Esquadrão Tático", tipo: "humano", raridade: "comum", custo: 4, atk: 3, def: 2, efeito: "tropa_coordenada", text: "Invoca Cadete ou +1/+1.", img: "data:image/jpeg;base64,/9j/4AAQSkZ..." }, 
    { title: "Clone Instável", tipo: "tropa", raridade: "comum", custo: 0, atk: 2, def: 1, efeito: "provocar", img: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png" },
    // FEITIÇOS E EQUIPAMENTOS
    { title: "Kit Médico Tático", tipo: "feitico", raridade: "comum", custo: 1, atk: 0, def: 0, efeito: "cura_3", img: "https://i.postimg.cc/DyqdTNV5/Kit-Medico-Tatico.png" },
    { title: "Protocolo: EMP", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "dano_2", img: "https://i.postimg.cc/fTxjNP4H/Protocolo-EMP.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Pulso Eletromagnético", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "atordoar", text: "Atordoa unidade inimiga.", img: "https://i.postimg.cc/bJXbtWLd/Pulso-Eletromagnetico.png" },
    { title: "Injeção de Nanobots", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "cura_2", text: "Cura 2 de uma unidade aliada.", img: "https://i.postimg.cc/50cvCTp2/Injecao-de-Nanobots.png" },
    { title: "Sobrecarga de Sistema", tipo: "feitico", raridade: "comum", custo: 1, atk: 0, def: 0, efeito: "dano_2", text: "Causa 2 de dano a uma unidade.", img: "https://i.postimg.cc/B6WDKkNS/Sobrecarga-de-Sistema.png" },
    { title: "Campo de Força Portátil", tipo: "feitico", raridade: "comum", custo: 2, atk: 0, def: 0, efeito: "escudo_divino", text: "Concede Escudo Divino.", img: "https://i.postimg.cc/pTN8F4kx/Campo-de-forca.png" },
    { title: "Hack de Sobrecarga", tipo: "feitico", raridade: "rara", custo: 3, atk: 0, def: 0, efeito: "dano_4", img: "https://files.catbox.moe/tl6rvy.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Protocolo: Purga", tipo: "feitico", raridade: "rara", custo: 4, atk: 0, def: 0, efeito: "dano_area", img: "https://i.postimg.cc/ZKkFXSQV/Protocolo-Purga.png", som_drop: "https://files.catbox.moe/9h871i.wav" },
    { title: "Bombardeio Orbital", tipo: "feitico", raridade: "epica", custo: 6, atk: 0, def: 0, efeito: "dano_total", img: "https://files.catbox.moe/8pzmk6.png" },
    { title: "Hack de Interface", tipo: "feitico", raridade: "rara", custo: 2, atk: 0, def: 0, efeito: "atordoar", text: "Atordoa uma unidade inimiga.", img: "https://i.postimg.cc/Ss08M3V4/Hack-de-Interface.png" },
    { title: "Reboot de Emergência", tipo: "feitico", raridade: "epica", custo: 4, atk: 0, def: 0, efeito: "cura_4", text: "Restaura 4 HP de um alvo.", img: "https://i.postimg.cc/JhHZtM31/Reboot-de-Emergencia.png" },
    { title: "Vírus de Replicação", tipo: "feitico", raridade: "lendaria", custo: 6, atk: 0, def: 0, efeito: "dano_area", text: "Causa 3 de dano a todas inimigas.", img: "https://i.postimg.cc/zfHK38CQ/Virus-de-Replicacao.png" },
    { title: "Colete de Kevlar", tipo: "equipamento", raridade: "comum", custo: 1, atk: 0, def: 2, efeito: "nenhum", text: "Concede +2 de HP.", img: "https://i.postimg.cc/Gm5vcHy5/Colete-de-klevar.png" },
    { title: "Rifle de Plasma", tipo: "equipamento", raridade: "comum", custo: 2, atk: 2, def: 0, efeito: "nenhum", text: "Concede +2 de ATK.", img: "https://i.postimg.cc/R0KzzDWy/rifle.png" },
    { title: "Escudo de Energia", tipo: "equipamento", raridade: "comum", custo: 2, atk: 0, def: 3, efeito: "escudo_divino", text: "Concede +3 HP e Escudo.", img: "https://i.postimg.cc/6QnNNm7t/Gemini-Generated-Image.png" },
    { title: "Manto de Camuflagem", tipo: "equipamento", raridade: "rara", custo: 2, atk: 0, def: 0, efeito: "furtividade", text: "Concede Furtividade.", img: "https://i.postimg.cc/d0rKKx7v/manto.png" },
    { title: "Chip Berserker", tipo: "equipamento", raridade: "epica", custo: 3, atk: 3, def: -3, efeito: "furia", text: "+3 ATK, Fúria, perde -3 HP.", img: "https://i.postimg.cc/bvkjjBGh/chip.png" }
];

let currentLevel = 0, playerCollection = [], customDeck = [], playerDeck = [];
let graveyard = { player: [], enemy: [] };
let playerFragments = 9999, currentSortMode = "cost";
let maxMana = 3, playerMana = 3, maxLife = 20, playerLife = 20, enemyLife = 20, currentTurn = 1;
let attackToken = "player", currentStep = "deploy_attacker"; 
let selectedAttacker = null, selectedCardFromHand = null, turnTime = 80, timerInterval, gameIsOver = false, isSystemLocked = false, draggedCard = null, selectedHeroObj = null;

// 3. INICIALIZAÇÃO
function bootTerminal() {
    initZeusEngineScale(); 
    playerCollection = [];
    baseDeck.forEach(c => { playerCollection.push({...c}); playerCollection.push({...c}); playerCollection.push({...c}); });
    
    // Segurança para P2P Direto
    selectedHeroObj = { id: "COMANDANTE", imgUrl: "https://files.catbox.moe/wkfzj3.png" }; 
    const nomesDeckInicial = ["Agente Novato", "Atirador Furtivo", "Sucateiro da Zona Sul", "Segurança Aegis", "Unidade K-9 Cibernética", "Mercenário", "Médico de Combate", "Sobrevivente Rebelde", "Quimera Alada", "Exoesqueleto Mk.II", "Blindado de Transporte", "Sobrecarga de Sistema", "Kit Médico Tático", "Rifle de Plasma", "Colete de Kevlar"];
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
        btnModeStory.onclick = () => { playSound("click"); document.getElementById("mode-selection-modal").classList.remove("active"); currentLevel = 0; startCampaignScene(); };
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

// 4. DECK BUILDER E MERCADO NEGRO
function initDeckBuilder() {
    document.getElementById("sort-cost").onclick = () => { currentSortMode = "cost"; renderVitrine(); playSound("click"); };
    document.getElementById("sort-rarity").onclick = () => { currentSortMode = "rarity"; renderVitrine(); playSound("click"); };
    document.getElementById("sort-type").onclick = () => { currentSortMode = "type"; renderVitrine(); playSound("click"); };
    document.getElementById("btn-close-inspect").onclick = () => { playSound("click"); document.getElementById("inspect-modal").classList.remove("active"); };
    
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
            document.getElementById("fragment-count").textContent = playerFragments;
        } else { playSound("error"); alert("HDs INSUFICIENTES"); } 
    };
    
    document.getElementById("btn-sell-card").innerText = `VENDER (+${custo/5}💽)`;
    document.getElementById("btn-sell-card").onclick = () => { 
        if(copies > 0) { 
            playerFragments += custo/5; const idx = playerCollection.findIndex(c => c.title === card.title); 
            if(idx > -1) playerCollection.splice(idx,1); initMarket(); openMarketModal(card, copies-1); playSound("click"); 
            document.getElementById("fragment-count").textContent = playerFragments;
        } 
    };
    document.getElementById("btn-close-transaction").onclick = () => document.getElementById("transaction-modal").classList.remove("active");
}

// 5. CÉREBRO DOS STATUS DINÂMICOS E EFEITOS
function recalculateStats(c) {
    let baseAtk = parseInt(c.dataset.baseAtk) || 0; let baseHp = parseInt(c.dataset.baseHp) || 0; let damageTaken = parseInt(c.dataset.damageTaken) || 0; 
    let eqAtk = parseInt(c.dataset.equipAtk) || 0; let eqHp = parseInt(c.dataset.equipHp) || 0;
    let auAtk = parseInt(c.dataset.auraAtk) || 0; let auHp = parseInt(c.dataset.auraHp) || 0;

    let finalAtk = baseAtk + eqAtk + auAtk; let maxHp = baseHp + eqHp + auHp; let currentHp = maxHp - damageTaken;

    c.dataset.attack = finalAtk; c.dataset.hp = currentHp; 
    const atkNode = c.querySelector(".stat-atk"); const defNode = c.querySelector(".stat-def");
    if(atkNode) atkNode.innerText = finalAtk > 0 ? finalAtk : 0; if(defNode) defNode.innerText = currentHp;

    let activeEffect = c.dataset.equipEffect || c.dataset.originalEffect; c.dataset.effect = activeEffect; 
    
    c.classList.remove("taunt-card", "double-attack-card", "lifesteal-card", "shield-card", "stealth-card", "fury-card");
    if (activeEffect === "provocar" || c.classList.contains("aura-taunt")) c.classList.add("taunt-card"); 
    if (activeEffect === "ataque_duplo") c.classList.add("double-attack-card");
    if (activeEffect === "roubo_vida") c.classList.add("lifesteal-card"); 
    if (activeEffect === "escudo_divino" && !c.dataset.shieldBroken) c.classList.add("shield-card"); 
    if (activeEffect === "furtividade") c.classList.add("stealth-card"); 

    if (activeEffect === "furia") {
        c.classList.add("fury-card");
        if (!c.querySelector('.fury-particles-layer')) {
            const pLayer = document.createElement("div"); pLayer.className = "fury-particles-layer";
            pLayer.style.cssText = "position:absolute; top:0; left:0; width:100%; height:100%; pointer-events:none; overflow:hidden; border-radius:inherit; z-index:5;";
            c.appendChild(pLayer);
            for (let i = 0; i < 8; i++) {
                const spark = document.createElement("div"); let size = Math.random() * 3 + 2;
                spark.style.cssText = `position:absolute; width:${size}px; height:${size}px; background:#ffaa00; border-radius:50%; bottom:-5px; box-shadow: 0 0 5px #ff5500; left:${Math.random() * 100}%;`;
                pLayer.appendChild(spark);
                gsap.to(spark, { y: -(Math.random() * 120 + 40), x: (Math.random() * 30 - 15), opacity: 0, scale: Math.random() * 0.5 + 0.5, duration: Math.random() * 1 + 1, repeat: -1, ease: "power1.out", delay: Math.random() * 1 });
            }
        }
    } else {
        const existingSparks = c.querySelector('.fury-particles-layer'); if (existingSparks) existingSparks.remove();
    }

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

function getCardDesc(item) {
    if (item.text) return item.text; 
    let eff = item.efeito;
    if (!eff || eff === "nenhum") return "";
    const dict = { "provocar": "🛡️ Provocar: Inimigos devem atacar esta unidade.", "ataque_duplo": "⚔️ Ataque Duplo: Pode atacar 2 vezes.", "roubo_vida": "❤️ Roubo de Vida.", "escudo_divino": "🔰 Escudo Divino.", "escudo": "🔰 Escudo.", "furtividade": "🥷 Furtividade.", "voar": "🦅 Voar.", "regeneracao": "🧬 Regeneração 1.", "cura_turno": "💉 Cura 1 HP do Herói.", "reciclar": "♻️ Reciclar.", "investida": "⚡ Ataque Rápido.", "ataque_rapido": "⚡ Ataque Rápido.", "atordoar": "🔌 Atordoar.", "dano_area": "💥 Dano em Área." };
    return dict[eff] || `Efeito: ${eff.replace(/_/g, ' ').toUpperCase()}`;
}

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
    let cardDescription = getCardDesc(item); let descHTML = cardDescription ? `<div class="card-body"><div class="card-text">${cardDescription}</div></div>` : "";

    c.innerHTML = `<div class="card-title">${item.title}</div><div class="card-art-box"><img src="${item.img || ''}" class="card-art" draggable="false"></div><div class="card-type-icon">${typeIcon}</div>${starsHTML}${descHTML}${statsHTML}<div class="card-cost">${safeCost}</div>`;
    
    c.onmouseenter = () => { if(c.parentElement && c.parentElement.id === "hand" && !draggedCard && selectedCardFromHand !== c) { gsap.to(c, { y: -30, scale: 0.85, zIndex: 100, duration: 0.2 }); } };
    c.onmouseleave = () => { if(c.parentElement && c.parentElement.id === "hand" && !draggedCard && selectedCardFromHand !== c) { gsap.to(c, { y: 0, scale: 0.7, zIndex: c.dataset.origZ, duration: 0.2 }); } };
    
    c.onclick = handleCardClick; 
    c.ondragstart = (e) => { e.dataTransfer.setData('text/plain', 'carta'); if(isSystemLocked || c.parentElement.id !== "hand") { e.preventDefault(); return; } if(isSpell || isEquip) { e.preventDefault(); playSound("error"); alert("SISTEMA: Clique na carta na mão e depois no alvo."); return; } draggedCard = c; };
    c.ondragend = () => { if (draggedCard) draggedCard = null; };
    recalculateStats(c); return c; 
}

// 6. SISTEMA DE CLIQUES E MIRAS
function handleCardClick(e) {
    if(isSystemLocked) return; 
    const c = e.currentTarget; const p = c.parentElement; 
    const isSpellSelected = selectedCardFromHand && selectedCardFromHand.dataset.raca === "feitico";
    const isEquipSelected = selectedCardFromHand && selectedCardFromHand.dataset.raca === "equipamento";

    if(p.id === "hand"){ 
        playSound("click"); 
        if(selectedCardFromHand === c){ selectedCardFromHand = null; c.classList.remove("deployment-selected"); arrangeHand(); } 
        else { if(selectedCardFromHand) selectedCardFromHand.classList.remove("deployment-selected"); selectedCardFromHand = c; c.classList.add("deployment-selected"); gsap.to(c, { scale: 1.3, y: -120, rotation: 0, zIndex: 100, duration: 0.3, ease: "back.out(1.7)" }); arrangeHand(c); } 
    } 
    else if (isSpellSelected) { executeSpell(selectedCardFromHand, c, p.dataset.owner); }
    else if (isEquipSelected) { executeEquip(selectedCardFromHand, c, p.dataset.owner); } 
    
    else if(p.dataset.owner === "player" && currentStep === "combat" && attackToken === "player"){ 
        if(c.dataset.hasAttacked === "true" || c.classList.contains("exhausted")) { playSound("error"); return; }
        if(selectedAttacker === c) { selectedAttacker = null; c.classList.remove("attacker-selected"); } 
        else { if(selectedAttacker) selectedAttacker.classList.remove("attacker-selected"); selectedAttacker = c; c.classList.add("attacker-selected"); playSound("click"); } 
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
    else if (selectedAttacker && owner === "enemy" && attackToken === "player" && currentStep === "combat") {
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
    targetElement.dataset.equipAtk = equipCard.dataset.attack; targetElement.dataset.equipHp = equipCard.dataset.hp; targetElement.dataset.equipEffect = equipCard.dataset.effect;
    let namePlate = targetElement.querySelector(".card-title"); if(namePlate) namePlate.style.color = "#ff00ff"; 
    if(window.VFX) VFX.pulse(targetElement, "#ff00ff"); recalculateStats(targetElement); updateAuras();
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
        if (efeito.includes("dano") && !efeito.includes("area") && !efeito.includes("total") && targetOwner !== "enemy") { playSound("error"); alert("Apenas em inimigos!"); return; }

        playerMana -= cost; updateLifeAndMana(); 
        if (window.conexao && window.conexao.open) {
            let tType = targetElement.id.includes("hero") ? "hero" : "card"; let dSlot = null;
            if (tType === "card") dSlot = Array.from(targetElement.parentElement.parentElement.children).indexOf(targetElement.parentElement);
            window.enviarPacote({ acao: "LANCAR_MAGIA", cardName: spellCard.dataset.name, targetOwner: targetOwner, targetType: tType, defSlot: dSlot });
        }
        spellCard.remove(); arrangeHand(); selectedCardFromHand = null; draggedCard = null;
    }
    
    if(spellCard.dataset.somDrop) { let d = new Audio(spellCard.dataset.somDrop); d.play().catch(()=>{}); } else { playSound("hit"); }
    const efeito = spellCard.dataset.effect;

    if(efeito === "dano_total" || efeito === "dano_area") {
        document.getElementById(isLocalCaster ? "enemy-field" : "player-field").querySelectorAll('.card-base').forEach(inimigo => applyDamage(inimigo, 3)); 
        if(efeito === "dano_total") { if(isLocalCaster) enemyLife -= 4; else playerLife -= 4; } screenShake();
    } else if (efeito.includes("dano_")) {
        let dmg = parseInt(efeito.split("_")[1]) || 0;
        if(targetElement.id.includes("hero")) { if(targetElement.id === "enemy-hero") enemyLife -= dmg; else playerLife -= dmg; if(window.VFX) VFX.particles(targetElement, "#ff0000"); } else { applyDamage(targetElement, dmg); } screenShake();
    } else if (efeito.includes("cura_")) {
        let heal = parseInt(efeito.split("_")[1]) || 0;
        if(targetElement.id.includes("hero")) { if(targetElement.id === "player-hero") playerLife += heal; else enemyLife += heal; if(window.VFX) VFX.particles(targetElement, "#00ff00"); } else { targetElement.dataset.damageTaken = Math.max(0, (parseInt(targetElement.dataset.damageTaken) || 0) - heal); recalculateStats(targetElement); if(window.VFX) VFX.particles(targetElement, "#00ff00"); }
    } else if (efeito === "atordoar" && !targetElement.id.includes("hero")) {
        targetElement.classList.add("exhausted"); targetElement.dataset.hasAttacked = "true"; if(window.VFX) VFX.stun(targetElement);
    }
    checkGameOver(); updateLifeAndMana(); 
}

// 7. O MOTOR DO JOGO (PHASES & TURNOS)
function startGameDirect(mode, arenaClass) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active")); document.getElementById("game-screen").classList.add("active");
    document.body.className = arenaClass || "theme-lab"; document.getElementById("board").className = arenaClass || "theme-lab";
    initGame(mode === "campaign" ? 0 : "casual", arenaClass || "theme-lab");
}

function initGame(levelIndex, arenaClass) {
    currentLevel = levelIndex;
    let levelData = levelIndex === "casual" ? { bossName: "SIMULACRO", bossHp: 20, bossImg: "https://files.catbox.moe/05e01v.png" } : campaignData[levelIndex];
    const enHero = document.getElementById("enemy-hero"); 
    if(enHero) { enHero.querySelector(".hero-avatar").src = levelData.bossImg; enHero.querySelector(".hero-stats span:last-child").innerHTML = `VIDA: <span id="enemy-life">${levelData.bossHp}</span>`; enHero.onclick = () => handleHeroClick(enHero, "enemy"); }
    const plHero = document.getElementById("player-hero");
    if(plHero) { plHero.onclick = () => handleHeroClick(plHero, "player"); if(selectedHeroObj) document.getElementById("player-avatar-img").src = selectedHeroObj.imgUrl; }

    enemyLife = levelData.bossHp; playerLife = 20; maxMana = 3; playerMana = 3; currentTurn = 1; gameIsOver = false; 

    if (window.conexao && window.conexao.open) { if (window.isHost) { attackToken = "player"; isSystemLocked = false; } else { attackToken = "enemy"; isSystemLocked = true; } } 
    else { attackToken = "player"; isSystemLocked = false; }
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
    playSound("click"); let stepAntes = currentStep; advancePhase(false); 
    if(window.conexao && window.conexao.open && stepAntes !== "combat") { window.enviarPacote({ acao: "AVANCAR_FASE" }); }
}

function startNewRound(fromNetwork = false) {
    if(gameIsOver) return; currentTurn++; 
    attackToken = (attackToken === "player") ? "enemy" : "player"; 
    currentStep = "deploy_attacker";
    
    document.querySelectorAll('.card-base').forEach(c => { 
        c.dataset.hasAttacked = "false"; c.dataset.attacksMade = "0"; c.classList.remove("exhausted"); 
        processCardEffect("FimDeTurno", c, c.parentElement.dataset.owner); 
    });
    
    if (attackToken === "player" || (!window.conexao)) { if(maxMana < 10) maxMana++; playerMana = maxMana; drawCard(); }
    updateUIState();
    if(window.conexao && window.conexao.open && attackToken === "enemy" && !fromNetwork) { window.enviarPacote({ acao: "PASSAR_TURNO" }); }
}

function updateUIState() {
    updateLifeAndMana(); clearInterval(timerInterval); 
    document.getElementById("turn-display").innerText = `TURNO ${currentTurn}`;
    
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

let maxTurnTime = 80;
function startTimer(s) { 
    turnTime = s; maxTurnTime = s; const container = document.getElementById("elevator-timer");
    if (container && container.children.length !== s) { container.innerHTML = ""; for(let i = 1; i <= s; i++) { let node = document.createElement("div"); node.className = "timer-node pending"; node.id = "timer-node-" + i; node.innerText = i; container.appendChild(node); } }
    updateElevatorTimer(); clearInterval(timerInterval); 
    timerInterval = setInterval(() => { if(!isSystemLocked && !gameIsOver) { turnTime--; updateElevatorTimer(); if(turnTime <= 0) handleActionBtn(); } }, 1000); 
}
function updateElevatorTimer() {
    const container = document.getElementById("elevator-timer"); if(!container) return; let elapsed = maxTurnTime - turnTime + 1; 
    for(let i = 1; i <= maxTurnTime; i++) { let node = document.getElementById("timer-node-" + i); if (node) { if (i === elapsed) node.className = "timer-node active"; else if (i < elapsed) node.className = "timer-node passed"; else node.className = "timer-node pending"; } }
}
function updateLifeAndMana() {
    if(document.getElementById("mana")) document.getElementById("mana").innerText = `${playerMana}/${maxMana}`; 
    if(document.getElementById("player-life")) document.getElementById("player-life").innerText = playerLife; 
    if(document.getElementById("enemy-life")) document.getElementById("enemy-life").innerText = enemyLife;
    if(document.getElementById("cards-in-deck")) document.getElementById("cards-in-deck").innerText = playerDeck.length;
    if(document.getElementById("cards-in-grave")) document.getElementById("cards-in-grave").innerText = graveyard.player.length;
}
function createSlots(f, o) { 
    for(let i=0; i<5; i++) { const s = document.createElement("div"); s.className = "slot"; s.dataset.owner = o; if(o === "player") { s.onclick = (e) => { if(selectedCardFromHand) executePlayCard(e.currentTarget, selectedCardFromHand); }; s.ondragover = (e) => { e.preventDefault(); }; s.ondrop = (e) => { e.preventDefault(); if (isSystemLocked || !draggedCard || draggedCard.dataset.type === "feitico") return; executePlayCard(e.currentTarget, draggedCard); }; } f.appendChild(s); } 
}

function executePlayCard(slot, card) {
    if(card.dataset.type === "feitico") return; 
    if(slot.querySelector('.card-base')) { playSound("error"); alert("SISTEMA: Slot Ocupado!"); return; }
    let cst = parseInt(card.dataset.cost) || 0; let donoDoSlot = slot.dataset.owner; 
    if(playerMana >= cst) {
        playerMana -= cst; slot.appendChild(card); 
        if(donoDoSlot === "player" && window.conexao && window.conexao.open) { let slotIndex = Array.from(slot.parentElement.children).indexOf(slot); window.enviarPacote({ acao: "JOGAR_CARTA", cardName: card.dataset.name, slotIndex: slotIndex }); }

        card.classList.remove("deployment-selected"); gsap.killTweensOf(card); gsap.set(card, { clearProps: "all" }); 
        gsap.set(card, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0, x: 0, y: 0, rotation: 0, opacity: 1, zIndex: 10 });
        
        // 👇 SOLUÇÃO: REMOVIDO ENJOO DE INVOCAÇÃO 👇
        card.dataset.hasAttacked = "false"; // Sempre entra pronta para bater no turno de Combate!
        card.classList.remove("exhausted");

        processCardEffect("AoJogar", card, donoDoSlot);
        playSound("deploy"); updateLifeAndMana(); setTimeout(updateAuras, 100); draggedCard = null; selectedCardFromHand = null; arrangeHand();
    } else { playSound("error"); alert("RAM INSUFICIENTE!"); }
}

function resolveCombat(atkCard, defCard, isPlayer, onFinish) {
    const rectAtk = atkCard.getBoundingClientRect(); const rectDef = defCard.getBoundingClientRect();
    const moveX = rectDef.left - rectAtk.left; const moveY = rectDef.top - rectAtk.top; atkCard.style.zIndex = "100";

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
            let attackerAlive = (parseInt(atkCard.dataset.hp) || 0) > 0; let defenderDied = !defCard.id.includes("hero") && (parseInt(defCard.dataset.hp) || 0) <= 0;

            if (attackerAlive) {
                let eff = atkCard.dataset.effect;
                if (eff === "furia" && defenderDied) { atkCard.dataset.hasAttacked = "false"; atkCard.classList.remove("exhausted"); if(window.VFX) VFX.fury(atkCard); } 
                else if (eff === "ataque_duplo" && atkCard.dataset.attacksMade !== "1") { atkCard.dataset.attacksMade = "1"; atkCard.dataset.hasAttacked = "false"; atkCard.classList.remove("exhausted"); } 
                else { atkCard.dataset.hasAttacked = "true"; atkCard.classList.add("exhausted"); }
            }
            
            atkCard.classList.remove("attacker-selected"); 
            if (attackerAlive) { gsap.to(atkCard, { x: 0, y: 0, duration: 0.45, ease: "power2.out", onComplete: () => { atkCard.style.zIndex = ""; if(onFinish) onFinish(); } }); }
            else { if(onFinish) onFinish(); }
        }
    });
}

function applyDamage(target, dmg) {
    if(target.dataset.dead === "true") return; 
    let currentEffect = target.dataset.effect || target.dataset.originalEffect;
    if(currentEffect === "escudo_divino" && !target.dataset.shieldBroken) { target.dataset.shieldBroken = "true"; target.classList.remove("shield-card"); if(window.VFX) VFX.shield(target); return; }
    if(window.VFX) VFX.onDamage(target, currentEffect); target.dataset.damageTaken = (parseInt(target.dataset.damageTaken) || 0) + dmg; recalculateStats(target);
}

function processCardEffect(gatilho, cartaObj, owner) {
    const efeito = cartaObj.dataset.effect; const isPlayer = owner === "player";
    if (gatilho === "AoJogar") {
        if (efeito === "reciclar" && isPlayer && graveyard.player.length > 0) { let revivida = graveyard.player.pop(); updateLifeAndMana(); let novaCarta = createCard(revivida); document.getElementById("hand").appendChild(novaCarta); gsap.fromTo(novaCarta, { y: 200, scale: 0.2, opacity: 0 }, { y: 0, scale: 0.7, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }); if(typeof arrangeHand === "function") arrangeHand(); playSound("deploy"); }
        if (efeito === "atordoar") { const targets = document.getElementById(isPlayer ? "enemy-field" : "player-field").querySelectorAll('.card-base'); if(targets.length > 0) { const t = targets[Math.floor(Math.random() * targets.length)]; t.classList.add("exhausted"); t.dataset.hasAttacked = "true"; if(window.VFX) VFX.stun(t); } }
        if (efeito === "roubo_energia" && isPlayer) { enemyLife -= 1; updateLifeAndMana(); if(window.VFX) VFX.particles(document.getElementById("enemy-hero"), "#ff00ff"); }
        const field = document.getElementById(isPlayer ? "player-field" : "enemy-field");
        if (efeito === "tropa_coordenada") {
            const emptySlots = Array.from(field.children).filter(s => !s.hasChildNodes());
            if (emptySlots.length > 0) { const recruta = createCard(baseDeck.find(c => c.title === "Cadete de Patrulha")); recruta.dataset.owner = owner; emptySlots[0].appendChild(recruta); gsap.set(recruta, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0 }); recruta.dataset.hasAttacked = "true"; recruta.classList.add("exhausted"); if(window.VFX) VFX.onSummon(recruta, "provocar"); playSound("deploy"); } 
            else { cartaObj.dataset.baseAtk = (parseInt(cartaObj.dataset.baseAtk) || 0) + 1; cartaObj.dataset.baseHp = (parseInt(cartaObj.dataset.baseHp) || 0) + 1; recalculateStats(cartaObj); if(window.VFX) VFX.pulse(cartaObj, "#00ff00"); playSound("hit"); }
        }
        if (cartaObj.dataset.type === "automato" || cartaObj.dataset.raca === "automato") {
            const aliados = field.querySelectorAll('.card-base'); aliados.forEach(aliado => { if (aliado.dataset.name === "Enxame de Nanobots" && aliado !== cartaObj) { aliado.dataset.baseAtk = (parseInt(aliado.dataset.baseAtk) || 0) + 1; aliado.dataset.baseHp = (parseInt(aliado.dataset.baseHp) || 0) + 1; recalculateStats(aliado); if(window.VFX) VFX.pulse(aliado, "#00ffff"); } });
        }
    } 
    if (gatilho === "UltimoSuspiro") { graveyard[owner].push(baseDeck.find(c => c.title === cartaObj.dataset.name)); if (efeito === "evocar_recruta") { const slot = cartaObj.parentElement; setTimeout(() => { if(slot && !slot.querySelector('.card-base')) { const recruit = createCard(baseDeck.find(c => c.title === "Cadete de Patrulha")); recruit.dataset.owner = owner; gsap.set(recruit, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0 }); slot.appendChild(recruit); if(window.VFX) VFX.onSummon(recruit, "provocar"); } }, 500); } }
    if (gatilho === "FimDeTurno") { if (efeito === "cura_turno" && isPlayer) { playerLife = Math.min(playerLife+1, maxLife); if(window.VFX) VFX.particles(document.getElementById("player-hero"), "#00ff00"); } if (efeito === "regeneracao") { cartaObj.dataset.damageTaken = Math.max(0, (parseInt(cartaObj.dataset.damageTaken) || 0) - 1); recalculateStats(cartaObj); if(window.VFX) VFX.particles(cartaObj, "#00ff00"); } }
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

window.nextCampaignLevel = function() { playSound("click"); document.getElementById("game-over-modal").classList.remove("active"); currentLevel++; startCampaignScene(); };
function drawCard() { if(playerDeck.length > 0) { const novaCarta = createCard(playerDeck.pop()); document.getElementById("hand").appendChild(novaCarta); gsap.set(novaCarta, { y: -500, x: 200, rotationY: 180, scale: 0.2, opacity: 0 }); arrangeHand(); gsap.to(novaCarta, { rotationY: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }); updateLifeAndMana(); } }
function arrangeHand(cartaParaIgnorar = null) { const cards = Array.from(document.getElementById("hand").children); for (let i = 0; i < cards.length; i++) { const card = cards[i]; if (card === cartaParaIgnorar) continue; card.dataset.origZ = i; gsap.set(card, { zIndex: i }); const angle = -15 + (30) * (cards.length > 1 ? i / (cards.length - 1) : 0.5); const targetLeft = `calc(50% + ${(i - (cards.length - 1) / 2) * 110}px)`; const targetBottom = `${(Math.abs(angle) * 2) - 30}px`; gsap.to(card, { left: targetLeft, bottom: targetBottom, y: 0, rotation: angle, xPercent: -50, scale: 0.7, duration: 0.4, ease: "power2.out" }); } }

function initMultiplayer() {
    const btnOpenP2P = document.getElementById("btn-open-p2p");
    if(btnOpenP2P) { btnOpenP2P.onclick = () => { playSound("click"); document.getElementById("p2p-modal").classList.add("active"); if(!window.peer) { document.getElementById("meu-status").innerText = "GERANDO CHAVE..."; document.getElementById("meu-status").style.color = "yellow"; let codigoSala = 'ZEUS-' + Math.random().toString(36).substr(2, 4).toUpperCase(); window.peer = new Peer(codigoSala); window.peer.on('open', function(id) { document.getElementById("meu-status").innerText = "SEU ID: " + id; document.getElementById("meu-status").style.color = "#00ffcc"; }); window.peer.on('connection', function(conn) { window.conexao = conn; window.isHost = true; prepararBatalha(); }); } }; }
    const btnClient = document.getElementById("btn-client");
    if(btnClient) { btnClient.onclick = () => { playSound("click"); let codigo = document.getElementById("id-alvo").value.toUpperCase().trim(); if(!codigo) { playSound("error"); alert("SISTEMA: Digite o ID do Host."); return; } if(!window.peer) window.peer = new Peer(); document.getElementById("meu-status").innerText = "CONECTANDO..."; window.conexao = window.peer.connect(codigo); window.conexao.on('open', function() { window.isHost = false; prepararBatalha(); }); }; }
}
function prepararBatalha() {
    playSound("deploy"); document.getElementById("p2p-modal").classList.remove("active"); alert("CONEXÃO ESTABELECIDA!"); startGameDirect("casual", "theme-lab"); 
    window.conexao.on('data', function(pacote) {
        if(pacote.acao === "AVANCAR_FASE") { advancePhase(true); } else if(pacote.acao === "PASSAR_TURNO") { playSound("deploy"); startNewRound(true); }
        else if(pacote.acao === "JOGAR_CARTA") { playSound("deploy"); const cardData = baseDeck.find(c => c.title === pacote.cardName); if(cardData) { const enemyCard = createCard(cardData); enemyCard.dataset.owner = "enemy"; enemyCard.ondragstart = (e) => e.preventDefault(); const slotInimigo = document.getElementById("enemy-field").children[4 - pacote.slotIndex]; if(slotInimigo) { slotInimigo.appendChild(enemyCard); gsap.set(enemyCard, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0, x: 0, y: 0, rotation: 0 }); if(window.VFX) VFX.onSummon(enemyCard, enemyCard.dataset.effect); processCardEffect("AoJogar", enemyCard, "enemy"); setTimeout(updateAuras, 100); } } }
        else if(pacote.acao === "JOGAR_EQUIPAMENTO") { const cardData = baseDeck.find(c => c.title === pacote.cardName); const slotInimigo = document.getElementById("enemy-field").children[4 - pacote.slotIndex]; if(slotInimigo && cardData) { const targetCard = slotInimigo.querySelector('.card-base'); if(targetCard) { const dummyEquip = createCard(cardData); executeEquip(dummyEquip, targetCard, "enemy"); } } }
        else if(pacote.acao === "ATACAR") { const enemySlot = document.getElementById("enemy-field").children[4 - pacote.atkSlot]; const atkCard = enemySlot ? enemySlot.querySelector('.card-base') : null; let defCard; if(pacote.targetType === "hero") defCard = document.getElementById("player-hero"); else { const mySlot = document.getElementById("player-field").children[4 - pacote.defSlot]; defCard = mySlot ? mySlot.querySelector('.card-base') : null; } if(atkCard && defCard) { resolveCombat(atkCard, defCard, false); } }
        else if(pacote.acao === "LANCAR_MAGIA") { const cardData = baseDeck.find(c => c.title === pacote.cardName); if (!cardData) return; const dummySpell = createCard(cardData); let targetElement; if (pacote.targetOwner === "enemy" && pacote.targetType === "hero") targetElement = document.getElementById("player-hero"); else if (pacote.targetOwner === "player" && pacote.targetType === "hero") targetElement = document.getElementById("enemy-hero"); else if (pacote.targetOwner === "enemy" && pacote.targetType === "card") { const slot = document.getElementById("player-field").children[4 - pacote.defSlot]; targetElement = slot.querySelector('.card-base'); } else if (pacote.targetOwner === "player" && pacote.targetType === "card") { const slot = document.getElementById("enemy-field").children[4 - pacote.defSlot]; targetElement = slot.querySelector('.card-base'); } if(targetElement) executeSpell(dummySpell, targetElement, pacote.targetOwner === "enemy" ? "player" : "enemy"); }
    });
}
window.enviarPacote = function(dados) { if(window.conexao && window.conexao.open) window.conexao.send(dados); }
window.addEventListener('DOMContentLoaded', bootTerminal);

let dialogueIndex = 0;
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

// 🧠 CÉREBRO DA IA CORRIGIDO 
async function aiDeployPhase() {
    await sleep(1000); if(gameIsOver) return;
    if (currentLevel === 2) { 
        let emptySlots = Array.from(document.getElementById("enemy-field").children).filter(s=>!s.hasChildNodes());
        let cobaiasToSpawn = Math.min(2, emptySlots.length);
        for(let i=0; i < cobaiasToSpawn; i++) {
            const cobaiaToken = { title: "Clone Instável", tipo: "tropa", raridade: "comum", custo: 0, atk: 2, def: 1, efeito: "provocar", img: "https://i.postimg.cc/wThcprKQ/Cobaia-Estagio-1.png" };
            const el = createCard(cobaiaToken); el.dataset.owner="enemy"; emptySlots[i].appendChild(el); playSound("deploy");
            gsap.set(el, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0 });
            
            // 👇 IA TAMBÉM SEM ENJOO DE INVOCAÇÃO 👇
            el.dataset.hasAttacked = "false"; 
            el.classList.remove("exhausted");
            
            if(window.VFX) VFX.onSummon(el, "provocar"); processCardEffect("AoJogar", el, "enemy"); await sleep(500);
        }
    }

    const slots = Array.from(document.getElementById("enemy-field").children).filter(s=>!s.hasChildNodes()); 
    if(slots.length > 0 && Math.random() > 0.1) { 
        let pool = []; if (currentLevel !== "casual" && campaignData[currentLevel] && campaignData[currentLevel].deckTema) { pool = baseDeck.filter(x => campaignData[currentLevel].deckTema.includes(x.title) && x.custo <= maxMana); } else { pool = baseDeck.filter(x => x.tipo !== "feitico" && x.tipo !== "equipamento" && x.custo <= maxMana); }
        if (pool.length > 0) { 
            const c = pool[Math.floor(Math.random() * pool.length)]; const el = createCard(c); el.dataset.owner="enemy"; slots[0].appendChild(el); playSound("deploy");
            gsap.set(el, { position: "absolute", top: "50%", left: "50%", xPercent: -50, yPercent: -50, scale: 0.60, margin: 0, x: 0, y: 0, rotation: 0 });
            
            // 👇 IA TAMBÉM SEM ENJOO DE INVOCAÇÃO 👇
            el.dataset.hasAttacked = "false"; 
            el.classList.remove("exhausted");
            
            if(window.VFX) VFX.onSummon(el, el.dataset.effect); processCardEffect("AoJogar", el, "enemy"); updateAuras();
        }
    } 
    await sleep(1000); 
    if (!gameIsOver) advancePhase();
}
