import type { LevelConfig } from '../types/game';

export const LEVELS: LevelConfig[] = [
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
