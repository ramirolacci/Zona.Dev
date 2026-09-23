import * as Blockly from 'blockly';
import { javascriptGenerator } from 'blockly/javascript';
import { pythonGenerator } from 'blockly/python';

let blocksInitialized = false;

export const initCustomBlocks = () => {
  if (blocksInitialized) return;
  blocksInitialized = true;

  // 1. Move Forward Block
  Blockly.Blocks['move_forward'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("🚀 Mover adelante");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#3B82F6'); // Vibrant Blue
      this.setTooltip("Avanza una casilla en la dirección actual");
      this.setHelpUrl("");
    }
  };

  javascriptGenerator.forBlock['move_forward'] = function (block) {
    return `await moveForward('${block.id}');\n`;
  };

  pythonGenerator.forBlock['move_forward'] = function () {
    return `bot.move_forward()\n`;
  };

  // 2. Turn Left Block
  Blockly.Blocks['turn_left'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("↺ Girar a la Izquierda");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#8B5CF6'); // Purple
      this.setTooltip("Gira 90 grados hacia la izquierda");
    }
  };

  javascriptGenerator.forBlock['turn_left'] = function (block) {
    return `await turnLeft('${block.id}');\n`;
  };

  pythonGenerator.forBlock['turn_left'] = function () {
    return `bot.turn_left()\n`;
  };

  // 3. Turn Right Block
  Blockly.Blocks['turn_right'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("↻ Girar a la Derecha");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#8B5CF6'); // Purple
      this.setTooltip("Gira 90 grados hacia la derecha");
    }
  };

  javascriptGenerator.forBlock['turn_right'] = function (block) {
    return `await turnRight('${block.id}');\n`;
  };

  pythonGenerator.forBlock['turn_right'] = function () {
    return `bot.turn_right()\n`;
  };

  // 4. Build Bridge Block
  Blockly.Blocks['build_bridge'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("🌉 Construir Puente");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#F59E0B'); // Amber/Orange
      this.setTooltip("Construye un puente sobre el arroyo de agua justo enfrente");
    }
  };

  javascriptGenerator.forBlock['build_bridge'] = function (block) {
    return `await buildBridge('${block.id}');\n`;
  };

  pythonGenerator.forBlock['build_bridge'] = function () {
    return `bot.build_bridge()\n`;
  };

  // 5. Collect Item Block
  Blockly.Blocks['collect'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("⭐ Recoger Objeto / Oveja");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#10B981'); // Emerald Green
      this.setTooltip("Recoge la oveja o cristal en la casilla actual");
    }
  };

  javascriptGenerator.forBlock['collect'] = function (block) {
    return `await collectItem('${block.id}');\n`;
  };

  pythonGenerator.forBlock['collect'] = function () {
    return `bot.collect()\n`;
  };

  // 6. Repeat Times Block
  Blockly.Blocks['repeat_times'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("🔁 Repetir")
        .appendField(new Blockly.FieldNumber(3, 1, 20), "TIMES")
        .appendField("veces");
      this.appendStatementInput("DO")
        .appendField("hacer");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#EC4899'); // Pink
      this.setTooltip("Repite las acciones dentro del bucle el número de veces indicado");
    }
  };

  javascriptGenerator.forBlock['repeat_times'] = function (block, generator) {
    const times = block.getFieldValue('TIMES');
    const branch = generator.statementToCode(block, 'DO');
    return `for (let i = 0; i < ${times}; i++) {\n${branch}}\n`;
  };

  pythonGenerator.forBlock['repeat_times'] = function (block, generator) {
    const times = block.getFieldValue('TIMES');
    const branch = generator.statementToCode(block, 'DO') || '    pass\n';
    return `for i in range(${times}):\n${branch}`;
  };

  // 7. If River Ahead Block
  Blockly.Blocks['if_river'] = {
    init: function () {
      this.appendDummyInput()
        .appendField("❓ Si hay arroyo adelante");
      this.appendStatementInput("DO")
        .appendField("entonces");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour('#06B6D4'); // Cyan
      this.setTooltip("Ejecuta los bloques interiores solo si hay agua inmediatamente enfrente");
    }
  };

  javascriptGenerator.forBlock['if_river'] = function (block, generator) {
    const branch = generator.statementToCode(block, 'DO');
    return `if (await isRiverAhead('${block.id}')) {\n${branch}}\n`;
  };

  pythonGenerator.forBlock['if_river'] = function (block, generator) {
    const branch = generator.statementToCode(block, 'DO') || '    pass\n';
    return `if bot.is_river_ahead():\n${branch}`;
  };
};

export const getToolboxForLevel = (availableBlockKeys: string[]) => {
  const contents: any[] = [];

  if (availableBlockKeys.includes('move_forward')) {
    contents.push({ kind: 'block', type: 'move_forward' });
  }
  if (availableBlockKeys.includes('turn_left')) {
    contents.push({ kind: 'block', type: 'turn_left' });
  }
  if (availableBlockKeys.includes('turn_right')) {
    contents.push({ kind: 'block', type: 'turn_right' });
  }
  if (availableBlockKeys.includes('build_bridge')) {
    contents.push({ kind: 'block', type: 'build_bridge' });
  }
  if (availableBlockKeys.includes('collect')) {
    contents.push({ kind: 'block', type: 'collect' });
  }
  if (availableBlockKeys.includes('repeat_times')) {
    contents.push({ kind: 'block', type: 'repeat_times' });
  }
  if (availableBlockKeys.includes('if_river')) {
    contents.push({ kind: 'block', type: 'if_river' });
  }

  return {
    kind: 'flyoutToolbox',
    contents
  };
};
