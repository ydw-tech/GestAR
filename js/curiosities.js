const curiosities = [
  "Existen más de 300 lenguas de señas en el mundo.",
  "Cada persona sorda puede tener su propia seña personal.",
  "Las lenguas de señas cambian con la cultura y la sociedad."
];

let index = 0;
const display = document.getElementById("curiosity");

function showCuriosity() {
  display.textContent = curiosities[index];
  index = (index + 1) % curiosities.length;
}

showCuriosity();
setInterval(showCuriosity, 5000);
