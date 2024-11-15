const font = new Font("default");

os.setInterval(() => {
    Screen.clear();
    font.print(0, 0, "Teste");
    Screen.flip();
}, 0);