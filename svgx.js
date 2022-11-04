function game() {
  const width = 400,
    height = 300,
    nShapes = 80,
    timeLimit = 15,
    gameboard = document.getElementById("gameboard"),
    timer = document.getElementById("timer"),
    scoreboard = document.getElementById("scoreboard"),
    svgNS = gameboard.namespaceURI;

  let score = 0;

  //init
  gameboard.setAttribute("viewBox", [0, 0, width, height]);
  for (let i = 0; i < nShapes; i++) {
    // const circle = document.createElementNS(svgNS, "circle");
    // circle.setAttribute("class", "clickable");
    // circle.setAttribute("r", 8);
    // circle.setAttribute("fill", randomColor());
    // circle.setAttribute("cx", Math.random() * width);
    // circle.setAttribute("cy", Math.random() * height);
    // gameboard.appendChild(circle);
    var use = document.createElementNS(svgNS, "use");
    use.setAttribute("class", "clickable");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#gem");
    use.setAttribute("fill", randomColor());
    use.setAttribute("x", Math.random() * width);
    use.setAttribute("y", Math.random() * height);
    gameboard.appendChild(use);
  }

  const endTime = Date.now() + timeLimit * 1000;
  updateTime();
  const timeInterval = setInterval(updateTime, 100);
  updateScore();
  gameboard.addEventListener("click", checkClick);

  function randomColor() {
    const hue = Math.random() * 360,
      sat = Math.random() * 50,
      light = Math.random() * 30;
    return "hsl(" + hue + "," + sat + "%," + light + "%)";
  }

  function updateTime() {
    let timeLeft = endTime - Date.now();
    if (timeLeft <= 0) {
      endGame();
      timeLeft = 0;
    }
    timer.textContent = (timeLeft / 1000).toFixed(0);
  }

  function updateScore() {
    scoreboard.textContent = score.toFixed(0);
  }

  function endGame() {
    clearInterval(timeInterval);
    gameboard.removeEventListener("click", checkClick);
    document.documentElement.setAttribute("class", "game-over");
  }

  function checkClick(e) {
    const element =  e.target.correspondingUseElement || e.target;
    if (element.getAttribute("class") === "clickable") {
      element.setAttribute("class", "clicked");
      score++;
      updateScore();
    }
  }
}

game();
