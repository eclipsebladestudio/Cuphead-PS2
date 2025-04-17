import { Boss } from "../boss.js"

export let boss = new Boss(50, 300, 120, 300, 300)

const spritesPath = "/source/assets/scenes/bosses/vegetables/"
const potatoStageIndex = boss.newStage(100)
let potatoStage = boss.stages[potatoStageIndex]

let idleStartTime = null;
let shootCount = 0;

let spitSound = Sound.load("source/assets/scenes/bosses/vegetables/sounds/veggies_Potato_Spit.adp")

let lastShootSoundTime = 0;
let deathCount = 0;
let health = 4;  // A vida do boss (inicialmente 4)

let deathStartTime = 0; // Armazena o momento em que a animação de morte começa

// Função chamada quando o boss morre
potatoStage.onDead = function() {
    if (potatoStage.currentAnimation !== "death" && potatoStage.currentAnimation !== "death_leave") {
        deathStartTime = Date.now();  // Marca o início da animação de morte
        potatoStage.setAnimation("death"); // Inicia animação de morte
    }
}

function onIntroEnd() {
    potatoStage.setAnimation("idle")
    idleStartTime = Date.now();
}

function onIdleEnd() {
    if (Date.now() - idleStartTime >= 4000) {
        if (Date.now() >= lastShootSoundTime + 150) {
            Sound.play(spitSound)
            lastShootSoundTime = Date.now();
        }
        potatoStage.setAnimation("shoot")
    }
}

function onShootEnd() {
    shootCount++

    if (shootCount < 4) {
        if (Date.now() >= lastShootSoundTime + 180) {
            Sound.play(spitSound)
            lastShootSoundTime = Date.now();
        }

        potatoStage.setAnimation("shoot")
    } else {
        potatoStage.setAnimation("idle")
        shootCount = 0;
        idleStartTime = Date.now();
    }
}

function onDeathEnd() {
    deathCount++;
    
 
    if (deathCount < 4) {
        potatoStage.setAnimation("death");
    } else {
        let currentTime = Date.now();
       
        if (currentTime - deathStartTime >= 2000) {
            potatoStage.setAnimation("death_leave");
        }
    }
}

function onDeathLeaveEnd() {
    potatoStage.freeAnimation("death");
    potatoStage.freeAnimation("death_leave");
    potatoStage.freeAnimation("intro");
    potatoStage.freeAnimation("idle");
    potatoStage.freeAnimation("shoot");
}

function checkHealth() {
    if (health <= 0) {
        potatoStage.onDead(); // Chama a função quando o boss morre
    }
}

function takeDamage() {
    if (health > 0) {
        health--;  
        checkHealth(); 
    }
}

potatoStage.newAnimation("intro", spritesPath + "potato/intro", 24, onIntroEnd, 0, -100)
potatoStage.newAnimation("idle", spritesPath + "potato/idle", 18, onIdleEnd, 0, 0, true)
potatoStage.newAnimation("shoot", spritesPath + "potato/shoot", 28, onShootEnd, -10, -13, false)
potatoStage.newAnimation("death", spritesPath + "potato/death", 30, onDeathEnd, 0, 0, true)
potatoStage.newAnimation("death_leave", spritesPath + "potato/death_leave", 30, onDeathLeaveEnd, 0, 0, false)

potatoStage.setAnimation("intro")

boss.setStage(potatoStageIndex)
