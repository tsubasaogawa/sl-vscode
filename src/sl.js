const vscode = require('vscode');
const define = require('./define');
const { setTimeout } = require('timers/promises');

module.exports = {
    run,
}

async function run() {
    let editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;
    const startLine = position.line;

    for (let i = 0; i < define.D51.width; i++) {
        await draw(editor, startLine, i);
        await setTimeout(refreshRate);
    }
}

async function draw(editor, startLine, i) {
    const train = `${define.D51.smoke(i)}${define.D51.STR}${define.D51.wheel(i)}`;

    const selection = new vscode.Selection(
        new vscode.Position(startLine, 0),
        new vscode.Position(startLine + define.D51.height(), windowWidth)
    );
    await editor.edit((edit => {
        edit.replace(selection, getPart(train, i, windowWidth + i));
    }));
}

function getPart(sl, indexStart, indexEnd = undefined) {
    const result = sl.split('\n').map(line => line.slice(indexStart, indexEnd)).join('\n');
    console.log(result);
    return result;
}
