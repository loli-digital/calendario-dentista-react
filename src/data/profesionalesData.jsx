const profesionales = [

  {
    id: '1',
    imagenAVIF: new URL('../assets/img/dentista-sonriente-de-tiro-medio-en-el-trabajo.avif', import.meta.url).href,
    imagenWEBP: new URL('../assets/img/dentista-sonriente-de-tiro-medio-en-el-trabajo.webp', import.meta.url).href,
    imagen: new URL('../assets/img/dentista-sonriente-de-tiro-medio-en-el-trabajo.png', import.meta.url).href,
    alt: 'Dentista sonriente con instrumental médico en la mano derecha',
    nombre: 'Marta García Ferreiro',
    numColegiado: 'ODONTÓLOGA col. 123',
    especializacion1: 'Medicina bucal',
    especializacion2: 'Cirugía oral',
    especializacion3: 'Implantología',
    estudios: 'Valencia',
    experiencia: '10',
    servicios: [1, 2, 3, 5, 6]
  },
  {
    id: '2',
    imagenAVIF: new URL('../assets/img/medico-estomatologo-explicando-la-higiene-dental-adecuada-al-paciente-con-muestra-de-mandibula-humana.avif', import.meta.url).href,
    imagenWEBP: new URL('../assets/img/medico-estomatologo-explicando-la-higiene-dental-adecuada-al-paciente-con-muestra-de-mandibula-humana.webp', import.meta.url).href,
    imagen: new URL('../assets/img/medico-estomatologo-explicando-la-higiene-dental-adecuada-al-paciente-con-muestra-de-mandibula-humana.png', import.meta.url).href,
    alt: 'Dentista sonriendo con una prótesis en la mano',
    nombre: 'Rubén Moreno López',
    numColegiado: 'ODONTÓLOGO col. 1234',
    especializacion1: 'Medicina bucal',
    especializacion2: 'Cirugía oral',
    especializacion3: 'Estética dental',
    estudios: 'Valencia',
    experiencia: '12',
    servicios: [1, 2, 3, 4, 5]
  }
];

export default profesionales;