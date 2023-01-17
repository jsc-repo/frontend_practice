const progressBar = document.getElementById("progressBar");

for (let i = 0; i <= 100; i++) {
  progressBar.style.width = `${i}%`;
  progressBar.innerHTML = `${i}%`;
}
