# Control de laboratorio

Herramienta web para el seguimiento de laboratorio de las medicaciones de reumatología pediátrica. Pensada para usar desde el celular durante la consulta.

- Se eligen las medicaciones del paciente y muestra qué estudios pedir antes de empezar (sin repetir) y cada cuánto controlar cada droga.
- Opcionalmente se cargan los valores del último laboratorio y avisa cuáles están fuera de los umbrales.

**No guarda ni envía datos.** Todo se hace en el navegador.

> ⚠️ **Los esquemas y umbrales tienen que ser revisados por un médico antes de usarse con pacientes.**

## Fuentes

- Esquemas de control: ACR 2019 JIA guideline (Ringold S, et al. *Arthritis Care Res* 2019;71:717-34), prospectos FDA (Actemra, Kineret, Orencia, Ilaris) y AAO 2016 para hidroxicloroquina.
- Umbrales de alerta: adaptados de BSR/BHPR 2017 (Ledingham J, et al. *Rheumatology* 2017;56:865-8), pensados para adultos.

| Valor | Alerta | Crítico |
|---|---|---|
| Leucocitos | < 3.500 /mm³ | |
| Neutrófilos | < 1.600 /mm³ | < 1.000 /mm³ |
| Plaquetas | < 140.000 /mm³ | < 100.000 /mm³ |
| Eosinófilos | > 500 /mm³ | |
| TGO / TGP | > 100 U/L | |
| VCM | > 105 fL | |
| Creatinina | aumento > 30 % sobre el basal | |

Los esquemas y umbrales están en `src/controles.js`; para cambiarlos se edita solo ese archivo.

## Desarrollo

Sitio estático, sin dependencias ni compilación.

```sh
npm test               # pruebas
npx serve .            # o cualquier servidor estático para verlo localmente
```

## Versión

La versión se ve al pie de la página. En cada cambio:

1. Agregar arriba en [`CHANGELOG.md`](CHANGELOG.md) una entrada `## X.Y.Z · día mes año` con lo que cambió.
2. Poner el mismo número en `package.json` y el mismo texto (`vX.Y.Z · día mes año`) en el pie de `index.html`.

Se sube el último número para arreglos y textos, el del medio para funciones nuevas y el primero para cambios grandes. `npm test` avisa si los tres lugares no coinciden.

## Publicar en Vercel

En Vercel: **Add New → Project → Import** este repositorio, con Framework Preset **Other** y sin comando de build. Cada cambio que entre a `main` se publica solo.
