const form = document.getElementById("leadForm");
const success = document.getElementById("success");
const resetBtn = document.getElementById("resetBtn");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());
  const leads = JSON.parse(localStorage.getItem("tecsonLeads") || "[]");

  leads.push({
    ...data,
    createdAt: new Date().toISOString()
  });

  localStorage.setItem("tecsonLeads", JSON.stringify(leads));

  form.classList.add("hidden");
  success.classList.remove("hidden");
});

resetBtn.addEventListener("click", () => {
  form.reset();
  success.classList.add("hidden");
  form.classList.remove("hidden");
});
