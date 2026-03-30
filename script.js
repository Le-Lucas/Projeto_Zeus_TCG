function handleHeroClick(event) {
    const target = event.currentTarget;
    const heroId = target.getAttribute('data-hero-id');
    const attackValue = target.getAttribute('data-attack');
    const defenderValue = target.getAttribute('data-defender');

    // Validate Defender
    if (!defenderValue) {
        console.error('Defender not specified!');
        return;
    }

    // Proceed with actions if attacker and defender are set
    if (heroId && attackValue) {
        console.log(`Hero ${heroId} is attacking with power ${attackValue} against defender ${defenderValue}.`);
        // Additional logic for combat...
    } else {
        console.error('Attack cannot proceed without hero ID and attack value.');
    }
}