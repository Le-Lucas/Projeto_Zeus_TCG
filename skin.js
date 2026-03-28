// =========================================================
// 🎨 BANCO DE DADOS DE SKINS (skins.js)
// =========================================================

const catalogoSkins = [
    { id: "skin-padrao", nome: "Chassi OMNI-BIO", tipo: "Padrão Corporativo", preco: 0, corPreview: "#00ffff" },
    { id: "skin-hacker", nome: "Terminal Matrix", tipo: "Borda Fosforescente", preco: 300, corPreview: "#00ff00" },
    { id: "skin-sangue", nome: "Alerta Crítico", tipo: "Neon Agressivo", preco: 500, corPreview: "#ff0055" },
    { id: "skin-ouro", nome: "Acesso Executivo", tipo: "Placa de Ouro e Ônix", preco: 1500, corPreview: "#ffcc00" },
    { id: "skin-vortex", nome: "Acesso Executivo", tipo: "Neon rox animado", preco: 1500, corPreview: "#bc13fe" },
    { id: "skin-toxic", nome: "Acesso Executivo", tipo: " Bordas verdes animado", preco: 1500, corPreview: "#7FFFD4" }
    
];  

// ⚡ CARREGA A MEMÓRIA DO NAVEGADOR
let skinsCompradas = localStorage.getItem("zeusSkinsInventario") ? JSON.parse(localStorage.getItem("zeusSkinsInventario")) : ["skin-padrao"];
let skinAtiva = localStorage.getItem("zeusSkinAtiva") || "skin-padrao";
