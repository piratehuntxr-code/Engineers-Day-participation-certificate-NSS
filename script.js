const canvas = document.getElementById("certificateCanvas");
const ctx = canvas.getContext("2d");
const nameInput = document.getElementById("name");
const downloadBtn = document.getElementById("downloadBtn");
const error = document.getElementById("error");

const certificate = new Image();
certificate.src = "certificate-template.png";

function drawCertificate() {
  if (!certificate.naturalWidth) return;

  canvas.width = certificate.naturalWidth;
  canvas.height = certificate.naturalHeight;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(certificate, 0, 0);

  const name = nameInput.value.trim();

  if (name) {
    // Position is aligned with the blank line in the supplied certificate.
    const x = 896;
    const y = 584;

    // Scale font down automatically for long names.
    let fontSize = 43;
    if (name.length > 28) fontSize = 37;
    if (name.length > 38) fontSize = 31;
    if (name.length > 48) fontSize = 27;

    ctx.save();
    ctx.font = `${fontSize}px Arial, Helvetica, sans-serif`;
    ctx.fillStyle = "#111111";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, x, y);
    ctx.restore();
  }
}

certificate.onload = drawCertificate;
nameInput.addEventListener("input", () => {
  error.textContent = "";
  drawCertificate();
});

downloadBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();

  if (!name) {
    error.textContent = "Please enter your name.";
    nameInput.focus();
    return;
  }

  drawCertificate();

  const safeName = name
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 60) || "certificate";

  const link = document.createElement("a");
  link.download = `${safeName}_certificate.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
});

nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") downloadBtn.click();
});
