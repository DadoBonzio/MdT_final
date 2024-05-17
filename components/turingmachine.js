const tapeSize = 100;
var tape = "";
var pos = 0;
var currentCell;
var currentState;
/**
 * Instruction:
 * {
 *  currentState;
 *  currentValue;
 *  newState;
 *  newValue;
 *  moveDirection;
 * }
 */
var instructions = [];


function addInstruction(currentState, currentValue, newState, newValue, moveDirection) {
    instructions.push({ currentState, currentValue, newState, newValue, moveDirection });
}

function executeInstruction(instruction) {
    write(instruction.newValue);
    move(instruction.moveDirection);
    currentState = instruction.newState;
}

function execute(_instructions) {
    currentState = "s";
    pos = 0;
    do {
        read();
        instructions.every(element => {
            if (currentCell == element.currentValue && currentState == element.currentState) {
                executeInstruction(element);
                return false;
            }
            return true;
        });
    }  while (currentState != "h");
    return tape;
}

function move(direction) {
    direction = clamp(direction, 0, 2);
    if (direction == 2)
        direction = -1;
    pos += direction;
    pos = clamp(pos, 0, tapeSize);
}

function write(newValue) {
    console.log(tape);
    tape = tape.substring(0, pos) + newValue + tape.substring(pos + newValue.length);
    console.log(tape);
}

function read() {
    currentCell = tape.charAt(pos);
}

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function FDE() {
    var program = document.getElementById("program").value;
    tape = document.getElementById("input").value;
    var output = document.getElementById("output");
    console.log("tape: " + tape);
    program = program.split("\n");
    console.log(program);
    instructions.length = 0;
    program.forEach(element => {
        addInstruction(element.split("")[0], element.split("")[1], element.split("")[2], element.split("")[3], element.split("")[4]);
    });
    output.value = execute(instructions);
}

