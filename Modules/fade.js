export class Fade {
  constructor(image, durationInSeconds, fadeType, maxOpacity = 255) {
    this.image = image;
    this.duration = durationInSeconds * 1000; 
    this.fadeType = fadeType; 
    this.maxOpacity = maxOpacity; 
    this.opacity = fadeType === 'in' ? 0 : maxOpacity; 
    this.startTime = null;
    this.isDrawing = false; 
  }

  play() {
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

    this.image.color = Color.new(200, 200, 200, this.opacity);

    this.image.draw(0, 0); 

    if (progress >= 1) {
      this.isDrawing = false; 
    }
  }
}

export class FadeIn extends Fade {
  constructor(image, durationInSeconds, maxOpacity) {
    super(image, durationInSeconds, 'in', maxOpacity);
  }
}

export class FadeOut extends Fade {
  constructor(image, durationInSeconds, maxOpacity) {
    super(image, durationInSeconds, 'out', maxOpacity);
  }
}
