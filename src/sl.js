const vscode = require('vscode');
const define = require('./define');

module.exports = {
    run,
}

function run() {
    const editor = vscode.window.activeTextEditor;
    const position = editor.selection.active;

    editor.edit((edit => {
        edit.insert(new vscode.Position(position.line, 0), define.D51.STR);
    }));
}
