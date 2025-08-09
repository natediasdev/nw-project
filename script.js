/* Animação de scroll */
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.65) {
        sec.classList.add('visible');
    }
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

document.getElementById("reviewForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const rating = document.getElementById("rating").value;
  const comment = document.getElementById("comment").value;

  document.getElementById("statusMsg").textContent = "Enviando...";

// Executa reCAPTCHA v3
grecaptcha.execute("SEU_SITE_KEY", { action: "submit" }).then(function(token) {
    fetch("/.netlify/functions/addReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment, token })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
        document.getElementById("statusMsg").textContent = "Avaliação enviada com sucesso!";
        document.getElementById("reviewForm").reset();
        } else {
        document.getElementById("statusMsg").textContent = "Falha ao enviar: " + data.message;
        }
    })
    .catch(err => {
        console.error(err);
        document.getElementById("statusMsg").textContent = "Erro de conexão.";
    });
    });
});


/* Formulário de Avaliação */
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const mensagem = document.getElementById('mensagem').value;
    const status = document.getElementById('status');

    grecaptcha.ready(function() {
        grecaptcha.execute('6LdAWp8rAAAAAFRMwZyx4d3_VjGg32k2yr0wrvnF', {action: 'submit'}).then(function(token) {
            fetch('/.netlify/functions/addReview', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome, mensagem, token })
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    status.innerText = "Avaliação enviada com sucesso!";
                    status.style.color = "green";
                    document.getElementById('reviewForm').reset();
                } else {
                    status.innerText = "Falha ao enviar avaliação.";
                    status.style.color = "red";
                }
            })
            .catch(() => {
                status.innerText = "Erro de conexão.";
                status.style.color = "red";
            });
        });
    });
});
