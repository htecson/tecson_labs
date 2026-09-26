const form = document.getElementById("leadForm");
const success = document.getElementById("success");
const resetBtn = document.getElementById("resetBtn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.innerHTML;

  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  const data = Object.fromEntries(new FormData(form).entries());

  const payload = new URLSearchParams({
    ...data,
    submittedAt: new Date().toISOString(),
    source: "Tecson Labs Website"
  });

  try {
    await fetch("https://hook.us2.make.com/55dtnfg61vldhc7v1wgru9iwi19iqj5y", {
      method: "POST",
      mode: "no-cors",
      body: payload
    });

    form.classList.add("hidden");
    success.classList.remove("hidden");
  } catch (error) {
    alert("Something went wrong while sending your inquiry. Please try again.");
    console.error(error);
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = originalText;
  }
});

resetBtn.addEventListener("click", () => {
  form.reset();
  success.classList.add("hidden");
  form.classList.remove("hidden");
});
