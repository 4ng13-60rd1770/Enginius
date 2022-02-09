"use strict";

function imprimirMensaje(titulo, mensaje, tipoAlerta) {
  return `<div class="alert alert-${tipoAlerta}" role="alert">
            <h4 class="alert-heading">${titulo}</h4>
            <p>${mensaje}</p>
          </div>`;
}
