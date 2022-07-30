const vscode = require('vscode');
const define = require('./define');

module.exports = {
    run,
}

function run() {
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;

    editor.edit((edit => {
        edit.insert(new vscode.Position(position.line, 0), getPart(define.D51.STR, 0, 40));
    }));
}

function getPart(sl, indexStart, indexEnd = undefined) {
    const result = sl.split('\n').map(line => line.slice(indexStart, indexEnd)).join('\n');
    console.log(result);
    return result;
}
