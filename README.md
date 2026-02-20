# ⚡ PROJETO ZEUS: Protocolo de Batalha

**Projeto Zeus** é um Trading Card Game (TCG) tático de ficção científica com temática cyberpunk. Desenvolvido para rodar nativamente no navegador, o jogo combina estratégia profunda de montagem de decks, economia de recursos (Fragmentos/HDs) e um combate dinâmico com contra-ataques simultâneos.

Desenvolvido por **Leandro**.

---

## 🎮 Funcionalidades Principais

* **Deck Builder Dinâmico:** Monte seu esquadrão ideal de 15 cartas escolhendo entre Tropas, Mecanizados, Feitiços e Estruturas. Filtre sua coleção por Custo de RAM, Raridade ou Tipo.
* **Mercado Negro:** Um sistema de economia in-game onde o jogador pode comprar pacotes/cartas avulsas ou vender cópias repetidas em troca de "Fragmentos" (💽).
* **Motor Gráfico (VFX Engine):** Imersão total com um fundo 3D renderizado em WebGL (Three.js) simulando uma "Chuva de Dados", além de um sistema robusto de partículas nativas (Web Animations API) para impactos, curas e explosões.
* **Sistema de Magias Inteligente:** Feitiços não ocupam espaço no tabuleiro. O jogador clica na magia em sua mão e, em seguida, seleciona o alvo no campo (seja para obliterar inimigos ou curar aliados).
* **Mecânica de Sacrifício (Override):** Tabuleiro cheio? Sem problemas. Arraste uma carta nova sobre uma antiga para desintegrá-la, ativando seus efeitos de "Último Suspiro" e assumindo a posição.
* **Modos de Jogo:**
  * **Campanha:** Enfrente chefes com mecânicas únicas em diferentes setores do complexo cibernético (Ex: Biolab, Torre Zeus).
  * **Simulação (Casual):** Partidas rápidas contra a IA para testar novos decks.

---

## 🛠️ Tecnologias Utilizadas (Tech Stack)

O Projeto Zeus foi construído para ser leve, rápido e sem necessidade de servidores complexos na nuvem para a lógica base:
* **HTML5 & CSS3:** Estrutura semântica e estilização holográfica/neon (Filtros, degradês, responsividade).
* **JavaScript (Vanilla):** Toda a lógica de turnos, IA inimiga, cálculos de dano e manipulação do DOM.
* **Three.js (WebGL):** Responsável por renderizar a arena 3D e as cartas translúcidas rodando a 60 FPS em segundo plano.
* **Web Animations API:** Usada para o "Game Juice" — pulos de ataque, flashes de dano, partículas e tremores de tela sem pesar o processamento.

---

## 🧬 Dicionário de Palavras-Chave (Keywords)

As batalhas no ciberespaço são decididas pelo uso tático de habilidades especiais:
* **Provocar (🛡️):** Inimigos são obrigados a atacar esta unidade primeiro.
* **Investida:** A carta pode atacar no mesmo turno em que foi colocada em campo.
* **Escudo Divino (🔰):** Ignora a primeira instância de dano recebida (seja de combate ou feitiço).
* **Roubo de Vida:** Todo dano causado por esta carta cura o seu Operador (Herói).
* **Fúria:** Se esta unidade destruir uma tropa inimiga no combate, ela pode atacar novamente no mesmo turno.
* **Furtividade (💨):** A carta não pode ser alvo de feitiços inimigos.
* **Atordoar:** Paralisa um alvo inimigo, impedindo-o de atacar no próximo turno.
* **Último Suspiro:** Um efeito disparado no exato momento em que a carta é destruída ou sacrificada.

---

## 🚀 Como Jogar

1. **Acesso:** Não é necessário instalar nada. Basta acessar a página do projeto hospedada no GitHub Pages.
2. **Setup:** Escolha seu Herói/Operador (Aggro, Controle ou Cura).
3. **Mão Inicial:** Você começa com 3 de RAM (Mana) e compra cartas do seu deck a cada turno.
4. **Deploy (Invocação):** Arraste as tropas da sua mão para o tabuleiro aliado.
5. **Combate:** Clique na sua tropa e depois no alvo inimigo. **Cuidado:** O combate é simultâneo; o atacante também recebe o dano correspondente à Defesa do alvo!
6. **Vitória:** Reduza a Vida (HP) do General inimigo a zero antes que ele zere a sua.

> *"A perfeição evolutiva é o fim da humanidade. Bem-vindo ao Projeto Zeus."*
