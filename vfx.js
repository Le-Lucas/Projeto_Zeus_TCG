console.log("MÓDULO VFX INICIADO: MOTOR 3D & EFEITOS DE CARTAS (TURBINADO).");

/* =========================================================
   1. SISTEMA DE EFEITOS DE CARTAS (DOM ANIMATIONS)
   ========================================================= */
const VFX = {
  /* --- UTILIDADES --- */
  pulse(el, color, scale = 1.3, time = 600) { 
    el.animate([
      { transform: "scale(1)", boxShadow: "none", zIndex: 1000 },
      { transform: `scale(${scale})`, boxShadow: `0 0 50px ${color}, 0 0 20px #fff`, zIndex: 1000 },
      { transform: "scale(1)", boxShadow: "none", zIndex: 100 }
    ], { duration: time });
  },

  particles(el, color) {
    for (let i = 0; i < 20; i++) { // Mais partículas (20)
      const p = document.createElement("div");
      p.style.position = "absolute";
      p.style.width = "12px"; // Partículas Maiores
      p.style.height = "12px";
      p.style.borderRadius = "50%";
      p.style.pointerEvents = "none";
      p.style.zIndex = "9999";
      p.style.background = color;
      p.style.boxShadow = `0 0 15px ${color}, 0 0 5px white`; // Brilho Intenso

      document.body.appendChild(p);

      const r = el.getBoundingClientRect();
      p.style.left = r.left + r.width / 2 + "px";
      p.style.top = r.top + r.height / 2 + "px";

      p.animate([
        { transform: "translate(0,0) scale(1.5)", opacity: 1 },
        {
          transform: `translate(${Math.random()*250-125}px, ${Math.random()*250-125}px) scale(0)`, // Explode mais longe
          opacity: 0
        }
      ], { duration: 1000 }); // Ficam mais tempo na tela

      setTimeout(() => p.remove(), 1000);
    }
  },

  /* --- EVENTOS DE JOGO --- */
  onSummon(card, efeito) {
    this.pulse(card, "#00ffff", 1.4, 600);
    if (efeito === "provocar") this.taunt(card);
    if (efeito === "investida") this.charge(card);
  },

  onAttack(attacker, defender, efeito) {
    // Pulo de ataque MUITO mais agressivo
    attacker.animate([
      { transform: "translateY(0) scale(1)", zIndex: 999 },
      { transform: "translateY(-60px) scale(1.2)", zIndex: 999 }, 
      { transform: "translateY(0) scale(1)", zIndex: 999 }
    ], { duration: 400 });

    setTimeout(() => this.particles(defender, "#ff0000"), 200);

    if (efeito === "atordoar") this.stun(defender);
    if (efeito === "roubo_vida") this.lifeSteal(attacker);
  },

  onDamage(target, efeito) {
    // Flash violento de dano (Vermelho/Amarelo)
    target.animate([
      { filter: "brightness(1) sepia(0)", transform: "translateX(0)" },
      { filter: "brightness(3) sepia(1) hue-rotate(-50deg) saturate(10)", transform: "translateX(-10px)" }, 
      { filter: "brightness(3) sepia(1) hue-rotate(-50deg) saturate(10)", transform: "translateX(10px)" }, 
      { filter: "brightness(1) sepia(0)", transform: "translateX(0)" }
    ], { duration: 500 });

    if (efeito === "escudo" || efeito === "escudo_divino") this.shield(target);
  },

  onKill(attacker, efeito) {
    if (efeito === "furia") this.fury(attacker);
  },

  death(card) {
    card.animate([
      { transform: "scale(1) rotate(0deg)", opacity: 1, filter: "grayscale(0)" },
      { transform: "scale(0) rotate(45deg)", opacity: 0, filter: "grayscale(1) brightness(5) blur(10px)" }
    ], { duration: 700 });
    setTimeout(() => { if(card.parentElement) card.remove(); }, 700);
  },

  /* --- EFEITOS ESPECÍFICOS --- */
  taunt(card) { card.style.outline = "3px solid red"; this.pulse(card, "red"); },
  charge(card) { this.pulse(card, "orange", 1.4); },
  stun(card) { card.style.filter = "grayscale(1) brightness(0.5)"; this.pulse(card, "#ffff00"); },
  shield(card) { this.particles(card, "#00aaff"); this.pulse(card, "#00aaff"); },
  lifeSteal(card) { this.particles(card, "#00ff66"); this.pulse(card, "#00ff66"); },
  fury(card) { this.pulse(card, "#ff0000", 1.5, 600); }
};

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
