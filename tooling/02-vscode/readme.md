# VS Code Essentials

## VS Code Tips & Tricks

[VS Code Tips & Tricks](https://github.com/Microsoft/vscode-tips-and-tricks)

[Useful VS Code Keyboard Shortcuts](https://zellwk.com/blog/useful-vscode-keyboard-shortcuts/)

## Manage VS Code Extensions & Settings using PowerShell

Got to folder `'00 VS Code Settings'`

#### Dump to current Folder - dumpExtensions.ps1

```
code --list-extensions > ".\extensions.txt"
```

#### Import from current Folder - importExtensions.ps1

```
foreach($line in Get-Content ".\extensions.txt") {
    code --install-extension $line
}
```

## Recommended VS Code Settings

Copy settings.json & keybindings.json to `%APPDATA%\Code\User\settings.json`

### settings.json:

```
{
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe",
  "window.zoomLevel": 1,
  "window.restoreWindows": "none",
  "problems.autoReveal": false,
  "workbench.startupEditor": "none",
  "workbench.editor.enablePreview": false,
  "workbench.editor.restoreViewState": false,
  "workbench.colorTheme": "Cobalt2",
  "workbench.colorCustomizations": {
    "terminal.background": "#747575"
  },
  "files.hotExit": "off",
  "editor.wordWrap": "on",
  "editor.minimap.enabled": false,
  "editor.formatOnSave": true,
  "editor.suggestSelection": "first",
  "problems.decorations.enabled": false,
  "explorer.confirmDelete": false,
  "explorer.confirmDragAndDrop": false,
  "explorer.openEditors.visible": 0,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "emmet.triggerExpansionOnTab": true,
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.cursorStyle": "line",
  "liveServer.settings.donotShowInfoMsg": true,
  "bracket-pair-colorizer-2.colors": [
    "Red",
    "yellow",
    "Green",
    "Pink"
  ],
  "csharp.format.enable": true,
  "csharpfixformat.sort.usings.enabled": true,
  "todohighlight.isCaseSensitive": false,
  "todohighlight.keywords": [
    {
      "text": "todo:",
      "color": "red",
      "border": "1px solid red",
      "borderRadius": "2px",
      "backgroundColor": "rgba(0,0,0,.2)"
    }
  ],
  "git.confirmSync": false,
  "git-graph.fetchAvatars": true,
  "git.autofetchPeriod": 90,
  "git.autofetch": true,
  "git.enableSmartCommit": true,
  "vsonline.accountProvider": "Microsoft"
}
```

### keybindings.json:

```
[
    // Save all
    {
      "key": "ctrl+s",
      "command": "workbench.action.files.saveAll"
    },
    // Stage current file
    {
      "key": "alt+s",
      "command": "git.stage"
    },
    // Delete line
    {
      "key": "ctrl+l",
      "command": "editor.action.deleteLines",
      "when": "textInputFocus && !editorReadonly"
    }
  ]
```

## Additional Labs & Walkthroughs

[Develop web applications with Visual Studio Code](https://docs.microsoft.com/en-us/learn/modules/develop-web-apps-with-vs-code/)
