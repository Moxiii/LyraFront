export default function loginUser(user) {
  fetch("http://localhost:8033/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  }).then(() => {
    console.log("Utilisateur connecté");
  });
}
