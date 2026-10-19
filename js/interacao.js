(function () {
  var menu = document.querySelector(".menu-check");

  function fecharMenu() {
    if (menu) menu.checked = false;
  }

  if (menu) {
    document.querySelectorAll(".menu a").forEach(function (link) {
      link.addEventListener("click", fecharMenu);
    });
  }

  function lightboxAberto() {
    var id = location.hash.slice(1);
    var alvo = id ? document.getElementById(id) : null;
    return alvo && alvo.classList.contains("lightbox") ? alvo : null;
  }

  function fecharLightbox() {
    if (!lightboxAberto()) return;
    location.hash = "galeria";
  }

  document.querySelectorAll(".lightbox").forEach(function (caixa) {
    caixa.addEventListener("click", function (evento) {
      if (evento.target === caixa) fecharLightbox();
    });
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key !== "Escape") return;
    if (lightboxAberto()) {
      fecharLightbox();
      return;
    }
    fecharMenu();
  });

  var radios = document.querySelectorAll(".filtro-radio");
  var cards = document.querySelectorAll(".campori-card");
  var aviso = document.querySelector(".lista-camporis .vazio");

  function aplicarFiltro() {
    if (!radios.length || !cards.length) return;

    var periodo = "todos";
    var pais = "todos";

    radios.forEach(function (radio) {
      if (!radio.checked) return;
      if (radio.name === "periodo" && radio.id.indexOf("periodo-") === 0) {
        periodo = radio.id.slice("periodo-".length);
      }
      if (radio.name === "pais" && radio.id.indexOf("pais-") === 0) {
        pais = radio.id.slice("pais-".length);
      }
    });

    var visiveis = 0;
    cards.forEach(function (card) {
      var okPeriodo = periodo === "todos" || card.getAttribute("data-periodo") === periodo;
      var okPais = pais === "todos" || (card.getAttribute("data-pais") || "").toLowerCase() === pais;
      var mostrar = okPeriodo && okPais;
      card.hidden = !mostrar;
      if (mostrar) visiveis += 1;
    });

    if (aviso) aviso.hidden = visiveis !== 0;
  }

  radios.forEach(function (radio) {
    radio.addEventListener("change", aplicarFiltro);
  });
  aplicarFiltro();
})();
