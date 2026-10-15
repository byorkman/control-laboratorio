import { MEDICACIONES, UMBRALES } from "./controles.js";
import { estudiosBasales, evaluar } from "./control.js";

const contMeds = document.getElementById("medicaciones");
const plan = document.getElementById("plan");
const labs = document.getElementById("labs");
const alertas = document.getElementById("alertas");

contMeds.innerHTML = MEDICACIONES.map((m) => `
  <label><input type="checkbox" value="${m.id}"> ${m.nombre}</label>`).join("");

const campos = [
  ...UMBRALES.map((u) => ({ id: u.id, nombre: u.nombre, unidad: u.unidad })),
  { id: "creatinina", nombre: "Creatinina", unidad: "mg/dL" },
  { id: "creatininaBasal", nombre: "Creatinina basal", unidad: "mg/dL" },
];
labs.innerHTML = campos.map((c) => `
  <div class="campo">
    <label for="${c.id}">${c.nombre} <span class="rango">${c.unidad}</span></label>
    <input type="number" id="${c.id}" inputmode="decimal" min="0" step="any">
  </div>`).join("");

const lista = (items) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

function actualizarPlan() {
  const ids = [...contMeds.querySelectorAll("input:checked")].map((i) => i.value);
  if (!ids.length) {
    plan.innerHTML = `<p class="pendiente">Seleccionar una o más medicaciones para ver los controles.</p>`;
    return;
  }
  const meds = MEDICACIONES.filter((m) => ids.includes(m.id));
  plan.innerHTML = `
    <div class="tarjeta">
      <h3>Antes de empezar</h3>
      ${lista(estudiosBasales(ids))}
    </div>
    ${meds.map((m) => `
      <div class="tarjeta">
        <h3>${m.nombre}</h3>
        ${m.seguimiento.map((s) => `<div class="cuando">${s.cuando}</div>${lista(s.estudios)}`).join("")}
        ${m.notas ? `<p class="nota">${m.notas}</p>` : ""}
        <p class="fuente">Fuente: ${m.fuente}</p>
      </div>`).join("")}`;
}

function actualizarAlertas() {
  const valores = {};
  for (const c of campos) {
    const v = document.getElementById(c.id).value.trim();
    valores[c.id] = v === "" ? null : Number(v);
  }
  const cargados = Object.values(valores).some((v) => v !== null);
  const r = evaluar(valores);
  if (!cargados) {
    alertas.innerHTML = "";
  } else if (!r.length) {
    alertas.innerHTML = `<p class="ok">Ningún valor fuera de los umbrales.</p>`;
  } else {
    alertas.innerHTML = r.map((a) => `
      <div class="alerta ${a.nivel}">
        <strong>${a.nombre}: ${a.valor.toLocaleString("es-AR")} ${a.unidad}</strong> (${a.mensaje})
      </div>`).join("");
  }
}

contMeds.addEventListener("change", actualizarPlan);
labs.addEventListener("input", actualizarAlertas);
actualizarPlan();
