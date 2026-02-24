import type { Module } from '@/components/course/teoria-de-la-imagen/types';

const paragraphStyle = { textIndent: '1.27cm' };
const justifyClass = 'text-justify mb-4 leading-relaxed';

export const COURSE_INFO = {
  name: 'Teoría de la Imagen Aplicada',
  key: 'ME 101',
  period: '1° Cuatrimestre',
  student: 'Maestría en Medios Digitales',
};

export const SYLLABUS_CONTENT = `PROGRAMA ACADÉMICO - MAESTRÍA EN MEDIOS DIGITALES CLAVE: ME 101

OBJETIVO GENERAL: Reconocer los elementos que integran la imagen para interpretación y composición de la imagen como medio y fin en el arte y medios digitales.

MAPA TEMÁTICO DETALLADO:

La imagen y su interacción en los productos digitales.
Dicotomías de las categorías estéticas.
Textos y funciones estéticas como parte de la narrativa.
Estructuras de producción estética.
Relaciones diacrónicas y sincrónicas de la imagen.

EVALUACIÓN SUMATIVA:

Ejercicios prácticos: 40%
Participación en Foro: 20%
Proyecto final: 40%

FUENTES DE INFORMACIÓN (BIBLIOGRAFÍA):

Zamora Aguilar, Fernando, (2022), Filosofía de la imagen, UNAM, México.
Iapichino, R., (2002), La composición audiovisual: Dimensiones narrativas del sonido y la música en la imagen, Nobuko, México.
López, Yolanda Zaragoza, Manuel y Morea, Miguel, (2022), Composición visual, Institución Universitaria de Envigado. Colombia.
Nieto, Fran, (2020), El arte de la composición, Foto Ruta, JDJ Editores, España.
Martín Prada, Juan, (2002), El ver las imágenes en el tiempo de internet, Ediciones Akal, 2002.`;

export const COURSE_CONTENT: Module[] = [
  {
    id: 'intro',
    title: 'Bienvenida y Encuadre',
    type: 'presentation',
    headerImage:
      'https://drive.google.com/uc?export=view&id=18XHyzQVUFIew5gWSq8rXNpXub30Nn32V',
    content: [
      { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: ' Bienvenido a la unidad de aprendizaje <strong>Teoría de la Imagen Aplicada</strong>. ' },
      { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: ' Este curso es fundamental para deconstruir visualmente los proyectos de maestría. Analizaremos la imagen no solo como un resultado estético, sino como un complejo sistema de relaciones semánticas, técnicas y sociales. ' },
      { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: ' En el nivel de posgrado, la imagen deja de ser un mero resultado técnico para convertirse en un objeto de estudio complejo, un fenómeno que articula relaciones de poder, estéticas, filosóficas y de mercado. Mientras que en su formación de licenciatura el enfoque pudo centrarse en el "cómo hacer" (la <i>técne</i>), en esta maestría nos enfocaremos en el "por qué" y el "para qué" (el <i>logos</i> y el <i>telos</i>). ' },
      { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: ' Esta asignatura está diseñada para dotarlos de un aparato crítico robusto que les permita disectar la imagen digital. No nos limitaremos a la composición visual tradicional; exploraremos la imagen como una entidad multisensorial que interactúa con el sonido y el movimiento, y que posee la capacidad de referenciarse a sí misma (metaimagen). Analizaremos las categorías estéticas no como etiquetas estáticas, sino como tensiones dinámicas (lo bello frente a lo siniestro, lo sublime frente a lo grotesco) esenciales para la narrativa transmedia y el diseño de experiencias. ' },
      { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: ' A través de un enfoque estructuralista y semiótico, entenderemos cómo la imagen "narra" a través de intertextos y paratextos, y cómo se sitúa en un contexto histórico (diacronía) y social (sincronía). Al finalizar este curso, su producción creativa no será inocente; será una praxis informada, capaz de codificar y decodificar mensajes complejos en un ecosistema digital saturado. ' }
    ],
    resources: [
      {
        type: 'pdf',
        title: 'Programa Académico Completo.pdf',
        url: 'https://drive.google.com/file/d/16I-lEVxjtw_jR3PH9KnNIlVTBEusqSKX/view?usp=share_link',
      },
      {
        type: 'video',
        title: 'Introducción al Curso',
        url: 'https://drive.google.com/file/d/1oy4bb8UybiUU4J0iKaYgfDEs1CK94FyE/view?usp=share_link',
      },
      {
        type: 'presentation',
        title: 'Presentación de la Materia',
        url: 'https://docs.google.com/presentation/d/15mrKTN0FZRsILXnzvO8OzZsoGidyI9nh/edit?slide=id.p1#slide=id.p1',
      },
    ],
  },
  {
    id: 'mod1',
    title: 'Módulo 1: La Imagen Digital',
    fullTitle: 'Módulo 1: La imagen y su interacción en los productos digitales',
    type: 'topic',
    description:
      'Análisis de los componentes fundamentales: gráfica, sonido y movimiento.',
    hasIntroVideo: true,
    introVideoTitle:
      'Video Introductorio: Entrevista con Andrés Carmona- Productor Audiovisual',
    introVideoUrl:
      'https://drive.google.com/file/d/1M6ehqTPsQgptia9cOuiV2ox9gc6QgOzt/view?usp=share_link',
    content: [
      { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: 'En este primer módulo, desmantelamos la idea de la imagen como un cuadro estático y silencioso. En la era digital, la imagen es un organismo vivo que respira a través de la interacción. Abordaremos la "imagen integrada", donde lo gráfico, lo sonoro y lo cinético no son capas separadas, sino tejidos de una misma piel narrativa. Nos apoyaremos en la visión contemporánea de autores como Zamora Aguilar (2022) para entender la ontología de la imagen actual, y en Iapichino (2002) para comprender cómo el sonido no acompaña, sino que construye la imagen. El objetivo es que logren visualizar la "productividad semántica" de sus proyectos: cada píxel, cada <i>frame</i> y cada onda sonora significan algo en conjunto.' }
    ],
    forum: {
      title: 'Debate: La Metaimagen en el Gameplay',
      question:
        '¿Consideras que el uso excesivo de la metaimagen (referencias dentro de referencias) en los videojuegos actuales enriquece la narrativa o rompe la inmersión del jugador?',
      initialPosts: [
        {
          user: 'Carlos M.',
          text: 'Creo que depende del género. En juegos indie funciona genial.',
          time: 'Hace 2h',
        },
      ],
    },
    closing: {
      text: "En conclusión, la imagen digital no es un ente aislado; es una amalgama de gráfica, sonido y movimiento. Hemos visto cómo la 'Metaimagen' rompe la cuarta pared digital, obligando al usuario a ser consciente del medio. Dominar esta interacción es el primer paso para la maestría.",
      audioTitle: 'Resumen Módulo 1: La Tríada Digital',
      duration: '03:45',
      url: 'https://drive.google.com/file/d/1IS9FdL4Kxqs9GkW7i0wwIlPvooFEUprV/view?usp=share_link',
      type: 'video',
      additionalAudioTitle: 'Podcast de Cierre Módulo 1',
      additionalAudioUrl:
        'https://drive.google.com/file/d/17jnjs-_XbOJHYwb2J2QEt5m0n4q_S2Lu/view?usp=share_link',
      additionalAudioDuration: '05:00',
    },
    subtopics: [
      {
        id: '1.1',
        title: '1.1 Gráfica',
        content: [
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: 'La dimensión gráfica es el anclaje primario de la percepción visual, pero en medios digitales, trasciende la mancha y la línea. No hablamos solo de resolución o vectorización, sino de la grafía como huella de identidad.'},
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: 'Debemos entender la gráfica como un sistema de signos. Siguiendo los principios de la composición visual (López et al., 2022), cada elección cromática y morfológica establece una jerarquía de lectura.' },
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: '<strong>Ejemplo:</strong> En el diseño de una interfaz para una <i>app</i> de banca (<i>UX/UI</i>), la gráfica no solo "decora"; la rigidez de las líneas transmite seguridad (función simbólica), mientras que el color guía la acción (función conativa).' }
        ],
        resources: [
          {
            type: 'img',
            title: 'Infografía: Evolución de la GUI',
            url: 'https://drive.google.com/file/d/1QbCbi6JT6i7fXxL-8SMeZmX9JxHaISp7/view?usp=share_link',
          },
          {
            type: 'pdf',
            title: 'Lectura: La composición visual',
            url: 'https://drive.google.com/file/d/1XephhZRv_jSjxHMZs1moQfnjybM7Zk1w/view?usp=share_link',
          },
        ],
      },
      {
        id: '1.2',
        title: '1.2 Sonora',
        content: [
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: 'La imagen digital es, en su mayoría, audiovisual. Iapichino (2002) argumenta que existen dimensiones narrativas donde la música y el sonido "esculpen" el tiempo de la imagen. El sonido dota de tridimensionalidad emotiva a la superficie plana de la pantalla.' },
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: 'Hablamos de la <i>síncresis</i> (unión de sincronía y síntesis). Un sonido puede cambiar el significado de una imagen neutral.' },
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: '<strong>Ejemplo:</strong> Un plano secuencia de un pasillo vacío (imagen neutra). Si agregamos música orquestal mayor, es un inicio heroico; si agregamos un zumbido de baja frecuencia y sonidos metálicos, se convierte en una escena de terror (lo grotesco/siniestro). El sonido es imagen en la mente del espectador.' }
        ],
        resources: [
          {
            type: 'pdf',
            title: 'Lectura: La composición audiovisual (Iapichino, 2002)',
            url: 'https://drive.google.com/file/d/11JVzGL8yZw2e98Xp21uJrSaDJpvX0plF/view?usp=sharing',
          },
          {
            type: 'audio',
            title: 'Gramática Universal',
            url: 'https://drive.google.com/file/d/1UtFOGbVmGlyq3r5EZ_MsfR-vt-XKpZ43/view?usp=share_link',
          },
        ],
      },
      {
        id: '1.3',
        title: '1.3 El Movimiento',
        content: [
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: 'El movimiento introduce la variable tiempo (<i>cronos</i>) y ritmo. La imagen en movimiento deja de ser representación para convertirse en presentación de una realidad que fluye. Aquí analizamos la cinética no solo como desplazamiento, sino como transformación.'},
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: 'En la animación y <i>VFX</i>, el movimiento tiene peso y carácter. Los 12 principios de la animación clásica se reinterpretan hoy en la simulación de partículas y dinámicas de fluidos.' },
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: '<strong>Ejemplo:</strong> En un videojuego, la diferencia entre un <i>NPC</i> (personaje no jugable) aliado y uno enemigo a menudo radica en su patrón de movimiento: fluido y armónico vs. errático y espasmódico.' }
        ],
        resources: [
          {
            type: 'video',
            title: 'Análisis: 12 Principios de Animación en UI',
            url: 'https://www.youtube.com/watch?v=uDqjIdI4bF4',
          },
          {
            type: 'video',
            title: '1er principio de la animación UNIAT (Bases y ejemplos)',
            url: 'https://www.youtube.com/shorts/4jWofM0VxRY',
          },
          {
            type: 'pdf',
            title: 'Lectura: El ver las imágenes en el tiempo de internet',
            url: 'https://drive.google.com/file/d/1ZuTvSSloFT14wh0lhpML6AeJjhkpOKO-/view?usp=share_link',
          },
        ],
      },
      {
        id: '1.4',
        title: '1.4 Metaimagen',
        content: [
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: 'Este es el concepto más reflexivo del bloque. La metaimagen es la imagen que habla sobre sí misma; es la autoconsciencia del medio. Martín Prada (2002) nos alerta sobre cómo en la era de internet, las imágenes se citan constantemente unas a otras.'},
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: 'Es el "cuadro dentro del cuadro" o la ruptura de la cuarta pared visual.'},
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: '<strong>Ejemplo:</strong> En la película <i>Spider-Man: Into the Spider-Verse</i>, el uso de texturas de cómic (puntos <i>Ben-Day</i>) y onomatopeyas visuales sobre los personajes 3D es una metaimagen: el <i>film</i> nos recuerda constantemente que estamos viendo un cómic animado, celebrando su propia artificialidad.'}
        ],
        resources: [
          {
            type: 'pdf',
            title: 'Prácticas artísticas e internet',
            url: 'https://drive.google.com/file/d/1uEa-Z8b63N4QLR0HRfqy1Ss4vhdEvvCu/view?usp=share_link',
          },
          {
            type: 'video',
            title: 'La palabra contra la imagen',
            url: 'https://drive.google.com/file/d/19k5aekDukEoYikrTH-41F3I7q0RkgIL6/view?usp=share_link',
          },
          {
            type: 'pdf',
            title: 'Lectura: Filosofía de la imagen (Zamora Aguilar)',
            url: 'https://drive.google.com/file/d/1i0f0LT8e-tybXY8Pc7_hGY-lIFDEnb55/view?usp=share_link',
          },
        ],
        activity: {
          type: 'upload',
          title: 'Reflexión Módulo 1',
          instruction:
            "Define con tus propias palabras el concepto de 'Metaimagen' aplicado a un videojuego, animación, película, etc. reciente. Profundiza y contextualiza tu reflexión con por lo menos tres fuentes de información para darle soporte. Utiliza notación APA para declarar tus fuentes de información. Si consideras necesario integra la URL para ver el producto sobre el que estás haciendo esta reflexión.",
          url: 'https://drive.google.com/drive/folders/1S9PRTeUJZ6qJIMBoewErp8maaBIH_bVm?usp=share_link',
        },
      },
      {
        id: '1.5',
        title: '1.5 Evaluación del Módulo 1',
        content: [
          { type: 'paragraph', style: paragraphStyle, className: justifyClass, text: 'Cierre del módulo. Evaluación de los conceptos fundamentales: Gráfica, Sonido y Movimiento.' }
        ],
        activity: {
          type: 'exam',
          title: 'Parcial 1: Fundamentos de la Imagen',
          instruction:
            'Cuestionario de 15 preguntas sobre los componentes de la imagen digital.',
          url: 'https://forms.gle/9yeTHKEKdz63hXak7',
        },
      },
    ],
  },
  {
    id: "sources",
    title: "Fuentes de Información",
    type: "presentation",
    content: [
      { type: 'paragraph', className: justifyClass, text: 'A continuación se presenta la bibliografía fundamental y complementaria utilizada para el desarrollo de esta unidad de aprendizaje. Haz clic en los títulos para acceder a los recursos disponibles:' },
      { type: 'list', items: [
        { text: '<a href="https://drive.google.com/file/d/1VG-oJxlz0xzr85MbKri-qKX_i7D4iSlh/view?usp=share_link" target="_blank" rel="noopener noreferrer" class="hover:text-primary hover:underline transition-colors">Duran Castro, Mauricio (2003). <i>Imagen, Movimiento y Tiempo. Artes No. 6 Volumen 3/ julio -diciembre</i>. Universidad de Antioquía, Colombia.</a>' }
      ]}
    ],
  },
  {
    id: "notebooklm",
    title: "NotebookLM Teoría de la Imagen Aplicada",
    type: "presentation",
    content: [
      { type: 'paragraph', className: justifyClass, text: '<strong>NotebookLM</strong> es una herramienta experimental de Google que utiliza la inteligencia artificial para ayudarte a obtener información de tus documentos.' },
      { type: 'paragraph', className: justifyClass, text: 'En el contexto de la materia <strong>Teoría de la Imagen Aplicada</strong>, recomendamos utilizar esta herramienta para:' },
      { type: 'list', items: [
        { text: 'Subir los artículos teóricos (PDFs) proporcionados en cada módulo.' },
        { text: 'Generar resúmenes automáticos para facilitar la lectura profunda.' },
        { text: 'Crear cuestionarios de autoevaluación para poner a prueba tu comprensión de los conceptos estéticos y semióticos.' },
        { text: 'Hacer preguntas específicas a los textos ("¿Qué dice el autor sobre la metaimagen?") para obtener citas y explicaciones instantáneas.' }
      ]},
      { type: 'paragraph', className: justifyClass, text: 'Es tu asistente de investigación personalizado para la maestría.' }
    ],
    resources: [
      {
        type: 'link',
        title: 'Acceder a NotebookLM',
        url: 'https://notebooklm.google.com/notebook/3b849fa3-83a6-45d6-85b5-ddfc85acbbf5',
      },
    ],
  },
  {
    id: 'final',
    title: 'Proyecto Integrador',
    type: 'closing',
    content:
      'Has completado el recorrido teórico. Es momento de aplicar todo lo aprendido en tu proyecto de maestría.',
    closingText:
      "El entregable final consiste en la 'Elaboración de principios de estilo (estética-función-intención)' documentados.",
    activity: {
      type: 'upload',
      title: 'Entrega de Proyecto Integrador',
      instruction:
        'Sube el archivo ZIP con tu documentación y justificación teórica.',
    },
  },
  {
    id: 'completion',
    title: 'Cierre de la Materia',
    type: 'completion',
    content: `¡Felicidades has terminado la materia Teoría de la Imagen!

Diste un paso en tu proceso de posgrado en esta maestría y todas las herramientas y conocimientos te van dando mayor fortaleza para tu desarrollo personal y profesional tanto en procesos de investigación, como en creativos y de desarrollo.

!Felicidades!`,
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop',
  },
];
