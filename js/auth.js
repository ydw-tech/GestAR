document.getElementById("loginBtn").addEventListener("click", () => {
  const name = document.getElementById("username").value.trim();
  if(name) {
    localStorage.setItem("user", name);
    localStorage.setItem("progress", JSON.stringify({}));
    window.location.href = "profile.html";
  } else {
    alert("Ingresa tu nombre");
  }
});

document.getElementById("guestBtn").addEventListener("click", () => {
  localStorage.setItem("user", "Invitado");
  localStorage.setItem("progress", JSON.stringify({}));
  window.location.href = "profile.html";
});
