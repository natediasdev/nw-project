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