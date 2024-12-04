const player1 = {
    name: "Browser",
    speed: 5,
    agility: 2,
    power: 5,
    points: 0,
};

const player2 = {
    name: "Luigi",
    speed: 3,
    agility: 4,
    power: 4,
    points: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
};

async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "Straight";
            break;
        case random < 0.66:
            result = "Curve";
            break;
        default:
            result = "Confrontation";
    };

    return result
};

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`⚔  ${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
}

async function playRaceEngine(character01, character02) {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁  Rodada ${round} 🏁`);

        // draw block
        let block = await getRandomBlock();
        console.log(`🎲  Bloco: ${block}`);

        // rolls dices
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // hability check
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "Straight") {
            totalTestSkill1 = character01.speed + diceResult1;
            totalTestSkill2 = character02.speed + diceResult2;

            await logRollResult(character01.name, "Speed:", diceResult1, character01.speed);
            await logRollResult(character02.name, "Speed:", diceResult2, character02.speed);
        }
        if (block === "Curve") {
            totalTestSkill1 = character01.agility + diceResult1;
            totalTestSkill2 = character02.agility + diceResult2;

            await logRollResult(character01.name, "Agility:", diceResult1, character01.agility);
            await logRollResult(character02.name, "Agility:", diceResult2, character02.agility);
        }
        if (block === "Confrontation") {
            let powerResult1 = diceResult1 + character01.power;
            let powerResult2 = diceResult2 + character02.power;

            console.log(`${character01.name} 💥 confrontrou ${character02.name}!`)

            await logRollResult(character01.name, "Power:", diceResult1, character01.power);
            await logRollResult(character02.name, "Power:", diceResult2, character02.power);

            if (powerResult1 > powerResult2 && character02.points > 0) {
                console.log(`${character01.name} venceu o contronto! ${character02.name} perdeu um ponto!☠`);
                character02.points--;
            }

            if (powerResult2 > powerResult1 && character01.points > 0) {
                console.log(`${character02.name} venceu o contronto! ${character01.name} perdeu um ponto!☠`);
                character01.points--;
            }
            console.log(powerResult2 === powerResult1 ? "Empate!" : "");
        }

        // winner check
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${character01.name} 🏆 ganhou +1 ponto!`);
            character01.points++;
        } else if (totalTestSkill1 < totalTestSkill2) {
            console.log(`${character02.name} 🏆 ganhou +1 ponto!`);
            character02.points++;
        }

        console.log(`------------------------------------------------`);
    }
};

async function declareWinner(character01, character02) {
    console.log("Resultado final:");
    console.log(`${character01.name}: ${character01.points} pontos`);
    console.log(`${character02.name}: ${character02.points} pontos`);

    if (character01.points > character02.points)
        console.log(`\n🏆 ${character01.name} ganhou a corrida! Parabéns🎆`);
    else if (character02.points > character01.points)
        console.log(`\n🏆 ${character02.name} ganhou a corrida! Parabéns🎆`);
    else
        console.log(`\n🏆 Os jogadores empataram! Parabéns🎆`);
}

(async function main() {
    console.log(`🚦 Corrida entre ${player1.name} e ${player2.name} começando... 🏁 \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();