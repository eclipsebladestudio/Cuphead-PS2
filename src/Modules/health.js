
export class Health {
  constructor(x, y) {
    this.x = x;  
    this.y = y;  

    this.currentHealth = 3; 
    this.maxHealth = 8;  
    this.dead = false; 


    this.hpImages = [
      new Image("Player/health/hp1-a.png"), 
      new Image("Player/health/hp1-b.png"), 
      new Image("Player/health/hp1-c.png"), 
      new Image("Player/health/hp2.png"),
      new Image("Player/health/hp3.png"),
      new Image("Player/health/hp4.png"),
      new Image("Player/health/hp5.png"),
      new Image("Player/health/hp6.png"),
      new Image("Player/health/hp7.png"),
      new Image("Player/health/hp8.png"),
      new Image("Player/health/dead.png"), 
    ];


    this.hp1Animation = [this.hpImages[0], this.hpImages[1], this.hpImages[2]];
    this.hp1Index = 0; 
    this.animationSpeed = 10;
    this.animationCounter = 0; 
  }


  updateHealth(health) {
    this.currentHealth = Math.max(0, Math.min(health, this.maxHealth));  
    if (this.currentHealth === 0) {
      this.dead = true;
    } else {
      this.dead = false;
    }
  }


  draw() {
    if (this.dead) {
      this.hpImages[10].draw(this.x, this.y); 
    } else {
      if (this.currentHealth === 1) {
     
        if (this.animationCounter >= this.animationSpeed) {
          this.hp1Index = (this.hp1Index + 1) % 3;  
          this.animationCounter = 0; 
        }
        this.hp1Animation[this.hp1Index].draw(this.x, this.y); 
        this.animationCounter++; 
      } else {
   
        this.hpImages[this.currentHealth].draw(this.x, this.y);
      }
    }
  }
}
