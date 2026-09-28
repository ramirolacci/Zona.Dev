import type { LevelConfig, TrackType } from '../types/game';

export const PYTHON_LEVELS: LevelConfig[] = [
  {
    id: 1,
    world: 1,
    worldTitle: "Mundo 1: Fundamentos de la Lógica",
    title: "1. El Primer Paso",
    conceptName: "Secuencia Directa",
    description: "Programa a tu robot para que camine en línea recta y llegue a la casa de campo.",
    story: "¡Hola explorador! Soy Cody, tu asistente robot. Bienvenido a tu primera misión. Debemos llevar las órdenes de inicio a la estación base de la granja.",
    learningObjective: "Una SECUENCIA es una lista de órdenes que la computadora ejecuta en orden exacto, una tras otra de arriba hacia abajo.",
    stepByStepGuide: [
      "1. Arrastra el bloque '🚀 Mover adelante' al espacio de trabajo.",
      "2. Conecta 3 bloques de 'Mover adelante' formando una cadena vertical.",
      "3. Presiona el botón verde 'Ejecutar Programa' para ver a Cody avanzar."
    ],
    objectives: [
      { id: 'goal', label: 'Llegar a la bandera de meta (Estación Base)' },
      { id: 'blocks', label: 'Usar un máximo de 4 bloques (para 3 ⭐)' }
    ],
    gridSize: { width: 6, height: 6 },
    startPos: { x: 1, y: 3 },
    startDirection: 'EAST',
    goalPos: { x: 4, y: 3 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 4,
    availableBlocks: ['move_forward'],
    hint: "Coloca tres bloques de '🚀 Mover adelante' encajados uno debajo del otro."
  },
  {
    id: 2,
    world: 1,
    worldTitle: "Mundo 1: Fundamentos de la Lógica",
    title: "2. Girando en la Esquina",
    conceptName: "Orientación y Giros",
    description: "Avanza hacia la esquina del camino, gira a la izquierda y llega a la meta.",
    story: "¡El camino directo está bloqueado! Debemos doblar en la esquina de la granja para continuar.",
    learningObjective: "Los computadores necesitan saber en qué dirección están mirando antes de avanzar. Los giros no mueven al bot, solo cambian su orientación.",
    stepByStepGuide: [
      "1. Avanza 3 pasos hasta llegar a la esquina vacía.",
      "2. Añade un bloque '↺ Girar a la Izquierda'.",
      "3. Añade 3 bloques más de '🚀 Mover adelante' para subir a la meta."
    ],
    objectives: [
      { id: 'goal', label: 'Llegar a la bandera de meta' },
      { id: 'blocks', label: 'Usar máximo 7 bloques' }
    ],
    gridSize: { width: 6, height: 6 },
    startPos: { x: 1, y: 4 },
    startDirection: 'EAST',
    goalPos: { x: 4, y: 1 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 7,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right'],
    hint: "Paso 1: Avanza 3 veces. Paso 2: Gira a la izquierda. Paso 3: Avanza 3 veces."
  },
  {
    id: 3,
    world: 1,
    worldTitle: "Mundo 1: Fundamentos de la Lógica",
    title: "3. Cruzando el Arroyo",
    conceptName: "Acciones en el Entorno",
    description: "Un arrollo de agua corta el camino. ¡Construye un puente de madera para cruzar!",
    story: "¡Atención! Un arrollo de agua impide que lleguemos al otro lado. Si Cody intenta pisar el agua sin un puente, se caerá.",
    learningObjective: "Las ACCIONES ESPECIALES modifican el escenario. Al construir un puente, transformas una casilla de peligro en un camino seguro.",
    stepByStepGuide: [
      "1. Avanza 2 pasos para ponerte justo ENFRENTE del arroyo.",
      "2. Ejecuta el bloque '🌉 Construir Puente' para colocar las maderas.",
      "3. Avanza 2 pasos más caminando sobre el puente hasta la meta."
    ],
    objectives: [
      { id: 'bridge', label: 'Construir un puente sobre el arroyo' },
      { id: 'goal', label: 'Llegar seguro a la meta' },
      { id: 'blocks', label: 'Usar máximo 6 bloques' }
    ],
    gridSize: { width: 7, height: 6 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 5, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 6,
    availableBlocks: ['move_forward', 'build_bridge'],
    hint: "Colócate enfrente del agua, construye el puente y luego camina sobre él."
  },
  {
    id: 4,
    world: 1,
    worldTitle: "Mundo 1: Fundamentos de la Lógica",
    title: "4. Rescatando a la Oveja",
    conceptName: "Interactuar y Recoger",
    description: "Encuentra a la oveja perdida, recógela y llévala de vuelta al establo de meta.",
    story: "¡Una pequeña oveja se perdió en los establos exteriores! Debemos rescatarla y ponerla a salvo.",
    learningObjective: "INTERACTUAR significa realizar acciones en la casilla actual. Debes estar exactamente sobre el objeto para poder usar 'Recoger'.",
    stepByStepGuide: [
      "1. Avanza hasta la casilla donde está la oveja.",
      "2. Usa el bloque '⭐ Recoger Objeto / Oveja' para subirla al bot.",
      "3. Da la vuelta o gira y camina hacia la casa de granja."
    ],
    objectives: [
      { id: 'collect_sheep', label: 'Recoger a la oveja 🐑' },
      { id: 'goal', label: 'Llevar a la oveja al establo de meta' },
      { id: 'blocks', label: 'Usar máximo 10 bloques' }
    ],
    gridSize: { width: 7, height: 6 },
    startPos: { x: 1, y: 4 },
    startDirection: 'EAST',
    goalPos: { x: 1, y: 1 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'GOAL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'WALL', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'WALL', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'sheep2', x: 5, y: 4, type: 'SHEEP' }
    ],
    maxBlocks: 10,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'collect'],
    hint: "Camina hasta la oveja, usa 'Recoger', luego gira para volver a la casa arriba a la izquierda."
  },
  {
    id: 5,
    world: 2,
    worldTitle: "Mundo 2: Bucles y Automatización",
    title: "5. El Poder de Repetir",
    conceptName: "Bucles Contados (Loops)",
    description: "El camino es muy largo. ¡Usa el bloque 'Repetir' para no escribir código repetido!",
    story: "¡Bienvenido al Mundo 2! El camino a las montañas es largo. Programar manualmente 6 veces 'Mover adelante' es aburrido y consume memoria. ¡Usemos un Bucle!",
    learningObjective: "Un BUCLE (Loop) permite repetir un grupo de bloques muchas veces automáticamente, haciendo tu código más corto y elegante.",
    stepByStepGuide: [
      "1. Arrastra el bloque '🔁 Repetir X veces'.",
      "2. Cambia el número a 6.",
      "3. Mete dentro del bucle un solo bloque de '🚀 Mover adelante'."
    ],
    objectives: [
      { id: 'goal', label: 'Llegar a la cueva de la montaña' },
      { id: 'loop_use', label: 'Usar el bloque de Bucle Repetir 🔁' },
      { id: 'blocks', label: 'Usar sólo 3 bloques para 3 ⭐' }
    ],
    gridSize: { width: 9, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 7, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 3,
    availableBlocks: ['move_forward', 'repeat_times'],
    hint: "Pon '🚀 Mover adelante' DENTRO del bloque '🔁 Repetir 6 veces'."
  },
  {
    id: 6,
    world: 2,
    worldTitle: "Mundo 2: Bucles y Automatización",
    title: "6. La Escalera de Cristales",
    conceptName: "Patrones en Zig-Zag",
    description: "Recoge los 4 cristales esmeralda subiendo la escalera en zig-zag mediante un bucle.",
    story: "¡Encontraste la mina de cristales! Los cristales están ordenados en forma de escalera.",
    learningObjective: "Los PATRONES son secuencias que se repiten una y otra vez. Identifica la secuencia de un escalón y ponla dentro del bucle.",
    stepByStepGuide: [
      "1. Un escalón consiste en: Mover, Girar Izquierda, Mover, Girar Derecha, Recoger.",
      "2. Coloca esa secuencia dentro de un bucle 'Repetir 4 veces'.",
      "3. Verás cómo Cody sube toda la escalera recolectando los 4 cristales."
    ],
    objectives: [
      { id: 'collect_all', label: 'Recoger los 4 cristales esmeralda 💎' },
      { id: 'goal', label: 'Llegar a la cima de la escalera' },
      { id: 'blocks', label: 'Usar máximo 6 bloques' }
    ],
    gridSize: { width: 7, height: 7 },
    startPos: { x: 1, y: 5 },
    startDirection: 'EAST',
    goalPos: { x: 5, y: 1 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'c1', x: 2, y: 4, type: 'CRYSTAL' },
      { id: 'c2', x: 3, y: 3, type: 'CRYSTAL' },
      { id: 'c3', x: 4, y: 2, type: 'CRYSTAL' },
      { id: 'c4', x: 5, y: 1, type: 'CRYSTAL' }
    ],
    maxBlocks: 6,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'collect', 'repeat_times'],
    hint: "El patrón de 1 escalón es: Mover ➔ Izquierda ➔ Mover ➔ Derecha ➔ Recoger. Ponlo en Repetir 4 veces."
  },
  {
    id: 7,
    world: 3,
    worldTitle: "Mundo 3: Control de Flujo y Condicionales",
    title: "7. Inspeccionando el Terreno",
    conceptName: "Sentencia IF (Si...)",
    description: "Toma decisiones inteligentes. Si hay un arrollo adelante, construye un puente automáticamente.",
    story: "¡Bienvenido al Mundo 3! Aquí el terreno es impredecible. Tu bot debe evaluar el camino antes de avanzar.",
    learningObjective: "Un CONDICIONAL (IF) evalúa si algo es verdadero antes de actuar. Permite que el programa tome decisiones de forma autónoma.",
    stepByStepGuide: [
      "1. Usa un bucle 'Repetir 5 veces'.",
      "2. Dentro del bucle, pon el bloque '❓ Si hay arroyo adelante' -> '🌉 Construir Puente'.",
      "3. Debajo del condicional, pon '🚀 Mover adelante'."
    ],
    objectives: [
      { id: 'if_use', label: 'Usar el bloque condicional IF ❓' },
      { id: 'goal', label: 'Llegar seguro a la meta sin caer al agua' },
      { id: 'blocks', label: 'Usar máximo 5 bloques' }
    ],
    gridSize: { width: 7, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 5, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 5,
    availableBlocks: ['move_forward', 'build_bridge', 'repeat_times', 'if_river'],
    hint: "Dentro del bucle: coloca el bloque 'Si hay arroyo adelante' con 'Construir puente' adentro, luego 'Mover adelante'."
  },
  {
    id: 8,
    world: 3,
    worldTitle: "Mundo 3: Control de Flujo y Condicionales",
    title: "8. El Delta de Ríos",
    conceptName: "Condicionales en Bucles Dinámicos",
    description: "Hay múltiples ríos en el trayecto. Tu bot debe detectar cada agua y construir puentes sin estrellarse.",
    story: "¡Llegamos al Delta de Ríos! Hay varios brazos de agua separados. El bot debe verificar constantemente el agua.",
    learningObjective: "Combinar BUCLES + CONDICIONALES es la base de la Inteligencia Artificial y la robótica para navegar entornos desconocidos.",
    stepByStepGuide: [
      "1. Repite 6 veces la inspección.",
      "2. En cada paso: Si hay arroyo adelante ➔ Construir puente.",
      "3. Siempre avanza un paso adelante."
    ],
    objectives: [
      { id: 'bridges_all', label: 'Construir puentes en todos los arroyos' },
      { id: 'goal', label: 'Cruzar el delta completo hasta la meta' },
      { id: 'blocks', label: 'Usar máximo 6 bloques' }
    ],
    gridSize: { width: 9, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 7, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'RIVER', 'EMPTY', 'RIVER', 'RIVER', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 6,
    availableBlocks: ['move_forward', 'build_bridge', 'repeat_times', 'if_river'],
    hint: "Repite 6 veces: Si hay agua adelante ➔ construye puente, luego siempre mueve adelante."
  },
  {
    id: 9,
    world: 4,
    worldTitle: "Mundo 4: Algoritmos Complejos",
    title: "9. El Laberinto de Esmeralda",
    conceptName: "Exploración Algorítmica",
    description: "Encuentra la ruta óptima en el laberinto recolectando los 3 cristales de energía.",
    story: "¡Mundo 4! Entramos a las ruinas antiguas. El laberinto es complejo y tiene cristales ocultos en los callejones.",
    learningObjective: "Un ALGORITMO es una estrategia estructurada para resolver un problema complejo desglosándolo en pequeñas sub-rutinas.",
    stepByStepGuide: [
      "1. Diseña la ruta para visitar los 3 callejones secundarios.",
      "2. Usa bloques de girar y avanzar con precisión.",
      "3. Junta los 3 cristales antes de pisar el portal de meta."
    ],
    objectives: [
      { id: 'collect_lab', label: 'Recolectar los 3 cristales de energía 💎' },
      { id: 'goal', label: 'Escapar del laberinto por el portal' },
      { id: 'blocks', label: 'Usar máximo 14 bloques' }
    ],
    gridSize: { width: 7, height: 7 },
    startPos: { x: 1, y: 1 },
    startDirection: 'SOUTH',
    goalPos: { x: 5, y: 5 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'EMPTY', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'EMPTY', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'c9_1', x: 1, y: 3, type: 'CRYSTAL' },
      { id: 'c9_2', x: 3, y: 3, type: 'CRYSTAL' },
      { id: 'c9_3', x: 5, y: 3, type: 'CRYSTAL' }
    ],
    maxBlocks: 14,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'collect', 'repeat_times', 'if_river'],
    hint: "Planea el camino de antemano: Entra al primer callejón, recoge, vuelve al pasillo y sigue."
  },
  {
    id: 10,
    world: 4,
    worldTitle: "Mundo 4: Algoritmos Complejos",
    title: "10. El Gran Desafío Final",
    conceptName: "Integración Total de Conceptos",
    description: "Rescata a las 2 ovejas perdidas al otro lado del gran lago y llévalas de regreso al santuario.",
    story: "¡La prueba final de CODEQUEST! 2 ovejas quedaron varadas al otro lado del gran lago. ¡Demuestra todo lo que aprendiste combinando giros, puentes y bucles!",
    learningObjective: "¡Felicitaciones! Has dominado Secuencias, Giros, Acciones, Bucles y Condicionales. ¡Ya piensas como un auténtico Ingeniero de Software!",
    stepByStepGuide: [
      "1. Construye el puente para cruzar el gran lago de agua.",
      "2. Recoge a ambas ovejas 🐑 en las orillas lejanas.",
      "3. Regresa al santuario de meta para graduarte."
    ],
    objectives: [
      { id: 'bridge_lake', label: 'Construir puente sobre el lago' },
      { id: 'rescue_both', label: 'Rescatar a las 2 ovejas perdidas 🐑' },
      { id: 'goal', label: 'Completar la graduación en el Santuario' },
      { id: 'blocks', label: 'Usar máximo 16 bloques' }
    ],
    gridSize: { width: 8, height: 8 },
    startPos: { x: 1, y: 6 },
    startDirection: 'NORTH',
    goalPos: { x: 6, y: 6 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'RIVER', 'RIVER', 'RIVER', 'RIVER', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'RIVER', 'RIVER', 'RIVER', 'RIVER', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 's10_1', x: 6, y: 1, type: 'SHEEP' },
      { id: 's10_2', x: 1, y: 1, type: 'SHEEP' }
    ],
    maxBlocks: 16,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'build_bridge', 'collect', 'repeat_times', 'if_river'],
    hint: "Combina giros, bucles y construcción de puentes para cruzar el lago y rescatar ambas ovejas."
  }
];

export const JAVASCRIPT_LEVELS: LevelConfig[] = [
  {
    id: 101,
    world: 1,
    worldTitle: "Mundo 1: JS Web Basics",
    title: "1. Inicialización de Script",
    conceptName: "Ejecución Síncrona JS",
    description: "Ejecuta el script principal de JavaScript enviando a Cody al Servidor Web Central.",
    story: "¡Bienvenido al ciberespacio de JavaScript! Para renderizar el sitio web, Cody debe llevar el archivo main.js hasta el nodo principal de distribución de datos.",
    learningObjective: "En JavaScript, el código se ejecuta línea por línea de arriba a abajo. Cada instrucción avanza el puntero de ejecución del motor JS.",
    stepByStepGuide: [
      "1. Arrastra 4 bloques '🚀 Mover adelante' al espacio de trabajo.",
      "2. Conéctalos formando una cadena vertical de ejecución.",
      "3. Presiona 'Ejecutar Programa' para llevar a Cody al Servidor Web."
    ],
    objectives: [
      { id: 'goal', label: 'Llegar al Servidor Web Central' },
      { id: 'blocks', label: 'Usar máximo 5 bloques (para 3 ⭐)' }
    ],
    gridSize: { width: 7, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 5, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 5,
    availableBlocks: ['move_forward'],
    hint: "Coloca cuatro bloques '🚀 Mover adelante' en orden vertical."
  },
  {
    id: 102,
    world: 1,
    worldTitle: "Mundo 1: JS Web Basics",
    title: "2. Enrutamiento en la Red (Routing)",
    conceptName: "Navegación y Rutas API",
    description: "Navega por la ruta /api/v1/users doblando en los nodos de conmutación para entregar la respuesta JSON.",
    story: "¡Petición GET entrante! Cody debe navegar por los canales de red del navegador doblando en las esquinas indicadas para entregar el paquete de datos JSON.",
    learningObjective: "El enrutamiento web (Routing) redirige las peticiones modificando la dirección del flujo de ejecución.",
    stepByStepGuide: [
      "1. Avanza 3 casillas hacia adelante hasta la intersección de red.",
      "2. Añade un bloque '↻ Girar a la Derecha'.",
      "3. Avanza 3 casillas más para entregar la respuesta JSON en el servidor."
    ],
    objectives: [
      { id: 'goal', label: 'Entregar la respuesta JSON en el endpoint de meta' },
      { id: 'blocks', label: 'Usar máximo 8 bloques' }
    ],
    gridSize: { width: 7, height: 7 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 4, y: 5 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'EMPTY', 'WALL', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'EMPTY', 'WALL', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'GOAL', 'WALL', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 8,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right'],
    hint: "Avanza 3 veces hasta la casilla (4,2), gira a la derecha (mirando al Sur) y avanza 3 veces más."
  },
  {
    id: 103,
    world: 1,
    worldTitle: "Mundo 1: JS Web Basics",
    title: "3. Reparando el Web Socket",
    conceptName: "Eventos y Parches Web",
    description: "Un canal WebSockets se ha interrumpido. ¡Construye un puente de datos para restablecer la conexión en vivo!",
    story: "¡Alerta en la consola! Se ha producido un 'Connection Reset' en la tubería de datos streaming. Cody debe desplegar un parche de red (puente) para reanudar el socket.",
    learningObjective: "En JavaScript asíncrono, cuando se interrumpe un canal de transmisión, debemos reparar la conexión antes de enviar más datos.",
    stepByStepGuide: [
      "1. Avanza 2 pasos hasta situarte justo enfrente del canal roto.",
      "2. Ejecuta '🌉 Construir Puente' para reparar el flujo WebSockets.",
      "3. Avanza 3 pasos más hasta el nodo de meta."
    ],
    objectives: [
      { id: 'bridge', label: 'Construir un puente sobre el canal de datos roto' },
      { id: 'goal', label: 'Restablecer la conexión WebSockets en la meta' },
      { id: 'blocks', label: 'Usar máximo 7 bloques' }
    ],
    gridSize: { width: 8, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 6, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 7,
    availableBlocks: ['move_forward', 'build_bridge'],
    hint: "Avanza 2 casillas, construye el puente y avanza 3 casillas hasta la meta."
  },
  {
    id: 104,
    world: 1,
    worldTitle: "Mundo 1: JS Web Basics",
    title: "4. Recolectando Tokens JWT",
    conceptName: "Autenticación y Tokens",
    description: "Obtén los 2 Tokens de seguridad JWT esparcidos en los nodos de sesión antes de acceder al panel Admin.",
    story: "Para ingresar al panel de administración protegido, Cody debe recolectar los 2 Tokens JWT (cristales) almacenados en localStorage.",
    learningObjective: "Las peticiones de API autenticadas en JS requieren recopilar y enviar cabeceras de autorización con tokens válidos.",
    stepByStepGuide: [
      "1. Avanza 2 casillas y recoge el primer Token JWT.",
      "2. Recorre el pasillo central hacia el segundo Token y recógelo.",
      "3. Dirígete a la meta para completar la autenticación."
    ],
    objectives: [
      { id: 'collect_jwt', label: 'Recolectar los 2 Tokens JWT 💎' },
      { id: 'goal', label: 'Autenticarse en el servidor principal de meta' },
      { id: 'blocks', label: 'Usar máximo 11 bloques' }
    ],
    gridSize: { width: 7, height: 7 },
    startPos: { x: 1, y: 5 },
    startDirection: 'NORTH',
    goalPos: { x: 5, y: 1 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'WALL', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'WALL', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'jwt1', x: 1, y: 3, type: 'CRYSTAL' },
      { id: 'jwt2', x: 5, y: 3, type: 'CRYSTAL' }
    ],
    maxBlocks: 11,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'collect', 'repeat_times'],
    hint: "Usa bucles o secuencias para ir a (1,3), recoger token 1, girar al Este hasta (5,3), recoger token 2 y subir a la meta (5,1)."
  },
  {
    id: 105,
    world: 2,
    worldTitle: "Mundo 2: Event Loop y Automatización JS",
    title: "5. El Bucle Event Loop",
    conceptName: "Bucles (Event Loop)",
    description: "Automatiza el procesamiento de peticiones HTTP en la cola de mensajes usando el Event Loop de JS.",
    story: "¡Bienvenido al Mundo 2! El servidor web recibe ráfagas de solicitudes. En lugar de escribir el código 7 veces, activa el Event Loop mediante un Bucle Repetir.",
    learningObjective: "El Event Loop de JavaScript itera continuamente sobre la cola de tareas sin duplicar código en el hilo principal.",
    stepByStepGuide: [
      "1. Arrastra el bloque '🔁 Repetir X veces'.",
      "2. Ajusta el contador a 7 repeticiones.",
      "3. Coloca dentro un solo bloque '🚀 Mover adelante'."
    ],
    objectives: [
      { id: 'goal', label: 'Procesar toda la cola de peticiones hasta la meta' },
      { id: 'loop_use', label: 'Usar el bloque de Bucle Repetir 🔁' },
      { id: 'blocks', label: 'Usar sólo 3 bloques para 3 ⭐' }
    ],
    gridSize: { width: 10, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 8, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 3,
    availableBlocks: ['move_forward', 'repeat_times'],
    hint: "Mete el bloque '🚀 Mover adelante' DENTRO de '🔁 Repetir 7 veces'."
  },
  {
    id: 106,
    world: 2,
    worldTitle: "Mundo 2: Event Loop y Automatización JS",
    title: "6. Renderizando la Galería DOM",
    conceptName: "Patrones de Renderizado",
    description: "Recorre los nodos de componentes DOM en la grilla y renderiza los 3 activos multimedia mediante un bucle iterativo.",
    story: "¡Construyendo la interfaz web! Cody debe recorrer los contenedores CSS en forma de escalera para inyectar los activos multimedia (cristales) en el árbol DOM.",
    learningObjective: "La manipulación dinámica del DOM aplica transformaciones iterativas para renderizar colecciones de elementos.",
    stepByStepGuide: [
      "1. Diseña el patrón de 1 escalón: Mover, Girar Izquierda, Mover, Girar Derecha, Recoger.",
      "2. Coloca esa secuencia dentro de 'Repetir 3 veces'.",
      "3. Observa a Cody renderizar los 3 activos hasta la meta."
    ],
    objectives: [
      { id: 'collect_dom', label: 'Renderizar los 3 activos multimedia 💎' },
      { id: 'goal', label: 'Completar la renderización del DOM' },
      { id: 'blocks', label: 'Usar máximo 6 bloques' }
    ],
    gridSize: { width: 6, height: 6 },
    startPos: { x: 1, y: 4 },
    startDirection: 'EAST',
    goalPos: { x: 4, y: 1 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'dom1', x: 2, y: 3, type: 'CRYSTAL' },
      { id: 'dom2', x: 3, y: 2, type: 'CRYSTAL' },
      { id: 'dom3', x: 4, y: 1, type: 'CRYSTAL' }
    ],
    maxBlocks: 6,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'collect', 'repeat_times'],
    hint: "El patrón de 1 escalón es: Mover ➔ Izquierda ➔ Mover ➔ Derecha ➔ Recoger. Ponlo en Repetir 3 veces."
  },
  {
    id: 107,
    world: 3,
    worldTitle: "Mundo 3: Control Asíncrono y Estado Web",
    title: "7. Peticiones Asíncronas (Async Fetch)",
    conceptName: "Condicionales de Red (if)",
    description: "Inspecciona la respuesta asíncrona de la API. Si detectas pérdida de conexión (arroyo), repara la red en tiempo real.",
    story: "¡Bienvenido al Mundo 3! Al ejecutar llamadas fetch(), el estado del servidor puede ser inestable. Evalúa asíncronamente el canal con un condicional IF.",
    learningObjective: "El control de flujo asíncrono en JS utiliza condicionales para manejar estados de error y recuperar conexiones caídas.",
    stepByStepGuide: [
      "1. Utiliza un bucle 'Repetir 5 veces'.",
      "2. Agrega dentro: 'Si hay arroyo adelante' -> 'Construir Puente'.",
      "3. Añade 'Mover adelante' al final de la iteración."
    ],
    objectives: [
      { id: 'if_use', label: 'Usar el bloque condicional IF ❓' },
      { id: 'goal', label: 'Completar la petición fetch() exitosamente' },
      { id: 'blocks', label: 'Usar máximo 5 bloques' }
    ],
    gridSize: { width: 7, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 5, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 5,
    availableBlocks: ['move_forward', 'build_bridge', 'repeat_times', 'if_river'],
    hint: "Dentro del bucle: evalúa 'Si hay arroyo adelante' construyendo puente, luego avanza siempre un paso."
  },
  {
    id: 108,
    world: 3,
    worldTitle: "Mundo 3: Control Asíncrono y Estado Web",
    title: "8. El Balanceador de Carga (Load Balancer)",
    conceptName: "Gestión de Microservicios",
    description: "Inspecciona el clúster de servidores con múltiples caídas de red y repara automáticamente todas las fallas.",
    story: "¡Pico de tráfico entrante! El Load Balancer reporta desconexiones intermitentes en varios microservicios. Cody debe patrullar la red corrigiendo fallas sobre la marcha.",
    learningObjective: "La arquitectura resiliente en JS combina bucles de monitoreo y verificaciones condicionales para garantizar alta disponibilidad.",
    stepByStepGuide: [
      "1. Configura un bucle de 7 repeticiones.",
      "2. En cada iteración: Si hay agua adelante ➔ Construir puente.",
      "3. Avanza siempre una casilla hacia la meta."
    ],
    objectives: [
      { id: 'bridges_all', label: 'Parchar todos los microservicios caídos' },
      { id: 'goal', label: 'Estabilizar el clúster en la meta' },
      { id: 'blocks', label: 'Usar máximo 6 bloques' }
    ],
    gridSize: { width: 10, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 8, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'RIVER', 'EMPTY', 'RIVER', 'RIVER', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 6,
    availableBlocks: ['move_forward', 'build_bridge', 'repeat_times', 'if_river'],
    hint: "Repite 7 veces: Si hay agua adelante construye puente, luego siempre avanza una casilla."
  },
  {
    id: 109,
    world: 4,
    worldTitle: "Mundo 4: Arquitectura Web Avanzada",
    title: "9. Optimización de Bundles (Tree Shaking)",
    conceptName: "Algoritmos y Dependencias",
    description: "Navega por el grafo de dependencias de tu proyecto, elimina código inútil y recolecta los 3 módulos clave para Vite/Webpack.",
    story: "¡Mundo 4! El paquete JS pesa demasiado. Cody debe ejecutar un algoritmo de 'Tree Shaking' recolectando únicamente las 3 librerías indispensables (cristales) en el mapa.",
    learningObjective: "Los bundlers modernos de JavaScript optimizan el tamaño de las apps descartando código no utilizado en el gráfico de dependencias.",
    stepByStepGuide: [
      "1. Planifica la ruta para recoger los 3 módulos clave en los ramales de red.",
      "2. Emplea giros exactos para no quedar atrapado en bloques obsoletos.",
      "3. Entrega el bundle optimizado en la meta de compilación."
    ],
    objectives: [
      { id: 'collect_modules', label: 'Recolectar los 3 módulos esenciales 💎' },
      { id: 'goal', label: 'Desplegar el bundle comprimido a producción' },
      { id: 'blocks', label: 'Usar máximo 14 bloques' }
    ],
    gridSize: { width: 7, height: 7 },
    startPos: { x: 1, y: 1 },
    startDirection: 'SOUTH',
    goalPos: { x: 5, y: 5 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'EMPTY', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'EMPTY', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'mod1', x: 1, y: 3, type: 'CRYSTAL' },
      { id: 'mod2', x: 3, y: 3, type: 'CRYSTAL' },
      { id: 'mod3', x: 5, y: 3, type: 'CRYSTAL' }
    ],
    maxBlocks: 14,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'collect', 'repeat_times', 'if_river'],
    hint: "Planea tu ruta: Recoge el cristal del primer pasillo, regresa, cruza al centro y luego al pasillo derecho antes de llegar a la meta."
  },
  {
    id: 110,
    world: 4,
    worldTitle: "Mundo 4: Arquitectura Web Avanzada",
    title: "10. La Gran App Web Full-Stack",
    conceptName: "Integración de Sistemas Web",
    description: "Recupera las 2 réplicas de base de datos aisladas tras el gran lago digital y reconéctalas al Servidor Central de Producción.",
    story: "¡El Desafío Final de JavaScript! Un fallo en el CDN dejó 2 réplicas de base de datos (nodos) aisladas al otro lado del lago digital. Cody debe construir enlaces de fibra (puentes), recuperar ambos datos (ovejas/nodos) y desplegar la app Full-Stack.",
    learningObjective: "¡Felicitaciones! Has integrado Sintaxis JS, Rutas, Event Loop, Promesas Asíncronas y Arquitectura Web. ¡Eres un Ingeniero Web Full-Stack completo!",
    stepByStepGuide: [
      "1. Construye el enlace de fibra asíncrono sobre el gran lago digital.",
      "2. Recoge las 2 réplicas de base de datos 🐑 en las zonas aisladas.",
      "3. Conecta todo en el Servidor Central de la meta para graduarte."
    ],
    objectives: [
      { id: 'bridge_fiber', label: 'Construir enlace de fibra sobre el lago' },
      { id: 'rescue_databases', label: 'Recuperar las 2 réplicas de base de datos 🐑' },
      { id: 'goal', label: 'Completar el despliegue Full-Stack en la Meta' },
      { id: 'blocks', label: 'Usar máximo 16 bloques' }
    ],
    gridSize: { width: 8, height: 8 },
    startPos: { x: 1, y: 6 },
    startDirection: 'NORTH',
    goalPos: { x: 6, y: 6 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'RIVER', 'RIVER', 'RIVER', 'RIVER', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'RIVER', 'RIVER', 'RIVER', 'RIVER', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'db1', x: 1, y: 1, type: 'SHEEP' },
      { id: 'db2', x: 6, y: 1, type: 'SHEEP' }
    ],
    maxBlocks: 16,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'build_bridge', 'collect', 'repeat_times', 'if_river'],
    hint: "Combina giros, bucles y puentes de fibra para cruzar el lago, recolectar ambas réplicas de datos y alcanzar la meta final."
  }
];

export const DJANGO_LEVELS: LevelConfig[] = [
  {
    id: 201,
    world: 1,
    worldTitle: "Mundo 1: Arquitectura Django & MVT",
    title: "1. Inicializando el Proyecto Django",
    conceptName: "Estructura MVT y settings.py",
    description: "Ejecuta django-admin startproject guiando a Cody hasta el servidor principal de desarrollo.",
    story: "¡Bienvenido al servidor backend de Django! Para encender el motor de la aplicación web, Cody debe llevar el archivo de configuraciones settings.py al núcleo del servidor.",
    learningObjective: "En Django, la arquitectura MVT (Modelo-Vista-Template) organiza el proyecto desde el punto de entrada de la URL hasta la vista principal.",
    stepByStepGuide: [
      "1. Arrastra 5 bloques '🚀 Mover adelante' al espacio de trabajo.",
      "2. Conéctalos formando una cadena vertical de ejecución.",
      "3. Presiona 'Ejecutar Programa' para iniciar el servidor de desarrollo runserver."
    ],
    objectives: [
      { id: 'goal', label: 'Encender el servidor backend de Django' },
      { id: 'blocks', label: 'Usar máximo 6 bloques (para 3 ⭐)' }
    ],
    gridSize: { width: 8, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 6, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 6,
    availableBlocks: ['move_forward'],
    hint: "Coloca cinco bloques '🚀 Mover adelante' en orden vertical para alcanzar el servidor."
  },
  {
    id: 202,
    world: 1,
    worldTitle: "Mundo 1: Arquitectura Django & MVT",
    title: "2. Mapeando URLs y Vistas",
    conceptName: "URL Dispatcher & Views",
    description: "Despacha una petición HTTP doblando en la ruta de urls.py para ejecutar la vista views.index.",
    story: "¡Petición HTTP entrante en el URL Dispatcher! El enrutador de Django debe dirigir la solicitud desde urls.py hacia la función de vista en views.py.",
    learningObjective: "El enrutador de Django compara la URL solicitada y la asigna a su vista correspondiente para procesar la respuesta HTTP.",
    stepByStepGuide: [
      "1. Avanza 2 casillas hasta el nodo de urls.py.",
      "2. Añade un bloque '↺ Girar a la Izquierda'.",
      "3. Avanza 3 casillas más para llegar a la vista views.py."
    ],
    objectives: [
      { id: 'goal', label: 'Conectar la URL con la Vista correspondiente' },
      { id: 'blocks', label: 'Usar máximo 7 bloques' }
    ],
    gridSize: { width: 6, height: 6 },
    startPos: { x: 1, y: 4 },
    startDirection: 'EAST',
    goalPos: { x: 3, y: 1 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'GOAL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 7,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right'],
    hint: "Avanza 2 casillas, gira a la izquierda y sube 3 casillas hasta la meta."
  },
  {
    id: 203,
    world: 1,
    worldTitle: "Mundo 1: Arquitectura Django & MVT",
    title: "3. Ejecutando Migraciones SQL",
    conceptName: "makemigrations & migrate",
    description: "Una tabla de base de datos no existe. ¡Aplica la migración construyendo un puente de esquemas SQL!",
    story: "¡Error de Base de Datos! OperationalError: no such table. Debes aplicar las migraciones de Django (python manage.py migrate) para crear las tablas relacionales.",
    learningObjective: "Las migraciones de Django sincronizan los cambios realizados en los modelos de Python con las tablas de la base de datos SQL.",
    stepByStepGuide: [
      "1. Avanza 2 pasos hasta quedar frente a la tabla sin migrar.",
      "2. Ejecuta el bloque '🌉 Construir Puente' para aplicar la migración.",
      "3. Avanza 2 pasos más para almacenar los registros en la base de datos."
    ],
    objectives: [
      { id: 'bridge', label: 'Aplicar la migración de esquema en la base de datos' },
      { id: 'goal', label: 'Sincronizar el estado del modelo en la meta' },
      { id: 'blocks', label: 'Usar máximo 6 bloques' }
    ],
    gridSize: { width: 7, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 5, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 6,
    availableBlocks: ['move_forward', 'build_bridge'],
    hint: "Ponte enfrente de la falla de base de datos, construye el puente de migración y camina hasta la meta."
  },
  {
    id: 204,
    world: 1,
    worldTitle: "Mundo 1: Arquitectura Django & MVT",
    title: "4. Consultas Django ORM (.filter())",
    conceptName: "ORM QuerySets & Models",
    description: "Ejecuta una consulta Product.objects.filter(active=True) recolectando los 2 registros de productos.",
    story: "El controlador necesita consultar registros en la base de datos a través del ORM de Django. Recolecta los 2 registros de modelo (cristales) en las tablas relacionales.",
    learningObjective: "El ORM de Django permite consultar y manipular registros SQL utilizando sintaxis nativa de Python sin escribir SQL manualmente.",
    stepByStepGuide: [
      "1. Avanza y recoge el primer registro de la consulta ORM.",
      "2. Navega por el pasillo central hacia el segundo registro.",
      "3. Retorna el QuerySet obtenido al controlador en la meta."
    ],
    objectives: [
      { id: 'collect_orm', label: 'Recolectar los 2 registros ORM 💎' },
      { id: 'goal', label: 'Retornar el QuerySet al controlador de meta' },
      { id: 'blocks', label: 'Usar máximo 11 bloques' }
    ],
    gridSize: { width: 7, height: 7 },
    startPos: { x: 1, y: 5 },
    startDirection: 'NORTH',
    goalPos: { x: 5, y: 1 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'WALL', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'WALL', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'orm1', x: 1, y: 3, type: 'CRYSTAL' },
      { id: 'orm2', x: 5, y: 3, type: 'CRYSTAL' }
    ],
    maxBlocks: 11,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'collect', 'repeat_times'],
    hint: "Avanza hasta (1,3), recoge el cristal 1, gira al Este hasta (5,3), recoge el cristal 2 y sube a la meta (5,1)."
  },
  {
    id: 205,
    world: 2,
    worldTitle: "Mundo 2: Django ORM & Base de Datos",
    title: "5. Paginación de QuerySets",
    conceptName: "Paginador Django (Paginator)",
    description: "Itera sobre 6 páginas de registros de base de datos de manera automatizada usando un bucle Repetir.",
    story: "¡Bienvenido al Mundo 2! La tabla contiene miles de registros. Django usa la clase Paginator para recorrer páginas de resultados iterativamente dentro de un bucle.",
    learningObjective: "La paginación fragmenta grandes conjuntos de datos de la base de datos para procesarlos por lotes de forma eficiente.",
    stepByStepGuide: [
      "1. Arrastra el bloque '🔁 Repetir X veces'.",
      "2. Ajusta el contador a 6 repeticiones de página.",
      "3. Coloca dentro un bloque '🚀 Mover adelante'."
    ],
    objectives: [
      { id: 'goal', label: 'Procesar todas las páginas del QuerySet' },
      { id: 'loop_use', label: 'Usar el bloque de Bucle Repetir 🔁' },
      { id: 'blocks', label: 'Usar sólo 3 bloques para 3 ⭐' }
    ],
    gridSize: { width: 9, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 7, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 3,
    availableBlocks: ['move_forward', 'repeat_times'],
    hint: "Mete '🚀 Mover adelante' DENTRO de '🔁 Repetir 6 veces'."
  },
  {
    id: 206,
    world: 2,
    worldTitle: "Mundo 2: Django ORM & Base de Datos",
    title: "6. Carga Relacional (select_related)",
    conceptName: "Optimización de Consultas SQL",
    description: "Evita el problema N+1 de consultas recolectando los 3 registros de llaves foráneas mediante un bucle de patrón.",
    story: "¡Alerta de rendimiento! Tu app ejecuta demasiadas consultas SQL separadas. Usa select_related() para traer los modelos relacionados (cristales) en una sola pasada.",
    learningObjective: "select_related realiza una JOIN de SQL en el ORM de Django para traer relaciones ForeignKey de manera óptima.",
    stepByStepGuide: [
      "1. Diseña la secuencia de 1 escalón: Mover, Girar Izquierda, Mover, Girar Derecha, Recoger.",
      "2. Encierra esa secuencia dentro de 'Repetir 3 veces'.",
      "3. Observa cómo Cody optimiza todas las consultas SQL."
    ],
    objectives: [
      { id: 'collect_fk', label: 'Optimizar los 3 registros de claves foráneas 💎' },
      { id: 'goal', label: 'Completar la consulta JOIN en la meta' },
      { id: 'blocks', label: 'Usar máximo 6 bloques' }
    ],
    gridSize: { width: 6, height: 6 },
    startPos: { x: 1, y: 4 },
    startDirection: 'EAST',
    goalPos: { x: 4, y: 1 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'fk1', x: 2, y: 3, type: 'CRYSTAL' },
      { id: 'fk2', x: 3, y: 2, type: 'CRYSTAL' },
      { id: 'fk3', x: 4, y: 1, type: 'CRYSTAL' }
    ],
    maxBlocks: 6,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'collect', 'repeat_times'],
    hint: "El patrón de 1 escalón es: Mover ➔ Izquierda ➔ Mover ➔ Derecha ➔ Recoger. Repite 3 veces."
  },
  {
    id: 207,
    world: 3,
    worldTitle: "Mundo 3: Middleware & Seguridad Backend",
    title: "7. Capa de Middleware de Seguridad",
    conceptName: "Middleware & Security Filters",
    description: "Inspecciona las peticiones HTTP entrantes. Si detectas vulnerabilidades o caídas (arroyo), aplica protección CSRF.",
    story: "¡Bienvenido al Mundo 3! El middleware de Django procesa cada solicitud antes de entregarla a la vista. Verifica el canal con un condicional IF y construye parches de seguridad.",
    learningObjective: "Los Middlewares de Django actúan como capas de filtrado global que inspeccionan solicitudes y respuestas antes y después de ser procesadas.",
    stepByStepGuide: [
      "1. Configura un bucle 'Repetir 5 veces'.",
      "2. Agrega dentro: 'Si hay arroyo adelante' -> 'Construir Puente'.",
      "3. Añade 'Mover adelante' al final."
    ],
    objectives: [
      { id: 'if_use', label: 'Usar el bloque condicional IF ❓' },
      { id: 'goal', label: 'Superar el filtro de middleware hacia la meta' },
      { id: 'blocks', label: 'Usar máximo 5 bloques' }
    ],
    gridSize: { width: 7, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 5, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'RIVER', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 5,
    availableBlocks: ['move_forward', 'build_bridge', 'repeat_times', 'if_river'],
    hint: "Dentro del bucle: evalúa 'Si hay arroyo adelante' construyendo puente, luego avanza siempre un paso."
  },
  {
    id: 208,
    world: 3,
    worldTitle: "Mundo 3: Middleware & Seguridad Backend",
    title: "8. Autenticación (@login_required)",
    conceptName: "Decoradores y Control de Acceso",
    description: "Múltiples vistas carecen de autenticación. Verifica el acceso y protege todas las rutas privadas.",
    story: "¡Rutas desprotegidas! Varias vistas sensibles no verifican la sesión del usuario. Cody debe patrillar el servidor aplicando decoradores @login_required (puentes) condicionalmente.",
    learningObjective: "Los decoradores y permisos de Django restringen el acceso a vistas privadas asegurando que el usuario esté autenticado.",
    stepByStepGuide: [
      "1. Repite la inspección 7 veces.",
      "2. En cada paso: Si hay agua adelante ➔ Construir puente.",
      "3. Avanza siempre una casilla hacia el nodo seguro."
    ],
    objectives: [
      { id: 'bridges_all', label: 'Proteger todas las vistas con autenticación' },
      { id: 'goal', label: 'Asegurar el panel de administración en la meta' },
      { id: 'blocks', label: 'Usar máximo 6 bloques' }
    ],
    gridSize: { width: 10, height: 5 },
    startPos: { x: 1, y: 2 },
    startDirection: 'EAST',
    goalPos: { x: 8, y: 2 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'RIVER', 'EMPTY', 'RIVER', 'RIVER', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    maxBlocks: 6,
    availableBlocks: ['move_forward', 'build_bridge', 'repeat_times', 'if_river'],
    hint: "Repite 7 veces: Si hay agua adelante construye puente, luego siempre avanza una casilla."
  },
  {
    id: 209,
    world: 4,
    worldTitle: "Mundo 4: Backend Avanzado & Despliegue",
    title: "9. Tareas Asíncronas (Celery + Redis)",
    conceptName: "Celery Workers & Task Queues",
    description: "Navega por el broker de mensajes Redis y recolecta las 3 tareas asíncronas de Celery en segundo plano.",
    story: "¡Mundo 4! El envío de correos masivos no debe demorar las respuestas HTTP. Cody debe ingresar a los workers de Celery recolectando las 3 tareas asíncronas (cristales).",
    learningObjective: "Celery procesa tareas pesadas en segundo plano mediante colas de mensajes, manteniendo la app Django rápida y responsiva.",
    stepByStepGuide: [
      "1. Planifica la ruta para ingresar a los 3 canales de los workers.",
      "2. Recolecta las 3 tareas asíncronas de Celery.",
      "3. Confirma la ejecución en el broker de meta."
    ],
    objectives: [
      { id: 'collect_tasks', label: 'Ejecutar las 3 tareas asíncronas de Celery 💎' },
      { id: 'goal', label: 'Completar la cola de mensajes en el broker' },
      { id: 'blocks', label: 'Usar máximo 14 bloques' }
    ],
    gridSize: { width: 7, height: 7 },
    startPos: { x: 1, y: 1 },
    startDirection: 'SOUTH',
    goalPos: { x: 5, y: 5 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'WALL', 'EMPTY', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'EMPTY', 'WALL', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'task1', x: 1, y: 3, type: 'CRYSTAL' },
      { id: 'task2', x: 3, y: 3, type: 'CRYSTAL' },
      { id: 'task3', x: 5, y: 3, type: 'CRYSTAL' }
    ],
    maxBlocks: 14,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'collect', 'repeat_times', 'if_river'],
    hint: "Planea la ruta: Recoge la tarea del primer pasillo, regresa, cruza al centro y luego al pasillo derecho antes de llegar a la meta."
  },
  {
    id: 210,
    world: 4,
    worldTitle: "Mundo 4: Backend Avanzado & Despliegue",
    title: "10. Despliegue en Producción & PostgreSQL",
    conceptName: "Arquitectura Backend Empresarial",
    description: "Reconecta las 2 bases de datos maestras de PostgreSQL aisladas y despliega el clúster Django en Gunicorn.",
    story: "¡El Desafío Final de Django! Un fallo en el centro de datos aisló 2 réplicas maestras de PostgreSQL al otro lado del lago de servidores. Cody debe construir enlaces de red (puentes), asegurar las 2 réplicas (ovejas/datos) y lanzar el servidor Gunicorn.",
    learningObjective: "¡Felicitaciones! Has dominado MVT, ORM, Migraciones, Middleware, Celery y Despliegues de Producción en Django. ¡Eres un Ingeniero Backend Python completo!",
    stepByStepGuide: [
      "1. Construye el enlace de red sobre el lago de servidores.",
      "2. Rescata las 2 réplicas maestras de PostgreSQL 🐑 en las zonas aisladas.",
      "3. Despliega el servidor Gunicorn en la meta para graduarte."
    ],
    objectives: [
      { id: 'bridge_db', label: 'Construir enlace de red sobre el lago de servidores' },
      { id: 'rescue_pg', label: 'Rescatar las 2 réplicas de PostgreSQL 🐑' },
      { id: 'goal', label: 'Lanzar la app Django en Gunicorn' },
      { id: 'blocks', label: 'Usar máximo 16 bloques' }
    ],
    gridSize: { width: 8, height: 8 },
    startPos: { x: 1, y: 6 },
    startDirection: 'NORTH',
    goalPos: { x: 6, y: 6 },
    map: [
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'RIVER', 'RIVER', 'RIVER', 'RIVER', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'RIVER', 'RIVER', 'RIVER', 'RIVER', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'WALL'],
      ['WALL', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'EMPTY', 'GOAL', 'WALL'],
      ['WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL', 'WALL']
    ],
    items: [
      { id: 'pg1', x: 1, y: 1, type: 'SHEEP' },
      { id: 'pg2', x: 6, y: 1, type: 'SHEEP' }
    ],
    maxBlocks: 16,
    availableBlocks: ['move_forward', 'turn_left', 'turn_right', 'build_bridge', 'collect', 'repeat_times', 'if_river'],
    hint: "Combina giros, bucles y puentes para cruzar el lago, recolectar ambas réplicas de PostgreSQL y alcanzar la meta final."
  }
];

export function getLevelsForTrack(track: TrackType): LevelConfig[] {
  switch (track) {
    case 'javascript':
    case 'react':
      return JAVASCRIPT_LEVELS;
    case 'django':
      return DJANGO_LEVELS;
    case 'python':
    default:
      return PYTHON_LEVELS;
  }
}

export const LEVELS: LevelConfig[] = PYTHON_LEVELS;
