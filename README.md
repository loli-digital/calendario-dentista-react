# Clínica dental con React + Tailwind

Este proyecto trata sobre una clínica dental ficticia desarrollada en **React 19.2** y diseñada con **Tailwind 4.2**.

La web tiene componentes donde se muestra la información de los servicios, profesionales, CTA, reseñas, contacto, menú de navegación y footer.

Puedes verla aquí: 
<br />
[Proyecto Clínica Dental](https://calendario-dentista-react.pages.dev/)

## Características principales

- Reserva de citas con validación completa  
- Calendario personalizado con horarios reales  
- Filtrado dinámico de profesionales  
- Gestión de citas en base de datos con Firebase 
- Modificación y eliminación de citas  
- Slider de reseñas con Swiper 
- Diseño responsive con Tailwind  

## Componentes

- **Menú de navegación** con las secciones: Servicios, Profesionales, Contacto, Mis Citas y un botón para reservar cita.
- **Hero section** con el encabezado *h1*, un botón para reservar cita y una imagen ( excepto en modo móvil ).
- **Servicios** y **ServiciosCard**: se muestran los servicios que ofrecen a través de unas cards, con una imagen, icono, título y texto.
- **CTA**: efecto parallax con una imagen, fondo por encima de ésta y un botón para reservar cita.
- **Profesionales** y **ProfesionalesCard**: se muestran los dos profesionales a través de unas cards, con la imagen, nombre y apellidos, número colegiada/o, especialización, lugar de estudios y años de experiencia.
- **Reviews**, **ReviewsCard** y **RatingStars**: se muestran en un slider 6 reseñas ficticias, con imagen, nombre y apellido/s, valoración y texto de la experiencia.
- **Contacto**: información con el horario, dirección, teléfonos y el mapa de Google Maps mostrando la dirección.
- **Footer**: con la información de la clínica como el logo, dirección, teléfonos, horario, política de privacidad y copyright. 

## Data

Aquí se encuentran los datos de:

- Profesionales: id, imagenAVIF, imagenWEBP, imagen, alt, nombre, número de colegiada/o, las tres especializaciones, lugar de estudios, experiencia y un array de los servicios que atiende.
- Reviews: id, imagen, alt, nombre, texto y rating.
- Servicios: id, imagenAVIF, imagenWEBP, imagen, alt, icono, título y descripción del servicio.
- Servicios para seleccionar al reservar cita: id, nombre y el ID del profesional.

## Pages

En esta carpeta se encuentran las páginas de *Home*, *MisCitas* y *ReservarCita*

- Home: se muestran los componentes hero-section, servicios, CTA, profesionales, reviews y contacto.

- Mis citas: se muestra una pantalla para escribir el número de teléfono que se ha registrado para pedir cita.

- Reservar cita: se muestra un formulario en el que hay que introducir los datos para pedir cita.


## Tecnologías y Metodología

Este proyecto ha sido desarrollado utilizando un stack moderno enfocado en la experiencia de usuario y la escalabilidad:

- **Frontend:** React con Vite (v19.2) | React DOM | DatePicker | date-fns | Swiper
- **Estilos:** Tailwind CSS (v4.1) (Arquitectura Mobile-First).
- **Base de Datos:** Firebase Cloud Firestore (Persistencia en tiempo real).
- **Diagnóstico:** [React Doctor](https://www.npmjs.com/package/react-doctor) (CLI para análisis de salud y buenas prácticas en proyectos React).

### Herramienta de diagnóstico: React Doctor

Para analizar y mejorar la salud del proyecto React, se ha utilizado la herramienta CLI [react-doctor](https://www.npmjs.com/package/react-doctor):

**Instalación global:**
```bash
npx -y react-doctor@latest .
```

**Uso en el proyecto:**
```bash
react-doctor
```

Ejecutará un análisis de buenas prácticas, dependencias y configuración del proyecto React, mostrando advertencias y sugerencias para mejorar la calidad y el rendimiento.

### Desarrollo Asistido por IA

Este proyecto representa un desafío personal de aprendizaje y crecimiento técnico. Para su realización, he adoptado un enfoque de **desarrollo guiado por IA** (utilizando **GitHub Copilot** y **Gemini**), donde la tecnología ha actuado como un mentor técnico y tutor:

- **Roadmap y Estructura**: Utilicé la IA para validar la arquitectura del proyecto y definir los pasos lógicos necesarios para integrar React con Firebase de manera eficiente.

- **Mentoría en Tiempo Real**: La IA me ayudó a comprender conceptos de los Hooks de React, la gestión de estados y las reglas de seguridad de Firestore.

- **Implementación Crítica**: Aunque la IA sugirió fragmentos de código, cada línea ha sido revisada, probada y adaptada manualmente para asegurar que cumple con los requisitos del proyecto y para garantizar mi propio aprendizaje del stack tecnológico.

- **Contexto Inteligente:** Se ha implementado un archivo `AGENTS.md` en la raíz del proyecto. Este documento actúa como una guía de estilo y reglas de negocio para los asistentes de IA, asegurando que el código generado respete  la arquitectura del proyecto, accesibilidad, estructura de datos y mejores prácticas.


### Librerías

#### Swiper

Para las reseñas se ha usado la libería **Swiper** en la que se recogen los datos de la carpeta *data* y se accede a ellos a través de la función map que recorre el array de los datos. 
Se le han dado estilos en CSS, para que según el dispositivo desde el que se vea, aparezca una card, dos o tres.

#### React DatePicker

Para el calendario que aparece en el formulario, se ha usado **React DatePicker**.
- Se ha personalizado para que aparezcan las horas de la clínica ( a partir de las 9:00h y la última a las 19:30h ) dejando la última media hora desactivada ( 20:00h ).
- Hay un intervalo de 30 minutos.
- El calendario y las horas están actualizadas para España, usando `import DatePicker, { registerLocale } from 'react-datepicker';` y `import es from 'date-fns/locale/es';` y registrando el calendario para el horario español `registerLocale('es', es);`
- Deshabilitando el sábado y domingo del calendario, filtrando los días `filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}`
- Se filtran las horas que ya han pasado, para que no puedan seleccionarse 
`const filtrarHorasPasadas = (time) => { const ahora = new Date(); const fechaSeleccionada = fecha; if (fechaSeleccionada.toDateString() === ahora.toDateString()) { return ahora.getTime() < time.getTime();} return true;};` y en el componente `filterTime={filtrarHorasPasadas}`

## Lógica

### Formulario Reservar Cita

- Uso de estados con `useState` para tener control sobre los input del formulario: nombre, apellido/s, teléfono, servicio, profesional, fecha, hora y mensaje.
- Uso de la librería *React DatePicker* para seleccionar el día y hora de la cita.
- Función para filtrar las horas pasadas para que no aparezcan en el calendario.
- Filtro de profesionales según el servicio elegido.
- Mensaje de error si los campos no están completados, si el teléfono no es válido.
- Guardado de las citas en base de datos con **Firebase**.
- Mensaje de error si no se ha podido registrar la cita.
- Mensaje de confirmación de la cita con los datos aportados al reservar.
- Uso de *onSubmit* con la función *manejarSubmit* en el formulario.
- Estilos para el botón según la actividad, si está registrando cita o si ya la ha registrado.

### Mis citas

- Uso de estados con `useState` para el teléfono de búsqueda, citas y mensajes de loading, error y éxito.
- Función para obtener las citas guardadas en **Firebase** y si no hay ninguna, mostrar un mensaje de error.
- Función para filtrar las citas guardadas por orden de fecha, desde la más próxima.
- Función para modificar cita, mostrando el calendario *React DatePicker* para cambiar la fecha y hora, y actualiza la cita. Muestra un mensaje si hay error o éxito al intentar modificarla.
- Función para eliminar una cita, mostrando las citas guardadas, actualizando, filtrando las más próximas y si no quedan más citas, muestra un mensaje.
- Las citas se muestran a través de map, que recorre el array de citas.

### Migración de localStorage a Firebase Cloud Firestone

- Todas las citas se almacenan, consultan y actualizan a tiempo real en **Firebase Cloud Firestone**
- Ventajas:
  - Acceso a las citas desde cualquier dispositivo.
  - Sincronización en tiempo real.
  - Seguridad configurable mediante reglas de Firestone.
- La configuración de Firebase se encuentra en el archivo *firebase.js*

## Capturas de pantalla

### Home

![Página Home](home.png)

### Reservar cita

![Página Reservar Cita](reservar-cita.png)
<br />
Se muestra la confirmación de la cita reservada
<br />

![Página con la cita reservada](cita-reservada.png)

### Mis Citas

![Página Mis Citas](mis-citas.png)

<br />
Se muestra la cita reservada, que se puede modificar o eliminar.
<br />

![Ver cita reservada](mostrar-cita-reservada.png)

<br />
Modal que se muestra al hacer click en modificar la cita.
<br />

![Modificar cita](editar-cita.png)

<br />
Modal que se muestra al intentar eliminar la cita.
<br />

![Eliminar cita](eliminar-cita.png)


## Diseño

La web se ha diseñado en Tailwind v4.2 y se ha creado un skeleton para las páginas: *Home*, *Mis Citas* y *Reservar Cita*.

Puedes verla aquí: 
<br />
[Proyecto Clínica Dental](https://calendario-dentista-react.pages.dev/)

## Google PageSpeed Insights

Desktop
![Resultados Desktop](gpsi-desktop.png)

Móvil

![Resultados móvil](gpsi-movil.png)


## Bibliografía

- [React](https://es.react.dev/)
- [Instalación Tailwind en React con Vite](https://tailwindcss.com/docs/installation/using-vite)
- [Swiper](https://swiperjs.com/react)
- [Info React DatePicker](https://reactdatepicker.com/)

## Instalación y ejecución

1. Clonar el repositorio:
`git clone https://github.com/loli-digital/calendario-dentista-react.git`

2. Instalar dependencias
`npm install`

3. Ejecutar
`npm run dev`

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
