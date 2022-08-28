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
    const config = vscode.workspace.getConfiguration('sl');

    for (let i = 0; i < define.D51.width; i++) {
        await draw(editor, config, startLine, i);
        await setTimeout(config.refreshRateMs);
    }
}

async function draw(editor, config, startLine, i) {
    const replaceByTrain = ((edit) => {
        const trainRange = new vscode.Range(
            new vscode.Position(startLine, 0),
            new vscode.Position(startLine + define.D51.height(), config.windowWidth)
        );
        const train = `${define.D51.smoke(i)}${define.D51.STR}${define.D51.wheel(i)}`;
        const padding = ' '.repeat(
            i <= config.windowWidth ? config.windowWidth - i : 0
        );
        edit.replace(trainRange, getPart(train, i, config.windowWidth + i, padding));
    });

    await editor.edit((edit) => replaceByTrain(edit), { undoStopBefore: i == 0 });
}

function getPart(sl, indexStart, indexEnd = undefined, padding = '') {
    return sl.split('\n').map(line => (padding + line).slice(indexStart, indexEnd)).join('\n');
}
