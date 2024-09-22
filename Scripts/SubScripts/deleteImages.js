console.log("deleteImages Loaded!!!");
function deleteImages() {
    FX2.forEach(image => image = null);
    FX2.length = 0;
    transitionbImages.forEach(image => image = null);
    transitionbImages.length = 0;
    if (typeof std.gc === 'function') {
      std.gc();
    }
  }