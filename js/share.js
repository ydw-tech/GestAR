document.getElementById("sendRec").addEventListener("click", () => {
  const text = document.getElementById("recommendation").value.trim();
  if(text) alert("Gracias por tu recomendación!");
  else alert("Escribe algo primero.");
});

document.getElementById("copyLink").addEventListener("click", () => {
  const link = window.location.href;
  document.getElementById("shareLink").value = link;
  navigator.clipboard.writeText(link);
  alert("Link copiado!");
});
