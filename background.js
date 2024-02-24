function setRandomBackground() {
  const randomNumber = Math.floor(Math.random() * 8) + 1;
  document.body.style.backgroundImage = `url('background${randomNumber}.jpg')`;
}
