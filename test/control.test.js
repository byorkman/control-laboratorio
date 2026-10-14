import { test } from "node:test";
import assert from "node:assert/strict";
import { MEDICACIONES } from "../src/controles.js";
import { estudiosBasales, evaluar } from "../src/control.js";

test("cada medicación tiene estudios basales, seguimiento y fuente", () => {
  for (const m of MEDICACIONES) {
    assert.ok(m.basal.length, m.id);
    assert.ok(m.seguimiento.length, m.id);
    assert.ok(m.fuente, m.id);
  }
});

test("los estudios basales de varias drogas no se repiten", () => {
  const r = estudiosBasales(["mtx", "ssz"]);
  assert.equal(r.filter((e) => e === "Hemograma").length, 1);
  assert.ok(r.includes("Serologías de hepatitis B y C"));
});

test("sin valores no hay alertas", () => {
  assert.deepEqual(evaluar({}), []);
  assert.deepEqual(evaluar({ neutrofilos: null }), []);
});

test("valores normales no alertan", () => {
  assert.deepEqual(evaluar({ leucocitos: 6000, neutrofilos: 3000, plaquetas: 250000, tgp: 25, vcm: 85 }), []);
});

test("neutrófilos bajos alertan y muy bajos son críticos", () => {
  assert.equal(evaluar({ neutrofilos: 1200 })[0].nivel, "alerta");
  assert.equal(evaluar({ neutrofilos: 800 })[0].nivel, "critico");
});

test("transaminasas y VCM altos alertan", () => {
  const r = evaluar({ tgp: 150, vcm: 110 });
  assert.deepEqual(r.map((a) => a.nombre), ["TGP (ALT)", "VCM"]);
});

test("creatinina alerta si sube más de 30 % del basal", () => {
  assert.deepEqual(evaluar({ creatinina: 0.6, creatininaBasal: 0.5 }), []);
  const r = evaluar({ creatinina: 0.7, creatininaBasal: 0.5 });
  assert.equal(r[0].nombre, "Creatinina");
  assert.match(r[0].mensaje, /40 %/);
});

test("anti-TNF más metotrexato no repite hepatograma ni serologías", () => {
  const r = estudiosBasales(["mtx", "antitnf"]);
  assert.equal(r.filter((e) => e.startsWith("Hepatograma")).length, 1);
  assert.equal(r.filter((e) => e.includes("hepatitis")).length, 1);
});
