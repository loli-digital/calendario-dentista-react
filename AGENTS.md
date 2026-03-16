# AGENTS.md

Guía de uso de agentes de IA en VSCode para el proyecto
**Calendario Dentista – React**

Este documento explica cómo deben utilizarse los agentes de IA dentro de VSCode para mantener la coherencia, calidad y seguridad del código en este proyecto.

> La IA **solo analiza y propone mejoras**; no toca el código en ningún caso, todas las decisiones las toma la autora.

---

# 0. Contexto del usuario

La autora del proyecto es junior frontend y este es su primer proyecto en React.

La IA debe explicar claramente las sugerencias, indicando qué se hace y por qué, en lugar de solo dar código listo.

Todas las recomendaciones son solo sugerencias, la autora decide si aplicarlas o no.

# 1. Modo de uso de la IA

* La IA **no debe modificar el código por sí misma**.
* Solo puede **analizar, revisar y proponer mejoras** en:

  * Componentes React
  * Hooks y estados (`loading`, `error`, `empty`, `success`)
  * Formularios y validaciones
  * Accesibilidad (ARIA, etiquetas, roles, etc.)
  * Optimización de UI/UX y rendimiento
* Las propuestas deben incluir:

  * Explicación detallada de la mejora
  * Justificación de por qué aportaría valor
  * Opcionalmente, un ejemplo de cómo se podría implementar
* **La decisión final y la aplicación de cualquier cambio la toma la autora del proyecto**.
* La IA **no debe añadir librerías, cambiar arquitectura ni sobrescribir componentes existentes**.

---

# 2. Objetivo del proyecto

Este repositorio contiene una aplicación React para la gestión de citas de una clínica dental. Incluye:

* Sistema de reserva de citas
* Consulta de citas por teléfono
* Gestión de estado con hooks (`loading`, `error`, `empty`, `success`)
* Persistencia en `localStorage`
* Optimización de rendimiento (LCP, imágenes, accesibilidad)
* Despliegue en Cloudflare Pages

Los agentes de IA deben respetar esta arquitectura y no introducir dependencias innecesarias.

---

# 3. Qué pueden hacer los agentes de IA

### Refactorización

* Mejorar legibilidad del código
* Extraer componentes
* Reducir duplicación
* Optimizar funciones (ej. `buscarCitas`)

### Documentación

* Crear comentarios JSDoc
* Explicar funciones
* Generar README parciales

### Accesibilidad

* Sugerir mejoras ARIA
* Detectar problemas de Lighthouse

### Optimización

* Mejorar LCP
* Optimizar imágenes
* Sugerir lazy loading cuando proceda
* Reorganizar imports

### Testing

* Generar tests unitarios con Vitest o Jest
* Crear mocks para `localStorage`

### UI / UX

* Proponer mejoras en Tailwind
* Ajustar responsive
* Sugerir patrones de diseño

---

# 4. Qué NO deben hacer los agentes

### No introducir nuevas librerías sin aprobación

Ejemplos prohibidos:

* Redux
* Zustand
* Axios (si ya se usa fetch)
* Librerías de UI pesadas

### No reescribir toda la arquitectura

El proyecto debe seguir siendo:

* React + Vite
* Tailwind
* localStorage
* Cloudflare Pages

### No generar código inseguro

* No almacenar datos sensibles
* No exponer información personal
* No usar `eval` ni funciones dinámicas peligrosas

### No modificar rutas sin motivo

Las rutas actuales deben mantenerse:

* `/`
* `/reserva`
* `/mis-citas`

---

# 5. Estilo de código

### React funcional

* Hooks
* Componentes pequeños
* Props claras

### Tailwind CSS

* No usar CSS externo salvo casos necesarios
* Mantener clases ordenadas por bloques (layout → spacing → color → efectos)

### JavaScript limpio

* Evitar variables globales
* Evitar funciones anónimas dentro de JSX cuando sea posible
* Usar `const` siempre que se pueda

### Accesibilidad

* `aria-label` en botones sin texto
* `alt=""` en imágenes decorativas
* `<main>` único por página

---

# 6. Cómo deben responder los agentes

* **Explicar antes de sugerir cambios:** justificar siempre las propuestas.
* **Proponer alternativas:** no imponer una única solución.
* **Mantener el estilo del proyecto:** no mezclar estilos (CSS modules + Tailwind).
* **Ser conservadores:** sugerir solo lo necesario.
* **No modificar código:** todas las recomendaciones deben ser sugerencias con explicación y ejemplo opcional, sin tocar el repositorio.

---

# 7. Ejemplos de prompts recomendados

### Refactorización

> “Revisa este componente y propone mejoras manteniendo Tailwind y sin añadir librerías nuevas. Explica las sugerencias y opcionalmente da un ejemplo.”

### Accesibilidad

> “Detecta problemas ARIA y sugiere mejoras en este componente. Solo describe cambios, no modifiques el código.”

### Optimización

> “Sugiere optimizaciones de rendimiento en esta página, explicando los beneficios y cómo aplicarlos.”

### Documentación

> “Genera comentarios JSDoc para esta función y explica qué hace cada parámetro.”

---

# 8. Estructura del proyecto

```
src/
 ├── components/
 │    ├── HeroSection.jsx
 │    ├── FormReserva.jsx
 │    ├── ListaCitas.jsx
 │    ├── Navbar.jsx
 │    ├── Footer.jsx
 │    ├── CTA.jsx
 │    ├── Servicios.jsx
 │    ├── ServiciosCard.jsx
 │    ├── Profesionales.jsx
 │    ├── ProfesionalesCard.jsx
 │    ├── Reviews.jsx
 │    ├── ReviewsCard.jsx
 │    └── RatingStars.jsx
 ├── pages/
 │    ├── Home.jsx
 │    ├── Reserva.jsx
 │    └── MisCitas.jsx
 ├── assets/
 │    └── img/
 ├── App.jsx
 └── main.jsx
```

Los agentes deben respetar esta estructura.

---

# 9. Buenas prácticas específicas del proyecto

### Alertas de estado

* Respetar los estados `loading`, `error`, `empty` y `success` en todos los componentes.
* La IA no debe sobrescribir ni eliminar estos estados; solo puede sugerir mejoras en su uso.

### Imágenes

* Las imágenes del hero deben usar `<img fetchpriority="high">`
* Evitar `loading="lazy"` en el LCP
* Mantener imágenes optimizadas en `/assets/img/`

### localStorage

* Validar siempre con `JSON.parse`
* No guardar objetos complejos
* Ordenar citas por fecha

### Formularios

* Validar teléfono
* Prevenir comportamiento por defecto correctamente
* Mostrar mensajes claros

---

# 10. Contacto del proyecto

Cualquier cambio estructural debe ser aprobado por la autora del proyecto:
**Loli Digital**