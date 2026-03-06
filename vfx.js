console.log("MÓDULO VFX INICIADO: MOTOR 3D & EFEITOS DE CARTAS (V9.0 - UNIFICADO).");

/* =========================================================
   1. SISTEMA DE EFEITOS DE CARTAS (DOM ANIMATIONS & HUD)
   ========================================================= */
const VFX = {
  /* --- EFEITO DE BUFF HOLO (NOVO) --- */
  showBuff(cardEl, textStr, color = "#00f3ff") {
      if (!cardEl) return;

      const hud = document.createElement("div");
      hud.className = "card-hud-overlay";
      
      const frame = document.createElement("div");
      frame.className = "tech-frame ui-active";
      if(color !== "#00f3ff") {
          frame.style.borderColor = color;
          frame.style.boxShadow = `inset 0 0 20px ${color}`;
      }
      
      const text = document.createElement("div");
      text.className = "buff-float-text";
      text.style.color = color;
      text.style.textShadow = `0 0 10px ${color}, 0 0 20px #000`;
      text.innerText = textStr;

      hud.appendChild(frame);
      hud.appendChild(text);
      cardEl.appendChild(hud);

      gsap.to(text, {
          opacity: 1, y: -60, scale: 1.2, duration: 0.6, ease: "back.out(2)",
          onStart: () => { this.triggerTechBits(cardEl, color); },
          onComplete: () => {
              gsap.to(text, { opacity: 0, y: -100, duration: 0.4, delay: 0.3 });
              frame.classList.remove('ui-active');
              setTimeout(() => hud.remove(), 800);
          }
      });
  },

  /* --- EXPLOSÃO DE BITS (NOVO) --- */
  triggerTechBits(cardEl, color = "#00f3ff", count = 15) {
      if (!cardEl) return;
      const rect = cardEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      for (let i = 0; i < count; i++) {
          const p = document.createElement("div");
          p.className = "tech-bit-particle";
          p.style.backgroundColor = color;
          p.style.boxShadow = `0 0 10px ${color}, 0 0 5px white`;
          p.style.left = centerX + "px";
          p.style.top = centerY + "px";
          if(Math.random() > 0.5) p.style.borderRadius = "50%";
          document.body.appendChild(p);

          const angle = (i / count) * Math.PI * 2;
          const distance = Math.random() * 100 + 50;

          gsap.to(p, {
              x: Math.cos(angle) * distance, y: Math.sin(angle) * distance,
              rotation: Math.random() * 360, opacity: 0,
              duration: Math.random() * 0.6 + 0.4, ease: "expo.out",
              onComplete: () => p.remove()
          });
      }
  },

 /* --- UTILIDADES CLÁSSICAS --- */
  pulse(el, color, scale = 1.3, time = 600) { 
    if (!el) return;
    // Removido o transform para não quebrar a âncora do slot! Usamos apenas o GSAP para o brilho.
    gsap.fromTo(el, 
        { boxShadow: "none" }, 
        { boxShadow: `0 0 50px ${color}, 0 0 20px #fff`, duration: time / 2000, yoyo: true, repeat: 1 }
    );
  },

  particles(el, color) {
    if (!el) return;
    this.triggerTechBits(el, color, 12); 
  },

  /* --- EVENTOS DE JOGO --- */
  onSummon(card, efeito) {
    this.pulse(card, "#00ffff", 1.4, 600);
    this.showBuff(card, "DEPLOY", "#00ff00");
    if (efeito === "provocar") { card.style.outline = "3px solid red"; }
  },

 onAttack(attacker, defender, efeito) {
    // 👇 PROTEÇÃO BLINDADA: Se não tiver efeito, assume que é vazio ("") e não crasha!
    let ef = efeito || ""; 

    gsap.fromTo(defender, 
      { x: -8, rotation: -2 }, 
      { x: 8, rotation: 2, duration: 0.05, repeat: 5, yoyo: true, onComplete: () => { gsap.to(defender, {x: 0, rotation: 0, duration: 0.1}); } }
    );
    this.triggerTechBits(defender, "#ff0000", 20);

    if (ef.includes("atordoar")) this.showBuff(defender, "CORROMPIDO", "#ffff00");
    if (ef.includes("roubo_vida")) this.showBuff(attacker, "HP ABSORVIDO", "#00ff66");
  },

  onDamage(target, efeito) {
    let ef = efeito || ""; // Proteção também no dano

    gsap.fromTo(target, 
      { filter: "brightness(3) sepia(1) hue-rotate(-50deg) saturate(10)", x: -10 }, 
      { filter: "brightness(1) sepia(0)", x: 0, duration: 0.3, onComplete: () => { gsap.to(target, {x: 0, duration: 0.1, clearProps: "filter"}); } }
    );
    this.triggerTechBits(target, "#ff3333", 10);
  },
    );
    this.triggerTechBits(target, "#ff3333", 10);
  },

  shield(card) { 
      this.showBuff(card, "ESCUDO DESTRUÍDO", "#ffffff"); 
  },
  
  fury(card) { 
      this.showBuff(card, "FÚRIA ATIVADA!", "#ff3300"); 
  },

  stun(card) {
      this.showBuff(card, "SISTEMA CORROMPIDO", "#ff00ff");
  },

  // NOVA MORTE EM GLITCH
  death(card) {
    card.style.zIndex = "9000";
    const tl = gsap.timeline();
    tl.to(card, { opacity: 0.5, x: "+=5", duration: 0.05, repeat: 5, yoyo: true })
      .to(card, {
          scaleX: 0.1, scaleY: 1.5, opacity: 1, duration: 0.2, ease: "power2.in",
          onStart: () => { this.triggerTechBits(card, "#ff0000", 25); }
      })
      .to(card, { scaleX: 0, scaleY: 0, opacity: 0, duration: 0.1, onComplete: () => { if(card.parentElement) card.remove(); } });
  },
  /* --- DICIONÁRIO DE CORES DO DIRETOR --- */
  TRAIL_COLORS: {
      "automato": "#00f3ff",   // Ciano Neon
      "mecanizado": "#00f3ff", 
      "ciborgue": "#00f3ff",
      "drone": "#00f3ff",
      "humano": "#ffcc00",     // Amarelo Gold
      "soldado": "#ffcc00",
      "tropa": "#880000",      // Vermelho Sangue (Mutantes/Feras)
      "mutacao": "#880000",
      "default": "#ffffff"     // Branco padrão
  },

 /* --- DICIONÁRIO DE CORES DO DIRETOR --- */
  TRAIL_COLORS: {
      "automato": "#00f3ff",   // Ciano Neon
      "mecanizado": "#00f3ff", 
      "ciborgue": "#00f3ff",
      "drone": "#00f3ff",
      "humano": "#ffcc00",     // Amarelo Gold
      "soldado": "#ffcc00",
      "tropa": "#880000",      // Vermelho Sangue (Mutantes/Feras)
      "mutacao": "#880000",
      "default": "#ffffff"     // Branco padrão
  },

  /* --- RASTRO DE VELOCIDADE (FANTASMA HOLO BASEADO EM CLASSE) --- */
  createTrail(cardEl) {
      if (!cardEl) return;
      const rect = cardEl.getBoundingClientRect();
      const ghost = document.createElement("div");
      
      // Pega a raça da carta (O tipo está salvo no dataset.raca)
      const tipo = cardEl.dataset.raca || "default";
      const color = this.TRAIL_COLORS[tipo] || this.TRAIL_COLORS["default"];
      
      ghost.style.position = "fixed";
      ghost.style.left = rect.left + "px";
      ghost.style.top = rect.top + "px";
      ghost.style.width = rect.width + "px";
      ghost.style.height = rect.height + "px";
      ghost.style.borderRadius = "8px";
      ghost.style.pointerEvents = "none";
      ghost.style.zIndex = "90";
      
      // O seu AdditiveBlending traduzido para CSS (mixBlendMode: screen)
      ghost.style.boxShadow = `0 0 20px ${color}, inset 0 0 20px ${color}`;
      ghost.style.border = `2px solid ${color}`;
      ghost.style.background = "rgba(0, 0, 0, 0.5)";
      ghost.style.mixBlendMode = "screen"; 
      
      document.body.appendChild(ghost);

      // A sua animação exata do GSAP (0.4s e Scale 0.8)
      gsap.to(ghost, {
          opacity: 0,
          scale: 0.8, 
          duration: 0.4,
          ease: "power1.out",
          onComplete: () => ghost.remove()
      });
  }
}; // <-- FIM DO OBJETO VFX (Mantenha o resto do arquivo intocado abaixo disto)
 


window.VFX = VFX; 

/* =========================================================
   2. VISUAL FX ENGINE (THREE.JS - CHUVA DE DADOS CYBERPUNK)
   ========================================================= */
const canvas = document.getElementById('bg-canvas');
if (canvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const cardGeometry = new THREE.PlaneGeometry(3, 4.5);
    const dataCards = [];
    const colors = [0x00ffff, 0xff00ff, 0xff0000]; 

    for (let i = 0; i < 50; i++) {
        const material = new THREE.MeshBasicMaterial({ color: colors[Math.floor(Math.random() * colors.length)], transparent: true, opacity: Math.random() * 0.3 + 0.1, wireframe: true, side: THREE.DoubleSide });
        const card = new THREE.Mesh(cardGeometry, material);
        card.position.set((Math.random() - 0.5) * 80, (Math.random() - 0.5) * 80, Math.random() * -100);
        card.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        card.userData = { rotSpeedX: (Math.random() - 0.5) * 0.02, rotSpeedY: (Math.random() - 0.5) * 0.02, speedZ: Math.random() * 0.2 + 0.1 };
        scene.add(card);
        dataCards.push(card);
    }

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => { mouseX = (e.clientX - window.innerWidth / 2) / 10; mouseY = (e.clientY - window.innerHeight / 2) / 10; });

    window.addEventListener('resize', () => { camera.aspect = window.innerWidth / window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight); });

    function animateVFX() {
        requestAnimationFrame(animateVFX);
        dataCards.forEach(card => {
            card.position.z += card.userData.speedZ;
            card.rotation.x += card.userData.rotSpeedX; card.rotation.y += card.userData.rotSpeedY;
            if (card.position.z > 35) { card.position.z = -100; card.position.x = (Math.random() - 0.5) * 80; card.position.y = (Math.random() - 0.5) * 80; }
        });
        camera.position.x += (mouseX * 0.05 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.05 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    animateVFX();
}

/* =========================================================
   3. VFX ENGINE: PARTÍCULAS DINÂMICAS (AVATARES)
   ========================================================= */
let avatarAnimationFrame = null; 

function initAvatarParticles() {
    if (avatarAnimationFrame) {
        cancelAnimationFrame(avatarAnimationFrame);
        avatarAnimationFrame = null;
    }

    const frames = document.querySelectorAll(".hero-avatar-frame");
    if (frames.length === 0) return;

    const particleSystems = [];

    frames.forEach(frame => {
        const canvas = frame.querySelector("canvas");
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        const size = frame.offsetWidth || 80;
        canvas.width = size;
        canvas.height = size;

        const particles = [];
        for (let i = 0; i < 18; i++) { 
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.8 + 0.5,
                speed: Math.random() * 0.4 + 0.1,
                alpha: Math.random() * 0.7 + 0.3
            });
        }
        particleSystems.push({ ctx, canvas, particles });
    });

    function animate() {
        avatarAnimationFrame = requestAnimationFrame(animate);
        const themeRgb = getComputedStyle(document.body).getPropertyValue('--theme-rgb').trim() || "0, 255, 255";

        particleSystems.forEach(sys => {
            sys.ctx.clearRect(0, 0, sys.canvas.width, sys.canvas.height);

            sys.particles.forEach(p => {
                p.y -= p.speed;
                if (p.y < 0) p.y = sys.canvas.height;
                sys.ctx.beginPath();
                sys.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                sys.ctx.fillStyle = `rgba(${themeRgb}, ${p.alpha})`; 
                sys.ctx.fill();
            });
        });
    }
    
    animate(); 
}

window.initAvatarParticles = initAvatarParticles;
