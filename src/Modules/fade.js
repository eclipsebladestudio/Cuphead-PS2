export class Fade {
  constructor(target, durationInSeconds, fadeType, maxOpacity = 255, repeat = false) {
    this.target = target;
    this.duration = durationInSeconds * 1000;
    this.fadeType = fadeType;
    this.maxOpacity = maxOpacity;
    this.opacity = fadeType === 'in' ? 0 : maxOpacity;
    this.startTime = null;
    this.isDrawing = false;
    this.hasPlayed = false;  
    this.repeat = repeat; 
  }

  play() {
    if (!this.hasPlayed || this.repeat) {  
      if (!this.isDrawing) {
        this.isDrawing = true;
        this.startTime = Date.now();
      }

      const elapsed = Date.now() - this.startTime;
      const progress = Math.min(elapsed / this.duration, 1);

      if (this.fadeType === 'in') {
        this.opacity = this.maxOpacity * progress;
      } else {
        this.opacity = this.maxOpacity * (1 - progress);
      }

      if (this.target === 'screen') {
        Draw.rect(0, 0, 640, 448, Color.new(0, 0, 0, this.opacity));
      } else {
        this.target.color = Color.new(200, 200, 200, this.opacity);
        this.target.draw(0, 0);
      }

      if (progress >= 1) {
        this.isDrawing = false;
        this.hasPlayed = true; 
      }
    }
  }

  reset() {
    
    this.hasPlayed = false;
    this.isDrawing = false;
  }
}

export class FadeIn extends Fade {
  constructor(target, durationInSeconds, maxOpacity, repeat = false) {
    super(target, durationInSeconds, 'in', maxOpacity, repeat);
  }
}

export class FadeOut extends Fade {
  constructor(target, durationInSeconds, maxOpacity, repeat = false) {
    super(target, durationInSeconds, 'out', maxOpacity, repeat);
  }
}

