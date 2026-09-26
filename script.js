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
    const response = await fetch("https://hook.us2.make.com/878ozvlxz15bymo8fmkd54xtn2o7sd7g", {
      method: "POST",
      body: payload
    });

    if (!response.ok) {
      throw new Error("Submission failed");
    }

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
