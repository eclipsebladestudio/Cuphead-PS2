images = Array.from({ length: 25 }, (_, i) => {
  const img = new Image(`Assets/StoryBook/Page 01-02/${i + 1}.png`);
  img.width = 640;
  img.height = 448;
  return img;
});

i = 0;
lastIndex = images.length - 1;

os.setInterval(() => {
  Screen.clear();
  images[i].draw(0, 0);
  Screen.flip();
  
  if (i === lastIndex) {
  } else {
    i = (i + 1) % images.length;
  }
}, 5, 0);