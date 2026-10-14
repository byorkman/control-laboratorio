import { MEDICACIONES, UMBRALES, CREATININA_AUMENTO } from "./controles.js";

// Junta los estudios basales de varias medicaciones sin repetir.
export function estudiosBasales(ids) {
  const vistos = new Set();
  const resultado = [];
  for (const m of MEDICACIONES.filter((m) => ids.includes(m.id))) {
    for (const e of m.basal) {
      if (!vistos.has(e)) {
        vistos.add(e);
        resultado.push(e);
      }
    }
  }
  return resultado;
}

// valores: { leucocitos, neutrofilos, ..., creatinina, creatininaBasal }
// Devuelve la lista de alertas { nombre, valor, mensaje, nivel }.
export function evaluar(valores) {
  const alertas = [];
  for (const u of UMBRALES) {
    const v = valores[u.id];
    if (v === null || v === undefined || Number.isNaN(v)) continue;
    if (u.critico !== undefined && v < u.critico) {
      alertas.push({ nombre: u.nombre, valor: v, unidad: u.unidad, nivel: "critico", mensaje: `menor a ${u.critico.toLocaleString("es-AR")}` });
    } else if (u.bajo !== undefined && v < u.bajo) {
      alertas.push({ nombre: u.nombre, valor: v, unidad: u.unidad, nivel: "alerta", mensaje: `menor a ${u.bajo.toLocaleString("es-AR")}` });
    } else if (u.alto !== undefined && v > u.alto) {
      alertas.push({ nombre: u.nombre, valor: v, unidad: u.unidad, nivel: "alerta", mensaje: `mayor a ${u.alto.toLocaleString("es-AR")}` });
    }
  }
  const { creatinina, creatininaBasal } = valores;
  if (creatinina > 0 && creatininaBasal > 0) {
    const aumento = (creatinina - creatininaBasal) / creatininaBasal;
    if (aumento > CREATININA_AUMENTO) {
      alertas.push({
        nombre: "Creatinina",
        valor: creatinina,
        unidad: "mg/dL",
        nivel: "alerta",
        mensaje: `subió ${Math.round(aumento * 100)} % respecto del basal`,
      });
    }
  }
  return alertas;
}
