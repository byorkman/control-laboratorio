// Controles de laboratorio por medicación. ESTA TABLA DEBE SER REVISADA
// POR EL MÉDICO ANTES DE USAR LA HERRAMIENTA CON PACIENTES.

const TB = "Tuberculosis (PPD o IGRA)";
const HEP = "Serologías de hepatitis B y C";

export const MEDICACIONES = [
  {
    id: "mtx",
    nombre: "Metotrexato",
    grupo: "FAME convencionales",
    basal: ["Hemograma", "Hepatograma", "Albúmina", "Creatinina", HEP],
    seguimiento: [
      { cuando: "1 a 2 meses después de empezar o de subir la dosis", estudios: ["Hemograma", "TGO / TGP", "Creatinina"] },
      { cuando: "Luego, cada 3 a 4 meses", estudios: ["Hemograma", "TGO / TGP", "Creatinina"] },
    ],
    fuente: "ACR 2019 JIA guideline (Ringold S, et al.)",
  },
  {
    id: "lef",
    nombre: "Leflunomida",
    grupo: "FAME convencionales",
    basal: ["Hemograma", "Hepatograma", "Creatinina", "Tensión arterial"],
    seguimiento: [
      { cuando: "1 a 2 meses después de empezar o de subir la dosis", estudios: ["Hemograma", "TGO / TGP", "Creatinina"] },
      { cuando: "Luego, cada 3 a 4 meses", estudios: ["Hemograma", "TGO / TGP", "Creatinina", "Tensión arterial"] },
    ],
    fuente: "ACR 2019 JIA guideline (Ringold S, et al.)",
  },
  {
    id: "ssz",
    nombre: "Sulfasalazina",
    grupo: "FAME convencionales",
    basal: ["Hemograma", "Hepatograma", "Creatinina"],
    seguimiento: [
      { cuando: "1 a 2 meses después de empezar o de subir la dosis", estudios: ["Hemograma", "TGO / TGP", "Creatinina"] },
      { cuando: "Luego, cada 3 a 4 meses", estudios: ["Hemograma", "TGO / TGP", "Creatinina"] },
    ],
    fuente: "ACR 2019 JIA guideline (Ringold S, et al.)",
  },
  {
    id: "hcq",
    nombre: "Hidroxicloroquina",
    grupo: "FAME convencionales",
    basal: ["Examen oftalmológico"],
    seguimiento: [
      { cuando: "Anual (como mínimo a partir de los 5 años de uso)", estudios: ["Examen oftalmológico (campo visual y OCT)"] },
    ],
    notas: "No requiere laboratorio de rutina.",
    fuente: "AAO 2016 (Marmor MF, et al.)",
  },
  {
    id: "aine",
    nombre: "AINEs (uso prolongado)",
    grupo: "AINEs",
    basal: ["Hemograma", "Hepatograma", "Creatinina"],
    seguimiento: [
      { cuando: "Cada 6 a 12 meses", estudios: ["Hemograma", "TGO / TGP", "Creatinina"] },
    ],
    fuente: "ACR 2019 JIA guideline (Ringold S, et al.)",
  },
  {
    id: "cort",
    nombre: "Corticoides sistémicos (uso prolongado)",
    grupo: "Corticoides",
    basal: ["Tensión arterial", "Peso y talla", "Glucemia"],
    seguimiento: [
      { cuando: "En cada consulta", estudios: ["Tensión arterial", "Peso y talla (curva de crecimiento)"] },
      { cuando: "Periódicamente", estudios: ["Glucemia", "Examen oftalmológico (cataratas, glaucoma)", "Densitometría si el uso es prolongado"] },
    ],
    fuente: "Práctica habitual; ajustar según criterio médico",
  },
  {
    id: "antitnf",
    nombre: "Anti-TNF (etanercept, adalimumab)",
    grupo: "Biológicos",
    basal: [TB, HEP, "Hemograma", "Hepatograma", "Calendario de vacunas al día"],
    seguimiento: [
      { cuando: "Cada 3 a 6 meses", estudios: ["Hemograma", "TGO / TGP"] },
      { cuando: "Anual, según riesgo epidemiológico", estudios: ["Tuberculosis (PPD o IGRA)"] },
    ],
    fuente: "ACR 2019 JIA guideline (Ringold S, et al.)",
  },
  {
    id: "toci-p",
    nombre: "Tocilizumab (AIJ poliarticular)",
    grupo: "Biológicos",
    basal: [TB, HEP, "Hemograma", "Hepatograma", "Perfil lipídico"],
    seguimiento: [
      { cuando: "En la 2.ª dosis y luego cada 4 a 8 semanas", estudios: ["Neutrófilos", "Plaquetas", "TGO / TGP"] },
      { cuando: "4 a 8 semanas después de empezar, luego cada 6 meses", estudios: ["Perfil lipídico"] },
    ],
    fuente: "Prospecto (Actemra, FDA)",
  },
  {
    id: "toci-s",
    nombre: "Tocilizumab (AIJ sistémica)",
    grupo: "Biológicos",
    basal: [TB, HEP, "Hemograma", "Hepatograma", "Perfil lipídico"],
    seguimiento: [
      { cuando: "En la 2.ª dosis y luego cada 2 a 4 semanas", estudios: ["Neutrófilos", "Plaquetas", "TGO / TGP"] },
      { cuando: "4 a 8 semanas después de empezar, luego cada 6 meses", estudios: ["Perfil lipídico"] },
    ],
    fuente: "Prospecto (Actemra, FDA)",
  },
  {
    id: "aba",
    nombre: "Abatacept",
    grupo: "Biológicos",
    basal: [TB, HEP, "Hemograma", "Hepatograma"],
    seguimiento: [
      { cuando: "Cada 3 a 6 meses", estudios: ["Hemograma", "TGO / TGP"] },
    ],
    fuente: "Prospecto (Orencia, FDA); práctica habitual",
  },
  {
    id: "ana",
    nombre: "Anakinra",
    grupo: "Biológicos",
    basal: [TB, HEP, "Hemograma", "Hepatograma"],
    seguimiento: [
      { cuando: "Mensual los primeros 3 meses", estudios: ["Neutrófilos"] },
      { cuando: "Luego, cada 3 meses hasta completar 1 año", estudios: ["Neutrófilos", "TGO / TGP"] },
    ],
    fuente: "Prospecto (Kineret, FDA)",
  },
  {
    id: "cana",
    nombre: "Canakinumab",
    grupo: "Biológicos",
    basal: [TB, HEP, "Hemograma", "Hepatograma"],
    seguimiento: [
      { cuando: "Cada 3 a 6 meses", estudios: ["Hemograma", "TGO / TGP"] },
    ],
    fuente: "Prospecto (Ilaris, FDA); práctica habitual",
  },
];

// Umbrales de alerta. Adaptados de BSR/BHPR 2017 (Ledingham J, et al.
// Rheumatology 2017;56:865-8), pensados para adultos: revisar en pediatría.
export const UMBRALES = [
  { id: "leucocitos", nombre: "Leucocitos", unidad: "/mm³", bajo: 3500 },
  { id: "neutrofilos", nombre: "Neutrófilos", unidad: "/mm³", bajo: 1600, critico: 1000 },
  { id: "plaquetas", nombre: "Plaquetas", unidad: "/mm³", bajo: 140000, critico: 100000 },
  { id: "eosinofilos", nombre: "Eosinófilos", unidad: "/mm³", alto: 500 },
  { id: "tgo", nombre: "TGO (AST)", unidad: "U/L", alto: 100 },
  { id: "tgp", nombre: "TGP (ALT)", unidad: "U/L", alto: 100 },
  { id: "vcm", nombre: "VCM", unidad: "fL", alto: 105 },
];

// Aumento de creatinina respecto del valor basal que dispara alerta.
export const CREATININA_AUMENTO = 0.3;
