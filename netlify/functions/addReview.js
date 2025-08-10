// ==========================
// Configuração do Supabase
// ==========================
const SUPABASE_URL = "https://wtrmtwylvzjemupxdgem.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0cm10d3lsdnpqZW11cHhkZ2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2OTI0MjYsImV4cCI6MjA3MDI2ODQyNn0.EKot6y4HD4QR3llA6rwY4CtFQhWWixupU8FtMQvw4wA";

// ==========================
// Função para enviar avaliação ao Supabase
// ==========================
async function addReview(e) {
  e.preventDefault(); // Impede o reload da página

  // Referências aos elementos do formulário
  const nome = document.getElementById("name").value.trim();
  const comment = document.getElementById("review").value.trim();
  const ratingElement = document.querySelector('input[name="nota"]:checked');
  const rating = ratingElement ? Number(ratingElement.value) : null;

  const statusMsg = document.getElementById("status");
  statusMsg.textContent = "";
  
  // Validação antes de enviar
  if (!nome || !comment || !rating) {
    statusMsg.textContent = "Preencha seu nome, comentário e selecione uma nota.";
    return;
  }

  // Monta o objeto para enviar ao Supabase
  const payload = { nome, rating, comment };

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=representation"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Erro Supabase:", data);
      statusMsg.textContent = "Erro ao enviar avaliação. Veja o console.";
      return;
    }

    // Sucesso!
    statusMsg.textContent = "Avaliação enviada com sucesso!";
    document.getElementById("reviewForm").reset();

  } catch (error) {
    console.error("Erro de rede:", error);
    statusMsg.textContent = "Erro de rede. Tente novamente.";
  }
}

// ==========================
// Associa o evento de submit ao formulário
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("reviewForm");
  if (form) {
    form.addEventListener("submit", addReview);
  }
});
