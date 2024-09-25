
export class Fade {
  constructor(image, durationInSeconds, fadeType) {
    this.image = image;
    this.duration = durationInSeconds * 1000; 
    this.fadeType = fadeType; 
    this.opacity = fadeType === 'in' ? 0 : 255; 
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
      this.opacity = Math.min(255, this.opacity + (255 * progress));
    } else {
      this.opacity = Math.max(0, this.opacity - (255 * progress));
    }

    this.image.color = Color.new(255, 255, 255, this.opacity);

    if (progress >= 1) {
      this.startTime = null; 
      this.isDrawing = false; 
    }
  }
}

export class FadeIn extends Fade {
  constructor(image, durationInSeconds) {
    super(image, durationInSeconds, 'in');
  }
}

export class FadeOut extends Fade {
  constructor(image, durationInSeconds) {
    super(image, durationInSeconds, 'out');
  }
}
