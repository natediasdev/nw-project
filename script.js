/* Animação de scroll */
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.65) {
        sec.classList.add('visible');
    }
    });
});

/* Menu hamburguer */

const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
const menuLinks = navMenu.querySelectorAll('#nav-menu a'); // Pega todos os links do menu

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('is-active');
    navMenu.classList.toggle('active');
});

// Fecha ao clicar em qualquer link
 menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      menuBtn.classList.remove('is-active');
      navMenu.classList.remove('active');
    });
  });

/* Enviar mensagem por Whatsapp */
function enviarWhatsapp() {
const nome = document.getElementById("nome").value;
const empresa = document.getElementById("empresa").value;
const descricao = document.getElementById("descricao").value;

const mensagem = `Olá, me chamo ${nome} da empresa ${empresa}. Estou interessado nos serviços da N&W Vidros e Vitrines. Minha necessidade é: ${descricao}`;
const url = `https://wa.me/+5521967792123?text=${encodeURIComponent(mensagem)}`;

window.open(url, '_blank');
}

// Formulário de avaliação
/* === CONFIGURE AQUI === */
const SUPABASE_URL = "https://wtrmtwylvzjemupxdgem.supabase.co"; // exemplo do seu projeto
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0cm10d3lsdnpqZW11cHhkZ2VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2OTI0MjYsImV4cCI6MjA3MDI2ODQyNn0.EKot6y4HD4QR3llA6rwY4CtFQhWWixupU8FtMQvw4wA";
/* ======================= */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reviewForm');
  const submitBtn = document.getElementById('submitReview');
  const msg = document.getElementById('status');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = '';
    submitBtn.disabled = true;

    const nome = document.getElementById('name').value.trim();
    const comentario = document.getElementById('review').value.trim();
    // pega a nota selecionada
    const notaEl = form.querySelector('input[name="nota"]:checked');
    const nota = notaEl ? Number(notaEl.value) : 1;

    if (!nome || !comentario) {
      msg.textContent = 'Preencha nome e comentário.';
      submitBtn.disabled = false;
      return;
    }

    // payload - ajusta nomes de campo conforme sua tabela
    const payload = { nome, rating, comment };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=representation' // retorna o registro criado
        },
        body: JSON.stringify(payload)
      });

      const body = await res.json();

      if (!res.ok) {
        console.error('Supabase error', body);
        msg.textContent = 'Erro ao enviar avaliação. Veja o console.';
        submitBtn.disabled = false;
        return;
      }

      // sucesso
      msg.textContent = 'Avaliação enviada! Obrigado.';
      form.reset();
      // opcional: fechar modal ou rolar até o topo do formulário
      window.scrollTo({ top: form.offsetTop - 40, behavior: 'smooth' });

      // você pode também recarregar lista de avaliações aqui (se tiver)
    } catch (err) {
      console.error(err);
      msg.textContent = 'Erro de rede. Tente novamente.';
    } finally {
      submitBtn.disabled = false;
    }
  });
});