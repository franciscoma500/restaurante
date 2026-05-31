// --- MENU MOBILE COM FILTRO DE ESTADO DINÂMICO (RESIZE OBSERVER) ---
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

function fecharMenuMobile() {
  hamburger.setAttribute("aria-expanded", "false");
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}

hamburger.addEventListener("click", () => {
  const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", !isExpanded);
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu li a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      fecharMenuMobile();
    }
  });
});

// Remove classes residuais de colisão de cor se o ecrã for esticado aberto
window.addEventListener("resize", () => {
  if (window.innerWidth > 960) {
    if (navMenu.classList.contains("active")) {
      fecharMenuMobile();
    }
  }
});

// --- HEADER SCROLL EFFECT ---
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// --- BLOQUEIO DE DATAS PASSADAS ---
window.addEventListener("DOMContentLoaded", () => {
  const dataInput = document.getElementById("data");
  if (dataInput) {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    let mes = hoje.getMonth() + 1;
    let dia = hoje.getDate();

    if (mes < 10) mes = "0" + mes;
    if (dia < 10) dia = "0" + dia;

    dataInput.min = `${ano}-${mes}-${dia}`;
  }
});

// --- SCROLL REVEAL ---
ScrollReveal().reveal(
  ".hero-content, .sobre, .section-title, .filter-buttons, .gallery-item, .reserva-box, .mapa, .contato-info",
  {
    delay: 300,
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  }
);

// --- DADOS DO CARDÁPIO ---
const cardapioItems = [
  {
    id: 1,
    categoria: "entrada",
    nome: "Bruschetta Toscana",
    preco: "3.200 Kz",
    desc: "Pão italiano tostado com tomates, manjericão e azeite.",
    img: "https://images.unsplash.com/photo-1572656631137-7935297eff55?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 2,
    categoria: "principal",
    nome: "Risoto de Funghi",
    preco: "6.800 Kz",
    desc: "Arroz arbóreo com mix de cogumelos silvestres e parmesão.",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 3,
    categoria: "sobremesa",
    nome: "Petit Gâteau",
    preco: "2.800 Kz",
    desc: "Bolo quente de chocolate com sorvete de baunilha artesanal.",
    img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 4,
    categoria: "principal",
    nome: "Salmão Grelhado",
    preco: "8.500 Kz",
    desc: "Filé de salmão com crosta de ervas e legumes salteados.",
    img: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 5,
    categoria: "entrada",
    nome: "Burrata ao Pesto",
    preco: "4.500 Kz",
    desc: "Burrata cremosa servida com pesto de manjericão e torradas.",
    img: "https://images.unsplash.com/photo-1700483540089-63307e6dbca1?auto=format&fit=crop&w=600&q=70",
  },
  {
    id: 6,
    categoria: "sobremesa",
    nome: "Tiramisù Clássico",
    preco: "3.000 Kz",
    desc: "Camadas de biscoito embebidas em café e creme mascarpone.",
    img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=70",
  },
];

const menuContainer = document.getElementById("menu-container");
const filterBtns = document.querySelectorAll(".filter-btn");

function displayMenuItems(items) {
  let displayMenu = items.map(function (item) {
    return `
      <article class="menu-card">
        <img src="${item.img}" alt="Prato do menu: ${item.nome}" loading="lazy" decoding="async">
        <div class="menu-info">
          <h3>
            ${item.nome}
            <div class="price">${item.preco}</div>
          </h3>
          <p>${item.desc}</p>
        </div>
      </article>
    `;
  }).join("");

  menuContainer.innerHTML = displayMenu;

  ScrollReveal().clean(".menu-card");
  ScrollReveal().reveal(".menu-card", {
    delay: 100,
    distance: "30px",
    origin: "bottom",
    duration: 500,
    interval: 80,
  });
}

// Filtro seguro com currentTarget
filterBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    e.currentTarget.classList.add("active");

    const categoria = e.currentTarget.dataset.filter;
    if (categoria === "todos") {
      displayMenuItems(cardapioItems);
    } else {
      const menuFiltrado = cardapioItems.filter((item) => item.categoria === categoria);
      displayMenuItems(menuFiltrado);
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  displayMenuItems(cardapioItems);
});

// --- RESERVA VIA WHATSAPP ---
document.getElementById('reservaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value;
  let zapCliente = document.getElementById('whatsapp').value;
  const dataRaw = document.getElementById('data').value; 
  const hora = document.getElementById('hora').value;
  const pessoas = document.getElementById('pessoas').value;

  zapCliente = zapCliente.replace(/\D/g, ''); 

  if (zapCliente.startsWith('244') && zapCliente.length === 12) {
    zapCliente = zapCliente.substring(3);
  }

  if (zapCliente.length !== 9 || !zapCliente.startsWith('9')) {
    alert("Por favor, introduza um número de WhatsApp válido de Angola com 9 dígitos (ex: 9xxxxxxxx).");
    return;
  }

  const dataFormatada = dataRaw.split('-').reverse().join('/');
  const numeroRestaurante = "244951414234";

  const mensagem = `Olá, gostaria de solicitar uma reserva:%0A%0A*Nome:* ${nome}%0A*Data:* ${dataFormatada}%0A*Hora:* ${hora}%0A*Pessoas:* ${pessoas}%0A*Contacto do Cliente:* +244 ${zapCliente}`;
  const url = `https://wa.me/${numeroRestaurante}?text=${mensagem}`;
  
  window.open(url, '_blank');  
});