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

    // Exact center of the horizontal line in the certificate
    const x = 1267;
    const y = 838;

    let fontSize = 52;

    if (name.length > 28) fontSize = 46;
    if (name.length > 38) fontSize = 40;
    if (name.length > 48) fontSize = 35;

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

  canvas.toBlob((blob) => {

    if (!blob) {
      error.textContent = "Could not create certificate.";
      return;
    }

    const imageURL = URL.createObjectURL(blob);

    const newTab = window.open(imageURL, "_blank");

    if (!newTab) {
      window.location.href = imageURL;
    }

  }, "image/png");
});

nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    downloadBtn.click();
  }
});
