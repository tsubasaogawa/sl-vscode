const vscode = require('vscode');
const define = require('./define');
const { setTimeout } = require('timers/promises');

const windowWidth = 60;

module.exports = {
    run,
}

async function run() {
    let editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;
    const startLine = position.line;

    for (let i = 0; i < 60; i++) {
        await draw(editor, startLine, i);
        await setTimeout(100);
    }
}

async function draw(editor, startLine, i) {
    const startPos = new vscode.Position(startLine, 0);
    const selection = new vscode.Selection(
        startPos,
        new vscode.Position(startLine + 9, windowWidth))
        ;
    await editor.edit((edit => {
        edit.replace(selection, getPart(define.D51.STR, i, windowWidth + i));
    }));
}

function getPart(sl, indexStart, indexEnd = undefined) {
    const result = sl.split('\n').map(line => line.slice(indexStart, indexEnd)).join('\n');
    console.log(result);
    return result;
}
